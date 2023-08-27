export const createFormDataBody = (name: string, files: FileList) => {
  const body = new FormData();
  Object.values(files).forEach((file) => {
    body.append(name, file);
  });

  return body;
};
