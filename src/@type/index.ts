interface breadcrumbType {
  name: string;
  path: string;
}

interface menuType {
  name: string,
  path: string,
  icon: string,
  haveChild: boolean,
  children: menuType
}[]

export {
  menuType,
  breadcrumbType
}