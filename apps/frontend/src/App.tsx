import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { LandingPage} from "./Pages/Landing";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { Dashboard } from "./Pages/Dashboard";
import { VideoCreator } from "./Pages/VideoCreatos";


export function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/video-creator" element={<VideoCreator/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
