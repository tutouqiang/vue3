---
title: 响应式布局浅析与实现
theme: condensed-night-purple
meta:
  - name: description
    content: 响应式布局浅析与实现
  - name: keywords
    content: 响应式布局、Ant Design、Bootstrap、Element
createTime: 2023 年 3 月 22 日
---

# 响应式布局浅析与实现

根据 
<a href="https://ant.design" target="_blank">Ant Design</a>、
<a href="https://v5.bootcss.com" target="_blank">Bootstrap</a>、
<a href="https://v5.bootcss.com" target="_blank">Element</a>
这些主流 UI 框架的源码，分析、学习并简单实现响应式代码。


## Ant Design
这里以 React 框架为主的 Ant Design 5.3.1 版本为例。以 Row、Col 为入口查找实现逻辑。

从 components/grid/col.tsx 文件窥探响应式逻辑的大致实现。

### Col 主文件
```ts
// components/grid/col.tsx
// ================================================ 1 ==================================================
const [wrapSSR, hashId] = useColStyle(prefixCls);

return wrapSSR(
  <div {...others} style={{ ...mergedStyle, ...style }} className={classes} ref={ref}>
    {children}
  </div>,
);

// ================================================ 2 ==================================================
export const useColStyle = genComponentStyleHook('Grid', (token) => {
  const gridToken: GridColToken = mergeToken<GridColToken>(token, {
    gridColumns: 24, // Row is divided into 24 parts in Grid
  });

  const gridMediaSizesMap = {
    '-sm': gridToken.screenSMMin,
    '-md': gridToken.screenMDMin,
    '-lg': gridToken.screenLGMin,
    '-xl': gridToken.screenXLMin,
    '-xxl': gridToken.screenXXLMin,
  };

  return [
    genGridColStyle(gridToken),
    genGridStyle(gridToken, ''),
    genGridStyle(gridToken, '-xs'),
    Object.keys(gridMediaSizesMap)
      .map((key: keyof typeof gridMediaSizesMap) =>
        genGridMediaStyle(gridToken, gridMediaSizesMap[key], key),
      )
      .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
  ];
});

// ================================================ 2-1 ==================================================
const genGridMediaStyle = (
  token: GridColToken,
  screenSize: number,
  sizeCls: string,
): CSSObject => ({
  [`@media (min-width: ${screenSize}px)`]: {
    ...genGridStyle(token, sizeCls),
  },
});

// ================================================ 2-2 ==================================================
const genGridStyle = (token: GridColToken, sizeCls: string): CSSObject =>
  genLoopGridColumnsStyle(token, sizeCls);

// ================================================ 2-3 ==================================================
const genLoopGridColumnsStyle = (token: GridColToken, sizeCls: string): CSSObject => {
  const { componentCls, gridColumns } = token;

  const gridColumnsStyle: CSSObject = {};
  for (let i = gridColumns; i >= 0; i--) {
    if (i === 0) {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'none',
      };
      gridColumnsStyle[`${componentCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineEnd: 0,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: 0,
      };
    } else {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'block',
        flex: `0 0 ${(i / gridColumns) * 100}%`,
        maxWidth: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: i,
      };
    }
  }

  return gridColumnsStyle;
};


// ================================================ 3 ==================================================
export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation,
  getDefaultToken?:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, token, hashId] = useToken();
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    // Generate style for all a tags in antd component.
    useStyleRegister({ theme, token, hashId, path: ['Shared', rootPrefixCls] }, () => [
      {
        // Link
        '&': genLinkStyle(token),
      },
    ]);

    return [
      useStyleRegister(
        { theme, token, hashId, path: [component, prefixCls, iconPrefixCls] },
        () => {
          const { token: proxyToken, flush } = statisticToken(token);

          const defaultComponentToken =
            typeof getDefaultToken === 'function' ? getDefaultToken(proxyToken) : getDefaultToken;
          const mergedComponentToken = { ...defaultComponentToken, ...token[component] };

          const componentCls = `.${prefixCls}`;
          const mergedToken = mergeToken<
            TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
          >(
            proxyToken,
            {
              componentCls,
              prefixCls,
              iconCls: `.${iconPrefixCls}`,
              antCls: `.${rootPrefixCls}`,
            },
            mergedComponentToken,
          );

          const styleInterpolation = styleFn(mergedToken as unknown as FullToken<ComponentName>, {
            hashId,
            prefixCls,
            rootPrefixCls,
            iconPrefixCls,
            overrideComponentToken: token[component],
          });
          flush(component, mergedComponentToken);
          return [genCommonStyle(token, prefixCls), styleInterpolation];
        },
      ),
      hashId,
    ];
  };
}
```
从第一步中可以看出主逻辑函数为 genComponentStyleHook、genGridMediaStyle。

### genComponentStyleHook、genGridMediaStyle
```ts
// genGridMediaStyle 函数主要是处理根据组件 props 的参数生成的类名，将其封装在 @media 中
const genGridMediaStyle = (
  token: GridColToken,
  screenSize: number,
  sizeCls: string,
): CSSObject => ({
  [`@media (min-width: ${screenSize}px)`]: {
    ...genGridStyle(token, sizeCls),
  },
});

