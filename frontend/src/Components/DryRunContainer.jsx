import React from "react";

const DryRunContainer = ({ clicked, steps }) => {
  return (
    <div className="w-1/3 h-full bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-600 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-accent border-b border-gray-600 pb-2">
        Dry-Run Simulation: <span className="text-white">{clicked}</span>
      </h2>
      <div
        className={`overflow-y-auto text-wrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${
          steps.length > 0 ? "p-3" : ""
        } bg-gray-900 rounded-md`}
      >
        <ul className="list-decimal list-inside space-y-2">
          {steps.map((step, i) => (
            <li
              key={i}
              className="text-gray-200 hover:text-accent transition-colors cursor-pointer duration-200"
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DryRunContainer;
