import { useEffect } from "react";
// import image from "../assets/img/image";
// import GuestList from "../components/GuestList";
import LeftbarAnimated from "../components/styled/LeftbarAnimated";
import { UsersList } from "../components/UsersList";

const Users = ({ logout }: any) => {
  useEffect(() => {
    document.title = "Dashboard | Users";
  }, []);
  return (
    <>
      <LeftbarAnimated logout={logout}>
        <UsersList />
      </LeftbarAnimated>
    </>
  );
};
export default Users;
