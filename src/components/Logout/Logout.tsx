import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.tsx";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import { useNavigate } from "react-router-dom";
/*
 * Component for logging out
 */

interface LogoutProps {
	show: boolean;
	handleCancel: () => void;
}

function Logout({ show, handleCancel }: LogoutProps) {
	const { setUser } = useAuth();
	// Navigation
	const navigate = useNavigate();
	//Handle logout click
	const handleLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
		toast("Cerraste tu sesión");
		navigate("/");
	};
	return (
		<ConfirmationDialog
			message="¿Estás seguro de que deseas cerrar sesión?"
			show={show}
			handleCancel={handleCancel}
			handleConfirm={handleLogout}
		/>
	);
}

export default Logout;
