declare module "rehype-add-classes" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rehypeAddClasses: any;
  export default rehypeAddClasses;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
