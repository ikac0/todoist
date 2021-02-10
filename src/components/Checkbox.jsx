import React from "react";
import { firebase } from "../firebase";

export const Checkbox = ({ id }) => {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({ archived: true });
    // since its starting archived boolean value is false, now we are updating it to true
  };
  return (
    <div className="checkbox-holder" onClick={() => archiveTask()}>
      <span className="checkbox" />
    </div>
  );
};
