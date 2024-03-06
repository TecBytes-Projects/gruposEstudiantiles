import { useEffect, useState } from "react";
import classes from "./LinkTree.module.css";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../stateManagement/AuthContext";
import { link } from "../../types/types";
import LinkTreeList from "../../components/LinkTreeList/LinkTreeList";

/**
 * LinkTree page
 */

function LinkTree() {
	//Search field
	const [nameSearch, setNameSearch] = useState<string>("");
	//LinkTree to be displayed after filtering
	const [displayLinkTree, setDisplayLinkTree] = useState<link[]>([]);
	//Get LinkTree from API
	const { user } = useAuth();
	const LinkTree = useFetch<link>("/links", user ? user.token : null);

	//Filter LinkTree
	useEffect(() => {
		if (nameSearch.length > 0) {
			const newLinkTree = LinkTree.filter((link) =>
				link.name.toLowerCase().includes(nameSearch)
			);
			setDisplayLinkTree(newLinkTree);
		} else {
			setDisplayLinkTree(LinkTree);
		}
	}, [nameSearch, LinkTree]);

	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<div className={classes.titleContainer}>
					<h1>Link Tree</h1>
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
				</div>
			</div>
			<LinkTreeList displayLinks={displayLinkTree} />
		</section>
	);
}

export default LinkTree;
