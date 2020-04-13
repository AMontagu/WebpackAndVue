const dataFiles = require.context(".", false, /\.json$/);

let data = [];

dataFiles.keys().forEach((fileName) => {
  const fileData = dataFiles(fileName);
  data = data.concat(fileData);
});

export default data;
