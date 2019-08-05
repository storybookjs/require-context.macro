declare module 'require-context.macro' {
  const value: (
    path: string,
    deep: boolean,
    filter: RegExp,
  ) => __WebpackModuleApi.RequireContext;
  export default value;
}
