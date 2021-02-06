import React, { useEffect } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { getTitle, collatedTasksExist, getCollatedTitle } from "../helpers";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { Board } from "./Board/Board";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = "";
  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
    console.log("projectname 1:", projectName);
  }
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    console.log("projectname 2:", projectName);
  }

  useEffect(() => {
    document.title = `${projectName}`;
  });

  console.log("tasks", tasks);

  return (
    <div className="tasks">
      <h2>{projectName}</h2>
      {/* TODO: Task__list or Board zależnie od state */}
      {/* <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
            <span style={{ margin: "auto" }}>{task.date}</span>
          </li>
        ))}
      </ul> */}
      {/* {selectedProject === "NOTEPAD"} */}
      <Board />
      {/* <AddTask /> */}
    </div>
  );
};
