import { useEffect } from "react";
import LeftbarAnimated from "./styled/LeftbarAnimated";
import StyledRoom from "./styled/StyledRoomInfo";
// import image from "../assets/img/image";

const RoomInfo = ({ logout }) => {
  useEffect(() => {
    document.title = "Dashboard | Room Info";
  }, []);
  return (
    <>
      <LeftbarAnimated logout={logout}>
        <StyledRoom />
      </LeftbarAnimated>
    </>
  );
};
export default RoomInfo;
