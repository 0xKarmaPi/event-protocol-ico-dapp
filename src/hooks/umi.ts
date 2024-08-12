import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { publicKey } from "@metaplex-foundation/umi";

export const network = WalletAdapterNetwork.Devnet;
export const endpoint = clusterApiUrl(network);
export const candyMachineAddress = publicKey(
	process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS!,
);
export const collectionMintAddress = publicKey(
	process.env.NEXT_PUBLIC_COLLECTION_MINT_ADDRESS!,
);
export const receivePaymentAddress = publicKey(
	process.env.NEXT_PUBLIC_RECEIVE_PAYMENT_ADDRESS!,
);

const useUmi = () => {
	const wallet = useWallet();

	// Create Umi instance
	const umi = createUmi(endpoint)
		.use(mplTokenMetadata())
		.use(mplCandyMachine())
		.use(dasApi())
		// Register Wallet Adapter to Umi
		.use(walletAdapterIdentity(wallet));

	return umi;
};

export default useUmi;
