import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";

import { Projects } from "../Projects";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue;
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar">
      <ul className="sidebar__generic">
        <li className="inbox">
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li className="today">
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li className="next_7">
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      {/* make an ul now and populated it with li elements that we pull from the projects component that we map through for each and every single one of them, that we pull from firestore */}
      <ul className="sidebar__projects">hi</ul>
      <Projects />
    </div>
  );
};
