import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

interface ErrorPageProps {
	message?: string;
}
function ErrorPage({ message }: ErrorPageProps) {
	return (
		<section className={classes.mainContainer}>
			<h1>{message ? message : "La página que buscas no se encontró"}</h1>
			<p className={classes.text}>
				Ponte en contacto con un administrador si crees que es un error
			</p>
			<Link to="/">
				<button className={classes.button} type="button">
					Volver a inicio
				</button>
			</Link>
		</section>
	);
}

export default ErrorPage;
