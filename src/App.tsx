import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Events from "./pages/Events/Events.tsx";
import Blog from "./pages/Blog/Blog.tsx";
import Grupos from "./pages/Grupos/Grupos.tsx";
import Documents from "./pages/Documents/Documents.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Login from "./pages/Login/Login.tsx";
import RecuperContrasenia from "./pages/RecuperarContrasenia/RecuperarContrasenia.tsx";
import RootLayout from "./pages/Root.tsx";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext.tsx";

/**
 * General routing
 */
const router = createHashRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage message="La página que buscas no se encontró" />,
		id: "root",
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/eventos",
				element: <Events />,
			},
			{
				path: "/blog",
				element: <Blog />,
			},
			{
				path: "/grupos",
				element: <Grupos />,
			},
			{
				path: "/documentos",
				element: <Documents />,
			},
			{
				path: "/recuperar-contrasenia",
				element: <RecuperContrasenia />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

function App() {
	const { setUser } = useAuth();
	//Check for existing user session
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
