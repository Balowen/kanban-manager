import Modal from "react-modal";

Modal.setAppElement("#root");

export const TaskModal = ({ show, onClose, task }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className={"modal__close-ctn"}>
        <h1 style={{ flex: "1 90%" }}>Zadanie</h1>
        <button className="modal__close-ctn__btn" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <h2>Opis</h2>
        <p>{task.task}</p>
        <h2>Termin zadania</h2>
        <p>{task.date}</p>
      </div>
    </Modal>
  );
};
