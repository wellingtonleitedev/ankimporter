import { httpClient } from "../config";
import { sanitizeNotes } from "../sanitizers";
import { INote } from "../types";

export const getNotes = async (file: File): Promise<INote[]> => {
  const body = new FormData();
  body.append("file", file);

  const { data } = await httpClient.post("files", body);

  return sanitizeNotes(data);
};
