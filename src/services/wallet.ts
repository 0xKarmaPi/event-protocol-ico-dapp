import { endpoint } from "@/hooks/umi";
import { IPackage } from "@/types/package";
import {
	AMOUNT_TOKEN,
	CLIFF_TIME,
	CYCLE_TIME,
	INITIAL_PERCENT,
} from "@/utils/constants";
import { EventProtocolIcoSc } from "@/utils/event_protocol_ico_sc";
import { web3, AnchorProvider, setProvider, Program } from "@coral-xyz/anchor";
import { fetchAllMetadataByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, Umi } from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
import idl from "@/utils/event_protocol_ico_sc.json";
import * as spl from "@solana/spl-token";

// Cache object to store fetched data
const cache: { [uri: string]: any } = {};
export const getMyPackages = async (
	umi: Umi,
	walletAddress: string,
	wallet: any,
): Promise<IPackage[]> => {
	const assets = await fetchAllMetadataByOwner(
		umi,
		publicKey(walletAddress ?? ""),
	);

	const jsonDatas = await Promise.all(
		assets
			.filter(
				(asset) =>
					(asset?.collection as any)?.value?.key ===
					process.env.NEXT_PUBLIC_COLLECTION_MINT_ADDRESS,
			)
			.map(async (asset) => {
				let wrapperStatus: any = {
					amountOfTokensClaimed: 0,
					initTime: null,
					initialized: false,
					startTime: null,
					nftAddress: asset.mint,
				};

				try {
					const wrapperStatusRaw = await getNftWrapperStatus(
						asset.mint,
						wallet,
					);
					wrapperStatus = {
						amountOfTokensClaimed:
							wrapperStatusRaw?.amountOfTokensClaimed?.toNumber(),
						initTime: wrapperStatusRaw?.initTime?.toNumber(),
						initialized: wrapperStatusRaw?.initialized,
						startTime: wrapperStatusRaw?.startTime?.toNumber(),
						nftAddress: wrapperStatusRaw?.nftAddress?.toBase58(),
					};
				} catch (error) {}

				// Fetch NFT metadata
				if (cache[asset.uri]) {
					return {
						...cache[asset.uri],
						publicKey: asset.mint,
						wrapperStatus: wrapperStatus,
					};
				} else {
					// Fetch the data and cache it
					const response = await fetch(asset.uri);
					const json = await response.json();
					cache[asset.uri] = json; // Store the fetched data in the cache
					return {
						...json,
						publicKey: asset.mint,
						wrapperStatus: wrapperStatus,
					};
				}
			}),
	);
	// Fetch time allow open package
	const programId = new web3.PublicKey(
		process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS!,
	);
	const program = new Program(idl as EventProtocolIcoSc);
	const [masterPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("master")],
		programId,
	);
	const masterPdaFetch = await program.account.master.fetch(masterPda);

	const packages: IPackage[] = jsonDatas?.map((json, index) => ({
		name: json.name,
		buyer: walletAddress?.toString(),
		amountTokenClaimed: json.wrapperStatus?.amountOfTokensClaimed ?? 0,
		amountTokenRemaining:
			AMOUNT_TOKEN - (json.wrapperStatus?.amountOfTokensClaimed ?? 0),
		image: json?.image ?? "",
		cliffTime: `${CLIFF_TIME / 86400000} days`,
		cycle: `${CYCLE_TIME / 86400000} days`,
		claimable: true,
		buyTime: "2022-01-01T00:00:00.000Z",
		id: index + 1,
		initialPercent: INITIAL_PERCENT,
		startClaimingTime: dayjs(new Date().getTime() + CLIFF_TIME).format(
			"MMM DD, YYYY - HH:mm A",
		),
		publicKey: json.publicKey,
		wrapperStatus: json.wrapperStatus,
		startTimeAllowOpenPackage: masterPdaFetch?.startSaleTime?.toNumber(),
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

const getNftWrapperStatus = async (nftPublicKey: string, wallet: any) => {
	const connection = new web3.Connection(endpoint);

	const provider = new AnchorProvider(connection, wallet!, {});
	setProvider(provider);

	const nft = new web3.PublicKey(nftPublicKey);

	const programId = new web3.PublicKey(
		process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS!,
	);

	const [wrapperPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("wrapper"), nft.toBuffer()],
		programId,
	);

	const program = new Program(idl as EventProtocolIcoSc);
	const wrapper = await program.account.wrapper.fetch(wrapperPda);

	return wrapper;
};

export const initPackageOfNft = async (nftPublicKey: string, wallet: any) => {
	const programId = new web3.PublicKey(
		process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS!,
	);
	const program = new Program(idl as EventProtocolIcoSc);
	const [masterPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("master")],
		programId,
	);
	const MPL_TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
		process.env.NEXT_PUBLIC_MPL_TOKEN_METADATA_PROGRAM_ID!,
	);
	const nft = new web3.PublicKey(nftPublicKey);
	const [wrapperPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("wrapper"), nft.toBuffer()],
		programId,
	);
	const [nftMetadataAccount] = web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("metadata"),
			MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
			nft.toBuffer(),
		],
		MPL_TOKEN_METADATA_PROGRAM_ID,
	);
	const senderNftAta = await spl.getAssociatedTokenAddress(
		nft,
		wallet.publicKey,
	);
	const connection = new web3.Connection(endpoint);

	const provider = new AnchorProvider(connection, wallet!, {});
	setProvider(provider);

	const intrucstion = await program.methods
		.initAWrapper(nft)
		.accountsStrict({
			master: masterPda,
			wrapper: wrapperPda,
			mintOfNft: nft,
			mintNftMetadataAccount: nftMetadataAccount,
			senderNftAta,
			signer: wallet.publicKey,
			systemProgram: web3.SystemProgram.programId,
		})
		.instruction();

	const transaction = new web3.Transaction().add(intrucstion);

	await provider.sendAndConfirm(transaction);
};

