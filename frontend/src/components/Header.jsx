import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Fullscreen, FullscreenExit } from "react-bootstrap-icons";

import { useState, useEffect } from "react";
import UIControls from "./UIControls";

const Header = () => {
  var [date, setDate] = useState(new Date());
  const [currentItem, setCurrentItem] = useState("Current Item");
  const [currentService, setCurrentService] = useState("Current Service");

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <Navbar bg="light" expand="lg" style={{ height: "10vh" }}>
      <Container >
        <Navbar.Brand>ChurchPres</Navbar.Brand>
        <Navbar.Text>{currentItem} | {currentService}</Navbar.Text>
        <Navbar.Text>{date.toLocaleTimeString()} | {date.toLocaleDateString()}</Navbar.Text>
        <UIControls />
      </Container>
    </Navbar>
  );
};

export default Header;
