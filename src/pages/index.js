import { Route, Routes } from "react-router-dom";
import WrapApp from "./WrapApp";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<WrapApp />} />
    </Routes>
  );
};

export default Router;
