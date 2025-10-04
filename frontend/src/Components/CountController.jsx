const CountController = ({ count, disabled, setCount }) => {
  return (
    <div className="flex flex-row gap-5 items-center w-11/20">
      <span className="font-medium ">Count</span>
      <div className="flex flex-col w-full">
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          disabled={disabled}
          className="range range-primary w-full"
        />
        <div className="flex justify-between w-full text-xs mt-1">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
            <span key={val}>{val}</span>
          ))}
        </div>
      </div>
      <input
        type="number"
        min={3}
        max={100}
        value={count}
        disabled={disabled}
        className="input input-bordered w-20 text-white"
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val < 3) setCount(3);
          else if (val > 100) setCount(100);
          else setCount(val);
        }}
      />
    </div>
  );
};

export default CountController;
