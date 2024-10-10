import { Outlet, useNavigate } from "react-router-dom";
import HomemakerNavbar from "../../../components/HomemakerNavbar";
import { useEffect } from "react";

export default function HomemakerDashboard (){

    const isKitchenCreated = false;
    const navigate = useNavigate()
    useEffect(() => {
        if (isKitchenCreated){
            navigate('/HomemakerDashboard/Menu')
        }else{
            navigate('/HomemakerDashboard/CloudKitchenCreation')
        }
    },[])
    return (
        <>
            
            <HomemakerNavbar/>
            <Outlet/>
        </>
    )
}