import classes from "./EventSummaryCard.module.css"
import {event} from "../types/types.ts";

interface EventSummaryCardProps {
    event : event;
}

/**
 * A card for displaying events. Ment to be used inside a cards container.
 */
function EventsSummaryCard({event}:EventSummaryCardProps) { 
    return(
        <div className={classes.container}>
            <h3 className={classes.title}>{event.title}</h3>
            <p className={classes.date}>{event.date}</p>
            <p className={classes.groupName}>{event.groupName}</p>
        </div>
    )
}

export default EventsSummaryCard