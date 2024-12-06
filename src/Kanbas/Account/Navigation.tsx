import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link 
            to="/Kanbas/Account/Signin"
            className={`list-group-item border border-0 ${pathname.includes("Signin") ? "text-danger" : ""}`}
          >
            Sign In
          </Link>
          <Link 
            to="/Kanbas/Account/Signup"
            className={`list-group-item border border-0 ${pathname.includes("Signup") ? "text-danger": ""}`}
          >
            Sign Up
          </Link>
        </>
      )}
      {currentUser && (
        <Link 
          to="/Kanbas/Account/Profile"
          className="list-group-item text-danger border border-0"
        >
          Profile
        </Link>
      )}
    </div>
  );
}