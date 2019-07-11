declare module '*.svg' {
  const content: any;
  export default content;
}

declare module NodeJS {
  interface Global {
    fetch: any;
  }
}
