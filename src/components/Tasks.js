import React from "react";
import { useProjectsValue, useSelectedProject } from "../context";
import { getTitle, matchingTasksExist, getMatchingTitle } from "../helpers";
import { matchingTasks } from "../constants";
import { Board } from "./Board/Board";

export const Tasks = () => {
  const { selectedProject } = useSelectedProject();
  const { projects } = useProjectsValue();
  let projectName = "";

  if (matchingTasksExist(selectedProject) && selectedProject) {
    projectName = getMatchingTitle(matchingTasks, selectedProject).name;
  }

  if (
    projects &&
    selectedProject.length > 0 &&
    selectedProject &&
    !matchingTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  return (
    <div className="tasks">
      <h2>{projectName}</h2>
      <Board />
    </div>
  );
};
