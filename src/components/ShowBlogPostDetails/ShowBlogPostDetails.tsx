import classes from "./ShowBlogPostDetails.module.css";
import { useAtom } from "jotai";
import { blogPostAtom } from "../../stateManagement/detailsAtoms";

/*
/ Details of an event
*/
function ShowEventDetails() {
	const [data] = useAtom(blogPostAtom);
	return (
		<section className={classes.mainContainer}>
			{data ? (
				<>
					<div className={classes.titleContainer}>
						<h2>{data.title}</h2>
						<p className={classes.date}>{data.date}</p>
					</div>
					<div className={classes.contentContainer}>
						<p>{data.text}</p>
						<img src={data.image} />
					</div>
				</>
			) : (
				<h2>El post que buscas no existe</h2>
			)}
		</section>
	);
}

export default ShowEventDetails;
