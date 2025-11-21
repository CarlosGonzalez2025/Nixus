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
"[project]/src/app/(app)/permits/data:5aa214 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7873b9c7850e737568a6f6f7a4e17cda15a8f18e15":"updatePermitStatus"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updatePermitStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7873b9c7850e737568a6f6f7a4e17cda15a8f18e15", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updatePermitStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEgfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUgfSBmcm9tICdmaXJlYmFzZS1hZG1pbi9maXJlc3RvcmUnO1xuaW1wb3J0IHsgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uIH0gZnJvbSAnQC9saWIvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnQVJFQSBTU1QgKHNpIGFwbGljYSknLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9XG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICFzaWduYXR1cmVEYXRhVXJsIHx8ICF1c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LiR7c2lnbmF0dXJlVHlwZX1gO1xuICAgICAgICBjb25zdCBzdGF0dXNQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnN0YXR1c2A7XG4gICAgICAgIGNvbnN0IHVzZXJJZFBhdGggPSBgYXBwcm92YWxzLiR7cm9sZX0udXNlcklkYDtcbiAgICAgICAgY29uc3QgdXNlck5hbWVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJOYW1lYDtcbiAgICAgICAgY29uc3Qgc2lnbmVkQXRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnNpZ25lZEF0YDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgW3NpZ25hdHVyZVBhdGhdOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgW2Ake3VzZXJOYW1lUGF0aH1gXTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIFtgJHt1c2VySWRQYXRofWBdOiB1c2VyLnVpZCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3N0YXR1c1BhdGhdID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbc2lnbmVkQXRQYXRoXSA9IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCk7XG5cbiAgICAgICAgICAgIC8vIFNpIGVzIGVsIHNvbGljaXRhbnRlIHF1aWVuIGZpcm1hLCBjYW1iaWFtb3MgZWwgZXN0YWRvIHkgZ2VuZXJhbW9zIGVsIG7Dum1lcm8uXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAocGVybWl0RG9jQmVmb3JlLmV4aXN0cyAmJiBwZXJtaXREb2NCZWZvcmUuZGF0YSgpPy5zdGF0dXMgPT09ICdib3JyYWRvcicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7cGVybWl0SWQuc3Vic3RyaW5nKDAsIDYpLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ251bWJlciddID0gcGVybWl0TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAncGVuZGllbnRlX3JldmlzaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVJvbGVOYW1lID0gKHNpZ25hdHVyZVJvbGVzIGFzIGFueSlbcm9sZV0gfHwgcm9sZTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgICAgICBcbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpOb3RpZmljYWNpw7NuIGRlIEZpcm1hIC0gU0dQVCog8J+Wi++4j1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkby5cblxu8J+RpCAqUXVpw6luIGZpcm3DszoqICR7dXNlci5kaXNwbGF5TmFtZSB8fCAnTi9BJ31cbuKcqCAqUm9sOiogJHtzaWduYXR1cmVSb2xlTmFtZX1cbuKcje+4jyAqVGlwbyBkZSBmaXJtYToqICR7c2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ0FwZXJ0dXJhJyA6ICdDaWVycmUnfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJyAmJiBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb2R5ID0gYCpQZXJtaXNvIGxpc3RvIHBhcmEgQXV0b3JpemFjacOzbiAtIFNHUFQqIOKPs1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkbyBwb3IgZWwgc29saWNpdGFudGUgeSBlc3TDoSBsaXN0byBwYXJhIHN1IHJldmlzacOzbi5cblxu8J+RpCAqU29saWNpdGFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG5cblBvciBmYXZvciwgaW5ncmVzZSBwYXJhIHJldmlzYXJsbyB5IGF1dG9yaXphcmxvOlxuJHtwZXJtaXRVcmx9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coYFtBY3Rpb25dIE5vdGlmaWNhY2nDs24gZGUgZmlybWEgZW52aWFkYSBwYXJhIGVsIHBlcm1pc28gJHtwZXJtaXRJZH1gKTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMocGVybWl0SWQ6IHN0cmluZywgc3RhdHVzOiBQZXJtaXRTdGF0dXMsIHJlYXNvbj86IHN0cmluZywgY2xvc3VyZURhdGE/OiBQYXJ0aWFsPFBlcm1pdENsb3N1cmU+KSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSwgLy8gWVlZWS1NTS1ERFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggcGVybWl0IGZvciBub3RpZmljYXRpb25cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0RG9jLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IGdldFN0YXR1c1RleHQoc3RhdHVzKTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke3N0YXR1c1RleHR9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgIG1lc3NhZ2VCb2R5ICs9IGBcXG5cXG4qTW90aXZvIGRlbCByZWNoYXpvOiogJHtyZWFzb259YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIHVwZGF0aW5nIHBlcm1pdCBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCB1cGRhdGUgcGVybWl0IHN0YXR1cy4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRGFpbHlWYWxpZGF0aW9uU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIGFuZXhvTmFtZTogc3RyaW5nLCB2YWxpZGF0aW9uVHlwZTogJ2F1dG9yaWRhZCcgfCAncmVzcG9uc2FibGUnLCBpbmRleDogbnVtYmVyLCBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPT09IHVuZGVmaW5lZCB8fCAhZGF0YSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgY29uc3QgYW5leG9EYXRhID0gcGVybWl0RGF0YVthbmV4b05hbWUgYXMga2V5b2YgUGVybWl0XSBhcyBhbnk7XG4gICAgaWYgKCFhbmV4b0RhdGEgfHwgIWFuZXhvRGF0YS52YWxpZGFjaW9uKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXN0w6EgY29uZmlndXJhZG8gcGFyYSB2YWxpZGFjacOzbiBkaWFyaWEuYCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW107XG4gICAgaWYgKCF2YWxpZGF0aW9uQXJyYXkgfHwgaW5kZXggPCAwIHx8IGluZGV4ID49IHZhbGlkYXRpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYMONbmRpY2UgZGUgdmFsaWRhY2nDs24gZnVlcmEgZGUgcmFuZ28uYCB9O1xuICAgIH1cblxuICAgIHZhbGlkYXRpb25BcnJheVtpbmRleF0gPSBkYXRhO1xuXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YF06IHZhbGlkYXRpb25BcnJheVxuICAgIH0pO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVUeXBlXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQStRc0IifQ==
}}),
"[project]/src/app/(app)/permits/data:e12e60 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7c15bdb6ac388e78a59299d5091891127d63de7bc6":"addSignatureAndNotify"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addSignatureAndNotify": (()=>addSignatureAndNotify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addSignatureAndNotify = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7c15bdb6ac388e78a59299d5091891127d63de7bc6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addSignatureAndNotify"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEgfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUgfSBmcm9tICdmaXJlYmFzZS1hZG1pbi9maXJlc3RvcmUnO1xuaW1wb3J0IHsgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uIH0gZnJvbSAnQC9saWIvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnQVJFQSBTU1QgKHNpIGFwbGljYSknLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9XG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICFzaWduYXR1cmVEYXRhVXJsIHx8ICF1c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LiR7c2lnbmF0dXJlVHlwZX1gO1xuICAgICAgICBjb25zdCBzdGF0dXNQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnN0YXR1c2A7XG4gICAgICAgIGNvbnN0IHVzZXJJZFBhdGggPSBgYXBwcm92YWxzLiR7cm9sZX0udXNlcklkYDtcbiAgICAgICAgY29uc3QgdXNlck5hbWVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJOYW1lYDtcbiAgICAgICAgY29uc3Qgc2lnbmVkQXRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnNpZ25lZEF0YDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgW3NpZ25hdHVyZVBhdGhdOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgW2Ake3VzZXJOYW1lUGF0aH1gXTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIFtgJHt1c2VySWRQYXRofWBdOiB1c2VyLnVpZCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3N0YXR1c1BhdGhdID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbc2lnbmVkQXRQYXRoXSA9IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCk7XG5cbiAgICAgICAgICAgIC8vIFNpIGVzIGVsIHNvbGljaXRhbnRlIHF1aWVuIGZpcm1hLCBjYW1iaWFtb3MgZWwgZXN0YWRvIHkgZ2VuZXJhbW9zIGVsIG7Dum1lcm8uXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAocGVybWl0RG9jQmVmb3JlLmV4aXN0cyAmJiBwZXJtaXREb2NCZWZvcmUuZGF0YSgpPy5zdGF0dXMgPT09ICdib3JyYWRvcicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7cGVybWl0SWQuc3Vic3RyaW5nKDAsIDYpLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ251bWJlciddID0gcGVybWl0TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAncGVuZGllbnRlX3JldmlzaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVJvbGVOYW1lID0gKHNpZ25hdHVyZVJvbGVzIGFzIGFueSlbcm9sZV0gfHwgcm9sZTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgICAgICBcbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpOb3RpZmljYWNpw7NuIGRlIEZpcm1hIC0gU0dQVCog8J+Wi++4j1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkby5cblxu8J+RpCAqUXVpw6luIGZpcm3DszoqICR7dXNlci5kaXNwbGF5TmFtZSB8fCAnTi9BJ31cbuKcqCAqUm9sOiogJHtzaWduYXR1cmVSb2xlTmFtZX1cbuKcje+4jyAqVGlwbyBkZSBmaXJtYToqICR7c2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ0FwZXJ0dXJhJyA6ICdDaWVycmUnfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJyAmJiBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb2R5ID0gYCpQZXJtaXNvIGxpc3RvIHBhcmEgQXV0b3JpemFjacOzbiAtIFNHUFQqIOKPs1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkbyBwb3IgZWwgc29saWNpdGFudGUgeSBlc3TDoSBsaXN0byBwYXJhIHN1IHJldmlzacOzbi5cblxu8J+RpCAqU29saWNpdGFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG5cblBvciBmYXZvciwgaW5ncmVzZSBwYXJhIHJldmlzYXJsbyB5IGF1dG9yaXphcmxvOlxuJHtwZXJtaXRVcmx9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coYFtBY3Rpb25dIE5vdGlmaWNhY2nDs24gZGUgZmlybWEgZW52aWFkYSBwYXJhIGVsIHBlcm1pc28gJHtwZXJtaXRJZH1gKTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMocGVybWl0SWQ6IHN0cmluZywgc3RhdHVzOiBQZXJtaXRTdGF0dXMsIHJlYXNvbj86IHN0cmluZywgY2xvc3VyZURhdGE/OiBQYXJ0aWFsPFBlcm1pdENsb3N1cmU+KSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSwgLy8gWVlZWS1NTS1ERFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggcGVybWl0IGZvciBub3RpZmljYXRpb25cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0RG9jLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IGdldFN0YXR1c1RleHQoc3RhdHVzKTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke3N0YXR1c1RleHR9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgIG1lc3NhZ2VCb2R5ICs9IGBcXG5cXG4qTW90aXZvIGRlbCByZWNoYXpvOiogJHtyZWFzb259YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIHVwZGF0aW5nIHBlcm1pdCBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCB1cGRhdGUgcGVybWl0IHN0YXR1cy4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRGFpbHlWYWxpZGF0aW9uU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIGFuZXhvTmFtZTogc3RyaW5nLCB2YWxpZGF0aW9uVHlwZTogJ2F1dG9yaWRhZCcgfCAncmVzcG9uc2FibGUnLCBpbmRleDogbnVtYmVyLCBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPT09IHVuZGVmaW5lZCB8fCAhZGF0YSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgY29uc3QgYW5leG9EYXRhID0gcGVybWl0RGF0YVthbmV4b05hbWUgYXMga2V5b2YgUGVybWl0XSBhcyBhbnk7XG4gICAgaWYgKCFhbmV4b0RhdGEgfHwgIWFuZXhvRGF0YS52YWxpZGFjaW9uKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXN0w6EgY29uZmlndXJhZG8gcGFyYSB2YWxpZGFjacOzbiBkaWFyaWEuYCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW107XG4gICAgaWYgKCF2YWxpZGF0aW9uQXJyYXkgfHwgaW5kZXggPCAwIHx8IGluZGV4ID49IHZhbGlkYXRpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYMONbmRpY2UgZGUgdmFsaWRhY2nDs24gZnVlcmEgZGUgcmFuZ28uYCB9O1xuICAgIH1cblxuICAgIHZhbGlkYXRpb25BcnJheVtpbmRleF0gPSBkYXRhO1xuXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YF06IHZhbGlkYXRpb25BcnJheVxuICAgIH0pO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVUeXBlXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitTQXlMc0IifQ==
}}),
"[project]/src/app/(app)/permits/data:40bc04 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7cdc6233c637b331b2fa6dba912da67e147424b389":"addDailyValidationSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addDailyValidationSignature": (()=>addDailyValidationSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addDailyValidationSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7cdc6233c637b331b2fa6dba912da67e147424b389", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addDailyValidationSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEgfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUgfSBmcm9tICdmaXJlYmFzZS1hZG1pbi9maXJlc3RvcmUnO1xuaW1wb3J0IHsgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uIH0gZnJvbSAnQC9saWIvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnQVJFQSBTU1QgKHNpIGFwbGljYSknLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9XG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICFzaWduYXR1cmVEYXRhVXJsIHx8ICF1c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LiR7c2lnbmF0dXJlVHlwZX1gO1xuICAgICAgICBjb25zdCBzdGF0dXNQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnN0YXR1c2A7XG4gICAgICAgIGNvbnN0IHVzZXJJZFBhdGggPSBgYXBwcm92YWxzLiR7cm9sZX0udXNlcklkYDtcbiAgICAgICAgY29uc3QgdXNlck5hbWVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJOYW1lYDtcbiAgICAgICAgY29uc3Qgc2lnbmVkQXRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnNpZ25lZEF0YDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgW3NpZ25hdHVyZVBhdGhdOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgW2Ake3VzZXJOYW1lUGF0aH1gXTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIFtgJHt1c2VySWRQYXRofWBdOiB1c2VyLnVpZCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3N0YXR1c1BhdGhdID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbc2lnbmVkQXRQYXRoXSA9IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCk7XG5cbiAgICAgICAgICAgIC8vIFNpIGVzIGVsIHNvbGljaXRhbnRlIHF1aWVuIGZpcm1hLCBjYW1iaWFtb3MgZWwgZXN0YWRvIHkgZ2VuZXJhbW9zIGVsIG7Dum1lcm8uXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAocGVybWl0RG9jQmVmb3JlLmV4aXN0cyAmJiBwZXJtaXREb2NCZWZvcmUuZGF0YSgpPy5zdGF0dXMgPT09ICdib3JyYWRvcicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7cGVybWl0SWQuc3Vic3RyaW5nKDAsIDYpLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ251bWJlciddID0gcGVybWl0TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAncGVuZGllbnRlX3JldmlzaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVJvbGVOYW1lID0gKHNpZ25hdHVyZVJvbGVzIGFzIGFueSlbcm9sZV0gfHwgcm9sZTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgICAgICBcbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpOb3RpZmljYWNpw7NuIGRlIEZpcm1hIC0gU0dQVCog8J+Wi++4j1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkby5cblxu8J+RpCAqUXVpw6luIGZpcm3DszoqICR7dXNlci5kaXNwbGF5TmFtZSB8fCAnTi9BJ31cbuKcqCAqUm9sOiogJHtzaWduYXR1cmVSb2xlTmFtZX1cbuKcje+4jyAqVGlwbyBkZSBmaXJtYToqICR7c2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ0FwZXJ0dXJhJyA6ICdDaWVycmUnfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJyAmJiBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb2R5ID0gYCpQZXJtaXNvIGxpc3RvIHBhcmEgQXV0b3JpemFjacOzbiAtIFNHUFQqIOKPs1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkbyBwb3IgZWwgc29saWNpdGFudGUgeSBlc3TDoSBsaXN0byBwYXJhIHN1IHJldmlzacOzbi5cblxu8J+RpCAqU29saWNpdGFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG5cblBvciBmYXZvciwgaW5ncmVzZSBwYXJhIHJldmlzYXJsbyB5IGF1dG9yaXphcmxvOlxuJHtwZXJtaXRVcmx9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coYFtBY3Rpb25dIE5vdGlmaWNhY2nDs24gZGUgZmlybWEgZW52aWFkYSBwYXJhIGVsIHBlcm1pc28gJHtwZXJtaXRJZH1gKTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMocGVybWl0SWQ6IHN0cmluZywgc3RhdHVzOiBQZXJtaXRTdGF0dXMsIHJlYXNvbj86IHN0cmluZywgY2xvc3VyZURhdGE/OiBQYXJ0aWFsPFBlcm1pdENsb3N1cmU+KSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSwgLy8gWVlZWS1NTS1ERFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggcGVybWl0IGZvciBub3RpZmljYXRpb25cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0RG9jLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IGdldFN0YXR1c1RleHQoc3RhdHVzKTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke3N0YXR1c1RleHR9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgIG1lc3NhZ2VCb2R5ICs9IGBcXG5cXG4qTW90aXZvIGRlbCByZWNoYXpvOiogJHtyZWFzb259YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIHVwZGF0aW5nIHBlcm1pdCBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCB1cGRhdGUgcGVybWl0IHN0YXR1cy4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRGFpbHlWYWxpZGF0aW9uU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIGFuZXhvTmFtZTogc3RyaW5nLCB2YWxpZGF0aW9uVHlwZTogJ2F1dG9yaWRhZCcgfCAncmVzcG9uc2FibGUnLCBpbmRleDogbnVtYmVyLCBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPT09IHVuZGVmaW5lZCB8fCAhZGF0YSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgY29uc3QgYW5leG9EYXRhID0gcGVybWl0RGF0YVthbmV4b05hbWUgYXMga2V5b2YgUGVybWl0XSBhcyBhbnk7XG4gICAgaWYgKCFhbmV4b0RhdGEgfHwgIWFuZXhvRGF0YS52YWxpZGFjaW9uKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXN0w6EgY29uZmlndXJhZG8gcGFyYSB2YWxpZGFjacOzbiBkaWFyaWEuYCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW107XG4gICAgaWYgKCF2YWxpZGF0aW9uQXJyYXkgfHwgaW5kZXggPCAwIHx8IGluZGV4ID49IHZhbGlkYXRpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYMONbmRpY2UgZGUgdmFsaWRhY2nDs24gZnVlcmEgZGUgcmFuZ28uYCB9O1xuICAgIH1cblxuICAgIHZhbGlkYXRpb25BcnJheVtpbmRleF0gPSBkYXRhO1xuXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YF06IHZhbGlkYXRpb25BcnJheVxuICAgIH0pO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVUeXBlXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFUQXlVc0IifQ==
}}),
"[project]/src/app/(app)/permits/data:c2b83a [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4":"addWorkerSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addWorkerSignature": (()=>addWorkerSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addWorkerSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addWorkerSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlLCBBbmV4b0FsdHVyYSwgQW5leG9Db25maW5hZG8sIEFuZXhvRW5lcmdpYXMsIEFuZXhvRXhjYXZhY2lvbmVzLCBBbmV4b0l6YWplLCBBbmV4b0FUUywgUGVybWl0R2VuZXJhbEluZm8sIEp1c3RpZmljYWNpb25BVFMsIFZhbGlkYWNpb25EaWFyaWEgfSBmcm9tICdAL3R5cGVzJztcbmltcG9ydCB7IEZpZWxkVmFsdWUgfSBmcm9tICdmaXJlYmFzZS1hZG1pbi9maXJlc3RvcmUnO1xuaW1wb3J0IHsgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uIH0gZnJvbSAnQC9saWIvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbmNvbnN0IHdvcmtUeXBlc01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdhbHR1cmFzJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdleGNhdmFjaW9uJzogJ0V4Y2F2YWNpb25lcycsXG4gICdnZW5lcmFsJzogJ1RyYWJham8gR2VuZXJhbCdcbn07XG5cbmNvbnN0IGdldFdvcmtUeXBlc1N0cmluZyA9IChwZXJtaXQ6IFBhcnRpYWw8UGVybWl0Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkVHlwZXM6IHN0cmluZ1tdID0gW107XG4gIGlmIChwZXJtaXQudHJhYmFqb0FsdHVyYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnVHJhYmFqbyBlbiBBbHR1cmFzJyk7XG4gIGlmIChwZXJtaXQuZXNwYWNpb3NDb25maW5hZG9zKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0VzcGFjaW9zIENvbmZpbmFkb3MnKTtcbiAgaWYgKHBlcm1pdC5jb250cm9sRW5lcmdpYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnQ29udHJvbCBkZSBFbmVyZ8OtYXMnKTtcbiAgaWYgKHBlcm1pdC5pemFqZUNhcmdhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdJemFqZSBkZSBDYXJnYXMnKTtcbiAgaWYgKHBlcm1pdC5leGNhdmFjaW9uZXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXhjYXZhY2lvbmVzJyk7XG4gIFxuICBpZiAoc2VsZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAocGVybWl0LnRyYWJham9HZW5lcmFsKSByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBkYXRhIHN0cnVjdHVyZVxuICAgIGlmIChwZXJtaXQud29ya1R5cGUgJiYgQXJyYXkuaXNBcnJheShwZXJtaXQud29ya1R5cGUpKSB7XG4gICAgICByZXR1cm4gcGVybWl0LndvcmtUeXBlLm1hcChrZXkgPT4gd29ya1R5cGVzTWFwW2tleV0gfHwga2V5KS5qb2luKCcsICcpO1xuICAgIH1cbiAgICByZXR1cm4gJ1RyYWJham8gR2VuZXJhbCc7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdGVkVHlwZXMuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnXTogc3RyaW5nIH0gPSB7XG4gIGNvb3JkaW5hZG9yX2FsdHVyYXM6ICdDT09SRElOQURPUiBERSBUUkFCQUpPUyBFTiBBTFRVUkFTJyxcbiAgc29saWNpdGFudGU6ICdRVUlFTiBTT0xJQ0lUQSAoTMONREVSIEEgQ0FSR08gREVMIEVRVUlQTyBFSkVDVVRBTlRFKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIG1hbnRlbmltaWVudG86ICdQRVJTT05BTCBERSBNQU5URU5JTUlFTlRPJyxcbiAgbGlkZXJfc3N0OiAnQVJFQSBTU1QgKHNpIGFwbGljYSknLFxufTtcblxuXG50eXBlIFBlcm1pdENyZWF0ZURhdGEgPSBPbWl0PFBlcm1pdCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZEJ5JyB8ICdudW1iZXInIHwgJ3VzZXInIHwgJ2FwcHJvdmFscycgfCAnY2xvc3VyZSc+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9XG4pIHtcbiAgICBpZiAoIXBlcm1pdElkIHx8ICFyb2xlIHx8ICFzaWduYXR1cmVEYXRhVXJsIHx8ICF1c2VyKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcyBwYXJhIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LiR7c2lnbmF0dXJlVHlwZX1gO1xuICAgICAgICBjb25zdCBzdGF0dXNQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnN0YXR1c2A7XG4gICAgICAgIGNvbnN0IHVzZXJJZFBhdGggPSBgYXBwcm92YWxzLiR7cm9sZX0udXNlcklkYDtcbiAgICAgICAgY29uc3QgdXNlck5hbWVQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJOYW1lYDtcbiAgICAgICAgY29uc3Qgc2lnbmVkQXRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnNpZ25lZEF0YDtcblxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgW3NpZ25hdHVyZVBhdGhdOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgW2Ake3VzZXJOYW1lUGF0aH1gXTogdXNlci5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIFtgJHt1c2VySWRQYXRofWBdOiB1c2VyLnVpZCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3N0YXR1c1BhdGhdID0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbc2lnbmVkQXRQYXRoXSA9IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCk7XG5cbiAgICAgICAgICAgIC8vIFNpIGVzIGVsIHNvbGljaXRhbnRlIHF1aWVuIGZpcm1hLCBjYW1iaWFtb3MgZWwgZXN0YWRvIHkgZ2VuZXJhbW9zIGVsIG7Dum1lcm8uXG4gICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAocGVybWl0RG9jQmVmb3JlLmV4aXN0cyAmJiBwZXJtaXREb2NCZWZvcmUuZGF0YSgpPy5zdGF0dXMgPT09ICdib3JyYWRvcicpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7cGVybWl0SWQuc3Vic3RyaW5nKDAsIDYpLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbJ251bWJlciddID0gcGVybWl0TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAncGVuZGllbnRlX3JldmlzaW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVJvbGVOYW1lID0gKHNpZ25hdHVyZVJvbGVzIGFzIGFueSlbcm9sZV0gfHwgcm9sZTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgICAgICBcbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpOb3RpZmljYWNpw7NuIGRlIEZpcm1hIC0gU0dQVCog8J+Wi++4j1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkby5cblxu8J+RpCAqUXVpw6luIGZpcm3DszoqICR7dXNlci5kaXNwbGF5TmFtZSB8fCAnTi9BJ31cbuKcqCAqUm9sOiogJHtzaWduYXR1cmVSb2xlTmFtZX1cbuKcje+4jyAqVGlwbyBkZSBmaXJtYToqICR7c2lnbmF0dXJlVHlwZSA9PT0gJ2Zpcm1hQXBlcnR1cmEnID8gJ0FwZXJ0dXJhJyA6ICdDaWVycmUnfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcblxuICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJyAmJiBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VCb2R5ID0gYCpQZXJtaXNvIGxpc3RvIHBhcmEgQXV0b3JpemFjacOzbiAtIFNHUFQqIOKPs1xuRWwgcGVybWlzbyAqJHtwZXJtaXREYXRhLm51bWJlciB8fCBwZXJtaXRJZH0qIGhhIHNpZG8gZmlybWFkbyBwb3IgZWwgc29saWNpdGFudGUgeSBlc3TDoSBsaXN0byBwYXJhIHN1IHJldmlzacOzbi5cblxu8J+RpCAqU29saWNpdGFudGU6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG5cblBvciBmYXZvciwgaW5ncmVzZSBwYXJhIHJldmlzYXJsbyB5IGF1dG9yaXphcmxvOlxuJHtwZXJtaXRVcmx9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coYFtBY3Rpb25dIE5vdGlmaWNhY2nDs24gZGUgZmlybWEgZW52aWFkYSBwYXJhIGVsIHBlcm1pc28gJHtwZXJtaXRJZH1gKTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgZmlybWEgeSBub3RpZmljYXI6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ05vIHNlIHB1ZG8gZ3VhcmRhciBsYSBmaXJtYS4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQZXJtaXRTdGF0dXMocGVybWl0SWQ6IHN0cmluZywgc3RhdHVzOiBQZXJtaXRTdGF0dXMsIHJlYXNvbj86IHN0cmluZywgY2xvc3VyZURhdGE/OiBQYXJ0aWFsPFBlcm1pdENsb3N1cmU+KSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSwgLy8gWVlZWS1NTS1ERFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgLy8gRmV0Y2ggcGVybWl0IGZvciBub3RpZmljYXRpb25cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0RG9jLmRhdGEoKSBhcyBQZXJtaXQ7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IGdldFN0YXR1c1RleHQoc3RhdHVzKTtcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke3N0YXR1c1RleHR9XG5cblB1ZWRlIHZlciBsb3MgZGV0YWxsZXMgYXF1w606XG4ke3Blcm1pdFVybH1gO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgIG1lc3NhZ2VCb2R5ICs9IGBcXG5cXG4qTW90aXZvIGRlbCByZWNoYXpvOiogJHtyZWFzb259YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgc2VuZFdoYXRzQXBwTm90aWZpY2F0aW9uKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcblxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIHVwZGF0aW5nIHBlcm1pdCBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCB1cGRhdGUgcGVybWl0IHN0YXR1cy4nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRGFpbHlWYWxpZGF0aW9uU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIGFuZXhvTmFtZTogc3RyaW5nLCB2YWxpZGF0aW9uVHlwZTogJ2F1dG9yaWRhZCcgfCAncmVzcG9uc2FibGUnLCBpbmRleDogbnVtYmVyLCBkYXRhOiBWYWxpZGFjaW9uRGlhcmlhKSB7XG4gIGlmICghcGVybWl0SWQgfHwgIWFuZXhvTmFtZSB8fCAhdmFsaWRhdGlvblR5cGUgfHwgaW5kZXggPT09IHVuZGVmaW5lZCB8fCAhZGF0YSkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1BhcsOhbWV0cm9zIGludsOhbGlkb3MuJyB9O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgIGNvbnN0IHBlcm1pdFNuYXAgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgaWYgKCFwZXJtaXRTbmFwLmV4aXN0cykge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRWwgcGVybWlzbyBubyBleGlzdGUuJyB9O1xuICAgIH1cbiAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuXG4gICAgY29uc3QgYW5leG9EYXRhID0gcGVybWl0RGF0YVthbmV4b05hbWUgYXMga2V5b2YgUGVybWl0XSBhcyBhbnk7XG4gICAgaWYgKCFhbmV4b0RhdGEgfHwgIWFuZXhvRGF0YS52YWxpZGFjaW9uKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBFbCBhbmV4byAke2FuZXhvTmFtZX0gbm8gZXN0w6EgY29uZmlndXJhZG8gcGFyYSB2YWxpZGFjacOzbiBkaWFyaWEuYCB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25BcnJheSA9IGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW107XG4gICAgaWYgKCF2YWxpZGF0aW9uQXJyYXkgfHwgaW5kZXggPCAwIHx8IGluZGV4ID49IHZhbGlkYXRpb25BcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYMONbmRpY2UgZGUgdmFsaWRhY2nDs24gZnVlcmEgZGUgcmFuZ28uYCB9O1xuICAgIH1cblxuICAgIHZhbGlkYXRpb25BcnJheVtpbmRleF0gPSBkYXRhO1xuXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbYCR7YW5leG9OYW1lfS52YWxpZGFjaW9uLiR7dmFsaWRhdGlvblR5cGV9YF06IHZhbGlkYXRpb25BcnJheVxuICAgIH0pO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya2Vyc1t3b3JrZXJJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi53b3JrZXJzW3dvcmtlckluZGV4XSxcbiAgICAgICAgICAgIFtzaWduYXR1cmVUeXBlXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBkb2NSZWYudXBkYXRlKHsgd29ya2Vyczogd29ya2VycyB9KTtcblxuICAgICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtwZXJtaXRJZH1gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGd1YXJkYXIgbGEgZmlybWEgZGVsIHRyYWJhamFkb3I6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQStXc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5aa214__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:5aa214 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$e12e60__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:e12e60 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$40bc04__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:40bc04 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$c2b83a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:c2b83a [app-ssr] (ecmascript) <text/javascript>");
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
// ✅ Helper function to handle different date formats
const parseFirestoreDate = (dateValue)=>{
    if (!dateValue) return null;
    // If it's a Firestore Timestamp
    if (typeof dateValue.toDate === 'function') {
        return dateValue.toDate();
    }
    // If it's already a Date object
    if (dateValue instanceof Date) {
        return dateValue;
    }
    // If it's a string (ISO format)
    if (typeof dateValue === 'string') {
        return new Date(dateValue);
    }
    return null;
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
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 121,
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
                lineNumber: 131,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-gray-800 break-words",
                children: value || 'No especificado'
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
const RadioCheck = ({ label, value, onValueChange, readOnly = false })=>{
    let checkValue;
    if (value === true || value === 'si') {
        checkValue = 'si';
    } else if (value === false || value === 'no') {
        checkValue = 'no';
    } else {
        checkValue = 'na';
    }
    const baseClasses = "flex justify-between items-center p-2 rounded-md";
    const readOnlyClasses = "bg-gray-50";
    const interactiveClasses = "bg-white border";
    const getOptionClasses = (option)=>{
        const base = "cursor-pointer";
        const selected = "font-bold text-black";
        const unselected = "text-gray-400";
        return `${base} ${checkValue === option ? selected : unselected}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${baseClasses} ${readOnly ? readOnlyClasses : interactiveClasses}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs flex-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 159,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 items-center text-xs font-mono",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: getOptionClasses('si'),
                        children: "SI"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 161,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: getOptionClasses('no'),
                        children: "NO"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 162,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: getOptionClasses('na'),
                        children: "NA"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 160,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 158,
        columnNumber: 9
    }, this);
};
const signatureRoles = {
    coordinador_alturas: 'COORDINADOR (ANEXO)',
    solicitante: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
    mantenimiento: 'MANTENIMIENTO (SI APLICA)',
    lider_sst: 'SST (SI APLICA)',
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
    const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [permit, setPermit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signingRole, setSigningRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signerName, setSignerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSigning, setIsSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStatusChanging, setIsStatusChanging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectionReason, setRejectionReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRejectionDialogOpen, setIsRejectionDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClosureDialogOpen, setIsClosureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDailyValidationSignatureOpen, setIsDailyValidationSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dailyValidationTarget, setDailyValidationTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dailyValidationName, setDailyValidationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [dailyValidationDate, setDailyValidationDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isWorkerSignatureOpen, setIsWorkerSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [workerSignatureTarget, setWorkerSignatureTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!permitId) {
            setError('ID de permiso no válido.');
            setLoading(false);
            return;
        }
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'permits', permitId);
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(docRef, (docSnap)=>{
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPermit({
                    id: docSnap.id,
                    ...data,
                    createdAt: parseFirestoreDate(data.createdAt),
                    closure: data.closure || {},
                    approvals: data.approvals || {}
                });
                setError(null);
            } else {
                setError('No se encontró el permiso de trabajo.');
                setPermit(null);
            }
            setLoading(false);
        }, (serverError)=>{
            const permissionError = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirestorePermissionError"]({
                path: docRef.path,
                operation: 'get'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$error$2d$emitter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorEmitter"].emit('permission-error', permissionError);
            setError('No tiene permisos para ver este documento.');
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        permitId
    ]);
    // ============================================================================
    // FUNCIÓN MEJORADA PARA GENERAR PDF DEL PERMISO DE TRABAJO
    // Basada en la estructura del documento Excel DN-FR-SST-016
    // ============================================================================
    const handleExportToPDF = async ()=>{
        if (!permit) return;
        toast({
            title: 'Generando PDF...',
            description: 'Este proceso puede tardar un momento.'
        });
        try {
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'letter'); // Tamaño carta (8.5" x 11")
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 10;
            let yPos = 15;
            // Colores corporativos
            const primaryColor = [
                29,
                181,
                193
            ]; // Turquoise #1DB5C1
            const headerBg = [
                248,
                249,
                250
            ];
            const grayText = [
                100,
                100,
                100
            ];
            // ========================================
            // FUNCIONES AUXILIARES
            // ========================================
            // Función para añadir nueva página si es necesario
            const checkPageBreak = (height)=>{
                if (yPos + height > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                    return true;
                }
                return false;
            };
            // Función para añadir encabezado en cada página
            const addHeader = ()=>{
                // Logo ITALCOL (simulado con rectángulo y texto)
                doc.setFillColor(...headerBg);
                doc.rect(margin, margin, 50, 15, 'F');
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('ITALCOL', margin + 5, margin + 10);
                // Título del documento centrado
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...primaryColor);
                doc.text('PERMISO DE TRABAJO', pageWidth / 2, margin + 8, {
                    align: 'center'
                });
                // Cuadro de información del documento (derecha)
                const infoBoxX = pageWidth - margin - 55;
                doc.setFontSize(7);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                // Crear tabla pequeña para código/versión/fecha
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: margin,
                    margin: {
                        left: infoBoxX
                    },
                    body: [
                        [
                            'Código:',
                            'DN-FR-SST-016'
                        ],
                        [
                            'Versión:',
                            '04'
                        ],
                        [
                            'Fecha:',
                            '23-01-2023'
                        ]
                    ],
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 1,
                        textColor: [
                            0,
                            0,
                            0
                        ]
                    },
                    columnStyles: {
                        0: {
                            fontStyle: 'bold',
                            cellWidth: 18
                        },
                        1: {
                            cellWidth: 30
                        }
                    }
                });
                yPos = margin + 20;
            };
            // Función para secciones con fondo gris
            const addSectionTitle = (title, color = primaryColor)=>{
                checkPageBreak(12);
                doc.setFillColor(...headerBg);
                doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...color);
                doc.text(title.toUpperCase(), margin + 2, yPos + 5.5);
                doc.setTextColor(0, 0, 0);
                yPos += 10;
            };
            // ========================================
            // PÁGINA 1: INFORMACIÓN GENERAL
            // ========================================
            addHeader();
            // INFORMACIÓN GENERAL
            addSectionTitle('INFORMACIÓN GENERAL - Aplica a todos los Permisos');
            checkPageBreak(60);
            // Fecha de expedición y datos básicos en tabla
            const infoData = [
                [
                    'Fecha Expedición:',
                    permit.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(permit.createdAt, 'dd/MM/yyyy HH:mm') : 'N/A',
                    'Planta:',
                    permit.generalInfo?.planta || 'N/A'
                ],
                [
                    'No. Permiso:',
                    permit.number || permit.id.substring(0, 8),
                    'Área Específica:',
                    permit.generalInfo?.areaEspecifica || 'N/A'
                ],
                [
                    'Empresa:',
                    permit.generalInfo?.empresa || 'N/A',
                    'Proceso:',
                    permit.generalInfo?.proceso || 'N/A'
                ],
                [
                    'Contrato:',
                    permit.generalInfo?.contrato || 'N/A',
                    'Solicitante:',
                    permit.user?.displayName || 'N/A'
                ]
            ];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                startY: yPos,
                body: infoData,
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                    overflow: 'linebreak'
                },
                columnStyles: {
                    0: {
                        fontStyle: 'bold',
                        cellWidth: 35
                    },
                    1: {
                        cellWidth: 45
                    },
                    2: {
                        fontStyle: 'bold',
                        cellWidth: 35
                    },
                    3: {
                        cellWidth: 45
                    }
                }
            });
            yPos = doc.lastAutoTable.finalY + 3;
            // Responsable del trabajo
            if (permit.generalInfo?.responsable) {
                checkPageBreak(20);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text('RESPONSABLE DEL TRABAJO:', margin, yPos);
                yPos += 5;
                doc.setFont('helvetica', 'normal');
                doc.text(`${permit.generalInfo.responsable.nombre} - ${permit.generalInfo.responsable.cargo}`, margin + 2, yPos);
                doc.text(`${permit.generalInfo.responsable.compania}`, margin + 2, yPos + 4);
                yPos += 10;
            }
            // Vigencia del permiso
            checkPageBreak(15);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                startY: yPos,
                body: [
                    [
                        'VIGENCIA:',
                        `Desde: ${permit.generalInfo?.validFrom ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'}`,
                        `Hasta: ${permit.generalInfo?.validUntil ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'}`
                    ]
                ],
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 2
                },
                columnStyles: {
                    0: {
                        fontStyle: 'bold',
                        cellWidth: 25,
                        fillColor: [
                            230,
                            230,
                            230
                        ]
                    }
                }
            });
            yPos = doc.lastAutoTable.finalY + 3;
            // Alcance del trabajo
            checkPageBreak(25);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('ALCANCE - El trabajo se LIMITA a lo siguiente:', margin, yPos);
            yPos += 5;
            doc.setFont('helvetica', 'normal');
            const descLines = doc.splitTextToSize(permit.generalInfo?.workDescription || 'No especificado', pageWidth - 2 * margin - 4);
            doc.text(descLines, margin + 2, yPos);
            yPos += descLines.length * 4 + 3;
            // Tipos de trabajo seleccionados
            checkPageBreak(20);
            doc.setFont('helvetica', 'bold');
            doc.text('TIPOS DE TRABAJO:', margin, yPos);
            yPos += 5;
            doc.setFont('helvetica', 'normal');
            doc.setFillColor(255, 255, 200); // Amarillo claro para resaltar
            const workTypes = [];
            if (permit.selectedWorkTypes?.alturas) workTypes.push('☑ Trabajo en Alturas');
            if (permit.selectedWorkTypes?.confinado) workTypes.push('☑ Espacios Confinados');
            if (permit.selectedWorkTypes?.energia) workTypes.push('☑ Control de Energías');
            if (permit.selectedWorkTypes?.izaje) workTypes.push('☑ Izaje de Cargas');
            if (permit.selectedWorkTypes?.excavacion) workTypes.push('☑ Excavaciones');
            if (permit.selectedWorkTypes?.general) workTypes.push('☑ Trabajo General');
            workTypes.forEach((wt, idx)=>{
                doc.text(wt, margin + 2, yPos + idx * 5);
            });
            yPos += workTypes.length * 5 + 3;
            // ========================================
            // ATS - VERIFICACIÓN DE PELIGROS
            // ========================================
            if (permit.anexoATS) {
                checkPageBreak(30);
                addSectionTitle('VERIFICACIÓN DE LOS PELIGROS ASOCIADOS A LA ACTIVIDAD (ATS)');
                doc.setFontSize(7);
                doc.setFont('helvetica', 'italic');
                doc.text('Marque SI si el peligro está presente en la actividad', margin + 2, yPos);
                yPos += 5;
                // Agrupar peligros identificados (solo mostrar los que tienen SI)
                const peligrosIdentificados = atsPeligros.filter((p)=>permit.anexoATS?.peligros?.[p.id] === 'si').map((p)=>[
                        p.seccion,
                        p.label,
                        '☑ SI'
                    ]);
                if (peligrosIdentificados.length > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        head: [
                            [
                                'CATEGORÍA',
                                'PELIGRO',
                                'APLICA'
                            ]
                        ],
                        body: peligrosIdentificados,
                        theme: 'striped',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        },
                        headStyles: {
                            fillColor: [
                                ...primaryColor
                            ],
                            textColor: [
                                255,
                                255,
                                255
                            ],
                            fontStyle: 'bold'
                        },
                        columnStyles: {
                            0: {
                                cellWidth: 30,
                                fontStyle: 'bold'
                            },
                            1: {
                                cellWidth: 120
                            },
                            2: {
                                cellWidth: 15,
                                halign: 'center'
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ========================================
            // EPP REQUERIDOS
            // ========================================
            if (permit.anexoATS?.epp) {
                checkPageBreak(30);
                addSectionTitle('ELEMENTOS DE PROTECCIÓN PERSONAL (EPP) REQUERIDOS');
                const eppSeleccionados = Object.entries(eppOptions).flatMap(([category, items])=>items.filter((item)=>permit.anexoATS?.epp?.[item.id]).map((item)=>{
                        const spec = permit.anexoATS?.epp?.[`${item.id}_spec`] || '';
                        return [
                            category,
                            item.label,
                            spec
                        ];
                    }));
                if (eppSeleccionados.length > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        head: [
                            [
                                'CATEGORÍA',
                                'ELEMENTO',
                                'ESPECIFICACIÓN'
                            ]
                        ],
                        body: eppSeleccionados,
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        },
                        headStyles: {
                            fillColor: [
                                41,
                                128,
                                185
                            ],
                            textColor: [
                                255,
                                255,
                                255
                            ],
                            fontStyle: 'bold'
                        },
                        columnStyles: {
                            0: {
                                cellWidth: 45,
                                fontStyle: 'bold'
                            },
                            1: {
                                cellWidth: 80
                            },
                            2: {
                                cellWidth: 40
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ========================================
            // PÁGINA 2: PERSONAL Y FIRMAS
            // ========================================
            doc.addPage();
            addHeader();
            addSectionTitle('PERSONAL AUTORIZADO PARA EJECUTAR EL TRABAJO');
            if (permit.workers && permit.workers.length > 0) {
                const workersData = permit.workers.map((w, idx)=>[
                        (idx + 1).toString(),
                        w.nombre || 'N/A',
                        w.cedula || 'N/A',
                        w.rol === 'Otro' ? w.otroRol || 'N/A' : w.rol,
                        [
                            w.tsaTec?.tec ? 'TEC' : '',
                            w.tsaTec?.tsa ? 'TSA' : ''
                        ].filter(Boolean).join(', ') || 'N/A',
                        [
                            w.eps ? 'EPS' : '',
                            w.arl ? 'ARL' : '',
                            w.pensiones ? 'Pensión' : ''
                        ].filter(Boolean).join(', ') || 'N/A'
                    ]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    head: [
                        [
                            '#',
                            'NOMBRE COMPLETO',
                            'CÉDULA',
                            'ROL',
                            'APTITUD',
                            'SEG. SOCIAL'
                        ]
                    ],
                    body: workersData,
                    theme: 'grid',
                    styles: {
                        fontSize: 7,
                        cellPadding: 2
                    },
                    headStyles: {
                        fillColor: [
                            ...primaryColor
                        ],
                        textColor: [
                            255,
                            255,
                            255
                        ],
                        fontStyle: 'bold',
                        halign: 'center'
                    },
                    columnStyles: {
                        0: {
                            cellWidth: 8,
                            halign: 'center'
                        },
                        1: {
                            cellWidth: 50
                        },
                        2: {
                            cellWidth: 25
                        },
                        3: {
                            cellWidth: 30
                        },
                        4: {
                            cellWidth: 25
                        },
                        5: {
                            cellWidth: 27
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
            }
            // ========================================
            // FIRMAS DE APROBACIÓN
            // ========================================
            checkPageBreak(60);
            addSectionTitle('APROBACIONES Y FIRMAS');
            const approvalRoles = [
                'solicitante',
                'autorizante'
            ];
            if (permit.controlEnergia) approvalRoles.push('mantenimiento');
            approvalRoles.push('lider_sst');
            if (permit.selectedWorkTypes?.alturas) approvalRoles.splice(0, 0, 'coordinador_alturas');
            let signatureY = yPos;
            const signatureBoxWidth = (pageWidth - 3 * margin) / 2;
            const signatureBoxHeight = 35;
            let signatureX = margin;
            let signaturesInRow = 0;
            for (const role of approvalRoles){
                const approval = permit.approvals?.[role];
                if (checkPageBreak(signatureBoxHeight + 5)) {
                    signatureX = margin;
                    signatureY = yPos;
                    signaturesInRow = 0;
                }
                // Dibujar cuadro de firma
                doc.setDrawColor(200, 200, 200);
                doc.setFillColor(250, 250, 250);
                doc.roundedRect(signatureX, signatureY, signatureBoxWidth, signatureBoxHeight, 2, 2, 'FD');
                // Título del rol
                doc.setFontSize(7);
                doc.setFont('helvetica', 'bold');
                doc.text(signatureRoles[role].toUpperCase(), signatureX + 2, signatureY + 4);
                if (approval?.status === 'aprobado') {
                    // Estado aprobado
                    doc.setTextColor(40, 167, 69);
                    doc.setFontSize(8);
                    doc.text('✓ APROBADO', signatureX + 2, signatureY + 10);
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`${approval.userName || 'N/A'}`, signatureX + 2, signatureY + 15);
                    doc.text(`${approval.signedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(approval.signedAt), 'dd/MM/yy HH:mm') : 'N/A'}`, signatureX + 2, signatureY + 19);
                    // Firma
                    if (approval.firmaApertura) {
                        try {
                            doc.addImage(approval.firmaApertura, 'PNG', signatureX + 2, signatureY + 21, 35, 12);
                        } catch (e) {
                            doc.setFontSize(6);
                            doc.setTextColor(150, 150, 150);
                            doc.text('[Firma no disponible]', signatureX + 2, signatureY + 27);
                        }
                    }
                } else {
                    // Pendiente
                    doc.setTextColor(200, 150, 0);
                    doc.setFontSize(7);
                    doc.text('⏳ PENDIENTE DE FIRMA', signatureX + 2, signatureY + 10);
                    doc.setTextColor(0, 0, 0);
                }
                // Posicionar siguiente firma
                signaturesInRow++;
                if (signaturesInRow >= 2) {
                    signatureY += signatureBoxHeight + 3;
                    signatureX = margin;
                    signaturesInRow = 0;
                } else {
                    signatureX += signatureBoxWidth + margin;
                }
            }
            yPos = signatureY + signatureBoxHeight + 5;
            // ========================================
            // ANEXOS (Páginas adicionales)
            // ========================================
            // ANEXO 1: TRABAJOS EN ALTURA
            if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
                doc.addPage();
                addHeader();
                addSectionTitle('ANEXO 1 - TRABAJOS EN ALTURA', [
                    255,
                    100,
                    0
                ]);
                // Información general del anexo
                const alturaInfo = [
                    [
                        'Altura Aproximada:',
                        permit.anexoAltura.informacionGeneral?.altura || 'N/A'
                    ],
                    [
                        'Contacto de Emergencia:',
                        permit.anexoAltura.informacionGeneral?.contactoEmergencia || 'N/A'
                    ]
                ];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                    startY: yPos,
                    body: alturaInfo,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 2
                    },
                    columnStyles: {
                        0: {
                            fontStyle: 'bold',
                            cellWidth: 50
                        }
                    }
                });
                yPos = doc.lastAutoTable.finalY + 5;
                // Tipo de estructura
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text('TIPO DE ESTRUCTURA O EQUIPO:', margin, yPos);
                yPos += 5;
                const estructuras = anexoAlturaEstructuras.filter((e)=>permit.anexoAltura?.tipoEstructura?.[e.id]).map((e)=>`☑ ${e.label}`);
                estructuras.forEach((est, idx)=>{
                    doc.setFont('helvetica', 'normal');
                    doc.text(est, margin + 2, yPos + idx * 4);
                });
                yPos += estructuras.length * 4 + 5;
                // Aspectos de seguridad
                checkPageBreak(30);
                doc.setFont('helvetica', 'bold');
                doc.text('ASPECTOS DE SEGURIDAD VERIFICADOS:', margin, yPos);
                yPos += 5;
                const aspectosVerificados = anexoAlturaAspectos.filter((asp)=>permit.anexoAltura?.aspectosSeguridad?.[asp.id] === 'si').map((asp)=>[
                        asp.label,
                        '☑ SI'
                    ]);
                if (aspectosVerificados.length > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: aspectosVerificados,
                        theme: 'striped',
                        styles: {
                            fontSize: 7,
                            cellPadding: 1.5
                        },
                        columnStyles: {
                            0: {
                                cellWidth: 150
                            },
                            1: {
                                cellWidth: 15,
                                halign: 'center',
                                fontStyle: 'bold'
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ANEXO 2: ESPACIOS CONFINADOS
            if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
                doc.addPage();
                addHeader();
                addSectionTitle('ANEXO 2 - ESPACIOS CONFINADOS', [
                    128,
                    0,
                    128
                ]);
                // Resultados de pruebas de gases iniciales
                if (permit.anexoConfinado.resultadosPruebasGases) {
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text('RESULTADOS DE PRUEBAS DE GASES INICIALES:', margin, yPos);
                    yPos += 5;
                    const gasesData = [
                        [
                            'LEL (0%)',
                            permit.anexoConfinado.resultadosPruebasGases.lel || 'N/A'
                        ],
                        [
                            'O₂ (19.5-22%)',
                            permit.anexoConfinado.resultadosPruebasGases.o2 || 'N/A'
                        ],
                        [
                            'H₂S (0-10 PPM)',
                            permit.anexoConfinado.resultadosPruebasGases.h2s || 'N/A'
                        ],
                        [
                            'CO (0-25 PPM)',
                            permit.anexoConfinado.resultadosPruebasGases.co || 'N/A'
                        ]
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: gasesData,
                        theme: 'grid',
                        styles: {
                            fontSize: 8,
                            cellPadding: 2
                        },
                        columnStyles: {
                            0: {
                                fontStyle: 'bold',
                                cellWidth: 40,
                                fillColor: [
                                    230,
                                    230,
                                    230
                                ]
                            },
                            1: {
                                cellWidth: 40,
                                halign: 'center'
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 5;
                }
                // Pruebas periódicas
                if (permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas && permit.anexoConfinado.pruebasGasesPeriodicas.pruebas.length > 0) {
                    checkPageBreak(30);
                    doc.setFont('helvetica', 'bold');
                    doc.text('PRUEBAS PERIÓDICAS:', margin, yPos);
                    yPos += 5;
                    const pruebasData = permit.anexoConfinado.pruebasGasesPeriodicas.pruebas.map((p)=>[
                            p.hora || 'N/A',
                            p.lel || 'N/A',
                            p.o2 || 'N/A',
                            p.h2s || 'N/A',
                            p.co || 'N/A'
                        ]);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        head: [
                            [
                                'HORA',
                                'LEL',
                                'O₂',
                                'H₂S',
                                'CO'
                            ]
                        ],
                        body: pruebasData,
                        theme: 'grid',
                        styles: {
                            fontSize: 7,
                            cellPadding: 2,
                            halign: 'center'
                        },
                        headStyles: {
                            fillColor: [
                                128,
                                0,
                                128
                            ],
                            textColor: [
                                255,
                                255,
                                255
                            ],
                            fontStyle: 'bold'
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ANEXO 3: CONTROL DE ENERGÍAS
            if (permit.selectedWorkTypes?.energia && permit.anexoEnergias) {
                doc.addPage();
                addHeader();
                addSectionTitle('ANEXO 3 - CONTROL DE ENERGÍAS', [
                    220,
                    20,
                    60
                ]);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text('TIPOS DE ENERGÍA IDENTIFICADOS:', margin, yPos);
                yPos += 5;
                const energias = Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).filter(([, value])=>value).map(([key])=>`☑ ${key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}`);
                energias.forEach((e, idx)=>{
                    doc.setFont('helvetica', 'normal');
                    doc.text(e, margin + 2, yPos + idx * 5);
                });
                yPos += energias.length * 5 + 3;
            }
            // ANEXO 4: IZAJE DE CARGAS
            if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
                doc.addPage();
                addHeader();
                addSectionTitle('ANEXO 4 - IZAJE DE CARGAS', [
                    0,
                    128,
                    0
                ]);
                if (permit.anexoIzaje.informacionGeneral) {
                    const izajeInfo = [
                        [
                            'Acción a Realizar:',
                            Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([, v])=>v).map(([k])=>k).join(', ') || 'N/A'
                        ],
                        [
                            'Peso de la Carga:',
                            Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k).join(', ') || 'N/A'
                        ],
                        [
                            'Equipo a Utilizar:',
                            Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k).join(', ') || 'N/A'
                        ]
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: izajeInfo,
                        theme: 'grid',
                        styles: {
                            fontSize: 8,
                            cellPadding: 2
                        },
                        columnStyles: {
                            0: {
                                fontStyle: 'bold',
                                cellWidth: 50
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ANEXO 5: EXCAVACIONES
            if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
                doc.addPage();
                addHeader();
                addSectionTitle('ANEXO 5 - EXCAVACIONES', [
                    255,
                    140,
                    0
                ]);
                if (permit.anexoExcavaciones.informacionGeneral) {
                    const excavData = [
                        [
                            'Profundidad:',
                            permit.anexoExcavaciones.informacionGeneral.profundidad || 'N/A'
                        ],
                        [
                            'Ancho:',
                            permit.anexoExcavaciones.informacionGeneral.ancho || 'N/A'
                        ],
                        [
                            'Largo:',
                            permit.anexoExcavaciones.informacionGeneral.largo || 'N/A'
                        ]
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(doc, {
                        startY: yPos,
                        body: excavData,
                        theme: 'grid',
                        styles: {
                            fontSize: 8,
                            cellPadding: 2
                        },
                        columnStyles: {
                            0: {
                                fontStyle: 'bold',
                                cellWidth: 40
                            }
                        }
                    });
                    yPos = doc.lastAutoTable.finalY + 3;
                }
            }
            // ========================================
            // PIE DE PÁGINA FINAL
            // ========================================
            const lastPageNumber = doc.getNumberOfPages();
            doc.setPage(lastPageNumber);
            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            doc.text(`Generado el ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'dd/MM/yyyy HH:mm')}`, pageWidth / 2, pageHeight - 5, {
                align: 'center'
            });
            // ========================================
            // GUARDAR PDF
            // ========================================
            doc.save(`Permiso_Trabajo_${permit.number || permit.id.substring(0, 8)}.pdf`);
            toast({
                title: '✓ PDF Generado',
                description: 'El documento ha sido descargado exitosamente.',
                className: 'bg-green-50 border-green-200'
            });
        } catch (error) {
            console.error('Error generando PDF:', error);
            toast({
                variant: 'destructive',
                title: 'Error al Generar PDF',
                description: error.message || 'Ocurrió un error inesperado.'
            });
        }
    };
    const openSignatureDialog = (role, signatureType)=>{
        setSigningRole({
            role,
            type: signatureType
        });
        if (role === 'coordinador_alturas') {
            // No pre-llenar el nombre para que el coordinador lo ingrese
            setSignerName('');
        } else {
            // Para otros roles, usar el nombre del usuario actual
            setSignerName(currentUser?.displayName || '');
        }
        setIsSignatureDialogOpen(true);
    };
    const handleSaveSignature = async (signatureDataUrl)=>{
        if (!permit || !currentUser || !signingRole) return;
        // Validar nombre si es el coordinador
        if (signingRole.role === 'coordinador_alturas' && !signerName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Nombre Requerido',
                description: 'Por favor, ingrese el nombre del coordinador.'
            });
            return;
        }
        setIsSigning(true);
        try {
            const userToSign = {
                uid: signingRole.role === 'coordinador_alturas' ? 'N/A_COORDINADOR' : currentUser.uid,
                displayName: signingRole.role === 'coordinador_alturas' ? signerName : currentUser.displayName || null
            };
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$e12e60__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permit.id, signingRole.role, signingRole.type, signatureDataUrl, userToSign);
            if (result.success) {
                toast({
                    title: 'Permiso Firmado',
                    description: `${userToSign.displayName} ha firmado como ${signatureRoles[signingRole.role]}`
                });
                setIsSignatureDialogOpen(false);
                setSigningRole(null);
                setSignerName('');
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
        if (!permit) return;
        setIsStatusChanging(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5aa214__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updatePermitStatus"])(permit.id, newStatus, reason, permit.closure);
            if (result.success) {
                toast({
                    title: 'Estado Actualizado',
                    description: `El permiso ahora está ${getStatusInfo(newStatus).text}.`,
                    className: 'bg-green-100 dark:bg-green-900'
                });
                if (isRejectionDialogOpen) setIsRejectionDialogOpen(false);
                if (rejectionReason) setRejectionReason("");
                if (isClosureDialogOpen) setIsClosureDialogOpen(false);
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
    const canSign = (role)=>{
        if (!currentUser || !permit || !permit.approvals) return {
            can: false,
            reason: 'Cargando datos...'
        };
        const { status, approvals, selectedWorkTypes, createdBy } = permit;
        if ([
            'rechazado',
            'cerrado',
            'suspendido'
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
            case 'lider_sst':
                if (!hasCorrectRole('lider_sst')) return {
                    can: false,
                    reason: 'No tienes el rol requerido.'
                };
                if (!hasSigned(solicitante) || !hasSigned(autorizante)) return {
                    can: false,
                    reason: 'Esperando firma del Solicitante y Autorizante.'
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
        if (!currentUser || !permit) return false;
        const { role } = currentUser;
        const { status, approvals } = permit;
        if (!approvals) return false;
        // Verifica que todas las firmas requeridas estén completas
        let allRequiredSignaturesDone = approvals.solicitante?.status === 'aprobado' && approvals.autorizante?.status === 'aprobado';
        // Si es trabajo de energía, también se requiere la firma de mantenimiento
        if (permit.controlEnergia) {
            allRequiredSignaturesDone = allRequiredSignaturesDone && approvals.mantenimiento?.status === 'aprobado';
        }
        switch(targetStatus){
            case 'aprobado':
                return status === 'pendiente_revision' && allRequiredSignaturesDone && (role === 'autorizante' || role === 'admin');
            case 'rechazado':
                return (status === 'pendiente_revision' || status === 'aprobado') && (role === 'autorizante' || role === 'admin' || role === 'lider_sst');
            case 'en_ejecucion':
                return status === 'aprobado' && (role === 'lider_tarea' || role === 'admin');
            case 'suspendido':
                return status === 'en_ejecucion' && (role === 'lider_sst' || role === 'admin');
            case 'cerrado':
                const allWorkersSignedClosure = permit.workers?.every((w)=>w.firmaCierre);
                if (!allWorkersSignedClosure) return false;
                return (status === 'en_ejecucion' || status === 'suspendido') && (role === 'lider_tarea' || role === 'admin');
            default:
                return false;
        }
    };
    const handleClosureFieldChange = (field, value)=>{
        if (!permit) return;
        setPermit((prev)=>{
            if (!prev) return null;
            return {
                ...prev,
                closure: {
                    ...prev.closure,
                    [field]: value
                }
            };
        });
    };
    const openDailyValidationSignatureDialog = (anexo, type, index)=>{
        setDailyValidationTarget({
            anexo,
            type,
            index
        });
        setDailyValidationName('');
        setDailyValidationDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'yyyy-MM-dd'));
        setIsDailyValidationSignatureOpen(true);
    };
    const handleSaveDailyValidationSignature = async (signature)=>{
        if (!permit || !dailyValidationTarget || !dailyValidationName.trim() || !dailyValidationDate) {
            toast({
                variant: 'destructive',
                title: 'Faltan datos',
                description: 'Por favor, complete nombre y fecha.'
            });
            return;
        }
        setIsSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$40bc04__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addDailyValidationSignature"])(permit.id, dailyValidationTarget.anexo, dailyValidationTarget.type, dailyValidationTarget.index, {
                dia: dailyValidationTarget.index + 1,
                nombre: dailyValidationName,
                fecha: dailyValidationDate,
                firma: signature
            });
            if (result.success) {
                toast({
                    title: 'Validación Diaria Guardada'
                });
                setIsDailyValidationSignatureOpen(false);
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
            setIsSigning(false);
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$c2b83a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addWorkerSignature"])(permit.id, workerSignatureTarget.index, workerSignatureTarget.type, signature);
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
                    lineNumber: 1178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-4 text-lg",
                    children: "Cargando detalles del permiso..."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1179,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1177,
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
                    lineNumber: 1187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-2",
                    children: "Error al Cargar el Permiso"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-6",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1189,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>router.back(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1191,
                            columnNumber: 11
                        }, this),
                        "Volver"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1186,
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
    const atsPeligrosAgrupados = atsPeligros.reduce((acc, peligro)=>{
        if (!acc[peligro.seccion]) {
            acc[peligro.seccion] = [];
        }
        acc[peligro.seccion].push(peligro);
        return acc;
    }, {});
    const eppOptions = {
        'Ropa': [
            {
                id: 'overol_trabajo',
                label: 'Overol de trabajo'
            },
            {
                id: 'overol_ignifugo',
                label: 'Overol Ignifugo, Categoria:'
            },
            {
                id: 'peto',
                label: 'Peto'
            },
            {
                id: 'manguillas',
                label: 'Manguillas'
            },
            {
                id: 'polainas',
                label: 'Polainas'
            },
            {
                id: 'otro_ropa',
                label: 'Otro (Cual):'
            }
        ],
        'Protección de pies y piernas': [
            {
                id: 'botas_seguridad',
                label: 'Botas de seguridad con puntera'
            },
            {
                id: 'botas_dielectricas',
                label: 'Botas dieléctricas'
            },
            {
                id: 'otro_pies',
                label: 'Otro (Cual):'
            }
        ],
        'Protección auditiva': [
            {
                id: 'tipo_insercion',
                label: 'Tipo Inserción'
            },
            {
                id: 'tipo_copa',
                label: 'Tipo copa'
            }
        ],
        'Protección respiratoria': [
            {
                id: 'respirador_cartuchos',
                label: 'Respirador con cartuchos para:'
            },
            {
                id: 'mascarilla_desechable',
                label: 'Mascarilla desechable para:'
            },
            {
                id: 'otro_respiratoria',
                label: 'Otro (Cual):'
            }
        ],
        'Protección cabeza': [
            {
                id: 'casco',
                label: 'Casco Tipo_Clase_ SIN_CON_Barbuquejo'
            },
            {
                id: 'chavo',
                label: 'Chavo en tela o carnaza'
            }
        ],
        'Protección facial y ocular': [
            {
                id: 'careta_lente_neutro',
                label: 'Careta lente neutro'
            },
            {
                id: 'monogafas',
                label: 'Monogafas / Gafas'
            },
            {
                id: 'gafas_oxicorte',
                label: 'Gafas de oxicorte'
            },
            {
                id: 'careta_soldador',
                label: 'Careta de soldador'
            },
            {
                id: 'careta_dielectrica',
                label: 'Careta de dieléctrica, clase:'
            },
            {
                id: 'otro_facial',
                label: 'Otro (Cual):'
            }
        ],
        'Barrera/Señales de advertencia': [
            {
                id: 'senalizacion',
                label: 'Señalización'
            },
            {
                id: 'barandas',
                label: 'Barandas'
            },
            {
                id: 'delimitacion',
                label: 'Delimitación Perimetral'
            },
            {
                id: 'control_acceso',
                label: 'Control de acceso'
            }
        ],
        'Guantes': [
            {
                id: 'proteccion_mecanica',
                label: 'Protección mecánica:'
            },
            {
                id: 'proteccion_dielectrica_guantes',
                label: 'Protección dieléctrica:'
            },
            {
                id: 'proteccion_quimica',
                label: 'Protección química'
            },
            {
                id: 'otro_guantes',
                label: 'Otro (Cual):'
            }
        ],
        'Otros': [
            {
                id: 'tapete_dielectrico',
                label: 'Tapete dieléctrico'
            },
            {
                id: 'pertiga_dielectrica',
                label: 'Pértiga dieléctrica'
            },
            {
                id: 'otro_otros',
                label: 'Otro (Cual):'
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
            label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO Y CERTIFICADOS?'
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
            label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR QUE LA PERSONA SE GOLPEE CONTRA EL NIVEL INFERIOR.'
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
                        lineNumber: 1364,
                        columnNumber: 28
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1364,
                        columnNumber: 67
                    }, this),
                    " Firmar Apertura"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1363,
                columnNumber: 11
            }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-sm font-bold uppercase text-gray-500",
                            children: signatureRoles[role]
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1371,
                            columnNumber: 13
                        }, this),
                        role === 'solicitante' && permit.generalInfo?.responsable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-muted-foreground pt-2 border-t",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold",
                                    children: "Responsable del Trabajo:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1374,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: permit.generalInfo.responsable.nombre
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1375,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        permit.generalInfo.responsable.cargo,
                                        " - ",
                                        permit.generalInfo.responsable.compania
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1376,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1373,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1370,
                    columnNumber: 11
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
                                                lineNumber: 1385,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Aprobado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1386,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1384,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        children: [
                                            "Por: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: approval.userName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1388,
                                                columnNumber: 47
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1388,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        children: [
                                            "Fecha: ",
                                            approval.signedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(approval.signedAt), 'dd/MM/yy HH:mm') : 'N/A'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1389,
                                        columnNumber: 19
                                    }, this),
                                    approval.firmaApertura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: approval.firmaApertura,
                                        alt: `Firma ${role}`,
                                        width: 120,
                                        height: 60,
                                        className: "rounded border mt-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1390,
                                        columnNumber: 46
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1383,
                                columnNumber: 17
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
                                                lineNumber: 1395,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Pendiente de Firma"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1396,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1394,
                                        columnNumber: 19
                                    }, this),
                                    consentText && can && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-2 border-l-2 border-primary pl-2",
                                        children: consentText
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1399,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1393,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1381,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                can ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignButton, {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1407,
                                    columnNumber: 22
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
                                                                lineNumber: 1413,
                                                                columnNumber: 27
                                                            }, this),
                                                            " Firmar Apertura"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1412,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1411,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1410,
                                                columnNumber: 21
                                            }, this),
                                            reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: reason
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1417,
                                                    columnNumber: 48
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1417,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1409,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1408,
                                    columnNumber: 17
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
                                            lineNumber: 1423,
                                            columnNumber: 19
                                        }, this),
                                        " Modificar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1422,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1406,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1380,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1369,
            columnNumber: 9
        }, this);
    };
    const DailyValidationTable = ({ anexoName, validationData })=>{
        const renderRows = (type)=>{
            return Array(7).fill(0).map((_, i)=>{
                const v = validationData?.[type]?.[i];
                const canSignValidation = currentUser?.uid === permit.createdBy && !v?.firma;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: i + 1
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1440,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.nombre || 'N/A'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1441,
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
                                lineNumber: 1444,
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
                                                    lineNumber: 1455,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1449,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1448,
                                            columnNumber: 41
                                        }, this),
                                        !canSignValidation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            children: "Solo el creador del permiso puede registrar esta firma."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1458,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1447,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1446,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1442,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.fecha || 'N/A'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1463,
                            columnNumber: 25
                        }, this)
                    ]
                }, `${type}-${i}`, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1439,
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
                                children: "Autoridad del Área"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1473,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1474,
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
                                                    lineNumber: 1476,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1476,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1476,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('autoridad')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1477,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1475,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1472,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border rounded-lg space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold",
                                children: "Responsable del Trabajo"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1481,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1482,
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
                                                    lineNumber: 1484,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1484,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1484,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1484,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1484,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1484,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('responsable')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1485,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1483,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1480,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1471,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1470,
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
                                    lineNumber: 1500,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "Volver a la Lista"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1501,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1499,
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
                                    lineNumber: 1505,
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
                                    lineNumber: 1506,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1504,
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
                                            lineNumber: 1510,
                                            columnNumber: 72
                                        }, this),
                                        "Exportar a PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1510,
                                    columnNumber: 18
                                }, this),
                                canChangeStatus('aprobado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    style: {
                                        backgroundColor: '#28a745'
                                    },
                                    onClick: ()=>handleChangeStatus('aprobado'),
                                    disabled: isStatusChanging,
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1513,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1513,
                                            columnNumber: 84
                                        }, this),
                                        " Aprobar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1512,
                                    columnNumber: 22
                                }, this),
                                canChangeStatus('rechazado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
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
                                                        lineNumber: 1519,
                                                        columnNumber: 59
                                                    }, this),
                                                    "Rechazar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1519,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1518,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                                        children: "Rechazar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1522,
                                                        columnNumber: 48
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1522,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    value: rejectionReason,
                                                    onChange: (e)=>setRejectionReason(e.target.value),
                                                    placeholder: "Escriba el motivo del rechazo..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1523,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                                            children: "Cancelar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1525,
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
                                                                    lineNumber: 1527,
                                                                    columnNumber: 53
                                                                }, this) : null,
                                                                " Rechazar"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1526,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1524,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1521,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1517,
                                    columnNumber: 21
                                }, this),
                                canChangeStatus('en_ejecucion') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    style: {
                                        backgroundColor: '#6f42c1'
                                    },
                                    onClick: ()=>handleChangeStatus('en_ejecucion'),
                                    disabled: isStatusChanging,
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1535,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1535,
                                            columnNumber: 84
                                        }, this),
                                        " Iniciar Ejecución"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1534,
                                    columnNumber: 23
                                }, this),
                                canChangeStatus('suspendido') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    style: {
                                        backgroundColor: '#fd7e14'
                                    },
                                    onClick: ()=>handleChangeStatus('suspendido'),
                                    disabled: isStatusChanging,
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1540,
                                            columnNumber: 46
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1540,
                                            columnNumber: 85
                                        }, this),
                                        " Suspender"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1539,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-block",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: ()=>setIsClosureDialogOpen(true),
                                                        disabled: !canChangeStatus('cerrado'),
                                                        style: canChangeStatus('cerrado') ? {
                                                            backgroundColor: '#007bff'
                                                        } : {},
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                className: "mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1552,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Cerrar Permiso"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1547,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1546,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 21
                                            }, this),
                                            !canChangeStatus('cerrado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Todas las firmas de cierre de los trabajadores son requeridas."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1558,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1557,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1544,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1543,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
                                    open: isClosureDialogOpen,
                                    onOpenChange: setIsClosureDialogOpen,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                                    children: "Cerrar Permiso de Trabajo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1566,
                                                    columnNumber: 44
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1566,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 max-h-[60vh] overflow-y-auto p-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-sm",
                                                        children: "Verificación de Cierre:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1568,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: "Se ha diligenciado el informe de culminación de trabajo?",
                                                        value: permit.closure.informeCulminacion,
                                                        onValueChange: (val)=>handleClosureFieldChange('informeCulminacion', val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1569,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: "Se ha dejado el área en condiciones seguras y ordenadas?",
                                                        value: permit.closure.areaDespejada,
                                                        onValueChange: (val)=>handleClosureFieldChange('areaDespejada', val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1570,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: "Se ha realizado la disposición de residuos?",
                                                        value: permit.closure.evidenciaParticulas,
                                                        onValueChange: (val)=>handleClosureFieldChange('evidenciaParticulas', val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1571,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: "Se retiraron los sistemas de bloqueo y aseguramiento de energías?",
                                                        value: permit.closure.dispositivosRetirados,
                                                        onValueChange: (val)=>handleClosureFieldChange('dispositivosRetirados', val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1572,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: "Continúa la labor?",
                                                        value: permit.closure.continuaLabor,
                                                        onValueChange: (val)=>handleClosureFieldChange('continuaLabor', val)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1567,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1576,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                                        onClick: ()=>handleChangeStatus('cerrado'),
                                                        disabled: isStatusChanging,
                                                        children: [
                                                            isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1578,
                                                                columnNumber: 53
                                                            }, this) : null,
                                                            " Confirmar Cierre"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1577,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1575,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1565,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1564,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1509,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1498,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1497,
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
                                            lineNumber: 1593,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1592,
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
                                                lineNumber: 1596,
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
                                                        lineNumber: 1598,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Versión",
                                                        value: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1599,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Fecha Vigencia",
                                                        value: "23-01-2023"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1600,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1597,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1595,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1591,
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
                                                lineNumber: 1608,
                                                columnNumber: 65
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1608,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Solicitante",
                                            value: permit.user?.displayName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1609,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Fecha Creación",
                                            value: permit.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(permit.createdAt, 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1610,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Área Específica",
                                            value: permit.generalInfo?.areaEspecifica
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1611,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Planta",
                                            value: permit.generalInfo?.planta
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1612,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Proceso",
                                            value: permit.generalInfo?.proceso
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1613,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Empresa",
                                            value: permit.generalInfo?.empresa
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1614,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Contrato",
                                            value: permit.generalInfo?.contrato
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1615,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Desde",
                                            value: permit.generalInfo?.validFrom ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1616,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Hasta",
                                            value: permit.generalInfo?.validUntil ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1617,
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
                                                    lineNumber: 1619,
                                                    columnNumber: 68
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1619,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1618,
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
                                                    lineNumber: 1622,
                                                    columnNumber: 74
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1622,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1621,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1607,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1606,
                                columnNumber: 17
                            }, this),
                            permit.anexoATS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1632,
                                                            columnNumber: 103
                                                        }, this),
                                                        " Análisis de Trabajo Seguro (ATS)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1632,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1633,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1631,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1630,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg",
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
                                                                    lineNumber: 1641,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "pl-4 space-y-1",
                                                                    children: peligros.map((peligro)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                            label: peligro.label,
                                                                            value: permit.anexoATS?.peligros?.[peligro.id],
                                                                            readOnly: true
                                                                        }, peligro.id, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1644,
                                                                            columnNumber: 49
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1642,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, seccion, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1640,
                                                            columnNumber: 37
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1638,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1637,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "2. EPP Requeridos",
                                                className: "mt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2",
                                                    children: Object.entries(eppOptions).flatMap(([category, items])=>items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-xs",
                                                                children: [
                                                                    permit.anexoATS?.epp?.[item.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                        className: "h-4 w-4 text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1662,
                                                                        columnNumber: 49
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        className: "h-4 w-4 text-red-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1663,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            item.label,
                                                                            " ",
                                                                            permit.anexoATS?.epp?.[`${item.id}_spec`]
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1665,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1660,
                                                                columnNumber: 41
                                                            }, this)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1657,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1656,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "3. Justificación de Uso",
                                                className: "mt-6",
                                                children: justificacionOptions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs",
                                                        children: [
                                                            permit.anexoATS?.justificacion?.[item.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                className: "h-4 w-4 text-green-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1675,
                                                                columnNumber: 45
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                className: "h-4 w-4 text-red-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1676,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1678,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1673,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1671,
                                                columnNumber: 30
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1636,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1629,
                                columnNumber: 21
                            }, this),
                            permit.selectedWorkTypes?.alturas && permit.anexoAltura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-blue-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1692,
                                                            columnNumber: 103
                                                        }, this),
                                                        " Anexo de Trabajo en Alturas"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1692,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1691,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1690,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-blue-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Estructura y Aspectos de Seguridad",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6",
                                                        children: anexoAlturaEstructuras.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-xs",
                                                                children: [
                                                                    permit.anexoAltura?.tipoEstructura?.[e.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                        className: "h-4 w-4 text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1702,
                                                                        columnNumber: 43
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        className: "h-4 w-4 text-red-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1703,
                                                                        columnNumber: 43
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            e.label,
                                                                            " ",
                                                                            e.id === 'otros' && permit.anexoAltura.tipoEstructura.otrosCual ? `: ${permit.anexoAltura.tipoEstructura.otrosCual}` : ''
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1704,
                                                                        columnNumber: 42
                                                                    }, this)
                                                                ]
                                                            }, e.id, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1700,
                                                                columnNumber: 38
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1698,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                        children: anexoAlturaAspectos.map((aspect)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: aspect.label,
                                                                value: permit.anexoAltura?.aspectosSeguridad?.[aspect.id],
                                                                readOnly: true
                                                            }, aspect.id, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1710,
                                                                columnNumber: 34
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1708,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1697,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoAltura",
                                                validationData: permit.anexoAltura.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1714,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1696,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1689,
                                columnNumber: 21
                            }, this),
                            permit.selectedWorkTypes?.confinado && permit.anexoConfinado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-purple-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1724,
                                                            columnNumber: 105
                                                        }, this),
                                                        " Anexo de Espacios Confinados"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1724,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1725,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1723,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1722,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-purple-100",
                                        children: [
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
                                                            lineNumber: 1731,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "O2 (19.5-22%)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.o2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1732,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "H2S (0-10 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.h2s
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1733,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "CO (0-25 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.co
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1734,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1730,
                                                    columnNumber: 32
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1729,
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
                                                                        lineNumber: 1739,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "LEL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1739,
                                                                        columnNumber: 83
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "O2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1739,
                                                                        columnNumber: 109
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "H2S"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1739,
                                                                        columnNumber: 134
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "CO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1739,
                                                                        columnNumber: 160
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Firma"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1739,
                                                                        columnNumber: 185
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1739,
                                                                columnNumber: 46
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1739,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                            children: permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.hora
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1743,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.lel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1744,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.o2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1745,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.h2s
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1746,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.co
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1747,
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
                                                                                lineNumber: 1748,
                                                                                columnNumber: 68
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1748,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, p.id, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1742,
                                                                    columnNumber: 41
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1740,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1738,
                                                    columnNumber: 31
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1737,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoConfinado",
                                                validationData: permit.anexoConfinado.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1754,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1728,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1721,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.energia && permit.anexoEnergias && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-yellow-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1763,
                                                            columnNumber: 105
                                                        }, this),
                                                        " Anexo de Control de Energías"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1763,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1764,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1762,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1761,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-yellow-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                            title: "Tipos de Energía",
                                            children: Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).map(([key, value])=>value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "capitalize",
                                                    children: key.replace(/([A-Z])/g, ' $1')
                                                }, key, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1769,
                                                    columnNumber: 127
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1768,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1767,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1760,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.izaje && permit.anexoIzaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-green-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1779,
                                                            columnNumber: 104
                                                        }, this),
                                                        " Anexo de Izaje de Cargas"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1779,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1780,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1778,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1777,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-green-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Información de la Carga",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Acción a realizar",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1785,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Peso de la Carga",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1786,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Equipo a Utilizar",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1787,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1784,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoIzaje",
                                                validationData: permit.anexoIzaje.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1789,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1783,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1776,
                                columnNumber: 20
                            }, this),
                            permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-orange-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1798,
                                                            columnNumber: 105
                                                        }, this),
                                                        " Anexo de Excavaciones"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1798,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1799,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1797,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1796,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg border-orange-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                                title: "Dimensiones",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Dimensiones",
                                                        value: permit.anexoExcavaciones.informacionGeneral.dimensiones
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1804,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Profundidad",
                                                        value: permit.anexoExcavaciones.informacionGeneral.profundidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1805,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Ancho",
                                                        value: permit.anexoExcavaciones.informacionGeneral.ancho
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1806,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Largo",
                                                        value: permit.anexoExcavaciones.informacionGeneral.largo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1807,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1803,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoExcavaciones",
                                                validationData: permit.anexoExcavaciones.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1809,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1802,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1795,
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
                                                        lineNumber: 1820,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Rol"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1821,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Aptitud"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1822,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Entrenamiento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1823,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Seg. Social"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1824,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Apertura"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1825,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Cierre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1826,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1819,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1818,
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
                                                                    lineNumber: 1833,
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
                                                                    lineNumber: 1834,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1832,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                children: worker.rol === 'Otro' ? worker.otroRol : worker.rol
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1837,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1836,
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
                                                                        lineNumber: 1841,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    worker.tsaTec?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "uppercase",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1842,
                                                                        columnNumber: 56
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1840,
                                                                columnNumber: 32
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1839,
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
                                                                        lineNumber: 1847,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1848,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.otro && worker.entrenamiento?.otroCual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: worker.entrenamiento.otroCual
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1849,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1846,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1845,
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
                                                                        lineNumber: 1854,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.arl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "ARL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1855,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.pensiones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "P"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1856,
                                                                        columnNumber: 54
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1853,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1852,
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
                                                                lineNumber: 1860,
                                                                columnNumber: 55
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs italic text-muted-foreground",
                                                                children: "Pendiente"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1860,
                                                                columnNumber: 165
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1859,
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
                                                                lineNumber: 1864,
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
                                                                        lineNumber: 1868,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    " Firmar Cierre"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1867,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1862,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1831,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1829,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1817,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1816,
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
                                            lineNumber: 1882,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "solicitante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1883,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "autorizante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1884,
                                            columnNumber: 25
                                        }, this),
                                        permit.controlEnergia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "mantenimiento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1885,
                                            columnNumber: 51
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "lider_sst"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1886,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1881,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1880,
                                columnNumber: 17
                            }, this),
                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer mt-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-gray-700 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1895,
                                                            columnNumber: 103
                                                        }, this),
                                                        " Cancelación y Cierre"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1895,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1896,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1894,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1893,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4 p-4 border rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-md",
                                                            children: "Cancelación del Trabajo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1903,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center p-3 border rounded-md bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-sm font-medium",
                                                                    children: "¿Se canceló el trabajo?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1905,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                                    className: "flex gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "si"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1907,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "SI"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1907,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1907,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "no"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1908,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "NO"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1908,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1908,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "na"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1909,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "N/A"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1909,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1909,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1906,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1904,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                            placeholder: "Razón de la cancelación"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1912,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Nombre de quien cancela"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1913,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1914,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            className: "w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                    className: "mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1915,
                                                                    columnNumber: 82
                                                                }, this),
                                                                "Firmar Cancelación"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1915,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1902,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4 p-4 border rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-md",
                                                            children: "Cierre del Permiso"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1920,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center p-3 border rounded-md bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-sm font-medium",
                                                                    children: "¿Se terminó el trabajo?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1922,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                                    className: "flex gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "si"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1924,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "SI"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1924,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1924,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "no"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1925,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "NO"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1925,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1925,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: "na"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1926,
                                                                                    columnNumber: 90
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    children: "N/A"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1926,
                                                                                    columnNumber: 119
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1926,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1923,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1921,
                                                            columnNumber: 38
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                            placeholder: "Observaciones de cierre"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1929,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3 border rounded-md space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                    className: "text-sm font-semibold",
                                                                    children: "Autoridad del Área"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1932,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    placeholder: "Nombre"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1933,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1934,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    className: "w-full",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                            className: "mr-2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1935,
                                                                            columnNumber: 96
                                                                        }, this),
                                                                        "Firmar Cierre"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1935,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1931,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3 border rounded-md space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                    className: "text-sm font-semibold",
                                                                    children: "Responsable del Trabajo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1939,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    placeholder: "Nombre"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1940,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1941,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "outline",
                                                                    size: "sm",
                                                                    className: "w-full",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                            className: "mr-2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1942,
                                                                            columnNumber: 96
                                                                        }, this),
                                                                        "Firmar Cierre"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1942,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1938,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1919,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1900,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1899,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1892,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1588,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "text-center text-xs text-gray-400 py-4 mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Código: DN-FR-SST-016"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1952,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Versión: 04"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1953,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1951,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1587,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isSignatureDialogOpen,
                onOpenChange: setIsSignatureDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: [
                                    "Registrar Firma para ",
                                    signingRole ? signatureRoles[signingRole.role] : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1960,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1959,
                            columnNumber: 17
                        }, this),
                        signingRole?.role === 'coordinador_alturas' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: signatureConsents.coordinador_alturas
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1964,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "signerName",
                                            children: "Nombre del Coordinador"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1966,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "signerName",
                                            value: signerName,
                                            onChange: (e)=>setSignerName(e.target.value),
                                            placeholder: "Ingrese el nombre completo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1967,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1965,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1963,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1976,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1958,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1957,
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
                                lineNumber: 1986,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1985,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveWorkerSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1988,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1984,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1983,
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
                                    lineNumber: 1995,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: [
                                        signatureConsents.solicitante,
                                        " ¿Desea continuar?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1996,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1994,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2001,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: ()=>openSignatureDialog('solicitante', 'firmaApertura'),
                                    children: "Confirmar y Firmar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2002,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2000,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1993,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1992,
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
                                lineNumber: 2012,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2011,
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
                                    lineNumber: 2015,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-name",
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2017,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-name",
                                            value: dailyValidationName,
                                            onChange: (e)=>setDailyValidationName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2018,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2016,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-date",
                                            children: "Fecha"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2021,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-date",
                                            type: "date",
                                            value: dailyValidationDate,
                                            onChange: (e)=>setDailyValidationDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2022,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2020,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2014,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveDailyValidationSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2025,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2010,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2009,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 1494,
        columnNumber: 7
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__cf03beb7._.js.map