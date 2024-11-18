declare namespace wp {
  element.createElement;
}

interface Window {
  wp: typeof wp;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
