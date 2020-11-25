import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

const Hello = (props) => <div>Hello {props.name}!</div>;

Hello.defaultProps = {
  name: "David",
};

Hello.propTypes = {
  name: PropTypes.string,
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Hello name="React & TypeScript" />,
    document.body.appendChild(document.createElement("div"))
  );
});
