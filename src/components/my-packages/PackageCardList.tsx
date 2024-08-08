"use client";

import { IPackage } from "@/types/package";
import PackageCardItem from "./PackageCardItem";
import { Card, Skeleton } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import nftIcon from "/public/assets/nft.png";

const packages: IPackage[] = [
	{
		id: 1,
		buyer: "0x0000000000000000000000000000000000000000",
		buyTime: "2022-01-01T00:00:00.000Z",
		cliffTime: "30 days",
		startClaimingTime: "2022-01-01T00:00:00.000Z",
		initialPercent: 10,
		cycle: "30 days",
		claimable: true,
		amountTokenClaimed: 1000,
		amountTokenRemaining: 1000,
		image: "/assets/nft.png",
	},
	{
		id: 2,
		buyer: "0x0000000000000000000000000000000000000000",
		buyTime: "2022-01-01T00:00:00.000Z",
		cliffTime: "60 days",
		startClaimingTime: "2022-01-01T00:00:00.000Z",
		initialPercent: 20,
		cycle: "30 days",
		claimable: true,
		amountTokenClaimed: 500,
		amountTokenRemaining: 1500,
		image: "/assets/nft.png",
	},
	{
		id: 3,
		buyer: "0x0000000000000000000000000000000000000000",
		buyTime: "2022-01-01T00:00:00.000Z",
		cliffTime: "90days",
		startClaimingTime: "2022-01-01T00:00:00.000Z",
		initialPercent: 50,
		cycle: "30 days",
		claimable: false,
		amountTokenClaimed: 2000,
		amountTokenRemaining: 0,
		image: "/assets/nft.png",
	},
];
export default function PackageCardList() {
	const loading = false;
	const { connected } = useWallet();

	if (!connected) {
		return (
			<div className="text-foreground text-center">
				Please connect your wallet first.
			</div>
		);
	}
	if (loading) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, index) => (
					<Card className="space-y-5 p-4" radius="lg">
						<Skeleton className="rounded-lg">
							<div className="bg-default-300 h-[200px] rounded-lg"></div>
						</Skeleton>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="bg-default-200 h-3 w-3/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="bg-default-300 h-3 w-2/5 rounded-lg"></div>
							</Skeleton>
						</div>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="bg-default-200 h-3 w-3/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="bg-default-300 h-3 w-2/5 rounded-lg"></div>
							</Skeleton>
						</div>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="bg-default-200 h-3 w-3/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="bg-default-300 h-3 w-2/5 rounded-lg"></div>
							</Skeleton>
						</div>
					</Card>
				))}
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{packages.map((item) => (
				<PackageCardItem key={item.id} packageItem={item} />
			))}
		</div>
	);
}
