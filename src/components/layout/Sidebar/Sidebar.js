import React from "react";
import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek } from "react-icons/fa";

export const Sidebar = () => (
  <div className="sidebar" data-testid="sidebar">
    <ul className="sidebar__generic">
      <li>
        <span>
          <FaCalendarDay />
        </span>
        <span>Dzisiejsze zadania</span>
      </li>
      <li>
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
    <ul className="sidebar__projects">Projects will be here!</ul>
    Add Project Component here!!
  </div>
);
