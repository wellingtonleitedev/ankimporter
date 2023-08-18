import { useMutation } from "@tanstack/react-query";
import { getAudios } from "../services";

export const useGetAudios = () => {
  return useMutation({
    mutationKey: ["audios"],
    mutationFn: getAudios,
  });
};
