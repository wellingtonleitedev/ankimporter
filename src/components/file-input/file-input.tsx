import { ElementRef, InputHTMLAttributes, useRef } from "react";
import { icons } from "../../assets";

type FileInputProps = InputHTMLAttributes<HTMLInputElement>;

const FileInput = ({
  placeholder = "No file chosen",
  ...props
}: FileInputProps) => {
  const fileInputRef = useRef<ElementRef<"input">>(null);
  const value = fileInputRef.current?.files?.[0]?.name ?? placeholder;

  return (
    <label className="bg-transparent border flex gap-2 pr-2 rounded text-sm text w-44">
      <img className="bg-slate-50 rounded-s px-2" src={icons.file} />
      <input ref={fileInputRef} className="hidden" type="file" {...props} />
      <span className="truncate m-auto">{value}</span>
    </label>
  );
};

export default FileInput;
