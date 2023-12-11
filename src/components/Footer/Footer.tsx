import classes from "./Footer.module.css";
import { IconContext } from "react-icons";
import { FaInstagram } from "react-icons/fa";

/**
 * Footer
 */
function Footer() {
	return (
		<footer className={classes.footer}>
			<div className={classes.left}>
				<p className={classes.text}>Hecho por TecBytes</p>
			</div>
			<div className={classes.right}>
				<p className={classes.text}>
					Sigue las redes de Grupos Estudiantiles
				</p>
				<IconContext.Provider value={{ color: "var(--color-main-blue)", size: "50px" }}>
					<FaInstagram />
				</IconContext.Provider>
			</div>
		</footer>
	);
}

export default Footer;
