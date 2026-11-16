import { Button } from "./ui/button"
export function Appbar() {
    return (
      <div className="bg-red-100 flex justify-between">
        <div>Higgsfield</div>
        <div>
          <Button variant={"outline"}>Signin</Button>
          <Button variant={"outline"}>Signup</Button>
        </div>
      </div>
    );
}