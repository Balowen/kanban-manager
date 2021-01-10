import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue;
  const [active, setActive] = useState("today");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li data-testid="today" className="today">
          <span>
            <FaCalendarDay />
          </span>
          <span>Dzisiejsze zadania</span>
        </li>
        <li data-testid="next_week" className="next_week">
          <span>
            <FaCalendarWeek />
          </span>
          <span>Ten tydzień</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <MdExpandMore />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
};
