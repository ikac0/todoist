import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { AddProject } from "../AddProject";
import { Projects } from "../Projects";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("INBOX");
  const [showProjects, setShowProjects] = useState(true); //if eventually someone wants to show/hide projects (with the dropdown icon)

  return (
    <div className="sidebar">
      <ul className="sidebar__generic">
        <li
          className={
            active === "inbox"
              ? "active sidebar__generic-li"
              : "sidebar__generic-li"
          }
          onClick={() => {
            setActive("inbox");
            setSelectedProject("INBOX");
          }}
        >
          <span className="sidebar__generic-icon">
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          className={
            active === "today"
              ? "active sidebar__generic-li"
              : "sidebar__generic-li"
          }
          onClick={() => {
            setActive("today");
            setSelectedProject("TODAY");
          }}
        >
          <span className="sidebar__generic-icon">
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          className={
            active === "next_7"
              ? "active sidebar__generic-li"
              : "sidebar__generic-li"
          }
          onClick={() => {
            setActive("next_7");
            setSelectedProject("NEXT_7");
          }}
        >
          <span className="sidebar__generic-icon">
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 Days</span>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
};
