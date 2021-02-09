import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import { firebase } from "../../firebase";

export const Project = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("TODAY");
      });
  };

  return (
    <>
      <span className="sidebar__bullet">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <IoMdTrash />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Czy na pewno chcesz usunąć ten projekt?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Usuń
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Anuluj</span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
