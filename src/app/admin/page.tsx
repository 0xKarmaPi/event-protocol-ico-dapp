"use client";

import { Button, Input } from "@nextui-org/react";
import sol from "/public/assets/solana.png";
import Image from "next/image";
import { useState } from "react";
import useAdminInfo from "@/hooks/useAdminInfo";
import { redirect } from "next/navigation";

export default function AdminPage() {
	const { isAdmin } = useAdminInfo();

	const [wallets, setWallets] = useState({
		foundation: {
			address: "0x12",
			balance: 500000.02,
		},
		contraction: {
			address: "",
			balance: 0,
		},
	});
	if (!isAdmin) {
		return redirect("/");
	}

	return (
		<section className="mx-auto max-w-5xl p-4">
			<h1 className="text-2xl font-bold">Adminstration Wallet</h1>
			<div className="mt-4 grid grid-cols-2 gap-4">
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
								<Button variant="flat" color="primary">
									Save
								</Button>
							</div>
						</div>
						<div className="mt-2 flex items-end justify-between">
							<div>
								<p className="mt-2">Total Balance:</p>
								<p className="text-3xl font-bold text-green-400">
									{wallets.foundation.balance.toLocaleString()}{" "}
									<span className="text-lg">SOL</span>
								</p>
							</div>
							{/* <Button variant="flat" color="danger">
								Disconnect
							</Button> */}
						</div>
					</div>
				</div>
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
								<Button variant="flat" color="primary">
									Save
								</Button>
							</div>
						</div>
						<div className="mt-2 flex items-end justify-between">
							<div>
								<p className="mt-2">Total Balance:</p>
								<p className="text-3xl font-bold text-green-400">
									{wallets.contraction?.balance?.toLocaleString()}{" "}
									<span className="text-lg">SOL</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
