import { httpClient } from "../config";
import { TAudio } from "../types";
import { createFormDataBody } from "../utils";

export const getAudios = async (files: FileList): Promise<TAudio[]> => {
  const body = createFormDataBody("files", files);
  const { data } = await httpClient.post("audios", body);
  return data;
};
