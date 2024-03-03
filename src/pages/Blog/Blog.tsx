import classes from "./Blog.module.css";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard.tsx";
import { blogPost } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { useFetch } from "../../customHooks/api.tsx";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostDetails from "../../components/BlogPostDetails/BlogPostDetails.tsx";

/**
 * Blog page
 */
function Blog() {
	const navigate = useNavigate();
	//Get blog posts from API
	const { user } = useAuth();
	const blog = useFetch<blogPost>("/blog", user ? user.token : null);
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
	//Open blog post details
	const handleBlogPostClick = (id: number) => {
		navigate("/blog/" + id);
	};
	//Varible for showing details
	const blogPostId = useParams();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	useEffect(() => {
		if (blogPostId.id) setShowDetails(true);
	}, [blogPostId]);
	//Close the details panel
	const handleCloseDetails = () => {
		navigate("/blog");
	};
	return (
		<>
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
							<BlogPostCard
								key={blogPost.id}
								blogPost={blogPost}
								handleBlogPostClick={handleBlogPostClick}
							/>
						))
					) : (
						<p className={classes.errorText}>No hay posts para mostrar</p>
					)}
				</div>
			</section>
			{blogPostId.id ? (
				<BlogPostDetails
					key={blogPostId.id}
					show={showDetails}
					blogPostId={Number(blogPostId.id)}
					handleClose={handleCloseDetails}
				/>
			) : null}
		</>
	);
}

export default Blog;
