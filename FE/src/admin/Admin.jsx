import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";

import "./index.css";

export default function Admin() {
  return (
    <>
      <div className="flex w-full">
        <NavigationBar />
        <main style={{ padding: "2.5rem 5rem" }} className="w-full h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}
