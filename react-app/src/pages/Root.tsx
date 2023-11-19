import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation.tsx";

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