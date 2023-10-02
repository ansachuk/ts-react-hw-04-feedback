import { useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Statistics from "./Statistics/Statistics";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Section from "./Section/Section";
import Notification from "./Notification/Notification";

import { Options } from "../types/types";

const feedbackTitles: Array<keyof typeof Options> = ["good", "neutral", "bad"];

export default function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const countTotalFeedback = () => {
		return good + neutral + bad;
	};

	const countPositiveFeedbackPercentage = (): number => {
		const FeedbackPercentage = (good / countTotalFeedback()) * 100;
		return Math.round(FeedbackPercentage);
	};

	const onControlClick = (title: keyof typeof Options): void => {
		Notify.info("Thank for your feedback!");

		switch (title) {
			case Options.good:
				setGood(prev => prev + 1);
				break;

			case Options.neutral:
				setNeutral(prev => prev + 1);
				break;

			case Options.bad:
				setBad(prev => prev + 1);
				break;

			default:
				Notify.failure("This type of feedback not availeble!");
		}
	};

	return (
		<>
			<Section title="Please leave feedback">
				<FeedbackOptions options={feedbackTitles} onLeaveFeedback={onControlClick} />

				{countTotalFeedback() ? (
					<Statistics good={good} neutral={neutral} bad={bad} total={countTotalFeedback()} positivePercentage={countPositiveFeedbackPercentage()} />
				) : (
					<Notification message="There is no feedback!" />
				)}
			</Section>
		</>
	);
}
