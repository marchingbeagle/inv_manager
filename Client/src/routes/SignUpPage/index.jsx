import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SignInput from "../../components/SignInput";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);
  const [typedName, setTypedName] = useState("");
  const [typedPhoneNumber, setTypedPhoneNumber] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [signUpResult, setSignUpResult] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSignUpResult(
      signup(typedName, typedEmail, typedPassword, typedPhoneNumber)
    );
    signUpResult && navigate("/signin");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <section className="w-4/5 border-2 p-8 md:w-2/6">
        <h1 className="text-center text-xl uppercase">Sign Up</h1>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <p className="text-red-600">
            {signUpResult ? "* Email is already used" : ""}
          </p>
          <SignInput
            required
            setValue={setTypedName}
            placeholder={"Type your name"}
            label={"Name"}
            value={typedName}
          />
          <SignInput
            required
            setValue={setTypedEmail}
            placeholder={"Type your email"}
            label={"Email"}
            value={typedEmail}
          />
          <SignInput
            required
            setValue={setTypedPassword}
            placeholder={"Type your password"}
            label={"Password"}
            type="password"
            value={typedPassword}
          />
          <SignInput
            setValue={setTypedPhoneNumber}
            placeholder={"Type your phone number"}
            label={"Phone number"}
            value={typedPhoneNumber}
            type="number"
          />

          <button
            type="submit"
            className="rounded bg-blue-400 px-8 py-4 font-bold uppercase text-white"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
