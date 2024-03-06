import classes from "./Events.module.css";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import EventCard from "../../components/EventCard/EventCard.tsx";
import { event } from "../../types/types.ts";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetails from "../../components/EventDetails/EventDetails.tsx";
import CreateEvent from "../../components/CreateEvent/CreateEvent.tsx";

/**
 * Events page
 */
function Events() {
	const navigate = useNavigate();
	//Get list of events from API
	const { user } = useAuth();
	const events = useFetch<event>("/events", user ? user.token : null);
	//Open event details
	const handleEventClick = (id: number) => {
		navigate("/eventos/" + id);
	};
	//Varible for showing details
	const eventId = useParams();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	//Variable for showing create new event
	const [showCreate, setShowCreate] = useState<boolean>(false);
	useEffect(() => {
		if (eventId.id) setShowDetails(true);
	}, [eventId]);
	//Close the details panel
	const handleCloseDetails = () => {
		navigate("/eventos");
	};
	//Open drawer to create new event
	const handleCreateNewEvent = () => {
		setShowCreate(true);
	};
	//Close drawer to create new group
	const handleCloseCreate = () => {
		setShowCreate(false);
	};
	return (
		<>
			<section className={classes.mainContainer}>
				<div className={classes.titleSection}>
					<h1>Calendario de eventos</h1>
					{user?.rol ? (
						<button
							onClick={() => handleCreateNewEvent()}
							className={classes.createBtn}
						>
							Nuevo evento
						</button>
					) : null}
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
			{showCreate ? (
				<CreateEvent show={showCreate} handleClose={handleCloseCreate} />
			) : null}
		</>
	);
}

export default Events;
