import classes from "./LinkTreeList.module.css";
import { link } from "../../types/types.ts";

interface LinkTreeListProps {
	displayLinks: link[];
}

function LinkTreeList({ displayLinks }: LinkTreeListProps) {
	//Sort links by category
	displayLinks.sort((linkA, linkB) => {
		if (linkA.category < linkB.category) {
			return -1;
		}
		if (linkA.category > linkB.category) {
			return 1;
		}
		return 0;
	});
	const categories = [...new Set(displayLinks.map((link) => link.category))];
	return (
		<section>
			<p className={classes.resultLabel}>
				{displayLinks.length > 0
					? displayLinks.length + " resultado(s)"
					: "No hay resultados que coincidan con tu búsqueda"}
			</p>
			<div className={classes.contenedor2}>
				<div className={classes.columna2}>
					{categories.map((category) => (
						<div key={category}>
							<h3 className={classes.category}>{category}</h3>
							<ul className={classes.list}>
								{displayLinks.map((link) =>
									link.category === category ? (
										<li className={classes.linkElement} key={link.id}>
											<a href={link.url}>{link.name}</a>
										</li>
									) : null
								)}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default LinkTreeList;
