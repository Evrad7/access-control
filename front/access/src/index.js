import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashbord from './pages/Dashbord';
import Employees from "../src/pages/Employees";
import Ressources from "../src/pages/Ressources";
import UpdateEmployee from "../src/pages/UpdateEmpoyee";
import UpdateRessource from "../src/pages/UpdateRessource";
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import AddEmpoyee from './pages/AddEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import DeleteRessource from './pages/DeleteRessource';
import AddRessource from './pages/AddRessource';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Dashbord/>} />
      <Route path="/employees" element={<Employees/>}/>
      <Route path="/employees/:id/update" element={<UpdateEmployee/>}/>
      <Route path="/employees/:id/delete" element={<DeleteEmployee/>}/>
      <Route path="/ressources" element={<Ressources/>}/>
      <Route path="/ressources/:id/update" element={<UpdateRessource/>}/>
      <Route path="/ressources/:id/delete" element={<DeleteRessource/>}/>
      <Route path="/ressources/add" element={<AddRessource/>}/>
      <Route path="/employees/add" element={<AddEmpoyee/>}/>
    </Route>

));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
