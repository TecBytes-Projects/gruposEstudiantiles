import classes from "./Blog.module.css";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard.tsx";
import { blogPost } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { useFetch } from "../../customHooks/api.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

/**
 * Blog page
 */
function Blog() {
	//Get blog posts from API
	const { token } = useAuth();
	const blog = useFetch<blogPost>("/blog", token);
	//Filtered blog posts list
	const [displayBlog, setDisplayBlog] = useState<blogPost[]>([]);
	//Search field string
	const [nameSearch, setNameSearch] = useState<string>("");
	//Search by name
	useEffect(() => {
		if (nameSearch.length > 0) {
			const newBlog = blog.filter((blogPost) =>
				blogPost.title.toLowerCase().includes(nameSearch)
			);
			setDisplayBlog(newBlog);
		} else {
			setDisplayBlog(blog);
		}
	}, [nameSearch, blog]);
	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<div className={classes.textContainer}>
					<h1>Blog</h1>
				</div>
				<div className={classes.actionsContainer}>
					<input
						value={nameSearch}
						type="text"
						placeholder="Buscar"
						onChange={(e) => {
							setNameSearch(e.target.value.toLowerCase());
						}}
					/>
				</div>

				{/*TODO: add button to add new post*/}
			</div>
			<div className={classes.cardContainer}>
				{displayBlog.length > 0 ? (
					displayBlog.map((blogPost) => (
						<BlogPostCard key={blogPost.id} blogPost={blogPost} />
					))
				) : (
					<p className={classes.errorText}>No hay posts para mostrar</p>
				)}
			</div>
		</section>
	);
}

export default Blog;
