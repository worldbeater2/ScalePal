import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase/firebase";
import Blog from "./pages/Frontend/Blog";
import Dashboard from "./pages/Dashboard/Dashboard";
import Homepage from "./pages/Frontend/Homepage";
import Login from "./pages/Frontend/Login";
import Products from "./pages/Frontend/Products";
import Services from "./pages/Frontend/Services";
import Signup from "./pages/Frontend/Signup";
import ScrollToTop from "./units/ScrollfixTop/ScrollToTop";
import ProtectedRoute from "./units/RouteProtection/ProtectedRoute";
import Dashboardmain from "./pages/Dashboard/Dashboardmain";
import { UserProvider } from "./units/UserContext/UserContext";
import DashAnalytics from "./pages/Dashboard/DashAnalytics";
import DashStatus from "./pages/Dashboard/DashStatus";
import DashTemplate from "./pages/Dashboard/Templates/DashTemplate";
import DashboardWorkspace from "./pages/Dashboard/DashboardWorkspace";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import TemplateOverview from "./pages/Dashboard/Templates/Templateoverview";
import DisplayDocument from "./pages/Dashboard/Templates/DisplayDocument";



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <UserProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="worldbeater" element={<AdminDashboard />} />
          

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboardmain />
              </ProtectedRoute>
            }
          >
            {/* Nested routes for templating */}

            <Route path="templates" element={<DashTemplate />}>
              <Route index element={<Navigate to="docs" replace />} />
              <Route path=":id" element={<TemplateOverview />} />
              {/* <Route path="/dashboard/templates/:id/documents" element={<DisplayDocument />} /> */}
              <Route path=":id/documents" element={<DisplayDocument />} />

              {/* <Route path="docs" element={<Templateoverview />} /> */}
            </Route>

            <Route path="analytics" element={<DashAnalytics />} />
            <Route path="workspace" element={<DashboardWorkspace />} />
            <Route path="status" element={<DashStatus />} />
            <Route path="overview" element={<Dashboard />} />
            
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth } from "./firebase/firebase";
// import Blog from "./pages/Frontend/Blog";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Homepage from "./pages/Frontend/Homepage";
// import Login from "./pages/Frontend/Login";
// import Products from "./pages/Frontend/Products";
// import Services from "./pages/Frontend/Services";
// import Signup from "./pages/Frontend/Signup";
// import ScrollToTop from "./units/ScrollfixTop/ScrollToTop";
// import ProtectedRoute from "./units/RouteProtection/ProtectedRoute";
// import Dashboardmain from "./pages/Dashboard/Dashboardmain";
// import { UserProvider } from "./units/UserContext/UserContext";
// import DashAnalytics from "./pages/Dashboard/DashAnalytics";
// import DashStatus from "./pages/Dashboard/DashStatus";
// import DashTemplate from "./pages/Dashboard/Templates/DashTemplate";
// import DashboardWorkspace from "./pages/Dashboard/DashboardWorkspace";
// import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
// import TemplateOverview from "./pages/Dashboard/Templates/Templateoverview";
// import DisplayDocument from "./pages/Dashboard/Templates/DisplayDocument";

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setIsLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <span className="loading loading-ring loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <ScrollToTop />
//       <UserProvider>
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Homepage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/home" element={<Homepage />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="worldbeater" element={<AdminDashboard />} />
          
//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute user={user}>
//                 <Dashboardmain />
//               </ProtectedRoute>
//             }
//           >
//             {/* Nested routes for templating */}
//             <Route path="templates" element={<DashTemplate />}>
//               <Route path=":id" element={<TemplateOverview />} />
//               <Route path=":id/documents" element={<DisplayDocument />} />
//             </Route>

//             <Route path="analytics" element={<DashAnalytics />} />
//             <Route path="workspace" element={<DashboardWorkspace />} />
//             <Route path="status" element={<DashStatus />} />
//             <Route path="overview" element={<Dashboard />} />
            
//             <Route index element={<Dashboard />} />
//           </Route>
//         </Routes>
//       </UserProvider>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;
