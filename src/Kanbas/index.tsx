import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import TOC from "../Labs/TOC";
import { useNavigate } from "react-router-dom";


export default function Kanbas() {
  const navigate = useNavigate();  // Create a navigate function using the hook
  const goToLab1 = () => {
    navigate('/Labs/Lab1');  // Adjust the route as needed for your routing setup
  };

  return (
    <div id="wd-kanbas">
      <button onClick={() => goToLab1()}>Go back to Landing page</button>
      <table>
        <tr>
          <td valign="top">
            <KanbasNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Courses/:cid/*" element={<Courses />} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
