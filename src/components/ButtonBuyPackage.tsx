import { IPackage } from "@/types/package";
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
import { ReactNode } from "react";
import { shortAddress } from "@/utils/common";
import dayjs from "dayjs";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import nftIcon from "/public/assets/nft.png";
import {
	AMOUNT_TOKEN,
	CLIFF_TIME,
	CYCLE_TIME,
	INITIAL_PERCENT,
	PRICE_PER_PACKAGE,
} from "@/utils/constants";

export default function ButtonBuyPackage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { publicKey, connected } = useWallet();

	const valueRenderer = (label: string, value: string | ReactNode) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-sm">{label}</p>
				<p className="text-right text-lg font-bold">{value}</p>
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
											className="transition-all hover:scale-105"
											src={nftIcon}
											alt=""
											width={200}
											height={200}
										/>
									</div>
									<div className="flex-1">
										{valueRenderer(
											"Buyer",
											shortAddress(publicKey?.toString()),
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
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Cancel
								</Button>
								<Button color="primary" onPress={onClose}>
									Buy
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
