import { Link } from "react-router-dom"
import Logo from '../assets/Logo_Text.jpg'

export default function HomemakerNavbar() {
    return (
        <>
            <nav className="navbar bg-white rounded navbar-expand-lg bg-light" style={{ height: '80px' }}>
                <div className="container-fluid">
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex align-items-center justify-content-sm-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle d-none sm-block" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>


                        <img src={Logo} className="d-none d-sm-block "></img>
                    </div>

                    <div className="collapse navbar-collapse bg-white" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " style={{ gap: '20px' }}>
                            <li className="nav-item">
                                <Link className="nav-link active fs-6" aria-current="page" to="/HomemakerDashboard/CloudKitchenCreation"><i className="bi bi-house" style={{ marginRight: '5px' }}></i>Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fs-6" aria-current="page" to="/"><i className="bi bi-house" style={{ marginRight: '5px' }}></i>Kitchen</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/aboutUs"><i className="bi bi-info-circle" style={{ marginRight: '5px' }}></i>Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/contactUs"><i className="bi bi-grid" style={{ marginRight: '5px' }}></i>Tracking</Link>
                            </li>

                        </ul>



                    </div>
                    <Link className="nav-link ms-4" to="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle d-block" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    </Link>
                </div>
            </nav>
        </>
    )
}