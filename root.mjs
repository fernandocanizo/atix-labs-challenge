import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

global.rootPath = dirname(fileURLToPath(import.meta.url));
