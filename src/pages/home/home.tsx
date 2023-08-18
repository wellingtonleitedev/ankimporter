import { Notes } from "../../components";
import { useHome } from "./home.utils";

const Home = () => {
  const { data, fetchAudios, fetchNotes } = useHome();

  return (
    <main style={{ margin: "auto", maxWidth: 992 }}>
      <h1 className="text-3xl font-bold underline">Ankimporter</h1>
      <form className="flex justify-between my-10">
        <input type="file" onChange={fetchNotes} />
        <input type="file" multiple onChange={fetchAudios} />
        <button type="submit">Submit</button>
      </form>
      <Notes data={data} />
    </main>
  );
};

export default Home;
