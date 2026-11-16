import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";


export function App() {
  return <div>
    <Appbar />
    <BrowserRouter>
      <Routes>
        <Route/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
