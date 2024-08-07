/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "i.seadn.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
