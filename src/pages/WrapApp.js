import { Box, Button } from "@material-ui/core";
import { useRef, useState } from "react";
import MainContainer from "./MainContainer";
import Commune from "../assets/commune.gif"

const WrapApp = () => {
  const [mode, setMode] = useState("CONFERENCE");
  const [meetingID, setMeetingID] = useState();
  const [recordingFlg, setRecordingFlg] = useState();

  const ref = useRef();
  ref.current = null;
  const handleClick = (key) => {
    setMode(key);
  };

  const handleClick2 = () => {
    ref.current.value === ""
      ? alert("Please enter meeting ID")
      : setMeetingID(ref.current.value);
  };
  const handleClick3 = (flag) => {
    if (flag === 1) {
      const r = (Math.random() + 1).toString(36).substring(2);
      setMeetingID(r);
    }
    setRecordingFlg(flag);
  };
  return mode && meetingID ? (
    <MainContainer
      mode={mode}
      meetingID={meetingID}
      recordingFlg={recordingFlg}
    />
  ) : (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "radial-gradient(circle, #012, #000 55em)",
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
        gap: "30px",
        position: "relative",
      }}
    >

      <img src={Commune} className="blur-border" />
      <h2 className="animation">Commune Video Conference App</h2>
      {mode && !meetingID ? (
        mode === "VIEWER" || (mode === "CONFERENCE" && recordingFlg) ? (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              minWidth: "300px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <input
              placeholder="Enter Meeting ID"
              ref={ref}
              style={{
                background: "none",
                border: "1px solid rgba(255, 255, 255, 0.23)",
                padding: "15px",
                fontSize: "20px",
                color: "white",
                outline: "none",
                borderRadius: "4px",
                textAlign: "center",
              }}
            />

            <Button
              variant="outlined"
              style={{ color: "white", fontSize: "20px", padding: "10px" }}
              onClick={handleClick2}
            >
              Join
            </Button>
          </Box>
        ) : (
          <>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                minWidth: "300px",
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                style={{ color: "white", fontSize: "20px", padding: "10px" }}
                onClick={() => handleClick3(1)}
              >
                Create Meeting
              </Button>
              <Button
                variant="outlined"
                style={{ color: "white", fontSize: "20px", padding: "10px" }}
                onClick={() => handleClick3(2)}
              >
                Join Meeting
              </Button>
            </Box>
          </>
        )
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              minWidth: "300px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "white", fontSize: "20px", padding: "10px" }}
              onClick={() => handleClick("CONFERENCE")}
            >
              Join with Admin
            </Button>
            <Button
              variant="outlined"
              style={{ color: "white", fontSize: "20px", padding: "10px" }}
              onClick={() => handleClick("VIEWER")}
            >
              Join with Viewer
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default WrapApp;
