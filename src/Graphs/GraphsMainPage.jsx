import Grid from "./DivsContainer/Grid";

const GraphsMainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black">
      <h1 className="text-white text-3xl font-bold m-4">
        Graph Algorithms Visualization
      </h1>

      <div className="flex items-center gap-6 mt-6">
        <Grid />
        <div className="my-6 flex flex-wrap gap-3">
          <button
            className={`btn btn-soft 
              `}
          >
            Label
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphsMainPage;
