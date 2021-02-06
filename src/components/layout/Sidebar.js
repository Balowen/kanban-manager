import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek, FaTasks } from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("notepad");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={active === "notepad" ? "active" : undefined}
          onClick={() => {
            setActive("notepad");
            setSelectedProject("NOTEPAD");
          }}
        >
          <span>
            <FaTasks />
          </span>
          <span>Notes</span>
        </li>

        <li
          className={active === "today" ? "active" : undefined}
          data-testid="today-action"
          role="button"
          onClick={() => {
            setActive("today");
            setSelectedProject("TODAY");
          }}
        >
          <span>
            <FaCalendarDay />
          </span>
          <span>Dzisiejsze zadania</span>
        </li>
        <li
          className={active === "next_week" ? "active" : undefined}
          onClick={() => {
            setActive("next_week");
            setSelectedProject("NEXT_WEEK");
          }}
        >
          <span>
            <FaCalendarWeek />
          </span>
          <span>Ten tydzień</span>
        </li>
      </ul>
      <div
        className={"sidebar__middle "}
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <MdExpandMore
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projekty</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
      <span>
        <Link to="logout">Wyloguj</Link>
      </span>
    </div>
  );
};
