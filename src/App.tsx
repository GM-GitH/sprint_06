// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import React, { ReactElement, SetStateAction, useState } from "react";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import { ContextProvider } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { unfetchRooms } from "./features/rooms/roomsSlice";
import RoomInfo from "./components/RoomInfo";
import BarChart from "./components/styled/ReservationStats";
import { AppDispatch } from "./app/store";

type UserProps = {
    email: string
    password: string
  }

function App(): ReactElement {
  const [user, setUser] = useState<null | UserProps>(null);
  // eslint-disable-next-line
  const login = (): ReactElement => {
    setUser({
      email: "admin@example.com",
      password: "example",
    });
    localStorage.setItem("isLogin", "true");
    return <Navigate to="/" />;
  };
  const dispatch: SetStateAction<AppDispatch> = useDispatch();
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("isLogin");
    dispatch(unfetchRooms());
  };

  return (
    <Router basename="/sprint_04">
      {/* <div style={{ position:"relative", display: "inline-block", width: "100%", backgroundColor:"gray", zIndex:"0"}}>
        <Link to="/login">Login </Link>
        <Link to="/"> | Dashboard</Link>
      {user ? <button style={{ float: "right", padding: "5px"}} onClick={logout}>Logout</button> : <button style={{ float: "right", padding: "5px"}} onClick={login}>Login</button>}
      </div>  */}

      <ContextProvider>
        <Routes>
          <Route path="/d3" element={<BarChart />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
          <Route element={<PrivateRoute user={user} />}>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Dashboard logout={logout} />} />
            <Route path="/rooms" element={<Rooms logout={logout} />} />
            <Route path="/rooms/:id" element={<RoomInfo logout={logout} />} />
            <Route path="/rooms/edit/:id" element={<Rooms logout={logout} />} />
            <Route path="/bookings" element={<Bookings logout={logout} />} />
            <Route path="/users" element={<Users logout={logout} />} />
            <Route path="/users/:id" element={<h1>ID: </h1>} />
            <Route path="/contact" element={<Contact logout={logout} />} />
          </Route>
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
