import {
  Box,
  IconButton,
  Typography,
  useTheme,
  OutlinedInput as Input,
  InputAdornment,
  Popover,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Linkify from "react-linkify";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { formatAMPM, json_verify, nameTructed } from "../../utils/common";
import { toArray } from "react-emoji-render";
import { appThemes, useMeetingAppContext } from "../../MeetingAppContextDef";

const useStyles = makeStyles(() => ({
  textField: {
    "&:hover": {
      border: "1px solid #70707033",
      borderRadius: "4px",
    },
    border: "1px solid #70707033",
    borderRadius: "4px",
    color: "#404B53",
  },
}));

const ChatMessage = ({ senderId, senderName, text, timestamp }) => {
  const mMeeting = useMeeting();

  const localParticipantId = mMeeting?.localParticipant?.id;

  const localSender = localParticipantId === senderId;

  const theme = useTheme();
  const { appTheme } = useMeetingAppContext();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: localSender ? "flex-end" : "flex-start",
        maxWidth: "100%",
      }}
      mt={2}
    >
      <Box
        style={{
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          borderRadius: 6,
          backgroundColor:
            appTheme === appThemes.DARK
              ? theme.palette.darkTheme.seven
              : appTheme === appThemes.LIGHT
              ? theme.palette.lightTheme.three
              : theme.palette.common.sidePanel,
          display: "flex",
          flexDirection: "column",
          // alignItems: localSender ? "flex-end" : "flex-start",
        }}
      >
        <Typography
          style={{
            color:
              appTheme === appThemes.LIGHT
                ? theme.palette.lightTheme.five
                : appTheme === appThemes.DARK
                ? theme.palette.lightTheme.four
                : "#ffffff80",
            textAlign: "left",
          }}
        >
          {localSender ? "You" : nameTructed(senderName, 15)}
        </Typography>
        <Box
          mt={0.5}
          style={{
            display: "flex",
            alignItems: localSender ? "flex-end" : "flex-start",
          }}
        >
          <Typography
            style={{
              display: "inline-block",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              textAlign: "right",
              color:
                appTheme === appThemes.LIGHT &&
                theme.palette.lightTheme.contrastText,
            }}
          >
            {toArray(text).map((t, i) => (
              <React.Fragment key={`chat_item_text_${i}`}>
                {typeof t === "string" ? (
                  <Linkify
                    properties={{
                      target: "_blank",
                      style: {
                        color:
                          appTheme === appThemes.LIGHT ||
                          appTheme === appThemes.DARK
                            ? theme.palette.lightTheme.primaryMain
                            : theme.palette.primary.main,
                      },
                    }}
                  >
                    {t}
                  </Linkify>
                ) : (
                  t
                )}
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box mt={0.5} style={{ textAlign: "right" }}>
          <Typography
            variant={"caption"}
            style={{
              color:
                appTheme === appThemes.LIGHT
                  ? theme.palette.lightTheme.four
                  : appTheme === appThemes.DARK
                  ? theme.palette.lightTheme.five
                  : "#ffffff80",
              fontStyle: "italic",
              textAlign: "right",
            }}
          >
            {formatAMPM(new Date(timestamp))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ChatMessages = ({ listHeight }) => {
  const listRef = useRef();

  const scrollToBottom = (data) => {
    if (!data) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    } else {
      const { text } = data;

      if (json_verify(text)) {
        const { type } = JSON.parse(text);
        if (type === "CHAT") {
          if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }
      }
    }
  };

  const { messages } = usePubSub("CHAT");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return messages ? (
    <Box ref={listRef} style={{ overflowY: "scroll", height: listHeight }}>
      <Box p={2}>
        {messages.map((msg, i) => {
          const { senderId, senderName, message, timestamp } = msg;
          return (
            <ChatMessage
              key={`chat_item_${i}`}
              {...{ senderId, senderName, text: message, timestamp }}
            />
          );
        })}
      </Box>
    </Box>
  ) : (
    <p>No messages</p>
  );
};

const ChatMessageInput = ({ inputHeight }) => {
  const [messageText, setMessageText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);

  const input = useRef();
  const inputContainer = useRef();
  const classes = useStyles();

  const { publish } = usePubSub("CHAT");
  const theme = useTheme();

  const { appTheme } = useMeetingAppContext();

  return (
    <Box
      ref={inputContainer}
      style={{
        height: inputHeight - 1 - theme.spacing(2),
        display: "flex",
        borderTop: "1px solid #70707033",
        alignItems: "center",
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
      }}
    >
      <Popover
        open={emojiOpen}
        onClose={() => {
          setEmojiOpen(false);
        }}
        anchorEl={inputContainer.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker
          emojiSize={28}
          set={"google"}
          showPreview={false}
          showSkinTones={false}
          theme={appTheme === appThemes.LIGHT ? "light" : "dark"}
          style={{
            backgroundColor:
              appTheme === appThemes.DARK
                ? theme.palette.darkTheme.main
                : appTheme === appThemes.LIGHT
                ? theme.palette.lightTheme.main
                : theme.palette.background.default,
          }}
          color={
            appTheme === appThemes.LIGHT || appTheme === appThemes.DARK
              ? theme.palette.lightTheme.primaryMain
              : theme.palette.primary.main
          }
          onSelect={(e) => {
            setMessageText((s) => `${s}${e.native}`);
          }}
        />
      </Popover>

      <Input
        style={{ paddingRight: 0 }}
        rows={1}
        rowsMax={2}
        multiline
        ref={input}
        classes={{
          root: appTheme === appThemes.LIGHT && classes.textField,
        }}
        placeholder="Write your message"
        fullWidth
        value={messageText}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            const message = messageText.trim();

            if (message.length > 0) {
              publish(message, { persist: true });
              setTimeout(() => {
                setMessageText("");
              }, 100);
              input.current?.focus();
            }
          }
        }}
        onChange={(e) => {
          const v = e.target.value;
          setMessageText(v);
        }}
        endAdornment={
          <InputAdornment>
            <Box style={{ display: "flex" }}>
              <Box>
                <IconButton
                  onClick={() => {
                    setEmojiOpen(true);
                  }}
                >
                  <InsertEmoticonIcon
                    fontSize={"small"}
                    style={{
                      color:
                        appTheme === appThemes.LIGHT &&
                        theme.palette.lightTheme.contrastText,
                    }}
                  />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  disabled={!messageText.trim().length}
                  onClick={() => {
                    const message = messageText.trim();
                    if (message.length > 0) {
                      publish(message, { persist: true });
                      setTimeout(() => {
                        setMessageText("");
                      }, 100);
                      input.current?.focus();
                    }
                  }}
                >
                  <SendIcon
                    fontSize={"small"}
                    style={{
                      color:
                        appTheme === appThemes.LIGHT &&
                        theme.palette.lightTheme.contrastText,
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </InputAdornment>
        }
      ></Input>
    </Box>
  );
};

const ChatTabPanel = ({ panelHeight }) => {
  const inputHeight = 92;
  const listHeight = panelHeight - inputHeight;
  return (
    <div>
      <ChatMessages listHeight={listHeight} />
      <ChatMessageInput inputHeight={inputHeight} />
    </div>
  );
};

export default ChatTabPanel;
