import { FileClipIcon } from "@/shared/config";

interface ImageUploadInputProps {
  id: string;
  labelTitle?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  id,
  labelTitle,
  labelProps,
  inputProps
}) => {
  return (
    <div className="flex-shrink-0 text-gray-400">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-1 hover:text-sky-blue"
        {...labelProps}
      >
        <FileClipIcon size={20} />
        {labelTitle !== undefined && (
          <span aria-labelledby="article-file-upload">{labelTitle}</span>
        )}
      </label>
      <input type="file" className="sr-only" id={id} {...inputProps} />
    </div>
  );
};
