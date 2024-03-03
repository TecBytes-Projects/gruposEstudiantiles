import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Events from "./pages/Events/Events.tsx";
import Blog from "./pages/Blog/Blog.tsx";
import Grupos from "./pages/Grupos/Grupos.tsx";
import Documents from "./pages/Documents/Documents.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Login from "./pages/Login/Login.tsx";
import ForgottenPassword from "./pages/ForgottenPassword/ForgottenPassword.tsx";
import RootLayout from "./pages/Root.tsx";
import { useEffect } from "react";
import { useAuth } from "./stateManagement/AuthContext.tsx";
import Register from "./pages/Register/Register.tsx";
import { Toaster } from "react-hot-toast";

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
				path: "/eventos/:id?",
				element: <Events />,
			},
			{
				path: "/blog/:id?",
				element: <Blog />,
			},
			{
				path: "/grupos/:id?",
				element: <Grupos />,
			},
			{
				path: "/documentos",
				element: <Documents />,
			},
			{
				path: "/recuperar-contrasenia",
				element: <ForgottenPassword />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/registro",
				element: <Register />,
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

	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
}

export default App;
