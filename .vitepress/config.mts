import { defineConfig } from 'vitepress';

import { basicsNav } from './basicsNav';
import { browserNav } from './browserNav';
import { buildToolNav } from './buildToolNav';
import { frameworkNav } from './frameWorkNav';

// https://vitepress.dev/reference/site-config
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

    sidebar: [
      {
        text: 'Webpack 基础用法',
        collapsed: true,
        items: [{ text: '' }],
      },
      {
        text: '性能优化',
        collapsed: true,
        items: [{ text: '' }],
      },
      {
        text: '能力拓展',
        collapsed: true,
        items: [{ text: '' }],
      },
      {
        text: '核心原理',
        collapsed: true,
        items: [{ text: '' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    footer: {
      copyright: 'Copyringht @ 2024 森弟儿',
    },
  },
});
