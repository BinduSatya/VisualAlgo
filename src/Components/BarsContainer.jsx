const BarsContainer = ({ array, active }) => {
  return (
    <div
      className="flex flex-row items-end justify-center bg-gray-900 px-4 pb-1 rounded-xl shadow h-400 border border-red"
      style={{ width: "80%" }}
    >
      {array.map((value, idx) => {
        let color = "#444";

        if (active.finalised.includes(idx)) color = "white"; // finalisedW
        else if (active.keyIdx === idx) color = "green"; // pivot
        else if (active.compareIdx.includes(idx)) color = "yellow"; // comparing
        return (
          <div
            className={`array-bar ml-1 rounded-lg`}
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
