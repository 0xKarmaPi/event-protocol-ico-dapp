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
		const targetTime = dayjs(endTime);
		const interval = setInterval(() => {
			const now = dayjs();
			const diff = targetTime.diff(now);

			if (diff <= 0) {
				setTimeRemaining(
					"00 days : 00 hours : 00 minutes : 00 seconds",
				);
				setIsDisabled(false);
				clearInterval(interval);
			} else {
				const duration = dayjs.duration(diff);
				const days = String(duration.days()).padStart(2, "0");
				const hours = String(duration.hours()).padStart(2, "0");
				const minutes = String(duration.minutes()).padStart(2, "0");
				const seconds = String(duration.seconds()).padStart(2, "0");
				setTimeRemaining(
					`${days} days : ${hours} h : ${minutes} m : ${seconds} s`,
				);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [endTime]);

	return (
		<Button variant="faded" disabled={isDisabled} color="warning" fullWidth>
			{isDisabled ? `${timeRemaining}` : "Claim Token"}
		</Button>
	);
};

export default CountdownButton;
