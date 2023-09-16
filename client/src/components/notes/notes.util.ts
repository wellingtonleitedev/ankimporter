import { ElementRef, useRef, useState } from "react";

import { useEditNotes } from "../../hooks";

type InputValue = {
  value: string;
};

type SubmitEvent = React.FormEvent<HTMLFormElement> & {
  target: EventTarget & {
    uuid?: InputValue;
    front?: InputValue;
    back?: InputValue;
  };
};

export const useNotes = () => {
  const { mutateAsync: editNotes } = useEditNotes();
  const audioRef = useRef<ElementRef<"audio">[]>([]);
  const [edittingNoteId, setEdittingNoteId] = useState<string | undefined>();

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const { uuid, front, back } = event.target;

    setEdittingNoteId((state) =>
      state === uuid?.value ? undefined : uuid?.value
    );

    if (!uuid || !front || !back) return;

    await editNotes({
      uuid: uuid.value,
      front: front.value,
      back: back.value,
    });
  };

  const play = (index: number) => {
    if (audioRef.current) {
      audioRef.current[index].play();
    }
  };

  return { audioRef, edittingNoteId, onSubmit, play };
};
