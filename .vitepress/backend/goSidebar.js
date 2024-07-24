import { walk } from '../scripts/util';

const baseDir = './backend/Go';

export const goSideBar = [
	walk(baseDir, '面向对象编程'),
	walk(baseDir, '并发编程'),
	walk(baseDir, '网络编程'),
	walk(baseDir, '安全编程'),
	walk(baseDir, '工程管理'),
];
