import { useState } from "react";
import axios from "axios"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router";
async function signup({username,password,}: {username: string; password: string;}) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username, password
  });
  return response.data
}

export function Signup() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
    const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/signin")
      },
      onError: () => {
      alert("Error while signing up")
    }
  })
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black"></div>
      <div className=" bg-white flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold pb-2">Create an Account</h1>
        <p>Singnup and Generate for Free</p>

        <form className="flex flex-col pt-10 gap-4">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <Button
          variant={"outline"}
          className="hover:cursor-pointer"
          onClick={() => mutation.mutate({ username, password })}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Signing Up ..." : "SignUp"}
        </Button>
      </div>
    </div>
  );
}