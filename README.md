# Frontend light template

Простая сборка для небольших проектов

Основные технологии – CSS, JS, которые с помощью транспайлеров Babel и PostCSS используют многие современные возможности языков.

Используйте для Быстрого прототипирования интерфейсов на http://localhost:3000/ или разработки в php окружении

## Поддержка браузеров:

[см. package.json](https://gitlab.com/Cybersphere/frontend-template/blob/master/package.json)

## Старт проекта

### Установи модули

```
npm i
```

или  [yarn](https://github.com/yarnpkg/yarn)

```
yarn install
```

## Команды для запуска

### Запусти пример

```bash
gulp dev
```

### Создание нового блока

```bash
node create-block [blockName] [extensions]
```

### Запустить тесты

```bash
npm test
```

### Для быстрого прототипирования интерфейсов

```bash
gulp build && gulp dev
```

### Для разработки в php окружении

```bash
gulp build && gulp
```

### Сборка в папку build

```bash
gulp build
```

### Собрать свг-спрайт. Вынесено в специально в отдельный таск, т.к при разработке может тратить лишнее время на пересборку спрайта

Вынесено в специально в отдельный таск, т.к при разработке может тратить лишнее время на пересборку

```bash
gulp svg-icons
```

## Структура папок и файлов
```
├── build/                     # Сборка (автогенерация)
│   ├── css/                   # Стили
│   ├── js/                    # Скрипты
│   ├── resources/             # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── img/               # Изображения
├── gulp_tasks/                # Подключаемые скрипты с задачами для gulpfile.js
│   ├── build.js               # Сборка в папку build
│   ├── copy.js                # Копирование
│   ├── default.js             # Запуск разработки без с локального сервера
│   ├── dev.js                 # Запуск разработки вместе с локальным сервером
│   ├── img-optimize.js        # Оптимизация растровой графики
│   ├── lint.js                # Проверка форматировния JS-скриптов
│   ├── scripts.js             # Сборка ES2015 скриптов в Webpack
│   ├── serve.js               # Запуск локального сервера
│   ├── styles.js              # Сборка стилей
│   ├── svg-icons.js           # Сборка SVG иконок в один файл
│   ├── watch.js               # Отслеживание изменений и запуск задач
├── src/                       # Исходники
│   ├── css/                   # Стили
│       ├── blocks/            # Блоки
│       │   └── block.css      # Стили блока
│       ├── helpers/           # Помощники
│       │   ├── fonts.css      # Подключение шрифтов
│       │   ├── variables.css  # Переменные
│       └── index.css          # Главный стилевой файл
│   ├── data/                  # Тестовые данные для html-шаблонизатора
│   ├── icons/                 # SVG иконки для генерации векторного спрайта
│   ├── js/                    # Скрипты
│       ├── api/               # Апи к бэкенду (может не использоваться)
│       ├── helpers/           # Помошники (могут быть любыми, в папке лежат примеры для использования)
│       └── index.js           # Главный скрипт
│   ├── resources/             # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── img/               # Изображения
│   ├── template/              # Handlebars шаблоны
├── __test__/                  # Тесты
├── .babelrc                   # Конфигурация для компилятора Babel (используется с webpack.config.js)
├── .editorconfig              # Конфигурация настроек редактора кода
├── .eslintrc                  # Конфигурация форматирования JS
├── .gitignore                 # Список исключённых файлов из Git
├── create-block.js            # Утилита создания css блоков и hbs шаблонов в папке partials
├── gulpfile.js                # Файл для запуска Gulp.js
├── package.json               # Список модулей и прочей информации
├── readme.md                  # Документация шаблона
├── yarn.lock                  # Соответствие версий в package.json
├── index.html                 # html файл для быстрого прототипирования интерфейса
└── webpack.config.js          # Конфигурация Webpack.js для JS
```
