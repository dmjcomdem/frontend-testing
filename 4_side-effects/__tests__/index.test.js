const fs = require('fs');
const path = require('path');

const { upVersion } = require('../src/index.js');

const getFixturePath = (name) => path.join('__fixtures__', name);
const getFileData = (pathFile) => fs.readFileSync(pathFile, 'utf-8');
const src = getFixturePath('package.json');

const getVersion = (rawFileData) => {
  const { version } = JSON.parse(rawFileData);
  return version;
};

// BEGIN
describe('upVersion', () => {
  let originalFileData;

  beforeAll(() => {
    originalFileData = fs.readFileSync(src, 'utf-8');
  });

  beforeEach(async () => {
    fs.writeFileSync(src, JSON.stringify({ version: '1.3.2' }));
  });

  test('проверить на изменение версии файла', () => {
    upVersion(src);
    const updatedFileData = getFileData(src);
    expect(JSON.parse(originalFileData)).not.toMatchObject(JSON.parse(updatedFileData));
  });

  test('обновление patch версии', () => {
    upVersion(src, 'patch');
    const updatedFileData = getFileData(src);
    expect(getVersion(updatedFileData)).toBe('1.3.3');
  });

  test('обновление minor версии', () => {
    upVersion(src, 'minor');
    const updatedFileData = getFileData(src);
    expect(getVersion(updatedFileData)).toBe('1.4.0');
  });

  test('обновление major версии', () => {
    upVersion(src, 'major');
    const updatedFileData = getFileData(src);
    expect(getVersion(updatedFileData)).toBe('2.0.0');
  });

  test('пробросить исключение при указании не верного типа обновления', () => {
    const result = () => upVersion(src, 'update');
    expect(result).toThrow('Invalid format for file version update as update');
  });
});
// END
