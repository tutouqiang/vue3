// @ts-nocheck 
 export default [{ 
  path: 'block.md', 
  name: 'BLOCK.MD', 
  meta: {name: 'block.md', type:'前端'}, 
  component: () => import('../views/article/frontEnd/block.md') 
}, 
{ 
  path: 'Configure.md', 
  name: 'CONFIGURE.MD', 
  meta: {name: 'Configure.md', type:'前端'}, 
  component: () => import('../views/article/frontEnd/Configure.md') 
}, 
{ 
  path: 'weakup.md', 
  name: 'WEAKUP.MD', 
  meta: {name: 'weakup.md', type:'前端'}, 
  component: () => import('../views/article/frontEnd/weakup.md') 
}, 
{ 
  path: 'VsCode.md', 
  name: 'VSCODE.MD', 
  meta: {name: 'VsCode.md', type:'前端'}, 
  component: () => import('../views/article/frontEnd/VsCode.md') 
}, 
{ 
  path: 'husky.md', 
  name: 'HUSKY.MD', 
  meta: {name: 'husky.md', type:'源码分析'}, 
  component: () => import('../views/article/sourceCodeAnalysis/husky.md') 
}, 
{ 
  path: 'cli-spinners.md', 
  name: 'CLI-SPINNERS.MD', 
  meta: {name: 'cli-spinners.md', type:'源码分析'}, 
  component: () => import('../views/article/sourceCodeAnalysis/cli-spinners.md') 
}, 
{ 
  path: 'ora.md', 
  name: 'ORA.MD', 
  meta: {name: 'ora.md', type:'源码分析'}, 
  component: () => import('../views/article/sourceCodeAnalysis/ora.md') 
}, 
]