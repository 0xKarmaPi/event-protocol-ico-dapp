"use client";

import {
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useAdminInfo from "@/hooks/useAdminInfo";

export const NAV_BARS = [
	{
		name: "IVO Details",
		path: "/",
	},
	{
		name: "My Packages",
		path: "/my-packages",
	},
];
export default function Header() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isAdmin } = useAdminInfo();

	return (
		<Navbar
			className="bg-slate-800"
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={isMenuOpen}
		>
			{/* Mobile menu */}
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle
					className="text-white"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
				<Logo />
			</NavbarContent>
			<NavbarMenu className="z-50">
				{NAV_BARS.map((item) => (
					<NavbarMenuItem
						key={item.name}
						onClick={() => setIsMenuOpen(false)}
					>
						<Link
							className={clsx("text-foreground", {
								"font-bold !text-primary":
									pathname === item.path,
							})}
							href={item.path}
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>

			{/* Desktop menu */}
			<NavbarContent className="hidden flex-1 gap-4 sm:flex">
				<Logo />
			</NavbarContent>
			<NavbarContent
				className="hidden flex-1 gap-8 sm:flex"
				justify="center"
			>
				{NAV_BARS.map((item) => (
					<NavbarItem key={item.name}>
						<Link
							className={clsx("text-center text-foreground", {
								"font-bold !text-primary":
									pathname === item.path,
							})}
							href={item.path}
						>
							{item.name}
						</Link>
					</NavbarItem>
				))}
				{isAdmin && (
					<NavbarItem>
						<Link
							className={clsx("text-center text-foreground", {
								"font-bold !text-primary":
									pathname === "/admin",
							})}
							href={"/admin"}
						>
							Admin Portal
						</Link>
					</NavbarItem>
				)}
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<WalletMultiButton />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
