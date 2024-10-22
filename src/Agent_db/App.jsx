import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import Navbar from './components/Navbar'; // Import Navbar
import ExtraFooter from './components/ExtraFooter';
import AdminFooter from './components/AdminFooter';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPolicy from './pages/AddPolicy';
import Claimsn from './pages/Claimsn';
import PolicyList from './pages/PolicyList';
import EditPolicy from './pages/EditPolicy';
import PolicyDetails from './pages/PolicyDetails';
import Users from './pages/Users';  // New Import
import Policies from './pages/Policies';  // New Import
import Categories from './pages/Categories';  // New Import
import SubCategories from './pages/SubCategories';  // New Import
import AllPolicies from './pages/SoldPolicies';  // New Import
import ApprovedPolicyHolders from './pages/ApprovedPolicyHolders';  // New Import
import PendingApproval from './pages/PendingApprovals';  // New Import
import DisapprovedPolicyHolders from './pages/DisapprovedPolicyHolders';  // New Import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle o with predefined credentials
  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid o credentials');
    }
  };

  // Handle logout by setting authentication to false
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <AdminHeader onLogout={handleLogout} />
      
      {/* Show Navbar only when authenticated */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <main style={{ paddingBottom: '50px' }}>
        <Routes>
          {/* Redirect to dashboard if already authenticated */}
          <Route
            path="/Login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />

          {/* Protected routes - only accessible if authenticated */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/add-policy"
            element={
              isAuthenticated ? <AddPolicy /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/claim"
            element={
              isAuthenticated ? <Claimsn /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/policy-list"
            element={
              isAuthenticated ? <PolicyList /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/edit-policy/:id"
            element={
              isAuthenticated ? <EditPolicy /> : <Navigate to="/o" />
            }
          />
          
          <Route
            path="/policy-details/:id"
            element={
              isAuthenticated ? <PolicyDetails /> : <Navigate to="/o" />
            }
          />
          {/* New routes for additional pages */}
          <Route
            path="/users"
            element={
              isAuthenticated ? <Users /> : <Navigate to="/o" />
            }
          />

          <Route
            path="/policies"
            element={
              isAuthenticated ? <Policies /> : <Navigate to="/o" />
            }
          />

          <Route
            path="/categories"
            element={
              isAuthenticated ? <Categories /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/subcategories"
            element={
              isAuthenticated ? <SubCategories /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/all-policies"
            element={
              isAuthenticated ? <AllPolicies /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/approved-policy-holders"
            element={
              isAuthenticated ? <ApprovedPolicyHolders /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/pending-approval"
            element={
              isAuthenticated ? <PendingApproval /> : <Navigate to="/o" />
            }
          />
          <Route
            path="/disapproved-policy-holders"
            element={
              isAuthenticated ? <DisapprovedPolicyHolders /> : <Navigate to="/o" />
            }
          />

          {/* Redirect all unknown routes to o */}
          <Route path="*" element={<Navigate to="/o" />} />
        </Routes>
      </main>

      <ExtraFooter />
      <AdminFooter />
    </Router>
  );
}

export default App;
