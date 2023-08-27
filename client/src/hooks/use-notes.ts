import { useMutation } from "@tanstack/react-query";
import { getAudios, addNotes, getNotes } from "../services";

export const useGetAudios = () => {
  return useMutation({
    mutationKey: ["audios"],
    mutationFn: getAudios,
  });
};

export const useGetNotes = () => {
  return useMutation({
    mutationKey: ["notes"],
    mutationFn: getNotes,
  });
};

export const useImportNotes = () => {
  return useMutation({
    mutationKey: ["importNotes"],
    mutationFn: addNotes,
  });
};
