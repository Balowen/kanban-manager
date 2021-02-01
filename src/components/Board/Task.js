import { Fragment, useState } from "react";
import { Checkbox } from "../Checkbox";
import { TaskModal } from "./TaskModal";

export const Task = ({ task, moveTask, setDragElement }) => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);
  const onOpen = () => setShowModal(true);
  const dragstart_handler = ({ dataTransfer, target }) => {
    dataTransfer.setData("task", JSON.stringify(task));
    setDragElement(task);
    // "Znikanie" zadania podczas przeciągania go
    setTimeout(() => {
      target.style.visibility = "hidden";
    }, 1);
  };

  const dragover_handler = (e) => {
    moveTask(e.target.innerText);
    e.preventDefault();
  };

  const dragend_handler = (e) => (e.target.style.visibility = "visible");
  return (
    <Fragment>
      <div
        className="task"
        onClick={onOpen}
        draggable="true"
        onDragStart={dragstart_handler}
        onDragOver={dragover_handler}
        onDragEnd={dragend_handler}
      >
        <Checkbox id={task.id} />
        <p>{task.task}</p>
      </div>
      <TaskModal show={showModal} onClose={onClose} task={task} />
    </Fragment>
  );
};
