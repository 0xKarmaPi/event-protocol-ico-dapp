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
	title: "Eventprotocol IVO",
	description: "Eventprotocol IVO dApp",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={cx(
					inter.className,
					"min-h-screen bg-gradient-to-tr from-slate-800 via-default-200 to-blue-950 font-sans antialiased dark",
				)}
			>
				<AppProvider>
					<ToastContainer theme="light" />
					<Header />
					{children}
				</AppProvider>
			</body>
		</html>
	);
}
