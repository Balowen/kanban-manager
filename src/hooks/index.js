import { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

export const useTasks = (selectedProject) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", currentUser.uid);

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            dayjs().format("DD/MM/YYYY")
          ))
        : selectedProject === "NOTEPAD" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_WEEK"
          ? newTasks.filter(
              (task) =>
                dayjs().diff(task.date, "DD-MM-YYYY", "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const { currentUser } = useAuth();

  const [projects, setProjects] = useState([]);
  // get projects once
  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", currentUser.uid)
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
