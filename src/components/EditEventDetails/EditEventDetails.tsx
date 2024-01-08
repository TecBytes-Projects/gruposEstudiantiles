import classes from "./EditEventDetails.module.css";
import { useAtom } from "jotai";
import { eventAtom } from "../../stateManagement/detailsAtoms";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import EventForm from "../EventForm/EventForm.tsx";
/*
/ Edit details of an event
*/
interface EditEventDetailsProps {
	handleClose: () => void;
}
function EditEventDetails({ handleClose }: EditEventDetailsProps) {
	const [data] = useAtom(eventAtom);
	const { user } = useAuth();
	const handleEdit = (data: any) => {
		axios
			.post(`/events/${data.id}`, data, {
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
			<EventForm
				handleCancel={handleClose}
				handleConfirm={handleEdit}
				data={data}
			/>
		</section>
	);
}

export default EditEventDetails;
