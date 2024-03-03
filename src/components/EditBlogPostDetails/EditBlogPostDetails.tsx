import classes from "./EditBlogPostDetails.module.css";
import { useAtom } from "jotai";
import { blogPostAtom } from "../../stateManagement/detailsAtoms";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import BlogPostForm from "../BlogPostForm/BlogPostForm.tsx";
/*
/ Edit details of a blog post
*/
interface EditBlogPostDetailsProps {
	handleClose: () => void;
}
function EditBlogPostDetails({ handleClose }: EditBlogPostDetailsProps) {
	const [data] = useAtom(blogPostAtom);
	const { user } = useAuth();
	const handleEdit = (data: any) => {
		axios
			.post(`/blog/${data.id}`, data, {
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
		<section className={classes.mainContainer}>
			<h2>Editar</h2>
			<BlogPostForm
				handleCancel={handleClose}
				handleConfirm={handleEdit}
				data={data}
			/>
		</section>
	);
}

export default EditBlogPostDetails;
