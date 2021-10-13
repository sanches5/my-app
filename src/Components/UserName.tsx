import React, { useContext, useState } from "react";
import { ThemeContext } from "../context";

// type FauxactFunctionComponent<Props extends {}> = (
//   props: Props,
//   context?: any
// ) => JSX.Element;
//
// interface DateProps {
//   iso8601Date: string;
//   message: string;
// }

const DateComponent = () => {
  const test = useContext(ThemeContext);
  const [change, setChange] = useState(false);
  const setNewTitle = (updateTitle: string) => {
    if (updateTitle) {
      test.setTitle(updateTitle);
      setChange(!change);
    }
    setChange(!change);
  };
  if (change) {
    return (
      <div>
        <input
          autoFocus
          defaultValue={test.title}
          onBlur={(e) => setNewTitle(e.currentTarget.value)}
          type="text"
          onKeyPress={(e) => e.key === "Enter" && setNewTitle(e.currentTarget.value)}
        />
      </div>
    );
  }

  return (
    <div style={{width: 150, margin: 20, cursor: "pointer" }} onClick={() => setChange(!change)}>
      {test.title}
    </div>
  );
};

export default DateComponent;
