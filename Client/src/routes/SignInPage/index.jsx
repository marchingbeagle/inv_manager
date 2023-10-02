import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SignInput from "../../components/SignInput";

export default function SignInPage() {
  const { signin } = useContext(AuthContext);
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [failToSignIn, setFailToSignIn] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const signInResult = await signin(typedEmail, typedPassword);
    if (signInResult) {
      navigate("/");
    } else {
      setFailToSignIn(true);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <section className="w-4/5 border-2 p-8 md:w-2/6">
        <h1 className="text-center text-xl uppercase">Sign in</h1>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          {failToSignIn ? (
            <p className="text-red-400">Wrong email/password combination</p>
          ) : (
            ""
          )}
          <SignInput
            setValue={setTypedEmail}
            placeholder={"Type your email"}
            label={"Email"}
            value={typedEmail}
          />
          <SignInput
            type="password"
            setValue={setTypedPassword}
            placeholder={"Type your password"}
            label={"Password"}
            value={typedPassword}
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="rounded bg-blue-400 px-8 py-4 font-bold uppercase text-white"
            >
              Sign in
            </button>
            <Link
              to="/signup"
              className="box-border inline-block rounded px-8 py-4 text-sm font-bold uppercase text-gray-500"
            >
              Dont have an account?
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
