import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks.jsx";

export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
  </section>
);
