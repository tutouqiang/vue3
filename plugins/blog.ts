// import YAML from 'yaml'
// import * as fs from 'fs'
// import path from 'path'

// function parseFrontmatter(markdown: string) {
//   const frontmatterRegex = /^---([\s\S]*?)---/;
//   const match = markdown.match(frontmatterRegex);
//   if (match) {
//     const frontmatter = match[1];
//     try {
//       return JSON.parse(`{${frontmatter}}`);
//     } catch (e) {
//       try {
//         return YAML.parse(frontmatter);
//       } catch (e) {
//         throw new Error('Failed to parse frontmatter');
//       }
//     }
//   }
//   return {};
// }

// const articleType = [
//   {
//     mdPath: "/front-end",
//     title: '前端'
//   },
//   {
//     mdPath: "/source-code-analysis",
//     title: '源码分析'
//   },
//   {
//     mdPath: "/system",
//     title: '系统'
//   }
// ]

// export default defineNuxtPlugin(nuxtApp => {
//   const blogData: any[] = []
//   const file = fs.readdirSync(path.resolve(__dirname, '../content'))

//   file.forEach((item: string) => {
//     const filePath = path.resolve(__dirname, `../content/${item}`)
//     const statSyncResult = fs.statSync(filePath)
//     const blogDataList: any[] = []
//     const blogTypeFilter = articleType.filter(type => type.mdPath.includes(item))

//     if(statSyncResult.isDirectory() && item !== '.DS_Store') {
//       const bolgDirList = fs.readdirSync(filePath)

//       bolgDirList.forEach((item1: string) => {
//         const childFilePath = path.resolve(__dirname, `../content/${item}/${item1}`)
//         const childStatSyncResult = fs.statSync(childFilePath)

//         if(!childStatSyncResult.isDirectory() && item1 !== '.DS_Store') {
//           const bolgContent = fs.readFileSync(childFilePath)
//           const blogContentObj = parseFrontmatter(bolgContent.toString())
          

//           blogDataList.push({
//             path: `/${item}/${item1.replace('.md', '')}`,
//             blogType: blogTypeFilter.length === 1 ? blogTypeFilter[0].title : '未知',
//             ...blogContentObj
//           })
//         }
//       })
//       blogData.push({
//         type: blogTypeFilter.length === 1 ? blogTypeFilter[0].title : '未知',
//         blogList: blogDataList
//       })
//     }
//   })

//   const blodDataJson = JSON.stringify({blogData}, null, 2)
  
//   const result = fs.writeFileSync(path.resolve(__dirname, '../server/blog.json'), blodDataJson)
//   console.log(result, 1)
//   // nuxtApp.router.beforeEach((to: any, from: any, next: any) => {
//   //   // NProgress.start();
//   //   next()
//   // });
//   // nuxtApp.router.afterEach(() => {
//   //   // NProgress.done()
//   // })
// })

