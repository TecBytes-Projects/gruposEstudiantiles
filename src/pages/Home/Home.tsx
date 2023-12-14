import classes from "./Home.module.css";
import SummarySection from "../../components/SummarySection/SummarySection.tsx";
import EventsSummaryCard from "../../components/EventSummaryCard/EventSummaryCard.tsx";
import BlogSummaryCard from "../../components/BlogSummaryCard/BlogSummaryCard.tsx";
import { event, blogPost } from "../../types/types.ts";
import { useFetch } from "../../customHooks/api";
import { useAuth } from "../../context/AuthContext";

/**
 * Home page
 */
function Home() {
	//Get events from API
	const { user } = useAuth();
	const token = user ? user.token : null;
	const eventsSummary = useFetch<event>("/events/summary", token);
	//Get blog posts from API
	const blogSummary = useFetch<blogPost>("/blog/summary", token);

	return (
		<>
			<article className={classes.container}>
				<div className={classes.logoContainer}>
					<h1 className={classes.title}>Grupos estudiantiles</h1>
					{/* <img src={logo} className={classes.logo}></img> */}
					{/* 			<button onClick={() => navigate("/register")} className={classes.btn}>
				Register
			</button> */}
				</div>
			</article>
			<article className={classes.instructionsTextContainer}>
				<p className={classes.instructionsText}>
					Bienvenido a la página de gestión de grupos estudiantiles de Campus
					Puebla. Si eres presidente o vicepresidente de grupos te invitamos a
					crear tu cuenta para poder acceder a la gestión de tu grupo.
				</p>
			</article>
			<SummarySection
				title={"Próximos eventos"}
				buttonText="Ver todos los eventos"
				buttonLink="/eventos"
			>
				{eventsSummary.length > 0 ? (
					eventsSummary.map((event) => (
						<EventsSummaryCard key={event.id} event={event} />
					))
				) : (
					<h2>No hay eventos próximos</h2>
				)}
			</SummarySection>
			<SummarySection
				title={"Posts recientes"}
				buttonText="Ver blog"
				buttonLink="/blog"
			>
				{blogSummary.length > 0 ? (
					blogSummary.map((blogPost) => (
						<BlogSummaryCard key={blogPost.id} blogPost={blogPost} />
					))
				) : (
					<h2>No hay post recientes</h2>
				)}
			</SummarySection>
		</>
	);
}

export default Home;
