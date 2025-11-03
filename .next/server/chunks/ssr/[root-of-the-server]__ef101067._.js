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
                className: "flex items-start space-x-3 my-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                        id: "terms",
                        checked: hasConsented,
                        onCheckedChange: (checked)=>setHasConsented(checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "terms",
                        className: "text-xs text-muted-foreground font-normal",
                        children: "Autorizo el tratamiento de mis datos personales y el uso de mi firma digital, de conformidad con la Ley 1581 de 2012 de Colombia, para la validación y gestión de documentos dentro del sistema SGPT Móvil."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/signature-pad.tsx",
                lineNumber: 136,
                columnNumber: 7
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
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            "Limpiar"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 147,
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
                                lineNumber: 152,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/signature-pad.tsx",
                                lineNumber: 152,
                                columnNumber: 75
                            }, this),
                            isSaving ? 'Guardando...' : 'Guardar Firma'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/signature-pad.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/signature-pad.tsx",
                lineNumber: 146,
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
"[project]/src/app/(app)/permits/data:932d64 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7873b9c7850e737568a6f6f7a4e17cda15a8f18e15":"updatePermitStatus"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updatePermitStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7873b9c7850e737568a6f6f7a4e17cda15a8f18e15", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updatePermitStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdjYWxpZW50ZSc6ICdUcmFiYWpvIGVuIENhbGllbnRlJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHR5cGVzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh0eXBlcykgfHwgdHlwZXMubGVuZ3RoID09PSAwKSByZXR1cm4gd29ya1R5cGVzTWFwWydnZW5lcmFsJ107XG4gIHJldHVybiB0eXBlcy5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiBVc2VyUm9sZSB8ICdzc3QnIHwgJ21hbnRlbmltaWVudG8nXTogc3RyaW5nIH0gPSB7XG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIHNzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbiAgbGlkZXJfdGFyZWE6ICdMw61kZXIgZGUgbGEgVGFyZWEnLFxuICBlamVjdXRhbnRlOiAnRWplY3V0YW50ZSBkZWwgVHJhYmFqbycsXG4gIGxpZGVyX3NzdDogJ0zDrWRlciBTU1QnLFxuICBhZG1pbjogJ0FkbWluaXN0cmFkb3InXG59O1xuXG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcic+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBzc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9XG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgd29ya1R5cGU6IHBlcm1pdERhdGEud29ya1R5cGUgJiYgcGVybWl0RGF0YS53b3JrVHlwZS5sZW5ndGggPiAwID8gcGVybWl0RGF0YS53b3JrVHlwZSA6IFsnZ2VuZXJhbCddLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIGlmIChwZXJtaXREYXRhLmFuZXhvQVRTKSBwZXJtaXRQYXlsb2FkLmFuZXhvQVRTID0gcGVybWl0RGF0YS5hbmV4b0FUUztcbiAgaWYgKHBlcm1pdERhdGEuYW5leG9BbHR1cmEpIHBlcm1pdFBheWxvYWQuYW5leG9BbHR1cmEgPSBwZXJtaXREYXRhLmFuZXhvQWx0dXJhO1xuICBpZiAocGVybWl0RGF0YS5hbmV4b0NvbmZpbmFkbykgcGVybWl0UGF5bG9hZC5hbmV4b0NvbmZpbmFkbyA9IHBlcm1pdERhdGEuYW5leG9Db25maW5hZG87XG4gIGlmIChwZXJtaXREYXRhLmFuZXhvSXphamUpIHBlcm1pdFBheWxvYWQuYW5leG9JemFqZSA9IHBlcm1pdERhdGEuYW5leG9JemFqZTtcbiAgaWYgKHBlcm1pdERhdGEuYW5leG9FbmVyZ2lhcykgcGVybWl0UGF5bG9hZC5hbmV4b0VuZXJnaWFzID0gcGVybWl0RGF0YS5hbmV4b0VuZXJnaWFzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQud29ya1R5cGUgfHwgWydnZW5lcmFsJ10pO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2lnbmF0dXJlQW5kTm90aWZ5KFxuICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgcm9sZTogJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnc3N0JywgXG4gIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsXG4gIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZyxcbiAgdXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhcm9sZSB8fCAhc2lnbmF0dXJlRGF0YVVybCB8fCAhdXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS4ke3NpZ25hdHVyZVR5cGV9YDtcbiAgICAgICAgY29uc3Qgc3RhdHVzUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS5zdGF0dXNgO1xuICAgICAgICBjb25zdCB1c2VySWRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJJZGA7XG4gICAgICAgIGNvbnN0IHVzZXJOYW1lUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS51c2VyTmFtZWA7XG4gICAgICAgIGNvbnN0IHNpZ25lZEF0UGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS5zaWduZWRBdGA7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIFtzaWduYXR1cmVQYXRoXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtgJHt1c2VyTmFtZVBhdGh9YF06IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICBbYCR7dXNlcklkUGF0aH1gXTogdXNlci51aWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVtzdGF0dXNQYXRoXSA9ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3NpZ25lZEF0UGF0aF0gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIHBlcm1pdCBmb3Igbm90aWZpY2F0aW9uXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdERvYy5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqTm90aWZpY2FjacOzbiBkZSBGaXJtYSAtIFNHUFQqIPCflovvuI9cbkVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBzaWRvIGZpcm1hZG8uXG5cbvCfkaQgKlF1acOpbiBmaXJtw7M6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inKggKlJvbDoqICR7c2lnbmF0dXJlUm9sZU5hbWV9XG7inI3vuI8gKlRpcG8gZGUgZmlybWE6KiAke3NpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyA/ICdBcGVydHVyYScgOiAnQ2llcnJlJ31cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhwZXJtaXRJZDogc3RyaW5nLCBzdGF0dXM6IFBlcm1pdFN0YXR1cywgcmVhc29uPzogc3RyaW5nLCBjbG9zdXJlRGF0YT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4pIHtcbiAgICBpZiAoIXBlcm1pdElkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1Blcm1pdCBJRCBpcyByZXF1aXJlZC4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YTogeyBzdGF0dXM6IFBlcm1pdFN0YXR1czsgcmVqZWN0aW9uUmVhc29uPzogc3RyaW5nOyBjbG9zdXJlPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPiB8IEZpZWxkVmFsdWUgfSA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5jbG9zdXJlID0ge1xuICAgICAgICAgICAgICAgIC4uLihjbG9zdXJlRGF0YSB8fCB7fSksXG4gICAgICAgICAgICAgICAgZmVjaGFDaWVycmU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCAvLyBZWVlZLU1NLUREXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcblxuICAgICAgICAvLyBGZXRjaCBwZXJtaXQgZm9yIG5vdGlmaWNhdGlvblxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gZ2V0U3RhdHVzVGV4dChzdGF0dXMpO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1BUKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7c3RhdHVzVGV4dH1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQW1Nc0IifQ==
}}),
"[project]/src/app/(app)/permits/data:5ff772 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7c15bdb6ac388e78a59299d5091891127d63de7bc6":"addSignatureAndNotify"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addSignatureAndNotify": (()=>addSignatureAndNotify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addSignatureAndNotify = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7c15bdb6ac388e78a59299d5091891127d63de7bc6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addSignatureAndNotify"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5pbXBvcnQgdHlwZSB7IFBlcm1pdCwgRXh0ZXJuYWxXb3JrZXIsIFBlcm1pdFN0YXR1cywgUGVybWl0Q2xvc3VyZSwgQXBwcm92YWwsIFVzZXJSb2xlIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG5jb25zdCB3b3JrVHlwZXNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnYWx0dXJhJzogJ1RyYWJham8gZW4gQWx0dXJhcycsXG4gICdjb25maW5hZG8nOiAnRXNwYWNpb3MgQ29uZmluYWRvcycsXG4gICdlbmVyZ2lhJzogJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyxcbiAgJ2l6YWplJzogJ0l6YWplIGRlIENhcmdhcycsXG4gICdjYWxpZW50ZSc6ICdUcmFiYWpvIGVuIENhbGllbnRlJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHR5cGVzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh0eXBlcykgfHwgdHlwZXMubGVuZ3RoID09PSAwKSByZXR1cm4gd29ya1R5cGVzTWFwWydnZW5lcmFsJ107XG4gIHJldHVybiB0eXBlcy5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbn07XG5cbmNvbnN0IGdldFN0YXR1c1RleHQgPSAoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0dXNUZXh0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICdib3JyYWRvcic6ICdCb3JyYWRvcicsXG4gICAgICAncGVuZGllbnRlX3JldmlzaW9uJzogJ1BlbmRpZW50ZSBkZSBSZXZpc2nDs24nLFxuICAgICAgJ2Fwcm9iYWRvJzogJ0Fwcm9iYWRvJyxcbiAgICAgICdlbl9lamVjdWNpb24nOiAnRW4gRWplY3VjacOzbicsXG4gICAgICAnc3VzcGVuZGlkbyc6ICdTdXNwZW5kaWRvJyxcbiAgICAgICdjZXJyYWRvJzogJ0NlcnJhZG8nLFxuICAgICAgJ3JlY2hhemFkbyc6ICdSZWNoYXphZG8nXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHN0YXR1cztcbiAgfTtcblxuY29uc3Qgc2lnbmF0dXJlUm9sZXM6IHsgW2tleSBpbiBVc2VyUm9sZSB8ICdzc3QnIHwgJ21hbnRlbmltaWVudG8nXTogc3RyaW5nIH0gPSB7XG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEpFRkVTIFkgRFVFw5FPUyBERSBBUkVBKScsXG4gIGF1dG9yaXphbnRlOiAnUVVJRU4gQVVUT1JJWkEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIHNzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbiAgbGlkZXJfdGFyZWE6ICdMw61kZXIgZGUgbGEgVGFyZWEnLFxuICBlamVjdXRhbnRlOiAnRWplY3V0YW50ZSBkZWwgVHJhYmFqbycsXG4gIGxpZGVyX3NzdDogJ0zDrWRlciBTU1QnLFxuICBhZG1pbjogJ0FkbWluaXN0cmFkb3InXG59O1xuXG5cbnR5cGUgUGVybWl0Q3JlYXRlRGF0YSA9IE9taXQ8UGVybWl0LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc3RhdHVzJyB8ICdjcmVhdGVkQnknIHwgJ251bWJlcicgfCAndXNlcic+ICYge1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlckRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyRW1haWw6IHN0cmluZyB8IG51bGw7XG4gIHVzZXJQaG90b1VSTDogc3RyaW5nIHwgbnVsbDtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVQZXJtaXQoZGF0YTogUGVybWl0Q3JlYXRlRGF0YSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBzc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9XG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgd29ya1R5cGU6IHBlcm1pdERhdGEud29ya1R5cGUgJiYgcGVybWl0RGF0YS53b3JrVHlwZS5sZW5ndGggPiAwID8gcGVybWl0RGF0YS53b3JrVHlwZSA6IFsnZ2VuZXJhbCddLFxuICAgIHN0YXR1czogJ3BlbmRpZW50ZV9yZXZpc2lvbicgYXMgY29uc3QsXG4gICAgY3JlYXRlZEJ5OiB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHVzZXI6IHtcbiAgICAgIGRpc3BsYXlOYW1lOiB1c2VyRGlzcGxheU5hbWUsXG4gICAgICBlbWFpbDogdXNlckVtYWlsLFxuICAgICAgcGhvdG9VUkw6IHVzZXJQaG90b1VSTCxcbiAgICB9LFxuICAgIGFwcHJvdmFsczogaW5pdGlhbEFwcHJvdmFscyxcbiAgICBjbG9zdXJlOiB7fSxcbiAgfTtcbiAgXG4gIGlmIChwZXJtaXREYXRhLmFuZXhvQVRTKSBwZXJtaXRQYXlsb2FkLmFuZXhvQVRTID0gcGVybWl0RGF0YS5hbmV4b0FUUztcbiAgaWYgKHBlcm1pdERhdGEuYW5leG9BbHR1cmEpIHBlcm1pdFBheWxvYWQuYW5leG9BbHR1cmEgPSBwZXJtaXREYXRhLmFuZXhvQWx0dXJhO1xuICBpZiAocGVybWl0RGF0YS5hbmV4b0NvbmZpbmFkbykgcGVybWl0UGF5bG9hZC5hbmV4b0NvbmZpbmFkbyA9IHBlcm1pdERhdGEuYW5leG9Db25maW5hZG87XG4gIGlmIChwZXJtaXREYXRhLmFuZXhvSXphamUpIHBlcm1pdFBheWxvYWQuYW5leG9JemFqZSA9IHBlcm1pdERhdGEuYW5leG9JemFqZTtcbiAgaWYgKHBlcm1pdERhdGEuYW5leG9FbmVyZ2lhcykgcGVybWl0UGF5bG9hZC5hbmV4b0VuZXJnaWFzID0gcGVybWl0RGF0YS5hbmV4b0VuZXJnaWFzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jUmVmID0gYXdhaXQgYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuYWRkKHBlcm1pdFBheWxvYWQgYXMgYW55KTtcbiAgICBjb25zdCBwZXJtaXROdW1iZXIgPSBgUFQtJHtEYXRlLm5vdygpfS0ke2RvY1JlZi5pZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyBudW1iZXI6IHBlcm1pdE51bWJlciB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygn4pyFIFtBY3Rpb25dIFBlcm1pc28gY3JlYWRvIGNvbiDDqXhpdG8gZW4gRmlyZXN0b3JlOicsIGRvY1JlZi5pZCk7XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQud29ya1R5cGUgfHwgWydnZW5lcmFsJ10pO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2lnbmF0dXJlQW5kTm90aWZ5KFxuICBwZXJtaXRJZDogc3RyaW5nLCBcbiAgcm9sZTogJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnc3N0JywgXG4gIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsXG4gIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZyxcbiAgdXNlcjogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCB8fCAhcm9sZSB8fCAhc2lnbmF0dXJlRGF0YVVybCB8fCAhdXNlcikge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWx0YW4gcGFyw6FtZXRyb3MgcGFyYSBndWFyZGFyIGxhIGZpcm1hLicgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2NSZWYgPSBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5kb2MocGVybWl0SWQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS4ke3NpZ25hdHVyZVR5cGV9YDtcbiAgICAgICAgY29uc3Qgc3RhdHVzUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS5zdGF0dXNgO1xuICAgICAgICBjb25zdCB1c2VySWRQYXRoID0gYGFwcHJvdmFscy4ke3JvbGV9LnVzZXJJZGA7XG4gICAgICAgIGNvbnN0IHVzZXJOYW1lUGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS51c2VyTmFtZWA7XG4gICAgICAgIGNvbnN0IHNpZ25lZEF0UGF0aCA9IGBhcHByb3ZhbHMuJHtyb2xlfS5zaWduZWRBdGA7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICAgICAgICAgIFtzaWduYXR1cmVQYXRoXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtgJHt1c2VyTmFtZVBhdGh9YF06IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICBbYCR7dXNlcklkUGF0aH1gXTogdXNlci51aWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YVtzdGF0dXNQYXRoXSA9ICdhcHJvYmFkbyc7XG4gICAgICAgICAgICB1cGRhdGVEYXRhW3NpZ25lZEF0UGF0aF0gPSBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIHBlcm1pdCBmb3Igbm90aWZpY2F0aW9uXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdERvYy5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUm9sZU5hbWUgPSAoc2lnbmF0dXJlUm9sZXMgYXMgYW55KVtyb2xlXSB8fCByb2xlO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqTm90aWZpY2FjacOzbiBkZSBGaXJtYSAtIFNHUFQqIPCflovvuI9cbkVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBzaWRvIGZpcm1hZG8uXG5cbvCfkaQgKlF1acOpbiBmaXJtw7M6KiAke3VzZXIuZGlzcGxheU5hbWUgfHwgJ04vQSd9XG7inKggKlJvbDoqICR7c2lnbmF0dXJlUm9sZU5hbWV9XG7inI3vuI8gKlRpcG8gZGUgZmlybWE6KiAke3NpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJyA/ICdBcGVydHVyYScgOiAnQ2llcnJlJ31cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhwZXJtaXRJZDogc3RyaW5nLCBzdGF0dXM6IFBlcm1pdFN0YXR1cywgcmVhc29uPzogc3RyaW5nLCBjbG9zdXJlRGF0YT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4pIHtcbiAgICBpZiAoIXBlcm1pdElkKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1Blcm1pdCBJRCBpcyByZXF1aXJlZC4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgY29uc3QgdXBkYXRlRGF0YTogeyBzdGF0dXM6IFBlcm1pdFN0YXR1czsgcmVqZWN0aW9uUmVhc29uPzogc3RyaW5nOyBjbG9zdXJlPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPiB8IEZpZWxkVmFsdWUgfSA9IHsgc3RhdHVzIH07XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgICB1cGRhdGVEYXRhLnJlamVjdGlvblJlYXNvbiA9IHJlYXNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdjZXJyYWRvJykge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5jbG9zdXJlID0ge1xuICAgICAgICAgICAgICAgIC4uLihjbG9zdXJlRGF0YSB8fCB7fSksXG4gICAgICAgICAgICAgICAgZmVjaGFDaWVycmU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCAvLyBZWVlZLU1NLUREXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcblxuICAgICAgICAvLyBGZXRjaCBwZXJtaXQgZm9yIG5vdGlmaWNhdGlvblxuICAgICAgICBjb25zdCBwZXJtaXREb2MgPSBhd2FpdCBkb2NSZWYuZ2V0KCk7XG4gICAgICAgIGNvbnN0IHBlcm1pdERhdGEgPSBwZXJtaXREb2MuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gZ2V0U3RhdHVzVGV4dChzdGF0dXMpO1xuICAgICAgICBjb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vc2dwdC1tb3ZpbC53ZWIuYXBwJztcbiAgICAgICAgY29uc3QgcGVybWl0VXJsID0gYCR7YmFzZVVybH0vcGVybWl0cy8ke3Blcm1pdElkfWA7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2VCb2R5ID0gYCpBY3R1YWxpemFjacOzbiBkZSBFc3RhZG8gLSBTR1BUKiDwn5SEXG5FbCBlc3RhZG8gZGVsIHBlcm1pc28gKiR7cGVybWl0RGF0YS5udW1iZXIgfHwgcGVybWl0SWR9KiBoYSBjYW1iaWFkby5cblxuKk51ZXZvIEVzdGFkbzoqICR7c3RhdHVzVGV4dH1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitTQWlJc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signature.js [app-ssr] (ecmascript) <export default as Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-down.js [app-ssr] (ecmascript) <export default as FileDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-ssr] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-ssr] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-user.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/signature-pad.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$932d64__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:932d64 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5ff772__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:5ff772 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)");
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
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 113,
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
                lineNumber: 123,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-gray-800 break-words",
                children: value || 'No especificado'
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 122,
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
                lineNumber: 151,
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
                        lineNumber: 153,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: getOptionClasses('no'),
                        children: "NO"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 154,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: getOptionClasses('na'),
                        children: "NA"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 155,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 152,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 150,
        columnNumber: 9
    }, this);
};
const signatureRoles = {
    solicitante: 'QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)',
    autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
    mantenimiento: 'PERSONAL DE MANTENIMIENTO',
    sst: 'AREA SST (si aplica)'
};
function PermitDetailPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user: currentUser, loading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
    const headerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const footerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [permit, setPermit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signingRole, setSigningRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSigning, setIsSigning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStatusChanging, setIsStatusChanging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectionReason, setRejectionReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRejectionDialogOpen, setIsRejectionDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClosureDialogOpen, setIsClosureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
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
    const handleExportToPDF = async ()=>{
        const header = headerRef.current;
        const content = contentRef.current;
        const footer = footerRef.current;
        if (!header || !content || !footer) return;
        toast({
            title: 'Generando PDF...',
            description: 'Este proceso puede tardar un momento.'
        });
        try {
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 10; // 10mm margin
            // 1. Render Header
            const headerCanvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(header, {
                scale: 2,
                useCORS: true
            });
            const headerImgData = headerCanvas.toDataURL('image/png');
            const headerHeight = headerCanvas.height * (pdfWidth - 2 * margin) / headerCanvas.width;
            // 2. Render Footer
            const footerCanvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(footer, {
                scale: 2,
                useCORS: true
            });
            const footerImgData = footerCanvas.toDataURL('image/png');
            const footerHeight = footerCanvas.height * (pdfWidth - 2 * margin) / footerCanvas.width;
            // 3. Render Content
            const contentCanvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(content, {
                scale: 2,
                useCORS: true,
                windowWidth: content.scrollWidth,
                windowHeight: content.scrollHeight
            });
            const contentImgData = contentCanvas.toDataURL('image/png');
            const contentImgHeight = contentCanvas.height * (pdfWidth - 2 * margin) / contentCanvas.width;
            const contentPrintableHeight = pdfHeight - headerHeight - footerHeight - 2 * margin;
            let contentPosition = 0;
            let pageCount = 0;
            while(contentPosition < contentImgHeight){
                if (pageCount > 0) {
                    pdf.addPage();
                }
                // Add header to each page
                pdf.addImage(headerImgData, 'PNG', margin, margin, pdfWidth - 2 * margin, headerHeight);
                // Add content slice for the current page
                const pageContentHeight = Math.min(contentPrintableHeight, contentImgHeight - contentPosition);
                pdf.addImage(contentImgData, 'PNG', margin, margin + headerHeight, pdfWidth - 2 * margin, contentImgHeight, undefined, 'FAST', 0, 0, contentPosition * (contentCanvas.width / (pdfWidth - 2 * margin)), contentCanvas.width, pageContentHeight * (contentCanvas.width / (pdfWidth - 2 * margin)) // height on canvas
                );
                contentPosition += pageContentHeight;
                // Add footer to each page
                pdf.addImage(footerImgData, 'PNG', margin, pdfHeight - footerHeight - margin, pdfWidth - 2 * margin, footerHeight);
                pageCount++;
            }
            pdf.save(`permiso_${permit?.number || permitId.substring(0, 8)}.pdf`);
            toast({
                title: 'PDF Generado Exitosamente',
                description: 'El documento se ha descargado.'
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al Generar PDF',
                description: error.message || 'No se pudo generar el documento.'
            });
        }
    };
    const openSignatureDialog = (role, signatureType)=>{
        setSigningRole({
            role,
            type: signatureType
        });
        setIsSignatureDialogOpen(true);
    };
    const handleSaveSignature = async (signatureDataUrl)=>{
        if (!permit || !currentUser || !signingRole) return;
        setIsSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5ff772__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permit.id, signingRole.role, signingRole.type, signatureDataUrl, {
                uid: currentUser.uid,
                displayName: currentUser.displayName || null
            });
            if (result.success) {
                toast({
                    title: 'Permiso Firmado',
                    description: `Has firmado como ${signatureRoles[signingRole.role]}`
                });
                setIsSignatureDialogOpen(false);
                setSigningRole(null);
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$932d64__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updatePermitStatus"])(permit.id, newStatus, reason, permit.closure);
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
    const canSign = (role, type)=>{
        if (!currentUser || !permit || !permit.approvals) return false;
        const approval = permit.approvals[role];
        const isCorrectRole = currentUser.role === role || currentUser.role === 'admin';
        if (type === 'firmaApertura') {
            return isCorrectRole && approval?.status === 'pendiente' && !approval?.firmaApertura && permit.status === 'pendiente_revision';
        }
        if (type === 'firmaCierre') {
            const allOpeningSignaturesDone = Object.values(permit.approvals).every((a)=>a.status === 'aprobado');
            return isCorrectRole && allOpeningSignaturesDone && !approval?.firmaCierre && (permit.status === 'en_ejecucion' || permit.status === 'suspendido');
        }
        return false;
    };
    const canChangeStatus = (targetStatus)=>{
        if (!currentUser || !permit) return false;
        const { role } = currentUser;
        const { status, approvals } = permit;
        if (!approvals) return false;
        const allRequiredSignaturesDone = approvals.solicitante?.status === 'aprobado' && approvals.autorizante?.status === 'aprobado';
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
    if (loading || userLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 animate-spin text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 454,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-4 text-lg",
                    children: "Cargando detalles del permiso..."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 455,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 453,
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
                    lineNumber: 463,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-2",
                    children: "Error al Cargar el Permiso"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 464,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-6",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 465,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>router.back(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 467,
                            columnNumber: 11
                        }, this),
                        "Volver"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 466,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 462,
            columnNumber: 7
        }, this);
    }
    if (!permit) {
        return null;
    }
    const statusInfo = getStatusInfo(permit.status);
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
            label: 'Manejo de herramienta o equipos eléctricos'
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
    const hazards = [
        {
            id: 'ruido',
            label: 'Ruido'
        },
        {
            id: 'vibracion',
            label: 'Vibración'
        },
        {
            id: 'temperatura',
            label: 'Temperatura'
        },
        {
            id: 'radiacion',
            label: 'Radiación'
        },
        {
            id: 'iluminacion',
            label: 'Deficiencia / Exceso de iluminación'
        },
        {
            id: 'desnivel',
            label: 'Diferencias de nivel (Huecos y desnivel)'
        },
        {
            id: 'quimicos',
            label: 'Contacto con sustancias químicas'
        },
        {
            id: 'biologicos',
            label: 'Contacto con animales, virus, bacteria'
        },
        {
            id: 'carga_fisica',
            label: 'Carga física (manipulación manual)'
        },
        {
            id: 'electrica',
            label: 'Contacto con energía eléctrica A/M/B'
        },
        {
            id: 'hidraulica',
            label: 'Contacto con energía hidráulica'
        },
        {
            id: 'neumatica',
            label: 'Contacto con energía neumática'
        },
        {
            id: 'mecanica',
            label: 'Contacto con energía mecánica (atrap)'
        },
        {
            id: 'termica',
            label: 'Contacto con energía térmica'
        },
        {
            id: 'confinados',
            label: 'Espacios confinados'
        },
        {
            id: 'altura',
            label: 'Caídas de altura'
        },
        {
            id: 'caliente',
            label: 'Trabajo en caliente'
        },
        {
            id: 'izaje',
            label: 'Izaje de cargas'
        },
        {
            id: 'transito',
            label: 'Tránsito'
        },
        {
            id: 'fenomenos_naturales',
            label: 'Fenómenos naturales'
        },
        {
            id: 'incendio',
            label: 'Incendio / Explosión'
        },
        {
            id: 'emisiones',
            label: 'Emisiones / Vertimientos'
        },
        {
            id: 'residuos',
            label: 'Residuos Peligrosos'
        },
        {
            id: 'otros_riesgos',
            label: 'Otros riesgos (Cuales):'
        }
    ];
    const ppe = {
        "Ropa": [
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
        "Protección de pies y piernas": [
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
        "Protección auditiva": [
            {
                id: 'tipo_insercion',
                label: 'Tipo Inserción'
            },
            {
                id: 'tipo_copa',
                label: 'Tipo copa'
            }
        ],
        "Protección respiratoria": [
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
        "Protección cabeza": [
            {
                id: 'casco',
                label: 'Casco Tipo_Clase_ SIN_CON_Barbuque'
            },
            {
                id: 'chavo',
                label: 'Chavo en tela o carnaza'
            }
        ],
        "Protección facial y ocular": [
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
        "Barrera/Señales de advertencia": [
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
        "Guantes": [
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
        "Otros": [
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
    const ppeSystems = [
        {
            id: 'arnes',
            label: 'Arnés, Tipo:'
        },
        {
            id: 'mosqueton',
            label: 'Mosquetón'
        },
        {
            id: 'eslinga',
            label: 'Eslinga, Tipo:'
        },
        {
            id: 'linea_vida',
            label: 'Línea de vida, Tipo:'
        },
        {
            id: 'freno_arrestador',
            label: 'Freno/Arrestador'
        },
        {
            id: 'punto_anclaje',
            label: 'Punto de anclaje (Cual):'
        },
        {
            id: 'autoretractil',
            label: 'Autoretráctil'
        },
        {
            id: 'tie_off',
            label: 'Tie-off'
        },
        {
            id: 'baranda_rodapies',
            label: 'Baranda con rodapiés'
        },
        {
            id: 'sistema_acceso',
            label: 'Sistema de acceso (Cual):'
        },
        {
            id: 'tripode',
            label: 'Tripode / pescante'
        },
        {
            id: 'otro_sistemas',
            label: 'Otro (Cual):'
        }
    ];
    const emergencyQuestions = [
        {
            id: 'potenciales',
            label: 'A.- Las emergencias potenciales que pueden ocurrir'
        },
        {
            id: 'procedimientos',
            label: 'B.- Los procedimientos establecidos para tales situaciones.'
        },
        {
            id: 'rutas_evacuacion',
            label: 'C.- Rutas de Evacuación'
        },
        {
            id: 'puntos_encuentro',
            label: 'D.- Puntos de encuentro'
        },
        {
            id: 'equipos_emergencia',
            label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo'
        },
        {
            id: 'brigadistas',
            label: 'F.- Ubicación de Brigadistas cercanos'
        }
    ];
    const getWorkTypesString = (types)=>{
        const workTypesMap = {
            'altura': 'Trabajo en Alturas',
            'confinado': 'Espacios Confinados',
            'energia': 'Control de Energías',
            'izaje': 'Izaje de Cargas',
            'caliente': 'Trabajo en Caliente',
            'excavacion': 'Excavaciones',
            'general': 'Trabajo General'
        };
        if (!Array.isArray(types) || types.length === 0) return workTypesMap['general'];
        return types.map((key)=>workTypesMap[key] || key).join(', ');
    };
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
    const anexoAlturaAspectos = {
        left: [
            {
                id: 'afiliacionVigente',
                label: 'A. El personal ejecutante de la actividad tiene la afiliación vigente a seguridad social?'
            },
            {
                id: 'procedimientoActividad',
                label: 'B. Se cuenta con el procedimiento de la actividad a ejecutar?'
            },
            {
                id: 'medidasPrevencion',
                label: 'C. Se han determinado las medidas de prevención contra caídas?'
            },
            {
                id: 'conocenMedidas',
                label: 'D. Todos los ejecutantes conocen las medidas de precaución establecidas en la evaluación de riesgos?'
            },
            {
                id: 'entrenadosCertificados',
                label: 'E. Están los ejecutantes entrenados y se encuentran los certificados en sitio para realizar trabajos en altura?'
            },
            {
                id: 'elementosProteccionCertificados',
                label: 'F. Están todos los elementos de protección contra caídas en buen estado y certificados?'
            },
            {
                id: 'verificoAseguramiento',
                label: 'G. Se verifico el sistema de aseguramiento de la escalera, andamio o plataforma a una estructura fija'
            },
            {
                id: 'verificoEstadoElementos',
                label: 'H. Se verifico el estado de: eslingas, arnes, casco, mosquetones, casco, y demas elementos necesarios para realizar el trabajo.'
            },
            {
                id: 'puntosAnclajeCertificados',
                label: 'I. Los puntos de anclaje y demas elementos cumplen con la resistencia de 5000 lbs por persona y estan certificados?'
            },
            {
                id: 'areaDelimitada',
                label: 'J. Esta delimitada y señalizada el area de trabajo'
            },
            {
                id: 'personalCondicionesSalud',
                label: 'K. El personal que realiza el trabajo se encuentra en condiciones adecuadas de salud para la actividad?.'
            }
        ],
        right: [
            {
                id: 'equiposAccesoBuenEstado',
                label: 'L. Se cuenta con todos los equipos y sistemas de acceso para trabjo en alturas en buen estado?'
            },
            {
                id: 'espacioCaidaLibre',
                label: 'M. El espacio de caida libre es suficiente para evitar que la persona se golpee contra el nivel inferior.'
            },
            {
                id: 'elementosEmergencia',
                label: 'N. Se cuenta con elementos para atencion de emergencias en el area y plan de emergencias para rescate en alturas?'
            },
            {
                id: 'elementosProteccionSeleccionados',
                label: 'O. Están los elementos de protección personal seleccionados teniendo en cuenta los riesgos y requerimientos de la tarea?'
            },
            {
                id: 'plataformaSoportaCarga',
                label: 'P. La plataforma o estructura soporta la carga de trabajo, es firme y se evita la caída de objetos o herramientas?'
            },
            {
                id: 'supervisorConstante',
                label: 'Q. Existe un supervisor o acompañante constaste durante el trabajo'
            },
            {
                id: 'andamiosCompletos',
                label: 'R. En caso de trabajos sobre andamios, estos estan completos y adecuadamente armados (rodapies, barandas, etc.)'
            },
            {
                id: 'condicionesClimaticas',
                label: 'S. Las condiciones climaticas son adecuadas para realizar el trabajo'
            },
            {
                id: 'metodoSubirHerramientas',
                label: 'T. El metodo de subir herramientas es seguro'
            },
            {
                id: 'sistemasRestriccion',
                label: 'U. En caso de requerirse se cuenta con sistemas de restricción'
            },
            {
                id: 'sistemasPosicionamiento',
                label: 'V. En caso de requerirse se cuenta con sistemas de posicionamiento'
            }
        ]
    };
    const anexoConfinadoChecklist = {
        left: [
            {
                id: 'A',
                label: 'A.- Existen los medios seguros de acceso al sitio de trabajo'
            },
            {
                id: 'B',
                label: 'B.- Se cuenta con vigía en la entrada al espacio'
            },
            {
                id: 'C',
                label: 'C.- Se cuenta con los EPP acordes a la actividad'
            },
            {
                id: 'D',
                label: 'D.- Se cuenta con un medio de comunicación entre los trabajadores y vigia'
            },
            {
                id: 'E',
                label: 'E.- Se realizó el aislamiento necesario para el control de energías peligrosas y fluidos (Anexo 3)'
            },
            {
                id: 'F',
                label: 'F.- Están calibrados los equipos de prueba atmosférica y se realizaron pruebas funcionales'
            },
            {
                id: 'G',
                label: 'G.- El área se ha delimitado para prevenir el acceso de personal no autorizado'
            },
            {
                id: 'H',
                label: 'H.- Se realizó la medición de la atmósfera (IPVS, combustible, explosiva, tóxica y inerte)'
            },
            {
                id: 'I',
                label: 'I.- Están claras las condiciones para cancelar el permiso'
            },
            {
                id: 'J',
                label: 'J.- Drenado y purgado'
            },
            {
                id: 'K',
                label: 'K.- Los equipos de iluminación y comunicación son a prueba de explosión.'
            },
            {
                id: 'L',
                label: 'L.- Esta disponible la ventilación forzada o mecánica'
            },
            {
                id: 'M',
                label: 'M.- Se cuenta con señalización de peligro acorde al trabajo a realizar.'
            },
            {
                id: 'N',
                label: 'N.- Los operarios del área conocen el uso del equipo autónomo'
            },
            {
                id: 'Ñ',
                label: 'Ñ.- Certificado de aptitud médica y validación certificado de entrenamiento.'
            },
            {
                id: 'O',
                label: 'O.- Están disponibles los aparatos de respiración autónoma'
            },
            {
                id: 'P',
                label: 'P.- Monitoreo atmosférico permanente'
            },
            {
                id: 'Q',
                label: 'Q.- Se recordó o acordó el código de señales para emergencia'
            },
            {
                id: 'R',
                label: 'R.- Se aplicó bloqueo, etiquetó y candadeo (completar Anexo 3)'
            }
        ],
        right: [
            {
                id: 'S',
                label: 'S.- Elaboración ATS y/o procedimientos de trabajo escritos'
            },
            {
                id: 'T',
                label: 'T.- Procedimiento de rescate y equipos para atender la emergencia'
            },
            {
                id: 'V',
                label: 'V.- Estan dsisponibles y se comunicaron las fichas de seguridad de los productos químicos'
            },
            {
                id: 'W',
                label: 'W.- existe olor perceptible'
            }
        ]
    };
    const anexoIzajeInfoGeneral = {
        accion: [
            {
                id: 'levantar',
                label: 'Levantar'
            },
            {
                id: 'trasladar',
                label: 'Trasladar'
            },
            {
                id: 'montar',
                label: 'Montar'
            },
            {
                id: 'desmontar',
                label: 'Desmontar'
            },
            {
                id: 'cargar',
                label: 'Cargar'
            },
            {
                id: 'descargar',
                label: 'Descargar'
            }
        ],
        pesoCarga: [
            {
                id: 'menor1000',
                label: 'Menor a 1000 kg'
            },
            {
                id: 'entre1000_2000',
                label: 'Entre 1000 kg y 2000 kg'
            },
            {
                id: 'entre2000_3000',
                label: 'Entre 2000 kg y 3000 kg'
            },
            {
                id: 'entre3000_4000',
                label: 'Entre 3000 kg y 4000 kg'
            },
            {
                id: 'entre4000_5000',
                label: 'Entre 4000 kg y 5000 kg'
            },
            {
                id: 'mayor5000',
                label: 'Mas de 5000'
            }
        ],
        equipoUtilizar: [
            'Puente grua',
            'Camion Grus',
            'Grua Movil',
            'Tome Grua',
            'Retro excavadora',
            'Tole Handler',
            'Diferenciales / Polipasto'
        ]
    };
    const anexoIzajeAspectos = {
        left: [
            {
                id: 'A',
                label: 'A. Está estabilizado el terreno donde se encuentra el equipo de izaje.'
            },
            {
                id: 'B',
                label: 'B. El operador visualiza bien la carga y la operación que va a realizar.'
            },
            {
                id: 'C',
                label: 'C. Se calculo tecnicamente la maniobra. (Se cuenta con plan de izaje de cargas).'
            },
            {
                id: 'D',
                label: 'D. Se encuentra señalizada y demarcada el área de trabajo.'
            },
            {
                id: 'E',
                label: 'E. Se verifico la capacidad de cargue del equipo de izaje'
            },
            {
                id: 'F',
                label: 'F. Se retiraron los curiosos del área de izaje y del radio del equipo de izaje.'
            },
            {
                id: 'G',
                label: 'G. Existe comunicación clara entre el operador, el encargado de la actividad y quienes participan en ella.'
            },
            {
                id: 'H',
                label: 'H. Se realizo el ATS (Analisis de Trabajo Seguro) para la ejecución de la actividad.'
            },
            {
                id: 'I',
                label: 'I. Se encuentran en buen estado las eslingas, aparejos y demás elementos de sujeción o accesorios de izaje. Sin uniones o hebras'
            },
            {
                id: 'J',
                label: 'J. Los polines para nivelación de las grúas están en buen estado.'
            },
            {
                id: 'K',
                label: 'K. Los polines quedan estables con respecto al terreno.'
            }
        ],
        right: [
            {
                id: 'L',
                label: 'L. Está dispuesta y despejada el área donde se colocarán los elementos a izar.'
            },
            {
                id: 'M',
                label: 'M. No existen personas bajo la carga izada.'
            },
            {
                id: 'N',
                label: 'N. Se evaluó el área donde se va a llevar la carga izada y el área de movimiento de la carga.'
            },
            {
                id: 'O',
                label: 'O. La actividad esta realizándose con la distancia de redes électricas recomendada?'
            },
            {
                id: 'P',
                label: 'P. Las condiciones climiticas son buenas para la realización de la actividad?'
            },
            {
                id: 'Q',
                label: 'Q. El equipo tiene conexión a tierra?'
            },
            {
                id: 'R',
                label: 'R. Se verifico que no halla ningun material que pudiera caer arriba de la carga al ser izada?'
            },
            {
                id: 'S',
                label: 'S. Hay un señalizador capacitado y entrenado para la actividad?'
            },
            {
                id: 'T',
                label: 'T. Las partes del equipo a realizar izaje se encuentran en buen estado y no evidencian soldaduras o uniones inadecuadas'
            },
            {
                id: 'U',
                label: 'U. Se verifico que los colaboradores estén afiliados al Sistema de Seguridad Social (EPS, ARL, AFP).'
            }
        ]
    };
    const anexoIzajePrecauciones = [
        {
            id: 'inspeccion',
            label: 'INSPECCION GRUA/APAR'
        },
        {
            id: 'carnet',
            label: 'CARNET DIA VIG CA ALUM'
        },
        {
            id: 'certificacion',
            label: 'CERTIFICACION OPERADOR RI'
        },
        {
            id: 'plan_izaje',
            label: 'PLAN DE IZAJE'
        },
        {
            id: 'uso_epps',
            label: 'USO DE EPPS'
        },
        {
            id: 'bloqueo_etiquetado',
            label: 'BLOQUEO Y ETIQUETADO'
        },
        {
            id: 'clima_seguro',
            label: 'CLIMA SEGURO'
        },
        {
            id: 'vigia',
            label: 'VIGIA PARA LINEAS ELECTRICA'
        },
        {
            id: 'apoyo_terreno',
            label: 'APOYO DEL TERRENO'
        },
        {
            id: 'comunicacion_radial',
            label: 'COMUNICACION RADIAL/LUMINICA'
        },
        {
            id: 'plan_rescate',
            label: 'PLAN DE RESCATE'
        },
        {
            id: 'senalizacion_area',
            label: 'SEÑALIZACION Y DEMARCACION AREA'
        },
        {
            id: 'estabilizadores',
            label: 'ESTABILIZADORES & TERRENO'
        }
    ];
    const anexoEnergiasTension = [
        {
            id: 'muy_baja',
            label: 'Muy baja tensión (Tensiones menores de 25 V).'
        },
        {
            id: 'baja',
            label: 'Baja tensión (Tensión nominal mayor o igual 25 V y menor o igual a 1000 V).'
        },
        {
            id: 'media',
            label: 'Media tensión (Tensión nominal superior a 1000 V e inferior a 57,5 kV).'
        },
        {
            id: 'alta',
            label: 'Alta tensión (Tensiones mayores o iguales a 57,5 kV y menores o iguales a 230 kV).'
        },
        {
            id: 'extra_alta',
            label: 'Extra alta tensión (Tensiones superiores a 230kV).'
        }
    ];
    const anexoEnergiasPlaneacion = [
        {
            id: 'personalHabilitado',
            label: 'Personal habilitado, certificado de competencia laboral vigente (Conte, Conaltel, Matrícula profesional)'
        },
        {
            id: 'evaluacionViabilidad',
            label: 'El personal habilitado evalúa la viabilidad técnica (visita previa) y el riesgo asociado para las personas y para el sistema, cumpliendo las etapas de diagnóstico, planeación y ejecución de trabajos.'
        },
        {
            id: 'noSimultaneos',
            label: 'No se realizan trabajos simultáneos sin y con tensión por el mismo trabajador en la misma área de trabajo.'
        },
        {
            id: 'autorizacionMantenimiento',
            label: 'Autorización del área de mantenimiento'
        },
        {
            id: 'revisionInformacion',
            label: 'Revisión de información técnica del sistema (diagrama unifilar, planos)'
        },
        {
            id: 'procedimientoNormalizado',
            label: 'Se cuenta con un procedimiento normalizado para realizar la actividad y ATS'
        },
        {
            id: 'supervisionControl',
            label: 'Se realizar supervisión y control en el sitio de trabajo considerando en forma prioritaria la detección y el control de los riesgos, vigilando el cumplimiento estricto de las normas y procedimientos de seguridad aplicables'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col bg-gray-100 pb-16 md:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto w-full bg-gray-100 p-4 sticky top-0 md:top-auto z-10 md:relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-2 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>router.push('/permits'),
                            className: "justify-self-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 799,
                                    columnNumber: 21
                                }, this),
                                "Volver"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 798,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 md:col-span-3 flex justify-end items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleExportToPDF,
                                    variant: "outline",
                                    size: "sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__["FileDown"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 804,
                                            columnNumber: 25
                                        }, this),
                                        "PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 803,
                                    columnNumber: 22
                                }, this),
                                canChangeStatus('aprobado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "outline",
                                    className: "text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700",
                                    onClick: ()=>handleChangeStatus('aprobado'),
                                    disabled: isStatusChanging,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 807,
                                            columnNumber: 247
                                        }, this),
                                        " Aprobar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 807,
                                    columnNumber: 53
                                }, this),
                                canChangeStatus('rechazado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "outline",
                                    className: "text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700",
                                    onClick: ()=>setIsRejectionDialogOpen(true),
                                    disabled: isStatusChanging,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 809,
                                            columnNumber: 209
                                        }, this),
                                        " Rechazar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 809,
                                    columnNumber: 23
                                }, this),
                                canChangeStatus('en_ejecucion') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    className: "bg-purple-600 hover:bg-purple-700",
                                    onClick: ()=>handleChangeStatus('en_ejecucion'),
                                    disabled: isStatusChanging,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 811,
                                            columnNumber: 200
                                        }, this),
                                        " Iniciar Ejecución"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 811,
                                    columnNumber: 57
                                }, this),
                                canChangeStatus('suspendido') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "outline",
                                    className: "text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700",
                                    onClick: ()=>handleChangeStatus('suspendido'),
                                    disabled: isStatusChanging,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 255
                                        }, this),
                                        " Suspender"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 812,
                                    columnNumber: 55
                                }, this),
                                canChangeStatus('cerrado') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    className: "bg-blue-600 hover:bg-blue-700",
                                    onClick: ()=>setIsClosureDialogOpen(true),
                                    disabled: isStatusChanging,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 813,
                                            columnNumber: 185
                                        }, this),
                                        " Cerrar Permiso"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 813,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 802,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 797,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 796,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto w-full bg-white p-4 md:p-8 shadow-lg md:rounded-lg border font-sans",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        ref: headerRef,
                        className: "flex justify-between items-start pb-4 border-b-4 border-primary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: "https://i.postimg.cc/VsZBSkmH/Italcol.png",
                                    alt: "Logo Italcol",
                                    width: 120,
                                    height: 40
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 822,
                                    columnNumber: 22
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 821,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl md:text-3xl font-bold text-gray-800",
                                        children: "PERMISO DE TRABAJO"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-sm md:text-base text-gray-600 mt-2",
                                        children: [
                                            "N°: ",
                                            permit.number || permit.id.substring(0, 10)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 826,
                                        columnNumber: 21
                                    }, this),
                                    permit.createdAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs md:text-sm text-gray-500 mt-1",
                                        children: [
                                            "Creado: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(permit.createdAt), "dd/MM/yyyy HH:mm")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 828,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        className: `mt-2 ${statusInfo.bgColor} ${statusInfo.color} text-base`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(statusInfo.icon, {
                                                className: "mr-2 h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 833,
                                                columnNumber: 25
                                            }, this),
                                            statusInfo.text
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 832,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 824,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 820,
                        columnNumber: 14
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        ref: contentRef,
                        className: "print:p-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800 print:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: 'Marque dentro de los cuadros SI/NO/NA según el caso. Si alguna de las verificaciones a las preguntas es "NO", NO SE DEBERA INICIAR EL TRABAJO HASTA TANTO NO SE SOLUCIONE LA SITUACIÓN, SI ES N/A REALICE SU JUSTIFICACIÓN EN OBSERVACIONES.'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 841,
                                        columnNumber: 24
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 841,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 840,
                                columnNumber: 17
                            }, this),
                            permit.anexoATS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                className: "space-y-6 mt-6 border rounded-lg",
                                defaultOpen: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                        className: "w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold uppercase text-gray-600",
                                                children: "ANÁLISIS DE TRABAJO SEGURO - ATS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 847,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 848,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 846,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 md:p-6 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "ÁREA",
                                                        value: permit.anexoATS.area
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 852,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "SOLICITANTE",
                                                        value: permit.anexoATS.solicitante
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 853,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "FECHA Y HORA DE INICIO",
                                                        value: permit.anexoATS.fechaInicio ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.anexoATS.fechaInicio), "dd/MM/yyyy HH:mm") : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 854,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "FECHA Y HORA DE TERMINACIÓN",
                                                        value: permit.anexoATS.fechaTerminacion ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.anexoATS.fechaTerminacion), "dd/MM/yyyy HH:mm") : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 855,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 851,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "DESCRIPCIÓN DE LA TAREA",
                                                value: permit.anexoATS.descripcionTarea,
                                                fullWidth: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 857,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                        children: "Identificación de Peligros, Riesgos y Controles"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 859,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: Object.entries(atsPeligrosAgrupados).map(([seccion, peligros])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: "font-semibold text-gray-600 text-xs mb-2 uppercase",
                                                                        children: seccion
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 863,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: peligros.map((peligro)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                                label: peligro.label,
                                                                                value: permit.anexoATS?.peligros?.[peligro.id],
                                                                                readOnly: true
                                                                            }, peligro.id, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 866,
                                                                                columnNumber: 53
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 864,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, seccion, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 862,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 858,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 850,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 845,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "INFORMACIÓN GENERAL- Aplica a todos los Permisos",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-4 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Fecha de Expedición:",
                                                            value: permit.generalInfo?.fechaExpedicion ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.fechaExpedicion), "dd/MM/yyyy") : undefined
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 886,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Planta:",
                                                            value: permit.generalInfo?.planta
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 887,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Proceso:",
                                                            value: permit.generalInfo?.proceso
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 888,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Contrato:",
                                                            value: permit.generalInfo?.contrato
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 889,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 885,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Empresa:",
                                                            value: permit.generalInfo?.empresa
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 892,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Nombre del Solicitante:",
                                                            value: permit.generalInfo?.nombreSolicitante
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 893,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 891,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Duración Desde:",
                                                            value: permit.generalInfo?.validFrom ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validFrom), "dd/MM/yyyy HH:mm") : undefined
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 896,
                                                            columnNumber: 32
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Duración Hasta:",
                                                            value: permit.generalInfo?.validUntil ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validUntil), "dd/MM/yyyy HH:mm") : undefined
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 897,
                                                            columnNumber: 32
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "ALCANCE. El trabajo se LIMITA a lo siguiente (Alcance del Trabajo - Descripcion y Area/Equipo):",
                                                    value: permit.generalInfo?.workDescription,
                                                    fullWidth: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 899,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: "Equipos y/o Herramientas"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 902,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-1 gap-1 mt-1",
                                                                    children: permit.generalInfo?.tools?.map((tool, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between items-center p-2 bg-gray-50 rounded-md text-xs",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: tool.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 906,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        }, index, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 905,
                                                                            columnNumber: 45
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 903,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 901,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "No. Trabajadores",
                                                            value: permit.generalInfo?.numTrabajadores
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 911,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 900,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 884,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 883,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Verificaciones Previas",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                label: "REUNIÓN DE INICIO",
                                                value: permit.generalInfo?.reunionInicio,
                                                readOnly: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 918,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                label: "ATS Verificar el correcto diligenciamiento del ATS en el sitio de trabajo",
                                                value: permit.generalInfo?.atsVerificado,
                                                readOnly: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 917,
                                        columnNumber: 21
                                    }, this),
                                    permit.anexoAltura && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                        className: "space-y-6 mt-6 border rounded-lg",
                                        defaultOpen: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                className: "w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-bold uppercase text-gray-600",
                                                        children: "ANEXO 1 - TRABAJOS EN ALTURA"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 925,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 926,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 924,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                className: "p-4 md:p-6 space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 border rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-bold text-primary mb-2",
                                                                children: "TIPO DE ESTRUCTURA O EQUIPO PARA TRABAJO EN ALTURAS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 930,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                                                children: anexoAlturaEstructuras.map((item)=>permit.anexoAltura?.tipoEstructura?.[item.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                className: "h-4 w-4 text-primary"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 935,
                                                                                columnNumber: 43
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm",
                                                                                children: item.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 936,
                                                                                columnNumber: 43
                                                                            }, this)
                                                                        ]
                                                                    }, item.id, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 934,
                                                                        columnNumber: 41
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 931,
                                                                columnNumber: 33
                                                            }, this),
                                                            permit.anexoAltura.tipoEstructura?.otros && permit.anexoAltura.tipoEstructura.otrosCual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                        children: "Otros:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 942,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    " ",
                                                                    permit.anexoAltura.tipoEstructura.otrosCual
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 942,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 929,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 border rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-bold text-primary mb-2",
                                                                children: "ASPECTOS DE SEGURIDAD PARA TRABAJO EN ALTURAS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 947,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: anexoAlturaAspectos.left.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                                label: item.label,
                                                                                value: permit.anexoAltura?.aspectosSeguridad?.[item.id],
                                                                                readOnly: true
                                                                            }, item.id, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 951,
                                                                                columnNumber: 39
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 949,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-1",
                                                                        children: anexoAlturaAspectos.right.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                                label: item.label,
                                                                                value: permit.anexoAltura?.aspectosSeguridad?.[item.id],
                                                                                readOnly: true
                                                                            }, item.id, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 961,
                                                                                columnNumber: 39
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 959,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 948,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 946,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 928,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 923,
                                        columnNumber: 23
                                    }, this),
                                    permit.anexoConfinado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                        className: "space-y-6 mt-6 border rounded-lg",
                                        defaultOpen: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                className: "w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-bold uppercase text-gray-600",
                                                        children: "ANEXO 2 - TRABAJOS EN ESPACIOS CONFINADOS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 977,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                className: "p-4 md:p-6 space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Tipo",
                                                        value: permit.anexoConfinado.procedimientoComunicacionCual
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 982,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Lista de Verificación"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1",
                                                                children: [
                                                                    ...anexoConfinadoChecklist.left,
                                                                    ...anexoConfinadoChecklist.right
                                                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                        label: item.label,
                                                                        value: permit.anexoConfinado?.identificacionPeligros?.[item.id],
                                                                        readOnly: true
                                                                    }, item.id, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 988,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 986,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 984,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Mediciones Atmosféricas Iniciales"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 994,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "Tipo"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 997,
                                                                                    columnNumber: 55
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "Resultado"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 997,
                                                                                    columnNumber: 82
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "Límites"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 997,
                                                                                    columnNumber: 114
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 997,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 996,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "LEL"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1000,
                                                                                        columnNumber: 53
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: permit.anexoConfinado.resultadosPruebasGases?.lel
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1000,
                                                                                        columnNumber: 79
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "0%"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1000,
                                                                                        columnNumber: 153
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1000,
                                                                                columnNumber: 43
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "O2"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1001,
                                                                                        columnNumber: 53
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: permit.anexoConfinado.resultadosPruebasGases?.o2
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1001,
                                                                                        columnNumber: 78
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "19.5 - 22%"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1001,
                                                                                        columnNumber: 151
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1001,
                                                                                columnNumber: 43
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "H2S"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1002,
                                                                                        columnNumber: 53
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: permit.anexoConfinado.resultadosPruebasGases?.h2s
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1002,
                                                                                        columnNumber: 79
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "0 - 10 PPM"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1002,
                                                                                        columnNumber: 153
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1002,
                                                                                columnNumber: 43
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "CO"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1003,
                                                                                        columnNumber: 53
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: permit.anexoConfinado.resultadosPruebasGases?.co
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1003,
                                                                                        columnNumber: 78
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: "0 - 25 PPM"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1003,
                                                                                        columnNumber: 151
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1003,
                                                                                columnNumber: 43
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 999,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 995,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 993,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Pruebas Periódicas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1009,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "Hora"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 62
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "LEL"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 89
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "O2"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 115
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "H2S"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 140
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "CO"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 166
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                                    children: "Firma"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1011,
                                                                                    columnNumber: 191
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1011,
                                                                            columnNumber: 52
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1011,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                                        children: permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.hora
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.lel
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 92
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.o2
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 122
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.h2s
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 151
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.co
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 181
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                                        children: p.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                            src: p.firma,
                                                                                            alt: "firma",
                                                                                            width: 80,
                                                                                            height: 40
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1014,
                                                                                            columnNumber: 233
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1014,
                                                                                        columnNumber: 210
                                                                                    }, this)
                                                                                ]
                                                                            }, i, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1014,
                                                                                columnNumber: 43
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1012,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Autorizaciones"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1021,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Autoridad del Área",
                                                                value: permit.anexoConfinado.autoridadDelArea?.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1022,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Responsable del Trabajo",
                                                                value: permit.anexoConfinado.responsableDelTrabajo?.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1023,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Supervisor de Trabajo",
                                                                value: permit.anexoConfinado.supervisorTrabajo?.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1024,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Observaciones / Supervisión",
                                                        value: permit.anexoConfinado.observaciones,
                                                        fullWidth: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 981,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 976,
                                        columnNumber: 25
                                    }, this),
                                    permit.anexoEnergias && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                        className: "space-y-6 mt-6 border rounded-lg",
                                        defaultOpen: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                className: "w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-bold uppercase text-gray-600",
                                                        children: "ANEXO 3 - TRABAJOS CON ENERGÍAS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1037,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                className: "p-4 md:p-6 space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Tensión a la cual el personal estará expuesto"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1041,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Nivel de Tensión",
                                                                value: anexoEnergiasTension.find((t)=>t.id === permit.anexoEnergias?.tensionExpuesta)?.label || 'No especificado'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1042,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1040,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Planeación"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1046,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: anexoEnergiasPlaneacion.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                        label: item.label,
                                                                        value: permit.anexoEnergias?.planeacion?.[item.id],
                                                                        readOnly: true
                                                                    }, item.id, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1049,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1047,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1045,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Método de trabajo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1055,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Método",
                                                                value: permit.anexoEnergias.metodoTrabajo === 'con_tension' ? 'Con Tensión' : 'Sin Tensión'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1056,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1054,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1039,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1034,
                                        columnNumber: 25
                                    }, this),
                                    permit.anexoIzaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                        className: "space-y-6 mt-6 border rounded-lg",
                                        defaultOpen: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                className: "w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-bold uppercase text-gray-600",
                                                        children: "ANEXO 4 - IZAJE DE CARGAS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1065,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1066,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1064,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                className: "p-4 md:p-6 space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Información General"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1070,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-md",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                className: "font-semibold text-xs mb-2",
                                                                                children: "Acción a Realizar"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1073,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            anexoIzajeInfoGeneral.accion.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center space-x-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                            id: `view-izaje-accion-${item.id}`,
                                                                                            checked: permit.anexoIzaje?.informacionGeneral?.accion?.[item.id],
                                                                                            disabled: true
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1076,
                                                                                            columnNumber: 53
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            htmlFor: `view-izaje-accion-${item.id}`,
                                                                                            className: "text-xs font-normal",
                                                                                            children: item.label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1077,
                                                                                            columnNumber: 53
                                                                                        }, this)
                                                                                    ]
                                                                                }, item.id, true, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1075,
                                                                                    columnNumber: 49
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1072,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                className: "font-semibold text-xs mb-2",
                                                                                children: "Peso de la Carga"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1082,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            anexoIzajeInfoGeneral.pesoCarga.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center space-x-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                            id: `view-izaje-peso-${item.id}`,
                                                                                            checked: permit.anexoIzaje?.informacionGeneral?.pesoCarga?.[item.id],
                                                                                            disabled: true
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1085,
                                                                                            columnNumber: 53
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            htmlFor: `view-izaje-peso-${item.id}`,
                                                                                            className: "text-xs font-normal",
                                                                                            children: item.label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1086,
                                                                                            columnNumber: 53
                                                                                        }, this)
                                                                                    ]
                                                                                }, item.id, true, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1084,
                                                                                    columnNumber: 49
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1081,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                className: "font-semibold text-xs mb-2",
                                                                                children: "Equipo a Utilizar (Capacidad en Ton)"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1091,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            anexoIzajeInfoGeneral.equipoUtilizar.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2 mb-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "flex-1 text-xs",
                                                                                            children: item
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1094,
                                                                                            columnNumber: 53
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-mono text-xs p-1 bg-gray-100 rounded w-16 text-center",
                                                                                            children: permit.anexoIzaje?.informacionGeneral?.equipoUtilizar?.[item] || 'N/A'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1095,
                                                                                            columnNumber: 53
                                                                                        }, this)
                                                                                    ]
                                                                                }, item, true, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1093,
                                                                                    columnNumber: 49
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1090,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1071,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1069,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Aspectos Requeridos"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1103,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1",
                                                                children: [
                                                                    ...anexoIzajeAspectos.left,
                                                                    ...anexoIzajeAspectos.right
                                                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                        label: item.label,
                                                                        value: permit.anexoIzaje?.aspectosRequeridos?.[item.id],
                                                                        readOnly: true
                                                                    }, item.id, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1106,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1104,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Precauciones y Controles Específicos"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1112,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 md:grid-cols-3 gap-2",
                                                                children: anexoIzajePrecauciones.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2 text-xs",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: `view-izaje-prec-${item.id}`,
                                                                                checked: permit.anexoIzaje?.precauciones?.[item.id],
                                                                                disabled: true
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1116,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                htmlFor: `view-izaje-prec-${item.id}`,
                                                                                className: "font-normal",
                                                                                children: item.label
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1117,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, item.id, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1115,
                                                                        columnNumber: 45
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1113,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-gray-700 text-xs mb-2 uppercase",
                                                                children: "Líder de Izaje - Proyecto"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1124,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                        label: "Nombre y apellido",
                                                                        value: permit.anexoIzaje.liderIzaje?.nombre
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1126,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                        label: "Cédula",
                                                                        value: permit.anexoIzaje.liderIzaje?.cedula
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                        label: "Firma Apertura",
                                                                        value: permit.anexoIzaje.liderIzaje?.firmaApertura ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: permit.anexoIzaje.liderIzaje.firmaApertura,
                                                                            alt: "Firma Lider Izaje",
                                                                            width: 120,
                                                                            height: 60,
                                                                            className: "bg-white rounded border"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1129,
                                                                            columnNumber: 91
                                                                        }, void 0) : 'Pendiente'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1128,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1125,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1123,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Observaciones",
                                                        value: permit.anexoIzaje.observaciones,
                                                        fullWidth: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1134,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1068,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1063,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control estén implementadas",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2",
                                            children: hazards.map((hazard)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                    label: hazard.label,
                                                    value: permit.hazards?.[hazard.id],
                                                    readOnly: true
                                                }, hazard.id, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1143,
                                                    columnNumber: 31
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1141,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1140,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "EPP - SEÑALIZACION (Verificar)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                            children: Object.entries(ppe).map(([sectionTitle, sectionItems])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold mb-2 text-gray-600 text-sm",
                                                            children: sectionTitle
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1152,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: sectionItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                    label: item.label,
                                                                    value: permit.ppe?.[item.id],
                                                                    readOnly: true
                                                                }, item.id, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1155,
                                                                    columnNumber: 42
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1153,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, sectionTitle, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1151,
                                                    columnNumber: 33
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1149,
                                            columnNumber: 26
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2",
                                            children: ppeSystems.map((system)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                    label: system.label,
                                                    value: permit.ppeSystems?.[system.id],
                                                    readOnly: true
                                                }, system.id, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 31
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1164,
                                            columnNumber: 26
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1163,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Notificación y Emergencias",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                label: "El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados",
                                                value: permit.emergency?.notification,
                                                readOnly: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1172,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 space-y-1",
                                                children: emergencyQuestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                        label: item.label,
                                                        value: permit.emergency?.[item.id],
                                                        readOnly: true
                                                    }, item.id, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1175,
                                                        columnNumber: 31
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1173,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1171,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Trabajadores Ejecutantes",
                                        children: permit.workers && permit.workers.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border rounded-md",
                                            children: permit.workers.map((worker, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                                    className: "border-b last:border-b-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                            className: "w-full p-4 hover:bg-gray-50 flex justify-between items-center cursor-pointer group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid grid-cols-3 gap-4 text-left flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                            label: "Nombre",
                                                                            value: worker.nombre
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1187,
                                                                            columnNumber: 41
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                            label: "Cédula",
                                                                            value: worker.cedula
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1188,
                                                                            columnNumber: 41
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                            label: "Rol",
                                                                            value: worker.rol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1189,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1186,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    className: "h-5 w-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform ml-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1191,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1185,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-4 bg-gray-50/50 border-t",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "EPS",
                                                                                value: worker.eps
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1196,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "ARL",
                                                                                value: worker.arl
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1197,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Fondo de Pensiones",
                                                                                value: worker.pensiones
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1198,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1195,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Certificado Aptitud Médica",
                                                                                value: worker.tsaTec?.toUpperCase() || 'N/A'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1201,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Entrenamiento / Capacitación",
                                                                                value: worker.entrenamiento?.toUpperCase() || 'N/A'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1202,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1200,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Firma Apertura",
                                                                                value: worker.firmaApertura ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                    src: worker.firmaApertura,
                                                                                    alt: "Firma Apertura",
                                                                                    width: 120,
                                                                                    height: 60,
                                                                                    className: "bg-white rounded border"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1206,
                                                                                    columnNumber: 72
                                                                                }, void 0) : 'Pendiente'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1205,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Firma Cierre",
                                                                                value: worker.firmaCierre ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                    src: worker.firmaCierre,
                                                                                    alt: "Firma Cierre",
                                                                                    width: 120,
                                                                                    height: 60,
                                                                                    className: "bg-white rounded border"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1209,
                                                                                    columnNumber: 70
                                                                                }, void 0) : 'Pendiente'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1208,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1204,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1194,
                                                                columnNumber: 37
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1193,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1184,
                                                    columnNumber: 29
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1182,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground",
                                            children: "No se agregaron trabajadores externos."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1218,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1180,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Autorizaciones",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground mb-4",
                                                children: "He tenido conocimiento de la actividad que se realizará en mi área a cargo, valido las recomendaciones descritas en el cuerpo del PERMISO DE TRABAJO Y ATS, realicé inspección de seguridad del área donde se realizará el trabajo (incluir áreas o actividades vecinas), Alerté sobre los riesgos específicos del lugar donde se realizará el trabajo. Se garantizar que las recomendaciones de SST descritas y consignadas serán cumplidas. Verifiqué las buenas condiciones de los equipos y herramientas que serán utilizados. Me aseguré que las personas implicadas están calificadas para la ejecución del servicio y conocen las reglas de seguridad aplicables al trabajo, los procedimientos, normas, políticas aplicables, el plan de emergencias."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1223,
                                                columnNumber: 26
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: permit.approvals && Object.keys(signatureRoles).map((role)=>{
                                                    const approval = permit.approvals[role];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                                        className: "flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                className: "bg-gray-100 p-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                    className: "text-sm",
                                                                    children: signatureRoles[role]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1230,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1229,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                className: "p-4 space-y-2 flex-1 flex flex-col justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Área",
                                                                                value: approval?.area || 'N/A'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1234,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Nombre",
                                                                                value: approval?.userName || 'Pendiente'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1235,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Firma Apertura",
                                                                                value: approval?.firmaApertura ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "bg-gray-100 p-2 rounded-md",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                            src: approval.firmaApertura,
                                                                                            alt: `Firma de ${approval.userName}`,
                                                                                            width: 150,
                                                                                            height: 75,
                                                                                            className: "mx-auto"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1239,
                                                                                            columnNumber: 57
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-center text-xs mt-1",
                                                                                            children: [
                                                                                                "Firmado el ",
                                                                                                approval.signedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(approval.signedAt), "dd/MM/yyyy 'a las' HH:mm") : 'N/A'
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                            lineNumber: 1240,
                                                                                            columnNumber: 57
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1238,
                                                                                    columnNumber: 55
                                                                                }, void 0) : 'Pendiente'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1236,
                                                                                columnNumber: 49
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                                label: "Firma Cierre",
                                                                                value: approval?.firmaCierre ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "bg-gray-100 p-2 rounded-md",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                                        src: approval.firmaCierre,
                                                                                        alt: `Firma de ${approval.userName}`,
                                                                                        width: 150,
                                                                                        height: 75,
                                                                                        className: "mx-auto"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1247,
                                                                                        columnNumber: 57
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                    lineNumber: 1246,
                                                                                    columnNumber: 55
                                                                                }, void 0) : 'Pendiente'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1244,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1233,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col gap-2 mt-4",
                                                                        children: [
                                                                            canSign(role, 'firmaApertura') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                size: "sm",
                                                                                className: "w-full",
                                                                                onClick: ()=>openSignatureDialog(role, 'firmaApertura'),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                                        className: "mr-2 h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1256,
                                                                                        columnNumber: 57
                                                                                    }, this),
                                                                                    "Firmar Apertura"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1255,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            canSign(role, 'firmaCierre') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                size: "sm",
                                                                                className: "w-full",
                                                                                variant: "secondary",
                                                                                onClick: ()=>openSignatureDialog(role, 'firmaCierre'),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                                        className: "mr-2 h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                        lineNumber: 1262,
                                                                                        columnNumber: 57
                                                                                    }, this),
                                                                                    "Firmar Cierre"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 1261,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1253,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1232,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, role, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1228,
                                                        columnNumber: 37
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1224,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1222,
                                        columnNumber: 22
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                                        title: "Emisión, Revalidación y Cierre",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground mb-4",
                                                children: "Para trabajo en caliente el cierre del permiso se debe hacer minimo 2 horas posterior a la terminación de la tarea y se deben inspeccionar el lugar 30 min, 60 min y 2 horas posterior a la culminación de la tarea."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1275,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                readOnly: true,
                                                                label: "Se informo al responsable del área sobre la culminación de las actividades.",
                                                                value: permit.closure?.informeCulminacion
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1278,
                                                                columnNumber: 34
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                readOnly: true,
                                                                label: "Área se encuentra despejada, ordenada, demarcación retirada.",
                                                                value: permit.closure?.areaDespejada
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1279,
                                                                columnNumber: 34
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                readOnly: true,
                                                                label: "Se evidencia partículas o material encendido que pueda generar riesgo de fuego incipiente",
                                                                value: permit.closure?.evidenciaParticulas
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1280,
                                                                columnNumber: 34
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                readOnly: true,
                                                                label: "Se continua con la labor de manera normal.",
                                                                value: permit.closure?.continuaLabor
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1281,
                                                                columnNumber: 34
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1277,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            permit.closure?.seguimientoCaliente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Seguimiento trabajo en caliente",
                                                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                            value: permit.closure.seguimientoCaliente.hora1 || '',
                                                                            readOnly: true,
                                                                            className: "text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1287,
                                                                            columnNumber: 43
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                            value: permit.closure.seguimientoCaliente.hora2 || '',
                                                                            readOnly: true,
                                                                            className: "text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1288,
                                                                            columnNumber: 43
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                            value: permit.closure.seguimientoCaliente.hora3 || '',
                                                                            readOnly: true,
                                                                            className: "text-xs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1289,
                                                                            columnNumber: 43
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1286,
                                                                    columnNumber: 39
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1285,
                                                                columnNumber: 35
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                readOnly: true,
                                                                label: "Se retiraron todos los dispositivos de bloqueo(candados y tarjetas).",
                                                                value: permit.closure?.dispositivosRetirados
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1293,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Fecha de Cierre",
                                                                value: permit.closure?.fechaCierre ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.closure.fechaCierre), 'dd/yyyy') : 'Pendiente'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1294,
                                                                columnNumber: 34
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                                label: "Hora de Cierre",
                                                                value: permit.closure?.horaCierre || 'Pendiente'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1295,
                                                                columnNumber: 34
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1283,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1276,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1274,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 882,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 839,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        ref: footerRef,
                        className: "mt-12 pt-4 border-t text-right text-xs text-gray-500 print:text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Código: DN-FR-SST-016"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1303,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Versión: 05"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1304,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1302,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 819,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isSignatureDialogOpen,
                onOpenChange: setIsSignatureDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "w-[90vw] max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Firmar Permiso de Trabajo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1311,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: signingRole && `Está firmando como ${signatureRoles[signingRole.role]}. Su firma quedará registrada.`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1312,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1310,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1316,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1309,
                    columnNumber: 14
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1308,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isRejectionDialogOpen,
                onOpenChange: setIsRejectionDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Rechazar Permiso de Trabajo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1323,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Por favor, especifique el motivo del rechazo. Este motivo será registrado y visible para el solicitante."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1322,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                placeholder: "Escriba aquí el motivo del rechazo...",
                                value: rejectionReason,
                                onChange: (e)=>setRejectionReason(e.target.value),
                                rows: 4
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1329,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1328,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogClose"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1338,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1337,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "destructive",
                                    onClick: ()=>handleChangeStatus('rechazado', rejectionReason),
                                    disabled: !rejectionReason || isStatusChanging,
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "mr-2 h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1345,
                                            columnNumber: 45
                                        }, this) : null,
                                        "Confirmar Rechazo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1340,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1336,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1321,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1320,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isClosureDialogOpen,
                onOpenChange: setIsClosureDialogOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Cerrar Permiso de Trabajo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1355,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Complete las verificaciones finales antes de cerrar el permiso."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1356,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1354,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                    label: "¿Se informó al responsable del área?",
                                    value: permit.closure?.informeCulminacion,
                                    onValueChange: (v)=>handleClosureFieldChange('informeCulminacion', v)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1361,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                    label: "¿Área despejada y ordenada?",
                                    value: permit.closure?.areaDespejada,
                                    onValueChange: (v)=>handleClosureFieldChange('areaDespejada', v)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1366,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                    label: "¿Sin partículas o material encendido?",
                                    value: permit.closure?.evidenciaParticulas,
                                    onValueChange: (v)=>handleClosureFieldChange('evidenciaParticulas', v)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1371,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                    label: "¿Se continúa con la labor normal?",
                                    value: permit.closure?.continuaLabor,
                                    onValueChange: (v)=>handleClosureFieldChange('continuaLabor', v)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1376,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                    label: "¿Se retiraron dispositivos de bloqueo?",
                                    value: permit.closure?.dispositivosRetirados,
                                    onValueChange: (v)=>handleClosureFieldChange('dispositivosRetirados', v)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1381,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-gray-500",
                                            children: "Hora de Cierre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1387,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "time",
                                            value: permit.closure?.horaCierre || '',
                                            onChange: (e)=>handleClosureFieldChange('horaCierre', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1388,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1386,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1360,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogClose"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1397,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1396,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-blue-600 hover:bg-blue-700",
                                    onClick: ()=>handleChangeStatus('cerrado'),
                                    disabled: isStatusChanging,
                                    children: [
                                        isStatusChanging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "mr-2 h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1404,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1404,
                                            columnNumber: 96
                                        }, this),
                                        "Confirmar Cierre"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1399,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1395,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1353,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1352,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 794,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ef101067._.js.map