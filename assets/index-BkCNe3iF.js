(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))h(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const t of a.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&h(t)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const y=document.querySelectorAll(".nav-links");y.forEach(d=>{d.addEventListener("click",()=>{var l;(l=document.querySelector(".active"))==null||l.classList.remove("active"),d.classList.add("active")})});var b=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},w={exports:{}};/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */(function(d){(function(l,e){d.exports?d.exports=e():l.Toastify=e()})(b,function(l){var e=function(t){return new e.lib.init(t)},h="1.12.0";e.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},e.lib=e.prototype={toastify:h,constructor:e,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||e.defaults.text,this.options.node=t.node||e.defaults.node,this.options.duration=t.duration===0?0:t.duration||e.defaults.duration,this.options.selector=t.selector||e.defaults.selector,this.options.callback=t.callback||e.defaults.callback,this.options.destination=t.destination||e.defaults.destination,this.options.newWindow=t.newWindow||e.defaults.newWindow,this.options.close=t.close||e.defaults.close,this.options.gravity=t.gravity==="bottom"?"toastify-bottom":e.defaults.gravity,this.options.positionLeft=t.positionLeft||e.defaults.positionLeft,this.options.position=t.position||e.defaults.position,this.options.backgroundColor=t.backgroundColor||e.defaults.backgroundColor,this.options.avatar=t.avatar||e.defaults.avatar,this.options.className=t.className||e.defaults.className,this.options.stopOnFocus=t.stopOnFocus===void 0?e.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||e.defaults.onClick,this.options.offset=t.offset||e.defaults.offset,this.options.escapeMarkup=t.escapeMarkup!==void 0?t.escapeMarkup:e.defaults.escapeMarkup,this.options.ariaLive=t.ariaLive||e.defaults.ariaLive,this.options.style=t.style||e.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var s in this.options.style)t.style[s]=this.options.style[s];if(this.options.ariaLive&&t.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,this.options.avatar!==""){var f=document.createElement("img");f.src=this.options.avatar,f.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?t.appendChild(f):t.insertAdjacentElement("afterbegin",f)}if(this.options.close===!0){var n=document.createElement("button");n.type="button",n.setAttribute("aria-label","Close"),n.className="toast-close",n.innerHTML="&#10006;",n.addEventListener("click",(function(p){p.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var o=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&o>360?t.insertAdjacentElement("afterbegin",n):t.appendChild(n)}if(this.options.stopOnFocus&&this.options.duration>0){var r=this;t.addEventListener("mouseover",function(p){window.clearTimeout(t.timeOutValue)}),t.addEventListener("mouseleave",function(){t.timeOutValue=window.setTimeout(function(){r.removeElement(t)},r.options.duration)})}if(typeof this.options.destination<"u"&&t.addEventListener("click",(function(p){p.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&t.addEventListener("click",(function(p){p.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var u=i("x",this.options),c=i("y",this.options),m=this.options.position=="left"?u:"-"+u,v=this.options.gravity=="toastify-top"?c:"-"+c;t.style.transform="translate("+m+","+v+")"}return t},showToast:function(){this.toastElement=this.buildToast();var t;if(typeof this.options.selector=="string"?t=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?t=this.options.selector:t=document.body,!t)throw"Root element is not defined";var s=e.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,s),e.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),e.reposition()}).bind(this),400)}},e.reposition=function(){for(var t={top:15,bottom:15},s={top:15,bottom:15},f={top:15,bottom:15},n=document.getElementsByClassName("toastify"),o,r=0;r<n.length;r++){a(n[r],"toastify-top")===!0?o="toastify-top":o="toastify-bottom";var u=n[r].offsetHeight;o=o.substr(9,o.length-1);var c=15,m=window.innerWidth>0?window.innerWidth:screen.width;m<=360?(n[r].style[o]=f[o]+"px",f[o]+=u+c):a(n[r],"toastify-left")===!0?(n[r].style[o]=t[o]+"px",t[o]+=u+c):(n[r].style[o]=s[o]+"px",s[o]+=u+c)}return this};function i(t,s){return s.offset[t]?isNaN(s.offset[t])?s.offset[t]:s.offset[t]+"px":"0px"}function a(t,s){return!t||typeof s!="string"?!1:!!(t.className&&t.className.trim().split(/\s+/gi).indexOf(s)>-1)}return e.lib.init.prototype=e.lib,e})})(w);
