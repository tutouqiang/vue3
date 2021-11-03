// 过滤路由信息
export const filterRouterMeta = (matched: any) => {
  if(matched && matched.length !== 0) {
    return matched.map((item: any ) => {
      return {
        name: item.meta.name,
        path: item.path,
      }
    })
  }
}