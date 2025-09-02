import { Button, Modal } from "react-bootstrap";

const ModalComp = ( {show, setShowModal, message}) => {

    return (
        <Modal show={show} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComp;