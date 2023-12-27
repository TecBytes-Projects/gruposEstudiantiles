import { useAuth } from "../../stateManagement/AuthContext";
import { useFetchDetails } from "../../customHooks/api";
import { groupDetails } from "../../types/types";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import ShowDetailsGroup from "../ShowDetailsGroup/ShowDetailsGroup";
import EditDetailsGroup from "../EditDetailsGroup/EditDetailsGroup";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { groupAtom } from "../../stateManagement/detailsAtoms";
import classes from "./GroupDetails.module.css";

/*
 * A drawer that shows details of a group
 */

interface GrupoDetailsProps {
	show: boolean;
	groupId: number;
	handleClose: () => void;
}

function GrupoDetails({ show, groupId, handleClose }: GrupoDetailsProps) {
	// Get details from API
	const { user } = useAuth();
	const details =
		useFetchDetails<groupDetails>(
			`grupos/${groupId}`,
			user ? user.token : null
		) || null;
	// Set data to shared state
	const [, setGroupDetails] = useAtom(groupAtom);
	useEffect(() => setGroupDetails(details), [details]);
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
				<EditDetailsGroup handleClose={handleCloseEditor} />
			) : (
				<ShowDetailsGroup />
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

export default GrupoDetails;
