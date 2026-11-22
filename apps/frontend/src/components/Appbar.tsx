import { Button } from "./ui/button"
import { useNavigate } from "react-router";
export function Appbar() {
  const navigate = useNavigate();
    return (
      <div className="bg-black text-white flex justify-between p-3">
        <h5>Higgsfield</h5>
        <div className="flex justify-between">
          <div className="px-5">
            <Button className="px-8 bg-stone-800" variant={"outline"} onClick={()=>
              navigate("/signin")
            }>
              Signin
            </Button>
          </div>
          <div>
            <Button className="px-8 bg-stone-800" variant={"outline"} onClick={() =>
              navigate("/signup")
            }>
              Signup
            </Button>
          </div>
        </div>
      </div>
    );
}