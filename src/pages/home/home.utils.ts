import { useEffect, useState } from "react";
import { useGetAudios, useGetNotes } from "../../hooks";

export const useHome = () => {
  const { data: audios, mutateAsync: getAudios } = useGetAudios();
  const { data: notes, mutateAsync: getNotes } = useGetNotes();
  const [data, setData] = useState<
    {
      url?: string;
      front: string;
      back: string;
    }[]
  >(notes || []);

  const fetchNotes = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const [file] = event.target.files;
    await getNotes(file);
  };

  const fetchAudios = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    await getAudios(event.target.files);
  };

  useEffect(() => {
    let enhacedNotes = [];
    console.log({ audios, notes });
    if (!!audios?.length && !!notes?.length) {
      for (let index = 0; index < notes?.length; index++) {
        enhacedNotes[index] = {
          ...notes[index],
          ...audios[index],
        };
      }

      setData(enhacedNotes);
    }
  }, [notes, audios]);

  return { data, fetchAudios, fetchNotes };
};
