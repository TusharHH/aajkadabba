import { Outlet } from "react-router-dom";
import HomemakerNavbar from "../../../components/HomemakerNavbar";

export default function HomemakerDashboard (){
    return (
        <>
            <HomemakerNavbar/>
            <Outlet/>
        </>
    )
}