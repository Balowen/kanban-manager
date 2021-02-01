import { useSelectedProjectValue } from "../../context";
import { useTasks } from "../../hooks";
import { firebase } from "../../firebase";
import { SectionColumn } from "./SectionColumn";
import { Task } from "./Task";
import { DropHandler } from "./DropHandler";
import { useState } from "react";
import "./Board.scss";

export const Board = () => {
  const [dragElement, setDragElement] = useState(null);
  const { selectedProject } = useSelectedProjectValue();
  const { tasks } = useTasks(selectedProject);
  const onDrop = (task, status) => {
    if (task.status === status) {
      return;
    }
    return firebase
      .firestore()
      .collection("tasks")
      .doc(task.id)
      .update({ status: status });
  };

  //   move tasks in one column
  //   const moveTask = (el) => {};

  const setDragEl = (element) => setDragElement(element);

  return (
    <div className="row">
      {["todo", "in progress", "done"].map((status) => {
        return (
          <div key={status} className={"col-wrapper"}>
            <div className={"col-group"}>
              <h5 className={"col-header"}>{status.toUpperCase()}</h5>
              <p className={"col-count"}>
                {tasks.filter((task) => task.status === status).length}
              </p>
            </div>
            <DropHandler onDrop={onDrop} status={status}>
              <SectionColumn>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      setDragElement={setDragEl}
                    />
                  ))}
                <button onClick={(e) => onAddItem(status)}>Add ticket</button>
              </SectionColumn>
            </DropHandler>
          </div>
        );
      })}
    </div>
  );
};
