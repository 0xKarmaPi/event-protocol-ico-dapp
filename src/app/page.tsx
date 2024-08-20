import Countdown from "@/components/Countdown";
import { Button } from "@nextui-org/react";
import { FaQuestion } from "react-icons/fa6";

export default function Home() {
	return (
		<section className="mx-auto mt-8 flex max-w-5xl flex-col-reverse justify-between gap-8 rounded-lg p-4 md:flex-row">
			<div className="order-2 flex-1 md:order-1">
				<h1 className="text-3xl font-bold md:text-5xl">
					Eventprotocol is IVO
				</h1>
				<p className="text-lg italic">
					Predict the Future, Shape the Outcome
				</p>
				<br />

				<p className="text-justify text-sm opacity-70">
					Empowering users to create and participate in prediction
					events with ease. Eventprotocol is a revolutionary platform
					that leverages blockchain technology to offer a secure,
					transparent, and decentralized environment for users to
					create, manage, and engage in prediction events.
					<br />
					<br /> Whether forecasting market trends, sports outcomes,
					or any event, Eventprotocol ensures a seamless and fair
					experience for all participants.
				</p>
				<Button
					className="mt-8"
					color="primary"
					variant="bordered"
					startContent={<FaQuestion />}
				>
					How to buy packages?
				</Button>
			</div>
			<div className="order-2 flex-1 md:order-1">
				<div className="flex justify-center">
					<Countdown
						targetDate="2024-12-31T23:59:59"
						totalRaised={2000}
						softCap={700000}
						hardCap={4000000}
						tokenEdition={8000000}
						discount={47}
					/>
				</div>
			</div>
		</section>
	);
}
