import React from "react";
import { firebase } from "../firebase";

export const Checkbox = ({ id, description }) => {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      role="button"
    >
      <span className="checkbox"></span>
    </div>
  );
};
