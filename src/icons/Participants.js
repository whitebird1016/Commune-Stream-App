import { SvgIcon } from "@material-ui/core";
import React from "react";

const Participants = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 15.273">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="15.273"
        viewBox="0 0 24 15.273"
      >
        <path
          id="Path_6019"
          data-name="Path 6019"
          d="M17.364,11.545a3.273,3.273,0,1,0-3.273-3.273A3.259,3.259,0,0,0,17.364,11.545Zm-8.727,0A3.273,3.273,0,1,0,5.364,8.273,3.259,3.259,0,0,0,8.636,11.545Zm0,2.182C6.095,13.727,1,15,1,17.545v1.636a1.094,1.094,0,0,0,1.091,1.091H15.182a1.094,1.094,0,0,0,1.091-1.091V17.545C16.273,15,11.178,13.727,8.636,13.727Zm8.727,0c-.316,0-.676.022-1.058.055.022.011.033.033.044.044a4.538,4.538,0,0,1,2.105,3.72v1.636a3.278,3.278,0,0,1-.2,1.091h5.651A1.094,1.094,0,0,0,25,19.182V17.545C25,15,19.905,13.727,17.364,13.727Z"
          transform="translate(-1 -5)"
          fill={props.fillColor}
        />
      </svg>
    </SvgIcon>
  );
};

export default Participants;
