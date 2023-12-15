import { useEffect, useState } from "react";
import classes from "./Grupos.module.css";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../context/AuthContext";
import { group } from "../../types/types";
import Select from "react-select";
/**
 * Groups page
 */
interface selectOption {
	value: string;
	label: string;
}
function Grupos() {
	//Search field
	const [nameSearch, setNameSearch] = useState<string>("");
	//Groups to be displayed after filtering
	const [displayGroups, setDisplayGroups] = useState<group[]>([]);
	//Get groups from API
	const { user } = useAuth();
	const groups = useFetch<group>("/grupos", user ? user.token : null);
	//Category for filter
	const [category, setCategory] = useState<string>();
	//Options for selecting category
	const options = [
		"Todos",
		...new Set(groups.map((group) => group.category)),
	].map((category) => ({
		label: category,
		value: category,
	}));

	//Filter groups
	useEffect(() => {
		let newGroups = groups;
		if (category && category != "Todos") {
			newGroups = newGroups.filter((group) => group.category === category);
		}
		if (nameSearch.length > 0)
			newGroups = newGroups.filter((group) =>
				group.name.toLowerCase().includes(nameSearch)
			);
		setDisplayGroups(newGroups);
	}, [nameSearch, groups, category]);

	//Select a category with dropdown
	const handleSelectCategory = (option: selectOption | null) => {
		setCategory(option?.value);
	};

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
					<Select
						className={classes.giro}
						options={options}
						isSearchable
						onChange={handleSelectCategory}
					/>
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
