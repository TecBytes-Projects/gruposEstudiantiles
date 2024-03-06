import classes from "./CreateBlogPost.module.css";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer.tsx";
import BlogPostForm from "../BlogPostForm/BlogPostForm.tsx";
/*
/ Create a blog post
*/
interface CreateBlogPostProps {
	handleClose: () => void;
	show: boolean;
}
function CreateBlogPost({ handleClose, show }: CreateBlogPostProps) {
	const { user } = useAuth();
	const handleCreate = (data: any) => {
		axios
			.post(`/blog`, data, {
				headers: {
					Authorization: "Bearer " + user?.token,
				},
			})
			.then(function () {
				toast("Se guardaron los cambios");
			})
			.catch(function (error: AxiosError) {
				toast("Ocurrió un error. No se guardaron los cambios");
				console.log(error);
			});
		handleClose();
	};
	return (
		<DetailsDrawer show={show} handleClose={handleClose}>
			<section className={classes.mainContainer}>
				<h2>Crear nuevo post</h2>
				<BlogPostForm handleCancel={handleClose} handleConfirm={handleCreate} />
			</section>
		</DetailsDrawer>
	);
}

export default CreateBlogPost;
