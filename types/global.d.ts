/// <reference types="node" />
/// <reference types="react-dom" />
// declare global {
declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;

declare function parseInt(s: string | number, radix?: number): number;

declare function parseFloat(string: string | number): number;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    WX_PORT: number;
    WX_PUBLIC_PATH?: string;
    WX_PROXY: [string, string][];
    VITE_DROP_CONSOLE: boolean;
    WX_GLOB_API_URL: string;
    WX_GLOB_UPLOAD_URL: string;
    WX_GLOB_API_URL_PREFIX: string;
  }
}
