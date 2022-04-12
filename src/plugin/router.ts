/*
 * md 文档的路由生成、名称解析
 *
 */
import {opendir} from 'fs/promises'
import fs from 'fs'
import path from 'path'
import articleType from '../views/article/index'
// console.log();

interface Config {
  dirname: string,
  filePath: string,
  outputPath: string
}

interface Routes {
  path: string,
  meta?: string,
  component?: () => void,
  children?: Routes[]
}

async function getFilePath (filePath: string) {
  let routes = ''
  try {
    const dir = await opendir(filePath);
    for await (const dirent of dir) {
      let curpath = path.resolve(filePath, dirent.name);
      let state = fs.lstatSync(curpath); 
      if (state.isDirectory()) {
        routes += await getFilePath(curpath)
      } else {
        let reg = /\.md$/
        if(reg.test(dirent.name)) {
          const componentPath = '../' + curpath.slice(curpath.indexOf('views'), curpath.length) // 相对路径
          const type = componentPath.split('/')[3] // 文件分类
          routes += `{ \n  path: '${dirent.name}', \n  name: '${dirent.name.toLocaleUpperCase()}', \n  meta: {name: '${dirent.name}', type:'${articleType?.get(type)}'}, \n  component: () => import('${componentPath}') \n}, \n`
        }
      }
    }
      
  } catch (err) {
    console.error(err);
  }
  return routes
}

// function fileParse (filePath: string) {
//   let reg = /^[---]+[---]$/
//   let file = fs.readFileSync(filePath, {encoding: 'utf-8'})
//   console.log(file.match(reg));
  
// }

export default function MdRouterGenerate(config: Config) {
  return {
    name: 'md-router-generate',
    buildStart () {
      const { dirname, filePath, outputPath } = config
      getFilePath(path.resolve(dirname, filePath)).then(res => {
        fs.writeFileSync(path.resolve(dirname, outputPath), `// @ts-nocheck \n export default [${res}]`, {encoding: 'utf-8'})
      })
    },
    // resolveId (source, importer, options) {
    //   console.log('resolveId');
    // },
    // load (id) {
    //   console.log('load', id); 
    // },
    // transform (code, id) {
    //   console.log('transform', code, id);
    // },
    // buildEnd (error) {
    //   console.log('buildEnd', error);
    // },
    // closeBundle (closeBundle) {
    //   console.log('closeBundle', closeBundle);
    // }
    
  }
}
