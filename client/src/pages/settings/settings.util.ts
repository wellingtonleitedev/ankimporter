import { useEffect, useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    deckname: "",
    type: "",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { deckname, type } = event.target;

    const setting = { deckname: deckname.value, type: type.value };

    localStorage.setItem("settings", JSON.stringify(setting));

    setSettings(setting);
  };

  useEffect(() => {
    const data = localStorage.getItem("settings");

    if (data) setSettings(JSON.parse(data));
  }, []);

  return { settings, onSubmit };
};
