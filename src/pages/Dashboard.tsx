import * as React from "react";
import Home from "../components/Home";
import LeftbarAnimated from "../components/styled/LeftbarAnimated";

const Dashboard = ({ logout }: any) => {
  React.useEffect(() => {
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
