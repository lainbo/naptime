import{r as s,o as I,u as S,a as D,c as O,b as c,t as h,n as f,d as k,e as o,f as x}from"./vendor.07aab5be.js";const E=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};E();var $=(d,a)=>{const l=d.__vccOpts||d;for(const[n,e]of a)l[n]=e;return l};const w={class:"date-box"},C={class:"bottom_wrapper"},z={class:"time-box"},N={class:"clock"},Y={class:"clock-face"},B={setup(d){const a=s(""),l=s(""),n=s(0),e=s(0),t=s(0),i=s(""),v=s(""),p=s(""),y=s(null),b=new Map([[0,"\u5468\u65E5"],[1,"\u5468\u4E00"],[2,"\u5468\u4E8C"],[3,"\u5468\u4E09"],[4,"\u5468\u56DB"],[5,"\u5468\u4E94"],[6,"\u5468\u516D"]]),L=()=>{a.value=`${o().format("MM\u6708DD\u65E5")} \xB7 ${b.get(o().day())}`,l.value=o().format("HH:mm:ss")},_=/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,M=()=>{const r="13:30:00",u=localStorage.getItem("LOCALTIME");!_.test(u)&&localStorage.setItem("LOCALTIME",r);const m=o().format("YYYY-MM-DD")+u,A=o().isAfter(o(m));p.value=A?"light":"dark"},T=()=>{const r=o().second(),u=o().minute(),m=o().hour();n.value=r/60*360,e.value=(u*60+r)*.1,t.value=m/12*360+u/12/60*360,i.value=n.value===0?"all 0s":"all 0.05s cubic-bezier(0.9, 0.54, 0.26, 1.68)",v.value=e.value===0?"all 0s":"all 0.1s cubic-bezier(0.9, 0.54, 0.26, 1.68)"},g=()=>{L(),T(),M()};return I(()=>{const r=localStorage.getItem("LOCALTIME");(!r||_.test(r))&&S("LOCALTIME","13:30:00"),g(),y.value=setInterval(()=>g(),1e3)}),(r,u)=>(D(),O("div",{class:k(["container_cus bg-base",p.value])},[c("div",w,h(a.value),1),c("div",C,[c("div",z,h(l.value),1),c("div",N,[c("div",Y,[c("div",{class:"hand hour-hand",style:f({transform:`rotate(${t.value}deg)`})},null,4),c("div",{class:"hand min-hand",style:f({transform:`rotate(${e.value}deg)`,transition:v.value})},null,4),c("div",{class:"hand second-hand",style:f({transform:`rotate(${n.value}deg)`,transition:i.value})},null,4)])])])],2))}};var H=$(B,[["__scopeId","data-v-76d4a449"]]);x(H).mount("#app");
