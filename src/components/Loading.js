import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div>
      <ReactLoading type={"spin"} color={"#0089BA"} height={20} width={20} />
    </div>
  );
};

export default Loading;
