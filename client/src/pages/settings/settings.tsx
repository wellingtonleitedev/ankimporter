import { useSettings } from "./settings.util";

const Settings = () => {
  const { settings, onSubmit } = useSettings();

  return (
    <>
      <header className="bg-zinc-900 border-b">
        <div className="m-auto max-w-5xl py-5">
          <h1 className="text-3xl font-bold">Ankimporter</h1>
        </div>
      </header>
      <main className="m-auto max-w-5xl py-5">
        <form onSubmit={onSubmit} className="flex justify-between my-10">
          <label>
            Deckname
            <input
              name="deckname"
              placeholder="English"
              defaultValue={settings.deckname}
            />
          </label>

          <label>
            Type
            <input
              name="type"
              placeholder="Basic"
              defaultValue={settings.type}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </main>
    </>
  );
};

export default Settings;
