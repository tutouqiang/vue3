export interface MenuItemType {
  label: string,
  index: string,
  route: string,
  icon?: string,
  children?: MenuItemType[]
}

export interface MenuType {
  [index: number]: MenuItemType
}
