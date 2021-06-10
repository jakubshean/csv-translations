import Papa from 'papaparse'
import stripBom from 'strip-bom'

let languages = {}
let defaultLanguage = 'en-US'
let localstorageKey = 'LOCALIZATION_CONSTANT_KEY'
export let currentLanguage = defaultLanguage

export const t = localizationKey => {
  const languageDict = languages[currentLanguage]
  if (!languageDict) return '__NOT_TRANSLATED__'
  const value = languageDict[localizationKey]
  if (!value) return '__NOT_TRANSLATED__'
  return value
}
export const setTranslationLanguage = (locale, optionalCallback) => {
  localStorage.setItem(localstorageKey, locale)
  currentLanguage = locale
  if (optionalCallback) optionalCallback()
}

export const initialize = async (csvLocation, optionalLocalStorageKey) => {
  if(optionalLocalStorageKey) {
    localstorageKey = optionalLocalStorageKey
  }
  const locale = localStorage.getItem(localstorageKey)
  if (locale) {
    setTranslationLanguage(locale)
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
