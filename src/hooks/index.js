import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";
import dayjs from "dayjs";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  // polling for new tasks all the time
  // WEBSOCKET.io late TODO

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "AZqpRTFsJou2NreVy2XN");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            dayjs().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                dayjs(task.data, "DD-MM-YYYY").diff(dayjs(), "days") <= 7 &&
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
  const [projects, setProjects] = useState([]);
  // get projects once
  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "AZqpRTFsJou2NreVy2XN")
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

  return projects;
};
