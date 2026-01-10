import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export interface NotifyProps {
  type: "error" | "success" | "info";
  onClose: () => void;
  text: string;
}

const getTypeStyle = (type: NotifyProps["type"]) => {
  const styles = {
    error: "border-red-500 text-red-500",
    success: "border-green-500 text-green-500",
    info: "border-brand-primary text-brand-primary"
  } as const;
  return styles[type];
};

const getTypeIcon = (type: NotifyProps["type"]) => {
  const icons = {
    error: <BiErrorCircle className="text-xl" />,
    success: <IoMdCheckmarkCircle className="text-xl" />,
    info: <IoMdInformationCircle className="text-xl" />
  };
  return icons[type];
};

export const Notify: React.FC<NotifyProps> = ({ type, text, onClose }) => {
  return (
    <div
      className={`${getTypeStyle(type)} flex w-fit items-center gap-2 rounded-lg border bg-primary px-6 py-3 text-base shadow-md transition-all duration-300`}
      role="alert"
    >
      <p className="flex gap-2">
        {getTypeIcon(type)}
        <span>{text}</span>
      </p>
      <button onClick={onClose} className="hover:opacity-70" aria-label="닫기">
        <IoClose className="text-xl" />
      </button>
    </div>
  );
};
