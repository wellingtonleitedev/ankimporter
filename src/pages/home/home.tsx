import { Notes } from "../../components";
import { useHome } from "./home.util";

const Home = () => {
  const { data, fetchData, onSubmit } = useHome();

  return (
    <>
      <header className="bg-zinc-900 border-b">
        <div className="m-auto max-w-5xl py-5">
          <h1 className="text-3xl font-bold">Ankimporter</h1>
        </div>
      </header>
      <main className="m-auto max-w-5xl py-5">
        <form onSubmitCapture={onSubmit} className="flex justify-between my-10">
          <input
            type="file"
            name="notes"
            className="rounded"
            onChange={fetchData}
            accept="application/pdf"
          />
          <input
            multiple
            type="file"
            name="audios"
            accept="audio/*"
            className="rounded"
            onChange={fetchData}
            placeholder="No audio chosen"
          />
          <button
            className="bg-slate-50 text-zinc-800 px-2 py-1 rounded"
            type="submit"
            disabled={!data.length}
          >
            Import
          </button>
        </form>
        <Notes data={data} />
      </main>
    </>
  );
};

export default Home;
