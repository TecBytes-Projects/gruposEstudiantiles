import classes from "./Events.module.css";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import EventCard from "../../components/EventCard/EventCard.tsx";
import axios, { AxiosResponse, AxiosError } from "axios";
import { event } from "../../types/types.ts";
import { useEffect, useState } from "react";

/**
 * Events page
 */
function Events() {
	const [events, setEvents] = useState<event[]>([]);
	useEffect(() => {
		axios
			.get("/events")
			.then(function (response: AxiosResponse) {
				setEvents(response.data);
			})
			.catch(function (error: AxiosError) {
				console.log(error);
			});
	}, []);
	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<h1>Calendario de eventos</h1>
				{/*TODO: add button to add new event*/}
			</div>
			<div className={classes.carouselContainer}>
				<CardCarousel>
					{events.length > 0 ? (
						events.map((event) => <EventCard key={event.id} event={event}/>)
					) : (
						<p>No hay eventos para mostrar</p>
					)}
				</CardCarousel>
			</div>
		</section>
	);
}

export default Events;
