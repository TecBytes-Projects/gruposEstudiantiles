import classes from "./DetailsDrawer.module.css";
import { IoIosArrowBack } from "react-icons/io";

/*
/ DetailsDrawer component. A drawer that takes up all the screen. Ment to be used as a container. 
*/
interface ModalProps {
	handleClose?: () => void;
	show: boolean;
	children: React.ReactNode;
}

function DetailsDrawer({ show, children, handleClose }: ModalProps) {
	const showHideClassName =
		classes.modal + " " + (show ? classes.displayBlock : classes.displayNone);
	return (
		<div className={showHideClassName} onClick={handleClose}>
			<section
				className={
					classes.modalMain + " " + (show ? classes.open : classes.close)
				}
				onClick={(e) => e.stopPropagation()}
			>
				<div>
					<IoIosArrowBack
						onClick={handleClose}
						size={50}
						className={classes.backBtn}
					/>
				</div>
				{children}
			</section>
		</div>
	);
}

export default DetailsDrawer;
