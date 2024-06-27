import { walk } from '../scripts/util';

const baseDir = './buildTools/Webpack/';

export const webpackSideBar = [
	walk(baseDir, '核心原理'),
	walk(baseDir, '性能优化(一团乱麻)'),
	walk(baseDir, 'Babel(空空如也)'),
];
