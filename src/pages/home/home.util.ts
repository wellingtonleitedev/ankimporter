import { useEffect, useState } from "react";
import { useGetAudios, useGetNotes, useImportNotes } from "../../hooks";
import { TAudio, TData, TNote } from "../../types";

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

    const body = data.map((note) => ({
      deckName: "test1",
      modelName: "Básico",
      fields: {
        Frente: note.front,
        Verso: note.back,
      },
      audio: [
        {
          url: note.audio.url,
          filename: note.audio.name,
          fields: ["Frente"],
        },
      ],
    }));

    await importNotes(body);
  };

  useEffect(() => {
    let enhacedNotes = [];
    if (audios?.length && notes?.length) {
      for (let index = 0; index < notes?.length; index++) {
        enhacedNotes[index] = {
          ...notes[index],
          audio: {
            ...audios[index],
          },
        };
      }

      setData(enhacedNotes);
    }
  }, [notes, audios]);

  return { data, fetchData, onSubmit };
};
