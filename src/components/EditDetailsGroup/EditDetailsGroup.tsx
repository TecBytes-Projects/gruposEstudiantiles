import classes from "./EditDetailsGroup.module.css";
import { useAtom } from "jotai";
import { groupAtom } from "../../stateManagement/detailsAtoms";
import GroupForm from "../GroupForm/GroupForm.tsx";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
/*
/ Details of a group
*/
interface EditDetailsGroupProps {
	handleClose: () => void;
}
function EditDetailsGroup({ handleClose }: EditDetailsGroupProps) {
	const [data] = useAtom(groupAtom);
	const { user } = useAuth();
	const handleEdit = (data: any) => {
		axios
			.post(`/grupos/${data.id}`, data, {
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
			<GroupForm
				handleCancel={handleClose}
				handleConfirm={handleEdit}
				data={data}
			/>
		</section>
	);
}

export default EditDetailsGroup;
