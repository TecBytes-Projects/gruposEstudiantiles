import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation/MainNavigation.tsx";

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
    </>
  );
}

export default RootLayout;