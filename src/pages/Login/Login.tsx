import classes from "./Login.module.css";
import FloatingContainer from "../../components/FloatingContainer/FloatingContainer";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { user } from "../../types/types.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

interface errorResponse {
	message: string;
}

interface loginResponse {
	message: string;
	token: string;
	user: user;
}

/**
 * Login page
 */
function Login() {
	// Modifyng the global state to store auth info
	const { setToken, setUser } = useAuth();
	//Navigation
	const navigate = useNavigate();
	//Authentication credentials
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	//Error message
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	//Handle login click
	const handleLogin = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		axios
			.post<loginResponse>("/login", {
				email: email,
				password: password,
			})
			.then(function (response: AxiosResponse) {
				localStorage.setItem("token", JSON.stringify(response.data.token));
				localStorage.setItem("user", JSON.stringify(response.data.user));
				setToken(response.data.token);
				setUser(response.data.user);
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

	//Handle register click
	const handleRegister = () => {
		navigate("/registro");
	};
	return (
		<FloatingContainer>
			<h1 className={classes.title}>Iniciar Sesión</h1>
			<form className={classes.form}>
				<div className={classes.inputBoxes}>
					<input
						className={classes.input}
						placeholder="Correo"
						type="text"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						className={classes.input}
						placeholder="Contraseña"
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{errorMessage ? (
						<p className={classes.errorMessage}>{errorMessage}</p>
					) : null}
					<button
						className={classes.btn + " " + classes.loginBtn}
						type="submit"
						onClick={handleLogin}
					>
						Iniciar Sesión
					</button>
				</div>
				<Link
					to="/recuperar-contrasenia"
					className={classes.recuperarContraseniaLink}
				>
					¿Olvidaste tu contraseña?
				</Link>
				<button
					className={classes.btn + " " + classes.registerBtn}
					onClick={handleRegister}
				>
					Registrate
				</button>
			</form>
		</FloatingContainer>
	);
}

export default Login;
