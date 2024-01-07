import classes from "./EventForm.module.css";
import { event } from "../../types/types";
import { useState } from "react";

/*
 * A form to submit information about an event
 */

interface GroupFormProps {
	data?: event | null;
	handleCancel: () => void;
	handleConfirm: (data: any) => void;
}
function GroupForm({ data, handleCancel, handleConfirm }: GroupFormProps) {
	// Set state values
	const [title, setTitle] = useState(data?.title || "");
	const [date, setDate] = useState(data?.date || "");
	const [time, setTime] = useState(data?.time || "");
	const [place, setPlace] = useState(data?.place || "");
	const [description, setDescription] = useState(data?.description || "");
	//Form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleConfirm({
			title: title,
			date: date,
			time: time,
			place: place,
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
			<label htmlFor="date">Fecha</label>
			<input
				type="date"
				name="date"
				value={date}
				onChange={(e) => {
					setDate(e.target.value);
				}}
			/>
			<label htmlFor="time">Hora</label>
			<input
				type="time"
				name="time"
				value={time}
				onChange={(e) => {
					setTime(e.target.value);
				}}
			/>
			<label htmlFor="description">Descripción</label>
			<input
				name="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label htmlFor="place">Lugar</label>
			<input
				name="place"
				value={place}
				onChange={(e) => setPlace(e.target.value)}
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
