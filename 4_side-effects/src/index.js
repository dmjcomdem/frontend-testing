const fs = require('fs');

// BEGIN
function upVersion(pathFile, updateType = 'patch') {
  const fileRawData = fs.readFileSync(pathFile, 'utf-8');
  const fileData = JSON.parse(fileRawData);
  const { version } = fileData;

  if (!version) {
    throw new Error('No found version package');
  }

  let updateVersion;
  const [major, minor, patch] = version.split('.').map(Number);

  switch (updateType) {
    case 'major':
      updateVersion = [major + 1, 0, 0].join('.');
      break;

    case 'minor':
      updateVersion = [major, minor + 1, 0].join('.');
      break;

    case 'patch':
      updateVersion = [major, minor, patch + 1].join('.');
      break;

    default:
      throw new Error(`Invalid format for file version update as ${updateType}`);
  }

  const updateData = JSON.stringify({ ...fileData, version: updateVersion });
  fs.writeFileSync(pathFile, updateData);
}
// END

module.exports = { upVersion };
