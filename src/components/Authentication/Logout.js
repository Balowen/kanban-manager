import * as React from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../../firebase";
export default function Logout() {
  const history = useHistory();

  React.useEffect(() => {
    auth.signOut();
    history.push("/");
  }, []);

  return <div>Wylogowywanie...</div>;
}
