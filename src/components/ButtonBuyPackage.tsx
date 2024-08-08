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

const mockPackage: IPackage = {
	id: 1,
	buyer: "0x0000000000000000000000000000000000000000",
	buyTime: "2022-01-01T00:00:00.000Z",
	cliffTime: "30 days",
	startClaimingTime: "2025-01-01T00:00:00.000Z",
	initialPercent: 10,
	cycle: "30 days",
	claimable: true,
	amountTokenClaimed: 1000,
	amountTokenRemaining: 1000,
	image: "https://i.seadn.io/s/raw/files/7b70c84c440c0470616c58fb01fb9546.png?auto=format&dpr=1&w=384",
};
export default function ButtonBuyPackage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const valueRenderer = (label: string, value: string | ReactNode) => {
		return (
			<div className="mt-2 flex items-center justify-between">
				<p className="text-sm">{label}</p>
				<p className="text-right text-lg font-bold">{value}</p>
			</div>
		);
	};

	return (
		<>
			<Button
				onPress={onOpen}
				fullWidth
				color="warning"
				startContent={<FaCartShopping />}
			>
				Buy Package Now
			</Button>
			<Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Confirm Buy Package
							</ModalHeader>
							<ModalBody>
								<div className="flex gap-4">
									<div className="h-[200px] w-[200px] overflow-hidden rounded-lg">
										<Image
											className="transition-all hover:scale-105"
											src={mockPackage.image}
											alt=""
											width={200}
											height={200}
										/>
									</div>
									<div className="flex-1">
										{valueRenderer(
											"Package ID",
											mockPackage.id,
										)}
										{valueRenderer(
											"Buyer",
											shortAddress(mockPackage.buyer),
										)}
										{valueRenderer(
											"Buy time",
											dayjs().format(
												"MMM DD, YYYY - HH:mm A",
											),
										)}
										{valueRenderer(
											"Start claiming time",
											dayjs(
												mockPackage.startClaimingTime,
											).format("MMM DD, YYYY - HH:mm A"),
										)}
										{valueRenderer(
											"Initial percent",
											`${mockPackage.initialPercent}%`,
										)}
										{valueRenderer(
											"Cycle",
											mockPackage.cycle,
										)}
										{valueRenderer(
											"Token claimable",
											<span className="text-yellow-500">
												2000 $event
											</span>,
										)}
										<Divider />
										{valueRenderer(
											"Price",
											<span className="text-green-500">
												10 SOL <br />{" "}
												<span className="text-sm">
													{" "}
													≈ $1,536.95
												</span>
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
