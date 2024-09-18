import { Link } from 'react-router-dom';


export default function TOC() {
  return (
    <ul>
      <li><a id = "wd_github" href="https://github.com/Liheng-Yi/kanbas-react-web-app" target="_blank">Liheng Yi's github</a></li>
      <li><Link to="/Labs/Lab1">Lab 1</Link></li>
      <li><Link to="/Labs/Lab2">Lab 2</Link></li>
      <li><Link to="/Labs/Lab3">Lab 3</Link></li>
      <li><Link to="/Kanbas">Kanbas</Link></li>
    </ul>
  );
}
