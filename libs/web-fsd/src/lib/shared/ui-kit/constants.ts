import { Status } from "./type";

export const StatusBgColorClass = {
  [Status.Success]: 'bg-success',
  [Status.Error]: 'bg-error',
   [Status.None]: '',
};

 


 
export const StatusTextColorClass: Record<Status, string> = {
  [Status.Success]: 'text-success',
  [Status.Error]: 'text-error',
  [Status.None]: '',
};