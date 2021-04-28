import { useState } from "react";
import dayjs from "dayjs";
import { firebase } from "../firebase";
import { useSelectedProject } from "../context";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";

import { IoMdAdd, IoMdListBox } from "react-icons/io";
import { ProjectDropdown } from "./ProjectDropdown";
import { useAuth } from "../context/AuthContext";

export const AddTask = ({ showAddTask = true, shouldShow = false, status }) => {
  const { currentUser } = useAuth();
  const [task, setTask] = useState("");
  const [project, setProject] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDefault, setShowDefault] = useState(shouldShow);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const { selectedProject } = useSelectedProject();

  const addTask = () => {
    const projectId = project || selectedProject;

    let comparedDate = "";

    if (projectId === "TODAY") {
      comparedDate = dayjs().format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      status &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId: projectId,
          task: task,
          date: comparedDate || dayjs(taskDate).format("DD/MM/YYYY"),
          userId: currentUser.uid,
          status: status,
        })
        .then(() => {
          setTask("");
          setProject("");
          setTaskDate(new Date());
          setShowDefault();
          setShowProjectDropdown(false);
        })
    );
  };

  return (
    <div className={"add-new-task"}>
      {showAddTask && (
        <div
          className="add-new-task__small"
          onClick={() => setShowDefault(!showDefault)}
        >
          <IoMdAdd className="add-new-task__plus" />
          <span className="add-new-task__text">Dodaj zadanie</span>
        </div>
      )}

      {showDefault && (
        <div className="add-new-task__default">
          <ProjectDropdown
            setProject={setProject}
            showProjectDropdown={showProjectDropdown}
            setShowProjectDropdown={setShowProjectDropdown}
          />
          <input
            className="add-new-task__input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="add-new-task__buttons-container">
            <button
              type="button"
              className="add-new-task__buttons-container__submit"
              onClick={() => addTask()}
            >
              Zapisz
            </button>
            <span
              className="add-new-task__buttons-container__cancel"
              onClick={() => {
                setShowDefault(false);
                setShowProjectDropdown(false);
              }}
            >
              Anuluj
            </span>

            <div
              className="add-new-task__buttons-container__project"
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            >
              <IoMdListBox />
            </div>
            <div className="add-new-task__buttons-container__datepicker">
              <DatePicker
                locale={pl}
                dateFormat="dd/MM/yyyy"
                selected={taskDate}
                onChange={(taskDate) => setTaskDate(taskDate)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AddTask.defaultProps = {
  status: "todo",
};
