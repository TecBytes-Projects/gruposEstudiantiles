import classes from "./Register.module.css";
import FloatingContainer from "../../components/FloatingContainer/FloatingContainer.tsx";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { group } from "../../types/types.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import Select from "react-select";
import { useFetch } from "../../customHooks/api.tsx";
import { toast } from "react-hot-toast";

interface errorResponse {
	message: string;
}

interface registerResponse {
	message: string;
}

interface selectOption {
	value: bigint;
	label: string;
}

/**
 * Register page
 */
function Register() {
	//Navigation
	const navigate = useNavigate();
	//Form data
	const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
	const [presidentGroups, setPresidentGroups] = useState<
		readonly selectOption[]
	>([]);
	const [viceGroups, setViceGroups] = useState<readonly selectOption[]>([]);
	// Selector options
	const { user } = useAuth();
	const groups = useFetch<group>("/grupos", user ? user.token : null);
	const options = groups.map((group) => ({
		value: group.id,
		label: group.name,
	}));
	//Error message
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	//Handle register click
	const handleRegister = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		const finalPresidentGroups = presidentGroups.map((group) => group.value);
		const finalViceGroups = viceGroups.map((group) => group.value);
		axios
			.post<registerResponse>("/register", {
				name: name,
				lastName: lastName,
				email: email,
				password: password,
				passwordConfirmation: passwordConfirmation,
				gruposPresi: finalPresidentGroups,
				gruposVice: finalViceGroups,
			})
			.then(function () {
				toast("Registro realizado con éxito");
				navigate("/login");
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

	//Go back to previous if cancelled
	const handleCancelled = () => {
		navigate(-1);
	};

	return (
		<FloatingContainer>
			<h1 className={classes.title}>Registro</h1>
			<p>
				Este registro es exclusivo para presidentes y vicepresidentes de grupos
				estudiantiles
			</p>
			<form className={classes.form}>
				<div className={classes.inputBoxes}>
					<input
						className={classes.input}
						placeholder="Nombre(s)"
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<input
						className={classes.input}
						placeholder="Apellidos"
						type="text"
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
					<input
						className={classes.input}
						placeholder="Correo"
						type="text"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						className={classes.input}
						placeholder="Contraseña"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<input
						className={classes.input}
						placeholder="Confirmar contraseña"
						type="password"
						value={passwordConfirmation}
						onChange={(e) => {
							setPasswordConfirmation(e.target.value);
						}}
					/>
					<p>Selecciona los grupos de los cuales eres PRESIDENTE</p>
					<Select
						className={classes.input}
						options={options}
						isMulti
						isSearchable
						onChange={setPresidentGroups}
					/>
					<p>Selecciona los grupos de los cuales eres VICEPRESIDENTE</p>
					<Select
						className={classes.input}
						options={options}
						isMulti
						isSearchable
						onChange={setViceGroups}
					/>
					{errorMessage ? (
						<p className={classes.errorMessage}>{errorMessage}</p>
					) : null}

					<button
						type="submit"
						className={classes.btn + " " + classes.registerBtn}
						onClick={handleRegister}
					>
						Registrarse
					</button>
					<button
						className={classes.btn + " " + classes.cancelBtn}
						onClick={handleCancelled}
					>
						Cancelar
					</button>
				</div>
			</form>
		</FloatingContainer>
	);
}

export default Register;
