// Node module hooks for ts-register.mjs: resolves "@/…" (tsconfig paths) and extensionless relative imports to
// .ts/.tsx files, stubs `server-only` (a Next.js guard, meaningless in a script) and transpiles TypeScript to ESM
// with typescript.transpileModule (types are stripped, never checked: `npx tsc --noEmit` does that).
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), '../..')
const STUB = 'data:text/javascript,export%20default%20undefined'
const EXT = ['.ts', '.tsx', '.mts', '/index.ts', '/index.tsx']

function findFile(base) {
  if (existsSync(base) && statSync(base).isFile()) return base
  for (const ext of EXT) if (existsSync(base + ext)) return base + ext
  return null
}

export async function resolve(specifier, context, next) {
  if (specifier === 'server-only') return { url: STUB, shortCircuit: true }
  let base = null
  if (specifier.startsWith('@/')) base = resolvePath(ROOT, specifier.slice(2))
  else if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
    base = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)
  }
  const fromTs = /\.(ts|tsx|mts)$/.test(context.parentURL ?? '')
  if (base && (fromTs || specifier.startsWith('@/'))) {
    const file = findFile(base)
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
  }
  return next(specifier, context)
}

export async function load(url, context, next) {
  if (!/\.(ts|tsx|mts)$/.test(url)) return next(url, context)
  const source = readFileSync(fileURLToPath(url), 'utf8')
  const out = ts.transpileModule(source, {
    fileName: fileURLToPath(url),
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, verbatimModuleSyntax: false, isolatedModules: true },
  })
  return { format: 'module', source: out.outputText, shortCircuit: true }
}
