import classes from "./BlogSummaryCard.module.css";
import { blogPost } from "../../types/types.ts";

interface EventSummaryCardProps {
	blogPost: blogPost;
}

/**
 * A card for displaying blog posts. Ment to be used inside a cards container.
 */
function EventsSummaryCard({ blogPost }: EventSummaryCardProps) {
	return (
		<div className={classes.container}>
			<h2 className={classes.title}>{blogPost.title}</h2>
			<p className={classes.date}>{blogPost.date}</p>
			<img src={blogPost.image} className={classes.image}></img>
		</div>
	);
}

export default EventsSummaryCard;
