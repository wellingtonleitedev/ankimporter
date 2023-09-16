import { httpClient } from "../config";
import { createFormDataBody } from "../utils";
import { sanitizeAudios } from "../sanitizers";
import { TAudio, TData, TNote, TNoteRequest } from "../types";

export const getAudios = async (files: FileList): Promise<TAudio[]> => {
  const body = createFormDataBody("files", files);
  const { data } = await httpClient.post("audios", body);
  return sanitizeAudios(data);
};

export const getNotes = async (files: FileList): Promise<TNote[]> => {
  const body = createFormDataBody("file", files);
  const { data } = await httpClient.post("files", body);
  return data;
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

export const editNotes = async (editedNote: TData, notes?: TData[]) => {
  if (!notes?.length) return;

  const note = notes?.find((item) => item.uuid === editedNote.uuid);
  if (note) Object.assign(note, { ...note, ...editedNote });
  return notes;
};
