import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Events from "./pages/Events/Events.tsx";
import Blog from "./pages/Blog/Blog.tsx";
import RootLayout from "./pages/Root.tsx";

/**
 * General routing
 */
const router = createHashRouter([
	{
		path: "/",
		element: <RootLayout />,
		//errorElement: <ErrorPage />,
		id: "root",
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/eventos",
				element: <Events/>
			},
			{
				path: "/blog",
				element: <Blog/>
			}
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
