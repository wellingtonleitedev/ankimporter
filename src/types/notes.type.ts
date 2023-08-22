export type TNote = {
  front: string;
  back: string;
};

export type TData = TNote & {
  url?: string;
};
