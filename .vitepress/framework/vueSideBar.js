import { walk } from '../scripts/util';

const baseDir = './framework/Vue';

export const vueSideBar = [walk(baseDir, '基础知识'), walk(baseDir, '国际化')];
