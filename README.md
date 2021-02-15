# csv-translations

## what?

A i18n translation plug and play library for using csv for translations.

### Install

```bash
npm install csv-translations
```

### csv file

in `src/assets/translations/all.csv` for react, preact etc.

```csv
text_label,en-US,zh-CN
page1_header,"hello world","世界你好"
```

### js file

```js
import { initialize, t, currentLanguage, setTranslationLanguage } from 'csv-translations'

const App = () => {
  const [translationLoaded, setTranslationLoaded] = useState(0)
  useEffect(() => {
    // first arg is localstorage key
    // second arg is network location of the csv file
    async function _ () {
      await initialize('locale', 'translations/all.csv')
      setTranslationLoaded(Math.random())
    }
  }, [])
  const changeLanguage = () => {
    setTranslationLanguage('zh-CN')
    setTranslationLoaded(Math.random())
  }
  return <div key={translationLoaded}>
    <h1>{t('page1_header')}</h1>
    <p onclick={}>current language is {currentLanguage}, click me to change.</p>
  </div>
}
```

## why?

Most translation libraries work with JSON.

Translators don't work with json, they work with Google Sheets, Excel etc.

I don't need so much bloat for my web app with i18n, along with complicated server support.

Also, working with Google sheets means you can use `GOOGLETRANSLATE` in Google Sheets. (https://support.google.com/docs/answer/3093331?hl=en), free automatic translations. 

## More

If you want to support Excel, just add a BOM (https://stackoverflow.com/questions/27067372/how-to-mannually-specify-byte-order-mark-in-csv) in front of the file.

## Support

Drop an issue in github. 

