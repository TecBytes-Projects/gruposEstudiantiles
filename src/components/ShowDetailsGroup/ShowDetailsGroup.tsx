import classes from "./ShowDetailsGroup.module.css";
import { useAtom } from "jotai";
import { groupAtom } from "../../stateManagement/detailsAtoms";

/*
/ Details of a group
*/
function ShowDetailsGroup() {
	const [data] = useAtom(groupAtom);
	return (
		<section className={classes.mainContainer}>
			{data ? (
				<>
					<div className={classes.rowContainer}>
						<h2>{data.name}</h2>
						<p className={classes.category}>Giro: {data?.category}</p>
					</div>
					<div className={classes.rowContainer}>
						<p>{data.description}</p>
						<img src={data.logo}></img>
					</div>
					<div className={classes.rowContainer}>
						<div>
							<h3>Misión</h3>
							<p>{data.mision}</p>
						</div>
						<div>
							<h3>Visión</h3>
							<p>{data.mision}</p>
						</div>
					</div>
					<div className={classes.rowContainer}>
						<div>
							<h3>Presidente</h3>
							<p>{data.namePresi}</p>
						</div>
						<div>
							<h3>Vicepresidente</h3>
							<p>{data.nameVice}</p>
						</div>
						<div>
							<h3>Asesor</h3>
							<p>{data.nameAsesor}</p>
						</div>
					</div>
					<div>
						<h3>Contacto</h3>
						<p>{data.contact}</p>
					</div>
				</>
			) : (
				<h2>El grupo que buscas no existe</h2>
			)}
		</section>
	);
}

export default ShowDetailsGroup;
