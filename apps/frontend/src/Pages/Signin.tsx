export function Signin() {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col text-white bg-stone-800 items-center justify-center">
          <h6 className="text-3xl font-bold">Log in ot Higgsfield Earn</h6>
          <h1 className="pb-10 pt-3">Sign in and continue creating</h1>

          <form className="flex flex-col ">
            <input
              className="border rounded-lg px-12 py-2"
              type="text"
              placeholder="Email"
            />
            <input
              className="border rounded-lg px-12 py-2"
              type="text"
              placeholder="Password"
            />
            <button className="border rounded-lg px-30 py-2 hover:cursor-pointer">
              login
            </button>
          </form>
        </div>
        <div className="flex-1 flex text-white items-center justify-center ">
          <button></button>
        </div>
      </div>
    );
}