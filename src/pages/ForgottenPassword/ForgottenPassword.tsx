import classes from "./ForgottenPassword.module.css";
import FloatingContainer from "../../components/FloatingContainer/FloatingContainer";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState } from "react";

/**
 * Forgotten password page
 */

interface response {
	message: string;
}

interface errorResponse {
	message: string;
}

function ForgottenPassword() {
	const [email, setEmail] = useState<string | null>();
	const [errorMessage, setErrorMessage] = useState<string | null>();
	const [emailSent, setEmailSent] = useState<boolean>(false);
	//Handle continue click
	const handleContinue = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		axios
			.post<response>("/password-recovery", {
				email: email,
			})
			.then(function () {
				setEmailSent(true);
				setErrorMessage(null);
			})
			.catch(function (error: AxiosError<errorResponse> | AxiosError) {
				if (error.response) {
					console.log(error.response);
					const errorResponseMessage = (error.response.data as errorResponse)
						.message;
					setErrorMessage(errorResponseMessage);
				} else if (error.request) {
					console.log("network error");
				} else {
					console.log("error");
					console.log(error);
				}
			});
	};
	//Navigation
	const navigate = useNavigate();
	//Go back to previous if cancelled
	const handleCancelled = () => {
		navigate(-1);
	};
	const handleGoToLogin = () => {
		navigate("/login");
	};

	return (
		<FloatingContainer>
			<h1 className={classes.title}>Recuperar Contraseña</h1>
			<p className={classes.text}>
				{emailSent
					? "Se ha enviado un mensaje a tu correo para recuperar tu contraseña."
					: "Ingresa tu correo para recuperar tu contraseña."}
			</p>
			<form className={classes.form}>
				<div className={classes.inputBoxes}>
					{emailSent ? null : (
						<input
							className={classes.input}
							placeholder="Correo"
							type="text"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					)}
				</div>
				{errorMessage ? (
					<p className={classes.errorMessage}>{errorMessage}</p>
				) : null}
				<div className={classes.btnGroup}>
					{emailSent ? (
						<button
							className={classes.btn + " " + classes.continuar}
							onClick={handleGoToLogin}
						>
							Ir a inicio de sesión
						</button>
					) : (
						<>
							<button
								className={classes.btn + " " + classes.cancelar}
								onClick={handleCancelled}
							>
								Cancelar
							</button>
							<button
								className={classes.btn + " " + classes.continuar}
								onClick={handleContinue}
							>
								Continuar
							</button>
						</>
					)}
				</div>
			</form>
		</FloatingContainer>
	);
}

export default ForgottenPassword;
