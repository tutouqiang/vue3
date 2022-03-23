/*
 * md 文档的路由生成、名称解析
 *
 */
import {opendir} from 'fs/promises'
import fs from 'fs'
import path from 'path'
// console.log();

interface Config {
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
          routes += `{
            path: '${dirent.name}',
            name: '${dirent.name.toLocaleUpperCase()}',
            meta: {name: '${dirent.name}'},
            component: () => import('${curpath}'),
          },`
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
    options (options) {
    },
    buildStart (options) {
      const { filePath, outputPath } = config
      getFilePath(filePath).then(res => {
        // console.log(JSON.parse(res))
        fs.writeFileSync(outputPath, `export default [${res}]`, {encoding: 'utf-8'})
        // fileParse('/Users/hexie/Desktop/my/wooc/src/notes/interview/Draza-Alibaba.md')
      }
        
      )
      console.log('buildStart', options);
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
