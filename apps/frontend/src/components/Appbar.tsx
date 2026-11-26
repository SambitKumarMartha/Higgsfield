import { Button } from "./ui/button"
import { useNavigate } from "react-router";
import { Link } from "react-router";
export function Appbar() {
  const navigate = useNavigate();
    return (
      <div className="bg-black text-white flex justify-between p-3">
        <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyduSBSvd6_6K37FM8t7fte_tHWrf3fqr26mwNWkmmxZMXMeH4626aptUw&s=10" alt="Higgsfield" className="h-10 w-auto" /></Link>
        <div className="flex justify-between">
          <div className="px-5">
            <Button
              className="px-8 bg-stone-800"
              variant={"outline"}
              onClick={() => navigate("/signin")}
            >
              Signin
            </Button>
          </div>
          <div>
            <Button
              className="px-8 bg-stone-800"
              variant={"outline"}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    );
}