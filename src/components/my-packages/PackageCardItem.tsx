import { IPackage } from "@/types/package";
import Image from "next/image";
import dayjs from "dayjs";
import { shortAddress } from "@/utils/common";
import { Button, Divider } from "@nextui-org/react";
import { FaCoins } from "react-icons/fa6";
import { ReactNode } from "react";

interface IPackageCardItemProps {
	packageItem: IPackage;
}
export default function PackageCardItem({
	packageItem,
}: IPackageCardItemProps) {
	const valuePackageItem = (label: string, value: string | ReactNode) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-xs">{label}</p>
				<p className="text-right text-sm font-bold">{value}</p>
			</div>
		);
	};

	return (
		<div className="group cursor-pointer rounded-lg border border-slate-500 bg-slate-700 shadow-sm hover:bg-slate-600">
			<div className="relative flex items-center justify-center overflow-hidden rounded-lg">
				<Image
					src={packageItem.image}
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
				{valuePackageItem("Buyer", shortAddress(packageItem.buyer))}
				{valuePackageItem(
					"Buy time",
					dayjs(packageItem.buyTime).format("MMM DD, YYYY - HH:mm A"),
				)}
				{valuePackageItem("Cliff time", packageItem.cliffTime)}
				{valuePackageItem(
					"Start claiming time",
					dayjs(packageItem.startClaimingTime).format(
						"MMM DD, YYYY - HH:mm A",
					),
				)}
				{valuePackageItem(
					"Initial percent",
					`${packageItem.initialPercent}%`,
				)}
				{valuePackageItem("Cycle", packageItem.cycle)}
				{valuePackageItem(
					"Total Token claimed",
					<span className="text-yellow-500">
						{packageItem.amountTokenClaimed.toLocaleString()} $event
					</span>,
				)}
				{valuePackageItem(
					"Total Token remaining",
					<span className="text-yellow-500">
						{packageItem.amountTokenRemaining.toLocaleString()}{" "}
						$event
					</span>,
				)}
				<Divider className="my-4" />
				{packageItem.claimable ? (
					<Button
						fullWidth
						className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
						startContent={<FaCoins />}
					>
						Claim Token
					</Button>
				) : (
					<Button
						fullWidth
						color="warning"
						variant="faded"
						className=""
						disabled
					>
						Claimed
					</Button>
				)}
			</div>
		</div>
	);
}
