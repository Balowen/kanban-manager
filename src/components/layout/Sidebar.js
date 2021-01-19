import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek, FaTasks } from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import { Projects } from "../Projects";
import { AddProject } from "../AddProject";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("today");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="notepad"
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
          data-testid="today"
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
          data-testid="next_week"
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
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <MdExpandMore
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
