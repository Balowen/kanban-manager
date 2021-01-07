import React from "react";
import { MdExpandMore } from "react-icons/md";
import { FaCalendarDay, FaCalendarWeek } from "react-icons/fa";

export const Sidebar = () => (
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
    <ul className="sidebar__projects">Projects will be here!</ul>
    Add Project Component here!!
  </div>
);
