import Papa from 'papaparse'
import stripBom from 'strip-bom'

let languages = {}
let defaultLanguage = 'en-US'
export let currentLanguage = defaultLanguage

export const t = key => {
  const languageDict = languages[currentLanguage]
  if (!languageDict) return '__NOT_TRANSLATED__'
  const value = languageDict[key]
  if (!value) return '__NOT_TRANSLATED__'
  return value
}
export const setTranslationLanguage = (key, locale, optionalCallback) => {
  localStorage.setItem(key, locale)
  currentLanguage = locale
  if (optionalCallback) optionalCallback()
}

export const initialize = async (key, csvLocation) => {
  const locale = localStorage.getItem(key)
  if (locale) {
    setTranslationLanguage(key, locale)
    return
  }
  let content = await (await fetch(csvLocation)).text()
  // remove BOM, needed for excel to parse CSV properly
  content = stripBom(content)
  // remove all new lines
  content = content.replace(/^(?:[\t ]*(?:\r?\n|\r))+/g, '')
  const { data, meta } = Papa.parse(content, { header: true })
  const [textLabel, ...locales] = meta.fields
  for (let loc of locales) {
    languages[loc] = {}
  }
  // reorganize data into languages
  for (let line of data) {
    for (let loc of locales) {
      languages[loc][line[textLabel]] = line[loc]
    }
  }
}
