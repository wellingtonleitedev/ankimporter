import { useEffect, useState } from "react";
import { TAudio, TData, TNote } from "../../types";
import { useGetAudios, useGetNotes, useImportNotes } from "../../hooks";

export const useHome = () => {
  const { data: audios, mutateAsync: getAudios } = useGetAudios();
  const { data: notes, mutateAsync: getNotes } = useGetNotes();
  const { mutateAsync: importNotes } = useImportNotes();
  const [data, setData] = useState<TData[]>([]);

  const gets: Record<string, (files: FileList) => Promise<TAudio[] | TNote[]>> =
    {
      audios: getAudios,
      notes: getNotes,
    };

  const fetchData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = event.target;
    if (!files?.length) return;
    await gets[name](files);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storage = localStorage.getItem("settings");
    const settings = storage
      ? JSON.parse(storage)
      : ({} as { deckname: string; type: string });

    if (!settings.deckname || !settings.type) return;

    const body = data.map((note) => ({
      deckName: settings.deckname,
      modelName: settings.type,
      fields: {
        Frente: note.front,
        Verso: note.back,
      },
      audio: note.audio
        ? [
            {
              url: note.audio.url,
              filename: note.audio.name,
              fields: ["Frente"],
            },
          ]
        : [],
    }));

    await importNotes(body);
  };

  useEffect(() => {
    let sanitizedData = notes ?? [];

    if (notes?.length && audios?.length) {
      sanitizedData = notes.map((note) => {
        const audio = audios.find((audio) =>
          note.front
            .toLowerCase()
            .match(
              audio.name
                .replace(".mp3", "")
                .replace(/\d/g, "")
                .toLowerCase()
                .trim()
            )
        );

        return {
          ...note,
          audio,
        };
      });
    }

    setData(sanitizedData);
  }, [notes, audios]);

  return { data, fetchData, onSubmit };
};
