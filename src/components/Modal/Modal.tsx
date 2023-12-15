import classes from "./Modal.module.css";

/*
/ Modal component. Ment to be used as a container
*/
interface ModalProps {
	handleClose?: () => void;
	show: boolean;
	children: React.ReactNode;
}

function Modal({ show, children, handleClose }: ModalProps) {
	const showHideClassName =
		classes.modal + " " + (show ? classes.displayBlock : classes.displayNone);
	return (
		<div className={showHideClassName} onClick={handleClose}>
			<section className={classes.modalMain}>{children}</section>
		</div>
	);
}

export default Modal;
