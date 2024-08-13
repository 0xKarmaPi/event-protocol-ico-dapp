/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "i.seadn.io",
				port: "",
				pathname: "/**",
			},
			{
				hostname: "nftstorage.link",
				port: "",
				pathname: "/**",
			},
			{
				hostname: "gray-capitalist-cephalopod-696.mypinata.cloud",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
