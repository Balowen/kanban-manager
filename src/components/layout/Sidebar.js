import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek, FaTasks } from "react-icons/fa";
import { useSelectedProject } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProject();
  const [active, setActive] = useState("notepad");
  const [showProjectsList, setShowProjectsList] = useState(true);

  return (
    <div className="sidebar">
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
        onClick={() => setShowProjectsList(!showProjectsList)}
      >
        <span>
          <MdExpandMore
            className={!showProjectsList ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projekty</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjectsList && <Projects setActiveStyle={setActive} />}
      </ul>
      {showProjectsList && <AddProject />}
      <span className="sidebar__logout">
        <Link to="logout">Wyloguj</Link>
      </span>
    </div>
  );
};
