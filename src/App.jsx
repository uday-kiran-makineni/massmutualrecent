import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/Login.jsx';
import Signup from './login/Signup.jsx';
import Landing from './landing/Landing.jsx';
import Userdb from './User_db/Userdb.jsx';
import Agentdb from './Agent_db/App.jsx';
import Dashboard from './Agent_db/pages/Dashboard.jsx';
import Header from './login/Header.jsx';
import Footer from './login/Footer.jsx';
import AddPolicy from './Agent_db/pages/AddPolicy';
import PolicyList from './Agent_db/pages/PolicyList';
import EditPolicy from './Agent_db/pages/EditPolicy';
import PolicyDetails from './Agent_db/pages/PolicyDetails';
import Users from './Agent_db/pages/Users';  // New Import
import Policies from './Agent_db/pages/Policies';  // New Import
import Categories from './Agent_db/pages/Categories';  // New Import
import SubCategories from './Agent_db/pages/SubCategories';  // New Import
import AllPolicies from './Agent_db/pages/SoldPolicies';  // New Import
import ApprovedPolicyHolders from './Agent_db/pages/ApprovedPolicyHolders';  // New Import
import PendingApproval from './Agent_db/pages/PendingApprovals';  // New Import
import DisapprovedPolicyHolders from './Agent_db/pages/DisapprovedPolicyHolders';  // New Import
import InsuranceCards from './Agent_db/pages/InsuranceCards.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Userdb" element={<Userdb />} />
        <Route path="/Agentdb" element={<Agentdb />} />
        <Route path="/dashboard" element= {<Dashboard />} />
        <Route path="/add-policy"element={<InsuranceCards />}/>
        <Route path="/policy-list" element={<PolicyList />}/>
        <Route path="/edit-policy/:id" element={<EditPolicy />}/>
        <Route path="/policy-details/:id" element={<PolicyDetails />}/>
          {/* New routes for additional pages */}
        <Route path="/users" element={<Users />}/>
        <Route path="/policies" element={<Policies />}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/subcategories" element={<SubCategories />}/>
        <Route path="/all-policies" element={<AllPolicies />}/>
        <Route path="/approved-policy-holders" element={<ApprovedPolicyHolders />}/>
        <Route path="/pending-approval" element={<PendingApproval />}/>
        <Route path="/disapproved-policy-holders" element={<DisapprovedPolicyHolders />}/>
      </Routes>
    </Router>
  );
}

export default App