import { useEffect } from "react";
import { BookingsList } from "../components/BookingsList";
import LeftbarAnimated from "../components/styled/LeftbarAnimated";
// import image from "../assets/img/image";

const Bookings = ({ logout }) => {
  useEffect(() => {
    document.title = "Dashboard | Bookings";
  }, []);
  return (
    <>
      <LeftbarAnimated logout={logout}>
        <BookingsList />
      </LeftbarAnimated>
    </>
  );
};
export default Bookings;
