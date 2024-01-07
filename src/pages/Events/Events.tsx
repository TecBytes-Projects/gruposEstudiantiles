import classes from "./Events.module.css";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import EventCard from "../../components/EventCard/EventCard.tsx";
import { event } from "../../types/types.ts";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetails from "../../components/EventDetails/EventDetails.tsx";

/**
 * Events page
 */
function Events() {
	const navigate = useNavigate();
	//Get list of events from API
	const { user } = useAuth();
	const events = useFetch<event>("/events", user ? user.token : null);
	//Open group details
	const handleEventClick = (id: number) => {
		navigate("/eventos/" + id);
	};
	//Varible for showing details
	const eventId = useParams();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	useEffect(() => {
		if (eventId.id) setShowDetails(true);
	}, [eventId]);
	//Close the details panel
	const handleCloseDetails = () => {
		navigate("/eventos");
	};
	return (
		<>
			<section className={classes.mainContainer}>
				<div className={classes.titleSection}>
					<h1>Calendario de eventos</h1>
					{/*TODO: add button to add new event*/}
				</div>
				<div className={classes.carouselContainer}>
					{events.length > 0 ? (
						<CardCarousel>
							{events.map((event) => (
								<EventCard
									key={event.id}
									event={event}
									handleEventClick={handleEventClick}
								/>
							))}
						</CardCarousel>
					) : (
						<div className={classes.textContainer}>
							<p className={classes.errorText}>No hay eventos para mostrar</p>
						</div>
					)}
				</div>
			</section>
			{eventId.id ? (
				<EventDetails
					key={eventId.id}
					show={showDetails}
					eventId={Number(eventId.id)}
					handleClose={handleCloseDetails}
				/>
			) : null}
		</>
	);
}

export default Events;
