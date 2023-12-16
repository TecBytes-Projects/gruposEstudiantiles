import classes from "./GruposList.module.css";
import { group } from "../../types/types.ts";

interface GruposListProps {
	displayGroups: group[];
	handleGroupClick: (id: number) => void;
}

function GruposList({ displayGroups, handleGroupClick }: GruposListProps) {
	return (
		<section>
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

export default GruposList;
