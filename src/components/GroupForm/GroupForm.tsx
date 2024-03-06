import classes from "./GroupForm.module.css";
import { groupDetails } from "../../types/types";
import { useState } from "react";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext";

/*
 * A form to submit information about a group
 */

interface GroupFormProps {
	data?: groupDetails | null;
	handleCancel: () => void;
	handleConfirm: (data: any) => void;
}
function GroupForm({ data, handleCancel, handleConfirm }: GroupFormProps) {
	// Set state values
	const [name, setName] = useState(data?.name || "");
	const [description, setDescription] = useState(data?.description || "");
	const [mision, setMision] = useState(data?.mision || "");
	const [vision, setVision] = useState(data?.vision || "");
	const [nameAsesor, setNameAsesor] = useState(data?.nameAsesor || "");
	const [category, setCategory] = useState(data?.category || "");
	const [logo, setLogo] = useState(data?.logo);
	const [contact, setContact] = useState(data?.contact);
	//Get categories
	const { user } = useAuth();
	const categories = useFetch<string>(
		"/grupos/categories",
		user ? user.token : null
	);
	//Form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleConfirm({
			name: name,
			description: description,
			mision: mision,
			vision: vision,
			nameAsesor: nameAsesor,
			category: category,
			logo: logo,
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<label htmlFor="name">Nombre</label>
			<input
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="description">Descripción</label>
			<input
				name="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label htmlFor="mision">Misión</label>
			<input
				name="mision"
				value={mision}
				onChange={(e) => setMision(e.target.value)}
			/>
			<label htmlFor="vision">Visión</label>
			<input
				name="vision"
				value={vision}
				onChange={(e) => setVision(e.target.value)}
			/>
			<label htmlFor="nameAsesor">Asesor</label>
			<input
				name="nameAsesor"
				value={nameAsesor}
				onChange={(e) => setNameAsesor(e.target.value)}
			/>
			<label htmlFor="contact">Contacto</label>
			<input
				name="contact"
				value={contact}
				onChange={(e) => setContact(e.target.value)}
			/>
			<label htmlFor="category">Giro</label>
			<select
				name="category"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			>
				{categories.map((category) => (
					<option value={category} key={category}>
						{category}
					</option>
				))}
			</select>
			<label htmlFor="logo">Imagen</label>
			<input
				className={classes.inputImg}
				type="file"
				accept="image/png, image/gif, image/jpeg"
				name="myImage"
				onChange={(event) => {
					if (event.target.files && event.target.files[0])
						setLogo(URL.createObjectURL(event.target.files[0]));
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

export default GroupForm;
