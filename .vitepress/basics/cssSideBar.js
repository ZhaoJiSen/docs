import { walk } from '../scripts/util';

const baseDir = './basics/CSS/';

export const basicsCSSSideBar = [
  walk(baseDir, 'Flex 布局', false, false),
  walk(baseDir, 'Grid 布局', false, false),
  walk(baseDir, 'CSS预处理器', false, false),
  walk(baseDir, 'CSS后处理器', false, false),
  walk(baseDir, 'TailwindCSS', false, false),
];
