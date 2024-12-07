import "./index.css";
import Corners from "./corners";
import Foreground from "./foregroundColor";
import Background from "./backgroundColor";
import Padding from "./padding";
import Position from "./position";
import Margin from "./margins";
import Dimension from "./Dimensions";
import ZIndex from "./Zindex";
import Float from "./float";
import GirdLayout from "./GirdLayout";
import Flex from "./flex";
import ReactIconsSampler from "./Reacticons";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapGird from "./BootstrapGirds";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTable from "./BootstrapTables";
import BootStrapList from "./BootstrapLists";
import BootstrapForm from "./BootStrapForms";
import BootstrapNavigation from "./BootstrapNavigation";
export default function Lab2() {
  return (
    <div className="container">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <div id="wd-css-id-selectors">
        <h3> ID selectors </h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID{" "}
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>
      <p>
        Style attribute allows configuring look and feel right on the element.
        Although it's very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor facilis
        id nulla consequuntur quam, autem quia error, atque repellat reiciendis
        placeat itaque harum commodi fuga. Recusandae, modi neque. Aliquid,
        reprehenderit!
      </p>
      <h2>Colors</h2>
      <h3 className="wd-fg-color-blue">Foreground color</h3>
      <p className="wd-fg-color-red">
        The text in this paragraph is red but
        <span className="wd-fg-color-green">this text is green</span>
      </p>
      <h3 className="wd-bg-color-blue wd-fg-color-white">Background color</h3>
      <p className="wd-bg-color-red wd-fg-color-black">
        This background of this paragraph is red but
        <span
          className="wd-bg-color-green
                     wd-fg-color-white"
        >
          the background of this text is green and the foreground white
        </span>
      </p>
      <h1
        style={{
          backgroundColor: "yellow",
        }}
      >
        Block vs inline elements
      </h1>
      <p
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          marginTop: "50px",
        }}
      >
        Headings ... width
      </p>
      Normal text renders inline
      <br />
      <br />
      <span
        style={{
          backgroundColor: "red",
          color: "white",
          borderStyle: "solid",
          borderBottomWidth: "10px",
          borderTopWidth: "20px",
          borderLeftWidth: "30px",
          borderRightWidth: "40px",
          borderColor: "green",
        }}
      >
        Span elements
      </span>
      <span
        style={{
          backgroundColor: "red",
          color: "white",
        }}
      >
        render inline
      </span>
      with the rest of the content
      <p
        className="wd-border-fat wd-border-red
                wd-border-solid"
      >
        Solid fat red border
      </p>
      <p
        className="wd-border-thin wd-border-blue
                wd-border-dashed"
      >
        Dashed thin blue border
      </p>
      {/* #slides 15 */}
      {/* <div id="wd-css-margins">
        <h2>Margins</h2>
        <div
          className="wd-margin-bottom wd-padded-top-left 
      wd-border-fat wd-border-red wd-border-solid 
      wd-bg-color-yellow"
        >
          Margin bottom{" "}
        </div>
        <div
          className="wd-margin-right-left wd-padded-bottom-right 
      wd-border-fat wd-border-blue  wd-border-solid 
      wd-bg-color-yellow"
        >
          Margin left right{" "}
        </div>
        <div
          className="wd-margin-all-around 
      wd-padding-fat wd-border-fat 
      wd-border-yellow wd-border-solid 
      wd-bg-color-blue wd-fg-color-white"
        >
          Margin all around{" "}
        </div>
      </div> */}
      <Foreground />
      <Background />
      <Padding />
      <Margin />
      <Corners />
      <Dimension />
      <Position />
      <ZIndex />
      <Float />
      <GirdLayout />
      <Flex />
      <ReactIconsSampler />
      <BootstrapGird />
      <ScreenSizeLabel />
      <BootstrapTable />
      <BootStrapList />
      <BootstrapForm />
      <BootstrapNavigation />
    </div>
  );
}
