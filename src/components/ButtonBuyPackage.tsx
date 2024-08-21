"use client";

import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { shortAddress } from "@/utils/common";
import dayjs from "dayjs";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import nftIcon from "/public/assets/logo-text.jpg";
import {
	AMOUNT_TOKEN,
	CLIFF_TIME,
	CYCLE_TIME,
	INITIAL_PERCENT,
	PRICE_PER_PACKAGE,
} from "@/utils/constants";
import {
	generateSigner,
	some,
	transactionBuilder,
} from "@metaplex-foundation/umi";
import useUmi, {
	candyMachineAddress,
	collectionMintAddress,
	receivePaymentAddress,
} from "@/hooks/umi";
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { mintV2 } from "@metaplex-foundation/mpl-candy-machine";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/services/wallet";

export default function ButtonBuyPackage() {
	const [isPending, setPending] = useState(false);

	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const { connected, publicKey: walletAddress } = useWallet();
	const umi = useUmi();

	const { data: balance } = useQuery({
		queryKey: ["mybalance", walletAddress],
		queryFn: () => getWalletBalance(umi, walletAddress!),
	});

	const valueRenderer = (label: string, value: string | ReactNode) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-sm">{label}</p>
				<p className="text-right text-base font-bold">{value}</p>
			</div>
		);
	};

	const handleClickBuyPackage = () => {
		if (!connected) {
			toast("Please connect your wallet");
			return;
		}
		onOpen();
	};

	const handleConfirmBuyPackage = async () => {
		setPending(true);
		try {
			const collectionNft = await fetchDigitalAsset(
				umi,
				collectionMintAddress,
			);
			const nftMint = generateSigner(umi);
			const res = await transactionBuilder()
				.add(setComputeUnitLimit(umi, { units: 800_000 }))
				.add(
					mintV2(umi, {
						candyMachine: candyMachineAddress,
						nftMint: nftMint,
						collectionMint: collectionMintAddress,
						collectionUpdateAuthority:
							collectionNft.metadata.updateAuthority,
						mintArgs: {
							solPayment: some({
								destination: receivePaymentAddress,
							}),
						},
					}),
				)
				.sendAndConfirm(umi);
			if (res) {
				toast("Buy a package successfully", { type: "success" });
				onClose();
			}
		} catch (error) {
			toast("Error buying package", { type: "error" });
		} finally {
			setPending(false);
		}
	};
	return (
		<>
			<Button
				onPress={handleClickBuyPackage}
				fullWidth
				color="warning"
				startContent={<FaCartShopping />}
			>
				Buy Package Now
			</Button>
			<Modal
				className="bg-slate-800"
				placement="top"
				size="2xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Confirm Buy Package
							</ModalHeader>
							<ModalBody>
								<div className="flex gap-4">
									<div className="flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-lg">
										<Image
											className="rounded-lg"
											src={nftIcon}
											alt=""
											width={200}
											height={200}
										/>
									</div>
									<div className="flex-1">
										{valueRenderer(
											"Buyer",
											shortAddress(
												walletAddress?.toString(),
											),
										)}
										{valueRenderer(
											"Buy time",
											dayjs().format(
												"MMM DD, YYYY - HH:mm A",
											),
										)}
										{valueRenderer(
											"Cliff time",
											`${CLIFF_TIME / 86400000} days`,
										)}
										{valueRenderer(
											"Start claiming time",
											dayjs(
												new Date().getTime() +
													CLIFF_TIME,
											).format("MMM DD, YYYY - HH:mm A"),
										)}
										{valueRenderer(
											"Initial percent",
											`${INITIAL_PERCENT}%`,
										)}
										{valueRenderer(
											"Cycle",
											`${CYCLE_TIME / 86400000} days`,
										)}
										{valueRenderer(
											"Token claimable",
											<span className="text-yellow-500">
												{AMOUNT_TOKEN} $event
											</span>,
										)}
										<Divider />
										{valueRenderer(
											"Price",
											<span className="text-green-500">
												{PRICE_PER_PACKAGE} SOL <br />{" "}
											</span>,
										)}
										{valueRenderer(
											"Your Balance",
											<span className="text-green-500">
												{balance} SOL <br />{" "}
											</span>,
										)}
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => onClose()}
								>
									Cancel
								</Button>
								<Button
									isDisabled={
										(balance ?? 0) < PRICE_PER_PACKAGE
									}
									isLoading={isPending}
									color="primary"
									onPress={handleConfirmBuyPackage}
								>
									{(balance ?? 0) < PRICE_PER_PACKAGE
										? "Not enough SOL"
										: "Buy"}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
