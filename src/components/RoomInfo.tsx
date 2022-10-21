import { useEffect } from "react";
import LeftbarAnimated from "./styled/LeftbarAnimated";
import StyledRoom from "./styled/StyledRoomInfo";
// import image from "../assets/img/image";

type Props = {
  logout: () => void
};
const RoomInfo = ({ logout }: Props) => {
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
