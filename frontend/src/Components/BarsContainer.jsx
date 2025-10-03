const BarsContainer = ({ array, active, clicked }) => {
  return (
    <div
      className={`flex flex-row items-end justify-center bg-gray-800 px-6 py-4 rounded-xl shadow-lg 
        transition-colors duration-500 ease-in-out ${
          clicked == null ? "border-2 border-accent" : "border-2 border-primary"
        }`}
      style={{ width: "95%", height: "350px" }}
    >
      {array.map((value, idx) => {
        let color = "#4B5563";

        if (active.finalised.includes(idx)) color = "#60A5FA";
        else if (active.keyIdx === idx) color = "#10B981";
        else if (active.compareIdx.includes(idx)) color = "#FBBF24";
        return (
          <div
            key={idx}
            className="mx-[1px] rounded-t-md flex justify-center items-start transition-all duration-300 ease-in-out"
            style={{
              height: `${value}px`,
              width: `${85 / array.length}%`,
              backgroundColor: color,
            }}
          >
            {array.length <= 20 && (
              <span className="text-sm text-white font-semibold select-none">
                {value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BarsContainer;
