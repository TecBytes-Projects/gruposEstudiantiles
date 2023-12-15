import Modal from "../Modal/Modal.tsx";
import classes from "./ConfirmationDialog.module.css";

/*
/ A dialog that shows a message with options for confirmation
*/
interface ConfirmationDialogProps {
	message: string;
	handleCancel: () => void;
	handleConfirm: () => void;
	show: boolean;
}

function ConfirmationDialog({
	message,
	handleCancel,
	show,
	handleConfirm,
}: ConfirmationDialogProps) {
	return (
		<Modal show={show}>
			<div className={classes.mainContainer}>
				<p className={classes.label}>{message}</p>
				<div className={classes.btnContainer}>
					<button
						className={classes.cancelBtn}
						type="button"
						onClick={handleCancel}
					>
						Cancelar
					</button>
					<button
						className={classes.confirmBtn}
						type="button"
						onClick={() => {
							handleConfirm();
							handleCancel();
						}}
					>
						Confirmar
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default ConfirmationDialog;
