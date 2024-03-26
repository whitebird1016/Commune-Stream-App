import React, { useEffect, useMemo, useState } from "react";
import MeetingContainer from "../meetingContainer/MeetingContainer";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import {
  MeetingAppProvider,
  meetingLayoutPriorities,
  meetingLayouts,
  meetingLayoutTopics,
  appThemes,
} from "../MeetingAppContextDef";
import JoinMeeting from "../components/JoinScreen";
import ClickAnywhereToContinue from "../components/ClickAnywhereToContinue";
import { Box, CircularProgress, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import MeetingLeftScreen from "../components/MeetingLeftScreen";
import ConfirmBox from "../components/ConfirmBox";
import {
  maxParticipantGridCount_large_desktop,
  maxParticipantGridCount_desktop,
  maxParticipantGridCount_tab,
  maxParticipantGridCount_mobile,
} from "../utils/common";
import useIsSMDesktop from "../utils/useIsSMDesktop";
import useIsLGDesktop from "../utils/useIsLGDesktop";
import useIsTab from "../utils/useIsTab";
import { version as prebuiltSDKVersion } from "../../package.json";
import { meetingModes } from "../CONSTS";
import animationData from "../animations/meeting-left.json";
import lightThemeAnimationData from "../animations/meeting_left_white.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const MainContainer = ({ mode, meetingID, recordingFlg }) => {
  const [meetingIdValidation, setMeetingIdValidation] = useState({
    isLoading: true,
    meetingId: null,
    reqError: null,
    reqStatusCode: null,
  });

  const [meetingError, setMeetingError] = useState({
    message: null,
    code: null,
    isVisible: false,
  });

  const [meetingLeft, setMeetingLeft] = useState(false);
  const playNotificationErr = async () => {
    const errAudio = new Audio(
      `https://static.videosdk.live/prebuilt/notification_err.mp3`
    );

    await errAudio.play();
  };

  const getParams = ({ maxGridSize }) => {
    // const location = window.location;
    // const urlParams = new URLSearchParams(location.search);

    const paramKeys = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwYmNjNGE1ZC04N2Q5LTQ3ZWYtOTliYy03NWY0MGYyNTQzNTgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4OTcwMDA3NywiZXhwIjoxODQ3NDg4MDc3fQ.k85RtzCg9FO7KkZyX6wdqBkGSeTQCSLtor9PMokvMUM",
      micEnabled: "true",
      webcamEnabled: "true",
      name: "",
      meetingId: meetingID,
      region: "sg001",
      preferredProtocol: "UDP_ONLY",
      canChangeLayout: "true",
      redirectOnLeave: "https://commune-meeting.vercel.app",
      chatEnabled: "true",
      theme: "DEFAULT",
      screenShareEnabled: "true",
      pollEnabled: "false",
      whiteboardEnabled: "true",
      participantCanToggleSelfWebcam: "true",
      participantCanToggleSelfMic: "true",
      raiseHandEnabled: "true",
      recordingEnabled: "true",
      recordingWebhookUrl:
        "https://podocast-api.onrender.com/api/recording/webhook",
      recordingAWSDirPath: "",
      autoStartRecording: "false",
      recordingTheme: "DEFAULT",
      participantCanToggleRecording:
        recordingFlg && recordingFlg === 1 ? "true" : "false",
      brandingEnabled: "true",
      brandLogoURL: "https://www.communeai.org/_next/image?url=%2Fgif%2Flogo%2Fcommune.webp&w=640&q=75",
      brandName: "commune",
      participantCanLeave: "true",
      poweredBy: "false",
      liveStreamEnabled: "false",
      autoStartLiveStream: "false",
      liveStreamOutputs: "[]",
      liveStreamTheme: "DEFAULT",
      participantCanToggleOtherMic: "true",
      participantTabPanelEnabled: "true",
      partcipantCanToogleOtherScreenShare: "false",
      participantCanToggleOtherWebcam: "true",
      participantCanToggleOtherMode: "false",
      askJoin: "false",
      joinScreenEnabled: "true",
      joinScreenMeetingUrl: "",
      joinScreenTitle: "commune",
      notificationSoundEnabled: "true",
      canPin: "true",
      canCreatePoll: "false",
      canToggleParticipantTab: "true",
      layoutType: "GRID",
      participantCanEndMeeting: "true",
      canDrawOnWhiteboard: "true",
      canToggleWhiteboard: "true",
      canRemoveOtherParticipant: "true",
      leftScreenActionButtonLabel: "https://www.hello.com",
      leftScreenActionButtonHref: "https://www.hello.com",
      maxResolution: "sd",
      animationsEnabled: "true",
      topbarEnabled: "true",
      notificationAlertsEnabled: "true",
      debug: "false",
      participantId: "",
      layoutPriority: "PIN",
      layoutGridSize: "0",
      hideLocalParticipant: "false",
      alwaysShowOverlay: "false",
      sideStackSize: "undefined",
      reduceEdgeSpacing: "false",
      isRecorder: "false",
      maintainVideoAspectRatio: "true",
      maintainLandscapeVideoAspectRatio: "false",
      networkBarEnabled: "true",
      leftScreenRejoinButtonEnabled: "true",
      joinWithoutUserInteraction: "false",
      rawUserAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      meetingLayoutTopic: "RECORDING_LAYOUT",
      participantCanToggleLivestream: "false",
      hlsEnabled: "true",
      autoStartHls: "false",
      participantCanToggleHls: "true",
      hlsPlayerControlsVisible: "true",
      hlsTheme: "DEFAULT",
      waitingScreenImageUrl: "",
      waitingScreenText: "",
      canToggleVirtualBackground: "true",
      mode: mode,
      // language: "language",
      // liveStreamLayoutType: "liveStreamLayoutType",
      // liveStreamLayoutPriority: "liveStreamLayoutPriority",
      // liveStreamLayoutGridSize: "liveStreamLayoutGridSize",
      // recordingLayoutType: "recordingLayoutType",
      // recordingLayoutPriority: "recordingLayoutPriority",
      // recordingLayoutGridSize: "recordingLayoutGridSize",
      // cameraResolution: "cameraResolution",
      // cameraMultiStream: "cameraMultiStream",
      // cameraOptimizationMode: "cameraOptimizationMode",
      // screenShareResolution: "screenShareResolution",
      // screenShareOptimizationMode: "screenShareOptimizationMode",
      // micQuality: "micQuality",
    };

    // Object.keys(paramKeys).forEach((key) => {
    //   paramKeys[key] = urlParams.get(key)
    //     ? decodeURIComponent(urlParams.get(key))
    //     : null;
    // });
    // console.log(paramKeys);

    // required options
    let configErr;

    if (typeof paramKeys.token !== "string") {
      configErr = `"token" not provided`;
      playNotificationErr();
      setMeetingError({ message: configErr, code: 4001, isVisible: true });
      //
      // throw new Error(configErr);
    }
    if (typeof paramKeys.meetingId !== "string") {
      configErr = `"meetingId" not provided`;
      playNotificationErr();
      setMeetingError({ message: configErr, code: 4001, isVisible: true });
      //
      // throw new Error(configErr);
    }
    if (typeof paramKeys.name !== "string") {
      console.log(typeof paramKeys.name, "sd");
      if (paramKeys.joinScreenEnabled !== "true") {
        console.log(paramKeys.joinScreenEnabled);
        configErr = `"name" not provided when joinScreen is disabled`;
        playNotificationErr();
        setMeetingError({ message: configErr, code: 4001, isVisible: true });
        //
        // throw new Error(configErr);
      }
    }

    // default options
    if (typeof paramKeys.micEnabled !== "string") {
      paramKeys.micEnabled = "true";
    }
    if (typeof paramKeys.webcamEnabled !== "string") {
      paramKeys.webcamEnabled = "true";
    }
    if (typeof paramKeys.chatEnabled !== "string") {
      paramKeys.chatEnabled = "true";
    }
    if (typeof paramKeys.screenShareEnabled !== "string") {
      paramKeys.screenShareEnabled = "true";
    }
    if (typeof paramKeys.pollEnabled !== "string") {
      paramKeys.pollEnabled = "true";
    }
    if (typeof paramKeys.whiteboardEnabled !== "string") {
      paramKeys.whiteboardEnabled = "true";
    }
    if (typeof paramKeys.participantCanToggleSelfWebcam !== "string") {
      paramKeys.participantCanToggleSelfWebcam = "true";
    }
    if (typeof paramKeys.participantCanToggleSelfMic !== "string") {
      paramKeys.participantCanToggleSelfMic = "true";
    }
    if (typeof paramKeys.participantTabPanelEnabled !== "string") {
      paramKeys.participantTabPanelEnabled = "true";
    }
    if (typeof paramKeys.raiseHandEnabled !== "string") {
      paramKeys.raiseHandEnabled = "true";
    }
    if (typeof paramKeys.recordingEnabled !== "string") {
      paramKeys.recordingEnabled = "false";
    }
    if (typeof paramKeys.hlsEnabled !== "string") {
      paramKeys.hlsEnabled = "false";
    }
    if (typeof paramKeys.poweredBy !== "string") {
      paramKeys.poweredBy = "true";
    }
    if (typeof paramKeys.liveStreamEnabled !== "string") {
      paramKeys.liveStreamEnabled = "false";
    }
    if (typeof paramKeys.autoStartLiveStream !== "string") {
      paramKeys.autoStartLiveStream = "false";
    }
    if (typeof paramKeys.participantCanToggleLivestream !== "string") {
      paramKeys.participantCanToggleLivestream = "false";
    }

    if (typeof paramKeys.canCreatePoll !== "string") {
      paramKeys.canCreatePoll = "false";
    }

    if (typeof paramKeys.canToggleParticipantTab !== "string") {
      paramKeys.canToggleParticipantTab = "true";
    }

    if (
      paramKeys.autoStartLiveStream === "true" ||
      paramKeys.autoStartHls === "false"
    ) {
      try {
        paramKeys.liveStreamOutputs = JSON.parse(paramKeys.liveStreamOutputs);
        if (
          paramKeys.liveStreamOutputs === null ||
          !paramKeys.liveStreamOutputs.length
        ) {
          paramKeys.liveStreamOutputs = [];
        }
      } catch (err) {
        paramKeys.liveStreamOutputs = [];
      }
    }

    if (typeof paramKeys.joinScreenEnabled !== "string") {
      paramKeys.joinScreenEnabled = "true";
    }

    if (
      paramKeys.joinScreenMeetingUrl === null ||
      !paramKeys.joinScreenMeetingUrl.length
    ) {
      paramKeys.joinScreenMeetingUrl = "";
    }

    if (
      paramKeys.joinScreenTitle === null ||
      !paramKeys.joinScreenTitle.length
    ) {
      paramKeys.joinScreenTitle = "";
    }

    if (typeof paramKeys.notificationSoundEnabled !== "string") {
      paramKeys.notificationSoundEnabled = "true";
    }

    if (typeof paramKeys.maintainVideoAspectRatio !== "string") {
      paramKeys.maintainVideoAspectRatio = "false";
    }

    if (typeof paramKeys.maintainLandscapeVideoAspectRatio !== "string") {
      paramKeys.maintainLandscapeVideoAspectRatio = "false";
    }

    if (typeof paramKeys.networkBarEnabled !== "string") {
      paramKeys.networkBarEnabled = "true";
    }

    if (typeof paramKeys.canPin !== "string") {
      paramKeys.canPin = "false";
    }

    switch (paramKeys?.layoutType?.toUpperCase()) {
      case meetingLayouts.GRID:
      case meetingLayouts.SPOTLIGHT:
      case meetingLayouts.SIDEBAR:
        paramKeys.layoutType = paramKeys.layoutType.toUpperCase();
        break;
      default:
        paramKeys.layoutType = meetingLayouts.GRID;
        break;
    }

    switch (paramKeys.layoutPriority?.toUpperCase()) {
      case meetingLayoutPriorities.PIN:
      case meetingLayoutPriorities.SPEAKER:
        paramKeys.layoutPriority = paramKeys.layoutPriority.toUpperCase();
        break;
      default:
        paramKeys.layoutPriority = meetingLayoutPriorities.SPEAKER;
        break;
    }

    paramKeys.layoutGridSize = parseInt(paramKeys.layoutGridSize);

    if (paramKeys.layoutGridSize <= 0 || isNaN(paramKeys.layoutGridSize)) {
      paramKeys.layoutGridSize = maxGridSize;
    }

    if (paramKeys.isRecorder === "true") {
      paramKeys.micEnabled = "false";
      paramKeys.webcamEnabled = "false";
      paramKeys.hideLocalParticipant = "true";
      paramKeys.alwaysShowOverlay = "true";
      paramKeys.sideStackSize = "5";
      paramKeys.reduceEdgeSpacing = "true";
      paramKeys.maintainLandscapeVideoAspectRatio = "true";
      paramKeys.topbarEnabled = "false";
      paramKeys.notificationSoundEnabled = "false";
      paramKeys.notificationAlertsEnabled = "false";
      paramKeys.animationsEnabled = "false";
      paramKeys.redirectOnLeave = undefined;
    }

    paramKeys.sideStackSize = parseInt(paramKeys.sideStackSize);

    if (
      typeof paramKeys.sideStackSize === "number" &&
      paramKeys.sideStackSize <= 0
    ) {
      configErr = `"sideStackSize" is not a valid number`;
      playNotificationErr();
      setMeetingError({ message: configErr, code: 4001, isVisible: true });
    }

    // validate meetingLayoutTopic here
    switch (paramKeys.meetingLayoutTopic?.toUpperCase()) {
      case meetingLayoutTopics.MEETING_LAYOUT:
      case meetingLayoutTopics.RECORDING_LAYOUT:
      case meetingLayoutTopics.LIVE_STREAM_LAYOUT:
      case meetingLayoutTopics.HLS_LAYOUT:
        paramKeys.meetingLayoutTopic =
          paramKeys.meetingLayoutTopic.toUpperCase();
        break;
      default:
        paramKeys.meetingLayoutTopic = meetingLayoutTopics.MEETING_LAYOUT;
        break;
    }

    if (!paramKeys.region || typeof paramKeys.region !== "string") {
      paramKeys.region = "sg001";
    }
    if (!paramKeys.theme || typeof paramKeys.theme !== "string") {
      paramKeys.theme = "DEFAULT";
    }
    if (!paramKeys.language || typeof paramKeys.language !== "string") {
      paramKeys.language = "en";
    }
    if (
      !paramKeys.recordingTheme ||
      typeof paramKeys.recordingTheme !== "string"
    ) {
      paramKeys.recordingTheme = "DEFAULT";
    }
    if (
      !paramKeys.liveStreamTheme ||
      typeof paramKeys.liveStreamTheme !== "string"
    ) {
      paramKeys.liveStreamTheme = "DEFAULT";
    }
    if (!paramKeys.hlsTheme || typeof paramKeys.hlsTheme !== "string") {
      paramKeys.hlsTheme = "DEFAULT";
    }

    if (typeof paramKeys.preferredProtocol !== "string") {
      paramKeys.preferredProtocol = "UDP_ONLY";
    }

    switch (paramKeys.preferredProtocol.toUpperCase()) {
      case "UDP_ONLY":
      case "UDP_OVER_TCP":
        paramKeys.preferredProtocol = paramKeys.preferredProtocol.toUpperCase();
        break;
      default:
        paramKeys.preferredProtocol = "UDP_ONLY";
        break;
    }

    if (typeof paramKeys.mode !== "string") {
      paramKeys.mode = meetingModes.CONFERENCE;
    }

    switch (paramKeys.mode.toUpperCase()) {
      case meetingModes.CONFERENCE:
      case meetingModes.VIEWER:
        paramKeys.mode = paramKeys.mode.toUpperCase();
        break;
      default:
        paramKeys.mode = meetingModes.CONFERENCE;
        break;
    }

    if (
      !paramKeys.cameraResolution ||
      typeof paramKeys.cameraResolution !== "string"
    ) {
      paramKeys.cameraResolution = "h360p_w640p";
    }
    if (
      !paramKeys.cameraMultiStream ||
      typeof paramKeys.cameraMultiStream !== "string"
    ) {
      paramKeys.cameraMultiStream = "true";
    }
    if (
      !paramKeys.cameraOptimizationMode ||
      typeof paramKeys.cameraOptimizationMode !== "string"
    ) {
      paramKeys.cameraOptimizationMode = "motion";
    }

    if (
      !paramKeys.screenShareResolution ||
      typeof paramKeys.screenShareResolution !== "string"
    ) {
      paramKeys.screenShareResolution = "h720p_15fps";
    }
    if (
      !paramKeys.screenShareOptimizationMode ||
      typeof paramKeys.screenShareOptimizationMode !== "string"
    ) {
      paramKeys.screenShareOptimizationMode = "motion";
    }

    if (!paramKeys.micQuality || typeof paramKeys.micQuality !== "string") {
      paramKeys.micQuality = "speech_standard";
    }

    return paramKeys;
  };

  const isLGDesktop = useIsLGDesktop();
  const isSMDesktop = useIsSMDesktop();
  const isTab = useIsTab();

  const maxGridSize = useMemo(() => {
    return isLGDesktop
      ? maxParticipantGridCount_large_desktop
      : isSMDesktop
        ? maxParticipantGridCount_desktop
        : isTab
          ? maxParticipantGridCount_tab
          : maxParticipantGridCount_mobile;
  }, [isLGDesktop, isSMDesktop, isTab]);

  const paramKeys = useMemo(() => getParams({ maxGridSize }), [maxGridSize]);

  const [userHasInteracted, setUserHasInteracted] = useState(
    paramKeys.joinWithoutUserInteraction === "true"
  );

  const [name, setName] = useState(paramKeys.name || "");
  const [joinScreenWebCam, setJoinScreenWebCam] = useState(
    paramKeys.joinScreenEnabled === "true"
      ? paramKeys.participantCanToggleSelfWebcam === "true" &&
      paramKeys.webcamEnabled === "true"
      : paramKeys.webcamEnabled === "true"
  );

  const [joinScreenMic, setJoinScreenMic] = useState(
    paramKeys.joinScreenEnabled === "true"
      ? paramKeys.participantCanToggleSelfMic === "true" &&
      paramKeys.micEnabled === "true"
      : paramKeys.micEnabled === "true"
  );
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });

  const validateMeetingId = async ({ meetingId, token, debug, region }) => {
    const BASE_URL = "https://api.videosdk.live";

    const urlMeetingId = `${BASE_URL}/v1/prebuilt/meetings/${meetingId}`;

    const resMeetingId = await fetch(urlMeetingId, {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: token },
      body: JSON.stringify({ region }),
    });

    const meetingIdJson = await resMeetingId.json();

    const validatedMeetingId = meetingIdJson.meetingId;
    if (validatedMeetingId) {
      setMeetingIdValidation({
        isLoading: false,
        meetingId: validatedMeetingId,
        reqError: null,
        reqStatusCode: null,
      });
    } else {
      setMeetingIdValidation({
        isLoading: false,
        meetingId: null,
        reqError: meetingIdJson.error,
        reqStatusCode: meetingIdJson.statusCode,
      });

      playNotificationErr();

      setMeetingError({
        message: debug ? meetingIdJson.error : "Unable to join meeting!",
        code: meetingIdJson.statusCode,
        isVisible: true,
      });
    }
  };

  useEffect(() => {
    if (paramKeys.meetingId && paramKeys.token) {
      validateMeetingId({
        meetingId: paramKeys.meetingId,
        token: paramKeys.token,
        debug: paramKeys.debug === "true",
        region: paramKeys.region,
      });
    }
    // getWalletInfo();
  }, [paramKeys]);

  const theme = useTheme();

  const isXStoSM = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    if (isXStoSM) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isXStoSM]);

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: {
        es: {
          translation: {
            "Check your audio and video": "Revisa tu audio y video",
            "Join Now": "Únete ahora",
            "Enter Minimum 3 Characters": "Ingrese un mínimo de 3 caracteres",
            "Enter your name": "Introduzca su nombre",
            Settings: "Ajustes",
            Camera: "Cámara",
            Microphone: "Micrófono",
          },
        },
      },
      lng: paramKeys.language, // if you're using a language detector, do not define the lng option
      fallbackLng: "en",
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
  }, []);

  return (
    <>
      {meetingLeft ? (
        paramKeys.isRecorder === "true" ? null : (
          <MeetingLeftScreen
            brandLogoURL={paramKeys.brandLogoURL}
            leftScreenActionButtonLabel={paramKeys.leftScreenActionButtonLabel}
            leftScreenActionButtonHref={paramKeys.leftScreenActionButtonHref}
            leftScreenRejoinButtonEnabled={
              paramKeys.leftScreenRejoinButtonEnabled !== "false"
            }
            backgroundColor={
              paramKeys.theme === appThemes.DARK
                ? theme.palette.darkTheme.main
                : paramKeys.theme === appThemes.LIGHT
                  ? theme.palette.lightTheme.main
                  : theme.palette.background.default
            }
            color={
              paramKeys.theme === appThemes.LIGHT
                ? theme.palette.lightTheme.contrastText
                : theme.palette.common.white
            }
            animationData={
              paramKeys.theme === appThemes.LIGHT
                ? lightThemeAnimationData
                : animationData
            }
            setMeetingLeft={setMeetingLeft}
          />
        )
      ) : meetingIdValidation.isLoading ? (
        <Box
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              paramKeys.theme === appThemes.DARK
                ? theme.palette.darkTheme.main
                : paramKeys.theme === appThemes.LIGHT
                  ? theme.palette.lightTheme.main
                  : theme.palette.background.default,
          }}
        >
          <CircularProgress size={"4rem"} />
        </Box>
      ) : meetingIdValidation.reqError ? (
        <>
          {/* <ErrorPage
            errMsg={meetingIdValidation.reqError}
            statusCode={meetingIdValidation.reqStatusCode}
          /> */}
        </>
      ) : userHasInteracted && meetingIdValidation.meetingId ? (
        <MeetingAppProvider
          {...{
            redirectOnLeave: paramKeys.redirectOnLeave,
            chatEnabled: paramKeys.chatEnabled === "true",
            screenShareEnabled: paramKeys.screenShareEnabled === "true",
            pollEnabled: paramKeys.pollEnabled === "true",
            whiteboardEnabled: paramKeys.whiteboardEnabled === "true",
            participantCanToggleSelfWebcam:
              paramKeys.participantCanToggleSelfWebcam === "true",
            participantCanToggleSelfMic:
              paramKeys.participantCanToggleSelfMic === "true",
            participantTabPanelEnabled:
              paramKeys.participantTabPanelEnabled === "true",
            raiseHandEnabled: paramKeys.raiseHandEnabled === "true",
            canChangeLayout: paramKeys.canChangeLayout === "true",
            meetingLayoutTopic: paramKeys.meetingLayoutTopic,
            recordingEnabled: paramKeys.recordingEnabled === "true",
            hlsEnabled: paramKeys.hlsEnabled === "true",
            recordingWebhookUrl: paramKeys.recordingWebhookUrl,
            recordingAWSDirPath: paramKeys.recordingAWSDirPath,
            recordingTheme: paramKeys.recordingTheme,
            autoStartRecording: paramKeys.autoStartRecording === "true",
            autoStartHls: paramKeys.autoStartHls === "true",
            hlsPlayerControlsVisible:
              paramKeys.hlsPlayerControlsVisible === "true",
            hlsTheme: paramKeys.hlsTheme,
            participantCanToggleRecording:
              paramKeys.participantCanToggleRecording === "true",
            participantCanToggleHls:
              paramKeys.participantCanToggleHls === "true",
            brandingEnabled: paramKeys.brandingEnabled === "true",
            poweredBy: paramKeys.poweredBy === "true",
            liveStreamEnabled: paramKeys.liveStreamEnabled === "true",
            autoStartLiveStream: paramKeys.autoStartLiveStream === "true",
            liveStreamOutputs: paramKeys.liveStreamOutputs,
            liveStreamTheme: paramKeys.liveStreamTheme,
            brandLogoURL:
              paramKeys.brandLogoURL?.length > 0
                ? paramKeys.brandLogoURL
                : null,
            brandName:
              paramKeys.brandName?.length > 0 ? paramKeys.brandName : null,
            waitingScreenImageUrl:
              paramKeys.waitingScreenImageUrl?.length > 0
                ? paramKeys.waitingScreenImageUrl
                : null,
            waitingScreenText:
              paramKeys.waitingScreenText?.length > 0
                ? paramKeys.waitingScreenText
                : null,
            participantCanLeave: paramKeys.participantCanLeave !== "false",
            askJoin: paramKeys.askJoin === "true",
            participantCanToggleOtherMic:
              paramKeys.participantCanToggleOtherMic === "true",
            participantCanToggleOtherWebcam:
              paramKeys.participantCanToggleOtherWebcam === "true",
            partcipantCanToogleOtherScreenShare:
              paramKeys.partcipantCanToogleOtherScreenShare === "true",
            participantCanToggleLivestream:
              paramKeys.participantCanToggleLivestream === "true",
            participantCanToggleOtherMode:
              paramKeys.participantCanToggleOtherMode === "true",
            notificationSoundEnabled:
              paramKeys.notificationSoundEnabled === "true",
            layoutType: paramKeys.layoutType,
            mode: paramKeys.mode,
            layoutPriority: paramKeys.layoutPriority,
            canPin: paramKeys.canPin === "true",
            selectedMic,
            selectedWebcam,
            joinScreenWebCam,
            joinScreenMic,
            canRemoveOtherParticipant:
              paramKeys.canRemoveOtherParticipant === "true",
            participantCanEndMeeting:
              paramKeys.participantCanEndMeeting === "true",
            canDrawOnWhiteboard: paramKeys.canDrawOnWhiteboard === "true",
            canToggleWhiteboard: paramKeys.canToggleWhiteboard === "true",
            canToggleVirtualBackground:
              paramKeys.canToggleVirtualBackground === "true",
            canCreatePoll: paramKeys.canCreatePoll === "true",
            canToggleParticipantTab:
              paramKeys.canToggleParticipantTab === "true",
            meetingLeft,
            setMeetingLeft,
            animationsEnabled: paramKeys.animationsEnabled !== "false",
            topbarEnabled: paramKeys.topbarEnabled !== "false",
            notificationAlertsEnabled:
              paramKeys.notificationAlertsEnabled !== "false",
            debug: paramKeys.debug === "true",
            layoutGridSize: paramKeys.layoutGridSize,
            hideLocalParticipant: paramKeys.hideLocalParticipant === "true",
            alwaysShowOverlay: paramKeys.alwaysShowOverlay === "true",
            sideStackSize: paramKeys.sideStackSize,
            reduceEdgeSpacing: paramKeys.reduceEdgeSpacing === "true",
            isRecorder: paramKeys.isRecorder === "true",
            appTheme: paramKeys.theme,
            language: paramKeys.language,
            token: paramKeys.token,
            //
            // recordingLayoutType: paramKeys.recordingLayoutType,
            // recordingLayoutPriority: paramKeys.recordingLayoutPriority,
            // recordingLayoutGridSize: paramKeys.recordingLayoutGridSize,
            // liveStreamLayoutType: paramKeys.liveStreamLayoutType,
            // liveStreamLayoutPriority: paramKeys.liveStreamLayoutPriority,
            // liveStreamLayoutGridSize: paramKeys.liveStreamLayoutGridSize,
            //
            maintainVideoAspectRatio:
              paramKeys.maintainVideoAspectRatio === "true",
            maintainLandscapeVideoAspectRatio:
              paramKeys.maintainLandscapeVideoAspectRatio === "true",
            networkBarEnabled: paramKeys.networkBarEnabled === "true",
            cameraResolution: paramKeys.cameraResolution,
            cameraMultiStream: paramKeys.cameraMultiStream === "true",
            cameraOptimizationMode: paramKeys.cameraOptimizationMode,
            screenShareResolution: paramKeys.screenShareResolution,
            screenShareOptimizationMode: paramKeys.screenShareOptimizationMode,
            micQuality: paramKeys.micQuality,
            oldmeetingId: paramKeys.meetingId,
          }}
        >
          <MeetingProvider
            config={{
              meetingId: meetingIdValidation.meetingId,
              micEnabled: joinScreenMic,
              webcamEnabled: joinScreenWebCam,
              name: name,
              maxResolution:
                paramKeys.isRecorder === "true"
                  ? "hd"
                  : paramKeys.maxResolution === "sd" ||
                    paramKeys.maxResolution === "hd"
                    ? paramKeys.maxResolution
                    : "sd",
              participantId: paramKeys.participantId,
              preferredProtocol: paramKeys.preferredProtocol,
              autoConsume: false,
              mode: paramKeys.mode,
              multiStream: paramKeys.multiStream === "true",
            }}
            token={paramKeys.token}
            joinWithoutUserInteraction
            deviceInfo={{
              sdkType: "prebuilt",
              sdkVersion: prebuiltSDKVersion,
              rawUserAgent:
                paramKeys.rawUserAgent || typeof window !== "undefined"
                  ? window?.navigator?.userAgent
                  : null,
            }}
          >
            <MeetingContainer
              meetingId={meetingIdValidation.meetingId}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : paramKeys.joinScreenEnabled === "true" ? (
        <JoinMeeting
          onClick={({ name, webcamOn, micOn }) => {
            setName(name);
            setJoinScreenMic(micOn);
            setJoinScreenWebCam(webcamOn);
            setUserHasInteracted(true);
          }}
          {...{
            micEnabled:
              paramKeys.mode === meetingModes.VIEWER
                ? false
                : paramKeys.micEnabled === "true",
            webcamEnabled:
              paramKeys.mode === meetingModes.VIEWER
                ? false
                : paramKeys.webcamEnabled === "true",
          }}
          name={name}
          setName={setName}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          meetingUrl={paramKeys.joinScreenMeetingUrl}
          meetingTitle={paramKeys.joinScreenTitle}
          participantCanToggleSelfWebcam={
            paramKeys.mode === meetingModes.VIEWER
              ? "false"
              : paramKeys.participantCanToggleSelfWebcam
          }
          participantCanToggleSelfMic={
            paramKeys.mode === meetingModes.VIEWER
              ? "false"
              : paramKeys.participantCanToggleSelfMic
          }
          mode={paramKeys.mode}
          appTheme={paramKeys.theme}
          meetingID={paramKeys.meetingId}
          participantCanToggleRecording={
            paramKeys.participantCanToggleRecording
          }
        />
      ) : (
        <ClickAnywhereToContinue
          onClick={() => {
            setUserHasInteracted(true);
          }}
          title="Click anywhere to continue"
          brandLogoURL={paramKeys.brandLogoURL}
        />
      )}
      <ConfirmBox
        open={meetingError.isVisible}
        successText="OKAY"
        onSuccess={() => {
          setMeetingError(({ message }) => {
            throw new Error(message);

            // return {
            //   message: null,
            //   code: null,
            //   isVisible: false,
            // };
          });
        }}
        title={`Error Code: ${meetingError.code}`}
        subTitle={meetingError.message}
      />
    </>
  );
};

export default MainContainer;
