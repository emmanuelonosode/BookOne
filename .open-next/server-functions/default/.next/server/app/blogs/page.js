(()=>{var e={};e.id=156,e.ids=[156],e.modules={2395:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>l.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=r(65239),s=r(48088),i=r(88170),l=r.n(i),o=r(30893),n={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);r.d(t,n);let d={children:["",{children:["blogs",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,99313)),"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\blogs\\page.jsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(r.bind(r,90253))).default(e)],twitter:[],manifest:"/manifest.webmanifest"}}]},{layout:[()=>Promise.resolve().then(r.bind(r,47824)),"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\layout.jsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(r.bind(r,90253))).default(e)],twitter:[],manifest:"/manifest.webmanifest"}}]}.children,c=["C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\blogs\\page.jsx"],u={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/blogs/page",pathname:"/blogs",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},28354:e=>{"use strict";e.exports=require("util")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},46055:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(31658);let s=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},59580:(e,t,r)=>{"use strict";r.d(t,{D:()=>l,d:()=>n});var a=r(25588),s=r(23777),i=r.n(s);let l=(0,a.UU)({projectId:"18zc3ehw",dataset:"production",apiVersion:"2023-01-01",useCdn:!0}),o=i()(l);function n(e){return o.image(e).url()}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},68356:(e,t,r)=>{"use strict";r.d(t,{Ef:()=>s,H$:()=>a,Ku:()=>i,oj:()=>l,x$:()=>o,xi:()=>n});let a=`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    author->{name, image, slug},
    category,
    _createdAt
  }
`,s=`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio
  }
`,i=`
  *[_type == "post" && author->slug.current == $slug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    body,
    categories[]->{title, slug},
    _createdAt
  }
`,l=`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`,o=`
  *[_type == "post"$categoryFilter$searchFilter] | order(_createdAt desc) [$start...$end] {
    _id,
    title,
    slug,
    mainImage,
    body,
    author->{name, image, slug},
    categories[]->{title, slug},
    _createdAt
  }
`,n=`
  *[_type == "project" && slug.current == $slug][0] {

  _id,
  title,
  slug,
  client,
  category,
  mainImage{
    asset->{
      url
    }
  },
  overview,
  challenge,
  solution,
  testimonial->{author, quote},
  webDetails{
    heroImage{
      asset->{
        url
      }
    },
    technologies,
    link
  },
  seoDetails,
  aiDetails
}`},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},90253:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(31658);let s=async e=>[{type:"image/png",width:1200,height:630,url:(0,a.fillMetadataSegment)(".",await e.params,"opengraph-image.png")+"?567f4e399f2bed0e"}]},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{},99313:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(37413),s=r(59580),i=r(68356);async function l({searchParams:e}){let t=parseInt(e?.page||"1",10),r=e?.search||"",l=e?.category||"",o=l?` && references(*[_type=='category' && slug.current=='${l}']._id)`:"",n=r?` && (title match "*${r}*" || body[].children[].text match "*${r}*" || author->name match "*${r}*" || categories[]->title match "*${r}*")`:"",d=(t-1)*6,c=await s.D.fetch(i.x$.replace("$categoryFilter",o).replace("$searchFilter",n).replace("$start",d).replace("$end",d+6)),u=await s.D.fetch(i.oj),m=Math.ceil(await s.D.fetch(`count(*[_type == "post"${o}${n}])`)/6);return(0,a.jsx)("section",{className:"py-16 md:py-22 px-4 max-w-7xl mx-auto",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-10",children:[(0,a.jsx)("aside",{className:"md:w-1/4 mb-8 md:mb-0",children:(0,a.jsxs)("div",{className:"bg-white rounded-xl shadow p-6 sticky top-24",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-4 text-primary",children:"Categories"}),(0,a.jsxs)("ul",{className:"space-y-2",children:[(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:"/blogs",className:`block px-3 py-2 rounded-lg transition font-medium ${!l?"bg-primary text-white":"hover:bg-gray-100 text-gray-800"}`,children:"All Categories"})}),u.map(e=>(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:`?category=${e.slug.current}${r?`&search=${encodeURIComponent(r)}`:""}`,className:`block px-3 py-2 rounded-lg transition font-medium ${l===e.slug.current?"bg-primary text-white":"hover:bg-gray-100 text-gray-800"}`,children:e.title})},e._id))]})]})}),(0,a.jsxs)("div",{className:"md:w-3/4",children:[(0,a.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-primary",children:"BookOne Blog"}),(0,a.jsxs)("form",{className:"flex gap-2 w-full md:w-auto",method:"get",children:[(0,a.jsx)("input",{type:"text",name:"search",placeholder:"Search by title, content, author, or category...",defaultValue:r,className:"border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 text-black focus:outline-primary"}),l&&(0,a.jsx)("input",{type:"hidden",name:"category",value:l}),(0,a.jsx)("button",{type:"submit",className:"bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition",children:"Search"})]})]}),(0,a.jsxs)("ul",{className:"space-y-8",children:[0===c.length&&(0,a.jsx)("li",{className:"text-center text-gray-500 py-12 text-lg",children:"No blogs found."}),c.map(e=>(0,a.jsxs)("li",{className:"bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition",children:[e.mainImage&&(0,a.jsx)("a",{href:`/blogs/${e.slug.current}`,className:"md:w-1/3 block",children:(0,a.jsx)("img",{src:(0,s.d)(e.mainImage),alt:e.title,className:"rounded-lg w-full h-40 object-cover mb-4 md:mb-0"})}),(0,a.jsxs)("div",{className:"flex-1 flex flex-col justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("a",{href:`/blogs/${e.slug.current}`,className:"text-2xl font-bold text-primary hover:underline",children:e.title}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2 mt-2 mb-2",children:e.categories?.map(e=>(0,a.jsx)("span",{className:"bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium",children:e.title},e._id))}),(0,a.jsx)("div",{className:"text-gray-600 text-sm mb-2 line-clamp-2",children:e.body&&e.body[0]?.children&&e.body[0].children[0]?.text?e.body[0].children[0].text.slice(0,120)+(e.body[0].children[0].text.length>120?"...":""):""})]}),(0,a.jsxs)("div",{className:"flex items-center gap-3 mt-4",children:[e.author?.image&&(0,a.jsx)("img",{src:(0,s.d)(e.author.image),alt:e.author.name,className:"w-8 h-8 rounded-full object-cover border"}),(0,a.jsx)("a",{href:`/authors/${e.author?.slug?.current}`,className:"text-sm font-medium text-primary hover:underline",children:e.author?.name}),(0,a.jsxs)("span",{className:"text-gray-400 text-xs",children:["\xb7 ",new Date(e._createdAt).toLocaleDateString()]})]})]})]},e._id))]}),(0,a.jsx)("div",{className:"flex gap-2 mt-12 justify-center",children:Array.from({length:m},(e,s)=>(0,a.jsx)("a",{href:`?page=${s+1}${r?`&search=${encodeURIComponent(r)}`:""}${l?`&category=${encodeURIComponent(l)}`:""}`,className:`px-4 py-2 rounded-lg font-semibold transition ${t===s+1?"bg-primary text-white":"bg-gray-200 text-gray-700 hover:bg-primary/10"}`,children:s+1},s))})]})]})})}}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[447,972,658,532,358],()=>r(2395));module.exports=a})();