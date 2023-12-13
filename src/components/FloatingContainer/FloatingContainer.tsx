import classes from "./FloatingContainer.module.css";

interface FloatingContainerProps {
	children: React.ReactNode;
}

function FloatingContainer({ children }: FloatingContainerProps) {
	return (
		<section className={classes.mainContainer}>
			<div className={classes.overlap}>{children}</div>
		</section>
	);
}

export default FloatingContainer;
