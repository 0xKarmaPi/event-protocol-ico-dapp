export const COOKIES = {
	ACCESSTOKEN: "accessToken",
	REFRESHTOKEN: "refreshToken",
};

export const NAV_BARS = [
	{
		name: "IVO Details",
		path: "/",
	},
	{
		name: "My Packages",
		path: "/my-packages",
	},
	// {
	// 	name: "Admin Portal",
	// 	path: "/admin",
	// },
];

export const CLIFF_TIME = 60 * 24 * 60 * 60 * 1000; // 60 days to miliseconds
export const CYCLE_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days to miliseconds
export const INITIAL_PERCENT = 10; // 10%
export const AMOUNT_TOKEN = 5000; // 5000 TOKENS per package
export const PRICE_PER_PACKAGE = 1; // 1 SOL per package
export const MIN_TOKEN_CLAIMABLE_PER_CYCLE = 500; // 500 TOKENS per cycle
