import { Notes } from "../../components";
import { useHome } from "./home.util";

const Home = () => {
  const { data, fetchData, onSubmit } = useHome();

  return (
    <main className="m-auto max-w-5xl px-0.5 py-5">
      <h1 className="text-3xl text-center font-bold">Ankimporter</h1>
      <form onSubmitCapture={onSubmit} className="flex justify-between my-10">
        <input type="file" name="notes" onChange={fetchData} />
        <input multiple type="file" name="audios" onChange={fetchData} />
        <button type="submit" disabled={!data.length}>
          Import
        </button>
      </form>
      <Notes data={data} />
    </main>
  );
};

export default Home;
