import { BOOL_VALUE_OPTIONS, type DataType } from "../constants";

export const validBool = (val?: string) => {
  if (typeof val === "string") {
    return BOOL_VALUE_OPTIONS.includes(val.trim().toUpperCase());
  }
  return false;
};

export const validInt = (val?: string) => {
  // const reg = /^-?\d+$/;
  if (typeof val === "string") {
    const int = Number(val);
    return (
      Number.isInteger(int) &&
      String(int) === val &&
      int > -2147483648 &&
      int < 2147483647
    );
  }
  return false;
};

export const validName = (newName?: string, names?: string[]) => {
  if (!newName) {
    return false;
  }
  return !names?.includes(newName?.trim());
};

export const validDefaultValue = (d: DataType, ...args: any[]) => {
  switch (d) {
    case "BOOL":
      return validBool(...args);
    case "INT":
      return validInt(...args);
    default:
      return true;
  }
};
