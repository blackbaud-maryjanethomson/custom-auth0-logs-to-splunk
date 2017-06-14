module.exports=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=24)}([function(e,t){e.exports=require("auth0-extension-tools@1.2.1")},function(e,t){e.exports=require("auth0-extension-express-tools@1.0.1")},function(e,t,n){"use strict";e.exports=n(0).config()},function(e,t,n){"use strict";var o=n(36);o.emitErrs=!0;var i=new o.Logger({transports:[new o.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=i,e.exports.stream={write:function(e){i.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("express@4.12.4")},function(e,t,n){function o(e){if(null===e||void 0===e)throw new a.ArgumentError("Must provide an options object");if(null===e.domain||void 0===e.domain)throw new a.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new a.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.clientId||void 0===e.clientId)throw new a.ArgumentError("Must provide a valid clientId");if("string"!=typeof e.clientId||0===e.clientId.length)throw new a.ArgumentError("The provided clientId is invalid: "+e.clientId);if(null===e.clientSecret||void 0===e.clientSecret)throw new a.ArgumentError("Must provide a valid clientSecret");if("string"!=typeof e.clientSecret||0===e.clientSecret.length)throw new a.ArgumentError("The provided clientSecret is invalid: "+e.clientSecret);this.options=e,this.tokenCache=e.tokenCache||{getToken:function(){return i.resolve()},setToken:function(){return i.resolve()}}}const i=n(9),r=n(12),s=n(32),a=n(0);o.prototype.getAccessToken=function(){var e=this;return new i(function(t,n){r.post("https://"+e.options.domain+"/oauth/token").send({audience:"https://"+e.options.domain+"/api/v2/",client_id:e.options.clientId,client_secret:e.options.clientSecret,grant_type:"client_credentials"}).set("Accept","application/json").end(function(o,i){if(o&&401===o.status)return n(new a.ManagementApiError("unauthorized","Invalid credentials for "+e.options.clientId,o.status));if(o&&i&&i.body&&i.body.error)return n(new a.ManagementApiError(i.body.error,i.body.error_description||i.body.error,o.status));if(o)return n(o);if(!i.ok||!i.body.access_token)return n(new a.ManagementApiError("unknown_error","Unknown error from Management API or no access_token was provided: "+(i.text||i.status)));const r=new Date;return t({token:i.body.access_token,expiresAt:r.setSeconds(r.getSeconds()+i.body.expires_in)})})})},o.prototype.getAccessTokenCached=function(){var e=this;return e.tokenCache.getToken().then(function(t){if(t&&t.token){const n=(new Date).valueOf();if(t.expiresAt-n>1e4)return t}return e.getAccessToken(e.options).then(function(t){return e.tokenCache.setToken(t).then(function(){return t})})})},o.prototype.getLogs=function(e){const t=this;return new i(function(n,o){t.getAccessTokenCached(t.options,t.storage).then(function(i){const c=s.stringify(e);r.get("https://"+t.options.domain+"/api/v2/logs?"+c).set("Authorization","Bearer "+i.token).set("Content-Type","application/json").end(function(e,i){if(e&&403===e.status){const r=function(){return o(new a.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status))};t.tokenCache.setToken(null).then(r).catch(r)}return e&&i&&i.body&&i.body.error?o(new a.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status)):e?o(e):i.ok?n({logs:i.body,limits:{limit:i.headers["x-ratelimit-limit"],remaining:i.headers["x-ratelimit-remaining"],reset:i.headers["x-ratelimit-reset"]}}):o(new a.ManagementApiError("unknown_error","Unknown error from Management API: "+(i.text||i.status)))})})})},e.exports=o},function(e,t){const n={s:{name:"Success Login",icon:"icon-budicon-448",level:1},ssa:{name:"Success Silent Auth",icon:"icon-budicon-448",level:1},fsa:{name:"Failed Silent Auth",icon:"icon-budicon-448",level:3},seacft:{name:"Success Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",level:1},feacft:{name:"Failed Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",level:3},seccft:{name:"Success Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",level:1},feccft:{name:"Failed Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",level:3},sepft:{name:"Success Exchange",description:"Password for Access Token",icon:"icon-budicon-456",level:1},fepft:{name:"Failed Exchange",description:"Password for Access Token",icon:"icon-budicon-456",level:3},sertft:{name:"Success Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",level:1},fertft:{name:"Failed Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",level:3},seoobft:{name:"Success Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",level:1},feoobft:{name:"Failed Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",level:3},seotpft:{name:"Success Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",level:1},feotpft:{name:"Failed Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",level:3},sercft:{name:"Success Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",level:1},fercft:{name:"Failed Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",level:3},f:{name:"Failed Login",icon:"icon-budicon-448",level:3},w:{name:"Warning",icon:"icon-budicon-354",level:2},du:{name:"Deleted User",icon:"icon-budicon-311",level:3},fu:{name:"Failed Login (invalid email/username)",icon:"icon-budicon-311",level:3},fp:{name:"Failed Login (wrong password)",icon:"icon-budicon-311",level:3},fc:{name:"Failed by Connector",icon:"icon-budicon-313",level:3},fco:{name:"Failed by CORS",icon:"icon-budicon-313",level:3},con:{name:"Connector Online",icon:"icon-budicon-143",level:1},coff:{name:"Connector Offline",icon:"icon-budicon-143",level:3},fcpro:{name:"Failed Connector Provisioning",icon:"icon-budicon-143",level:4},ss:{name:"Success Signup",icon:"icon-budicon-314",level:1},fs:{name:"Failed Signup",icon:"icon-budicon-311",level:3},cs:{name:"Code Sent",icon:"icon-budicon-243",level:1},cls:{name:"Code/Link Sent",icon:"icon-budicon-781",level:1},sv:{name:"Success Verification Email",icon:"icon-budicon-781",level:1},fv:{name:"Failed Verification Email",icon:"icon-budicon-311",level:3},scp:{name:"Success Change Password",icon:"icon-budicon-280",level:1},fcp:{name:"Failed Change Password",icon:"icon-budicon-266",level:3},sce:{name:"Success Change Email",icon:"icon-budicon-266",level:1},fce:{name:"Failed Change Email",icon:"icon-budicon-266",level:3},scu:{name:"Success Change Username",icon:"icon-budicon-266",level:1},fcu:{name:"Failed Change Username",icon:"icon-budicon-266",level:3},scpn:{name:"Success Change Phone Number",icon:"icon-budicon-266",level:1},fcpn:{name:"Failed Change Phone Number",icon:"icon-budicon-266",level:3},svr:{name:"Success Verification Email Request",icon:"icon-budicon-781",level:0},fvr:{name:"Failed Verification Email Request",icon:"icon-budicon-311",level:3},scpr:{name:"Success Change Password Request",icon:"icon-budicon-280",level:1},fcpr:{name:"Failed Change Password Request",icon:"icon-budicon-311",level:3},fn:{name:"Failed Sending Notification",icon:"icon-budicon-782",level:3},sapi:{name:"API Operation",icon:"icon-budicon-546",level:1},fapi:{name:"Failed API Operation",icon:"icon-budicon-546",level:3},limit_wc:{name:"Blocked Account",icon:"icon-budicon-313",level:4},limit_mu:{name:"Blocked IP Address",icon:"icon-budicon-313",level:4},limit_ui:{name:"Too Many Calls to /userinfo",icon:"icon-budicon-313",level:4},api_limit:{name:"Rate Limit On API",icon:"icon-budicon-313",level:4},limit_delegation:{name:"Too Many Calls to /delegation",icon:"icon-budicon-313",level:4},sdu:{name:"Successful User Deletion",icon:"icon-budicon-312",level:1},fdu:{name:"Failed User Deletion",icon:"icon-budicon-311",level:3},slo:{name:"Success Logout",icon:"icon-budicon-449",level:1},flo:{name:"Failed Logout",icon:"icon-budicon-449",level:3},sd:{name:"Success Delegation",icon:"icon-budicon-456",level:1},fd:{name:"Failed Delegation",icon:"icon-budicon-456",level:3},gd_unenroll:{name:"Unenroll device account",icon:"icon-budicon-298",level:1},gd_update_device_account:{name:"Update device account",icon:"icon-budicon-257",level:1},gd_module_switch:{name:"Module switch",icon:"icon-budicon-329",level:1},gd_tenant_update:{name:"Guardian tenant update",icon:"icon-budicon-170",level:1},gd_start_auth:{name:"Second factor started",icon:"icon-budicon-285",level:1},gd_start_enroll:{name:"Enroll started",icon:"icon-budicon-299",level:1},gd_user_delete:{name:"User delete",icon:"icon-budicon-298",level:1},gd_auth_succeed:{name:"OTP Auth suceed",icon:"icon-budicon-mfa-login-succeed",level:1},gd_auth_failed:{name:"OTP Auth failed",icon:"icon-budicon-mfa-login-failed",level:3},gd_send_pn:{name:"Push notification sent",icon:"icon-budicon-mfa-send-pn",level:1},gd_auth_rejected:{name:"OTP Auth rejected",icon:"icon-budicon-mfa-login-failed",level:3},gd_recovery_succeed:{name:"Recovery succeed",icon:"icon-budicon-mfa-recovery-succeed",level:1},gd_recovery_failed:{name:"Recovery failed",icon:"icon-budicon-mfa-recovery-failed",level:3},gd_send_sms:{name:"SMS Sent",icon:"icon-budicon-799",level:1},gd_otp_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",level:2},gd_recovery_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",level:2},fui:{name:"Users import",icon:"icon-budicon-299",level:2},sui:{name:"Users import",icon:"icon-budicon-299",level:1},pwd_leak:{name:"Breached password",icon:"icon-budicon-313",level:3}};e.exports=n,e.exports.get=function(e){return n[e]&&n[e].name||"Unknown Log Type: "+e}},function(e,t,n){function o(e){if(null===e||void 0===e)throw new s.ArgumentError("Must provide an options object");r.call(this,{objectMode:!0}),this.client=new a(e),this.options=e,this.remaining=50,this.lastBatch=0,this.previousCheckpoint=e.checkpointId||null,this.lastCheckpoint=e.checkpointId||null,this.status={start:new Date,end:null,logsProcessed:0}}const i=n(35),r=n(34).Readable,s=n(0),a=n(5);i.inherits(o,r),o.prototype.getQuery=function(e){return e&&e.length?"type:"+e.join(" OR type:"):""},o.prototype.done=function(){this.status.end=new Date,this.push(null)},o.prototype.next=function(e){const t=this;if(t.remaining<1)t.status.warning="Auth0 Management API rate limit reached.",t.done();else{const n=t.lastCheckpoint?{take:100,from:t.lastCheckpoint}:{per_page:100,page:0};n.q=t.getQuery(t.options.types),n.sort="date:1",t.client.getLogs(n).then(function(n){const o=n.logs;if(t.remaining=n.limits.remaining,o&&o.length){const i=t.options.types&&t.options.types.length?o.filter(function(e){return t.options.types.indexOf(e.type)>=0}).slice(0,e||100):o;i.length?(t.lastCheckpoint=i[i.length-1]._id,t.lastBatch+=i.length,t.push({logs:i,limits:n.limits})):(t.lastCheckpoint=o[o.length-1]._id,t.lastBatch+=0,t.push({logs:[],limits:n.limits}))}else t.status.end=new Date,t.push(null);return o}).catch(function(e){t.emit("error",e)})}},o.prototype.batchSaved=function(){this.status.logsProcessed+=this.lastBatch,this.previousCheckpoint=this.lastCheckpoint,this.lastBatch=0},o.prototype._read=function(){},e.exports=o},function(e,t){var n={};n.formatTime=function(e){var t;return e instanceof Date&&(e=e.valueOf()),e&&null!==e?(-1!==e.toString().indexOf(".")?(t=parseFloat(e).toFixed(3),t.toString().indexOf(".")>=10&&(t=parseFloat(t.toString().substring(0,14)).toFixed(3))):t=13===e.toString().length?(parseFloat(e)/1e3).toFixed(3):e.toString().length<=12?parseFloat(e).toFixed(3):parseFloat(e.toString().substring(0,13)/1e3).toFixed(3),t):null},n.toArray=function(e){return Array.prototype.slice.call(e)},n.chain=function(e,t){if(arguments.length>1&&"function"==typeof arguments[0]){var o=n.toArray(arguments);e=o.slice(0,o.length-1),t=o[o.length-1]}if(e=e||[],t=t||function(){},0===e.length)t();else{var i=function(e,o,r){var s=function(e){if(e)t(e);else{var r=n.toArray(arguments);r.shift(),i(o[0],o.slice(1),r)}},a=r;0===o.length?a.push(t):a.push(s),e.apply(null,a)};i(e[0],e.slice(1),[])}},n.whilst=function(e,t,o){e=e||function(){return!1},t=t||function(e){e()},o=o||function(){};var i=function(i){i?o(i):n.whilst(e,t,o)};e()?t(i):o(null)},n.expBackoff=function(e,t){if(t=t||function(){},e&&"object"==typeof e)if(e&&!e.hasOwnProperty("attempt"))t(new Error("Must set opts.attempt."));else{var n=Math.random();e.hasOwnProperty("rand")&&(n=e.rand),n++;var o=Math.round(10*n*Math.pow(2,e.attempt));o=Math.min(o,12e4),setTimeout(function(){t(null,o)},o)}else t(new Error("Must send opts as an object."))},n.bind=function(e,t){return function(){return t.apply(e,arguments)}},n.copyObject=function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},n.copyArray=function(e){for(var t=[],n=0;e&&n<e.length;n++)t[n]=e[n];return t},n.orByProp=function(e){for(var t=!1,n=1;!t&&n<arguments.length;n++)arguments[n]&&(t=t||arguments[n][e]);return t},n.orByFalseyProp=function(e){for(var t=null,n=arguments.length-1;n>0;n--)arguments[n]&&arguments[n].hasOwnProperty(e)&&(t=arguments[n][e]);return t},n.validateNonNegativeInt=function(e,t){if(e=parseInt(e,10),isNaN(e))throw new Error(t+" must be a number, found: "+e);if(e<0)throw new Error(t+" must be a positive number, found: "+e);return e},e.exports=n},function(e,t){e.exports=require("bluebird@3.4.6")},function(e,t){e.exports=require("lodash@3.10.1")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("superagent@1.2.0")},function(e,t){e.exports=require("url")},function(e,t,n){"use strict";(function(t){var o=(n(13),n(11)),i=n(31),r=n(4),s=(n(28),n(0)),a=n(1),c=n(22),l=n(23),u=n(20),d=n(3),p=n(2),h=n(19);e.exports=function(e,n){p.setProvider(e);var f=n?new s.WebtaskStorageContext(n,{force:1}):new s.FileStorageContext(o.join(t,"./data.json"),{mergeWrites:!0}),g=new r;return g.use(i(":method :url :status :response-time ms - :res[content-length]",{stream:d.stream})),g.use(a.routes.dashboardAdmins({secret:p("EXTENSION_SECRET"),audience:"urn:logs-to-splunk",rta:p("AUTH0_RTA").replace("https://",""),domain:p("AUTH0_DOMAIN"),baseUrl:p("PUBLIC_WT_URL")||p("WT_URL"),clientName:"Logs to Splunk",urlPrefix:"",sessionStorageKey:"logs-to-splunk:apiToken",scopes:"read:logs"})),g.use("/meta",l()),g.use("/.extensions",u()),g.use("/app",r.static(o.join(t,"../dist"))),g.use(h(f)),g.use("/",c(f)),g.use(a.middlewares.errorHandler(d.error.bind(d))),g}}).call(t,"/")},function(e,t,n){const o=n(17);e.exports.LogsProcessor=n(16),e.exports.LogsApiClient=n(5),e.exports.LogsApiStream=n(7),e.exports.logTypes=n(6),e.exports.reporters={SlackReporter:o}},function(e,t,n){function o(e,t){if(null===t||void 0===t)throw new r.ArgumentError("Must provide an options object");this.storage=new c(e),this.options=i.assign({},{batchSize:100,maxRetries:5,maxRunTimeSeconds:20},t)}const i=n(10),r=n(0),s=n(6),a=n(7),c=n(18);o.prototype.hasTimeLeft=function(e){const t=(new Date).getTime();return e+1e3*this.options.maxRunTimeSeconds>=t},o.prototype.getLogFilter=function(e){var t=e.logTypes||[];if(e.logLevel){const n=i.map(s,function(e,t){const n=e;return n.type=t,n});t=t.concat(i.map(i.filter(n,function(t){return t.level>=e.logLevel}),"type"))}return i.uniq(t)},o.prototype.createStream=function(e){const t=this;return t.storage.getCheckpoint(e.startFrom).then(function(n){return t.options.logger&&t.options.logger.debug("Starting logs processor from checkpoint:",n),new a({checkpointId:n,types:t.getLogFilter(e),domain:e.domain,clientId:e.clientId,clientSecret:e.clientSecret,tokenCache:t.storage})})},o.prototype.run=function(e){const t=this;return new Promise(function(n,o){const i=(new Date).getTime();var r=0,s=0,a=[];const c=t.storage,l=(t.options,t.options.batchSize),u=t.options.maxRetries,d=function(e,i,r){t.options.logger&&t.options.logger.debug("Processor failed:",e),i.error=e,c.done(i,r).then(function(){return n({status:i,checkpoint:r})}).catch(o)},p=function(e,i){if(t.options.logger&&t.options.logger.debug("Processor run complete. Logs processed:",e.logsProcessed),e.logsProcessed>0){return(new Date).getTime()-s>=6048e5&&(e.warning="Logs are outdated more than for week. Last processed log has date is "+new Date(s)),c.done(e,i).then(function(){return n({status:e,checkpoint:i})}).catch(o)}return n({status:e,checkpoint:i})},h=function(){var e=l;return e-=a.length,e>100&&(e=100),e},f=function(n,o,s){if(!t.hasTimeLeft(i))return d(n,o.status,o.previousCheckpoint);if(r<u)return r+=1,e(a,s);const c=["Skipping logs from "+o.previousCheckpoint+" to "+o.lastCheckpoint+" after "+u+" retries.",n];return t.options.logger&&t.options.logger.error(c[0],c[1]),d(c,o.status,o.lastCheckpoint)};t.createStream(t.options).then(function(n){const o=h();t.options.logger&&t.options.logger.debug("Loading next batch of logs. Next limit:",o),n.next(o),n.on("data",function(o){const r=o.logs;if(a=a.concat(r),r&&r.length&&(s=new Date(r[r.length-1].date).getTime()),a.length<l&&t.hasTimeLeft(i))return n.next(h());const c=function(e){return e?f(e,n,c):(a=[],t.hasTimeLeft(i)?(n.batchSaved(),n.next(h())):n.done())};return e(a,c)}),n.on("end",function(){const t=function(e){return e?f(e,n,t):(n.batchSaved(),p(n.status,n.lastCheckpoint))};e(a,t)}),n.on("error",function(e){d(e,n.status,n.previousCheckpoint)})}).catch(o)})},e.exports=o},function(e,t,n){function o(e){this.options=e||{}}const i=n(9),r=n(12);o.prototype.send=function(e,t){if(!e||"object"!=typeof e)throw new Error("object status is required");const n=this.options,o=this.createMessage(this.options,e,t);return new i(function(e,t){return n.hook?r.post(n.hook).send(o).set("Accept","application/json").end(function(n){return n?t(n):e()}):e()})},o.prototype.createMessage=function(e,t,n){const o={username:e.username||"auth0-logger",icon_emoji:e.icon||":rocket:",attachments:[]},i=e.title||"Auth0 Logger",r=t.error?i+" Error":i+" Success",s=t.error?t.error.message||t.error[0]||"Error occurred":null,a={fallback:e.fallback||r,text:e.text||r,fields:[{title:"Start time",value:t.start,short:!0},{title:"End time",value:t.end,short:!0},{title:"Logs processed",value:t.logsProcessed,short:!0},{title:"Last checkpoint",value:n,short:!0}],error_field:{title:"Error",value:s,short:!1}},c=e.url?" (<"+e.url+"|Details>)":null,l=a.fields;return t.error&&l.push(a.error_field),o.attachments.push({color:"#7CD197",fallback:a.fallback,text:a.fallback+(c||""),fields:l}),o},e.exports=o},function(e,t,n){function o(e,t){if(!e)throw new r("The storageContext is required");this.storageContext=e,this.options=i({},{limit:400},t)}const i=n(10).assign,r=n(0).ArgumentError;o.prototype.read=function(){return this.storageContext.read().then(function(e){const t=e||{};return t.logs=t.logs||[],t})},o.prototype.write=function(e){return this.storageContext.write(e)},o.prototype.getCheckpoint=function(e){const t=this;return t.read().then(function(n){return e&&e!==n.startFrom?(n.startFrom=e,n.checkpointId=e,t.write(n).then(function(){return n.checkpointId||e||null})):n.checkpointId})},o.prototype.getToken=function(){return this.read().then(function(e){return e.logs_access_token||null})},o.prototype.setToken=function(e){const t=this;return t.read().then(function(n){return n.logs_access_token=e,t.write(n)})},o.prototype.done=function(e,t){const n=this;return n.read().then(function(o){return Buffer.byteLength(JSON.stringify(o),"utf8")>=1024*n.options.limit&&o.logs&&o.logs.length&&o.logs.splice(0,5),e.checkpoint=t,o.logs.push(e),o.checkpointId=t,n.write(o)})},e.exports=o},function(e,t,n){"use strict";var o=n(26).Logger,i=n(15),r=n(2),s=n(3);e.exports=function(e){return function(t,n,a){var c=t.webtaskContext&&t.webtaskContext.body||t.body||{},l=t.webtaskContext&&t.webtaskContext.headers||{};if(!(c.schedule&&"active"===c.state||"https://manage.auth0.com/"===l.referer&&l["if-none-match"]))return a();var u=new o({token:r("SPLUNK_TOKEN"),url:r("SPLUNK_URL"),port:r("SPLUNK_COLLECTOR_PORT")||8088,path:r("SPLUNK_COLLECTOR_PATH")||"/services/collector/event/1.0",maxBatchCount:0});u.error=function(e,t){s.error("error",e,"context",t)};var d=function(e,t){if(!e||!e.length)return t();e.forEach(function(e){u.send({message:e})}),s.info("Sending "+e.length+" logs to Splunk..."),u.flush(function(e,n,o){return s.info("Splunk response",o),e?t({error:e,message:"Error sending logs to Splunk"}):(s.info("Upload complete."),t())})},p=new i.reporters.SlackReporter({hook:r("SLACK_INCOMING_WEBHOOK_URL"),username:"auth0-logs-to-splunk",title:"Logs To Splunk"}),h={domain:r("AUTH0_DOMAIN"),clientId:r("AUTH0_CLIENT_ID"),clientSecret:r("AUTH0_CLIENT_SECRET"),batchSize:r("BATCH_SIZE"),startFrom:r("START_FROM"),logTypes:r("LOG_TYPES"),logLevel:r("LOG_LEVEL")};return new i.LogsProcessor(e,h).run(d).then(function(e){p.send(e.status,e.checkpoint),n.json(e)}).catch(function(e){p.send({error:e,logsProcessed:0},null),a(e)})}}},function(e,t,n){"use strict";var o=n(4).Router,i=n(1).middlewares,r=n(2),s=n(3);e.exports=function(){var e=o(),t=i.validateHookToken(r("AUTH0_DOMAIN"),r("WT_URL"),r("EXTENSION_SECRET"));return e.use("/on-uninstall",t("/.extensions/on-uninstall")),e.use(i.managementApiClient({domain:r("AUTH0_DOMAIN"),clientId:r("AUTH0_CLIENT_ID"),clientSecret:r("AUTH0_CLIENT_SECRET")})),e.delete("/on-uninstall",function(e,t){var n=r("AUTH0_CLIENT_ID");e.auth0.clients.delete({client_id:n}).then(function(){s.debug("Deleted client "+n),t.sendStatus(204)}).catch(function(e){s.debug("Error deleting client: "+r("AUTH0_CLIENT_ID")),s.error(e),t.sendStatus(204)})}),e}},function(e,t,n){"use strict";(function(t){var o=(n(30),n(29)),i=(n(11),n(1).urlHelpers),r=n(2);e.exports=function(){var e='\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.<%= assets.version %>.css" /><% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-splunk/assets/auth0-logs-to-splunk.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';return function(t,n,s){if(0===t.url.indexOf("/api"))return s();var a={AUTH0_DOMAIN:r("AUTH0_DOMAIN"),AUTH0_CLIENT_ID:r("EXTENSION_CLIENT_ID"),AUTH0_MANAGE_URL:r("AUTH0_MANAGE_URL")||"https://manage.auth0.com",BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t),TITLE:r("TITLE")};return n.send(o.render(e,{config:a,assets:{customCss:r("CUSTOM_CSS"),version:"1.2.1"}}))}}}).call(t,"/")},function(e,t,n){"use strict";var o=n(4).Router,i=n(1).middlewares,r=n(2),s=n(21);e.exports=function(e){var t=o(),n=i.authenticateAdmins({credentialsRequired:!0,secret:r("EXTENSION_SECRET"),audience:"urn:logs-to-splunk",baseUrl:r("PUBLIC_WT_URL")||r("WT_URL"),onLoginSuccess:function(e,t,n){return n()}});return t.get("/",s()),t.get("/api/report",n,function(t,n,o){return e.read().then(function(e){return n.json(e&&e.logs||[])}).catch(o)}),t}},function(e,t,n){"use strict";var o=n(4),i=n(25);e.exports=function(){var e=o.Router();return e.get("/",function(e,t){t.status(200).send(i)}),e}},function(e,t,n){"use strict";var o=n(1),i=n(14),r=n(3);e.exports=o.createServer(function(e,t){return r.info("Starting Logs to Splunk extension - Version:","1.2.1"),i(e,t)})},function(e,t){e.exports={title:"Auth0 Logs to Splunk",name:"auth0-logs-to-splunk",version:"1.2.1",author:"auth0",description:"This extension will take all of your Auth0 logs and export them to Splunk",type:"cron",repository:"https://github.com/auth0/auth0-logs-to-splunk",keywords:["auth0","extension"],schedule:"0 */5 * * * *",auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:logs delete:clients"},secrets:{SPLUNK_URL:{description:"Splunk URL - this is your Splunk HTTP Collector Endpoint",required:!0},SPLUNK_TOKEN:{description:"Splunk Token - this is your Splunk Token",required:!0,type:"password"},SPLUNK_COLLECTOR_PORT:{description:"HTTP Collector Port",required:!1,default:8088},SPLUNK_COLLECTOR_PATH:{description:"HTTP Collector Path (Endpoint)",required:!1,default:"/services/collector/event/1.0"},BATCH_SIZE:{description:"The ammount of logs to be read on each execution. Maximun is 100.",default:100},START_FROM:{description:"The Auth0 LogId from where you want to start."},LOG_LEVEL:{description:"This allows you to specify the log level of events that need to be sent",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"0",text:"Debug"},{value:"1",text:"Info"},{value:"2",text:"Warning"},{value:"3",text:"Error"},{value:"4",text:"Critical"}]},LOG_TYPES:{description:"If you only want to send events with a specific type (eg: failed logins)",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"s",text:"Success Login (Info)"},{value:"seacft",text:"Success Exchange (Info)"},{value:"feacft",text:"Failed Exchange (Error)"},{value:"f",text:"Failed Login (Error)"},{value:"w",text:"Warnings During Login (Warning)"},{value:"du",text:"Deleted User (Info)"},{value:"fu",text:"Failed Login (invalid email/username) (Error)"},{value:"fp",text:"Failed Login (wrong password) (Error)"},{value:"fc",text:"Failed by Connector (Error)"},{value:"fco",text:"Failed by CORS (Error)"},{value:"con",text:"Connector Online (Info)"},{value:"coff",text:"Connector Offline (Error)"},{value:"fcpro",text:"Failed Connector Provisioning (Critical)"},{value:"ss",text:"Success Signup (Info)"},{value:"fs",text:"Failed Signup (Error)"},{value:"cs",text:"Code Sent (Debug)"},{value:"cls",text:"Code/Link Sent (Debug)"},{value:"sv",text:"Success Verification Email (Debug)"},{value:"fv",text:"Failed Verification Email (Debug)"},{value:"scp",text:"Success Change Password (Info)"},{value:"fcp",text:"Failed Change Password (Error)"},{value:"sce",text:"Success Change Email (Info)"},{value:"fce",text:"Failed Change Email (Error)"},{value:"scu",text:"Success Change Username (Info)"},{value:"fcu",text:"Failed Change Username (Error)"},{value:"scpn",text:"Success Change Phone Number (Info)"},{value:"fcpn",text:"Failed Change Phone Number (Error)"},{value:"svr",text:"Success Verification Email Request (Debug)"},{value:"fvr",text:"Failed Verification Email Request (Error)"},{value:"scpr",text:"Success Change Password Request (Debug)"},{value:"fcpr",text:"Failed Change Password Request (Error)"},{value:"fn",text:"Failed Sending Notification (Error)"},{value:"limit_wc",text:"Blocked Account (Critical)"},{value:"limit_ui",text:"Too Many Calls to /userinfo (Critical)"},{value:"api_limit",text:"Rate Limit On API (Critical)"},{value:"sdu",text:"Successful User Deletion (Info)"},{value:"fdu",text:"Failed User Deletion (Error)"}]}}}},function(e,t,n){var o=n(27),i=n(8);e.exports={Logger:o,utils:i}},function(e,t,n){function o(e,t){console.log("ERROR:",e," CONTEXT",t)}function i(e,t){return{message:e,severity:t}}var r=n(33),s=n(13),a=n(8),c=function(e){this._timerID=null,this._timerDuration=0,this.config=this._initializeConfig(e),this.requestOptions=this._initializeRequestOptions(),this.serializedContextQueue=[],this.eventsBatchSize=0,this.eventFormatter=i,this.error=o,this._enableTimer=a.bind(this,this._enableTimer),this._disableTimer=a.bind(this,this._disableTimer),this._initializeConfig=a.bind(this,this._initializeConfig),this._initializeRequestOptions=a.bind(this,this._initializeRequestOptions),this._validateMessage=a.bind(this,this._validateMessage),this._initializeMetadata=a.bind(this,this._initializeMetadata),this._initializeContext=a.bind(this,this._initializeContext),this._makeBody=a.bind(this,this._makeBody),this._post=a.bind(this,this._post),this._sendEvents=a.bind(this,this._sendEvents),this.send=a.bind(this,this.send),this.flush=a.bind(this,this.flush)};c.prototype.levels={DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error"};var l={name:"splunk-javascript-logging/0.9.3",host:"localhost",path:"/services/collector/event/1.0",protocol:"https",port:8088,level:c.prototype.levels.INFO,maxRetries:0,batchInterval:0,maxBatchSize:0,maxBatchCount:1},u={json:!1,strictSSL:!1};c.prototype._disableTimer=function(){this._timerID&&(clearInterval(this._timerID),this._timerDuration=0,this._timerID=null)},c.prototype._enableTimer=function(e){e=a.validateNonNegativeInt(e,"Batch interval"),this._timerID&&this._disableTimer(),this.config&&(this.config.batchInterval=e),this._timerDuration=e;var t=this;this._timerID=setInterval(function(){t.serializedContextQueue.length>0&&t.flush()},e)},c.prototype._initializeConfig=function(e){var t=a.copyObject(this.config);if(!e)throw new Error("Config is required.");if("object"!=typeof e)throw new Error("Config must be an object.");if(!t.hasOwnProperty("token")&&!e.hasOwnProperty("token"))throw new Error("Config object must have a token.");if("string"!=typeof t.token&&"string"!=typeof e.token)throw new Error("Config token must be a string.");if(e.url){var n=s.parse(e.url),o=n.path&&"/"!==n.path;n.protocol&&(e.protocol=n.protocol.replace(":","")),n.port&&(e.port=n.port),n.hostname&&n.path?(e.host=n.hostname,o&&(e.path=n.path)):o&&(e.host=n.path)}if(t.token=a.orByProp("token",e,t),t.name=a.orByProp("name",e,t,l),t.level=a.orByProp("level",e,t,l),t.host=a.orByProp("host",e,t,l),t.path=a.orByProp("path",e,t,l),t.protocol=a.orByProp("protocol",e,t,l),t.port=a.orByFalseyProp("port",e,t,l),t.port=a.validateNonNegativeInt(t.port,"Port"),t.port<1||t.port>65535)throw new Error("Port must be an integer between 1 and 65535, found: "+t.port);t.maxRetries=a.orByProp("maxRetries",e,t,l),t.maxRetries=a.validateNonNegativeInt(t.maxRetries,"Max retries"),t.maxBatchCount=a.orByFalseyProp("maxBatchCount",e,t,l),t.maxBatchCount=a.validateNonNegativeInt(t.maxBatchCount,"Max batch count"),t.maxBatchSize=a.orByFalseyProp("maxBatchSize",e,t,l),t.maxBatchSize=a.validateNonNegativeInt(t.maxBatchSize,"Max batch size"),t.batchInterval=a.orByFalseyProp("batchInterval",e,t,l),t.batchInterval=a.validateNonNegativeInt(t.batchInterval,"Batch interval");var i=!this._timerID&&t.batchInterval>0,r=this._timerID&&this._timerDuration!==t.batchInterval&&t.batchInterval>0;return i||r?this._enableTimer(t.batchInterval):this._timerID&&(t.batchInterval<=0||this._timerDuration<0)&&this._disableTimer(),t},c.prototype._initializeRequestOptions=function(e){var t=a.copyObject(e||u);return e&&(t.json=e.hasOwnProperty("json")?e.json:u.json,t.strictSSL=e.strictSSL||u.strictSSL),t.headers=t.headers||{},t},c.prototype._validateMessage=function(e){if(void 0===e||null===e)throw new Error("Message argument is required.");return e},c.prototype._initializeMetadata=function(e){var t={};return e&&e.hasOwnProperty("metadata")&&(e.metadata.hasOwnProperty("time")&&(t.time=e.metadata.time),e.metadata.hasOwnProperty("host")&&(t.host=e.metadata.host),e.metadata.hasOwnProperty("source")&&(t.source=e.metadata.source),e.metadata.hasOwnProperty("sourcetype")&&(t.sourcetype=e.metadata.sourcetype),e.metadata.hasOwnProperty("index")&&(t.index=e.metadata.index)),t},c.prototype._initializeContext=function(e){if(!e)throw new Error("Context argument is required.");if("object"!=typeof e)throw new Error("Context argument must be an object.");if(!e.hasOwnProperty("message"))throw new Error("Context argument must have the message property set.");return e.message=this._validateMessage(e.message),e.severity=e.severity||l.level,e.metadata=e.metadata||this._initializeMetadata(e),e},c.prototype._makeBody=function(e){if(!e)throw new Error("Context parameter is required.");var t=this._initializeMetadata(e),n=a.formatTime(t.time||Date.now());return t.time=n.toString(),t.event=this.eventFormatter(e.message,e.severity||l.level),t},c.prototype._post=function(e,t){r.post(e,t)},c.prototype._sendEvents=function(e,t){t=t||function(){},this.config=this._initializeConfig(this.config);var n=this._initializeRequestOptions(this.requestOptions);n.body=this._validateMessage(e.message),n.headers.Authorization="Splunk "+this.config.token,n.headers["Content-Type"]="application/x-www-form-urlencoded",n.url=this.config.protocol+"://"+this.config.host+":"+this.config.port+this.config.path,e=this._initializeContext(e);var o=this,i=null,r=null,s=null,c=null,l=0;a.whilst(function(){return l++<=o.config.maxRetries},function(e){o._post(n,function(t,n,u){if(i=null,r=t,s=n,r&&l<=o.config.maxRetries)return a.expBackoff({attempt:l},e);if(r)return e(t);try{c=JSON.parse(u)}catch(t){c=u,i=new Error("Unexpected response from Splunk. Request body was: "+c),i.code=-1}!i&&c&&c.code&&"0"!==c.code.toString()&&(i=new Error(c.text),i.code=c.code),e(!0)})},function(){(r||i)&&o.error(r||i,e),t(r,s,c)})},c.prototype.send=function(e,t){e=this._initializeContext(e);var n=JSON.stringify(this._makeBody(e));this.serializedContextQueue.push(n),this.eventsBatchSize+=Buffer.byteLength(n,"utf8");var o=this.eventsBatchSize>this.config.maxBatchSize&&this.config.maxBatchSize>0,i=this.serializedContextQueue.length>=this.config.maxBatchCount&&this.config.maxBatchCount>0;(o||i)&&this.flush(t||function(){})},c.prototype.flush=function(e){e=e||function(){};var t=this.serializedContextQueue;this.serializedContextQueue=[],this.eventsBatchSize=0;var n=t.join(""),o={message:n};this._sendEvents(o,e)},e.exports=c},function(e,t){e.exports=require("body-parser@1.12.4")},function(e,t){e.exports=require("ejs@2.3.1")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("morgan@1.5.3")},function(e,t){e.exports=require("querystring")},function(e,t){e.exports=require("request@2.56.0")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("winston@1.0.0")}]);
