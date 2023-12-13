import classes from "./RecuperarContrasenia.module.css";
import FloatingContainer from "../../components/FloatingContainer/FloatingContainer";

function RecuperContrasenia() {
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
					<button className={classes.btn + " " + classes.cancelar}>
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
