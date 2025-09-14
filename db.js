// import { loadEnvFile } from 'process'
// import { neon } from '@neondatabase/serverless'
// const sql = neon(process.env.DATABASE_URL)
// export default sql 


import postgres from 'postgres'
import 'dotenv/config'

const URL=process.env.DATABASE_URL

export const sql = postgres(URL, {ssl: 'require'}) 
