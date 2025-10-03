import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-accent">
      <h1 className="text-3xl font-bold mb-8">Algorithm Visualizer</h1>
      <nav className="flex gap-6 text-lg">
        <Link to="/sorting" className="hover:underline">
          Sorting Algorithm
        </Link>
        <Link to="/graphs" className="hover:underline">
          Graph Algorithm
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
