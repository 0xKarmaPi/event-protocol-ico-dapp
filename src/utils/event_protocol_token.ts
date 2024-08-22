/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/event_protocol_token.json`.
 */
export type EventProtocolToken = {
	address: "7AKNwCkSvf1ACnCxJBHZMvinFhnmrTCRvhQDiTqEmr7h";
	metadata: {
		name: "eventProtocolToken";
		version: "0.1.0";
		spec: "0.1.0";
		description: "Created with Anchor";
	};
	instructions: [
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
					name: "vaultEventTokenOwner";
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
									101,
									118,
									101,
									110,
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
									101,
									118,
									101,
									110,
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
					name: "senderEventTokenAccount";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "account";
								path: "signer";
							},
							{
								kind: "const";
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
						program: {
							kind: "const";
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
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
					name: "admin";
					type: "pubkey";
				},
				{
					name: "startTime";
					type: "u64";
				},
				{
					name: "endTime";
					type: "u64";
				},
				{
					name: "foundationAddress";
					type: "pubkey";
				},
				{
					name: "saleContractVaultOwnerPda";
					type: "pubkey";
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
					name: "vaultEventTokenOwner";
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
									101,
									118,
									101,
									110,
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
					name: "mintOfEventToken";
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
									101,
									118,
									101,
									110,
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
				{
					name: "rent";
					address: "SysvarRent111111111111111111111111111111111";
				},
			];
			args: [];
		},
		{
			name: "splitEventToken";
			discriminator: [247, 74, 192, 156, 60, 187, 233, 44];
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
					name: "vaultEventTokenOwner";
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
									101,
									118,
									101,
									110,
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
					name: "mintOfEventToken";
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
									101,
									118,
									101,
									110,
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
					name: "foundationEventToken";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "account";
								path: "foundationAddress";
							},
							{
								kind: "const";
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
						program: {
							kind: "const";
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					name: "saleContractVaultEventToken";
					writable: true;
				},
				{
					name: "foundationAddress";
					docs: ["CHECK"];
				},
				{
					name: "saleContractAddress";
					docs: ["CHECK"];
				},
				{
					name: "saleContractVaultOwnerPda";
					docs: ["CHECK"];
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
					name: "associatedTokenProgram";
					address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
				},
				{
					name: "rent";
					address: "SysvarRent111111111111111111111111111111111";
				},
			];
			args: [];
		},
		{
			name: "withdrawEventToken";
			discriminator: [177, 229, 255, 253, 115, 57, 10, 48];
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
					name: "vaultEventTokenOwner";
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
									101,
									118,
									101,
									110,
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
									101,
									118,
									101,
									110,
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
					name: "senderEventTokenAccount";
					writable: true;
					pda: {
						seeds: [
							{
								kind: "account";
								path: "signer";
							},
							{
								kind: "const";
								value: [
									6,
									221,
									246,
									225,
									215,
									101,
									161,
									147,
									217,
									203,
									225,
									70,
									206,
									235,
									121,
									172,
									28,
									180,
									133,
									237,
									95,
									91,
									55,
									145,
									58,
									140,
									245,
									133,
									126,
									255,
									0,
									169,
								];
							},
							{
								kind: "account";
								path: "mintOfEventToken";
							},
						];
						program: {
							kind: "const";
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
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
				{
					name: "total";
					type: "bool";
				},
			];
		},
	];
	accounts: [
		{
			name: "master";
			discriminator: [168, 213, 193, 12, 77, 162, 58, 235];
		},
	];
	errors: [
		{
			code: 6000;
			name: "startTimeNotReached";
			msg: "The start time is not reached yet";
		},
		{
			code: 6001;
			name: "amountOfEventTokenIsNotEnough";
			msg: "The amount of event token is not enough";
		},
	];
	types: [
		{
			name: "master";
			type: {
				kind: "struct";
				fields: [
					{
						name: "owner";
						type: "pubkey";
					},
					{
						name: "admin";
						type: "pubkey";
					},
					{
						name: "startTime";
						type: "u64";
					},
					{
						name: "endTime";
						type: "u64";
					},
					{
						name: "foundationAddress";
						type: "pubkey";
					},
					{
						name: "saleContractVaultOwnerPda";
						type: "pubkey";
					},
				];
			};
		},
	];
};
