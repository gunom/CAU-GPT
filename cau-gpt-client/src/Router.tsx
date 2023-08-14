import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Answer from "./Answer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/question" element={<Answer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
