import { IPackage } from "@/types/package";
import Image from "next/image";
import dayjs from "dayjs";
import { shortAddress } from "@/utils/common";
import { Button, Divider } from "@nextui-org/react";
import { FaCoins } from "react-icons/fa6";

interface IPackageCardItemProps {
	packageItem: IPackage;
}
export default function PackageCardItem({
	packageItem,
}: IPackageCardItemProps) {
	const valuePackageItem = (label: string, value: string) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-xs">{label}</p>
				<p className="text-right text-sm font-bold">{value}</p>
			</div>
		);
	};

	return (
		<div className="group cursor-pointer rounded-lg border border-slate-500 bg-slate-700 shadow-sm hover:bg-slate-600">
			<div className="relative overflow-hidden rounded-lg">
				<Image
					src={packageItem.image}
					alt=""
					width={400}
					height={400}
					className="w-full rounded-t-lg transition-all group-hover:scale-105"
				/>
				<p className="text-primary absolute left-4 top-4 rounded-lg border bg-white p-1 px-2 font-bold backdrop-blur-sm">
					No.{packageItem.id}
				</p>
			</div>

			<div className="p-4">
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
					`${packageItem.amountTokenClaimed.toLocaleString()} $event`,
				)}
				{valuePackageItem(
					"Total Token claimed",
					`${packageItem.amountTokenRemaining.toLocaleString()} $event`,
				)}
				<Divider className="my-4" />
				{packageItem.claimable ? (
					<Button
						fullWidth
						className="from-primary border-primary border bg-gradient-to-r to-purple-400 font-bold"
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
