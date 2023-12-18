import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { useAuth } from "../stateManagement/AuthContext.tsx";

/**
 * General Layout
 */
function RootLayout() {
	const { user } = useAuth();
	return (
		<>
			<MainNavigation userRole={user ? user.rol : null} />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RootLayout;
