import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer || { enrollments: [] });

  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Login" />;
  }
  return children;
}

export default ProtectedRoute;