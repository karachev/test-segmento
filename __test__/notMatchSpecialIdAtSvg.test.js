const fs = require('fs');
const PATH_TO_SVG_SPRITE = './build/resources/icons/sprite.svg';

test('not match id="ga" at svg sprite', () => {
  expect(fs.readFileSync(PATH_TO_SVG_SPRITE, 'utf8')).not.toMatch(/id="ga"/)
});
