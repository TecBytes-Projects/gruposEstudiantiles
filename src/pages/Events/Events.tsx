import classes from "./Events.module.css";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import EventCard from "../../components/EventCard/EventCard.tsx";
import { event } from "../../types/types.ts";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../context/AuthContext";

/**
 * Events page
 */
function Events() {
	//Get list of events from API
	const { token } = useAuth();
	const events = useFetch<event>("/events", token);
	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<h1>Calendario de eventos</h1>
				{/*TODO: add button to add new event*/}
			</div>
			<div className={classes.carouselContainer}>
				<CardCarousel>
					{events.length > 0 ? (
						events.map((event) => <EventCard key={event.id} event={event} />)
					) : (
						<p className={classes.errorText}>No hay eventos para mostrar</p>
					)}
				</CardCarousel>
			</div>
		</section>
	);
}

export default Events;
