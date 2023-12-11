import classes from "./Home.module.css";
import SummarySection from "../../components/SummarySection/SummarySection.tsx";
import EventsSummaryCard from "../../components/EventSummaryCard/EventSummaryCard.tsx";
import BlogSummaryCard from "../../components/BlogSummaryCard/BlogSummaryCard.tsx";
import { event, blogPost } from "../../types/types.ts";
import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * Home page
 */
function Home() {
	const [eventsSummary, setEventsSummary] = useState<event[]>([]);
	const [blogSummary, setBlogSummary] = useState<blogPost[]>([]);
	useEffect(() => {
		axios
			.get("/events/summary")
			.then(function (response: AxiosResponse) {
				setEventsSummary(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
		axios
			.get("/blog/summary")
			.then(function (response: AxiosResponse) {
				setBlogSummary(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
	},[]);
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
					eventsSummary.map((event) => (
						<EventsSummaryCard key={event.id} event={event} />
					))
				) : (
					<h2>No hay eventos próximos</h2>
				)}
			</SummarySection>
			<SummarySection title={"Posts recientes"} buttonText="Ver blog">
				{blogSummary.length > 0 ? (
					blogSummary.map((blogPost) => (
						<BlogSummaryCard key={blogPost.id} blogPost={blogPost} />
					))
				) : (
					<h2>No hay post recientes</h2>
				)}
			</SummarySection>
		</>
	);
}

export default Home;
