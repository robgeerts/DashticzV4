interface Main {
  type: "default";
  primaryColor: string;
}

interface Loader {
  logo: string;
  type: "default" | "spinner-message" | "spinner-logo";
}

interface LayoutConfig {
  main: Main;
  loader: Loader;
}

export default LayoutConfig;

export {
  Main,
  Loader,
  LayoutConfig,
};
