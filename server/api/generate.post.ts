import { object, string, parse, enumType, optional } from 'valibot'
import type { Theme, ThemeOptions } from '@formkit/theme-creator'
import { generate } from '@formkit/cli'
import { themeManifest } from '~/src/manifest'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const ThemeRequest = object({
    theme: string(),
    variables: optional(string()),
    ts: optional(enumType(['true', 'false'])),
    semantic: optional(enumType(['true', 'false']))
  })
  const themeRequest = parse(ThemeRequest, body)
  const themeName = themeRequest.theme as keyof typeof themeManifest

  if (!(themeName in themeManifest)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Theme was not found`
    })
  }

  const themeResolver = themeManifest[themeName]
  const { default: theme } = await themeResolver()
  const isTS = themeRequest.ts === 'false' ? false : true
  const isSemantic = themeRequest.semantic === 'true' ? true : false
  setHeader(event, 'Content-Type', 'application/js')
  return generate(theme, themeRequest.variables, isTS, isSemantic)
})
