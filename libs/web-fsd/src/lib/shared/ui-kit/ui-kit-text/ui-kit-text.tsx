 import { Status } from "../type";
import { StatusTextColorClass } from "../constants";

export const TextUi = ({
  text,
  status=Status.None,
}: {
  text: string | null;
  status?: Status;
}) => {
  const color = StatusTextColorClass[status];

  return <span className={`${color}  min-h-8`} > {text} </span>;
};
