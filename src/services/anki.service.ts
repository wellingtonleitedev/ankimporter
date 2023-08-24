import { httpClient } from "../config";
import { TNoteRequest } from "../types";

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
