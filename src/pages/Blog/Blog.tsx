import classes from "./Blog.module.css";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard.tsx";
import axios, { AxiosResponse, AxiosError } from "axios";
import { blogPost } from "../../types/types.ts";
import { useEffect, useState } from "react";

/**
 * Blog page
 */
function Blog() {
	const [blog, setBlog] = useState<blogPost[]>([]);
	useEffect(() => {
		axios
			.get("/blog")
			.then(function (response: AxiosResponse) {
				setBlog(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
	}, []);
	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<h1>Blog</h1>
				{/*TODO: add button to add new post*/}
			</div>
			<div className={classes.cardContainer}>
					{blog.length > 0 ? (
						blog.map((blogPost) => <BlogPostCard key={blogPost.id} blogPost={blogPost}/>)
					) : (
						<p className={classes.errorText}>No hay posts para mostrar</p>
					)}
			</div>
		</section>
	);
}

export default Blog;
