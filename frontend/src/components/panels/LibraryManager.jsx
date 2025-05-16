import Accordion from "react-bootstrap/Accordion";
import SongList from "../libraries/songs/SongList";  // Corrected import path
import Bible from "../libraries/bible/Bible";  // Corrected import path
import { useContext } from "react";
import { DisplayItemContext } from "../../contexts/DisplayItemContext";  // Corrected import path

function LibraryManager() {
  const { previewedItem, setPreviewedItem } = useContext(DisplayItemContext);

  const libraries = [
    {
      name: "Songs",
      description: "Songs is a library for songs.",
      module: SongList,  // Directly pass SongList component here
      props: { setPreviewedItem, previewedItem },  // Pass props to SongList
    },
    {
      name: "Bible",
      description: "Bible is a library for Bible passages.",
      module: Bible,
      props: {},
    }
  ];

  return (
    <Accordion defaultActiveKey="0" flush>
      {libraries.map((library, index) => (
        <Accordion.Item key={index} eventKey={index}>
          <Accordion.Header>{library.name}</Accordion.Header>
          <Accordion.Body>
            <library.module {...library.props} />  {/* Render SongList directly */}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default LibraryManager;
