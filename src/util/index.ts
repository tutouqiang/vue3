export function deepRouter (routes: any[], preFix: string) {
  let arr:any = {}
  for(const i of routes) {
    const { children, meta: { type, name }} = i
    if(children && children.length) {
      arr = [...arr, ...deepRouter(children, `${preFix}/${i.path}`)]
    } else {
      if(!arr[type]) {
        arr[type] = {
          type,
          children: []
        }
      }
      arr[type].children.push({
        path: `${preFix}/${i.path}`,
        meta: name,
      })
    }
  }
  return arr
}
