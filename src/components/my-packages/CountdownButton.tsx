import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Button } from "@nextui-org/react";

// Extend dayjs with duration plugin
dayjs.extend(duration);

interface CountdownButtonProps {
	endTime: string; // Pass the endTime as a string in ISO format or any format dayjs can parse
}

const CountdownButton: React.FC<CountdownButtonProps> = ({ endTime }) => {
	const [timeRemaining, setTimeRemaining] = useState<string>("");
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	useEffect(() => {
		const interval = setInterval(() => {
			const difference = +new Date(endTime) - +new Date();

			if (difference <= 0) {
				setTimeRemaining(
					"00 months : 00 days : 00 hours : 00 minutes : 00 seconds",
				);
				setIsDisabled(false);
				clearInterval(interval);
			} else {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / 1000 / 60) % 60);
				const seconds = Math.floor((difference / 1000) % 60);
				setTimeRemaining(
					`${days} days : ${hours} h : ${minutes} m : ${seconds} s`,
				);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [endTime]);

	return (
		<Button variant="faded" disabled={isDisabled} color="primary" fullWidth>
			{isDisabled ? `${timeRemaining}` : "Claim Token"}
		</Button>
	);
};

export default CountdownButton;
