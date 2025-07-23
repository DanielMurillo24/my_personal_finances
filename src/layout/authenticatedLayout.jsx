import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3" style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
