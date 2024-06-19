import { defineConfig } from 'vitepress';

import { basicsNav } from './basics';
import { browserNav } from './browser';
import { buildToolNav } from './buildTool';
import { frameworkNav } from './framework';

import { basicsCSSSideBar } from './basics/cssSideBar';

export default defineConfig({
  title: '森弟儿の笔记空间',
  description: 'A VitePress Site',
  outDir: 'docs',
  themeConfig: {
    outline: 'deep',

    nav: [{ text: '首页', link: '/' }, basicsNav, browserNav, buildToolNav, frameworkNav],

    lastUpdated: {
      text: '最后更改时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },

    search: {
      provider: 'local',
    },

    sidebar: {
      '/basics/CSS': basicsCSSSideBar,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyringht @ 2024 森弟儿',
    },
  },
});
