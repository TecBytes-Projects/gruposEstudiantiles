import classes from "./SummarySection.module.css"

interface SummarySectionProps{
    title: string;
    buttonText: string;
    card?: React.ReactNode;
} 

function EventsSummary({title, buttonText} : SummarySectionProps){
    return(
        <article className={classes.container}>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>{title}</h2>
                <button className={classes.eventsButton}>{buttonText}</button>
            </div>
{/*             <div className={classes.cardsContainer}>
                {card}
                {card}
            </div> */}
        </article>
    );
}

export default EventsSummary;