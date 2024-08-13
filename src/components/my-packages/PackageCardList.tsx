"use client";

import PackageCardItem from "./PackageCardItem";
import { Card, Skeleton } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import useUmi from "@/hooks/umi";
import { useQuery } from "@tanstack/react-query";
import { getMyPackages } from "@/services/wallet";
import NoDataFound from "../NoDataFound";

export default function PackageCardList() {
	const { connected, publicKey: walletAddress } = useWallet();

	const umi = useUmi();

	const { data: packages, isFetching } = useQuery({
		queryKey: ["my-packages"],
		queryFn: () => getMyPackages(umi, walletAddress!),
		enabled: !!walletAddress,
	});

	if (!connected) {
		return (
			<div className="text-center text-foreground">
				Please connect your wallet first.
			</div>
		);
	}
	if (isFetching) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, index) => (
					<Card key={index} className="space-y-5 p-4" radius="lg">
						<Skeleton className="rounded-lg">
							<div className="h-[200px] rounded-lg bg-default-300"></div>
						</Skeleton>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
					</Card>
				))}
			</div>
		);
	}
	return (
		<>
			{packages?.length === 0 && (
				<NoDataFound message="No packages found" />
			)}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{packages?.map((item) => (
					<PackageCardItem key={item.id} packageItem={item} />
				))}
			</div>
		</>
	);
}
