// @ts-nocheck 
 export default [{ 
  path: 'block.md', 
  name: 'BLOCK.MD', 
  meta: {name: 'block.md'}, 
  component: () => import('../views/article/frontEnd/block.md') 
}, 
{ 
  path: 'weakup.md', 
  name: 'WEAKUP.MD', 
  meta: {name: 'weakup.md'}, 
  component: () => import('../views/article/frontEnd/weakup.md') 
}, 
{ 
  path: 'husky.md', 
  name: 'HUSKY.MD', 
  meta: {name: 'husky.md'}, 
  component: () => import('../views/article/sourceCodeAnalysis/husky.md') 
}, 
{ 
  path: 'cli-spinners.md', 
  name: 'CLI-SPINNERS.MD', 
  meta: {name: 'cli-spinners.md'}, 
  component: () => import('../views/article/sourceCodeAnalysis/cli-spinners.md') 
}, 
{ 
  path: 'ora.md', 
  name: 'ORA.MD', 
  meta: {name: 'ora.md'}, 
  component: () => import('../views/article/sourceCodeAnalysis/ora.md') 
}, 
]