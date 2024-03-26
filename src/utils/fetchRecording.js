import { FileIo, FileUploadHandler } from "jackal.js";

export const fetchRecording = async (roomId, walletinfo, filename) => {
  try {
    await fetch("https://podocast-api.onrender.com/api/recording", {
      method: "get",
    })
      .then((res) => res.json())
      .then(async (response) => {
        const recordingdata = response.filter((item) => roomId === item.roomId);
        if (recordingdata[recordingdata.length - 1]?.recording) {
          if (walletinfo) {
            const fileIo = await FileIo.trackIo(walletinfo, "1.0.x");
            const url = recordingdata[recordingdata.length - 1]?.recording;
            const fileName = filename + ".mp4";
            const responseurl = await fetch(url);
            const responsedata = await responseurl.blob();
            const metadata = {
              type: "video/mp4",
            };

            const fileblob = new File([responsedata], fileName, metadata);
            const parentFolderPath = "s/Home"; // replace this with your own path

            const handler = await FileUploadHandler.trackFile(
              fileblob,
              parentFolderPath
            );

            const parent = await fileIo.downloadFolder(parentFolderPath);

            const uploadList = {
              [fileName]: {
                data: null,
                exists: false,
                handler: handler,
                key: fileName,
                uploadable: await handler.getForUpload(),
              },
            };
            // ... do something with the file or return it

            await fileIo.staggeredUploadFiles(uploadList, parent, {
              counter: 0,
              complete: 0,
            });
          }
        }
      });
  } catch (err) {
    console.log(err);
  }
};
