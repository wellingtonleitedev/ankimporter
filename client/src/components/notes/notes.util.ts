import { useRef } from "react";

export const useNotes = () => {
  const audioRef = useRef<HTMLAudioElement[]>([]);

  const play = (index: number) => {
    if (audioRef.current) {
      audioRef.current[index].play();
    }
  };

  return { audioRef, play };
};
