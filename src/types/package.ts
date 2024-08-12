export interface IPackage {
	id: number;
	buyer: string;
	buyTime: string;
	cliffTime: string;
	startClaimingTime: string;
	initialPercent: number;
	cycle: string;
	claimable: boolean;
	amountTokenClaimed: number;
	amountTokenRemaining: number;
	image: string;
	name?: string;
}
