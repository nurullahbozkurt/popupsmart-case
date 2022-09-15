import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../states/app";

const Login = () => {
  const navigate = useNavigate();

  const { setLocalUsername } = useApp();

  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setLoginError(true);
      return;
    }
    setLoginError(false);
    localStorage.setItem("username", JSON.stringify(username));
    setLocalUsername(localStorage.getItem("username"));
    navigate("/app");
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-bgGr shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/30 -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-poiret text-center">
                  Your Todo List App
                </h1>
                <p className="text-sm">Create username to login</p>
              </div>
              <div className="divide-y divide-gray-200">
                <form className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="off"
                      type="text"
                      className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="username"
                    />
                    <label
                      htmlFor="username"
                      className="absolute -mt-1 left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>
                  {loginError && (
                    <div className="bg-red-700/80 text-white text-[10px] rounded px-2">
                      Please enter a valid username
                    </div>
                  )}

                  <div className="relative space-y-2">
                    <button
                      onClick={submitForm}
                      type="submit"
                      className="w-full focus:outline-none text-gray-600 text-sm py-2.5 px-5 rounded-md border border-gray-600 hover:bg-gray-50"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
