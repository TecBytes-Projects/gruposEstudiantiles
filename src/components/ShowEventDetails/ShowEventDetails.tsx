import classes from "./ShowEventDetails.module.css";
import { useAtom } from "jotai";
import { eventAtom } from "../../stateManagement/detailsAtoms";

/*
/ Details of an event
*/
function ShowEventDetails() {
	const [data] = useAtom(eventAtom);
	return (
		<section className={classes.mainContainer}>
			{data ? (
				<>
					<div className={classes.titleContainer}>
						<h2>{data.title}</h2>
					</div>
					<div className={classes.columnsContainer}>
						<div className={classes.column}>
							<p>{data.date}</p>
							<p>{data.time}</p>
							<p>{data.place}</p>
							<p>{data.groupName}</p>
						</div>
						<div className={classes.column}>
							<p>{data.description}</p>
						</div>
					</div>
				</>
			) : (
				<h2>El evento que buscas no existe</h2>
			)}
		</section>
	);
}

export default ShowEventDetails;
