import classes from "./EventCard.module.css";
import { event } from "../../types/types.ts";

interface EventCardProps {
	event: event;
	handleEventClick: (id: number) => void;
}

/**
 * A card for displaying events. Ment to be used inside a cards container.
 */
function EventCard({ event, handleEventClick }: EventCardProps) {
	return (
		<div
			className={classes.container}
			onClick={() => handleEventClick(event.id)}
		>
			<h2 className={classes.title}>{event.title}</h2>
			<p className={classes.date}>{event.date}</p>
			<p className={classes.date}>{event.time}</p>
			<p className={classes.place}>{event.place}</p>
			<p className={classes.groupName}>{event.groupName}</p>
		</div>
	);
}

export default EventCard;
