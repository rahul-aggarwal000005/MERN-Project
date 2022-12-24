import React from "react";
import { Spinner } from "react-bootstrap";

type Props = {
  size?: number;
};
const Loader: React.FC<Props> = ({ size = 50 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Spinner
        animation="border"
        variant="primary"
        style={{ height: size, width: size }}
      />
    </div>
  );
};

export default Loader;
