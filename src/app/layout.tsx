import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppProvider from "@/providers/AppProvider";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Eventprotocol ICO",
	description: "Eventprotocol ICO dApp",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cx(
					inter.className,
					"via-default-200 dark min-h-screen bg-gradient-to-tr from-slate-800 to-blue-950 font-sans antialiased",
				)}
			>
				<ToastContainer theme="light" />
				<AppProvider>
					<Header />
					{children}
				</AppProvider>
			</body>
		</html>
	);
}