export const claimTokenOfNft = async (nftPublicKey: string, wallet: any) => {
	const programId = new web3.PublicKey(
		process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS!,
	);
	const MPL_TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
		process.env.NEXT_PUBLIC_MPL_TOKEN_METADATA_PROGRAM_ID!,
	);
	const program = new Program(idl as EventProtocolIcoSc);
	const [masterPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("master")],
		programId,
	);
	const nft = new web3.PublicKey(nftPublicKey);
	const [wrapperPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("wrapper"), nft.toBuffer()],
		programId,
	);
	const [nftMetadataAccount] = web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("metadata"),
			MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
			nft.toBuffer(),
		],
		MPL_TOKEN_METADATA_PROGRAM_ID,
	);
	const senderNftAta = await spl.getAssociatedTokenAddress(
		nft,
		wallet.publicKey,
	);

	const mint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT!);
	const [vaultEventTokenPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("vault_token"), mint.toBuffer()],
		programId,
	);
	const [vaultOwnerPda] = web3.PublicKey.findProgramAddressSync(
		[Buffer.from("vault_token_owner")],
		programId,
	);

	const connection = new web3.Connection(endpoint);
	const provider = new AnchorProvider(connection, wallet!, {});
	setProvider(provider);
	const senderEventTokenAta = await spl.getAssociatedTokenAddress(
		mint,
		wallet.publicKey,
	);

	const intrucstion = await program.methods
		.claimToken(nft)
		.accountsStrict({
			master: masterPda,
			wrapper: wrapperPda,
			mintOfNft: nft,
			senderNftAta,
			mintMetadataAccount: nftMetadataAccount,
			mintOfEventToken: mint,
			vaultOwnerPda,
			vaultEventToken: vaultEventTokenPda,
			senderEventTokenAta: senderEventTokenAta,
			signer: wallet.publicKey,
			systemProgram: web3.SystemProgram.programId,
			tokenProgram: spl.TOKEN_PROGRAM_ID,
			associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
		})
		.instruction();

	const transaction = new web3.Transaction().add(intrucstion);

	const res = await provider.sendAndConfirm(transaction);
	return res;
};
