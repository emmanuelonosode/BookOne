(()=>{var e={};e.id=379,e.ids=[379],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},28354:e=>{"use strict";e.exports=require("util")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},46055:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(31658);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},51762:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(37413),a=r(59580),i=r(68356);async function n({params:e}){let t=await a.D.fetch(i.Ef,{slug:e.slug}),r=await a.D.fetch(i.Ku,{slug:e.slug});return t?(0,s.jsxs)("section",{className:"max-w-3xl mx-auto py-16 px-4",children:[(0,s.jsxs)("div",{className:"flex items-center gap-6 mb-8",children:[t.image&&(0,s.jsx)("img",{src:t.image,alt:t.name,className:"w-24 h-24 rounded-full object-cover"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-3xl font-bold mb-2",children:t.name}),t.bio&&(0,s.jsx)("div",{className:"text-gray-700 text-base",children:t.bio})]})]}),(0,s.jsxs)("h2",{className:"text-xl font-semibold mb-4",children:["Posts by ",t.name]}),(0,s.jsx)("ul",{className:"space-y-4",children:r.map(e=>(0,s.jsxs)("li",{children:[(0,s.jsx)("a",{href:`/blogs/${e.slug.current}`,className:"text-lg text-primary hover:underline font-medium",children:e.title}),(0,s.jsx)("div",{className:"text-sm text-gray-500",children:new Date(e._createdAt).toLocaleDateString()})]},e._id))})]}):(0,s.jsx)("div",{className:"py-16 text-center",children:"Author not found"})}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},59580:(e,t,r)=>{"use strict";r.d(t,{D:()=>n,d:()=>l});var s=r(25588),a=r(23777),i=r.n(a);let n=(0,s.UU)({projectId:"18zc3ehw",dataset:"production",apiVersion:"2023-01-01",useCdn:!0}),o=i()(n);function l(e){return o.image(e).url()}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},67759:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>u});var s=r(65239),a=r(48088),i=r(88170),n=r.n(i),o=r(30893),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let u={children:["",{children:["authors",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,51762)),"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\authors\\[slug]\\page.jsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(r.bind(r,90253))).default(e)],twitter:[],manifest:"/manifest.webmanifest"}}]},{layout:[()=>Promise.resolve().then(r.bind(r,47824)),"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\layout.jsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[async e=>(await Promise.resolve().then(r.bind(r,90253))).default(e)],twitter:[],manifest:"/manifest.webmanifest"}}]}.children,d=["C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\authors\\[slug]\\page.jsx"],c={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/authors/[slug]/page",pathname:"/authors/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},68356:(e,t,r)=>{"use strict";r.d(t,{Ef:()=>a,H$:()=>s,Ku:()=>i,oj:()=>n,x$:()=>o,xi:()=>l});let s=`
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
`,a=`
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
`,n=`
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
`,l=`
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
}`},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},90253:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(31658);let a=async e=>[{type:"image/png",width:1200,height:630,url:(0,s.fillMetadataSegment)(".",await e.params,"opengraph-image.png")+"?567f4e399f2bed0e"}]},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,972,658,532,358],()=>r(67759));module.exports=s})();