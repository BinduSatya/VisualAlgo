import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home";
import GraphsMainPage from "./Graphs/GraphsMainPage";
import SortingPage from "./Sorting/SortingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/graphs" element={<GraphsMainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
