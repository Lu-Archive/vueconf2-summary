# Vue声明式编程(winter)
___
- 大家可以直接前往观看winter的[演讲PPT](https://img.w3ctech.com/vueconf-winter.pdf)
- 把组件作为参数使用，确实被秀的精彩,我这里就单独zheng li

## Vue的Template的图灵完备性
+ 使用组件计算阶乘
```html
<template>
    <div>
        <Factorial v-if="n>0" :n="n-1" :v="Number(v)*n"></Factorial>
        <span v-if="n==0">{{ v }}</span>
    </div>
</template>
<script>
let Factorial={
    name:'Factorial',
    props:['n','v'],
    components:{ Factorial }
}
export default Factrial;
<\script>
```

+ 使用组件计算斐波那契数列
```html
<template>
    <div>
        <Fibnacci v-if="n>1" :n="n-1" :v1="Number(v1)+Number(v2)"></Fibnacci>
        <span v-if="n==0">{{ v2 }}</span>
        <span v-if="n==1">{{ v1 }}</span>
    </div>
</template>
<script>
let Factorial={
    name:'Fibnacci',
    props:['n','v1','v2'],
    components:{ Fibnacci }
}
export default Fibnacci;
<\script>
```