import { useEffect, useState } from "react";
import { useGetAudios, useGetNotes } from "../../hooks";
import { TData, TNote } from "../../types";

export const useHome = () => {
  const { data: audios, mutateAsync: getAudios } = useGetAudios();
  const { data: notes, mutateAsync: getNotes } = useGetNotes();
  const [data, setData] = useState<TData[]>([]);

  const gets: Record<
    string,
    (files: FileList) => Promise<{ url: string }[] | TNote[]>
  > = {
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

    console.log({ event });
  };

  useEffect(() => {
    let enhacedNotes = [];
    if (audios?.length && notes?.length) {
      for (let index = 0; index < notes?.length; index++) {
        enhacedNotes[index] = {
          ...notes[index],
          ...audios[index],
        };
      }

      setData(enhacedNotes);
    }
  }, [notes, audios]);

  return { data, fetchData, onSubmit };
};
