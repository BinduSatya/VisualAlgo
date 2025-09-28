import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GraphsMainPage from "./Graphs/GraphsMainPage";
import SortingPage from "./Sorting/SortingPage";

const App = () => {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/graphs" element={<GraphsMainPage />} />
          <Route path="/" element={<SortingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
