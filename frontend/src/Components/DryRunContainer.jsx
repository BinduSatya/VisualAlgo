import "../App.css";

const DryRunContainer = ({ clicked, steps, loadingDryRun }) => {
  return (
    <div
      className={`w-1/3 max-h-screen bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex flex-col`}
    >
      <div className="flex-none p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold text-accent">
          Dry-Run Simulation: <span className="text-white">{clicked}</span>
        </h2>
      </div>
      <div
        className={`overflow-y-auto text-wrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${
          steps.length > 0 ? "p-3" : ""
        } bg-gray-900 rounded-md ${
          loadingDryRun ? "flex justify-center items-center h-full" : ""
        }`}
      >
        {loadingDryRun && (
          <>
            <div className="loader bg-accent"></div>
          </>
        )}
        <ul className="list-decimal list-inside space-y-2">
          {steps.map((step, i) => (
            <li
              key={i}
              className="text-gray-200 hover:text-accent transition-colors cursor-pointer duration-200"
            >
              {step}
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
};

export default DryRunContainer;
