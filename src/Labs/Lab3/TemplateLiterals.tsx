import React from "react";

export default function TemplateLiterals() {
  // Variable calculations and results
  const five = 2 + 3;
  const result1 = "2 + 3 = " + five; // Concatenation approach
  const result2 = `2 + 3 = ${2 + 3}`; // Template literal approach
  const username = "alice";
  const greeting1 = `Welcome home ${username}`; // Template literal with embedded variable
  const loggedIn = false;
  const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`; // Conditional logic within template literal

  return (
    <div id="wd-template-literals">
      <h4>Template Literals</h4>
      {/* Displaying the results using dynamic values */}
      result1 = {result1} <br />
      result2 = {result2} <br />
      greeting1 = {greeting1} <br />
      greeting2 = {greeting2} <hr />
    </div>
  );
}
