import classes from "./EventSummaryCard.module.css"

interface EventSummaryCardProps {
    title : string;
    date : Date;
    groupName : string;
}

function EventsSummaryCard({title, date, groupName}:EventSummaryCardProps) { 
    return(
        <div className={classes.container}>
            <h3 className={classes.title}>{title}</h3>
            <p className={classes.date}>{date.toDateString()}</p>
            <p className={classes.groupName}>{groupName}</p>
        </div>
    )
}

export default EventsSummaryCard