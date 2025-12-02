(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dialog": (()=>Dialog),
    "DialogClose": (()=>DialogClose),
    "DialogContent": (()=>DialogContent),
    "DialogDescription": (()=>DialogDescription),
    "DialogFooter": (()=>DialogFooter),
    "DialogHeader": (()=>DialogHeader),
    "DialogOverlay": (()=>DialogOverlay),
    "DialogPortal": (()=>DialogPortal),
    "DialogTitle": (()=>DialogTitle),
    "DialogTrigger": (()=>DialogTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this));
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 50,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 48,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 39,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, this));
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 61,
        columnNumber: 3
    }, this);
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 75,
        columnNumber: 3
    }, this);
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 89,
        columnNumber: 3
    }, this));
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 104,
        columnNumber: 3
    }, this));
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Checkbox": (()=>Checkbox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Checkbox = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center text-current"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/checkbox.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/checkbox.tsx",
            lineNumber: 21,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/checkbox.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, this));
_c1 = Checkbox;
Checkbox.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Checkbox$React.forwardRef");
__turbopack_context__.k.register(_c1, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Label)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, this));
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/signature-pad.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SignaturePad": (()=>SignaturePad)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SignaturePad = ({ onSave, isSaving = false })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasConsented, setHasConsented] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getCanvasContext = ()=>{
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return canvas.getContext('2d');
    };
    const resizeCanvas = ()=>{
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (canvas && container) {
            canvas.width = container.offsetWidth;
            canvas.height = 200; // Keep a fixed height or make it responsive too
            const ctx = getCanvasContext();
            if (ctx) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignaturePad.useEffect": ()=>{
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            return ({
                "SignaturePad.useEffect": ()=>window.removeEventListener('resize', resizeCanvas)
            })["SignaturePad.useEffect"];
        }
    }["SignaturePad.useEffect"], []);
    const startDrawing = (event)=>{
        event.preventDefault();
        const ctx = getCanvasContext();
        if (!ctx) return;
        const pos = getMousePos(event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };
    const draw = (event)=>{
        event.preventDefault();
        if (!isDrawing) return;
        const ctx = getCanvasContext();
        if (!ctx) return;
        const pos = getMousePos(event);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };
    const stopDrawing = ()=>{
        const ctx = getCanvasContext();
        if (!ctx) return;
        ctx.closePath();
        setIsDrawing(false);
    };
    const getMousePos = (event)=>{
        const canvas = canvasRef.current;
        if (!canvas) return {
            x: 0,
            y: 0
        };
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in event.nativeEvent) {
            if (event.nativeEvent.touches.length === 0) return {
                x: 0,
                y: 0
            };
            clientX = event.nativeEvent.touches[0].clientX;
            clientY = event.nativeEvent.touches[0].clientY;
        } else {
            clientX = event.nativeEvent.clientX;
            clientY = event.nativeEvent.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };
    const clearPad = ()=>{
        const canvas = canvasRef.current;
        const ctx = getCanvasContext();
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    const handleSave = ()=>{
        const canvas = canvasRef.current;
        if (canvas) {
            const blank = document.createElement('canvas');
            blank.width = canvas.width;
            blank.height = canvas.height;
            if (canvas.toDataURL() === blank.toDataURL()) {
                alert("Por favor, provea una firma.");
                return;
            }
            const dataUrl = canvas.toDataURL('image/png');
            onSave(dataUrl);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4 w-full",
        ref: containerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "border border-gray-300 rounded-md bg-white cursor-crosshair touch-none w-full",
                onMouseDown: startDrawing,
                onMouseMove: draw,
                onMouseUp: stopDrawing,
                onMouseLeave: stopDrawing,
                onTouchStart: startDrawing,
                onTouchMove: draw,
                onTouchEnd: stopDrawing
            }, void 0, false, {
                fileName: "[project]/src/components/ui/signature-pad.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start space-x-3 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                        id: "consent",
                        checked: hasConsented,
                        onCheckedChange: (checked)=>setHasConsented(Boolean(checked)),
                        className: "mt-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "consent",
                        className: "text-xs text-muted-foreground",
                        children: "Al firmar, doy mi consentimiento y estoy de acuerdo con la información relacionada dentro del permiso de trabajo y sus anexos. Adicionalmente, autorizo el tratamiento de mis datos personales conforme a lo establecido en la Ley 1581 de 2012 y su Decreto Reglamentario 1377 de 2013, para las finalidades descritas en la política de tratamiento de datos de la organización."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/signature-pad.tsx",
                lineNumber: 136,
                columnNumber: 8
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: clearPad,
                        disabled: isSaving,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/signature-pad.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            "Limpiar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 148,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSave,
                        disabled: !hasConsented || isSaving,
                        children: [
                            isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/signature-pad.tsx",
                                lineNumber: 153,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/signature-pad.tsx",
                                lineNumber: 153,
                                columnNumber: 75
                            }, this),
                            isSaving ? 'Guardando...' : 'Guardar Firma'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/signature-pad.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/signature-pad.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
};
_s(SignaturePad, "LPi9Xoo6IASWsZjqbiHQMi2+oyg=");
_c = SignaturePad;
var _c;
__turbopack_context__.k.register(_c, "SignaturePad");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/data:27cbe2 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7ebd8ed2289819851ecb3caf96b78e0c9c4572a772":"addSignatureAndNotify"},"src/app/permits/actions.ts",""] */ __turbopack_context__.s({
    "addSignatureAndNotify": (()=>addSignatureAndNotify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var addSignatureAndNotify = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7ebd8ed2289819851ecb3caf96b78e0c9c4572a772", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addSignatureAndNotify"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBhZG1pbkRiLCBpc0FkbWluUmVhZHkgfSBmcm9tICdAL2xpYi9maXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBQZXJtaXQsIEV4dGVybmFsV29ya2VyLCBQZXJtaXRTdGF0dXMsIFBlcm1pdENsb3N1cmUsIEFwcHJvdmFsLCBVc2VyUm9sZSwgQW5leG9BbHR1cmEsIEFuZXhvQ29uZmluYWRvLCBBbmV4b0VuZXJnaWFzLCBBbmV4b0V4Y2F2YWNpb25lcywgQW5leG9JemFqZSwgQW5leG9BVFMsIFBlcm1pdEdlbmVyYWxJbmZvLCBKdXN0aWZpY2FjaW9uQVRTLCBWYWxpZGFjaW9uRGlhcmlhLCBVc2VyLCBOb3RpZmljYXRpb24gfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUsIFVwZGF0ZURhdGEsIFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24gfSBmcm9tICdAL2xpYi9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IGdldEVtYWlsRm9yVXNlciwgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsIH0gZnJvbSAnQC9saWIvZW1haWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG4vLyAtLS0gRnVuY2lvbmVzIEF1eGlsaWFyZXMgcGFyYSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3QgZ2V0SW52b2x2ZWRVc2VycyA9IGFzeW5jIChwZXJtaXQ6IFBlcm1pdCk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgY29uc3QgdXNlcklkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIC8vIDEuIENyZWFkb3IgZGVsIHBlcm1pc29cbiAgaWYgKHBlcm1pdC5jcmVhdGVkQnkpIHtcbiAgICB1c2VySWRzLmFkZChwZXJtaXQuY3JlYXRlZEJ5KTtcbiAgfVxuXG4gIC8vIDIuIFVzdWFyaW9zIHF1ZSBoYW4gZmlybWFkb1xuICBPYmplY3QudmFsdWVzKHBlcm1pdC5hcHByb3ZhbHMgfHwge30pLmZvckVhY2goYXBwcm92YWwgPT4ge1xuICAgIGlmIChhcHByb3ZhbCAmJiBhcHByb3ZhbC51c2VySWQpIHtcbiAgICAgIHVzZXJJZHMuYWRkKGFwcHJvdmFsLnVzZXJJZCk7XG4gICAgfVxuICB9KTtcblxuICAvLyAzLiBSb2xlcyBhZG1pbmlzdHJhdGl2b3MgbyBkZSBzdXBlcnZpc2nDs24gcXVlIGRlYmVyw61hbiBzZXIgbm90aWZpY2Fkb3NcbiAgY29uc3QgYWRtaW5zUXVlcnkgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3VzZXJzJykud2hlcmUoJ3JvbGUnLCAnaW4nLCBbJ2FkbWluJywgJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCddKS5nZXQoKTtcbiAgYWRtaW5zUXVlcnkuZm9yRWFjaChkb2MgPT4gdXNlcklkcy5hZGQoZG9jLmlkKSk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odXNlcklkcyk7XG59O1xuXG5jb25zdCBjcmVhdGVOb3RpZmljYXRpb24gPSBhc3luYyAoXG4gIHVzZXJJZDogc3RyaW5nLFxuICBwZXJtaXQ6IFBlcm1pdCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICB0eXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSxcbiAgdHJpZ2dlcmVkQnk6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsIH1cbikgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb246IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnPiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB0cmlnZ2VyZWRCeSxcbiAgfTtcbiAgYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdub3RpZmljYXRpb25zJykuYWRkKG5vdGlmaWNhdGlvbiBhcyBhbnkpO1xuICBcbiAgLy8gRW52aWFyIGNvcnJlbyBlbGVjdHLDs25pY29cbiAgY29uc3QgdXNlckVtYWlsID0gYXdhaXQgZ2V0RW1haWxGb3JVc2VyKHVzZXJJZCk7XG4gIGlmICh1c2VyRW1haWwpIHtcbiAgICBhd2FpdCBzZW5kUGVybWl0VXBkYXRlRW1haWwoe1xuICAgICAgdG86IHVzZXJFbWFpbCxcbiAgICAgIHN1YmplY3Q6IGBBY3R1YWxpemFjacOzbiBlbiBQZXJtaXNvIFNHVEM6ICR7cGVybWl0Lm51bWJlciB8fCBwZXJtaXQuaWR9YCxcbiAgICAgIGh0bWw6IGA8cD4ke21lc3NhZ2V9PC9wPjxwPlB1ZWRlcyB2ZXIgbG9zIGRldGFsbGVzIGRlbCBwZXJtaXNvIGhhY2llbmRvIGNsaWMgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L3Blcm1pdHMvJHtwZXJtaXQuaWR9XCI+YXF1w608L2E+LjwvcD5gXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIC0tLSBGaW4gZGUgRnVuY2lvbmVzIGRlIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhcyc6ICdUcmFiYWpvIGVuIEFsdHVyYXMnLFxuICAnY29uZmluYWRvJzogJ0VzcGFjaW9zIENvbmZpbmFkb3MnLFxuICAnZW5lcmdpYSc6ICdDb250cm9sIGRlIEVuZXJnw61hcycsXG4gICdpemFqZSc6ICdJemFqZSBkZSBDYXJnYXMnLFxuICAnZXhjYXZhY2lvbic6ICdFeGNhdmFjaW9uZXMnLFxuICAnZ2VuZXJhbCc6ICdUcmFiYWpvIEdlbmVyYWwnXG59O1xuXG5jb25zdCBnZXRXb3JrVHlwZXNTdHJpbmcgPSAocGVybWl0OiBQYXJ0aWFsPFBlcm1pdD4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWxlY3RlZFR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAocGVybWl0LnRyYWJham9BbHR1cmFzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ1RyYWJham8gZW4gQWx0dXJhcycpO1xuICBpZiAocGVybWl0LmVzcGFjaW9zQ29uZmluYWRvcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFc3BhY2lvcyBDb25maW5hZG9zJyk7XG4gIGlmIChwZXJtaXQuY29udHJvbEVuZXJnaWEpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnRmlybWEgU1NUJyxcbn07XG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcicgfCAnYXBwcm92YWxzJyB8ICdjbG9zdXJlJz4gJiB7XG4gIHVzZXJJZDogc3RyaW5nO1xuICB1c2VyRGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJFbWFpbDogc3RyaW5nIHwgbnVsbDtcbiAgdXNlclBob3RvVVJMOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBlcm1pdChkYXRhOiBQZXJtaXRDcmVhdGVEYXRhKSB7XG4gIGlmICghZGF0YS51c2VySWQpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVc2VyIG5vdCBhdXRoZW50aWNhdGVkJyB9O1xuICB9XG4gICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnPiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gICAgdHJhYmFqb0FsdHVyYXM6IGRhdGEudHJhYmFqb0FsdHVyYXMgfHwgZmFsc2UsXG4gICAgaXNTU1RTaWduYXR1cmVSZXF1aXJlZDogZGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkIHx8IGZhbHNlLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICB0cmFiYWpvQWx0dXJhczogZGF0YS50cmFiYWpvQWx0dXJhcyB8fCBmYWxzZSxcbiAgICBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkOiBkYXRhLmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQgfHwgZmFsc2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoVGltZXN0YW1wID0geyAuLi5wZXJtaXRQYXlsb2FkLCBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwYXlsb2FkV2l0aFRpbWVzdGFtcCBhcyBhbnkpO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBpc1VwZGF0ZTogZmFsc2UgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIFtBY3Rpb25dIEVycm9yIGFsIGd1YXJkYXIgYm9ycmFkb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3Qgc2F2ZSBkcmFmdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nIFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNpZ25hdHVyZUFuZE5vdGlmeShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIHJvbGU6ICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcycgfCAnY2llcnJlX2F1dG9yaWRhZCcgfCAnY2llcnJlX3Jlc3BvbnNhYmxlJyB8ICdjYW5jZWxhY2lvbicsIFxuICBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLFxuICBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcsXG4gIHVzZXI6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsLCByb2xlPzogVXNlclJvbGUsIGVtcHJlc2E/OiBzdHJpbmcgfSxcbiAgY29tbWVudHM/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXVzZXIgfHwgIXVzZXIudWlkIHx8ICF1c2VyLnJvbGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXREb2NCZWZvcmUuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0QmVmb3JlRGF0YSA9IHBlcm1pdERvY0JlZm9yZS5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHt9O1xuXG4gICAgICAgIC8vIEzDs2dpY2EgcGFyYSBtYW5lamFyIGZpcm1hcyBkZSBjaWVycmUgeSBjYW5jZWxhY2nDs25cbiAgICAgICAgaWYgKHJvbGUuc3RhcnRzV2l0aCgnY2llcnJlXycpIHx8IHJvbGUgPT09ICdjYW5jZWxhY2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVSb2xlID0gcm9sZSA9PT0gJ2NpZXJyZV9hdXRvcmlkYWQnID8gJ2F1dG9yaWRhZCcgOiAocm9sZSA9PT0gJ2NpZXJyZV9yZXNwb25zYWJsZScgPyAncmVzcG9uc2FibGUnIDogJ2NhbmNlbGFkb1BvcicpO1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVBhdGggPSBgY2xvc3VyZS4ke2Nsb3N1cmVSb2xlfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ2xvc3VyZURhdGEgPSAocGVybWl0QmVmb3JlRGF0YS5jbG9zdXJlIGFzIGFueSk/LltjbG9zdXJlUm9sZV0gfHwge307XG5cbiAgICAgICAgICAgIHVwZGF0ZURhdGFbY2xvc3VyZVBhdGggYXMga2V5b2YgVXBkYXRlRGF0YTxQZXJtaXQ+XSA9IHtcbiAgICAgICAgICAgICAgICAuLi5leGlzdGluZ0Nsb3N1cmVEYXRhLFxuICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICBmZWNoYTogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5yYXpvbkNhbmNlbGFjaW9uJ10gPSBjb21tZW50cyB8fCAnTm8gZXNwZWNpZmljYWRvJztcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmNhbmNlbGFkbyddID0gJ3NpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g4pyFIFZBTElEQUNJw5NOIERFIFBFUk1JU09TIEFOVEVTIERFIEZJUk1BUlxuICAgICAgICAgICAgY29uc3QgY2FuU2lnbiA9IGF3YWl0IHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihwZXJtaXRJZCwgcm9sZSwgdXNlcik7XG4gICAgICAgICAgICBpZiAoIWNhblNpZ24uYWxsb3dlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogY2FuU2lnbi5yZWFzb24gfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxEYXRhOiBQYXJ0aWFsPEFwcHJvdmFsPiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHJvYmFkbycsXG4gICAgICAgICAgICAgICAgZmlybWFBcGVydHVyYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIudWlkLFxuICAgICAgICAgICAgICAgIHNpZ25lZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIGFueSxcbiAgICAgICAgICAgICAgICB1c2VyUm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIHVzZXJFbXByZXNhOiB1c2VyLmVtcHJlc2EgfHwgJ04vQScsXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbW1lbnRzIHx8ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2BhcHByb3ZhbHMuJHtyb2xlfWBdID0gYXBwcm92YWxEYXRhO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyDinIUgTMOTR0lDQSBERSBGSVJNQVMgU0VHw5pOIEVMIFJPTFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBcbiAgICAgICAgICAgICAgICAgICAgZGlhOiAxLCBcbiAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB1c2VyLmRpc3BsYXlOYW1lIHx8ICcnLCBcbiAgICAgICAgICAgICAgICAgICAgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIFxuICAgICAgICAgICAgICAgICAgICBmZWNoYTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g4pyFIFNPTElDSVRBTlRFIEZJUk1BOiBDYW1iaWEgZGUgQm9ycmFkb3IgYSBQZW5kaWVudGUgZGUgUmV2aXNpw7NuXG4gICAgICAgICAgICAgICAgaWYgKHJvbGUgPT09ICdzb2xpY2l0YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGEuc3RhdHVzID09PSAnYm9ycmFkb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke3Blcm1pdElkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydudW1iZXInXSA9IHBlcm1pdE51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ3BlbmRpZW50ZV9yZXZpc2lvbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYWNpw7NuIGRpYXJpYSBpbmljaWFsIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VmFsaWRhdGlvbnNbMF0/LmZpcm1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhW2Ake2FuZXhvfS52YWxpZGFjaW9uLnJlc3BvbnNhYmxlYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIOKchSBBVVRPUklaQU5URSBGSVJNQTogQWdyZWdhIHZhbGlkYWNpw7NuIGRpYXJpYSBkZSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09ICdhdXRvcml6YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0E6IMK/VG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXM/XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkUGVybWl0RGF0YSA9IHsgXG4gICAgICAgICAgICAgICAgLi4ucGVybWl0QmVmb3JlRGF0YSwgXG4gICAgICAgICAgICAgICAgYXBwcm92YWxzOiB7IC4uLnBlcm1pdEJlZm9yZURhdGEuYXBwcm92YWxzLCBbcm9sZV06IGFwcHJvdmFsRGF0YSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXdhaXQgY2hlY2tBbGxSZXF1aXJlZFNpZ25hdHVyZXNDb21wbGV0ZSh1cGRhdGVkUGVybWl0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyDwn5qAIENBTUJJTyBBVVRPTcOBVElDTyBERSBQRU5ESUVOVEVfUkVWSVNJT04g4oaSIEVOX0VKRUNVQ0lPTlxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ3BlbmRpZW50ZV9yZXZpc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlLnJlcGxhY2UoJ18nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGZpcm1hZG8gZWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGNvbW8gJHtzaWduYXR1cmVSb2xlTmFtZX0uYDtcbiAgICAgICAgY29uc3QgaW52b2x2ZWRVc2VycyA9IGF3YWl0IGdldEludm9sdmVkVXNlcnModXBkYXRlZFBlcm1pdERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgIGlmICh1aWQgIT09IHVzZXIudWlkKSB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3NpZ25hdHVyZScsIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE5PVElGSUNBQ0nDk04gRVNQRUNJQUwgU0kgRUwgUEVSTUlTTyBQQVPDkyBBVVRPTcOBVElDQU1FTlRFIEEgRU5fRUpFQ1VDSU9OXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvbk1lc3NhZ2UgPSBgRWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGhhIGNvbXBsZXRhZG8gdG9kYXMgbGFzIGFwcm9iYWNpb25lcyByZXF1ZXJpZGFzIHkgYWhvcmEgZXN0w6EgRU4gRUpFQ1VDScOTTi5gO1xuICAgICAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgZXhlY3V0aW9uTWVzc2FnZSwgJ2FwcHJvdmFsJywgdXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vdGlmaWNhY2nDs24gV2hhdHNBcHBcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgICAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgICAgICBjb25zdCB3aGF0c2FwcE1zZyA9IGAqwqFQRVJNSVNPIEVOIEVKRUNVQ0nDk04hKiDinIVcblxu8J+ThCAqTsO6bWVybzoqICR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfVxu8J+TjSAqw4FyZWE6KiAke3Blcm1pdEJlZm9yZURhdGEuZ2VuZXJhbEluZm8/LmFyZWFFc3BlY2lmaWNhIHx8ICdOL0EnfVxu8J+boO+4jyAqVGlwbzoqICR7Z2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdEJlZm9yZURhdGEpfVxuXG7inIUgVG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGhhbiBzaWRvIGNvbXBsZXRhZGFzLlxuRWwgcGVybWlzbyBlc3TDoSBhaG9yYSBFTiBFSkVDVUNJw5NOLlxuXG5WZXIgZGV0YWxsZXM6ICR7cGVybWl0VXJsfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyDinIUgRlVOQ0nDk04gQ09SUkVHSURBOiBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQWxsUmVxdWlyZWRTaWduYXR1cmVzQ29tcGxldGUoXG4gIHBlcm1pdERhdGE6IFBlcm1pdFxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBhcHByb3ZhbHMgfSA9IHBlcm1pdERhdGE7XG4gICAgXG4gICAgLy8gRmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIFNJRU1QUkUgcmVxdWVyaWRhXG4gICAgaWYgKGFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIEZpcm1hIGRlbCBhdXRvcml6YW50ZSBlcyBTSUVNUFJFIHJlcXVlcmlkYVxuICAgIGlmIChhcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgdHJhYmFqb3MgZW4gYWx0dXJhcywgcmVxdWllcmUgZmlybWEgZGVsIGNvb3JkaW5hZG9yXG4gICAgaWYgKHBlcm1pdERhdGEudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0RGF0YS5zZWxlY3RlZFdvcmtUeXBlcz8uYWx0dXJhcykge1xuICAgICAgICBpZiAoYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgIGlmIChwZXJtaXREYXRhLmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/Lm1hbnRlbmltaWVudG8/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICBpZiAocGVybWl0RGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/LmxpZGVyX3NzdD8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgdHJhbnNpY2lvbmVzIGRlIGVzdGFkb1xuZnVuY3Rpb24gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24oY3VycmVudFN0YXR1czogUGVybWl0U3RhdHVzLCB0YXJnZXRTdGF0dXM6IFBlcm1pdFN0YXR1cywgdXNlclJvbGU6IFVzZXJSb2xlKTogeyBhbGxvd2VkOiBib29sZWFuLCByZWFzb24/OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgYWxsb3dlZFRyYW5zaXRpb25zOiBQYXJ0aWFsPFJlY29yZDxQZXJtaXRTdGF0dXMsIFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgVXNlclJvbGVbXT4+Pj4gPSB7XG4gICAgICAgICdib3JyYWRvcic6IHtcbiAgICAgICAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiBbJ3NvbGljaXRhbnRlJywgJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2F1dG9yaXphbnRlJywgJ2FkbWluJ10sXG4gICAgICAgICAgICAncmVjaGF6YWRvJzogWydhdXRvcml6YW50ZScsICdsaWRlcl9zc3QnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnZW5fZWplY3VjaW9uJzoge1xuICAgICAgICAgICAgJ3N1c3BlbmRpZG8nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2F1dG9yaXphbnRlJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3N1c3BlbmRpZG8nOiB7XG4gICAgICAgICAgICAnZW5fZWplY3VjaW9uJzogWydsaWRlcl9zc3QnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdjZXJyYWRvJzogWydsaWRlcl90YXJlYScsICdhdXRvcml6YW50ZScsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1hbnRlbmVyIGNvbXBhdGliaWxpZGFkIGNvbiBwZXJtaXNvcyBhbnRpZ3VvcyBxdWUgdGVuZ2FuIGVzdGFkbyBcImFwcm9iYWRvXCJcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGFsbG93ZWRSb2xlcyA9IGFsbG93ZWRUcmFuc2l0aW9uc1tjdXJyZW50U3RhdHVzXT8uW3RhcmdldFN0YXR1c107XG4gICAgaWYgKCFhbGxvd2VkUm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFRyYW5zaWNpw7NuIGRlICcke2N1cnJlbnRTdGF0dXN9JyBhICcke3RhcmdldFN0YXR1c30nIG5vIGVzdMOhIHBlcm1pdGlkYS5gIH07XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkUm9sZXMuaW5jbHVkZXModXNlclJvbGUpICYmIHVzZXJSb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBUdSByb2wgKCR7dXNlclJvbGV9KSBubyB0aWVuZSBwZXJtaXNvcyBwYXJhIGNhbWJpYXIgZWwgZXN0YWRvIGEgJyR7dGFyZ2V0U3RhdHVzfScuYCB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlIH0sXG4gIHJlYXNvbj86IHN0cmluZ1xuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhY3VycmVudFVzZXIudWlkIHx8ICFjdXJyZW50VXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgbyB1c3VhcmlvIHNpbiByb2wuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIFZhbGlkYXIgdHJhbnNpY2nDs24gZGUgZXN0YWRvXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihwZXJtaXREYXRhLnN0YXR1cywgc3RhdHVzLCBjdXJyZW50VXNlci5yb2xlKTtcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uLmFsbG93ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdHJhbnNpdGlvbi5yZWFzb24gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgLy8g4pyFIEd1YXJkYXIgcmF6w7NuIGRlIHJlY2hhem9cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE1hcmNhciBmZWNoYSBkZSBjaWVycmVcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmZlY2hhQ2llcnJlJ10gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS50ZXJtaW5hZG8nXSA9ICdzaSc7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHVwZGF0ZURhdGEpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IC4uLnBlcm1pdERhdGEsIC4uLnVwZGF0ZURhdGEsIGlkOiBwZXJtaXRJZCB9IGFzIFBlcm1pdDtcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIHB1ZXN0byBFTiBFSkVDVUNJw5NOIG1hbnVhbG1lbnRlLmA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdyZWplY3Rpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVjaGF6YWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgICAgICBpZiAocmVhc29uKSBtZXNzYWdlICs9IGAgTW90aXZvOiAke3JlYXNvbn1gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25UeXBlID0gJ2NhbmNlbGxhdGlvbic7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjZXJyYWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKHVwZGF0ZWRQZXJtaXREYXRhKTtcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgIGlmICh1aWQgIT09IGN1cnJlbnRVc2VyLnVpZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCBub3RpZmljYXRpb25UeXBlLCB0cmlnZ2VyZWRCeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1RDKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJyAmJiByZWFzb24pIHtcbiAgICAgICAgICBtZXNzYWdlQm9keSArPSBgXFxuXFxuKk1vdGl2byBkZWwgcmVjaGF6bzoqICR7cmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgICAgIFxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciB1cGRhdGluZyBwZXJtaXQgc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3QgdXBkYXRlIHBlcm1pdCBzdGF0dXMuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSBwZXJtaXNvcyBkZSBmaXJtYSBjb24gb3JkZW4gamVyw6FycXVpY29cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gRGViZSBoYWJlciB0cmFiYWpvIGVuIGFsdHVyYXNcbiAgICAgICAgICAgIGlmICghcGVybWl0LnRyYWJham9BbHR1cmFzICYmICFwZXJtaXQuc2VsZWN0ZWRXb3JrVHlwZXM/LmFsdHVyYXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRXN0YSBmaXJtYSBzb2xvIGFwbGljYSBwYXJhIHRyYWJham9zIGVuIGFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWFcbiAgICAgICAgICAgIGlmIChwZXJtaXQuY3JlYXRlZEJ5ICE9PSBjdXJyZW50VXNlci51aWQgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTb2xvIGVsIGNyZWFkb3IgZGVsIHBlcm1pc28gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnc29saWNpdGFudGUnOlxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBmaXJtYXIgY29tbyBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDinIUgU2kgaGF5IGFuZXhvIGRlIGFsdHVyYXMsIHZlcmlmaWNhciBmaXJtYSBkZWwgY29vcmRpbmFkb3IgcHJpbWVyb1xuICAgICAgICAgICAgaWYgKChwZXJtaXQudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzKSAmJiBcbiAgICAgICAgICAgICAgICBwZXJtaXQuYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgQ29vcmRpbmFkb3IgZGUgVHJhYmFqb3MgZW4gQWx0dXJhcy4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdhdXRvcml6YW50ZSc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2F1dG9yaXphbnRlJyAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1JvbCBkZSBhdXRvcml6YW50ZSByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NlIHJlcXVpZXJlIHByaW1lcm8gbGEgZmlybWEgZGVsIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ2xpZGVyX3NzdCc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2xpZGVyX3NzdCcgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTMOtZGVyIFNTVCByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIGVzIHJlcXVlcmlkYSBwYXJhIGVzdGUgcGVybWlzby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGVybWl0LmFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTZSByZXF1aWVyZSBwcmltZXJvIGxhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdtYW50ZW5pbWllbnRvJzpcbiAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ21hbnRlbmltaWVudG8nICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIE1hbnRlbmltaWVudG8gcmVxdWVyaWRvIHBhcmEgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBlcm1pdC5jb250cm9sRW5lcmdpYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdGaXJtYSBkZSBNYW50ZW5pbWllbnRvIHNvbG8gYXBsaWNhIGN1YW5kbyBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgYXV0b3JpemFudGUuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZERhaWx5VmFsaWRhdGlvblNpZ25hdHVyZShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIGFuZXhvTmFtZTogc3RyaW5nLCBcbiAgdmFsaWRhdGlvblR5cGU6ICdhdXRvcmlkYWQnIHwgJ3Jlc3BvbnNhYmxlJywgXG4gIGluZGV4OiBudW1iZXIsIFxuICBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhLCBcbiAgdXNlcjogVXNlclxuKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPCAwIHx8ICFkYXRhIHx8ICF1c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcy4nIH07XG4gIH1cblxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgfVxuICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXRTbmFwLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIGVqZWN1Y2nDs24gcGFyYSB2YWxpZGFjaW9uZXMgZGlhcmlhc1xuICAgIGlmICghWydlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIEVOIEVKRUNVQ0nDk04gbyBTVVNQRU5ESURPUy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgYW5leG9EYXRhID0gKHBlcm1pdERhdGEgYXMgYW55KVthbmV4b05hbWVdO1xuICAgIGlmICghYW5leG9EYXRhKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXhpc3RlIGVuIGVsIHBlcm1pc28uYCB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBhbmV4b1VwZGF0ZTogYW55ID0geyAuLi5hbmV4b0RhdGEgfTtcbiAgICBpZiAoIWFuZXhvVXBkYXRlLnZhbGlkYWNpb24pIHtcbiAgICAgICAgYW5leG9VcGRhdGUudmFsaWRhY2lvbiA9IHsgYXV0b3JpZGFkOiBbXSwgcmVzcG9uc2FibGU6IFtdIH07XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvVXBkYXRlLnZhbGlkYWNpb25bdmFsaWRhdGlvblR5cGVdIGFzIFZhbGlkYWNpb25EaWFyaWFbXSkgfHwgW107XG4gICAgXG4gICAgd2hpbGUgKHZhbGlkYXRpb25BcnJheS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdmFsaWRhdGlvbkFycmF5LnB1c2goeyBkaWE6IHZhbGlkYXRpb25BcnJheS5sZW5ndGggKyAxLCBub21icmU6ICcnLCBmZWNoYTogJycsIGZpcm1hOiAnJyB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0aW9uQXJyYXlbaW5kZXhdID0gZGF0YTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVQYXRoID0gYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YDtcbiAgICBcbiAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHtcbiAgICAgIFt1cGRhdGVQYXRoXTogdmFsaWRhdGlvbkFycmF5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB7IHVpZDogdXNlci51aWQsIGRpc3BsYXlOYW1lOiB1c2VyLmRpc3BsYXlOYW1lIHx8IG51bGwgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgY29uc3Qgd2hhdHNhcHBNZXNzYWdlID0gYCpWYWxpZGFjacOzbiBEaWFyaWEgLSBTR1RDKiDinI3vuI9cblNlIGhhIHJlZ2lzdHJhZG8gdW5hIG51ZXZhIGZpcm1hIGRlIHZhbGlkYWNpw7NuIGRpYXJpYS5cblxu8J+ThCAqUGVybWlzbzoqICR7ZnVsbFBlcm1pdERhdGEubnVtYmVyIHx8ICdOL0EnfVxu8J+Xk++4jyAqRMOtYToqICR7ZGF5fVxu8J+RpCAqRmlybWFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inIUgKlJvbDoqICR7dmFsaWRhdGlvblJvbGVOYW1lfVxu8J+TiyAqQW5leG86KiAke2FuZXhvRGlzcGxheU5hbWV9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1lc3NhZ2UpO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIENPUlJFQ0NJw5NOOiBWYWxpZGFjacOzbiBkZSBlc3RhZG8gY29ycmVnaWRhIHBhcmEgZmlybWEgZGUgYXBlcnR1cmFcbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyAmJiAhWydwZW5kaWVudGVfcmV2aXNpb24nLCAnYXByb2JhZG8nLCAnZW5fZWplY3VjaW9uJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBjdWFuZG8gZWwgcGVybWlzbyBlc3TDoSBwZW5kaWVudGUsIGFwcm9iYWRvIG8gZW4gZWplY3VjacOzbi4nIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUNpZXJyZScgJiYgIVsnZW5fZWplY3VjaW9uJywgJ3N1c3BlbmRpZG8nXS5pbmNsdWRlcyhwZXJtaXREYXRhLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1NvbG8gc2UgcHVlZGUgZmlybWFyIGNpZXJyZSBlbiBwZXJtaXNvcyBFTiBFSkVDVUNJw5NOIG8gU1VTUEVORElET1MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVNBcVFzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/components/SignatureCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SignatureCard": (()=>SignatureCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$27cbe2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/permits/data:27cbe2 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-pen-line.js [app-client] (ecmascript) <export default as FileSignature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/es.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
const parseFirestoreDate = (dateValue)=>{
    if (!dateValue) return null;
    // Handle Firestore Timestamp objects
    if (typeof dateValue.toDate === 'function') {
        return dateValue.toDate();
    }
    // Handle ISO strings
    if (typeof dateValue === 'string') {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    // Handle native Date objects
    if (dateValue instanceof Date) {
        return dateValue;
    }
    return null;
};
function SignatureCard({ title, approval, canSign, permitId, signatureRole, disabled = false, tooltip }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSaveSignature = async (signature)=>{
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Debe iniciar sesión para firmar.'
            });
            return;
        }
        setIsSaving(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$27cbe2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permitId, signatureRole, 'firmaApertura', signature, user);
            if (result.success) {
                toast({
                    title: 'Firma Guardada',
                    description: 'Su firma ha sido registrada exitosamente.'
                });
                setIsModalOpen(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al Firmar',
                description: error.message
            });
        } finally{
            setIsSaving(false);
        }
    };
    const status = approval?.status || 'pendiente';
    const signatureData = approval?.firmaApertura;
    const signedAt = parseFirestoreDate(approval?.signedAt);
    const userName = approval?.userName || 'N/A';
    const userEmpresa = approval?.userEmpresa || 'N/A';
    const renderStatusIcon = ()=>{
        switch(status){
            case 'aprobado':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                    className: "h-6 w-6 text-green-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 100,
                    columnNumber: 16
                }, this);
            case 'pendiente':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "h-6 w-6 text-yellow-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 102,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "h-6 w-6 text-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 104,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: status === 'aprobado' ? 'bg-green-50/50 border-green-200' : 'bg-background',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base font-bold",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    className: "text-xs",
                                    children: [
                                        "Estado: ",
                                        status
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        renderStatusIcon()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: status === 'aprobado' && signatureData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-48 h-24 bg-white border rounded-md overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: signatureData,
                                alt: "Firma",
                                layout: "fill",
                                objectFit: "contain"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                lineNumber: 123,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Firmado por:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                            lineNumber: 126,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        userName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Empresa:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                            lineNumber: 127,
                                            columnNumber: 18
                                        }, this),
                                        " ",
                                        userEmpresa
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Fecha:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        ' ',
                                        signedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(signedAt, "dd/MM/yyyy HH:mm", {
                                            locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["es"]
                                        }) : 'N/A'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>setIsModalOpen(true),
                                        disabled: !canSign || disabled,
                                        className: "w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__["FileSignature"], {
                                                className: "mr-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                                lineNumber: 144,
                                                columnNumber: 29
                                            }, this),
                                            "Firmar como ",
                                            signatureRole.replace('_', ' ')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 138,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, this),
                            (!canSign || disabled) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: tooltip || 'No puede firmar en este momento.'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                lineNumber: 150,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 135,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isModalOpen,
                onOpenChange: setIsModalOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Realizar Firma Digital"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature,
                            isSaving: isSaving
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/permits/[id]/components/SignatureCard.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(SignatureCard, "LlT5XIjtOrLDM3vUOBHfSZ4YtLU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = SignatureCard;
var _c;
__turbopack_context__.k.register(_c, "SignatureCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/components/StatusBadge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StatusBadge": (()=>StatusBadge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
'use client';
;
;
const statusConfig = {
    borrador: {
        text: 'Borrador',
        color: 'bg-gray-100 text-gray-800'
    },
    pendiente_revision: {
        text: 'Pendiente de Revisión',
        color: 'bg-yellow-100 text-yellow-800'
    },
    aprobado: {
        text: 'Aprobado',
        color: 'bg-green-100 text-green-800'
    },
    en_ejecucion: {
        text: 'En Ejecución',
        color: 'bg-purple-100 text-purple-800'
    },
    suspendido: {
        text: 'Suspendido',
        color: 'bg-orange-100 text-orange-800'
    },
    cerrado: {
        text: 'Cerrado',
        color: 'bg-blue-100 text-blue-800'
    },
    rechazado: {
        text: 'Rechazado',
        color: 'bg-red-100 text-red-800'
    }
};
function StatusBadge({ status }) {
    const config = statusConfig[status] || statusConfig.borrador;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        className: config.color,
        children: config.text
    }, void 0, false, {
        fileName: "[project]/src/app/permits/[id]/components/StatusBadge.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/data:6b2f05 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"78f600ac388fbb2f35df2ebfd5dcb632d48604a20b":"updatePermitStatus"},"src/app/permits/actions.ts",""] */ __turbopack_context__.s({
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var updatePermitStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("78f600ac388fbb2f35df2ebfd5dcb632d48604a20b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updatePermitStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBhZG1pbkRiLCBpc0FkbWluUmVhZHkgfSBmcm9tICdAL2xpYi9maXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBQZXJtaXQsIEV4dGVybmFsV29ya2VyLCBQZXJtaXRTdGF0dXMsIFBlcm1pdENsb3N1cmUsIEFwcHJvdmFsLCBVc2VyUm9sZSwgQW5leG9BbHR1cmEsIEFuZXhvQ29uZmluYWRvLCBBbmV4b0VuZXJnaWFzLCBBbmV4b0V4Y2F2YWNpb25lcywgQW5leG9JemFqZSwgQW5leG9BVFMsIFBlcm1pdEdlbmVyYWxJbmZvLCBKdXN0aWZpY2FjaW9uQVRTLCBWYWxpZGFjaW9uRGlhcmlhLCBVc2VyLCBOb3RpZmljYXRpb24gfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUsIFVwZGF0ZURhdGEsIFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24gfSBmcm9tICdAL2xpYi9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IGdldEVtYWlsRm9yVXNlciwgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsIH0gZnJvbSAnQC9saWIvZW1haWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG4vLyAtLS0gRnVuY2lvbmVzIEF1eGlsaWFyZXMgcGFyYSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3QgZ2V0SW52b2x2ZWRVc2VycyA9IGFzeW5jIChwZXJtaXQ6IFBlcm1pdCk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgY29uc3QgdXNlcklkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIC8vIDEuIENyZWFkb3IgZGVsIHBlcm1pc29cbiAgaWYgKHBlcm1pdC5jcmVhdGVkQnkpIHtcbiAgICB1c2VySWRzLmFkZChwZXJtaXQuY3JlYXRlZEJ5KTtcbiAgfVxuXG4gIC8vIDIuIFVzdWFyaW9zIHF1ZSBoYW4gZmlybWFkb1xuICBPYmplY3QudmFsdWVzKHBlcm1pdC5hcHByb3ZhbHMgfHwge30pLmZvckVhY2goYXBwcm92YWwgPT4ge1xuICAgIGlmIChhcHByb3ZhbCAmJiBhcHByb3ZhbC51c2VySWQpIHtcbiAgICAgIHVzZXJJZHMuYWRkKGFwcHJvdmFsLnVzZXJJZCk7XG4gICAgfVxuICB9KTtcblxuICAvLyAzLiBSb2xlcyBhZG1pbmlzdHJhdGl2b3MgbyBkZSBzdXBlcnZpc2nDs24gcXVlIGRlYmVyw61hbiBzZXIgbm90aWZpY2Fkb3NcbiAgY29uc3QgYWRtaW5zUXVlcnkgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3VzZXJzJykud2hlcmUoJ3JvbGUnLCAnaW4nLCBbJ2FkbWluJywgJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCddKS5nZXQoKTtcbiAgYWRtaW5zUXVlcnkuZm9yRWFjaChkb2MgPT4gdXNlcklkcy5hZGQoZG9jLmlkKSk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odXNlcklkcyk7XG59O1xuXG5jb25zdCBjcmVhdGVOb3RpZmljYXRpb24gPSBhc3luYyAoXG4gIHVzZXJJZDogc3RyaW5nLFxuICBwZXJtaXQ6IFBlcm1pdCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICB0eXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSxcbiAgdHJpZ2dlcmVkQnk6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsIH1cbikgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb246IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnPiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB0cmlnZ2VyZWRCeSxcbiAgfTtcbiAgYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdub3RpZmljYXRpb25zJykuYWRkKG5vdGlmaWNhdGlvbiBhcyBhbnkpO1xuICBcbiAgLy8gRW52aWFyIGNvcnJlbyBlbGVjdHLDs25pY29cbiAgY29uc3QgdXNlckVtYWlsID0gYXdhaXQgZ2V0RW1haWxGb3JVc2VyKHVzZXJJZCk7XG4gIGlmICh1c2VyRW1haWwpIHtcbiAgICBhd2FpdCBzZW5kUGVybWl0VXBkYXRlRW1haWwoe1xuICAgICAgdG86IHVzZXJFbWFpbCxcbiAgICAgIHN1YmplY3Q6IGBBY3R1YWxpemFjacOzbiBlbiBQZXJtaXNvIFNHVEM6ICR7cGVybWl0Lm51bWJlciB8fCBwZXJtaXQuaWR9YCxcbiAgICAgIGh0bWw6IGA8cD4ke21lc3NhZ2V9PC9wPjxwPlB1ZWRlcyB2ZXIgbG9zIGRldGFsbGVzIGRlbCBwZXJtaXNvIGhhY2llbmRvIGNsaWMgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L3Blcm1pdHMvJHtwZXJtaXQuaWR9XCI+YXF1w608L2E+LjwvcD5gXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIC0tLSBGaW4gZGUgRnVuY2lvbmVzIGRlIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhcyc6ICdUcmFiYWpvIGVuIEFsdHVyYXMnLFxuICAnY29uZmluYWRvJzogJ0VzcGFjaW9zIENvbmZpbmFkb3MnLFxuICAnZW5lcmdpYSc6ICdDb250cm9sIGRlIEVuZXJnw61hcycsXG4gICdpemFqZSc6ICdJemFqZSBkZSBDYXJnYXMnLFxuICAnZXhjYXZhY2lvbic6ICdFeGNhdmFjaW9uZXMnLFxuICAnZ2VuZXJhbCc6ICdUcmFiYWpvIEdlbmVyYWwnXG59O1xuXG5jb25zdCBnZXRXb3JrVHlwZXNTdHJpbmcgPSAocGVybWl0OiBQYXJ0aWFsPFBlcm1pdD4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWxlY3RlZFR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAocGVybWl0LnRyYWJham9BbHR1cmFzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ1RyYWJham8gZW4gQWx0dXJhcycpO1xuICBpZiAocGVybWl0LmVzcGFjaW9zQ29uZmluYWRvcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFc3BhY2lvcyBDb25maW5hZG9zJyk7XG4gIGlmIChwZXJtaXQuY29udHJvbEVuZXJnaWEpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnRmlybWEgU1NUJyxcbn07XG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcicgfCAnYXBwcm92YWxzJyB8ICdjbG9zdXJlJz4gJiB7XG4gIHVzZXJJZDogc3RyaW5nO1xuICB1c2VyRGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJFbWFpbDogc3RyaW5nIHwgbnVsbDtcbiAgdXNlclBob3RvVVJMOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBlcm1pdChkYXRhOiBQZXJtaXRDcmVhdGVEYXRhKSB7XG4gIGlmICghZGF0YS51c2VySWQpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVc2VyIG5vdCBhdXRoZW50aWNhdGVkJyB9O1xuICB9XG4gICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnPiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gICAgdHJhYmFqb0FsdHVyYXM6IGRhdGEudHJhYmFqb0FsdHVyYXMgfHwgZmFsc2UsXG4gICAgaXNTU1RTaWduYXR1cmVSZXF1aXJlZDogZGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkIHx8IGZhbHNlLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICB0cmFiYWpvQWx0dXJhczogZGF0YS50cmFiYWpvQWx0dXJhcyB8fCBmYWxzZSxcbiAgICBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkOiBkYXRhLmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQgfHwgZmFsc2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoVGltZXN0YW1wID0geyAuLi5wZXJtaXRQYXlsb2FkLCBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwYXlsb2FkV2l0aFRpbWVzdGFtcCBhcyBhbnkpO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBpc1VwZGF0ZTogZmFsc2UgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIFtBY3Rpb25dIEVycm9yIGFsIGd1YXJkYXIgYm9ycmFkb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3Qgc2F2ZSBkcmFmdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nIFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNpZ25hdHVyZUFuZE5vdGlmeShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIHJvbGU6ICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcycgfCAnY2llcnJlX2F1dG9yaWRhZCcgfCAnY2llcnJlX3Jlc3BvbnNhYmxlJyB8ICdjYW5jZWxhY2lvbicsIFxuICBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLFxuICBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcsXG4gIHVzZXI6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsLCByb2xlPzogVXNlclJvbGUsIGVtcHJlc2E/OiBzdHJpbmcgfSxcbiAgY29tbWVudHM/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXVzZXIgfHwgIXVzZXIudWlkIHx8ICF1c2VyLnJvbGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXREb2NCZWZvcmUuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0QmVmb3JlRGF0YSA9IHBlcm1pdERvY0JlZm9yZS5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHt9O1xuXG4gICAgICAgIC8vIEzDs2dpY2EgcGFyYSBtYW5lamFyIGZpcm1hcyBkZSBjaWVycmUgeSBjYW5jZWxhY2nDs25cbiAgICAgICAgaWYgKHJvbGUuc3RhcnRzV2l0aCgnY2llcnJlXycpIHx8IHJvbGUgPT09ICdjYW5jZWxhY2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVSb2xlID0gcm9sZSA9PT0gJ2NpZXJyZV9hdXRvcmlkYWQnID8gJ2F1dG9yaWRhZCcgOiAocm9sZSA9PT0gJ2NpZXJyZV9yZXNwb25zYWJsZScgPyAncmVzcG9uc2FibGUnIDogJ2NhbmNlbGFkb1BvcicpO1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVBhdGggPSBgY2xvc3VyZS4ke2Nsb3N1cmVSb2xlfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ2xvc3VyZURhdGEgPSAocGVybWl0QmVmb3JlRGF0YS5jbG9zdXJlIGFzIGFueSk/LltjbG9zdXJlUm9sZV0gfHwge307XG5cbiAgICAgICAgICAgIHVwZGF0ZURhdGFbY2xvc3VyZVBhdGggYXMga2V5b2YgVXBkYXRlRGF0YTxQZXJtaXQ+XSA9IHtcbiAgICAgICAgICAgICAgICAuLi5leGlzdGluZ0Nsb3N1cmVEYXRhLFxuICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICBmZWNoYTogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5yYXpvbkNhbmNlbGFjaW9uJ10gPSBjb21tZW50cyB8fCAnTm8gZXNwZWNpZmljYWRvJztcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmNhbmNlbGFkbyddID0gJ3NpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g4pyFIFZBTElEQUNJw5NOIERFIFBFUk1JU09TIEFOVEVTIERFIEZJUk1BUlxuICAgICAgICAgICAgY29uc3QgY2FuU2lnbiA9IGF3YWl0IHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihwZXJtaXRJZCwgcm9sZSwgdXNlcik7XG4gICAgICAgICAgICBpZiAoIWNhblNpZ24uYWxsb3dlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogY2FuU2lnbi5yZWFzb24gfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxEYXRhOiBQYXJ0aWFsPEFwcHJvdmFsPiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHJvYmFkbycsXG4gICAgICAgICAgICAgICAgZmlybWFBcGVydHVyYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIudWlkLFxuICAgICAgICAgICAgICAgIHNpZ25lZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIGFueSxcbiAgICAgICAgICAgICAgICB1c2VyUm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIHVzZXJFbXByZXNhOiB1c2VyLmVtcHJlc2EgfHwgJ04vQScsXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbW1lbnRzIHx8ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2BhcHByb3ZhbHMuJHtyb2xlfWBdID0gYXBwcm92YWxEYXRhO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyDinIUgTMOTR0lDQSBERSBGSVJNQVMgU0VHw5pOIEVMIFJPTFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBcbiAgICAgICAgICAgICAgICAgICAgZGlhOiAxLCBcbiAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB1c2VyLmRpc3BsYXlOYW1lIHx8ICcnLCBcbiAgICAgICAgICAgICAgICAgICAgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIFxuICAgICAgICAgICAgICAgICAgICBmZWNoYTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g4pyFIFNPTElDSVRBTlRFIEZJUk1BOiBDYW1iaWEgZGUgQm9ycmFkb3IgYSBQZW5kaWVudGUgZGUgUmV2aXNpw7NuXG4gICAgICAgICAgICAgICAgaWYgKHJvbGUgPT09ICdzb2xpY2l0YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGEuc3RhdHVzID09PSAnYm9ycmFkb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke3Blcm1pdElkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydudW1iZXInXSA9IHBlcm1pdE51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ3BlbmRpZW50ZV9yZXZpc2lvbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYWNpw7NuIGRpYXJpYSBpbmljaWFsIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VmFsaWRhdGlvbnNbMF0/LmZpcm1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhW2Ake2FuZXhvfS52YWxpZGFjaW9uLnJlc3BvbnNhYmxlYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIOKchSBBVVRPUklaQU5URSBGSVJNQTogQWdyZWdhIHZhbGlkYWNpw7NuIGRpYXJpYSBkZSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09ICdhdXRvcml6YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0E6IMK/VG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXM/XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkUGVybWl0RGF0YSA9IHsgXG4gICAgICAgICAgICAgICAgLi4ucGVybWl0QmVmb3JlRGF0YSwgXG4gICAgICAgICAgICAgICAgYXBwcm92YWxzOiB7IC4uLnBlcm1pdEJlZm9yZURhdGEuYXBwcm92YWxzLCBbcm9sZV06IGFwcHJvdmFsRGF0YSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXdhaXQgY2hlY2tBbGxSZXF1aXJlZFNpZ25hdHVyZXNDb21wbGV0ZSh1cGRhdGVkUGVybWl0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyDwn5qAIENBTUJJTyBBVVRPTcOBVElDTyBERSBQRU5ESUVOVEVfUkVWSVNJT04g4oaSIEVOX0VKRUNVQ0lPTlxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ3BlbmRpZW50ZV9yZXZpc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlLnJlcGxhY2UoJ18nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGZpcm1hZG8gZWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGNvbW8gJHtzaWduYXR1cmVSb2xlTmFtZX0uYDtcbiAgICAgICAgY29uc3QgaW52b2x2ZWRVc2VycyA9IGF3YWl0IGdldEludm9sdmVkVXNlcnModXBkYXRlZFBlcm1pdERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgIGlmICh1aWQgIT09IHVzZXIudWlkKSB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3NpZ25hdHVyZScsIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE5PVElGSUNBQ0nDk04gRVNQRUNJQUwgU0kgRUwgUEVSTUlTTyBQQVPDkyBBVVRPTcOBVElDQU1FTlRFIEEgRU5fRUpFQ1VDSU9OXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvbk1lc3NhZ2UgPSBgRWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGhhIGNvbXBsZXRhZG8gdG9kYXMgbGFzIGFwcm9iYWNpb25lcyByZXF1ZXJpZGFzIHkgYWhvcmEgZXN0w6EgRU4gRUpFQ1VDScOTTi5gO1xuICAgICAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgZXhlY3V0aW9uTWVzc2FnZSwgJ2FwcHJvdmFsJywgdXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vdGlmaWNhY2nDs24gV2hhdHNBcHBcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgICAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgICAgICBjb25zdCB3aGF0c2FwcE1zZyA9IGAqwqFQRVJNSVNPIEVOIEVKRUNVQ0nDk04hKiDinIVcblxu8J+ThCAqTsO6bWVybzoqICR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfVxu8J+TjSAqw4FyZWE6KiAke3Blcm1pdEJlZm9yZURhdGEuZ2VuZXJhbEluZm8/LmFyZWFFc3BlY2lmaWNhIHx8ICdOL0EnfVxu8J+boO+4jyAqVGlwbzoqICR7Z2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdEJlZm9yZURhdGEpfVxuXG7inIUgVG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGhhbiBzaWRvIGNvbXBsZXRhZGFzLlxuRWwgcGVybWlzbyBlc3TDoSBhaG9yYSBFTiBFSkVDVUNJw5NOLlxuXG5WZXIgZGV0YWxsZXM6ICR7cGVybWl0VXJsfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyDinIUgRlVOQ0nDk04gQ09SUkVHSURBOiBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQWxsUmVxdWlyZWRTaWduYXR1cmVzQ29tcGxldGUoXG4gIHBlcm1pdERhdGE6IFBlcm1pdFxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBhcHByb3ZhbHMgfSA9IHBlcm1pdERhdGE7XG4gICAgXG4gICAgLy8gRmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIFNJRU1QUkUgcmVxdWVyaWRhXG4gICAgaWYgKGFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIEZpcm1hIGRlbCBhdXRvcml6YW50ZSBlcyBTSUVNUFJFIHJlcXVlcmlkYVxuICAgIGlmIChhcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgdHJhYmFqb3MgZW4gYWx0dXJhcywgcmVxdWllcmUgZmlybWEgZGVsIGNvb3JkaW5hZG9yXG4gICAgaWYgKHBlcm1pdERhdGEudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0RGF0YS5zZWxlY3RlZFdvcmtUeXBlcz8uYWx0dXJhcykge1xuICAgICAgICBpZiAoYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgIGlmIChwZXJtaXREYXRhLmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/Lm1hbnRlbmltaWVudG8/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICBpZiAocGVybWl0RGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/LmxpZGVyX3NzdD8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgdHJhbnNpY2lvbmVzIGRlIGVzdGFkb1xuZnVuY3Rpb24gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24oY3VycmVudFN0YXR1czogUGVybWl0U3RhdHVzLCB0YXJnZXRTdGF0dXM6IFBlcm1pdFN0YXR1cywgdXNlclJvbGU6IFVzZXJSb2xlKTogeyBhbGxvd2VkOiBib29sZWFuLCByZWFzb24/OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgYWxsb3dlZFRyYW5zaXRpb25zOiBQYXJ0aWFsPFJlY29yZDxQZXJtaXRTdGF0dXMsIFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgVXNlclJvbGVbXT4+Pj4gPSB7XG4gICAgICAgICdib3JyYWRvcic6IHtcbiAgICAgICAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiBbJ3NvbGljaXRhbnRlJywgJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2F1dG9yaXphbnRlJywgJ2FkbWluJ10sXG4gICAgICAgICAgICAncmVjaGF6YWRvJzogWydhdXRvcml6YW50ZScsICdsaWRlcl9zc3QnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnZW5fZWplY3VjaW9uJzoge1xuICAgICAgICAgICAgJ3N1c3BlbmRpZG8nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2F1dG9yaXphbnRlJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3N1c3BlbmRpZG8nOiB7XG4gICAgICAgICAgICAnZW5fZWplY3VjaW9uJzogWydsaWRlcl9zc3QnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdjZXJyYWRvJzogWydsaWRlcl90YXJlYScsICdhdXRvcml6YW50ZScsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1hbnRlbmVyIGNvbXBhdGliaWxpZGFkIGNvbiBwZXJtaXNvcyBhbnRpZ3VvcyBxdWUgdGVuZ2FuIGVzdGFkbyBcImFwcm9iYWRvXCJcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGFsbG93ZWRSb2xlcyA9IGFsbG93ZWRUcmFuc2l0aW9uc1tjdXJyZW50U3RhdHVzXT8uW3RhcmdldFN0YXR1c107XG4gICAgaWYgKCFhbGxvd2VkUm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFRyYW5zaWNpw7NuIGRlICcke2N1cnJlbnRTdGF0dXN9JyBhICcke3RhcmdldFN0YXR1c30nIG5vIGVzdMOhIHBlcm1pdGlkYS5gIH07XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkUm9sZXMuaW5jbHVkZXModXNlclJvbGUpICYmIHVzZXJSb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBUdSByb2wgKCR7dXNlclJvbGV9KSBubyB0aWVuZSBwZXJtaXNvcyBwYXJhIGNhbWJpYXIgZWwgZXN0YWRvIGEgJyR7dGFyZ2V0U3RhdHVzfScuYCB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlIH0sXG4gIHJlYXNvbj86IHN0cmluZ1xuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhY3VycmVudFVzZXIudWlkIHx8ICFjdXJyZW50VXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgbyB1c3VhcmlvIHNpbiByb2wuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIFZhbGlkYXIgdHJhbnNpY2nDs24gZGUgZXN0YWRvXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihwZXJtaXREYXRhLnN0YXR1cywgc3RhdHVzLCBjdXJyZW50VXNlci5yb2xlKTtcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uLmFsbG93ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdHJhbnNpdGlvbi5yZWFzb24gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgLy8g4pyFIEd1YXJkYXIgcmF6w7NuIGRlIHJlY2hhem9cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE1hcmNhciBmZWNoYSBkZSBjaWVycmVcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmZlY2hhQ2llcnJlJ10gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS50ZXJtaW5hZG8nXSA9ICdzaSc7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHVwZGF0ZURhdGEpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IC4uLnBlcm1pdERhdGEsIC4uLnVwZGF0ZURhdGEsIGlkOiBwZXJtaXRJZCB9IGFzIFBlcm1pdDtcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIHB1ZXN0byBFTiBFSkVDVUNJw5NOIG1hbnVhbG1lbnRlLmA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdyZWplY3Rpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVjaGF6YWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgICAgICBpZiAocmVhc29uKSBtZXNzYWdlICs9IGAgTW90aXZvOiAke3JlYXNvbn1gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25UeXBlID0gJ2NhbmNlbGxhdGlvbic7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjZXJyYWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKHVwZGF0ZWRQZXJtaXREYXRhKTtcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgIGlmICh1aWQgIT09IGN1cnJlbnRVc2VyLnVpZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCBub3RpZmljYXRpb25UeXBlLCB0cmlnZ2VyZWRCeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1RDKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJyAmJiByZWFzb24pIHtcbiAgICAgICAgICBtZXNzYWdlQm9keSArPSBgXFxuXFxuKk1vdGl2byBkZWwgcmVjaGF6bzoqICR7cmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgICAgIFxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciB1cGRhdGluZyBwZXJtaXQgc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3QgdXBkYXRlIHBlcm1pdCBzdGF0dXMuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSBwZXJtaXNvcyBkZSBmaXJtYSBjb24gb3JkZW4gamVyw6FycXVpY29cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gRGViZSBoYWJlciB0cmFiYWpvIGVuIGFsdHVyYXNcbiAgICAgICAgICAgIGlmICghcGVybWl0LnRyYWJham9BbHR1cmFzICYmICFwZXJtaXQuc2VsZWN0ZWRXb3JrVHlwZXM/LmFsdHVyYXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRXN0YSBmaXJtYSBzb2xvIGFwbGljYSBwYXJhIHRyYWJham9zIGVuIGFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWFcbiAgICAgICAgICAgIGlmIChwZXJtaXQuY3JlYXRlZEJ5ICE9PSBjdXJyZW50VXNlci51aWQgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTb2xvIGVsIGNyZWFkb3IgZGVsIHBlcm1pc28gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnc29saWNpdGFudGUnOlxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBmaXJtYXIgY29tbyBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDinIUgU2kgaGF5IGFuZXhvIGRlIGFsdHVyYXMsIHZlcmlmaWNhciBmaXJtYSBkZWwgY29vcmRpbmFkb3IgcHJpbWVyb1xuICAgICAgICAgICAgaWYgKChwZXJtaXQudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzKSAmJiBcbiAgICAgICAgICAgICAgICBwZXJtaXQuYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgQ29vcmRpbmFkb3IgZGUgVHJhYmFqb3MgZW4gQWx0dXJhcy4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdhdXRvcml6YW50ZSc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2F1dG9yaXphbnRlJyAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1JvbCBkZSBhdXRvcml6YW50ZSByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NlIHJlcXVpZXJlIHByaW1lcm8gbGEgZmlybWEgZGVsIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ2xpZGVyX3NzdCc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2xpZGVyX3NzdCcgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTMOtZGVyIFNTVCByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIGVzIHJlcXVlcmlkYSBwYXJhIGVzdGUgcGVybWlzby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGVybWl0LmFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTZSByZXF1aWVyZSBwcmltZXJvIGxhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdtYW50ZW5pbWllbnRvJzpcbiAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ21hbnRlbmltaWVudG8nICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIE1hbnRlbmltaWVudG8gcmVxdWVyaWRvIHBhcmEgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBlcm1pdC5jb250cm9sRW5lcmdpYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdGaXJtYSBkZSBNYW50ZW5pbWllbnRvIHNvbG8gYXBsaWNhIGN1YW5kbyBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgYXV0b3JpemFudGUuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZERhaWx5VmFsaWRhdGlvblNpZ25hdHVyZShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIGFuZXhvTmFtZTogc3RyaW5nLCBcbiAgdmFsaWRhdGlvblR5cGU6ICdhdXRvcmlkYWQnIHwgJ3Jlc3BvbnNhYmxlJywgXG4gIGluZGV4OiBudW1iZXIsIFxuICBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhLCBcbiAgdXNlcjogVXNlclxuKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPCAwIHx8ICFkYXRhIHx8ICF1c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcy4nIH07XG4gIH1cblxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgfVxuICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXRTbmFwLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIGVqZWN1Y2nDs24gcGFyYSB2YWxpZGFjaW9uZXMgZGlhcmlhc1xuICAgIGlmICghWydlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIEVOIEVKRUNVQ0nDk04gbyBTVVNQRU5ESURPUy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgYW5leG9EYXRhID0gKHBlcm1pdERhdGEgYXMgYW55KVthbmV4b05hbWVdO1xuICAgIGlmICghYW5leG9EYXRhKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXhpc3RlIGVuIGVsIHBlcm1pc28uYCB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBhbmV4b1VwZGF0ZTogYW55ID0geyAuLi5hbmV4b0RhdGEgfTtcbiAgICBpZiAoIWFuZXhvVXBkYXRlLnZhbGlkYWNpb24pIHtcbiAgICAgICAgYW5leG9VcGRhdGUudmFsaWRhY2lvbiA9IHsgYXV0b3JpZGFkOiBbXSwgcmVzcG9uc2FibGU6IFtdIH07XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvVXBkYXRlLnZhbGlkYWNpb25bdmFsaWRhdGlvblR5cGVdIGFzIFZhbGlkYWNpb25EaWFyaWFbXSkgfHwgW107XG4gICAgXG4gICAgd2hpbGUgKHZhbGlkYXRpb25BcnJheS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdmFsaWRhdGlvbkFycmF5LnB1c2goeyBkaWE6IHZhbGlkYXRpb25BcnJheS5sZW5ndGggKyAxLCBub21icmU6ICcnLCBmZWNoYTogJycsIGZpcm1hOiAnJyB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0aW9uQXJyYXlbaW5kZXhdID0gZGF0YTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVQYXRoID0gYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YDtcbiAgICBcbiAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHtcbiAgICAgIFt1cGRhdGVQYXRoXTogdmFsaWRhdGlvbkFycmF5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB7IHVpZDogdXNlci51aWQsIGRpc3BsYXlOYW1lOiB1c2VyLmRpc3BsYXlOYW1lIHx8IG51bGwgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgY29uc3Qgd2hhdHNhcHBNZXNzYWdlID0gYCpWYWxpZGFjacOzbiBEaWFyaWEgLSBTR1RDKiDinI3vuI9cblNlIGhhIHJlZ2lzdHJhZG8gdW5hIG51ZXZhIGZpcm1hIGRlIHZhbGlkYWNpw7NuIGRpYXJpYS5cblxu8J+ThCAqUGVybWlzbzoqICR7ZnVsbFBlcm1pdERhdGEubnVtYmVyIHx8ICdOL0EnfVxu8J+Xk++4jyAqRMOtYToqICR7ZGF5fVxu8J+RpCAqRmlybWFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inIUgKlJvbDoqICR7dmFsaWRhdGlvblJvbGVOYW1lfVxu8J+TiyAqQW5leG86KiAke2FuZXhvRGlzcGxheU5hbWV9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1lc3NhZ2UpO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIENPUlJFQ0NJw5NOOiBWYWxpZGFjacOzbiBkZSBlc3RhZG8gY29ycmVnaWRhIHBhcmEgZmlybWEgZGUgYXBlcnR1cmFcbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyAmJiAhWydwZW5kaWVudGVfcmV2aXNpb24nLCAnYXByb2JhZG8nLCAnZW5fZWplY3VjaW9uJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBjdWFuZG8gZWwgcGVybWlzbyBlc3TDoSBwZW5kaWVudGUsIGFwcm9iYWRvIG8gZW4gZWplY3VjacOzbi4nIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUNpZXJyZScgJiYgIVsnZW5fZWplY3VjaW9uJywgJ3N1c3BlbmRpZG8nXS5pbmNsdWRlcyhwZXJtaXREYXRhLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1NvbG8gc2UgcHVlZGUgZmlybWFyIGNpZXJyZSBlbiBwZXJtaXNvcyBFTiBFSkVDVUNJw5NOIG8gU1VTUEVORElET1MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1NBOGZzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/pdf-generator.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// ✅ Archivo: lib/pdf-generator.ts
__turbopack_context__.s({
    "ANEXO_ALTURA_CAMPOS": (()=>ANEXO_ALTURA_CAMPOS),
    "ANEXO_CONFINADO_CAMPOS": (()=>ANEXO_CONFINADO_CAMPOS),
    "ANEXO_ENERGIA_CAMPOS": (()=>ANEXO_ENERGIA_CAMPOS),
    "ANEXO_EXCAVACION_CAMPOS": (()=>ANEXO_EXCAVACION_CAMPOS),
    "ANEXO_IZAJE_CAMPOS": (()=>ANEXO_IZAJE_CAMPOS),
    "PELIGROS_VERIFICACION": (()=>PELIGROS_VERIFICACION),
    "generateCompleteWorkPermitPDF": (()=>generateCompleteWorkPermitPDF)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.mjs [app-client] (ecmascript)");
;
;
;
// Función para renderizar checkmark, X o N/A
const getStatusSymbol = (value)=>{
    if (value === 'si' || value === true) return '✓ SÍ';
    if (value === 'no' || value === false) return '✗ NO';
    if (value === 'na') return 'N/A';
    return '—';
};
const getStatusColor = (value)=>{
    if (value === 'si' || value === true) return [
        34,
        139,
        34
    ]; // Verde
    if (value === 'no' || value === false) return [
        220,
        20,
        60
    ]; // Rojo
    if (value === 'na') return [
        169,
        169,
        169
    ]; // Gris
    return [
        0,
        0,
        0
    ]; // Negro
};
const PELIGROS_VERIFICACION = [
    {
        id: 'fisicos',
        label: 'Físicos',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'quimicos',
        label: 'Químicos',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'biologicos',
        label: 'Biológicos',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'seguridad',
        label: 'De Seguridad',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'locativos',
        label: 'Locativos',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'biomecanico',
        label: 'Biomecánico',
        seccion: 'verificacionPeligros'
    },
    {
        id: 'psicosocial',
        label: 'Psicosocial',
        seccion: 'verificacionPeligros'
    }
];
const ANEXO_ALTURA_CAMPOS = [
    {
        id: 'afiliacionVigente',
        label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL?'
    },
    {
        id: 'procedimientoActividad',
        label: 'B. SE CUENTA CON EL PROCEDIMIENTO DE LA ACTIVIDAD A EJECUTAR?'
    },
    {
        id: 'medidasPrevencion',
        label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?'
    },
    {
        id: 'conocenMedidas',
        label: 'D. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?'
    },
    {
        id: 'entrenadosCertificados',
        label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR TRABAJOS EN ALTURA?'
    },
    {
        id: 'elementosProteccionCertificados',
        label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO Y CERTIFICADOS?'
    },
    {
        id: 'sistemaAseguramientoVerificado',
        label: 'G. SE VERIFICO EL SISTEMA DE ASEGURAMIENTO DE LA ESCALERA, ANDAMIO O PLATAFORMA A UNA ESTRUCTURA FIJA'
    },
    {
        id: 'estadoElementosVerificado',
        label: 'H. SE VERIFICO EL ESTADO DE: ESLINGAS, ARNES, CASCO, MOSQUETONES, Y DEMAS ELEMENTOS NECESARIOS'
    },
    {
        id: 'puntosAnclajeCertificados',
        label: 'I. LOS PUNTOS DE ANCLAJE CUMPLEN CON LA RESISTENCIA DE 5000 LBS POR PERSONA Y ESTAN CERTIFICADOS?'
    },
    {
        id: 'areaDelimitada',
        label: 'J. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO'
    },
    {
        id: 'personalSaludable',
        label: 'K. EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD?'
    },
    {
        id: 'equiposAccesoBuenEstado',
        label: 'L. SE CUENTA CON TODOS LOS EQUIPOS Y SISTEMAS DE ACCESO PARA TRABAJO EN ALTURAS EN BUEN ESTADO?'
    },
    {
        id: 'espacioCaidaLibreSuficiente',
        label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR QUE LA PERSONA SE GOLPEE?'
    },
    {
        id: 'equiposEmergenciaDisponibles',
        label: 'N. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS Y PLAN DE RESCATE EN ALTURAS?'
    },
    {
        id: 'eppSeleccionadosCorrectamente',
        label: 'O. ESTÁN LOS ELEMENTOS DE PROTECCIÓN PERSONAL SELECCIONADOS CORRECTAMENTE?'
    },
    {
        id: 'plataformaSoportaCarga',
        label: 'P. LA PLATAFORMA O ESTRUCTURA SOPORTA LA CARGA DE TRABAJO?'
    },
    {
        id: 'supervisorConstante',
        label: 'Q. EXISTE UN SUPERVISOR O ACOMPAÑANTE CONSTANTE DURANTE EL TRABAJO'
    },
    {
        id: 'andamiosCompletos',
        label: 'R. EN CASO DE TRABAJOS SOBRE ANDAMIOS, ESTOS ESTAN COMPLETOS Y ADECUADAMENTE ARMADOS'
    },
    {
        id: 'condicionesClimaticasAdecuadas',
        label: 'S. LAS CONDICIONES CLIMATICAS SON ADECUADAS PARA REALIZAR EL TRABAJO'
    },
    {
        id: 'metodoSubirHerramientasSeguro',
        label: 'T. EL METODO DE SUBIR HERRAMIENTAS ES SEGURO'
    }
];
const ANEXO_CONFINADO_CAMPOS = [
    {
        id: 'fuentesEnergiaAisladas',
        label: 'A. ESTAN LAS FUENTES DE ENERGIA AISLADAS'
    },
    {
        id: 'ejecutantesConocenMedidas',
        label: 'B. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS?'
    },
    {
        id: 'ejecutantesEntrenados',
        label: 'C. ESTÁN LOS EJECUTANTES ENTRENADOS'
    },
    {
        id: 'entradasSalidasFlujoBloqueadas',
        label: 'D. ESTAN BLOQUEADAS LAS ENTRADAS Y SALIDAS DE FLUJO'
    },
    {
        id: 'areaDelimitada',
        label: 'E. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO'
    },
    {
        id: 'monitorAtmosferasCalibrado',
        label: 'F. SE TIENE EN SITIO UN MONITOR DE ATMOSFERAS PELIGROSAS, CALIBRADO'
    },
    {
        id: 'equiposIluminacionExplosion',
        label: 'G. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE ILUMINACION'
    },
    {
        id: 'equiposVentilacionExplosion',
        label: 'H. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE VENTILACION'
    },
    {
        id: 'equiposVentilacionSuficientes',
        label: 'J. LOS EQUIPOS DE VENTILACION ESTAN DISPONIBLES Y SON SUFICIENTES'
    },
    {
        id: 'equiposRespiracionAutonoma',
        label: 'K. ESTAN DISPONIBLES EQUIPOS DE RESPIRACION AUTONOMA EN CASO DE EMERGENCIA'
    },
    {
        id: 'elementosAtencionEmergencias',
        label: 'L. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS'
    },
    {
        id: 'planEmergenciaRescate',
        label: 'M. SE CUENTA CON PLAN DE EMERGENCIA PARA RESCATE'
    },
    {
        id: 'hojasSeguridadDisponibles',
        label: 'N. ESTAN DISPONIBLES LAS HOJAS DE SEGURIDAD DE PRODUCTOS QUIMICOS'
    },
    {
        id: 'vigiaPermanente',
        label: 'O. SE VERIFICA QUE HAYA UN VIGIA PERMANENTE EN EL AREA'
    },
    {
        id: 'herramientasAdecuadas',
        label: 'P. SE VERIFICO QUE LAS HERRAMIENTAS SEAN LAS ADECUADAS'
    },
    {
        id: 'personalSaludable',
        label: 'Q. EL PERSONAL SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD'
    },
    {
        id: 'verificadoEpp',
        label: 'R. SE VERIFICO EL EQUIPO Y ELEMENTOS DE PROTECCION PERSONAL'
    }
];
const ANEXO_ENERGIA_CAMPOS = [
    {
        id: 'fuentesEnergiaIdentificadas',
        label: 'A. SE HAN IDENTIFICADO LAS FUENTES DE ENERGÍA'
    },
    {
        id: 'ejecutantesConocenMedidas',
        label: 'B. SE HAN IDENTIFICADO LOS EJECUTANTES Y LOS SUPERVISORES QUE DEBEN ESTAR PRESENTES'
    },
    {
        id: 'medidasPrevencion',
        label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN'
    },
    {
        id: 'ejecutantesEntrenados',
        label: 'D. LOS EJECUTANTES ESTÁN ENTRENADOS'
    },
    {
        id: 'procedimientoDisiparEnergia',
        label: 'E. SE HA ESTABLECIDO EL PROCEDIMIENTO PARA DISIPAR ENERGÍA'
    },
    {
        id: 'bloqueoEtiquetado',
        label: 'F. SE CUENTA CON BLOQUEOS Y ETIQUETADOS'
    },
    {
        id: 'verificacionAusenciaEnergia',
        label: 'G. SE HA VERIFICADO LA AUSENCIA DE ENERGÍA'
    },
    {
        id: 'distanciasSeguridad',
        label: 'H. SE CUMPLEN LAS DISTANCIAS DE SEGURIDAD SEGÚN RETIE'
    }
];
const ANEXO_IZAJE_CAMPOS = [
    {
        id: 'terrenoEstabilizado',
        label: 'A. TERRENO ESTABILIZADO Y SOPORTA EL EQUIPO'
    },
    {
        id: 'operadorVisualiza',
        label: 'B. OPERADOR VISUALIZA BIEN EL ÁREA'
    },
    {
        id: 'calculoTecnicoIzaje',
        label: 'C. SE CUENTA CON CÁLCULO TÉCNICO/PLAN DE IZAJE'
    },
    {
        id: 'areaSeñalizada',
        label: 'D. ÁREA SEÑALIZADA Y DEMARCADA'
    },
    {
        id: 'verificacionCapacidad',
        label: 'E. SE VERIFICÓ LA CAPACIDAD DEL EQUIPO VS CARGA'
    },
    {
        id: 'areaLimpia',
        label: 'F. ÁREA DE IZAJE DESPEJADA DE PERSONAL'
    },
    {
        id: 'comunicacionClara',
        label: 'G. COMUNICACIÓN CLARA ESTABLECIDA'
    },
    {
        id: 'atsRealizado',
        label: 'H. ATS REALIZADO'
    },
    {
        id: 'eslinguasEstado',
        label: 'I. ESLINGAS Y APAREJOS EN BUEN ESTADO'
    },
    {
        id: 'polinesEstado',
        label: 'J. POLINES EN BUEN ESTADO'
    },
    {
        id: 'polinesEstables',
        label: 'K. POLINES ESTABLES Y CORRECTAMENTE POSICIONADOS'
    },
    {
        id: 'distanciaLineasElectricas',
        label: 'L. DISTANCIA SEGURA DE LÍNEAS ELÉCTRICAS'
    },
    {
        id: 'sinPersonasAjoBajoCarga',
        label: 'M. SIN PERSONAS BAJO LA CARGA'
    },
    {
        id: 'climaSeguro',
        label: 'N. CONDICIONES CLIMÁTICAS SEGURAS'
    },
    {
        id: 'equipoTierra',
        label: 'O. EQUIPO CON CONEXIÓN A TIERRA'
    },
    {
        id: 'noMaterialCayendoCarga',
        label: 'P. SIN MATERIAL QUE PUEDA CAER SOBRE LA CARGA'
    },
    {
        id: 'senalizadorCapacitado',
        label: 'Q. SEÑALIZADOR CAPACITADO Y ENTRENADO'
    },
    {
        id: 'afiliacionVerificada',
        label: 'R. SE VERIFICÓ AFILIACIÓN A SISTEMA DE SEGURIDAD SOCIAL'
    }
];
const ANEXO_EXCAVACION_CAMPOS = [
    {
        id: 'sistemasEnterrados',
        label: 'A. SISTEMAS ENTERRADOS IDENTIFICADOS'
    },
    {
        id: 'metodoExcavacion',
        label: 'B. MÉTODO DE EXCAVACIÓN DETERMINADO'
    },
    {
        id: 'ejecutantesEntrenados',
        label: 'C. EJECUTANTES ENTRENADOS'
    },
    {
        id: 'controlEntibado',
        label: 'D. CONTROLES, ENTIBADO, SISTEMAS DE ACCESO INSTALADOS'
    },
    {
        id: 'areaSeñalizada',
        label: 'E. ÁREA SEÑALIZADA PARA PREVENIR CAÍDAS'
    },
    {
        id: 'puentesComplementarios',
        label: 'F. PUENTES O PASARELAS SI NECESARIO'
    },
    {
        id: 'materialesAlBorde',
        label: 'G. MATERIALES MOVIDOS A MÍNIMO 1M DEL BORDE'
    },
    {
        id: 'escaleraSobresale',
        label: 'H. ESCALERAS SOBRESALEN MÍNIMO 1M DEL BORDE'
    },
    {
        id: 'metodoRelleno',
        label: 'I. MÉTODO DE RELLENO PREVISTO'
    }
];
const generateCompleteWorkPermitPDF = async (permit)=>{
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'letter');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yPos = margin;
    const italcolOrange = [
        239,
        123,
        0
    ];
    const checkPageBreak = (neededHeight)=>{
        if (yPos + neededHeight > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
        }
    };
    const drawHeader = (title)=>{
        doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
        doc.rect(margin, yPos, pageWidth - 2 * margin, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(title.toUpperCase(), pageWidth / 2, yPos + 4, {
            align: 'center'
        });
        doc.setTextColor(0, 0, 0);
        yPos += 8;
    };
    const renderFieldsTable = (fields, data, title)=>{
        checkPageBreak(50);
        drawHeader(title);
        const bodyData = fields.map((field)=>[
                field.label,
                getStatusSymbol(data[field.id]),
                ''
            ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            startY: yPos,
            head: [
                [
                    'DESCRIPCIÓN',
                    'ESTADO',
                    ''
                ]
            ],
            body: bodyData,
            theme: 'grid',
            headStyles: {
                fillColor: [
                    240,
                    240,
                    240
                ],
                textColor: [
                    0,
                    0,
                    0
                ],
                fontSize: 7
            },
            bodyStyles: {
                fontSize: 6,
                cellPadding: 1.5
            },
            columnStyles: {
                0: {
                    cellWidth: 120
                },
                1: {
                    halign: 'center',
                    cellWidth: 25,
                    textColor: getStatusColor(data[fields[0].id])
                },
                2: {
                    cellWidth: 10
                }
            },
            didDrawCell: (data)=>{
                if (data.section === 'body' && data.column.index === 1) {
                    const fieldValue = fields[data.row.index]?.id;
                    const value = values[fieldValue];
                    const color = getStatusColor(value);
                    doc.setTextColor(color[0], color[1], color[2]);
                }
            }
        });
        yPos = doc.lastAutoTable.finalY + 5;
    };
    // ===== CONTENIDO DEL PDF =====
    // Encabezado principal
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PERMISO DE TRABAJO', pageWidth / 2, yPos, {
        align: 'center'
    });
    yPos += 10;
    // Información General
    drawHeader('INFORMACIÓN GENERAL DEL PERMISO');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
        startY: yPos,
        body: [
            [
                'Número Permiso:',
                permit.number || permit.id.substring(0, 8),
                'Empresa:',
                permit.generalInfo?.empresa || ''
            ],
            [
                'Planta:',
                permit.generalInfo?.planta || '',
                'Área:',
                permit.generalInfo?.areaEspecifica || ''
            ],
            [
                'Proceso:',
                permit.generalInfo?.proceso || '',
                'Contrato:',
                permit.generalInfo?.contrato || ''
            ],
            [
                'Válido Desde:',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo?.validFrom), 'dd/MM/yy HH:mm'),
                'Válido Hasta:',
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo?.validUntil), 'dd/MM/yy HH:mm')
            ],
            [
                'Solicitante:',
                permit.user?.displayName || '',
                'Responsable:',
                permit.generalInfo?.responsable?.nombre || ''
            ]
        ],
        theme: 'grid',
        styles: {
            fontSize: 7,
            cellPadding: 1.5
        },
        columnStyles: {
            0: {
                cellWidth: 35
            },
            1: {
                cellWidth: 50
            },
            2: {
                cellWidth: 35
            },
            3: {
                cellWidth: 50
            }
        }
    });
    yPos = doc.lastAutoTable.finalY + 5;
    // Alcance
    checkPageBreak(20);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
        startY: yPos,
        head: [
            [
                'DESCRIPCIÓN DEL TRABAJO (ALCANCE)'
            ]
        ],
        body: [
            [
                permit.generalInfo?.workDescription || 'No especificado'
            ]
        ],
        theme: 'grid',
        styles: {
            fontSize: 7,
            cellPadding: 2
        }
    });
    yPos = doc.lastAutoTable.finalY + 5;
    // ✅ PELIGROS GENERALES
    if (permit.verificacionPeligros) {
        renderFieldsTable(PELIGROS_VERIFICACION, permit.verificacionPeligros, 'PELIGROS IDENTIFICADOS');
    }
    // ✅ EPP (si existe)
    if (permit.eppEmergencias?.epp) {
        checkPageBreak(40);
        drawHeader('EQUIPOS DE PROTECCIÓN PERSONAL (EPP)');
        const eppRows = Object.entries(permit.eppEmergencias.epp).map(([key, value])=>[
                key.replace(/([A-Z])/g, ' $1').trim(),
                getStatusSymbol(value)
            ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            startY: yPos,
            head: [
                [
                    'ELEMENTO EPP',
                    'REQUERIDO'
                ]
            ],
            body: eppRows,
            theme: 'grid',
            headStyles: {
                fillColor: [
                    240,
                    240,
                    240
                ],
                textColor: [
                    0,
                    0,
                    0
                ],
                fontSize: 7
            },
            bodyStyles: {
                fontSize: 6,
                cellPadding: 1
            },
            columnStyles: {
                1: {
                    halign: 'center',
                    cellWidth: 25
                }
            }
        });
        yPos = doc.lastAutoTable.finalY + 5;
    }
    // ✅ ANEXO 1: ALTURAS
    if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
        renderFieldsTable(ANEXO_ALTURA_CAMPOS, permit.anexoAltura.aspectosSeguridad || {}, 'ANEXO 1 - TRABAJO EN ALTURAS');
    }
    // ✅ ANEXO 2: ESPACIOS CONFINADOS
    if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
        renderFieldsTable(ANEXO_CONFINADO_CAMPOS, permit.anexoConfinado.identificacionPeligros || {}, 'ANEXO 2 - ESPACIOS CONFINADOS');
        // Tabla de pruebas de gases
        if (permit.anexoConfinado.resultadosPruebasGases) {
            checkPageBreak(30);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
                startY: yPos,
                head: [
                    [
                        'PARÁMETRO',
                        'VALOR',
                        'CUMPLE'
                    ]
                ],
                body: [
                    [
                        'LEL (%)',
                        permit.anexoConfinado.resultadosPruebasGases.lel || '—',
                        permit.anexoConfinado.resultadosPruebasGases.lel === '0%' ? '✓' : '—'
                    ],
                    [
                        'O2 (%)',
                        permit.anexoConfinado.resultadosPruebasGases.o2 || '—',
                        '—'
                    ],
                    [
                        'H2S (PPM)',
                        permit.anexoConfinado.resultadosPruebasGases.h2s || '—',
                        '—'
                    ],
                    [
                        'CO (PPM)',
                        permit.anexoConfinado.resultadosPruebasGases.co || '—',
                        '—'
                    ]
                ],
                theme: 'grid',
                styles: {
                    fontSize: 6,
                    halign: 'center',
                    cellPadding: 1
                }
            });
            yPos = doc.lastAutoTable.finalY + 5;
        }
    }
    // ✅ ANEXO 3: ENERGÍAS
    if (permit.selectedWorkTypes?.energia && permit.anexoEnergias) {
        renderFieldsTable(ANEXO_ENERGIA_CAMPOS, permit.anexoEnergias || {}, 'ANEXO 3 - CONTROL DE ENERGÍAS');
    }
    // ✅ ANEXO 4: IZAJE
    if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
        renderFieldsTable(ANEXO_IZAJE_CAMPOS, permit.anexoIzaje.identificacionPeligros || {}, 'ANEXO 4 - IZAJE DE CARGAS');
    }
    // ✅ ANEXO 5: EXCAVACIONES
    if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
        renderFieldsTable(ANEXO_EXCAVACION_CAMPOS, permit.anexoExcavaciones.identificacionPeligros || {}, 'ANEXO 5 - EXCAVACIONES');
    }
    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for(let i = 1; i <= totalPages; i++){
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 8, {
            align: 'center'
        });
    }
    doc.save(`Permiso_Italcol_${permit.number || permit.id.substring(0, 6)}.pdf`);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Textarea": (()=>Textarea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
});
_c1 = Textarea;
Textarea.displayName = 'Textarea';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/table.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Table": (()=>Table),
    "TableBody": (()=>TableBody),
    "TableCaption": (()=>TableCaption),
    "TableCell": (()=>TableCell),
    "TableFooter": (()=>TableFooter),
    "TableHead": (()=>TableHead),
    "TableHeader": (()=>TableHeader),
    "TableRow": (()=>TableRow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Table = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full overflow-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Table;
Table.displayName = "Table";
const TableHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr]:border-b", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, this));
_c3 = TableHeader;
TableHeader.displayName = "TableHeader";
const TableBody = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 31,
        columnNumber: 3
    }, this));
