// global.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.css?url' {
  const url: string;
  export default url;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.json' {
  const value: string;
  export default value;
}

declare module '*.css' {
  const content: Record<string, string>;

  export default content;
}
