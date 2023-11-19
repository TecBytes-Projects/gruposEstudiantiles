import classes from "./Home.module.css";
import SummarySection from "../components/SummarySection/SummarySection.tsx";
import EventsSummaryCard from "../components/EventSummaryCard/EventSummaryCard.tsx";
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * Home page
 */
function Home() {
	const [eventsSummary, setEventsSummary] = useState([]);
    function getEventsSummary(){
        axios
		.get("/events/summary")
		.then(function (response: AxiosResponse) {
            console.log(response);
			setEventsSummary(response.data);
		})
		.catch(function (error: AxiosError) {
			console.log(error);
		});
    }
	getEventsSummary();
	return (
		<>
			<article className={classes.container}>
				<div className={classes.logoContainer}>
					<h1 className={classes.title}>Grupos estudiantiles</h1>
					{/* <img src={logo} className={classes.logo}></img> */}
					{/* 			<button onClick={() => navigate("/register")} className={classes.btn}>
				Register
			</button> */}
				</div>
			</article>
			<article className={classes.instructionsTextContainer}>
				<p className={classes.instructionsText}>
					Bienvenido a la página de gestión de grupos estudiantiles de Campus
					Puebla. Si eres presidente o vicepresidente de grupos te invitamos a
					crear tu cuenta para poder acceder a la gestión de tu grupo.
				</p>
			</article>
			<SummarySection
				title={"Próximos eventos"}
				buttonText="Ver todos los eventos"
			>
				{eventsSummary.length > 0 ? (
					eventsSummary.map((event) => <EventsSummaryCard event={event} />)
				) : (
					<h2>No hay eventos próximos</h2>
				)}
			</SummarySection>
		</>
	);
}

export default Home;