_c5 = TableBody;
TableBody.displayName = "TableBody";
const TableFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 43,
        columnNumber: 3
    }, this));
_c7 = TableFooter;
TableFooter.displayName = "TableFooter";
const TableRow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 58,
        columnNumber: 3
    }, this));
_c9 = TableRow;
TableRow.displayName = "TableRow";
const TableHead = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, this));
_c11 = TableHead;
TableHead.displayName = "TableHead";
const TableCell = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c12 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 88,
        columnNumber: 3
    }, this));
_c13 = TableCell;
TableCell.displayName = "TableCell";
const TableCaption = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c14 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, this));
_c15 = TableCaption;
TableCaption.displayName = "TableCaption";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15;
__turbopack_context__.k.register(_c, "Table$React.forwardRef");
__turbopack_context__.k.register(_c1, "Table");
__turbopack_context__.k.register(_c2, "TableHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "TableHeader");
__turbopack_context__.k.register(_c4, "TableBody$React.forwardRef");
__turbopack_context__.k.register(_c5, "TableBody");
__turbopack_context__.k.register(_c6, "TableFooter$React.forwardRef");
__turbopack_context__.k.register(_c7, "TableFooter");
__turbopack_context__.k.register(_c8, "TableRow$React.forwardRef");
__turbopack_context__.k.register(_c9, "TableRow");
__turbopack_context__.k.register(_c10, "TableHead$React.forwardRef");
__turbopack_context__.k.register(_c11, "TableHead");
__turbopack_context__.k.register(_c12, "TableCell$React.forwardRef");
__turbopack_context__.k.register(_c13, "TableCell");
__turbopack_context__.k.register(_c14, "TableCaption$React.forwardRef");
__turbopack_context__.k.register(_c15, "TableCaption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/data:c170ca [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"781989bbf1abdbb3494a694642b5be6d13b65904d2":"addWorkerSignature"},"src/app/permits/actions.ts",""] */ __turbopack_context__.s({
    "addWorkerSignature": (()=>addWorkerSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var addWorkerSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("781989bbf1abdbb3494a694642b5be6d13b65904d2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addWorkerSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBhZG1pbkRiLCBpc0FkbWluUmVhZHkgfSBmcm9tICdAL2xpYi9maXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBQZXJtaXQsIEV4dGVybmFsV29ya2VyLCBQZXJtaXRTdGF0dXMsIFBlcm1pdENsb3N1cmUsIEFwcHJvdmFsLCBVc2VyUm9sZSwgQW5leG9BbHR1cmEsIEFuZXhvQ29uZmluYWRvLCBBbmV4b0VuZXJnaWFzLCBBbmV4b0V4Y2F2YWNpb25lcywgQW5leG9JemFqZSwgQW5leG9BVFMsIFBlcm1pdEdlbmVyYWxJbmZvLCBKdXN0aWZpY2FjaW9uQVRTLCBWYWxpZGFjaW9uRGlhcmlhLCBVc2VyLCBOb3RpZmljYXRpb24gfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUsIFVwZGF0ZURhdGEsIFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24gfSBmcm9tICdAL2xpYi9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IGdldEVtYWlsRm9yVXNlciwgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsIH0gZnJvbSAnQC9saWIvZW1haWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG4vLyAtLS0gRnVuY2lvbmVzIEF1eGlsaWFyZXMgcGFyYSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3QgZ2V0SW52b2x2ZWRVc2VycyA9IGFzeW5jIChwZXJtaXQ6IFBlcm1pdCk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgY29uc3QgdXNlcklkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIC8vIDEuIENyZWFkb3IgZGVsIHBlcm1pc29cbiAgaWYgKHBlcm1pdC5jcmVhdGVkQnkpIHtcbiAgICB1c2VySWRzLmFkZChwZXJtaXQuY3JlYXRlZEJ5KTtcbiAgfVxuXG4gIC8vIDIuIFVzdWFyaW9zIHF1ZSBoYW4gZmlybWFkb1xuICBPYmplY3QudmFsdWVzKHBlcm1pdC5hcHByb3ZhbHMgfHwge30pLmZvckVhY2goYXBwcm92YWwgPT4ge1xuICAgIGlmIChhcHByb3ZhbCAmJiBhcHByb3ZhbC51c2VySWQpIHtcbiAgICAgIHVzZXJJZHMuYWRkKGFwcHJvdmFsLnVzZXJJZCk7XG4gICAgfVxuICB9KTtcblxuICAvLyAzLiBSb2xlcyBhZG1pbmlzdHJhdGl2b3MgbyBkZSBzdXBlcnZpc2nDs24gcXVlIGRlYmVyw61hbiBzZXIgbm90aWZpY2Fkb3NcbiAgY29uc3QgYWRtaW5zUXVlcnkgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3VzZXJzJykud2hlcmUoJ3JvbGUnLCAnaW4nLCBbJ2FkbWluJywgJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCddKS5nZXQoKTtcbiAgYWRtaW5zUXVlcnkuZm9yRWFjaChkb2MgPT4gdXNlcklkcy5hZGQoZG9jLmlkKSk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odXNlcklkcyk7XG59O1xuXG5jb25zdCBjcmVhdGVOb3RpZmljYXRpb24gPSBhc3luYyAoXG4gIHVzZXJJZDogc3RyaW5nLFxuICBwZXJtaXQ6IFBlcm1pdCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICB0eXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSxcbiAgdHJpZ2dlcmVkQnk6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsIH1cbikgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb246IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnPiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB0cmlnZ2VyZWRCeSxcbiAgfTtcbiAgYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdub3RpZmljYXRpb25zJykuYWRkKG5vdGlmaWNhdGlvbiBhcyBhbnkpO1xuICBcbiAgLy8gRW52aWFyIGNvcnJlbyBlbGVjdHLDs25pY29cbiAgY29uc3QgdXNlckVtYWlsID0gYXdhaXQgZ2V0RW1haWxGb3JVc2VyKHVzZXJJZCk7XG4gIGlmICh1c2VyRW1haWwpIHtcbiAgICBhd2FpdCBzZW5kUGVybWl0VXBkYXRlRW1haWwoe1xuICAgICAgdG86IHVzZXJFbWFpbCxcbiAgICAgIHN1YmplY3Q6IGBBY3R1YWxpemFjacOzbiBlbiBQZXJtaXNvIFNHVEM6ICR7cGVybWl0Lm51bWJlciB8fCBwZXJtaXQuaWR9YCxcbiAgICAgIGh0bWw6IGA8cD4ke21lc3NhZ2V9PC9wPjxwPlB1ZWRlcyB2ZXIgbG9zIGRldGFsbGVzIGRlbCBwZXJtaXNvIGhhY2llbmRvIGNsaWMgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L3Blcm1pdHMvJHtwZXJtaXQuaWR9XCI+YXF1w608L2E+LjwvcD5gXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIC0tLSBGaW4gZGUgRnVuY2lvbmVzIGRlIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhcyc6ICdUcmFiYWpvIGVuIEFsdHVyYXMnLFxuICAnY29uZmluYWRvJzogJ0VzcGFjaW9zIENvbmZpbmFkb3MnLFxuICAnZW5lcmdpYSc6ICdDb250cm9sIGRlIEVuZXJnw61hcycsXG4gICdpemFqZSc6ICdJemFqZSBkZSBDYXJnYXMnLFxuICAnZXhjYXZhY2lvbic6ICdFeGNhdmFjaW9uZXMnLFxuICAnZ2VuZXJhbCc6ICdUcmFiYWpvIEdlbmVyYWwnXG59O1xuXG5jb25zdCBnZXRXb3JrVHlwZXNTdHJpbmcgPSAocGVybWl0OiBQYXJ0aWFsPFBlcm1pdD4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWxlY3RlZFR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAocGVybWl0LnRyYWJham9BbHR1cmFzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ1RyYWJham8gZW4gQWx0dXJhcycpO1xuICBpZiAocGVybWl0LmVzcGFjaW9zQ29uZmluYWRvcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFc3BhY2lvcyBDb25maW5hZG9zJyk7XG4gIGlmIChwZXJtaXQuY29udHJvbEVuZXJnaWEpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnRmlybWEgU1NUJyxcbn07XG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcicgfCAnYXBwcm92YWxzJyB8ICdjbG9zdXJlJz4gJiB7XG4gIHVzZXJJZDogc3RyaW5nO1xuICB1c2VyRGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJFbWFpbDogc3RyaW5nIHwgbnVsbDtcbiAgdXNlclBob3RvVVJMOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBlcm1pdChkYXRhOiBQZXJtaXRDcmVhdGVEYXRhKSB7XG4gIGlmICghZGF0YS51c2VySWQpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVc2VyIG5vdCBhdXRoZW50aWNhdGVkJyB9O1xuICB9XG4gICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnPiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gICAgdHJhYmFqb0FsdHVyYXM6IGRhdGEudHJhYmFqb0FsdHVyYXMgfHwgZmFsc2UsXG4gICAgaXNTU1RTaWduYXR1cmVSZXF1aXJlZDogZGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkIHx8IGZhbHNlLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICB0cmFiYWpvQWx0dXJhczogZGF0YS50cmFiYWpvQWx0dXJhcyB8fCBmYWxzZSxcbiAgICBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkOiBkYXRhLmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQgfHwgZmFsc2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoVGltZXN0YW1wID0geyAuLi5wZXJtaXRQYXlsb2FkLCBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwYXlsb2FkV2l0aFRpbWVzdGFtcCBhcyBhbnkpO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBpc1VwZGF0ZTogZmFsc2UgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIFtBY3Rpb25dIEVycm9yIGFsIGd1YXJkYXIgYm9ycmFkb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3Qgc2F2ZSBkcmFmdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nIFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNpZ25hdHVyZUFuZE5vdGlmeShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIHJvbGU6ICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcycgfCAnY2llcnJlX2F1dG9yaWRhZCcgfCAnY2llcnJlX3Jlc3BvbnNhYmxlJyB8ICdjYW5jZWxhY2lvbicsIFxuICBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLFxuICBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcsXG4gIHVzZXI6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsLCByb2xlPzogVXNlclJvbGUsIGVtcHJlc2E/OiBzdHJpbmcgfSxcbiAgY29tbWVudHM/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXVzZXIgfHwgIXVzZXIudWlkIHx8ICF1c2VyLnJvbGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXREb2NCZWZvcmUuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0QmVmb3JlRGF0YSA9IHBlcm1pdERvY0JlZm9yZS5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHt9O1xuXG4gICAgICAgIC8vIEzDs2dpY2EgcGFyYSBtYW5lamFyIGZpcm1hcyBkZSBjaWVycmUgeSBjYW5jZWxhY2nDs25cbiAgICAgICAgaWYgKHJvbGUuc3RhcnRzV2l0aCgnY2llcnJlXycpIHx8IHJvbGUgPT09ICdjYW5jZWxhY2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVSb2xlID0gcm9sZSA9PT0gJ2NpZXJyZV9hdXRvcmlkYWQnID8gJ2F1dG9yaWRhZCcgOiAocm9sZSA9PT0gJ2NpZXJyZV9yZXNwb25zYWJsZScgPyAncmVzcG9uc2FibGUnIDogJ2NhbmNlbGFkb1BvcicpO1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVBhdGggPSBgY2xvc3VyZS4ke2Nsb3N1cmVSb2xlfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ2xvc3VyZURhdGEgPSAocGVybWl0QmVmb3JlRGF0YS5jbG9zdXJlIGFzIGFueSk/LltjbG9zdXJlUm9sZV0gfHwge307XG5cbiAgICAgICAgICAgIHVwZGF0ZURhdGFbY2xvc3VyZVBhdGggYXMga2V5b2YgVXBkYXRlRGF0YTxQZXJtaXQ+XSA9IHtcbiAgICAgICAgICAgICAgICAuLi5leGlzdGluZ0Nsb3N1cmVEYXRhLFxuICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICBmZWNoYTogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5yYXpvbkNhbmNlbGFjaW9uJ10gPSBjb21tZW50cyB8fCAnTm8gZXNwZWNpZmljYWRvJztcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmNhbmNlbGFkbyddID0gJ3NpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g4pyFIFZBTElEQUNJw5NOIERFIFBFUk1JU09TIEFOVEVTIERFIEZJUk1BUlxuICAgICAgICAgICAgY29uc3QgY2FuU2lnbiA9IGF3YWl0IHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihwZXJtaXRJZCwgcm9sZSwgdXNlcik7XG4gICAgICAgICAgICBpZiAoIWNhblNpZ24uYWxsb3dlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogY2FuU2lnbi5yZWFzb24gfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxEYXRhOiBQYXJ0aWFsPEFwcHJvdmFsPiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHJvYmFkbycsXG4gICAgICAgICAgICAgICAgZmlybWFBcGVydHVyYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIudWlkLFxuICAgICAgICAgICAgICAgIHNpZ25lZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIGFueSxcbiAgICAgICAgICAgICAgICB1c2VyUm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIHVzZXJFbXByZXNhOiB1c2VyLmVtcHJlc2EgfHwgJ04vQScsXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbW1lbnRzIHx8ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2BhcHByb3ZhbHMuJHtyb2xlfWBdID0gYXBwcm92YWxEYXRhO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyDinIUgTMOTR0lDQSBERSBGSVJNQVMgU0VHw5pOIEVMIFJPTFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBcbiAgICAgICAgICAgICAgICAgICAgZGlhOiAxLCBcbiAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB1c2VyLmRpc3BsYXlOYW1lIHx8ICcnLCBcbiAgICAgICAgICAgICAgICAgICAgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIFxuICAgICAgICAgICAgICAgICAgICBmZWNoYTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g4pyFIFNPTElDSVRBTlRFIEZJUk1BOiBDYW1iaWEgZGUgQm9ycmFkb3IgYSBQZW5kaWVudGUgZGUgUmV2aXNpw7NuXG4gICAgICAgICAgICAgICAgaWYgKHJvbGUgPT09ICdzb2xpY2l0YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGEuc3RhdHVzID09PSAnYm9ycmFkb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke3Blcm1pdElkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydudW1iZXInXSA9IHBlcm1pdE51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ3BlbmRpZW50ZV9yZXZpc2lvbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYWNpw7NuIGRpYXJpYSBpbmljaWFsIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VmFsaWRhdGlvbnNbMF0/LmZpcm1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhW2Ake2FuZXhvfS52YWxpZGFjaW9uLnJlc3BvbnNhYmxlYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIOKchSBBVVRPUklaQU5URSBGSVJNQTogQWdyZWdhIHZhbGlkYWNpw7NuIGRpYXJpYSBkZSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09ICdhdXRvcml6YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0E6IMK/VG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXM/XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkUGVybWl0RGF0YSA9IHsgXG4gICAgICAgICAgICAgICAgLi4ucGVybWl0QmVmb3JlRGF0YSwgXG4gICAgICAgICAgICAgICAgYXBwcm92YWxzOiB7IC4uLnBlcm1pdEJlZm9yZURhdGEuYXBwcm92YWxzLCBbcm9sZV06IGFwcHJvdmFsRGF0YSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXdhaXQgY2hlY2tBbGxSZXF1aXJlZFNpZ25hdHVyZXNDb21wbGV0ZSh1cGRhdGVkUGVybWl0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyDwn5qAIENBTUJJTyBBVVRPTcOBVElDTyBERSBQRU5ESUVOVEVfUkVWSVNJT04g4oaSIEVOX0VKRUNVQ0lPTlxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ3BlbmRpZW50ZV9yZXZpc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlLnJlcGxhY2UoJ18nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGZpcm1hZG8gZWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGNvbW8gJHtzaWduYXR1cmVSb2xlTmFtZX0uYDtcbiAgICAgICAgY29uc3QgaW52b2x2ZWRVc2VycyA9IGF3YWl0IGdldEludm9sdmVkVXNlcnModXBkYXRlZFBlcm1pdERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgIGlmICh1aWQgIT09IHVzZXIudWlkKSB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3NpZ25hdHVyZScsIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE5PVElGSUNBQ0nDk04gRVNQRUNJQUwgU0kgRUwgUEVSTUlTTyBQQVPDkyBBVVRPTcOBVElDQU1FTlRFIEEgRU5fRUpFQ1VDSU9OXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvbk1lc3NhZ2UgPSBgRWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGhhIGNvbXBsZXRhZG8gdG9kYXMgbGFzIGFwcm9iYWNpb25lcyByZXF1ZXJpZGFzIHkgYWhvcmEgZXN0w6EgRU4gRUpFQ1VDScOTTi5gO1xuICAgICAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgZXhlY3V0aW9uTWVzc2FnZSwgJ2FwcHJvdmFsJywgdXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vdGlmaWNhY2nDs24gV2hhdHNBcHBcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgICAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgICAgICBjb25zdCB3aGF0c2FwcE1zZyA9IGAqwqFQRVJNSVNPIEVOIEVKRUNVQ0nDk04hKiDinIVcblxu8J+ThCAqTsO6bWVybzoqICR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfVxu8J+TjSAqw4FyZWE6KiAke3Blcm1pdEJlZm9yZURhdGEuZ2VuZXJhbEluZm8/LmFyZWFFc3BlY2lmaWNhIHx8ICdOL0EnfVxu8J+boO+4jyAqVGlwbzoqICR7Z2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdEJlZm9yZURhdGEpfVxuXG7inIUgVG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGhhbiBzaWRvIGNvbXBsZXRhZGFzLlxuRWwgcGVybWlzbyBlc3TDoSBhaG9yYSBFTiBFSkVDVUNJw5NOLlxuXG5WZXIgZGV0YWxsZXM6ICR7cGVybWl0VXJsfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyDinIUgRlVOQ0nDk04gQ09SUkVHSURBOiBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQWxsUmVxdWlyZWRTaWduYXR1cmVzQ29tcGxldGUoXG4gIHBlcm1pdERhdGE6IFBlcm1pdFxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBhcHByb3ZhbHMgfSA9IHBlcm1pdERhdGE7XG4gICAgXG4gICAgLy8gRmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIFNJRU1QUkUgcmVxdWVyaWRhXG4gICAgaWYgKGFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIEZpcm1hIGRlbCBhdXRvcml6YW50ZSBlcyBTSUVNUFJFIHJlcXVlcmlkYVxuICAgIGlmIChhcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgdHJhYmFqb3MgZW4gYWx0dXJhcywgcmVxdWllcmUgZmlybWEgZGVsIGNvb3JkaW5hZG9yXG4gICAgaWYgKHBlcm1pdERhdGEudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0RGF0YS5zZWxlY3RlZFdvcmtUeXBlcz8uYWx0dXJhcykge1xuICAgICAgICBpZiAoYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgIGlmIChwZXJtaXREYXRhLmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/Lm1hbnRlbmltaWVudG8/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICBpZiAocGVybWl0RGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/LmxpZGVyX3NzdD8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgdHJhbnNpY2lvbmVzIGRlIGVzdGFkb1xuZnVuY3Rpb24gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24oY3VycmVudFN0YXR1czogUGVybWl0U3RhdHVzLCB0YXJnZXRTdGF0dXM6IFBlcm1pdFN0YXR1cywgdXNlclJvbGU6IFVzZXJSb2xlKTogeyBhbGxvd2VkOiBib29sZWFuLCByZWFzb24/OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgYWxsb3dlZFRyYW5zaXRpb25zOiBQYXJ0aWFsPFJlY29yZDxQZXJtaXRTdGF0dXMsIFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgVXNlclJvbGVbXT4+Pj4gPSB7XG4gICAgICAgICdib3JyYWRvcic6IHtcbiAgICAgICAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiBbJ3NvbGljaXRhbnRlJywgJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2F1dG9yaXphbnRlJywgJ2FkbWluJ10sXG4gICAgICAgICAgICAncmVjaGF6YWRvJzogWydhdXRvcml6YW50ZScsICdsaWRlcl9zc3QnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnZW5fZWplY3VjaW9uJzoge1xuICAgICAgICAgICAgJ3N1c3BlbmRpZG8nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2F1dG9yaXphbnRlJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3N1c3BlbmRpZG8nOiB7XG4gICAgICAgICAgICAnZW5fZWplY3VjaW9uJzogWydsaWRlcl9zc3QnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdjZXJyYWRvJzogWydsaWRlcl90YXJlYScsICdhdXRvcml6YW50ZScsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1hbnRlbmVyIGNvbXBhdGliaWxpZGFkIGNvbiBwZXJtaXNvcyBhbnRpZ3VvcyBxdWUgdGVuZ2FuIGVzdGFkbyBcImFwcm9iYWRvXCJcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGFsbG93ZWRSb2xlcyA9IGFsbG93ZWRUcmFuc2l0aW9uc1tjdXJyZW50U3RhdHVzXT8uW3RhcmdldFN0YXR1c107XG4gICAgaWYgKCFhbGxvd2VkUm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFRyYW5zaWNpw7NuIGRlICcke2N1cnJlbnRTdGF0dXN9JyBhICcke3RhcmdldFN0YXR1c30nIG5vIGVzdMOhIHBlcm1pdGlkYS5gIH07XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkUm9sZXMuaW5jbHVkZXModXNlclJvbGUpICYmIHVzZXJSb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBUdSByb2wgKCR7dXNlclJvbGV9KSBubyB0aWVuZSBwZXJtaXNvcyBwYXJhIGNhbWJpYXIgZWwgZXN0YWRvIGEgJyR7dGFyZ2V0U3RhdHVzfScuYCB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlIH0sXG4gIHJlYXNvbj86IHN0cmluZ1xuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhY3VycmVudFVzZXIudWlkIHx8ICFjdXJyZW50VXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgbyB1c3VhcmlvIHNpbiByb2wuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIFZhbGlkYXIgdHJhbnNpY2nDs24gZGUgZXN0YWRvXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihwZXJtaXREYXRhLnN0YXR1cywgc3RhdHVzLCBjdXJyZW50VXNlci5yb2xlKTtcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uLmFsbG93ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdHJhbnNpdGlvbi5yZWFzb24gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgLy8g4pyFIEd1YXJkYXIgcmF6w7NuIGRlIHJlY2hhem9cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE1hcmNhciBmZWNoYSBkZSBjaWVycmVcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmZlY2hhQ2llcnJlJ10gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS50ZXJtaW5hZG8nXSA9ICdzaSc7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHVwZGF0ZURhdGEpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IC4uLnBlcm1pdERhdGEsIC4uLnVwZGF0ZURhdGEsIGlkOiBwZXJtaXRJZCB9IGFzIFBlcm1pdDtcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIHB1ZXN0byBFTiBFSkVDVUNJw5NOIG1hbnVhbG1lbnRlLmA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdyZWplY3Rpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVjaGF6YWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgICAgICBpZiAocmVhc29uKSBtZXNzYWdlICs9IGAgTW90aXZvOiAke3JlYXNvbn1gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25UeXBlID0gJ2NhbmNlbGxhdGlvbic7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjZXJyYWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKHVwZGF0ZWRQZXJtaXREYXRhKTtcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgIGlmICh1aWQgIT09IGN1cnJlbnRVc2VyLnVpZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCBub3RpZmljYXRpb25UeXBlLCB0cmlnZ2VyZWRCeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1RDKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJyAmJiByZWFzb24pIHtcbiAgICAgICAgICBtZXNzYWdlQm9keSArPSBgXFxuXFxuKk1vdGl2byBkZWwgcmVjaGF6bzoqICR7cmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgICAgIFxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciB1cGRhdGluZyBwZXJtaXQgc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3QgdXBkYXRlIHBlcm1pdCBzdGF0dXMuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSBwZXJtaXNvcyBkZSBmaXJtYSBjb24gb3JkZW4gamVyw6FycXVpY29cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gRGViZSBoYWJlciB0cmFiYWpvIGVuIGFsdHVyYXNcbiAgICAgICAgICAgIGlmICghcGVybWl0LnRyYWJham9BbHR1cmFzICYmICFwZXJtaXQuc2VsZWN0ZWRXb3JrVHlwZXM/LmFsdHVyYXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRXN0YSBmaXJtYSBzb2xvIGFwbGljYSBwYXJhIHRyYWJham9zIGVuIGFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWFcbiAgICAgICAgICAgIGlmIChwZXJtaXQuY3JlYXRlZEJ5ICE9PSBjdXJyZW50VXNlci51aWQgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTb2xvIGVsIGNyZWFkb3IgZGVsIHBlcm1pc28gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnc29saWNpdGFudGUnOlxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBmaXJtYXIgY29tbyBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDinIUgU2kgaGF5IGFuZXhvIGRlIGFsdHVyYXMsIHZlcmlmaWNhciBmaXJtYSBkZWwgY29vcmRpbmFkb3IgcHJpbWVyb1xuICAgICAgICAgICAgaWYgKChwZXJtaXQudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzKSAmJiBcbiAgICAgICAgICAgICAgICBwZXJtaXQuYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgQ29vcmRpbmFkb3IgZGUgVHJhYmFqb3MgZW4gQWx0dXJhcy4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdhdXRvcml6YW50ZSc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2F1dG9yaXphbnRlJyAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1JvbCBkZSBhdXRvcml6YW50ZSByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NlIHJlcXVpZXJlIHByaW1lcm8gbGEgZmlybWEgZGVsIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ2xpZGVyX3NzdCc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2xpZGVyX3NzdCcgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTMOtZGVyIFNTVCByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIGVzIHJlcXVlcmlkYSBwYXJhIGVzdGUgcGVybWlzby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGVybWl0LmFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTZSByZXF1aWVyZSBwcmltZXJvIGxhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdtYW50ZW5pbWllbnRvJzpcbiAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ21hbnRlbmltaWVudG8nICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIE1hbnRlbmltaWVudG8gcmVxdWVyaWRvIHBhcmEgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBlcm1pdC5jb250cm9sRW5lcmdpYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdGaXJtYSBkZSBNYW50ZW5pbWllbnRvIHNvbG8gYXBsaWNhIGN1YW5kbyBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgYXV0b3JpemFudGUuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZERhaWx5VmFsaWRhdGlvblNpZ25hdHVyZShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIGFuZXhvTmFtZTogc3RyaW5nLCBcbiAgdmFsaWRhdGlvblR5cGU6ICdhdXRvcmlkYWQnIHwgJ3Jlc3BvbnNhYmxlJywgXG4gIGluZGV4OiBudW1iZXIsIFxuICBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhLCBcbiAgdXNlcjogVXNlclxuKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPCAwIHx8ICFkYXRhIHx8ICF1c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcy4nIH07XG4gIH1cblxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgfVxuICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXRTbmFwLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIGVqZWN1Y2nDs24gcGFyYSB2YWxpZGFjaW9uZXMgZGlhcmlhc1xuICAgIGlmICghWydlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIEVOIEVKRUNVQ0nDk04gbyBTVVNQRU5ESURPUy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgYW5leG9EYXRhID0gKHBlcm1pdERhdGEgYXMgYW55KVthbmV4b05hbWVdO1xuICAgIGlmICghYW5leG9EYXRhKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXhpc3RlIGVuIGVsIHBlcm1pc28uYCB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBhbmV4b1VwZGF0ZTogYW55ID0geyAuLi5hbmV4b0RhdGEgfTtcbiAgICBpZiAoIWFuZXhvVXBkYXRlLnZhbGlkYWNpb24pIHtcbiAgICAgICAgYW5leG9VcGRhdGUudmFsaWRhY2lvbiA9IHsgYXV0b3JpZGFkOiBbXSwgcmVzcG9uc2FibGU6IFtdIH07XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvVXBkYXRlLnZhbGlkYWNpb25bdmFsaWRhdGlvblR5cGVdIGFzIFZhbGlkYWNpb25EaWFyaWFbXSkgfHwgW107XG4gICAgXG4gICAgd2hpbGUgKHZhbGlkYXRpb25BcnJheS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdmFsaWRhdGlvbkFycmF5LnB1c2goeyBkaWE6IHZhbGlkYXRpb25BcnJheS5sZW5ndGggKyAxLCBub21icmU6ICcnLCBmZWNoYTogJycsIGZpcm1hOiAnJyB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0aW9uQXJyYXlbaW5kZXhdID0gZGF0YTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVQYXRoID0gYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YDtcbiAgICBcbiAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHtcbiAgICAgIFt1cGRhdGVQYXRoXTogdmFsaWRhdGlvbkFycmF5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB7IHVpZDogdXNlci51aWQsIGRpc3BsYXlOYW1lOiB1c2VyLmRpc3BsYXlOYW1lIHx8IG51bGwgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgY29uc3Qgd2hhdHNhcHBNZXNzYWdlID0gYCpWYWxpZGFjacOzbiBEaWFyaWEgLSBTR1RDKiDinI3vuI9cblNlIGhhIHJlZ2lzdHJhZG8gdW5hIG51ZXZhIGZpcm1hIGRlIHZhbGlkYWNpw7NuIGRpYXJpYS5cblxu8J+ThCAqUGVybWlzbzoqICR7ZnVsbFBlcm1pdERhdGEubnVtYmVyIHx8ICdOL0EnfVxu8J+Xk++4jyAqRMOtYToqICR7ZGF5fVxu8J+RpCAqRmlybWFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inIUgKlJvbDoqICR7dmFsaWRhdGlvblJvbGVOYW1lfVxu8J+TiyAqQW5leG86KiAke2FuZXhvRGlzcGxheU5hbWV9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1lc3NhZ2UpO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIENPUlJFQ0NJw5NOOiBWYWxpZGFjacOzbiBkZSBlc3RhZG8gY29ycmVnaWRhIHBhcmEgZmlybWEgZGUgYXBlcnR1cmFcbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyAmJiAhWydwZW5kaWVudGVfcmV2aXNpb24nLCAnYXByb2JhZG8nLCAnZW5fZWplY3VjaW9uJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBjdWFuZG8gZWwgcGVybWlzbyBlc3TDoSBwZW5kaWVudGUsIGFwcm9iYWRvIG8gZW4gZWplY3VjacOzbi4nIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUNpZXJyZScgJiYgIVsnZW5fZWplY3VjaW9uJywgJ3N1c3BlbmRpZG8nXS5pbmNsdWRlcyhwZXJtaXREYXRhLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1NvbG8gc2UgcHVlZGUgZmlybWFyIGNpZXJyZSBlbiBwZXJtaXNvcyBFTiBFSkVDVUNJw5NOIG8gU1VTUEVORElET1MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1NBMHdCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/components/WorkerSignatures.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WorkerSignatures": (()=>WorkerSignatures)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$c170ca__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/permits/data:c170ca [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signature.js [app-client] (ecmascript) <export default as Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function WorkerSignatures({ permit }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSigning, setIsSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signingInfo, setSigningInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleOpenSignatureModal = (type, index)=>{
        setSigningInfo({
            type,
            index
        });
        setIsSigning(true);
    };
    const handleSaveSignature = async (signatureDataUrl)=>{
        if (!signingInfo || !user) return;
        const { type, index } = signingInfo;
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$c170ca__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addWorkerSignature"])(permit.id, index, type, signatureDataUrl);
        if (result.success) {
            toast({
                title: 'Firma de Trabajador Guardada'
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error
            });
        }
        setIsSigning(false);
        setSigningInfo(null);
    };
    const workers = permit.workers || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {}, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                            lineNumber: 60,
                            columnNumber: 56
                        }, this),
                        " Firmas del Personal Ejecutante"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                            lineNumber: 67,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Cédula"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                            lineNumber: 68,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Firma Apertura"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                            lineNumber: 69,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Firma Cierre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                            lineNumber: 70,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                    lineNumber: 66,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                lineNumber: 65,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: workers.length > 0 ? workers.map((worker, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: worker.nombre
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                lineNumber: 76,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: worker.cedula
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                lineNumber: 77,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: worker.firmaApertura ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: worker.firmaApertura,
                                                        alt: "Firma",
                                                        width: 80,
                                                        height: 40,
                                                        className: "bg-white border rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 30
                                                }, this) : permit.status === 'pendiente_revision' || permit.status === 'aprobado' || permit.status === 'en_ejecucion' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ()=>handleOpenSignatureModal('firmaApertura', index),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                            className: "mr-2 h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 33
                                                        }, this),
                                                        " Firmar Apertura"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 32
                                                }, this) : null
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                lineNumber: 78,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: worker.firmaCierre ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: worker.firmaCierre,
                                                        alt: "Firma",
                                                        width: 80,
                                                        height: 40,
                                                        className: "bg-white border rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 30
                                                }, this) : permit.status === 'en_ejecucion' || permit.status === 'suspendido' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ()=>handleOpenSignatureModal('firmaCierre', index),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "mr-2 h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 33
                                                        }, this),
                                                        " Firmar Cierre"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 32
                                                }, this) : null
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                                lineNumber: 91,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                        lineNumber: 75,
                                        columnNumber: 21
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                        colSpan: 4,
                                        className: "h-24 text-center",
                                        children: "No se registraron trabajadores para este permiso."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                        lineNumber: 107,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                    lineNumber: 106,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                lineNumber: 73,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isSigning,
                onOpenChange: setIsSigning,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Realizar Firma de Trabajador"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                                lineNumber: 118,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                    lineNumber: 117,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/permits/[id]/components/WorkerSignatures.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(WorkerSignatures, "NjcYenaucIEKKUuw6EaDY1dpcjI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = WorkerSignatures;
