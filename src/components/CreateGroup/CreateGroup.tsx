import classes from "./CreateGroup.module.css";
import GroupForm from "../GroupForm/GroupForm.tsx";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer.tsx";
/*
/ Create a group
*/
interface CreateGroupProps {
	handleClose: () => void;
	show: boolean;
}
function CreateGroup({ handleClose, show }: CreateGroupProps) {
	const { user } = useAuth();
	const handleCreate = (data: any) => {
		axios
			.post(`/grupos`, data, {
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
				<h2>Crear nuevo grupo</h2>
				<GroupForm handleCancel={handleClose} handleConfirm={handleCreate} />
			</section>
		</DetailsDrawer>
	);
}

export default CreateGroup;