// screenSize：不同屏幕宽度的范围, 根据逻辑，找到以下预设
// /components/theme/util/alias.ts
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
```

### 官网示例
```ts
 <Row>
  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
    Col
  </Col>
</Row>

// 渲染结果
<div class="ant-col ant-col-xs-2 ant-col-sm-4 ant-col-md-6 ant-col-lg-8 ant-col-xl-10 css-mxhywb">
  Col
</div>

// 响应式渲染  这里是以 24 栅格计算
// xxl 未配置，故此处也未生成响应的 css 代码 
@media (min-width: 1200px)
:where(.css-mxhywb).ant-col-xl-10 {
    display: block;
    flex: 0 0 41.66666666666667%;
    max-width: 41.66666666666667%;
}
@media (min-width: 992px)
:where(.css-mxhywb).ant-col-lg-8 {
    display: block;
    flex: 0 0 33.33333333333333%;
    max-width: 33.33333333333333%;
}
@media (min-width: 768px)
:where(.css-mxhywb).ant-col-md-6 {
    display: block;
    flex: 0 0 25%;
    max-width: 25%;
}

@media (min-width: 576px)
:where(.css-mxhywb).ant-col-sm-4 {
    display: block;
    flex: 0 0 16.666666666666664%;
    max-width: 16.666666666666664%;
}

:where(.css-mxhywb).ant-col-xs-2 {
    display: block;
    flex: 0 0 8.333333333333332%;
    max-width: 8.333333333333332%;
}
```
### Ant Design 总结
以 Flexbox 构建的 24 栅格系统，通过代码动态添加，可根据配置生成需要的 @media 代码。

**优点**
- 动态配置类名
- 按需生成，减少代码量

## Element

### Col 主文件
```
// https://github.com/element-plus/element-plus/blob/a30ae9d103d0a09dd1453c1d5722e8aa3a44b3bc/packages/components/col/src/col.vue

<component :is="tag" :class="colKls" :style="style">
    <slot />
</component>

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})

const colKls = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    if (isNumber(size)) {
      if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
      else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? ns.b(`${size}-${prop}-${sizeProp}`)
            : ns.b(`${size}-${sizeProp}`)
        )
      })
    }
  })

  // this is for the fix
  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }
  return [ns.b(), classes]
})
```

根据主文件 style、colKls 两个计算函数，主要是根据 props 来计算类名与样式，并绑定在组件上。

### Col 样式文件

根据 col/style 下的 css 找到主要的样式文件
```ts
// https://github.com/element-plus/element-plus/blob/0c597a63ef513ad5c066536f3efa62dbe4876102/packages/theme-chalk/src/col.scss

@for $i from 0 through 24 {
  .#{$namespace}-col-#{$i} {
    max-width: (math.div(1, 24) * $i * 100) * 1%;
    flex: 0 0 (math.div(1, 24) * $i * 100) * 1%;
  }

  .#{$namespace}-col-offset-#{$i} {
    margin-left: (math.div(1, 24) * $i * 100) * 1%;
  }

  .#{$namespace}-col-pull-#{$i} {
    position: relative;
    right: (math.div(1, 24) * $i * 100) * 1%;
  }

  .#{$namespace}-col-push-#{$i} {
    position: relative;
    left: (math.div(1, 24) * $i * 100) * 1%;
  }
}

@include col-size(xs);

@include col-size(sm);

@include col-size(md);

@include col-size(lg);

@include col-size(xl);


// https://github.com/element-plus/element-plus/blob/8583c70fdcf5cc2b7545377ab5a300ba61a6bc6f/packages/theme-chalk/src/mixins/_col.scss