var _c;
__turbopack_context__.k.register(_c, "WorkerSignatures");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/data:b010dd [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7ee51c730edafe5468260c5b893cbe9ad45d12a24b":"addDailyValidationSignature"},"src/app/permits/actions.ts",""] */ __turbopack_context__.s({
    "addDailyValidationSignature": (()=>addDailyValidationSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var addDailyValidationSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7ee51c730edafe5468260c5b893cbe9ad45d12a24b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addDailyValidationSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBhZG1pbkRiLCBpc0FkbWluUmVhZHkgfSBmcm9tICdAL2xpYi9maXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnO1xuaW1wb3J0IHR5cGUgeyBQZXJtaXQsIEV4dGVybmFsV29ya2VyLCBQZXJtaXRTdGF0dXMsIFBlcm1pdENsb3N1cmUsIEFwcHJvdmFsLCBVc2VyUm9sZSwgQW5leG9BbHR1cmEsIEFuZXhvQ29uZmluYWRvLCBBbmV4b0VuZXJnaWFzLCBBbmV4b0V4Y2F2YWNpb25lcywgQW5leG9JemFqZSwgQW5leG9BVFMsIFBlcm1pdEdlbmVyYWxJbmZvLCBKdXN0aWZpY2FjaW9uQVRTLCBWYWxpZGFjaW9uRGlhcmlhLCBVc2VyLCBOb3RpZmljYXRpb24gfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUsIFVwZGF0ZURhdGEsIFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlLWFkbWluL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24gfSBmcm9tICdAL2xpYi9ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IGdldEVtYWlsRm9yVXNlciwgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsIH0gZnJvbSAnQC9saWIvZW1haWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG4vLyAtLS0gRnVuY2lvbmVzIEF1eGlsaWFyZXMgcGFyYSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3QgZ2V0SW52b2x2ZWRVc2VycyA9IGFzeW5jIChwZXJtaXQ6IFBlcm1pdCk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgY29uc3QgdXNlcklkcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIC8vIDEuIENyZWFkb3IgZGVsIHBlcm1pc29cbiAgaWYgKHBlcm1pdC5jcmVhdGVkQnkpIHtcbiAgICB1c2VySWRzLmFkZChwZXJtaXQuY3JlYXRlZEJ5KTtcbiAgfVxuXG4gIC8vIDIuIFVzdWFyaW9zIHF1ZSBoYW4gZmlybWFkb1xuICBPYmplY3QudmFsdWVzKHBlcm1pdC5hcHByb3ZhbHMgfHwge30pLmZvckVhY2goYXBwcm92YWwgPT4ge1xuICAgIGlmIChhcHByb3ZhbCAmJiBhcHByb3ZhbC51c2VySWQpIHtcbiAgICAgIHVzZXJJZHMuYWRkKGFwcHJvdmFsLnVzZXJJZCk7XG4gICAgfVxuICB9KTtcblxuICAvLyAzLiBSb2xlcyBhZG1pbmlzdHJhdGl2b3MgbyBkZSBzdXBlcnZpc2nDs24gcXVlIGRlYmVyw61hbiBzZXIgbm90aWZpY2Fkb3NcbiAgY29uc3QgYWRtaW5zUXVlcnkgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3VzZXJzJykud2hlcmUoJ3JvbGUnLCAnaW4nLCBbJ2FkbWluJywgJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCddKS5nZXQoKTtcbiAgYWRtaW5zUXVlcnkuZm9yRWFjaChkb2MgPT4gdXNlcklkcy5hZGQoZG9jLmlkKSk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20odXNlcklkcyk7XG59O1xuXG5jb25zdCBjcmVhdGVOb3RpZmljYXRpb24gPSBhc3luYyAoXG4gIHVzZXJJZDogc3RyaW5nLFxuICBwZXJtaXQ6IFBlcm1pdCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICB0eXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSxcbiAgdHJpZ2dlcmVkQnk6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsIH1cbikgPT4ge1xuICBjb25zdCBub3RpZmljYXRpb246IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnPiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB0cmlnZ2VyZWRCeSxcbiAgfTtcbiAgYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdub3RpZmljYXRpb25zJykuYWRkKG5vdGlmaWNhdGlvbiBhcyBhbnkpO1xuICBcbiAgLy8gRW52aWFyIGNvcnJlbyBlbGVjdHLDs25pY29cbiAgY29uc3QgdXNlckVtYWlsID0gYXdhaXQgZ2V0RW1haWxGb3JVc2VyKHVzZXJJZCk7XG4gIGlmICh1c2VyRW1haWwpIHtcbiAgICBhd2FpdCBzZW5kUGVybWl0VXBkYXRlRW1haWwoe1xuICAgICAgdG86IHVzZXJFbWFpbCxcbiAgICAgIHN1YmplY3Q6IGBBY3R1YWxpemFjacOzbiBlbiBQZXJtaXNvIFNHVEM6ICR7cGVybWl0Lm51bWJlciB8fCBwZXJtaXQuaWR9YCxcbiAgICAgIGh0bWw6IGA8cD4ke21lc3NhZ2V9PC9wPjxwPlB1ZWRlcyB2ZXIgbG9zIGRldGFsbGVzIGRlbCBwZXJtaXNvIGhhY2llbmRvIGNsaWMgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L3Blcm1pdHMvJHtwZXJtaXQuaWR9XCI+YXF1w608L2E+LjwvcD5gXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIC0tLSBGaW4gZGUgRnVuY2lvbmVzIGRlIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhcyc6ICdUcmFiYWpvIGVuIEFsdHVyYXMnLFxuICAnY29uZmluYWRvJzogJ0VzcGFjaW9zIENvbmZpbmFkb3MnLFxuICAnZW5lcmdpYSc6ICdDb250cm9sIGRlIEVuZXJnw61hcycsXG4gICdpemFqZSc6ICdJemFqZSBkZSBDYXJnYXMnLFxuICAnZXhjYXZhY2lvbic6ICdFeGNhdmFjaW9uZXMnLFxuICAnZ2VuZXJhbCc6ICdUcmFiYWpvIEdlbmVyYWwnXG59O1xuXG5jb25zdCBnZXRXb3JrVHlwZXNTdHJpbmcgPSAocGVybWl0OiBQYXJ0aWFsPFBlcm1pdD4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWxlY3RlZFR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAocGVybWl0LnRyYWJham9BbHR1cmFzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ1RyYWJham8gZW4gQWx0dXJhcycpO1xuICBpZiAocGVybWl0LmVzcGFjaW9zQ29uZmluYWRvcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFc3BhY2lvcyBDb25maW5hZG9zJyk7XG4gIGlmIChwZXJtaXQuY29udHJvbEVuZXJnaWEpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnRmlybWEgU1NUJyxcbn07XG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcicgfCAnYXBwcm92YWxzJyB8ICdjbG9zdXJlJz4gJiB7XG4gIHVzZXJJZDogc3RyaW5nO1xuICB1c2VyRGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJFbWFpbDogc3RyaW5nIHwgbnVsbDtcbiAgdXNlclBob3RvVVJMOiBzdHJpbmcgfCBudWxsO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBlcm1pdChkYXRhOiBQZXJtaXRDcmVhdGVEYXRhKSB7XG4gIGlmICghZGF0YS51c2VySWQpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVc2VyIG5vdCBhdXRoZW50aWNhdGVkJyB9O1xuICB9XG4gICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnPiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIFRpbWVzdGFtcCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gICAgdHJhYmFqb0FsdHVyYXM6IGRhdGEudHJhYmFqb0FsdHVyYXMgfHwgZmFsc2UsXG4gICAgaXNTU1RTaWduYXR1cmVSZXF1aXJlZDogZGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkIHx8IGZhbHNlLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICB0cmFiYWpvQWx0dXJhczogZGF0YS50cmFiYWpvQWx0dXJhcyB8fCBmYWxzZSxcbiAgICBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkOiBkYXRhLmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQgfHwgZmFsc2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoVGltZXN0YW1wID0geyAuLi5wZXJtaXRQYXlsb2FkLCBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwYXlsb2FkV2l0aFRpbWVzdGFtcCBhcyBhbnkpO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBpc1VwZGF0ZTogZmFsc2UgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIFtBY3Rpb25dIEVycm9yIGFsIGd1YXJkYXIgYm9ycmFkb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3Qgc2F2ZSBkcmFmdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nIFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNpZ25hdHVyZUFuZE5vdGlmeShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIHJvbGU6ICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcycgfCAnY2llcnJlX2F1dG9yaWRhZCcgfCAnY2llcnJlX3Jlc3BvbnNhYmxlJyB8ICdjYW5jZWxhY2lvbicsIFxuICBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLFxuICBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcsXG4gIHVzZXI6IHsgdWlkOiBzdHJpbmcsIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsLCByb2xlPzogVXNlclJvbGUsIGVtcHJlc2E/OiBzdHJpbmcgfSxcbiAgY29tbWVudHM/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXVzZXIgfHwgIXVzZXIudWlkIHx8ICF1c2VyLnJvbGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXREb2NCZWZvcmUuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0QmVmb3JlRGF0YSA9IHBlcm1pdERvY0JlZm9yZS5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHt9O1xuXG4gICAgICAgIC8vIEzDs2dpY2EgcGFyYSBtYW5lamFyIGZpcm1hcyBkZSBjaWVycmUgeSBjYW5jZWxhY2nDs25cbiAgICAgICAgaWYgKHJvbGUuc3RhcnRzV2l0aCgnY2llcnJlXycpIHx8IHJvbGUgPT09ICdjYW5jZWxhY2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVSb2xlID0gcm9sZSA9PT0gJ2NpZXJyZV9hdXRvcmlkYWQnID8gJ2F1dG9yaWRhZCcgOiAocm9sZSA9PT0gJ2NpZXJyZV9yZXNwb25zYWJsZScgPyAncmVzcG9uc2FibGUnIDogJ2NhbmNlbGFkb1BvcicpO1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVBhdGggPSBgY2xvc3VyZS4ke2Nsb3N1cmVSb2xlfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQ2xvc3VyZURhdGEgPSAocGVybWl0QmVmb3JlRGF0YS5jbG9zdXJlIGFzIGFueSk/LltjbG9zdXJlUm9sZV0gfHwge307XG5cbiAgICAgICAgICAgIHVwZGF0ZURhdGFbY2xvc3VyZVBhdGggYXMga2V5b2YgVXBkYXRlRGF0YTxQZXJtaXQ+XSA9IHtcbiAgICAgICAgICAgICAgICAuLi5leGlzdGluZ0Nsb3N1cmVEYXRhLFxuICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICBmZWNoYTogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5yYXpvbkNhbmNlbGFjaW9uJ10gPSBjb21tZW50cyB8fCAnTm8gZXNwZWNpZmljYWRvJztcbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmNhbmNlbGFkbyddID0gJ3NpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g4pyFIFZBTElEQUNJw5NOIERFIFBFUk1JU09TIEFOVEVTIERFIEZJUk1BUlxuICAgICAgICAgICAgY29uc3QgY2FuU2lnbiA9IGF3YWl0IHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihwZXJtaXRJZCwgcm9sZSwgdXNlcik7XG4gICAgICAgICAgICBpZiAoIWNhblNpZ24uYWxsb3dlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogY2FuU2lnbi5yZWFzb24gfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxEYXRhOiBQYXJ0aWFsPEFwcHJvdmFsPiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdhcHJvYmFkbycsXG4gICAgICAgICAgICAgICAgZmlybWFBcGVydHVyYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIudWlkLFxuICAgICAgICAgICAgICAgIHNpZ25lZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpIGFzIGFueSxcbiAgICAgICAgICAgICAgICB1c2VyUm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgIHVzZXJFbXByZXNhOiB1c2VyLmVtcHJlc2EgfHwgJ04vQScsXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IGNvbW1lbnRzIHx8ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2BhcHByb3ZhbHMuJHtyb2xlfWBdID0gYXBwcm92YWxEYXRhO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyDinIUgTMOTR0lDQSBERSBGSVJNQVMgU0VHw5pOIEVMIFJPTFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBcbiAgICAgICAgICAgICAgICAgICAgZGlhOiAxLCBcbiAgICAgICAgICAgICAgICAgICAgbm9tYnJlOiB1c2VyLmRpc3BsYXlOYW1lIHx8ICcnLCBcbiAgICAgICAgICAgICAgICAgICAgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIFxuICAgICAgICAgICAgICAgICAgICBmZWNoYTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g4pyFIFNPTElDSVRBTlRFIEZJUk1BOiBDYW1iaWEgZGUgQm9ycmFkb3IgYSBQZW5kaWVudGUgZGUgUmV2aXNpw7NuXG4gICAgICAgICAgICAgICAgaWYgKHJvbGUgPT09ICdzb2xpY2l0YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGEuc3RhdHVzID09PSAnYm9ycmFkb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke3Blcm1pdElkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydudW1iZXInXSA9IHBlcm1pdE51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ3BlbmRpZW50ZV9yZXZpc2lvbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYWNpw7NuIGRpYXJpYSBpbmljaWFsIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VmFsaWRhdGlvbnNbMF0/LmZpcm1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhW2Ake2FuZXhvfS52YWxpZGFjaW9uLnJlc3BvbnNhYmxlYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIOKchSBBVVRPUklaQU5URSBGSVJNQTogQWdyZWdhIHZhbGlkYWNpw7NuIGRpYXJpYSBkZSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvbGUgPT09ICdhdXRvcml6YW50ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0E6IMK/VG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXM/XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkUGVybWl0RGF0YSA9IHsgXG4gICAgICAgICAgICAgICAgLi4ucGVybWl0QmVmb3JlRGF0YSwgXG4gICAgICAgICAgICAgICAgYXBwcm92YWxzOiB7IC4uLnBlcm1pdEJlZm9yZURhdGEuYXBwcm92YWxzLCBbcm9sZV06IGFwcHJvdmFsRGF0YSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXdhaXQgY2hlY2tBbGxSZXF1aXJlZFNpZ25hdHVyZXNDb21wbGV0ZSh1cGRhdGVkUGVybWl0RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyDwn5qAIENBTUJJTyBBVVRPTcOBVElDTyBERSBQRU5ESUVOVEVfUkVWSVNJT04g4oaSIEVOX0VKRUNVQ0lPTlxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ3BlbmRpZW50ZV9yZXZpc2lvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlLnJlcGxhY2UoJ18nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGZpcm1hZG8gZWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGNvbW8gJHtzaWduYXR1cmVSb2xlTmFtZX0uYDtcbiAgICAgICAgY29uc3QgaW52b2x2ZWRVc2VycyA9IGF3YWl0IGdldEludm9sdmVkVXNlcnModXBkYXRlZFBlcm1pdERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgIGlmICh1aWQgIT09IHVzZXIudWlkKSB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3NpZ25hdHVyZScsIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE5PVElGSUNBQ0nDk04gRVNQRUNJQUwgU0kgRUwgUEVSTUlTTyBQQVPDkyBBVVRPTcOBVElDQU1FTlRFIEEgRU5fRUpFQ1VDSU9OXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4ZWN1dGlvbk1lc3NhZ2UgPSBgRWwgcGVybWlzbyAjJHt1cGRhdGVkUGVybWl0RGF0YS5udW1iZXJ9IGhhIGNvbXBsZXRhZG8gdG9kYXMgbGFzIGFwcm9iYWNpb25lcyByZXF1ZXJpZGFzIHkgYWhvcmEgZXN0w6EgRU4gRUpFQ1VDScOTTi5gO1xuICAgICAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgZXhlY3V0aW9uTWVzc2FnZSwgJ2FwcHJvdmFsJywgdXNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vdGlmaWNhY2nDs24gV2hhdHNBcHBcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgICAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgICAgICBjb25zdCB3aGF0c2FwcE1zZyA9IGAqwqFQRVJNSVNPIEVOIEVKRUNVQ0nDk04hKiDinIVcblxu8J+ThCAqTsO6bWVybzoqICR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfVxu8J+TjSAqw4FyZWE6KiAke3Blcm1pdEJlZm9yZURhdGEuZ2VuZXJhbEluZm8/LmFyZWFFc3BlY2lmaWNhIHx8ICdOL0EnfVxu8J+boO+4jyAqVGlwbzoqICR7Z2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdEJlZm9yZURhdGEpfVxuXG7inIUgVG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGhhbiBzaWRvIGNvbXBsZXRhZGFzLlxuRWwgcGVybWlzbyBlc3TDoSBhaG9yYSBFTiBFSkVDVUNJw5NOLlxuXG5WZXIgZGV0YWxsZXM6ICR7cGVybWl0VXJsfWA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyDinIUgRlVOQ0nDk04gQ09SUkVHSURBOiBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQWxsUmVxdWlyZWRTaWduYXR1cmVzQ29tcGxldGUoXG4gIHBlcm1pdERhdGE6IFBlcm1pdFxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBhcHByb3ZhbHMgfSA9IHBlcm1pdERhdGE7XG4gICAgXG4gICAgLy8gRmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIFNJRU1QUkUgcmVxdWVyaWRhXG4gICAgaWYgKGFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIEZpcm1hIGRlbCBhdXRvcml6YW50ZSBlcyBTSUVNUFJFIHJlcXVlcmlkYVxuICAgIGlmIChhcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgdHJhYmFqb3MgZW4gYWx0dXJhcywgcmVxdWllcmUgZmlybWEgZGVsIGNvb3JkaW5hZG9yXG4gICAgaWYgKHBlcm1pdERhdGEudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0RGF0YS5zZWxlY3RlZFdvcmtUeXBlcz8uYWx0dXJhcykge1xuICAgICAgICBpZiAoYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgIGlmIChwZXJtaXREYXRhLmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/Lm1hbnRlbmltaWVudG8/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICBpZiAocGVybWl0RGF0YS5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkKSB7XG4gICAgICAgIGlmIChhcHByb3ZhbHM/LmxpZGVyX3NzdD8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgdHJhbnNpY2lvbmVzIGRlIGVzdGFkb1xuZnVuY3Rpb24gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24oY3VycmVudFN0YXR1czogUGVybWl0U3RhdHVzLCB0YXJnZXRTdGF0dXM6IFBlcm1pdFN0YXR1cywgdXNlclJvbGU6IFVzZXJSb2xlKTogeyBhbGxvd2VkOiBib29sZWFuLCByZWFzb24/OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgYWxsb3dlZFRyYW5zaXRpb25zOiBQYXJ0aWFsPFJlY29yZDxQZXJtaXRTdGF0dXMsIFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgVXNlclJvbGVbXT4+Pj4gPSB7XG4gICAgICAgICdib3JyYWRvcic6IHtcbiAgICAgICAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiBbJ3NvbGljaXRhbnRlJywgJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2F1dG9yaXphbnRlJywgJ2FkbWluJ10sXG4gICAgICAgICAgICAncmVjaGF6YWRvJzogWydhdXRvcml6YW50ZScsICdsaWRlcl9zc3QnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnZW5fZWplY3VjaW9uJzoge1xuICAgICAgICAgICAgJ3N1c3BlbmRpZG8nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2F1dG9yaXphbnRlJywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3N1c3BlbmRpZG8nOiB7XG4gICAgICAgICAgICAnZW5fZWplY3VjaW9uJzogWydsaWRlcl9zc3QnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdjZXJyYWRvJzogWydsaWRlcl90YXJlYScsICdhdXRvcml6YW50ZScsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1hbnRlbmVyIGNvbXBhdGliaWxpZGFkIGNvbiBwZXJtaXNvcyBhbnRpZ3VvcyBxdWUgdGVuZ2FuIGVzdGFkbyBcImFwcm9iYWRvXCJcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGFsbG93ZWRSb2xlcyA9IGFsbG93ZWRUcmFuc2l0aW9uc1tjdXJyZW50U3RhdHVzXT8uW3RhcmdldFN0YXR1c107XG4gICAgaWYgKCFhbGxvd2VkUm9sZXMpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFRyYW5zaWNpw7NuIGRlICcke2N1cnJlbnRTdGF0dXN9JyBhICcke3RhcmdldFN0YXR1c30nIG5vIGVzdMOhIHBlcm1pdGlkYS5gIH07XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkUm9sZXMuaW5jbHVkZXModXNlclJvbGUpICYmIHVzZXJSb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBUdSByb2wgKCR7dXNlclJvbGV9KSBubyB0aWVuZSBwZXJtaXNvcyBwYXJhIGNhbWJpYXIgZWwgZXN0YWRvIGEgJyR7dGFyZ2V0U3RhdHVzfScuYCB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlIH0sXG4gIHJlYXNvbj86IHN0cmluZ1xuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhY3VycmVudFVzZXIudWlkIHx8ICFjdXJyZW50VXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgbyB1c3VhcmlvIHNpbiByb2wuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIFZhbGlkYXIgdHJhbnNpY2nDs24gZGUgZXN0YWRvXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihwZXJtaXREYXRhLnN0YXR1cywgc3RhdHVzLCBjdXJyZW50VXNlci5yb2xlKTtcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uLmFsbG93ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdHJhbnNpdGlvbi5yZWFzb24gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IFVwZGF0ZURhdGE8UGVybWl0PiA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgLy8g4pyFIEd1YXJkYXIgcmF6w7NuIGRlIHJlY2hhem9cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g4pyFIE1hcmNhciBmZWNoYSBkZSBjaWVycmVcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhWydjbG9zdXJlLmZlY2hhQ2llcnJlJ10gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS50ZXJtaW5hZG8nXSA9ICdzaSc7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHVwZGF0ZURhdGEpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IC4uLnBlcm1pdERhdGEsIC4uLnVwZGF0ZURhdGEsIGlkOiBwZXJtaXRJZCB9IGFzIFBlcm1pdDtcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2VuX2VqZWN1Y2lvbicpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIHB1ZXN0byBFTiBFSkVDVUNJw5NOIG1hbnVhbG1lbnRlLmA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdyZWplY3Rpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVjaGF6YWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgICAgICBpZiAocmVhc29uKSBtZXNzYWdlICs9IGAgTW90aXZvOiAke3JlYXNvbn1gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2NlcnJhZG8nKSB7XG4gICAgICAgICAgICBub3RpZmljYXRpb25UeXBlID0gJ2NhbmNlbGxhdGlvbic7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjZXJyYWRvIGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9LmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKHVwZGF0ZWRQZXJtaXREYXRhKTtcbiAgICAgICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgICAgICAgIGlmICh1aWQgIT09IGN1cnJlbnRVc2VyLnVpZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCBub3RpZmljYXRpb25UeXBlLCB0cmlnZ2VyZWRCeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1RDKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVjaGF6YWRvJyAmJiByZWFzb24pIHtcbiAgICAgICAgICBtZXNzYWdlQm9keSArPSBgXFxuXFxuKk1vdGl2byBkZWwgcmVjaGF6bzoqICR7cmVhc29ufWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgICAgIFxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciB1cGRhdGluZyBwZXJtaXQgc3RhdHVzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdDb3VsZCBub3QgdXBkYXRlIHBlcm1pdCBzdGF0dXMuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSBwZXJtaXNvcyBkZSBmaXJtYSBjb24gb3JkZW4gamVyw6FycXVpY29cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gRGViZSBoYWJlciB0cmFiYWpvIGVuIGFsdHVyYXNcbiAgICAgICAgICAgIGlmICghcGVybWl0LnRyYWJham9BbHR1cmFzICYmICFwZXJtaXQuc2VsZWN0ZWRXb3JrVHlwZXM/LmFsdHVyYXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRXN0YSBmaXJtYSBzb2xvIGFwbGljYSBwYXJhIHRyYWJham9zIGVuIGFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWFcbiAgICAgICAgICAgIGlmIChwZXJtaXQuY3JlYXRlZEJ5ICE9PSBjdXJyZW50VXNlci51aWQgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTb2xvIGVsIGNyZWFkb3IgZGVsIHBlcm1pc28gcHVlZGUgZ2VzdGlvbmFyIGVzdGEgZmlybWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnc29saWNpdGFudGUnOlxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBmaXJtYXIgY29tbyBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDinIUgU2kgaGF5IGFuZXhvIGRlIGFsdHVyYXMsIHZlcmlmaWNhciBmaXJtYSBkZWwgY29vcmRpbmFkb3IgcHJpbWVyb1xuICAgICAgICAgICAgaWYgKChwZXJtaXQudHJhYmFqb0FsdHVyYXMgfHwgcGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzKSAmJiBcbiAgICAgICAgICAgICAgICBwZXJtaXQuYXBwcm92YWxzPy5jb29yZGluYWRvcl9hbHR1cmFzPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgQ29vcmRpbmFkb3IgZGUgVHJhYmFqb3MgZW4gQWx0dXJhcy4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdhdXRvcml6YW50ZSc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2F1dG9yaXphbnRlJyAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1JvbCBkZSBhdXRvcml6YW50ZSByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NlIHJlcXVpZXJlIHByaW1lcm8gbGEgZmlybWEgZGVsIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ2xpZGVyX3NzdCc6XG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ2xpZGVyX3NzdCcgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTMOtZGVyIFNTVCByZXF1ZXJpZG8gcGFyYSBlc3RhIGZpcm1hLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIGVzIHJlcXVlcmlkYSBwYXJhIGVzdGUgcGVybWlzby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGVybWl0LmFwcHJvdmFscz8uc29saWNpdGFudGU/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdTZSByZXF1aWVyZSBwcmltZXJvIGxhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdtYW50ZW5pbWllbnRvJzpcbiAgICAgICAgICAgICBpZiAoY3VycmVudFVzZXIucm9sZSAhPT0gJ21hbnRlbmltaWVudG8nICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIE1hbnRlbmltaWVudG8gcmVxdWVyaWRvIHBhcmEgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBlcm1pdC5jb250cm9sRW5lcmdpYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdGaXJtYSBkZSBNYW50ZW5pbWllbnRvIHNvbG8gYXBsaWNhIGN1YW5kbyBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU2UgcmVxdWllcmUgcHJpbWVybyBsYSBmaXJtYSBkZWwgYXV0b3JpemFudGUuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7IGFsbG93ZWQ6IHRydWUgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZERhaWx5VmFsaWRhdGlvblNpZ25hdHVyZShcbiAgcGVybWl0SWQ6IHN0cmluZywgXG4gIGFuZXhvTmFtZTogc3RyaW5nLCBcbiAgdmFsaWRhdGlvblR5cGU6ICdhdXRvcmlkYWQnIHwgJ3Jlc3BvbnNhYmxlJywgXG4gIGluZGV4OiBudW1iZXIsIFxuICBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhLCBcbiAgdXNlcjogVXNlclxuKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPCAwIHx8ICFkYXRhIHx8ICF1c2VyKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnUGFyw6FtZXRyb3MgaW52w6FsaWRvcy4nIH07XG4gIH1cblxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgfVxuICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXRTbmFwLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIGVqZWN1Y2nDs24gcGFyYSB2YWxpZGFjaW9uZXMgZGlhcmlhc1xuICAgIGlmICghWydlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIEVOIEVKRUNVQ0nDk04gbyBTVVNQRU5ESURPUy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgYW5leG9EYXRhID0gKHBlcm1pdERhdGEgYXMgYW55KVthbmV4b05hbWVdO1xuICAgIGlmICghYW5leG9EYXRhKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXhpc3RlIGVuIGVsIHBlcm1pc28uYCB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBhbmV4b1VwZGF0ZTogYW55ID0geyAuLi5hbmV4b0RhdGEgfTtcbiAgICBpZiAoIWFuZXhvVXBkYXRlLnZhbGlkYWNpb24pIHtcbiAgICAgICAgYW5leG9VcGRhdGUudmFsaWRhY2lvbiA9IHsgYXV0b3JpZGFkOiBbXSwgcmVzcG9uc2FibGU6IFtdIH07XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvVXBkYXRlLnZhbGlkYWNpb25bdmFsaWRhdGlvblR5cGVdIGFzIFZhbGlkYWNpb25EaWFyaWFbXSkgfHwgW107XG4gICAgXG4gICAgd2hpbGUgKHZhbGlkYXRpb25BcnJheS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgdmFsaWRhdGlvbkFycmF5LnB1c2goeyBkaWE6IHZhbGlkYXRpb25BcnJheS5sZW5ndGggKyAxLCBub21icmU6ICcnLCBmZWNoYTogJycsIGZpcm1hOiAnJyB9KTtcbiAgICB9XG5cbiAgICB2YWxpZGF0aW9uQXJyYXlbaW5kZXhdID0gZGF0YTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVQYXRoID0gYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YDtcbiAgICBcbiAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHtcbiAgICAgIFt1cGRhdGVQYXRoXTogdmFsaWRhdGlvbkFycmF5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB7IHVpZDogdXNlci51aWQsIGRpc3BsYXlOYW1lOiB1c2VyLmRpc3BsYXlOYW1lIHx8IG51bGwgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgY29uc3Qgd2hhdHNhcHBNZXNzYWdlID0gYCpWYWxpZGFjacOzbiBEaWFyaWEgLSBTR1RDKiDinI3vuI9cblNlIGhhIHJlZ2lzdHJhZG8gdW5hIG51ZXZhIGZpcm1hIGRlIHZhbGlkYWNpw7NuIGRpYXJpYS5cblxu8J+ThCAqUGVybWlzbzoqICR7ZnVsbFBlcm1pdERhdGEubnVtYmVyIHx8ICdOL0EnfVxu8J+Xk++4jyAqRMOtYToqICR7ZGF5fVxu8J+RpCAqRmlybWFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inIUgKlJvbDoqICR7dmFsaWRhdGlvblJvbGVOYW1lfVxu8J+TiyAqQW5leG86KiAke2FuZXhvRGlzcGxheU5hbWV9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbih3aGF0c2FwcE1lc3NhZ2UpO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgLy8g4pyFIENPUlJFQ0NJw5NOOiBWYWxpZGFjacOzbiBkZSBlc3RhZG8gY29ycmVnaWRhIHBhcmEgZmlybWEgZGUgYXBlcnR1cmFcbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyAmJiAhWydwZW5kaWVudGVfcmV2aXNpb24nLCAnYXByb2JhZG8nLCAnZW5fZWplY3VjaW9uJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBjdWFuZG8gZWwgcGVybWlzbyBlc3TDoSBwZW5kaWVudGUsIGFwcm9iYWRvIG8gZW4gZWplY3VjacOzbi4nIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUNpZXJyZScgJiYgIVsnZW5fZWplY3VjaW9uJywgJ3N1c3BlbmRpZG8nXS5pbmNsdWRlcyhwZXJtaXREYXRhLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1NvbG8gc2UgcHVlZGUgZmlybWFyIGNpZXJyZSBlbiBwZXJtaXNvcyBFTiBFSkVDVUNJw5NOIG8gU1VTUEVORElET1MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1NBK3FCc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/components/DailyValidationTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DailyValidationTable": (()=>DailyValidationTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$b010dd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/permits/data:b010dd [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signature.js [app-client] (ecmascript) <export default as Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/differenceInCalendarDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function DailyValidationTable({ permit, anexoName, title }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSigning, setIsSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signingInfo, setSigningInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const anexoData = permit[anexoName];
    if (!anexoData) return null;
    const validaciones = anexoData.validacion || {
        autoridad: [],
        responsable: []
    };
    const handleOpenSignatureModal = (type, index)=>{
        setSigningInfo({
            type,
            index
        });
        setIsSigning(true);
    };
    const handleSaveSignature = async (signatureDataUrl)=>{
        if (!signingInfo || !user) return;
        const { type, index } = signingInfo;
        const newValidationEntry = {
            dia: index + 1,
            fecha: new Date().toISOString(),
            nombre: user.displayName || 'N/A',
            firma: signatureDataUrl
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$b010dd__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addDailyValidationSignature"])(permit.id, anexoName, type, index, newValidationEntry, user);
        if (result.success) {
            toast({
                title: 'Firma de Validación Guardada'
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error
            });
        }
        setIsSigning(false);
        setSigningInfo(null);
    };
    const canSign = (type, validationEntry)=>{
        if (!user) return false;
        if (permit.status !== 'en_ejecucion' && permit.status !== 'suspendido') return false;
        if (validationEntry?.firma) return false;
        if (type === 'autoridad' && (user?.role === 'autorizante' || user?.role === 'admin')) return true;
        if (type === 'responsable' && (user?.role === 'lider_tarea' || user?.role === 'solicitante' || user?.role === 'admin')) return true;
        return false;
    };
    const getValidDate = (dateString)=>{
        if (!dateString) return null;
        const date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(dateString);
        return isNaN(date.getTime()) ? null : date;
    };
    const validFrom = getValidDate(permit.generalInfo.validFrom);
    const validUntil = getValidDate(permit.generalInfo.validUntil);
    if (!validFrom || !validUntil) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                    lineNumber: 91,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Fechas de validez del permiso no están definidas correctamente."
                    }, void 0, false, {
                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                    lineNumber: 94,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
            lineNumber: 90,
            columnNumber: 9
        }, this);
    }
    const durationDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(validUntil, validFrom) + 1;
    const validationDays = Array.from({
        length: durationDays > 0 ? durationDays : 0
    }, (_, i)=>i);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Día"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Fecha"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Autoridad del Área (Firma)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Responsable del Trabajo (Firma)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: validationDays.map((dayIndex)=>{
                                const autoridadValidation = validaciones.autoridad[dayIndex];
                                const responsableValidation = validaciones.responsable[dayIndex];
                                const validationDate = new Date(validFrom);
                                validationDate.setDate(validationDate.getDate() + dayIndex);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: dayIndex + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(validationDate, 'dd/MM/yyyy')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: autoridadValidation?.firma ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: autoridadValidation.firma,
                                                        alt: "Firma",
                                                        width: 80,
                                                        height: 40,
                                                        className: "bg-white border rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: autoridadValidation.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                lineNumber: 137,
                                                columnNumber: 23
                                            }, this) : canSign('autoridad', autoridadValidation) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>handleOpenSignatureModal('autoridad', dayIndex),
                                                children: [
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                        className: "mr-2 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 170
                                                    }, this),
                                                    "Firmar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                lineNumber: 142,
                                                columnNumber: 69
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: responsableValidation?.firma ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: responsableValidation.firma,
                                                        alt: "Firma",
                                                        width: 80,
                                                        height: 40,
                                                        className: "bg-white border rounded"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 26
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs",
                                                        children: responsableValidation.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                lineNumber: 147,
                                                columnNumber: 24
                                            }, this) : canSign('responsable', responsableValidation) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>handleOpenSignatureModal('responsable', dayIndex),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                        className: "mr-2 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 175
                                                    }, this),
                                                    "Firmar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                                lineNumber: 152,
                                                columnNumber: 73
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                            lineNumber: 145,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, dayIndex, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isSigning,
                onOpenChange: setIsSigning,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Realizar Firma de Validación"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                                lineNumber: 163,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                            lineNumber: 164,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                    lineNumber: 162,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/permits/[id]/components/DailyValidationTable.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(DailyValidationTable, "NjcYenaucIEKKUuw6EaDY1dpcjI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = DailyValidationTable;
