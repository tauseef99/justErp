// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Home";
import SignIn from "../src/Components/SignIn";
import SellerDashboard from "./Pages/Seller/SellerDashboard";
import SellerMessages from "./Components/seller/SellerMessages";
import BuyerDashboard from "./Pages/Buyer/BuyerDashboard";
import BuyerLayout from "./Pages/layouts/BuyerLayout";
import PerformanceDashboard from "./Components/seller/SellerPerformance";
import SellerProfile from "./Components/seller/SellerProfile";
import BuyerMessages from "./Components/buyer/BuyerMessages";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import { Ourstory } from "./Components/Ourstory";
import Register from "./Components/Register";
import ErpConsultant from "./Components/ErpConsultant";
import HowToHireERP from "./Components/HowToHireERP";
import BuyerProfile from "./Components/buyer/BuyerProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/messages" element={<SellerMessages />} />
        <Route path="/buyer/dashboard" element={<BuyerLayout><BuyerDashboard /></BuyerLayout>}/>
        <Route path="/seller/Performance" element={<PerformanceDashboard/>}/>
        <Route path="/seller/Profile" element={<SellerProfile/>}/>
        <Route path="/buyer/messages" element={<BuyerMessages/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/ourstory" element={<Ourstory/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/erpconsultant" element={<ErpConsultant/>}/>
        <Route path="/how_to_hire_erp_consultant" element={<HowToHireERP />} />
        <Route path="/buyer/profile" element={<BuyerProfile/>}/>



      </Routes>
    </Router>
  );
}

export default App;
