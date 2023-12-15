import classes from "./Modal.module.css";

/*
/ Modal component. Ment to be used as a container
*/
interface ModalProps {
	handleClose?: React.MouseEventHandler<HTMLButtonElement>;
	show: boolean;
	children: React.ReactNode;
}

function Modal({ show, children }: ModalProps) {
	const showHideClassName =
		classes.modal + " " + (show ? classes.displayBlock : classes.displayNone);
	return (
		<div className={showHideClassName}>
			<section className={classes.modalMain}>{children}</section>
		</div>
	);
}

export default Modal;
