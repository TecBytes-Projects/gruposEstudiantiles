import { useAuth } from "../../stateManagement/AuthContext";
import { useFetchDetails } from "../../customHooks/api";
import { event } from "../../types/types";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { eventAtom } from "../../stateManagement/detailsAtoms";
import classes from "./EventDetails.module.css";
import ShowEventDetails from "../ShowEventDetails/ShowEventDetails";
import EditEventDetails from "../EditEventDetails/EditEventDetails";

/*
 * A drawer that shows details of an event
 */

interface EventDetailsProps {
	show: boolean;
	eventId: number;
	handleClose: () => void;
}

function EventDetails({ show, eventId, handleClose }: EventDetailsProps) {
	// Get details from API
	const { user } = useAuth();
	const details =
		useFetchDetails<event>(`events/${eventId}`, user ? user.token : null) ||
		null;
	// Set data to shared state
	const [, setEventDetails] = useAtom(eventAtom);
	useEffect(() => setEventDetails(details), [details]);
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
				<EditEventDetails handleClose={handleCloseEditor} />
			) : (
				<ShowEventDetails />
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

export default EventDetails;
