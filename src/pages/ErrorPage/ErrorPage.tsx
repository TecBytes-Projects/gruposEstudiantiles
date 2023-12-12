import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<section className={classes.mainContainer}>
			<h1>La página que buscas no se encontró</h1>
			<p className={classes.text}>Error 404 - Page not found</p>
			<Link to="/">
				<button className={classes.button} type="button">
					Volver a inicio
				</button>
			</Link>
		</section>
	);
}

export default ErrorPage;
