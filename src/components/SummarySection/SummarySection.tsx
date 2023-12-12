import classes from "./SummarySection.module.css";
import { Link } from "react-router-dom";

interface SummarySectionProps {
	title: string;
	buttonText: string;
	buttonLink: string;
	children: React.ReactNode;
}

/**
 * A summary section. Renders card component that are passed as children. Does not include any type of scrolling. Meant for
 * just a few cards
 */
function SummarySection({
	title,
	buttonText,
	buttonLink,
	children,
}: SummarySectionProps) {
	return (
		<article className={classes.container}>
			<div className={classes.titleContainer}>
				<h2 className={classes.title}>{title}</h2>
				<Link to={buttonLink}>
					<button className={classes.button} type="button">
						{buttonText}
					</button>
				</Link>
			</div>
			<div className={classes.cardsContainer}>{children}</div>
		</article>
	);
}

export default SummarySection;
