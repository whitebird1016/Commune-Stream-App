import VideoFile from "../assets/loading.webm";
import styled from "styled-components";
const LoadingVideo = () => {
  return (
    <Wrapper>
      <video autoPlay={true} loop muted width="700">
        <source src={VideoFile} type="video/webm" />
      </video>
      Storage Loading...
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(35 45 69);
  flex-direction: column;
  gap: 20px;
  color: white;
  font-size: 40px;
`;
export default LoadingVideo;
