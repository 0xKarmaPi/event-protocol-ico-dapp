"use client";

import {
	Button,
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Logo from "./Logo";
import { NAV_BARS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
								"!text-primary font-bold":
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
							className={clsx("text-foreground text-center", {
								"!text-primary font-bold":
									pathname === item.path,
							})}
							href={item.path}
						>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<Link href={"/admin"}>
						<Button className="from-primary bg-gradient-to-tr to-purple-400 text-white">
							Connect Wallet
						</Button>
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
