import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TData } from "../types";
import { mutationKeys } from "../constraints";
import { getAudios, addNotes, getNotes, editNotes } from "../services";

export const useGetAudios = () => {
  return useMutation({
    mutationKey: mutationKeys.audios,
    mutationFn: getAudios,
  });
};

export const useGetNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.notes,
    mutationFn: getNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(mutationKeys.notes, data);
    },
  });
};

export const useImportNotes = () => {
  return useMutation({
    mutationKey: mutationKeys.importNotes,
    mutationFn: addNotes,
  });
};

export const useEditNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.editNotes,
    mutationFn: async (note: TData) => {
      const notes = queryClient.getQueryData<TData[]>(mutationKeys.notes);
      editNotes(note, notes);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(mutationKeys.notes, data);
    },
  });
};
