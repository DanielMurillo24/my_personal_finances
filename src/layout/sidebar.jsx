// Sidebar.jsx
import { NavLink } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-icons/font/bootstrap-icons.css';

export const Sidebar = () => {
    return (
        <div className="text-white p-1" style={{ width: '250px', minHeight: '100vh', backgroundColor: '#033f63' }}>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <NavLink
                        to="/dashboard"
                        className={ ({isActive}) => `nav-link text-white ${isActive ? 'active bg-secondary': ''} `} 
                    >
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Balance
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/budget"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-wallet2 me-2"></i>
                        Budget
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Savings
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Certificates
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Investments
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-secondary' : ''}`}
                    >
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Retirement Fund
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
