import{u as y,_ as w}from"./CeaK9w5d.js";import{u as C}from"./CGlwMRGO.js";import{n as a,o as d,c as V,b as t,w as e,u as c,d as b,t as i,y as k,a as u,z as q,_ as B,v as T}from"./Qx7K5HX-.js";import{_ as D}from"./Zl6chKFv.js";const N=["onUpdate:modelValue"],$={__name:"cart",setup(p){const s=y(),n=C();return(l,r)=>{const f=w,m=a("v-card"),_=a("v-col"),v=a("v-card-text"),x=a("v-row");return d(),V("div",null,[t(x,null,{default:e(()=>[t(_,{cols:"12"},{default:e(()=>[t(m,null,{default:e(()=>[t(f,{items:c(n).items,headers:[{field:"name",name:"Produto"},{field:"quantity",name:"Quantidade",width:"200px"}],actions:o=>[{text:"Delete",icon:"mdi-delete",onClick(){c(n).remove(o.item.item)}}]},{"item:name":e(o=>[b(i(o.item.item.name),1)]),"item:quantity":e(o=>[k(u("input",{type:"number","onUpdate:modelValue":h=>o.item.quantity=h,class:"w-100 pa-3"},null,8,N),[[q,o.item.quantity]])]),_:1},8,["items","actions"])]),_:1})]),_:1}),t(_,{cols:"6"}),t(_,{cols:"6"},{default:e(()=>[t(m,null,{default:e(()=>[t(v,null,{default:e(()=>[u("div",null,"Total: R$ "+i(c(s).numberToMoney(c(n).result.total)),1)]),_:1})]),_:1})]),_:1})]),_:1})])}}},M={};function S(p,s){const n=$,l=a("v-container"),r=D;return d(),T(r,{name:"site"},{default:e(()=>[t(l,null,{default:e(()=>[t(n)]),_:1})]),_:1})}const F=B(M,[["render",S]]);export{F as default};
