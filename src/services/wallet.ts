import { IPackage } from "@/types/package";
import { AMOUNT_TOKEN, CLIFF_TIME, INITIAL_PERCENT } from "@/utils/constants";
import { fetchAllMetadataByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, Umi } from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
// Cache object to store fetched data
const cache: { [uri: string]: any } = {};

export const getMyPackages = async (
	umi: Umi,
	walletAddress: PublicKey,
): Promise<IPackage[]> => {
	const assets = await fetchAllMetadataByOwner(umi, publicKey(walletAddress));

	const jsonDatas = await Promise.all(
		assets
			.filter(
				(asset) =>
					(asset?.collection as any)?.value?.key ===
					process.env.NEXT_PUBLIC_COLLECTION_MINT_ADDRESS,
			)
			.map(async (asset) => {
				// Check if the data is already in the cache
				if (cache[asset.uri]) {
					return cache[asset.uri];
				}
				// Fetch the data and cache it
				const response = await fetch(asset.uri);
				const json = await response.json();
				cache[asset.uri] = json; // Store the fetched data in the cache
				return json;
			}),
	);

	const packages: IPackage[] = jsonDatas?.map((json, index) => ({
		name: json.name,
		buyer: walletAddress.toString(),
		amountTokenClaimed: 0,
		amountTokenRemaining: AMOUNT_TOKEN,
		image: json?.image ?? "",
		cliffTime: `${CLIFF_TIME / 86400000} days`,
		cycle: `${CLIFF_TIME / 86400000} days`,
		claimable: true,
		buyTime: "2022-01-01T00:00:00.000Z",
		id: index + 1,
		initialPercent: INITIAL_PERCENT,
		startClaimingTime: dayjs(new Date().getTime() + CLIFF_TIME).format(
			"MMM DD, YYYY - HH:mm A",
		),
	}));

	return packages;
};

export const getWalletBalance = async (
	umi: Umi,
	walletAddress: PublicKey,
): Promise<number> => {
	const balance = await umi.rpc.getBalance(publicKey(walletAddress));
	return Number(balance.basisPoints) / Number(10 ** balance.decimals);
};
