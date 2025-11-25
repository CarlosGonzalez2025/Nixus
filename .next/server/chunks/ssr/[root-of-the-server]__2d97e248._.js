module.exports = {

"[project]/src/lib/errors.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
CardFooter.displayName = "CardFooter";
;
}}),
"[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Table = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full overflow-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className),
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
Table.displayName = "Table";
const TableHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("[&_tr]:border-b", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, this));
TableHeader.displayName = "TableHeader";
const TableBody = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 31,
        columnNumber: 3
    }, this));
TableBody.displayName = "TableBody";
const TableFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 43,
        columnNumber: 3
    }, this));
TableFooter.displayName = "TableFooter";
const TableRow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 58,
        columnNumber: 3
    }, this));
TableRow.displayName = "TableRow";
const TableHead = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, this));
TableHead.displayName = "TableHead";
const TableCell = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 88,
        columnNumber: 3
    }, this));
TableCell.displayName = "TableCell";
const TableCaption = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-4 text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, this));
TableCaption.displayName = "TableCaption";
;
}}),
"[externals]/module [external] (module, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}}),
"[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this));
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 61,
        columnNumber: 3
    }, this);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 75,
        columnNumber: 3
    }, this);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 89,
        columnNumber: 3
    }, this));
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 104,
        columnNumber: 3
    }, this));
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}}),
"[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Checkbox": (()=>Checkbox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const Checkbox = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center text-current"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
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
Checkbox.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}}),
"[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Label)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, this));
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}}),
"[project]/src/components/ui/signature-pad.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SignaturePad": (()=>SignaturePad)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-ssr] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const SignaturePad = ({ onSave, isSaving = false })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasConsented, setHasConsented] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return ()=>window.removeEventListener('resize', resizeCanvas);
    }, []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4 w-full",
        ref: containerRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start space-x-3 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                        id: "consent",
                        checked: hasConsented,
                        onCheckedChange: (checked)=>setHasConsented(Boolean(checked)),
                        className: "mt-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                className: "w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: clearPad,
                        disabled: isSaving,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSave,
                        disabled: !hasConsented || isSaving,
                        children: [
                            isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/signature-pad.tsx",
                                lineNumber: 153,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
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
}}),
"[project]/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Collapsible": (()=>Collapsible),
    "CollapsibleContent": (()=>CollapsibleContent),
    "CollapsibleTrigger": (()=>CollapsibleTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-collapsible/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
const Collapsible = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const CollapsibleTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"];
const CollapsibleContent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"];
;
}}),
"[project]/src/app/(app)/permits/data:407476 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7873b9c7850e737568a6f6f7a4e17cda15a8f18e15":"updatePermitStatus"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updatePermitStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7873b9c7850e737568a6f6f7a4e17cda15a8f18e15", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updatePermitStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCB7IGFkbWluRGIsIGlzQWRtaW5SZWFkeSB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEsIFVzZXIsIE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvdHlwZXMnO1xuaW1wb3J0IHsgRmllbGRWYWx1ZSwgVXBkYXRlRGF0YSwgVGltZXN0YW1wIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbjogT21pdDxOb3RpZmljYXRpb24sICdpZCc+ID0ge1xuICAgIHVzZXJJZCxcbiAgICBwZXJtaXRJZDogcGVybWl0LmlkLFxuICAgIHBlcm1pdE51bWJlcjogcGVybWl0Lm51bWJlciB8fCAnJyxcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgaXNSZWFkOiBmYWxzZSxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgVGltZXN0YW1wLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uIGFzIGFueSk7XG4gIFxuICAvLyBFbnZpYXIgY29ycmVvIGVsZWN0csOzbmljb1xuICBjb25zdCB1c2VyRW1haWwgPSBhd2FpdCBnZXRFbWFpbEZvclVzZXIodXNlcklkKTtcbiAgaWYgKHVzZXJFbWFpbCkge1xuICAgIGF3YWl0IHNlbmRQZXJtaXRVcGRhdGVFbWFpbCh7XG4gICAgICB0bzogdXNlckVtYWlsLFxuICAgICAgc3ViamVjdDogYEFjdHVhbGl6YWNpw7NuIGVuIFBlcm1pc28gU0dUQzogJHtwZXJtaXQubnVtYmVyIHx8IHBlcm1pdC5pZH1gLFxuICAgICAgaHRtbDogYDxwPiR7bWVzc2FnZX08L3A+PHA+UHVlZGVzIHZlciBsb3MgZGV0YWxsZXMgZGVsIHBlcm1pc28gaGFjaWVuZG8gY2xpYyA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vcGVybWl0cy8ke3Blcm1pdC5pZH1cIj5hcXXDrTwvYT4uPC9wPmBcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gLS0tIEZpbiBkZSBGdW5jaW9uZXMgZGUgTm90aWZpY2FjaW9uZXMgLS0tXG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYSkgc2VsZWN0ZWRUeXBlcy5wdXNoKCdDb250cm9sIGRlIEVuZXJnw61hcycpO1xuICBpZiAocGVybWl0Lml6YWplQ2FyZ2FzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0l6YWplIGRlIENhcmdhcycpO1xuICBpZiAocGVybWl0LmV4Y2F2YWNpb25lcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFeGNhdmFjaW9uZXMnKTtcbiAgXG4gIGlmIChzZWxlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChwZXJtaXQudHJhYmFqb0dlbmVyYWwpIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGRhdGEgc3RydWN0dXJlXG4gICAgaWYgKHBlcm1pdC53b3JrVHlwZSAmJiBBcnJheS5pc0FycmF5KHBlcm1pdC53b3JrVHlwZSkpIHtcbiAgICAgIHJldHVybiBwZXJtaXQud29ya1R5cGUubWFwKGtleSA9PiB3b3JrVHlwZXNNYXBba2V5XSB8fCBrZXkpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgfVxuICByZXR1cm4gc2VsZWN0ZWRUeXBlcy5qb2luKCcsICcpO1xufTtcblxuY29uc3QgZ2V0U3RhdHVzVGV4dCA9IChzdGF0dXM6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN0YXR1c1RleHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgJ2JvcnJhZG9yJzogJ0JvcnJhZG9yJyxcbiAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiAnUGVuZGllbnRlIGRlIFJldmlzacOzbicsXG4gICAgICAnYXByb2JhZG8nOiAnQXByb2JhZG8nLFxuICAgICAgJ2VuX2VqZWN1Y2lvbic6ICdFbiBFamVjdWNpw7NuJyxcbiAgICAgICdzdXNwZW5kaWRvJzogJ1N1c3BlbmRpZG8nLFxuICAgICAgJ2NlcnJhZG8nOiAnQ2VycmFkbycsXG4gICAgICAncmVjaGF6YWRvJzogJ1JlY2hhemFkbydcbiAgICB9O1xuICAgIHJldHVybiBzdGF0dXNUZXh0W3N0YXR1c10gfHwgc3RhdHVzO1xuICB9O1xuXG5jb25zdCBzaWduYXR1cmVSb2xlczogeyBba2V5IGluICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcyddOiBzdHJpbmcgfSA9IHtcbiAgY29vcmRpbmFkb3JfYWx0dXJhczogJ0NPT1JESU5BRE9SIERFIFRSQUJBSk9TIEVOIEFMVFVSQVMnLFxuICBzb2xpY2l0YW50ZTogJ1FVSUVOIFNPTElDSVRBIChMw41ERVIgQSBDQVJHTyBERUwgRVFVSVBPIEVKRUNVVEFOVEUpJyxcbiAgYXV0b3JpemFudGU6ICdRVUlFTiBBVVRPUklaQSAoSkVGRVMgWSBEVUXDkU9TIERFIEFSRUEpJyxcbiAgbWFudGVuaW1pZW50bzogJ1BFUlNPTkFMIERFIE1BTlRFTklNSUVOVE8nLFxuICBsaWRlcl9zc3Q6ICdGaXJtYSBTU1QnLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCwgdXNlckRpc3BsYXlOYW1lLCB1c2VyRW1haWwsIHVzZXJQaG90b1VSTCwgLi4ucGVybWl0RGF0YSB9ID0gZGF0YTtcblxuICBjb25zdCBpbml0aWFsQXBwcm92YWxzID0ge1xuICAgIHNvbGljaXRhbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBhdXRvcml6YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbWFudGVuaW1pZW50bzogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbGlkZXJfc3N0OiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBjb29yZGluYWRvcl9hbHR1cmFzOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgfTtcblxuICBjb25zdCBwZXJtaXRQYXlsb2FkOiBPbWl0PFBlcm1pdCwgJ2lkJz4gPSB7XG4gICAgLi4ucGVybWl0RGF0YSxcbiAgICBzdGF0dXM6ICdwZW5kaWVudGVfcmV2aXNpb24nIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgfTtcblxuICB0cnkge1xuICAgIGlmIChkcmFmdElkKSB7XG4gICAgICAvLyBBY3R1YWxpemFyIHVuIGJvcnJhZG9yIGV4aXN0ZW50ZVxuICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKGRyYWZ0SWQpO1xuICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IC4uLnBlcm1pdFBheWxvYWQsIHVwZGF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke2RyYWZ0SWR9YCk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkcmFmdElkLCBpc1VwZGF0ZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhciB1biBudWV2byBib3JyYWRvclxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhUaW1lc3RhbXAgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9O1xuICAgICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBheWxvYWRXaXRoVGltZXN0YW1wIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlLCBlbXByZXNhPzogc3RyaW5nIH0sXG4gIGNvbW1lbnRzPzogc3RyaW5nXG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICF1c2VyIHx8ICF1c2VyLnVpZCB8fCAhdXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXREb2NCZWZvcmUgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0RG9jQmVmb3JlLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7fTtcblxuICAgICAgICAvLyBMw7NnaWNhIHBhcmEgbWFuZWphciBmaXJtYXMgZGUgYXByb2JhY2nDs24geSBkZSBjaWVycmUvY2FuY2VsYWNpw7NuXG4gICAgICAgIGlmIChyb2xlLnN0YXJ0c1dpdGgoJ2NpZXJyZV8nKSB8fCByb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUm9sZSA9IHJvbGUgPT09ICdjaWVycmVfYXV0b3JpZGFkJyA/ICdhdXRvcmlkYWQnIDogKHJvbGUgPT09ICdjaWVycmVfcmVzcG9uc2FibGUnID8gJ3Jlc3BvbnNhYmxlJyA6ICdjYW5jZWxhZG9Qb3InKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVQYXRoID0gYGNsb3N1cmUuJHtjbG9zdXJlUm9sZX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Nsb3N1cmVEYXRhID0gKHBlcm1pdEJlZm9yZURhdGEuY2xvc3VyZSBhcyBhbnkpPy5bY2xvc3VyZVJvbGVdIHx8IHt9O1xuXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2Nsb3N1cmVQYXRoIGFzIGtleW9mIFVwZGF0ZURhdGE8UGVybWl0Pl0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUucmF6b25DYW5jZWxhY2lvbiddID0gY29tbWVudHMgfHwgJ05vIGVzcGVjaWZpY2Fkbyc7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5jYW5jZWxhZG8nXSA9ICdzaSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOKchSBWQUxJREFDScOTTiBERSBQRVJNSVNPUyBBTlRFUyBERSBGSVJNQVJcbiAgICAgICAgICAgIGNvbnN0IGNhblNpZ24gPSBhd2FpdCB2YWxpZGF0ZVNpZ25hdHVyZVBlcm1pc3Npb24ocGVybWl0SWQsIHJvbGUsIHVzZXIpO1xuICAgICAgICAgICAgaWYgKCFjYW5TaWduLmFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGNhblNpZ24ucmVhc29uIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFwcHJvdmFsRGF0YTogUGFydGlhbDxBcHByb3ZhbD4gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYXByb2JhZG8nLFxuICAgICAgICAgICAgICAgIGZpcm1hQXBlcnR1cmE6IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLnVpZCxcbiAgICAgICAgICAgICAgICBzaWduZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBhbnksXG4gICAgICAgICAgICAgICAgdXNlclJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICB1c2VyRW1wcmVzYTogdXNlci5lbXByZXNhIHx8ICdOL0EnLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50cyB8fCAnJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdXBkYXRlRGF0YVtgYXBwcm92YWxzLiR7cm9sZX1gXSA9IGFwcHJvdmFsRGF0YTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g4pyFIEzDk0dJQ0EgTUVKT1JBREE6IENhbWJpbyBkZSBlc3RhZG8gc2Vnw7puIGVsIHJvbCBxdWUgZmlybWFcbiAgICAgICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uUGF5bG9hZDogVmFsaWRhY2lvbkRpYXJpYSA9IHsgXG4gICAgICAgICAgICAgICAgICAgIGRpYTogMSwgXG4gICAgICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgXG4gICAgICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLCBcbiAgICAgICAgICAgICAgICAgICAgZmVjaGE6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOKchSBTT0xJQ0lUQU5URSBGSVJNQTogQ2FtYmlhIGRlIEJvcnJhZG9yIGEgUGVuZGllbnRlIGRlIFJldmlzacOzblxuICAgICAgICAgICAgICAgIGlmIChyb2xlID09PSAnc29saWNpdGFudGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZWwgcmVzcG9uc2FibGVcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWxpZGF0aW9ucyA9IChwZXJtaXRCZWZvcmVEYXRhIGFzIGFueSlbYW5leG9dLnZhbGlkYWNpb24/LnJlc3BvbnNhYmxlIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDinIUgQVVUT1JJWkFOVEUgRklSTUE6IFZlcmlmaWNhIHNpIHNlIHB1ZWRlIGFwcm9iYXIgYXV0b23DoXRpY2FtZW50ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZSBsYSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0EgREUgQVBST0JBQ0nDk05cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBcHByb3ZhbHMgPSB7IC4uLnBlcm1pdEJlZm9yZURhdGE/LmFwcHJvdmFscywgW3JvbGVdOiBhcHByb3ZhbERhdGEgfTtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NUUmVxdWlyZWQgPSBwZXJtaXRCZWZvcmVEYXRhPy5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkO1xuXG4gICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGE/LmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5tYW50ZW5pbWllbnRvPy5zdGF0dXMgPT09ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIENBTUJJTyBBVVRPTcOBVElDTyBBIEFQUk9CQURPIGN1YW5kbyB0b2RhcyBsYXMgZmlybWFzIGVzdMOhblxuICAgICAgICAgICAgaWYgKGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgcGVybWl0QmVmb3JlRGF0YT8uc3RhdHVzID09PSAncGVuZGllbnRlX3JldmlzaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDinIUgTm90aWZpY2FjacOzbiBlc3BlY2lhbCBzaSBlbCBwZXJtaXNvIGZ1ZSBBUFJPQkFETyBhdXRvbcOhdGljYW1lbnRlXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxNZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgZXN0w6EgbGlzdG8gcGFyYSBlamVjdWNpw7NuLmA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBhcHByb3ZhbE1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGZpcm1hIHkgbm90aWZpY2FyOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSB0cmFuc2ljaW9uZXMgZGUgZXN0YWRvXG5mdW5jdGlvbiB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihjdXJyZW50U3RhdHVzOiBQZXJtaXRTdGF0dXMsIHRhcmdldFN0YXR1czogUGVybWl0U3RhdHVzLCB1c2VyUm9sZTogVXNlclJvbGUpOiB7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICBjb25zdCBhbGxvd2VkVHJhbnNpdGlvbnM6IFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgUGFydGlhbDxSZWNvcmQ8UGVybWl0U3RhdHVzLCBVc2VyUm9sZVtdPj4+PiA9IHtcbiAgICAgICAgJ2JvcnJhZG9yJzoge1xuICAgICAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IFsnc29saWNpdGFudGUnLCAnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAncGVuZGllbnRlX3JldmlzaW9uJzoge1xuICAgICAgICAgICAgJ2Fwcm9iYWRvJzogWydhdXRvcml6YW50ZScsICdhZG1pbiddLCAvLyDinIUgQWdyZWdhZG86IGNhbWJpbyBtYW51YWwgYSBhcHJvYmFkb1xuICAgICAgICAgICAgJ3JlY2hhemFkbyc6IFsnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0JywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgICdlbl9lamVjdWNpb24nOiB7XG4gICAgICAgICAgICAnc3VzcGVuZGlkbyc6IFsnbGlkZXJfc3N0JywgJ2FkbWluJ10sXG4gICAgICAgICAgICAnY2VycmFkbyc6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnc3VzcGVuZGlkbyc6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgY29uc3QgYWxsb3dlZFJvbGVzID0gYWxsb3dlZFRyYW5zaXRpb25zW2N1cnJlbnRTdGF0dXNdPy5bdGFyZ2V0U3RhdHVzXTtcbiAgICBpZiAoIWFsbG93ZWRSb2xlcykge1xuICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiBgVHJhbnNpY2nDs24gZGUgJyR7Y3VycmVudFN0YXR1c30nIGEgJyR7dGFyZ2V0U3RhdHVzfScgbm8gZXN0w6EgcGVybWl0aWRhLmAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWFsbG93ZWRSb2xlcy5pbmNsdWRlcyh1c2VyUm9sZSkgJiYgdXNlclJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFR1IHJvbCAoJHt1c2VyUm9sZX0pIG5vIHRpZW5lIHBlcm1pc29zIHBhcmEgY2FtYmlhciBlbCBlc3RhZG8gYSAnJHt0YXJnZXRTdGF0dXN9Jy5gIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsb3dlZDogdHJ1ZSB9O1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMoXG4gIHBlcm1pdElkOiBzdHJpbmcsXG4gIHN0YXR1czogUGVybWl0U3RhdHVzLFxuICBjdXJyZW50VXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwsIHJvbGU/OiBVc2VyUm9sZSB9LFxuICByZWFzb24/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIWN1cnJlbnRVc2VyLnVpZCB8fCAhY3VycmVudFVzZXIucm9sZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zIG8gdXN1YXJpbyBzaW4gcm9sLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIHRyYW5zaWNpw7NuIGRlIGVzdGFkb1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24ocGVybWl0RGF0YS5zdGF0dXMsIHN0YXR1cywgY3VycmVudFVzZXIucm9sZSk7XG4gICAgICAgIGlmICghdHJhbnNpdGlvbi5hbGxvd2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHRyYW5zaXRpb24ucmVhc29uIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIC8vIOKchSBHdWFyZGFyIHJhesOzbiBkZSByZWNoYXpvXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBNYXJjYXIgZmVjaGEgZGUgY2llcnJlXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5mZWNoYUNpZXJyZSddID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUudGVybWluYWRvJ10gPSAnc2knO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyAuLi5wZXJtaXREYXRhLCAuLi51cGRhdGVEYXRhLCBpZDogcGVybWl0SWQgfSBhcyBQZXJtaXQ7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJlZEJ5ID0gY3VycmVudFVzZXI7XG4gICAgICAgIFxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZTogTm90aWZpY2F0aW9uWyd0eXBlJ10gPSAnc3RhdHVzX2NoYW5nZSc7XG4gICAgICAgIGxldCBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjYW1iaWFkbyBlbCBlc3RhZG8gZGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9IGE6ICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfS5gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgYWhvcmEgc2UgZW5jdWVudHJhIGxpc3RvIHBhcmEgZWplY3VjacOzbi5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikgbWVzc2FnZSArPSBgIE1vdGl2bzogJHtyZWFzb259YDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdjYW5jZWxsYXRpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICBpZiAodWlkICE9PSBjdXJyZW50VXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dUQyog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgcGVybWlzb3MgZGUgZmlybWFcbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGxhIGZpcm1hIGRlbCBjb29yZGluYWRvclxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBnZXN0aW9uYXIgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdzb2xpY2l0YW50ZSc6XG4gICAgICAgICAgICBpZiAocGVybWl0LmNyZWF0ZWRCeSAhPT0gY3VycmVudFVzZXIudWlkICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU29sbyBlbCBjcmVhZG9yIGRlbCBwZXJtaXNvIHB1ZWRlIGZpcm1hciBjb21vIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTaSBoYXkgYW5leG8gZGUgYWx0dXJhcywgdmVyaWZpY2FyIGZpcm1hIGRlbCBjb29yZGluYWRvciBwcmltZXJvXG4gICAgICAgICAgICBpZiAocGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzICYmIHBlcm1pdC5hcHByb3ZhbHM/LmNvb3JkaW5hZG9yX2FsdHVyYXM/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdFc3BlcmFuZG8gZmlybWEgZGVsIENvb3JkaW5hZG9yIGRlIFRyYWJham9zIGVuIEFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnYXV0b3JpemFudGUnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhdXRvcml6YW50ZScgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgYXV0b3JpemFudGUgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ0xhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZSBlcyByZXF1ZXJpZGEgcHJpbWVyby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdsaWRlcl9zc3QnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdsaWRlcl9zc3QnICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIEzDrWRlciBTU1QgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIHJlcXVlcmlkYSBwYXJhIGVzdGEgdGFyZWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LnNvbGljaXRhbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ21hbnRlbmltaWVudG8nOlxuICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlci5yb2xlICE9PSAnbWFudGVuaW1pZW50bycgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTWFudGVuaW1pZW50byByZXF1ZXJpZG8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZXJtaXQuY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgTWFudGVuaW1pZW50byBubyByZXF1ZXJpZGEgcGFyYSBlc3RlIHRyYWJham8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIGF1dG9yaXphbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBhbGxvd2VkOiB0cnVlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICBhbmV4b05hbWU6IHN0cmluZywgXG4gIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIFxuICBpbmRleDogbnVtYmVyLCBcbiAgZGF0YTogVmFsaWRhY2lvbkRpYXJpYSwgXG4gIHVzZXI6IFVzZXJcbikge1xuICBpZiAoIXBlcm1pdElkIHx8ICFhbmV4b05hbWUgfHwgIXZhbGlkYXRpb25UeXBlIHx8IGluZGV4IDwgMCB8fCAhZGF0YSB8fCAhdXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICB0cnkge1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgLy8g4pyFIFZlcmlmaWNhciBxdWUgZWwgcGVybWlzbyBlc3TDqSBhcHJvYmFkb1xuICAgIGlmICghWydhcHJvYmFkbycsICdlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIGFwcm9iYWRvcyBvIGVuIGVqZWN1Y2nDs24uJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBgRWwgYW5leG8gJHthbmV4b05hbWV9IG5vIGV4aXN0ZSBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYW5leG9VcGRhdGU6IGFueSA9IHsgLi4uYW5leG9EYXRhIH07XG4gICAgaWYgKCFhbmV4b1VwZGF0ZS52YWxpZGFjaW9uKSB7XG4gICAgICAgIGFuZXhvVXBkYXRlLnZhbGlkYWNpb24gPSB7IGF1dG9yaWRhZDogW10sIHJlc3BvbnNhYmxlOiBbXSB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IChhbmV4b1VwZGF0ZS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZ1bGxQZXJtaXREYXRhID0geyBpZDogZG9jUmVmLmlkLCAuLi5wZXJtaXREYXRhIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGFuZXhvRGlzcGxheU5hbWUgPSBhbmV4b05hbWUucmVwbGFjZSgnYW5leG8nLCAnQW5leG8gJyk7XG4gICAgY29uc3QgdmFsaWRhdGlvblJvbGVOYW1lID0gdmFsaWRhdGlvblR5cGUgPT09ICdhdXRvcmlkYWQnID8gJ0F1dG9yaWRhZCBkZWwgw4FyZWEnIDogJ1Jlc3BvbnNhYmxlIGRlbCBUcmFiYWpvJztcbiAgICBjb25zdCBkYXkgPSBpbmRleCArIDE7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlYWxpemFkbyBsYSB2YWxpZGFjacOzbiBkaWFyaWEgKCR7dmFsaWRhdGlvblJvbGVOYW1lfSkgcGFyYSBlbCBEw41BICR7ZGF5fSBkZWwgJHthbmV4b0Rpc3BsYXlOYW1lfSBlbiBlbCBwZXJtaXNvICMke2Z1bGxQZXJtaXREYXRhLm51bWJlcn0uYDtcbiAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhmdWxsUGVybWl0RGF0YSk7XG4gICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgZnVsbFBlcm1pdERhdGEsIG1lc3NhZ2UsICdzdGF0dXNfY2hhbmdlJywgeyB1aWQ6IHVzZXIudWlkLCBkaXNwbGF5TmFtZTogdXNlci5kaXNwbGF5TmFtZSB8fCBudWxsIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dUQyog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGxhIHZhbGlkYWNpw7NuIGRpYXJpYTpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYSBkZSB2YWxpZGFjacOzbi4nIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFdvcmtlclNpZ25hdHVyZShwZXJtaXRJZDogc3RyaW5nLCB3b3JrZXJJbmRleDogbnVtYmVyLCBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLCBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8IHdvcmtlckluZGV4IDwgMCB8fCAhc2lnbmF0dXJlVHlwZSB8fCAhc2lnbmF0dXJlRGF0YVVybCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIGVzdGFkbyBzZWfDum4gdGlwbyBkZSBmaXJtYVxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnICYmICFbJ2Fwcm9iYWRvJywgJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBlbiBwZXJtaXNvcyBhcHJvYmFkb3MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFDaWVycmUnICYmICFbJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBjaWVycmUgZW4gcGVybWlzb3MgZW4gZWplY3VjacOzbiBvIHN1c3BlbmRpZG9zLicgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgd29ya2VycyA9IHBlcm1pdERhdGEud29ya2VycyA/IFsuLi5wZXJtaXREYXRhLndvcmtlcnNdIDogW107XG5cbiAgICAgICAgaWYgKHdvcmtlckluZGV4ID49IHdvcmtlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICfDjW5kaWNlIGRlIHRyYWJhamFkb3IgaW52w6FsaWRvLicgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2Zpcm1hQXBlcnR1cmEnIDogJ2Zpcm1hQ2llcnJlJztcbiAgICAgICAgY29uc3QgZGF0ZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2ZlY2hhRmlybWFBcGVydHVyYScgOiAnZmVjaGFGaXJtYUNpZXJyZSc7XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVGaWVsZF06IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICBbZGF0ZUZpZWxkXTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI0U0E4Y3NCIn0=
}}),
"[project]/src/app/(app)/permits/data:8518b5 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7e15bdb6ac388e78a59299d5091891127d63de7bc6":"addSignatureAndNotify"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addSignatureAndNotify": (()=>addSignatureAndNotify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addSignatureAndNotify = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7e15bdb6ac388e78a59299d5091891127d63de7bc6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addSignatureAndNotify"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCB7IGFkbWluRGIsIGlzQWRtaW5SZWFkeSB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEsIFVzZXIsIE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvdHlwZXMnO1xuaW1wb3J0IHsgRmllbGRWYWx1ZSwgVXBkYXRlRGF0YSwgVGltZXN0YW1wIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbjogT21pdDxOb3RpZmljYXRpb24sICdpZCc+ID0ge1xuICAgIHVzZXJJZCxcbiAgICBwZXJtaXRJZDogcGVybWl0LmlkLFxuICAgIHBlcm1pdE51bWJlcjogcGVybWl0Lm51bWJlciB8fCAnJyxcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgaXNSZWFkOiBmYWxzZSxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgVGltZXN0YW1wLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uIGFzIGFueSk7XG4gIFxuICAvLyBFbnZpYXIgY29ycmVvIGVsZWN0csOzbmljb1xuICBjb25zdCB1c2VyRW1haWwgPSBhd2FpdCBnZXRFbWFpbEZvclVzZXIodXNlcklkKTtcbiAgaWYgKHVzZXJFbWFpbCkge1xuICAgIGF3YWl0IHNlbmRQZXJtaXRVcGRhdGVFbWFpbCh7XG4gICAgICB0bzogdXNlckVtYWlsLFxuICAgICAgc3ViamVjdDogYEFjdHVhbGl6YWNpw7NuIGVuIFBlcm1pc28gU0dUQzogJHtwZXJtaXQubnVtYmVyIHx8IHBlcm1pdC5pZH1gLFxuICAgICAgaHRtbDogYDxwPiR7bWVzc2FnZX08L3A+PHA+UHVlZGVzIHZlciBsb3MgZGV0YWxsZXMgZGVsIHBlcm1pc28gaGFjaWVuZG8gY2xpYyA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vcGVybWl0cy8ke3Blcm1pdC5pZH1cIj5hcXXDrTwvYT4uPC9wPmBcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gLS0tIEZpbiBkZSBGdW5jaW9uZXMgZGUgTm90aWZpY2FjaW9uZXMgLS0tXG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYSkgc2VsZWN0ZWRUeXBlcy5wdXNoKCdDb250cm9sIGRlIEVuZXJnw61hcycpO1xuICBpZiAocGVybWl0Lml6YWplQ2FyZ2FzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0l6YWplIGRlIENhcmdhcycpO1xuICBpZiAocGVybWl0LmV4Y2F2YWNpb25lcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFeGNhdmFjaW9uZXMnKTtcbiAgXG4gIGlmIChzZWxlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChwZXJtaXQudHJhYmFqb0dlbmVyYWwpIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGRhdGEgc3RydWN0dXJlXG4gICAgaWYgKHBlcm1pdC53b3JrVHlwZSAmJiBBcnJheS5pc0FycmF5KHBlcm1pdC53b3JrVHlwZSkpIHtcbiAgICAgIHJldHVybiBwZXJtaXQud29ya1R5cGUubWFwKGtleSA9PiB3b3JrVHlwZXNNYXBba2V5XSB8fCBrZXkpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgfVxuICByZXR1cm4gc2VsZWN0ZWRUeXBlcy5qb2luKCcsICcpO1xufTtcblxuY29uc3QgZ2V0U3RhdHVzVGV4dCA9IChzdGF0dXM6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN0YXR1c1RleHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgJ2JvcnJhZG9yJzogJ0JvcnJhZG9yJyxcbiAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiAnUGVuZGllbnRlIGRlIFJldmlzacOzbicsXG4gICAgICAnYXByb2JhZG8nOiAnQXByb2JhZG8nLFxuICAgICAgJ2VuX2VqZWN1Y2lvbic6ICdFbiBFamVjdWNpw7NuJyxcbiAgICAgICdzdXNwZW5kaWRvJzogJ1N1c3BlbmRpZG8nLFxuICAgICAgJ2NlcnJhZG8nOiAnQ2VycmFkbycsXG4gICAgICAncmVjaGF6YWRvJzogJ1JlY2hhemFkbydcbiAgICB9O1xuICAgIHJldHVybiBzdGF0dXNUZXh0W3N0YXR1c10gfHwgc3RhdHVzO1xuICB9O1xuXG5jb25zdCBzaWduYXR1cmVSb2xlczogeyBba2V5IGluICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcyddOiBzdHJpbmcgfSA9IHtcbiAgY29vcmRpbmFkb3JfYWx0dXJhczogJ0NPT1JESU5BRE9SIERFIFRSQUJBSk9TIEVOIEFMVFVSQVMnLFxuICBzb2xpY2l0YW50ZTogJ1FVSUVOIFNPTElDSVRBIChMw41ERVIgQSBDQVJHTyBERUwgRVFVSVBPIEVKRUNVVEFOVEUpJyxcbiAgYXV0b3JpemFudGU6ICdRVUlFTiBBVVRPUklaQSAoSkVGRVMgWSBEVUXDkU9TIERFIEFSRUEpJyxcbiAgbWFudGVuaW1pZW50bzogJ1BFUlNPTkFMIERFIE1BTlRFTklNSUVOVE8nLFxuICBsaWRlcl9zc3Q6ICdGaXJtYSBTU1QnLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCwgdXNlckRpc3BsYXlOYW1lLCB1c2VyRW1haWwsIHVzZXJQaG90b1VSTCwgLi4ucGVybWl0RGF0YSB9ID0gZGF0YTtcblxuICBjb25zdCBpbml0aWFsQXBwcm92YWxzID0ge1xuICAgIHNvbGljaXRhbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBhdXRvcml6YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbWFudGVuaW1pZW50bzogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbGlkZXJfc3N0OiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBjb29yZGluYWRvcl9hbHR1cmFzOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgfTtcblxuICBjb25zdCBwZXJtaXRQYXlsb2FkOiBPbWl0PFBlcm1pdCwgJ2lkJz4gPSB7XG4gICAgLi4ucGVybWl0RGF0YSxcbiAgICBzdGF0dXM6ICdwZW5kaWVudGVfcmV2aXNpb24nIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgfTtcblxuICB0cnkge1xuICAgIGlmIChkcmFmdElkKSB7XG4gICAgICAvLyBBY3R1YWxpemFyIHVuIGJvcnJhZG9yIGV4aXN0ZW50ZVxuICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKGRyYWZ0SWQpO1xuICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IC4uLnBlcm1pdFBheWxvYWQsIHVwZGF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke2RyYWZ0SWR9YCk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkcmFmdElkLCBpc1VwZGF0ZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhciB1biBudWV2byBib3JyYWRvclxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhUaW1lc3RhbXAgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9O1xuICAgICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBheWxvYWRXaXRoVGltZXN0YW1wIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlLCBlbXByZXNhPzogc3RyaW5nIH0sXG4gIGNvbW1lbnRzPzogc3RyaW5nXG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICF1c2VyIHx8ICF1c2VyLnVpZCB8fCAhdXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXREb2NCZWZvcmUgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0RG9jQmVmb3JlLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7fTtcblxuICAgICAgICAvLyBMw7NnaWNhIHBhcmEgbWFuZWphciBmaXJtYXMgZGUgYXByb2JhY2nDs24geSBkZSBjaWVycmUvY2FuY2VsYWNpw7NuXG4gICAgICAgIGlmIChyb2xlLnN0YXJ0c1dpdGgoJ2NpZXJyZV8nKSB8fCByb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUm9sZSA9IHJvbGUgPT09ICdjaWVycmVfYXV0b3JpZGFkJyA/ICdhdXRvcmlkYWQnIDogKHJvbGUgPT09ICdjaWVycmVfcmVzcG9uc2FibGUnID8gJ3Jlc3BvbnNhYmxlJyA6ICdjYW5jZWxhZG9Qb3InKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVQYXRoID0gYGNsb3N1cmUuJHtjbG9zdXJlUm9sZX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Nsb3N1cmVEYXRhID0gKHBlcm1pdEJlZm9yZURhdGEuY2xvc3VyZSBhcyBhbnkpPy5bY2xvc3VyZVJvbGVdIHx8IHt9O1xuXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2Nsb3N1cmVQYXRoIGFzIGtleW9mIFVwZGF0ZURhdGE8UGVybWl0Pl0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUucmF6b25DYW5jZWxhY2lvbiddID0gY29tbWVudHMgfHwgJ05vIGVzcGVjaWZpY2Fkbyc7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5jYW5jZWxhZG8nXSA9ICdzaSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOKchSBWQUxJREFDScOTTiBERSBQRVJNSVNPUyBBTlRFUyBERSBGSVJNQVJcbiAgICAgICAgICAgIGNvbnN0IGNhblNpZ24gPSBhd2FpdCB2YWxpZGF0ZVNpZ25hdHVyZVBlcm1pc3Npb24ocGVybWl0SWQsIHJvbGUsIHVzZXIpO1xuICAgICAgICAgICAgaWYgKCFjYW5TaWduLmFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGNhblNpZ24ucmVhc29uIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFwcHJvdmFsRGF0YTogUGFydGlhbDxBcHByb3ZhbD4gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYXByb2JhZG8nLFxuICAgICAgICAgICAgICAgIGZpcm1hQXBlcnR1cmE6IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLnVpZCxcbiAgICAgICAgICAgICAgICBzaWduZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBhbnksXG4gICAgICAgICAgICAgICAgdXNlclJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICB1c2VyRW1wcmVzYTogdXNlci5lbXByZXNhIHx8ICdOL0EnLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50cyB8fCAnJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdXBkYXRlRGF0YVtgYXBwcm92YWxzLiR7cm9sZX1gXSA9IGFwcHJvdmFsRGF0YTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g4pyFIEzDk0dJQ0EgTUVKT1JBREE6IENhbWJpbyBkZSBlc3RhZG8gc2Vnw7puIGVsIHJvbCBxdWUgZmlybWFcbiAgICAgICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uUGF5bG9hZDogVmFsaWRhY2lvbkRpYXJpYSA9IHsgXG4gICAgICAgICAgICAgICAgICAgIGRpYTogMSwgXG4gICAgICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgXG4gICAgICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLCBcbiAgICAgICAgICAgICAgICAgICAgZmVjaGE6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOKchSBTT0xJQ0lUQU5URSBGSVJNQTogQ2FtYmlhIGRlIEJvcnJhZG9yIGEgUGVuZGllbnRlIGRlIFJldmlzacOzblxuICAgICAgICAgICAgICAgIGlmIChyb2xlID09PSAnc29saWNpdGFudGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZWwgcmVzcG9uc2FibGVcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWxpZGF0aW9ucyA9IChwZXJtaXRCZWZvcmVEYXRhIGFzIGFueSlbYW5leG9dLnZhbGlkYWNpb24/LnJlc3BvbnNhYmxlIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDinIUgQVVUT1JJWkFOVEUgRklSTUE6IFZlcmlmaWNhIHNpIHNlIHB1ZWRlIGFwcm9iYXIgYXV0b23DoXRpY2FtZW50ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZSBsYSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0EgREUgQVBST0JBQ0nDk05cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBcHByb3ZhbHMgPSB7IC4uLnBlcm1pdEJlZm9yZURhdGE/LmFwcHJvdmFscywgW3JvbGVdOiBhcHByb3ZhbERhdGEgfTtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NUUmVxdWlyZWQgPSBwZXJtaXRCZWZvcmVEYXRhPy5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkO1xuXG4gICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGE/LmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5tYW50ZW5pbWllbnRvPy5zdGF0dXMgPT09ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIENBTUJJTyBBVVRPTcOBVElDTyBBIEFQUk9CQURPIGN1YW5kbyB0b2RhcyBsYXMgZmlybWFzIGVzdMOhblxuICAgICAgICAgICAgaWYgKGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgcGVybWl0QmVmb3JlRGF0YT8uc3RhdHVzID09PSAncGVuZGllbnRlX3JldmlzaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDinIUgTm90aWZpY2FjacOzbiBlc3BlY2lhbCBzaSBlbCBwZXJtaXNvIGZ1ZSBBUFJPQkFETyBhdXRvbcOhdGljYW1lbnRlXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxNZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgZXN0w6EgbGlzdG8gcGFyYSBlamVjdWNpw7NuLmA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBhcHByb3ZhbE1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGZpcm1hIHkgbm90aWZpY2FyOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSB0cmFuc2ljaW9uZXMgZGUgZXN0YWRvXG5mdW5jdGlvbiB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihjdXJyZW50U3RhdHVzOiBQZXJtaXRTdGF0dXMsIHRhcmdldFN0YXR1czogUGVybWl0U3RhdHVzLCB1c2VyUm9sZTogVXNlclJvbGUpOiB7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICBjb25zdCBhbGxvd2VkVHJhbnNpdGlvbnM6IFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgUGFydGlhbDxSZWNvcmQ8UGVybWl0U3RhdHVzLCBVc2VyUm9sZVtdPj4+PiA9IHtcbiAgICAgICAgJ2JvcnJhZG9yJzoge1xuICAgICAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IFsnc29saWNpdGFudGUnLCAnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAncGVuZGllbnRlX3JldmlzaW9uJzoge1xuICAgICAgICAgICAgJ2Fwcm9iYWRvJzogWydhdXRvcml6YW50ZScsICdhZG1pbiddLCAvLyDinIUgQWdyZWdhZG86IGNhbWJpbyBtYW51YWwgYSBhcHJvYmFkb1xuICAgICAgICAgICAgJ3JlY2hhemFkbyc6IFsnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0JywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgICdlbl9lamVjdWNpb24nOiB7XG4gICAgICAgICAgICAnc3VzcGVuZGlkbyc6IFsnbGlkZXJfc3N0JywgJ2FkbWluJ10sXG4gICAgICAgICAgICAnY2VycmFkbyc6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnc3VzcGVuZGlkbyc6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgY29uc3QgYWxsb3dlZFJvbGVzID0gYWxsb3dlZFRyYW5zaXRpb25zW2N1cnJlbnRTdGF0dXNdPy5bdGFyZ2V0U3RhdHVzXTtcbiAgICBpZiAoIWFsbG93ZWRSb2xlcykge1xuICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiBgVHJhbnNpY2nDs24gZGUgJyR7Y3VycmVudFN0YXR1c30nIGEgJyR7dGFyZ2V0U3RhdHVzfScgbm8gZXN0w6EgcGVybWl0aWRhLmAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWFsbG93ZWRSb2xlcy5pbmNsdWRlcyh1c2VyUm9sZSkgJiYgdXNlclJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFR1IHJvbCAoJHt1c2VyUm9sZX0pIG5vIHRpZW5lIHBlcm1pc29zIHBhcmEgY2FtYmlhciBlbCBlc3RhZG8gYSAnJHt0YXJnZXRTdGF0dXN9Jy5gIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsb3dlZDogdHJ1ZSB9O1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMoXG4gIHBlcm1pdElkOiBzdHJpbmcsXG4gIHN0YXR1czogUGVybWl0U3RhdHVzLFxuICBjdXJyZW50VXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwsIHJvbGU/OiBVc2VyUm9sZSB9LFxuICByZWFzb24/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIWN1cnJlbnRVc2VyLnVpZCB8fCAhY3VycmVudFVzZXIucm9sZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zIG8gdXN1YXJpbyBzaW4gcm9sLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIHRyYW5zaWNpw7NuIGRlIGVzdGFkb1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24ocGVybWl0RGF0YS5zdGF0dXMsIHN0YXR1cywgY3VycmVudFVzZXIucm9sZSk7XG4gICAgICAgIGlmICghdHJhbnNpdGlvbi5hbGxvd2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHRyYW5zaXRpb24ucmVhc29uIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIC8vIOKchSBHdWFyZGFyIHJhesOzbiBkZSByZWNoYXpvXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBNYXJjYXIgZmVjaGEgZGUgY2llcnJlXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5mZWNoYUNpZXJyZSddID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUudGVybWluYWRvJ10gPSAnc2knO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyAuLi5wZXJtaXREYXRhLCAuLi51cGRhdGVEYXRhLCBpZDogcGVybWl0SWQgfSBhcyBQZXJtaXQ7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJlZEJ5ID0gY3VycmVudFVzZXI7XG4gICAgICAgIFxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZTogTm90aWZpY2F0aW9uWyd0eXBlJ10gPSAnc3RhdHVzX2NoYW5nZSc7XG4gICAgICAgIGxldCBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjYW1iaWFkbyBlbCBlc3RhZG8gZGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9IGE6ICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfS5gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgYWhvcmEgc2UgZW5jdWVudHJhIGxpc3RvIHBhcmEgZWplY3VjacOzbi5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikgbWVzc2FnZSArPSBgIE1vdGl2bzogJHtyZWFzb259YDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdjYW5jZWxsYXRpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICBpZiAodWlkICE9PSBjdXJyZW50VXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dUQyog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgcGVybWlzb3MgZGUgZmlybWFcbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGxhIGZpcm1hIGRlbCBjb29yZGluYWRvclxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBnZXN0aW9uYXIgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdzb2xpY2l0YW50ZSc6XG4gICAgICAgICAgICBpZiAocGVybWl0LmNyZWF0ZWRCeSAhPT0gY3VycmVudFVzZXIudWlkICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU29sbyBlbCBjcmVhZG9yIGRlbCBwZXJtaXNvIHB1ZWRlIGZpcm1hciBjb21vIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTaSBoYXkgYW5leG8gZGUgYWx0dXJhcywgdmVyaWZpY2FyIGZpcm1hIGRlbCBjb29yZGluYWRvciBwcmltZXJvXG4gICAgICAgICAgICBpZiAocGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzICYmIHBlcm1pdC5hcHByb3ZhbHM/LmNvb3JkaW5hZG9yX2FsdHVyYXM/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdFc3BlcmFuZG8gZmlybWEgZGVsIENvb3JkaW5hZG9yIGRlIFRyYWJham9zIGVuIEFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnYXV0b3JpemFudGUnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhdXRvcml6YW50ZScgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgYXV0b3JpemFudGUgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ0xhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZSBlcyByZXF1ZXJpZGEgcHJpbWVyby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdsaWRlcl9zc3QnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdsaWRlcl9zc3QnICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIEzDrWRlciBTU1QgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIHJlcXVlcmlkYSBwYXJhIGVzdGEgdGFyZWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LnNvbGljaXRhbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ21hbnRlbmltaWVudG8nOlxuICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlci5yb2xlICE9PSAnbWFudGVuaW1pZW50bycgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTWFudGVuaW1pZW50byByZXF1ZXJpZG8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZXJtaXQuY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgTWFudGVuaW1pZW50byBubyByZXF1ZXJpZGEgcGFyYSBlc3RlIHRyYWJham8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIGF1dG9yaXphbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBhbGxvd2VkOiB0cnVlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICBhbmV4b05hbWU6IHN0cmluZywgXG4gIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIFxuICBpbmRleDogbnVtYmVyLCBcbiAgZGF0YTogVmFsaWRhY2lvbkRpYXJpYSwgXG4gIHVzZXI6IFVzZXJcbikge1xuICBpZiAoIXBlcm1pdElkIHx8ICFhbmV4b05hbWUgfHwgIXZhbGlkYXRpb25UeXBlIHx8IGluZGV4IDwgMCB8fCAhZGF0YSB8fCAhdXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICB0cnkge1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgLy8g4pyFIFZlcmlmaWNhciBxdWUgZWwgcGVybWlzbyBlc3TDqSBhcHJvYmFkb1xuICAgIGlmICghWydhcHJvYmFkbycsICdlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIGFwcm9iYWRvcyBvIGVuIGVqZWN1Y2nDs24uJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBgRWwgYW5leG8gJHthbmV4b05hbWV9IG5vIGV4aXN0ZSBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYW5leG9VcGRhdGU6IGFueSA9IHsgLi4uYW5leG9EYXRhIH07XG4gICAgaWYgKCFhbmV4b1VwZGF0ZS52YWxpZGFjaW9uKSB7XG4gICAgICAgIGFuZXhvVXBkYXRlLnZhbGlkYWNpb24gPSB7IGF1dG9yaWRhZDogW10sIHJlc3BvbnNhYmxlOiBbXSB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IChhbmV4b1VwZGF0ZS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZ1bGxQZXJtaXREYXRhID0geyBpZDogZG9jUmVmLmlkLCAuLi5wZXJtaXREYXRhIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGFuZXhvRGlzcGxheU5hbWUgPSBhbmV4b05hbWUucmVwbGFjZSgnYW5leG8nLCAnQW5leG8gJyk7XG4gICAgY29uc3QgdmFsaWRhdGlvblJvbGVOYW1lID0gdmFsaWRhdGlvblR5cGUgPT09ICdhdXRvcmlkYWQnID8gJ0F1dG9yaWRhZCBkZWwgw4FyZWEnIDogJ1Jlc3BvbnNhYmxlIGRlbCBUcmFiYWpvJztcbiAgICBjb25zdCBkYXkgPSBpbmRleCArIDE7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlYWxpemFkbyBsYSB2YWxpZGFjacOzbiBkaWFyaWEgKCR7dmFsaWRhdGlvblJvbGVOYW1lfSkgcGFyYSBlbCBEw41BICR7ZGF5fSBkZWwgJHthbmV4b0Rpc3BsYXlOYW1lfSBlbiBlbCBwZXJtaXNvICMke2Z1bGxQZXJtaXREYXRhLm51bWJlcn0uYDtcbiAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhmdWxsUGVybWl0RGF0YSk7XG4gICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgZnVsbFBlcm1pdERhdGEsIG1lc3NhZ2UsICdzdGF0dXNfY2hhbmdlJywgeyB1aWQ6IHVzZXIudWlkLCBkaXNwbGF5TmFtZTogdXNlci5kaXNwbGF5TmFtZSB8fCBudWxsIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dUQyog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGxhIHZhbGlkYWNpw7NuIGRpYXJpYTpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYSBkZSB2YWxpZGFjacOzbi4nIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFdvcmtlclNpZ25hdHVyZShwZXJtaXRJZDogc3RyaW5nLCB3b3JrZXJJbmRleDogbnVtYmVyLCBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLCBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8IHdvcmtlckluZGV4IDwgMCB8fCAhc2lnbmF0dXJlVHlwZSB8fCAhc2lnbmF0dXJlRGF0YVVybCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIGVzdGFkbyBzZWfDum4gdGlwbyBkZSBmaXJtYVxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnICYmICFbJ2Fwcm9iYWRvJywgJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBlbiBwZXJtaXNvcyBhcHJvYmFkb3MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFDaWVycmUnICYmICFbJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBjaWVycmUgZW4gcGVybWlzb3MgZW4gZWplY3VjacOzbiBvIHN1c3BlbmRpZG9zLicgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgd29ya2VycyA9IHBlcm1pdERhdGEud29ya2VycyA/IFsuLi5wZXJtaXREYXRhLndvcmtlcnNdIDogW107XG5cbiAgICAgICAgaWYgKHdvcmtlckluZGV4ID49IHdvcmtlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICfDjW5kaWNlIGRlIHRyYWJhamFkb3IgaW52w6FsaWRvLicgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2Zpcm1hQXBlcnR1cmEnIDogJ2Zpcm1hQ2llcnJlJztcbiAgICAgICAgY29uc3QgZGF0ZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2ZlY2hhRmlybWFBcGVydHVyYScgOiAnZmVjaGFGaXJtYUNpZXJyZSc7XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVGaWVsZF06IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICBbZGF0ZUZpZWxkXTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIrU0FpUXNCIn0=
}}),
"[project]/src/app/(app)/permits/data:c2ae29 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7edc6233c637b331b2fa6dba912da67e147424b389":"addDailyValidationSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addDailyValidationSignature": (()=>addDailyValidationSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addDailyValidationSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7edc6233c637b331b2fa6dba912da67e147424b389", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addDailyValidationSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCB7IGFkbWluRGIsIGlzQWRtaW5SZWFkeSB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEsIFVzZXIsIE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvdHlwZXMnO1xuaW1wb3J0IHsgRmllbGRWYWx1ZSwgVXBkYXRlRGF0YSwgVGltZXN0YW1wIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbjogT21pdDxOb3RpZmljYXRpb24sICdpZCc+ID0ge1xuICAgIHVzZXJJZCxcbiAgICBwZXJtaXRJZDogcGVybWl0LmlkLFxuICAgIHBlcm1pdE51bWJlcjogcGVybWl0Lm51bWJlciB8fCAnJyxcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgaXNSZWFkOiBmYWxzZSxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgVGltZXN0YW1wLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uIGFzIGFueSk7XG4gIFxuICAvLyBFbnZpYXIgY29ycmVvIGVsZWN0csOzbmljb1xuICBjb25zdCB1c2VyRW1haWwgPSBhd2FpdCBnZXRFbWFpbEZvclVzZXIodXNlcklkKTtcbiAgaWYgKHVzZXJFbWFpbCkge1xuICAgIGF3YWl0IHNlbmRQZXJtaXRVcGRhdGVFbWFpbCh7XG4gICAgICB0bzogdXNlckVtYWlsLFxuICAgICAgc3ViamVjdDogYEFjdHVhbGl6YWNpw7NuIGVuIFBlcm1pc28gU0dUQzogJHtwZXJtaXQubnVtYmVyIHx8IHBlcm1pdC5pZH1gLFxuICAgICAgaHRtbDogYDxwPiR7bWVzc2FnZX08L3A+PHA+UHVlZGVzIHZlciBsb3MgZGV0YWxsZXMgZGVsIHBlcm1pc28gaGFjaWVuZG8gY2xpYyA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vcGVybWl0cy8ke3Blcm1pdC5pZH1cIj5hcXXDrTwvYT4uPC9wPmBcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gLS0tIEZpbiBkZSBGdW5jaW9uZXMgZGUgTm90aWZpY2FjaW9uZXMgLS0tXG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYSkgc2VsZWN0ZWRUeXBlcy5wdXNoKCdDb250cm9sIGRlIEVuZXJnw61hcycpO1xuICBpZiAocGVybWl0Lml6YWplQ2FyZ2FzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0l6YWplIGRlIENhcmdhcycpO1xuICBpZiAocGVybWl0LmV4Y2F2YWNpb25lcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFeGNhdmFjaW9uZXMnKTtcbiAgXG4gIGlmIChzZWxlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChwZXJtaXQudHJhYmFqb0dlbmVyYWwpIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGRhdGEgc3RydWN0dXJlXG4gICAgaWYgKHBlcm1pdC53b3JrVHlwZSAmJiBBcnJheS5pc0FycmF5KHBlcm1pdC53b3JrVHlwZSkpIHtcbiAgICAgIHJldHVybiBwZXJtaXQud29ya1R5cGUubWFwKGtleSA9PiB3b3JrVHlwZXNNYXBba2V5XSB8fCBrZXkpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgfVxuICByZXR1cm4gc2VsZWN0ZWRUeXBlcy5qb2luKCcsICcpO1xufTtcblxuY29uc3QgZ2V0U3RhdHVzVGV4dCA9IChzdGF0dXM6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN0YXR1c1RleHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgJ2JvcnJhZG9yJzogJ0JvcnJhZG9yJyxcbiAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiAnUGVuZGllbnRlIGRlIFJldmlzacOzbicsXG4gICAgICAnYXByb2JhZG8nOiAnQXByb2JhZG8nLFxuICAgICAgJ2VuX2VqZWN1Y2lvbic6ICdFbiBFamVjdWNpw7NuJyxcbiAgICAgICdzdXNwZW5kaWRvJzogJ1N1c3BlbmRpZG8nLFxuICAgICAgJ2NlcnJhZG8nOiAnQ2VycmFkbycsXG4gICAgICAncmVjaGF6YWRvJzogJ1JlY2hhemFkbydcbiAgICB9O1xuICAgIHJldHVybiBzdGF0dXNUZXh0W3N0YXR1c10gfHwgc3RhdHVzO1xuICB9O1xuXG5jb25zdCBzaWduYXR1cmVSb2xlczogeyBba2V5IGluICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcyddOiBzdHJpbmcgfSA9IHtcbiAgY29vcmRpbmFkb3JfYWx0dXJhczogJ0NPT1JESU5BRE9SIERFIFRSQUJBSk9TIEVOIEFMVFVSQVMnLFxuICBzb2xpY2l0YW50ZTogJ1FVSUVOIFNPTElDSVRBIChMw41ERVIgQSBDQVJHTyBERUwgRVFVSVBPIEVKRUNVVEFOVEUpJyxcbiAgYXV0b3JpemFudGU6ICdRVUlFTiBBVVRPUklaQSAoSkVGRVMgWSBEVUXDkU9TIERFIEFSRUEpJyxcbiAgbWFudGVuaW1pZW50bzogJ1BFUlNPTkFMIERFIE1BTlRFTklNSUVOVE8nLFxuICBsaWRlcl9zc3Q6ICdGaXJtYSBTU1QnLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCwgdXNlckRpc3BsYXlOYW1lLCB1c2VyRW1haWwsIHVzZXJQaG90b1VSTCwgLi4ucGVybWl0RGF0YSB9ID0gZGF0YTtcblxuICBjb25zdCBpbml0aWFsQXBwcm92YWxzID0ge1xuICAgIHNvbGljaXRhbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBhdXRvcml6YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbWFudGVuaW1pZW50bzogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbGlkZXJfc3N0OiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBjb29yZGluYWRvcl9hbHR1cmFzOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgfTtcblxuICBjb25zdCBwZXJtaXRQYXlsb2FkOiBPbWl0PFBlcm1pdCwgJ2lkJz4gPSB7XG4gICAgLi4ucGVybWl0RGF0YSxcbiAgICBzdGF0dXM6ICdwZW5kaWVudGVfcmV2aXNpb24nIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgfTtcblxuICB0cnkge1xuICAgIGlmIChkcmFmdElkKSB7XG4gICAgICAvLyBBY3R1YWxpemFyIHVuIGJvcnJhZG9yIGV4aXN0ZW50ZVxuICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKGRyYWZ0SWQpO1xuICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IC4uLnBlcm1pdFBheWxvYWQsIHVwZGF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke2RyYWZ0SWR9YCk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkcmFmdElkLCBpc1VwZGF0ZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhciB1biBudWV2byBib3JyYWRvclxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhUaW1lc3RhbXAgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9O1xuICAgICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBheWxvYWRXaXRoVGltZXN0YW1wIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlLCBlbXByZXNhPzogc3RyaW5nIH0sXG4gIGNvbW1lbnRzPzogc3RyaW5nXG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICF1c2VyIHx8ICF1c2VyLnVpZCB8fCAhdXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXREb2NCZWZvcmUgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0RG9jQmVmb3JlLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7fTtcblxuICAgICAgICAvLyBMw7NnaWNhIHBhcmEgbWFuZWphciBmaXJtYXMgZGUgYXByb2JhY2nDs24geSBkZSBjaWVycmUvY2FuY2VsYWNpw7NuXG4gICAgICAgIGlmIChyb2xlLnN0YXJ0c1dpdGgoJ2NpZXJyZV8nKSB8fCByb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUm9sZSA9IHJvbGUgPT09ICdjaWVycmVfYXV0b3JpZGFkJyA/ICdhdXRvcmlkYWQnIDogKHJvbGUgPT09ICdjaWVycmVfcmVzcG9uc2FibGUnID8gJ3Jlc3BvbnNhYmxlJyA6ICdjYW5jZWxhZG9Qb3InKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVQYXRoID0gYGNsb3N1cmUuJHtjbG9zdXJlUm9sZX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Nsb3N1cmVEYXRhID0gKHBlcm1pdEJlZm9yZURhdGEuY2xvc3VyZSBhcyBhbnkpPy5bY2xvc3VyZVJvbGVdIHx8IHt9O1xuXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2Nsb3N1cmVQYXRoIGFzIGtleW9mIFVwZGF0ZURhdGE8UGVybWl0Pl0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUucmF6b25DYW5jZWxhY2lvbiddID0gY29tbWVudHMgfHwgJ05vIGVzcGVjaWZpY2Fkbyc7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5jYW5jZWxhZG8nXSA9ICdzaSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOKchSBWQUxJREFDScOTTiBERSBQRVJNSVNPUyBBTlRFUyBERSBGSVJNQVJcbiAgICAgICAgICAgIGNvbnN0IGNhblNpZ24gPSBhd2FpdCB2YWxpZGF0ZVNpZ25hdHVyZVBlcm1pc3Npb24ocGVybWl0SWQsIHJvbGUsIHVzZXIpO1xuICAgICAgICAgICAgaWYgKCFjYW5TaWduLmFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGNhblNpZ24ucmVhc29uIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFwcHJvdmFsRGF0YTogUGFydGlhbDxBcHByb3ZhbD4gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYXByb2JhZG8nLFxuICAgICAgICAgICAgICAgIGZpcm1hQXBlcnR1cmE6IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLnVpZCxcbiAgICAgICAgICAgICAgICBzaWduZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBhbnksXG4gICAgICAgICAgICAgICAgdXNlclJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICB1c2VyRW1wcmVzYTogdXNlci5lbXByZXNhIHx8ICdOL0EnLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50cyB8fCAnJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdXBkYXRlRGF0YVtgYXBwcm92YWxzLiR7cm9sZX1gXSA9IGFwcHJvdmFsRGF0YTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g4pyFIEzDk0dJQ0EgTUVKT1JBREE6IENhbWJpbyBkZSBlc3RhZG8gc2Vnw7puIGVsIHJvbCBxdWUgZmlybWFcbiAgICAgICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uUGF5bG9hZDogVmFsaWRhY2lvbkRpYXJpYSA9IHsgXG4gICAgICAgICAgICAgICAgICAgIGRpYTogMSwgXG4gICAgICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgXG4gICAgICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLCBcbiAgICAgICAgICAgICAgICAgICAgZmVjaGE6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOKchSBTT0xJQ0lUQU5URSBGSVJNQTogQ2FtYmlhIGRlIEJvcnJhZG9yIGEgUGVuZGllbnRlIGRlIFJldmlzacOzblxuICAgICAgICAgICAgICAgIGlmIChyb2xlID09PSAnc29saWNpdGFudGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZWwgcmVzcG9uc2FibGVcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWxpZGF0aW9ucyA9IChwZXJtaXRCZWZvcmVEYXRhIGFzIGFueSlbYW5leG9dLnZhbGlkYWNpb24/LnJlc3BvbnNhYmxlIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDinIUgQVVUT1JJWkFOVEUgRklSTUE6IFZlcmlmaWNhIHNpIHNlIHB1ZWRlIGFwcm9iYXIgYXV0b23DoXRpY2FtZW50ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZSBsYSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0EgREUgQVBST0JBQ0nDk05cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBcHByb3ZhbHMgPSB7IC4uLnBlcm1pdEJlZm9yZURhdGE/LmFwcHJvdmFscywgW3JvbGVdOiBhcHByb3ZhbERhdGEgfTtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NUUmVxdWlyZWQgPSBwZXJtaXRCZWZvcmVEYXRhPy5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkO1xuXG4gICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGE/LmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5tYW50ZW5pbWllbnRvPy5zdGF0dXMgPT09ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIENBTUJJTyBBVVRPTcOBVElDTyBBIEFQUk9CQURPIGN1YW5kbyB0b2RhcyBsYXMgZmlybWFzIGVzdMOhblxuICAgICAgICAgICAgaWYgKGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgcGVybWl0QmVmb3JlRGF0YT8uc3RhdHVzID09PSAncGVuZGllbnRlX3JldmlzaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDinIUgTm90aWZpY2FjacOzbiBlc3BlY2lhbCBzaSBlbCBwZXJtaXNvIGZ1ZSBBUFJPQkFETyBhdXRvbcOhdGljYW1lbnRlXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxNZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgZXN0w6EgbGlzdG8gcGFyYSBlamVjdWNpw7NuLmA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBhcHByb3ZhbE1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGZpcm1hIHkgbm90aWZpY2FyOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSB0cmFuc2ljaW9uZXMgZGUgZXN0YWRvXG5mdW5jdGlvbiB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihjdXJyZW50U3RhdHVzOiBQZXJtaXRTdGF0dXMsIHRhcmdldFN0YXR1czogUGVybWl0U3RhdHVzLCB1c2VyUm9sZTogVXNlclJvbGUpOiB7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICBjb25zdCBhbGxvd2VkVHJhbnNpdGlvbnM6IFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgUGFydGlhbDxSZWNvcmQ8UGVybWl0U3RhdHVzLCBVc2VyUm9sZVtdPj4+PiA9IHtcbiAgICAgICAgJ2JvcnJhZG9yJzoge1xuICAgICAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IFsnc29saWNpdGFudGUnLCAnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAncGVuZGllbnRlX3JldmlzaW9uJzoge1xuICAgICAgICAgICAgJ2Fwcm9iYWRvJzogWydhdXRvcml6YW50ZScsICdhZG1pbiddLCAvLyDinIUgQWdyZWdhZG86IGNhbWJpbyBtYW51YWwgYSBhcHJvYmFkb1xuICAgICAgICAgICAgJ3JlY2hhemFkbyc6IFsnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0JywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgICdlbl9lamVjdWNpb24nOiB7XG4gICAgICAgICAgICAnc3VzcGVuZGlkbyc6IFsnbGlkZXJfc3N0JywgJ2FkbWluJ10sXG4gICAgICAgICAgICAnY2VycmFkbyc6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnc3VzcGVuZGlkbyc6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgY29uc3QgYWxsb3dlZFJvbGVzID0gYWxsb3dlZFRyYW5zaXRpb25zW2N1cnJlbnRTdGF0dXNdPy5bdGFyZ2V0U3RhdHVzXTtcbiAgICBpZiAoIWFsbG93ZWRSb2xlcykge1xuICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiBgVHJhbnNpY2nDs24gZGUgJyR7Y3VycmVudFN0YXR1c30nIGEgJyR7dGFyZ2V0U3RhdHVzfScgbm8gZXN0w6EgcGVybWl0aWRhLmAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWFsbG93ZWRSb2xlcy5pbmNsdWRlcyh1c2VyUm9sZSkgJiYgdXNlclJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFR1IHJvbCAoJHt1c2VyUm9sZX0pIG5vIHRpZW5lIHBlcm1pc29zIHBhcmEgY2FtYmlhciBlbCBlc3RhZG8gYSAnJHt0YXJnZXRTdGF0dXN9Jy5gIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsb3dlZDogdHJ1ZSB9O1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMoXG4gIHBlcm1pdElkOiBzdHJpbmcsXG4gIHN0YXR1czogUGVybWl0U3RhdHVzLFxuICBjdXJyZW50VXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwsIHJvbGU/OiBVc2VyUm9sZSB9LFxuICByZWFzb24/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIWN1cnJlbnRVc2VyLnVpZCB8fCAhY3VycmVudFVzZXIucm9sZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zIG8gdXN1YXJpbyBzaW4gcm9sLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIHRyYW5zaWNpw7NuIGRlIGVzdGFkb1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24ocGVybWl0RGF0YS5zdGF0dXMsIHN0YXR1cywgY3VycmVudFVzZXIucm9sZSk7XG4gICAgICAgIGlmICghdHJhbnNpdGlvbi5hbGxvd2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHRyYW5zaXRpb24ucmVhc29uIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIC8vIOKchSBHdWFyZGFyIHJhesOzbiBkZSByZWNoYXpvXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBNYXJjYXIgZmVjaGEgZGUgY2llcnJlXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5mZWNoYUNpZXJyZSddID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUudGVybWluYWRvJ10gPSAnc2knO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyAuLi5wZXJtaXREYXRhLCAuLi51cGRhdGVEYXRhLCBpZDogcGVybWl0SWQgfSBhcyBQZXJtaXQ7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJlZEJ5ID0gY3VycmVudFVzZXI7XG4gICAgICAgIFxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZTogTm90aWZpY2F0aW9uWyd0eXBlJ10gPSAnc3RhdHVzX2NoYW5nZSc7XG4gICAgICAgIGxldCBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjYW1iaWFkbyBlbCBlc3RhZG8gZGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9IGE6ICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfS5gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgYWhvcmEgc2UgZW5jdWVudHJhIGxpc3RvIHBhcmEgZWplY3VjacOzbi5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikgbWVzc2FnZSArPSBgIE1vdGl2bzogJHtyZWFzb259YDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdjYW5jZWxsYXRpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICBpZiAodWlkICE9PSBjdXJyZW50VXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dUQyog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgcGVybWlzb3MgZGUgZmlybWFcbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGxhIGZpcm1hIGRlbCBjb29yZGluYWRvclxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBnZXN0aW9uYXIgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdzb2xpY2l0YW50ZSc6XG4gICAgICAgICAgICBpZiAocGVybWl0LmNyZWF0ZWRCeSAhPT0gY3VycmVudFVzZXIudWlkICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU29sbyBlbCBjcmVhZG9yIGRlbCBwZXJtaXNvIHB1ZWRlIGZpcm1hciBjb21vIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTaSBoYXkgYW5leG8gZGUgYWx0dXJhcywgdmVyaWZpY2FyIGZpcm1hIGRlbCBjb29yZGluYWRvciBwcmltZXJvXG4gICAgICAgICAgICBpZiAocGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzICYmIHBlcm1pdC5hcHByb3ZhbHM/LmNvb3JkaW5hZG9yX2FsdHVyYXM/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdFc3BlcmFuZG8gZmlybWEgZGVsIENvb3JkaW5hZG9yIGRlIFRyYWJham9zIGVuIEFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnYXV0b3JpemFudGUnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhdXRvcml6YW50ZScgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgYXV0b3JpemFudGUgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ0xhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZSBlcyByZXF1ZXJpZGEgcHJpbWVyby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdsaWRlcl9zc3QnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdsaWRlcl9zc3QnICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIEzDrWRlciBTU1QgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIHJlcXVlcmlkYSBwYXJhIGVzdGEgdGFyZWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LnNvbGljaXRhbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ21hbnRlbmltaWVudG8nOlxuICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlci5yb2xlICE9PSAnbWFudGVuaW1pZW50bycgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTWFudGVuaW1pZW50byByZXF1ZXJpZG8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZXJtaXQuY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgTWFudGVuaW1pZW50byBubyByZXF1ZXJpZGEgcGFyYSBlc3RlIHRyYWJham8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIGF1dG9yaXphbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBhbGxvd2VkOiB0cnVlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICBhbmV4b05hbWU6IHN0cmluZywgXG4gIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIFxuICBpbmRleDogbnVtYmVyLCBcbiAgZGF0YTogVmFsaWRhY2lvbkRpYXJpYSwgXG4gIHVzZXI6IFVzZXJcbikge1xuICBpZiAoIXBlcm1pdElkIHx8ICFhbmV4b05hbWUgfHwgIXZhbGlkYXRpb25UeXBlIHx8IGluZGV4IDwgMCB8fCAhZGF0YSB8fCAhdXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICB0cnkge1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgLy8g4pyFIFZlcmlmaWNhciBxdWUgZWwgcGVybWlzbyBlc3TDqSBhcHJvYmFkb1xuICAgIGlmICghWydhcHJvYmFkbycsICdlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIGFwcm9iYWRvcyBvIGVuIGVqZWN1Y2nDs24uJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBgRWwgYW5leG8gJHthbmV4b05hbWV9IG5vIGV4aXN0ZSBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYW5leG9VcGRhdGU6IGFueSA9IHsgLi4uYW5leG9EYXRhIH07XG4gICAgaWYgKCFhbmV4b1VwZGF0ZS52YWxpZGFjaW9uKSB7XG4gICAgICAgIGFuZXhvVXBkYXRlLnZhbGlkYWNpb24gPSB7IGF1dG9yaWRhZDogW10sIHJlc3BvbnNhYmxlOiBbXSB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IChhbmV4b1VwZGF0ZS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZ1bGxQZXJtaXREYXRhID0geyBpZDogZG9jUmVmLmlkLCAuLi5wZXJtaXREYXRhIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGFuZXhvRGlzcGxheU5hbWUgPSBhbmV4b05hbWUucmVwbGFjZSgnYW5leG8nLCAnQW5leG8gJyk7XG4gICAgY29uc3QgdmFsaWRhdGlvblJvbGVOYW1lID0gdmFsaWRhdGlvblR5cGUgPT09ICdhdXRvcmlkYWQnID8gJ0F1dG9yaWRhZCBkZWwgw4FyZWEnIDogJ1Jlc3BvbnNhYmxlIGRlbCBUcmFiYWpvJztcbiAgICBjb25zdCBkYXkgPSBpbmRleCArIDE7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlYWxpemFkbyBsYSB2YWxpZGFjacOzbiBkaWFyaWEgKCR7dmFsaWRhdGlvblJvbGVOYW1lfSkgcGFyYSBlbCBEw41BICR7ZGF5fSBkZWwgJHthbmV4b0Rpc3BsYXlOYW1lfSBlbiBlbCBwZXJtaXNvICMke2Z1bGxQZXJtaXREYXRhLm51bWJlcn0uYDtcbiAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhmdWxsUGVybWl0RGF0YSk7XG4gICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgZnVsbFBlcm1pdERhdGEsIG1lc3NhZ2UsICdzdGF0dXNfY2hhbmdlJywgeyB1aWQ6IHVzZXIudWlkLCBkaXNwbGF5TmFtZTogdXNlci5kaXNwbGF5TmFtZSB8fCBudWxsIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dUQyog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGxhIHZhbGlkYWNpw7NuIGRpYXJpYTpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYSBkZSB2YWxpZGFjacOzbi4nIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFdvcmtlclNpZ25hdHVyZShwZXJtaXRJZDogc3RyaW5nLCB3b3JrZXJJbmRleDogbnVtYmVyLCBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLCBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8IHdvcmtlckluZGV4IDwgMCB8fCAhc2lnbmF0dXJlVHlwZSB8fCAhc2lnbmF0dXJlRGF0YVVybCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIGVzdGFkbyBzZWfDum4gdGlwbyBkZSBmaXJtYVxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnICYmICFbJ2Fwcm9iYWRvJywgJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBlbiBwZXJtaXNvcyBhcHJvYmFkb3MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFDaWVycmUnICYmICFbJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBjaWVycmUgZW4gcGVybWlzb3MgZW4gZWplY3VjacOzbiBvIHN1c3BlbmRpZG9zLicgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgd29ya2VycyA9IHBlcm1pdERhdGEud29ya2VycyA/IFsuLi5wZXJtaXREYXRhLndvcmtlcnNdIDogW107XG5cbiAgICAgICAgaWYgKHdvcmtlckluZGV4ID49IHdvcmtlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICfDjW5kaWNlIGRlIHRyYWJhamFkb3IgaW52w6FsaWRvLicgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2Zpcm1hQXBlcnR1cmEnIDogJ2Zpcm1hQ2llcnJlJztcbiAgICAgICAgY29uc3QgZGF0ZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2ZlY2hhRmlybWFBcGVydHVyYScgOiAnZmVjaGFGaXJtYUNpZXJyZSc7XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVGaWVsZF06IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICBbZGF0ZUZpZWxkXTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxVEEwbkJzQiJ9
}}),
"[project]/src/app/(app)/permits/data:35608f [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4":"addWorkerSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addWorkerSignature": (()=>addWorkerSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addWorkerSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addWorkerSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCB7IGFkbWluRGIsIGlzQWRtaW5SZWFkeSB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEsIFVzZXIsIE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvdHlwZXMnO1xuaW1wb3J0IHsgRmllbGRWYWx1ZSwgVXBkYXRlRGF0YSwgVGltZXN0YW1wIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbjogT21pdDxOb3RpZmljYXRpb24sICdpZCc+ID0ge1xuICAgIHVzZXJJZCxcbiAgICBwZXJtaXRJZDogcGVybWl0LmlkLFxuICAgIHBlcm1pdE51bWJlcjogcGVybWl0Lm51bWJlciB8fCAnJyxcbiAgICBtZXNzYWdlLFxuICAgIHR5cGUsXG4gICAgaXNSZWFkOiBmYWxzZSxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgVGltZXN0YW1wLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uIGFzIGFueSk7XG4gIFxuICAvLyBFbnZpYXIgY29ycmVvIGVsZWN0csOzbmljb1xuICBjb25zdCB1c2VyRW1haWwgPSBhd2FpdCBnZXRFbWFpbEZvclVzZXIodXNlcklkKTtcbiAgaWYgKHVzZXJFbWFpbCkge1xuICAgIGF3YWl0IHNlbmRQZXJtaXRVcGRhdGVFbWFpbCh7XG4gICAgICB0bzogdXNlckVtYWlsLFxuICAgICAgc3ViamVjdDogYEFjdHVhbGl6YWNpw7NuIGVuIFBlcm1pc28gU0dUQzogJHtwZXJtaXQubnVtYmVyIHx8IHBlcm1pdC5pZH1gLFxuICAgICAgaHRtbDogYDxwPiR7bWVzc2FnZX08L3A+PHA+UHVlZGVzIHZlciBsb3MgZGV0YWxsZXMgZGVsIHBlcm1pc28gaGFjaWVuZG8gY2xpYyA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vcGVybWl0cy8ke3Blcm1pdC5pZH1cIj5hcXXDrTwvYT4uPC9wPmBcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gLS0tIEZpbiBkZSBGdW5jaW9uZXMgZGUgTm90aWZpY2FjaW9uZXMgLS0tXG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYSkgc2VsZWN0ZWRUeXBlcy5wdXNoKCdDb250cm9sIGRlIEVuZXJnw61hcycpO1xuICBpZiAocGVybWl0Lml6YWplQ2FyZ2FzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0l6YWplIGRlIENhcmdhcycpO1xuICBpZiAocGVybWl0LmV4Y2F2YWNpb25lcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdFeGNhdmFjaW9uZXMnKTtcbiAgXG4gIGlmIChzZWxlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChwZXJtaXQudHJhYmFqb0dlbmVyYWwpIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGRhdGEgc3RydWN0dXJlXG4gICAgaWYgKHBlcm1pdC53b3JrVHlwZSAmJiBBcnJheS5pc0FycmF5KHBlcm1pdC53b3JrVHlwZSkpIHtcbiAgICAgIHJldHVybiBwZXJtaXQud29ya1R5cGUubWFwKGtleSA9PiB3b3JrVHlwZXNNYXBba2V5XSB8fCBrZXkpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIHJldHVybiAnVHJhYmFqbyBHZW5lcmFsJztcbiAgfVxuICByZXR1cm4gc2VsZWN0ZWRUeXBlcy5qb2luKCcsICcpO1xufTtcblxuY29uc3QgZ2V0U3RhdHVzVGV4dCA9IChzdGF0dXM6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN0YXR1c1RleHQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICAgJ2JvcnJhZG9yJzogJ0JvcnJhZG9yJyxcbiAgICAgICdwZW5kaWVudGVfcmV2aXNpb24nOiAnUGVuZGllbnRlIGRlIFJldmlzacOzbicsXG4gICAgICAnYXByb2JhZG8nOiAnQXByb2JhZG8nLFxuICAgICAgJ2VuX2VqZWN1Y2lvbic6ICdFbiBFamVjdWNpw7NuJyxcbiAgICAgICdzdXNwZW5kaWRvJzogJ1N1c3BlbmRpZG8nLFxuICAgICAgJ2NlcnJhZG8nOiAnQ2VycmFkbycsXG4gICAgICAncmVjaGF6YWRvJzogJ1JlY2hhemFkbydcbiAgICB9O1xuICAgIHJldHVybiBzdGF0dXNUZXh0W3N0YXR1c10gfHwgc3RhdHVzO1xuICB9O1xuXG5jb25zdCBzaWduYXR1cmVSb2xlczogeyBba2V5IGluICdzb2xpY2l0YW50ZScgfCAnYXV0b3JpemFudGUnIHwgJ21hbnRlbmltaWVudG8nIHwgJ2xpZGVyX3NzdCcgfCAnY29vcmRpbmFkb3JfYWx0dXJhcyddOiBzdHJpbmcgfSA9IHtcbiAgY29vcmRpbmFkb3JfYWx0dXJhczogJ0NPT1JESU5BRE9SIERFIFRSQUJBSk9TIEVOIEFMVFVSQVMnLFxuICBzb2xpY2l0YW50ZTogJ1FVSUVOIFNPTElDSVRBIChMw41ERVIgQSBDQVJHTyBERUwgRVFVSVBPIEVKRUNVVEFOVEUpJyxcbiAgYXV0b3JpemFudGU6ICdRVUlFTiBBVVRPUklaQSAoSkVGRVMgWSBEVUXDkU9TIERFIEFSRUEpJyxcbiAgbWFudGVuaW1pZW50bzogJ1BFUlNPTkFMIERFIE1BTlRFTklNSUVOVE8nLFxuICBsaWRlcl9zc3Q6ICdGaXJtYSBTU1QnLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCwgdXNlckRpc3BsYXlOYW1lLCB1c2VyRW1haWwsIHVzZXJQaG90b1VSTCwgLi4ucGVybWl0RGF0YSB9ID0gZGF0YTtcblxuICBjb25zdCBpbml0aWFsQXBwcm92YWxzID0ge1xuICAgIHNvbGljaXRhbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBhdXRvcml6YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbWFudGVuaW1pZW50bzogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgbGlkZXJfc3N0OiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBjb29yZGluYWRvcl9hbHR1cmFzOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgfTtcblxuICBjb25zdCBwZXJtaXRQYXlsb2FkOiBPbWl0PFBlcm1pdCwgJ2lkJz4gPSB7XG4gICAgLi4ucGVybWl0RGF0YSxcbiAgICBzdGF0dXM6ICdwZW5kaWVudGVfcmV2aXNpb24nIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCc+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAnYm9ycmFkb3InIGFzIGNvbnN0LFxuICAgIGNyZWF0ZWRCeTogdXNlcklkLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgfTtcblxuICB0cnkge1xuICAgIGlmIChkcmFmdElkKSB7XG4gICAgICAvLyBBY3R1YWxpemFyIHVuIGJvcnJhZG9yIGV4aXN0ZW50ZVxuICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKGRyYWZ0SWQpO1xuICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IC4uLnBlcm1pdFBheWxvYWQsIHVwZGF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9KTtcbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke2RyYWZ0SWR9YCk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkcmFmdElkLCBpc1VwZGF0ZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhciB1biBudWV2byBib3JyYWRvclxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhUaW1lc3RhbXAgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGNyZWF0ZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSB9O1xuICAgICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBheWxvYWRXaXRoVGltZXN0YW1wIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCwgcm9sZT86IFVzZXJSb2xlLCBlbXByZXNhPzogc3RyaW5nIH0sXG4gIGNvbW1lbnRzPzogc3RyaW5nXG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICF1c2VyIHx8ICF1c2VyLnVpZCB8fCAhdXNlci5yb2xlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXREb2NCZWZvcmUgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGlmICghcGVybWl0RG9jQmVmb3JlLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7fTtcblxuICAgICAgICAvLyBMw7NnaWNhIHBhcmEgbWFuZWphciBmaXJtYXMgZGUgYXByb2JhY2nDs24geSBkZSBjaWVycmUvY2FuY2VsYWNpw7NuXG4gICAgICAgIGlmIChyb2xlLnN0YXJ0c1dpdGgoJ2NpZXJyZV8nKSB8fCByb2xlID09PSAnY2FuY2VsYWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUm9sZSA9IHJvbGUgPT09ICdjaWVycmVfYXV0b3JpZGFkJyA/ICdhdXRvcmlkYWQnIDogKHJvbGUgPT09ICdjaWVycmVfcmVzcG9uc2FibGUnID8gJ3Jlc3BvbnNhYmxlJyA6ICdjYW5jZWxhZG9Qb3InKTtcbiAgICAgICAgICAgIGNvbnN0IGNsb3N1cmVQYXRoID0gYGNsb3N1cmUuJHtjbG9zdXJlUm9sZX1gO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Nsb3N1cmVEYXRhID0gKHBlcm1pdEJlZm9yZURhdGEuY2xvc3VyZSBhcyBhbnkpPy5bY2xvc3VyZVJvbGVdIHx8IHt9O1xuXG4gICAgICAgICAgICB1cGRhdGVEYXRhW2Nsb3N1cmVQYXRoIGFzIGtleW9mIFVwZGF0ZURhdGE8UGVybWl0Pl0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUucmF6b25DYW5jZWxhY2lvbiddID0gY29tbWVudHMgfHwgJ05vIGVzcGVjaWZpY2Fkbyc7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5jYW5jZWxhZG8nXSA9ICdzaSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOKchSBWQUxJREFDScOTTiBERSBQRVJNSVNPUyBBTlRFUyBERSBGSVJNQVJcbiAgICAgICAgICAgIGNvbnN0IGNhblNpZ24gPSBhd2FpdCB2YWxpZGF0ZVNpZ25hdHVyZVBlcm1pc3Npb24ocGVybWl0SWQsIHJvbGUsIHVzZXIpO1xuICAgICAgICAgICAgaWYgKCFjYW5TaWduLmFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGNhblNpZ24ucmVhc29uIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFwcHJvdmFsRGF0YTogUGFydGlhbDxBcHByb3ZhbD4gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYXByb2JhZG8nLFxuICAgICAgICAgICAgICAgIGZpcm1hQXBlcnR1cmE6IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLnVpZCxcbiAgICAgICAgICAgICAgICBzaWduZWRBdDogRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSBhcyBhbnksXG4gICAgICAgICAgICAgICAgdXNlclJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICB1c2VyRW1wcmVzYTogdXNlci5lbXByZXNhIHx8ICdOL0EnLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50cyB8fCAnJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdXBkYXRlRGF0YVtgYXBwcm92YWxzLiR7cm9sZX1gXSA9IGFwcHJvdmFsRGF0YTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g4pyFIEzDk0dJQ0EgTUVKT1JBREE6IENhbWJpbyBkZSBlc3RhZG8gc2Vnw7puIGVsIHJvbCBxdWUgZmlybWFcbiAgICAgICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uUGF5bG9hZDogVmFsaWRhY2lvbkRpYXJpYSA9IHsgXG4gICAgICAgICAgICAgICAgICAgIGRpYTogMSwgXG4gICAgICAgICAgICAgICAgICAgIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgXG4gICAgICAgICAgICAgICAgICAgIGZpcm1hOiBzaWduYXR1cmVEYXRhVXJsLCBcbiAgICAgICAgICAgICAgICAgICAgZmVjaGE6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIOKchSBTT0xJQ0lUQU5URSBGSVJNQTogQ2FtYmlhIGRlIEJvcnJhZG9yIGEgUGVuZGllbnRlIGRlIFJldmlzacOzblxuICAgICAgICAgICAgICAgIGlmIChyb2xlID09PSAnc29saWNpdGFudGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZWwgcmVzcG9uc2FibGVcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWxpZGF0aW9ucyA9IChwZXJtaXRCZWZvcmVEYXRhIGFzIGFueSlbYW5leG9dLnZhbGlkYWNpb24/LnJlc3BvbnNhYmxlIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDinIUgQVVUT1JJWkFOVEUgRklSTUE6IFZlcmlmaWNhIHNpIHNlIHB1ZWRlIGFwcm9iYXIgYXV0b23DoXRpY2FtZW50ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGFjacOzbiBkaWFyaWEgaW5pY2lhbCBkZSBsYSBhdXRvcmlkYWRcbiAgICAgICAgICAgICAgICAgICAgWydhbmV4b0FsdHVyYScsICdhbmV4b0NvbmZpbmFkbycsICdhbmV4b0l6YWplJywgJ2FuZXhvRXhjYXZhY2lvbmVzJ10uZm9yRWFjaChhbmV4byA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KT8uW2FuZXhvXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbGlkYXRpb25zWzBdPy5maXJtYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsaWRhdGlvbnNbMF0gPSB2YWxpZGF0aW9uUGF5bG9hZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5hdXRvcmlkYWRgXSA9IGN1cnJlbnRWYWxpZGF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIFZFUklGSUNBQ0nDk04gQVVUT03DgVRJQ0EgREUgQVBST0JBQ0nDk05cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBcHByb3ZhbHMgPSB7IC4uLnBlcm1pdEJlZm9yZURhdGE/LmFwcHJvdmFscywgW3JvbGVdOiBhcHByb3ZhbERhdGEgfTtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NUUmVxdWlyZWQgPSBwZXJtaXRCZWZvcmVEYXRhPy5pc1NTVFNpZ25hdHVyZVJlcXVpcmVkO1xuXG4gICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgdG9kYXMgbGFzIGZpcm1hcyByZXF1ZXJpZGFzIGVzdMOhbiBjb21wbGV0YXNcbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTaSBoYXkgY29udHJvbCBkZSBlbmVyZ8OtYSwgcmVxdWllcmUgZmlybWEgZGUgbWFudGVuaW1pZW50b1xuICAgICAgICAgICAgaWYgKHBlcm1pdEJlZm9yZURhdGE/LmNvbnRyb2xFbmVyZ2lhKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5tYW50ZW5pbWllbnRvPy5zdGF0dXMgPT09ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFNpIFNTVCBlcyByZXF1ZXJpZG8sIHZhbGlkYXIgc3UgZmlybWFcbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g4pyFIENBTUJJTyBBVVRPTcOBVElDTyBBIEFQUk9CQURPIGN1YW5kbyB0b2RhcyBsYXMgZmlybWFzIGVzdMOhblxuICAgICAgICAgICAgaWYgKGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgcGVybWl0QmVmb3JlRGF0YT8uc3RhdHVzID09PSAncGVuZGllbnRlX3JldmlzaW9uJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ3N0YXR1cyddID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDinIUgTm90aWZpY2FjacOzbiBlc3BlY2lhbCBzaSBlbCBwZXJtaXNvIGZ1ZSBBUFJPQkFETyBhdXRvbcOhdGljYW1lbnRlXG4gICAgICAgIGlmICh1cGRhdGVEYXRhWydzdGF0dXMnXSA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgY29uc3QgYXBwcm92YWxNZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgZXN0w6EgbGlzdG8gcGFyYSBlamVjdWNpw7NuLmA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBhcHByb3ZhbE1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGZpcm1hIHkgbm90aWZpY2FyOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJ1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8g4pyFIEZVTkNJw5NOIE1FSk9SQURBOiBWYWxpZGFjacOzbiBkZSB0cmFuc2ljaW9uZXMgZGUgZXN0YWRvXG5mdW5jdGlvbiB2YWxpZGF0ZVN0YXRlVHJhbnNpdGlvbihjdXJyZW50U3RhdHVzOiBQZXJtaXRTdGF0dXMsIHRhcmdldFN0YXR1czogUGVybWl0U3RhdHVzLCB1c2VyUm9sZTogVXNlclJvbGUpOiB7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICBjb25zdCBhbGxvd2VkVHJhbnNpdGlvbnM6IFBhcnRpYWw8UmVjb3JkPFBlcm1pdFN0YXR1cywgUGFydGlhbDxSZWNvcmQ8UGVybWl0U3RhdHVzLCBVc2VyUm9sZVtdPj4+PiA9IHtcbiAgICAgICAgJ2JvcnJhZG9yJzoge1xuICAgICAgICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6IFsnc29saWNpdGFudGUnLCAnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAncGVuZGllbnRlX3JldmlzaW9uJzoge1xuICAgICAgICAgICAgJ2Fwcm9iYWRvJzogWydhdXRvcml6YW50ZScsICdhZG1pbiddLCAvLyDinIUgQWdyZWdhZG86IGNhbWJpbyBtYW51YWwgYSBhcHJvYmFkb1xuICAgICAgICAgICAgJ3JlY2hhemFkbyc6IFsnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0JywgJ2FkbWluJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2Fwcm9iYWRvJzoge1xuICAgICAgICAgICAgJ2VuX2VqZWN1Y2lvbic6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXSxcbiAgICAgICAgICAgICdyZWNoYXphZG8nOiBbJ2F1dG9yaXphbnRlJywgJ2xpZGVyX3NzdCcsICdhZG1pbiddXG4gICAgICAgIH0sXG4gICAgICAgICdlbl9lamVjdWNpb24nOiB7XG4gICAgICAgICAgICAnc3VzcGVuZGlkbyc6IFsnbGlkZXJfc3N0JywgJ2FkbWluJ10sXG4gICAgICAgICAgICAnY2VycmFkbyc6IFsnbGlkZXJfdGFyZWEnLCAnYWRtaW4nXVxuICAgICAgICB9LFxuICAgICAgICAnc3VzcGVuZGlkbyc6IHtcbiAgICAgICAgICAgICdlbl9lamVjdWNpb24nOiBbJ2xpZGVyX3NzdCcsICdhZG1pbiddLFxuICAgICAgICAgICAgJ2NlcnJhZG8nOiBbJ2xpZGVyX3RhcmVhJywgJ2FkbWluJ11cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgY29uc3QgYWxsb3dlZFJvbGVzID0gYWxsb3dlZFRyYW5zaXRpb25zW2N1cnJlbnRTdGF0dXNdPy5bdGFyZ2V0U3RhdHVzXTtcbiAgICBpZiAoIWFsbG93ZWRSb2xlcykge1xuICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiBgVHJhbnNpY2nDs24gZGUgJyR7Y3VycmVudFN0YXR1c30nIGEgJyR7dGFyZ2V0U3RhdHVzfScgbm8gZXN0w6EgcGVybWl0aWRhLmAgfTtcbiAgICB9XG5cbiAgICBpZiAoIWFsbG93ZWRSb2xlcy5pbmNsdWRlcyh1c2VyUm9sZSkgJiYgdXNlclJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogYFR1IHJvbCAoJHt1c2VyUm9sZX0pIG5vIHRpZW5lIHBlcm1pc29zIHBhcmEgY2FtYmlhciBlbCBlc3RhZG8gYSAnJHt0YXJnZXRTdGF0dXN9Jy5gIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsb3dlZDogdHJ1ZSB9O1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMoXG4gIHBlcm1pdElkOiBzdHJpbmcsXG4gIHN0YXR1czogUGVybWl0U3RhdHVzLFxuICBjdXJyZW50VXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwsIHJvbGU/OiBVc2VyUm9sZSB9LFxuICByZWFzb24/OiBzdHJpbmdcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIWN1cnJlbnRVc2VyLnVpZCB8fCAhY3VycmVudFVzZXIucm9sZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zIG8gdXN1YXJpbyBzaW4gcm9sLicgfTtcbiAgICB9XG4gICAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIHRyYW5zaWNpw7NuIGRlIGVzdGFkb1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdmFsaWRhdGVTdGF0ZVRyYW5zaXRpb24ocGVybWl0RGF0YS5zdGF0dXMsIHN0YXR1cywgY3VycmVudFVzZXIucm9sZSk7XG4gICAgICAgIGlmICghdHJhbnNpdGlvbi5hbGxvd2VkKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHRyYW5zaXRpb24ucmVhc29uIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiBVcGRhdGVEYXRhPFBlcm1pdD4gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIC8vIOKchSBHdWFyZGFyIHJhesOzbiBkZSByZWNoYXpvXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBNYXJjYXIgZmVjaGEgZGUgY2llcnJlXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVsnY2xvc3VyZS5mZWNoYUNpZXJyZSddID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbJ2Nsb3N1cmUudGVybWluYWRvJ10gPSAnc2knO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRQZXJtaXREYXRhID0geyAuLi5wZXJtaXREYXRhLCAuLi51cGRhdGVEYXRhLCBpZDogcGVybWl0SWQgfSBhcyBQZXJtaXQ7XG4gICAgICAgIGNvbnN0IHRyaWdnZXJlZEJ5ID0gY3VycmVudFVzZXI7XG4gICAgICAgIFxuICAgICAgICBsZXQgbm90aWZpY2F0aW9uVHlwZTogTm90aWZpY2F0aW9uWyd0eXBlJ10gPSAnc3RhdHVzX2NoYW5nZSc7XG4gICAgICAgIGxldCBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBjYW1iaWFkbyBlbCBlc3RhZG8gZGVsIHBlcm1pc28gIyR7cGVybWl0RGF0YS5udW1iZXJ9IGE6ICR7Z2V0U3RhdHVzVGV4dChzdGF0dXMpfS5gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnYXBwcm92YWwnO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGBFbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIEFQUk9CQURPIHkgYWhvcmEgc2UgZW5jdWVudHJhIGxpc3RvIHBhcmEgZWplY3VjacOzbi5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikgbWVzc2FnZSArPSBgIE1vdGl2bzogJHtyZWFzb259YDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdjYW5jZWxsYXRpb24nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICBpZiAodWlkICE9PSBjdXJyZW50VXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCB1cGRhdGVkUGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dUQyog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIOKchSBGVU5DScOTTiBNRUpPUkFEQTogVmFsaWRhY2nDs24gZGUgcGVybWlzb3MgZGUgZmlybWFcbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlU2lnbmF0dXJlUGVybWlzc2lvbihcbiAgICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgICBzaWduYXR1cmVSb2xlOiBzdHJpbmcsIFxuICAgIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCByb2xlPzogVXNlclJvbGUgfVxuKTogUHJvbWlzZTx7IGFsbG93ZWQ6IGJvb2xlYW4sIHJlYXNvbj86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXREb2MuZXhpc3RzKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdQZXJtaXNvIG5vIGVuY29udHJhZG8uJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXQgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICBcbiAgICAvLyDinIUgVmVyaWZpY2FyIHF1ZSBlbCBwZXJtaXNvIGVzdMOpIGVuIHVuIGVzdGFkbyB2w6FsaWRvIHBhcmEgZmlybWFyXG4gICAgaWYgKCFbJ2JvcnJhZG9yJywgJ3BlbmRpZW50ZV9yZXZpc2lvbiddLmluY2x1ZGVzKHBlcm1pdC5zdGF0dXMpKSB7XG4gICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246IGBObyBzZSBwdWVkZSBmaXJtYXIgdW4gcGVybWlzbyBlbiBlc3RhZG8gJyR7cGVybWl0LnN0YXR1c30nLmAgfTtcbiAgICB9XG4gICAgXG4gICAgc3dpdGNoIChzaWduYXR1cmVSb2xlKSB7XG4gICAgICAgIGNhc2UgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnOlxuICAgICAgICAgICAgLy8gU29sbyBlbCBjcmVhZG9yIG8gYWRtaW4gcHVlZGUgZ2VzdGlvbmFyIGxhIGZpcm1hIGRlbCBjb29yZGluYWRvclxuICAgICAgICAgICAgaWYgKHBlcm1pdC5jcmVhdGVkQnkgIT09IGN1cnJlbnRVc2VyLnVpZCAmJiBjdXJyZW50VXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ1NvbG8gZWwgY3JlYWRvciBkZWwgcGVybWlzbyBwdWVkZSBnZXN0aW9uYXIgZXN0YSBmaXJtYS4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdzb2xpY2l0YW50ZSc6XG4gICAgICAgICAgICBpZiAocGVybWl0LmNyZWF0ZWRCeSAhPT0gY3VycmVudFVzZXIudWlkICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnU29sbyBlbCBjcmVhZG9yIGRlbCBwZXJtaXNvIHB1ZWRlIGZpcm1hciBjb21vIHNvbGljaXRhbnRlLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTaSBoYXkgYW5leG8gZGUgYWx0dXJhcywgdmVyaWZpY2FyIGZpcm1hIGRlbCBjb29yZGluYWRvciBwcmltZXJvXG4gICAgICAgICAgICBpZiAocGVybWl0LnNlbGVjdGVkV29ya1R5cGVzPy5hbHR1cmFzICYmIHBlcm1pdC5hcHByb3ZhbHM/LmNvb3JkaW5hZG9yX2FsdHVyYXM/LnN0YXR1cyAhPT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdFc3BlcmFuZG8gZmlybWEgZGVsIENvb3JkaW5hZG9yIGRlIFRyYWJham9zIGVuIEFsdHVyYXMuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgY2FzZSAnYXV0b3JpemFudGUnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhdXRvcml6YW50ZScgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgYXV0b3JpemFudGUgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwZXJtaXQuYXBwcm92YWxzPy5zb2xpY2l0YW50ZT8uc3RhdHVzICE9PSAnYXByb2JhZG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYWxsb3dlZDogZmFsc2UsIHJlYXNvbjogJ0xhIGZpcm1hIGRlbCBzb2xpY2l0YW50ZSBlcyByZXF1ZXJpZGEgcHJpbWVyby4nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICBjYXNlICdsaWRlcl9zc3QnOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyLnJvbGUgIT09ICdsaWRlcl9zc3QnICYmIGN1cnJlbnRVc2VyLnJvbGUgIT09ICdhZG1pbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnUm9sIGRlIEzDrWRlciBTU1QgcmVxdWVyaWRvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOKchSBTb2xvIHJlcXVlcmlkbyBzaSBpc1NTVFNpZ25hdHVyZVJlcXVpcmVkIGVzIHRydWVcbiAgICAgICAgICAgIGlmICghcGVybWl0LmlzU1NUU2lnbmF0dXJlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgU1NUIG5vIHJlcXVlcmlkYSBwYXJhIGVzdGEgdGFyZWEuJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LnNvbGljaXRhbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIHNvbGljaXRhbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ21hbnRlbmltaWVudG8nOlxuICAgICAgICAgICAgIGlmIChjdXJyZW50VXNlci5yb2xlICE9PSAnbWFudGVuaW1pZW50bycgJiYgY3VycmVudFVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGFsbG93ZWQ6IGZhbHNlLCByZWFzb246ICdSb2wgZGUgTWFudGVuaW1pZW50byByZXF1ZXJpZG8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZXJtaXQuY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnRmlybWEgZGUgTWFudGVuaW1pZW50byBubyByZXF1ZXJpZGEgcGFyYSBlc3RlIHRyYWJham8uJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBlcm1pdC5hcHByb3ZhbHM/LmF1dG9yaXphbnRlPy5zdGF0dXMgIT09ICdhcHJvYmFkbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhbGxvd2VkOiBmYWxzZSwgcmVhc29uOiAnTGEgZmlybWEgZGVsIGF1dG9yaXphbnRlIGVzIHJlcXVlcmlkYSBwcmltZXJvLicgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBhbGxvd2VkOiB0cnVlIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICBhbmV4b05hbWU6IHN0cmluZywgXG4gIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIFxuICBpbmRleDogbnVtYmVyLCBcbiAgZGF0YTogVmFsaWRhY2lvbkRpYXJpYSwgXG4gIHVzZXI6IFVzZXJcbikge1xuICBpZiAoIXBlcm1pdElkIHx8ICFhbmV4b05hbWUgfHwgIXZhbGlkYXRpb25UeXBlIHx8IGluZGV4IDwgMCB8fCAhZGF0YSB8fCAhdXNlcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgaWYgKCFpc0FkbWluUmVhZHkoKSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gIH1cblxuICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICB0cnkge1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgLy8g4pyFIFZlcmlmaWNhciBxdWUgZWwgcGVybWlzbyBlc3TDqSBhcHJvYmFkb1xuICAgIGlmICghWydhcHJvYmFkbycsICdlbl9lamVjdWNpb24nLCAnc3VzcGVuZGlkbyddLmluY2x1ZGVzKHBlcm1pdERhdGEuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlbiBhZ3JlZ2FyIHZhbGlkYWNpb25lcyBkaWFyaWFzIGVuIHBlcm1pc29zIGFwcm9iYWRvcyBvIGVuIGVqZWN1Y2nDs24uJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBgRWwgYW5leG8gJHthbmV4b05hbWV9IG5vIGV4aXN0ZSBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYW5leG9VcGRhdGU6IGFueSA9IHsgLi4uYW5leG9EYXRhIH07XG4gICAgaWYgKCFhbmV4b1VwZGF0ZS52YWxpZGFjaW9uKSB7XG4gICAgICAgIGFuZXhvVXBkYXRlLnZhbGlkYWNpb24gPSB7IGF1dG9yaWRhZDogW10sIHJlc3BvbnNhYmxlOiBbXSB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IChhbmV4b1VwZGF0ZS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZ1bGxQZXJtaXREYXRhID0geyBpZDogZG9jUmVmLmlkLCAuLi5wZXJtaXREYXRhIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGFuZXhvRGlzcGxheU5hbWUgPSBhbmV4b05hbWUucmVwbGFjZSgnYW5leG8nLCAnQW5leG8gJyk7XG4gICAgY29uc3QgdmFsaWRhdGlvblJvbGVOYW1lID0gdmFsaWRhdGlvblR5cGUgPT09ICdhdXRvcmlkYWQnID8gJ0F1dG9yaWRhZCBkZWwgw4FyZWEnIDogJ1Jlc3BvbnNhYmxlIGRlbCBUcmFiYWpvJztcbiAgICBjb25zdCBkYXkgPSBpbmRleCArIDE7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYCR7dXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlYWxpemFkbyBsYSB2YWxpZGFjacOzbiBkaWFyaWEgKCR7dmFsaWRhdGlvblJvbGVOYW1lfSkgcGFyYSBlbCBEw41BICR7ZGF5fSBkZWwgJHthbmV4b0Rpc3BsYXlOYW1lfSBlbiBlbCBwZXJtaXNvICMke2Z1bGxQZXJtaXREYXRhLm51bWJlcn0uYDtcbiAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhmdWxsUGVybWl0RGF0YSk7XG4gICAgZm9yIChjb25zdCB1aWQgb2YgaW52b2x2ZWRVc2Vycykge1xuICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgZnVsbFBlcm1pdERhdGEsIG1lc3NhZ2UsICdzdGF0dXNfY2hhbmdlJywgeyB1aWQ6IHVzZXIudWlkLCBkaXNwbGF5TmFtZTogdXNlci5kaXNwbGF5TmFtZSB8fCBudWxsIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dUQyog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcblxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBhbCBndWFyZGFyIGxhIHZhbGlkYWNpw7NuIGRpYXJpYTpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYSBkZSB2YWxpZGFjacOzbi4nIH07XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFdvcmtlclNpZ25hdHVyZShwZXJtaXRJZDogc3RyaW5nLCB3b3JrZXJJbmRleDogbnVtYmVyLCBzaWduYXR1cmVUeXBlOiAnZmlybWFBcGVydHVyYScgfCAnZmlybWFDaWVycmUnLCBzaWduYXR1cmVEYXRhVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8IHdvcmtlckluZGV4IDwgMCB8fCAhc2lnbmF0dXJlVHlwZSB8fCAhc2lnbmF0dXJlRGF0YVVybCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGVybWl0U25hcCA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIC8vIOKchSBWYWxpZGFyIGVzdGFkbyBzZWfDum4gdGlwbyBkZSBmaXJtYVxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnICYmICFbJ2Fwcm9iYWRvJywgJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBhcGVydHVyYSBlbiBwZXJtaXNvcyBhcHJvYmFkb3MuJyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaWduYXR1cmVUeXBlID09PSAnZmlybWFDaWVycmUnICYmICFbJ2VuX2VqZWN1Y2lvbicsICdzdXNwZW5kaWRvJ10uaW5jbHVkZXMocGVybWl0RGF0YS5zdGF0dXMpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdTb2xvIHNlIHB1ZWRlIGZpcm1hciBjaWVycmUgZW4gcGVybWlzb3MgZW4gZWplY3VjacOzbiBvIHN1c3BlbmRpZG9zLicgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgd29ya2VycyA9IHBlcm1pdERhdGEud29ya2VycyA/IFsuLi5wZXJtaXREYXRhLndvcmtlcnNdIDogW107XG5cbiAgICAgICAgaWYgKHdvcmtlckluZGV4ID49IHdvcmtlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICfDjW5kaWNlIGRlIHRyYWJhamFkb3IgaW52w6FsaWRvLicgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2Zpcm1hQXBlcnR1cmEnIDogJ2Zpcm1hQ2llcnJlJztcbiAgICAgICAgY29uc3QgZGF0ZUZpZWxkID0gc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ2ZlY2hhRmlybWFBcGVydHVyYScgOiAnZmVjaGFGaXJtYUNpZXJyZSc7XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVGaWVsZF06IHNpZ25hdHVyZURhdGFVcmwsXG4gICAgICAgICAgICBbZGF0ZUZpZWxkXTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI0U0FxdEJzQiJ9
}}),
"[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Textarea": (()=>Textarea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
});
Textarea.displayName = 'Textarea';
;
}}),
"[project]/src/components/ui/radio-group.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RadioGroup": (()=>RadioGroup),
    "RadioGroupItem": (()=>RadioGroupItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-radio-group/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const RadioGroup = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("grid gap-2", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/src/components/ui/radio-group.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
});
RadioGroup.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const RadioGroupItem = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            className: "flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                className: "h-2.5 w-2.5 fill-current text-current"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/radio-group.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/radio-group.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/radio-group.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
});
RadioGroupItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
;
}}),
"[project]/src/app/(app)/permits/[id]/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PermitDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$error$2d$emitter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/error-emitter.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signature.js [app-ssr] (ecmascript) <export default as Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/siren.js [app-ssr] (ecmascript) <export default as Siren>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-down.js [app-ssr] (ecmascript) <export default as FileDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-ssr] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-ssr] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-x.js [app-ssr] (ecmascript) <export default as FileX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/differenceInCalendarDays.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isValid.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$407476__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:407476 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$8518b5__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:8518b5 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$c2ae29__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:c2ae29 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$35608f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:35608f [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/radio-group.tsx [app-ssr] (ecmascript)");
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
// ✅ Helper function to handle different date formats (CORREGIDO)
const parseFirestoreDate = (dateValue)=>{
    if (!dateValue) return null;
    if (typeof dateValue.toDate === 'function') {
        return dateValue.toDate();
    }
    if (dateValue instanceof Date) {
        return dateValue;
    }
    if (typeof dateValue === 'string') {
        const parsed = new Date(dateValue);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }
    }
    return null;
};
// ✅ Helper seguro para formatear fechas (NUEVO)
const safeFormat = (date, fmt)=>{
    const parsedDate = parseFirestoreDate(date);
    return parsedDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValid"])(parsedDate) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parsedDate, fmt) : 'N/A';
};
const getStatusInfo = (status)=>{
    const statusInfo = {
        borrador: {
            text: 'Borrador',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            color: 'text-gray-600',
            bgColor: 'bg-gray-100'
        },
        pendiente_revision: {
            text: 'Pendiente de Revisión',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        aprobado: {
            text: 'Aprobado',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        en_ejecucion: {
            text: 'En Ejecución',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        suspendido: {
            text: 'Suspendido',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"],
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        },
        cerrado: {
            text: 'Cerrado',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        rechazado: {
            text: 'Rechazado',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
            color: 'text-red-600',
            bgColor: 'bg-red-100'
        }
    };
    return statusInfo[status] || {
        text: status,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        color: 'text-gray-500',
        bgColor: 'bg-gray-100'
    };
};
const Section = ({ title, children, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold uppercase text-gray-500 border-b-2 border-gray-300 pb-1 mb-3",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
const Field = ({ label, value, fullWidth })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: fullWidth ? 'col-span-2' : '',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-gray-800 break-words",
                children: value || 'No especificado'
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
// ✨ CORRECCIÓN: Nuevo componente RadioCheck con íconos
const RadioCheck = ({ label, value, spec, onValueChange })=>{
    let status;
    if (value === true || value === 'si') {
        status = 'si';
    } else if (value === false || value === 'no') {
        status = 'no';
    } else {
        status = 'na';
    }
    const iconMap = {
        si: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            className: "h-5 w-5 text-green-500"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 154,
            columnNumber: 13
        }, this),
        no: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "h-5 w-5 text-red-500"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 155,
            columnNumber: 13
        }, this),
        na: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
            className: "h-5 w-5 text-gray-400"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 156,
            columnNumber: 13
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-2 border-b",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs flex-1 pr-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    spec && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded",
                        children: spec
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 26
                    }, this),
                    onValueChange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                        value: status,
                        onValueChange: onValueChange,
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "si"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 166,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Sí"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 166,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "no"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 167,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "No"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 167,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "na"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 168,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "N/A"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 168,
                                columnNumber: 55
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 165,
                        columnNumber: 21
                    }, this) : iconMap[status]
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 160,
        columnNumber: 9
    }, this);
};
const signatureRoles = {
    coordinador_alturas: 'COORDINADOR (ANEXO)',
    solicitante: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
    mantenimiento: 'MANTENIMIENTO (SI APLICA)',
    lider_sst: 'Firma SST',
    autorizante: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)'
};
const signatureConsents = {
    solicitante: "Al firmar, confirma que la información del permiso, ATS y anexos es correcta. El permiso se enviará para autorización y ya no podrá ser modificado.",
    coordinador_alturas: "Al firmar como Coordinador de Trabajos en Alturas, manifiesto que entiendo el trabajo que se va a realizar y sus peligros, se han verificado las condiciones y formulado las medidas de prevención necesarias."
};
function PermitDetailPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user: currentUser, loading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const permitId = params.id;
    const [permit, setPermit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signingRole, setSigningRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signerName, setSignerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSigning, setIsSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signatureObservation, setSignatureObservation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isStatusChanging, setIsStatusChanging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectionReason, setRejectionReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRejectionDialogOpen, setIsRejectionDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDailyValidationSignatureOpen, setIsDailyValidationSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDailyValidationSigning, setIsDailyValidationSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dailyValidationTarget, setDailyValidationTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dailyValidationName, setDailyValidationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [dailyValidationDate, setDailyValidationDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isWorkerSignatureOpen, setIsWorkerSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [workerSignatureTarget, setWorkerSignatureTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isClosureDialogOpen, setIsClosureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCancellationDialogOpen, setIsCancellationDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cancellationReason, setCancellationReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const atsPeligros = [
        {
            seccion: 'LOCATIVOS',
            id: 'superficies_irregulares',
            label: 'Superficies irregulares'
        },
        {
            seccion: 'LOCATIVOS',
            id: 'superficies_deslizantes',
            label: 'Superficies deslizantes'
        },
        {
            seccion: 'LOCATIVOS',
            id: 'diferencia_nivel',
            label: 'Superficies con diferencia de nivel'
        },
        {
            seccion: 'LOCATIVOS',
            id: 'techos_mal_estado',
            label: 'Techos, muros, pisos o paredes en mas estado'
        },
        {
            seccion: 'LOCATIVOS',
            id: 'espacios_reducidos',
            label: 'Espacios reducidos de trabjo'
        },
        {
            seccion: 'FÍSICOS',
            id: 'deficiencia_iluminacion',
            label: 'Deficiencia de iluminación'
        },
        {
            seccion: 'FÍSICOS',
            id: 'exceso_iluminacion',
            label: 'Exceso de iluminación'
        },
        {
            seccion: 'FÍSICOS',
            id: 'ruido_intermitente',
            label: 'Ruido (Intermitente/Continuo/Impacto)'
        },
        {
            seccion: 'FÍSICOS',
            id: 'contacto_superficies_calientes',
            label: 'Contacto con superficies calientes'
        },
        {
            seccion: 'FÍSICOS',
            id: 'exposicion_soldadura',
            label: 'Exposición a arco de soldadura'
        },
        {
            seccion: 'QUÍMICOS',
            id: 'gases_humos_vapores',
            label: 'Gases, humos, vapores y neblinas'
        },
        {
            seccion: 'QUÍMICOS',
            id: 'material_particulado',
            label: 'Material particulado'
        },
        {
            seccion: 'QUÍMICOS',
            id: 'contacto_sustancias_peligrosas',
            label: 'Uso o contacto con materiales o sustancias peligrosas'
        },
        {
            seccion: 'QUÍMICOS',
            id: 'derrame_productos_quimicos',
            label: 'Derrame o fugas de Productos Químicos'
        },
        {
            seccion: 'MECÁNICOS',
            id: 'proyeccion_particulas',
            label: 'Proyección de particulas y frecmentos'
        },
        {
            seccion: 'MECÁNICOS',
            id: 'mecanismos_movimiento',
            label: 'Mecanismos en movimiento'
        },
        {
            seccion: 'MECÁNICOS',
            id: 'manejo_herramientas',
            label: 'Manejo de herrramienta o equipos electricos'
        },
        {
            seccion: 'MECÁNICOS',
            id: 'movimiento_equipos_pesados',
            label: 'Movimiento de equipos de trabajo pesado en sitio'
        },
        {
            seccion: 'MECÁNICOS',
            id: 'exposicion_vibraciones',
            label: 'Exposición a vibraciones por equipos'
        },
        {
            seccion: 'BIOLÓGICOS',
            id: 'exposicion_vectores',
            label: 'Exposición a vectores transmisión de enfermedades'
        },
        {
            seccion: 'BIOLÓGICOS',
            id: 'contaminacion_biologica',
            label: 'Contaminación biológica'
        },
        {
            seccion: 'VIAL',
            id: 'accidente_incidente_vial',
            label: 'Accidente o incidente vial'
        },
        {
            seccion: 'VIAL',
            id: 'atropellamiento_personas',
            label: 'Atropellamiento a personas'
        },
        {
            seccion: 'BIOMECÁNICOS',
            id: 'carga_estatica',
            label: 'Carga Estática (Posturas inadecuadas, prolongadas, forzadas, antigravitación)'
        },
        {
            seccion: 'BIOMECÁNICOS',
            id: 'carga_dinamica',
            label: 'Carga Dinámica (Esfuerzos, Movilización de cargas, Movimientos repetitivos / repetidos)'
        },
        {
            seccion: 'AMBIENTALES',
            id: 'generacion_residuos',
            label: 'Generación de residuos escombros'
        },
        {
            seccion: 'AMBIENTALES',
            id: 'consumo_agua',
            label: 'Consumo de agua en grandes cantidades'
        },
        {
            seccion: 'AMBIENTALES',
            id: 'mezcla_concreto',
            label: 'Mezcla de concreto en suelo'
        },
        {
            seccion: 'AMBIENTALES',
            id: 'emisiones_material_particulado',
            label: 'Emisiones de material particulado'
        }
    ];
    const anexoAlturaAspectos = [
        {
            id: 'afiliacionVigente',
            label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL? '
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
            label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR   TRABAJOS EN ALTURA?'
        },
        {
            id: 'elementosProteccionCertificados',
            label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO E CERTIFICADOS?'
        },
        {
            id: 'sistemaAseguramientoVerificado',
            label: 'G. SE VERIFICO EL SISTEMA DE ASEGURAMIENTO DE LA ESCALERA , ANDAMIO O PLATAFORMA A UNA ESTRUCTURA FIJA'
        },
        {
            id: 'estadoElementosVerificado',
            label: 'H. SE VERIFICO EL ESTADO DE: ESLINGAS, ARNES, CASCO, MOSQUETONES, CASCO, Y DEMAS ELEMENTOS NECESARIOS PARA REALIZAR EL TRABAJO.'
        },
        {
            id: 'puntosAnclajeCertificados',
            label: 'I. LOS PUNTOS DE ANCLAJE Y DEMAS ELEMENTOS CUMPLEN CON LA RESISTENCIA DE 5000 LBS POR PERSONA Y ESTAN CERTIFICADOS?'
        },
        {
            id: 'areaDelimitada',
            label: 'J. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO'
        },
        {
            id: 'personalSaludable',
            label: 'K. EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD PARA LA ACTIVIDAD?.'
        },
        {
            id: 'equiposAccesoBuenEstado',
            label: 'L. SE CUENTA CON TODOS LOS EQUIPOS Y SISTEMAS DE ACCESO PARA TRABJO EN ALTURAS EN BUEN ESTADO?'
        },
        {
            id: 'espacioCaidaLibreSuficiente',
            label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR CHE LA PERSONA SE GOLPEE CONTRA EL NIVEL INFERIOR.'
        },
        {
            id: 'equiposEmergenciaDisponibles',
            label: 'N. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS EN EL AREA Y PLAN DE EMERGENCIAS PARA RESCATE EN ALTURAS?'
        },
        {
            id: 'eppSeleccionadosCorrectamente',
            label: 'O. ESTÁN LOS ELEMENTOS DE PROTECCIÓN PERSONAL SELECCIONADOS TENIENDO EN CUENTA LOS RIESGOS Y REQUERIMIENTOS DE LA TAREA?'
        },
        {
            id: 'plataformaSoportaCarga',
            label: 'P.LA PLATAFORMA O ESTRUCTURA SOPORTA LA CARGA DE TRABAJO, ES FIRME Y SE EVITA LA CAÍDA DE OBJETOS O HERRAMIENTAS?'
        },
        {
            id: 'supervisorConstante',
            label: 'Q.EXISTE UN SUPERVISOR O ACOMPAÑANTE CONSTASTE DURANTE EL TRABAJO'
        },
        {
            id: 'andamiosCompletos',
            label: 'R. EN CASO DE TRABAJOS SOBRE ANDAMIOS, ESTOS ESTAN COMPLETOS Y ADECUADAMENTE ARMADOS (RODAPIES, BARANDAS, ETC.)'
        },
        {
            id: 'condicionesClimaticasAdecuadas',
            label: 'S.LAS CONDICIONES CLIMATICAS SON ADECUADAS PARA REALIZAR EL TRABAJO'
        },
        {
            id: 'metodoSubirHerramientasSeguro',
            label: 'T.EL METODO DE SUBIR HERRAMIENTAS ES SEGURO'
        },
        {
            id: 'sistemasRestriccion',
            label: 'U. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE RESTRICCIÓN'
        },
        {
            id: 'sistemasPosicionamiento',
            label: 'V. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE POSICIONAMIENTO'
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!permitId) {
            setError('ID de permiso no válido.');
            setLoading(false);
            return;
        }
        let isMounted = true;
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'permits', permitId);
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(docRef, (docSnap)=>{
            if (isMounted) {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPermit({
                        id: docSnap.id,
                        ...data
                    });
                    setError(null);
                } else {
                    setError('No se encontró el permiso de trabajo.');
                    setPermit(null);
                }
                setLoading(false);
            }
        }, (serverError)=>{
            if (isMounted) {
                const permissionError = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirestorePermissionError"]({
                    path: docRef.path,
                    operation: 'get'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$error$2d$emitter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorEmitter"].emit('permission-error', permissionError);
                setError('No tiene permisos para ver este documento.');
                setLoading(false);
            }
        });
        return ()=>{
            isMounted = false;
            unsubscribe();
        };
    }, [
        permitId
    ]);
    const handleExportToPDF = async ()=>{
        if (!permit) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Datos del permiso no disponibles.'
            });
            return;
        }
        toast({
            title: 'Generando PDF...',
            description: 'Por favor, espere un momento.'
        });
        const logoBase64 = "DEJA ESTE CAMPO ASÍ PARA AGREGARLO MANUALMENTE";
        try {
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'letter');
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 10;
            let yPos = margin;
            // Colores corporativos
            const italcolOrange = [
                239,
                123,
                0
            ];
            // ===== FUNCIONES HELPER =====
            const checkPageBreak = (neededHeight)=>{
                if (yPos + neededHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
            };
            const drawHeader = (title, code = "DN-FR-SST-016", version = "04")=>{
                // Logo
                try {
                    if ("TURBOPACK compile-time falsy", 0) {
                        "TURBOPACK unreachable";
                    } else {
                        doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
                        doc.rect(margin, yPos, 30, 20, 'F');
                    }
                } catch (e) {
                    console.error('Error al cargar logo:', e);
                    doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
                    doc.rect(margin, yPos, 30, 20, 'F');
                }
                // Título
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(title.toUpperCase(), pageWidth / 2, yPos + 12, {
                    align: 'center'
                });
                // Código y versión
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.text(`Código: ${code}`, pageWidth - margin, yPos + 8, {
                    align: 'right'
                });
                doc.text(`Versión: ${version}`, pageWidth - margin, yPos + 13, {
                    align: 'right'
                });
                // Línea separadora naranja
                doc.setDrawColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
                doc.setLineWidth(1);
                doc.line(margin, yPos + 26, pageWidth - margin, yPos + 26);
                yPos += 30;
            };
            const drawSectionTitle = (title)=>{
                checkPageBreak(12);
                doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
                doc.rect(margin, yPos, pageWidth - 2 * margin, 6, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.text(title.toUpperCase(), pageWidth / 2, yPos + 4, {
                    align: 'center'
                });
                yPos += 8;
                doc.setTextColor(0, 0, 0);
            };
            const drawSignatureBox = (roleTitle, approval, x, y, width, height)=>{
                doc.rect(x, y, width, height);
                doc.setFontSize(6);
                doc.setFont('helvetica', 'bold');
                doc.text(roleTitle, x + 2, y + 3);
                if (approval?.status === 'aprobado') {
                    doc.setFont('helvetica', 'normal');
                    doc.text(approval.userName || '', x + 2, y + 8);
                    // Intentar agregar firma
                    if (approval.firmaApertura) {
                        try {
                            doc.addImage(approval.firmaApertura, 'PNG', x + 5, y + 10, 40, 15);
                        } catch (e) {
                            console.error(`Error adding signature for ${roleTitle}:`, e);
                            doc.setFontSize(5);
                            doc.text('[Firma no disponible]', x + 5, y + 15);
                        }
                    }
                    doc.setFontSize(6);
                    doc.text(safeFormat(approval.signedAt, 'dd/MM/yy HH:mm'), x + 2, y + 28);
                } else {
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(6);
                    doc.text('Pendiente', x + 2, y + 15);
                }
            };
            const drawDailyValidationTable = (validationData, permitDuration)=>{
                checkPageBreak(50);
                drawSectionTitle("VALIDACIÓN DIARIA");
                const bodyData = Array.from({
                    length: permitDuration
                }, (_, idx)=>{
                    const valRes = validationData?.responsable?.[idx];
                    const valAut = validationData?.autoridad?.[idx];
                    return [
                        `DÍA ${idx + 1}`,
                        valRes?.nombre || '',
                        safeFormat(valRes?.fecha, 'dd/MM/yy'),
                        valAut?.nombre || '',
                        safeFormat(valAut?.fecha, 'dd/MM/yy')
                    ];
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    head: [
                        [
                            {
                                content: 'DÍA',
                                rowSpan: 2,
                                styles: {
                                    valign: 'middle',
                                    halign: 'center'
                                }
                            },
                            {
                                content: 'RESPONSABLE DEL TRABAJO',
                                colSpan: 2,
                                styles: {
                                    halign: 'center'
                                }
                            },
                            {
                                content: 'AUTORIDAD DEL ÁREA',
                                colSpan: 2,
                                styles: {
                                    halign: 'center'
                                }
                            }
                        ],
                        [
                            'NOMBRE',
                            'FECHA',
                            'NOMBRE',
                            'FECHA'
                        ]
                    ],
                    body: bodyData,
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 1
                    },
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
                        ]
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
            };
            // Calcular duración del permiso
            let permitDuration = 1;
            if (permit.generalInfo?.validFrom && permit.generalInfo?.validUntil) {
                try {
                    const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo.validFrom);
                    const endDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo.validUntil);
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValid"])(startDate) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValid"])(endDate)) {
                        permitDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(endDate, startDate) + 1;
                    }
                } catch (e) {
                    console.error("Error parsing dates:", e);
                }
            }
            // ===== CONTENIDO DEL PDF =====
            // ENCABEZADO
            drawHeader('PERMISO DE TRABAJO');
            // ✅ INFORMACIÓN GENERAL - COMPLETO
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                startY: yPos,
                body: [
                    [
                        {
                            content: 'Fecha Expedición:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        safeFormat(permit.createdAt, 'dd/MM/yyyy'),
                        {
                            content: 'Planta:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.generalInfo?.planta || ''
                    ],
                    [
                        {
                            content: 'Empresa:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.generalInfo?.empresa || '',
                        {
                            content: 'Solicitante:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.user?.displayName || ''
                    ],
                    [
                        {
                            content: 'Contrato:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.generalInfo?.contrato || '',
                        {
                            content: 'Área Específica:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.generalInfo?.areaEspecifica || ''
                    ],
                    [
                        {
                            content: 'Proceso:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.generalInfo?.proceso || '',
                        {
                            content: 'Número Permiso:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        permit.number || permit.id.substring(0, 8)
                    ],
                    [
                        {
                            content: 'Válido Desde:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        safeFormat(permit.generalInfo?.validFrom, 'dd/MM/yy HH:mm'),
                        {
                            content: 'Válido Hasta:',
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        safeFormat(permit.generalInfo?.validUntil, 'dd/MM/yy HH:mm')
                    ],
                    [
                        {
                            content: 'Tipos de Trabajo:',
                            colSpan: 3,
                            styles: {
                                fontStyle: 'bold',
                                fillColor: [
                                    240,
                                    240,
                                    240
                                ]
                            }
                        },
                        getWorkTypesString(permit)
                    ]
                ],
                theme: 'grid',
                styles: {
                    fontSize: 7,
                    cellPadding: 1.5,
                    lineColor: [
                        0,
                        0,
                        0
                    ],
                    lineWidth: 0.1
                },
                columnStyles: {
                    0: {
                        cellWidth: 40
                    },
                    2: {
                        cellWidth: 40
                    }
                }
            });
            yPos = doc.lastAutoTable.finalY + 5;
            // ✅ ALCANCE
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                startY: yPos,
                head: [
                    [
                        {
                            content: 'DESCRIPCIÓN DEL TRABAJO (ALCANCE)',
                            styles: {
                                fillColor: [
                                    220,
                                    220,
                                    220
                                ],
                                textColor: [
                                    0,
                                    0,
                                    0
                                ],
                                fontStyle: 'bold'
                            }
                        }
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
                    cellPadding: 2,
                    lineColor: [
                        0,
                        0,
                        0
                    ],
                    lineWidth: 0.1
                }
            });
            yPos = doc.lastAutoTable.finalY + 5;
            // ✅ ATS - PELIGROS IDENTIFICADOS
            if (permit.anexoATS?.peligros) {
                drawSectionTitle('ANÁLISIS DE TRABAJO SEGURO (ATS) - PELIGROS IDENTIFICADOS');
                const activeRisks = atsPeligros.filter((p)=>permit.anexoATS?.peligros?.[p.id] === 'si');
                if (activeRisks.length > 0) {
                    const risksBySection = activeRisks.reduce((acc, r)=>{
                        if (!acc[r.seccion]) acc[r.seccion] = [];
                        acc[r.seccion].push(r.label);
                        return acc;
                    }, {});
                    const riskRows = Object.entries(risksBySection).flatMap(([section, risks])=>[
                            [
                                {
                                    content: `${section}:`,
                                    styles: {
                                        fontStyle: 'bold',
                                        fillColor: [
                                            245,
                                            245,
                                            245
                                        ]
                                    },
                                    colSpan: 2
                                }
                            ],
                            ...risks.map((risk)=>[
                                    `✓ ${risk}`,
                                    ''
                                ])
                        ]);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: riskRows,
                        theme: 'grid',
                        styles: {
                            fontSize: 6,
                            cellPadding: 1
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
            }
            // ✅ EPP REQUERIDOS - DETALLADO
            if (permit.anexoATS?.epp) {
                drawSectionTitle('EQUIPOS DE PROTECCIÓN PERSONAL (EPP)');
                const eppData = {};
                Object.entries(permit.anexoATS.epp).forEach(([key, value])=>{
                    if (value === true || value === 'si') {
                        const category = Object.entries(eppOptions).find(([_, items])=>items.some((item)=>item.id === key))?.[0] || 'Otros';
                        if (!eppData[category]) eppData[category] = [];
                        const itemLabel = Object.entries(eppOptions).flatMap(([_, items])=>items).find((item)=>item.id === key)?.label || key;
                        const spec = permit.anexoATS.epp[`${key}_spec`];
                        eppData[category].push(spec ? `${itemLabel} - ${spec}` : itemLabel);
                    }
                });
                if (Object.keys(eppData).length > 0) {
                    const eppRows = Object.entries(eppData).flatMap(([category, items])=>[
                            [
                                {
                                    content: `${category}:`,
                                    styles: {
                                        fontStyle: 'bold',
                                        fillColor: [
                                            245,
                                            245,
                                            245
                                        ]
                                    },
                                    colSpan: 2
                                }
                            ],
                            ...items.map((item)=>[
                                    `• ${item}`,
                                    ''
                                ])
                        ]);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: eppRows,
                        theme: 'grid',
                        styles: {
                            fontSize: 6,
                            cellPadding: 1
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
            }
            // ✅ JUSTIFICACIÓN DE USO
            if (permit.anexoATS?.justificacion) {
                drawSectionTitle('JUSTIFICACIÓN DE USO DEL PERMISO');
                const justSelected = justificacionOptions.find((j)=>permit.anexoATS?.justificacion?.[j.id] === 'si');
                if (justSelected) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: [
                            [
                                justSelected.label
                            ]
                        ],
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 2
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
            }
            // ✅ PERSONAL AUTORIZADO
            if (permit.workers && permit.workers.length > 0) {
                drawSectionTitle('PERSONAL AUTORIZADO');
                const workerRows = permit.workers.map((w)=>[
                        `${w.nombre}\nC.C. ${w.cedula}`,
                        w.rol === 'Otro' ? w.otroRol : w.rol,
                        (w.eps ? 'EPS ' : '') + (w.arl ? 'ARL ' : '') + (w.pensiones ? 'AFP' : ''),
                        w.entrenamiento?.tec ? 'TEC' : w.entrenamiento?.tsa ? 'TSA' : 'Otro',
                        w.firmaApertura ? 'FIRMADO' : 'PENDIENTE'
                    ]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    head: [
                        [
                            'NOMBRE / CÉDULA',
                            'ROL',
                            'AFILIACIÓN',
                            'ENTRENAMIENTO',
                            'FIRMA APERTURA'
                        ]
                    ],
                    body: workerRows,
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
                    styles: {
                        fontSize: 6,
                        cellPadding: 1.5
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
            }
            // ✅ AUTORIZACIONES
            checkPageBreak(40);
            drawSectionTitle('AUTORIZACIONES Y FIRMAS APERTURA');
            const sigBoxW = (pageWidth - 2 * margin) / 3;
            const sigBoxH = 35;
            drawSignatureBox('SOLICITANTE', permit.approvals?.solicitante, margin, yPos, sigBoxW, sigBoxH);
            drawSignatureBox('AUTORIZANTE', permit.approvals?.autorizante, margin + sigBoxW, yPos, sigBoxW, sigBoxH);
            drawSignatureBox('SST', permit.approvals?.lider_sst, margin + 2 * sigBoxW, yPos, sigBoxW, sigBoxH);
            yPos += sigBoxH + 5;
            // ===== ANEXOS DINÁMICOS =====
            // ✅ ANEXO 1: TRABAJO EN ALTURAS (SOLO SI ESTÁ SELECCIONADO)
            if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
                checkPageBreak(100);
                drawSectionTitle('ANEXO 1 - TRABAJO EN ALTURAS');
                // Información general
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    body: [
                        [
                            {
                                content: 'Altura Aproximada (m):',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            permit.anexoAltura.alturaAproximada || 'N/A'
                        ],
                        [
                            {
                                content: 'Tipo de Estructura:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            Object.keys(permit.anexoAltura.tipoEstructura || {}).filter((k)=>(permit.anexoAltura?.tipoEstructura)[k]).map((k)=>{
                                const label = anexoAlturaEstructuras.find((e)=>e.id === k)?.label || k;
                                if (k === 'otros') {
                                    const cual = (permit.anexoAltura?.tipoEstructura).otrosCual;
                                    return cual ? `${label} - ${cual}` : label;
                                }
                                return label;
                            }).join(', ')
                        ]
                    ],
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 1.5
                    },
                    columnStyles: {
                        0: {
                            cellWidth: 50
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 3;
                // Aspectos de seguridad
                const alturaChecks = anexoAlturaAspectos.map((asp)=>[
                        asp.label,
                        permit.anexoAltura?.aspectosSeguridad?.[asp.id] === 'si' ? '✓ SÍ' : '✗ NO'
                    ]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    head: [
                        [
                            'REQUISITOS DE SEGURIDAD',
                            'CUMPLE'
                        ]
                    ],
                    body: alturaChecks,
                    theme: 'grid',
                    styles: {
                        fontSize: 6,
                        cellPadding: 1
                    },
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
                        ]
                    },
                    columnStyles: {
                        1: {
                            halign: 'center',
                            cellWidth: 20
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
                // Validación diaria
                if (permit.anexoAltura.validacion?.responsable?.length || permit.anexoAltura.validacion?.autoridad?.length) {
                    drawDailyValidationTable(permit.anexoAltura.validacion, permitDuration);
                }
                // Firma del Coordinador de Alturas
                if (permit.approvals?.coordinador_alturas?.status === 'aprobado') {
                    checkPageBreak(15);
                    drawSectionTitle('FIRMA COORDINADOR DE TRABAJOS EN ALTURAS');
                    drawSignatureBox('COORDINADOR', permit.approvals.coordinador_alturas, margin, yPos, pageWidth - 2 * margin, 30);
                    yPos += 35;
                }
            }
            // ✅ ANEXO 2: ESPACIOS CONFINADOS (SOLO SI ESTÁ SELECCIONADO)
            if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
                checkPageBreak(80);
                drawSectionTitle('ANEXO 2 - ESPACIOS CONFINADOS');
                // Pruebas de gases iniciales
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    head: [
                        [
                            'PARÁMETRO',
                            'VALOR',
                            'LÍMITE PERMISIBLE',
                            'CUMPLE'
                        ]
                    ],
                    body: [
                        [
                            'LEL (%)',
                            permit.anexoConfinado.resultadosPruebasGases?.lel || '-',
                            '0%',
                            permit.anexoConfinado.resultadosPruebasGases?.lel === '0%' ? '✓' : '✗'
                        ],
                        [
                            'O2 (%)',
                            permit.anexoConfinado.resultadosPruebasGases?.o2 || '-',
                            '19.5-22%',
                            (permit.anexoConfinado.resultadosPruebasGases?.o2 || '').includes('19.5') || (permit.anexoConfinado.resultadosPruebasGases?.o2 || '').includes('22') ? '✓' : '?'
                        ],
                        [
                            'H2S (PPM)',
                            permit.anexoConfinado.resultadosPruebasGases?.h2s || '-',
                            '0-10',
                            '?'
                        ],
                        [
                            'CO (PPM)',
                            permit.anexoConfinado.resultadosPruebasGases?.co || '-',
                            '0-25',
                            '?'
                        ]
                    ],
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
                    styles: {
                        halign: 'center',
                        fontSize: 6,
                        cellPadding: 1
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
                // Pruebas periódicas
                if (permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.length) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        head: [
                            [
                                'HORA',
                                'LEL %',
                                'O2 %',
                                'H2S ppm',
                                'CO ppm'
                            ]
                        ],
                        body: permit.anexoConfinado.pruebasGasesPeriodicas.pruebas.map((p)=>[
                                p.hora,
                                p.lel,
                                p.o2,
                                p.h2s,
                                p.co
                            ]),
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
                        styles: {
                            halign: 'center',
                            fontSize: 6,
                            cellPadding: 1
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
                // Validación diaria
                if (permit.anexoConfinado.validacion?.responsable?.length || permit.anexoConfinado.validacion?.autoridad?.length) {
                    drawDailyValidationTable(permit.anexoConfinado.validacion, permitDuration);
                }
            }
            // ✅ ANEXO 3: CONTROL DE ENERGÍAS (SOLO SI ESTÁ SELECCIONADO)
            if (permit.selectedWorkTypes?.energia && permit.anexoEnergias) {
                checkPageBreak(40);
                drawSectionTitle('ANEXO 3 - CONTROL DE ENERGÍAS');
                const energiasActivas = Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).filter(([_, value])=>value).map(([key])=>key.replace(/([A-Z])/g, ' $1').trim());
                if (energiasActivas.length > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        head: [
                            [
                                'TIPOS DE ENERGÍA IDENTIFICADOS'
                            ]
                        ],
                        body: energiasActivas.map((e)=>[
                                e
                            ]),
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
                            ]
                        },
                        styles: {
                            fontSize: 7,
                            cellPadding: 1
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
                // Método de control
                if (permit.anexoEnergias.metodosControl) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: [
                            [
                                'Método Seleccionado:',
                                Object.keys(permit.anexoEnergias.metodosControl).filter((k)=>(permit.anexoEnergias?.metodosControl)[k]).join(', ')
                            ]
                        ],
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
                // Información de voltaje si aplica
                if (permit.anexoEnergias.sistemaElectrico?.tensionNominal) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: [
                            [
                                'Tensión Nominal Sistema:',
                                permit.anexoEnergias.sistemaElectrico.tensionNominal
                            ],
                            [
                                'Tensión Personal Expuesto:',
                                permit.anexoEnergias.sistemaElectrico.tensionPersonal || '-'
                            ],
                            [
                                'Distancia de Seguridad:',
                                permit.anexoEnergias.sistemaElectrico.distanciaSeguridad || '-'
                            ]
                        ],
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
            }
            // ✅ ANEXO 4: IZAJE DE CARGAS (SOLO SI ESTÁ SELECCIONADO)
            if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
                checkPageBreak(60);
                drawSectionTitle('ANEXO 4 - IZAJE DE CARGAS');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    body: [
                        [
                            {
                                content: 'Acción:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
                        ],
                        [
                            {
                                content: 'Rango de Peso:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k.replace('menor', '< ').replace('mas', '> ').replace('entre', '')).join(', ') + ' kg'
                        ],
                        [
                            {
                                content: 'Equipo a Utilizar:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k.replace(/([A-Z])/g, ' $1').toUpperCase()).join(', ')
                        ]
                    ],
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 1.5
                    },
                    columnStyles: {
                        0: {
                            cellWidth: 50
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
                // Validación diaria
                if (permit.anexoIzaje.validacion?.responsable?.length || permit.anexoIzaje.validacion?.autoridad?.length) {
                    drawDailyValidationTable(permit.anexoIzaje.validacion, permitDuration);
                }
            }
            // ✅ ANEXO 5: EXCAVACIONES (SOLO SI ESTÁ SELECCIONADO)
            if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
                checkPageBreak(60);
                drawSectionTitle('ANEXO 5 - EXCAVACIONES');
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    body: [
                        [
                            {
                                content: 'Profundidad:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            permit.anexoExcavaciones.informacionGeneral.profundidad || 'N/A'
                        ],
                        [
                            {
                                content: 'Ancho:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            permit.anexoExcavaciones.informacionGeneral.ancho || 'N/A'
                        ],
                        [
                            {
                                content: 'Largo:',
                                styles: {
                                    fontStyle: 'bold',
                                    fillColor: [
                                        240,
                                        240,
                                        240
                                    ]
                                }
                            },
                            permit.anexoExcavaciones.informacionGeneral.largo || 'N/A'
                        ]
                    ],
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 1.5
                    },
                    columnStyles: {
                        0: {
                            cellWidth: 30
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
                // Validación diaria
                if (permit.anexoExcavaciones.validacion?.responsable?.length || permit.anexoExcavaciones.validacion?.autoridad?.length) {
                    drawDailyValidationTable(permit.anexoExcavaciones.validacion, permitDuration);
                }
            }
            // ✅ CIERRE Y CANCELACIÓN (SI APLICA)
            if (permit.closure && (permit.closure.terminado || permit.closure.cancelado)) {
                checkPageBreak(50);
                drawSectionTitle('CIERRE O CANCELACIÓN DEL PERMISO');
                if (permit.closure.cancelado) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: [
                            [
                                {
                                    content: 'CANCELACIÓN',
                                    styles: {
                                        fontStyle: 'bold',
                                        fillColor: [
                                            255,
                                            200,
                                            200
                                        ]
                                    }
                                }
                            ],
                            [
                                'Razón:',
                                permit.closure.razonCancelacion || 'No especificado'
                            ],
                            [
                                'Cancelado por:',
                                permit.closure.canceladoPor?.nombre || 'N/A'
                            ],
                            [
                                'Fecha:',
                                safeFormat(permit.closure.canceladoPor?.fecha, 'dd/MM/yy HH:mm')
                            ]
                        ],
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        }
                    });
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: [
                            [
                                {
                                    content: 'CIERRE',
                                    styles: {
                                        fontStyle: 'bold',
                                        fillColor: [
                                            200,
                                            220,
                                            255
                                        ]
                                    }
                                }
                            ],
                            [
                                'Observaciones:',
                                permit.closure.observacionesCierre || 'No especificado'
                            ],
                            [
                                'Responsable:',
                                permit.closure.responsable?.nombre || 'N/A'
                            ],
                            [
                                'Autoridad:',
                                permit.closure.autoridad?.nombre || 'N/A'
                            ],
                            [
                                'Fecha Cierre:',
                                safeFormat(permit.closure.responsable?.fecha, 'dd/MM/yy HH:mm')
                            ]
                        ],
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        }
                    });
                }
                yPos = doc.lastAutoTable.finalY + 5;
            }
            // FOOTER EN TODAS LAS PÁGINAS
            const totalPages = doc.internal.getNumberOfPages();
            for(let i = 1; i <= totalPages; i++){
                doc.setPage(i);
                doc.setFontSize(7);
                doc.setTextColor(150);
                doc.text(`Página ${i} de ${totalPages} | Documento: DN-FR-SST-016 V04`, pageWidth / 2, pageHeight - 8, {
                    align: 'center'
                });
            }
            // GUARDAR PDF
            doc.save(`Permiso_Italcol_${permit.number || permit.id.substring(0, 6)}.pdf`);
            toast({
                title: '✓ PDF Generado',
                description: 'Se ha descargado el formato oficial completo.',
                className: 'bg-green-100'
            });
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            toast({
                variant: 'destructive',
                title: 'Error al Generar PDF',
                description: error.message || 'No se pudo generar el PDF.'
            });
        }
    };
    const openDailyValidationSignatureDialog = (anexo, type, index)=>{
        if (!currentUser) return;
        setDailyValidationTarget({
            anexo,
            type,
            index
        });
        const name = type === 'responsable' ? permit?.user?.displayName : permit?.approvals?.autorizante?.userName;
        setDailyValidationName(name || currentUser.displayName || '');
        setDailyValidationDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setIsDailyValidationSignatureOpen(true);
    };
    const openSignatureDialog = (role, signatureType)=>{
        if (!currentUser) return;
        setSigningRole({
            role,
            type: signatureType
        });
        setSignatureObservation(""); // Limpiar observaciones anteriores
        if (role === 'coordinador_alturas' || role.startsWith('cierre_') || role === 'cancelacion') {
            setSignerName('');
        } else {
            setSignerName(currentUser?.displayName || '');
        }
        setIsSignatureDialogOpen(true);
    };
    const handleSaveSignature = async (signatureDataUrl)=>{
        if (!permit || !currentUser || !signingRole) return;
        const isSpecialSignature = signingRole.role === 'coordinador_alturas' || signingRole.role.startsWith('cierre_') || signingRole.role === 'cancelacion';
        if (isSpecialSignature && !signerName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Nombre Requerido',
                description: 'Por favor, ingrese el nombre.'
            });
            return;
        }
        setIsSigning(true);
        try {
            const simpleUser = {
                uid: currentUser.uid,
                displayName: isSpecialSignature ? signerName : currentUser.displayName || null,
                role: currentUser.role,
                empresa: currentUser.empresa || 'N/A'
            };
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$8518b5__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permit.id, signingRole.role, signingRole.type, signatureDataUrl, simpleUser, signatureObservation);
            if (result.success) {
                toast({
                    title: 'Firma Registrada',
                    description: `${simpleUser.displayName} ha firmado exitosamente.`
                });
                setIsSignatureDialogOpen(false);
                setSigningRole(null);
                setSignerName('');
                setSignatureObservation('');
            } else {
                throw new Error(result.error || 'No se pudo guardar la firma.');
            }
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Error al firmar',
                description: e.message || 'Ocurrió un error inesperado.'
            });
        } finally{
            setIsSigning(false);
        }
    };
    const handleChangeStatus = async (newStatus, reason)=>{
        if (!permit || !currentUser || !currentUser.role) return;
        setIsStatusChanging(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$407476__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updatePermitStatus"])(permit.id, newStatus, {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                role: currentUser.role
            }, reason);
            if (result.success) {
                toast({
                    title: 'Estado Actualizado',
                    description: `El permiso ahora está ${getStatusInfo(newStatus).text}.`,
                    className: 'bg-green-100 dark:bg-green-900'
                });
                if (isRejectionDialogOpen) setIsRejectionDialogOpen(false);
                if (rejectionReason) setRejectionReason("");
                if (isClosureDialogOpen) setIsClosureDialogOpen(false);
                if (isCancellationDialogOpen) setIsCancellationDialogOpen(false);
            } else {
                throw new Error(result.error || 'No se pudo actualizar el estado.');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al actualizar',
                description: error.message
            });
        } finally{
            setIsStatusChanging(false);
        }
    };
    const getInitials = (name)=>{
        if (!name) return 'U';
        return name.split(' ').map((n)=>n[0]).slice(0, 2).join('').toUpperCase();
    };
    const isSSTSignatureRequired = permit?.anexoAltura?.tareaRealizar?.id === 'otro';
    const canSign = (role)=>{
        if (!currentUser || !permit || !permit.approvals) return {
            can: false,
            reason: 'Cargando datos...'
        };
        const { status, approvals, selectedWorkTypes, createdBy } = permit;
        if ([
            'rechazado',
            'cerrado',
            'suspendido',
            'en_ejecucion',
            'aprobado'
        ].includes(status)) {
            return {
                can: false,
                reason: `El permiso está ${status}.`
            };
        }
        if (status !== 'pendiente_revision' && status !== 'borrador') {
            return {
                can: false,
                reason: 'Las firmas de apertura ya están cerradas.'
            };
        }
        const { solicitante, autorizante, mantenimiento, lider_sst, coordinador_alturas } = approvals;
        const hasSigned = (approval)=>approval?.status === 'aprobado';
        const hasCorrectRole = (targetRole)=>{
            if (currentUser.role === 'admin') return true;
            if (Array.isArray(targetRole)) {
                return targetRole.includes(currentUser.role);
            }
            return currentUser.role === targetRole;
        };
        const isCreator = currentUser.uid === createdBy;
        if (hasSigned(permit.approvals[role])) {
            return {
                can: false,
                reason: 'Ya has firmado.'
            };
        }
        switch(role){
            case 'coordinador_alturas':
                if (!selectedWorkTypes?.alturas) return {
                    can: false,
                    reason: 'No se requiere para este trabajo.'
                };
                if (!isCreator && !hasCorrectRole('admin')) return {
                    can: false,
                    reason: 'Solo el creador del permiso puede gestionar esta firma.'
                };
                return {
                    can: true
                };
            case 'solicitante':
                if (!isCreator && !hasCorrectRole('admin')) return {
                    can: false,
                    reason: 'Solo el creador del permiso puede firmar.'
                };
                if (selectedWorkTypes?.alturas && !hasSigned(coordinador_alturas)) {
                    return {
                        can: false,
                        reason: 'Esperando firma del Coordinador de Trabajos en Alturas.'
                    };
                }
                return {
                    can: true
                };
            case 'lider_sst':
                if (!isSSTSignatureRequired) return {
                    can: false,
                    reason: 'Firma de SST no requerida para esta tarea.'
                };
                if (!hasCorrectRole('lider_sst')) return {
                    can: false,
                    reason: 'No tienes el rol requerido.'
                };
                if (!hasSigned(solicitante)) return {
                    can: false,
                    reason: 'Esperando firma del Solicitante.'
                };
                return {
                    can: true
                };
            case 'autorizante':
                if (!hasCorrectRole('autorizante')) return {
                    can: false,
                    reason: 'No tienes el rol requerido.'
                };
                if (!hasSigned(solicitante)) return {
                    can: false,
                    reason: 'Esperando firma del Solicitante.'
                };
                return {
                    can: true
                };
            case 'mantenimiento':
                if (!permit.controlEnergia) return {
                    can: false,
                    reason: 'No se requiere para este trabajo.'
                };
                if (!hasCorrectRole('mantenimiento')) return {
                    can: false,
                    reason: 'No tienes el rol requerido.'
                };
                if (!hasSigned(autorizante)) return {
                    can: false,
                    reason: 'Esperando firma del Autorizante.'
                };
                return {
                    can: true
                };
            default:
                return {
                    can: false,
                    reason: 'Rol de firma no reconocido.'
                };
        }
    };
    const canChangeStatus = (targetStatus)=>{
        if (!currentUser || !permit || !currentUser.role) return {
            can: false,
            reason: 'Cargando datos...'
        };
        const { role } = currentUser;
        const { status, approvals, workers } = permit;
        if (!approvals) return {
            can: false,
            reason: 'Faltan datos de aprobación.'
        };
        switch(targetStatus){
            case 'aprobado':
                if (status !== 'pendiente_revision') return {
                    can: false,
                    reason: `El permiso debe estar 'Pendiente de Revisión' (actual: ${status}).`
                };
                let missingSignatures = [];
                if (approvals.solicitante?.status !== 'aprobado') missingSignatures.push('Solicitante');
                if (approvals.autorizante?.status !== 'aprobado') missingSignatures.push('Autorizante');
                if (permit.controlEnergia && approvals.mantenimiento?.status !== 'aprobado') missingSignatures.push('Mantenimiento');
                if (isSSTSignatureRequired && approvals.lider_sst?.status !== 'aprobado') missingSignatures.push('Líder SST');
                if (missingSignatures.length > 0) {
                    return {
                        can: false,
                        reason: "Faltan firmas para aprobar.",
                        details: missingSignatures.map((r)=>`Firma de ${r}`)
                    };
                }
                if (role !== 'admin' && role !== 'autorizante') return {
                    can: false,
                    reason: 'No tiene el rol para aprobar.'
                };
                return {
                    can: true
                };
            case 'rechazado':
                const canRechazar = (status === 'pendiente_revision' || status === 'aprobado') && (role === 'autorizante' || role === 'admin' || role === 'lider_sst');
                return {
                    can: canRechazar,
                    reason: canRechazar ? undefined : 'No tiene permisos o el permiso no está en el estado adecuado.'
                };
            case 'en_ejecucion':
                if (status !== 'aprobado') return {
                    can: false,
                    reason: `El permiso debe estar 'Aprobado' (actual: ${status}).`
                };
                if (role !== 'admin' && role !== 'lider_tarea') return {
                    can: false,
                    reason: 'No tiene el rol para iniciar la ejecución.'
                };
                return {
                    can: true
                };
            case 'suspendido':
                const canSuspender = status === 'en_ejecucion' && (role === 'lider_sst' || role === 'admin');
                return {
                    can: canSuspender,
                    reason: canSuspender ? undefined : 'Solo un Líder SST o Admin puede suspender un permiso en ejecución.'
                };
            case 'cerrado':
                const canCloseRole = role === 'lider_tarea' || role === 'admin';
                if (!canCloseRole) return {
                    can: false,
                    reason: 'No tiene el rol para cerrar permisos.'
                };
                const canCloseState = status === 'en_ejecucion' || status === 'suspendido';
                if (!canCloseState) return {
                    can: false,
                    reason: `El permiso debe estar 'En Ejecución' o 'Suspendido' (actual: ${status}).`
                };
                const reasons = [];
                const allWorkersSignedClosure = workers?.every((w)=>w.firmaCierre);
                if (!allWorkersSignedClosure) reasons.push('Faltan firmas de cierre de los trabajadores.');
                const responsableSigned = permit.closure?.responsable?.firma;
                if (!responsableSigned) reasons.push('Falta la firma de cierre del Responsable del Trabajo.');
                const autoridadSigned = permit.closure?.autoridad?.firma;
                if (!autoridadSigned) reasons.push('Falta la firma de cierre de la Autoridad del Área.');
                if (reasons.length > 0) return {
                    can: false,
                    reason: "Faltan condiciones para el cierre.",
                    details: reasons
                };
                return {
                    can: true
                };
            default:
                return {
                    can: false,
                    reason: 'Estado de destino no reconocido.'
                };
        }
    };
    const handleOpenClosureDialog = ()=>{
        if (!permit) return;
        const { user, approvals } = permit;
        // Pre-rellenar nombres
        const responsableName = user?.displayName || '';
        const autoridadName = approvals?.autorizante?.userName || '';
        const updates = {
            ...permit.closure
        };
        if (!updates.responsable) updates.responsable = {};
        if (!updates.autoridad) updates.autoridad = {};
        let needsUpdate = false;
        if (updates.responsable.nombre !== responsableName) {
            updates.responsable.nombre = responsableName;
            needsUpdate = true;
        }
        if (updates.autoridad.nombre !== autoridadName) {
            updates.autoridad.nombre = autoridadName;
            needsUpdate = true;
        }
        if (needsUpdate) {
            setPermit((prev)=>prev ? {
                    ...prev,
                    closure: {
                        ...prev.closure,
                        ...updates
                    }
                } : null);
        }
        setIsClosureDialogOpen(true);
    };
    const handleOpenCancellationDialog = ()=>{
        setCancellationReason(""); // Limpiar razón anterior
        setIsCancellationDialogOpen(true);
    };
    const handleConfirmCancellation = async ()=>{
        if (!cancellationReason.trim()) {
            toast({
                variant: 'destructive',
                title: 'Motivo Requerido',
                description: 'Debe especificar un motivo para la cancelación.'
            });
            return;
        }
        // Se utiliza la misma acción de firma, pero con un rol especial
        if (!permit || !currentUser) return;
        setIsSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$8518b5__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permit.id, 'cancelacion', 'firmaCierre', '', {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                role: currentUser.role
            }, cancellationReason);
            if (result.success) {
                await handleChangeStatus('rechazado', `Cancelado: ${cancellationReason}`);
                setIsCancellationDialogOpen(false);
            } else {
                throw new Error(result.error);
            }
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Error al Cancelar',
                description: e.message
            });
        } finally{
            setIsSigning(false);
        }
    };
    const handleSaveDailyValidationSignature = async (signature)=>{
        if (!permit || !dailyValidationTarget || !dailyValidationName.trim() || !dailyValidationDate || !currentUser) {
            toast({
                variant: 'destructive',
                title: 'Faltan datos',
                description: 'Por favor, complete nombre y fecha.'
            });
            return;
        }
        setIsDailyValidationSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$c2ae29__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addDailyValidationSignature"])(permit.id, dailyValidationTarget.anexo, dailyValidationTarget.type, dailyValidationTarget.index, {
                dia: dailyValidationTarget.index + 1,
                nombre: dailyValidationName,
                fecha: dailyValidationDate,
                firma: signature
            }, currentUser);
            if (result.success) {
                toast({
                    title: 'Validación Diaria Guardada'
                });
            } else {
                throw new Error(result.error);
            }
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Error al Guardar',
                description: e.message
            });
        } finally{
            setIsDailyValidationSigning(false);
            setIsDailyValidationSignatureOpen(false);
            setDailyValidationTarget(null);
            setDailyValidationName('');
            setDailyValidationDate('');
        }
    };
    const openWorkerSignatureDialog = (index, type)=>{
        setWorkerSignatureTarget({
            index,
            type
        });
        setIsWorkerSignatureOpen(true);
    };
    const handleSaveWorkerSignature = async (signature)=>{
        if (!permit || workerSignatureTarget === null) return;
        setIsSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$35608f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addWorkerSignature"])(permit.id, workerSignatureTarget.index, workerSignatureTarget.type, signature);
            if (result.success) {
                toast({
                    title: 'Firma de trabajador guardada.'
                });
                setIsWorkerSignatureOpen(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al guardar firma',
                description: error.message
            });
        } finally{
            setIsSigning(false);
        }
    };
    if (loading || userLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 animate-spin text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1329,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-4 text-lg",
                    children: "Cargando detalles del permiso..."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1330,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1328,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-screen items-center justify-center text-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                    className: "h-16 w-16 text-destructive mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1338,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-2",
                    children: "Error al Cargar el Permiso"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1339,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-6",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1340,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>router.back(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1342,
                            columnNumber: 11
                        }, this),
                        "Volver"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1341,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1337,
            columnNumber: 7
        }, this);
    }
    if (!permit) {
        return null;
    }
    const statusInfo = getStatusInfo(permit.status);
    const isApproved = [
        'aprobado',
        'en_ejecucion',
        'suspendido'
    ].includes(permit.status);
    const canBeCancelled = [
        'pendiente_revision',
        'aprobado',
        'en_ejecucion'
    ].includes(permit.status) && (currentUser?.role === 'admin' || currentUser?.role === 'autorizante' || currentUser?.role === 'lider_sst');
    const canBeClosed = [
        'en_ejecucion',
        'suspendido'
    ].includes(permit.status) && (currentUser?.role === 'admin' || currentUser?.role === 'lider_tarea');
    const closureStatus = canChangeStatus('cerrado');
    const canApprove = canChangeStatus('aprobado');
    const getWorkTypesString = (permit)=>{
        const workTypes = [];
        if (!permit.selectedWorkTypes) return 'Trabajo General';
        if (permit.selectedWorkTypes.alturas) workTypes.push('Trabajo en Alturas');
        if (permit.selectedWorkTypes.confinado) workTypes.push('Espacios Confinados');
        if (permit.selectedWorkTypes.energia) workTypes.push('Control de Energías');
        if (permit.selectedWorkTypes.izaje) workTypes.push('Izaje de Cargas');
        if (permit.selectedWorkTypes.excavacion) workTypes.push('Excavaciones');
        if (permit.selectedWorkTypes.general) workTypes.push('Trabajo General');
        return workTypes.length > 0 ? workTypes.join(', ') : 'Trabajo General';
    };
    const atsPeligrosAgrupados = atsPeligros.reduce((acc, peligro)=>{
        if (!acc[peligro.seccion]) {
            acc[peligro.seccion] = [];
        }
        acc[peligro.seccion].push(peligro);
        return acc;
    }, {});
    const eppOptions = {
        'Protección Cabeza, Visual, Auditiva y Respiratoria': [
            {
                id: 'casco_seguridad',
                label: 'Casco de seguridad',
                type: 'custom_casco'
            },
            {
                id: 'gafas_seguridad',
                label: 'Gafas de seguridad',
                type: 'boolean'
            },
            {
                id: 'gafas_oxicorte',
                label: 'Gafas de oxicorte',
                type: 'boolean'
            },
            {
                id: 'monogafas',
                label: 'Monogafas',
                type: 'boolean'
            },
            {
                id: 'careta_soldador',
                label: 'Careta de soldador',
                type: 'boolean'
            },
            {
                id: 'careta_proteccion_total',
                label: 'Careta de protección total',
                type: 'boolean'
            },
            {
                id: 'gafas_antisalpicaduras',
                label: 'Gafas antisalpicaduras',
                type: 'boolean'
            },
            {
                id: 'visor_careta',
                label: 'Visor / careta para',
                type: 'text'
            },
            {
                id: 'careta_arco_electrico',
                label: 'Careta arco eléctrico clase',
                type: 'text'
            },
            {
                id: 'protector_auditivo',
                label: 'Protector auditivo tipo:',
                type: 'select',
                selectOptions: [
                    'Copa',
                    'Inserción'
                ]
            },
            {
                id: 'mascarilla_filtro',
                label: 'Mascarilla con filtro',
                type: 'text'
            },
            {
                id: 'chavo_en_tela_o_carnaza',
                label: 'Chavo en tela o carnaza',
                type: 'boolean'
            },
            {
                id: 'mascarilla_material_particulado',
                label: 'Mascarilla material particulado',
                type: 'boolean'
            }
        ],
        'Protección Corporal, Manos y Pies': [
            {
                id: 'overol_trabajo',
                label: 'Overol de trabajo',
                type: 'boolean'
            },
            {
                id: 'overol_ignifugo',
                label: 'Overol ignífugo clase',
                type: 'text'
            },
            {
                id: 'chaleco_reflectivo',
                label: 'Chaleco reflectivo',
                type: 'boolean'
            },
            {
                id: 'chaqueta_cuero_carnaza',
                label: 'Chaqueta de cuero o carnaza',
                type: 'boolean'
            },
            {
                id: 'delantal_cuero_carnaza',
                label: 'Delantal de cuero o carnaza',
                type: 'boolean'
            },
            {
                id: 'delantal_pvc',
                label: 'Delantal de PVC',
                type: 'boolean'
            },
            {
                id: 'polainas',
                label: 'Polainas',
                type: 'boolean'
            },
            {
                id: 'guante_dielectrico',
                label: 'Guante dieléctrico clase (guantín, guante dieléctrico, protección mecánica)',
                type: 'text'
            },
            {
                id: 'guante_caucho_nitrilo',
                label: 'Guante de caucho y/o nitrilo',
                type: 'boolean'
            },
            {
                id: 'guante_cuero_carnaza',
                label: 'Guante de cuero o carnaza',
                type: 'boolean'
            },
            {
                id: 'guante_vaqueta_anticorte',
                label: 'Guante de vaqueta o Anticorte',
                type: 'boolean'
            },
            {
                id: 'guante_temperatura',
                label: 'Guante temperatura',
                type: 'boolean'
            },
            {
                id: 'botas_seguridad',
                label: 'Botas de seguridad',
                type: 'boolean'
            },
            {
                id: 'botas_caucho_seguridad',
                label: 'Botas de caucho de seguridad',
                type: 'boolean'
            },
            {
                id: 'botas_dielectricas',
                label: 'Botas dieléctricas',
                type: 'boolean'
            },
            {
                id: 'proteccion_metatarso',
                label: 'Protección Metatarso',
                type: 'boolean'
            }
        ],
        'Protección Contra Caídas y Equipos Especiales': [
            {
                id: 'arnes',
                label: 'Arnés',
                type: 'text'
            },
            {
                id: 'mosqueton',
                label: 'Mosquetón',
                type: 'boolean'
            },
            {
                id: 'punto_de_anclaje',
                label: 'Punto de anclaje (cual)',
                type: 'text'
            },
            {
                id: 'eslinga',
                label: 'Eslinga tipo/absorbedor',
                type: 'text'
            },
            {
                id: 'linea_vida',
                label: 'Línea de vida',
                type: 'text'
            },
            {
                id: 'adaptador_anclaje',
                label: 'Adaptador de anclaje',
                type: 'text'
            },
            {
                id: 'aire_respirable',
                label: 'Aire respirable (compresor o cilindro)',
                type: 'boolean'
            },
            {
                id: 'tapete_dielectrico',
                label: 'Tapete dieléctrico clase',
                type: 'text'
            },
            {
                id: 'senalizacion',
                label: 'Señalización',
                type: 'boolean'
            },
            {
                id: 'barandas',
                label: 'Barandas',
                type: 'boolean'
            },
            {
                id: 'delimitacion_perimetral',
                label: 'Delimitación perímetro',
                type: 'boolean'
            },
            {
                id: 'control_acceso',
                label: 'Control acceso',
                type: 'boolean'
            },
            {
                id: 'otro_epp',
                label: 'Otro:',
                type: 'text'
            }
        ]
    };
    const justificacionOptions = [
        {
            id: 'rutinario_3_meses',
            label: 'TRABAJO RUTINARIO REALIZADO 1 VEZ CADA 3 MESES'
        },
        {
            id: 'no_rutinario_emergencia',
            label: 'TRABAJO NO RUTINARIO (EMERGENCIA)'
        },
        {
            id: 'rutinario_sin_procedimiento',
            label: 'TRABAJO RUTINARIO QUE NO POSEE UN PROCEDIMIENTO SEGURO DE TRABAJO O INDICACIÓN CORRECTA DE RIESGOS O MEDIDAS PREVENTIVAS'
        },
        {
            id: 'no_rutinario_planeado',
            label: 'TRABAJO NO RUTINARIO (PLANEADO)'
        },
        {
            id: 'rutinario_condicion_especifica',
            label: 'TRABAJO RUTINARIO QUE POR UNA CONDICIÓN ESPECÍFICA/TEMPORAL, NO ES POSIBLE APLICAR UN PROCEDIMIENTO DE FORMA INTEGRAL'
        }
    ];
    const anexoAlturaEstructuras = [
        {
            id: 'escaleraCuerpo',
            label: 'Escalera de un cuerpo'
        },
        {
            id: 'escaleraDosCuerpos',
            label: 'Escalera de dos cuerpos o mas'
        },
        {
            id: 'andamioTubular',
            label: 'Andamio Tubular Certificado'
        },
        {
            id: 'andamioColgante',
            label: 'Andamio Colgante'
        },
        {
            id: 'plataforma',
            label: 'Plataforma'
        },
        {
            id: 'manLift',
            label: 'Man Lift o Camion Canasta'
        },
        {
            id: 'otros',
            label: 'Otros'
        }
    ];
    const emergenciasItems = [
        {
            id: 'notificacion',
            label: 'NOTIFICACIÓN: El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados del trabajo a realizar'
        },
        {
            id: 'recordarVerificar',
            label: 'EMERGENCIAS: Recordar y verificar'
        },
        {
            id: 'potenciales',
            label: 'A.- Las emergencias potenciales que pueden ocurrir'
        },
        {
            id: 'procedimientos',
            label: 'B.- Los procedimientos establecidos para tales situaciones.'
        },
        {
            id: 'rutasEvacuacion',
            label: 'C.- Rutas de Evacuación'
        },
        {
            id: 'puntosEncuentro',
            label: 'D.- Puntos de encuentro'
        },
        {
            id: 'equiposEmergencia',
            label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo'
        },
        {
            id: 'ubicacionBrigadistas',
            label: 'F.- Ubicación de Brigadistas cercanos'
        }
    ];
    const SignatureCard = ({ role })=>{
        const approval = permit.approvals?.[role];
        const { can, reason } = canSign(role);
        const consentText = signatureConsents[role];
        const SignButton = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                onClick: ()=>openSignatureDialog(role, 'firmaApertura'),
                disabled: !can || isSigning,
                className: "flex-1",
                children: [
                    isSigning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1473,
                        columnNumber: 30
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1473,
                        columnNumber: 69
                    }, this),
                    " Firmar Apertura"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1472,
                columnNumber: 13
            }, this);
        const roleNames = {
            solicitante: 'Solicitante',
            autorizante: 'Autorizante',
            lider_tarea: 'Líder de Tarea',
            ejecutante: 'Ejecutante',
            lider_sst: 'Líder SST',
            admin: 'Administrador',
            mantenimiento: 'Mantenimiento'
        };
        const getRoleDisplayName = ()=>{
            if (role === 'coordinador_alturas') {
                return 'Coordinador de Trabajo en Alturas';
            }
            if (approval?.userRole) {
                return roleNames[approval.userRole] || approval.userRole;
            }
            return null;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-sm font-bold uppercase text-gray-500",
                        children: signatureRoles[role]
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1500,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1499,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "flex-grow flex flex-col justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow",
                            children: approval?.status === 'aprobado' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-green-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1507,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Aprobado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1508,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1506,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs space-y-1 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Por: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: approval.userName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1511,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1511,
                                                columnNumber: 24
                                            }, this),
                                            getRoleDisplayName() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Rol: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: getRoleDisplayName()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1512,
                                                        columnNumber: 57
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1512,
                                                columnNumber: 49
                                            }, this),
                                            approval.userEmpresa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Empresa: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: approval.userEmpresa
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1513,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1513,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Fecha: ",
                                                    safeFormat(approval.signedAt, 'dd/MM/yy HH:mm')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1514,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 22
                                    }, this),
                                    approval.firmaApertura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: approval.firmaApertura,
                                        alt: `Firma ${role}`,
                                        width: 120,
                                        height: 60,
                                        className: "rounded border mt-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1516,
                                        columnNumber: 48
                                    }, this),
                                    approval.comments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 pt-2 border-t border-dashed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-gray-600 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1519,
                                                        columnNumber: 104
                                                    }, this),
                                                    " Observaciones:"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1519,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 italic",
                                                children: [
                                                    "«",
                                                    approval.comments,
                                                    "»"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1505,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-yellow-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1527,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Pendiente de Firma"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1528,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1526,
                                        columnNumber: 21
                                    }, this),
                                    consentText && can && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-2 border-l-2 border-primary pl-2",
                                        children: consentText
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1531,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1525,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1503,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                can ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignButton, {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1539,
                                    columnNumber: 24
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        disabled: true,
                                                        className: "w-full flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                className: "mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1545,
                                                                columnNumber: 29
                                                            }, this),
                                                            " Firmar Apertura"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1544,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1543,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1542,
                                                columnNumber: 25
                                            }, this),
                                            reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: reason
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1549,
                                                    columnNumber: 52
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1549,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1541,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1540,
                                    columnNumber: 21
                                }, this),
                                role === 'solicitante' && permit.status === 'borrador' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>router.push(`/permits/create?edit=${permit.id}`),
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1555,
                                            columnNumber: 21
                                        }, this),
                                        " Modificar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1554,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1538,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1502,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1498,
            columnNumber: 13
        }, this);
    };
    const DailyValidationTable = ({ anexoName, validationData })=>{
        let durationInDays = 1;
        if (permit.generalInfo?.validFrom && permit.generalInfo?.validUntil) {
            try {
                const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo.validFrom);
                const endDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseISO"])(permit.generalInfo.validUntil);
                durationInDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])(endDate, startDate) + 1;
            } catch (e) {
                console.error("Error parsing dates for daily validation:", e);
            }
        }
        const renderRows = (type)=>{
            return Array.from({
                length: durationInDays
            }, (_, i)=>{
                const v = validationData?.[type]?.[i];
                let canSignValidation = false;
                let tooltipContent = "No tienes permiso para firmar.";
                if (type === 'autoridad') {
                    canSignValidation = isApproved && (currentUser?.role === 'autorizante' || currentUser?.role === 'admin') && !v?.firma;
                    tooltipContent = "Solo un Autorizante o Administrador puede firmar.";
                } else if (type === 'responsable') {
                    canSignValidation = isApproved && (currentUser?.uid === permit.createdBy || currentUser?.role === 'lider_tarea') && !v?.firma;
                    tooltipContent = "Solo el creador o líder de la tarea puede firmar.";
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: i + 1
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1592,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.nombre || 'N/A'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1593,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.firma ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: v.firma,
                                alt: "Firma",
                                width: 60,
                                height: 30,
                                className: "border rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1596,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ()=>openDailyValidationSignatureDialog(anexoName, type, i),
                                                disabled: !canSignValidation,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1607,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1601,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1600,
                                            columnNumber: 41
                                        }, this),
                                        !canSignValidation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: tooltipContent
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1610,
                                                columnNumber: 80
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1610,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1599,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1598,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1594,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: safeFormat(v?.fecha, 'dd/MM/yy HH:mm')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1615,
                            columnNumber: 25
                        }, this)
                    ]
                }, `${type}-${i}`, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1591,
                    columnNumber: 21
                }, this);
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
            title: "Validación Diaria",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border rounded-lg space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold",
                                children: "Responsable del Trabajo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1625,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1626,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Día"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1628,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1628,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1628,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1628,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1628,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1628,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('responsable')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1629,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1627,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1624,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border rounded-lg space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold",
                                children: "Autoridad del Área"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1633,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1634,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Día"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1636,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1636,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1636,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1636,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1636,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1636,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('autoridad')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1637,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1635,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1632,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1623,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1622,
            columnNumber: 13
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col bg-gray-50/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 md:p-6 shadow-md sticky top-0 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: ()=>router.back(),
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1652,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "Volver a la Lista"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1653,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1651,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-lg p-2",
                            style: {
                                backgroundColor: statusInfo.bgColor
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(statusInfo.icon, {
                                    className: "h-6 w-6",
                                    style: {
                                        color: statusInfo.color
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1657,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-sm",
                                    style: {
                                        color: statusInfo.color
                                    },
                                    children: statusInfo.text
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1658,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1656,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-end gap-2 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: handleExportToPDF,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__["FileDown"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1662,
                                            columnNumber: 72
                                        }, this),
                                        "Exportar a PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1662,
                                    columnNumber: 18
                                }, this),
                                canBeCancelled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    onClick: handleOpenCancellationDialog,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileX$3e$__["FileX"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1666,
                                            columnNumber: 25
                                        }, this),
                                        "Cancelar Permiso"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1665,
                                    columnNumber: 21
                                }, this),
                                canBeClosed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleOpenClosureDialog,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1672,
                                            columnNumber: 25
                                        }, this),
                                        "Cerrar Permiso"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1671,
                                    columnNumber: 21
                                }, this),
                                canApprove.can && permit.status === 'pendiente_revision' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>handleChangeStatus('aprobado'),
                                    disabled: isStatusChanging,
                                    className: "bg-green-600 hover:bg-green-700",
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1678,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1678,
                                            columnNumber: 84
                                        }, this),
                                        " Aprobar Permiso"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1677,
                                    columnNumber: 22
                                }, this),
                                canChangeStatus('rechazado').can && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
                                    open: isRejectionDialogOpen,
                                    onOpenChange: setIsRejectionDialogOpen,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "destructive",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        className: "mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1685,
                                                        columnNumber: 59
                                                    }, this),
                                                    "Rechazar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1685,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1684,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                                        children: "Rechazar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1688,
                                                        columnNumber: 48
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1688,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    value: rejectionReason,
                                                    onChange: (e)=>setRejectionReason(e.target.value),
                                                    placeholder: "Escriba el motivo del rechazo..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                                            children: "Cancelar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1691,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                                            onClick: ()=>handleChangeStatus('rechazado', rejectionReason),
                                                            disabled: !rejectionReason || isStatusChanging,
                                                            children: [
                                                                isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                    className: "animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1693,
                                                                    columnNumber: 53
                                                                }, this) : null,
                                                                " Rechazar"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1692,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1690,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1687,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1683,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1661,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1650,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1649,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 lg:grid-cols-4 gap-6 items-start pb-6 border-b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 lg:col-span-1 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "https://i.postimg.cc/VsZBSkmH/Italcol.png",
                                            alt: "Logo",
                                            width: 150,
                                            height: 75
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1709,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1708,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 lg:col-span-3 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl md:text-2xl font-bold text-gray-800",
                                                children: "FORMATO DE PERMISO DE TRABAJO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1712,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Código",
                                                        value: "SST-FOR-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1714,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Versión",
                                                        value: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1715,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Fecha Vigencia",
                                                        value: "23-01-2023"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1716,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1713,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1711,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1707,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Información General",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Número de Permiso",
                                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-primary",
                                                children: permit.number || permit.id.substring(0, 8)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1724,
                                                columnNumber: 65
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1724,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Solicitante",
                                            value: permit.user?.displayName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1725,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Fecha Creación",
                                            value: safeFormat(permit.createdAt, 'dd/MM/yyyy HH:mm')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1726,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Área Específica",
                                            value: permit.generalInfo?.areaEspecifica
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1727,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Planta",
                                            value: permit.generalInfo?.planta
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1728,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Proceso",
                                            value: permit.generalInfo?.proceso
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1729,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Empresa",
                                            value: permit.generalInfo?.empresa
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1730,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Contrato",
                                            value: permit.generalInfo?.contrato
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1731,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Desde",
                                            value: permit.generalInfo?.validFrom ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1732,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Hasta",
                                            value: permit.generalInfo?.validUntil ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1733,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2 lg:col-span-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Tipos de Trabajo",
                                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-primary",
                                                    children: getWorkTypesString(permit)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1735,
                                                    columnNumber: 68
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1735,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1734,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2 lg:col-span-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Descripción de la Tarea",
                                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm whitespace-pre-wrap",
                                                    children: permit.generalInfo?.workDescription
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1738,
                                                    columnNumber: 74
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1738,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1737,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1723,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1722,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1746,
                                                        columnNumber: 67
                                                    }, this),
                                                    " Análisis de Trabajo Seguro (ATS)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1746,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1747,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1745,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "space-y-6 border border-t-0 rounded-b-lg p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "1. Identificación de Peligros, Riesgos y Controles",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: Object.entries(atsPeligrosAgrupados).map(([seccion, peligros])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-semibold text-gray-600 mb-2",
                                                                    children: seccion
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1754,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "pl-4 space-y-1",
                                                                    children: peligros.map((peligro)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                            label: peligro.label,
                                                                            value: permit.anexoATS?.peligros?.[peligro.id]
                                                                        }, peligro.id, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1757,
                                                                            columnNumber: 45
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1755,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, seccion, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1753,
                                                            columnNumber: 33
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1751,
                                                    columnNumber: 29
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1750,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "2. EPP Requeridos",
                                                className: "mt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2",
                                                    children: Object.entries(permit.anexoATS?.epp || {}).map(([key, value])=>{
                                                        if (value !== true && value !== 'si' && !key.endsWith('_spec') && !key.endsWith('_tipo') && !key.startsWith('casco_seguridad_')) return null;
                                                        if (key.endsWith('_spec') || key.endsWith('_tipo') || key.startsWith('casco_seguridad_')) return null;
                                                        const itemDef = Object.values(eppOptions).flat().find((item)=>item.id === key);
                                                        if (!itemDef) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key,
                                                            value: true
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1775,
                                                            columnNumber: 58
                                                        }, this);
                                                        let spec = '';
                                                        const eppData = permit.anexoATS?.epp;
                                                        if (itemDef.type === 'text') spec = eppData[`${key}_spec`];
                                                        else if (itemDef.type === 'select') spec = eppData[`${key}_tipo`];
                                                        else if (itemDef.type === 'custom_casco') spec = [
                                                            eppData.casco_seguridad_tipo,
                                                            eppData.casco_seguridad_clase,
                                                            eppData.casco_seguridad_barbuquejo
                                                        ].filter(Boolean).join(', ');
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: itemDef.label,
                                                            value: true,
                                                            spec: spec || undefined
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1783,
                                                            columnNumber: 44
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1769,
                                                    columnNumber: 28
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1768,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "3. Justificación de Uso",
                                                className: "mt-6",
                                                children: justificacionOptions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: item.label,
                                                        value: permit.anexoATS?.justificacion?.[item.id]
                                                    }, item.id, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1789,
                                                        columnNumber: 33
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1787,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1749,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1744,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-red-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-red-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1802,
                                                        columnNumber: 79
                                                    }, this),
                                                    " Manejo de Emergencias"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1802,
                                                columnNumber: 24
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1803,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1801,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "space-y-2 border border-t-0 rounded-b-lg p-4",
                                        children: emergenciasItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                label: item.label,
                                                value: permit.eppEmergencias?.emergencias?.[item.id]
                                            }, item.id, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1807,
                                                columnNumber: 29
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1805,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1800,
                                columnNumber: 17
                            }, this),
                            permit.selectedWorkTypes?.alturas && permit.anexoAltura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-blue-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-blue-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1821,
                                                        columnNumber: 83
                                                    }, this),
                                                    " Anexo: Trabajo en Alturas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1821,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1822,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1820,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-blue-100 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Información General del Anexo",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Tarea a Realizar",
                                                            value: permit.anexoAltura.tareaRealizar?.nombre
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1827,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Descripción de la Tarea",
                                                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm whitespace-pre-wrap",
                                                                children: permit.anexoAltura.tareaRealizar?.descripcion
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1828,
                                                                columnNumber: 83
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1828,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Altura Aproximada",
                                                            value: `${permit.anexoAltura.alturaAproximada || 'N/A'} metros`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1829,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Contacto de Emergencia",
                                                            value: `${permit.anexoAltura.emergencia?.contacto || 'N/A'} - ${permit.anexoAltura.emergencia?.telefono || 'N/A'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1830,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1826,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1825,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Estructura y Aspectos de Seguridad",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6",
                                                        children: anexoAlturaEstructuras.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: e.label,
                                                                value: permit.anexoAltura?.tipoEstructura?.[e.id],
                                                                spec: e.id === 'otros' ? permit.anexoAltura.tipoEstructura.otrosCual : undefined
                                                            }, e.id, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1837,
                                                                columnNumber: 38
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1835,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                        children: anexoAlturaAspectos.map((aspect)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: aspect.label,
                                                                value: permit.anexoAltura?.aspectosSeguridad?.[aspect.id]
                                                            }, aspect.id, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1847,
                                                                columnNumber: 34
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1845,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1834,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Precauciones y Controles Específicos",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoAltura.precauciones || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1855,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1853,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1852,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Afectaciones",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Produce riesgos para otras áreas?",
                                                                value: permit.anexoAltura.afectaciones?.riesgoOtrasAreas
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1862,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Otras áreas producen riesgo a este trabajo?",
                                                                value: permit.anexoAltura.afectaciones?.otrasAreasRiesgo
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1863,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Personal notificado?",
                                                                value: permit.anexoAltura.afectaciones?.personalNotificado
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1864,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1861,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Observaciones",
                                                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm whitespace-pre-wrap",
                                                            children: permit.anexoAltura.afectaciones?.observaciones
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1866,
                                                            columnNumber: 69
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1866,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1860,
                                                columnNumber: 29
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoAltura",
                                                validationData: permit.anexoAltura.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1869,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1824,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1819,
                                columnNumber: 21
                            }, this),
                            permit.selectedWorkTypes?.confinado && permit.anexoConfinado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-purple-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-purple-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1878,
                                                        columnNumber: 85
                                                    }, this),
                                                    " Anexo: Espacios Confinados"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1878,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1879,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1877,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-purple-100 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Información General del Anexo",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Contacto de Emergencia",
                                                        value: `${permit.anexoConfinado.emergencia?.contacto || 'N/A'} - ${permit.anexoConfinado.emergencia?.telefono || 'N/A'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1884,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1883,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1882,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Identificación de Peligros y Aspectos",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoConfinado.identificacionPeligros || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value,
                                                            spec: key === 'procedimientoComunicacion' ? permit.anexoConfinado.procedimientoComunicacionCual : undefined
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1891,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1889,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1888,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Precauciones y Controles",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoConfinado.precauciones || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1899,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1897,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1896,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Requerimientos y Equipos",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoConfinado.requerimientosEquipos || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1907,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1905,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1904,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Autorizaciones del Anexo",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Autoridad del Área",
                                                            value: permit.anexoConfinado.autoridadDelArea?.nombre || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1914,
                                                            columnNumber: 38
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Responsable del Trabajo",
                                                            value: permit.anexoConfinado.responsableDelTrabajo?.nombre || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1915,
                                                            columnNumber: 38
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Supervisor Trabajo EC",
                                                            value: permit.anexoConfinado.supervisorTrabajo?.nombre || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1916,
                                                            columnNumber: 38
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1913,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1912,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Resultados de Pruebas de Gases Iniciales",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "LEL (0%)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.lel
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1922,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "O2 (19.5-22%)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.o2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1923,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "H2S (0-10 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.h2s
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1924,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "CO (0-25 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.co
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1925,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1921,
                                                    columnNumber: 32
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1920,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Pruebas Periódicas",
                                                className: "mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Hora"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "LEL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 83
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "O2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 109
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "H2S"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 134
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "CO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 160
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Firma"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1930,
                                                                        columnNumber: 185
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1930,
                                                                columnNumber: 46
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1930,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                            children: permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.hora
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1934,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.lel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1935,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.o2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1936,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.h2s
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1937,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.co
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1938,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                src: p.firma,
                                                                                alt: "Firma",
                                                                                width: 80,
                                                                                height: 40
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1939,
                                                                                columnNumber: 68
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1939,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, p.id, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1933,
                                                                    columnNumber: 41
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1931,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1929,
                                                    columnNumber: 31
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1928,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoConfinado",
                                                validationData: permit.anexoConfinado.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1945,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1881,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1876,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.energia && permit.anexoEnergias && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-yellow-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-yellow-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1953,
                                                        columnNumber: 86
                                                    }, this),
                                                    " Anexo: Control de Energías"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1953,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1954,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1952,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-yellow-100 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Tipos de Energía Identificados",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 md:grid-cols-4 gap-2",
                                                    children: Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).map(([key, value])=>value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1959,
                                                            columnNumber: 127
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1958,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1957,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Trabajos en Caliente",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoEnergias.trabajosEnCaliente || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value,
                                                            spec: key === 'otro' ? permit.anexoEnergias.trabajosEnCaliente?.otro : undefined
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1965,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1963,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1962,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Procedimiento LOTO",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoEnergias.procedimientoLOTO || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1972,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1970,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1969,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Planeación de Trabajos con Energía Eléctrica",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoEnergias.planeacion || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1979,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1977,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1976,
                                                columnNumber: 28
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1956,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1951,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.izaje && permit.anexoIzaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-green-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-green-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1990,
                                                        columnNumber: 84
                                                    }, this),
                                                    " Anexo: Izaje de Cargas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1990,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1991,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1989,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-green-100 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Información de la Carga y Equipo",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Acción a realizar",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([, v])=>v).map(([k])=>k.charAt(0).toUpperCase() + k.slice(1)).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1995,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Peso de la Carga",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k.replace('menor', '< ').replace('mas', '> ').replace('entre', '')).join(', ') + ' kg'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1996,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Equipo a Utilizar",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k.replace(/([A-Z])/g, ' $1').toUpperCase()).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1997,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Capacidad del Equipo",
                                                        value: permit.anexoIzaje.informacionGeneral.capacidadEquipo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1998,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1994,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Aspectos Requeridos para Izaje",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoIzaje.aspectosRequeridos || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2003,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2001,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2000,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Precauciones y Controles",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoIzaje.precauciones || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2010,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2008,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2007,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoIzaje",
                                                validationData: permit.anexoIzaje.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2014,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1993,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1988,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "flex w-full items-center justify-between rounded-lg border bg-orange-50 px-4 py-3 text-left text-sm font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2 text-orange-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2022,
                                                        columnNumber: 85
                                                    }, this),
                                                    " Anexo: Excavaciones"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2022,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2023,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 2021,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-orange-100 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Dimensiones de la Excavación",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Dimensiones Generales",
                                                        value: permit.anexoExcavaciones.informacionGeneral.dimensiones
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2027,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Profundidad",
                                                        value: permit.anexoExcavaciones.informacionGeneral.profundidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2028,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Ancho",
                                                        value: permit.anexoExcavaciones.informacionGeneral.ancho
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2029,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Largo",
                                                        value: permit.anexoExcavaciones.informacionGeneral.largo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2030,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2026,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Aspectos Requeridos",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoExcavaciones.aspectosRequeridos || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2035,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2033,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2032,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Precauciones y Controles",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                    children: Object.entries(permit.anexoExcavaciones.precauciones || {}).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                            label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
                                                            value: value
                                                        }, key, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2042,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2040,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2039,
                                                columnNumber: 29
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoExcavaciones",
                                                validationData: permit.anexoExcavaciones.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2046,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 2025,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2020,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Personal Autorizado y Externo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Nombre / Cédula"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2057,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Rol"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2058,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Aptitud"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2059,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Entrenamiento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2060,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Seg. Social"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2061,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Apertura"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2062,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Cierre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2063,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2056,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2055,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                            children: permit.workers?.map((worker, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-medium",
                                                                    children: worker.nombre
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2070,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    children: [
                                                                        "C.C. ",
                                                                        worker.cedula
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2071,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2069,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                children: worker.rol === 'Otro' ? worker.otroRol : worker.rol
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2074,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2073,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1",
                                                                children: [
                                                                    worker.tsaTec?.tec && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "uppercase",
                                                                        children: "TEC"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2078,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    worker.tsaTec?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "uppercase",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2079,
                                                                        columnNumber: 56
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2077,
                                                                columnNumber: 32
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2076,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col gap-1",
                                                                children: [
                                                                    worker.entrenamiento?.tec && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: "TEC"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2084,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2085,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.otro && worker.entrenamiento?.otroCual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: worker.entrenamiento.otroCual
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2086,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2083,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2082,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1",
                                                                children: [
                                                                    worker.eps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "EPS"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2091,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.arl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "ARL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2092,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.pensiones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "P"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2093,
                                                                        columnNumber: 54
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2090,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2089,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: worker.firmaApertura ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: worker.firmaApertura,
                                                                alt: "Firma Apertura",
                                                                width: 80,
                                                                height: 40,
                                                                className: "border rounded"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2097,
                                                                columnNumber: 55
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "outline",
                                                                onClick: ()=>openWorkerSignatureDialog(index, 'firmaApertura'),
                                                                disabled: !isApproved || !!worker.firmaApertura,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                        className: "mr-2 h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2099,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    "Firmar"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2098,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2096,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: worker.firmaCierre ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: worker.firmaCierre,
                                                                alt: "Firma Cierre",
                                                                width: 80,
                                                                height: 40,
                                                                className: "border rounded"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2105,
                                                                columnNumber: 33
                                                            }, this) : (permit.status === 'en_ejecucion' || permit.status === 'suspendido') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "outline",
                                                                onClick: ()=>openWorkerSignatureDialog(index, 'firmaCierre'),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                        className: "mr-2 h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2109,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    " Firmar Cierre"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2108,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2103,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2068,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2066,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2054,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2053,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                title: "Aprobaciones del Permiso",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                    children: [
                                        permit.selectedWorkTypes?.alturas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "coordinador_alturas"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2123,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "solicitante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2124,
                                            columnNumber: 25
                                        }, this),
                                        isSSTSignatureRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "lider_sst"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2125,
                                            columnNumber: 52
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "autorizante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2126,
                                            columnNumber: 25
                                        }, this),
                                        permit.controlEnergia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "mantenimiento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2127,
                                            columnNumber: 51
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2122,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2121,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1704,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "text-center text-xs text-gray-400 py-4 mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Código: DN-FR-SST-016"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2133,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Versión: 04"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2134,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 2132,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1703,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isSignatureDialogOpen,
                onOpenChange: setIsSignatureDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Registrar Firma"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2141,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2140,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                (signingRole?.role === 'coordinador_alturas' || signingRole?.role?.startsWith('cierre_') || signingRole?.role === 'cancelacion') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "signerName",
                                            children: "Su Nombre Completo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2146,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "signerName",
                                            value: signerName,
                                            onChange: (e)=>setSignerName(e.target.value),
                                            placeholder: "Ingrese su nombre completo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2147,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2145,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "signature-observation",
                                            children: "Observaciones (Opcional)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2156,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                            id: "signature-observation",
                                            value: signatureObservation,
                                            onChange: (e)=>setSignatureObservation(e.target.value),
                                            placeholder: "Añada comentarios si es necesario..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2157,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2155,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2143,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2165,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2139,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2138,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isWorkerSignatureOpen,
                onOpenChange: setIsWorkerSignatureOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Registrar Firma de Trabajador"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2175,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2174,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveWorkerSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2173,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2172,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: isSolicitanteSignAlertOpen,
                onOpenChange: setIsSolicitanteSignAlertOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    children: "Confirmar Firma de Solicitante"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2184,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: [
                                        signatureConsents.solicitante,
                                        " ¿Desea continuar?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2185,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2183,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2190,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: ()=>openSignatureDialog('solicitante', 'firmaApertura'),
                                    children: "Confirmar y Firmar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2191,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2189,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2182,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2181,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isDailyValidationSignatureOpen,
                onOpenChange: setIsDailyValidationSignatureOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Registrar Validación Diaria"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2201,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2200,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Confirme las condiciones de seguridad para continuar con el trabajo hoy."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2204,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-name",
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-name",
                                            value: dailyValidationName,
                                            onChange: (e)=>setDailyValidationName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2205,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-date",
                                            children: "Fecha y Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2210,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-date",
                                            type: "datetime-local",
                                            value: dailyValidationDate,
                                            onChange: (e)=>setDailyValidationDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2211,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2209,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2203,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveDailyValidationSignature,
                            isSaving: isDailyValidationSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2214,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2199,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2198,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isClosureDialogOpen,
                onOpenChange: setIsClosureDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Módulo de Cierre de Permiso"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2221,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Complete las firmas requeridas para finalizar el permiso de trabajo."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2222,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2220,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded",
                                    role: "alert",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2226,
                                                    columnNumber: 74
                                                }, this),
                                                "Condiciones para el Cierre"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2226,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "list-none space-y-1 text-sm mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        closureStatus.can ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-green-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2229,
                                                            columnNumber: 54
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-red-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2229,
                                                            columnNumber: 125
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "El permiso debe estar en estado ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "'En Ejecución'"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2230,
                                                                    columnNumber: 71
                                                                }, this),
                                                                " o ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "'Suspendido'"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2230,
                                                                    columnNumber: 105
                                                                }, this),
                                                                "."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2230,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2228,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        !closureStatus.details?.includes('Faltan firmas de cierre de los trabajadores.') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-green-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2233,
                                                            columnNumber: 117
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-red-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2233,
                                                            columnNumber: 188
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Todos los trabajadores deben haber registrado su firma de salida."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2234,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2232,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        !closureStatus.details?.includes('Falta la firma de cierre del Responsable del Trabajo.') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-green-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2237,
                                                            columnNumber: 126
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-red-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2237,
                                                            columnNumber: 197
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "El ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Responsable del Trabajo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2238,
                                                                    columnNumber: 42
                                                                }, this),
                                                                " debe registrar su firma de cierre."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2238,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2236,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        !closureStatus.details?.includes('Falta la firma de cierre de la Autoridad del Área.') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-green-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2241,
                                                            columnNumber: 123
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            size: 14,
                                                            className: "inline mr-1 text-red-500 mt-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2241,
                                                            columnNumber: 194
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "La ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Autoridad del Área"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2242,
                                                                    columnNumber: 42
                                                                }, this),
                                                                " debe registrar su firma de cierre (después del responsable)."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2242,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2240,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2227,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2225,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 border rounded-md space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                    className: "text-sm font-semibold",
                                                    children: "Responsable del Trabajo (Solicitante)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2249,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    readOnly: true,
                                                    disabled: true,
                                                    value: permit.closure?.responsable?.nombre || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2250,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "w-full",
                                                    onClick: ()=>openSignatureDialog('cierre_responsable', 'firmaCierre'),
                                                    disabled: !!permit.closure?.responsable?.firma,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                            className: "mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2252,
                                                            columnNumber: 30
                                                        }, this),
                                                        permit.closure?.responsable?.firma ? 'Firmado' : 'Firmar Cierre'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2251,
                                                    columnNumber: 28
                                                }, this),
                                                permit.closure?.responsable?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: permit.closure.responsable.firma,
                                                    alt: "Firma Cierre Responsable",
                                                    width: 100,
                                                    height: 50,
                                                    className: "border rounded mt-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2254,
                                                    columnNumber: 67
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2248,
                                            columnNumber: 24
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 border rounded-md space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                    className: "text-sm font-semibold",
                                                    children: "Autoridad del Área"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2258,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    readOnly: true,
                                                    disabled: true,
                                                    value: permit.closure?.autoridad?.nombre || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2259,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "w-full",
                                                                        onClick: ()=>openSignatureDialog('cierre_autoridad', 'firmaCierre'),
                                                                        disabled: !permit.closure?.responsable?.firma || !!permit.closure?.autoridad?.firma,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                                className: "mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 2265,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            permit.closure?.autoridad?.firma ? 'Firmado' : 'Firmar Cierre'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2264,
                                                                        columnNumber: 43
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2263,
                                                                    columnNumber: 41
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2262,
                                                                columnNumber: 37
                                                            }, this),
                                                            !permit.closure?.responsable?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: "Debe firmar primero el Responsable del Trabajo."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 2269,
                                                                    columnNumber: 93
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2269,
                                                                columnNumber: 77
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2261,
                                                        columnNumber: 33
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2260,
                                                    columnNumber: 29
                                                }, this),
                                                permit.closure?.autoridad?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: permit.closure.autoridad.firma,
                                                    alt: "Firma Cierre Autoridad",
                                                    width: 100,
                                                    height: 50,
                                                    className: "border rounded mt-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2272,
                                                    columnNumber: 65
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2257,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2247,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2224,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    open: closureStatus.can ? false : undefined,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    onClick: ()=>handleChangeStatus('cerrado'),
                                                    disabled: !closureStatus.can || isStatusChanging,
                                                    className: "w-full",
                                                    children: [
                                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2286,
                                                            columnNumber: 61
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2286,
                                                            columnNumber: 100
                                                        }, this),
                                                        "Confirmar Cierre del Permiso"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2281,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2280,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2279,
                                            columnNumber: 29
                                        }, this),
                                        !closureStatus.can && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            side: "bottom",
                                            className: "max-w-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: "No se puede cerrar el permiso:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2293,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "list-disc list-inside text-xs mt-1",
                                                    children: [
                                                        closureStatus.details?.map((detail, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: detail
                                                            }, i, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2295,
                                                                columnNumber: 84
                                                            }, this)),
                                                        !closureStatus.details && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: closureStatus.reason
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2296,
                                                            columnNumber: 68
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2294,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2292,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2278,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2277,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2276,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2219,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2218,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: isCancellationDialogOpen,
                onOpenChange: setIsCancellationDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    children: "Cancelar Permiso de Trabajo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2309,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: 'Esta acción cambiará el estado del permiso a "Rechazado" y no podrá ser revertida. Por favor, especifique el motivo de la cancelación.'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2310,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2308,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                            value: cancellationReason,
                            onChange: (e)=>setCancellationReason(e.target.value),
                            placeholder: "Motivo de la cancelación..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2314,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: "Volver"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2320,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: handleConfirmCancellation,
                                    disabled: isSigning || !cancellationReason.trim(),
                                    children: isSigning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 2322,
                                        columnNumber: 38
                                    }, this) : 'Confirmar Cancelación'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2321,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2319,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2307,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2306,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 1646,
        columnNumber: 7
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2d97e248._.js.map