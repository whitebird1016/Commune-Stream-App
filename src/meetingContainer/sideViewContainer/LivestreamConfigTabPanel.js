import {
  Box,
  TextField,
  Typography,
  Button,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { appThemes, useMeetingAppContext } from "../../MeetingAppContextDef";
import ConfirmBox from "../../components/ConfirmBox";
import { extractRootDomain, getUniqueId } from "../../utils/common";
import useIsLiveStreaming from "../useIsLivestreaming";

const useStyles = makeStyles(() => ({
  textField: {
    borderRadius: "4px",
    backgroundColor: "#3D3C4E",
    color: "white",
  },

  textFieldLight: {
    borderRadius: "4px",
    backgroundColor: "#D3D7DA",
    color: "#404B53",
    "&:hover": {
      backgroundColor: "#D3D7DA",
    },
  },
  textFieldDisabled: {
    "&:disabled": {
      color: "#8A9197",
      backgroundColor: "#CCD2DB",
    },
  },
  button: {
    color: "#95959E",
    "&:hover": {
      color: "#ffffff",
    },
  },
  buttonLight: {
    "&:hover": {
      backgroundColor: "#CCD2DB",
    },
  },
  input: {
    color: "white",
  },
  root: {
    "& .MuiFilledInput-input": {
      padding: "12px 12px 12px",
    },
  },
  rootDark: {
    "& .MuiFilledInput-input": {
      padding: "12px 12px 12px",
      background: "#3E4346",
    },
  },

  rootLight: {
    "& .MuiFilledInput-input": {
      padding: "12px 12px 12px",
      background: "#D3D7DA",
    },
  },
}));

const SingleLiveStreamItem = ({
  item,
  setLiveStreamConfig,
  liveStreamConfigRef,
  isEditingId,
  setIsEditingId,
  _handleRemove,
  publish,
  index,
  appTheme,
}) => {
  const theme = useTheme();
  const isLiveStreaming = useIsLiveStreaming();
  const rootDomain = extractRootDomain(item.url);
  const mainDomain = rootDomain?.split(".")[0];
  const domainName = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);

  const isEditing = !!isEditingId;
  const isSelfEditing = isEditingId === item.id;
  const [editedUrl, setEditedUrl] = useState("");
  const [editedStreamKey, setEditedStreamKey] = useState("");
  const [editedUrlErr, setEditedUrlErr] = useState(false);
  const [editedStreamKeyErr, setEditedStreamKeyErr] = useState(false);
  const [onCancelClick, setOnCancelClick] = useState({
    id: null,
    visible: false,
  });
  const [onRemoveClick, setOnRemoveClick] = useState({
    id: null,
    visible: false,
  });

  const handleValidation = () => {
    let isValid = true;
    if (editedStreamKey.length >= 2 && /^\S*$/.test(editedStreamKey)) {
      setEditedStreamKeyErr(false);
    } else {
      isValid = false;
      setEditedStreamKeyErr(true);
      return false;
    }

    if (editedUrl.length >= 2 && /^\S*$/.test(editedUrl)) {
      setEditedUrlErr(false);
    } else {
      isValid = false;
      setEditedUrlErr(true);
      return false;
    }
    return isValid;
  };
  const itemRef = useRef(item);

  useEffect(() => {
    if (isSelfEditing) {
      setEditedUrl(itemRef.current.url);
      setEditedStreamKey(itemRef.current.streamKey);
    }
  }, [isSelfEditing]);

  useEffect(() => {
    itemRef.current = item;
  }, [item]);

  const classes = useStyles();

  const _handleSaveInsideArray = ({ Id, streamKey, url }) => {
    const liveStreamConfig = liveStreamConfigRef.current;

    const newPlatforms = liveStreamConfig.map((item) => {
      if (item.id === Id) {
        return {
          ...item,
          url,
          streamKey: streamKey,
          isEdit: false,
        };
      } else {
        return item;
      }
    });

    publish({ config: newPlatforms }, { persist: true });
    setLiveStreamConfig(newPlatforms);
  };

  return (
    <>
      <Box
        style={{
          borderTop:
            index === 0
              ? ""
              : `3px solid 
                  ${
                    appTheme === appThemes.DARK
                      ? theme.palette.darkTheme.seven
                      : appTheme === appThemes.LIGHT
                      ? theme.palette.lightTheme.three
                      : "#3A3F4B"
                  }`,
          paddingRight: "12px",
          paddingLeft: "12px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex", flex: 1 }}>
            <Typography
              variant={"body1"}
              style={{
                fontWeight: "bold",
                color:
                  appTheme === appThemes.LIGHT &&
                  theme.palette.lightTheme.contrastText,
              }}
            >
              {item.url ? domainName : item.title}
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {isSelfEditing ? (
              <>
                <Button
                  variant="text"
                  onClick={() => {
                    const isValid = handleValidation();
                    if (isValid) {
                      _handleSaveInsideArray({
                        Id: item.id,
                        streamKey: editedStreamKey,
                        url: editedUrl,
                      });
                      setIsEditingId(null);
                    }
                  }}
                  style={{
                    color:
                      appTheme === appThemes.LIGHT &&
                      theme.palette.lightTheme.contrastText,
                  }}
                  className={
                    appTheme === appThemes.LIGHT
                      ? classes.buttonLight
                      : classes.button
                  }
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setOnCancelClick({ id: item.id, visible: true });
                  }}
                  style={{
                    color:
                      appTheme === appThemes.LIGHT &&
                      theme.palette.lightTheme.contrastText,
                  }}
                  className={
                    appTheme === appThemes.LIGHT
                      ? classes.buttonLight
                      : classes.button
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  onClick={() => {
                    // setIsEditing({ id: item.id, editing: true });
                    setIsEditingId(item.id);
                  }}
                  style={{
                    color:
                      appTheme === appThemes.LIGHT &&
                      theme.palette.lightTheme.contrastText,
                  }}
                  className={
                    appTheme === appThemes.LIGHT
                      ? classes.buttonLight
                      : classes.button
                  }
                  disabled={isEditing || isLiveStreaming}
                >
                  EDIT
                </Button>

                <Button
                  variant="text"
                  onClick={() => {
                    setOnRemoveClick({
                      id: item.id,
                      visible: true,
                    });
                  }}
                  style={{
                    color:
                      appTheme === appThemes.LIGHT &&
                      theme.palette.lightTheme.contrastText,
                  }}
                  className={
                    appTheme === appThemes.LIGHT
                      ? classes.buttonLight
                      : classes.button
                  }
                  disabled={isEditing || isLiveStreaming}
                >
                  REMOVE
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Box mt={1}>
          <TextField
            placeholder="Stream Key"
            fullWidth
            variant="filled"
            type="password"
            autocomplete="off"
            style={{
              backgroundColor:
                appTheme === appThemes.DARK
                  ? theme.palette.darkTheme.seven
                  : appTheme === appThemes.LIGHT
                  ? theme.palette.lightTheme.three
                  : "",
            }}
            className={
              appTheme === appThemes.LIGHT
                ? classes.rootLight
                : appTheme === appThemes.DARK
                ? classes.rootDark
                : classes.root
            }
            disabled={!isSelfEditing}
            value={isSelfEditing ? editedStreamKey : item.streamKey}
            InputProps={{
              disableUnderline: true,
              classes: {
                disabled:
                  appTheme === appThemes.LIGHT && classes.textFieldDisabled,
                root:
                  appTheme === appThemes.LIGHT
                    ? classes.textFieldLight
                    : classes.textField,
              },
            }}
            onChange={(e) => {
              setEditedStreamKey(e.target.value);
            }}
          />
          {editedStreamKeyErr && (
            <Typography variant="body2" style={{ color: "#D33730" }}>
              Please provide valid stream key
            </Typography>
          )}

          <TextField
            placeholder="Stream Url"
            fullWidth
            variant="filled"
            autocomplete="off"
            style={{
              marginTop: "8px",
              backgroundColor:
                appTheme === appThemes.DARK
                  ? theme.palette.darkTheme.seven
                  : appTheme === appThemes.LIGHT
                  ? theme.palette.lightTheme.three
                  : "",
            }}
            className={
              appTheme === appThemes.LIGHT
                ? classes.rootLight
                : appTheme === appThemes.DARK
                ? classes.rootDark
                : classes.root
            }
            disabled={!isSelfEditing}
            value={isSelfEditing ? editedUrl : item.url}
            InputProps={{
              disableUnderline: true,
              classes: {
                disabled:
                  appTheme === appThemes.LIGHT && classes.textFieldDisabled,
                root:
                  appTheme === appThemes.LIGHT
                    ? classes.textFieldLight
                    : classes.textField,
              },
            }}
            onChange={(e) => {
              setEditedUrl(e.target.value);
            }}
          />
          {editedUrlErr && (
            <Typography variant="body2" style={{ color: "#D33730" }}>
              Please provide valid stream url
            </Typography>
          )}
        </Box>
      </Box>

      <ConfirmBox
        open={onRemoveClick.visible}
        title={`Remove Stream Configuration?`}
        subTitle={"It will be removed forever"}
        successText={"Remove"}
        onSuccess={() => {
          _handleRemove({ id: onRemoveClick.id });
          setOnRemoveClick({ visible: false });
        }}
        rejectText={"Cancel"}
        onReject={() => {
          setOnRemoveClick({
            visible: false,
          });
        }}
      />
      <ConfirmBox
        open={onCancelClick.visible}
        title={"Discard Changes?"}
        subTitle={"Changes you made so far will not be saved"}
        successText={"Discard"}
        onSuccess={() => {
          setOnCancelClick({ visible: false });
          setIsEditingId(null);
        }}
        rejectText={"Cancel"}
        onReject={() => {
          setOnCancelClick({ visible: false });
        }}
      />
    </>
  );
};

const AddLiveStream = ({
  _handleSave,
  renderCallback,
  appTheme,
  liveStreamConfig,
}) => {
  const theme = useTheme();
  const [streamKey, setStreamKey] = useState("");
  const [url, setStreamUrl] = useState("");
  const [streamKeyErr, setStreamKeyErr] = useState(false);
  const [streamUrlErr, setStreamUrlErr] = useState(false);

  const elementRef = useRef();

  const domainName = useMemo(() => {
    const rootDomain = extractRootDomain(url);
    const mainDomain = rootDomain?.split(".")[0];
    const domainName = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    return domainName;
  }, [url]);

  const handleValidation = ({ streamKey, url }) => {
    let isValid = true;
    if (streamKey.length >= 2 && /^\S*$/.test(streamKey)) {
      setStreamKeyErr(false);
    } else {
      isValid = false;
      setStreamKeyErr(true);
      return false;
    }
    if (url.length >= 2 && /^\S*$/.test(url)) {
      setStreamUrlErr(false);
    } else {
      isValid = false;
      setStreamUrlErr(true);
      return false;
    }
    return isValid;
  };

  const classes = useStyles();

  useEffect(() => {
    renderCallback(elementRef.current);
  }, [streamKey, url, streamKeyErr, streamUrlErr]);

  return (
    <Box
      ref={(el) => {
        elementRef.current = el;
        renderCallback(elementRef.current);
      }}
      style={{
        paddingRight: "12px",
        paddingLeft: "12px",
        paddingTop: "12px",
        paddingBottom: "12px",
        boxShadow: "0 -10px 20px -5px rgba(0,0,0,0.35)",
        borderTop:
          liveStreamConfig?.length > 0 &&
          `3px solid ${
            appTheme === appThemes.DARK
              ? theme.palette.darkTheme.seven
              : appTheme === appThemes.LIGHT
              ? theme.palette.lightTheme.three
              : "#3A3F4B"
          }`,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", flex: 1 }}>
          <Typography
            variant={"body1"}
            style={{
              fontWeight: "bold",
              color:
                appTheme === appThemes.LIGHT &&
                theme.palette.lightTheme.contrastText,
            }}
          >
            {url ? domainName : "Platform Name"}
          </Typography>
        </Box>

        <Box
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="text"
            onClick={() => {
              const isValid = handleValidation({ streamKey, url });
              if (isValid) {
                const _streamKey = streamKey;
                const _url = url;

                _handleSave({ streamKey: _streamKey, url: _url });
                setStreamKey("");
                setStreamUrl("");
              }
            }}
            style={{
              color:
                appTheme === appThemes.LIGHT &&
                theme.palette.lightTheme.contrastText,
            }}
            className={
              appTheme === appThemes.LIGHT
                ? classes.buttonLight
                : classes.button
            }
          >
            ADD
          </Button>
        </Box>
      </Box>
      <Box mt={1}>
        <TextField
          placeholder="Stream Key"
          fullWidth
          variant="filled"
          type="password"
          autocomplete="off"
          style={{
            backgroundColor:
              appTheme === appThemes.DARK
                ? theme.palette.darkTheme.seven
                : appTheme === appThemes.LIGHT
                ? theme.palette.lightTheme.three
                : "",
          }}
          className={
            appTheme === appThemes.LIGHT
              ? classes.rootLight
              : appTheme === appThemes.DARK
              ? classes.rootDark
              : classes.root
          }
          value={streamKey}
          InputProps={{
            disableUnderline: true,
            classes: {
              root:
                appTheme === appThemes.LIGHT
                  ? classes.textFieldLight
                  : classes.textField,
            },
          }}
          onChange={(e) => {
            setStreamKey(e.target.value);
          }}
        />
        {streamKeyErr && (
          <Typography variant="body2" style={{ color: "#D33730" }}>
            Please provide valid stream key
          </Typography>
        )}
        <TextField
          placeholder="Stream Url"
          fullWidth
          variant="filled"
          style={{
            marginTop: "8px",
            backgroundColor:
              appTheme === appThemes.DARK
                ? theme.palette.darkTheme.seven
                : appTheme === appThemes.LIGHT
                ? theme.palette.lightTheme.three
                : "",
          }}
          autocomplete="off"
          className={
            appTheme === appThemes.LIGHT
              ? classes.rootLight
              : appTheme === appThemes.DARK
              ? classes.rootDark
              : classes.root
          }
          value={url}
          InputProps={{
            disableUnderline: true,
            classes: {
              root:
                appTheme === appThemes.LIGHT
                  ? classes.textFieldLight
                  : classes.textField,
            },
          }}
          onChange={(e) => {
            setStreamUrl(e.target.value);
          }}
        />
        {streamUrlErr && (
          <Typography variant="body2" style={{ color: "#D33730" }}>
            Please provide valid stream url
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const LiveStreamConfigTabPanel = ({ panelWidth, panelHeight }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [addLiveStreamBoxHeight, setAddLiveStreamBoxHeight] = useState(0);

  const [isEditingId, setIsEditingId] = useState(null);

  const mMeeting = useMeeting({});
  const { liveStreamConfig, setLiveStreamConfig, appTheme } =
    useMeetingAppContext();

  const isLiveStreaming = useIsLiveStreaming();

  const liveStreamConfigRef = useRef();
  const addLiveStreamBoxRef = useRef();
  const liveStreamsContainerRef = useRef();

  useEffect(() => {
    liveStreamConfigRef.current = liveStreamConfig;
  }, [liveStreamConfig]);

  const { publish } = usePubSub("LIVE_STREAM_CONFIG");

  const _handleRemove = ({ id }) => {
    const liveStreamConfig = liveStreamConfigRef.current;

    const filtered = liveStreamConfig.filter(({ id: _id }) => {
      return id !== _id;
    });

    publish({ config: filtered }, { persist: true });
  };

  const _handleSave = ({ streamKey, url }) => {
    const liveStreamConfig = liveStreamConfigRef.current;
    liveStreamConfig.push({ id: getUniqueId(), streamKey, url });

    publish({ config: liveStreamConfig }, { persist: true });

    setTimeout(() => {
      liveStreamsContainerRef.current.scrollTop =
        liveStreamsContainerRef.current.scrollHeight;
    }, 500);
  };

  return (
    <Box
      style={{
        height: panelHeight - 32,
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Box
        ref={liveStreamsContainerRef}
        style={{
          overflowY: "scroll",
          maxHeight: panelHeight - 32 - addLiveStreamBoxHeight,
        }}
      >
        {liveStreamConfig?.map((item, i) => {
          return (
            <SingleLiveStreamItem
              key={`live_stream_op_item${i}`}
              item={item}
              appTheme={appTheme}
              liveStreamConfig={liveStreamConfig}
              setLiveStreamConfig={setLiveStreamConfig}
              liveStreamConfigRef={liveStreamConfigRef}
              publish={publish}
              editingItemId={editingItemId}
              setEditingItemId={setEditingItemId}
              _handleRemove={_handleRemove}
              isEditingId={isEditingId}
              setIsEditingId={setIsEditingId}
              isLiveStreaming={isLiveStreaming}
              index={i}
            />
          );
        })}
      </Box>
      {!isLiveStreaming && (
        <AddLiveStream
          {...{
            _handleSave,
            appTheme,
            liveStreamConfig,
            renderCallback: (el) => {
              addLiveStreamBoxRef.current = el;

              const addLiveStreamBoxHeight =
                addLiveStreamBoxRef.current?.clientHeight + 3 || 0;

              setAddLiveStreamBoxHeight(addLiveStreamBoxHeight);
            },
          }}
        />
      )}
    </Box>
  );
};

export default LiveStreamConfigTabPanel;
