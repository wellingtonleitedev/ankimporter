import { useMutation } from "@tanstack/react-query";
import { addNotes } from "../services";

export const useImportNotes = () => {
  return useMutation({
    mutationKey: ["importNotes"],
    mutationFn: addNotes,
  });
};
