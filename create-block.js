// Использование: node create-block [blockName] [extensions]

const fs = require('fs')
const dirs = {
  "srcPath": "./src",
  "indexCssPath": "css/index.css",
  "cssPath": "css/blocks",
  "hbsPath": "templates/partials",
}
const mkdirp = require('mkdirp')
const blockName = process.argv[2]
const defaultExtensions = []
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)))

if (!blockName) {
  return console.log('Ошибка, блок НЕ создан, имя блока обязательно"')
}

mkdirp(dirs.srcPath, (err) => {
  if (err) {
    return console.error(`Ошибка: ${err}, блок НЕ создан`)
  }
  
  extensions.forEach(extension => {
    switch (extension) {
      case 'css':
        createCss(extension)
        break;
      case 'hbs':
        createHbs(extension)
        break;
      default:
        console.warn('Расширение не поддерживается')
    }
  })
})

/**
 * @param {string} extension
 */
function createCss(extension) {
  let filePath = `${dirs.srcPath}/${dirs.cssPath}/${blockName}.${extension}`
  let text = `.${blockName} {\n  \n}`
  createBlock(filePath, text, blockName)
}

/**
 * @param {string} extension
 */
function createHbs(extension) {
  let filePath = `${dirs.srcPath}/${dirs.hbsPath}/${blockName}.${extension}`
  let text = `.${blockName}`
  
  createBlock(filePath, text)
}

/**
 * Оставить в массиве только уникальные значения
 *
 * @param {Array} arr
 * @return {Array}
 */
function uniqueArray(arr) {
  const objectTemp = {}
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i]
    objectTemp[str] = true
  }
  return Object.keys(objectTemp)
}

/**
 * @param {string} path
 * @return {boolean}
 */
function isFileExist(path) {
  try {
    fs.statSync(path)
  } catch (err) {
    return !(err && err.code === 'ENOENT')
  }
}

/**
 * @param {string} filePath
 * @param {string} text
 * @param {string} [cssBlockName]
 */
function createBlock(filePath, text, cssBlockName) {
  if (typeof (filePath) !== 'string' || typeof (text) !== 'string') {
    console.log('Ошибка, файл НЕ создан, передаются неверные параметры')
  }
  
  if (isFileExist(filePath) === false) {
    let importText = `\n@import "blocks/${cssBlockName}.css";`
    
    if (cssBlockName) {
      fs.writeFile(`${dirs.srcPath}/${dirs.indexCssPath}`, importText, { flag: 'a'}, err => {
        if (err) {
          console.log(`Ошибка: ${err}, запись в index.css НЕ сделана`)
        }
        console.log(`Запись сделана в index.css: ${importText}`)
      })
    }
    
    fs.writeFile(filePath, text, err => {
      if (err) {
        console.log(`Ошибка: ${err}, файл ${filePath} НЕ создан`)
      }
      console.log(`Файл создан: ${filePath}`)
    })
  } else {
    console.log(`Ошибка, файл ${filePath} уже существует`)
  }
}
