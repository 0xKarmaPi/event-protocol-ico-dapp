"use client";

import { Button, Input } from "@nextui-org/react";
import sol from "/public/assets/solana.png";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useAdminInfo from "@/hooks/useAdminInfo";
import { FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CountdownButton from "@/components/my-packages/CountdownButton";
import { useMutation } from "@tanstack/react-query";
import { AnchorProvider, Program, setProvider, web3 } from "@coral-xyz/anchor";
import { EventProtocolToken } from "@/utils/event_protocol_token";
import idl from "@/utils/event_protocol_token.json";
import { endpoint } from "@/hooks/umi";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { redirect } from "next/navigation";

export default function AdminPage() {
	const { foundationAddress, startTimeAllowSplitToken, isAdmin } =
		useAdminInfo();
	const wallet = useAnchorWallet();
	const connection = new web3.Connection(endpoint);

	const provider = new AnchorProvider(
		connection,
		wallet as unknown as AnchorWallet,
		{},
	);
	setProvider(provider);
	const [wallets, setWallets] = useState({
		foundation: {
			address: "",
		},
		contraction: {
			address: process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS,
		},
	});
	useEffect(() => {
		if (foundationAddress) {
			setWallets((prev) => ({
				...prev,
				foundation: {
					...prev.foundation,
					address: foundationAddress,
				},
			}));
		}
	}, [foundationAddress]);

	const splitToken = async () => {
		const programId = new web3.PublicKey(
			process.env.NEXT_PUBLIC_ADMIN_PROGRAM_ID!,
		);
		const saleContractProgramId = new web3.PublicKey(
			process.env.NEXT_PUBLIC_IVO_CONTRACT_ADDRESS!,
		);
		const mintOfEventToken = new web3.PublicKey(
			process.env.NEXT_PUBLIC_TOKEN_MINT!,
		);
		const foundationPubkey = new web3.PublicKey(
			process.env.NEXT_PUBLIC_RECEIVE_PAYMENT_ADDRESS!,
		);
		const program = new Program(idl as EventProtocolToken);
		const [masterPda] = web3.PublicKey.findProgramAddressSync(
			[Buffer.from("master")],
			programId,
		);
		const [vaultEventTokenOwnerPda] = web3.PublicKey.findProgramAddressSync(
			[Buffer.from("vault_event_token_owner")],
			programId,
		);
		const [saleContractVaultEventToken] = PublicKey.findProgramAddressSync(
			[Buffer.from("vault_token"), mintOfEventToken.toBuffer()],
			saleContractProgramId,
		);
		const [vaultEventTokenPda] = web3.PublicKey.findProgramAddressSync(
			[Buffer.from("vault_event_token"), mintOfEventToken.toBuffer()],
			programId,
		);
		const foundationEventToken = spl.getAssociatedTokenAddressSync(
			mintOfEventToken,
			foundationPubkey,
		);
		const [saleContractVaultEventTokenOwner] =
			web3.PublicKey.findProgramAddressSync(
				[Buffer.from("vault_token_owner")],
				saleContractProgramId,
			);

		const splitIx = await program.methods
			.splitEventToken()
			.accountsStrict({
				master: masterPda,
				vaultEventTokenOwner: vaultEventTokenOwnerPda,
				mintOfEventToken,
				vaultEventToken: vaultEventTokenPda,
				foundationEventToken,
				saleContractVaultEventToken: saleContractVaultEventToken,
				foundationAddress: foundationPubkey,
				saleContractAddress: saleContractProgramId,
				saleContractVaultOwnerPda: saleContractVaultEventTokenOwner,
				associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
				rent: web3.SYSVAR_RENT_PUBKEY,
				signer: wallet?.publicKey,
				systemProgram: web3.SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			})
			.instruction();

		const transaction = new web3.Transaction().add(splitIx);
		const transactionLog = await provider.sendAndConfirm(transaction);
		return transactionLog;
	};
	const mutateSplitToken = useMutation({
		mutationFn: splitToken,
		mutationKey: ["splitToken"],
		onSuccess: () => {
			toast("Success split token", { type: "success" });
		},
		onError: (error) => {
			toast("Error split token", { type: "error" });
		},
	});
	const renderButton = useMemo(() => {
		const timeAllowSplitToken = dayjs(
			Number(startTimeAllowSplitToken) * 1000,
		);
		const now = new Date();
		if (dayjs(now).isBefore(timeAllowSplitToken)) {
			return <CountdownButton endTime={timeAllowSplitToken.format()} />;
		}
		return (
			<Button
				isLoading={mutateSplitToken.isPending}
				onClick={() => mutateSplitToken.mutate()}
				className="border border-primary bg-gradient-to-r from-primary to-purple-400 font-bold"
			>
				Start Split token
			</Button>
		);
	}, [startTimeAllowSplitToken, mutateSplitToken.isPending]);

	if (!isAdmin) {
		return redirect("/");
	}

	return (
		<section className="mx-auto max-w-xl p-4">
			<h1 className="text-2xl font-bold">Adminstration Wallet</h1>
			<div className="mt-4 grid grid-cols-1 gap-4">
				<div className="col-span-1 flex gap-4 rounded-lg bg-slate-800 p-4">
					<Image
						src={sol}
						width={70}
						height={70}
						alt=""
						className="h-[70px] w-[70px]"
					/>
					<div className="flex-1">
						<div>
							<h2>Foundation Wallet</h2>
							<div className="flex items-center gap-2 text-sm text-gray-300">
								<Input
									isReadOnly
									className="flex-1"
									variant="faded"
									onChange={(e) => {
										setWallets((prev) => ({
											...prev,
											foundation: {
												...prev.foundation,
												address: e.target.value,
											},
										}));
									}}
									value={wallets.foundation.address}
								/>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(
											wallets.foundation.address!,
										);
										toast("Copied successfully", {
											type: "success",
										});
									}}
									variant="faded"
									startContent={<FaCopy />}
									isIconOnly
								></Button>
							</div>
						</div>
						<br />
						<div>
							<h2>Contraction Wallet</h2>
							<div className="flex items-center gap-2 text-sm text-gray-300">
								<Input
									readOnly
									className="flex-1"
									variant="faded"
									onChange={(e) => {
										setWallets((prev) => ({
											...prev,
											contraction: {
												...prev.contraction,
												address: e.target.value,
											},
										}));
									}}
									value={wallets.contraction.address}
								/>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(
											wallets.contraction.address!,
										);
										toast("Copied successfully", {
											type: "success",
										});
									}}
									variant="faded"
									startContent={<FaCopy />}
									isIconOnly
								></Button>
							</div>
						</div>
					</div>
				</div>
				{renderButton}
			</div>
		</section>
	);
}
