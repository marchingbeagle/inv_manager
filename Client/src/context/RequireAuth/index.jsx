import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import SignInPage from "../../routes/SignInPage";

export default function RequireAuth({ children }) {
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <SignInPage />;
  }

  return children;
}
