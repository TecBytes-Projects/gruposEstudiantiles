import classes from "./Events.module.css";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import EventCard from "../../components/EventCard/EventCard.tsx";
import { event } from "../../types/types.ts";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext.tsx";

/**
 * Events page
 */
function Events() {
	//Get list of events from API
	const { user } = useAuth();
	const events = useFetch<event>("/events", user ? user.token : null);
	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<h1>Calendario de eventos</h1>
				{/*TODO: add button to add new event*/}
			</div>
			<div className={classes.carouselContainer}>
				{events.length > 0 ? (
					<CardCarousel>
						{events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</CardCarousel>
				) : (
					<div className={classes.textContainer}>
						<p className={classes.errorText}>No hay eventos para mostrar</p>
					</div>
				)}
			</div>
		</section>
	);
}

export default Events;
