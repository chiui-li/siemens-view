import { createRoot } from "react-dom/client";
import "./index.css";
import VarTable from "./VarTable.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <VarTable />
  </>,
);
