/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/event_protocol_ico_sc.json`.
 */
export type EventProtocolIcoSc = {
	address: "3iFSXD1ANyYX7LXa7F4pwgq6LRrT3dXJWiP25uZSb2k7";
	metadata: {
		name: "eventProtocolIcoSc";
		version: "0.1.0";
		spec: "0.1.0";
		description: "Created with Anchor";
	};
	instructions: [
		{
			name: "claimToken";
			discriminator: [116, 206, 27, 191, 166, 19, 0, 73];
			accounts: [
				{
					name: "master";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [109, 97, 115, 116, 101, 114];
							},
						];
					};
				},
				{
					name: "wrapper";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [119, 114, 97, 112, 112, 101, 114];
							},
							{
								kind: "arg";
								path: "nftAddress";
							},
						];
					};
				},
				{
					name: "mintOfNft";
				},
				{
					name: "senderNftAta";
					writable: true;
				},
				{
					name: "mintMetadataAccount";
					docs: ["CHECK"];
					writable: true;
				},
				{
					name: "mintOfEventToken";
				},
				{
					name: "vaultOwnerPda";
					docs: ["CHECK"];
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
									95,
									111,
									119,
									110,
									101,
									114,
								];
							},
						];
					};
				},
				{
					name: "vaultEventToken";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
					};
				},
				{
					name: "senderEventTokenAta";
					writable: true;
				},
				{
					name: "signer";
					writable: true;
					signer: true;
				},
				{
					name: "systemProgram";
					address: "11111111111111111111111111111111";
				},
				{
					name: "tokenProgram";
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
				},
			];
			args: [
				{
					name: "nftAddress";
					type: "pubkey";
				},
			];
		},
		{
			name: "depositEventToken";
			discriminator: [99, 238, 73, 237, 111, 134, 238, 209];
			accounts: [
				{
					name: "master";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [109, 97, 115, 116, 101, 114];
							},
						];
					};
				},
				{
					name: "mintOfEventToken";
				},
				{
					name: "vaultOwnerPda";
					docs: ["CHECK"];
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
									95,
									111,
									119,
									110,
									101,
									114,
								];
							},
						];
					};
				},
				{
					name: "vaultEventToken";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
					};
				},
				{
					name: "senderEventTokenAta";
					writable: true;
				},
				{
					name: "signer";
					writable: true;
					signer: true;
				},
				{
					name: "systemProgram";
					address: "11111111111111111111111111111111";
				},
				{
					name: "tokenProgram";
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
				},
				{
					name: "rent";
					address: "SysvarRent111111111111111111111111111111111";
				},
			];
			args: [
				{
					name: "amount";
					type: "u64";
				},
			];
		},
		{
			name: "hello";
			discriminator: [149, 118, 59, 220, 196, 127, 161, 179];
			accounts: [];
			args: [];
		},
		{
			name: "initAWrapper";
			discriminator: [64, 46, 109, 204, 183, 53, 7, 11];
			accounts: [
				{
					name: "master";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [109, 97, 115, 116, 101, 114];
							},
						];
					};
				},
				{
					name: "wrapper";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [119, 114, 97, 112, 112, 101, 114];
							},
							{
								kind: "arg";
								path: "nftAddress";
							},
						];
					};
				},
				{
					name: "mintOfNft";
				},
				{
					name: "mintNftMetadataAccount";
					docs: ["CHECK"];
					writable: true;
				},
				{
					name: "senderNftAta";
					writable: true;
				},
				{
					name: "signer";
					writable: true;
					signer: true;
				},
				{
					name: "systemProgram";
					address: "11111111111111111111111111111111";
				},
			];
			args: [
				{
					name: "nftAddress";
					type: "pubkey";
				},
			];
		},
		{
			name: "initMaster";
			discriminator: [168, 49, 22, 248, 228, 56, 111, 24];
			accounts: [
				{
					name: "master";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [109, 97, 115, 116, 101, 114];
							},
						];
					};
				},
				{
					name: "signer";
					writable: true;
					signer: true;
				},
				{
					name: "systemProgram";
					address: "11111111111111111111111111111111";
				},
			];
			args: [
				{
					name: "nftCollectionAddress";
					type: "pubkey";
				},
				{
					name: "startSaleTime";
					type: "u64";
				},
				{
					name: "endSaleTime";
					type: "u64";
				},
				{
					name: "cliffTime";
					type: "u64";
				},
				{
					name: "cycle";
					type: "u64";
				},
			];
		},
		{
			name: "initVaultEventToken";
			discriminator: [106, 35, 160, 42, 188, 38, 59, 206];
			accounts: [
				{
					name: "master";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [109, 97, 115, 116, 101, 114];
							},
						];
					};
				},
				{
					name: "mintOfEventToken";
				},
				{
					name: "vaultOwnerPda";
					docs: ["CHECK"];
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
									95,
									111,
									119,
									110,
									101,
									114,
								];
							},
						];
					};
				},
				{
					name: "vaultEventToken";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "const";
								value: [
									118,
									97,
									117,
									108,
									116,
									95,
									116,
									111,
									107,
									101,
									110,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
					};
				},
				{
					name: "signer";
					writable: true;
					signer: true;
				},
				{
					name: "systemProgram";
					address: "11111111111111111111111111111111";
				},
				{
					name: "tokenProgram";
					address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
				},
			];
			args: [];
		},
	];
	accounts: [
		{
			name: "master";
			discriminator: [168, 213, 193, 12, 77, 162, 58, 235];
		},
		{
			name: "wrapper";
			discriminator: [161, 11, 109, 119, 86, 61, 163, 136];
		},
	];
	errors: [
		{
			code: 6000;
			name: "masterIsAlreadyInitialized";
			msg: "Master is already initialized";
		},
		{
			code: 6001;
			name: "invalidTimeRange";
			msg: "Invalid time range";
		},
		{
			code: 6002;
			name: "invalidCliffTime";
			msg: "Invalid cliff time";
		},
		{
			code: 6003;
			name: "invalidCycle";
			msg: "Invalid cycle";
		},
		{
			code: 6004;
			name: "vaultEventTokenIsAlreadyInitialized";
			msg: "Vault EVENT token is already initialized";
		},
		{
			code: 6005;
			name: "vaultEventTokenIsNotInitialized";
			msg: "Vault EVENT token is not initialized";
		},
		{
			code: 6006;
			name: "invalidAmount";
			msg: "Invalid amount";
		},
		{
			code: 6007;
			name: "cliffTimeNotReachedYet";
			msg: "Cliff time not reached yet";
		},
		{
			code: 6008;
			name: "wrapperNotInitialized";
			msg: "Wrapper not initialized";
		},
		{
			code: 6009;
			name: "wrapperIdIsNotValid";
			msg: "wrapper_id is not valid";
		},
		{
			code: 6010;
			name: "collectionKeyIsNotValid";
			msg: "Collection key is not valid";
		},
		{
			code: 6011;
			name: "wrapperAlreadyInitialized";
			msg: "Wrapper already initialized";
		},
		{
			code: 6012;
			name: "youAreNotTheOwnerOfTheNft";
			msg: "You are not the owner of the NFT";
		},
		{
			code: 6013;
			name: "requiredAnNft";
			msg: "Required an NFT";
		},
		{
			code: 6014;
			name: "noClaimableAmount";
			msg: "No claimable amount";
		},
	];
	types: [
		{
			name: "master";
			type: {
				kind: "struct";
				fields: [
					{
						name: "initialized";
						type: "bool";
					},
					{
						name: "owner";
						type: "pubkey";
					},
					{
						name: "vaultInitialized";
						type: "bool";
					},
					{
						name: "nftCollectionAddress";
						type: "pubkey";
					},
					{
						name: "startSaleTime";
						type: "u64";
					},
					{
						name: "endSaleTime";
						type: "u64";
					},
					{
						name: "cliffTime";
						type: "u64";
					},
					{
						name: "cycle";
						type: "u64";
					},
					{
						name: "totalWrapper";
						type: "u64";
					},
					{
						name: "totalSoldWrapper";
						type: "u64";
					},
					{
						name: "tokenPerWrapper";
						type: "u64";
					},
				];
			};
		},
		{
			name: "wrapper";
			type: {
				kind: "struct";
				fields: [
					{
						name: "initialized";
						type: "bool";
					},
					{
						name: "nftAddress";
						type: "pubkey";
					},
					{
						name: "initTime";
						type: "u64";
					},
					{
						name: "startTime";
						type: "u64";
					},
					{
						name: "amountOfTokensClaimed";
						type: "u64";
					},
				];
			};
		},
	];
};
