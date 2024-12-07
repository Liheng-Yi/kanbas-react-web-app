import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Define links based on whether the user is signed in
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation">
      {links.includes("Signin") && (
        <Link to="/Kanbas/Account/Signin"> Signin </Link>
      )}
      <br />
      {links.includes("Signup") && (
        <Link to="/Kanbas/Account/Signup"> Signup </Link>
      )}
      <br />
      {links.includes("Profile") && (
        <Link to="/Kanbas/Account/Profile"> Profile </Link>
      )}
      <br />
    </div>
  );
}
