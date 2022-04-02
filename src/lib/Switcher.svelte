<!--
  forked from https://github.com/dohliam/dropin-minimal-css/blob/gh-pages/switcher.js

  Copyright (c) 2016 dohliam
  Copyright (c) 2021 João Paquim

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->
<script>
  // const baseUrl = 'https://dohliam.github.io/dropin-minimal-css/min';
  const baseUrl = `/css/min`;

  const frameworksStr =
    // dark themes
    'bahunya,bamboo,basic,concrete,holiday,mvp,neat,new,ok,pico,simple,spcss,vanilla,yamb,attri-midnight-green,attri-dark-forest-green,awsm-black,awsm-bigstone,awsm-gondola,boot-cyborg,boot-darkly,boot-slate,boot-superhero,md-retro,w3c-chocolate,w3c-midnight,w3c-ultramarine';
  // light themes
  // 'a11yana,axist,bare,base,bonsai,bullframe,bulma,caiuss,caramel,cardinal,centurion,chota,cirrus,clmaterial,codify,comet,concise,cutestrap,flat-ui,fluidity,furtive,gd,generic,github-markdown,gutenberg,hack,hello,hiq,html-starterkit,hyp,kathamo,koochak,kraken,kube,latex,lemon,lit,lotus,markdown,marx,material,materialize,mercury,milligram,min,mini,minimal,minimal-stylesheet,mobi,motherplate,mu,mui,no-class,normalize,oh-my-css,pandoc-scholar,paper,papier,pavilion,picnic,preface,primer,propeller,pure,roble,sakura,sanitize,scooter,semantic-ui,shoelace,siimple,skeleton,skeleton-framework,skeleton-plus,snack,spectre,style,stylize,tachyons,tacit,tent,thao,tui,vital,water,wing,writ,yorha,ads-gazette,ads-medium,ads-notebook,ads-tufte,attri-bright-light-green,attri-dark-fairy-pink,attri-light-fairy-pink,awsm-default,awsm-mischka,awsm-pastelpink,awsm-pearllusta,awsm-tasman,awsm-white,boot-cerulean,boot-cosmo,boot-flatly,boot-journal,boot-lumen,boot-paper,boot-readable,boot-sandstone,boot-spacelab,boot-yeti,md-air,md-modest,md-splendor,w3c-modernist,w3c-oldstyle,w3c-steely,w3c-swiss,w3c-traditional';
  // all themes
  // 'a11yana,axist,bahunya,bamboo,bare,base,basic,bonsai,bullframe,bulma,caiuss,caramel,cardinal,centurion,chota,cirrus,clmaterial,codify,comet,concise,concrete,cutestrap,flat-ui,fluidity,furtive,gd,generic,github-markdown,gutenberg,hack,hello,hiq,holiday,html-starterkit,hyp,kathamo,koochak,kraken,kube,latex,lemon,lit,lotus,markdown,marx,material,materialize,mercury,milligram,min,mini,minimal,minimal-stylesheet,mobi,motherplate,mu,mui,mvp,neat,new,no-class,normalize,oh-my-css,ok,pandoc-scholar,paper,papier,pavilion,picnic,pico,preface,primer,propeller,pure,roble,sakura,sanitize,scooter,semantic-ui,shoelace,siimple,simple,skeleton,skeleton-framework,skeleton-plus,snack,spcss,spectre,style,stylize,tachyons,tacit,tent,thao,tui,vanilla,vital,water,wing,writ,yamb,yorha,ads-gazette,ads-medium,ads-notebook,ads-tufte,attri-bright-light-green,attri-midnight-green,attri-dark-forest-green,attri-dark-fairy-pink,attri-light-fairy-pink,awsm-default,awsm-black,awsm-bigstone,awsm-gondola,awsm-mischka,awsm-pastelpink,awsm-pearllusta,awsm-tasman,awsm-white,boot-cerulean,boot-cosmo,boot-cyborg,boot-darkly,boot-flatly,boot-journal,boot-lumen,boot-paper,boot-readable,boot-sandstone,boot-slate,boot-spacelab,boot-superhero,boot-yeti,md-air,md-modest,md-retro,md-splendor,w3c-chocolate,w3c-midnight,w3c-modernist,w3c-oldstyle,w3c-steely,w3c-swiss,w3c-traditional,w3c-ultramarine';

  const frameworks = frameworksStr.split(',');

  export let hidden;
  export let selected = frameworks[0];

  let loading = false;
  let previous = selected;
</script>

<svelte:head>
  <!-- keep the previous <link> stylesheet rendered while loading/switching, to
  avoid flashing unstyled contents -->
  {#if loading}
    <link rel="stylesheet" type="text/css" href="{baseUrl}/{previous}.min.css" />
  {/if}
  <link
    on:load={() => (loading = false)}
    rel="stylesheet"
    type="text/css"
    href="{baseUrl}/{selected}.min.css"
  />
</svelte:head>

<select
  class:hidden
  value={selected}
  on:change={event => {
    previous = selected;
    loading = true;
    selected = event.target.value;
  }}
>
  {#each frameworks as framework}
    <option value={framework}>{framework}</option>
  {/each}
</select>

<style>
  .hidden {
    visibility: hidden;
  }
</style>
