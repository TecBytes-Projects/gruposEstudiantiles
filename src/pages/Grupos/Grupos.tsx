import { useEffect, useState } from "react";
import classes from "./Grupos.module.css";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext.tsx";
import { group } from "../../types/types";
import Select from "react-select";
import GrupoDetails from "../../components/GrupoDetails/GrupoDetails.tsx";
import GruposList from "../../components/GruposList/GruposList.tsx";
import { useNavigate, useParams } from "react-router-dom";
/**
 * Groups page
 */
interface selectOption {
	value: string;
	label: string;
}
function Grupos() {
	const navigate = useNavigate();
	//Varible for showing details
	const groupId = useParams();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	useEffect(() => {
		if (groupId.id) setShowDetails(true);
	}, [groupId]);
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
	const handleGroupClick = (id: number) => {
		navigate("/grupos/" + id);
	};
	//Close the details panel
	const handleCloseDetails = () => {
		navigate("/grupos");
	};

	return (
		<div>
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
				<GruposList
					displayGroups={displayGroups}
					handleGroupClick={handleGroupClick}
				/>
			</section>
			{groupId.id ? (
				<GrupoDetails
					key={groupId.id}
					show={showDetails}
					groupId={Number(groupId.id)}
					handleClose={handleCloseDetails}
				/>
			) : null}
		</div>
	);
}

export default Grupos;
