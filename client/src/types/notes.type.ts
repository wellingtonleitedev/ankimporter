export type TNote = {
  uuid: string;
  front: string;
  back: string;
};

export type TAudio = {
  name: string;
  url: string;
};

export type TData = TNote & {
  audio?: TAudio;
};

export type TNoteRequest = {
  deckName: string;
  modelName: string;
  fields: {
    Frente: string;
    Verso: string;
  };
  audio: {
    url: string;
    filename: string;
    fields: string[];
  }[];
};
