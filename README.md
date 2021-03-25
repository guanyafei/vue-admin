```
## Getting started

# install dependency
npm install

# develop
npm run dev
```

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix

# skip pre-commit
git commit -m '' --no-verify
```
## Issue
```bash

1、增加属性，设置action是否自动加载？
2、公共信息（复选框、下拉选项等），是否可统一在一个地方配置？
3、权限管理
4、index.vue优化
