 import { Status } from "../type";
import { StatusTextColorClass } from "../constants";

export const TextUi = ({
  text,
  status,
}: {
  text: string;
  status: Status;
}) => {
  const color = StatusTextColorClass[status];

  return <span className={`${color} `} > {text} </span>;
};
