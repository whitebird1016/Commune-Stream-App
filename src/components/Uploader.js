import { useEffect, useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { styled } from "styled-components";
import {
  audioIcon,
  documentIcon,
  fileIcon,
  imageIcon,
  videoIcon,
} from "./Images";
const Uploader = ({ selectedFile, setSelectedFile }) => {
  const [image, setImage] = useState(null);
  console.log(selectedFile);
  useEffect(() => {
    if (selectedFile) {
      let image = fileIcon;
      if (selectedFile?.type?.search("image") === 0) {
        image = imageIcon;
      }
      if (selectedFile?.type?.search("video") === 0) {
        image = videoIcon;
      }
      if (selectedFile?.type?.search("audio") === 0) {
        image = audioIcon;
      }
      if (
        selectedFile?.type?.search("application") === 0 ||
        selectedFile?.type?.search("text") === 0
      ) {
        image = documentIcon;
      }
      setImage(image);
    } else {
      setImage(null);
    }
  }, [selectedFile]);

  return (
    <UploadWrapper>
      <UploadForm
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setSelectedFile(files[0]);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />

        {image ? (
          <img src={image} width={150} height={150} alt={selectedFile?.name} />
        ) : (
          <>
            <MdCloudUpload color="white" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </UploadForm>

      {selectedFile && (
        <UploadRow>
          <img src={image} width={30} height={30} alt={selectedFile?.name} />
          <UploadContent>
            {selectedFile?.name}
            <MdDelete
              onClick={() => {
                setSelectedFile("");
                setImage(null);
              }}
            />
          </UploadContent>
        </UploadRow>
      )}
    </UploadWrapper>
  );
};
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
const UploadForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #1475cf;
  cursor: pointer;
  height: 200px;
  border-radius: 5px;
  color: rgb(255, 255, 255, 0.6);
`;

const UploadRow = styled.section`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  color: rgb(255, 255, 255, 0.6);
  font-size: 18px;
`;
const UploadContent = styled.span`
  display: flex;
  align-items: center;
  word-wrap: break-word;
`;

export default Uploader;
