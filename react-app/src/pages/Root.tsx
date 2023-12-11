import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation.tsx";
import Footer from "../components/Footer/Footer.tsx";

/**
 * General Layout
 */
function RootLayout() {
  return (
    <>
    <MainNavigation/>
      <main>
        <Outlet />
      </main>
    <Footer />
    </>
  );
}

export default RootLayout;