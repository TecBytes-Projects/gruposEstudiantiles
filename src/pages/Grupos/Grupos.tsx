import { useEffect, useState } from "react";
import classes from "./Grupos.module.css";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../context/AuthContext";
/**
 * Groups page
 */
interface group {
	id: bigint;
	name: string;
	category: string;
}

function Grupos() {
	//Search field
	const [nameSearch, setNameSearch] = useState<string>("");
	//Groups to be displayed after filtering
	const [displayGroups, setDisplayGroups] = useState<group[]>([]);
	//Get groups from API
	const { token } = useAuth();
	const groups = useFetch<group>("/grupos", token);

	//Filter groups
	useEffect(() => {
		if (nameSearch.length > 0) {
			const newGroups = groups.filter((group) =>
				group.name.toLowerCase().includes(nameSearch)
			);
			setDisplayGroups(newGroups);
		} else {
			setDisplayGroups(groups);
		}
	}, [nameSearch, groups]);

	//Open group details
	const handleGroupClick = (id: bigint) => {
		/*TODO:create logic and delete console log*/
		console.log(id);
	};

	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<div className={classes.titleContainer}>
					<h1>Nuestros grupos</h1>
				</div>
				<div className={classes.actionsContainer}>
					<input
						value={nameSearch}
						type="text"
						placeholder="Buscar"
						onChange={(e) => {
							setNameSearch(e.target.value.toLowerCase());
						}}
					/>
					{/*TODO: add functionality to filter*/}
					<button className={classes.giroBtn}>Seleccionar giro</button>
				</div>
			</div>

			<p className={classes.resultLabel}>
				{displayGroups.length > 0
					? displayGroups.length + " resultado(s)"
					: "No hay resultados que coincidan con tu búsqueda"}
			</p>

			<div className={classes.contenedor2}>
				<div className={classes.columna2}>
					<ul className={classes.list}>
						{displayGroups.length > 0
							? displayGroups.map((group) => (
									<li className={classes.groupElement} key={group.id}>
										<button onClick={() => handleGroupClick(group.id)}>
											{group.name}
										</button>
									</li>
							  ))
							: ""}
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Grupos;
