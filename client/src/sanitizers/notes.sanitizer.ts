import { TAudio } from "../types";

type TAudioResponse = { name: string }[];

export const sanitizeAudios = (response: TAudioResponse): TAudio[] =>
  response.map((audio) => ({
    url: `${import.meta.env.VITE_API_BASE_URL}public/${audio.name}`,
    name: audio.name,
  }));
