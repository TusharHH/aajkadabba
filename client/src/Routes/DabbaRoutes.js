import React from 'react';
import  { Route,Routes } from 'react-router-dom'
import Homepage from '../Features/Homepage/Homepage';
import HomePageCart from '../components/HomePageCart';
import RegisterAsHomeMaker from '../Features/Authentication/RegisterAsHomeMaker/RegisterAsHomemaker';
import EmployeeDashboard from '../Features/Dashboard/EmployeesDashboard/EmployeeDashboard';
import LoginAsHomemaker from '../Features/Authentication/LoginAsHomemaker/LoginAsHomemaker';
import SignUpOptions from '../Features/Authentication/SignUpOptions/SignUpOptions';

function DabbaRoutes (){
    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/signup' element={<RegisterAsHomeMaker/>} ></Route>
                <Route path='/signupoptions' element={<SignUpOptions/>} ></Route>
                <Route path='/login' element={<LoginAsHomemaker/>} ></Route>
                <Route path='/dashboard' element={<EmployeeDashboard/>} ></Route>
            </Routes>
        </>
    )
}

export default DabbaRoutes;