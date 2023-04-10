import * as fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const file = fs.readdirSync('../../content')
  console.log('file', file)
  console.log('file', 1)

  return {
    api: file
  }
})
