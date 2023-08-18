import { httpClient } from "../config";

export const getAudios = async (
  files: FileList
): Promise<{ url: string }[]> => {
  const body = new FormData();
  Object.values(files).forEach((file) => {
    body.append("files", file);
  });
  const { data } = await httpClient.post("audios", body);
  return data;
};
