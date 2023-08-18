import { useMutation } from "@tanstack/react-query";
import { getNotes } from "../services";

export const useGetNotes = () => {
  return useMutation({
    mutationKey: ["notes"],
    mutationFn: getNotes,
  });
};
