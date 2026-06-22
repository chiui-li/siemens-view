import { validBool, validInt } from "./utils/validator";

export type DataType = "BOOL" | "INT";
export const BOOL_VALUE_OPTIONS = ["TRUE", "FALSE"];

export const DataTypeOptions = [
  {
    label: "BOOL",
    value: "BOOL",
  },
  {
    label: "INT",
    value: "INT",
  },
];

export const DataTypeConstants = {
  BOOL: {
    defaultValue: "TRUE",
    validator: validBool,
    format: (v?: string) => v?.trim()?.toUpperCase(),
    errorMsg: "请输入 TRUE 或者 FALSE",
  },
  INT: {
    defaultValue: "0",
    validator: validInt,
    format: (v) => v?.trim(),
    errorMsg: "请输入 -2147483648 至 2147483647 之间的整数",
  },
} as Record<
  DataType,
  {
    defaultValue: any;
    validator: (...args: any[]) => boolean;
    format: (v: any) => any;
    errorMsg: string;
  }
>;

export interface RowDataModel {
  name?: string;
  dataType?: DataType;
  defaultValue?: string;
  comment?: string;
  key?: string;
}
