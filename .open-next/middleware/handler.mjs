
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.0";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/_3e36637b._.js
var require_e36637b = __commonJS({
  ".next/server/edge/chunks/_3e36637b._.js"() {
    "use strict";
    (globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/_3e36637b._.js", {
      "[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let ensureInstrumentationRegistered = function() {
            if (!registerInstrumentationPromise) {
              registerInstrumentationPromise = registerInstrumentation();
            }
            return registerInstrumentationPromise;
          }, getUnsupportedModuleErrorMessage = function(module2) {
            return `The edge runtime does not support Node.js '${module2}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
          }, __import_unsupported = function(moduleName) {
            const proxy = new Proxy(function() {
            }, {
              get(_obj, prop) {
                if (prop === "then") {
                  return {};
                }
                throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: false,
                  configurable: true
                });
              },
              construct() {
                throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: false,
                  configurable: true
                });
              },
              apply(_target, _this, args) {
                if (typeof args[0] === "function") {
                  return args[0](proxy);
                }
                throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                  value: "E394",
                  enumerable: false,
                  configurable: true
                });
              }
            });
            return new Proxy({}, {
              get: () => proxy
            });
          }, enhanceGlobals = function() {
            if ("TURBOPACK compile-time falsy", 0) {
              "TURBOPACK unreachable";
            }
            if (process !== global.process) {
              process.env = global.process.env;
              global.process = process;
            }
            Object.defineProperty(globalThis, "__import_unsupported", {
              value: __import_unsupported,
              enumerable: false,
              configurable: false
            });
            void ensureInstrumentationRegistered();
          };
          __turbopack_context__.s({
            "edgeInstrumentationOnRequestError": () => edgeInstrumentationOnRequestError,
            "ensureInstrumentationRegistered": () => ensureInstrumentationRegistered,
            "getEdgeInstrumentationModule": () => getEdgeInstrumentationModule
          });
          async function getEdgeInstrumentationModule() {
            const instrumentation = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
            return instrumentation;
          }
          let instrumentationModulePromise = null;
          async function registerInstrumentation() {
            if (process.env.NEXT_PHASE === "phase-production-build") return;
            if (!instrumentationModulePromise) {
              instrumentationModulePromise = getEdgeInstrumentationModule();
            }
            const instrumentation = await instrumentationModulePromise;
            if (instrumentation == null ? void 0 : instrumentation.register) {
              try {
                await instrumentation.register();
              } catch (err) {
                err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
                throw err;
              }
            }
          }
          async function edgeInstrumentationOnRequestError(...args) {
            const instrumentation = await getEdgeInstrumentationModule();
            try {
              var _instrumentation_onRequestError;
              await (instrumentation == null ? void 0 : (_instrumentation_onRequestError = instrumentation.onRequestError) == null ? void 0 : _instrumentation_onRequestError.call(instrumentation, ...args));
            } catch (err) {
              console.error("Error in instrumentation.onRequestError:", err);
            }
          }
          let registerInstrumentationPromise = null;
          enhanceGlobals();
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "PageSignatureError": () => PageSignatureError,
            "RemovedPageError": () => RemovedPageError,
            "RemovedUAError": () => RemovedUAError
          });
          class PageSignatureError extends Error {
            constructor({ page }) {
              super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
            }
          }
          class RemovedPageError extends Error {
            constructor() {
              super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
            }
          }
          class RemovedUAError extends Error {
            constructor() {
              super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "ACTION_SUFFIX": () => ACTION_SUFFIX,
            "APP_DIR_ALIAS": () => APP_DIR_ALIAS,
            "CACHE_ONE_YEAR": () => CACHE_ONE_YEAR2,
            "DOT_NEXT_ALIAS": () => DOT_NEXT_ALIAS,
            "ESLINT_DEFAULT_DIRS": () => ESLINT_DEFAULT_DIRS,
            "GSP_NO_RETURNED_VALUE": () => GSP_NO_RETURNED_VALUE,
            "GSSP_COMPONENT_MEMBER_ERROR": () => GSSP_COMPONENT_MEMBER_ERROR,
            "GSSP_NO_RETURNED_VALUE": () => GSSP_NO_RETURNED_VALUE,
            "INFINITE_CACHE": () => INFINITE_CACHE,
            "INSTRUMENTATION_HOOK_FILENAME": () => INSTRUMENTATION_HOOK_FILENAME,
            "MATCHED_PATH_HEADER": () => MATCHED_PATH_HEADER,
            "MIDDLEWARE_FILENAME": () => MIDDLEWARE_FILENAME,
            "MIDDLEWARE_LOCATION_REGEXP": () => MIDDLEWARE_LOCATION_REGEXP,
            "NEXT_BODY_SUFFIX": () => NEXT_BODY_SUFFIX,
            "NEXT_CACHE_IMPLICIT_TAG_ID": () => NEXT_CACHE_IMPLICIT_TAG_ID,
            "NEXT_CACHE_REVALIDATED_TAGS_HEADER": () => NEXT_CACHE_REVALIDATED_TAGS_HEADER,
            "NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER": () => NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER,
            "NEXT_CACHE_SOFT_TAG_MAX_LENGTH": () => NEXT_CACHE_SOFT_TAG_MAX_LENGTH,
            "NEXT_CACHE_TAGS_HEADER": () => NEXT_CACHE_TAGS_HEADER,
            "NEXT_CACHE_TAG_MAX_ITEMS": () => NEXT_CACHE_TAG_MAX_ITEMS,
            "NEXT_CACHE_TAG_MAX_LENGTH": () => NEXT_CACHE_TAG_MAX_LENGTH,
            "NEXT_DATA_SUFFIX": () => NEXT_DATA_SUFFIX,
            "NEXT_INTERCEPTION_MARKER_PREFIX": () => NEXT_INTERCEPTION_MARKER_PREFIX,
            "NEXT_META_SUFFIX": () => NEXT_META_SUFFIX,
            "NEXT_QUERY_PARAM_PREFIX": () => NEXT_QUERY_PARAM_PREFIX,
            "NEXT_RESUME_HEADER": () => NEXT_RESUME_HEADER,
            "NON_STANDARD_NODE_ENV": () => NON_STANDARD_NODE_ENV,
            "PAGES_DIR_ALIAS": () => PAGES_DIR_ALIAS,
            "PRERENDER_REVALIDATE_HEADER": () => PRERENDER_REVALIDATE_HEADER,
            "PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER": () => PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER,
            "PUBLIC_DIR_MIDDLEWARE_CONFLICT": () => PUBLIC_DIR_MIDDLEWARE_CONFLICT,
            "ROOT_DIR_ALIAS": () => ROOT_DIR_ALIAS,
            "RSC_ACTION_CLIENT_WRAPPER_ALIAS": () => RSC_ACTION_CLIENT_WRAPPER_ALIAS,
            "RSC_ACTION_ENCRYPTION_ALIAS": () => RSC_ACTION_ENCRYPTION_ALIAS,
            "RSC_ACTION_PROXY_ALIAS": () => RSC_ACTION_PROXY_ALIAS,
            "RSC_ACTION_VALIDATE_ALIAS": () => RSC_ACTION_VALIDATE_ALIAS,
            "RSC_CACHE_WRAPPER_ALIAS": () => RSC_CACHE_WRAPPER_ALIAS,
            "RSC_MOD_REF_PROXY_ALIAS": () => RSC_MOD_REF_PROXY_ALIAS,
            "RSC_PREFETCH_SUFFIX": () => RSC_PREFETCH_SUFFIX,
            "RSC_SEGMENTS_DIR_SUFFIX": () => RSC_SEGMENTS_DIR_SUFFIX,
            "RSC_SEGMENT_SUFFIX": () => RSC_SEGMENT_SUFFIX,
            "RSC_SUFFIX": () => RSC_SUFFIX,
            "SERVER_PROPS_EXPORT_ERROR": () => SERVER_PROPS_EXPORT_ERROR,
            "SERVER_PROPS_GET_INIT_PROPS_CONFLICT": () => SERVER_PROPS_GET_INIT_PROPS_CONFLICT,
            "SERVER_PROPS_SSG_CONFLICT": () => SERVER_PROPS_SSG_CONFLICT,
            "SERVER_RUNTIME": () => SERVER_RUNTIME,
            "SSG_FALLBACK_EXPORT_ERROR": () => SSG_FALLBACK_EXPORT_ERROR,
            "SSG_GET_INITIAL_PROPS_CONFLICT": () => SSG_GET_INITIAL_PROPS_CONFLICT,
            "STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR": () => STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR,
            "UNSTABLE_REVALIDATE_RENAME_ERROR": () => UNSTABLE_REVALIDATE_RENAME_ERROR,
            "WEBPACK_LAYERS": () => WEBPACK_LAYERS,
            "WEBPACK_RESOURCE_QUERIES": () => WEBPACK_RESOURCE_QUERIES
          });
          const NEXT_QUERY_PARAM_PREFIX = "nxtP";
          const NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
          const MATCHED_PATH_HEADER = "x-matched-path";
          const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
          const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
          const RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
          const RSC_SEGMENTS_DIR_SUFFIX = ".segments";
          const RSC_SEGMENT_SUFFIX = ".segment.rsc";
          const RSC_SUFFIX = ".rsc";
          const ACTION_SUFFIX = ".action";
          const NEXT_DATA_SUFFIX = ".json";
          const NEXT_META_SUFFIX = ".meta";
          const NEXT_BODY_SUFFIX = ".body";
          const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
          const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
          const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
          const NEXT_RESUME_HEADER = "next-resume";
          const NEXT_CACHE_TAG_MAX_ITEMS = 128;
          const NEXT_CACHE_TAG_MAX_LENGTH = 256;
          const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
          const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
          const CACHE_ONE_YEAR2 = 31536e3;
          const INFINITE_CACHE = 4294967294;
          const MIDDLEWARE_FILENAME = "middleware";
          const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
          const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
          const PAGES_DIR_ALIAS = "private-next-pages";
          const DOT_NEXT_ALIAS = "private-dot-next";
          const ROOT_DIR_ALIAS = "private-next-root-dir";
          const APP_DIR_ALIAS = "private-next-app-dir";
          const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
          const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
          const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
          const RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
          const RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
          const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
          const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
          const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
          const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
          const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
          const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
          const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
          const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
          const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
          const UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
          const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
          const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
          const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
          const ESLINT_DEFAULT_DIRS = [
            "app",
            "pages",
            "components",
            "lib",
            "src"
          ];
          const SERVER_RUNTIME = {
            edge: "edge",
            experimentalEdge: "experimental-edge",
            nodejs: "nodejs"
          };
          const WEBPACK_LAYERS_NAMES = {
            /**
            * The layer for the shared code between the client and server bundles.
            */
            shared: "shared",
            /**
            * The layer for server-only runtime and picking up `react-server` export conditions.
            * Including app router RSC pages and app router custom routes and metadata routes.
            */
            reactServerComponents: "rsc",
            /**
            * Server Side Rendering layer for app (ssr).
            */
            serverSideRendering: "ssr",
            /**
            * The browser client bundle layer for actions.
            */
            actionBrowser: "action-browser",
            /**
            * The Node.js bundle layer for the API routes.
            */
            apiNode: "api-node",
            /**
            * The Edge Lite bundle layer for the API routes.
            */
            apiEdge: "api-edge",
            /**
            * The layer for the middleware code.
            */
            middleware: "middleware",
            /**
            * The layer for the instrumentation hooks.
            */
            instrument: "instrument",
            /**
            * The layer for assets on the edge.
            */
            edgeAsset: "edge-asset",
            /**
            * The browser client bundle layer for App directory.
            */
            appPagesBrowser: "app-pages-browser",
            /**
            * The browser client bundle layer for Pages directory.
            */
            pagesDirBrowser: "pages-dir-browser",
            /**
            * The Edge Lite bundle layer for Pages directory.
            */
            pagesDirEdge: "pages-dir-edge",
            /**
            * The Node.js bundle layer for Pages directory.
            */
            pagesDirNode: "pages-dir-node"
          };
          const WEBPACK_LAYERS = {
            ...WEBPACK_LAYERS_NAMES,
            GROUP: {
              builtinReact: [
                WEBPACK_LAYERS_NAMES.reactServerComponents,
                WEBPACK_LAYERS_NAMES.actionBrowser
              ],
              serverOnly: [
                WEBPACK_LAYERS_NAMES.reactServerComponents,
                WEBPACK_LAYERS_NAMES.actionBrowser,
                WEBPACK_LAYERS_NAMES.instrument,
                WEBPACK_LAYERS_NAMES.middleware
              ],
              neutralTarget: [
                // pages api
                WEBPACK_LAYERS_NAMES.apiNode,
                WEBPACK_LAYERS_NAMES.apiEdge
              ],
              clientOnly: [
                WEBPACK_LAYERS_NAMES.serverSideRendering,
                WEBPACK_LAYERS_NAMES.appPagesBrowser
              ],
              bundled: [
                WEBPACK_LAYERS_NAMES.reactServerComponents,
                WEBPACK_LAYERS_NAMES.actionBrowser,
                WEBPACK_LAYERS_NAMES.serverSideRendering,
                WEBPACK_LAYERS_NAMES.appPagesBrowser,
                WEBPACK_LAYERS_NAMES.shared,
                WEBPACK_LAYERS_NAMES.instrument,
                WEBPACK_LAYERS_NAMES.middleware
              ],
              appPages: [
                // app router pages and layouts
                WEBPACK_LAYERS_NAMES.reactServerComponents,
                WEBPACK_LAYERS_NAMES.serverSideRendering,
                WEBPACK_LAYERS_NAMES.appPagesBrowser,
                WEBPACK_LAYERS_NAMES.actionBrowser
              ]
            }
          };
          const WEBPACK_RESOURCE_QUERIES = {
            edgeSSREntry: "__next_edge_ssr_entry__",
            metadata: "__next_metadata__",
            metadataRoute: "__next_metadata_route__",
            metadataImageMeta: "__next_metadata_image_meta__"
          };
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let fromNodeOutgoingHttpHeaders = function(nodeHeaders) {
            const headers = new Headers();
            for (let [key, value] of Object.entries(nodeHeaders)) {
              const values = Array.isArray(value) ? value : [
                value
              ];
              for (let v of values) {
                if (typeof v === "undefined") continue;
                if (typeof v === "number") {
                  v = v.toString();
                }
                headers.append(key, v);
              }
            }
            return headers;
          }, splitCookiesString = function(cookiesString) {
            var cookiesStrings = [];
            var pos = 0;
            var start;
            var ch;
            var lastComma;
            var nextStart;
            var cookiesSeparatorFound;
            function skipWhitespace() {
              while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
                pos += 1;
              }
              return pos < cookiesString.length;
            }
            function notSpecialChar() {
              ch = cookiesString.charAt(pos);
              return ch !== "=" && ch !== ";" && ch !== ",";
            }
            while (pos < cookiesString.length) {
              start = pos;
              cookiesSeparatorFound = false;
              while (skipWhitespace()) {
                ch = cookiesString.charAt(pos);
                if (ch === ",") {
                  lastComma = pos;
                  pos += 1;
                  skipWhitespace();
                  nextStart = pos;
                  while (pos < cookiesString.length && notSpecialChar()) {
                    pos += 1;
                  }
                  if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                  } else {
                    pos = lastComma + 1;
                  }
                } else {
                  pos += 1;
                }
              }
              if (!cookiesSeparatorFound || pos >= cookiesString.length) {
                cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
              }
            }
            return cookiesStrings;
          }, toNodeOutgoingHttpHeaders = function(headers) {
            const nodeHeaders = {};
            const cookies = [];
            if (headers) {
              for (const [key, value] of headers.entries()) {
                if (key.toLowerCase() === "set-cookie") {
                  cookies.push(...splitCookiesString(value));
                  nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
                } else {
                  nodeHeaders[key] = value;
                }
              }
            }
            return nodeHeaders;
          }, validateURL = function(url) {
            try {
              return String(new URL(String(url)));
            } catch (error2) {
              throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
                cause: error2
              }), "__NEXT_ERROR_CODE", {
                value: "E61",
                enumerable: false,
                configurable: true
              });
            }
          }, normalizeNextQueryParam = function(key) {
            const prefixes = [
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_QUERY_PARAM_PREFIX"],
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_INTERCEPTION_MARKER_PREFIX"]
            ];
            for (const prefix of prefixes) {
              if (key !== prefix && key.startsWith(prefix)) {
                return key.substring(prefix.length);
              }
            }
            return null;
          };
          __turbopack_context__.s({
            "fromNodeOutgoingHttpHeaders": () => fromNodeOutgoingHttpHeaders,
            "normalizeNextQueryParam": () => normalizeNextQueryParam,
            "splitCookiesString": () => splitCookiesString,
            "toNodeOutgoingHttpHeaders": () => toNodeOutgoingHttpHeaders,
            "validateURL": () => validateURL
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getWaitUntilPromiseFromEvent = function(event) {
            return event[waitUntilSymbol].kind === "internal" ? Promise.all(event[waitUntilSymbol].promises).then(() => {
            }) : void 0;
          };
          __turbopack_context__.s({
            "NextFetchEvent": () => NextFetchEvent,
            "getWaitUntilPromiseFromEvent": () => getWaitUntilPromiseFromEvent
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
          ;
          const responseSymbol = Symbol("response");
          const passThroughSymbol = Symbol("passThrough");
          const waitUntilSymbol = Symbol("waitUntil");
          class FetchEvent {
            constructor(_request, waitUntil) {
              this[passThroughSymbol] = false;
              this[waitUntilSymbol] = waitUntil ? {
                kind: "external",
                function: waitUntil
              } : {
                kind: "internal",
                promises: []
              };
            }
            // TODO: is this dead code? NextFetchEvent never lets this get called
            respondWith(response) {
              if (!this[responseSymbol]) {
                this[responseSymbol] = Promise.resolve(response);
              }
            }
            // TODO: is this dead code? passThroughSymbol is unused
            passThroughOnException() {
              this[passThroughSymbol] = true;
            }
            waitUntil(promise) {
              if (this[waitUntilSymbol].kind === "external") {
                const waitUntil = this[waitUntilSymbol].function;
                return waitUntil(promise);
              } else {
                this[waitUntilSymbol].promises.push(promise);
              }
            }
          }
          class NextFetchEvent extends FetchEvent {
            constructor(params) {
              var _params_context;
              super(params.request, (_params_context = params.context) == null ? void 0 : _params_context.waitUntil);
              this.sourcePage = params.page;
            }
            /**
            * @deprecated The `request` is now the first parameter and the API is now async.
            *
            * Read more: https://nextjs.org/docs/messages/middleware-new-signature
            */
            get request() {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
                page: this.sourcePage
              }), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
              });
            }
            /**
            * @deprecated Using `respondWith` is no longer needed.
            *
            * Read more: https://nextjs.org/docs/messages/middleware-new-signature
            */
            respondWith() {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
                page: this.sourcePage
              }), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
              });
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let detectDomainLocale2 = function(domainItems, hostname, detectedLocale) {
            if (!domainItems) return;
            if (detectedLocale) {
              detectedLocale = detectedLocale.toLowerCase();
            }
            for (const item of domainItems) {
              var _item_domain, _item_locales;
              const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase();
              if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale) => locale.toLowerCase() === detectedLocale))) {
                return item;
              }
            }
          };
          __turbopack_context__.s({
            "detectDomainLocale": () => detectDomainLocale2
          });
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let removeTrailingSlash = function(route) {
            return route.replace(/\/$/, "") || "/";
          };
          __turbopack_context__.s({
            "removeTrailingSlash": () => removeTrailingSlash
          });
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let parsePath = function(path3) {
            const hashIndex = path3.indexOf("#");
            const queryIndex = path3.indexOf("?");
            const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
            if (hasQuery || hashIndex > -1) {
              return {
                pathname: path3.substring(0, hasQuery ? queryIndex : hashIndex),
                query: hasQuery ? path3.substring(queryIndex, hashIndex > -1 ? hashIndex : void 0) : "",
                hash: hashIndex > -1 ? path3.slice(hashIndex) : ""
              };
            }
            return {
              pathname: path3,
              query: "",
              hash: ""
            };
          };
          __turbopack_context__.s({
            "parsePath": () => parsePath
          });
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let addPathPrefix = function(path3, prefix) {
            if (!path3.startsWith("/") || !prefix) {
              return path3;
            }
            const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path3);
            return "" + prefix + pathname + query + hash;
          };
          __turbopack_context__.s({
            "addPathPrefix": () => addPathPrefix
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let addPathSuffix = function(path3, suffix) {
            if (!path3.startsWith("/") || !suffix) {
              return path3;
            }
            const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path3);
            return "" + pathname + suffix + query + hash;
          };
          __turbopack_context__.s({
            "addPathSuffix": () => addPathSuffix
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let pathHasPrefix = function(path3, prefix) {
            if (typeof path3 !== "string") {
              return false;
            }
            const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path3);
            return pathname === prefix || pathname.startsWith(prefix + "/");
          };
          __turbopack_context__.s({
            "pathHasPrefix": () => pathHasPrefix
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let addLocale = function(path3, locale, defaultLocale, ignorePrefix) {
            if (!locale || locale === defaultLocale) return path3;
            const lower = path3.toLowerCase();
            if (!ignorePrefix) {
              if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, "/api")) return path3;
              if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, "/" + locale.toLowerCase())) return path3;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(path3, "/" + locale);
          };
          __turbopack_context__.s({
            "addLocale": () => addLocale
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let formatNextPathnameInfo = function(info) {
            let pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addLocale"])(info.pathname, info.locale, info.buildId ? void 0 : info.defaultLocale, info.ignorePrefix);
            if (info.buildId || !info.trailingSlash) {
              pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
            }
            if (info.buildId) {
              pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathSuffix"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
            }
            pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, info.basePath);
            return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathSuffix"])(pathname, "/") : pathname : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
          };
          __turbopack_context__.s({
            "formatNextPathnameInfo": () => formatNextPathnameInfo
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getHostname = function(parsed, headers) {
            let hostname;
            if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
              hostname = headers.host.toString().split(":", 1)[0];
            } else if (parsed.hostname) {
              hostname = parsed.hostname;
            } else return;
            return hostname.toLowerCase();
          };
          __turbopack_context__.s({
            "getHostname": () => getHostname
          });
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let normalizeLocalePath = function(pathname, locales) {
            if (!locales) return {
              pathname
            };
            let lowercasedLocales = cache.get(locales);
            if (!lowercasedLocales) {
              lowercasedLocales = locales.map((locale) => locale.toLowerCase());
              cache.set(locales, lowercasedLocales);
            }
            let detectedLocale;
            const segments = pathname.split("/", 2);
            if (!segments[1]) return {
              pathname
            };
            const segment = segments[1].toLowerCase();
            const index = lowercasedLocales.indexOf(segment);
            if (index < 0) return {
              pathname
            };
            detectedLocale = locales[index];
            pathname = pathname.slice(detectedLocale.length + 1) || "/";
            return {
              pathname,
              detectedLocale
            };
          };
          __turbopack_context__.s({
            "normalizeLocalePath": () => normalizeLocalePath
          });
          const cache = /* @__PURE__ */ new WeakMap();
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let removePathPrefix = function(path3, prefix) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(path3, prefix)) {
              return path3;
            }
            const withoutPrefix = path3.slice(prefix.length);
            if (withoutPrefix.startsWith("/")) {
              return withoutPrefix;
            }
            return "/" + withoutPrefix;
          };
          __turbopack_context__.s({
            "removePathPrefix": () => removePathPrefix
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getNextPathnameInfo = function(pathname, options) {
            var _options_nextConfig;
            const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
            const info = {
              pathname,
              trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
            };
            if (basePath && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(info.pathname, basePath)) {
              info.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removePathPrefix"])(info.pathname, basePath);
              info.basePath = basePath;
            }
            let pathnameNoDataPrefix = info.pathname;
            if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
              const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              const buildId = paths[0];
              info.buildId = buildId;
              pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
              if (options.parseData === true) {
                info.pathname = pathnameNoDataPrefix;
              }
            }
            if (i18n) {
              let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(info.pathname, i18n.locales);
              info.locale = result.detectedLocale;
              var _result_pathname;
              info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
              if (!result.detectedLocale && info.buildId) {
                result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(pathnameNoDataPrefix, i18n.locales);
                if (result.detectedLocale) {
                  info.locale = result.detectedLocale;
                }
              }
            }
            return info;
          };
          __turbopack_context__.s({
            "getNextPathnameInfo": () => getNextPathnameInfo
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let parseURL = function(url, base) {
            return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
          };
          __turbopack_context__.s({
            "NextURL": () => NextURL
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
          const Internal = Symbol("NextURLInternal");
          class NextURL {
            constructor(input, baseOrOpts, opts) {
              let base;
              let options;
              if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
                base = baseOrOpts;
                options = opts || {};
              } else {
                options = opts || baseOrOpts || {};
              }
              this[Internal] = {
                url: parseURL(input, base ?? options.base),
                options,
                basePath: ""
              };
              this.analyze();
            }
            analyze() {
              var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
              const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNextPathnameInfo"])(this[Internal].url.pathname, {
                nextConfig: this[Internal].options.nextConfig,
                parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
                i18nProvider: this[Internal].options.i18nProvider
              });
              const hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHostname"])(this[Internal].url, this[Internal].options.headers);
              this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["detectDomainLocale"])((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
              const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
              this[Internal].url.pathname = info.pathname;
              this[Internal].defaultLocale = defaultLocale;
              this[Internal].basePath = info.basePath ?? "";
              this[Internal].buildId = info.buildId;
              this[Internal].locale = info.locale ?? defaultLocale;
              this[Internal].trailingSlash = info.trailingSlash;
            }
            formatPathname() {
              return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatNextPathnameInfo"])({
                basePath: this[Internal].basePath,
                buildId: this[Internal].buildId,
                defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : void 0,
                locale: this[Internal].locale,
                pathname: this[Internal].url.pathname,
                trailingSlash: this[Internal].trailingSlash
              });
            }
            formatSearch() {
              return this[Internal].url.search;
            }
            get buildId() {
              return this[Internal].buildId;
            }
            set buildId(buildId) {
              this[Internal].buildId = buildId;
            }
            get locale() {
              return this[Internal].locale ?? "";
            }
            set locale(locale) {
              var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
              if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
                throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                  value: "E597",
                  enumerable: false,
                  configurable: true
                });
              }
              this[Internal].locale = locale;
            }
            get defaultLocale() {
              return this[Internal].defaultLocale;
            }
            get domainLocale() {
              return this[Internal].domainLocale;
            }
            get searchParams() {
              return this[Internal].url.searchParams;
            }
            get host() {
              return this[Internal].url.host;
            }
            set host(value) {
              this[Internal].url.host = value;
            }
            get hostname() {
              return this[Internal].url.hostname;
            }
            set hostname(value) {
              this[Internal].url.hostname = value;
            }
            get port() {
              return this[Internal].url.port;
            }
            set port(value) {
              this[Internal].url.port = value;
            }
            get protocol() {
              return this[Internal].url.protocol;
            }
            set protocol(value) {
              this[Internal].url.protocol = value;
            }
            get href() {
              const pathname = this.formatPathname();
              const search = this.formatSearch();
              return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
            }
            set href(url) {
              this[Internal].url = parseURL(url);
              this.analyze();
            }
            get origin() {
              return this[Internal].url.origin;
            }
            get pathname() {
              return this[Internal].url.pathname;
            }
            set pathname(value) {
              this[Internal].url.pathname = value;
            }
            get hash() {
              return this[Internal].url.hash;
            }
            set hash(value) {
              this[Internal].url.hash = value;
            }
            get search() {
              return this[Internal].url.search;
            }
            set search(value) {
              this[Internal].url.search = value;
            }
            get password() {
              return this[Internal].url.password;
            }
            set password(value) {
              this[Internal].url.password = value;
            }
            get username() {
              return this[Internal].url.username;
            }
            set username(value) {
              this[Internal].url.username = value;
            }
            get basePath() {
              return this[Internal].basePath;
            }
            set basePath(value) {
              this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
            }
            toString() {
              return this.href;
            }
            toJSON() {
              return this.href;
            }
            [Symbol.for("edge-runtime.inspect.custom")]() {
              return {
                href: this.href,
                origin: this.origin,
                protocol: this.protocol,
                username: this.username,
                password: this.password,
                host: this.host,
                hostname: this.hostname,
                port: this.port,
                pathname: this.pathname,
                search: this.search,
                searchParams: this.searchParams,
                hash: this.hash
              };
            }
            clone() {
              return new NextURL(String(this), this[Internal].options);
            }
          }
        }
      },
      "[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          let stringifyCookie2 = function(c) {
            var _a;
            const attrs = [
              "path" in c && c.path && `Path=${c.path}`,
              "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
              "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
              "domain" in c && c.domain && `Domain=${c.domain}`,
              "secure" in c && c.secure && "Secure",
              "httpOnly" in c && c.httpOnly && "HttpOnly",
              "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
              "partitioned" in c && c.partitioned && "Partitioned",
              "priority" in c && c.priority && `Priority=${c.priority}`
            ].filter(Boolean);
            const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
            return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
          }, parseCookie2 = function(cookie) {
            const map = /* @__PURE__ */ new Map();
            for (const pair of cookie.split(/; */)) {
              if (!pair) continue;
              const splitAt = pair.indexOf("=");
              if (splitAt === -1) {
                map.set(pair, "true");
                continue;
              }
              const [key, value] = [
                pair.slice(0, splitAt),
                pair.slice(splitAt + 1)
              ];
              try {
                map.set(key, decodeURIComponent(value != null ? value : "true"));
              } catch {
              }
            }
            return map;
          }, parseSetCookie2 = function(setCookie) {
            if (!setCookie) {
              return void 0;
            }
            const [[name, value], ...attributes] = parseCookie2(setCookie);
            const { domain, expires, httponly, maxage, path: path3, samesite, secure, partitioned, priority } = Object.fromEntries(attributes.map(([key, value2]) => [
              key.toLowerCase().replace(/-/g, ""),
              value2
            ]));
            const cookie = {
              name,
              value: decodeURIComponent(value),
              domain,
              ...expires && {
                expires: new Date(expires)
              },
              ...httponly && {
                httpOnly: true
              },
              ...typeof maxage === "string" && {
                maxAge: Number(maxage)
              },
              path: path3,
              ...samesite && {
                sameSite: parseSameSite2(samesite)
              },
              ...secure && {
                secure: true
              },
              ...priority && {
                priority: parsePriority2(priority)
              },
              ...partitioned && {
                partitioned: true
              }
            };
            return compact2(cookie);
          }, compact2 = function(t) {
            const newT = {};
            for (const key in t) {
              if (t[key]) {
                newT[key] = t[key];
              }
            }
            return newT;
          }, parseSameSite2 = function(string) {
            string = string.toLowerCase();
            return SAME_SITE.includes(string) ? string : void 0;
          }, parsePriority2 = function(string) {
            string = string.toLowerCase();
            return PRIORITY.includes(string) ? string : void 0;
          }, splitCookiesString2 = function(cookiesString) {
            if (!cookiesString) return [];
            var cookiesStrings = [];
            var pos = 0;
            var start;
            var ch;
            var lastComma;
            var nextStart;
            var cookiesSeparatorFound;
            function skipWhitespace() {
              while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
                pos += 1;
              }
              return pos < cookiesString.length;
            }
            function notSpecialChar() {
              ch = cookiesString.charAt(pos);
              return ch !== "=" && ch !== ";" && ch !== ",";
            }
            while (pos < cookiesString.length) {
              start = pos;
              cookiesSeparatorFound = false;
              while (skipWhitespace()) {
                ch = cookiesString.charAt(pos);
                if (ch === ",") {
                  lastComma = pos;
                  pos += 1;
                  skipWhitespace();
                  nextStart = pos;
                  while (pos < cookiesString.length && notSpecialChar()) {
                    pos += 1;
                  }
                  if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                  } else {
                    pos = lastComma + 1;
                  }
                } else {
                  pos += 1;
                }
              }
              if (!cookiesSeparatorFound || pos >= cookiesString.length) {
                cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
              }
            }
            return cookiesStrings;
          }, replace2 = function(bag, headers) {
            headers.delete("set-cookie");
            for (const [, value] of bag) {
              const serialized = stringifyCookie2(value);
              headers.append("set-cookie", serialized);
            }
          }, normalizeCookie2 = function(cookie = {
            name: "",
            value: ""
          }) {
            if (typeof cookie.expires === "number") {
              cookie.expires = new Date(cookie.expires);
            }
            if (cookie.maxAge) {
              cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
            }
            if (cookie.path === null || cookie.path === void 0) {
              cookie.path = "/";
            }
            return cookie;
          };
          var stringifyCookie = stringifyCookie2, parseCookie = parseCookie2, parseSetCookie = parseSetCookie2, compact = compact2, parseSameSite = parseSameSite2, parsePriority = parsePriority2, splitCookiesString = splitCookiesString2, replace = replace2, normalizeCookie = normalizeCookie2;
          "use strict";
          var __defProp2 = Object.defineProperty;
          var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
          var __getOwnPropNames2 = Object.getOwnPropertyNames;
          var __hasOwnProp2 = Object.prototype.hasOwnProperty;
          var __export2 = (target, all) => {
            for (var name in all) __defProp2(target, name, {
              get: all[name],
              enumerable: true
            });
          };
          var __copyProps2 = (to, from, except, desc) => {
            if (from && typeof from === "object" || typeof from === "function") {
              for (let key of __getOwnPropNames2(from)) if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
                get: () => from[key],
                enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
              });
            }
            return to;
          };
          var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", {
            value: true
          }), mod);
          var src_exports = {};
          __export2(src_exports, {
            RequestCookies: () => RequestCookies,
            ResponseCookies: () => ResponseCookies,
            parseCookie: () => parseCookie2,
            parseSetCookie: () => parseSetCookie2,
            stringifyCookie: () => stringifyCookie2
          });
          module2.exports = __toCommonJS2(src_exports);
          var SAME_SITE = [
            "strict",
            "lax",
            "none"
          ];
          var PRIORITY = [
            "low",
            "medium",
            "high"
          ];
          var RequestCookies = class {
            constructor(requestHeaders) {
              this._parsed = /* @__PURE__ */ new Map();
              this._headers = requestHeaders;
              const header = requestHeaders.get("cookie");
              if (header) {
                const parsed = parseCookie2(header);
                for (const [name, value] of parsed) {
                  this._parsed.set(name, {
                    name,
                    value
                  });
                }
              }
            }
            [Symbol.iterator]() {
              return this._parsed[Symbol.iterator]();
            }
            /**
            * The amount of cookies received from the client
            */
            get size() {
              return this._parsed.size;
            }
            get(...args) {
              const name = typeof args[0] === "string" ? args[0] : args[0].name;
              return this._parsed.get(name);
            }
            getAll(...args) {
              var _a;
              const all = Array.from(this._parsed);
              if (!args.length) {
                return all.map(([_, value]) => value);
              }
              const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
              return all.filter(([n]) => n === name).map(([_, value]) => value);
            }
            has(name) {
              return this._parsed.has(name);
            }
            set(...args) {
              const [name, value] = args.length === 1 ? [
                args[0].name,
                args[0].value
              ] : args;
              const map = this._parsed;
              map.set(name, {
                name,
                value
              });
              this._headers.set("cookie", Array.from(map).map(([_, value2]) => stringifyCookie2(value2)).join("; "));
              return this;
            }
            /**
            * Delete the cookies matching the passed name or names in the request.
            */
            delete(names) {
              const map = this._parsed;
              const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
              this._headers.set("cookie", Array.from(map).map(([_, value]) => stringifyCookie2(value)).join("; "));
              return result;
            }
            /**
            * Delete all the cookies in the cookies in the request.
            */
            clear() {
              this.delete(Array.from(this._parsed.keys()));
              return this;
            }
            /**
            * Format the cookies in the request as a string for logging
            */
            [Symbol.for("edge-runtime.inspect.custom")]() {
              return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
            }
            toString() {
              return [
                ...this._parsed.values()
              ].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
            }
          };
          var ResponseCookies = class {
            constructor(responseHeaders) {
              this._parsed = /* @__PURE__ */ new Map();
              var _a, _b, _c;
              this._headers = responseHeaders;
              const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
              const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString2(setCookie);
              for (const cookieString of cookieStrings) {
                const parsed = parseSetCookie2(cookieString);
                if (parsed) this._parsed.set(parsed.name, parsed);
              }
            }
            /**
            * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
            */
            get(...args) {
              const key = typeof args[0] === "string" ? args[0] : args[0].name;
              return this._parsed.get(key);
            }
            /**
            * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
            */
            getAll(...args) {
              var _a;
              const all = Array.from(this._parsed.values());
              if (!args.length) {
                return all;
              }
              const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
              return all.filter((c) => c.name === key);
            }
            has(name) {
              return this._parsed.has(name);
            }
            /**
            * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
            */
            set(...args) {
              const [name, value, cookie] = args.length === 1 ? [
                args[0].name,
                args[0].value,
                args[0]
              ] : args;
              const map = this._parsed;
              map.set(name, normalizeCookie2({
                name,
                value,
                ...cookie
              }));
              replace2(map, this._headers);
              return this;
            }
            /**
            * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
            */
            delete(...args) {
              const [name, options] = typeof args[0] === "string" ? [
                args[0]
              ] : [
                args[0].name,
                args[0]
              ];
              return this.set({
                ...options,
                name,
                value: "",
                expires: /* @__PURE__ */ new Date(0)
              });
            }
            [Symbol.for("edge-runtime.inspect.custom")]() {
              return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
            }
            toString() {
              return [
                ...this._parsed.values()
              ].map(stringifyCookie2).join("; ");
            }
          };
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "INTERNALS": () => INTERNALS,
            "NextRequest": () => NextRequest
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          const INTERNALS = Symbol("internal request");
          class NextRequest extends Request {
            constructor(input, init = {}) {
              const url = typeof input !== "string" && "url" in input ? input.url : String(input);
              (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(url);
              if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
              }
              if (input instanceof Request) super(input, init);
              else super(url, init);
              const nextUrl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](url, {
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(this.headers),
                nextConfig: init.nextConfig
              });
              this[INTERNALS] = {
                cookies: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](this.headers),
                nextUrl,
                url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url : nextUrl.toString()
              };
            }
            [Symbol.for("edge-runtime.inspect.custom")]() {
              return {
                cookies: this.cookies,
                nextUrl: this.nextUrl,
                url: this.url,
                // rest of props come from Request
                bodyUsed: this.bodyUsed,
                cache: this.cache,
                credentials: this.credentials,
                destination: this.destination,
                headers: Object.fromEntries(this.headers),
                integrity: this.integrity,
                keepalive: this.keepalive,
                method: this.method,
                mode: this.mode,
                redirect: this.redirect,
                referrer: this.referrer,
                referrerPolicy: this.referrerPolicy,
                signal: this.signal
              };
            }
            get cookies() {
              return this[INTERNALS].cookies;
            }
            get nextUrl() {
              return this[INTERNALS].nextUrl;
            }
            /**
            * @deprecated
            * `page` has been deprecated in favour of `URLPattern`.
            * Read more: https://nextjs.org/docs/messages/middleware-request-page
            */
            get page() {
              throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RemovedPageError"]();
            }
            /**
            * @deprecated
            * `ua` has been removed in favour of \`userAgent\` function.
            * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
            */
            get ua() {
              throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RemovedUAError"]();
            }
            get url() {
              return this[INTERNALS].url;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "ReflectAdapter": () => ReflectAdapter
          });
          class ReflectAdapter {
            static get(target, prop, receiver) {
              const value = Reflect.get(target, prop, receiver);
              if (typeof value === "function") {
                return value.bind(target);
              }
              return value;
            }
            static set(target, prop, value, receiver) {
              return Reflect.set(target, prop, value, receiver);
            }
            static has(target, prop) {
              return Reflect.has(target, prop);
            }
            static deleteProperty(target, prop) {
              return Reflect.deleteProperty(target, prop);
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let handleMiddlewareField = function(init, headers) {
            var _init_request;
            if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
              if (!(init.request.headers instanceof Headers)) {
                throw Object.defineProperty(new Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", {
                  value: "E119",
                  enumerable: false,
                  configurable: true
                });
              }
              const keys = [];
              for (const [key, value] of init.request.headers) {
                headers.set("x-middleware-request-" + key, value);
                keys.push(key);
              }
              headers.set("x-middleware-override-headers", keys.join(","));
            }
          };
          __turbopack_context__.s({
            "NextResponse": () => NextResponse
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          const INTERNALS = Symbol("internal response");
          const REDIRECTS = /* @__PURE__ */ new Set([
            301,
            302,
            303,
            307,
            308
          ]);
          class NextResponse extends Response {
            constructor(body, init = {}) {
              super(body, init);
              const headers = this.headers;
              const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
              const cookiesProxy = new Proxy(cookies, {
                get(target, prop, receiver) {
                  switch (prop) {
                    case "delete":
                    case "set": {
                      return (...args) => {
                        const result = Reflect.apply(target[prop], target, args);
                        const newHeaders = new Headers(headers);
                        if (result instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"]) {
                          headers.set("x-middleware-set-cookie", result.getAll().map((cookie) => (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringifyCookie"])(cookie)).join(","));
                        }
                        handleMiddlewareField(init, newHeaders);
                        return result;
                      };
                    }
                    default:
                      return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                  }
                }
              });
              this[INTERNALS] = {
                cookies: cookiesProxy,
                url: init.url ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](init.url, {
                  headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(headers),
                  nextConfig: init.nextConfig
                }) : void 0
              };
            }
            [Symbol.for("edge-runtime.inspect.custom")]() {
              return {
                cookies: this.cookies,
                url: this.url,
                // rest of props come from Response
                body: this.body,
                bodyUsed: this.bodyUsed,
                headers: Object.fromEntries(this.headers),
                ok: this.ok,
                redirected: this.redirected,
                status: this.status,
                statusText: this.statusText,
                type: this.type
              };
            }
            get cookies() {
              return this[INTERNALS].cookies;
            }
            static json(body, init) {
              const response = Response.json(body, init);
              return new NextResponse(response.body, response);
            }
            static redirect(url, init) {
              const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
              if (!REDIRECTS.has(status)) {
                throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
                  value: "E529",
                  enumerable: false,
                  configurable: true
                });
              }
              const initObj = typeof init === "object" ? init : {};
              const headers = new Headers(initObj == null ? void 0 : initObj.headers);
              headers.set("Location", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(url));
              return new NextResponse(null, {
                ...initObj,
                headers,
                status
              });
            }
            static rewrite(destination, init) {
              const headers = new Headers(init == null ? void 0 : init.headers);
              headers.set("x-middleware-rewrite", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(destination));
              handleMiddlewareField(init, headers);
              return new NextResponse(null, {
                ...init,
                headers
              });
            }
            static next(init) {
              const headers = new Headers(init == null ? void 0 : init.headers);
              headers.set("x-middleware-next", "1");
              handleMiddlewareField(init, headers);
              return new NextResponse(null, {
                ...init,
                headers
              });
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let parseRelativeURL = function(url, base) {
            const baseURL = typeof base === "string" ? new URL(base) : base;
            const relative = new URL(url, base);
            const isRelative = relative.origin === baseURL.origin;
            return {
              url: isRelative ? relative.toString().slice(baseURL.origin.length) : relative.toString(),
              isRelative
            };
          }, getRelativeURL = function(url, base) {
            const relative = parseRelativeURL(url, base);
            return relative.url;
          };
          __turbopack_context__.s({
            "getRelativeURL": () => getRelativeURL,
            "parseRelativeURL": () => parseRelativeURL
          });
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "ACTION_HEADER": () => ACTION_HEADER,
            "FLIGHT_HEADERS": () => FLIGHT_HEADERS,
            "NEXT_DID_POSTPONE_HEADER": () => NEXT_DID_POSTPONE_HEADER,
            "NEXT_HMR_REFRESH_HASH_COOKIE": () => NEXT_HMR_REFRESH_HASH_COOKIE,
            "NEXT_HMR_REFRESH_HEADER": () => NEXT_HMR_REFRESH_HEADER,
            "NEXT_IS_PRERENDER_HEADER": () => NEXT_IS_PRERENDER_HEADER,
            "NEXT_REWRITTEN_PATH_HEADER": () => NEXT_REWRITTEN_PATH_HEADER,
            "NEXT_REWRITTEN_QUERY_HEADER": () => NEXT_REWRITTEN_QUERY_HEADER,
            "NEXT_ROUTER_PREFETCH_HEADER": () => NEXT_ROUTER_PREFETCH_HEADER,
            "NEXT_ROUTER_SEGMENT_PREFETCH_HEADER": () => NEXT_ROUTER_SEGMENT_PREFETCH_HEADER,
            "NEXT_ROUTER_STALE_TIME_HEADER": () => NEXT_ROUTER_STALE_TIME_HEADER,
            "NEXT_ROUTER_STATE_TREE_HEADER": () => NEXT_ROUTER_STATE_TREE_HEADER,
            "NEXT_RSC_UNION_QUERY": () => NEXT_RSC_UNION_QUERY,
            "NEXT_URL": () => NEXT_URL,
            "RSC_CONTENT_TYPE_HEADER": () => RSC_CONTENT_TYPE_HEADER,
            "RSC_HEADER": () => RSC_HEADER
          });
          const RSC_HEADER = "RSC";
          const ACTION_HEADER = "Next-Action";
          const NEXT_ROUTER_STATE_TREE_HEADER = "Next-Router-State-Tree";
          const NEXT_ROUTER_PREFETCH_HEADER = "Next-Router-Prefetch";
          const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "Next-Router-Segment-Prefetch";
          const NEXT_HMR_REFRESH_HEADER = "Next-HMR-Refresh";
          const NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
          const NEXT_URL = "Next-Url";
          const RSC_CONTENT_TYPE_HEADER = "text/x-component";
          const FLIGHT_HEADERS = [
            RSC_HEADER,
            NEXT_ROUTER_STATE_TREE_HEADER,
            NEXT_ROUTER_PREFETCH_HEADER,
            NEXT_HMR_REFRESH_HEADER,
            NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
          ];
          const NEXT_RSC_UNION_QUERY = "_rsc";
          const NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
          const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
          const NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
          const NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
          const NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
        }
      },
      "[project]/node_modules/next/dist/esm/server/internal-utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let stripInternalQueries = function(query) {
            for (const name of INTERNAL_QUERY_NAMES) {
              delete query[name];
            }
          }, stripInternalSearchParams = function(url) {
            const isStringUrl = typeof url === "string";
            const instance = isStringUrl ? new URL(url) : url;
            instance.searchParams.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]);
            return isStringUrl ? instance.toString() : instance;
          };
          __turbopack_context__.s({
            "stripInternalQueries": () => stripInternalQueries,
            "stripInternalSearchParams": () => stripInternalSearchParams
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
          ;
          const INTERNAL_QUERY_NAMES = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]
          ];
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let ensureLeadingSlash = function(path3) {
            return path3.startsWith("/") ? path3 : "/" + path3;
          };
          __turbopack_context__.s({
            "ensureLeadingSlash": () => ensureLeadingSlash
          });
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/segment.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isGroupSegment = function(segment) {
            return segment[0] === "(" && segment.endsWith(")");
          }, isParallelRouteSegment = function(segment) {
            return segment.startsWith("@") && segment !== "@children";
          }, addSearchParamsIfPageSegment = function(segment, searchParams) {
            const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
            if (isPageSegment) {
              const stringifiedQuery = JSON.stringify(searchParams);
              return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
            }
            return segment;
          };
          __turbopack_context__.s({
            "DEFAULT_SEGMENT_KEY": () => DEFAULT_SEGMENT_KEY,
            "PAGE_SEGMENT_KEY": () => PAGE_SEGMENT_KEY,
            "addSearchParamsIfPageSegment": () => addSearchParamsIfPageSegment,
            "isGroupSegment": () => isGroupSegment,
            "isParallelRouteSegment": () => isParallelRouteSegment
          });
          const PAGE_SEGMENT_KEY = "__PAGE__";
          const DEFAULT_SEGMENT_KEY = "__DEFAULT__";
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let normalizeAppPath = function(route) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ensureLeadingSlash"])(route.split("/").reduce((pathname, segment, index, segments) => {
              if (!segment) {
                return pathname;
              }
              if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isGroupSegment"])(segment)) {
                return pathname;
              }
              if (segment[0] === "@") {
                return pathname;
              }
              if ((segment === "page" || segment === "route") && index === segments.length - 1) {
                return pathname;
              }
              return pathname + "/" + segment;
            }, ""));
          }, normalizeRscURL = function(url) {
            return url.replace(/\.rsc($|\?)/, "$1");
          };
          __turbopack_context__.s({
            "normalizeAppPath": () => normalizeAppPath,
            "normalizeRscURL": () => normalizeRscURL
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/segment.js [middleware-edge] (ecmascript)");
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "HeadersAdapter": () => HeadersAdapter,
            "ReadonlyHeadersError": () => ReadonlyHeadersError
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
          ;
          class ReadonlyHeadersError extends Error {
            constructor() {
              super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
            }
            static callable() {
              throw new ReadonlyHeadersError();
            }
          }
          class HeadersAdapter extends Headers {
            constructor(headers) {
              super();
              this.headers = new Proxy(headers, {
                get(target, prop, receiver) {
                  if (typeof prop === "symbol") {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                  }
                  const lowercased = prop.toLowerCase();
                  const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
                  if (typeof original === "undefined") return;
                  return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
                },
                set(target, prop, value, receiver) {
                  if (typeof prop === "symbol") {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                  }
                  const lowercased = prop.toLowerCase();
                  const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
                  return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
                },
                has(target, prop) {
                  if (typeof prop === "symbol") return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                  const lowercased = prop.toLowerCase();
                  const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
                  if (typeof original === "undefined") return false;
                  return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
                },
                deleteProperty(target, prop) {
                  if (typeof prop === "symbol") return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                  const lowercased = prop.toLowerCase();
                  const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
                  if (typeof original === "undefined") return true;
                  return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
                }
              });
            }
            /**
            * Seals a Headers instance to prevent modification by throwing an error when
            * any mutating method is called.
            */
            static seal(headers) {
              return new Proxy(headers, {
                get(target, prop, receiver) {
                  switch (prop) {
                    case "append":
                    case "delete":
                    case "set":
                      return ReadonlyHeadersError.callable;
                    default:
                      return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                  }
                }
              });
            }
            /**
            * Merges a header value into a string. This stores multiple values as an
            * array, so we need to merge them into a string.
            *
            * @param value a header value
            * @returns a merged header value (a string)
            */
            merge(value) {
              if (Array.isArray(value)) return value.join(", ");
              return value;
            }
            /**
            * Creates a Headers instance from a plain object or a Headers instance.
            *
            * @param headers a plain object or a Headers instance
            * @returns a headers instance
            */
            static from(headers) {
              if (headers instanceof Headers) return headers;
              return new HeadersAdapter(headers);
            }
            append(name, value) {
              const existing = this.headers[name];
              if (typeof existing === "string") {
                this.headers[name] = [
                  existing,
                  value
                ];
              } else if (Array.isArray(existing)) {
                existing.push(value);
              } else {
                this.headers[name] = value;
              }
            }
            delete(name) {
              delete this.headers[name];
            }
            get(name) {
              const value = this.headers[name];
              if (typeof value !== "undefined") return this.merge(value);
              return null;
            }
            has(name) {
              return typeof this.headers[name] !== "undefined";
            }
            set(name, value) {
              this.headers[name] = value;
            }
            forEach(callbackfn, thisArg) {
              for (const [name, value] of this.entries()) {
                callbackfn.call(thisArg, value, name, this);
              }
            }
            *entries() {
              for (const key of Object.keys(this.headers)) {
                const name = key.toLowerCase();
                const value = this.get(name);
                yield [
                  name,
                  value
                ];
              }
            }
            *keys() {
              for (const key of Object.keys(this.headers)) {
                const name = key.toLowerCase();
                yield name;
              }
            }
            *values() {
              for (const key of Object.keys(this.headers)) {
                const value = this.get(key);
                yield value;
              }
            }
            [Symbol.iterator]() {
              return this.entries();
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createAsyncLocalStorage = function() {
            if (maybeGlobalAsyncLocalStorage) {
              return new maybeGlobalAsyncLocalStorage();
            }
            return new FakeAsyncLocalStorage();
          }, bindSnapshot = function(fn) {
            if (maybeGlobalAsyncLocalStorage) {
              return maybeGlobalAsyncLocalStorage.bind(fn);
            }
            return FakeAsyncLocalStorage.bind(fn);
          }, createSnapshot = function() {
            if (maybeGlobalAsyncLocalStorage) {
              return maybeGlobalAsyncLocalStorage.snapshot();
            }
            return function(fn, ...args) {
              return fn(...args);
            };
          };
          __turbopack_context__.s({
            "bindSnapshot": () => bindSnapshot,
            "createAsyncLocalStorage": () => createAsyncLocalStorage,
            "createSnapshot": () => createSnapshot
          });
          const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
            value: "E504",
            enumerable: false,
            configurable: true
          });
          class FakeAsyncLocalStorage {
            disable() {
              throw sharedAsyncLocalStorageNotAvailableError;
            }
            getStore() {
              return void 0;
            }
            run() {
              throw sharedAsyncLocalStorageNotAvailableError;
            }
            exit() {
              throw sharedAsyncLocalStorageNotAvailableError;
            }
            enterWith() {
              throw sharedAsyncLocalStorageNotAvailableError;
            }
            static bind(fn) {
              return fn;
            }
          }
          const maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "workAsyncStorageInstance": () => workAsyncStorageInstance
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
          ;
          const workAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])();
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "workAsyncStorage": () => __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workAsyncStorageInstance"]
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "workUnitAsyncStorageInstance": () => workUnitAsyncStorageInstance
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
          ;
          const workUnitAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])();
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getExpectedRequestStore = function(callingExpression) {
            const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workUnitAsyncStorageInstance"].getStore();
            if (!workUnitStore) {
              throwForMissingRequestStore(callingExpression);
            }
            switch (workUnitStore.type) {
              case "request":
                return workUnitStore;
              case "prerender":
              case "prerender-ppr":
              case "prerender-legacy":
                throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
                  value: "E401",
                  enumerable: false,
                  configurable: true
                });
              case "cache":
                throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                  value: "E37",
                  enumerable: false,
                  configurable: true
                });
              case "unstable-cache":
                throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                  value: "E69",
                  enumerable: false,
                  configurable: true
                });
              default:
                const _exhaustiveCheck = workUnitStore;
                return _exhaustiveCheck;
            }
          }, throwForMissingRequestStore = function(callingExpression) {
            throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
              value: "E251",
              enumerable: false,
              configurable: true
            });
          }, getPrerenderResumeDataCache = function(workUnitStore) {
            if (workUnitStore.type === "prerender" || workUnitStore.type === "prerender-ppr") {
              return workUnitStore.prerenderResumeDataCache;
            }
            return null;
          }, getRenderResumeDataCache = function(workUnitStore) {
            if (workUnitStore.type !== "prerender-legacy" && workUnitStore.type !== "cache" && workUnitStore.type !== "unstable-cache") {
              if (workUnitStore.type === "request") {
                return workUnitStore.renderResumeDataCache;
              }
              return workUnitStore.prerenderResumeDataCache;
            }
            return null;
          }, getHmrRefreshHash = function(workStore, workUnitStore) {
            var _workUnitStore_cookies_get;
            if (!workStore.dev) {
              return void 0;
            }
            return workUnitStore.type === "cache" || workUnitStore.type === "prerender" ? workUnitStore.hmrRefreshHash : workUnitStore.type === "request" ? (_workUnitStore_cookies_get = workUnitStore.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_HMR_REFRESH_HASH_COOKIE"])) == null ? void 0 : _workUnitStore_cookies_get.value : void 0;
          }, getDraftModeProviderForCacheScope = function(workStore, workUnitStore) {
            if (workStore.isDraftMode) {
              switch (workUnitStore.type) {
                case "cache":
                case "unstable-cache":
                case "request":
                  return workUnitStore.draftMode;
                default:
                  return void 0;
              }
            }
            return void 0;
          };
          __turbopack_context__.s({
            "getDraftModeProviderForCacheScope": () => getDraftModeProviderForCacheScope,
            "getExpectedRequestStore": () => getExpectedRequestStore,
            "getHmrRefreshHash": () => getHmrRefreshHash,
            "getPrerenderResumeDataCache": () => getPrerenderResumeDataCache,
            "getRenderResumeDataCache": () => getRenderResumeDataCache,
            "throwForMissingRequestStore": () => throwForMissingRequestStore
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getModifiedCookieValues = function(cookies) {
            const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
            if (!modified || !Array.isArray(modified) || modified.length === 0) {
              return [];
            }
            return modified;
          }, appendMutableCookies = function(headers, mutableCookies) {
            const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
            if (modifiedCookieValues.length === 0) {
              return false;
            }
            const resCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
            const returnedCookies = resCookies.getAll();
            for (const cookie of modifiedCookieValues) {
              resCookies.set(cookie);
            }
            for (const cookie of returnedCookies) {
              resCookies.set(cookie);
            }
            return true;
          }, wrapWithMutableAccessCheck = function(responseCookies) {
            const wrappedCookies = new Proxy(responseCookies, {
              get(target, prop, receiver) {
                switch (prop) {
                  case "delete":
                    return function(...args) {
                      ensureCookiesAreStillMutable("cookies().delete");
                      target.delete(...args);
                      return wrappedCookies;
                    };
                  case "set":
                    return function(...args) {
                      ensureCookiesAreStillMutable("cookies().set");
                      target.set(...args);
                      return wrappedCookies;
                    };
                  default:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
              }
            });
            return wrappedCookies;
          }, areCookiesMutableInCurrentPhase = function(requestStore) {
            return requestStore.phase === "action";
          }, ensureCookiesAreStillMutable = function(callingExpression) {
            const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
            if (!areCookiesMutableInCurrentPhase(requestStore)) {
              throw new ReadonlyRequestCookiesError();
            }
          }, responseCookiesToRequestCookies = function(responseCookies) {
            const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers());
            for (const cookie of responseCookies.getAll()) {
              requestCookies.set(cookie);
            }
            return requestCookies;
          };
          __turbopack_context__.s({
            "MutableRequestCookiesAdapter": () => MutableRequestCookiesAdapter,
            "ReadonlyRequestCookiesError": () => ReadonlyRequestCookiesError,
            "RequestCookiesAdapter": () => RequestCookiesAdapter,
            "appendMutableCookies": () => appendMutableCookies,
            "areCookiesMutableInCurrentPhase": () => areCookiesMutableInCurrentPhase,
            "getModifiedCookieValues": () => getModifiedCookieValues,
            "responseCookiesToRequestCookies": () => responseCookiesToRequestCookies,
            "wrapWithMutableAccessCheck": () => wrapWithMutableAccessCheck
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
          ;
          ;
          ;
          ;
          ;
          class ReadonlyRequestCookiesError extends Error {
            constructor() {
              super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
            }
            static callable() {
              throw new ReadonlyRequestCookiesError();
            }
          }
          class RequestCookiesAdapter {
            static seal(cookies) {
              return new Proxy(cookies, {
                get(target, prop, receiver) {
                  switch (prop) {
                    case "clear":
                    case "delete":
                    case "set":
                      return ReadonlyRequestCookiesError.callable;
                    default:
                      return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                  }
                }
              });
            }
          }
          const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
          class MutableRequestCookiesAdapter {
            static wrap(cookies, onUpdateCookies) {
              const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
              for (const cookie of cookies.getAll()) {
                responseCookies.set(cookie);
              }
              let modifiedValues = [];
              const modifiedCookies = /* @__PURE__ */ new Set();
              const updateResponseCookies = () => {
                const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
                if (workStore) {
                  workStore.pathWasRevalidated = true;
                }
                const allCookies = responseCookies.getAll();
                modifiedValues = allCookies.filter((c) => modifiedCookies.has(c.name));
                if (onUpdateCookies) {
                  const serializedCookies = [];
                  for (const cookie of modifiedValues) {
                    const tempCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                  }
                  onUpdateCookies(serializedCookies);
                }
              };
              const wrappedCookies = new Proxy(responseCookies, {
                get(target, prop, receiver) {
                  switch (prop) {
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                      return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                      return function(...args) {
                        modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                        try {
                          target.delete(...args);
                          return wrappedCookies;
                        } finally {
                          updateResponseCookies();
                        }
                      };
                    case "set":
                      return function(...args) {
                        modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                        try {
                          target.set(...args);
                          return wrappedCookies;
                        } finally {
                          updateResponseCookies();
                        }
                      };
                    default:
                      return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                  }
                }
              });
              return wrappedCookies;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "AppRenderSpan": () => AppRenderSpan,
            "AppRouteRouteHandlersSpan": () => AppRouteRouteHandlersSpan,
            "BaseServerSpan": () => BaseServerSpan,
            "LoadComponentsSpan": () => LoadComponentsSpan,
            "LogSpanAllowList": () => LogSpanAllowList,
            "MiddlewareSpan": () => MiddlewareSpan,
            "NextNodeServerSpan": () => NextNodeServerSpan,
            "NextServerSpan": () => NextServerSpan,
            "NextVanillaSpanAllowlist": () => NextVanillaSpanAllowlist,
            "NodeSpan": () => NodeSpan,
            "RenderSpan": () => RenderSpan,
            "ResolveMetadataSpan": () => ResolveMetadataSpan,
            "RouterSpan": () => RouterSpan,
            "StartServerSpan": () => StartServerSpan
          });
          var BaseServerSpan = /* @__PURE__ */ function(BaseServerSpan2) {
            BaseServerSpan2["handleRequest"] = "BaseServer.handleRequest";
            BaseServerSpan2["run"] = "BaseServer.run";
            BaseServerSpan2["pipe"] = "BaseServer.pipe";
            BaseServerSpan2["getStaticHTML"] = "BaseServer.getStaticHTML";
            BaseServerSpan2["render"] = "BaseServer.render";
            BaseServerSpan2["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
            BaseServerSpan2["renderToResponse"] = "BaseServer.renderToResponse";
            BaseServerSpan2["renderToHTML"] = "BaseServer.renderToHTML";
            BaseServerSpan2["renderError"] = "BaseServer.renderError";
            BaseServerSpan2["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
            BaseServerSpan2["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
            BaseServerSpan2["render404"] = "BaseServer.render404";
            return BaseServerSpan2;
          }(BaseServerSpan || {});
          var LoadComponentsSpan = /* @__PURE__ */ function(LoadComponentsSpan2) {
            LoadComponentsSpan2["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
            LoadComponentsSpan2["loadComponents"] = "LoadComponents.loadComponents";
            return LoadComponentsSpan2;
          }(LoadComponentsSpan || {});
          var NextServerSpan = /* @__PURE__ */ function(NextServerSpan2) {
            NextServerSpan2["getRequestHandler"] = "NextServer.getRequestHandler";
            NextServerSpan2["getServer"] = "NextServer.getServer";
            NextServerSpan2["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
            NextServerSpan2["createServer"] = "createServer.createServer";
            return NextServerSpan2;
          }(NextServerSpan || {});
          var NextNodeServerSpan = /* @__PURE__ */ function(NextNodeServerSpan2) {
            NextNodeServerSpan2["compression"] = "NextNodeServer.compression";
            NextNodeServerSpan2["getBuildId"] = "NextNodeServer.getBuildId";
            NextNodeServerSpan2["createComponentTree"] = "NextNodeServer.createComponentTree";
            NextNodeServerSpan2["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
            NextNodeServerSpan2["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
            NextNodeServerSpan2["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
            NextNodeServerSpan2["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
            NextNodeServerSpan2["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
            NextNodeServerSpan2["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
            NextNodeServerSpan2["sendRenderResult"] = "NextNodeServer.sendRenderResult";
            NextNodeServerSpan2["proxyRequest"] = "NextNodeServer.proxyRequest";
            NextNodeServerSpan2["runApi"] = "NextNodeServer.runApi";
            NextNodeServerSpan2["render"] = "NextNodeServer.render";
            NextNodeServerSpan2["renderHTML"] = "NextNodeServer.renderHTML";
            NextNodeServerSpan2["imageOptimizer"] = "NextNodeServer.imageOptimizer";
            NextNodeServerSpan2["getPagePath"] = "NextNodeServer.getPagePath";
            NextNodeServerSpan2["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
            NextNodeServerSpan2["findPageComponents"] = "NextNodeServer.findPageComponents";
            NextNodeServerSpan2["getFontManifest"] = "NextNodeServer.getFontManifest";
            NextNodeServerSpan2["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
            NextNodeServerSpan2["getRequestHandler"] = "NextNodeServer.getRequestHandler";
            NextNodeServerSpan2["renderToHTML"] = "NextNodeServer.renderToHTML";
            NextNodeServerSpan2["renderError"] = "NextNodeServer.renderError";
            NextNodeServerSpan2["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
            NextNodeServerSpan2["render404"] = "NextNodeServer.render404";
            NextNodeServerSpan2["startResponse"] = "NextNodeServer.startResponse";
            NextNodeServerSpan2["route"] = "route";
            NextNodeServerSpan2["onProxyReq"] = "onProxyReq";
            NextNodeServerSpan2["apiResolver"] = "apiResolver";
            NextNodeServerSpan2["internalFetch"] = "internalFetch";
            return NextNodeServerSpan2;
          }(NextNodeServerSpan || {});
          var StartServerSpan = /* @__PURE__ */ function(StartServerSpan2) {
            StartServerSpan2["startServer"] = "startServer.startServer";
            return StartServerSpan2;
          }(StartServerSpan || {});
          var RenderSpan = /* @__PURE__ */ function(RenderSpan2) {
            RenderSpan2["getServerSideProps"] = "Render.getServerSideProps";
            RenderSpan2["getStaticProps"] = "Render.getStaticProps";
            RenderSpan2["renderToString"] = "Render.renderToString";
            RenderSpan2["renderDocument"] = "Render.renderDocument";
            RenderSpan2["createBodyResult"] = "Render.createBodyResult";
            return RenderSpan2;
          }(RenderSpan || {});
          var AppRenderSpan = /* @__PURE__ */ function(AppRenderSpan2) {
            AppRenderSpan2["renderToString"] = "AppRender.renderToString";
            AppRenderSpan2["renderToReadableStream"] = "AppRender.renderToReadableStream";
            AppRenderSpan2["getBodyResult"] = "AppRender.getBodyResult";
            AppRenderSpan2["fetch"] = "AppRender.fetch";
            return AppRenderSpan2;
          }(AppRenderSpan || {});
          var RouterSpan = /* @__PURE__ */ function(RouterSpan2) {
            RouterSpan2["executeRoute"] = "Router.executeRoute";
            return RouterSpan2;
          }(RouterSpan || {});
          var NodeSpan = /* @__PURE__ */ function(NodeSpan2) {
            NodeSpan2["runHandler"] = "Node.runHandler";
            return NodeSpan2;
          }(NodeSpan || {});
          var AppRouteRouteHandlersSpan = /* @__PURE__ */ function(AppRouteRouteHandlersSpan2) {
            AppRouteRouteHandlersSpan2["runHandler"] = "AppRouteRouteHandlers.runHandler";
            return AppRouteRouteHandlersSpan2;
          }(AppRouteRouteHandlersSpan || {});
          var ResolveMetadataSpan = /* @__PURE__ */ function(ResolveMetadataSpan2) {
            ResolveMetadataSpan2["generateMetadata"] = "ResolveMetadata.generateMetadata";
            ResolveMetadataSpan2["generateViewport"] = "ResolveMetadata.generateViewport";
            return ResolveMetadataSpan2;
          }(ResolveMetadataSpan || {});
          var MiddlewareSpan = /* @__PURE__ */ function(MiddlewareSpan2) {
            MiddlewareSpan2["execute"] = "Middleware.execute";
            return MiddlewareSpan2;
          }(MiddlewareSpan || {});
          const NextVanillaSpanAllowlist = [
            "Middleware.execute",
            "BaseServer.handleRequest",
            "Render.getServerSideProps",
            "Render.getStaticProps",
            "AppRender.fetch",
            "AppRender.getBodyResult",
            "Render.renderDocument",
            "Node.runHandler",
            "AppRouteRouteHandlers.runHandler",
            "ResolveMetadata.generateMetadata",
            "ResolveMetadata.generateViewport",
            "NextNodeServer.createComponentTree",
            "NextNodeServer.findPageComponents",
            "NextNodeServer.getLayoutOrPageModule",
            "NextNodeServer.startResponse",
            "NextNodeServer.clientComponentLoading"
          ];
          const LogSpanAllowList = [
            "NextNodeServer.findPageComponents",
            "NextNodeServer.createComponentTree",
            "NextNodeServer.clientComponentLoading"
          ];
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isThenable = function(promise) {
            return promise !== null && typeof promise === "object" && "then" in promise && typeof promise.then === "function";
          };
          __turbopack_context__.s({
            "isThenable": () => isThenable
          });
        }
      },
      "[project]/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          (() => {
            "use strict";
            var e = {
              491: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.ContextAPI = void 0;
                const n = r2(223);
                const a = r2(172);
                const o = r2(930);
                const i = "context";
                const c = new n.NoopContextManager();
                class ContextAPI {
                  constructor() {
                  }
                  static getInstance() {
                    if (!this._instance) {
                      this._instance = new ContextAPI();
                    }
                    return this._instance;
                  }
                  setGlobalContextManager(e3) {
                    return (0, a.registerGlobal)(i, e3, o.DiagAPI.instance());
                  }
                  active() {
                    return this._getContextManager().active();
                  }
                  with(e3, t3, r3, ...n2) {
                    return this._getContextManager().with(e3, t3, r3, ...n2);
                  }
                  bind(e3, t3) {
                    return this._getContextManager().bind(e3, t3);
                  }
                  _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                  }
                  disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                  }
                }
                t2.ContextAPI = ContextAPI;
              },
              930: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.DiagAPI = void 0;
                const n = r2(56);
                const a = r2(912);
                const o = r2(957);
                const i = r2(172);
                const c = "diag";
                class DiagAPI {
                  constructor() {
                    function _logProxy(e4) {
                      return function(...t3) {
                        const r3 = (0, i.getGlobal)("diag");
                        if (!r3) return;
                        return r3[e4](...t3);
                      };
                    }
                    const e3 = this;
                    const setLogger = (t3, r3 = {
                      logLevel: o.DiagLogLevel.INFO
                    }) => {
                      var n2, c2, s;
                      if (t3 === e3) {
                        const t4 = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                        e3.error((n2 = t4.stack) !== null && n2 !== void 0 ? n2 : t4.message);
                        return false;
                      }
                      if (typeof r3 === "number") {
                        r3 = {
                          logLevel: r3
                        };
                      }
                      const u = (0, i.getGlobal)("diag");
                      const l = (0, a.createLogLevelDiagLogger)((c2 = r3.logLevel) !== null && c2 !== void 0 ? c2 : o.DiagLogLevel.INFO, t3);
                      if (u && !r3.suppressOverrideMessage) {
                        const e4 = (s = new Error().stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                        u.warn(`Current logger will be overwritten from ${e4}`);
                        l.warn(`Current logger will overwrite one already registered from ${e4}`);
                      }
                      return (0, i.registerGlobal)("diag", l, e3, true);
                    };
                    e3.setLogger = setLogger;
                    e3.disable = () => {
                      (0, i.unregisterGlobal)(c, e3);
                    };
                    e3.createComponentLogger = (e4) => new n.DiagComponentLogger(e4);
                    e3.verbose = _logProxy("verbose");
                    e3.debug = _logProxy("debug");
                    e3.info = _logProxy("info");
                    e3.warn = _logProxy("warn");
                    e3.error = _logProxy("error");
                  }
                  static instance() {
                    if (!this._instance) {
                      this._instance = new DiagAPI();
                    }
                    return this._instance;
                  }
                }
                t2.DiagAPI = DiagAPI;
              },
              653: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.MetricsAPI = void 0;
                const n = r2(660);
                const a = r2(172);
                const o = r2(930);
                const i = "metrics";
                class MetricsAPI {
                  constructor() {
                  }
                  static getInstance() {
                    if (!this._instance) {
                      this._instance = new MetricsAPI();
                    }
                    return this._instance;
                  }
                  setGlobalMeterProvider(e3) {
                    return (0, a.registerGlobal)(i, e3, o.DiagAPI.instance());
                  }
                  getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                  }
                  getMeter(e3, t3, r3) {
                    return this.getMeterProvider().getMeter(e3, t3, r3);
                  }
                  disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                  }
                }
                t2.MetricsAPI = MetricsAPI;
              },
              181: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.PropagationAPI = void 0;
                const n = r2(172);
                const a = r2(874);
                const o = r2(194);
                const i = r2(277);
                const c = r2(369);
                const s = r2(930);
                const u = "propagation";
                const l = new a.NoopTextMapPropagator();
                class PropagationAPI {
                  constructor() {
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                  }
                  static getInstance() {
                    if (!this._instance) {
                      this._instance = new PropagationAPI();
                    }
                    return this._instance;
                  }
                  setGlobalPropagator(e3) {
                    return (0, n.registerGlobal)(u, e3, s.DiagAPI.instance());
                  }
                  inject(e3, t3, r3 = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e3, t3, r3);
                  }
                  extract(e3, t3, r3 = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e3, t3, r3);
                  }
                  fields() {
                    return this._getGlobalPropagator().fields();
                  }
                  disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                  }
                  _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                  }
                }
                t2.PropagationAPI = PropagationAPI;
              },
              997: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.TraceAPI = void 0;
                const n = r2(172);
                const a = r2(846);
                const o = r2(139);
                const i = r2(607);
                const c = r2(930);
                const s = "trace";
                class TraceAPI {
                  constructor() {
                    this._proxyTracerProvider = new a.ProxyTracerProvider();
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                  }
                  static getInstance() {
                    if (!this._instance) {
                      this._instance = new TraceAPI();
                    }
                    return this._instance;
                  }
                  setGlobalTracerProvider(e3) {
                    const t3 = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t3) {
                      this._proxyTracerProvider.setDelegate(e3);
                    }
                    return t3;
                  }
                  getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                  }
                  getTracer(e3, t3) {
                    return this.getTracerProvider().getTracer(e3, t3);
                  }
                  disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider();
                  }
                }
                t2.TraceAPI = TraceAPI;
              },
              277: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
                const n = r2(491);
                const a = r2(780);
                const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
                function getBaggage(e3) {
                  return e3.getValue(o) || void 0;
                }
                t2.getBaggage = getBaggage;
                function getActiveBaggage() {
                  return getBaggage(n.ContextAPI.getInstance().active());
                }
                t2.getActiveBaggage = getActiveBaggage;
                function setBaggage(e3, t3) {
                  return e3.setValue(o, t3);
                }
                t2.setBaggage = setBaggage;
                function deleteBaggage(e3) {
                  return e3.deleteValue(o);
                }
                t2.deleteBaggage = deleteBaggage;
              },
              993: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.BaggageImpl = void 0;
                class BaggageImpl {
                  constructor(e3) {
                    this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
                  }
                  getEntry(e3) {
                    const t3 = this._entries.get(e3);
                    if (!t3) {
                      return void 0;
                    }
                    return Object.assign({}, t3);
                  }
                  getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e3, t3]) => [
                      e3,
                      t3
                    ]);
                  }
                  setEntry(e3, t3) {
                    const r2 = new BaggageImpl(this._entries);
                    r2._entries.set(e3, t3);
                    return r2;
                  }
                  removeEntry(e3) {
                    const t3 = new BaggageImpl(this._entries);
                    t3._entries.delete(e3);
                    return t3;
                  }
                  removeEntries(...e3) {
                    const t3 = new BaggageImpl(this._entries);
                    for (const r2 of e3) {
                      t3._entries.delete(r2);
                    }
                    return t3;
                  }
                  clear() {
                    return new BaggageImpl();
                  }
                }
                t2.BaggageImpl = BaggageImpl;
              },
              830: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.baggageEntryMetadataSymbol = void 0;
                t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
              },
              369: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
                const n = r2(930);
                const a = r2(993);
                const o = r2(830);
                const i = n.DiagAPI.instance();
                function createBaggage(e3 = {}) {
                  return new a.BaggageImpl(new Map(Object.entries(e3)));
                }
                t2.createBaggage = createBaggage;
                function baggageEntryMetadataFromString(e3) {
                  if (typeof e3 !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`);
                    e3 = "";
                  }
                  return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString() {
                      return e3;
                    }
                  };
                }
                t2.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
              },
              67: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.context = void 0;
                const n = r2(491);
                t2.context = n.ContextAPI.getInstance();
              },
              223: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NoopContextManager = void 0;
                const n = r2(780);
                class NoopContextManager {
                  active() {
                    return n.ROOT_CONTEXT;
                  }
                  with(e3, t3, r3, ...n2) {
                    return t3.call(r3, ...n2);
                  }
                  bind(e3, t3) {
                    return t3;
                  }
                  enable() {
                    return this;
                  }
                  disable() {
                    return this;
                  }
                }
                t2.NoopContextManager = NoopContextManager;
              },
              780: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.ROOT_CONTEXT = t2.createContextKey = void 0;
                function createContextKey(e3) {
                  return Symbol.for(e3);
                }
                t2.createContextKey = createContextKey;
                class BaseContext {
                  constructor(e3) {
                    const t3 = this;
                    t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
                    t3.getValue = (e4) => t3._currentContext.get(e4);
                    t3.setValue = (e4, r2) => {
                      const n = new BaseContext(t3._currentContext);
                      n._currentContext.set(e4, r2);
                      return n;
                    };
                    t3.deleteValue = (e4) => {
                      const r2 = new BaseContext(t3._currentContext);
                      r2._currentContext.delete(e4);
                      return r2;
                    };
                  }
                }
                t2.ROOT_CONTEXT = new BaseContext();
              },
              506: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.diag = void 0;
                const n = r2(930);
                t2.diag = n.DiagAPI.instance();
              },
              56: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.DiagComponentLogger = void 0;
                const n = r2(172);
                class DiagComponentLogger {
                  constructor(e3) {
                    this._namespace = e3.namespace || "DiagComponentLogger";
                  }
                  debug(...e3) {
                    return logProxy("debug", this._namespace, e3);
                  }
                  error(...e3) {
                    return logProxy("error", this._namespace, e3);
                  }
                  info(...e3) {
                    return logProxy("info", this._namespace, e3);
                  }
                  warn(...e3) {
                    return logProxy("warn", this._namespace, e3);
                  }
                  verbose(...e3) {
                    return logProxy("verbose", this._namespace, e3);
                  }
                }
                t2.DiagComponentLogger = DiagComponentLogger;
                function logProxy(e3, t3, r3) {
                  const a = (0, n.getGlobal)("diag");
                  if (!a) {
                    return;
                  }
                  r3.unshift(t3);
                  return a[e3](...r3);
                }
              },
              972: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.DiagConsoleLogger = void 0;
                const r2 = [
                  {
                    n: "error",
                    c: "error"
                  },
                  {
                    n: "warn",
                    c: "warn"
                  },
                  {
                    n: "info",
                    c: "info"
                  },
                  {
                    n: "debug",
                    c: "debug"
                  },
                  {
                    n: "verbose",
                    c: "trace"
                  }
                ];
                class DiagConsoleLogger {
                  constructor() {
                    function _consoleFunc(e3) {
                      return function(...t3) {
                        if (console) {
                          let r3 = console[e3];
                          if (typeof r3 !== "function") {
                            r3 = console.log;
                          }
                          if (typeof r3 === "function") {
                            return r3.apply(console, t3);
                          }
                        }
                      };
                    }
                    for (let e3 = 0; e3 < r2.length; e3++) {
                      this[r2[e3].n] = _consoleFunc(r2[e3].c);
                    }
                  }
                }
                t2.DiagConsoleLogger = DiagConsoleLogger;
              },
              912: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.createLogLevelDiagLogger = void 0;
                const n = r2(957);
                function createLogLevelDiagLogger(e3, t3) {
                  if (e3 < n.DiagLogLevel.NONE) {
                    e3 = n.DiagLogLevel.NONE;
                  } else if (e3 > n.DiagLogLevel.ALL) {
                    e3 = n.DiagLogLevel.ALL;
                  }
                  t3 = t3 || {};
                  function _filterFunc(r3, n2) {
                    const a = t3[r3];
                    if (typeof a === "function" && e3 >= n2) {
                      return a.bind(t3);
                    }
                    return function() {
                    };
                  }
                  return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                  };
                }
                t2.createLogLevelDiagLogger = createLogLevelDiagLogger;
              },
              957: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.DiagLogLevel = void 0;
                var r2;
                (function(e3) {
                  e3[e3["NONE"] = 0] = "NONE";
                  e3[e3["ERROR"] = 30] = "ERROR";
                  e3[e3["WARN"] = 50] = "WARN";
                  e3[e3["INFO"] = 60] = "INFO";
                  e3[e3["DEBUG"] = 70] = "DEBUG";
                  e3[e3["VERBOSE"] = 80] = "VERBOSE";
                  e3[e3["ALL"] = 9999] = "ALL";
                })(r2 = t2.DiagLogLevel || (t2.DiagLogLevel = {}));
              },
              172: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
                const n = r2(200);
                const a = r2(521);
                const o = r2(130);
                const i = a.VERSION.split(".")[0];
                const c = Symbol.for(`opentelemetry.js.api.${i}`);
                const s = n._globalThis;
                function registerGlobal(e3, t3, r3, n2 = false) {
                  var o2;
                  const i2 = s[c] = (o2 = s[c]) !== null && o2 !== void 0 ? o2 : {
                    version: a.VERSION
                  };
                  if (!n2 && i2[e3]) {
                    const t4 = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
                    r3.error(t4.stack || t4.message);
                    return false;
                  }
                  if (i2.version !== a.VERSION) {
                    const t4 = new Error(`@opentelemetry/api: Registration of version v${i2.version} for ${e3} does not match previously registered API v${a.VERSION}`);
                    r3.error(t4.stack || t4.message);
                    return false;
                  }
                  i2[e3] = t3;
                  r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${a.VERSION}.`);
                  return true;
                }
                t2.registerGlobal = registerGlobal;
                function getGlobal(e3) {
                  var t3, r3;
                  const n2 = (t3 = s[c]) === null || t3 === void 0 ? void 0 : t3.version;
                  if (!n2 || !(0, o.isCompatible)(n2)) {
                    return;
                  }
                  return (r3 = s[c]) === null || r3 === void 0 ? void 0 : r3[e3];
                }
                t2.getGlobal = getGlobal;
                function unregisterGlobal(e3, t3) {
                  t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a.VERSION}.`);
                  const r3 = s[c];
                  if (r3) {
                    delete r3[e3];
                  }
                }
                t2.unregisterGlobal = unregisterGlobal;
              },
              130: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.isCompatible = t2._makeCompatibilityCheck = void 0;
                const n = r2(521);
                const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
                function _makeCompatibilityCheck(e3) {
                  const t3 = /* @__PURE__ */ new Set([
                    e3
                  ]);
                  const r3 = /* @__PURE__ */ new Set();
                  const n2 = e3.match(a);
                  if (!n2) {
                    return () => false;
                  }
                  const o = {
                    major: +n2[1],
                    minor: +n2[2],
                    patch: +n2[3],
                    prerelease: n2[4]
                  };
                  if (o.prerelease != null) {
                    return function isExactmatch(t4) {
                      return t4 === e3;
                    };
                  }
                  function _reject(e4) {
                    r3.add(e4);
                    return false;
                  }
                  function _accept(e4) {
                    t3.add(e4);
                    return true;
                  }
                  return function isCompatible(e4) {
                    if (t3.has(e4)) {
                      return true;
                    }
                    if (r3.has(e4)) {
                      return false;
                    }
                    const n3 = e4.match(a);
                    if (!n3) {
                      return _reject(e4);
                    }
                    const i = {
                      major: +n3[1],
                      minor: +n3[2],
                      patch: +n3[3],
                      prerelease: n3[4]
                    };
                    if (i.prerelease != null) {
                      return _reject(e4);
                    }
                    if (o.major !== i.major) {
                      return _reject(e4);
                    }
                    if (o.major === 0) {
                      if (o.minor === i.minor && o.patch <= i.patch) {
                        return _accept(e4);
                      }
                      return _reject(e4);
                    }
                    if (o.minor <= i.minor) {
                      return _accept(e4);
                    }
                    return _reject(e4);
                  };
                }
                t2._makeCompatibilityCheck = _makeCompatibilityCheck;
                t2.isCompatible = _makeCompatibilityCheck(n.VERSION);
              },
              886: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.metrics = void 0;
                const n = r2(653);
                t2.metrics = n.MetricsAPI.getInstance();
              },
              901: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.ValueType = void 0;
                var r2;
                (function(e3) {
                  e3[e3["INT"] = 0] = "INT";
                  e3[e3["DOUBLE"] = 1] = "DOUBLE";
                })(r2 = t2.ValueType || (t2.ValueType = {}));
              },
              102: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
                class NoopMeter {
                  constructor() {
                  }
                  createHistogram(e3, r2) {
                    return t2.NOOP_HISTOGRAM_METRIC;
                  }
                  createCounter(e3, r2) {
                    return t2.NOOP_COUNTER_METRIC;
                  }
                  createUpDownCounter(e3, r2) {
                    return t2.NOOP_UP_DOWN_COUNTER_METRIC;
                  }
                  createObservableGauge(e3, r2) {
                    return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
                  }
                  createObservableCounter(e3, r2) {
                    return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
                  }
                  createObservableUpDownCounter(e3, r2) {
                    return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                  }
                  addBatchObservableCallback(e3, t3) {
                  }
                  removeBatchObservableCallback(e3) {
                  }
                }
                t2.NoopMeter = NoopMeter;
                class NoopMetric {
                }
                t2.NoopMetric = NoopMetric;
                class NoopCounterMetric extends NoopMetric {
                  add(e3, t3) {
                  }
                }
                t2.NoopCounterMetric = NoopCounterMetric;
                class NoopUpDownCounterMetric extends NoopMetric {
                  add(e3, t3) {
                  }
                }
                t2.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
                class NoopHistogramMetric extends NoopMetric {
                  record(e3, t3) {
                  }
                }
                t2.NoopHistogramMetric = NoopHistogramMetric;
                class NoopObservableMetric {
                  addCallback(e3) {
                  }
                  removeCallback(e3) {
                  }
                }
                t2.NoopObservableMetric = NoopObservableMetric;
                class NoopObservableCounterMetric extends NoopObservableMetric {
                }
                t2.NoopObservableCounterMetric = NoopObservableCounterMetric;
                class NoopObservableGaugeMetric extends NoopObservableMetric {
                }
                t2.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
                class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
                }
                t2.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
                t2.NOOP_METER = new NoopMeter();
                t2.NOOP_COUNTER_METRIC = new NoopCounterMetric();
                t2.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
                t2.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
                t2.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
                t2.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
                t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
                function createNoopMeter() {
                  return t2.NOOP_METER;
                }
                t2.createNoopMeter = createNoopMeter;
              },
              660: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
                const n = r2(102);
                class NoopMeterProvider {
                  getMeter(e3, t3, r3) {
                    return n.NOOP_METER;
                  }
                }
                t2.NoopMeterProvider = NoopMeterProvider;
                t2.NOOP_METER_PROVIDER = new NoopMeterProvider();
              },
              200: function(e2, t2, r2) {
                var n = this && this.__createBinding || (Object.create ? function(e3, t3, r3, n2) {
                  if (n2 === void 0) n2 = r3;
                  Object.defineProperty(e3, n2, {
                    enumerable: true,
                    get: function() {
                      return t3[r3];
                    }
                  });
                } : function(e3, t3, r3, n2) {
                  if (n2 === void 0) n2 = r3;
                  e3[n2] = t3[r3];
                });
                var a = this && this.__exportStar || function(e3, t3) {
                  for (var r3 in e3) if (r3 !== "default" && !Object.prototype.hasOwnProperty.call(t3, r3)) n(t3, e3, r3);
                };
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                a(r2(46), t2);
              },
              651: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2._globalThis = void 0;
                t2._globalThis = typeof globalThis === "object" ? globalThis : global;
              },
              46: function(e2, t2, r2) {
                var n = this && this.__createBinding || (Object.create ? function(e3, t3, r3, n2) {
                  if (n2 === void 0) n2 = r3;
                  Object.defineProperty(e3, n2, {
                    enumerable: true,
                    get: function() {
                      return t3[r3];
                    }
                  });
                } : function(e3, t3, r3, n2) {
                  if (n2 === void 0) n2 = r3;
                  e3[n2] = t3[r3];
                });
                var a = this && this.__exportStar || function(e3, t3) {
                  for (var r3 in e3) if (r3 !== "default" && !Object.prototype.hasOwnProperty.call(t3, r3)) n(t3, e3, r3);
                };
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                a(r2(651), t2);
              },
              939: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.propagation = void 0;
                const n = r2(181);
                t2.propagation = n.PropagationAPI.getInstance();
              },
              874: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NoopTextMapPropagator = void 0;
                class NoopTextMapPropagator {
                  inject(e3, t3) {
                  }
                  extract(e3, t3) {
                    return e3;
                  }
                  fields() {
                    return [];
                  }
                }
                t2.NoopTextMapPropagator = NoopTextMapPropagator;
              },
              194: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0;
                t2.defaultTextMapGetter = {
                  get(e3, t3) {
                    if (e3 == null) {
                      return void 0;
                    }
                    return e3[t3];
                  },
                  keys(e3) {
                    if (e3 == null) {
                      return [];
                    }
                    return Object.keys(e3);
                  }
                };
                t2.defaultTextMapSetter = {
                  set(e3, t3, r2) {
                    if (e3 == null) {
                      return;
                    }
                    e3[t3] = r2;
                  }
                };
              },
              845: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.trace = void 0;
                const n = r2(997);
                t2.trace = n.TraceAPI.getInstance();
              },
              403: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NonRecordingSpan = void 0;
                const n = r2(476);
                class NonRecordingSpan {
                  constructor(e3 = n.INVALID_SPAN_CONTEXT) {
                    this._spanContext = e3;
                  }
                  spanContext() {
                    return this._spanContext;
                  }
                  setAttribute(e3, t3) {
                    return this;
                  }
                  setAttributes(e3) {
                    return this;
                  }
                  addEvent(e3, t3) {
                    return this;
                  }
                  setStatus(e3) {
                    return this;
                  }
                  updateName(e3) {
                    return this;
                  }
                  end(e3) {
                  }
                  isRecording() {
                    return false;
                  }
                  recordException(e3, t3) {
                  }
                }
                t2.NonRecordingSpan = NonRecordingSpan;
              },
              614: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NoopTracer = void 0;
                const n = r2(491);
                const a = r2(607);
                const o = r2(403);
                const i = r2(139);
                const c = n.ContextAPI.getInstance();
                class NoopTracer {
                  startSpan(e3, t3, r3 = c.active()) {
                    const n2 = Boolean(t3 === null || t3 === void 0 ? void 0 : t3.root);
                    if (n2) {
                      return new o.NonRecordingSpan();
                    }
                    const s = r3 && (0, a.getSpanContext)(r3);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                      return new o.NonRecordingSpan(s);
                    } else {
                      return new o.NonRecordingSpan();
                    }
                  }
                  startActiveSpan(e3, t3, r3, n2) {
                    let o2;
                    let i2;
                    let s;
                    if (arguments.length < 2) {
                      return;
                    } else if (arguments.length === 2) {
                      s = t3;
                    } else if (arguments.length === 3) {
                      o2 = t3;
                      s = r3;
                    } else {
                      o2 = t3;
                      i2 = r3;
                      s = n2;
                    }
                    const u = i2 !== null && i2 !== void 0 ? i2 : c.active();
                    const l = this.startSpan(e3, o2, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, void 0, l);
                  }
                }
                t2.NoopTracer = NoopTracer;
                function isSpanContext(e3) {
                  return typeof e3 === "object" && typeof e3["spanId"] === "string" && typeof e3["traceId"] === "string" && typeof e3["traceFlags"] === "number";
                }
              },
              124: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.NoopTracerProvider = void 0;
                const n = r2(614);
                class NoopTracerProvider {
                  getTracer(e3, t3, r3) {
                    return new n.NoopTracer();
                  }
                }
                t2.NoopTracerProvider = NoopTracerProvider;
              },
              125: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.ProxyTracer = void 0;
                const n = r2(614);
                const a = new n.NoopTracer();
                class ProxyTracer {
                  constructor(e3, t3, r3, n2) {
                    this._provider = e3;
                    this.name = t3;
                    this.version = r3;
                    this.options = n2;
                  }
                  startSpan(e3, t3, r3) {
                    return this._getTracer().startSpan(e3, t3, r3);
                  }
                  startActiveSpan(e3, t3, r3, n2) {
                    const a2 = this._getTracer();
                    return Reflect.apply(a2.startActiveSpan, a2, arguments);
                  }
                  _getTracer() {
                    if (this._delegate) {
                      return this._delegate;
                    }
                    const e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e3) {
                      return a;
                    }
                    this._delegate = e3;
                    return this._delegate;
                  }
                }
                t2.ProxyTracer = ProxyTracer;
              },
              846: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.ProxyTracerProvider = void 0;
                const n = r2(125);
                const a = r2(124);
                const o = new a.NoopTracerProvider();
                class ProxyTracerProvider {
                  getTracer(e3, t3, r3) {
                    var a2;
                    return (a2 = this.getDelegateTracer(e3, t3, r3)) !== null && a2 !== void 0 ? a2 : new n.ProxyTracer(this, e3, t3, r3);
                  }
                  getDelegate() {
                    var e3;
                    return (e3 = this._delegate) !== null && e3 !== void 0 ? e3 : o;
                  }
                  setDelegate(e3) {
                    this._delegate = e3;
                  }
                  getDelegateTracer(e3, t3, r3) {
                    var n2;
                    return (n2 = this._delegate) === null || n2 === void 0 ? void 0 : n2.getTracer(e3, t3, r3);
                  }
                }
                t2.ProxyTracerProvider = ProxyTracerProvider;
              },
              996: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.SamplingDecision = void 0;
                var r2;
                (function(e3) {
                  e3[e3["NOT_RECORD"] = 0] = "NOT_RECORD";
                  e3[e3["RECORD"] = 1] = "RECORD";
                  e3[e3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
                })(r2 = t2.SamplingDecision || (t2.SamplingDecision = {}));
              },
              607: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
                const n = r2(780);
                const a = r2(403);
                const o = r2(491);
                const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
                function getSpan(e3) {
                  return e3.getValue(i) || void 0;
                }
                t2.getSpan = getSpan;
                function getActiveSpan() {
                  return getSpan(o.ContextAPI.getInstance().active());
                }
                t2.getActiveSpan = getActiveSpan;
                function setSpan(e3, t3) {
                  return e3.setValue(i, t3);
                }
                t2.setSpan = setSpan;
                function deleteSpan(e3) {
                  return e3.deleteValue(i);
                }
                t2.deleteSpan = deleteSpan;
                function setSpanContext(e3, t3) {
                  return setSpan(e3, new a.NonRecordingSpan(t3));
                }
                t2.setSpanContext = setSpanContext;
                function getSpanContext(e3) {
                  var t3;
                  return (t3 = getSpan(e3)) === null || t3 === void 0 ? void 0 : t3.spanContext();
                }
                t2.getSpanContext = getSpanContext;
              },
              325: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.TraceStateImpl = void 0;
                const n = r2(564);
                const a = 32;
                const o = 512;
                const i = ",";
                const c = "=";
                class TraceStateImpl {
                  constructor(e3) {
                    this._internalState = /* @__PURE__ */ new Map();
                    if (e3) this._parse(e3);
                  }
                  set(e3, t3) {
                    const r3 = this._clone();
                    if (r3._internalState.has(e3)) {
                      r3._internalState.delete(e3);
                    }
                    r3._internalState.set(e3, t3);
                    return r3;
                  }
                  unset(e3) {
                    const t3 = this._clone();
                    t3._internalState.delete(e3);
                    return t3;
                  }
                  get(e3) {
                    return this._internalState.get(e3);
                  }
                  serialize() {
                    return this._keys().reduce((e3, t3) => {
                      e3.push(t3 + c + this.get(t3));
                      return e3;
                    }, []).join(i);
                  }
                  _parse(e3) {
                    if (e3.length > o) return;
                    this._internalState = e3.split(i).reverse().reduce((e4, t3) => {
                      const r3 = t3.trim();
                      const a2 = r3.indexOf(c);
                      if (a2 !== -1) {
                        const o2 = r3.slice(0, a2);
                        const i2 = r3.slice(a2 + 1, t3.length);
                        if ((0, n.validateKey)(o2) && (0, n.validateValue)(i2)) {
                          e4.set(o2, i2);
                        } else {
                        }
                      }
                      return e4;
                    }, /* @__PURE__ */ new Map());
                    if (this._internalState.size > a) {
                      this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                  }
                  _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                  }
                  _clone() {
                    const e3 = new TraceStateImpl();
                    e3._internalState = new Map(this._internalState);
                    return e3;
                  }
                }
                t2.TraceStateImpl = TraceStateImpl;
              },
              564: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.validateValue = t2.validateKey = void 0;
                const r2 = "[_0-9a-z-*/]";
                const n = `[a-z]${r2}{0,255}`;
                const a = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`;
                const o = new RegExp(`^(?:${n}|${a})$`);
                const i = /^[ -~]{0,255}[!-~]$/;
                const c = /,|=/;
                function validateKey(e3) {
                  return o.test(e3);
                }
                t2.validateKey = validateKey;
                function validateValue(e3) {
                  return i.test(e3) && !c.test(e3);
                }
                t2.validateValue = validateValue;
              },
              98: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.createTraceState = void 0;
                const n = r2(325);
                function createTraceState(e3) {
                  return new n.TraceStateImpl(e3);
                }
                t2.createTraceState = createTraceState;
              },
              476: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
                const n = r2(475);
                t2.INVALID_SPANID = "0000000000000000";
                t2.INVALID_TRACEID = "00000000000000000000000000000000";
                t2.INVALID_SPAN_CONTEXT = {
                  traceId: t2.INVALID_TRACEID,
                  spanId: t2.INVALID_SPANID,
                  traceFlags: n.TraceFlags.NONE
                };
              },
              357: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.SpanKind = void 0;
                var r2;
                (function(e3) {
                  e3[e3["INTERNAL"] = 0] = "INTERNAL";
                  e3[e3["SERVER"] = 1] = "SERVER";
                  e3[e3["CLIENT"] = 2] = "CLIENT";
                  e3[e3["PRODUCER"] = 3] = "PRODUCER";
                  e3[e3["CONSUMER"] = 4] = "CONSUMER";
                })(r2 = t2.SpanKind || (t2.SpanKind = {}));
              },
              139: (e2, t2, r2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
                const n = r2(476);
                const a = r2(403);
                const o = /^([0-9a-f]{32})$/i;
                const i = /^[0-9a-f]{16}$/i;
                function isValidTraceId(e3) {
                  return o.test(e3) && e3 !== n.INVALID_TRACEID;
                }
                t2.isValidTraceId = isValidTraceId;
                function isValidSpanId(e3) {
                  return i.test(e3) && e3 !== n.INVALID_SPANID;
                }
                t2.isValidSpanId = isValidSpanId;
                function isSpanContextValid(e3) {
                  return isValidTraceId(e3.traceId) && isValidSpanId(e3.spanId);
                }
                t2.isSpanContextValid = isSpanContextValid;
                function wrapSpanContext(e3) {
                  return new a.NonRecordingSpan(e3);
                }
                t2.wrapSpanContext = wrapSpanContext;
              },
              847: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.SpanStatusCode = void 0;
                var r2;
                (function(e3) {
                  e3[e3["UNSET"] = 0] = "UNSET";
                  e3[e3["OK"] = 1] = "OK";
                  e3[e3["ERROR"] = 2] = "ERROR";
                })(r2 = t2.SpanStatusCode || (t2.SpanStatusCode = {}));
              },
              475: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.TraceFlags = void 0;
                var r2;
                (function(e3) {
                  e3[e3["NONE"] = 0] = "NONE";
                  e3[e3["SAMPLED"] = 1] = "SAMPLED";
                })(r2 = t2.TraceFlags || (t2.TraceFlags = {}));
              },
              521: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                t2.VERSION = void 0;
                t2.VERSION = "1.6.0";
              }
            };
            var t = {};
            function __nccwpck_require__2(r2) {
              var n = t[r2];
              if (n !== void 0) {
                return n.exports;
              }
              var a = t[r2] = {
                exports: {}
              };
              var o = true;
              try {
                e[r2].call(a.exports, a, a.exports, __nccwpck_require__2);
                o = false;
              } finally {
                if (o) delete t[r2];
              }
              return a.exports;
            }
            if (typeof __nccwpck_require__2 !== "undefined") __nccwpck_require__2.ab = __dirname2 + "/";
            var r = {};
            (() => {
              var e2 = r;
              Object.defineProperty(e2, "__esModule", {
                value: true
              });
              e2.trace = e2.propagation = e2.metrics = e2.diag = e2.context = e2.INVALID_SPAN_CONTEXT = e2.INVALID_TRACEID = e2.INVALID_SPANID = e2.isValidSpanId = e2.isValidTraceId = e2.isSpanContextValid = e2.createTraceState = e2.TraceFlags = e2.SpanStatusCode = e2.SpanKind = e2.SamplingDecision = e2.ProxyTracerProvider = e2.ProxyTracer = e2.defaultTextMapSetter = e2.defaultTextMapGetter = e2.ValueType = e2.createNoopMeter = e2.DiagLogLevel = e2.DiagConsoleLogger = e2.ROOT_CONTEXT = e2.createContextKey = e2.baggageEntryMetadataFromString = void 0;
              var t2 = __nccwpck_require__2(369);
              Object.defineProperty(e2, "baggageEntryMetadataFromString", {
                enumerable: true,
                get: function() {
                  return t2.baggageEntryMetadataFromString;
                }
              });
              var n = __nccwpck_require__2(780);
              Object.defineProperty(e2, "createContextKey", {
                enumerable: true,
                get: function() {
                  return n.createContextKey;
                }
              });
              Object.defineProperty(e2, "ROOT_CONTEXT", {
                enumerable: true,
                get: function() {
                  return n.ROOT_CONTEXT;
                }
              });
              var a = __nccwpck_require__2(972);
              Object.defineProperty(e2, "DiagConsoleLogger", {
                enumerable: true,
                get: function() {
                  return a.DiagConsoleLogger;
                }
              });
              var o = __nccwpck_require__2(957);
              Object.defineProperty(e2, "DiagLogLevel", {
                enumerable: true,
                get: function() {
                  return o.DiagLogLevel;
                }
              });
              var i = __nccwpck_require__2(102);
              Object.defineProperty(e2, "createNoopMeter", {
                enumerable: true,
                get: function() {
                  return i.createNoopMeter;
                }
              });
              var c = __nccwpck_require__2(901);
              Object.defineProperty(e2, "ValueType", {
                enumerable: true,
                get: function() {
                  return c.ValueType;
                }
              });
              var s = __nccwpck_require__2(194);
              Object.defineProperty(e2, "defaultTextMapGetter", {
                enumerable: true,
                get: function() {
                  return s.defaultTextMapGetter;
                }
              });
              Object.defineProperty(e2, "defaultTextMapSetter", {
                enumerable: true,
                get: function() {
                  return s.defaultTextMapSetter;
                }
              });
              var u = __nccwpck_require__2(125);
              Object.defineProperty(e2, "ProxyTracer", {
                enumerable: true,
                get: function() {
                  return u.ProxyTracer;
                }
              });
              var l = __nccwpck_require__2(846);
              Object.defineProperty(e2, "ProxyTracerProvider", {
                enumerable: true,
                get: function() {
                  return l.ProxyTracerProvider;
                }
              });
              var g = __nccwpck_require__2(996);
              Object.defineProperty(e2, "SamplingDecision", {
                enumerable: true,
                get: function() {
                  return g.SamplingDecision;
                }
              });
              var p = __nccwpck_require__2(357);
              Object.defineProperty(e2, "SpanKind", {
                enumerable: true,
                get: function() {
                  return p.SpanKind;
                }
              });
              var d = __nccwpck_require__2(847);
              Object.defineProperty(e2, "SpanStatusCode", {
                enumerable: true,
                get: function() {
                  return d.SpanStatusCode;
                }
              });
              var _ = __nccwpck_require__2(475);
              Object.defineProperty(e2, "TraceFlags", {
                enumerable: true,
                get: function() {
                  return _.TraceFlags;
                }
              });
              var f = __nccwpck_require__2(98);
              Object.defineProperty(e2, "createTraceState", {
                enumerable: true,
                get: function() {
                  return f.createTraceState;
                }
              });
              var b = __nccwpck_require__2(139);
              Object.defineProperty(e2, "isSpanContextValid", {
                enumerable: true,
                get: function() {
                  return b.isSpanContextValid;
                }
              });
              Object.defineProperty(e2, "isValidTraceId", {
                enumerable: true,
                get: function() {
                  return b.isValidTraceId;
                }
              });
              Object.defineProperty(e2, "isValidSpanId", {
                enumerable: true,
                get: function() {
                  return b.isValidSpanId;
                }
              });
              var v = __nccwpck_require__2(476);
              Object.defineProperty(e2, "INVALID_SPANID", {
                enumerable: true,
                get: function() {
                  return v.INVALID_SPANID;
                }
              });
              Object.defineProperty(e2, "INVALID_TRACEID", {
                enumerable: true,
                get: function() {
                  return v.INVALID_TRACEID;
                }
              });
              Object.defineProperty(e2, "INVALID_SPAN_CONTEXT", {
                enumerable: true,
                get: function() {
                  return v.INVALID_SPAN_CONTEXT;
                }
              });
              const O = __nccwpck_require__2(67);
              Object.defineProperty(e2, "context", {
                enumerable: true,
                get: function() {
                  return O.context;
                }
              });
              const P = __nccwpck_require__2(506);
              Object.defineProperty(e2, "diag", {
                enumerable: true,
                get: function() {
                  return P.diag;
                }
              });
              const N = __nccwpck_require__2(886);
              Object.defineProperty(e2, "metrics", {
                enumerable: true,
                get: function() {
                  return N.metrics;
                }
              });
              const S = __nccwpck_require__2(939);
              Object.defineProperty(e2, "propagation", {
                enumerable: true,
                get: function() {
                  return S.propagation;
                }
              });
              const C = __nccwpck_require__2(845);
              Object.defineProperty(e2, "trace", {
                enumerable: true,
                get: function() {
                  return C.trace;
                }
              });
              e2["default"] = {
                context: O.context,
                diag: P.diag,
                metrics: N.metrics,
                propagation: S.propagation,
                trace: C.trace
              };
            })();
            module2.exports = r;
          })();
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isBubbledError = function(error2) {
            if (typeof error2 !== "object" || error2 === null) return false;
            return error2 instanceof BubbledError;
          };
          __turbopack_context__.s({
            "BubbledError": () => BubbledError,
            "SpanKind": () => SpanKind,
            "SpanStatusCode": () => SpanStatusCode,
            "getTracer": () => getTracer,
            "isBubbledError": () => isBubbledError
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)");
          ;
          ;
          let api;
          if ("TURBOPACK compile-time truthy", 1) {
            api = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware-edge] (ecmascript)");
          } else {
            "TURBOPACK unreachable";
          }
          const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
          class BubbledError extends Error {
            constructor(bubble, result) {
              super(), this.bubble = bubble, this.result = result;
            }
          }
          const closeSpanWithError = (span, error2) => {
            if (isBubbledError(error2) && error2.bubble) {
              span.setAttribute("next.bubble", true);
            } else {
              if (error2) {
                span.recordException(error2);
              }
              span.setStatus({
                code: SpanStatusCode.ERROR,
                message: error2 == null ? void 0 : error2.message
              });
            }
            span.end();
          };
          const rootSpanAttributesStore = /* @__PURE__ */ new Map();
          const rootSpanIdKey = api.createContextKey("next.rootSpanId");
          let lastSpanId = 0;
          const getSpanId = () => lastSpanId++;
          const clientTraceDataSetter = {
            set(carrier, key, value) {
              carrier.push({
                key,
                value
              });
            }
          };
          class NextTracerImpl {
            /**
            * Returns an instance to the trace with configured name.
            * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
            * This should be lazily evaluated.
            */
            getTracerInstance() {
              return trace.getTracer("next.js", "0.0.1");
            }
            getContext() {
              return context;
            }
            getTracePropagationData() {
              const activeContext = context.active();
              const entries = [];
              propagation.inject(activeContext, entries, clientTraceDataSetter);
              return entries;
            }
            getActiveScopeSpan() {
              return trace.getSpan(context == null ? void 0 : context.active());
            }
            withPropagatedContext(carrier, fn, getter) {
              const activeContext = context.active();
              if (trace.getSpanContext(activeContext)) {
                return fn();
              }
              const remoteContext = propagation.extract(activeContext, carrier, getter);
              return context.with(remoteContext, fn);
            }
            trace(...args) {
              var _trace_getSpanContext;
              const [type, fnOrOptions, fnOrEmpty] = args;
              const { fn, options } = typeof fnOrOptions === "function" ? {
                fn: fnOrOptions,
                options: {}
              } : {
                fn: fnOrEmpty,
                options: {
                  ...fnOrOptions
                }
              };
              const spanName = options.spanName ?? type;
              if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(type) && process.env.NEXT_OTEL_VERBOSE !== "1" || options.hideSpan) {
                return fn();
              }
              let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
              let isRootSpan = false;
              if (!spanContext) {
                spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
                isRootSpan = true;
              } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
                isRootSpan = true;
              }
              const spanId = getSpanId();
              options.attributes = {
                "next.span_name": spanName,
                "next.span_type": type,
                ...options.attributes
              };
              return context.with(spanContext.setValue(rootSpanIdKey, spanId), () => this.getTracerInstance().startActiveSpan(spanName, options, (span) => {
                const startTime = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0;
                const onCleanup = () => {
                  rootSpanAttributesStore.delete(spanId);
                  if (startTime && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LogSpanAllowList"].includes(type || "")) {
                    performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split(".").pop() || "").replace(/[A-Z]/g, (match2) => "-" + match2.toLowerCase())}`, {
                      start: startTime,
                      end: performance.now()
                    });
                  }
                };
                if (isRootSpan) {
                  rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                  if (fn.length > 1) {
                    return fn(span, (err) => closeSpanWithError(span, err));
                  }
                  const result = fn(span);
                  if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isThenable"])(result)) {
                    return result.then((res) => {
                      span.end();
                      return res;
                    }).catch((err) => {
                      closeSpanWithError(span, err);
                      throw err;
                    }).finally(onCleanup);
                  } else {
                    span.end();
                    onCleanup();
                  }
                  return result;
                } catch (err) {
                  closeSpanWithError(span, err);
                  onCleanup();
                  throw err;
                }
              }));
            }
            wrap(...args) {
              const tracer = this;
              const [name, options, fn] = args.length === 3 ? args : [
                args[0],
                {},
                args[1]
              ];
              if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(name) && process.env.NEXT_OTEL_VERBOSE !== "1") {
                return fn;
              }
              return function() {
                let optionsObj = options;
                if (typeof optionsObj === "function" && typeof fn === "function") {
                  optionsObj = optionsObj.apply(this, arguments);
                }
                const lastArgId = arguments.length - 1;
                const cb = arguments[lastArgId];
                if (typeof cb === "function") {
                  const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                  return tracer.trace(name, optionsObj, (_span, done) => {
                    arguments[lastArgId] = function(err) {
                      done == null ? void 0 : done(err);
                      return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                  });
                } else {
                  return tracer.trace(name, optionsObj, () => fn.apply(this, arguments));
                }
              };
            }
            startSpan(...args) {
              const [type, options] = args;
              const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
              return this.getTracerInstance().startSpan(type, options, spanContext);
            }
            getSpanContext(parentSpan) {
              const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : void 0;
              return spanContext;
            }
            getRootSpanAttributes() {
              const spanId = context.active().getValue(rootSpanIdKey);
              return rootSpanAttributesStore.get(spanId);
            }
            setRootSpanAttribute(key, value) {
              const spanId = context.active().getValue(rootSpanIdKey);
              const attributes = rootSpanAttributesStore.get(spanId);
              if (attributes) {
                attributes.set(key, value);
              }
            }
          }
          const getTracer = (() => {
            const tracer = new NextTracerImpl();
            return () => tracer;
          })();
          ;
        }
      },
      "[project]/node_modules/next/dist/compiled/cookie/index.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          (() => {
            "use strict";
            if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname2 + "/";
            var e = {};
            (() => {
              var r = e;
              r.parse = parse3;
              r.serialize = serialize;
              var i = decodeURIComponent;
              var t = encodeURIComponent;
              var a = /; */;
              var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
              function parse3(e2, r2) {
                if (typeof e2 !== "string") {
                  throw new TypeError("argument str must be a string");
                }
                var t2 = {};
                var n2 = r2 || {};
                var o = e2.split(a);
                var s = n2.decode || i;
                for (var p = 0; p < o.length; p++) {
                  var f = o[p];
                  var u = f.indexOf("=");
                  if (u < 0) {
                    continue;
                  }
                  var v = f.substr(0, u).trim();
                  var c = f.substr(++u, f.length).trim();
                  if ('"' == c[0]) {
                    c = c.slice(1, -1);
                  }
                  if (void 0 == t2[v]) {
                    t2[v] = tryDecode(c, s);
                  }
                }
                return t2;
              }
              function serialize(e2, r2, i2) {
                var a2 = i2 || {};
                var o = a2.encode || t;
                if (typeof o !== "function") {
                  throw new TypeError("option encode is invalid");
                }
                if (!n.test(e2)) {
                  throw new TypeError("argument name is invalid");
                }
                var s = o(r2);
                if (s && !n.test(s)) {
                  throw new TypeError("argument val is invalid");
                }
                var p = e2 + "=" + s;
                if (null != a2.maxAge) {
                  var f = a2.maxAge - 0;
                  if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                  }
                  p += "; Max-Age=" + Math.floor(f);
                }
                if (a2.domain) {
                  if (!n.test(a2.domain)) {
                    throw new TypeError("option domain is invalid");
                  }
                  p += "; Domain=" + a2.domain;
                }
                if (a2.path) {
                  if (!n.test(a2.path)) {
                    throw new TypeError("option path is invalid");
                  }
                  p += "; Path=" + a2.path;
                }
                if (a2.expires) {
                  if (typeof a2.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                  }
                  p += "; Expires=" + a2.expires.toUTCString();
                }
                if (a2.httpOnly) {
                  p += "; HttpOnly";
                }
                if (a2.secure) {
                  p += "; Secure";
                }
                if (a2.sameSite) {
                  var u = typeof a2.sameSite === "string" ? a2.sameSite.toLowerCase() : a2.sameSite;
                  switch (u) {
                    case true:
                      p += "; SameSite=Strict";
                      break;
                    case "lax":
                      p += "; SameSite=Lax";
                      break;
                    case "strict":
                      p += "; SameSite=Strict";
                      break;
                    case "none":
                      p += "; SameSite=None";
                      break;
                    default:
                      throw new TypeError("option sameSite is invalid");
                  }
                }
                return p;
              }
              function tryDecode(e2, r2) {
                try {
                  return r2(e2);
                } catch (r3) {
                  return e2;
                }
              }
            })();
            module2.exports = e;
          })();
        }
      },
      "[project]/node_modules/next/dist/esm/server/api-utils/index.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let wrapApiHandler = function(page, handler3) {
            return (...args) => {
              (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().setRootSpanAttribute("next.route", page);
              return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NodeSpan"].runHandler, {
                spanName: `executing api route (pages) ${page}`
              }, () => handler3(...args));
            };
          }, sendStatusCode = function(res, statusCode) {
            res.statusCode = statusCode;
            return res;
          }, redirect = function(res, statusOrUrl, url) {
            if (typeof statusOrUrl === "string") {
              url = statusOrUrl;
              statusOrUrl = 307;
            }
            if (typeof statusOrUrl !== "number" || typeof url !== "string") {
              throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
                value: "E389",
                enumerable: false,
                configurable: true
              });
            }
            res.writeHead(statusOrUrl, {
              Location: url
            });
            res.write(url);
            res.end();
            return res;
          }, checkIsOnDemandRevalidate = function(req, previewProps) {
            const headers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers);
            const previewModeId = headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_HEADER"]);
            const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
            const revalidateOnlyGenerated = headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER"]);
            return {
              isOnDemandRevalidate,
              revalidateOnlyGenerated
            };
          }, clearPreviewData = function(res, options = {}) {
            if (SYMBOL_CLEARED_COOKIES in res) {
              return res;
            }
            const { serialize } = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/cookie/index.js [middleware-edge] (ecmascript)");
            const previous = res.getHeader("Set-Cookie");
            res.setHeader(`Set-Cookie`, [
              ...typeof previous === "string" ? [
                previous
              ] : Array.isArray(previous) ? previous : [],
              serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
                // To delete a cookie, set `expires` to a date in the past:
                // https://tools.ietf.org/html/rfc6265#section-4.1.1
                // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
                expires: /* @__PURE__ */ new Date(0),
                httpOnly: true,
                sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : "lax",
                secure: ("TURBOPACK compile-time value", "development") !== "development",
                path: "/",
                ...options.path !== void 0 ? {
                  path: options.path
                } : void 0
              }),
              serialize(COOKIE_NAME_PRERENDER_DATA, "", {
                // To delete a cookie, set `expires` to a date in the past:
                // https://tools.ietf.org/html/rfc6265#section-4.1.1
                // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
                expires: /* @__PURE__ */ new Date(0),
                httpOnly: true,
                sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : "lax",
                secure: ("TURBOPACK compile-time value", "development") !== "development",
                path: "/",
                ...options.path !== void 0 ? {
                  path: options.path
                } : void 0
              })
            ]);
            Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
              value: true,
              enumerable: false
            });
            return res;
          }, sendError = function(res, statusCode, message) {
            res.statusCode = statusCode;
            res.statusMessage = message;
            res.end(message);
          }, setLazyProp = function({ req }, prop, getter) {
            const opts = {
              configurable: true,
              enumerable: true
            };
            const optsReset = {
              ...opts,
              writable: true
            };
            Object.defineProperty(req, prop, {
              ...opts,
              get: () => {
                const value = getter();
                Object.defineProperty(req, prop, {
                  ...optsReset,
                  value
                });
                return value;
              },
              set: (value) => {
                Object.defineProperty(req, prop, {
                  ...optsReset,
                  value
                });
              }
            });
          };
          __turbopack_context__.s({
            "ApiError": () => ApiError,
            "COOKIE_NAME_PRERENDER_BYPASS": () => COOKIE_NAME_PRERENDER_BYPASS,
            "COOKIE_NAME_PRERENDER_DATA": () => COOKIE_NAME_PRERENDER_DATA,
            "RESPONSE_LIMIT_DEFAULT": () => RESPONSE_LIMIT_DEFAULT,
            "SYMBOL_CLEARED_COOKIES": () => SYMBOL_CLEARED_COOKIES,
            "SYMBOL_PREVIEW_DATA": () => SYMBOL_PREVIEW_DATA,
            "checkIsOnDemandRevalidate": () => checkIsOnDemandRevalidate,
            "clearPreviewData": () => clearPreviewData,
            "redirect": () => redirect,
            "sendError": () => sendError,
            "sendStatusCode": () => sendStatusCode,
            "setLazyProp": () => setLazyProp,
            "wrapApiHandler": () => wrapApiHandler
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
          const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
          const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
          const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
          const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
          class ApiError extends Error {
            constructor(statusCode, message) {
              super(message);
              this.statusCode = statusCode;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "DraftModeProvider": () => DraftModeProvider
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/api-utils/index.js [middleware-edge] (ecmascript)");
          ;
          class DraftModeProvider {
            constructor(previewProps, req, cookies, mutableCookies) {
              var _cookies_get;
              const isOnDemandRevalidate = previewProps && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkIsOnDemandRevalidate"])(req, previewProps).isOnDemandRevalidate;
              const cookieValue = (_cookies_get = cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"])) == null ? void 0 : _cookies_get.value;
              this._isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && (cookieValue === previewProps.previewModeId || // In dev mode, the cookie can be actual hash value preview id but the preview props can still be `development-id`.
              ("TURBOPACK compile-time value", "development") !== "production" && previewProps.previewModeId === "development-id"));
              this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
              this._mutableCookies = mutableCookies;
            }
            get isEnabled() {
              return this._isEnabled;
            }
            enable() {
              if (!this._previewModeId) {
                throw Object.defineProperty(new Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", {
                  value: "E93",
                  enumerable: false,
                  configurable: true
                });
              }
              this._mutableCookies.set({
                name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
                value: this._previewModeId,
                httpOnly: true,
                sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : "lax",
                secure: ("TURBOPACK compile-time value", "development") !== "development",
                path: "/"
              });
              this._isEnabled = true;
            }
            disable() {
              this._mutableCookies.set({
                name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
                value: "",
                httpOnly: true,
                sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : "lax",
                secure: ("TURBOPACK compile-time value", "development") !== "development",
                path: "/",
                expires: /* @__PURE__ */ new Date(0)
              });
              this._isEnabled = false;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/async-storage/request-store.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getHeaders = function(headers) {
            const cleaned = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers);
            for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]) {
              cleaned.delete(header.toLowerCase());
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(cleaned);
          }, getMutableCookies = function(headers, onUpdateCookies) {
            const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MutableRequestCookiesAdapter"].wrap(cookies, onUpdateCookies);
          }, mergeMiddlewareCookies = function(req, existingCookies) {
            if ("x-middleware-set-cookie" in req.headers && typeof req.headers["x-middleware-set-cookie"] === "string") {
              const setCookieValue = req.headers["x-middleware-set-cookie"];
              const responseHeaders = new Headers();
              for (const cookie of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["splitCookiesString"])(setCookieValue)) {
                responseHeaders.append("set-cookie", cookie);
              }
              const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](responseHeaders);
              for (const cookie of responseCookies.getAll()) {
                existingCookies.set(cookie);
              }
            }
          }, createRequestStoreForRender = function(req, res, url, rootParams, implicitTags, onUpdateCookies, previewProps, isHmrRefresh, serverComponentsHmrCache, renderResumeDataCache) {
            return createRequestStoreImpl("render", req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache);
          }, createRequestStoreForAPI = function(req, url, implicitTags, onUpdateCookies, previewProps) {
            return createRequestStoreImpl("action", req, void 0, url, {}, implicitTags, onUpdateCookies, void 0, previewProps, false, void 0);
          }, createRequestStoreImpl = function(phase, req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache) {
            function defaultOnUpdateCookies(cookies) {
              if (res) {
                res.setHeader("Set-Cookie", cookies);
              }
            }
            const cache = {};
            return {
              type: "request",
              phase,
              implicitTags,
              // Rather than just using the whole `url` here, we pull the parts we want
              // to ensure we don't use parts of the URL that we shouldn't. This also
              // lets us avoid requiring an empty string for `search` in the type.
              url: {
                pathname: url.pathname,
                search: url.search ?? ""
              },
              rootParams,
              get headers() {
                if (!cache.headers) {
                  cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
              },
              get cookies() {
                if (!cache.cookies) {
                  const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers));
                  mergeMiddlewareCookies(req, requestCookies);
                  cache.cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(requestCookies);
                }
                return cache.cookies;
              },
              set cookies(value) {
                cache.cookies = value;
              },
              get mutableCookies() {
                if (!cache.mutableCookies) {
                  const mutableCookies = getMutableCookies(req.headers, onUpdateCookies || (res ? defaultOnUpdateCookies : void 0));
                  mergeMiddlewareCookies(req, mutableCookies);
                  cache.mutableCookies = mutableCookies;
                }
                return cache.mutableCookies;
              },
              get userspaceMutableCookies() {
                if (!cache.userspaceMutableCookies) {
                  const userspaceMutableCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["wrapWithMutableAccessCheck"])(this.mutableCookies);
                  cache.userspaceMutableCookies = userspaceMutableCookies;
                }
                return cache.userspaceMutableCookies;
              },
              get draftMode() {
                if (!cache.draftMode) {
                  cache.draftMode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DraftModeProvider"](previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
              },
              renderResumeDataCache: renderResumeDataCache ?? null,
              isHmrRefresh,
              serverComponentsHmrCache: serverComponentsHmrCache || globalThis.__serverComponentsHmrCache
            };
          }, synchronizeMutableCookies = function(store) {
            store.cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["responseCookiesToRequestCookies"])(store.mutableCookies));
          };
          __turbopack_context__.s({
            "createRequestStoreForAPI": () => createRequestStoreForAPI,
            "createRequestStoreForRender": () => createRequestStoreForRender,
            "synchronizeMutableCookies": () => synchronizeMutableCookies
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "workUnitAsyncStorage": () => __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workUnitAsyncStorageInstance"]
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
        }
      },
      "[project]/node_modules/next/dist/compiled/p-queue/index.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          (() => {
            "use strict";
            var e = {
              993: (e2) => {
                var t2 = Object.prototype.hasOwnProperty, n2 = "~";
                function Events() {
                }
                if (Object.create) {
                  Events.prototype = /* @__PURE__ */ Object.create(null);
                  if (!new Events().__proto__) n2 = false;
                }
                function EE(e3, t3, n3) {
                  this.fn = e3;
                  this.context = t3;
                  this.once = n3 || false;
                }
                function addListener(e3, t3, r, i, s) {
                  if (typeof r !== "function") {
                    throw new TypeError("The listener must be a function");
                  }
                  var o = new EE(r, i || e3, s), u = n2 ? n2 + t3 : t3;
                  if (!e3._events[u]) e3._events[u] = o, e3._eventsCount++;
                  else if (!e3._events[u].fn) e3._events[u].push(o);
                  else e3._events[u] = [
                    e3._events[u],
                    o
                  ];
                  return e3;
                }
                function clearEvent(e3, t3) {
                  if (--e3._eventsCount === 0) e3._events = new Events();
                  else delete e3._events[t3];
                }
                function EventEmitter() {
                  this._events = new Events();
                  this._eventsCount = 0;
                }
                EventEmitter.prototype.eventNames = function eventNames() {
                  var e3 = [], r, i;
                  if (this._eventsCount === 0) return e3;
                  for (i in r = this._events) {
                    if (t2.call(r, i)) e3.push(n2 ? i.slice(1) : i);
                  }
                  if (Object.getOwnPropertySymbols) {
                    return e3.concat(Object.getOwnPropertySymbols(r));
                  }
                  return e3;
                };
                EventEmitter.prototype.listeners = function listeners(e3) {
                  var t3 = n2 ? n2 + e3 : e3, r = this._events[t3];
                  if (!r) return [];
                  if (r.fn) return [
                    r.fn
                  ];
                  for (var i = 0, s = r.length, o = new Array(s); i < s; i++) {
                    o[i] = r[i].fn;
                  }
                  return o;
                };
                EventEmitter.prototype.listenerCount = function listenerCount(e3) {
                  var t3 = n2 ? n2 + e3 : e3, r = this._events[t3];
                  if (!r) return 0;
                  if (r.fn) return 1;
                  return r.length;
                };
                EventEmitter.prototype.emit = function emit(e3, t3, r, i, s, o) {
                  var u = n2 ? n2 + e3 : e3;
                  if (!this._events[u]) return false;
                  var a = this._events[u], l = arguments.length, c, h;
                  if (a.fn) {
                    if (a.once) this.removeListener(e3, a.fn, void 0, true);
                    switch (l) {
                      case 1:
                        return a.fn.call(a.context), true;
                      case 2:
                        return a.fn.call(a.context, t3), true;
                      case 3:
                        return a.fn.call(a.context, t3, r), true;
                      case 4:
                        return a.fn.call(a.context, t3, r, i), true;
                      case 5:
                        return a.fn.call(a.context, t3, r, i, s), true;
                      case 6:
                        return a.fn.call(a.context, t3, r, i, s, o), true;
                    }
                    for (h = 1, c = new Array(l - 1); h < l; h++) {
                      c[h - 1] = arguments[h];
                    }
                    a.fn.apply(a.context, c);
                  } else {
                    var _ = a.length, f;
                    for (h = 0; h < _; h++) {
                      if (a[h].once) this.removeListener(e3, a[h].fn, void 0, true);
                      switch (l) {
                        case 1:
                          a[h].fn.call(a[h].context);
                          break;
                        case 2:
                          a[h].fn.call(a[h].context, t3);
                          break;
                        case 3:
                          a[h].fn.call(a[h].context, t3, r);
                          break;
                        case 4:
                          a[h].fn.call(a[h].context, t3, r, i);
                          break;
                        default:
                          if (!c) for (f = 1, c = new Array(l - 1); f < l; f++) {
                            c[f - 1] = arguments[f];
                          }
                          a[h].fn.apply(a[h].context, c);
                      }
                    }
                  }
                  return true;
                };
                EventEmitter.prototype.on = function on(e3, t3, n3) {
                  return addListener(this, e3, t3, n3, false);
                };
                EventEmitter.prototype.once = function once(e3, t3, n3) {
                  return addListener(this, e3, t3, n3, true);
                };
                EventEmitter.prototype.removeListener = function removeListener(e3, t3, r, i) {
                  var s = n2 ? n2 + e3 : e3;
                  if (!this._events[s]) return this;
                  if (!t3) {
                    clearEvent(this, s);
                    return this;
                  }
                  var o = this._events[s];
                  if (o.fn) {
                    if (o.fn === t3 && (!i || o.once) && (!r || o.context === r)) {
                      clearEvent(this, s);
                    }
                  } else {
                    for (var u = 0, a = [], l = o.length; u < l; u++) {
                      if (o[u].fn !== t3 || i && !o[u].once || r && o[u].context !== r) {
                        a.push(o[u]);
                      }
                    }
                    if (a.length) this._events[s] = a.length === 1 ? a[0] : a;
                    else clearEvent(this, s);
                  }
                  return this;
                };
                EventEmitter.prototype.removeAllListeners = function removeAllListeners(e3) {
                  var t3;
                  if (e3) {
                    t3 = n2 ? n2 + e3 : e3;
                    if (this._events[t3]) clearEvent(this, t3);
                  } else {
                    this._events = new Events();
                    this._eventsCount = 0;
                  }
                  return this;
                };
                EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
                EventEmitter.prototype.addListener = EventEmitter.prototype.on;
                EventEmitter.prefixed = n2;
                EventEmitter.EventEmitter = EventEmitter;
                if ("TURBOPACK compile-time truthy", 1) {
                  e2.exports = EventEmitter;
                }
              },
              213: (e2) => {
                e2.exports = (e3, t2) => {
                  t2 = t2 || (() => {
                  });
                  return e3.then((e4) => new Promise((e5) => {
                    e5(t2());
                  }).then(() => e4), (e4) => new Promise((e5) => {
                    e5(t2());
                  }).then(() => {
                    throw e4;
                  }));
                };
              },
              574: (e2, t2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                function lowerBound(e3, t3, n2) {
                  let r = 0;
                  let i = e3.length;
                  while (i > 0) {
                    const s = i / 2 | 0;
                    let o = r + s;
                    if (n2(e3[o], t3) <= 0) {
                      r = ++o;
                      i -= s + 1;
                    } else {
                      i = s;
                    }
                  }
                  return r;
                }
                t2["default"] = lowerBound;
              },
              821: (e2, t2, n2) => {
                Object.defineProperty(t2, "__esModule", {
                  value: true
                });
                const r = n2(574);
                class PriorityQueue {
                  constructor() {
                    this._queue = [];
                  }
                  enqueue(e3, t3) {
                    t3 = Object.assign({
                      priority: 0
                    }, t3);
                    const n3 = {
                      priority: t3.priority,
                      run: e3
                    };
                    if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                      this._queue.push(n3);
                      return;
                    }
                    const i = r.default(this._queue, n3, (e4, t4) => t4.priority - e4.priority);
                    this._queue.splice(i, 0, n3);
                  }
                  dequeue() {
                    const e3 = this._queue.shift();
                    return e3 === null || e3 === void 0 ? void 0 : e3.run;
                  }
                  filter(e3) {
                    return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
                  }
                  get size() {
                    return this._queue.length;
                  }
                }
                t2["default"] = PriorityQueue;
              },
              816: (e2, t2, n2) => {
                const r = n2(213);
                class TimeoutError extends Error {
                  constructor(e3) {
                    super(e3);
                    this.name = "TimeoutError";
                  }
                }
                const pTimeout = (e3, t3, n3) => new Promise((i, s) => {
                  if (typeof t3 !== "number" || t3 < 0) {
                    throw new TypeError("Expected `milliseconds` to be a positive number");
                  }
                  if (t3 === Infinity) {
                    i(e3);
                    return;
                  }
                  const o = setTimeout(() => {
                    if (typeof n3 === "function") {
                      try {
                        i(n3());
                      } catch (e4) {
                        s(e4);
                      }
                      return;
                    }
                    const r2 = typeof n3 === "string" ? n3 : `Promise timed out after ${t3} milliseconds`;
                    const o2 = n3 instanceof Error ? n3 : new TimeoutError(r2);
                    if (typeof e3.cancel === "function") {
                      e3.cancel();
                    }
                    s(o2);
                  }, t3);
                  r(e3.then(i, s), () => {
                    clearTimeout(o);
                  });
                });
                e2.exports = pTimeout;
                e2.exports["default"] = pTimeout;
                e2.exports.TimeoutError = TimeoutError;
              }
            };
            var t = {};
            function __nccwpck_require__2(n2) {
              var r = t[n2];
              if (r !== void 0) {
                return r.exports;
              }
              var i = t[n2] = {
                exports: {}
              };
              var s = true;
              try {
                e[n2](i, i.exports, __nccwpck_require__2);
                s = false;
              } finally {
                if (s) delete t[n2];
              }
              return i.exports;
            }
            if (typeof __nccwpck_require__2 !== "undefined") __nccwpck_require__2.ab = __dirname2 + "/";
            var n = {};
            (() => {
              var e2 = n;
              Object.defineProperty(e2, "__esModule", {
                value: true
              });
              const t2 = __nccwpck_require__2(993);
              const r = __nccwpck_require__2(816);
              const i = __nccwpck_require__2(821);
              const empty = () => {
              };
              const s = new r.TimeoutError();
              class PQueue extends t2 {
                constructor(e3) {
                  var t3, n2, r2, s2;
                  super();
                  this._intervalCount = 0;
                  this._intervalEnd = 0;
                  this._pendingCount = 0;
                  this._resolveEmpty = empty;
                  this._resolveIdle = empty;
                  e3 = Object.assign({
                    carryoverConcurrencyCount: false,
                    intervalCap: Infinity,
                    interval: 0,
                    concurrency: Infinity,
                    autoStart: true,
                    queueClass: i.default
                  }, e3);
                  if (!(typeof e3.intervalCap === "number" && e3.intervalCap >= 1)) {
                    throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n2 = (t3 = e3.intervalCap) === null || t3 === void 0 ? void 0 : t3.toString()) !== null && n2 !== void 0 ? n2 : ""}\` (${typeof e3.intervalCap})`);
                  }
                  if (e3.interval === void 0 || !(Number.isFinite(e3.interval) && e3.interval >= 0)) {
                    throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s2 = (r2 = e3.interval) === null || r2 === void 0 ? void 0 : r2.toString()) !== null && s2 !== void 0 ? s2 : ""}\` (${typeof e3.interval})`);
                  }
                  this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount;
                  this._isIntervalIgnored = e3.intervalCap === Infinity || e3.interval === 0;
                  this._intervalCap = e3.intervalCap;
                  this._interval = e3.interval;
                  this._queue = new e3.queueClass();
                  this._queueClass = e3.queueClass;
                  this.concurrency = e3.concurrency;
                  this._timeout = e3.timeout;
                  this._throwOnTimeout = e3.throwOnTimeout === true;
                  this._isPaused = e3.autoStart === false;
                }
                get _doesIntervalAllowAnother() {
                  return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
                }
                get _doesConcurrentAllowAnother() {
                  return this._pendingCount < this._concurrency;
                }
                _next() {
                  this._pendingCount--;
                  this._tryToStartAnother();
                  this.emit("next");
                }
                _resolvePromises() {
                  this._resolveEmpty();
                  this._resolveEmpty = empty;
                  if (this._pendingCount === 0) {
                    this._resolveIdle();
                    this._resolveIdle = empty;
                    this.emit("idle");
                  }
                }
                _onResumeInterval() {
                  this._onInterval();
                  this._initializeIntervalIfNeeded();
                  this._timeoutId = void 0;
                }
                _isIntervalPaused() {
                  const e3 = Date.now();
                  if (this._intervalId === void 0) {
                    const t3 = this._intervalEnd - e3;
                    if (t3 < 0) {
                      this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                    } else {
                      if (this._timeoutId === void 0) {
                        this._timeoutId = setTimeout(() => {
                          this._onResumeInterval();
                        }, t3);
                      }
                      return true;
                    }
                  }
                  return false;
                }
                _tryToStartAnother() {
                  if (this._queue.size === 0) {
                    if (this._intervalId) {
                      clearInterval(this._intervalId);
                    }
                    this._intervalId = void 0;
                    this._resolvePromises();
                    return false;
                  }
                  if (!this._isPaused) {
                    const e3 = !this._isIntervalPaused();
                    if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                      const t3 = this._queue.dequeue();
                      if (!t3) {
                        return false;
                      }
                      this.emit("active");
                      t3();
                      if (e3) {
                        this._initializeIntervalIfNeeded();
                      }
                      return true;
                    }
                  }
                  return false;
                }
                _initializeIntervalIfNeeded() {
                  if (this._isIntervalIgnored || this._intervalId !== void 0) {
                    return;
                  }
                  this._intervalId = setInterval(() => {
                    this._onInterval();
                  }, this._interval);
                  this._intervalEnd = Date.now() + this._interval;
                }
                _onInterval() {
                  if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
                    clearInterval(this._intervalId);
                    this._intervalId = void 0;
                  }
                  this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                  this._processQueue();
                }
                _processQueue() {
                  while (this._tryToStartAnother()) {
                  }
                }
                get concurrency() {
                  return this._concurrency;
                }
                set concurrency(e3) {
                  if (!(typeof e3 === "number" && e3 >= 1)) {
                    throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
                  }
                  this._concurrency = e3;
                  this._processQueue();
                }
                async add(e3, t3 = {}) {
                  return new Promise((n2, i2) => {
                    const run = async () => {
                      this._pendingCount++;
                      this._intervalCount++;
                      try {
                        const o = this._timeout === void 0 && t3.timeout === void 0 ? e3() : r.default(Promise.resolve(e3()), t3.timeout === void 0 ? this._timeout : t3.timeout, () => {
                          if (t3.throwOnTimeout === void 0 ? this._throwOnTimeout : t3.throwOnTimeout) {
                            i2(s);
                          }
                          return void 0;
                        });
                        n2(await o);
                      } catch (e4) {
                        i2(e4);
                      }
                      this._next();
                    };
                    this._queue.enqueue(run, t3);
                    this._tryToStartAnother();
                    this.emit("add");
                  });
                }
                async addAll(e3, t3) {
                  return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
                }
                start() {
                  if (!this._isPaused) {
                    return this;
                  }
                  this._isPaused = false;
                  this._processQueue();
                  return this;
                }
                pause() {
                  this._isPaused = true;
                }
                clear() {
                  this._queue = new this._queueClass();
                }
                async onEmpty() {
                  if (this._queue.size === 0) {
                    return;
                  }
                  return new Promise((e3) => {
                    const t3 = this._resolveEmpty;
                    this._resolveEmpty = () => {
                      t3();
                      e3();
                    };
                  });
                }
                async onIdle() {
                  if (this._pendingCount === 0 && this._queue.size === 0) {
                    return;
                  }
                  return new Promise((e3) => {
                    const t3 = this._resolveIdle;
                    this._resolveIdle = () => {
                      t3();
                      e3();
                    };
                  });
                }
                get size() {
                  return this._queue.size;
                }
                sizeBy(e3) {
                  return this._queue.filter(e3).length;
                }
                get pending() {
                  return this._pendingCount;
                }
                get isPaused() {
                  return this._isPaused;
                }
                get timeout() {
                  return this._timeout;
                }
                set timeout(e3) {
                  this._timeout = e3;
                }
              }
              e2["default"] = PQueue;
            })();
            module2.exports = n;
          })();
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "InvariantError": () => InvariantError
          });
          class InvariantError extends Error {
            constructor(message, options) {
              super("Invariant: " + (message.endsWith(".") ? message : message + ".") + " This is a bug in Next.js.", options);
              this.name = "InvariantError";
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/lru-cache.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "LRUCache": () => LRUCache
          });
          class LRUCache {
            constructor(maxSize, calculateSize) {
              this.cache = /* @__PURE__ */ new Map();
              this.sizes = /* @__PURE__ */ new Map();
              this.totalSize = 0;
              this.maxSize = maxSize;
              this.calculateSize = calculateSize || (() => 1);
            }
            set(key, value) {
              if (!key || !value) return;
              const size = this.calculateSize(value);
              if (size > this.maxSize) {
                console.warn("Single item size exceeds maxSize");
                return;
              }
              if (this.cache.has(key)) {
                this.totalSize -= this.sizes.get(key) || 0;
              }
              this.cache.set(key, value);
              this.sizes.set(key, size);
              this.totalSize += size;
              this.touch(key);
            }
            has(key) {
              if (!key) return false;
              this.touch(key);
              return Boolean(this.cache.get(key));
            }
            get(key) {
              if (!key) return;
              const value = this.cache.get(key);
              if (value === void 0) {
                return void 0;
              }
              this.touch(key);
              return value;
            }
            touch(key) {
              const value = this.cache.get(key);
              if (value !== void 0) {
                this.cache.delete(key);
                this.cache.set(key, value);
                this.evictIfNecessary();
              }
            }
            evictIfNecessary() {
              while (this.totalSize > this.maxSize && this.cache.size > 0) {
                this.evictLeastRecentlyUsed();
              }
            }
            evictLeastRecentlyUsed() {
              const lruKey = this.cache.keys().next().value;
              if (lruKey !== void 0) {
                const lruSize = this.sizes.get(lruKey) || 0;
                this.totalSize -= lruSize;
                this.cache.delete(lruKey);
                this.sizes.delete(lruKey);
              }
            }
            reset() {
              this.cache.clear();
              this.sizes.clear();
              this.totalSize = 0;
            }
            keys() {
              return [
                ...this.cache.keys()
              ];
            }
            remove(key) {
              if (this.cache.has(key)) {
                this.totalSize -= this.sizes.get(key) || 0;
                this.cache.delete(key);
                this.sizes.delete(key);
              }
            }
            clear() {
              this.cache.clear();
              this.sizes.clear();
              this.totalSize = 0;
            }
            get size() {
              return this.cache.size;
            }
            get currentSize() {
              return this.totalSize;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/incremental-cache/tags-manifest.external.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "isStale": () => isStale,
            "tagsManifest": () => tagsManifest
          });
          const tagsManifest = /* @__PURE__ */ new Map();
          const isStale = (tags, timestamp) => {
            for (const tag of tags) {
              const revalidatedAt = tagsManifest.get(tag);
              if (typeof revalidatedAt === "number" && revalidatedAt >= timestamp) {
                return true;
              }
            }
            return false;
          };
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/cache-handlers/default.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "default": () => __TURBOPACK__default__export__
          });
          var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lru$2d$cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lru-cache.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/incremental-cache/tags-manifest.external.js [middleware-edge] (ecmascript)");
          ;
          ;
          const memoryCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lru$2d$cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LRUCache"](50 * 1024 * 1024, (entry) => entry.size);
          const pendingSets = /* @__PURE__ */ new Map();
          const debug2 = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, "DefaultCacheHandler:") : void 0;
          const DefaultCacheHandler = {
            async get(cacheKey) {
              const pendingPromise = pendingSets.get(cacheKey);
              if (pendingPromise) {
                debug2 == null ? void 0 : debug2("get", cacheKey, "pending");
                await pendingPromise;
              }
              const privateEntry = memoryCache.get(cacheKey);
              if (!privateEntry) {
                debug2 == null ? void 0 : debug2("get", cacheKey, "not found");
                return void 0;
              }
              const entry = privateEntry.entry;
              if (performance.timeOrigin + performance.now() > entry.timestamp + entry.revalidate * 1e3) {
                debug2 == null ? void 0 : debug2("get", cacheKey, "expired");
                return void 0;
              }
              if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isStale"])(entry.tags, entry.timestamp)) {
                debug2 == null ? void 0 : debug2("get", cacheKey, "had stale tag");
                return void 0;
              }
              const [returnStream, newSaved] = entry.value.tee();
              entry.value = newSaved;
              debug2 == null ? void 0 : debug2("get", cacheKey, "found", {
                tags: entry.tags,
                timestamp: entry.timestamp,
                revalidate: entry.revalidate,
                expire: entry.expire
              });
              return {
                ...entry,
                value: returnStream
              };
            },
            async set(cacheKey, pendingEntry) {
              debug2 == null ? void 0 : debug2("set", cacheKey, "start");
              let resolvePending = () => {
              };
              const pendingPromise = new Promise((resolve) => {
                resolvePending = resolve;
              });
              pendingSets.set(cacheKey, pendingPromise);
              const entry = await pendingEntry;
              let size = 0;
              try {
                const [value, clonedValue] = entry.value.tee();
                entry.value = value;
                const reader = clonedValue.getReader();
                for (let chunk; !(chunk = await reader.read()).done; ) {
                  size += __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(chunk.value).byteLength;
                }
                memoryCache.set(cacheKey, {
                  entry,
                  isErrored: false,
                  errorRetryCount: 0,
                  size
                });
                debug2 == null ? void 0 : debug2("set", cacheKey, "done");
              } catch (err) {
                debug2 == null ? void 0 : debug2("set", cacheKey, "failed", err);
              } finally {
                resolvePending();
                pendingSets.delete(cacheKey);
              }
            },
            async refreshTags() {
            },
            async getExpiration(...tags) {
              const expiration = Math.max(...tags.map((tag) => __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["tagsManifest"].get(tag) ?? 0));
              debug2 == null ? void 0 : debug2("getExpiration", {
                tags,
                expiration
              });
              return expiration;
            },
            async expireTags(...tags) {
              const timestamp = Math.round(performance.timeOrigin + performance.now());
              debug2 == null ? void 0 : debug2("expireTags", {
                tags,
                timestamp
              });
              for (const tag of tags) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["tagsManifest"].set(tag, timestamp);
              }
            }
          };
          const __TURBOPACK__default__export__ = DefaultCacheHandler;
        }
      },
      "[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let initializeCacheHandlers = function() {
            if (reference[handlersMapSymbol]) {
              debug2 == null ? void 0 : debug2("cache handlers already initialized");
              return false;
            }
            debug2 == null ? void 0 : debug2("initializing cache handlers");
            reference[handlersMapSymbol] = /* @__PURE__ */ new Map();
            if (reference[handlersSymbol]) {
              let fallback;
              if (reference[handlersSymbol].DefaultCache) {
                debug2 == null ? void 0 : debug2('setting "default" cache handler from symbol');
                fallback = reference[handlersSymbol].DefaultCache;
              } else {
                debug2 == null ? void 0 : debug2('setting "default" cache handler from default');
                fallback = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"];
              }
              reference[handlersMapSymbol].set("default", fallback);
              if (reference[handlersSymbol].RemoteCache) {
                debug2 == null ? void 0 : debug2('setting "remote" cache handler from symbol');
                reference[handlersMapSymbol].set("remote", reference[handlersSymbol].RemoteCache);
              } else {
                debug2 == null ? void 0 : debug2('setting "remote" cache handler from default');
                reference[handlersMapSymbol].set("remote", fallback);
              }
            } else {
              debug2 == null ? void 0 : debug2('setting "default" cache handler from default');
              reference[handlersMapSymbol].set("default", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
              debug2 == null ? void 0 : debug2('setting "remote" cache handler from default');
              reference[handlersMapSymbol].set("remote", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
            }
            reference[handlersSetSymbol] = new Set(reference[handlersMapSymbol].values());
            return true;
          }, getCacheHandler = function(kind) {
            if (!reference[handlersMapSymbol]) {
              throw Object.defineProperty(new Error("Cache handlers not initialized"), "__NEXT_ERROR_CODE", {
                value: "E649",
                enumerable: false,
                configurable: true
              });
            }
            return reference[handlersMapSymbol].get(kind);
          }, getCacheHandlers = function() {
            if (!reference[handlersSetSymbol]) {
              return void 0;
            }
            return reference[handlersSetSymbol].values();
          }, getCacheHandlerEntries = function() {
            if (!reference[handlersMapSymbol]) {
              return void 0;
            }
            return reference[handlersMapSymbol].entries();
          }, setCacheHandler = function(kind, cacheHandler) {
            if (!reference[handlersMapSymbol] || !reference[handlersSetSymbol]) {
              throw Object.defineProperty(new Error("Cache handlers not initialized"), "__NEXT_ERROR_CODE", {
                value: "E649",
                enumerable: false,
                configurable: true
              });
            }
            debug2 == null ? void 0 : debug2('setting cache handler for "%s"', kind);
            reference[handlersMapSymbol].set(kind, cacheHandler);
            reference[handlersSetSymbol].add(cacheHandler);
          };
          __turbopack_context__.s({
            "getCacheHandler": () => getCacheHandler,
            "getCacheHandlerEntries": () => getCacheHandlerEntries,
            "getCacheHandlers": () => getCacheHandlers,
            "initializeCacheHandlers": () => initializeCacheHandlers,
            "setCacheHandler": () => setCacheHandler
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/cache-handlers/default.js [middleware-edge] (ecmascript)");
          ;
          const debug2 = process.env.NEXT_PRIVATE_DEBUG_CACHE ? (message, ...args) => {
            console.log(`use-cache: ${message}`, ...args);
          } : void 0;
          const handlersSymbol = Symbol.for("@next/cache-handlers");
          const handlersMapSymbol = Symbol.for("@next/cache-handlers-map");
          const handlersSetSymbol = Symbol.for("@next/cache-handlers-set");
          const reference = globalThis;
        }
      },
      "[project]/node_modules/next/dist/esm/server/revalidation-utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let cloneRevalidationState = function(store) {
            return {
              pendingRevalidatedTags: store.pendingRevalidatedTags ? [
                ...store.pendingRevalidatedTags
              ] : [],
              pendingRevalidates: {
                ...store.pendingRevalidates
              },
              pendingRevalidateWrites: store.pendingRevalidateWrites ? [
                ...store.pendingRevalidateWrites
              ] : []
            };
          }, diffRevalidationState = function(prev, curr) {
            const prevTags = new Set(prev.pendingRevalidatedTags);
            const prevRevalidateWrites = new Set(prev.pendingRevalidateWrites);
            return {
              pendingRevalidatedTags: curr.pendingRevalidatedTags.filter((tag) => !prevTags.has(tag)),
              pendingRevalidates: Object.fromEntries(Object.entries(curr.pendingRevalidates).filter(([key]) => !(key in prev.pendingRevalidates))),
              pendingRevalidateWrites: curr.pendingRevalidateWrites.filter((promise) => !prevRevalidateWrites.has(promise))
            };
          };
          __turbopack_context__.s({
            "executeRevalidates": () => executeRevalidates,
            "withExecuteRevalidates": () => withExecuteRevalidates
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
          ;
          async function withExecuteRevalidates(store, callback) {
            if (!store) {
              return callback();
            }
            const savedRevalidationState = cloneRevalidationState(store);
            try {
              return await callback();
            } finally {
              const newRevalidates = diffRevalidationState(savedRevalidationState, cloneRevalidationState(store));
              await executeRevalidates(store, newRevalidates);
            }
          }
          async function revalidateTags(tags, incrementalCache) {
            if (tags.length === 0) {
              return;
            }
            const promises = [];
            if (incrementalCache) {
              promises.push(incrementalCache.revalidateTag(tags));
            }
            const handlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlers"])();
            if (handlers) {
              for (const handler3 of handlers) {
                promises.push(handler3.expireTags(...tags));
              }
            }
            await Promise.all(promises);
          }
          async function executeRevalidates(workStore, state) {
            const pendingRevalidatedTags = (state == null ? void 0 : state.pendingRevalidatedTags) ?? workStore.pendingRevalidatedTags ?? [];
            const pendingRevalidates = (state == null ? void 0 : state.pendingRevalidates) ?? workStore.pendingRevalidates ?? {};
            const pendingRevalidateWrites = (state == null ? void 0 : state.pendingRevalidateWrites) ?? workStore.pendingRevalidateWrites ?? [];
            return Promise.all([
              revalidateTags(pendingRevalidatedTags, workStore.incrementalCache),
              ...Object.values(pendingRevalidates),
              ...pendingRevalidateWrites
            ]);
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "afterTaskAsyncStorageInstance": () => afterTaskAsyncStorageInstance
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
          ;
          const afterTaskAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])();
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "afterTaskAsyncStorage": () => __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["afterTaskAsyncStorageInstance"]
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
        }
      },
      "[project]/node_modules/next/dist/esm/server/after/after-context.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let errorWaitUntilNotAvailable = function() {
            throw Object.defineProperty(new Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", {
              value: "E91",
              enumerable: false,
              configurable: true
            });
          };
          __turbopack_context__.s({
            "AfterContext": () => AfterContext
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/p-queue/index.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$revalidation$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/revalidation-utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>");
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          class AfterContext {
            constructor({ waitUntil, onClose, onTaskError }) {
              this.workUnitStores = /* @__PURE__ */ new Set();
              this.waitUntil = waitUntil;
              this.onClose = onClose;
              this.onTaskError = onTaskError;
              this.callbackQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]();
              this.callbackQueue.pause();
            }
            after(task) {
              if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isThenable"])(task)) {
                if (!this.waitUntil) {
                  errorWaitUntilNotAvailable();
                }
                this.waitUntil(task.catch((error2) => this.reportTaskError("promise", error2)));
              } else if (typeof task === "function") {
                this.addCallback(task);
              } else {
                throw Object.defineProperty(new Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", {
                  value: "E50",
                  enumerable: false,
                  configurable: true
                });
              }
            }
            addCallback(callback) {
              if (!this.waitUntil) {
                errorWaitUntilNotAvailable();
              }
              const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
              if (workUnitStore) {
                this.workUnitStores.add(workUnitStore);
              }
              const afterTaskStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].getStore();
              const rootTaskSpawnPhase = afterTaskStore ? afterTaskStore.rootTaskSpawnPhase : workUnitStore == null ? void 0 : workUnitStore.phase;
              if (!this.runCallbacksOnClosePromise) {
                this.runCallbacksOnClosePromise = this.runCallbacksOnClose();
                this.waitUntil(this.runCallbacksOnClosePromise);
              }
              const wrappedCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["bindSnapshot"])(async () => {
                try {
                  await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].run({
                    rootTaskSpawnPhase
                  }, () => callback());
                } catch (error2) {
                  this.reportTaskError("function", error2);
                }
              });
              this.callbackQueue.add(wrappedCallback);
            }
            async runCallbacksOnClose() {
              await new Promise((resolve) => this.onClose(resolve));
              return this.runCallbacks();
            }
            async runCallbacks() {
              if (this.callbackQueue.size === 0) return;
              for (const workUnitStore of this.workUnitStores) {
                workUnitStore.phase = "after";
              }
              const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
              if (!workStore) {
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", {
                  value: "E547",
                  enumerable: false,
                  configurable: true
                });
              }
              return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$revalidation$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["withExecuteRevalidates"])(workStore, () => {
                this.callbackQueue.start();
                return this.callbackQueue.onIdle();
              });
            }
            reportTaskError(taskKind, error2) {
              console.error(taskKind === "promise" ? `A promise passed to \`after()\` rejected:` : `An error occurred in a function passed to \`after()\`:`, error2);
              if (this.onTaskError) {
                try {
                  this.onTaskError == null ? void 0 : this.onTaskError.call(this, error2);
                } catch (handlerError) {
                  console.error(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]("`onTaskError` threw while handling an error thrown from an `after` task", {
                    cause: handlerError
                  }), "__NEXT_ERROR_CODE", {
                    value: "E569",
                    enumerable: false,
                    configurable: true
                  }));
                }
              }
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createLazyResult = function(fn) {
            let pendingResult;
            const result = {
              then(onfulfilled, onrejected) {
                if (!pendingResult) {
                  pendingResult = fn();
                }
                pendingResult.then((value) => {
                  result.value = value;
                }).catch(() => {
                });
                return pendingResult.then(onfulfilled, onrejected);
              }
            };
            return result;
          }, isResolvedLazyResult = function(result) {
            return result.hasOwnProperty("value");
          };
          __turbopack_context__.s({
            "createLazyResult": () => createLazyResult,
            "isResolvedLazyResult": () => isResolvedLazyResult
          });
        }
      },
      "[project]/node_modules/next/dist/esm/server/async-storage/work-store.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createWorkStore = function({ page, fallbackRouteParams, renderOpts, requestEndedState, isPrefetchRequest, buildId, previouslyRevalidatedTags }) {
            const isStaticGeneration = !renderOpts.shouldWaitOnAllReady && !renderOpts.supportsDynamicResponse && !renderOpts.isDraftMode && !renderOpts.isPossibleServerAction;
            const store = {
              isStaticGeneration,
              page,
              fallbackRouteParams,
              route: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeAppPath"])(page),
              incrementalCache: (
                // so that it can access the fs cache without mocks
                renderOpts.incrementalCache || globalThis.__incrementalCache
              ),
              cacheLifeProfiles: renderOpts.cacheLifeProfiles,
              isRevalidate: renderOpts.isRevalidate,
              isPrerendering: renderOpts.nextExport,
              fetchCache: renderOpts.fetchCache,
              isOnDemandRevalidate: renderOpts.isOnDemandRevalidate,
              isDraftMode: renderOpts.isDraftMode,
              requestEndedState,
              isPrefetchRequest,
              buildId,
              reactLoadableManifest: (renderOpts == null ? void 0 : renderOpts.reactLoadableManifest) || {},
              assetPrefix: (renderOpts == null ? void 0 : renderOpts.assetPrefix) || "",
              afterContext: createAfterContext(renderOpts),
              dynamicIOEnabled: renderOpts.experimental.dynamicIO,
              dev: renderOpts.dev ?? false,
              previouslyRevalidatedTags,
              refreshTagsByCacheKind: createRefreshTagsByCacheKind()
            };
            renderOpts.store = store;
            return store;
          }, createAfterContext = function(renderOpts) {
            const { waitUntil, onClose, onAfterTaskError } = renderOpts;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AfterContext"]({
              waitUntil,
              onClose,
              onTaskError: onAfterTaskError
            });
          }, createRefreshTagsByCacheKind = function() {
            const refreshTagsByCacheKind = /* @__PURE__ */ new Map();
            const cacheHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlerEntries"])();
            if (cacheHandlers) {
              for (const [kind, cacheHandler] of cacheHandlers) {
                if ("refreshTags" in cacheHandler) {
                  refreshTagsByCacheKind.set(kind, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLazyResult"])(async () => cacheHandler.refreshTags()));
                }
              }
            }
            return refreshTagsByCacheKind;
          };
          __turbopack_context__.s({
            "createWorkStore": () => createWorkStore
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after-context.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/web-on-close.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let trackBodyConsumed = function(body, onEnd) {
            if (typeof body === "string") {
              const generator = async function* generate() {
                const encoder = new TextEncoder();
                yield encoder.encode(body);
                onEnd();
              };
              return generator();
            } else {
              return trackStreamConsumed(body, onEnd);
            }
          }, trackStreamConsumed = function(stream, onEnd) {
            const dest = new TransformStream();
            const runOnEnd = () => onEnd();
            stream.pipeTo(dest.writable).then(runOnEnd, runOnEnd);
            return dest.readable;
          };
          __turbopack_context__.s({
            "CloseController": () => CloseController,
            "trackBodyConsumed": () => trackBodyConsumed,
            "trackStreamConsumed": () => trackStreamConsumed
          });
          class CloseController {
            onClose(callback) {
              if (this.isClosed) {
                throw Object.defineProperty(new Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", {
                  value: "E365",
                  enumerable: false,
                  configurable: true
                });
              }
              this.target.addEventListener("close", callback);
              this.listeners++;
            }
            dispatchClose() {
              if (this.isClosed) {
                throw Object.defineProperty(new Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", {
                  value: "E229",
                  enumerable: false,
                  configurable: true
                });
              }
              if (this.listeners > 0) {
                this.target.dispatchEvent(new Event("close"));
              }
              this.isClosed = true;
            }
            constructor() {
              this.target = new EventTarget();
              this.listeners = 0;
              this.isClosed = false;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/get-edge-preview-props.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getEdgePreviewProps = function() {
            return {
              previewModeId: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : "development-id",
              previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "",
              previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || ""
            };
          };
          __turbopack_context__.s({
            "getEdgePreviewProps": () => getEdgePreviewProps
          });
        }
      },
      "[project]/node_modules/next/dist/esm/server/after/builtin-request-context.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let getBuiltinRequestContext = function() {
            const _globalThis = globalThis;
            const ctx = _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
            return ctx == null ? void 0 : ctx.get();
          }, createLocalRequestContext = function() {
            const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])();
            return {
              get: () => storage.getStore(),
              run: (value, callback) => storage.run(value, callback)
            };
          };
          __turbopack_context__.s({
            "createLocalRequestContext": () => createLocalRequestContext,
            "getBuiltinRequestContext": () => getBuiltinRequestContext
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
          ;
          const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
        }
      },
      "[project]/node_modules/next/dist/esm/server/lib/implicit-tags.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createTagsExpirationsByCacheKind = function(tags) {
            const expirationsByCacheKind = /* @__PURE__ */ new Map();
            const cacheHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlerEntries"])();
            if (cacheHandlers) {
              for (const [kind, cacheHandler] of cacheHandlers) {
                if ("getExpiration" in cacheHandler) {
                  expirationsByCacheKind.set(kind, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLazyResult"])(async () => cacheHandler.getExpiration(...tags)));
                }
              }
            }
            return expirationsByCacheKind;
          };
          __turbopack_context__.s({
            "getImplicitTags": () => getImplicitTags
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          const getDerivedTags = (pathname) => {
            const derivedTags = [
              `/layout`
            ];
            if (pathname.startsWith("/")) {
              const pathnameParts = pathname.split("/");
              for (let i = 1; i < pathnameParts.length + 1; i++) {
                let curPathname = pathnameParts.slice(0, i).join("/");
                if (curPathname) {
                  if (!curPathname.endsWith("/page") && !curPathname.endsWith("/route")) {
                    curPathname = `${curPathname}${!curPathname.endsWith("/") ? "/" : ""}layout`;
                  }
                  derivedTags.push(curPathname);
                }
              }
            }
            return derivedTags;
          };
          async function getImplicitTags(page, url, fallbackRouteParams) {
            const tags = [];
            const hasFallbackRouteParams = fallbackRouteParams && fallbackRouteParams.size > 0;
            const derivedTags = getDerivedTags(page);
            for (let tag of derivedTags) {
              tag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_CACHE_IMPLICIT_TAG_ID"]}${tag}`;
              tags.push(tag);
            }
            if (url.pathname && !hasFallbackRouteParams) {
              const tag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_CACHE_IMPLICIT_TAG_ID"]}${url.pathname}`;
              tags.push(tag);
            }
            return {
              tags,
              expirationsByCacheKind: createTagsExpirationsByCacheKind(tags)
            };
          }
        }
      },
      "[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          let _export2 = function(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
              enumerable: true,
              get: all[name]
            });
          }, extractTestInfoFromRequest2 = function(req, reader) {
            const proxyPortHeader = reader.header(req, "next-test-proxy-port");
            if (!proxyPortHeader) {
              return void 0;
            }
            const url = reader.url(req);
            const proxyPort = Number(proxyPortHeader);
            const testData = reader.header(req, "next-test-data") || "";
            return {
              url,
              proxyPort,
              testData
            };
          }, withRequest2 = function(req, reader, fn) {
            const testReqInfo = extractTestInfoFromRequest2(req, reader);
            if (!testReqInfo) {
              return fn();
            }
            return testStorage.run(testReqInfo, fn);
          }, getTestReqInfo2 = function(req, reader) {
            const testReqInfo = testStorage.getStore();
            if (testReqInfo) {
              return testReqInfo;
            }
            if (req && reader) {
              return extractTestInfoFromRequest2(req, reader);
            }
            return void 0;
          };
          var _export = _export2, extractTestInfoFromRequest = extractTestInfoFromRequest2, withRequest = withRequest2, getTestReqInfo = getTestReqInfo2;
          "use strict";
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          _export2(exports2, {
            getTestReqInfo: function() {
              return getTestReqInfo2;
            },
            withRequest: function() {
              return withRequest2;
            }
          });
          const _nodeasync_hooks = __turbopack_context__.r("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
          const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
        }
      },
      "[project]/node_modules/next/dist/experimental/testmode/fetch.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          let _export2 = function(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
              enumerable: true,
              get: all[name]
            });
          }, getTestStack2 = function() {
            let stack = (new Error().stack ?? "").split("\n");
            for (let i = 1; i < stack.length; i++) {
              if (stack[i].length > 0) {
                stack = stack.slice(i);
                break;
              }
            }
            stack = stack.filter((f) => !f.includes("/next/dist/"));
            stack = stack.slice(0, 5);
            stack = stack.map((s) => s.replace("webpack-internal:///(rsc)/", "").trim());
            return stack.join("    ");
          }, buildResponse2 = function(proxyResponse) {
            const { status, headers, body } = proxyResponse.response;
            return new Response(body ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(body, "base64") : null, {
              status,
              headers: new Headers(headers)
            });
          }, interceptFetch2 = function(originalFetch) {
            global.fetch = function testFetch(input, init) {
              var _init_next;
              if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
                return originalFetch(input, init);
              }
              return handleFetch(originalFetch, new Request(input, init));
            };
            return () => {
              global.fetch = originalFetch;
            };
          };
          var _export = _export2, getTestStack = getTestStack2, buildResponse = buildResponse2, interceptFetch = interceptFetch2;
          var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
          "use strict";
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          _export2(exports2, {
            handleFetch: function() {
              return handleFetch;
            },
            interceptFetch: function() {
              return interceptFetch2;
            },
            reader: function() {
              return reader;
            }
          });
          const _context = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)");
          const reader = {
            url(req) {
              return req.url;
            },
            header(req, name) {
              return req.headers.get(name);
            }
          };
          async function buildProxyRequest(testData, request) {
            const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
            return {
              testData,
              api: "fetch",
              request: {
                url,
                method,
                headers: [
                  ...Array.from(headers),
                  [
                    "next-test-stack",
                    getTestStack2()
                  ]
                ],
                body: body ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(await request.arrayBuffer()).toString("base64") : null,
                cache,
                credentials,
                integrity,
                mode,
                redirect,
                referrer,
                referrerPolicy
              }
            };
          }
          async function handleFetch(originalFetch, request) {
            const testInfo = (0, _context.getTestReqInfo)(request, reader);
            if (!testInfo) {
              return originalFetch(request);
            }
            const { testData, proxyPort } = testInfo;
            const proxyRequest = await buildProxyRequest(testData, request);
            const resp = await originalFetch(`http://localhost:${proxyPort}`, {
              method: "POST",
              body: JSON.stringify(proxyRequest),
              next: {
                // @ts-ignore
                internal: true
              }
            });
            if (!resp.ok) {
              throw Object.defineProperty(new Error(`Proxy request failed: ${resp.status}`), "__NEXT_ERROR_CODE", {
                value: "E146",
                enumerable: false,
                configurable: true
              });
            }
            const proxyResponse = await resp.json();
            const { api } = proxyResponse;
            switch (api) {
              case "continue":
                return originalFetch(request);
              case "abort":
              case "unhandled":
                throw Object.defineProperty(new Error(`Proxy request aborted [${request.method} ${request.url}]`), "__NEXT_ERROR_CODE", {
                  value: "E145",
                  enumerable: false,
                  configurable: true
                });
              default:
                break;
            }
            return buildResponse2(proxyResponse);
          }
        }
      },
      "[project]/node_modules/next/dist/experimental/testmode/server-edge.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          let _export2 = function(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
              enumerable: true,
              get: all[name]
            });
          }, interceptTestApis2 = function() {
            return (0, _fetch.interceptFetch)(global.fetch);
          }, wrapRequestHandler2 = function(handler3) {
            return (req, fn) => (0, _context.withRequest)(req, _fetch.reader, () => handler3(req, fn));
          };
          var _export = _export2, interceptTestApis = interceptTestApis2, wrapRequestHandler = wrapRequestHandler2;
          "use strict";
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          _export2(exports2, {
            interceptTestApis: function() {
              return interceptTestApis2;
            },
            wrapRequestHandler: function() {
              return wrapRequestHandler2;
            }
          });
          const _context = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)");
          const _fetch = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/fetch.js [middleware-edge] (ecmascript)");
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/adapter.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let ensureTestApisIntercepted = function() {
            if (!testApisIntercepted) {
              testApisIntercepted = true;
              if (process.env.NEXT_PRIVATE_TEST_PROXY === "true") {
                const { interceptTestApis, wrapRequestHandler } = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/server-edge.js [middleware-edge] (ecmascript)");
                interceptTestApis();
                propagator = wrapRequestHandler(propagator);
              }
            }
          };
          __turbopack_context__.s({
            "NextRequestHint": () => NextRequestHint,
            "adapter": () => adapter
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/internal-utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$request$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/request-store.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$work$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/work-store.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/web-on-close.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/get-edge-preview-props.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$builtin$2d$request$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/builtin-request-context.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$implicit$2d$tags$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/implicit-tags.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          class NextRequestHint extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextRequest"] {
            constructor(params) {
              super(params.input, params.init);
              this.sourcePage = params.page;
            }
            get request() {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
                page: this.sourcePage
              }), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
              });
            }
            respondWith() {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
                page: this.sourcePage
              }), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
              });
            }
            waitUntil() {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
                page: this.sourcePage
              }), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
              });
            }
          }
          const headersGetter = {
            keys: (headers) => Array.from(headers.keys()),
            get: (headers, key) => headers.get(key) ?? void 0
          };
          let propagator = (request, fn) => {
            const tracer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])();
            return tracer.withPropagatedContext(request.headers, fn, headersGetter);
          };
          let testApisIntercepted = false;
          async function adapter(params) {
            var _getBuiltinRequestContext;
            ensureTestApisIntercepted();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ensureInstrumentationRegistered"])();
            const isEdgeRendering = typeof globalThis.__BUILD_MANIFEST !== "undefined";
            params.request.url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeRscURL"])(params.request.url);
            const requestURL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](params.request.url, {
              headers: params.request.headers,
              nextConfig: params.request.nextConfig
            });
            const keys = [
              ...requestURL.searchParams.keys()
            ];
            for (const key of keys) {
              const value = requestURL.searchParams.getAll(key);
              const normalizedKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeNextQueryParam"])(key);
              if (normalizedKey) {
                requestURL.searchParams.delete(normalizedKey);
                for (const val of value) {
                  requestURL.searchParams.append(normalizedKey, val);
                }
                requestURL.searchParams.delete(key);
              }
            }
            const buildId = requestURL.buildId;
            requestURL.buildId = "";
            const requestHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["fromNodeOutgoingHttpHeaders"])(params.request.headers);
            const isNextDataRequest = requestHeaders.has("x-nextjs-data");
            const isRSCRequest = requestHeaders.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RSC_HEADER"]) === "1";
            if (isNextDataRequest && requestURL.pathname === "/index") {
              requestURL.pathname = "/";
            }
            const flightHeaders = /* @__PURE__ */ new Map();
            if (!isEdgeRendering) {
              for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]) {
                const key = header.toLowerCase();
                const value = requestHeaders.get(key);
                if (value !== null) {
                  flightHeaders.set(key, value);
                  requestHeaders.delete(key);
                }
              }
            }
            const normalizeURL = process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? new URL(params.request.url) : requestURL;
            const request = new NextRequestHint({
              page: params.page,
              // Strip internal query parameters off the request.
              input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stripInternalSearchParams"])(normalizeURL).toString(),
              init: {
                body: params.request.body,
                headers: requestHeaders,
                method: params.request.method,
                nextConfig: params.request.nextConfig,
                signal: params.request.signal
              }
            });
            if (isNextDataRequest) {
              Object.defineProperty(request, "__isData", {
                enumerable: false,
                value: true
              });
            }
            if (!globalThis.__incrementalCache && params.IncrementalCache) {
              ;
              globalThis.__incrementalCache = new params.IncrementalCache({
                appDir: true,
                fetchCache: true,
                minimalMode: ("TURBOPACK compile-time value", "development") !== "development",
                fetchCacheKeyPrefix: ("TURBOPACK compile-time value", ""),
                dev: ("TURBOPACK compile-time value", "development") === "development",
                requestHeaders: params.request.headers,
                requestProtocol: "https",
                getPrerenderManifest: () => {
                  return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgePreviewProps"])()
                  };
                }
              });
            }
            const outerWaitUntil = params.request.waitUntil ?? ((_getBuiltinRequestContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$builtin$2d$request$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBuiltinRequestContext"])()) == null ? void 0 : _getBuiltinRequestContext.waitUntil);
            const event = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextFetchEvent"]({
              request,
              page: params.page,
              context: outerWaitUntil ? {
                waitUntil: outerWaitUntil
              } : void 0
            });
            let response;
            let cookiesFromResponse;
            response = await propagator(request, () => {
              const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
              if (isMiddleware) {
                const waitUntil = event.waitUntil.bind(event);
                const closeController = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CloseController"]();
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MiddlewareSpan"].execute, {
                  spanName: `middleware ${request.method} ${request.nextUrl.pathname}`,
                  attributes: {
                    "http.target": request.nextUrl.pathname,
                    "http.method": request.method
                  }
                }, async () => {
                  try {
                    var _params_request_nextConfig_experimental, _params_request_nextConfig, _params_request_nextConfig_experimental1, _params_request_nextConfig1;
                    const onUpdateCookies = (cookies) => {
                      cookiesFromResponse = cookies;
                    };
                    const previewProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgePreviewProps"])();
                    const page = "/";
                    const fallbackRouteParams = null;
                    const implicitTags = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$implicit$2d$tags$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getImplicitTags"])(page, request.nextUrl, fallbackRouteParams);
                    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$request$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRequestStoreForAPI"])(request, request.nextUrl, implicitTags, onUpdateCookies, previewProps);
                    const workStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$work$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createWorkStore"])({
                      page,
                      fallbackRouteParams,
                      renderOpts: {
                        cacheLifeProfiles: (_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : _params_request_nextConfig_experimental.cacheLife,
                        experimental: {
                          isRoutePPREnabled: false,
                          dynamicIO: false,
                          authInterrupts: !!((_params_request_nextConfig1 = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental1 = _params_request_nextConfig1.experimental) == null ? void 0 : _params_request_nextConfig_experimental1.authInterrupts)
                        },
                        supportsDynamicResponse: true,
                        waitUntil,
                        onClose: closeController.onClose.bind(closeController),
                        onAfterTaskError: void 0
                      },
                      requestEndedState: {
                        ended: false
                      },
                      isPrefetchRequest: request.headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_ROUTER_PREFETCH_HEADER"]),
                      buildId: buildId ?? "",
                      previouslyRevalidatedTags: []
                    });
                    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].run(workStore, () => __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].run(requestStore, params.handler, request, event));
                  } finally {
                    setTimeout(() => {
                      closeController.dispatchClose();
                    }, 0);
                  }
                });
              }
              return params.handler(request, event);
            });
            if (response && !(response instanceof Response)) {
              throw Object.defineProperty(new TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", {
                value: "E567",
                enumerable: false,
                configurable: true
              });
            }
            if (response && cookiesFromResponse) {
              response.headers.set("set-cookie", cookiesFromResponse);
            }
            const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
            if (response && rewrite && (isRSCRequest || !isEdgeRendering)) {
              const destination = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](rewrite, {
                forceLocale: true,
                headers: params.request.headers,
                nextConfig: params.request.nextConfig
              });
              if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE && !isEdgeRendering) {
                if (destination.host === request.nextUrl.host) {
                  destination.buildId = buildId || destination.buildId;
                  response.headers.set("x-middleware-rewrite", String(destination));
                }
              }
              const { url: relativeDestination, isRelative } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseRelativeURL"])(destination.toString(), requestURL.toString());
              if (!isEdgeRendering && isNextDataRequest && // if the rewrite is external and external rewrite
              // resolving config is enabled don't add this header
              // so the upstream app can set it instead
              !("TURBOPACK compile-time value", false)) {
                response.headers.set("x-nextjs-rewrite", relativeDestination);
              }
              if (isRSCRequest && isRelative) {
                if (requestURL.pathname !== destination.pathname) {
                  response.headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_REWRITTEN_PATH_HEADER"], destination.pathname);
                }
                if (requestURL.search !== destination.search) {
                  response.headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_REWRITTEN_QUERY_HEADER"], destination.search.slice(1));
                }
              }
            }
            const redirect = response == null ? void 0 : response.headers.get("Location");
            if (response && redirect && !isEdgeRendering) {
              const redirectURL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](redirect, {
                forceLocale: false,
                headers: params.request.headers,
                nextConfig: params.request.nextConfig
              });
              response = new Response(response.body, response);
              if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE) {
                if (redirectURL.host === requestURL.host) {
                  redirectURL.buildId = buildId || redirectURL.buildId;
                  response.headers.set("Location", redirectURL.toString());
                }
              }
              if (isNextDataRequest) {
                response.headers.delete("Location");
                response.headers.set("x-nextjs-redirect", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRelativeURL"])(redirectURL.toString(), requestURL.toString()));
              }
            }
            const finalResponse = response ? response : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
            const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
            const overwrittenHeaders = [];
            if (middlewareOverrideHeaders) {
              for (const [key, value] of flightHeaders) {
                finalResponse.headers.set(`x-middleware-request-${key}`, value);
                overwrittenHeaders.push(key);
              }
              if (overwrittenHeaders.length > 0) {
                finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
              }
            }
            return {
              response: finalResponse,
              waitUntil: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getWaitUntilPromiseFromEvent"])(event) ?? Promise.resolve(),
              fetchMetrics: request.fetchMetrics
            };
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let ImageResponse = function() {
            throw Object.defineProperty(new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", {
              value: "E183",
              enumerable: false,
              configurable: true
            });
          };
          __turbopack_context__.s({
            "ImageResponse": () => ImageResponse
          });
        }
      },
      "[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          (() => {
            var i = {
              226: function(i2, e2) {
                (function(o2, a) {
                  "use strict";
                  var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350;
                  var T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", W = "Viera", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
                  var extend = function(i3, e3) {
                    var o3 = {};
                    for (var a2 in i3) {
                      if (e3[a2] && e3[a2].length % 2 === 0) {
                        o3[a2] = e3[a2].concat(i3[a2]);
                      } else {
                        o3[a2] = i3[a2];
                      }
                    }
                    return o3;
                  }, enumerize = function(i3) {
                    var e3 = {};
                    for (var o3 = 0; o3 < i3.length; o3++) {
                      e3[i3[o3].toUpperCase()] = i3[o3];
                    }
                    return e3;
                  }, has = function(i3, e3) {
                    return typeof i3 === l ? lowerize(e3).indexOf(lowerize(i3)) !== -1 : false;
                  }, lowerize = function(i3) {
                    return i3.toLowerCase();
                  }, majorize = function(i3) {
                    return typeof i3 === l ? i3.replace(/[^\d\.]/g, t).split(".")[0] : a;
                  }, trim = function(i3, e3) {
                    if (typeof i3 === l) {
                      i3 = i3.replace(/^\s\s*/, t);
                      return typeof e3 === b ? i3 : i3.substring(0, q);
                    }
                  };
                  var rgxMapper = function(i3, e3) {
                    var o3 = 0, r2, t2, n2, b2, l2, d2;
                    while (o3 < e3.length && !l2) {
                      var c2 = e3[o3], u2 = e3[o3 + 1];
                      r2 = t2 = 0;
                      while (r2 < c2.length && !l2) {
                        if (!c2[r2]) {
                          break;
                        }
                        l2 = c2[r2++].exec(i3);
                        if (!!l2) {
                          for (n2 = 0; n2 < u2.length; n2++) {
                            d2 = l2[++t2];
                            b2 = u2[n2];
                            if (typeof b2 === w && b2.length > 0) {
                              if (b2.length === 2) {
                                if (typeof b2[1] == s) {
                                  this[b2[0]] = b2[1].call(this, d2);
                                } else {
                                  this[b2[0]] = b2[1];
                                }
                              } else if (b2.length === 3) {
                                if (typeof b2[1] === s && !(b2[1].exec && b2[1].test)) {
                                  this[b2[0]] = d2 ? b2[1].call(this, d2, b2[2]) : a;
                                } else {
                                  this[b2[0]] = d2 ? d2.replace(b2[1], b2[2]) : a;
                                }
                              } else if (b2.length === 4) {
                                this[b2[0]] = d2 ? b2[3].call(this, d2.replace(b2[1], b2[2])) : a;
                              }
                            } else {
                              this[b2] = d2 ? d2 : a;
                            }
                          }
                        }
                      }
                      o3 += 2;
                    }
                  }, strMapper = function(i3, e3) {
                    for (var o3 in e3) {
                      if (typeof e3[o3] === w && e3[o3].length > 0) {
                        for (var r2 = 0; r2 < e3[o3].length; r2++) {
                          if (has(e3[o3][r2], i3)) {
                            return o3 === n ? a : o3;
                          }
                        }
                      } else if (has(e3[o3], i3)) {
                        return o3 === n ? a : o3;
                      }
                    }
                    return i3;
                  };
                  var $ = {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                  }, X = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: [
                      "NT 5.1",
                      "NT 5.2"
                    ],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: [
                      "NT 6.4",
                      "NT 10.0"
                    ],
                    RT: "ARM"
                  };
                  var K = {
                    browser: [
                      [
                        /\b(?:crmo|crios)\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Chrome"
                        ]
                      ],
                      [
                        /edg(?:e|ios|a)?\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Edge"
                        ]
                      ],
                      [
                        /(opera mini)\/([-\w\.]+)/i,
                        /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                        /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /opios[\/ ]+([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          B + " Mini"
                        ]
                      ],
                      [
                        /\bopr\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          B
                        ]
                      ],
                      [
                        /(kindle)\/([\w\.]+)/i,
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                        /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                        /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                        /(?:ms|\()(ie) ([\w\.]+)/i,
                        /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                        /(heytap|ovi)browser\/([\d\.]+)/i,
                        /(weibo)__([\d\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "UC" + A
                        ]
                      ],
                      [
                        /microm.+\bqbcore\/([\w\.]+)/i,
                        /\bqbcore\/([\w\.]+).+microm/i
                      ],
                      [
                        f,
                        [
                          u,
                          "WeChat(Win) Desktop"
                        ]
                      ],
                      [
                        /micromessenger\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "WeChat"
                        ]
                      ],
                      [
                        /konqueror\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Konqueror"
                        ]
                      ],
                      [
                        /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
                      ],
                      [
                        f,
                        [
                          u,
                          "IE"
                        ]
                      ],
                      [
                        /ya(?:search)?browser\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Yandex"
                        ]
                      ],
                      [
                        /(avast|avg)\/([\w\.]+)/i
                      ],
                      [
                        [
                          u,
                          /(.+)/,
                          "$1 Secure " + A
                        ],
                        f
                      ],
                      [
                        /\bfocus\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          O + " Focus"
                        ]
                      ],
                      [
                        /\bopt\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          B + " Touch"
                        ]
                      ],
                      [
                        /coc_coc\w+\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Coc Coc"
                        ]
                      ],
                      [
                        /dolfin\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Dolphin"
                        ]
                      ],
                      [
                        /coast\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          B + " Coast"
                        ]
                      ],
                      [
                        /miuibrowser\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "MIUI " + A
                        ]
                      ],
                      [
                        /fxios\/([-\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          O
                        ]
                      ],
                      [
                        /\bqihu|(qi?ho?o?|360)browser/i
                      ],
                      [
                        [
                          u,
                          "360 " + A
                        ]
                      ],
                      [
                        /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
                      ],
                      [
                        [
                          u,
                          /(.+)/,
                          "$1 " + A
                        ],
                        f
                      ],
                      [
                        /(comodo_dragon)\/([\w\.]+)/i
                      ],
                      [
                        [
                          u,
                          /_/g,
                          " "
                        ],
                        f
                      ],
                      [
                        /(electron)\/([\w\.]+) safari/i,
                        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                        /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(metasr)[\/ ]?([\w\.]+)/i,
                        /(lbbrowser)/i,
                        /\[(linkedin)app\]/i
                      ],
                      [
                        u
                      ],
                      [
                        /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
                      ],
                      [
                        [
                          u,
                          H
                        ],
                        f
                      ],
                      [
                        /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                        /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                        /safari (line)\/([\w\.]+)/i,
                        /\b(line)\/([\w\.]+)\/iab/i,
                        /(chromium|instagram)[\/ ]([-\w\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /\bgsa\/([\w\.]+) .*safari\//i
                      ],
                      [
                        f,
                        [
                          u,
                          "GSA"
                        ]
                      ],
                      [
                        /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "TikTok"
                        ]
                      ],
                      [
                        /headlesschrome(?:\/([\w\.]+)| )/i
                      ],
                      [
                        f,
                        [
                          u,
                          C + " Headless"
                        ]
                      ],
                      [
                        / wv\).+(chrome)\/([\w\.]+)/i
                      ],
                      [
                        [
                          u,
                          C + " WebView"
                        ],
                        f
                      ],
                      [
                        /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Android " + A
                        ]
                      ],
                      [
                        /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Mobile Safari"
                        ]
                      ],
                      [
                        /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
                      ],
                      [
                        f,
                        u
                      ],
                      [
                        /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
                      ],
                      [
                        u,
                        [
                          f,
                          strMapper,
                          $
                        ]
                      ],
                      [
                        /(webkit|khtml)\/([\w\.]+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(navigator|netscape\d?)\/([-\w\.]+)/i
                      ],
                      [
                        [
                          u,
                          "Netscape"
                        ],
                        f
                      ],
                      [
                        /mobile vr; rv:([\w\.]+)\).+firefox/i
                      ],
                      [
                        f,
                        [
                          u,
                          O + " Reality"
                        ]
                      ],
                      [
                        /ekiohf.+(flow)\/([\w\.]+)/i,
                        /(swiftfox)/i,
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                        /(firefox)\/([\w\.]+)/i,
                        /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                        /(links) \(([\w\.]+)/i,
                        /panasonic;(viera)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(cobalt)\/([\w\.]+)/i
                      ],
                      [
                        u,
                        [
                          f,
                          /master.|lts./,
                          ""
                        ]
                      ]
                    ],
                    cpu: [
                      [
                        /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
                      ],
                      [
                        [
                          h,
                          "amd64"
                        ]
                      ],
                      [
                        /(ia32(?=;))/i
                      ],
                      [
                        [
                          h,
                          lowerize
                        ]
                      ],
                      [
                        /((?:i[346]|x)86)[;\)]/i
                      ],
                      [
                        [
                          h,
                          "ia32"
                        ]
                      ],
                      [
                        /\b(aarch64|arm(v?8e?l?|_?64))\b/i
                      ],
                      [
                        [
                          h,
                          "arm64"
                        ]
                      ],
                      [
                        /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                      ],
                      [
                        [
                          h,
                          "armhf"
                        ]
                      ],
                      [
                        /windows (ce|mobile); ppc;/i
                      ],
                      [
                        [
                          h,
                          "arm"
                        ]
                      ],
                      [
                        /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
                      ],
                      [
                        [
                          h,
                          /ower/,
                          t,
                          lowerize
                        ]
                      ],
                      [
                        /(sun4\w)[;\)]/i
                      ],
                      [
                        [
                          h,
                          "sparc"
                        ]
                      ],
                      [
                        /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                      ],
                      [
                        [
                          h,
                          lowerize
                        ]
                      ]
                    ],
                    device: [
                      [
                        /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
                      ],
                      [
                        c,
                        [
                          m,
                          V
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                        /samsung[- ]([-\w]+)/i,
                        /sec-(sgh\w+)/i
                      ],
                      [
                        c,
                        [
                          m,
                          V
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
                      ],
                      [
                        c,
                        [
                          m,
                          S
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\((ipad);[-\w\),; ]+apple/i,
                        /applecoremedia\/[\w\.]+ \((ipad)/i,
                        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                      ],
                      [
                        c,
                        [
                          m,
                          S
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(macintosh);/i
                      ],
                      [
                        c,
                        [
                          m,
                          S
                        ]
                      ],
                      [
                        /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
                      ],
                      [
                        c,
                        [
                          m,
                          D
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
                      ],
                      [
                        c,
                        [
                          m,
                          j
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(?:huawei|honor)([-\w ]+)[;\)]/i,
                        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
                      ],
                      [
                        c,
                        [
                          m,
                          j
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(poco[\w ]+)(?: bui|\))/i,
                        /\b; (\w+) build\/hm\1/i,
                        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                        /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
                      ],
                      [
                        [
                          c,
                          /_/g,
                          " "
                        ],
                        [
                          m,
                          F
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
                      ],
                      [
                        [
                          c,
                          /_/g,
                          " "
                        ],
                        [
                          m,
                          F
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /; (\w+) bui.+ oppo/i,
                        /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "OPPO"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /vivo (\w+)(?: bui|\))/i,
                        /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Vivo"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(rmx[12]\d{3})(?: bui|;|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Realme"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                        /\bmot(?:orola)?[- ](\w*)/i,
                        /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
                      ],
                      [
                        c,
                        [
                          m,
                          M
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(mz60\d|xoom[2 ]{0,2}) build\//i
                      ],
                      [
                        c,
                        [
                          m,
                          M
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
                      ],
                      [
                        c,
                        [
                          m,
                          P
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                        /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                        /\blg-?([\d\w]+) bui/i
                      ],
                      [
                        c,
                        [
                          m,
                          P
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(ideatab[-\w ]+)/i,
                        /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Lenovo"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(?:maemo|nokia).*(n900|lumia \d+)/i,
                        /nokia[-_ ]?([-\w\.]*)/i
                      ],
                      [
                        [
                          c,
                          /_/g,
                          " "
                        ],
                        [
                          m,
                          "Nokia"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(pixel c)\b/i
                      ],
                      [
                        c,
                        [
                          m,
                          U
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          U
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                      ],
                      [
                        c,
                        [
                          m,
                          I
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /sony tablet [ps]/i,
                        /\b(?:sony)?sgp\w+(?: bui|\))/i
                      ],
                      [
                        [
                          c,
                          "Xperia Tablet"
                        ],
                        [
                          m,
                          I
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        / (kb2005|in20[12]5|be20[12][59])\b/i,
                        /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          "OnePlus"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(alexa)webm/i,
                        /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                        /(kf[a-z]+)( bui|\)).+silk\//i
                      ],
                      [
                        c,
                        [
                          m,
                          T
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
                      ],
                      [
                        [
                          c,
                          /(.+)/g,
                          "Fire Phone $1"
                        ],
                        [
                          m,
                          T
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(playbook);[-\w\),; ]+(rim)/i
                      ],
                      [
                        c,
                        m,
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b((?:bb[a-f]|st[hv])100-\d)/i,
                        /\(bb10; (\w+)/i
                      ],
                      [
                        c,
                        [
                          m,
                          N
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
                      ],
                      [
                        c,
                        [
                          m,
                          z
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
                      ],
                      [
                        c,
                        [
                          m,
                          z
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(nexus 9)/i
                      ],
                      [
                        c,
                        [
                          m,
                          "HTC"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                        /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
                      ],
                      [
                        m,
                        [
                          c,
                          /_/g,
                          " "
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Acer"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /droid.+; (m[1-5] note) bui/i,
                        /\bmz-([-\w]{2,})/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Meizu"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                        /(hp) ([\w ]+\w)/i,
                        /(asus)-?(\w+)/i,
                        /(microsoft); (lumia[\w ]+)/i,
                        /(lenovo)[-_ ]?([-\w]+)/i,
                        /(jolla)/i,
                        /(oppo) ?([\w ]+) bui/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(kobo)\s(ereader|touch)/i,
                        /(archos) (gamepad2?)/i,
                        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                        /(kindle)\/([\w\.]+)/i,
                        /(nook)[\w ]+build\/(\w+)/i,
                        /(dell) (strea[kpr\d ]*[\dko])/i,
                        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                        /(trinity)[- ]*(t\d{3}) bui/i,
                        /(gigaset)[- ]+(q\w{1,9}) bui/i,
                        /(vodafone) ([\w ]+)(?:\)| bui)/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(surface duo)/i
                      ],
                      [
                        c,
                        [
                          m,
                          R
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /droid [\d\.]+; (fp\du?)(?: b|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Fairphone"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(u304aa)/i
                      ],
                      [
                        c,
                        [
                          m,
                          "AT&T"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\bsie-(\w*)/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Siemens"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(rct\w+) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "RCA"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(venue[\d ]{2,7}) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Dell"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(q(?:mv|ta)\w+) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Verizon"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Barnes & Noble"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(tm\d{3}\w+) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "NuVision"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(k88) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "ZTE"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(nx\d{3}j) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "ZTE"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(gen\d{3}) b.+49h/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Swiss"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(zur\d{3}) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Swiss"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b((zeki)?tb.*\b) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Zeki"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b([yr]\d{2}) b/i,
                        /\b(dragon[- ]+touch |dt)(\w{5}) b/i
                      ],
                      [
                        [
                          m,
                          "Dragon Touch"
                        ],
                        c,
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(ns-?\w{0,9}) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Insignia"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b((nxa|next)-?\w{0,9}) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "NextBook"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
                      ],
                      [
                        [
                          m,
                          "Voice"
                        ],
                        c,
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(lvtel\-)?(v1[12]) b/i
                      ],
                      [
                        [
                          m,
                          "LvTel"
                        ],
                        c,
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(ph-1) /i
                      ],
                      [
                        c,
                        [
                          m,
                          "Essential"
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /\b(v(100md|700na|7011|917g).*\b) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Envizen"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b(trio[-\w\. ]+) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "MachSpeed"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\btu_(1491) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Rotor"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(shield[\w ]+) b/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Nvidia"
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(sprint) (\w+)/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(kin\.[onetw]{3})/i
                      ],
                      [
                        [
                          c,
                          /\./g,
                          " "
                        ],
                        [
                          m,
                          R
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                      ],
                      [
                        c,
                        [
                          m,
                          G
                        ],
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
                      ],
                      [
                        c,
                        [
                          m,
                          G
                        ],
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /smart-tv.+(samsung)/i
                      ],
                      [
                        m,
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /hbbtv.+maple;(\d+)/i
                      ],
                      [
                        [
                          c,
                          /^/,
                          "SmartTV"
                        ],
                        [
                          m,
                          V
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
                      ],
                      [
                        [
                          m,
                          P
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /(apple) ?tv/i
                      ],
                      [
                        m,
                        [
                          c,
                          S + " TV"
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /crkey/i
                      ],
                      [
                        [
                          c,
                          C + "cast"
                        ],
                        [
                          m,
                          U
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /droid.+aft(\w)( bui|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          T
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /\(dtv[\);].+(aquos)/i,
                        /(aquos-tv[\w ]+)\)/i
                      ],
                      [
                        c,
                        [
                          m,
                          D
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /(bravia[\w ]+)( bui|\))/i
                      ],
                      [
                        c,
                        [
                          m,
                          I
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /(mitv-\w{5}) bui/i
                      ],
                      [
                        c,
                        [
                          m,
                          F
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /Hbbtv.*(technisat) (.*);/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                        /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
                      ],
                      [
                        [
                          m,
                          trim
                        ],
                        [
                          c,
                          trim
                        ],
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
                      ],
                      [
                        [
                          p,
                          x
                        ]
                      ],
                      [
                        /(ouya)/i,
                        /(nintendo) ([wids3utch]+)/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          v
                        ]
                      ],
                      [
                        /droid.+; (shield) bui/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Nvidia"
                        ],
                        [
                          p,
                          v
                        ]
                      ],
                      [
                        /(playstation [345portablevi]+)/i
                      ],
                      [
                        c,
                        [
                          m,
                          I
                        ],
                        [
                          p,
                          v
                        ]
                      ],
                      [
                        /\b(xbox(?: one)?(?!; xbox))[\); ]/i
                      ],
                      [
                        c,
                        [
                          m,
                          R
                        ],
                        [
                          p,
                          v
                        ]
                      ],
                      [
                        /((pebble))app/i
                      ],
                      [
                        m,
                        c,
                        [
                          p,
                          _
                        ]
                      ],
                      [
                        /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
                      ],
                      [
                        c,
                        [
                          m,
                          S
                        ],
                        [
                          p,
                          _
                        ]
                      ],
                      [
                        /droid.+; (glass) \d/i
                      ],
                      [
                        c,
                        [
                          m,
                          U
                        ],
                        [
                          p,
                          _
                        ]
                      ],
                      [
                        /droid.+; (wt63?0{2,3})\)/i
                      ],
                      [
                        c,
                        [
                          m,
                          G
                        ],
                        [
                          p,
                          _
                        ]
                      ],
                      [
                        /(quest( 2| pro)?)/i
                      ],
                      [
                        c,
                        [
                          m,
                          H
                        ],
                        [
                          p,
                          _
                        ]
                      ],
                      [
                        /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
                      ],
                      [
                        m,
                        [
                          p,
                          y
                        ]
                      ],
                      [
                        /(aeobc)\b/i
                      ],
                      [
                        c,
                        [
                          m,
                          T
                        ],
                        [
                          p,
                          y
                        ]
                      ],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
                      ],
                      [
                        c,
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
                      ],
                      [
                        c,
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
                      ],
                      [
                        [
                          p,
                          k
                        ]
                      ],
                      [
                        /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
                      ],
                      [
                        [
                          p,
                          g
                        ]
                      ],
                      [
                        /(android[-\w\. ]{0,9});.+buil/i
                      ],
                      [
                        c,
                        [
                          m,
                          "Generic"
                        ]
                      ]
                    ],
                    engine: [
                      [
                        /windows.+ edge\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          E + "HTML"
                        ]
                      ],
                      [
                        /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Blink"
                        ]
                      ],
                      [
                        /(presto)\/([\w\.]+)/i,
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                        /ekioh(flow)\/([\w\.]+)/i,
                        /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                        /(icab)[\/ ]([23]\.[\d\.]+)/i,
                        /\b(libweb)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /rv\:([\w\.]{1,9})\b.+(gecko)/i
                      ],
                      [
                        f,
                        u
                      ]
                    ],
                    os: [
                      [
                        /microsoft (windows) (vista|xp)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(windows) nt 6\.2; (arm)/i,
                        /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                        /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
                      ],
                      [
                        u,
                        [
                          f,
                          strMapper,
                          X
                        ]
                      ],
                      [
                        /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
                      ],
                      [
                        [
                          u,
                          "Windows"
                        ],
                        [
                          f,
                          strMapper,
                          X
                        ]
                      ],
                      [
                        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                        /ios;fbsv\/([\d\.]+)/i,
                        /cfnetwork\/.+darwin/i
                      ],
                      [
                        [
                          f,
                          /_/g,
                          "."
                        ],
                        [
                          u,
                          "iOS"
                        ]
                      ],
                      [
                        /(mac os x) ?([\w\. ]*)/i,
                        /(macintosh|mac_powerpc\b)(?!.+haiku)/i
                      ],
                      [
                        [
                          u,
                          Z
                        ],
                        [
                          f,
                          /_/g,
                          "."
                        ]
                      ],
                      [
                        /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
                      ],
                      [
                        f,
                        u
                      ],
                      [
                        /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                        /(blackberry)\w*\/([\w\.]*)/i,
                        /(tizen|kaios)[\/ ]([\w\.]+)/i,
                        /\((series40);/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /\(bb(10);/i
                      ],
                      [
                        f,
                        [
                          u,
                          N
                        ]
                      ],
                      [
                        /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "Symbian"
                        ]
                      ],
                      [
                        /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          O + " OS"
                        ]
                      ],
                      [
                        /web0s;.+rt(tv)/i,
                        /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "webOS"
                        ]
                      ],
                      [
                        /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          "watchOS"
                        ]
                      ],
                      [
                        /crkey\/([\d\.]+)/i
                      ],
                      [
                        f,
                        [
                          u,
                          C + "cast"
                        ]
                      ],
                      [
                        /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
                      ],
                      [
                        [
                          u,
                          L
                        ],
                        f
                      ],
                      [
                        /panasonic;(viera)/i,
                        /(netrange)mmh/i,
                        /(nettv)\/(\d+\.[\w\.]+)/i,
                        /(nintendo|playstation) ([wids345portablevuch]+)/i,
                        /(xbox); +xbox ([^\);]+)/i,
                        /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                        /(mint)[\/\(\) ]?(\w*)/i,
                        /(mageia|vectorlinux)[; ]/i,
                        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                        /(hurd|linux) ?([\w\.]*)/i,
                        /(gnu) ?([\w\.]*)/i,
                        /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                        /(haiku) (\w+)/i
                      ],
                      [
                        u,
                        f
                      ],
                      [
                        /(sunos) ?([\w\.\d]*)/i
                      ],
                      [
                        [
                          u,
                          "Solaris"
                        ],
                        f
                      ],
                      [
                        /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                        /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                        /(unix) ?([\w\.]*)/i
                      ],
                      [
                        u,
                        f
                      ]
                    ]
                  };
                  var UAParser = function(i3, e3) {
                    if (typeof i3 === w) {
                      e3 = i3;
                      i3 = a;
                    }
                    if (!(this instanceof UAParser)) {
                      return new UAParser(i3, e3).getResult();
                    }
                    var r2 = typeof o2 !== b && o2.navigator ? o2.navigator : a;
                    var n2 = i3 || (r2 && r2.userAgent ? r2.userAgent : t);
                    var v2 = r2 && r2.userAgentData ? r2.userAgentData : a;
                    var x2 = e3 ? extend(K, e3) : K;
                    var _2 = r2 && r2.userAgent == n2;
                    this.getBrowser = function() {
                      var i4 = {};
                      i4[u] = a;
                      i4[f] = a;
                      rgxMapper.call(i4, n2, x2.browser);
                      i4[d] = majorize(i4[f]);
                      if (_2 && r2 && r2.brave && typeof r2.brave.isBrave == s) {
                        i4[u] = "Brave";
                      }
                      return i4;
                    };
                    this.getCPU = function() {
                      var i4 = {};
                      i4[h] = a;
                      rgxMapper.call(i4, n2, x2.cpu);
                      return i4;
                    };
                    this.getDevice = function() {
                      var i4 = {};
                      i4[m] = a;
                      i4[c] = a;
                      i4[p] = a;
                      rgxMapper.call(i4, n2, x2.device);
                      if (_2 && !i4[p] && v2 && v2.mobile) {
                        i4[p] = g;
                      }
                      if (_2 && i4[c] == "Macintosh" && r2 && typeof r2.standalone !== b && r2.maxTouchPoints && r2.maxTouchPoints > 2) {
                        i4[c] = "iPad";
                        i4[p] = k;
                      }
                      return i4;
                    };
                    this.getEngine = function() {
                      var i4 = {};
                      i4[u] = a;
                      i4[f] = a;
                      rgxMapper.call(i4, n2, x2.engine);
                      return i4;
                    };
                    this.getOS = function() {
                      var i4 = {};
                      i4[u] = a;
                      i4[f] = a;
                      rgxMapper.call(i4, n2, x2.os);
                      if (_2 && !i4[u] && v2 && v2.platform != "Unknown") {
                        i4[u] = v2.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
                      }
                      return i4;
                    };
                    this.getResult = function() {
                      return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                      };
                    };
                    this.getUA = function() {
                      return n2;
                    };
                    this.setUA = function(i4) {
                      n2 = typeof i4 === l && i4.length > q ? trim(i4, q) : i4;
                      return this;
                    };
                    this.setUA(n2);
                    return this;
                  };
                  UAParser.VERSION = r;
                  UAParser.BROWSER = enumerize([
                    u,
                    f,
                    d
                  ]);
                  UAParser.CPU = enumerize([
                    h
                  ]);
                  UAParser.DEVICE = enumerize([
                    c,
                    m,
                    p,
                    v,
                    g,
                    x,
                    k,
                    _,
                    y
                  ]);
                  UAParser.ENGINE = UAParser.OS = enumerize([
                    u,
                    f
                  ]);
                  if (typeof e2 !== b) {
                    if ("object" !== b && i2.exports) {
                      e2 = i2.exports = UAParser;
                    }
                    e2.UAParser = UAParser;
                  } else {
                    if (typeof define === s && define.amd) {
                      ((r2) => r2 !== void 0 && __turbopack_context__.v(r2))(/* @__PURE__ */ function() {
                        return UAParser;
                      }(__turbopack_context__.r, exports2, module2));
                    } else if (typeof o2 !== b) {
                      o2.UAParser = UAParser;
                    }
                  }
                  var Q = typeof o2 !== b && (o2.jQuery || o2.Zepto);
                  if (Q && !Q.ua) {
                    var Y = new UAParser();
                    Q.ua = Y.getResult();
                    Q.ua.get = function() {
                      return Y.getUA();
                    };
                    Q.ua.set = function(i3) {
                      Y.setUA(i3);
                      var e3 = Y.getResult();
                      for (var o3 in e3) {
                        Q.ua[o3] = e3[o3];
                      }
                    };
                  }
                })(("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", void 0) : this);
              }
            };
            var e = {};
            function __nccwpck_require__2(o2) {
              var a = e[o2];
              if (a !== void 0) {
                return a.exports;
              }
              var r = e[o2] = {
                exports: {}
              };
              var t = true;
              try {
                i[o2].call(r.exports, r, r.exports, __nccwpck_require__2);
                t = false;
              } finally {
                if (t) delete e[o2];
              }
              return r.exports;
            }
            if (typeof __nccwpck_require__2 !== "undefined") __nccwpck_require__2.ab = __dirname2 + "/";
            var o = __nccwpck_require__2(226);
            module2.exports = o;
          })();
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isBot = function(input) {
            return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
          }, userAgentFromString = function(input) {
            return {
              ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(input),
              isBot: input === void 0 ? false : isBot(input)
            };
          }, userAgent = function({ headers }) {
            return userAgentFromString(headers.get("user-agent") || void 0);
          };
          __turbopack_context__.s({
            "isBot": () => isBot,
            "userAgent": () => userAgent,
            "userAgentFromString": () => userAgentFromString
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "URLPattern": () => GlobalURLPattern
          });
          const GlobalURLPattern = typeof URLPattern === "undefined" ? void 0 : URLPattern;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let after = function(task) {
            const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
            if (!workStore) {
              throw Object.defineProperty(new Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context"), "__NEXT_ERROR_CODE", {
                value: "E468",
                enumerable: false,
                configurable: true
              });
            }
            const { afterContext } = workStore;
            return afterContext.after(task);
          };
          __turbopack_context__.s({
            "after": () => after
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          "use strict";
          "production" !== ("TURBOPACK compile-time value", "development") && function() {
            function getIteratorFn(maybeIterable) {
              if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
              maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
              return "function" === typeof maybeIterable ? maybeIterable : null;
            }
            function testStringCoercion(value) {
              return "" + value;
            }
            function checkKeyStringCoercion(value) {
              try {
                testStringCoercion(value);
                var JSCompiler_inline_result = false;
              } catch (e) {
                JSCompiler_inline_result = true;
              }
              if (JSCompiler_inline_result) {
                JSCompiler_inline_result = console;
                var JSCompiler_temp_const = JSCompiler_inline_result.error;
                var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
                JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
                return testStringCoercion(value);
              }
            }
            function getComponentNameFromType(type) {
              if (null == type) return null;
              if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
              if ("string" === typeof type) return type;
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                  return "Fragment";
                case REACT_PROFILER_TYPE:
                  return "Profiler";
                case REACT_STRICT_MODE_TYPE:
                  return "StrictMode";
                case REACT_SUSPENSE_TYPE:
                  return "Suspense";
                case REACT_SUSPENSE_LIST_TYPE:
                  return "SuspenseList";
                case REACT_ACTIVITY_TYPE:
                  return "Activity";
              }
              if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
                case REACT_PORTAL_TYPE:
                  return "Portal";
                case REACT_CONTEXT_TYPE:
                  return (type.displayName || "Context") + ".Provider";
                case REACT_CONSUMER_TYPE:
                  return (type._context.displayName || "Context") + ".Consumer";
                case REACT_FORWARD_REF_TYPE:
                  var innerType = type.render;
                  type = type.displayName;
                  type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                  return type;
                case REACT_MEMO_TYPE:
                  return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE:
                  innerType = type._payload;
                  type = type._init;
                  try {
                    return getComponentNameFromType(type(innerType));
                  } catch (x) {
                  }
              }
              return null;
            }
            function getTaskName(type) {
              if (type === REACT_FRAGMENT_TYPE) return "<>";
              if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
              try {
                var name = getComponentNameFromType(type);
                return name ? "<" + name + ">" : "<...>";
              } catch (x) {
                return "<...>";
              }
            }
            function getOwner() {
              var dispatcher = ReactSharedInternals.A;
              return null === dispatcher ? null : dispatcher.getOwner();
            }
            function UnknownOwner() {
              return Error("react-stack-top-frame");
            }
            function hasValidKey(config) {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) return false;
              }
              return void 0 !== config.key;
            }
            function defineKeyPropWarningGetter(props, displayName) {
              function warnAboutAccessingKey() {
                specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
              }
              warnAboutAccessingKey.isReactWarning = true;
              Object.defineProperty(props, "key", {
                get: warnAboutAccessingKey,
                configurable: true
              });
            }
            function elementRefGetterWithDeprecationWarning() {
              var componentName = getComponentNameFromType(this.type);
              didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
              componentName = this.props.ref;
              return void 0 !== componentName ? componentName : null;
            }
            function ReactElement(type, key, self2, source, owner, props, debugStack, debugTask) {
              self2 = props.ref;
              type = {
                $$typeof: REACT_ELEMENT_TYPE,
                type,
                key,
                props,
                _owner: owner
              };
              null !== (void 0 !== self2 ? self2 : null) ? Object.defineProperty(type, "ref", {
                enumerable: false,
                get: elementRefGetterWithDeprecationWarning
              }) : Object.defineProperty(type, "ref", {
                enumerable: false,
                value: null
              });
              type._store = {};
              Object.defineProperty(type._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: 0
              });
              Object.defineProperty(type, "_debugInfo", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: null
              });
              Object.defineProperty(type, "_debugStack", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: debugStack
              });
              Object.defineProperty(type, "_debugTask", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: debugTask
              });
              Object.freeze && (Object.freeze(type.props), Object.freeze(type));
              return type;
            }
            function cloneAndReplaceKey(oldElement, newKey) {
              newKey = ReactElement(oldElement.type, newKey, void 0, void 0, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
              oldElement._store && (newKey._store.validated = oldElement._store.validated);
              return newKey;
            }
            function isValidElement(object) {
              return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function escape(key) {
              var escaperLookup = {
                "=": "=0",
                ":": "=2"
              };
              return "$" + key.replace(/[=:]/g, function(match2) {
                return escaperLookup[match2];
              });
            }
            function getElementKey(element, index) {
              return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
            }
            function noop() {
            }
            function resolveThenable(thenable) {
              switch (thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
                default:
                  switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                  }, function(error2) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error2);
                  })), thenable.status) {
                    case "fulfilled":
                      return thenable.value;
                    case "rejected":
                      throw thenable.reason;
                  }
              }
              throw thenable;
            }
            function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
              var type = typeof children;
              if ("undefined" === type || "boolean" === type) children = null;
              var invokeCallback = false;
              if (null === children) invokeCallback = true;
              else switch (type) {
                case "bigint":
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                      break;
                    case REACT_LAZY_TYPE:
                      return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                  }
              }
              if (invokeCallback) {
                invokeCallback = children;
                callback = callback(invokeCallback);
                var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
                isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                  return c;
                })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
                return 1;
              }
              invokeCallback = 0;
              childKey = "" === nameSoFar ? "." : nameSoFar + ":";
              if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
              else if (i = getIteratorFn(children), "function" === typeof i) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; ) nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
              else if ("object" === type) {
                if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
                array = String(children);
                throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
              }
              return invokeCallback;
            }
            function mapChildren(children, func, context) {
              if (null == children) return children;
              var result = [], count = 0;
              mapIntoArray(children, result, "", "", function(child) {
                return func.call(context, child, count++);
              });
              return result;
            }
            function resolveDispatcher() {
              var dispatcher = ReactSharedInternals.H;
              null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
              return dispatcher;
            }
            function lazyInitializer(payload) {
              if (-1 === payload._status) {
                var ctor = payload._result;
                ctor = ctor();
                ctor.then(function(moduleObject) {
                  if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
                }, function(error2) {
                  if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error2;
                });
                -1 === payload._status && (payload._status = 0, payload._result = ctor);
              }
              if (1 === payload._status) return ctor = payload._result, void 0 === ctor && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ctor), "default" in ctor || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ctor), ctor.default;
              throw payload._result;
            }
            function createCacheRoot() {
              return /* @__PURE__ */ new WeakMap();
            }
            function createCacheNode() {
              return {
                s: 0,
                v: void 0,
                o: null,
                p: null
              };
            }
            var ReactSharedInternals = {
              H: null,
              A: null,
              getCurrentStack: null,
              recentlyCreatedOwnerStacks: 0
            }, isArrayImpl = Array.isArray, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
            Symbol.for("react.provider");
            var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, createTask = console.createTask ? console.createTask : function() {
              return null;
            }, createFakeCallStack = {
              "react-stack-bottom-frame": function(callStackForError) {
                return callStackForError();
              }
            }, specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
            var didWarnAboutElementRef = {};
            var unknownOwnerDebugStack = createFakeCallStack["react-stack-bottom-frame"].bind(createFakeCallStack, UnknownOwner)();
            var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
            var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g;
            exports2.Children = {
              map: mapChildren,
              forEach: function(children, forEachFunc, forEachContext) {
                mapChildren(children, function() {
                  forEachFunc.apply(this, arguments);
                }, forEachContext);
              },
              count: function(children) {
                var n = 0;
                mapChildren(children, function() {
                  n++;
                });
                return n;
              },
              toArray: function(children) {
                return mapChildren(children, function(child) {
                  return child;
                }) || [];
              },
              only: function(children) {
                if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
                return children;
              }
            };
            exports2.Fragment = REACT_FRAGMENT_TYPE;
            exports2.Profiler = REACT_PROFILER_TYPE;
            exports2.StrictMode = REACT_STRICT_MODE_TYPE;
            exports2.Suspense = REACT_SUSPENSE_TYPE;
            exports2.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
            exports2.cache = function(fn) {
              return function() {
                var dispatcher = ReactSharedInternals.A;
                if (!dispatcher) return fn.apply(null, arguments);
                var fnMap = dispatcher.getCacheForType(createCacheRoot);
                dispatcher = fnMap.get(fn);
                void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
                fnMap = 0;
                for (var l = arguments.length; fnMap < l; fnMap++) {
                  var arg = arguments[fnMap];
                  if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
                    var objectCache = dispatcher.o;
                    null === objectCache && (dispatcher.o = objectCache = /* @__PURE__ */ new WeakMap());
                    dispatcher = objectCache.get(arg);
                    void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
                  } else objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = /* @__PURE__ */ new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
                }
                if (1 === dispatcher.s) return dispatcher.v;
                if (2 === dispatcher.s) throw dispatcher.v;
                try {
                  var result = fn.apply(null, arguments);
                  fnMap = dispatcher;
                  fnMap.s = 1;
                  return fnMap.v = result;
                } catch (error2) {
                  throw result = dispatcher, result.s = 2, result.v = error2, error2;
                }
              };
            };
            exports2.captureOwnerStack = function() {
              var getCurrentStack = ReactSharedInternals.getCurrentStack;
              return null === getCurrentStack ? null : getCurrentStack();
            };
            exports2.cloneElement = function(element, config, children) {
              if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
              var props = assign({}, element.props), key = element.key, owner = element._owner;
              if (null != config) {
                var JSCompiler_inline_result;
                a: {
                  if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
                    JSCompiler_inline_result = false;
                    break a;
                  }
                  JSCompiler_inline_result = void 0 !== config.ref;
                }
                JSCompiler_inline_result && (owner = getOwner());
                hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
                for (propName in config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
              }
              var propName = arguments.length - 2;
              if (1 === propName) props.children = children;
              else if (1 < propName) {
                JSCompiler_inline_result = Array(propName);
                for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2];
                props.children = JSCompiler_inline_result;
              }
              props = ReactElement(element.type, key, void 0, void 0, owner, props, element._debugStack, element._debugTask);
              for (key = 2; key < arguments.length; key++) owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
              return props;
            };
            exports2.createElement = function(type, config, children) {
              for (var i = 2; i < arguments.length; i++) {
                var node = arguments[i];
                isValidElement(node) && node._store && (node._store.validated = 1);
              }
              i = {};
              node = null;
              if (null != config) for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
              var childrenLength = arguments.length - 2;
              if (1 === childrenLength) i.children = children;
              else if (1 < childrenLength) {
                for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = arguments[_i + 2];
                Object.freeze && Object.freeze(childArray);
                i.children = childArray;
              }
              if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === i[propName] && (i[propName] = childrenLength[propName]);
              node && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
              var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
              return ReactElement(type, node, void 0, void 0, getOwner(), i, propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
            };
            exports2.createRef = function() {
              var refObject = {
                current: null
              };
              Object.seal(refObject);
              return refObject;
            };
            exports2.forwardRef = function(render) {
              null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
              var elementType = {
                $$typeof: REACT_FORWARD_REF_TYPE,
                render
              }, ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  render.name || render.displayName || (Object.defineProperty(render, "name", {
                    value: name
                  }), render.displayName = name);
                }
              });
              return elementType;
            };
            exports2.isValidElement = isValidElement;
            exports2.lazy = function(ctor) {
              return {
                $$typeof: REACT_LAZY_TYPE,
                _payload: {
                  _status: -1,
                  _result: ctor
                },
                _init: lazyInitializer
              };
            };
            exports2.memo = function(type, compare) {
              null == type && console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
              compare = {
                $$typeof: REACT_MEMO_TYPE,
                type,
                compare: void 0 === compare ? null : compare
              };
              var ownName;
              Object.defineProperty(compare, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  type.name || type.displayName || (Object.defineProperty(type, "name", {
                    value: name
                  }), type.displayName = name);
                }
              });
              return compare;
            };
            exports2.use = function(usable) {
              return resolveDispatcher().use(usable);
            };
            exports2.useCallback = function(callback, deps) {
              return resolveDispatcher().useCallback(callback, deps);
            };
            exports2.useDebugValue = function(value, formatterFn) {
              return resolveDispatcher().useDebugValue(value, formatterFn);
            };
            exports2.useId = function() {
              return resolveDispatcher().useId();
            };
            exports2.useMemo = function(create, deps) {
              return resolveDispatcher().useMemo(create, deps);
            };
            exports2.version = "19.2.0-canary-3fbfb9ba-20250409";
          }();
        }
      },
      "[project]/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          "use strict";
          if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
          } else {
            module2.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [middleware-edge] (ecmascript)");
          }
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isDynamicServerError = function(err) {
            if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") {
              return false;
            }
            return err.digest === DYNAMIC_ERROR_CODE;
          };
          __turbopack_context__.s({
            "DynamicServerError": () => DynamicServerError,
            "isDynamicServerError": () => isDynamicServerError
          });
          const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
          class DynamicServerError extends Error {
            constructor(description) {
              super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isStaticGenBailoutError = function(error2) {
            if (typeof error2 !== "object" || error2 === null || !("code" in error2)) {
              return false;
            }
            return error2.code === NEXT_STATIC_GEN_BAILOUT;
          };
          __turbopack_context__.s({
            "StaticGenBailoutError": () => StaticGenBailoutError,
            "isStaticGenBailoutError": () => isStaticGenBailoutError
          });
          const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
          class StaticGenBailoutError extends Error {
            constructor(...args) {
              super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isHangingPromiseRejectionError = function(err) {
            if (typeof err !== "object" || err === null || !("digest" in err)) {
              return false;
            }
            return err.digest === HANGING_PROMISE_REJECTION;
          }, makeHangingPromise = function(signal, expression) {
            if (signal.aborted) {
              return Promise.reject(new HangingPromiseRejectionError(expression));
            } else {
              const hangingPromise = new Promise((_, reject) => {
                const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
                let currentListeners = abortListenersBySignal.get(signal);
                if (currentListeners) {
                  currentListeners.push(boundRejection);
                } else {
                  const listeners = [
                    boundRejection
                  ];
                  abortListenersBySignal.set(signal, listeners);
                  signal.addEventListener("abort", () => {
                    for (let i = 0; i < listeners.length; i++) {
                      listeners[i]();
                    }
                  }, {
                    once: true
                  });
                }
              });
              hangingPromise.catch(ignoreReject);
              return hangingPromise;
            }
          }, ignoreReject = function() {
          };
          __turbopack_context__.s({
            "isHangingPromiseRejectionError": () => isHangingPromiseRejectionError,
            "makeHangingPromise": () => makeHangingPromise
          });
          const HANGING_PROMISE_REJECTION = "HANGING_PROMISE_REJECTION";
          class HangingPromiseRejectionError extends Error {
            constructor(expression) {
              super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
            }
          }
          const abortListenersBySignal = /* @__PURE__ */ new WeakMap();
        }
      },
      "[project]/node_modules/next/dist/esm/lib/metadata/metadata-constants.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "METADATA_BOUNDARY_NAME": () => METADATA_BOUNDARY_NAME,
            "OUTLET_BOUNDARY_NAME": () => OUTLET_BOUNDARY_NAME,
            "VIEWPORT_BOUNDARY_NAME": () => VIEWPORT_BOUNDARY_NAME
          });
          const METADATA_BOUNDARY_NAME = "__next_metadata_boundary__";
          const VIEWPORT_BOUNDARY_NAME = "__next_viewport_boundary__";
          const OUTLET_BOUNDARY_NAME = "__next_outlet_boundary__";
        }
      },
      "[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let atLeastOneTask = function() {
            return new Promise((resolve) => scheduleImmediate(resolve));
          }, waitAtLeastOneReactRenderTask = function() {
            if ("TURBOPACK compile-time truthy", 1) {
              return new Promise((r) => setTimeout(r, 0));
            } else {
              "TURBOPACK unreachable";
            }
          };
          __turbopack_context__.s({
            "atLeastOneTask": () => atLeastOneTask,
            "scheduleImmediate": () => scheduleImmediate,
            "scheduleOnNextTick": () => scheduleOnNextTick,
            "waitAtLeastOneReactRenderTask": () => waitAtLeastOneReactRenderTask
          });
          const scheduleOnNextTick = (cb) => {
            Promise.resolve().then(() => {
              if ("TURBOPACK compile-time truthy", 1) {
                setTimeout(cb, 0);
              } else {
                "TURBOPACK unreachable";
              }
            });
          };
          const scheduleImmediate = (cb) => {
            if ("TURBOPACK compile-time truthy", 1) {
              setTimeout(cb, 0);
            } else {
              "TURBOPACK unreachable";
            }
          };
        }
      },
      "[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createDynamicTrackingState = function(isDebugDynamicAccesses) {
            return {
              isDebugDynamicAccesses,
              dynamicAccesses: [],
              syncDynamicExpression: void 0,
              syncDynamicErrorWithStack: null
            };
          }, createDynamicValidationState = function() {
            return {
              hasSuspendedDynamic: false,
              hasDynamicMetadata: false,
              hasDynamicViewport: false,
              hasSyncDynamicErrors: false,
              dynamicErrors: []
            };
          }, getFirstDynamicReason = function(trackingState) {
            var _trackingState_dynamicAccesses_;
            return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
          }, markCurrentScopeAsDynamic = function(store, workUnitStore, expression) {
            if (workUnitStore) {
              if (workUnitStore.type === "cache" || workUnitStore.type === "unstable-cache") {
                return;
              }
            }
            if (store.forceDynamic || store.forceStatic) return;
            if (store.dynamicShouldError) {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E553",
                enumerable: false,
                configurable: true
              });
            }
            if (workUnitStore) {
              if (workUnitStore.type === "prerender-ppr") {
                postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
              } else if (workUnitStore.type === "prerender-legacy") {
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                  value: "E550",
                  enumerable: false,
                  configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
              } else if (("TURBOPACK compile-time value", "development") === "development" && workUnitStore && workUnitStore.type === "request") {
                workUnitStore.usedDynamic = true;
              }
            }
          }, trackFallbackParamAccessed = function(store, expression) {
            const prerenderStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
            if (!prerenderStore || prerenderStore.type !== "prerender-ppr") return;
            postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
          }, throwToInterruptStaticGeneration = function(expression, store, prerenderStore) {
            const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E558",
              enumerable: false,
              configurable: true
            });
            prerenderStore.revalidate = 0;
            store.dynamicUsageDescription = expression;
            store.dynamicUsageStack = err.stack;
            throw err;
          }, trackDynamicDataInDynamicRender = function(_store, workUnitStore) {
            if (workUnitStore) {
              if (workUnitStore.type === "cache" || workUnitStore.type === "unstable-cache") {
                return;
              }
              if (workUnitStore.type === "prerender" || workUnitStore.type === "prerender-legacy") {
                workUnitStore.revalidate = 0;
              }
              if (("TURBOPACK compile-time value", "development") === "development" && workUnitStore.type === "request") {
                workUnitStore.usedDynamic = true;
              }
            }
          }, abortOnSynchronousDynamicDataAccess = function(route, expression, prerenderStore) {
            const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
            const error2 = createPrerenderInterruptedError(reason);
            prerenderStore.controller.abort(error2);
            const dynamicTracking = prerenderStore.dynamicTracking;
            if (dynamicTracking) {
              dynamicTracking.dynamicAccesses.push({
                // When we aren't debugging, we don't need to create another error for the
                // stack trace.
                stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
                expression
              });
            }
          }, abortOnSynchronousPlatformIOAccess = function(route, expression, errorWithStack, prerenderStore) {
            const dynamicTracking = prerenderStore.dynamicTracking;
            if (dynamicTracking) {
              if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicExpression = expression;
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
              }
            }
            abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
          }, trackSynchronousPlatformIOAccessInDev = function(requestStore) {
            requestStore.prerenderPhase = false;
          }, abortAndThrowOnSynchronousRequestDataAccess = function(route, expression, errorWithStack, prerenderStore) {
            const prerenderSignal = prerenderStore.controller.signal;
            if (prerenderSignal.aborted === false) {
              const dynamicTracking = prerenderStore.dynamicTracking;
              if (dynamicTracking) {
                if (dynamicTracking.syncDynamicErrorWithStack === null) {
                  dynamicTracking.syncDynamicExpression = expression;
                  dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
                  if (prerenderStore.validating === true) {
                    dynamicTracking.syncDynamicLogged = true;
                  }
                }
              }
              abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
            }
            throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
          }, Postpone = function({ reason, route }) {
            const prerenderStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
            const dynamicTracking = prerenderStore && prerenderStore.type === "prerender-ppr" ? prerenderStore.dynamicTracking : null;
            postponeWithTracking(route, reason, dynamicTracking);
          }, postponeWithTracking = function(route, expression, dynamicTracking) {
            assertPostpone();
            if (dynamicTracking) {
              dynamicTracking.dynamicAccesses.push({
                // When we aren't debugging, we don't need to create another error for the
                // stack trace.
                stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
                expression
              });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone(createPostponeReason(route, expression));
          }, createPostponeReason = function(route, expression) {
            return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
          }, isDynamicPostpone = function(err) {
            if (typeof err === "object" && err !== null && typeof err.message === "string") {
              return isDynamicPostponeReason(err.message);
            }
            return false;
          }, isDynamicPostponeReason = function(reason) {
            return reason.includes("needs to bail out of prerendering at this point because it used") && reason.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
          }, createPrerenderInterruptedError = function(message) {
            const error2 = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
              value: "E394",
              enumerable: false,
              configurable: true
            });
            error2.digest = NEXT_PRERENDER_INTERRUPTED;
            return error2;
          }, isPrerenderInterruptedError = function(error2) {
            return typeof error2 === "object" && error2 !== null && error2.digest === NEXT_PRERENDER_INTERRUPTED && "name" in error2 && "message" in error2 && error2 instanceof Error;
          }, accessedDynamicData = function(dynamicAccesses) {
            return dynamicAccesses.length > 0;
          }, consumeDynamicAccess = function(serverDynamic, clientDynamic) {
            serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
            return serverDynamic.dynamicAccesses;
          }, formatDynamicAPIAccesses = function(dynamicAccesses) {
            return dynamicAccesses.filter((access) => typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack }) => {
              stack = stack.split("\n").slice(4).filter((line) => {
                if (line.includes("node_modules/next/")) {
                  return false;
                }
                if (line.includes(" (<anonymous>)")) {
                  return false;
                }
                if (line.includes(" (node:")) {
                  return false;
                }
                return true;
              }).join("\n");
              return `Dynamic API Usage Debug - ${expression}:
${stack}`;
            });
          }, assertPostpone = function() {
            if (!hasPostpone) {
              throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
                value: "E224",
                enumerable: false,
                configurable: true
              });
            }
          }, createPostponedAbortSignal = function(reason) {
            assertPostpone();
            const controller = new AbortController();
            try {
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone(reason);
            } catch (x) {
              controller.abort(x);
            }
            return controller.signal;
          }, createHangingInputAbortSignal = function(workUnitStore) {
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
              workUnitStore.cacheSignal.inputReady().then(() => {
                controller.abort();
              });
            } else {
              (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(() => controller.abort());
            }
            return controller.signal;
          }, annotateDynamicAccess = function(expression, prerenderStore) {
            const dynamicTracking = prerenderStore.dynamicTracking;
            if (dynamicTracking) {
              dynamicTracking.dynamicAccesses.push({
                stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
                expression
              });
            }
          }, useDynamicRouteParams = function(expression) {
            const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
            if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
              const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
              if (workUnitStore) {
                if (workUnitStore.type === "prerender") {
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(workUnitStore.renderSignal, expression));
                } else if (workUnitStore.type === "prerender-ppr") {
                  postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                } else if (workUnitStore.type === "prerender-legacy") {
                  throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
                }
              }
            }
          }, trackAllowedDynamicAccess = function(route, componentStack, dynamicValidation, serverDynamic, clientDynamic) {
            if (hasOutletRegex.test(componentStack)) {
              return;
            } else if (hasMetadataRegex.test(componentStack)) {
              dynamicValidation.hasDynamicMetadata = true;
              return;
            } else if (hasViewportRegex.test(componentStack)) {
              dynamicValidation.hasDynamicViewport = true;
              return;
            } else if (hasSuspenseRegex.test(componentStack)) {
              dynamicValidation.hasSuspendedDynamic = true;
              return;
            } else if (serverDynamic.syncDynamicErrorWithStack || clientDynamic.syncDynamicErrorWithStack) {
              dynamicValidation.hasSyncDynamicErrors = true;
              return;
            } else {
              const message = `Route "${route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
              const error2 = createErrorWithComponentStack(message, componentStack);
              dynamicValidation.dynamicErrors.push(error2);
              return;
            }
          }, createErrorWithComponentStack = function(message, componentStack) {
            const error2 = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
              value: "E394",
              enumerable: false,
              configurable: true
            });
            error2.stack = "Error: " + message + componentStack;
            return error2;
          }, throwIfDisallowedDynamic = function(route, dynamicValidation, serverDynamic, clientDynamic) {
            let syncError;
            let syncExpression;
            let syncLogged;
            if (serverDynamic.syncDynamicErrorWithStack) {
              syncError = serverDynamic.syncDynamicErrorWithStack;
              syncExpression = serverDynamic.syncDynamicExpression;
              syncLogged = serverDynamic.syncDynamicLogged === true;
            } else if (clientDynamic.syncDynamicErrorWithStack) {
              syncError = clientDynamic.syncDynamicErrorWithStack;
              syncExpression = clientDynamic.syncDynamicExpression;
              syncLogged = clientDynamic.syncDynamicLogged === true;
            } else {
              syncError = null;
              syncExpression = void 0;
              syncLogged = false;
            }
            if (dynamicValidation.hasSyncDynamicErrors && syncError) {
              if (!syncLogged) {
                console.error(syncError);
              }
              throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
            }
            const dynamicErrors = dynamicValidation.dynamicErrors;
            if (dynamicErrors.length) {
              for (let i = 0; i < dynamicErrors.length; i++) {
                console.error(dynamicErrors[i]);
              }
              throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
            }
            if (!dynamicValidation.hasSuspendedDynamic) {
              if (dynamicValidation.hasDynamicMetadata) {
                if (syncError) {
                  console.error(syncError);
                  throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateMetadata\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E608",
                    enumerable: false,
                    configurable: true
                  });
                }
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                  value: "E534",
                  enumerable: false,
                  configurable: true
                });
              } else if (dynamicValidation.hasDynamicViewport) {
                if (syncError) {
                  console.error(syncError);
                  throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateViewport\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E573",
                    enumerable: false,
                    configurable: true
                  });
                }
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                  value: "E590",
                  enumerable: false,
                  configurable: true
                });
              }
            }
          };
          __turbopack_context__.s({
            "Postpone": () => Postpone,
            "abortAndThrowOnSynchronousRequestDataAccess": () => abortAndThrowOnSynchronousRequestDataAccess,
            "abortOnSynchronousPlatformIOAccess": () => abortOnSynchronousPlatformIOAccess,
            "accessedDynamicData": () => accessedDynamicData,
            "annotateDynamicAccess": () => annotateDynamicAccess,
            "consumeDynamicAccess": () => consumeDynamicAccess,
            "createDynamicTrackingState": () => createDynamicTrackingState,
            "createDynamicValidationState": () => createDynamicValidationState,
            "createHangingInputAbortSignal": () => createHangingInputAbortSignal,
            "createPostponedAbortSignal": () => createPostponedAbortSignal,
            "formatDynamicAPIAccesses": () => formatDynamicAPIAccesses,
            "getFirstDynamicReason": () => getFirstDynamicReason,
            "isDynamicPostpone": () => isDynamicPostpone,
            "isPrerenderInterruptedError": () => isPrerenderInterruptedError,
            "markCurrentScopeAsDynamic": () => markCurrentScopeAsDynamic,
            "postponeWithTracking": () => postponeWithTracking,
            "throwIfDisallowedDynamic": () => throwIfDisallowedDynamic,
            "throwToInterruptStaticGeneration": () => throwToInterruptStaticGeneration,
            "trackAllowedDynamicAccess": () => trackAllowedDynamicAccess,
            "trackDynamicDataInDynamicRender": () => trackDynamicDataInDynamicRender,
            "trackFallbackParamAccessed": () => trackFallbackParamAccessed,
            "trackSynchronousPlatformIOAccessInDev": () => trackSynchronousPlatformIOAccessInDev,
            "trackSynchronousRequestDataAccessInDev": () => trackSynchronousRequestDataAccessInDev,
            "useDynamicRouteParams": () => useDynamicRouteParams
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/metadata/metadata-constants.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          const hasPostpone = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone === "function";
          const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
          if (isDynamicPostponeReason(createPostponeReason("%%%", "^^^")) === false) {
            throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
              value: "E296",
              enumerable: false,
              configurable: true
            });
          }
          const NEXT_PRERENDER_INTERRUPTED = "NEXT_PRERENDER_INTERRUPTED";
          const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
          const hasMetadataRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["METADATA_BOUNDARY_NAME"]}[\\n\\s]`);
          const hasViewportRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VIEWPORT_BOUNDARY_NAME"]}[\\n\\s]`);
          const hasOutletRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["OUTLET_BOUNDARY_NAME"]}[\\n\\s]`);
        }
      },
      "[project]/node_modules/next/dist/esm/server/request/utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let throwWithStaticGenerationBailoutError = function(route, expression) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
              value: "E576",
              enumerable: false,
              configurable: true
            });
          }, throwWithStaticGenerationBailoutErrorWithDynamicError = function(route, expression) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
              value: "E543",
              enumerable: false,
              configurable: true
            });
          }, throwForSearchParamsAccessInUseCache = function(workStore) {
            const error2 = Object.defineProperty(new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
              value: "E634",
              enumerable: false,
              configurable: true
            });
            workStore.invalidUsageError ??= error2;
            throw error2;
          }, isRequestAPICallableInsideAfter = function() {
            const afterTaskStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].getStore();
            return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === "action";
          };
          __turbopack_context__.s({
            "isRequestAPICallableInsideAfter": () => isRequestAPICallableInsideAfter,
            "throwForSearchParamsAccessInUseCache": () => throwForSearchParamsAccessInUseCache,
            "throwWithStaticGenerationBailoutError": () => throwWithStaticGenerationBailoutError,
            "throwWithStaticGenerationBailoutErrorWithDynamicError": () => throwWithStaticGenerationBailoutErrorWithDynamicError
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>");
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let connection = function() {
            const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
            const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
            if (workStore) {
              if (workUnitStore && workUnitStore.phase === "after" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isRequestAPICallableInsideAfter"])()) {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                  value: "E186",
                  enumerable: false,
                  configurable: true
                });
              }
              if (workStore.forceStatic) {
                return Promise.resolve(void 0);
              }
              if (workUnitStore) {
                if (workUnitStore.type === "cache") {
                  throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E111",
                    enumerable: false,
                    configurable: true
                  });
                } else if (workUnitStore.type === "unstable-cache") {
                  throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E1",
                    enumerable: false,
                    configurable: true
                  });
                }
              }
              if (workStore.dynamicShouldError) {
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                  value: "E562",
                  enumerable: false,
                  configurable: true
                });
              }
              if (workUnitStore) {
                if (workUnitStore.type === "prerender") {
                  return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(workUnitStore.renderSignal, "`connection()`");
                } else if (workUnitStore.type === "prerender-ppr") {
                  (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, "connection", workUnitStore.dynamicTracking);
                } else if (workUnitStore.type === "prerender-legacy") {
                  (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])("connection", workStore, workUnitStore);
                }
              }
              (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["trackDynamicDataInDynamicRender"])(workStore, workUnitStore);
            }
            return Promise.resolve(void 0);
          };
          __turbopack_context__.s({
            "connection": () => connection
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/utils.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let describeStringPropertyAccess = function(target, prop) {
            if (isDefinitelyAValidIdentifier.test(prop)) {
              return "`" + target + "." + prop + "`";
            }
            return "`" + target + "[" + JSON.stringify(prop) + "]`";
          }, describeHasCheckingStringProperty = function(target, prop) {
            const stringifiedProp = JSON.stringify(prop);
            return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
          };
          __turbopack_context__.s({
            "describeHasCheckingStringProperty": () => describeHasCheckingStringProperty,
            "describeStringPropertyAccess": () => describeStringPropertyAccess,
            "wellKnownProperties": () => wellKnownProperties
          });
          const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
          const wellKnownProperties = /* @__PURE__ */ new Set([
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toString",
            "valueOf",
            "toLocaleString",
            // Promise prototype
            // fallthrough
            "then",
            "catch",
            "finally",
            // React Promise extension
            // fallthrough
            "status",
            // React introspection
            "displayName",
            // Common tested properties
            // fallthrough
            "toJSON",
            "$$typeof",
            "__esModule"
          ]);
        }
      },
      "[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let createPrerenderRootParams = function(underlyingParams, workStore, prerenderStore) {
            const fallbackParams = workStore.fallbackRouteParams;
            if (fallbackParams) {
              let hasSomeFallbackParams = false;
              for (const key in underlyingParams) {
                if (fallbackParams.has(key)) {
                  hasSomeFallbackParams = true;
                  break;
                }
              }
              if (hasSomeFallbackParams) {
                if (prerenderStore.type === "prerender") {
                  const cachedParams = CachedParams.get(underlyingParams);
                  if (cachedParams) {
                    return cachedParams;
                  }
                  const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(prerenderStore.renderSignal, "`unstable_rootParams`");
                  CachedParams.set(underlyingParams, promise);
                  return promise;
                }
                return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
              }
            }
            return Promise.resolve(underlyingParams);
          }, makeErroringRootParams = function(underlyingParams, fallbackParams, workStore, prerenderStore) {
            const cachedParams = CachedParams.get(underlyingParams);
            if (cachedParams) {
              return cachedParams;
            }
            const augmentedUnderlying = {
              ...underlyingParams
            };
            const promise = Promise.resolve(augmentedUnderlying);
            CachedParams.set(underlyingParams, promise);
            Object.keys(underlyingParams).forEach((prop) => {
              if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop)) {
              } else {
                if (fallbackParams.has(prop)) {
                  Object.defineProperty(augmentedUnderlying, prop, {
                    get() {
                      const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])("unstable_rootParams", prop);
                      if (prerenderStore.type === "prerender-ppr") {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, expression, prerenderStore.dynamicTracking);
                      } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])(expression, workStore, prerenderStore);
                      }
                    },
                    enumerable: true
                  });
                } else {
                  ;
                  promise[prop] = underlyingParams[prop];
                }
              }
            });
            return promise;
          };
          __turbopack_context__.s({
            "unstable_rootParams": () => unstable_rootParams
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
          const CachedParams = /* @__PURE__ */ new WeakMap();
          async function unstable_rootParams() {
            const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
            if (!workStore) {
              throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]("Missing workStore in unstable_rootParams"), "__NEXT_ERROR_CODE", {
                value: "E615",
                enumerable: false,
                configurable: true
              });
            }
            const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
            if (!workUnitStore) {
              throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
                value: "E641",
                enumerable: false,
                configurable: true
              });
            }
            switch (workUnitStore.type) {
              case "unstable-cache":
              case "cache": {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                  value: "E642",
                  enumerable: false,
                  configurable: true
                });
              }
              case "prerender":
              case "prerender-ppr":
              case "prerender-legacy":
                return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
              default:
                return Promise.resolve(workUnitStore.rootParams);
            }
          }
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$connection$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$root$2d$params$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          ;
          ;
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$connection$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$root$2d$params$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>");
          ;
        }
      },
      "[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({});
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isHTTPAccessFallbackError = function(error2) {
            if (typeof error2 !== "object" || error2 === null || !("digest" in error2) || typeof error2.digest !== "string") {
              return false;
            }
            const [prefix, httpStatus] = error2.digest.split(";");
            return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
          }, getAccessFallbackHTTPStatus = function(error2) {
            const httpStatus = error2.digest.split(";")[1];
            return Number(httpStatus);
          }, getAccessFallbackErrorTypeByStatus = function(status) {
            switch (status) {
              case 401:
                return "unauthorized";
              case 403:
                return "forbidden";
              case 404:
                return "not-found";
              default:
                return;
            }
          };
          __turbopack_context__.s({
            "HTTPAccessErrorStatus": () => HTTPAccessErrorStatus,
            "HTTP_ERROR_FALLBACK_ERROR_CODE": () => HTTP_ERROR_FALLBACK_ERROR_CODE,
            "getAccessFallbackErrorTypeByStatus": () => getAccessFallbackErrorTypeByStatus,
            "getAccessFallbackHTTPStatus": () => getAccessFallbackHTTPStatus,
            "isHTTPAccessFallbackError": () => isHTTPAccessFallbackError
          });
          const HTTPAccessErrorStatus = {
            NOT_FOUND: 404,
            FORBIDDEN: 403,
            UNAUTHORIZED: 401
          };
          const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
          const HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          __turbopack_context__.s({
            "RedirectStatusCode": () => RedirectStatusCode
          });
          var RedirectStatusCode = /* @__PURE__ */ function(RedirectStatusCode2) {
            RedirectStatusCode2[RedirectStatusCode2["SeeOther"] = 303] = "SeeOther";
            RedirectStatusCode2[RedirectStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
            RedirectStatusCode2[RedirectStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
            return RedirectStatusCode2;
          }({});
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/redirect-error.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isRedirectError = function(error2) {
            if (typeof error2 !== "object" || error2 === null || !("digest" in error2) || typeof error2.digest !== "string") {
              return false;
            }
            const digest = error2.digest.split(";");
            const [errorCode, type] = digest;
            const destination = digest.slice(2, -2).join(";");
            const status = digest.at(-2);
            const statusCode = Number(status);
            return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RedirectStatusCode"];
          };
          __turbopack_context__.s({
            "REDIRECT_ERROR_CODE": () => REDIRECT_ERROR_CODE,
            "RedirectType": () => RedirectType,
            "isRedirectError": () => isRedirectError
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware-edge] (ecmascript)");
          ;
          const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
          var RedirectType = /* @__PURE__ */ function(RedirectType2) {
            RedirectType2["push"] = "push";
            RedirectType2["replace"] = "replace";
            return RedirectType2;
          }({});
        }
      },
      "[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let isNextRouterError = function(error2) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isRedirectError"])(error2) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isHTTPAccessFallbackError"])(error2);
          };
          __turbopack_context__.s({
            "isNextRouterError": () => isNextRouterError
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/redirect-error.js [middleware-edge] (ecmascript)");
          ;
          ;
        }
      },
      '[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => "[project]/middleware.js [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)': (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let errorHandledHandler = function(fn) {
            return async (...args) => {
              try {
                return await fn(...args);
              } catch (err) {
                if ("TURBOPACK compile-time truthy", 1) {
                  if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNextRouterError"])(err)) {
                    err.message = `Next.js navigation API is not allowed to be used in Middleware.`;
                    throw err;
                  }
                }
                const req = args[0];
                const url = new URL(req.url);
                const resource = url.pathname + url.search;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["edgeInstrumentationOnRequestError"])(err, {
                  path: resource,
                  method: req.method,
                  headers: Object.fromEntries(req.headers.entries())
                }, {
                  routerKind: "Pages Router",
                  routePath: "/middleware",
                  routeType: "middleware",
                  revalidateReason: void 0
                });
                throw err;
              }
            };
          }, nHandler = function(opts) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["adapter"])({
              ...opts,
              page,
              handler: errorHandledHandler(handler3)
            });
          };
          __turbopack_context__.s({
            "default": () => nHandler
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/adapter.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/middleware.js [middleware-edge] (ecmascript)");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware-edge] (ecmascript)");
          ;
          ;
          ;
          ;
          ;
          const mod = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__
          };
          const handler3 = mod.middleware || mod.default;
          const page = "/middleware";
          if (typeof handler3 !== "function") {
            throw Object.defineProperty(new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", {
              value: "E120",
              enumerable: false,
              configurable: true
            });
          }
        }
      },
      '[project]/edge-wrapper.js { MODULE => "[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\"[project]/middleware.js [middleware-edge] (ecmascript)\\" } [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)': function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          self._ENTRIES ||= {};
          const modProm = Promise.resolve().then(() => __turbopack_context__.i('[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => "[project]/middleware.js [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)'));
          modProm.catch(() => {
          });
          self._ENTRIES["middleware_middleware"] = new Proxy(modProm, {
            get(modProm2, name) {
              if (name === "then") {
                return (res, rej) => modProm2.then(res, rej);
              }
              let result = (...args) => modProm2.then((mod) => (0, mod[name])(...args));
              result.then = (res, rej) => modProm2.then((mod) => mod[name]).then(res, rej);
              return result;
            }
          });
        }
      }
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__5e96eddc._.js
var require_root_of_the_server_5e96eddc = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__5e96eddc._.js"() {
    "use strict";
    (globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__5e96eddc._.js", {
      "[externals]/node:buffer [external] (node:buffer, cjs)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          const mod = __turbopack_context__.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
          module2.exports = mod;
        }
      },
      "[externals]/node:async_hooks [external] (node:async_hooks, cjs)": function(__turbopack_context__) {
        var { g: global, __dirname: __dirname2, m: module2, e: exports2 } = __turbopack_context__;
        {
          const mod = __turbopack_context__.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
          module2.exports = mod;
        }
      },
      "[project]/middleware.js [middleware-edge] (ecmascript)": (__turbopack_context__) => {
        "use strict";
        var { g: global, __dirname: __dirname2 } = __turbopack_context__;
        {
          let middleware = function(request) {
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
            response.headers.set("X-Robots-Tag", "index, follow");
            return response;
          };
          __turbopack_context__.s({
            "config": () => config,
            "middleware": () => middleware
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
          ;
          const config = {
            matcher: [
              "/((?!_next|api|static|favicon.ico).*)"
            ]
          };
        }
      }
    }]);
  }
});

// .next/server/edge/chunks/edge-wrapper_386ac0d6.js
var require_edge_wrapper_386ac0d6 = __commonJS({
  ".next/server/edge/chunks/edge-wrapper_386ac0d6.js"() {
    "use strict";
    (globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
      "chunks/edge-wrapper_386ac0d6.js",
      {},
      { "otherChunks": ["chunks/_3e36637b._.js", "chunks/[root-of-the-server]__5e96eddc._.js"], "runtimeModuleIds": ['[project]/edge-wrapper.js { MODULE => "[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\"[project]/middleware.js [middleware-edge] (ecmascript)\\" } [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)'] }
    ]);
    (() => {
      if (!Array.isArray(globalThis.TURBOPACK)) {
        return;
      }
      const CHUNK_BASE_PATH = "";
      const CHUNK_SUFFIX_PATH = "";
      const RELATIVE_ROOT_PATH = "..";
      const RUNTIME_PUBLIC_PATH = "";
      const REEXPORTED_OBJECTS = Symbol("reexported objects");
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      const toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag;
      function defineProp(obj, name, options) {
        if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
      }
      function esm(exports2, getters) {
        defineProp(exports2, "__esModule", {
          value: true
        });
        if (toStringTag) defineProp(exports2, toStringTag, {
          value: "Module"
        });
        for (const key in getters) {
          const item = getters[key];
          if (Array.isArray(item)) {
            defineProp(exports2, key, {
              get: item[0],
              set: item[1],
              enumerable: true
            });
          } else {
            defineProp(exports2, key, {
              get: item,
              enumerable: true
            });
          }
        }
        Object.seal(exports2);
      }
      function esmExport(module2, exports2, getters) {
        module2.namespaceObject = module2.exports;
        esm(exports2, getters);
      }
      function ensureDynamicExports(module2, exports2) {
        let reexportedObjects = module2[REEXPORTED_OBJECTS];
        if (!reexportedObjects) {
          reexportedObjects = module2[REEXPORTED_OBJECTS] = [];
          module2.exports = module2.namespaceObject = new Proxy(exports2, {
            get(target, prop) {
              if (hasOwnProperty.call(target, prop) || prop === "default" || prop === "__esModule") {
                return Reflect.get(target, prop);
              }
              for (const obj of reexportedObjects) {
                const value = Reflect.get(obj, prop);
                if (value !== void 0) return value;
              }
              return void 0;
            },
            ownKeys(target) {
              const keys = Reflect.ownKeys(target);
              for (const obj of reexportedObjects) {
                for (const key of Reflect.ownKeys(obj)) {
                  if (key !== "default" && !keys.includes(key)) keys.push(key);
                }
              }
              return keys;
            }
          });
        }
      }
      function dynamicExport(module2, exports2, object) {
        ensureDynamicExports(module2, exports2);
        if (typeof object === "object" && object !== null) {
          module2[REEXPORTED_OBJECTS].push(object);
        }
      }
      function exportValue(module2, value) {
        module2.exports = value;
      }
      function exportNamespace(module2, namespace) {
        module2.exports = module2.namespaceObject = namespace;
      }
      function createGetter(obj, key) {
        return () => obj[key];
      }
      const getProto = Object.getPrototypeOf ? (obj) => Object.getPrototypeOf(obj) : (obj) => obj.__proto__;
      const LEAF_PROTOTYPES = [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto)
      ];
      function interopEsm(raw, ns, allowExportDefault) {
        const getters = /* @__PURE__ */ Object.create(null);
        for (let current = raw; (typeof current === "object" || typeof current === "function") && !LEAF_PROTOTYPES.includes(current); current = getProto(current)) {
          for (const key of Object.getOwnPropertyNames(current)) {
            getters[key] = createGetter(raw, key);
          }
        }
        if (!(allowExportDefault && "default" in getters)) {
          getters["default"] = () => raw;
        }
        esm(ns, getters);
        return ns;
      }
      function createNS(raw) {
        if (typeof raw === "function") {
          return function(...args) {
            return raw.apply(this, args);
          };
        } else {
          return /* @__PURE__ */ Object.create(null);
        }
      }
      function esmImport(sourceModule, id) {
        const module2 = getOrInstantiateModuleFromParent(id, sourceModule);
        if (module2.error) throw module2.error;
        if (module2.namespaceObject) return module2.namespaceObject;
        const raw = module2.exports;
        return module2.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
      }
      const runtimeRequire = (
        // @ts-ignore
        typeof __require === "function" ? __require : function require1() {
          throw new Error("Unexpected use of runtime require");
        }
      );
      function commonJsRequire(sourceModule, id) {
        const module2 = getOrInstantiateModuleFromParent(id, sourceModule);
        if (module2.error) throw module2.error;
        return module2.exports;
      }
      function moduleContext(map) {
        function moduleContext2(id) {
          if (hasOwnProperty.call(map, id)) {
            return map[id].module();
          }
          const e = new Error(`Cannot find module '${id}'`);
          e.code = "MODULE_NOT_FOUND";
          throw e;
        }
        moduleContext2.keys = () => {
          return Object.keys(map);
        };
        moduleContext2.resolve = (id) => {
          if (hasOwnProperty.call(map, id)) {
            return map[id].id();
          }
          const e = new Error(`Cannot find module '${id}'`);
          e.code = "MODULE_NOT_FOUND";
          throw e;
        };
        moduleContext2.import = async (id) => {
          return await moduleContext2(id);
        };
        return moduleContext2;
      }
      function getChunkPath(chunkData) {
        return typeof chunkData === "string" ? chunkData : chunkData.path;
      }
      function isPromise(maybePromise) {
        return maybePromise != null && typeof maybePromise === "object" && "then" in maybePromise && typeof maybePromise.then === "function";
      }
      function isAsyncModuleExt(obj) {
        return turbopackQueues in obj;
      }
      function createPromise() {
        let resolve;
        let reject;
        const promise = new Promise((res, rej) => {
          reject = rej;
          resolve = res;
        });
        return {
          promise,
          resolve,
          reject
        };
      }
      const turbopackQueues = Symbol("turbopack queues");
      const turbopackExports = Symbol("turbopack exports");
      const turbopackError = Symbol("turbopack error");
      function resolveQueue2(queue) {
        if (queue && queue.status !== 1) {
          queue.status = 1;
          queue.forEach((fn) => fn.queueCount--);
          queue.forEach((fn) => fn.queueCount-- ? fn.queueCount++ : fn());
        }
      }
      function wrapDeps(deps) {
        return deps.map((dep) => {
          if (dep !== null && typeof dep === "object") {
            if (isAsyncModuleExt(dep)) return dep;
            if (isPromise(dep)) {
              const queue = Object.assign([], {
                status: 0
              });
              const obj = {
                [turbopackExports]: {},
                [turbopackQueues]: (fn) => fn(queue)
              };
              dep.then((res) => {
                obj[turbopackExports] = res;
                resolveQueue2(queue);
              }, (err) => {
                obj[turbopackError] = err;
                resolveQueue2(queue);
              });
              return obj;
            }
          }
          return {
            [turbopackExports]: dep,
            [turbopackQueues]: () => {
            }
          };
        });
      }
      function asyncModule(module2, body, hasAwait) {
        const queue = hasAwait ? Object.assign([], {
          status: -1
        }) : void 0;
        const depQueues = /* @__PURE__ */ new Set();
        const { resolve, reject, promise: rawPromise } = createPromise();
        const promise = Object.assign(rawPromise, {
          [turbopackExports]: module2.exports,
          [turbopackQueues]: (fn) => {
            queue && fn(queue);
            depQueues.forEach(fn);
            promise["catch"](() => {
            });
          }
        });
        const attributes = {
          get() {
            return promise;
          },
          set(v) {
            if (v !== promise) {
              promise[turbopackExports] = v;
            }
          }
        };
        Object.defineProperty(module2, "exports", attributes);
        Object.defineProperty(module2, "namespaceObject", attributes);
        function handleAsyncDependencies(deps) {
          const currentDeps = wrapDeps(deps);
          const getResult = () => currentDeps.map((d) => {
            if (d[turbopackError]) throw d[turbopackError];
            return d[turbopackExports];
          });
          const { promise: promise2, resolve: resolve2 } = createPromise();
          const fn = Object.assign(() => resolve2(getResult), {
            queueCount: 0
          });
          function fnQueue(q) {
            if (q !== queue && !depQueues.has(q)) {
              depQueues.add(q);
              if (q && q.status === 0) {
                fn.queueCount++;
                q.push(fn);
              }
            }
          }
          currentDeps.map((dep) => dep[turbopackQueues](fnQueue));
          return fn.queueCount ? promise2 : getResult();
        }
        function asyncResult(err) {
          if (err) {
            reject(promise[turbopackError] = err);
          } else {
            resolve(promise[turbopackExports]);
          }
          resolveQueue2(queue);
        }
        body(handleAsyncDependencies, asyncResult);
        if (queue && queue.status === -1) {
          queue.status = 0;
        }
      }
      const relativeURL = function relativeURL2(inputUrl) {
        const realUrl = new URL(inputUrl, "x:/");
        const values = {};
        for (const key in realUrl) values[key] = realUrl[key];
        values.href = inputUrl;
        values.pathname = inputUrl.replace(/[?#].*/, "");
        values.origin = values.protocol = "";
        values.toString = values.toJSON = (..._args) => inputUrl;
        for (const key in values) Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          value: values[key]
        });
      };
      relativeURL.prototype = URL.prototype;
      function invariant(never, computeMessage) {
        throw new Error(`Invariant: ${computeMessage(never)}`);
      }
      function requireStub(_moduleId) {
        throw new Error("dynamic usage of require is not supported");
      }
      var SourceType = /* @__PURE__ */ function(SourceType2) {
        SourceType2[SourceType2["Runtime"] = 0] = "Runtime";
        SourceType2[SourceType2["Parent"] = 1] = "Parent";
        SourceType2[SourceType2["Update"] = 2] = "Update";
        return SourceType2;
      }(SourceType || {});
      const moduleFactories = /* @__PURE__ */ Object.create(null);
      const runtimeModules = /* @__PURE__ */ new Set();
      const moduleChunksMap = /* @__PURE__ */ new Map();
      const chunkModulesMap = /* @__PURE__ */ new Map();
      const runtimeChunkLists = /* @__PURE__ */ new Set();
      const chunkListChunksMap = /* @__PURE__ */ new Map();
      const chunkChunkListsMap = /* @__PURE__ */ new Map();
      const availableModules = /* @__PURE__ */ new Map();
      const availableModuleChunks = /* @__PURE__ */ new Map();
      async function loadChunk(source, chunkData) {
        if (typeof chunkData === "string") {
          return loadChunkPath(source, chunkData);
        }
        const includedList = chunkData.included || [];
        const modulesPromises = includedList.map((included) => {
          if (moduleFactories[included]) return true;
          return availableModules.get(included);
        });
        if (modulesPromises.length > 0 && modulesPromises.every((p) => p)) {
          return Promise.all(modulesPromises);
        }
        const includedModuleChunksList = chunkData.moduleChunks || [];
        const moduleChunksPromises = includedModuleChunksList.map((included) => {
          return availableModuleChunks.get(included);
        }).filter((p) => p);
        let promise;
        if (moduleChunksPromises.length > 0) {
          if (moduleChunksPromises.length === includedModuleChunksList.length) {
            return Promise.all(moduleChunksPromises);
          }
          const moduleChunksToLoad = /* @__PURE__ */ new Set();
          for (const moduleChunk of includedModuleChunksList) {
            if (!availableModuleChunks.has(moduleChunk)) {
              moduleChunksToLoad.add(moduleChunk);
            }
          }
          for (const moduleChunkToLoad of moduleChunksToLoad) {
            const promise2 = loadChunkPath(source, moduleChunkToLoad);
            availableModuleChunks.set(moduleChunkToLoad, promise2);
            moduleChunksPromises.push(promise2);
          }
          promise = Promise.all(moduleChunksPromises);
        } else {
          promise = loadChunkPath(source, chunkData.path);
          for (const includedModuleChunk of includedModuleChunksList) {
            if (!availableModuleChunks.has(includedModuleChunk)) {
              availableModuleChunks.set(includedModuleChunk, promise);
            }
          }
        }
        for (const included of includedList) {
          if (!availableModules.has(included)) {
            availableModules.set(included, promise);
          }
        }
        return promise;
      }
      async function loadChunkByUrl(source, chunkUrl) {
        try {
          await BACKEND.loadChunk(chunkUrl, source);
        } catch (error2) {
          let loadReason;
          switch (source.type) {
            case 0:
              loadReason = `as a runtime dependency of chunk ${source.chunkPath}`;
              break;
            case 1:
              loadReason = `from module ${source.parentId}`;
              break;
            case 2:
              loadReason = "from an HMR update";
              break;
            default:
              invariant(source, (source2) => `Unknown source type: ${source2?.type}`);
          }
          throw new Error(`Failed to load chunk ${chunkUrl} ${loadReason}${error2 ? `: ${error2}` : ""}`, error2 ? {
            cause: error2
          } : void 0);
        }
      }
      async function loadChunkPath(source, chunkPath) {
        const url = getChunkRelativeUrl(chunkPath);
        return loadChunkByUrl(source, url);
      }
      function createResolvePathFromModule(resolver2) {
        return function resolvePathFromModule(moduleId) {
          const exported = resolver2(moduleId);
          return exported?.default ?? exported;
        };
      }
      function resolveAbsolutePath(modulePath) {
        return `/ROOT/${modulePath ?? ""}`;
      }
      function getWorkerBlobURL(chunks) {
        let bootstrap = `self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(chunks.reverse().map(getChunkRelativeUrl), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`;
        let blob = new Blob([
          bootstrap
        ], {
          type: "text/javascript"
        });
        return URL.createObjectURL(blob);
      }
      function addModuleToChunk(moduleId, chunkPath) {
        let moduleChunks = moduleChunksMap.get(moduleId);
        if (!moduleChunks) {
          moduleChunks = /* @__PURE__ */ new Set([
            chunkPath
          ]);
          moduleChunksMap.set(moduleId, moduleChunks);
        } else {
          moduleChunks.add(chunkPath);
        }
        let chunkModules = chunkModulesMap.get(chunkPath);
        if (!chunkModules) {
          chunkModules = /* @__PURE__ */ new Set([
            moduleId
          ]);
          chunkModulesMap.set(chunkPath, chunkModules);
        } else {
          chunkModules.add(moduleId);
        }
      }
      function getFirstModuleChunk(moduleId) {
        const moduleChunkPaths = moduleChunksMap.get(moduleId);
        if (moduleChunkPaths == null) {
          return null;
        }
        return moduleChunkPaths.values().next().value;
      }
      function instantiateRuntimeModule(moduleId, chunkPath) {
        return instantiateModule(moduleId, {
          type: 0,
          chunkPath
        });
      }
      function getChunkRelativeUrl(chunkPath) {
        return `${CHUNK_BASE_PATH}${chunkPath.split("/").map((p) => encodeURIComponent(p)).join("/")}${CHUNK_SUFFIX_PATH}`;
      }
      function getPathFromScript(chunkScript) {
        if (typeof chunkScript === "string") {
          return chunkScript;
        }
        const chunkUrl = typeof TURBOPACK_NEXT_CHUNK_URLS !== "undefined" ? TURBOPACK_NEXT_CHUNK_URLS.pop() : chunkScript.getAttribute("src");
        const src = decodeURIComponent(chunkUrl.replace(/[?#].*$/, ""));
        const path3 = src.startsWith(CHUNK_BASE_PATH) ? src.slice(CHUNK_BASE_PATH.length) : src;
        return path3;
      }
      function markChunkListAsRuntime(chunkListPath) {
        runtimeChunkLists.add(chunkListPath);
      }
      function registerChunk([chunkScript, chunkModules, runtimeParams]) {
        const chunkPath = getPathFromScript(chunkScript);
        for (const [moduleId, moduleFactory] of Object.entries(chunkModules)) {
          if (!moduleFactories[moduleId]) {
            moduleFactories[moduleId] = moduleFactory;
          }
          addModuleToChunk(moduleId, chunkPath);
        }
        return BACKEND.registerChunk(chunkPath, runtimeParams);
      }
      const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      function isJs(chunkUrlOrPath) {
        return regexJsUrl.test(chunkUrlOrPath);
      }
      const regexCssUrl = /\.css(?:\?[^#]*)?(?:#.*)?$/;
      function isCss(chunkUrl) {
        return regexCssUrl.test(chunkUrl);
      }
      const devModuleCache = /* @__PURE__ */ Object.create(null);
      class UpdateApplyError extends Error {
        name = "UpdateApplyError";
        dependencyChain;
        constructor(message, dependencyChain) {
          super(message);
          this.dependencyChain = dependencyChain;
        }
      }
      const moduleHotData = /* @__PURE__ */ new Map();
      const moduleHotState = /* @__PURE__ */ new Map();
      const queuedInvalidatedModules = /* @__PURE__ */ new Set();
      function getOrInstantiateRuntimeModule(moduleId, chunkPath) {
        const module2 = devModuleCache[moduleId];
        if (module2) {
          if (module2.error) {
            throw module2.error;
          }
          return module2;
        }
        return instantiateModule(moduleId, {
          type: SourceType.Runtime,
          chunkPath
        });
      }
      const getOrInstantiateModuleFromParent = (id, sourceModule) => {
        if (!sourceModule.hot.active) {
          console.warn(`Unexpected import of module ${id} from module ${sourceModule.id}, which was deleted by an HMR update`);
        }
        const module2 = devModuleCache[id];
        if (sourceModule.children.indexOf(id) === -1) {
          sourceModule.children.push(id);
        }
        if (module2) {
          if (module2.parents.indexOf(sourceModule.id) === -1) {
            module2.parents.push(sourceModule.id);
          }
          return module2;
        }
        return instantiateModule(id, {
          type: SourceType.Parent,
          parentId: sourceModule.id
        });
      };
      function instantiateModule(id, source) {
        const moduleFactory = moduleFactories[id];
        if (typeof moduleFactory !== "function") {
          let instantiationReason;
          switch (source.type) {
            case SourceType.Runtime:
              instantiationReason = `as a runtime entry of chunk ${source.chunkPath}`;
              break;
            case SourceType.Parent:
              instantiationReason = `because it was required from module ${source.parentId}`;
              break;
            case SourceType.Update:
              instantiationReason = "because of an HMR update";
              break;
            default:
              invariant(source, (source2) => `Unknown source type: ${source2?.type}`);
          }
          throw new Error(`Module ${id} was instantiated ${instantiationReason}, but the module factory is not available. It might have been deleted in an HMR update.`);
        }
        const hotData = moduleHotData.get(id);
        const { hot, hotState } = createModuleHot(id, hotData);
        let parents;
        switch (source.type) {
          case SourceType.Runtime:
            runtimeModules.add(id);
            parents = [];
            break;
          case SourceType.Parent:
            parents = [
              source.parentId
            ];
            break;
          case SourceType.Update:
            parents = source.parents || [];
            break;
          default:
            invariant(source, (source2) => `Unknown source type: ${source2?.type}`);
        }
        const module2 = {
          exports: {},
          error: void 0,
          loaded: false,
          id,
          parents,
          children: [],
          namespaceObject: void 0,
          hot
        };
        devModuleCache[id] = module2;
        moduleHotState.set(module2, hotState);
        try {
          const sourceInfo = {
            type: SourceType.Parent,
            parentId: id
          };
          runModuleExecutionHooks(module2, (refresh) => {
            const r = commonJsRequire.bind(null, module2);
            moduleFactory.call(module2.exports, augmentContext({
              a: asyncModule.bind(null, module2),
              e: module2.exports,
              r: commonJsRequire.bind(null, module2),
              t: runtimeRequire,
              f: moduleContext,
              i: esmImport.bind(null, module2),
              s: esmExport.bind(null, module2, module2.exports),
              j: dynamicExport.bind(null, module2, module2.exports),
              v: exportValue.bind(null, module2),
              n: exportNamespace.bind(null, module2),
              m: module2,
              c: devModuleCache,
              M: moduleFactories,
              l: loadChunk.bind(null, sourceInfo),
              L: loadChunkByUrl.bind(null, sourceInfo),
              w: loadWebAssembly.bind(null, sourceInfo),
              u: loadWebAssemblyModule.bind(null, sourceInfo),
              g: globalThis,
              P: resolveAbsolutePath,
              U: relativeURL,
              k: refresh,
              R: createResolvePathFromModule(r),
              b: getWorkerBlobURL,
              z: requireStub,
              d: typeof module2.id === "string" ? module2.id.replace(/(^|\/)\/+$/, "") : module2.id
            }));
          });
        } catch (error2) {
          module2.error = error2;
          throw error2;
        }
        module2.loaded = true;
        if (module2.namespaceObject && module2.exports !== module2.namespaceObject) {
          interopEsm(module2.exports, module2.namespaceObject);
        }
        return module2;
      }
      function runModuleExecutionHooks(module2, executeModule) {
        const cleanupReactRefreshIntercept = typeof globalThis.$RefreshInterceptModuleExecution$ === "function" ? globalThis.$RefreshInterceptModuleExecution$(module2.id) : () => {
        };
        try {
          executeModule({
            register: globalThis.$RefreshReg$,
            signature: globalThis.$RefreshSig$,
            registerExports: registerExportsAndSetupBoundaryForReactRefresh
          });
        } catch (e) {
          throw e;
        } finally {
          cleanupReactRefreshIntercept();
        }
      }
      function registerExportsAndSetupBoundaryForReactRefresh(module2, helpers) {
        const currentExports = module2.exports;
        const prevExports = module2.hot.data.prevExports ?? null;
        helpers.registerExportsForReactRefresh(currentExports, module2.id);
        if (helpers.isReactRefreshBoundary(currentExports)) {
          module2.hot.dispose((data) => {
            data.prevExports = currentExports;
          });
          module2.hot.accept();
          if (prevExports !== null) {
            if (helpers.shouldInvalidateReactRefreshBoundary(helpers.getRefreshBoundarySignature(prevExports), helpers.getRefreshBoundarySignature(currentExports))) {
              module2.hot.invalidate();
            } else {
              helpers.scheduleUpdate();
            }
          }
        } else {
          const isNoLongerABoundary = prevExports !== null;
          if (isNoLongerABoundary) {
            module2.hot.invalidate();
          }
        }
      }
      function formatDependencyChain(dependencyChain) {
        return `Dependency chain: ${dependencyChain.join(" -> ")}`;
      }
      function computeOutdatedModules(added, modified) {
        const newModuleFactories = /* @__PURE__ */ new Map();
        for (const [moduleId, entry] of added) {
          if (entry != null) {
            newModuleFactories.set(moduleId, _eval(entry));
          }
        }
        const outdatedModules = computedInvalidatedModules(modified.keys());
        for (const [moduleId, entry] of modified) {
          newModuleFactories.set(moduleId, _eval(entry));
        }
        return {
          outdatedModules,
          newModuleFactories
        };
      }
      function computedInvalidatedModules(invalidated) {
        const outdatedModules = /* @__PURE__ */ new Set();
        for (const moduleId of invalidated) {
          const effect = getAffectedModuleEffects(moduleId);
          switch (effect.type) {
            case "unaccepted":
              throw new UpdateApplyError(`cannot apply update: unaccepted module. ${formatDependencyChain(effect.dependencyChain)}.`, effect.dependencyChain);
            case "self-declined":
              throw new UpdateApplyError(`cannot apply update: self-declined module. ${formatDependencyChain(effect.dependencyChain)}.`, effect.dependencyChain);
            case "accepted":
              for (const outdatedModuleId of effect.outdatedModules) {
                outdatedModules.add(outdatedModuleId);
              }
              break;
            // TODO(alexkirsz) Dependencies: handle dependencies effects.
            default:
              invariant(effect, (effect2) => `Unknown effect type: ${effect2?.type}`);
          }
        }
        return outdatedModules;
      }
      function computeOutdatedSelfAcceptedModules(outdatedModules) {
        const outdatedSelfAcceptedModules = [];
        for (const moduleId of outdatedModules) {
          const module2 = devModuleCache[moduleId];
          const hotState = moduleHotState.get(module2);
          if (module2 && hotState.selfAccepted && !hotState.selfInvalidated) {
            outdatedSelfAcceptedModules.push({
              moduleId,
              errorHandler: hotState.selfAccepted
            });
          }
        }
        return outdatedSelfAcceptedModules;
      }
      function updateChunksPhase(chunksAddedModules, chunksDeletedModules) {
        for (const [chunkPath, addedModuleIds] of chunksAddedModules) {
          for (const moduleId of addedModuleIds) {
            addModuleToChunk(moduleId, chunkPath);
          }
        }
        const disposedModules = /* @__PURE__ */ new Set();
        for (const [chunkPath, addedModuleIds] of chunksDeletedModules) {
          for (const moduleId of addedModuleIds) {
            if (removeModuleFromChunk(moduleId, chunkPath)) {
              disposedModules.add(moduleId);
            }
          }
        }
        return {
          disposedModules
        };
      }
      function disposePhase(outdatedModules, disposedModules) {
        for (const moduleId of outdatedModules) {
          disposeModule(moduleId, "replace");
        }
        for (const moduleId of disposedModules) {
          disposeModule(moduleId, "clear");
        }
        const outdatedModuleParents = /* @__PURE__ */ new Map();
        for (const moduleId of outdatedModules) {
          const oldModule = devModuleCache[moduleId];
          outdatedModuleParents.set(moduleId, oldModule?.parents);
          delete devModuleCache[moduleId];
        }
        return {
          outdatedModuleParents
        };
      }
      function disposeModule(moduleId, mode) {
        const module2 = devModuleCache[moduleId];
        if (!module2) {
          return;
        }
        const hotState = moduleHotState.get(module2);
        const data = {};
        for (const disposeHandler of hotState.disposeHandlers) {
          disposeHandler(data);
        }
        module2.hot.active = false;
        moduleHotState.delete(module2);
        for (const childId of module2.children) {
          const child = devModuleCache[childId];
          if (!child) {
            continue;
          }
          const idx = child.parents.indexOf(module2.id);
          if (idx >= 0) {
            child.parents.splice(idx, 1);
          }
        }
        switch (mode) {
          case "clear":
            delete devModuleCache[module2.id];
            moduleHotData.delete(module2.id);
            break;
          case "replace":
            moduleHotData.set(module2.id, data);
            break;
          default:
            invariant(mode, (mode2) => `invalid mode: ${mode2}`);
        }
      }
      function applyPhase(outdatedSelfAcceptedModules, newModuleFactories, outdatedModuleParents, reportError) {
        for (const [moduleId, factory] of newModuleFactories.entries()) {
          moduleFactories[moduleId] = factory;
        }
        for (const { moduleId, errorHandler } of outdatedSelfAcceptedModules) {
          try {
            instantiateModule(moduleId, {
              type: SourceType.Update,
              parents: outdatedModuleParents.get(moduleId)
            });
          } catch (err) {
            if (typeof errorHandler === "function") {
              try {
                errorHandler(err, {
                  moduleId,
                  module: devModuleCache[moduleId]
                });
              } catch (err2) {
                reportError(err2);
                reportError(err);
              }
            } else {
              reportError(err);
            }
          }
        }
      }
      function applyUpdate(update) {
        switch (update.type) {
          case "ChunkListUpdate":
            applyChunkListUpdate(update);
            break;
          default:
            invariant(update, (update2) => `Unknown update type: ${update2.type}`);
        }
      }
      function applyChunkListUpdate(update) {
        if (update.merged != null) {
          for (const merged of update.merged) {
            switch (merged.type) {
              case "EcmascriptMergedUpdate":
                applyEcmascriptMergedUpdate(merged);
                break;
              default:
                invariant(merged, (merged2) => `Unknown merged type: ${merged2.type}`);
            }
          }
        }
        if (update.chunks != null) {
          for (const [chunkPath, chunkUpdate] of Object.entries(update.chunks)) {
            const chunkUrl = getChunkRelativeUrl(chunkPath);
            switch (chunkUpdate.type) {
              case "added":
                BACKEND.loadChunk(chunkUrl, {
                  type: SourceType.Update
                });
                break;
              case "total":
                DEV_BACKEND.reloadChunk?.(chunkUrl);
                break;
              case "deleted":
                DEV_BACKEND.unloadChunk?.(chunkUrl);
                break;
              case "partial":
                invariant(chunkUpdate.instruction, (instruction) => `Unknown partial instruction: ${JSON.stringify(instruction)}.`);
                break;
              default:
                invariant(chunkUpdate, (chunkUpdate2) => `Unknown chunk update type: ${chunkUpdate2.type}`);
            }
          }
        }
      }
      function applyEcmascriptMergedUpdate(update) {
        const { entries = {}, chunks = {} } = update;
        const { added, modified, chunksAdded, chunksDeleted } = computeChangedModules(entries, chunks);
        const { outdatedModules, newModuleFactories } = computeOutdatedModules(added, modified);
        const { disposedModules } = updateChunksPhase(chunksAdded, chunksDeleted);
        applyInternal(outdatedModules, disposedModules, newModuleFactories);
      }
      function applyInvalidatedModules(outdatedModules) {
        if (queuedInvalidatedModules.size > 0) {
          computedInvalidatedModules(queuedInvalidatedModules).forEach((moduleId) => {
            outdatedModules.add(moduleId);
          });
          queuedInvalidatedModules.clear();
        }
        return outdatedModules;
      }
      function applyInternal(outdatedModules, disposedModules, newModuleFactories) {
        outdatedModules = applyInvalidatedModules(outdatedModules);
        const outdatedSelfAcceptedModules = computeOutdatedSelfAcceptedModules(outdatedModules);
        const { outdatedModuleParents } = disposePhase(outdatedModules, disposedModules);
        let error2;
        function reportError(err) {
          if (!error2) error2 = err;
        }
        applyPhase(outdatedSelfAcceptedModules, newModuleFactories, outdatedModuleParents, reportError);
        if (error2) {
          throw error2;
        }
        if (queuedInvalidatedModules.size > 0) {
          applyInternal(/* @__PURE__ */ new Set(), [], /* @__PURE__ */ new Map());
        }
      }
      function computeChangedModules(entries, updates) {
        const chunksAdded = /* @__PURE__ */ new Map();
        const chunksDeleted = /* @__PURE__ */ new Map();
        const added = /* @__PURE__ */ new Map();
        const modified = /* @__PURE__ */ new Map();
        const deleted = /* @__PURE__ */ new Set();
        for (const [chunkPath, mergedChunkUpdate] of Object.entries(updates)) {
          switch (mergedChunkUpdate.type) {
            case "added": {
              const updateAdded = new Set(mergedChunkUpdate.modules);
              for (const moduleId of updateAdded) {
                added.set(moduleId, entries[moduleId]);
              }
              chunksAdded.set(chunkPath, updateAdded);
              break;
            }
            case "deleted": {
              const updateDeleted = new Set(chunkModulesMap.get(chunkPath));
              for (const moduleId of updateDeleted) {
                deleted.add(moduleId);
              }
              chunksDeleted.set(chunkPath, updateDeleted);
              break;
            }
            case "partial": {
              const updateAdded = new Set(mergedChunkUpdate.added);
              const updateDeleted = new Set(mergedChunkUpdate.deleted);
              for (const moduleId of updateAdded) {
                added.set(moduleId, entries[moduleId]);
              }
              for (const moduleId of updateDeleted) {
                deleted.add(moduleId);
              }
              chunksAdded.set(chunkPath, updateAdded);
              chunksDeleted.set(chunkPath, updateDeleted);
              break;
            }
            default:
              invariant(mergedChunkUpdate, (mergedChunkUpdate2) => `Unknown merged chunk update type: ${mergedChunkUpdate2.type}`);
          }
        }
        for (const moduleId of added.keys()) {
          if (deleted.has(moduleId)) {
            added.delete(moduleId);
            deleted.delete(moduleId);
          }
        }
        for (const [moduleId, entry] of Object.entries(entries)) {
          if (!added.has(moduleId)) {
            modified.set(moduleId, entry);
          }
        }
        return {
          added,
          deleted,
          modified,
          chunksAdded,
          chunksDeleted
        };
      }
      function getAffectedModuleEffects(moduleId) {
        const outdatedModules = /* @__PURE__ */ new Set();
        const queue = [
          {
            moduleId,
            dependencyChain: []
          }
        ];
        let nextItem;
        while (nextItem = queue.shift()) {
          const { moduleId: moduleId2, dependencyChain } = nextItem;
          if (moduleId2 != null) {
            if (outdatedModules.has(moduleId2)) {
              continue;
            }
            outdatedModules.add(moduleId2);
          }
          if (moduleId2 === void 0) {
            return {
              type: "unaccepted",
              dependencyChain
            };
          }
          const module2 = devModuleCache[moduleId2];
          const hotState = moduleHotState.get(module2);
          if (
            // The module is not in the cache. Since this is a "modified" update,
            // it means that the module was never instantiated before.
            !module2 || hotState.selfAccepted && !hotState.selfInvalidated
          ) {
            continue;
          }
          if (hotState.selfDeclined) {
            return {
              type: "self-declined",
              dependencyChain,
              moduleId: moduleId2
            };
          }
          if (runtimeModules.has(moduleId2)) {
            queue.push({
              moduleId: void 0,
              dependencyChain: [
                ...dependencyChain,
                moduleId2
              ]
            });
            continue;
          }
          for (const parentId of module2.parents) {
            const parent = devModuleCache[parentId];
            if (!parent) {
              continue;
            }
            queue.push({
              moduleId: parentId,
              dependencyChain: [
                ...dependencyChain,
                moduleId2
              ]
            });
          }
        }
        return {
          type: "accepted",
          moduleId,
          outdatedModules
        };
      }
      function handleApply(chunkListPath, update) {
        switch (update.type) {
          case "partial": {
            applyUpdate(update.instruction);
            break;
          }
          case "restart": {
            DEV_BACKEND.restart();
            break;
          }
          case "notFound": {
            if (runtimeChunkLists.has(chunkListPath)) {
              DEV_BACKEND.restart();
            } else {
              disposeChunkList(chunkListPath);
            }
            break;
          }
          default:
            throw new Error(`Unknown update type: ${update.type}`);
        }
      }
      function createModuleHot(moduleId, hotData) {
        const hotState = {
          selfAccepted: false,
          selfDeclined: false,
          selfInvalidated: false,
          disposeHandlers: []
        };
        const hot = {
          // TODO(alexkirsz) This is not defined in the HMR API. It was used to
          // decide whether to warn whenever an HMR-disposed module required other
          // modules. We might want to remove it.
          active: true,
          data: hotData ?? {},
          // TODO(alexkirsz) Support full (dep, callback, errorHandler) form.
          accept: (modules, _callback, _errorHandler) => {
            if (modules === void 0) {
              hotState.selfAccepted = true;
            } else if (typeof modules === "function") {
              hotState.selfAccepted = modules;
            } else {
              throw new Error("unsupported `accept` signature");
            }
          },
          decline: (dep) => {
            if (dep === void 0) {
              hotState.selfDeclined = true;
            } else {
              throw new Error("unsupported `decline` signature");
            }
          },
          dispose: (callback) => {
            hotState.disposeHandlers.push(callback);
          },
          addDisposeHandler: (callback) => {
            hotState.disposeHandlers.push(callback);
          },
          removeDisposeHandler: (callback) => {
            const idx = hotState.disposeHandlers.indexOf(callback);
            if (idx >= 0) {
              hotState.disposeHandlers.splice(idx, 1);
            }
          },
          invalidate: () => {
            hotState.selfInvalidated = true;
            queuedInvalidatedModules.add(moduleId);
          },
          // NOTE(alexkirsz) This is part of the management API, which we don't
          // implement, but the Next.js React Refresh runtime uses this to decide
          // whether to schedule an update.
          status: () => "idle",
          // NOTE(alexkirsz) Since we always return "idle" for now, these are no-ops.
          addStatusHandler: (_handler) => {
          },
          removeStatusHandler: (_handler) => {
          },
          // NOTE(jridgewell) Check returns the list of updated modules, but we don't
          // want the webpack code paths to ever update (the turbopack paths handle
          // this already).
          check: () => Promise.resolve(null)
        };
        return {
          hot,
          hotState
        };
      }
      function removeModuleFromChunk(moduleId, chunkPath) {
        const moduleChunks = moduleChunksMap.get(moduleId);
        moduleChunks.delete(chunkPath);
        const chunkModules = chunkModulesMap.get(chunkPath);
        chunkModules.delete(moduleId);
        const noRemainingModules = chunkModules.size === 0;
        if (noRemainingModules) {
          chunkModulesMap.delete(chunkPath);
        }
        const noRemainingChunks = moduleChunks.size === 0;
        if (noRemainingChunks) {
          moduleChunksMap.delete(moduleId);
        }
        return noRemainingChunks;
      }
      function disposeChunkList(chunkListPath) {
        const chunkPaths = chunkListChunksMap.get(chunkListPath);
        if (chunkPaths == null) {
          return false;
        }
        chunkListChunksMap.delete(chunkListPath);
        for (const chunkPath of chunkPaths) {
          const chunkChunkLists = chunkChunkListsMap.get(chunkPath);
          chunkChunkLists.delete(chunkListPath);
          if (chunkChunkLists.size === 0) {
            chunkChunkListsMap.delete(chunkPath);
            disposeChunk(chunkPath);
          }
        }
        const chunkListUrl = getChunkRelativeUrl(chunkListPath);
        DEV_BACKEND.unloadChunk?.(chunkListUrl);
        return true;
      }
      function disposeChunk(chunkPath) {
        const chunkUrl = getChunkRelativeUrl(chunkPath);
        DEV_BACKEND.unloadChunk?.(chunkUrl);
        const chunkModules = chunkModulesMap.get(chunkPath);
        if (chunkModules == null) {
          return false;
        }
        chunkModules.delete(chunkPath);
        for (const moduleId of chunkModules) {
          const moduleChunks = moduleChunksMap.get(moduleId);
          moduleChunks.delete(chunkPath);
          const noRemainingChunks = moduleChunks.size === 0;
          if (noRemainingChunks) {
            moduleChunksMap.delete(moduleId);
            disposeModule(moduleId, "clear");
            availableModules.delete(moduleId);
          }
        }
        return true;
      }
      function registerChunkList(chunkList) {
        const chunkListScript = chunkList.script;
        const chunkListPath = getPathFromScript(chunkListScript);
        BACKEND.registerChunk(chunkListPath);
        globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS.push([
          chunkListPath,
          handleApply.bind(null, chunkListPath)
        ]);
        const chunkPaths = new Set(chunkList.chunks.map(getChunkPath));
        chunkListChunksMap.set(chunkListPath, chunkPaths);
        for (const chunkPath of chunkPaths) {
          let chunkChunkLists = chunkChunkListsMap.get(chunkPath);
          if (!chunkChunkLists) {
            chunkChunkLists = /* @__PURE__ */ new Set([
              chunkListPath
            ]);
            chunkChunkListsMap.set(chunkPath, chunkChunkLists);
          } else {
            chunkChunkLists.add(chunkListPath);
          }
        }
        if (chunkList.source === "entry") {
          markChunkListAsRuntime(chunkListPath);
        }
      }
      globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS ??= [];
      async function externalImport(id) {
        let raw;
        try {
          raw = await import(id);
        } catch (err) {
          throw new Error(`Failed to load external module ${id}: ${err}`);
        }
        if (raw && raw.__esModule && raw.default && "default" in raw.default) {
          return interopEsm(raw.default, createNS(raw), true);
        }
        return raw;
      }
      function externalRequire(id, thunk, esm2 = false) {
        let raw;
        try {
          raw = thunk();
        } catch (err) {
          throw new Error(`Failed to load external module ${id}: ${err}`);
        }
        if (!esm2 || raw.__esModule) {
          return raw;
        }
        return interopEsm(raw, createNS(raw), true);
      }
      externalRequire.resolve = (id, options) => {
        return __require.resolve(id, options);
      };
      let BACKEND;
      function augmentContext(context) {
        const nodejsContext = context;
        nodejsContext.x = externalRequire;
        nodejsContext.y = externalImport;
        return nodejsContext;
      }
      async function loadWebAssembly(source, chunkPath, imports) {
        const module2 = await loadWebAssemblyModule(source, chunkPath);
        return await WebAssembly.instantiate(module2, imports);
      }
      function getFileStem(path3) {
        const fileName = path3.split("/").pop();
        const stem = fileName.split(".").shift();
        if (stem === "") {
          return fileName;
        }
        return stem;
      }
      async function loadWebAssemblyModule(_source, chunkPath) {
        const stem = getFileStem(chunkPath);
        const escaped = stem.replace(/[^a-zA-Z0-9$_]/gi, "_");
        const identifier = `wasm_${escaped}`;
        const module2 = globalThis[identifier];
        if (!module2) {
          throw new Error(`dynamically loading WebAssembly is not supported in this runtime and global \`${identifier}\` was not injected`);
        }
        return module2;
      }
      (() => {
        BACKEND = {
          // The "none" runtime expects all chunks within the same chunk group to be
          // registered before any of them are instantiated.
          // Furthermore, modules must be instantiated synchronously, hence we don't
          // use promises here.
          registerChunk(chunkPath, params) {
            registeredChunks.add(chunkPath);
            instantiateDependentChunks(chunkPath);
            if (params == null) {
              return;
            }
            if (params.otherChunks.length === 0) {
              instantiateRuntimeModules(params.runtimeModuleIds, chunkPath);
            } else {
              registerChunkRunner(chunkPath, params.otherChunks.filter((chunk) => (
                // The none runtime can only handle JS chunks, so we only wait for these
                isJs(getChunkPath(chunk))
              )), params.runtimeModuleIds);
            }
          },
          loadChunk(_chunkUrl, _source) {
            throw new Error("chunk loading is not supported");
          }
        };
        const registeredChunks = /* @__PURE__ */ new Set();
        const runners = /* @__PURE__ */ new Map();
        function registerChunkRunner(chunkPath, otherChunks, runtimeModuleIds) {
          const requiredChunks = /* @__PURE__ */ new Set();
          const runner = {
            runtimeModuleIds,
            chunkPath,
            requiredChunks
          };
          for (const otherChunkData of otherChunks) {
            const otherChunkPath = getChunkPath(otherChunkData);
            if (registeredChunks.has(otherChunkPath)) {
              continue;
            }
            requiredChunks.add(otherChunkPath);
            let runnersForChunk = runners.get(otherChunkPath);
            if (runnersForChunk == null) {
              runnersForChunk = /* @__PURE__ */ new Set();
              runners.set(otherChunkPath, runnersForChunk);
            }
            runnersForChunk.add(runner);
          }
          if (runner.requiredChunks.size === 0) {
            instantiateRuntimeModules(runner.runtimeModuleIds, runner.chunkPath);
          }
        }
        function instantiateDependentChunks(chunkPath) {
          const runnersForChunk = runners.get(chunkPath);
          if (runnersForChunk != null) {
            for (const runner of runnersForChunk) {
              runner.requiredChunks.delete(chunkPath);
              if (runner.requiredChunks.size === 0) {
                instantiateRuntimeModules(runner.runtimeModuleIds, runner.chunkPath);
              }
            }
            runners.delete(chunkPath);
          }
        }
        function instantiateRuntimeModules(runtimeModuleIds, chunkPath) {
          for (const moduleId of runtimeModuleIds) {
            getOrInstantiateRuntimeModule(moduleId, chunkPath);
          }
        }
      })();
      let DEV_BACKEND;
      (() => {
        DEV_BACKEND = {
          restart: () => {
            throw new Error("restart is not supported");
          }
        };
      })();
      function _eval(_) {
        throw new Error("HMR evaluation is not implemented on this backend");
      }
      const chunksToRegister = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: registerChunk };
      chunksToRegister.forEach(registerChunk);
      const chunkListsToRegister = globalThis.TURBOPACK_CHUNK_LISTS || [];
      chunkListsToRegister.forEach(registerChunkList);
      globalThis.TURBOPACK_CHUNK_LISTS = { push: registerChunkList };
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|api|static|favicon.ico).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_e36637b();
    require_root_of_the_server_5e96eddc();
    require_edge_wrapper_386ac0d6();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "randomuser.me", "pathname": "/api/**" }], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Users\\emmanuel onosode\\JulyPort\\BookOne", "experimental": { "nodeMiddleware": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "viewTransition": false, "routerBFCache": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "useCache": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "C:\\Users\\emmanuel onosode\\JulyPort\\BookOne" } };
