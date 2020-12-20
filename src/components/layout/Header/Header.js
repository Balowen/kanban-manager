import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Kanban Manager Logo" />
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li>
              <GiHamburgerMenu />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
