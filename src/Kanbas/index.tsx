import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import TOC from "../Labs/TOC";
import { useNavigate } from "react-router-dom";
import "./styles.css";


export default function Kanbas() {
  const navigate = useNavigate();  
  const goToLab1 = () => {
    navigate('/Labs/Lab1');  
  };

  return (
    
    <div id="wd-kanbas">

      <button onClick={() => goToLab1()}>Go back to Landing page</button>

            <KanbasNavigation />

            <div className="wd-main-content-offset p-3">
              <Routes>
                <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Courses/:cid/*" element={<Courses />} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>

    </div>
  );
}
