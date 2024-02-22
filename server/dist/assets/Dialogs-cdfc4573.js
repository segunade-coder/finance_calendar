import{j as e,r as v,I as x,f as w}from"./index-9b3e82f7.js";import{C as b,M as g}from"./multiselect.esm-6a74c009.js";import{D as m,I as y}from"./inputnumber.esm-a336fc43.js";import{D as j,I as C}from"./inputtextarea.esm-fe1d180e.js";const N=["Frontend Developer","Backend Developer","Marketer","CEO","Project Designer","UI/UX Designer","Supervisor"],D=({showModal:r,setShowModal:t,footer:i,assignTo:s})=>{const[a,d]=v.useState(""),[c,h]=v.useState(null),[p,l]=v.useState(1);return e.jsx(m,{header:"Assign Task",visible:r,onHide:()=>t(!1),style:{width:"30vw"},footer:i,breakpoints:{"960px":"75vw","641px":"100vw"},children:e.jsxs("div",{className:"event-card",children:[e.jsxs("span",{className:"p-float-label",children:[e.jsx(x,{id:"task",value:a,onChange:o=>d(o.target.value)}),e.jsx("label",{htmlFor:"desc",children:"Task"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(x,{value:s[0],readOnly:!0}),e.jsx("label",{htmlFor:"desc",children:"Assign To"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(b,{id:"deadline",value:c,onChange:o=>h(o.value),showIcon:!0,selectionMode:"range",readOnlyInput:!0}),e.jsx("label",{htmlFor:"deadline",children:"Select Date Range"})]}),e.jsx(j,{value:p,onChange:o=>l(o.value),options:[{label:"Very Important",value:5},{label:"Very High",value:4},{label:"High",value:3},{label:"Moderate",value:2},{label:"Low",value:1}],optionLabel:"label",optionValue:"value"})]})})},A=({showModal:r,setShowModal:t,footer:i,name:s,role:a,email:d,setName:c,setRole:h,setEmail:p})=>e.jsx(m,{header:"Add Person",visible:r,onHide:()=>t(!1),style:{width:"30vw"},footer:i,breakpoints:{"960px":"75vw","641px":"100vw"},children:e.jsxs("div",{className:"event-card",children:[e.jsxs("span",{className:"p-float-label",children:[e.jsx(x,{id:"name",value:s,onChange:l=>c(l.target.value)}),e.jsx("label",{htmlFor:"desc",children:"Name"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(x,{id:"email",value:d,onChange:l=>p(l.target.value),keyfilter:"email"}),e.jsx("label",{htmlFor:"desc",children:"Email Address"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(g,{id:"role",value:a,onChange:l=>h(l.value),options:N,display:"chip"}),e.jsx("label",{htmlFor:"desc",children:"Role"})]})]})}),S=({showModal:r,setShowModal:t,footer:i,task:s,deadline:a,priority:d,assignTo:c,setTask:h,setDeadline:p,setPriority:l,setAssignTo:o,people:u})=>{const f=n=>e.jsxs("div",{children:[e.jsx("p",{style:{margin:0,textTransform:"capitalize"},children:n.name}),e.jsx("small",{className:"p-card-subtitle",style:{margin:0,textTransform:"capitalize"},children:w(n.role)})]});return e.jsx(m,{header:"Assign Task",visible:r,onHide:()=>t(!1),style:{width:"30vw"},footer:i,breakpoints:{"960px":"75vw","641px":"100vw"},children:e.jsxs("div",{className:"event-card",children:[e.jsxs("span",{className:"p-float-label",children:[e.jsx(x,{id:"task",value:s,onChange:n=>h(n.target.value)}),e.jsx("label",{htmlFor:"desc",children:"Task"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(g,{id:"role",value:c,onChange:n=>o(n.value),options:u,optionLabel:"name",optionValue:"name",itemTemplate:f,display:"chip"}),e.jsx("label",{htmlFor:"desc",children:"Assign To"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(b,{id:"deadline",value:a,onChange:n=>p(n.value),showIcon:!0,selectionMode:"range",readOnlyInput:!0}),e.jsx("label",{htmlFor:"deadline",children:"Select Date Range"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(j,{value:d,onChange:n=>l(n.value),options:[{label:"Very Important",value:5},{label:"Very High",value:4},{label:"High",value:3},{label:"Moderate",value:2},{label:"Low",value:1}],optionLabel:"label",optionValue:"value"}),e.jsx("label",{htmlFor:"deadline",children:"Priority"})]})]})})},H=({header:r,visible:t,setVisible:i,footerContent:s,amount:a,category:d,desc:c,setAmount:h,setCategory:p,setDesc:l,categoryOptions:o})=>e.jsx(m,{header:r,visible:t,onHide:()=>i(!1),style:{width:"30vw"},footer:s,breakpoints:{"960px":"75vw","641px":"100vw"},children:e.jsxs("div",{className:"cashin-card",children:[e.jsxs("span",{className:"p-float-label",children:[e.jsx(y,{id:"amount",value:a,onValueChange:u=>h(u.value)}),e.jsx("label",{htmlFor:"amount",children:"Amount"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(j,{id:"categories",options:o,value:d,onChange:u=>p(u.value)}),e.jsx("label",{htmlFor:"categories",children:"Category"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(C,{id:"desc",autoResize:!0,rows:5,cols:10,value:c,onChange:u=>l(u.target.value)}),e.jsx("label",{htmlFor:"desc",children:"Description"})]})]})}),V=({showDialog:r,setShowDialog:t,summary:i,props:s})=>e.jsx(m,{header:"Breakdown",visible:r,style:{width:"50vw"},onHide:()=>t(!1),children:i.map(a=>e.jsxs("span",{"data-pr-tooltip":"see more",className:"card flex",style:{flexWrap:"nowrap",gap:"0.7rem"},children:[e.jsx("span",{children:a.category}),e.jsx("span",{children:a[s].toLocaleString()})]},a[s]))});export{D as A,H as C,V as S,A as a,S as b,N as r};
