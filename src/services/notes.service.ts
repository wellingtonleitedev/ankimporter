import { httpClient } from "../config";
import { sanitizeAudios, sanitizeNotes } from "../sanitizers";
import { createFormDataBody } from "../utils";
import { TAudio, TNote, TNoteRequest } from "../types";

export const getAudios = async (files: FileList): Promise<TAudio[]> => {
  const body = createFormDataBody("files", files);
  const { data } = await httpClient.post("audios", body);
  return sanitizeAudios(data);
};

export const getNotes = async (files: FileList): Promise<TNote[]> => {
  const body = createFormDataBody("file", files);
  const { data } = await httpClient.post("files", body);

  return sanitizeNotes(data);
};

export const addNotes = async (notes: TNoteRequest[]) => {
  const { data } = await httpClient.post(
    import.meta.env.VITE_ANKI_CONNECT_URL,
    {
      action: "addNotes",
      version: 6,
      params: { notes },
    }
  );

  return data;
};
