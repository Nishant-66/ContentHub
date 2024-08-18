import Header from "./Header";
import {Outlet} from "react-router-dom";

// Layout component that provides a common structure for pages
export default function Layout() {
  return (
    <main>
      {/* Renders the Header component at the top of the layout */}
      <Header />
      
      {/* Outlet is a placeholder for rendering child routes' components */}
      <Outlet />
    </main>
  );
}
