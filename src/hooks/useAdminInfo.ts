import { EventProtocolToken } from "@/utils/event_protocol_token";
import { web3, AnchorProvider, setProvider, Program } from "@coral-xyz/anchor";
import {
	useAnchorWallet,
	AnchorWallet,
	useWallet,
} from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { endpoint } from "./umi";
import idlAdmin from "@/utils/event_protocol_token.json";

const useAdminInfo = () => {
	const { publicKey: walletAddress, connected } = useWallet();

	const wallet = useAnchorWallet();
	const connection = new web3.Connection(endpoint);

	const provider = new AnchorProvider(
		connection,
		wallet as unknown as AnchorWallet,
		{},
	);
	setProvider(provider);

	const { data: adminInfo } = useQuery({
		queryKey: ["admin-info", walletAddress],
		queryFn: async () => {
			const programId = new web3.PublicKey(
				process.env.NEXT_PUBLIC_ADMIN_PROGRAM_ID!,
			);
			const program = new Program(idlAdmin as EventProtocolToken);
			const [masterPda] = web3.PublicKey.findProgramAddressSync(
				[Buffer.from("master")],
				programId,
			);

			const connection = new web3.Connection(endpoint);

			const provider = new AnchorProvider(connection, wallet!, {});
			setProvider(provider);
			const master = await program.account.master.fetch(masterPda);
			return master;
		},
	});
	return {
		isAdmin:
			connected &&
			adminInfo?.admin?.toString() === walletAddress?.toString(),
		adminWalletAddress: adminInfo?.admin?.toString(),
		foundationAddress: adminInfo?.foundationAddress?.toString(),
		startTimeAllowSplitToken: adminInfo?.startTime?.toNumber(),
	};
};

export default useAdminInfo;
