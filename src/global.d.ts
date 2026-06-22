interface VariableCell<T = {}, M = string> {
  (
    props: T & {
      value: string;
      onChange?: (val?: M) => void;
      validator?: (...args: any[]) => boolean | string;
      format?: (v?: M) => M | undefined;
    },
  ): JSX;
}
