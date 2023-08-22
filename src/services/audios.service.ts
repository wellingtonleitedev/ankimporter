import { httpClient } from "../config";
import { createFormDataBody } from "../utils";

export const getAudios = async (
  files: FileList
): Promise<{ url: string }[]> => {
  const body = createFormDataBody("files", files);
  const { data } = await httpClient.post("audios", body);
  return data;
};
