export type TNote = {
  front: string;
  back: string;
};

export type TAudio = {
  name: string;
  url: string;
};

export type TData = TNote & {
  audio: TAudio;
};
