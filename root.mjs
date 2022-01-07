import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const rootPath = dirname(fileURLToPath(import.meta.url));

export default rootPath;
