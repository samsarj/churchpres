import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { CurrentItemAndService, CurrentTimeAndDate } from "./CurrentInfo";

const Footer = () => {

  return (
    <Navbar bg="light" expand="lg" style={{ height: "5vh" }}>
      <Container >
        <Navbar.Text><CurrentItemAndService /></Navbar.Text>
        <Navbar.Text><CurrentTimeAndDate /></Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
