import DishCardDashboard from "../../../components/DishCardDashboard";
import HomemakerCard from "../../../components/HomemakerCard";
import LikedHomemakers from "../../../components/LikedHomemakers";
import Navbar from "../../../components/Navbar";

export default function EmployeeDashboard() {
    return (
        <>
            <Navbar />
            <div className="d-flex flex-column gap-4 mx-4">
                <form className="">
                    <div className="d-flex  px-3 py-2 border border-black rounded-5">
                        <input type="text" className="w-100 form-control border-0 rounded-5" placeholder="Search restaurant"></input>
                        <button className="btn btn-custom rounded-5 px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="d-flex justify-content-center">
                    <img src="./images/offer.jpg" alt="" height={110} ></img>
                </div>
                <div className="d-flex flex-column mb-5">
                    <h4 className="fw-bold">Near You</h4>
                    <div className="d-flex gap-3 mt-3 overflow-scroll">
                        <DishCardDashboard />
                        <DishCardDashboard />
                        <DishCardDashboard />
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <h4 className="fw-bold">Your Favorites</h4>
                    <div className="d-flex gap-4 mt-3 overflow-scroll">
                        <HomemakerCard/>
                        <HomemakerCard/>
                        <HomemakerCard/>
                        <HomemakerCard/>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <h4 className="fw-bold">Homemakers Liked</h4>
                    <div className="d-flex gap-4 mt-3 overflow-scroll">
                        <LikedHomemakers/>
                        <LikedHomemakers/>
                        <LikedHomemakers/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}