import { Link, useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  // Get the current course ID (cid) from the URL using useParams
  const { cid } = useParams<{ cid: string }>();

  // Get the current location to determine which link is active
  const location = useLocation();

  // Array of links for the course navigation
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div
      className="wd list-group rounded-0 d-none d-md-block"
      id="wd-courses-navigation"
    >
      {links.map((link) => (
        <Link
          key={link}
          className={`list-group-item border-0 ${
            location.pathname.includes(link) ? "active" : "text-danger"
          }`}
          to={`/Kanbas/Courses/${cid}/${link}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
