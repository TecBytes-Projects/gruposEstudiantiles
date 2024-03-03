import { useAuth } from "../../stateManagement/AuthContext";
import { useFetchDetails } from "../../customHooks/api";
import { blogPost, event } from "../../types/types";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { blogPostAtom, eventAtom } from "../../stateManagement/detailsAtoms";
import classes from "./BlogPostDetails.module.css";
import EditBlogPostDetails from "../EditBlogPostDetails/EditBlogPostDetails";
import ShowBlogPostDetails from "../ShowBlogPostDetails/ShowBlogPostDetails";

/*
 * A drawer that shows details of a blog post
 */

interface BlogPostDetailsProps {
	show: boolean;
	blogPostId: number;
	handleClose: () => void;
}

function BlogPostDetails({
	show,
	blogPostId,
	handleClose,
}: BlogPostDetailsProps) {
	// Get details from API
	const { user } = useAuth();
	const details =
		useFetchDetails<blogPost>(`blog/${blogPostId}`, user ? user.token : null) ||
		null;
	// Set data to shared state
	const [, setBlogPostDetails] = useAtom(blogPostAtom);
	useEffect(() => setBlogPostDetails(details), [details]);
	// State variable for editing
	const [editing, setEditing] = useState(false);
	const handleCloseEditor = () => {
		setEditing(false);
	};
	const handleOpenEditor = () => {
		setEditing(true);
	};
	return (
		<DetailsDrawer show={show} handleClose={handleClose}>
			{editing ? (
				<EditBlogPostDetails handleClose={handleCloseEditor} />
			) : (
				<ShowBlogPostDetails />
			)}
			<div className={classes.btnContainer}>
				{details?.isAuthorizedToEdit && !editing ? (
					<button className={classes.btnEdit} onClick={handleOpenEditor}>
						Editar
					</button>
				) : null}
			</div>
		</DetailsDrawer>
	);
}

export default BlogPostDetails;
