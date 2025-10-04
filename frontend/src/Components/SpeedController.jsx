const SpeedController = ({ speed, setSpeed }) => {
  return (
    <div className="flex flex-row gap-5 w-9/20">
      <span className="font-medium mb-2">Speed</span>
      <div className="flex flex-col w-full">
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={11 - Math.floor(speed / 100)}
          onChange={(e) => setSpeed((11 - Number(e.target.value)) * 100)}
          className="range range-accent w-full"
        />
        <div className="flex justify-between w-full text-xs mt-1">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeedController;
