export type RouterType = {
  path: string;
  component: () => JSX.Element;
};

export type RouteConfig = {
  exact?: boolean;
  path?: string;
  isProtected?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  component:
    | ((props: any) => JSX.Element)
    | React.LazyExoticComponent<(props: any) => JSX.Element>;

  routes?: RouteConfig[];
};
