/*
 * md 文档的路由生成、名称解析
 *
 */
export default function MdRouterGenerate() {
  return {
    name: 'md-router-generate',
    options () {
      console.log('options');
      
    },
    buildStart () {
      console.log('buildStart');
      
    },
    transform () {
      console.log('transform');
    }
  }
}
