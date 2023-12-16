import { useAuth } from "../../context/AuthContext";
import { useFetchDetails } from "../../customHooks/api";
import { groupDetails } from "../../types/types";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";

/*
 * A drawer that shows details of a group
 */

interface GrupoDetailsProps {
	show: boolean;
	groupId: number;
	handleClose: () => void;
}

function GrupoDetails({ show, groupId, handleClose }: GrupoDetailsProps) {
	const { user } = useAuth();
	// Get details from API
	const details = useFetchDetails<groupDetails>(
		"grupos/" + groupId,
		user ? user.token : null
	);
	return (
		<DetailsDrawer show={show} handleClose={handleClose}>
			<p>{JSON.stringify(details)}</p>
		</DetailsDrawer>
	);
}

export default GrupoDetails;
