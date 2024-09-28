type Module<T> = {
  boot?(): Promise<void> | void;
} & T;
export default Module;
