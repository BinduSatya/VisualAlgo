const BarsContainer = ({ array, active }) => {
  return (
    <div
      className="flex flex-row items-end justify-center bg-red-500 px-4 rounded shadow"
      style={{ height: "300px", width: "80%" }}
    >
      {array.map((value, idx) => {
        let color = "blue";

        if (active.finalised.includes(idx)) color = "white"; // finalised
        else if (active.keyIdx === idx) color = "green"; // pivot
        else if (active.compareIdx.includes(idx)) color = "yellow"; // comparing
        return (
          <div
            className={`array-bar cursor-pointer bg-[#222]`}
            key={idx}
            style={{
              marginRight: "2px",
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
