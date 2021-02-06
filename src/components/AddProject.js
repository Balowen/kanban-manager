import { useContext, useState } from "react";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";
import { useAuth } from "../context/AuthContext";

export const AddProject = ({ initialShow = false, user }) => {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(initialShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    if (projectName) {
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: currentUser.uid,
          // TODO : auth().uid
        })
        .then(() => {
          setProjects([...projects]); // trigger a refresh of projects
          setProjectName("");
          setShow(false);
        });
    }
  };

  if (show) {
    return (
      <div className="add-new-project">
        <div className="add-new-project__input">
          <input
            className="add-new-project__name"
            placeholder="Nazwij swój nowy projekt"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
          <button
            className="add-new-project__submit"
            onClick={() => addProject()}
          >
            Dodaj projekt
          </button>
          <span
            className="add-new-project__cancel"
            onClick={() => setShow(false)}
          >
            Anuluj
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="add-new-project">
      <span className="add-new-project__text" onClick={() => setShow(!show)}>
        Stwórz nowy projekt
      </span>
    </div>
  );
};
