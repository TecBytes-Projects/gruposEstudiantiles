import { useAtom } from "jotai";
import { groupAtom } from "../../stateManagement/detailsAtoms";

/*
/ Details of a group
*/
interface EditDetailsGroupProps {
	handleClose: () => void;
}
function EditDetailsGroup({ handleClose }: EditDetailsGroupProps) {
	const [data] = useAtom(groupAtom);
	return <h1>Editor {data?.description}</h1>;
}

export default EditDetailsGroup;
