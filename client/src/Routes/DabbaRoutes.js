import React from 'react';
import  { Route,Routes } from 'react-router-dom'
import Homepage from '../Features/Homepage/Homepage';
import HomePageCart from '../components/HomePageCart';
import RegisterAsHomeMaker from '../Features/Authentication/RegisterAsHomeMaker/RegisterAsHomemaker';
import EmployeeDashboard from '../Features/Dashboard/EmployeesDashboard/EmployeeDashboard';
import LoginAsHomemaker from '../Features/Authentication/LoginAsHomemaker/LoginAsHomemaker';
import HomemakerDashboard from '../Features/Dashboard/HomeMakerDashboard/HomeMakerDashboard';
import CloudKitchenCreation from '../Features/Dashboard/HomeMakerDashboard/CloudKitchenCreation';
import HomemakerMenu from '../Features/Dashboard/HomeMakerDashboard/HomemakerMenu';
import HomemakerPage from '../Features/Homemaker/HomemakerPage';
import SignUpOptions from '../Features/Authentication/SignUpOptions/SignUpOptions';
import CloundKitchenForm from '../Features/Dashboard/CloudKitchenDashboard/CloudKitchenForm';
import UploadItems from '../Features/Dashboard/CloudKitchenDashboard/UploadItems';

function DabbaRoutes (){
    return (
        <>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/signup' element={<RegisterAsHomeMaker/>} ></Route>
                <Route path='/cloudkitchenadditems' element={<UploadItems/>} ></Route>
                <Route path='/cloudkitchen' element={<CloundKitchenForm/>} ></Route>
                <Route path='/signupoptions' element={<SignUpOptions/>} ></Route>
                <Route path='/login' element={<LoginAsHomemaker/>} ></Route>
                <Route path='/dashboard' element={<EmployeeDashboard/>} ></Route>
                <Route path='/dashboard/:id' element={<HomemakerPage/>}></Route>
                <Route path='/HomemakerDashboard' element={<HomemakerDashboard/>}>
                    <Route path='CloudKitchenCreation' element={<CloudKitchenCreation />}></Route>
                    <Route path='Menu' element={<HomemakerMenu />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default DabbaRoutes;