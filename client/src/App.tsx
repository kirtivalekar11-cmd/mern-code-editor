import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Editor from "./pages/Editor";



import ProtectedRoute
from "./components/ProtectedRoute";



function App() {

  return (

    <BrowserRouter>

      <Routes>





        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />





        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />





        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Signup />}
        />







        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />








        {/* EDITOR */}
        <Route
          path="/editor/:projectId"
          element={

            <ProtectedRoute>

              <Editor />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}



export default App;