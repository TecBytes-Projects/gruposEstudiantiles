import classes from "./BlogPostCard.module.css";
import { blogPost } from "../../types/types.ts";

interface EventCardProps {
	blogPost: blogPost;
}

/**
 * A card for displaying blog posts. Ment to be used inside a cards container.
 */
function BlogPostCard({ blogPost }: EventCardProps) {
	return (
		<div className={classes.container}>
			<h2 className={classes.title}>{blogPost.title}</h2>
			<p className={classes.date}>{blogPost.date}</p>
			<img className={classes.image} src={blogPost.image}/>
		</div>
	);
}

export default BlogPostCard;
