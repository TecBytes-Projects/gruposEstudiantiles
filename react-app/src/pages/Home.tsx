import classes from "./Home.module.css";
import SummarySection from "../components/SummarySection/SummarySection.tsx"

/**
 * Home page
 */
function Home() {
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
            Bienvenido a la página de gestión de grupos estudiantiles de Campus Puebla. Si eres presidente o vicepresidente de grupos te invitamos a crear tu cuenta para poder acceder a la gestión de tu grupo. 
            </p>
        </article>
        <SummarySection title={"Próximos eventos"} buttonText="Ver todos los eventos"><div></div></SummarySection>
        </>
	);
}

export default Home;