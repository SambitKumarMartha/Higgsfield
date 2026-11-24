import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function Signin() {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col text-white bg-stone-800 items-center justify-center">
          <h6 className="text-3xl font-bold">Log in ot Higgsfield Earn</h6>
          <h1 className="pb-10 pt-3">Sign in and continue creating</h1>

          <form className="flex flex-col gap-4">
            <Input
              
              type="text"
              placeholder="Email"
            />
            <Input
            
              type="text"
              placeholder="Password"
            />
            <Button variant={"outline"} className="hover:cursor-pointer">
              login
            </Button>
          </form>
        </div>
        <div className="flex-1 flex text-white items-center justify-center ">
          <Button></Button>
        </div>
      </div>  
    );
}