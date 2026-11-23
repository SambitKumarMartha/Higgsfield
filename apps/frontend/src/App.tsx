import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { LandingPage} from "./Pages/Landing";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { Dashboard } from "./Pages/Dashboard";
import { VideoCreator } from "./Pages/VideoCreatos";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/video-creator" element={<VideoCreator />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
