// repo: https://github.com/honojs/hono
// file: src/validator/validator.ts
const appJsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/

export function jsonHeaderValidate(headers: Headers) {
  const appJson = headers.get("Content-Type")
  if (appJson == null || !appJsonRegex.test(appJson)) {
    return "Missing required 'content-type:application/json' HTTP header"
  }
  return null
}
