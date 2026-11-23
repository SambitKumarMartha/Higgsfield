import { useState } from "react";
export function Signup() {
  const [username, setUsername] = useState("")
  const [password,setPassword]=useState("")
  return (
      <div className="flex h-screen">
        <div className="flex-1 bg-black"></div>
        <div className=" bg-white flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold pb-2">Create an Account</h1>
          <p>Singnup and Generate for Free</p>
          <form className="flex flex-col pt-10">
            <input
              className="border rounded-lg px-12 py-2"
              type="text"
              placeholder="Username"
              onChange={(e)=>{setUsername(e.target.value)}}
            />
            <input
              className="border rounded-lg px-12 py-2"
              type="password"
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button className="border rounded-lg px-30 py-2 hover:cursor-pointer">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
}