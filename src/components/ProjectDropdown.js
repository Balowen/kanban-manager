import { useProjectsValue } from "../context";

export const ProjectDropdown = ({
  setProject,
  showProjectDropdown,
  setShowProjectDropdown,
}) => {
  const { projects } = useProjectsValue();

  if (projects && showProjectDropdown) {
    return (
      <div className="project-dropdown">
        <ul className="project-dropdown__list">
          {projects.map((project) => (
            <li
              key={project.projectId}
              onClick={() => {
                setProject(project.projectId);
                setShowProjectDropdown(false);
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};
