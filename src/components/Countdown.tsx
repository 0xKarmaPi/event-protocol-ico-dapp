"use client";

import { Progress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ButtonBuyPackage from "./ButtonBuyPackage";

interface CountdownProps {
	targetDate: string;
	totalRaised: number;
	softCap: number;
	hardCap: number;
	tokenEdition: number;
	discount: number;
}

const Countdown: React.FC<CountdownProps> = ({
	targetDate,
	totalRaised,
	softCap,
	hardCap,
}) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	const timerComponents: JSX.Element[] = [];

	Object.keys(timeLeft).forEach((interval) => {
		timerComponents.push(
			<div key={interval} className="flex flex-col items-center">
				<div className="text-3xl font-bold">
					{(timeLeft as any)[interval]}
				</div>
				<div className="text-sm">{interval}</div>
			</div>,
		);
	});

	return (
		<div className="from-primary mx-auto rounded-lg bg-gradient-to-br to-purple-800 p-6 text-white shadow-lg">
			<div className="mb-6 text-center">
				<h2 className="text-2xl font-bold">Eventprotocol IVO ends:</h2>
				<p>
					Total SOL to be raised: {totalRaised.toLocaleString()} SOL
				</p>
			</div>
			<div className="mb-6 grid grid-cols-4 gap-4">
				{timerComponents.length ? (
					timerComponents
				) : (
					<span>{`Time's up!`}</span>
				)}
			</div>
			<div className="mb-4">
				<Progress value={80} aria-label="Loading..." />
				<div className="mt-2 flex justify-between text-xs">
					<span>Soft Cap: {softCap.toLocaleString()}</span>
					<span>Hard Cap: {hardCap.toLocaleString()}</span>
				</div>
			</div>
			<p className="mb-6 text-center">
				Total packages: {Number(1000000).toLocaleString()} packages
			</p>
			<div className="mb-6 text-center">
				<ButtonBuyPackage />
			</div>
		</div>
	);
};

export default Countdown;
