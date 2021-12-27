import { dirname } from 'path';
import { fileURLToPath } from 'url';

global.rootPath = dirname(fileURLToPath(import.meta.url));
