import { useState } from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { Project } from "./layout/Project";

export const Projects = ({ activeValue = true, setActiveStyle }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  console.log(projects);

  return (
    projects &&
    projects.map((project) => (
      <li
        key={projects.projectId}
        data-doc-id={projects.projectId}
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