var BuildId = "ZM42i9mQtJSuE30JnBmJh";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/blogs", "regex": "^/blogs(?:/)?$", "routeKeys": {}, "namedRegex": "^/blogs(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/manifest.webmanifest", "regex": "^/manifest\\.webmanifest(?:/)?$", "routeKeys": {}, "namedRegex": "^/manifest\\.webmanifest(?:/)?$" }, { "page": "/opengraph-image.png", "regex": "^/opengraph\\-image\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/opengraph\\-image\\.png(?:/)?$" }, { "page": "/portfolio", "regex": "^/portfolio(?:/)?$", "routeKeys": {}, "namedRegex": "^/portfolio(?:/)?$" }, { "page": "/pricing", "regex": "^/pricing(?:/)?$", "routeKeys": {}, "namedRegex": "^/pricing(?:/)?$" }, { "page": "/privacy-policy", "regex": "^/privacy\\-policy(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacy\\-policy(?:/)?$" }, { "page": "/robots.txt", "regex": "^/robots\\.txt(?:/)?$", "routeKeys": {}, "namedRegex": "^/robots\\.txt(?:/)?$" }, { "page": "/services", "regex": "^/services(?:/)?$", "routeKeys": {}, "namedRegex": "^/services(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }], "dynamic": [{ "page": "/authors/[slug]", "regex": "^/authors/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/authors/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/blogs/[slug]", "regex": "^/blogs/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/blogs/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/portfolio/[slug]", "regex": "^/portfolio/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/portfolio/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/sitemap.xml": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/manifest.webmanifest": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/manifest+json", "x-next-cache-tags": "_N_T_/layout,_N_T_/manifest.webmanifest/layout,_N_T_/manifest.webmanifest/route,_N_T_/manifest.webmanifest" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/manifest.webmanifest", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/opengraph-image.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/opengraph-image.png/layout,_N_T_/opengraph-image.png/route,_N_T_/opengraph-image.png" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/opengraph-image.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/robots.txt": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/robots.txt", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/privacy-policy": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/privacy-policy", "dataRoute": "/privacy-policy.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/services": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/services", "dataRoute": "/services.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pricing": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/pricing", "dataRoute": "/pricing.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/portfolio": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/portfolio", "dataRoute": "/portfolio.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "ce6d15e9048beb2dc83bd9a9080537d2", "previewModeSigningKey": "f40e26f8cde6f8be1bc11dfb8e0151ffc6bb770ea2657614afc47b53d2b8f437", "previewModeEncryptionKey": "98df59ad8183bd511b3d847fcea032076f50cbb677631214a5ce1d0cd860a1e3" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/_3e36637b._.js", "server/edge/chunks/[root-of-the-server]__5e96eddc._.js", "server/edge/chunks/edge-wrapper_386ac0d6.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|api|static|favicon.ico).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|api|static|favicon.ico).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "development", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "B08hsFsIRsDevNYENTOGnxcjFsCwx5GsjyY/2cr5Mus=", "__NEXT_PREVIEW_MODE_ID": "30606a2dd9fe2f4f005c3722b4a8bc1c", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "15b612ee6e998738f3241c8e059c01d5982cc5dc747add5ceba235c9bb3939d5", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "06d71a70d45d418e7564accd7315fbd587610b35292a94aafdbeb2db5e7f02c8" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/subscribe/route": "/api/subscribe", "/api/contact/route": "/api/contact", "/manifest.webmanifest/route": "/manifest.webmanifest", "/robots.txt/route": "/robots.txt", "/sitemap.xml/route": "/sitemap.xml", "/favicon.ico/route": "/favicon.ico", "/opengraph-image.png/route": "/opengraph-image.png", "/page": "/", "/authors/[slug]/page": "/authors/[slug]", "/blogs/[slug]/page": "/blogs/[slug]", "/blogs/page": "/blogs", "/pricing/page": "/pricing", "/portfolio/page": "/portfolio", "/portfolio/[slug]/page": "/portfolio/[slug]", "/services/page": "/services", "/privacy-policy/page": "/privacy-policy", "/about/page": "/about" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = {};
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const config = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(config?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(config?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(config?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
/*!
* cookie
* Copyright(c) 2012-2014 Roman Shtylman
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
/**
 * @license React
 * react.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
