import { useState } from "react";
import { useProjectsValue, useSelectedProject } from "../context";
import { Project } from "./layout/Project";

export const Projects = ({ activeValue = true, setActiveStyle }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProject();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={projects.projectId}
        className={
          active === projects.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }
        onKeyDown={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        onClick={() => {
          setActiveStyle("");
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
        <Project project={project} />
      </li>
    ))
  );
};
