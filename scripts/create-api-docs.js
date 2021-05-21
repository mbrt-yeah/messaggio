const ConverterOptions = require('typedoc-json-to-x').ConverterOptions;
const PERMALINKS_VARIABLES = require('typedoc-json-to-x').PERMALINKS_VARIABLES;
const TypedocJsonToX = require('typedoc-json-to-x').TypedocJsonToX;
const packageJson = require('../package.json');

if (!packageJson || !packageJson.messaggioScripts && !packageJson.messaggioScripts.createApiDocs) {
    throw new Error('No options for this script found. Expecting them in messaggioScripts.createApiDocs of the package.json file.');
}

if (!packageJson.messaggioScripts.createApiDocs.inputPath) {
    throw new Error('No outputPath found. Expecting it in messaggioScripts.createApiDocs.inputPath of the package.json file.');
}

if (!packageJson.messaggioScripts.createApiDocs.outputPath) {
    throw new Error('No outputPath found. Expecting it in messaggioScripts.createApiDocs.outputPath of the package.json file.');
}

const typedocJsonToX = new TypedocJsonToX({
    inputPath: packageJson.messaggioScripts.createApiDocs.inputPath,
    outputPath: packageJson.messaggioScripts.createApiDocs.outputPath
});

const options = new ConverterOptions();
options.permalinkStructure = `/api/%${PERMALINKS_VARIABLES.SUB_FOLDER_DIR_NAME}/%${PERMALINKS_VARIABLES.SUB_FOLDER_FILE_NAME}`;

typedocJsonToX.execute('markdown-multiple-files', options);