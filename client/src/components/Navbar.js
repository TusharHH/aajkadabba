import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <>
            <div className="container bg-white">
                <nav className="navbar  bg-white rounded navbar-expand-lg bg-light" style={{ height: '80px' }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="d-flex align-items-center justify-content-sm-center ">
                            <Link className="navbar-brand rounded d-none d-sm-block" to="/"><img className="w-100" style={{ maxHeight: '70px' }} src='./images/Logo.jpg' alt="logo" /></Link>
                            <Link className="navbar-brand rounded" to="/"><img className="w-100" style={{ maxHeight: '70px' }} src='./images/Logo_Text.jpg' alt="logoText" /></Link>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " style={{ gap: '20px' }}>
                                <li className="nav-item">
                                    <Link className="nav-link active fw-bold fs-6" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold fs-6" to="/aboutUs">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-bold fs-6" to="/contactUs">Contact Us</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav  mb-2 mb-lg-0 d-flex align-items-center ms-5">
                                <ul className="navbar-nav me-0" style={{ gap: '50px' }}>
                                    <li className="nav-item">
                                        <Link className="nav-link" style={{ color: "orange", textDecoration: "underline" }} to="/login">
                                            Join Us
                                        </Link>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fs-6 btn btn-custom px-4" to="/signup">
                                            Sign Up
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}