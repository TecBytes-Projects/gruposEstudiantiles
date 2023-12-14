import classes from "./ForgottenPassword.module.css";
import FloatingContainer from "../../components/FloatingContainer/FloatingContainer";
import { useNavigate } from "react-router-dom";

/**
 * Restore password page
 */
function RecuperContrasenia() {
	//Navigation
	const navigate = useNavigate();
	//Go back to previous if cancelled
	const handleCancelled = () => {
		navigate(-1);
	};

	return (
		<FloatingContainer>
			<h1 className={classes.title}>Recuperar Contraseña</h1>
			<p className={classes.text}>
				Ingresa tu correo para recuperar tu contraseña.
			</p>
			<form className={classes.form}>
				<div className={classes.inputBoxes}>
					<input className={classes.input} placeholder="Correo" type="text" />
				</div>
				<div className={classes.btnGroup}>
					<button
						className={classes.btn + " " + classes.cancelar}
						onClick={handleCancelled}
					>
						Cancelar
					</button>
					<button className={classes.btn + " " + classes.continuar}>
						Continuar
					</button>
				</div>
			</form>
		</FloatingContainer>
	);
}

export default RecuperContrasenia;
