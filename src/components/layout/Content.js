import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks.jsx";

export const Content = () => (
  <section>
    <Sidebar />
    <Tasks />
  </section>
);