@mixin col-size($size) {
  @include res($size) {
    .#{$namespace}-col-#{$size}-0 {
      display: none;
      @include when(guttered) {
        display: none;
      }
    }
    @for $i from 0 through 24 {
      .#{$namespace}-col-#{$size}-#{$i} {
        @if $i != 0 {
          display: block;
        }
        max-width: (math.div(1, 24) * $i * 100) * 1%;
        flex: 0 0 (math.div(1, 24) * $i * 100) * 1%;
      }

      .#{$namespace}-col-#{$size}-offset-#{$i} {
        margin-left: (math.div(1, 24) * $i * 100) * 1%;
      }

      .#{$namespace}-col-#{$size}-pull-#{$i} {
        position: relative;
        right: (math.div(1, 24) * $i * 100) * 1%;
      }

      .#{$namespace}-col-#{$size}-push-#{$i} {
        position: relative;
        left: (math.div(1, 24) * $i * 100) * 1%;
      }
    }
  }
}


// https://github.com/element-plus/element-plus/blob/703d29b3b7fa7209b762731316fdb43a608d17b0/packages/theme-chalk/src/mixins/mixins.scss

@mixin res($key, $map: $breakpoints) {
  // loop breakpoint Map, return if present
  @if map-has-key($map, $key) {
    @media only screen and #{unquote(map-get($map, $key))} {
      @content;
    }
  } @else {
    @warn "Undefined points: `#{$map}`";
  }
}

```

根据以上三个样式文件来看，主要是通过 <a href="https://sass-lang.com" target="_blank">Scss</a>  的计算能力，动态生成类名、具体的样式到指定的 **@meida** 中，基本逻辑跟 Ant Design 相似。

### 官方示例

```ts
// 使用
<template>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>
</template>

// 渲染 Element
<div class="el-row" data-v-1ab1ffd8="" style="margin-left: -5px; margin-right: -5px;">
  <div 
    class="el-col el-col-24 el-col-xs-8 el-col-sm-6 el-col-md-4 el-col-lg-3 el-col-xl-1 is-guttered"
    style="padding-right: 5px; padding-left: 5px;"
  >
    <div class="grid-content ep-bg-purple"></div>
  </div>
</div>

// 生成 css
@media only screen and (min-width: 1200px)
.el-col-lg-3 {
    display: block;
    max-width: 12.5%;
    flex: 0 0 12.5%;
}
@media only screen and (min-width: 992px)
.el-col-md-4 {
    display: block;
    max-width: 16.6666666667%;
    flex: 0 0 16.6666666667%;
}
@media only screen and (min-width: 768px)
.el-col-sm-6 {
    display: block;
    max-width: 25%;
    flex: 0 0 25%;
}
```

### 总结
除 JS 框架 (Element: Vue; Ant: React;) 及样式预编译器（Element: Sass; Ant: css-in-js;）不同外，基本上与 Ant Design 的实现方式相同


## Bootstrap

与其他 UI 组件不同，主要为 css 类名的绑定实现响应式布局。主要以 scss 代码动态实现，直接编译为对应的 css 文件。使用时根据类名引入对应的 css 文件。

主要文件为 
<a href="https://github.com/twbs/bootstrap/blob/748702d00f623c9b3700a83b743429beeae85e29/scss/_grid.scss" target="_blank">scss/_grid.scss</a>、
<a href="https://github.com/twbs/bootstrap/blob/705d6857ad262c0f1e8e85645a7a0df7b1e14d84/scss/mixins/_grid.scss" target="_blank">mixins/_grid.scss</a>、
<a href="https://github.com/twbs/bootstrap/blob/833da72712fbc1bb61807218acb60476dfc9e0ed/scss/_variables.scss" target="_blank">scss/_variables.scss</a>。打包之后的产物为 
<a href="https://github.com/twbs/bootstrap/blob/cf9454caa00872899215603e5e036d9a824b1b11/dist/css/bootstrap-grid.css" target="_blank">css/bootstrap-grid</a>，css 内容部分如下

```ts
@media (min-width: 576px) {
  .col-sm {
    flex: 1 0 0%;
  }
  .row-cols-sm-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-sm-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-sm-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-sm-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-sm-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-sm-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-sm-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
}
```

### 官方示例

```ts
// 使用
<div class="container text-center">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
</div>

// 渲染 Element
<div class="container text-center">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
</div>

// css
@media (min-width: 1400px)
.container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    max-width: 1320px;
}

.row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    margin-left: calc(-.5 * var(--bs-gutter-x));
}

@media (min-width: 768px)
.col-md-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
}
```

## 总结
Ant Design、Element UI 基本与 Bootstrap 的方式一致。均使用 
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox" target="_blank">flexbox</a>
 布局 + @media 的方式实现响应式，无一例外的使用 css 预编译器实现动态生成 css 代码，提升编码效率和动态更换配置。

### 简单实现

```
```
