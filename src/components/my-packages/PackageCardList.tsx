import { IPackage } from "@/types/package";
import PackageCardItem from "./PackageCardItem";
import { Card, Skeleton } from "@nextui-org/react";

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
		image: "https://i.seadn.io/s/raw/files/7b70c84c440c0470616c58fb01fb9546.png?auto=format&dpr=1&w=384",
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
		image: "https://i.seadn.io/s/raw/files/de7bb80b79b8020a472628bee308d68b.png?auto=format&dpr=1&w=384",
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
		image: "https://i.seadn.io/s/raw/files/ed3d2679da33c6eb4bdc4cf48f36c905.png?auto=format&dpr=1&w=384",
	},
];
export default function PackageCardList() {
	const loading = false;

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
