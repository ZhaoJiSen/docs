import { walk } from '../scripts/util';

const baseDir = './backend/Python/';

export const pySidebar = [
	walk(baseDir, '基础知识'),
  walk(baseDir, '面向对象')
];
