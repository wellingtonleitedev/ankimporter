import { httpClient } from "../config";
import { sanitizeNotes } from "../sanitizers";
import { createFormDataBody } from "../utils";
import { TNote } from "../types";

export const getNotes = async (files: FileList): Promise<TNote[]> => {
  const body = createFormDataBody("file", files);
  const { data } = await httpClient.post("files", body);

  return sanitizeNotes(data);
};
