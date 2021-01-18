
/** 本地语言和腾讯翻译的映射 */
const mapping = {
  /** 简体中文 */
  zh_CN: 'zh',
  /** 繁体中文 */
  zh_TW: 'zh-TW',
  /** 英语 */
  en_US: 'en',
  /** 日语 */
  ja: 'ja',
  /** 韩语 */
  ko: 'ko',
  /** 法语 */
  fr: 'fr',
  /** 西班牙语 */
  es: 'es',
  /** 意大利语 */
  it: 'it',
  /** 德语 */
  de: 'de',
  /** 土耳其语 */
  tr: 'tr',
  /** 俄语 */
  ru: 'ru',
  /** 葡萄牙语 */
  pt: 'pt',
  /** 越南语 */
  vi: 'vi',
  /** 印尼语 */
  id: 'id',
  /** 泰语 */
  th: 'th',
  /** 马来语 */
  ms: 'ms',
}

/** 配置信息 */
const config = {
  /** 要扫描的文件 */
  scan: ['src/**/*.{ts,tsx}'],
  /** 输出目录 */
  outDir: 'src/i18n/locales/',
  /** 原始语言 */
  baseLng: 'zh_CN',
  /** 输出语言 */
  lngs: ['en_US', 'zh_TW'],
  /** 扫描的函数 */
  func: {
    list: ['t'],
    extensions: ['.ts', '.tsx'],
  },
  /** 生成配置文件名称 */
  resource: {
    loadPath: '{{lng}}.json',
    savePath: '{{lng}}.json',
  },
  /** 腾讯翻译配置 */
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'tmt.tencentcloudapi.com',
    },
  },
  credential: 'src/i18n/scanner/credential.json',
}

/** 开始处理 */
async function start() {
  console.log('[i18n] 扫描文件，并生成.json文件开始')
  scanner()
  console.log('[i18n] 扫描文件，并生成.json文件完成')

  // 等待一段时间，不然可能读取不到scanner写入的文件
  console.log('[i18n] 2秒后开始进行翻译')
  setTimeout(() => {
    translate()
  }, 2000)
}

/** 扫描文件，并生成.json */
function scanner() {
  const scanner = require('i18next-scanner')
  const vfs = require('vinyl-fs')
  const sort = require('gulp-sort')

  // 读取本地已经翻译的数据
  const locales = getLocales()

  // 扫描所有国际化数据并生成.json文件
  vfs.src(config.scan)
    .pipe(sort())
    .pipe(scanner({
      func: config.func,
      resource: config.resource,
      lngs: config.lngs,
      defaultValue: (lng, ns, key) => {
        return locales[lng]?.[key] || ''
      }
    }))
    .pipe(vfs.dest(config.outDir))
}

/** 翻译 */
async function translate() {
  const fs = require('fs')
  const fsExtra = require('fs-extra')
  const credential = fsExtra.readJsonSync(config.credential)
  const tencentCloud = require('tencentcloud-sdk-nodejs')
  const TmtClient = tencentCloud.tmt.v20180321.Client
  const client = new TmtClient({
    credential: credential,
    region: config.region,
    profile: config.profile
  })

  const locales = getLocales()
  for (let lng in locales) {
    const locale = locales[lng]
    const arr = Object.keys(locale).filter((key) => !locale[key])
    if (arr.length <= 0) {
      console.log(`[i18n] ${lng} 无需翻译`)
      continue
    }

    console.log(`[i18n] ${lng} 开始翻译，共 ${arr.length} 条数据需要翻译`)
    const req = {
      SourceTextList: arr,
      Source: mapping[config.baseLng],
      Target: mapping[lng],
      ProjectId: 0,
    }
    await new Promise((resolve => setTimeout(resolve, 500)))
    const resp = await client.TextTranslateBatch(req)
    for (let i = 0; i < arr.length; i++) {
      locale[arr[i]] = resp.TargetTextList[i]
    }
    fs.writeFileSync(`${config.outDir}${lng}.json`, JSON.stringify(locale, null, 2))
    console.log(`[i18n] ${lng} 翻译完成`)
  }
}

/** 获取本地语言数据 */
function getLocales() {
  const fs = require('fs-extra')
  const locales = {}
  config.lngs.forEach((lng) => {
    try {
      locales[lng] = fs.readJsonSync(`${config.outDir}${lng}.json`)
    } catch (e) {
    }
  })
  return locales
}

start().then()
