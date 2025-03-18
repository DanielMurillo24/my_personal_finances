
import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Navbar = () => {

    const navigate = useNavigate ();

    const onLogout = () => {
        navigate('/login', {replace: true})
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Home
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active': ''} `} 
                        to="/budget"
                    >
                        Budget
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active': ''} `}  
                        to="/"
                    >
                        Blanck
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-primary'>
                        Daniel Murillo
                    </span>

                    <button className='btn btn-outline-danger' onClick={onLogout}>
                        <i className='fas fa-sign-out-alt'></i>
                        <span>Logout</span>
                    </button>
                </ul>
            </div>
        </nav>
    )
}