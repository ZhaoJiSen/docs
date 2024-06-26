import { walk } from '../scripts/util';

const baseDir = './buildTools/Webpack/';

export const webpackSideBar = [
	walk(baseDir, '核心原理'),
	walk(baseDir, '性能优化'),
	walk(baseDir, 'Babel'),
];
