import classes from "./CreateEvent.module.css";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer.tsx";
import EventForm from "../EventForm/EventForm.tsx";
/*
/ Create an event
*/
interface CreateEventProps {
	handleClose: () => void;
	show: boolean;
}
function CreateEvent({ handleClose, show }: CreateEventProps) {
	const { user } = useAuth();
	const handleCreate = (data: any) => {
		axios
			.post(`/events`, data, {
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
				<h2>Crear nuevo evento</h2>
				<EventForm handleCancel={handleClose} handleConfirm={handleCreate} />
			</section>
		</DetailsDrawer>
	);
}

export default CreateEvent;
