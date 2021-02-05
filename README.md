```
- Login / Logout

- Permission Authentication
  - Page permission
  - Directive permission
  - Permission configuration page
  - Two-step login

- Multi-environment build
  - Develop (dev)
  - sit
  - Stage Test (stage)
  - Production (prod)

- Global Features
  - I18n
  - Multiple dynamic themes
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view (Tab page Support right-click operation)
  - Svg Sprite
  - Mock data
  - Screenfull
  - Responsive Sidebar
  
- Error Page
  - 401
  - 404

- Components

- Advanced Example
- Error Log
- Dashboard
- Guide Page
- ECharts
- Markdown to html
```
## Getting started

```bash
# clone the project
git clone https://github.com/guanyafei/vue-admin.git

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527

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

```优化问题
1、增加属性，设置action是否自动加载？
2、公共信息（复选框、下拉选项等），是否可统一在一个地方配置？
3、权限管理
4、index.vue优化