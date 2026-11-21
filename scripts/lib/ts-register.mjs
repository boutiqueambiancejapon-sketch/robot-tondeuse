// Runs the dashboard's TypeScript scripts (scripts/seo/*.ts) with plain Node and the repo's own `typescript`
// package: no tsx or other new dependency. Usage: node --import ./scripts/lib/ts-register.mjs scripts/seo/x.ts
import { register } from 'node:module'

register('./ts-loader.mjs', import.meta.url)
