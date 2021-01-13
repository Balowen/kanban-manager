import React, { useEffect } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { getTitle, collatedTasksExist, getCollatedTitle } from "../helpers";
import { useTasks } from "../hooks";
import { Checkbox } from "./Checkbox";
import { collatedTasks } from "../constants";

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
    document.title = `${projectName}: Kanban`;
  });

  console.log("tasks", tasks);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