var _c;
__turbopack_context__.k.register(_c, "DailyValidationTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/components/PermitDetails.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PermitDetails": (()=>PermitDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$SignatureCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/permits/[id]/components/SignatureCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/permits/[id]/components/StatusBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$6b2f05__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/permits/data:6b2f05 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pdf-generator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$WorkerSignatures$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/permits/[id]/components/WorkerSignatures.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$DailyValidationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/permits/[id]/components/DailyValidationTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/es.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
const signatureConfig = {
    coordinador_alturas: {
        title: 'COORDINADOR DE TRABAJOS EN ALTURAS',
        required: (permit)=>!!permit.selectedWorkTypes?.alturas,
        canSign: (permit, user)=>user && (user.role === 'admin' || permit.createdBy === user.uid) && permit.status === 'pendiente_revision' && !permit.approvals?.coordinador_alturas?.firmaApertura,
        tooltip: 'Solo el creador del permiso puede gestionar esta firma.'
    },
    solicitante: {
        title: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
        required: ()=>true,
        canSign: (permit, user)=>user && (user.role === 'admin' || permit.createdBy === user.uid) && permit.status === 'pendiente_revision' && !permit.approvals?.solicitante?.firmaApertura,
        tooltip: 'Se requiere la firma del creador del permiso.'
    },
    autorizante: {
        title: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)',
        required: ()=>true,
        canSign: (permit, user)=>user && (user.role === 'admin' || user.role === 'autorizante') && permit.status === 'pendiente_revision' && !!permit.approvals.solicitante?.firmaApertura && !permit.approvals.autorizante?.firmaApertura,
        tooltip: 'Se requiere primero la firma del Solicitante. Solo roles de Autorizante o Admin.'
    },
    mantenimiento: {
        title: 'PERSONAL DE MANTENIMIENTO',
        required: (permit)=>!!permit.selectedWorkTypes?.energia,
        canSign: (permit, user)=>user && (user.role === 'admin' || user.role === 'mantenimiento') && permit.status === 'pendiente_revision' && !!permit.approvals.autorizante?.firmaApertura && !permit.approvals.mantenimiento?.firmaApertura,
        tooltip: 'Solo aplica para Control de Energías y requiere firma previa del Autorizante.'
    },
    lider_sst: {
        title: 'FIRMA SST (SEGURIDAD Y SALUD EN EL TRABAJO)',
        required: (permit)=>!!permit.isSSTSignatureRequired,
        canSign: (permit, user)=>user && (user.role === 'admin' || user.role === 'lider_sst') && permit.status === 'pendiente_revision' && !!permit.approvals.solicitante?.firmaApertura && !permit.approvals.lider_sst?.firmaApertura,
        tooltip: 'Firma requerida para tareas no estandarizadas. Solo rol Líder SST o Admin.'
    }
};
function PermitDetails({ permit }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectionReason, setRejectionReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isRejectionModalOpen, setIsRejectionModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canUserApprove = user && (user.role === 'autorizante' || user.role === 'admin');
    const canUserReject = canUserApprove || user && user.role === 'lider_sst';
    const canUserStart = user && (user.role === 'lider_tarea' || user.role === 'admin');
    const canUserSuspend = user && (user.role === 'lider_sst' || user.role === 'admin');
    const canUserClose = canUserStart;
    const handleStatusUpdate = async (newStatus, reason)=>{
        if (!user || !user.role) return;
        setIsSubmitting(true);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f$data$3a$6b2f05__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updatePermitStatus"])(permit.id, newStatus, {
            uid: user.uid,
            displayName: user.displayName,
            role: user.role
        }, reason);
        setIsSubmitting(false);
        if (result.success) {
            toast({
                title: 'Estado Actualizado',
                description: `El permiso ha sido movido a: ${newStatus}`
            });
            if (isRejectionModalOpen) setIsRejectionModalOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error
            });
        }
    };
    const handleDownloadPdf = async ()=>{
        toast({
            title: 'Generando PDF...',
            description: 'Por favor espere un momento.'
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCompleteWorkPermitPDF"])(permit);
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Error al generar PDF',
                description: e.message
            });
        }
    };
    const allSignaturesDone = ()=>{
        const requiredSigs = Object.entries(signatureConfig).filter(([_, config])=>config.required(permit));
        return requiredSigs.every(([key])=>permit.approvals[key]?.status === 'aprobado');
    };
    const formattedDate = (dateString)=>{
        if (!dateString) return 'N/A';
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(dateString), "dd/MM/yyyy 'a las' HH:mm", {
                locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["es"]
            });
        } catch  {
            return 'Fecha inválida';
        }
    };
    const renderAnexo = (anexoData, title)=>{
        if (!anexoData) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "text-xs whitespace-pre-wrap font-sans bg-muted p-4 rounded-md",
                        children: JSON.stringify(anexoData, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    className: "h-8 w-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 176,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl md:text-3xl font-bold tracking-tight",
                                            children: [
                                                "Permiso #",
                                                permit.number || permit.id.substring(0, 8)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground",
                                            children: permit.generalInfo.workDescription
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 177,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                status: permit.status
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleDownloadPdf,
                                variant: "outline",
                                size: "sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this),
                                    "PDF"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 62
                                                }, this),
                                                " Información del Solicitante"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "grid grid-cols-2 md:grid-cols-3 gap-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Nombre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: permit.user?.displayName || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: permit.user?.email || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 60
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Empresa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: permit.generalInfo?.empresa || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 62
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Creado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: formattedDate(permit.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Válido Desde"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: formattedDate(permit.generalInfo?.validFrom)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 67
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "Válido Hasta"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 22
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: formattedDate(permit.generalInfo?.validUntil)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 67
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: Object.entries(signatureConfig).map(([key, config])=>{
                                    if (config.required(permit)) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$SignatureCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignatureCard"], {
                                            title: config.title,
                                            approval: permit.approvals[key],
                                            canSign: config.canSign(permit, user),
                                            permitId: permit.id,
                                            signatureRole: key,
                                            disabled: permit.status !== 'pendiente_revision',
                                            tooltip: config.tooltip
                                        }, key, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 216,
                                            columnNumber: 25
                                        }, this);
                                    }
                                    return null;
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$WorkerSignatures$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkerSignatures"], {
                                permit: permit
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            permit.selectedWorkTypes.alturas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$DailyValidationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DailyValidationTable"], {
                                permit: permit,
                                anexoName: "anexoAltura",
                                title: "Validación Diaria (Alturas)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 234,
                                columnNumber: 48
                            }, this),
                            permit.selectedWorkTypes.confinado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$DailyValidationTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DailyValidationTable"], {
                                permit: permit,
                                anexoName: "anexoConfinado",
                                title: "Validación Diaria (Esp. Confinados)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 235,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 62
                                                    }, this),
                                                    " Acciones del Permiso"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: "Gestione el ciclo de vida de este permiso."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-3",
                                        children: [
                                            permit.status === 'pendiente_revision' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full bg-green-600 hover:bg-green-700",
                                                onClick: ()=>handleStatusUpdate('aprobado'),
                                                disabled: !canUserApprove || !allSignaturesDone() || isSubmitting,
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 35
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 74
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Aprobar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 249,
                                                columnNumber: 17
                                            }, this),
                                            permit.status === 'pendiente_revision' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "destructive",
                                                className: "w-full",
                                                onClick: ()=>setIsRejectionModalOpen(true),
                                                disabled: !canUserReject || isSubmitting,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Rechazar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            permit.status === 'aprobado' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full",
                                                onClick: ()=>handleStatusUpdate('en_ejecucion'),
                                                disabled: !canUserStart || isSubmitting,
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 36
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 75
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Iniciar Ejecución"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 271,
                                                columnNumber: 18
                                            }, this),
                                            permit.status === 'en_ejecucion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                className: "w-full",
                                                onClick: ()=>handleStatusUpdate('suspendido'),
                                                disabled: !canUserSuspend || isSubmitting,
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 36
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 75
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Suspender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 278,
                                                columnNumber: 18
                                            }, this),
                                            permit.status === 'suspendido' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full",
                                                onClick: ()=>handleStatusUpdate('en_ejecucion'),
                                                disabled: !canUserSuspend || isSubmitting,
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 36
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 75
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Reanudar Ejecución"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 20
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 285,
                                                columnNumber: 18
                                            }, this),
                                            (permit.status === 'en_ejecucion' || permit.status === 'suspendido') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "default",
                                                className: "w-full",
                                                onClick: ()=>handleStatusUpdate('cerrado'),
                                                disabled: !canUserClose || isSubmitting,
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 37
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 76
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Cerrar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 292,
                                                columnNumber: 18
                                            }, this),
                                            permit.status !== 'pendiente_revision' && permit.status !== 'aprobado' && permit.status !== 'en_ejecucion' && permit.status !== 'suspendido' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground text-center",
                                                children: [
                                                    "No hay acciones disponibles para un permiso en estado '",
                                                    permit.status,
                                                    "'."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 62
                                                }, this),
                                                " Anexos y Detalles"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 306,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-4",
                                        children: [
                                            renderAnexo(permit.anexoATS, 'Anexo ATS'),
                                            permit.selectedWorkTypes.alturas && renderAnexo(permit.anexoAltura, 'Anexo Trabajo en Alturas'),
                                            permit.selectedWorkTypes.confinado && renderAnexo(permit.anexoConfinado, 'Anexo Espacios Confinados'),
                                            permit.selectedWorkTypes.energia && renderAnexo(permit.anexoEnergias, 'Anexo Control de Energías'),
                                            permit.selectedWorkTypes.izaje && renderAnexo(permit.anexoIzaje, 'Anexo Izaje de Cargas'),
                                            permit.selectedWorkTypes.excavacion && renderAnexo(permit.anexoExcavaciones, 'Anexo Excavaciones'),
                                            renderAnexo(permit.eppEmergencias, 'EPP y Emergencias')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isRejectionModalOpen,
                onOpenChange: setIsRejectionModalOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {}, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 326,
                                            columnNumber: 70
                                        }, this),
                                        " Rechazar Permiso"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 326,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Por favor, proporcione un motivo claro para el rechazo. Esta información será enviada al solicitante."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 327,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                            lineNumber: 325,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                            placeholder: "Ej: Faltan equipos de protección personal especificados en el ATS...",
                            value: rejectionReason,
                            onChange: (e)=>setRejectionReason(e.target.value),
                            rows: 4
                        }, void 0, false, {
                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                            lineNumber: 331,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogClose"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        disabled: isSubmitting,
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                        lineNumber: 339,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 338,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    onClick: ()=>handleStatusUpdate('rechazado', rejectionReason),
                                    disabled: isSubmitting || !rejectionReason.trim(),
                                    children: [
                                        isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 346,
                                            columnNumber: 40
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {}, void 0, false, {
                                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                            lineNumber: 346,
                                            columnNumber: 79
                                        }, this),
                                        "Confirmar Rechazo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                                    lineNumber: 341,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                            lineNumber: 337,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                    lineNumber: 324,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/permits/[id]/components/PermitDetails.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s(PermitDetails, "Zn1evRmjgY63h4WQ2vhnjUr81TQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = PermitDetails;
var _c;
__turbopack_context__.k.register(_c, "PermitDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/errors.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "FirestorePermissionError": (()=>FirestorePermissionError)
});
class FirestorePermissionError extends Error {
    context;
    constructor(context){
        const message = `FirestoreError: Missing or insufficient permissions. The following request was denied by Firestore Security Rules:\n${JSON.stringify({
            context
        }, null, 2)}`;
        super(message);
        this.name = 'FirestorePermissionError';
        this.context = context;
        // This is to make the error message more readable in the console
        Object.setPrototypeOf(this, FirestorePermissionError.prototype);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/permits/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PermitDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$PermitDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/permits/[id]/components/PermitDetails.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$error$2d$emitter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/error-emitter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function PermitDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [permit, setPermit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PermitDetailPage.useEffect": ()=>{
            if (!permitId) {
                setLoading(false);
                return;
            }
            if (!user) return; // Wait for user to be loaded
            const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'permits', permitId);
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(docRef, {
                "PermitDetailPage.useEffect.unsubscribe": (docSnap)=>{
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // Convert Firestore Timestamps to serializable strings for the state
                        const sanitizedData = JSON.parse(JSON.stringify(data, {
                            "PermitDetailPage.useEffect.unsubscribe.sanitizedData": (key, value)=>{
                                if (value && typeof value === 'object' && value.seconds !== undefined) {
                                    return new Date(value.seconds * 1000).toISOString();
                                }
                                return value;
                            }
                        }["PermitDetailPage.useEffect.unsubscribe.sanitizedData"]));
                        setPermit({
                            id: docSnap.id,
                            ...sanitizedData
                        });
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Permiso no encontrado",
                            description: "El permiso que busca no existe o fue eliminado."
                        });
                        setPermit(null);
                    }
                    setLoading(false);
                }
            }["PermitDetailPage.useEffect.unsubscribe"], {
                "PermitDetailPage.useEffect.unsubscribe": (error)=>{
                    console.error("Error fetching permit:", error);
                    // Emit a custom, catchable error for development overlay
                    const permissionError = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirestorePermissionError"]({
                        path: docRef.path,
                        operation: 'get'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$error$2d$emitter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errorEmitter"].emit('permission-error', permissionError);
                    toast({
                        variant: "destructive",
                        title: "Error de Permisos",
                        description: "No tiene los permisos necesarios para ver este documento."
                    });
                    setLoading(false);
                }
            }["PermitDetailPage.useEffect.unsubscribe"]);
            return ({
                "PermitDetailPage.useEffect": ()=>unsubscribe()
            })["PermitDetailPage.useEffect"];
        }
    }["PermitDetailPage.useEffect"], [
        permitId,
        toast,
        user
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-1 items-center justify-center p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 animate-spin text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-2 text-sm text-muted-foreground",
                    children: "Cargando permiso..."
                }, void 0, false, {
                    fileName: "[project]/src/app/permits/[id]/page.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/permits/[id]/page.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this);
    }
    if (!permit) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-1 items-center justify-center p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "El permiso no pudo ser cargado o no existe."
            }, void 0, false, {
                fileName: "[project]/src/app/permits/[id]/page.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/permits/[id]/page.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$permits$2f5b$id$5d2f$components$2f$PermitDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PermitDetails"], {
        permit: permit
    }, void 0, false, {
        fileName: "[project]/src/app/permits/[id]/page.tsx",
        lineNumber: 94,
        columnNumber: 10
    }, this);
}
_s(PermitDetailPage, "KiL7Ouh8AF+1vviiMsPYTPbUt/Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
    ];
});
_c = PermitDetailPage;
var _c;
__turbopack_context__.k.register(_c, "PermitDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_cc3e0cee._.js.map