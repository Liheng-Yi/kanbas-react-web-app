import { Route, Routes } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./Lab4/store";
import { Provider } from "react-redux";
import TOC from "./TOC";
export default function Labs() {
  return (
    <Provider store={store}>
      <div>
        <h1>Chenyang Li</h1>
        <h2>Section02</h2>
        <h2>
          <a
            href="https://github.com/chenchen218/Chen-react-web-app/tree/a1"
            target="_blank"
          >
            code for a1
          </a>
        </h2>
        <h2>
          <a
            href="https://github.com/chenchen218/Chen-react-web-app/tree/a2"
            target="_blank"
          >
            code for a2
          </a>
        </h2>
        <h2>
          <a
            href="https://github.com/chenchen218/Chen-react-web-app/tree/a3"
            target="_blank"
          >
            code for a3
          </a>
        </h2>

        <h2>
          <a
            href="https://github.com/chenchen218/Chen-react-web-app/tree/a4"
            target="_blank"
          >
            code for a4
          </a>
        </h2>
        <h2>
          <a
            href="https://github.com/chenchen218/Chen-react-web-app/tree/a5"
            target="_blank"
          >
            code for a5
          </a>
        </h2>
        <h2>
          <a
            href="https://a2--kanbas-react-web-app-cs5610-chen.netlify.app/#/Kanbas/Dashboard"
            target="_blank"
          >
            Link to Kanbas
          </a>
        </h2>

        <TOC />
        <Routes>
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4/*" element={<Lab4 />} />
          <Route path="Lab5/*" element={<Lab5 />} />
        </Routes>
      </div>
    </Provider>
  );
}
