import { IPackage } from "@/types/package";
import Image from "next/image";
import dayjs from "dayjs";
import { shortAddress } from "@/utils/common";
import { Button, Divider } from "@nextui-org/react";
import { FaCoins } from "react-icons/fa6";
import { ReactNode } from "react";
import logoText from "/public/assets/logo-text.png";
import { claimTokenOfNft, initPackageOfNft } from "@/services/wallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IPackageCardItemProps {
	packageItem: IPackage;
}
export default function PackageCardItem({
	packageItem,
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
		},
		onError: (error) => {
			console.log(error);

			toast("Claim token failed", { type: "error" });
		},
	});

	const handleClaimToken = async () => {
		if (packageItem?.publicKey) {
			mutateClaimToken.mutate();
		}
	};
	const handleInitPackage = async () => {
		if (packageItem?.publicKey) {
			mutateInitPackage.mutate();
		}
	};
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
					No.{packageItem.id}
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
				{valuePackageItem("Cycle", packageItem.cycle)}
				{valuePackageItem(
					"Total Token claimed",
					<span className="text-yellow-500">
						{packageItem.amountTokenClaimed?.toLocaleString()}{" "}
						$event
					</span>,
				)}
				{valuePackageItem(
					"Total Token remaining",
					<span className="text-yellow-500">
						{packageItem.amountTokenRemaining?.toLocaleString()}{" "}
						$event
					</span>,
				)}
				<Divider className="my-4" />
				{packageItem?.amountTokenClaimed !== 0 ? (
					<Button variant="faded" disabled color="warning" fullWidth>
						Claimed Token
					</Button>
				) : (
					<>
						{packageItem?.wrapperStatus?.initialized ? (
							<Button
								onClick={handleClaimToken}
								isLoading={mutateClaimToken.isPending}
								fullWidth
								className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
								startContent={<FaCoins />}
							>
								Claim Token
							</Button>
						) : (
							<Button
								isLoading={mutateInitPackage.isPending}
								onClick={handleInitPackage}
								fullWidth
								className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
							>
								Open package
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	);
}
