import { useEffect, useState } from "react";
import classes from "./Documents.module.css";
import { FaDownload } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../context/AuthContext";

/**
 * Documents page
 */
interface document {
	id: bigint;
	name: string;
	size: string;
	token: string;
	docType: string;
}

function Documents() {
	//Search field
	const [nameSearch, setNameSearch] = useState<string>("");
	//Documents to be displayed after filtering
	const [displayDocuments, setDisplayDocuments] = useState<document[]>([]);
	//Get documents from API
	const { user } = useAuth();
	const documents = useFetch<document>("/documentos", user ? user.token : null);

	//Filter documents
	useEffect(() => {
		if (nameSearch.length > 0) {
			const newDocuments = documents.filter((document) =>
				document.name.toLowerCase().includes(nameSearch)
			);
			setDisplayDocuments(newDocuments);
		} else {
			setDisplayDocuments(documents);
		}
	}, [nameSearch, documents]);

	//Download document
	const handleDownloadClick = (id: bigint, token: string) => {
		/*TODO:create logic and delete console log*/
		console.log(id);
		console.log(token);
	};

	return (
		<section className={classes.mainContainer}>
			<div className={classes.titleSection}>
				<div className={classes.titleContainer}>
					<h1>Documentos</h1>
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

			<p className={classes.resultLabel}>
				{displayDocuments.length > 0
					? displayDocuments.length + " resultado(s)"
					: "No hay resultados que coincidan con tu búsqueda"}
			</p>

			<div className={classes.contenedor2}>
				<div className={classes.columna2}>
					<ul className={classes.list}>
						{displayDocuments.length > 0
							? displayDocuments.map((document) => (
									<li className={classes.listItem} key={document.id}>
										<div className={classes.element}>
											<p className={classes.documentName}>
												{document.name + "." + document.docType}
											</p>
											<button
												className={classes.iconBtn}
												onClick={() =>
													handleDownloadClick(document.id, document.token)
												}
											>
												<IconContext.Provider
													value={{
														color: "var(--color-main-white)",
														size: "30px",
													}}
												>
													<FaDownload />
												</IconContext.Provider>
											</button>
										</div>
									</li>
							  ))
							: ""}
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Documents;
