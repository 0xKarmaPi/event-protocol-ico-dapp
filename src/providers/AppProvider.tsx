"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWalletProvider from "./AppWalletProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AppWalletProvider>
			<NextUIProvider locale="en-US">
				<SessionProvider>
					<QueryClientProvider client={queryClient}>
						<main>{children}</main>
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</SessionProvider>
			</NextUIProvider>
		</AppWalletProvider>
	);
}
