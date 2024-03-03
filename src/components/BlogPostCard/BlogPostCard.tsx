import classes from "./BlogPostCard.module.css";
import { blogPost } from "../../types/types.ts";

interface EventCardProps {
	blogPost: blogPost;
	handleBlogPostClick: (id: number) => void;
}

/**
 * A card for displaying blog posts. Ment to be used inside a cards container.
 */
function BlogPostCard({ blogPost, handleBlogPostClick }: EventCardProps) {
	return (
		<div
			className={classes.container}
			onClick={() => handleBlogPostClick(blogPost.id)}
		>
			<h2 className={classes.title}>{blogPost.title}</h2>
			<p className={classes.date}>{blogPost.date}</p>
			<img className={classes.image} src={blogPost.image} />
		</div>
	);
}

export default BlogPostCard;
