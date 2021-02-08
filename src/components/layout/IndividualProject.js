import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useProjectsValue, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  // so we can delete project from firebase, but we have to specify the docId
  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection("projects") // the correct spelling of the collection 'project' that we  have hardcoded in the db
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]); // to refresh the state of the current project that we have at the moment
        setSelectedProject("INBOX");
      });
  };
};
