import React from 'react';
import  { Route,Routes } from 'react-router-dom'
import Homepage from '../Features/Homepage/Homepage';
import HomePageCart from '../components/HomePageCart';
import RegisterAsHomeMaker from '../Features/Authentication/RegisterAsHomeMaker/RegisterAsHomemaker';
import EmployeeDashboard from '../Features/Dashboard/EmployeesDashboard/EmployeeDashboard';
import HomemakerDashboard from '../Features/Dashboard/HomeMakerDashboard/HomeMakerDashboard';
import CloudKitchenCreation from '../Features/Dashboard/HomeMakerDashboard/CloudKitchenCreation';
import HomemakerMenu from '../Features/Dashboard/HomeMakerDashboard/HomemakerMenu';

function DabbaRoutes (){
    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/login' element={<RegisterAsHomeMaker/>} ></Route>
                <Route path='/CustomerDashboard' element={<EmployeeDashboard/>} ></Route>
                <Route path='/HomemakerDashboard' element={<HomemakerDashboard/>}>
                    <Route path='CloudKitchenCreation' element={<CloudKitchenCreation />}></Route>
                    <Route path='Menu' element={<HomemakerMenu />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default DabbaRoutes;