import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    console.log(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-gray-300 text-base label-text">
                Username
              </span>
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="@username"
              className="bg-slate-400 placeholder:text-gray-300 input input-bordered w-full h-10"
            />
          </div>

          <div className=" relative">
            <label className="label p-2">
              <span className="text-gray-300 text-base label-text">
                password
              </span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="password"
              className="bg-slate-400 placeholder:text-gray-300 input input-bordered w-full h-10"
            />
            <div
              onClick={() => setShow((prev) => !prev)}
              className="text-xl cursor-pointer rounded-full absolute right-0 bottom-2 mr-3"
            >
              {show ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div>
            <button disabled={loading} className="btn btn-block btn-sm mt-5">
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-3 inline-block"
          >
            {"don't"} have account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
