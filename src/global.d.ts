declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV?: 'local' | 'development' | 'staging' | 'production';
  }
}
