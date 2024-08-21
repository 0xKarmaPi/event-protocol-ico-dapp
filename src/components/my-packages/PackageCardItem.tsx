import { IPackage } from "@/types/package";
import Image from "next/image";
import dayjs from "dayjs";
import { shortAddress } from "@/utils/common";
import { Button, Divider } from "@nextui-org/react";
import { ReactNode, useCallback, useMemo } from "react";
import logoText from "/public/assets/logo-text.jpg";
import { claimTokenOfNft, initPackageOfNft } from "@/services/wallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	AMOUNT_TOKEN,
	CLIFF_TIME,
	CYCLE_TIME,
	MIN_TOKEN_CLAIMABLE_PER_CYCLE,
} from "@/utils/constants";
import CountdownButton from "./CountdownButton";

interface IPackageCardItemProps {
	packageItem: IPackage;
	refetchList: () => void;
	index: number;
}
export default function PackageCardItem({
	packageItem,
	refetchList,
	index,
}: IPackageCardItemProps) {
	const wallet = useWallet();

	const valuePackageItem = (label: string, value: string | ReactNode) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-xs">{label}</p>
				<p className="text-right text-sm font-bold">{value}</p>
			</div>
		);
	};

	const mutateInitPackage = useMutation({
		mutationFn: () => initPackageOfNft(packageItem.publicKey ?? "", wallet),
		mutationKey: ["initPackageOfNft"],
		onSuccess: () => {
			toast("Open package successfully", { type: "success" });
			refetchList();
		},
		onError: () => {
			toast("Open package failed", { type: "error" });
		},
	});

	const mutateClaimToken = useMutation({
		mutationFn: () => claimTokenOfNft(packageItem.publicKey ?? "", wallet),
		mutationKey: ["claimTokenOfNft"],
		onSuccess: () => {
			toast("Claimed successfully", { type: "success" });
			refetchList();
		},
		onError: () => {
			toast("Claim token failed", { type: "error" });
		},
	});

	const handleClaimToken = useCallback(async () => {
		if (packageItem?.publicKey) {
			mutateClaimToken.mutate();
		}
	}, [mutateClaimToken, packageItem?.publicKey]);
	const handleInitPackage = useCallback(async () => {
		if (packageItem?.publicKey) {
			mutateInitPackage.mutate();
		}
	}, [mutateInitPackage, packageItem?.publicKey]);

	const renderButtonClaimToken = useMemo(() => {
		// Allow Open package if not initialized
		if (!packageItem?.wrapperStatus?.initialized) {
			const timeAllowOpenPackage = dayjs(
				Number(packageItem?.startTimeAllowOpenPackage) * 1000,
			);
			const now = new Date();
			if (dayjs(now).isBefore(timeAllowOpenPackage)) {
				return (
					<CountdownButton endTime={timeAllowOpenPackage.format()} />
				);
			}
			return (
				<Button
					isLoading={mutateInitPackage.isPending}
					onClick={handleInitPackage}
					fullWidth
					className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
				>
					Open package
				</Button>
			);
		}

		// Disabled Claim Token because All Token has been claimed
		if (packageItem?.amountTokenClaimed === AMOUNT_TOKEN) {
			return (
				<Button variant="faded" disabled color="warning" fullWidth>
					Claimed Token
				</Button>
			);
		}

		const totalClaimedTimes = Math.floor(
			(packageItem?.amountTokenClaimed ?? 0) /
				MIN_TOKEN_CLAIMABLE_PER_CYCLE,
		);
		const nextTimeAllowClaimToken = dayjs(
			new Date().getTime() +
				CLIFF_TIME * 1000 +
				CYCLE_TIME * totalClaimedTimes * 1000,
		);

		// Allow Claim Token
		if (nextTimeAllowClaimToken.isAfter(dayjs())) {
			return (
				<Button
					isLoading={mutateClaimToken.isPending}
					onClick={handleClaimToken}
					fullWidth
					className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
				>
					Claim Token
				</Button>
			);
		}
		// Disable Claim Token & show countdown until the next cycle
		return <CountdownButton endTime={nextTimeAllowClaimToken.format()} />;
	}, [
		handleClaimToken,
		handleInitPackage,
		mutateClaimToken.isPending,
		mutateInitPackage.isPending,
		packageItem?.amountTokenClaimed,
		packageItem?.startTimeAllowOpenPackage,
		packageItem?.wrapperStatus?.initialized,
	]);

	return (
		<div className="group cursor-pointer rounded-lg border border-slate-500 bg-slate-700 shadow-sm hover:bg-slate-600">
			<div className="relative flex items-center justify-center overflow-hidden rounded-lg">
				<Image
					src={logoText}
					alt=""
					width={300}
					height={300}
					className="w-full rounded-t-lg transition-all group-hover:scale-110"
				/>
				<p className="absolute left-4 top-4 rounded-lg border bg-white p-1 px-2 font-bold text-primary backdrop-blur-lg">
					No.{index}
				</p>
			</div>

			<div className="p-4">
				{valuePackageItem("NFT name", packageItem.name)}
				{valuePackageItem(
					"NFT address",
					shortAddress(packageItem.wrapperStatus?.nftAddress),
				)}
				{valuePackageItem("Buyer", shortAddress(packageItem.buyer))}
				{valuePackageItem(
					"Initial time",
					packageItem.wrapperStatus?.initTime &&
						dayjs(
							(packageItem.wrapperStatus?.initTime ?? 0) * 1000,
						).isValid() &&
						dayjs(
							(packageItem.wrapperStatus?.initTime ?? 0) * 1000,
						).format("MMM DD, YYYY - HH:mm A"),
				)}
				{valuePackageItem("Cliff time", packageItem.cliffTime)}
				{valuePackageItem(
					"Start claiming time",
					packageItem.wrapperStatus?.startTime &&
						dayjs(
							(packageItem.wrapperStatus?.startTime ?? 0) * 1000,
						).isValid() &&
						dayjs(
							(packageItem.wrapperStatus?.startTime ?? 0) * 1000,
						).format("MMM DD, YYYY - HH:mm A"),
				)}
				{valuePackageItem(
					"Initial percent",
					`${packageItem.initialPercent}%`,
				)}
				{valuePackageItem("Cycle time", packageItem.cycle)}
				{valuePackageItem(
					"Total Token claimed",
					<span className="text-yellow-500">
						{packageItem.amountTokenClaimed?.toLocaleString()} EVENT
					</span>,
				)}
				{valuePackageItem(
					"Total Token remaining",
					<span className="text-yellow-500">
						{packageItem.amountTokenRemaining?.toLocaleString()}/
						{AMOUNT_TOKEN.toLocaleString()}
						{` `}
						EVENT
					</span>,
				)}
				<Divider className="my-4" />
				{renderButtonClaimToken}
			</div>
		</div>
	);
}
