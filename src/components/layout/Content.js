import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";

export const Content = () => {
  return (
    <section className="content">
      <Sidebar />
      <div className="content__editor">
        <Tasks />
      </div>
    </section>
  );
};
