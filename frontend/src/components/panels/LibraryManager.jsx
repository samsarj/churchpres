import Accordion from "react-bootstrap/Accordion";
import SongList from "../libraries/songs/SongList";
import Bible from "../libraries/bible/Bible";
import { useGlobalStore } from "../../stores/globalStore";

function LibraryManager() {
  const previewedItem = useGlobalStore((state) => state.previewItem);
  const setPreviewedItem = useGlobalStore((state) => state.setPreviewItem);

  const libraries = [
    {
      name: "Songs",
      description: "Songs is a library for songs.",
      module: SongList,
      props: { setPreviewedItem, previewedItem },
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
            <library.module {...library.props} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default LibraryManager;
