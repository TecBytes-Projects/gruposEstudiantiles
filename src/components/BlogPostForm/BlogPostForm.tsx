import classes from "./BlogPostForm.module.css";
import { blogPost } from "../../types/types";
import { useState } from "react";

/*
 * A form to submit information about an event
 */

interface BlogPostFormProps {
	data?: blogPost | null;
	handleCancel: () => void;
	handleConfirm: (data: any) => void;
}
function BlogPostForm({
	data,
	handleCancel,
	handleConfirm,
}: BlogPostFormProps) {
	// Set state values
	const [title, setTitle] = useState(data?.title || "");
	const [text, setText] = useState(data?.text || "");
	const [image, setImage] = useState(data?.image || "");
	//Form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleConfirm({
			title: title,
			text: text,
			image: image,
			date: new Date(),
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<label htmlFor="title">Título</label>
			<input
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor="text">Texto</label>
			<input
				name="descriptexttion"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<label htmlFor="image">Imagen</label>
			<input
				className={classes.inputImg}
				type="image"
				name="image"
				onChange={(event) => {
					if (event.target.files && event.target.files[0])
						setImage(URL.createObjectURL(event.target.files[0]));
				}}
			/>
			<div className={classes.btnContainer}>
				<button
					type="button"
					className={classes.cancelBtn}
					onClick={handleCancel}
				>
					Cancelar
				</button>
				<button type="submit" className={classes.confirmBtn}>
					Confirmar
				</button>
			</div>
		</form>
	);
}

export default BlogPostForm;
