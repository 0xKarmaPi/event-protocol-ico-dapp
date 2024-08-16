export interface IPackage {
	id: number;
	buyer?: string;
	buyTime: string;
	cliffTime: string;
	startClaimingTime: string;
	initialPercent: number;
	cycle: string;
	amountTokenClaimed: number;
	amountTokenRemaining: number;
	image: string;
	name?: string;
	publicKey?: string;
	wrapperStatus?: {
		amountOfTokensClaimed: number;
		initTime: number | null;
		initialized: boolean;
		nftAddress: string;
		startTime: number | null;
	};
}
