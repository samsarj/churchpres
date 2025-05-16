import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ThemeSettings = ({ show, setShow }) => {
  function handleClose() {
    console.log("Closing theme settings");
    setShow(false);
  }

  const [themes, setThemes] = useState({
    globalDefault: "default-light",
    themes: [
      {
        name: "Default Light",
        slug: "default-light",
        backgroundColor: "#ffffff",
        content: {
          color: "#000000",
          position: "center",
        },
        textColor: "#000000",
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        lineHeight: "1.5",
        textAlign: "center",
        customCSS: "",
      },
      {
        name: "Dark Mode",
        slug: "dark-mode",
        backgroundColor: "#000000",
        content: {
          color: "#000000",
          position: "center",
        },
        textColor: "#ffffff",
        fontFamily: "Georgia, serif",
        fontSize: "28px",
        lineHeight: "1.6",
        textAlign: "left",
        customCSS: "h1 { font-size: 36px; color: red; }",
      },
    ],
  });
  const [editingTheme, setEditingTheme] = useState(themes.themes[0]);

  useEffect(() => {
    const updatedThemes = themes.themes.map((theme) =>
      theme.slug === editingTheme.slug ? editingTheme : theme
    );
    setThemes((prevThemes) => ({ ...prevThemes, themes: updatedThemes }));
    console.log("Themes updated", updatedThemes);
  }, [editingTheme]);

  const handleThemeChange = (key, value) => {
    setEditingTheme({ ...editingTheme, [key]: value });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Theme Settings for
          <DropdownButton
            as={ButtonGroup}
            title={editingTheme.name}
            id="bg-nested-dropdown"
          >
            <Dropdown.Item eventKey="1">{editingTheme.name}</Dropdown.Item>
            <Dropdown.Divider />
            {themes.themes
              .filter((theme) => theme !== editingTheme)
              .map((theme, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setEditingTheme(theme)}
                  >
                    {theme.name}
                  </Dropdown.Item>
                );
              })}
          </DropdownButton>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={8}>
              <Tabs
                // defaultActiveKey="information"
                // id="fill-tab"
                className="mb-3"
                fill
              >
                <Tab eventKey="information" title="Title & Info">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Theme Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={editingTheme.name}
                      onChange={(e) =>
                        handleThemeChange("name", e.target.value)
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Theme Slug" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={editingTheme.slug}
                      onChange={(e) =>
                        handleThemeChange("slug", e.target.value)
                      }
                    />
                  </FloatingLabel>
                  Items to include:
                </Tab>
                <Tab eventKey="colors" title="Colors"></Tab>
                <Tab eventKey="typography" title="Typography"></Tab>
                <Tab eventKey="customCSS" title="Custom CSS"></Tab>
              </Tabs>
            </Col>
            <Col>Preview</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          type="checkbox"
          id="themeActive"
          label="Global Theme"
          checked={themes.globalDefault === editingTheme.slug}
          onChange={(e) => {
            if (e.target.checked) {
              setThemes({ ...themes, globalDefault: editingTheme.slug });
            }
          }}
        />
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ThemeSettings;
