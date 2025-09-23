const BarsContainer = ({ array, active, clicked }) => {
  return (
    <div
      className={`flex flex-row items-end justify-center bg-gray-900 px-4 pb-1 rounded-xl shadow h-400 
  transition-colors duration-700 ease-in-out ${
    clicked == null ? "border-2 border-accent" : "border-2 border-primary"
  }`}
      style={{ width: "80%" }}
    >
      {array.map((value, idx) => {
        let color = "#444";

        if (active.finalised.includes(idx)) color = "white"; // finalisedW
        else if (active.keyIdx === idx) color = "green"; // pivot
        else if (active.compareIdx.includes(idx)) color = "yellow"; // comparing
        return (
          <div
            // className={`array-bar ml-1 rounded-lg`}
            className={`array-bar ml-1 mt-2 rounded-tl-lg rounded-tr-lg`}
            key={idx}
            style={{
              // marginRight: "2px",
              height: `${value}px`,
              width: `calc(80% / ${array.length})`,
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default BarsContainer;
