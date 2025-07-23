(()=>{var e={};e.id=746,e.ids=[746],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},37366:e=>{"use strict";e.exports=require("dns")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},79646:e=>{"use strict";e.exports=require("child_process")},81630:e=>{"use strict";e.exports=require("http")},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96452:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>c,serverHooks:()=>d,workAsyncStorage:()=>x,workUnitAsyncStorage:()=>l});var o={};r.r(o),r.d(o,{POST:()=>u});var s=r(96559),n=r(48088),i=r(37719),p=r(32190),a=r(49526);async function u(e){let{name:t,email:r,message:o,service:s,systemInfo:n}=await e.json();if(!t||!r||!o||!s)return p.NextResponse.json({success:!1,error:"Missing required fields"},{status:400});let i=a.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}}),u={from:r,to:process.env.GMAIL_USER,subject:`📩 New Contact Message from ${t}`,html:`
    <div style="font-family: 'Inter', sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 12px; max-width: 600px; margin: 20px auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
  <div style="text-align: center; margin-bottom: 25px;">
    <h2 style="color: #6B46C1; font-size: 28px; margin-bottom: 10px; font-weight: 700;">Client Inquiry Details</h2>
    <p style="color: #555; font-size: 15px;">A new message has been received through the BookOne platform.</p>
  </div>

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Contact Information</h3>
    <p style="margin-bottom: 10px; font-size: 16px; color: #444;"><strong>Name:</strong> <span style="color: #6B46C1; font-weight: 600;">${t}</span></p>
    <p style="margin-bottom: 10px; font-size: 16px; color: #444;"><strong>Email:</strong> <a href="mailto:${r}" style="color: #805AD5; text-decoration: none; font-weight: 600;">${r}</a></p>
    <p style="margin-bottom: 0; font-size: 16px; color: #444;"><strong>Service Requested:</strong> <span style="background-color: #E0BBE4; color: #6B46C1; padding: 4px 8px; border-radius: 5px; font-weight: 600; font-size: 14px;">${s}</span></p>
  </div>

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Message Details</h3>
    <p style="font-size: 16px; line-height: 1.6; color: #444;">${o}</p>
  </div>

  <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Client System Information</h3>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>System Name:</strong> ${n?.systemName||"N/A"}</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Operating System:</strong> ${n?.os||"N/A"}</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Manufacturer:</strong> ${n?.manufacturer||"N/A"}</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>Country:</strong> ${n?.country||"N/A"}</p>
    <p style="margin-bottom: 8px; font-size: 14px; color: #666;"><strong>User Agent:</strong> ${n?.userAgent||"N/A"}</p>
    <p style="margin-bottom: 0; font-size: 14px; color: #666;"><strong>Timezone:</strong> ${n?.timezone||"N/A"}</p>
  </div>

  <div style="text-align: center; margin-top: 25px; font-size: 13px; color: #888;">
    <p>&copy; 2025 BookOne. All rights reserved.</p>
  </div>
</div>

    `};try{return await i.sendMail(u),p.NextResponse.json({success:!0,message:`Thanks for this, ${t}. We'll get back to you soon.`})}catch(e){return p.NextResponse.json({success:!1,error:e?.message||"Email failed to send."},{status:500})}}let c=new s.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"C:\\Users\\emmanuel onosode\\JulyPort\\BookOne\\app\\api\\contact\\route.js",nextConfigOutput:"standalone",userland:o}),{workAsyncStorage:x,workUnitAsyncStorage:l,serverHooks:d}=c;function g(){return(0,i.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:l})}},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[447,580,526],()=>r(96452));module.exports=o})();