import { useEffect } from "react";
import { ContactList } from "../components/ContactList";
import LeftbarAnimated from "../components/styled/LeftbarAnimated";
// import image from "../assets/img/image";



const Contact = ({logout, props}: any) => {
  useEffect(() => {
    document.title = "Dashboard | Contact";
  }, []);
  return (
    <>
        <LeftbarAnimated logout={logout}>
          <ContactList />
        </LeftbarAnimated>
    </>
  );
};
export default Contact;
