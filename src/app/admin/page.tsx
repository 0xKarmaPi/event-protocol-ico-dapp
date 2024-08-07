import { shortAddress } from "@/utils/common";
import { Button } from "@nextui-org/react";
import { FiCopy } from "react-icons/fi";
import sol from "/public/assets/solana.png";
import phantom from "/public/assets/phantom-icon.png";

import Image from "next/image";

export default function AdminPage() {
	const mock = {
		foundation: {
			address: "0x0000000000000000000000000000000000000000",
			balance: 500000.02,
			usd: 536526.124,
		},
		contraction: {
			address: "0x12400000000000000000000000000000000000000",
			balance: 125.361,
			usd: 125.361,
		},
	};
	return (
		<section className="mx-auto max-w-5xl p-4">
			<h1 className="text-2xl font-bold">Adminstration Wallet</h1>
			<div className="mt-4 grid grid-cols-4 gap-4">
				<div className="col-span-2 flex gap-4 rounded-lg bg-slate-800 p-4">
					<Image
						src={sol}
						width={70}
						height={70}
						alt=""
						className="h-[70px] w-[70px]"
					/>
					<div className="flex-1">
						<div className="flex w-full justify-between">
							<div>
								<h2>Foundation Wallet</h2>
								<div className="flex items-center gap-1 text-sm text-gray-300">
									<Image
										src={phantom}
										width={20}
										height={20}
										alt=""
										className="h-[20px] w-[20px]"
									/>
									{shortAddress(mock.foundation.address)}
									<FiCopy />
								</div>
							</div>
							<Button variant="flat" color="danger">
								Disconnect
							</Button>
						</div>
						<p className="mt-2">Total Balance:</p>
						<p className="text-4xl font-bold text-green-400">
							{mock.foundation.balance.toLocaleString()}{" "}
							<span className="text-lg">SOL</span>
						</p>
						<p className="text-2xl font-bold text-green-400">
							≈ ${mock.foundation.usd.toLocaleString()}{" "}
							<span className="text-base">USD</span>
						</p>
					</div>
				</div>
				<div className="col-span-2 flex gap-4 rounded-lg bg-slate-800 p-4">
					<Image
						src={sol}
						width={70}
						height={70}
						alt=""
						className="h-[70px] w-[70px]"
					/>
					<div className="flex-1">
						<div className="flex w-full justify-between">
							<div>
								<h2>Contraction Wallet</h2>
								{/* <div className="flex items-center gap-1 text-sm text-gray-300">
									{shortAddress(mock.foundation.address)}
									<FiCopy />
								</div> */}
							</div>
							<Button variant="flat" color="primary">
								Setup Wallet
							</Button>
						</div>

						<p className="mt-2">Total Balance:</p>
						<p className="text-red-400">
							Please setup your wallet first!
						</p>
						{/* <p className="text-4xl font-bold text-green-400">
							{mock.contraction.balance.toLocaleString()}{" "}
							<span className="text-lg">SOL</span>
						</p>
						<p className="text-2xl font-bold text-green-400">
							≈ ${mock.contraction.usd.toLocaleString()}{" "}
							<span className="text-lg">USD</span>
						</p> */}
					</div>
				</div>
			</div>
		</section>
	);
}
