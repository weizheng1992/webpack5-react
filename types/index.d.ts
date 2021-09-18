declare type TargetContext = '_self' | '_blank';

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];
