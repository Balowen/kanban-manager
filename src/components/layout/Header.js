import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Kanban Manager Logo" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">+</li>
            <li className="settings__toggle-sidebar">
              <GiHamburgerMenu />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
