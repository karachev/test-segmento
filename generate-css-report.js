const fs = require('fs');
const stylelint = require('stylelint');
const checkStyleFormatter = require('stylelint-checkstyle-formatter');

const stylelintOptions = {
  files: 'src/**/*.css',
  formatter: checkStyleFormatter,
};

stylelint.lint(stylelintOptions)
  .then(resultObject => {
    fs.writeFile('report.xml', resultObject.output, error => {
      console.warn('writeFile error', error)
    })
  })
  .catch(error => console.log('Promise error', error));
