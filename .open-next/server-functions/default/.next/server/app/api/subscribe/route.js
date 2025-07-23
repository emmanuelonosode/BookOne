(()=>{var e={};e.id=374,e.ids=[374],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},37366:e=>{"use strict";e.exports=require("dns")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},78257:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>c,serverHooks:()=>x,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>d});var s={};r.r(s),r.d(s,{POST:()=>u});var o=r(96559),i=r(48088),n=r(37719),a=r(32190),p=r(49526);async function u(e){let{email:t}=await e.json();if(!t||!t.includes("@"))return a.NextResponse.json({success:!1,error:"Invalid email"},{status:400});try{if(!(await fetch(process.env.SHEETDB_API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:[{email:t}]})})).ok)throw Error("Failed to store email");let e=p.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}});return await e.sendMail({from:process.env.GMAIL_USER,to:t,subject:"\uD83C\uDF89 Thanks for Subscribing!",html:`
       <div style="font-family: 'Inter', sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 12px; max-width: 600px; margin: 20px auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="https://placehold.co/100x100/6B46C1/FFFFFF?text=BookOne" alt="BookOne Logo" style="width: 80px; height: 80px; margin-bottom: 15px; border-radius: 50%;">
    <h2 style="color: #6B46C1; font-size: 28px; margin-bottom: 10px; font-weight: 700;">Welcome to BookOne!</h2>
    <p style="color: #555; font-size: 15px;">Thank you for joining our community.</p>
  </div>

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 15px;">
      Hi there 👋
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 15px;">
      Thank you for subscribing to the BookOne newsletter! We're thrilled to have you on board.
    </p>
    <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">
      You'll now be the first to receive our latest insights on web solutions, AI automation, and exclusive content designed to help your business thrive. Get ready for smart reads, once a week.
    </p>
  </div>

  <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
    <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/blogs" style="display: inline-block; background-color: #805AD5; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 8px rgba(128, 90, 213, 0.3);">
      Explore Our Latest Blogs
    </a>
  </div>

  <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
    <p>Sent from BookOne.</p>
    <p>&copy; 2025 BookOne. All rights reserved.</p>
    <p style="margin-top: 10px;">
      <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/privacy-policy" style="color: #888; text-decoration: underline;">Privacy Policy</a> |
      <a href="https://lkgdca7gsivoowsxmk5fxvbqjy.srv.us/terms-of-service" style="color: #888; text-decoration: underline;">Terms of Service</a>
    </p>
  </div>
</div>

      `}),a.NextResponse.json({success:!0,message:"You're subscribed!"})}catch(e){return a.NextResponse.json({success:!1,error:e?.message||"Something went wrong"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/subscribe/route",pathname:"/api/subscribe",filename:"route",bundlePath:"app/api/subscribe/route"},resolvedPagePath:"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\api\\subscribe\\route.js",nextConfigOutput:"standalone",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:d,serverHooks:x}=c;function g(){return(0,n.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:d})}},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},79646:e=>{"use strict";e.exports=require("child_process")},81630:e=>{"use strict";e.exports=require("http")},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,580,526],()=>r(78257));module.exports=s})();