export function deepRouter (routes: any[], preFix: string) {
  let arr:any = []
  for(const i of routes) {
    if(i.children && i.children.length) {
      arr = [...arr, ...deepRouter(i.children, `${preFix}/${i.path}`)]
    } else {
      arr.push({
        path: `${preFix}/${i.path}`,
        meta: i.meta.name,
      })
    }
  }
  return arr
}
