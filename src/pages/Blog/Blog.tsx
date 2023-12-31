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
	const [displayBlog, setDisplayBlog] = useState<blogPost[]>([]);
	const [nameSearch, setNameSearch] = useState<string>("");

	useEffect(() => {
		if (nameSearch.length > 0) {
			const newBlog = blog.filter((blogPost) =>
				blogPost.title.toLowerCase().includes(nameSearch)
			);
			setDisplayBlog(newBlog);
		}
		else{
			setDisplayBlog(blog);
		}
	}, [nameSearch, blog]);

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
					></input>
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
