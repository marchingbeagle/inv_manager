import { Outlet } from "react-router-dom";

function DefaultPage() {
  return (
    <div>
      <header className="text-bold w-screen bg-gray-500 p-4 text-xl uppercase text-white">
        logo header
      </header>
      <Outlet />
    </div>
  );
}

export default DefaultPage;
