import { useEffect } from "react";
import Home from "../components/Home";
import LeftbarAnimated from "../components/styled/LeftbarAnimated";


const Dashboard = ({ logout }) => {

  useEffect(() => {
    document.title = "Dashboard | Home";
  }, []);

  return (
    
    <>
      <LeftbarAnimated logout={logout}>
        <Home />
      </LeftbarAnimated>
    </>
  );
};
export default Dashboard;
