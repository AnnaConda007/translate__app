import { Status } from "./type";

export const StatusBgColorClass = {
  [Status.Success]: 'bg-success',
  [Status.Error]: 'bg-error',
   [Status.None]: '',
};

 

export const StatusBorderClass: Record<Status, string> = {
  [Status.None]: "border-secondary focus:ring-2 focus:ring-main",
  [Status.Error]: "border-error focus:ring-2",
  [Status.Success]: "border-success focus:ring-2",
};

 
export const StatusTextColorClass: Record<Status, string> = {
  [Status.Success]: 'text-success',
  [Status.Error]: 'text-error',
  [Status.None]: '',
};