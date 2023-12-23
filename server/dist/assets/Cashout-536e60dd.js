import{r as t,M as Q,j as e}from"./index-82ae9a98.js";import{B as i}from"./index.esm-6519f0fc.js";import{D as c}from"./dialog.esm-c994e1f7.js";import{D as X,C as d,I as Z,a as ee}from"./column.esm-8dcd74ef.js";import{D as se}from"./index.esm-3999b91b.js";import{C as te}from"./cashin-d9824aaa.js";const ce=()=>{var O,H,M;const[p,l]=t.useState(!1),[h,y]=t.useState(""),[u,v]=t.useState(""),[m,D]=t.useState(""),{io:n}=t.useContext(Q),[B,F]=t.useState([]),[b,I]=t.useState([]),[w,U]=t.useState([]),[x,G]=t.useState(0),[j,z]=t.useState(0),[g,V]=t.useState(0),[f,_]=t.useState(0),[N,W]=t.useState([]),[T,E]=t.useState(!1),[L,A]=t.useState(!1),[k,R]=t.useState(!1);t.useEffect(()=>{n.emit("get-cashout"),n.emit("get-summary"),n.on("set-summary",({cashin:s,cashout:a,totalDebt:S,totalRevenue:o,other:K,others2:P})=>{I(s),U(a),G(s.map(r=>r.cashin).reduce((r,C)=>r+C,0)-a.map(r=>r.cashout).reduce((r,C)=>r+C,0)),z(S),V(o),_(K),W(P)}),n.on("set-cashout",({data:s})=>{F(s)})},[n]);const $=e.jsxs("div",{children:[e.jsx(i,{label:"Cancel",icon:"pi pi-times",onClick:()=>l(!1),className:"p-button-text"}),e.jsx(i,{label:"Add",icon:"pi pi-check-circle",onClick:s=>q(s),autoFocus:!0})]}),Y=e.jsx("div",{children:e.jsx(i,{label:"Refresh",icon:"pi pi-refresh",onClick:()=>n.emit("get-summary"),className:"p-button-outlined p-button-secondary",size:"small"})}),q=s=>{s.preventDefault(),h!==""&&u!==""&&m!==""&&(n.emit("add-cashout",{amount:h,desc:u,category:m}),v(""),y(""),D(""),l(!1))},J=s=>(S=>{let o=new Date(S);return[o.getDate()<10?`0${o.getDate()}`:o.getDate(),o.getUTCMonth()+1<10?`0${o.getUTCMonth()+1}`:o.getUTCMonth()+1,o.getUTCFullYear()].join("/")})(s.created_at);return e.jsxs("div",{className:"__cashout",children:[e.jsx("h4",{children:"Cash Out"}),e.jsx(i,{icon:p?"pi pi-minus":"pi pi-plus",className:"p",onClick:()=>l(!p),severity:"secondary",size:"small",text:!0}),e.jsxs("div",{className:"cashin-container",children:[e.jsx(te,{title:"Summary",style:{marginTop:".5rem"},className:"c-card",footer:Y,children:e.jsxs("p",{className:"m-0 summary",children:[e.jsxs("span",{children:["CASH IN:",e.jsx("span",{className:"p-text-secondary p-overlay-badge",style:{cursor:"pointer"},onClick:()=>E(!T),children:((O=b.map(s=>s.cashin).reduce((s,a)=>s+a,0))==null?void 0:O.toLocaleString())||0}),e.jsx(c,{header:"Breakdown",visible:T,style:{width:"50vw"},onHide:()=>E(!1),children:b.map(s=>e.jsxs("span",{"data-pr-tooltip":"see more",className:"card flex",style:{flexWrap:"nowrap",gap:"0.7rem"},children:[e.jsx("span",{children:s.category}),e.jsx("span",{children:s.cashin.toLocaleString()})]},s.cashin))})]}),e.jsxs("span",{children:["CASH OUT:"," ",e.jsx("span",{style:{cursor:"pointer"},onClick:()=>A(!L),children:((H=w.map(s=>s.cashout).reduce((s,a)=>s+a,0))==null?void 0:H.toLocaleString())||0}),e.jsx(c,{header:"Breakdown",visible:L,style:{width:"50vw"},onHide:()=>A(!1),children:w.map(s=>e.jsxs("span",{"data-pr-tooltip":"see more",className:"card flex",style:{flexWrap:"nowrap",gap:"0.7rem"},children:[e.jsx("span",{children:s.category}),e.jsx("span",{children:s.cashout.toLocaleString()})]},s.cashout))})]}),e.jsxs("span",{children:["MARGIN: ",e.jsx("span",{children:(x==null?void 0:x.toLocaleString())||0})]}),e.jsxs("span",{children:["TOTAL DEBT: ",e.jsx("span",{children:(j==null?void 0:j.toLocaleString())||0})]}),e.jsxs("span",{children:["TOTAL REVENUE: ",e.jsx("span",{children:(g==null?void 0:g.toLocaleString())||0})]}),e.jsxs("span",{children:["DEBT / REVENUE: ",e.jsx("span",{children:(f==null?void 0:f.toLocaleString())||0})]}),e.jsxs("span",{children:["OTHERS: ",e.jsx("span",{style:{cursor:"pointer"},onClick:()=>R(!k),children:((M=N.map(s=>s.amount).reduce((s,a)=>s+a,0))==null?void 0:M.toLocaleString())||0}),e.jsx(c,{header:"Breakdown",visible:k,style:{width:"50vw"},onHide:()=>R(!1),children:N.map(s=>e.jsxs("span",{"data-pr-tooltip":"see more",className:"card flex",style:{flexWrap:"nowrap",gap:"0.7rem"},children:[e.jsx("span",{children:s.category}),e.jsx("span",{children:s.amount.toLocaleString()})]},s.amount))})]})]})}),e.jsx("div",{className:"c-p-card",children:e.jsxs(X,{value:B,sortMode:"multiple",width:"100%",children:[e.jsx(d,{field:"description",header:"Description",sortable:!0}),e.jsx(d,{field:"amount",header:"Amount",sortable:!0}),e.jsx(d,{field:"category",header:"Category",sortable:!0}),e.jsx(d,{field:"created_at",header:"Date",sortable:!0,body:J})]})})]}),e.jsx(c,{header:"Cash Out",visible:p,onHide:()=>l(!1),style:{width:"30vw"},footer:$,breakpoints:{"960px":"75vw","641px":"100vw"},children:e.jsxs("div",{className:"cashin-card",children:[e.jsxs("span",{className:"p-float-label",children:[e.jsx(Z,{id:"amount",value:h,onValueChange:s=>y(s.value)}),e.jsx("label",{htmlFor:"amount",children:"Amount"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(se,{id:"categ",options:["Cost of Goods Sold (COGS)","Depreciation and Amortization","Salaries","Litigation or Legal Settlements","Restructuring Cost","Income Taxes","Interest Expenses","Research and Development (R&D)","Selling, General, and Administrative Expenses (SG&A)"],value:m,onChange:s=>D(s.value)}),e.jsx("label",{htmlFor:"categ",children:"Category"})]}),e.jsxs("span",{className:"p-float-label",children:[e.jsx(ee,{id:"desc",autoResize:!0,rows:5,cols:10,value:u,onChange:s=>v(s.target.value)}),e.jsx("label",{htmlFor:"desc",children:"Description"})]})]})})]})};export{ce as default};