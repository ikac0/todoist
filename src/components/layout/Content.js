import React from "react";
import { Tasks } from "../Tasks.component";
import { Sidebar } from "./Sidebar";

export const Content = () => (
  <section>
    <Sidebar />
    <Tasks />
  </section>
);
