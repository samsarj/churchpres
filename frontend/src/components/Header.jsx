import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import { CurrentItemAndService, CurrentTimeAndDate } from "./CurrentInfo";

import UIControls from "./UIControls";

const Header = () => {

  return (
    <Navbar bg="light" expand="lg" style={{ height: "10vh" }}>
      <Container >
        <Navbar.Brand>ChurchPres</Navbar.Brand>
        <Navbar.Text><CurrentItemAndService /></Navbar.Text>
        <Navbar.Text><CurrentTimeAndDate /></Navbar.Text>
        <UIControls />
      </Container>
    </Navbar>
  );
};

export default Header;
