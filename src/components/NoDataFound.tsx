import Image from "next/image";
import empty from "/public/assets/empty.png";

export default function NoDataFound({
	message = "No Data Found",
}: {
	message?: string;
}) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<Image src={empty} alt="Eventprotocol" />
			<p>{message}</p>
		</div>
	);
}
