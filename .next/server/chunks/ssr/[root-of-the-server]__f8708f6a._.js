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
"[project]/src/app/(app)/permits/data:5d645a [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7c73b9c7850e737568a6f6f7a4e17cda15a8f18e15":"updatePermitStatus"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "updatePermitStatus": (()=>updatePermitStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updatePermitStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7c73b9c7850e737568a6f6f7a4e17cda15a8f18e15", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updatePermitStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiwgaXNBZG1pblJlYWR5IH0gZnJvbSAnQC9saWIvZmlyZWJhc2UtYWRtaW4nO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB0eXBlIHsgUGVybWl0LCBFeHRlcm5hbFdvcmtlciwgUGVybWl0U3RhdHVzLCBQZXJtaXRDbG9zdXJlLCBBcHByb3ZhbCwgVXNlclJvbGUsIEFuZXhvQWx0dXJhLCBBbmV4b0NvbmZpbmFkbywgQW5leG9FbmVyZ2lhcywgQW5leG9FeGNhdmFjaW9uZXMsIEFuZXhvSXphamUsIEFuZXhvQVRTLCBQZXJtaXRHZW5lcmFsSW5mbywgSnVzdGlmaWNhY2lvbkFUUywgVmFsaWRhY2lvbkRpYXJpYSwgVXNlciwgTm90aWZpY2F0aW9uIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uKTtcbiAgXG4gIC8vIEVudmlhciBjb3JyZW8gZWxlY3Ryw7NuaWNvXG4gIGNvbnN0IHVzZXJFbWFpbCA9IGF3YWl0IGdldEVtYWlsRm9yVXNlcih1c2VySWQpO1xuICBpZiAodXNlckVtYWlsKSB7XG4gICAgYXdhaXQgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsKHtcbiAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICBzdWJqZWN0OiBgQWN0dWFsaXphY2nDs24gZW4gUGVybWlzbyBTR1RDOiAke3Blcm1pdC5udW1iZXIgfHwgcGVybWl0LmlkfWAsXG4gICAgICBodG1sOiBgPHA+JHttZXNzYWdlfTwvcD48cD5QdWVkZXMgdmVyIGxvcyBkZXRhbGxlcyBkZWwgcGVybWlzbyBoYWNpZW5kbyBjbGljIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9wZXJtaXRzLyR7cGVybWl0LmlkfVwiPmFxdcOtPC9hPi48L3A+YFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyAtLS0gRmluIGRlIEZ1bmNpb25lcyBkZSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3Qgd29ya1R5cGVzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ2FsdHVyYXMnOiAnVHJhYmFqbyBlbiBBbHR1cmFzJyxcbiAgJ2NvbmZpbmFkbyc6ICdFc3BhY2lvcyBDb25maW5hZG9zJyxcbiAgJ2VuZXJnaWEnOiAnQ29udHJvbCBkZSBFbmVyZ8OtYXMnLFxuICAnaXphamUnOiAnSXphamUgZGUgQ2FyZ2FzJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHBlcm1pdDogUGFydGlhbDxQZXJtaXQ+KTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWRUeXBlczogc3RyaW5nW10gPSBbXTtcbiAgaWYgKHBlcm1pdC50cmFiYWpvQWx0dXJhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdUcmFiYWpvIGVuIEFsdHVyYXMnKTtcbiAgaWYgKHBlcm1pdC5lc3BhY2lvc0NvbmZpbmFkb3MpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXNwYWNpb3MgQ29uZmluYWRvcycpO1xuICBpZiAocGVybWl0LmNvbnRyb2xFbmVyZ2lhKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyk7XG4gIGlmIChwZXJtaXQuaXphamVDYXJnYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnSXphamUgZGUgQ2FyZ2FzJyk7XG4gIGlmIChwZXJtaXQuZXhjYXZhY2lvbmVzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0V4Y2F2YWNpb25lcycpO1xuICBcbiAgaWYgKHNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKHBlcm1pdC50cmFiYWpvR2VuZXJhbCkgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgZGF0YSBzdHJ1Y3R1cmVcbiAgICBpZiAocGVybWl0LndvcmtUeXBlICYmIEFycmF5LmlzQXJyYXkocGVybWl0LndvcmtUeXBlKSkge1xuICAgICAgcmV0dXJuIHBlcm1pdC53b3JrVHlwZS5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICB9XG4gIHJldHVybiBzZWxlY3RlZFR5cGVzLmpvaW4oJywgJyk7XG59O1xuXG5jb25zdCBnZXRTdGF0dXNUZXh0ID0gKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzVGV4dDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAnYm9ycmFkb3InOiAnQm9ycmFkb3InLFxuICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6ICdQZW5kaWVudGUgZGUgUmV2aXNpw7NuJyxcbiAgICAgICdhcHJvYmFkbyc6ICdBcHJvYmFkbycsXG4gICAgICAnZW5fZWplY3VjaW9uJzogJ0VuIEVqZWN1Y2nDs24nLFxuICAgICAgJ3N1c3BlbmRpZG8nOiAnU3VzcGVuZGlkbycsXG4gICAgICAnY2VycmFkbyc6ICdDZXJyYWRvJyxcbiAgICAgICdyZWNoYXphZG8nOiAnUmVjaGF6YWRvJ1xuICAgIH07XG4gICAgcmV0dXJuIHN0YXR1c1RleHRbc3RhdHVzXSB8fCBzdGF0dXM7XG4gIH07XG5cbmNvbnN0IHNpZ25hdHVyZVJvbGVzOiB7IFtrZXkgaW4gJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnbGlkZXJfc3N0JyB8ICdjb29yZGluYWRvcl9hbHR1cmFzJ106IHN0cmluZyB9ID0ge1xuICBjb29yZGluYWRvcl9hbHR1cmFzOiAnQ09PUkRJTkFET1IgREUgVFJBQkFKT1MgRU4gQUxUVVJBUycsXG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBhdXRvcml6YW50ZTogJ1FVSUVOIEFVVE9SSVpBIChKRUZFUyBZIERVRcORT1MgREUgQVJFQSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIGxpZGVyX3NzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbn07XG5cblxudHlwZSBQZXJtaXRDcmVhdGVEYXRhID0gT21pdDxQZXJtaXQsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICdzdGF0dXMnIHwgJ2NyZWF0ZWRCeScgfCAnbnVtYmVyJyB8ICd1c2VyJyB8ICdhcHByb3ZhbHMnIHwgJ2Nsb3N1cmUnPiAmIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHVzZXJEaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgdXNlckVtYWlsOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyUGhvdG9VUkw6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVybWl0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEpIHtcbiAgaWYgKCFkYXRhLnVzZXJJZCkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VzZXIgbm90IGF1dGhlbnRpY2F0ZWQnIH07XG4gIH1cbiAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgeyB1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgdXNlckVtYWlsLCB1c2VyUGhvdG9VUkwsIC4uLnBlcm1pdERhdGEgfSA9IGRhdGE7XG5cbiAgY29uc3QgaW5pdGlhbEFwcHJvdmFscyA9IHtcbiAgICBzb2xpY2l0YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgYXV0b3JpemFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIG1hbnRlbmltaWVudG86IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGxpZGVyX3NzdDogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgY29vcmRpbmFkb3JfYWx0dXJhczogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAncGVuZGllbnRlX3JldmlzaW9uJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCksXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiBVc2VyLFxuICBjb21tZW50cz86IHN0cmluZyxcbiAgcGVybWl0RGF0YT86IFBlcm1pdCxcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXNpZ25hdHVyZURhdGFVcmwgfHwgIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFsdGFuIHBhcsOhbWV0cm9zIHBhcmEgZ3VhcmRhciBsYSBmaXJtYS4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgICAgICAgLy8gTMOzZ2ljYSBwYXJhIG1hbmVqYXIgZmlybWFzIGRlIGFwcm9iYWNpw7NuIHkgZGUgY2llcnJlL2NhbmNlbGFjacOzblxuICAgICAgICBpZiAocm9sZS5zdGFydHNXaXRoKCdjaWVycmVfJykgfHwgcm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVJvbGUgPSByb2xlID09PSAnY2llcnJlX2F1dG9yaWRhZCcgPyAnYXV0b3JpZGFkJyA6IChyb2xlID09PSAnY2llcnJlX3Jlc3BvbnNhYmxlJyA/ICdyZXNwb25zYWJsZScgOiAnY2FuY2VsYWRvUG9yJyk7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUGF0aCA9IGBjbG9zdXJlLiR7Y2xvc3VyZVJvbGV9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDbG9zdXJlRGF0YSA9IChhd2FpdCBkb2NSZWYuZ2V0KCkpLmRhdGEoKT8uY2xvc3VyZT8uW2Nsb3N1cmVSb2xlXSB8fCB7fTtcblxuICAgICAgICAgICAgdXBkYXRlRGF0YVtjbG9zdXJlUGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcHByb3ZhbERhdGE6IFBhcnRpYWw8QXBwcm92YWw+ID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Fwcm9iYWRvJyxcbiAgICAgICAgICAgICAgICBmaXJtYUFwZXJ0dXJhOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci51aWQsXG4gICAgICAgICAgICAgICAgc2lnbmVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgYW55LFxuICAgICAgICAgICAgICAgIHVzZXJSb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgdXNlckVtcHJlc2E6IHVzZXIuZW1wcmVzYSxcbiAgICAgICAgICAgICAgICBjb21tZW50czogY29tbWVudHMgfHwgJycsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbYGFwcHJvdmFscy4ke3JvbGV9YF0gPSBhcHByb3ZhbERhdGE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBkaWE6IDEsIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIGZlY2hhOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YSAmJiBwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0by1sbGVuYXIgdmFsaWRhY2nDs24gZGlhcmlhIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbGlkYXRpb25zWzBdID0gdmFsaWRhdGlvblBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdXRvLWxsZW5hciB2YWxpZGFjacOzbiBkaWFyaWEgZGUgbGEgYXV0b3JpZGFkXG4gICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbYCR7YW5leG99LnZhbGlkYWNpb24uYXV0b3JpZGFkYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gKioqIE5VRVZBIEzDk0dJQ0EgREUgQVBST0JBQ0nDk04gQVVUT03DgVRJQ0EgKioqXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXBwcm92YWxzID0geyAuLi5wZXJtaXRCZWZvcmVEYXRhPy5hcHByb3ZhbHMsIFtyb2xlXTogYXBwcm92YWxEYXRhIH07XG4gICAgICAgICAgICBjb25zdCBpc1NTVFJlcXVpcmVkID0gcGVybWl0RGF0YT8uYW5leG9BbHR1cmE/LnRhcmVhUmVhbGl6YXI/LmlkID09PSAnb3Rybyc7XG5cbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YT8uY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSAmJiB1cGRhdGVkQXBwcm92YWxzLm1hbnRlbmltaWVudG8/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2kgc2UgY3VtcGxlbiBsYXMgY29uZGljaW9uZXMsIHNlIHBvbmUgZW4gZWplY3VjacOzbi5cbiAgICAgICAgICAgIGlmIChhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOb3RpZmljYWNpw7NuIGFkaWNpb25hbCBzaSBlbCBwZXJtaXNvIHNlIHB1c28gZW4gZWplY3VjacOzblxuICAgICAgICBpZiAodXBkYXRlRGF0YVsnc3RhdHVzJ10gPT09ICdlbl9lamVjdWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRpb25NZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIGFwcm9iYWRvIHkgc2UgZW5jdWVudHJhIGFob3JhIEVOIEVKRUNVQ0nDk04uYDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgdXBkYXRlZFBlcm1pdERhdGEsIGV4ZWN1dGlvbk1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9LFxuICByZWFzb24/OiBzdHJpbmcsXG4gIGNsb3N1cmVEYXRhPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPlxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdhcHByb3ZhbCc7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBhcHJvYmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBNb3Rpdm86ICR7cmVhc29ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnY2FuY2VsbGF0aW9uJzsgLy8gVXNpbmcgY2FuY2VsbGF0aW9uIGZvciBjbG9zZVxuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhwZXJtaXREYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgaWYgKHVpZCAhPT0gY3VycmVudFVzZXIudWlkKSB7IC8vIE5vIG5vdGlmaWNhciBhbCB1c3VhcmlvIHNvYnJlIHN1IHByb3BpYSBhY2Npw7NuXG4gICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgcGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUocGVybWl0SWQ6IHN0cmluZywgYW5leG9OYW1lOiBzdHJpbmcsIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIGluZGV4OiBudW1iZXIsIGRhdGE6IFZhbGlkYWNpb25EaWFyaWEsIHVzZXI6IFVzZXIpIHtcbiAgaWYgKCFwZXJtaXRJZCB8fCAhYW5leG9OYW1lIHx8ICF2YWxpZGF0aW9uVHlwZSB8fCBpbmRleCA8IDAgfHwgIWRhdGEgfHwgIXVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zLicgfTtcbiAgfVxuXG4gIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICB9XG4gICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSB8fCAhYW5leG9EYXRhLnZhbGlkYWNpb24pIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYEVsIGFuZXhvICR7YW5leG9OYW1lfSBvIHN1IGVzdHJ1Y3R1cmEgZGUgdmFsaWRhY2nDs24gbm8gZXhpc3RlbiBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIC8vIC0tLSBMw7NnaWNhIGRlIE5vdGlmaWNhY2nDs24gLS0tXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIC8vIE5vdGlmaWNhY2lvbmVzIGVuIGxhIEFwcCB5IHBvciBFbWFpbFxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB1c2VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RpZmljYWNpw7NuIHBvciBXaGF0c0FwcFxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dQVCog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFNBaVpzQiJ9
}}),
"[project]/src/app/(app)/permits/data:07c314 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7f15bdb6ac388e78a59299d5091891127d63de7bc6":"addSignatureAndNotify"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addSignatureAndNotify": (()=>addSignatureAndNotify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addSignatureAndNotify = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7f15bdb6ac388e78a59299d5091891127d63de7bc6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addSignatureAndNotify"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiwgaXNBZG1pblJlYWR5IH0gZnJvbSAnQC9saWIvZmlyZWJhc2UtYWRtaW4nO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB0eXBlIHsgUGVybWl0LCBFeHRlcm5hbFdvcmtlciwgUGVybWl0U3RhdHVzLCBQZXJtaXRDbG9zdXJlLCBBcHByb3ZhbCwgVXNlclJvbGUsIEFuZXhvQWx0dXJhLCBBbmV4b0NvbmZpbmFkbywgQW5leG9FbmVyZ2lhcywgQW5leG9FeGNhdmFjaW9uZXMsIEFuZXhvSXphamUsIEFuZXhvQVRTLCBQZXJtaXRHZW5lcmFsSW5mbywgSnVzdGlmaWNhY2lvbkFUUywgVmFsaWRhY2lvbkRpYXJpYSwgVXNlciwgTm90aWZpY2F0aW9uIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uKTtcbiAgXG4gIC8vIEVudmlhciBjb3JyZW8gZWxlY3Ryw7NuaWNvXG4gIGNvbnN0IHVzZXJFbWFpbCA9IGF3YWl0IGdldEVtYWlsRm9yVXNlcih1c2VySWQpO1xuICBpZiAodXNlckVtYWlsKSB7XG4gICAgYXdhaXQgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsKHtcbiAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICBzdWJqZWN0OiBgQWN0dWFsaXphY2nDs24gZW4gUGVybWlzbyBTR1RDOiAke3Blcm1pdC5udW1iZXIgfHwgcGVybWl0LmlkfWAsXG4gICAgICBodG1sOiBgPHA+JHttZXNzYWdlfTwvcD48cD5QdWVkZXMgdmVyIGxvcyBkZXRhbGxlcyBkZWwgcGVybWlzbyBoYWNpZW5kbyBjbGljIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9wZXJtaXRzLyR7cGVybWl0LmlkfVwiPmFxdcOtPC9hPi48L3A+YFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyAtLS0gRmluIGRlIEZ1bmNpb25lcyBkZSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3Qgd29ya1R5cGVzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ2FsdHVyYXMnOiAnVHJhYmFqbyBlbiBBbHR1cmFzJyxcbiAgJ2NvbmZpbmFkbyc6ICdFc3BhY2lvcyBDb25maW5hZG9zJyxcbiAgJ2VuZXJnaWEnOiAnQ29udHJvbCBkZSBFbmVyZ8OtYXMnLFxuICAnaXphamUnOiAnSXphamUgZGUgQ2FyZ2FzJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHBlcm1pdDogUGFydGlhbDxQZXJtaXQ+KTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWRUeXBlczogc3RyaW5nW10gPSBbXTtcbiAgaWYgKHBlcm1pdC50cmFiYWpvQWx0dXJhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdUcmFiYWpvIGVuIEFsdHVyYXMnKTtcbiAgaWYgKHBlcm1pdC5lc3BhY2lvc0NvbmZpbmFkb3MpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXNwYWNpb3MgQ29uZmluYWRvcycpO1xuICBpZiAocGVybWl0LmNvbnRyb2xFbmVyZ2lhKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyk7XG4gIGlmIChwZXJtaXQuaXphamVDYXJnYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnSXphamUgZGUgQ2FyZ2FzJyk7XG4gIGlmIChwZXJtaXQuZXhjYXZhY2lvbmVzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0V4Y2F2YWNpb25lcycpO1xuICBcbiAgaWYgKHNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKHBlcm1pdC50cmFiYWpvR2VuZXJhbCkgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgZGF0YSBzdHJ1Y3R1cmVcbiAgICBpZiAocGVybWl0LndvcmtUeXBlICYmIEFycmF5LmlzQXJyYXkocGVybWl0LndvcmtUeXBlKSkge1xuICAgICAgcmV0dXJuIHBlcm1pdC53b3JrVHlwZS5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICB9XG4gIHJldHVybiBzZWxlY3RlZFR5cGVzLmpvaW4oJywgJyk7XG59O1xuXG5jb25zdCBnZXRTdGF0dXNUZXh0ID0gKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzVGV4dDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAnYm9ycmFkb3InOiAnQm9ycmFkb3InLFxuICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6ICdQZW5kaWVudGUgZGUgUmV2aXNpw7NuJyxcbiAgICAgICdhcHJvYmFkbyc6ICdBcHJvYmFkbycsXG4gICAgICAnZW5fZWplY3VjaW9uJzogJ0VuIEVqZWN1Y2nDs24nLFxuICAgICAgJ3N1c3BlbmRpZG8nOiAnU3VzcGVuZGlkbycsXG4gICAgICAnY2VycmFkbyc6ICdDZXJyYWRvJyxcbiAgICAgICdyZWNoYXphZG8nOiAnUmVjaGF6YWRvJ1xuICAgIH07XG4gICAgcmV0dXJuIHN0YXR1c1RleHRbc3RhdHVzXSB8fCBzdGF0dXM7XG4gIH07XG5cbmNvbnN0IHNpZ25hdHVyZVJvbGVzOiB7IFtrZXkgaW4gJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnbGlkZXJfc3N0JyB8ICdjb29yZGluYWRvcl9hbHR1cmFzJ106IHN0cmluZyB9ID0ge1xuICBjb29yZGluYWRvcl9hbHR1cmFzOiAnQ09PUkRJTkFET1IgREUgVFJBQkFKT1MgRU4gQUxUVVJBUycsXG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBhdXRvcml6YW50ZTogJ1FVSUVOIEFVVE9SSVpBIChKRUZFUyBZIERVRcORT1MgREUgQVJFQSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIGxpZGVyX3NzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbn07XG5cblxudHlwZSBQZXJtaXRDcmVhdGVEYXRhID0gT21pdDxQZXJtaXQsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICdzdGF0dXMnIHwgJ2NyZWF0ZWRCeScgfCAnbnVtYmVyJyB8ICd1c2VyJyB8ICdhcHByb3ZhbHMnIHwgJ2Nsb3N1cmUnPiAmIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHVzZXJEaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgdXNlckVtYWlsOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyUGhvdG9VUkw6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVybWl0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEpIHtcbiAgaWYgKCFkYXRhLnVzZXJJZCkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VzZXIgbm90IGF1dGhlbnRpY2F0ZWQnIH07XG4gIH1cbiAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgeyB1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgdXNlckVtYWlsLCB1c2VyUGhvdG9VUkwsIC4uLnBlcm1pdERhdGEgfSA9IGRhdGE7XG5cbiAgY29uc3QgaW5pdGlhbEFwcHJvdmFscyA9IHtcbiAgICBzb2xpY2l0YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgYXV0b3JpemFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIG1hbnRlbmltaWVudG86IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGxpZGVyX3NzdDogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgY29vcmRpbmFkb3JfYWx0dXJhczogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAncGVuZGllbnRlX3JldmlzaW9uJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCksXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiBVc2VyLFxuICBjb21tZW50cz86IHN0cmluZyxcbiAgcGVybWl0RGF0YT86IFBlcm1pdCxcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXNpZ25hdHVyZURhdGFVcmwgfHwgIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFsdGFuIHBhcsOhbWV0cm9zIHBhcmEgZ3VhcmRhciBsYSBmaXJtYS4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgICAgICAgLy8gTMOzZ2ljYSBwYXJhIG1hbmVqYXIgZmlybWFzIGRlIGFwcm9iYWNpw7NuIHkgZGUgY2llcnJlL2NhbmNlbGFjacOzblxuICAgICAgICBpZiAocm9sZS5zdGFydHNXaXRoKCdjaWVycmVfJykgfHwgcm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVJvbGUgPSByb2xlID09PSAnY2llcnJlX2F1dG9yaWRhZCcgPyAnYXV0b3JpZGFkJyA6IChyb2xlID09PSAnY2llcnJlX3Jlc3BvbnNhYmxlJyA/ICdyZXNwb25zYWJsZScgOiAnY2FuY2VsYWRvUG9yJyk7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUGF0aCA9IGBjbG9zdXJlLiR7Y2xvc3VyZVJvbGV9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDbG9zdXJlRGF0YSA9IChhd2FpdCBkb2NSZWYuZ2V0KCkpLmRhdGEoKT8uY2xvc3VyZT8uW2Nsb3N1cmVSb2xlXSB8fCB7fTtcblxuICAgICAgICAgICAgdXBkYXRlRGF0YVtjbG9zdXJlUGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcHByb3ZhbERhdGE6IFBhcnRpYWw8QXBwcm92YWw+ID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Fwcm9iYWRvJyxcbiAgICAgICAgICAgICAgICBmaXJtYUFwZXJ0dXJhOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci51aWQsXG4gICAgICAgICAgICAgICAgc2lnbmVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgYW55LFxuICAgICAgICAgICAgICAgIHVzZXJSb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgdXNlckVtcHJlc2E6IHVzZXIuZW1wcmVzYSxcbiAgICAgICAgICAgICAgICBjb21tZW50czogY29tbWVudHMgfHwgJycsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbYGFwcHJvdmFscy4ke3JvbGV9YF0gPSBhcHByb3ZhbERhdGE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBkaWE6IDEsIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIGZlY2hhOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YSAmJiBwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0by1sbGVuYXIgdmFsaWRhY2nDs24gZGlhcmlhIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbGlkYXRpb25zWzBdID0gdmFsaWRhdGlvblBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdXRvLWxsZW5hciB2YWxpZGFjacOzbiBkaWFyaWEgZGUgbGEgYXV0b3JpZGFkXG4gICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbYCR7YW5leG99LnZhbGlkYWNpb24uYXV0b3JpZGFkYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gKioqIE5VRVZBIEzDk0dJQ0EgREUgQVBST0JBQ0nDk04gQVVUT03DgVRJQ0EgKioqXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXBwcm92YWxzID0geyAuLi5wZXJtaXRCZWZvcmVEYXRhPy5hcHByb3ZhbHMsIFtyb2xlXTogYXBwcm92YWxEYXRhIH07XG4gICAgICAgICAgICBjb25zdCBpc1NTVFJlcXVpcmVkID0gcGVybWl0RGF0YT8uYW5leG9BbHR1cmE/LnRhcmVhUmVhbGl6YXI/LmlkID09PSAnb3Rybyc7XG5cbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YT8uY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSAmJiB1cGRhdGVkQXBwcm92YWxzLm1hbnRlbmltaWVudG8/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2kgc2UgY3VtcGxlbiBsYXMgY29uZGljaW9uZXMsIHNlIHBvbmUgZW4gZWplY3VjacOzbi5cbiAgICAgICAgICAgIGlmIChhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOb3RpZmljYWNpw7NuIGFkaWNpb25hbCBzaSBlbCBwZXJtaXNvIHNlIHB1c28gZW4gZWplY3VjacOzblxuICAgICAgICBpZiAodXBkYXRlRGF0YVsnc3RhdHVzJ10gPT09ICdlbl9lamVjdWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRpb25NZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIGFwcm9iYWRvIHkgc2UgZW5jdWVudHJhIGFob3JhIEVOIEVKRUNVQ0nDk04uYDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgdXBkYXRlZFBlcm1pdERhdGEsIGV4ZWN1dGlvbk1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9LFxuICByZWFzb24/OiBzdHJpbmcsXG4gIGNsb3N1cmVEYXRhPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPlxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdhcHByb3ZhbCc7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBhcHJvYmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBNb3Rpdm86ICR7cmVhc29ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnY2FuY2VsbGF0aW9uJzsgLy8gVXNpbmcgY2FuY2VsbGF0aW9uIGZvciBjbG9zZVxuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhwZXJtaXREYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgaWYgKHVpZCAhPT0gY3VycmVudFVzZXIudWlkKSB7IC8vIE5vIG5vdGlmaWNhciBhbCB1c3VhcmlvIHNvYnJlIHN1IHByb3BpYSBhY2Npw7NuXG4gICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgcGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUocGVybWl0SWQ6IHN0cmluZywgYW5leG9OYW1lOiBzdHJpbmcsIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIGluZGV4OiBudW1iZXIsIGRhdGE6IFZhbGlkYWNpb25EaWFyaWEsIHVzZXI6IFVzZXIpIHtcbiAgaWYgKCFwZXJtaXRJZCB8fCAhYW5leG9OYW1lIHx8ICF2YWxpZGF0aW9uVHlwZSB8fCBpbmRleCA8IDAgfHwgIWRhdGEgfHwgIXVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zLicgfTtcbiAgfVxuXG4gIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICB9XG4gICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSB8fCAhYW5leG9EYXRhLnZhbGlkYWNpb24pIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYEVsIGFuZXhvICR7YW5leG9OYW1lfSBvIHN1IGVzdHJ1Y3R1cmEgZGUgdmFsaWRhY2nDs24gbm8gZXhpc3RlbiBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIC8vIC0tLSBMw7NnaWNhIGRlIE5vdGlmaWNhY2nDs24gLS0tXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIC8vIE5vdGlmaWNhY2lvbmVzIGVuIGxhIEFwcCB5IHBvciBFbWFpbFxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB1c2VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RpZmljYWNpw7NuIHBvciBXaGF0c0FwcFxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dQVCog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiK1NBa1FzQiJ9
}}),
"[project]/src/app/(app)/permits/data:6c4d34 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7edc6233c637b331b2fa6dba912da67e147424b389":"addDailyValidationSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addDailyValidationSignature": (()=>addDailyValidationSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addDailyValidationSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7edc6233c637b331b2fa6dba912da67e147424b389", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addDailyValidationSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiwgaXNBZG1pblJlYWR5IH0gZnJvbSAnQC9saWIvZmlyZWJhc2UtYWRtaW4nO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB0eXBlIHsgUGVybWl0LCBFeHRlcm5hbFdvcmtlciwgUGVybWl0U3RhdHVzLCBQZXJtaXRDbG9zdXJlLCBBcHByb3ZhbCwgVXNlclJvbGUsIEFuZXhvQWx0dXJhLCBBbmV4b0NvbmZpbmFkbywgQW5leG9FbmVyZ2lhcywgQW5leG9FeGNhdmFjaW9uZXMsIEFuZXhvSXphamUsIEFuZXhvQVRTLCBQZXJtaXRHZW5lcmFsSW5mbywgSnVzdGlmaWNhY2lvbkFUUywgVmFsaWRhY2lvbkRpYXJpYSwgVXNlciwgTm90aWZpY2F0aW9uIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uKTtcbiAgXG4gIC8vIEVudmlhciBjb3JyZW8gZWxlY3Ryw7NuaWNvXG4gIGNvbnN0IHVzZXJFbWFpbCA9IGF3YWl0IGdldEVtYWlsRm9yVXNlcih1c2VySWQpO1xuICBpZiAodXNlckVtYWlsKSB7XG4gICAgYXdhaXQgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsKHtcbiAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICBzdWJqZWN0OiBgQWN0dWFsaXphY2nDs24gZW4gUGVybWlzbyBTR1RDOiAke3Blcm1pdC5udW1iZXIgfHwgcGVybWl0LmlkfWAsXG4gICAgICBodG1sOiBgPHA+JHttZXNzYWdlfTwvcD48cD5QdWVkZXMgdmVyIGxvcyBkZXRhbGxlcyBkZWwgcGVybWlzbyBoYWNpZW5kbyBjbGljIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9wZXJtaXRzLyR7cGVybWl0LmlkfVwiPmFxdcOtPC9hPi48L3A+YFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyAtLS0gRmluIGRlIEZ1bmNpb25lcyBkZSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3Qgd29ya1R5cGVzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ2FsdHVyYXMnOiAnVHJhYmFqbyBlbiBBbHR1cmFzJyxcbiAgJ2NvbmZpbmFkbyc6ICdFc3BhY2lvcyBDb25maW5hZG9zJyxcbiAgJ2VuZXJnaWEnOiAnQ29udHJvbCBkZSBFbmVyZ8OtYXMnLFxuICAnaXphamUnOiAnSXphamUgZGUgQ2FyZ2FzJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHBlcm1pdDogUGFydGlhbDxQZXJtaXQ+KTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWRUeXBlczogc3RyaW5nW10gPSBbXTtcbiAgaWYgKHBlcm1pdC50cmFiYWpvQWx0dXJhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdUcmFiYWpvIGVuIEFsdHVyYXMnKTtcbiAgaWYgKHBlcm1pdC5lc3BhY2lvc0NvbmZpbmFkb3MpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXNwYWNpb3MgQ29uZmluYWRvcycpO1xuICBpZiAocGVybWl0LmNvbnRyb2xFbmVyZ2lhKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyk7XG4gIGlmIChwZXJtaXQuaXphamVDYXJnYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnSXphamUgZGUgQ2FyZ2FzJyk7XG4gIGlmIChwZXJtaXQuZXhjYXZhY2lvbmVzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0V4Y2F2YWNpb25lcycpO1xuICBcbiAgaWYgKHNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKHBlcm1pdC50cmFiYWpvR2VuZXJhbCkgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgZGF0YSBzdHJ1Y3R1cmVcbiAgICBpZiAocGVybWl0LndvcmtUeXBlICYmIEFycmF5LmlzQXJyYXkocGVybWl0LndvcmtUeXBlKSkge1xuICAgICAgcmV0dXJuIHBlcm1pdC53b3JrVHlwZS5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICB9XG4gIHJldHVybiBzZWxlY3RlZFR5cGVzLmpvaW4oJywgJyk7XG59O1xuXG5jb25zdCBnZXRTdGF0dXNUZXh0ID0gKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzVGV4dDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAnYm9ycmFkb3InOiAnQm9ycmFkb3InLFxuICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6ICdQZW5kaWVudGUgZGUgUmV2aXNpw7NuJyxcbiAgICAgICdhcHJvYmFkbyc6ICdBcHJvYmFkbycsXG4gICAgICAnZW5fZWplY3VjaW9uJzogJ0VuIEVqZWN1Y2nDs24nLFxuICAgICAgJ3N1c3BlbmRpZG8nOiAnU3VzcGVuZGlkbycsXG4gICAgICAnY2VycmFkbyc6ICdDZXJyYWRvJyxcbiAgICAgICdyZWNoYXphZG8nOiAnUmVjaGF6YWRvJ1xuICAgIH07XG4gICAgcmV0dXJuIHN0YXR1c1RleHRbc3RhdHVzXSB8fCBzdGF0dXM7XG4gIH07XG5cbmNvbnN0IHNpZ25hdHVyZVJvbGVzOiB7IFtrZXkgaW4gJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnbGlkZXJfc3N0JyB8ICdjb29yZGluYWRvcl9hbHR1cmFzJ106IHN0cmluZyB9ID0ge1xuICBjb29yZGluYWRvcl9hbHR1cmFzOiAnQ09PUkRJTkFET1IgREUgVFJBQkFKT1MgRU4gQUxUVVJBUycsXG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBhdXRvcml6YW50ZTogJ1FVSUVOIEFVVE9SSVpBIChKRUZFUyBZIERVRcORT1MgREUgQVJFQSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIGxpZGVyX3NzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbn07XG5cblxudHlwZSBQZXJtaXRDcmVhdGVEYXRhID0gT21pdDxQZXJtaXQsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICdzdGF0dXMnIHwgJ2NyZWF0ZWRCeScgfCAnbnVtYmVyJyB8ICd1c2VyJyB8ICdhcHByb3ZhbHMnIHwgJ2Nsb3N1cmUnPiAmIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHVzZXJEaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgdXNlckVtYWlsOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyUGhvdG9VUkw6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVybWl0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEpIHtcbiAgaWYgKCFkYXRhLnVzZXJJZCkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VzZXIgbm90IGF1dGhlbnRpY2F0ZWQnIH07XG4gIH1cbiAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgeyB1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgdXNlckVtYWlsLCB1c2VyUGhvdG9VUkwsIC4uLnBlcm1pdERhdGEgfSA9IGRhdGE7XG5cbiAgY29uc3QgaW5pdGlhbEFwcHJvdmFscyA9IHtcbiAgICBzb2xpY2l0YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgYXV0b3JpemFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIG1hbnRlbmltaWVudG86IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGxpZGVyX3NzdDogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgY29vcmRpbmFkb3JfYWx0dXJhczogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAncGVuZGllbnRlX3JldmlzaW9uJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCksXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiBVc2VyLFxuICBjb21tZW50cz86IHN0cmluZyxcbiAgcGVybWl0RGF0YT86IFBlcm1pdCxcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXNpZ25hdHVyZURhdGFVcmwgfHwgIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFsdGFuIHBhcsOhbWV0cm9zIHBhcmEgZ3VhcmRhciBsYSBmaXJtYS4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgICAgICAgLy8gTMOzZ2ljYSBwYXJhIG1hbmVqYXIgZmlybWFzIGRlIGFwcm9iYWNpw7NuIHkgZGUgY2llcnJlL2NhbmNlbGFjacOzblxuICAgICAgICBpZiAocm9sZS5zdGFydHNXaXRoKCdjaWVycmVfJykgfHwgcm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVJvbGUgPSByb2xlID09PSAnY2llcnJlX2F1dG9yaWRhZCcgPyAnYXV0b3JpZGFkJyA6IChyb2xlID09PSAnY2llcnJlX3Jlc3BvbnNhYmxlJyA/ICdyZXNwb25zYWJsZScgOiAnY2FuY2VsYWRvUG9yJyk7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUGF0aCA9IGBjbG9zdXJlLiR7Y2xvc3VyZVJvbGV9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDbG9zdXJlRGF0YSA9IChhd2FpdCBkb2NSZWYuZ2V0KCkpLmRhdGEoKT8uY2xvc3VyZT8uW2Nsb3N1cmVSb2xlXSB8fCB7fTtcblxuICAgICAgICAgICAgdXBkYXRlRGF0YVtjbG9zdXJlUGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcHByb3ZhbERhdGE6IFBhcnRpYWw8QXBwcm92YWw+ID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Fwcm9iYWRvJyxcbiAgICAgICAgICAgICAgICBmaXJtYUFwZXJ0dXJhOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci51aWQsXG4gICAgICAgICAgICAgICAgc2lnbmVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgYW55LFxuICAgICAgICAgICAgICAgIHVzZXJSb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgdXNlckVtcHJlc2E6IHVzZXIuZW1wcmVzYSxcbiAgICAgICAgICAgICAgICBjb21tZW50czogY29tbWVudHMgfHwgJycsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbYGFwcHJvdmFscy4ke3JvbGV9YF0gPSBhcHByb3ZhbERhdGE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBkaWE6IDEsIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIGZlY2hhOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YSAmJiBwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0by1sbGVuYXIgdmFsaWRhY2nDs24gZGlhcmlhIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbGlkYXRpb25zWzBdID0gdmFsaWRhdGlvblBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdXRvLWxsZW5hciB2YWxpZGFjacOzbiBkaWFyaWEgZGUgbGEgYXV0b3JpZGFkXG4gICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbYCR7YW5leG99LnZhbGlkYWNpb24uYXV0b3JpZGFkYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gKioqIE5VRVZBIEzDk0dJQ0EgREUgQVBST0JBQ0nDk04gQVVUT03DgVRJQ0EgKioqXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXBwcm92YWxzID0geyAuLi5wZXJtaXRCZWZvcmVEYXRhPy5hcHByb3ZhbHMsIFtyb2xlXTogYXBwcm92YWxEYXRhIH07XG4gICAgICAgICAgICBjb25zdCBpc1NTVFJlcXVpcmVkID0gcGVybWl0RGF0YT8uYW5leG9BbHR1cmE/LnRhcmVhUmVhbGl6YXI/LmlkID09PSAnb3Rybyc7XG5cbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YT8uY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSAmJiB1cGRhdGVkQXBwcm92YWxzLm1hbnRlbmltaWVudG8/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2kgc2UgY3VtcGxlbiBsYXMgY29uZGljaW9uZXMsIHNlIHBvbmUgZW4gZWplY3VjacOzbi5cbiAgICAgICAgICAgIGlmIChhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOb3RpZmljYWNpw7NuIGFkaWNpb25hbCBzaSBlbCBwZXJtaXNvIHNlIHB1c28gZW4gZWplY3VjacOzblxuICAgICAgICBpZiAodXBkYXRlRGF0YVsnc3RhdHVzJ10gPT09ICdlbl9lamVjdWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRpb25NZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIGFwcm9iYWRvIHkgc2UgZW5jdWVudHJhIGFob3JhIEVOIEVKRUNVQ0nDk04uYDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgdXBkYXRlZFBlcm1pdERhdGEsIGV4ZWN1dGlvbk1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9LFxuICByZWFzb24/OiBzdHJpbmcsXG4gIGNsb3N1cmVEYXRhPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPlxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdhcHByb3ZhbCc7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBhcHJvYmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBNb3Rpdm86ICR7cmVhc29ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnY2FuY2VsbGF0aW9uJzsgLy8gVXNpbmcgY2FuY2VsbGF0aW9uIGZvciBjbG9zZVxuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhwZXJtaXREYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgaWYgKHVpZCAhPT0gY3VycmVudFVzZXIudWlkKSB7IC8vIE5vIG5vdGlmaWNhciBhbCB1c3VhcmlvIHNvYnJlIHN1IHByb3BpYSBhY2Npw7NuXG4gICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgcGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUocGVybWl0SWQ6IHN0cmluZywgYW5leG9OYW1lOiBzdHJpbmcsIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIGluZGV4OiBudW1iZXIsIGRhdGE6IFZhbGlkYWNpb25EaWFyaWEsIHVzZXI6IFVzZXIpIHtcbiAgaWYgKCFwZXJtaXRJZCB8fCAhYW5leG9OYW1lIHx8ICF2YWxpZGF0aW9uVHlwZSB8fCBpbmRleCA8IDAgfHwgIWRhdGEgfHwgIXVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zLicgfTtcbiAgfVxuXG4gIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICB9XG4gICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSB8fCAhYW5leG9EYXRhLnZhbGlkYWNpb24pIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYEVsIGFuZXhvICR7YW5leG9OYW1lfSBvIHN1IGVzdHJ1Y3R1cmEgZGUgdmFsaWRhY2nDs24gbm8gZXhpc3RlbiBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIC8vIC0tLSBMw7NnaWNhIGRlIE5vdGlmaWNhY2nDs24gLS0tXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIC8vIE5vdGlmaWNhY2lvbmVzIGVuIGxhIEFwcCB5IHBvciBFbWFpbFxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB1c2VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RpZmljYWNpw7NuIHBvciBXaGF0c0FwcFxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dQVCog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVRBNmVzQiJ9
}}),
"[project]/src/app/(app)/permits/data:252d8b [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4":"addWorkerSignature"},"src/app/(app)/permits/actions.ts",""] */ __turbopack_context__.s({
    "addWorkerSignature": (()=>addWorkerSignature)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addWorkerSignature = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("78ef86f0b5ad2d150f478f7151b2ac622c1a91d8a4", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addWorkerSignature"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWRtaW5EYiwgaXNBZG1pblJlYWR5IH0gZnJvbSAnQC9saWIvZmlyZWJhc2UtYWRtaW4nO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB0eXBlIHsgUGVybWl0LCBFeHRlcm5hbFdvcmtlciwgUGVybWl0U3RhdHVzLCBQZXJtaXRDbG9zdXJlLCBBcHByb3ZhbCwgVXNlclJvbGUsIEFuZXhvQWx0dXJhLCBBbmV4b0NvbmZpbmFkbywgQW5leG9FbmVyZ2lhcywgQW5leG9FeGNhdmFjaW9uZXMsIEFuZXhvSXphamUsIEFuZXhvQVRTLCBQZXJtaXRHZW5lcmFsSW5mbywgSnVzdGlmaWNhY2lvbkFUUywgVmFsaWRhY2lvbkRpYXJpYSwgVXNlciwgTm90aWZpY2F0aW9uIH0gZnJvbSAnQC90eXBlcyc7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSAnZmlyZWJhc2UtYWRtaW4vZmlyZXN0b3JlJztcbmltcG9ydCB7IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbiB9IGZyb20gJ0AvbGliL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RW1haWxGb3JVc2VyLCBzZW5kUGVybWl0VXBkYXRlRW1haWwgfSBmcm9tICdAL2xpYi9lbWFpbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuY29uZmlnKCk7XG5cbi8vIC0tLSBGdW5jaW9uZXMgQXV4aWxpYXJlcyBwYXJhIE5vdGlmaWNhY2lvbmVzIC0tLVxuXG5jb25zdCBnZXRJbnZvbHZlZFVzZXJzID0gYXN5bmMgKHBlcm1pdDogUGVybWl0KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICBjb25zdCB1c2VySWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gMS4gQ3JlYWRvciBkZWwgcGVybWlzb1xuICBpZiAocGVybWl0LmNyZWF0ZWRCeSkge1xuICAgIHVzZXJJZHMuYWRkKHBlcm1pdC5jcmVhdGVkQnkpO1xuICB9XG5cbiAgLy8gMi4gVXN1YXJpb3MgcXVlIGhhbiBmaXJtYWRvXG4gIE9iamVjdC52YWx1ZXMocGVybWl0LmFwcHJvdmFscyB8fCB7fSkuZm9yRWFjaChhcHByb3ZhbCA9PiB7XG4gICAgaWYgKGFwcHJvdmFsICYmIGFwcHJvdmFsLnVzZXJJZCkge1xuICAgICAgdXNlcklkcy5hZGQoYXBwcm92YWwudXNlcklkKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIDMuIFJvbGVzIGFkbWluaXN0cmF0aXZvcyBvIGRlIHN1cGVydmlzacOzbiBxdWUgZGViZXLDrWFuIHNlciBub3RpZmljYWRvc1xuICBjb25zdCBhZG1pbnNRdWVyeSA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigndXNlcnMnKS53aGVyZSgncm9sZScsICdpbicsIFsnYWRtaW4nLCAnYXV0b3JpemFudGUnLCAnbGlkZXJfc3N0J10pLmdldCgpO1xuICBhZG1pbnNRdWVyeS5mb3JFYWNoKGRvYyA9PiB1c2VySWRzLmFkZChkb2MuaWQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh1c2VySWRzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChcbiAgdXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pdDogUGVybWl0LFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHR5cGU6IE5vdGlmaWNhdGlvblsndHlwZSddLFxuICB0cmlnZ2VyZWRCeTogeyB1aWQ6IHN0cmluZywgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGwgfVxuKSA9PiB7XG4gIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcbiAgICB1c2VySWQsXG4gICAgcGVybWl0SWQ6IHBlcm1pdC5pZCxcbiAgICBwZXJtaXROdW1iZXI6IHBlcm1pdC5udW1iZXIgfHwgJycsXG4gICAgbWVzc2FnZSxcbiAgICB0eXBlLFxuICAgIGlzUmVhZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgIHRyaWdnZXJlZEJ5LFxuICB9O1xuICBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ25vdGlmaWNhdGlvbnMnKS5hZGQobm90aWZpY2F0aW9uKTtcbiAgXG4gIC8vIEVudmlhciBjb3JyZW8gZWxlY3Ryw7NuaWNvXG4gIGNvbnN0IHVzZXJFbWFpbCA9IGF3YWl0IGdldEVtYWlsRm9yVXNlcih1c2VySWQpO1xuICBpZiAodXNlckVtYWlsKSB7XG4gICAgYXdhaXQgc2VuZFBlcm1pdFVwZGF0ZUVtYWlsKHtcbiAgICAgIHRvOiB1c2VyRW1haWwsXG4gICAgICBzdWJqZWN0OiBgQWN0dWFsaXphY2nDs24gZW4gUGVybWlzbyBTR1RDOiAke3Blcm1pdC5udW1iZXIgfHwgcGVybWl0LmlkfWAsXG4gICAgICBodG1sOiBgPHA+JHttZXNzYWdlfTwvcD48cD5QdWVkZXMgdmVyIGxvcyBkZXRhbGxlcyBkZWwgcGVybWlzbyBoYWNpZW5kbyBjbGljIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMfS9wZXJtaXRzLyR7cGVybWl0LmlkfVwiPmFxdcOtPC9hPi48L3A+YFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyAtLS0gRmluIGRlIEZ1bmNpb25lcyBkZSBOb3RpZmljYWNpb25lcyAtLS1cblxuY29uc3Qgd29ya1R5cGVzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ2FsdHVyYXMnOiAnVHJhYmFqbyBlbiBBbHR1cmFzJyxcbiAgJ2NvbmZpbmFkbyc6ICdFc3BhY2lvcyBDb25maW5hZG9zJyxcbiAgJ2VuZXJnaWEnOiAnQ29udHJvbCBkZSBFbmVyZ8OtYXMnLFxuICAnaXphamUnOiAnSXphamUgZGUgQ2FyZ2FzJyxcbiAgJ2V4Y2F2YWNpb24nOiAnRXhjYXZhY2lvbmVzJyxcbiAgJ2dlbmVyYWwnOiAnVHJhYmFqbyBHZW5lcmFsJ1xufTtcblxuY29uc3QgZ2V0V29ya1R5cGVzU3RyaW5nID0gKHBlcm1pdDogUGFydGlhbDxQZXJtaXQ+KTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWRUeXBlczogc3RyaW5nW10gPSBbXTtcbiAgaWYgKHBlcm1pdC50cmFiYWpvQWx0dXJhcykgc2VsZWN0ZWRUeXBlcy5wdXNoKCdUcmFiYWpvIGVuIEFsdHVyYXMnKTtcbiAgaWYgKHBlcm1pdC5lc3BhY2lvc0NvbmZpbmFkb3MpIHNlbGVjdGVkVHlwZXMucHVzaCgnRXNwYWNpb3MgQ29uZmluYWRvcycpO1xuICBpZiAocGVybWl0LmNvbnRyb2xFbmVyZ2lhKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0NvbnRyb2wgZGUgRW5lcmfDrWFzJyk7XG4gIGlmIChwZXJtaXQuaXphamVDYXJnYXMpIHNlbGVjdGVkVHlwZXMucHVzaCgnSXphamUgZGUgQ2FyZ2FzJyk7XG4gIGlmIChwZXJtaXQuZXhjYXZhY2lvbmVzKSBzZWxlY3RlZFR5cGVzLnB1c2goJ0V4Y2F2YWNpb25lcycpO1xuICBcbiAgaWYgKHNlbGVjdGVkVHlwZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKHBlcm1pdC50cmFiYWpvR2VuZXJhbCkgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgZGF0YSBzdHJ1Y3R1cmVcbiAgICBpZiAocGVybWl0LndvcmtUeXBlICYmIEFycmF5LmlzQXJyYXkocGVybWl0LndvcmtUeXBlKSkge1xuICAgICAgcmV0dXJuIHBlcm1pdC53b3JrVHlwZS5tYXAoa2V5ID0+IHdvcmtUeXBlc01hcFtrZXldIHx8IGtleSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgcmV0dXJuICdUcmFiYWpvIEdlbmVyYWwnO1xuICB9XG4gIHJldHVybiBzZWxlY3RlZFR5cGVzLmpvaW4oJywgJyk7XG59O1xuXG5jb25zdCBnZXRTdGF0dXNUZXh0ID0gKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzVGV4dDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAnYm9ycmFkb3InOiAnQm9ycmFkb3InLFxuICAgICAgJ3BlbmRpZW50ZV9yZXZpc2lvbic6ICdQZW5kaWVudGUgZGUgUmV2aXNpw7NuJyxcbiAgICAgICdhcHJvYmFkbyc6ICdBcHJvYmFkbycsXG4gICAgICAnZW5fZWplY3VjaW9uJzogJ0VuIEVqZWN1Y2nDs24nLFxuICAgICAgJ3N1c3BlbmRpZG8nOiAnU3VzcGVuZGlkbycsXG4gICAgICAnY2VycmFkbyc6ICdDZXJyYWRvJyxcbiAgICAgICdyZWNoYXphZG8nOiAnUmVjaGF6YWRvJ1xuICAgIH07XG4gICAgcmV0dXJuIHN0YXR1c1RleHRbc3RhdHVzXSB8fCBzdGF0dXM7XG4gIH07XG5cbmNvbnN0IHNpZ25hdHVyZVJvbGVzOiB7IFtrZXkgaW4gJ3NvbGljaXRhbnRlJyB8ICdhdXRvcml6YW50ZScgfCAnbWFudGVuaW1pZW50bycgfCAnbGlkZXJfc3N0JyB8ICdjb29yZGluYWRvcl9hbHR1cmFzJ106IHN0cmluZyB9ID0ge1xuICBjb29yZGluYWRvcl9hbHR1cmFzOiAnQ09PUkRJTkFET1IgREUgVFJBQkFKT1MgRU4gQUxUVVJBUycsXG4gIHNvbGljaXRhbnRlOiAnUVVJRU4gU09MSUNJVEEgKEzDjURFUiBBIENBUkdPIERFTCBFUVVJUE8gRUpFQ1VUQU5URSknLFxuICBhdXRvcml6YW50ZTogJ1FVSUVOIEFVVE9SSVpBIChKRUZFUyBZIERVRcORT1MgREUgQVJFQSknLFxuICBtYW50ZW5pbWllbnRvOiAnUEVSU09OQUwgREUgTUFOVEVOSU1JRU5UTycsXG4gIGxpZGVyX3NzdDogJ0FSRUEgU1NUIChzaSBhcGxpY2EpJyxcbn07XG5cblxudHlwZSBQZXJtaXRDcmVhdGVEYXRhID0gT21pdDxQZXJtaXQsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICdzdGF0dXMnIHwgJ2NyZWF0ZWRCeScgfCAnbnVtYmVyJyB8ICd1c2VyJyB8ICdhcHByb3ZhbHMnIHwgJ2Nsb3N1cmUnPiAmIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHVzZXJEaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgdXNlckVtYWlsOiBzdHJpbmcgfCBudWxsO1xuICB1c2VyUGhvdG9VUkw6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVybWl0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEpIHtcbiAgaWYgKCFkYXRhLnVzZXJJZCkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VzZXIgbm90IGF1dGhlbnRpY2F0ZWQnIH07XG4gIH1cbiAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgeyB1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgdXNlckVtYWlsLCB1c2VyUGhvdG9VUkwsIC4uLnBlcm1pdERhdGEgfSA9IGRhdGE7XG5cbiAgY29uc3QgaW5pdGlhbEFwcHJvdmFscyA9IHtcbiAgICBzb2xpY2l0YW50ZTogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgYXV0b3JpemFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIG1hbnRlbmltaWVudG86IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGxpZGVyX3NzdDogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gICAgY29vcmRpbmFkb3JfYWx0dXJhczogeyBzdGF0dXM6ICdwZW5kaWVudGUnIGFzIGNvbnN0IH0sXG4gIH07XG5cbiAgY29uc3QgcGVybWl0UGF5bG9hZDogUGFydGlhbDxQZXJtaXQ+ID0ge1xuICAgIC4uLnBlcm1pdERhdGEsXG4gICAgc3RhdHVzOiAncGVuZGllbnRlX3JldmlzaW9uJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICBjcmVhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCksXG4gICAgdXNlcjoge1xuICAgICAgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRW1haWwsXG4gICAgICBwaG90b1VSTDogdXNlclBob3RvVVJMLFxuICAgIH0sXG4gICAgYXBwcm92YWxzOiBpbml0aWFsQXBwcm92YWxzLFxuICAgIGNsb3N1cmU6IHt9LFxuICB9O1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NSZWYgPSBhd2FpdCBhZG1pbkRiLmNvbGxlY3Rpb24oJ3Blcm1pdHMnKS5hZGQocGVybWl0UGF5bG9hZCBhcyBhbnkpO1xuICAgIGNvbnN0IHBlcm1pdE51bWJlciA9IGBQVC0ke0RhdGUubm93KCl9LSR7ZG9jUmVmLmlkLnN1YnN0cmluZygwLCA2KS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7IG51bWJlcjogcGVybWl0TnVtYmVyIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCfinIUgW0FjdGlvbl0gUGVybWlzbyBjcmVhZG8gY29uIMOpeGl0byBlbiBGaXJlc3RvcmU6JywgZG9jUmVmLmlkKTtcblxuICAgIGNvbnN0IGNyZWF0ZWRQZXJtaXQgPSB7IC4uLnBlcm1pdFBheWxvYWQsIGlkOiBkb2NSZWYuaWQsIG51bWJlcjogcGVybWl0TnVtYmVyIH0gYXMgUGVybWl0O1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGNyZWF0ZWRQZXJtaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgU2UgY3Jlw7MgdW4gbnVldm8gcGVybWlzbyBkZSB0cmFiYWpvOiAjJHtwZXJtaXROdW1iZXJ9YDtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VySWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIGNyZWFkb3Igc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgY3JlYXRlZFBlcm1pdCwgbWVzc2FnZSwgJ2NyZWF0aW9uJywgeyB1aWQ6IHVzZXJJZCwgZGlzcGxheU5hbWU6IHVzZXJEaXNwbGF5TmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB3b3JrVHlwZXNUZXh0ID0gZ2V0V29ya1R5cGVzU3RyaW5nKHBlcm1pdFBheWxvYWQpO1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtkb2NSZWYuaWR9YDtcbiAgICBcbiAgICBjb25zdCBtZXNzYWdlQm9keSA9IGAqwqFBbGVydGEgZGUgU2VndXJpZGFkIFNHUFQhKiDwn5qoXG5TZSBoYSBjcmVhZG8gdW5hIG51ZXZhIHNvbGljaXR1ZCBkZSBwZXJtaXNvIGRlIHRyYWJham8uXG5cbvCfk4QgKk7Dum1lcm86KiAke3Blcm1pdE51bWJlcn1cbvCfkaQgKlNvbGljaXRhbnRlOiogJHt1c2VyRGlzcGxheU5hbWUgfHwgJ04vQSd9XG7wn5ug77iPICpUaXBvIGRlIFRyYWJham86KiAke3dvcmtUeXBlc1RleHR9XG5cblBvciBmYXZvciwgcmV2aXNlIGxhIHNvbGljaXR1ZCBwYXJhIHN1IGFwcm9iYWNpw7NuIGVuIGVsIHNpZ3VpZW50ZSBlbmxhY2U6XG4ke3Blcm1pdFVybH1gO1xuICAgIFxuICAgIGF3YWl0IHNlbmRXaGF0c0FwcE5vdGlmaWNhdGlvbihtZXNzYWdlQm9keSk7XG4gICAgXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZG9jUmVmLmlkLCBwZXJtaXROdW1iZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgY3JlYXIgcGVybWlzbzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBjcmVhdGUgcGVybWl0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pdERyYWZ0KGRhdGE6IFBlcm1pdENyZWF0ZURhdGEgJiB7IGRyYWZ0SWQ/OiBzdHJpbmcgfSkge1xuICBpZiAoIWRhdGEudXNlcklkKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVXNlciBub3QgYXV0aGVudGljYXRlZCcgfTtcbiAgfVxuICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIGRlIGFkbWluaXN0cmFkb3IgZGUgRmlyZWJhc2Ugbm8gY29uZmlndXJhZGFzIGVuIGVsIHNlcnZpZG9yLicgfTtcbiAgfVxuXG4gIGNvbnN0IHsgdXNlcklkLCB1c2VyRGlzcGxheU5hbWUsIHVzZXJFbWFpbCwgdXNlclBob3RvVVJMLCBkcmFmdElkLCAuLi5wZXJtaXREYXRhIH0gPSBkYXRhO1xuXG4gIGNvbnN0IGluaXRpYWxBcHByb3ZhbHMgPSB7XG4gICAgc29saWNpdGFudGU6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGF1dG9yaXphbnRlOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBtYW50ZW5pbWllbnRvOiB7IHN0YXR1czogJ3BlbmRpZW50ZScgYXMgY29uc3QgfSxcbiAgICBsaWRlcl9zc3Q6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICAgIGNvb3JkaW5hZG9yX2FsdHVyYXM6IHsgc3RhdHVzOiAncGVuZGllbnRlJyBhcyBjb25zdCB9LFxuICB9O1xuXG4gIGNvbnN0IHBlcm1pdFBheWxvYWQ6IFBhcnRpYWw8UGVybWl0PiA9IHtcbiAgICAuLi5wZXJtaXREYXRhLFxuICAgIHN0YXR1czogJ2JvcnJhZG9yJyBhcyBjb25zdCxcbiAgICBjcmVhdGVkQnk6IHVzZXJJZCxcbiAgICB1c2VyOiB7XG4gICAgICBkaXNwbGF5TmFtZTogdXNlckRpc3BsYXlOYW1lLFxuICAgICAgZW1haWw6IHVzZXJFbWFpbCxcbiAgICAgIHBob3RvVVJMOiB1c2VyUGhvdG9VUkwsXG4gICAgfSxcbiAgICBhcHByb3ZhbHM6IGluaXRpYWxBcHByb3ZhbHMsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAoZHJhZnRJZCkge1xuICAgICAgLy8gQWN0dWFsaXphciB1biBib3JyYWRvciBleGlzdGVudGVcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhkcmFmdElkKTtcbiAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyAuLi5wZXJtaXRQYXlsb2FkLCB1cGRhdGVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgfSk7XG4gICAgICByZXZhbGlkYXRlUGF0aChgL3Blcm1pdHMvJHtkcmFmdElkfWApO1xuICAgICAgcmV2YWxpZGF0ZVBhdGgoJy9wZXJtaXRzJyk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBwZXJtaXRJZDogZHJhZnRJZCwgaXNVcGRhdGU6IHRydWUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3JlYXIgdW4gbnVldm8gYm9ycmFkb3JcbiAgICAgIHBlcm1pdFBheWxvYWQuY3JlYXRlZEF0ID0gRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGF3YWl0IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmFkZChwZXJtaXRQYXlsb2FkIGFzIGFueSk7XG4gICAgICByZXZhbGlkYXRlUGF0aCgnL3Blcm1pdHMnKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHBlcm1pdElkOiBkb2NSZWYuaWQsIGlzVXBkYXRlOiBmYWxzZSB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgW0FjdGlvbl0gRXJyb3IgYWwgZ3VhcmRhciBib3JyYWRvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IFxuICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0NvdWxkIG5vdCBzYXZlIGRyYWZ0LiBQbGVhc2UgdHJ5IGFnYWluLicgXG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTaWduYXR1cmVBbmROb3RpZnkoXG4gIHBlcm1pdElkOiBzdHJpbmcsIFxuICByb2xlOiAnc29saWNpdGFudGUnIHwgJ2F1dG9yaXphbnRlJyB8ICdtYW50ZW5pbWllbnRvJyB8ICdsaWRlcl9zc3QnIHwgJ2Nvb3JkaW5hZG9yX2FsdHVyYXMnIHwgJ2NpZXJyZV9hdXRvcmlkYWQnIHwgJ2NpZXJyZV9yZXNwb25zYWJsZScgfCAnY2FuY2VsYWNpb24nLCBcbiAgc2lnbmF0dXJlVHlwZTogJ2Zpcm1hQXBlcnR1cmEnIHwgJ2Zpcm1hQ2llcnJlJyxcbiAgc2lnbmF0dXJlRGF0YVVybDogc3RyaW5nLFxuICB1c2VyOiBVc2VyLFxuICBjb21tZW50cz86IHN0cmluZyxcbiAgcGVybWl0RGF0YT86IFBlcm1pdCxcbikge1xuICAgIGlmICghcGVybWl0SWQgfHwgIXJvbGUgfHwgIXNpZ25hdHVyZURhdGFVcmwgfHwgIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFsdGFuIHBhcsOhbWV0cm9zIHBhcmEgZ3VhcmRhciBsYSBmaXJtYS4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB1cGRhdGVEYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgICAgICAgLy8gTMOzZ2ljYSBwYXJhIG1hbmVqYXIgZmlybWFzIGRlIGFwcm9iYWNpw7NuIHkgZGUgY2llcnJlL2NhbmNlbGFjacOzblxuICAgICAgICBpZiAocm9sZS5zdGFydHNXaXRoKCdjaWVycmVfJykgfHwgcm9sZSA9PT0gJ2NhbmNlbGFjaW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2xvc3VyZVJvbGUgPSByb2xlID09PSAnY2llcnJlX2F1dG9yaWRhZCcgPyAnYXV0b3JpZGFkJyA6IChyb2xlID09PSAnY2llcnJlX3Jlc3BvbnNhYmxlJyA/ICdyZXNwb25zYWJsZScgOiAnY2FuY2VsYWRvUG9yJyk7XG4gICAgICAgICAgICBjb25zdCBjbG9zdXJlUGF0aCA9IGBjbG9zdXJlLiR7Y2xvc3VyZVJvbGV9YDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdDbG9zdXJlRGF0YSA9IChhd2FpdCBkb2NSZWYuZ2V0KCkpLmRhdGEoKT8uY2xvc3VyZT8uW2Nsb3N1cmVSb2xlXSB8fCB7fTtcblxuICAgICAgICAgICAgdXBkYXRlRGF0YVtjbG9zdXJlUGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXhpc3RpbmdDbG9zdXJlRGF0YSxcbiAgICAgICAgICAgICAgICBmaXJtYTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgICAgICBub21icmU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgZmVjaGE6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcHByb3ZhbERhdGE6IFBhcnRpYWw8QXBwcm92YWw+ID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Fwcm9iYWRvJyxcbiAgICAgICAgICAgICAgICBmaXJtYUFwZXJ0dXJhOiBzaWduYXR1cmVEYXRhVXJsLFxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci51aWQsXG4gICAgICAgICAgICAgICAgc2lnbmVkQXQ6IEZpZWxkVmFsdWUuc2VydmVyVGltZXN0YW1wKCkgYXMgYW55LFxuICAgICAgICAgICAgICAgIHVzZXJSb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgdXNlckVtcHJlc2E6IHVzZXIuZW1wcmVzYSxcbiAgICAgICAgICAgICAgICBjb21tZW50czogY29tbWVudHMgfHwgJycsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZURhdGFbYGFwcHJvdmFscy4ke3JvbGV9YF0gPSBhcHByb3ZhbERhdGE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdERvY0JlZm9yZSA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pdEJlZm9yZURhdGEgPSBwZXJtaXREb2NCZWZvcmUuZGF0YSgpIGFzIFBlcm1pdCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNpZ25hdHVyZVR5cGUgPT09ICdmaXJtYUFwZXJ0dXJhJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25QYXlsb2FkOiBWYWxpZGFjaW9uRGlhcmlhID0geyBkaWE6IDEsIG5vbWJyZTogdXNlci5kaXNwbGF5TmFtZSB8fCAnJywgZmlybWE6IHNpZ25hdHVyZURhdGFVcmwsIGZlY2hhOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocm9sZSA9PT0gJ3NvbGljaXRhbnRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YSAmJiBwZXJtaXRCZWZvcmVEYXRhLnN0YXR1cyA9PT0gJ2JvcnJhZG9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybWl0TnVtYmVyID0gYFBULSR7RGF0ZS5ub3coKX0tJHtwZXJtaXRJZC5zdWJzdHJpbmcoMCwgNikudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnbnVtYmVyJ10gPSBwZXJtaXROdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhWydzdGF0dXMnXSA9ICdwZW5kaWVudGVfcmV2aXNpb24nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0by1sbGVuYXIgdmFsaWRhY2nDs24gZGlhcmlhIGRlbCByZXNwb25zYWJsZVxuICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8ucmVzcG9uc2FibGUgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbGlkYXRpb25zWzBdID0gdmFsaWRhdGlvblBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGF0YVtgJHthbmV4b30udmFsaWRhY2lvbi5yZXNwb25zYWJsZWBdID0gY3VycmVudFZhbGlkYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gJ2F1dG9yaXphbnRlJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdXRvLWxsZW5hciB2YWxpZGFjacOzbiBkaWFyaWEgZGUgbGEgYXV0b3JpZGFkXG4gICAgICAgICAgICAgICAgICAgICBbJ2FuZXhvQWx0dXJhJywgJ2FuZXhvQ29uZmluYWRvJywgJ2FuZXhvSXphamUnLCAnYW5leG9FeGNhdmFjaW9uZXMnXS5mb3JFYWNoKGFuZXhvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocGVybWl0QmVmb3JlRGF0YSBhcyBhbnkpPy5bYW5leG9dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbGlkYXRpb25zID0gKHBlcm1pdEJlZm9yZURhdGEgYXMgYW55KVthbmV4b10udmFsaWRhY2lvbj8uYXV0b3JpZGFkIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWxpZGF0aW9uc1swXSA9IHZhbGlkYXRpb25QYXlsb2FkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFbYCR7YW5leG99LnZhbGlkYWNpb24uYXV0b3JpZGFkYF0gPSBjdXJyZW50VmFsaWRhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gKioqIE5VRVZBIEzDk0dJQ0EgREUgQVBST0JBQ0nDk04gQVVUT03DgVRJQ0EgKioqXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXBwcm92YWxzID0geyAuLi5wZXJtaXRCZWZvcmVEYXRhPy5hcHByb3ZhbHMsIFtyb2xlXTogYXBwcm92YWxEYXRhIH07XG4gICAgICAgICAgICBjb25zdCBpc1NTVFJlcXVpcmVkID0gcGVybWl0RGF0YT8uYW5leG9BbHR1cmE/LnRhcmVhUmVhbGl6YXI/LmlkID09PSAnb3Rybyc7XG5cbiAgICAgICAgICAgIGxldCBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5zb2xpY2l0YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nICYmXG4gICAgICAgICAgICAgICAgdXBkYXRlZEFwcHJvdmFscy5hdXRvcml6YW50ZT8uc3RhdHVzID09PSAnYXByb2JhZG8nO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGVybWl0QmVmb3JlRGF0YT8uY29udHJvbEVuZXJnaWEpIHtcbiAgICAgICAgICAgICAgICBhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lID0gYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSAmJiB1cGRhdGVkQXBwcm92YWxzLm1hbnRlbmltaWVudG8/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NTVFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVxdWlyZWRTaWduYXR1cmVzRG9uZSA9IGFsbFJlcXVpcmVkU2lnbmF0dXJlc0RvbmUgJiYgdXBkYXRlZEFwcHJvdmFscy5saWRlcl9zc3Q/LnN0YXR1cyA9PT0gJ2Fwcm9iYWRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2kgc2UgY3VtcGxlbiBsYXMgY29uZGljaW9uZXMsIHNlIHBvbmUgZW4gZWplY3VjacOzbi5cbiAgICAgICAgICAgIGlmIChhbGxSZXF1aXJlZFNpZ25hdHVyZXNEb25lKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YVsnc3RhdHVzJ10gPSAnZW5fZWplY3VjaW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh1cGRhdGVEYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcm1pdERvYyA9IGF3YWl0IGRvY1JlZi5nZXQoKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFBlcm1pdERhdGEgPSB7IGlkOiBwZXJtaXREb2MuaWQsIC4uLnBlcm1pdERvYy5kYXRhKCkgfSBhcyBQZXJtaXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaWduYXR1cmVSb2xlTmFtZSA9IChzaWduYXR1cmVSb2xlcyBhcyBhbnkpW3JvbGVdIHx8IHJvbGUucmVwbGFjZSgnXycsICcgJykucmVwbGFjZSgvXFxiXFx3L2csIGwgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgZmlybWFkbyBlbCBwZXJtaXNvICMke3VwZGF0ZWRQZXJtaXREYXRhLm51bWJlcn0gY29tbyAke3NpZ25hdHVyZVJvbGVOYW1lfS5gO1xuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2Vycyh1cGRhdGVkUGVybWl0RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHsgLy8gTm8gbm90aWZpY2FyIGFsIHVzdWFyaW8gc29icmUgc3UgcHJvcGlhIGFjY2nDs25cbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbih1aWQsIHVwZGF0ZWRQZXJtaXREYXRhLCBtZXNzYWdlLCAnc2lnbmF0dXJlJywgdXNlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBOb3RpZmljYWNpw7NuIGFkaWNpb25hbCBzaSBlbCBwZXJtaXNvIHNlIHB1c28gZW4gZWplY3VjacOzblxuICAgICAgICBpZiAodXBkYXRlRGF0YVsnc3RhdHVzJ10gPT09ICdlbl9lamVjdWNpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBleGVjdXRpb25NZXNzYWdlID0gYEVsIHBlcm1pc28gIyR7dXBkYXRlZFBlcm1pdERhdGEubnVtYmVyfSBoYSBzaWRvIGFwcm9iYWRvIHkgc2UgZW5jdWVudHJhIGFob3JhIEVOIEVKRUNVQ0nDk04uYDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdWlkIG9mIGludm9sdmVkVXNlcnMpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHVpZCAhPT0gdXNlci51aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgdXBkYXRlZFBlcm1pdERhdGEsIGV4ZWN1dGlvbk1lc3NhZ2UsICdhcHByb3ZhbCcsIHVzZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgYWwgZ3VhcmRhciBmaXJtYSB5IG5vdGlmaWNhcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBlcm1pdFN0YXR1cyhcbiAgcGVybWl0SWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBQZXJtaXRTdGF0dXMsXG4gIGN1cnJlbnRVc2VyOiB7IHVpZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbCB9LFxuICByZWFzb24/OiBzdHJpbmcsXG4gIGNsb3N1cmVEYXRhPzogUGFydGlhbDxQZXJtaXRDbG9zdXJlPlxuKSB7XG4gICAgaWYgKCFwZXJtaXRJZCkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQZXJtaXQgSUQgaXMgcmVxdWlyZWQuJyB9O1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW5SZWFkeSgpKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvY1JlZiA9IGFkbWluRGIuY29sbGVjdGlvbigncGVybWl0cycpLmRvYyhwZXJtaXRJZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZURhdGE6IHsgc3RhdHVzOiBQZXJtaXRTdGF0dXM7IHJlamVjdGlvblJlYXNvbj86IHN0cmluZzsgY2xvc3VyZT86IFBhcnRpYWw8UGVybWl0Q2xvc3VyZT4gfCBGaWVsZFZhbHVlIH0gPSB7IHN0YXR1cyB9O1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZWNoYXphZG8nICYmIHJlYXNvbikge1xuICAgICAgICAgICAgdXBkYXRlRGF0YS5yZWplY3Rpb25SZWFzb24gPSByZWFzb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIHVwZGF0ZURhdGEuY2xvc3VyZSA9IHtcbiAgICAgICAgICAgICAgICAuLi4oY2xvc3VyZURhdGEgfHwge30pLFxuICAgICAgICAgICAgICAgIGZlY2hhQ2llcnJlOiBGaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUodXBkYXRlRGF0YSk7XG5cbiAgICAgICAgY29uc3QgcGVybWl0RG9jID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0geyBpZDogcGVybWl0RG9jLmlkLCAuLi5wZXJtaXREb2MuZGF0YSgpIH0gYXMgUGVybWl0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdHJpZ2dlcmVkQnkgPSBjdXJyZW50VXNlcjtcbiAgICAgICAgXG4gICAgICAgIGxldCBub3RpZmljYXRpb25UeXBlOiBOb3RpZmljYXRpb25bJ3R5cGUnXSA9ICdzdGF0dXNfY2hhbmdlJztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIGNhbWJpYWRvIGVsIGVzdGFkbyBkZWwgcGVybWlzbyAjJHtwZXJtaXREYXRhLm51bWJlcn0gYTogJHtnZXRTdGF0dXNUZXh0KHN0YXR1cyl9LmA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Fwcm9iYWRvJykge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZSA9ICdhcHByb3ZhbCc7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7Y3VycmVudFVzZXIuZGlzcGxheU5hbWUgfHwgJ1VuIHVzdWFyaW8nfSBoYSBhcHJvYmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAncmVqZWN0aW9uJztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtjdXJyZW50VXNlci5kaXNwbGF5TmFtZSB8fCAnVW4gdXN1YXJpbyd9IGhhIHJlY2hhemFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICAgICAgaWYgKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBNb3Rpdm86ICR7cmVhc29ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnY2VycmFkbycpIHtcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvblR5cGUgPSAnY2FuY2VsbGF0aW9uJzsgLy8gVXNpbmcgY2FuY2VsbGF0aW9uIGZvciBjbG9zZVxuICAgICAgICAgICAgbWVzc2FnZSA9IGAke2N1cnJlbnRVc2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgY2VycmFkbyBlbCBwZXJtaXNvICMke3Blcm1pdERhdGEubnVtYmVyfS5gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZvbHZlZFVzZXJzID0gYXdhaXQgZ2V0SW52b2x2ZWRVc2VycyhwZXJtaXREYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICAgICAgICAgaWYgKHVpZCAhPT0gY3VycmVudFVzZXIudWlkKSB7IC8vIE5vIG5vdGlmaWNhciBhbCB1c3VhcmlvIHNvYnJlIHN1IHByb3BpYSBhY2Npw7NuXG4gICAgICAgICAgICAgICAgYXdhaXQgY3JlYXRlTm90aWZpY2F0aW9uKHVpZCwgcGVybWl0RGF0YSwgbWVzc2FnZSwgbm90aWZpY2F0aW9uVHlwZSwgdHJpZ2dlcmVkQnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0JBU0VfVVJMIHx8ICdodHRwczovL3NncHQtbW92aWwud2ViLmFwcCc7XG4gICAgICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuXG4gICAgICAgIGxldCBtZXNzYWdlQm9keSA9IGAqQWN0dWFsaXphY2nDs24gZGUgRXN0YWRvIC0gU0dQVCog8J+UhFxuRWwgZXN0YWRvIGRlbCBwZXJtaXNvICoke3Blcm1pdERhdGEubnVtYmVyIHx8IHBlcm1pdElkfSogaGEgY2FtYmlhZG8uXG5cbipOdWV2byBFc3RhZG86KiAke2dldFN0YXR1c1RleHQoc3RhdHVzKX1cblxuUHVlZGUgdmVyIGxvcyBkZXRhbGxlcyBhcXXDrTpcbiR7cGVybWl0VXJsfWA7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlY2hhemFkbycgJiYgcmVhc29uKSB7XG4gICAgICAgICAgbWVzc2FnZUJvZHkgKz0gYFxcblxcbipNb3Rpdm8gZGVsIHJlY2hhem86KiAke3JlYXNvbn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24obWVzc2FnZUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgICAgIHJldmFsaWRhdGVQYXRoKCcvcGVybWl0cycpO1xuICAgICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3IgdXBkYXRpbmcgcGVybWl0IHN0YXR1czpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnQ291bGQgbm90IHVwZGF0ZSBwZXJtaXQgc3RhdHVzLidcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGREYWlseVZhbGlkYXRpb25TaWduYXR1cmUocGVybWl0SWQ6IHN0cmluZywgYW5leG9OYW1lOiBzdHJpbmcsIHZhbGlkYXRpb25UeXBlOiAnYXV0b3JpZGFkJyB8ICdyZXNwb25zYWJsZScsIGluZGV4OiBudW1iZXIsIGRhdGE6IFZhbGlkYWNpb25EaWFyaWEsIHVzZXI6IFVzZXIpIHtcbiAgaWYgKCFwZXJtaXRJZCB8fCAhYW5leG9OYW1lIHx8ICF2YWxpZGF0aW9uVHlwZSB8fCBpbmRleCA8IDAgfHwgIWRhdGEgfHwgIXVzZXIpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYXLDoW1ldHJvcyBpbnbDoWxpZG9zLicgfTtcbiAgfVxuXG4gIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdDcmVkZW5jaWFsZXMgZGUgYWRtaW5pc3RyYWRvciBkZSBGaXJlYmFzZSBubyBjb25maWd1cmFkYXMgZW4gZWwgc2Vydmlkb3IuJyB9O1xuICB9XG5cbiAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgIGlmICghcGVybWl0U25hcC5leGlzdHMpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0VsIHBlcm1pc28gbm8gZXhpc3RlLicgfTtcbiAgICB9XG4gICAgY29uc3QgcGVybWl0RGF0YSA9IHBlcm1pdFNuYXAuZGF0YSgpIGFzIFBlcm1pdDtcblxuICAgIGNvbnN0IGFuZXhvRGF0YSA9IChwZXJtaXREYXRhIGFzIGFueSlbYW5leG9OYW1lXTtcbiAgICBpZiAoIWFuZXhvRGF0YSB8fCAhYW5leG9EYXRhLnZhbGlkYWNpb24pIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYEVsIGFuZXhvICR7YW5leG9OYW1lfSBvIHN1IGVzdHJ1Y3R1cmEgZGUgdmFsaWRhY2nDs24gbm8gZXhpc3RlbiBlbiBlbCBwZXJtaXNvLmAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdmFsaWRhdGlvbkFycmF5ID0gKGFuZXhvRGF0YS52YWxpZGFjaW9uW3ZhbGlkYXRpb25UeXBlXSBhcyBWYWxpZGFjaW9uRGlhcmlhW10pIHx8IFtdO1xuICAgIFxuICAgIHdoaWxlICh2YWxpZGF0aW9uQXJyYXkubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHZhbGlkYXRpb25BcnJheS5wdXNoKHsgZGlhOiB2YWxpZGF0aW9uQXJyYXkubGVuZ3RoICsgMSwgbm9tYnJlOiAnJywgZmVjaGE6ICcnLCBmaXJtYTogJycgfSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGlvbkFycmF5W2luZGV4XSA9IGRhdGE7XG4gICAgXG4gICAgY29uc3QgdXBkYXRlUGF0aCA9IGAke2FuZXhvTmFtZX0udmFsaWRhY2lvbi4ke3ZhbGlkYXRpb25UeXBlfWA7XG4gICAgXG4gICAgYXdhaXQgZG9jUmVmLnVwZGF0ZSh7XG4gICAgICBbdXBkYXRlUGF0aF06IHZhbGlkYXRpb25BcnJheSxcbiAgICB9KTtcblxuICAgIC8vIC0tLSBMw7NnaWNhIGRlIE5vdGlmaWNhY2nDs24gLS0tXG4gICAgY29uc3QgZnVsbFBlcm1pdERhdGEgPSB7IGlkOiBkb2NSZWYuaWQsIC4uLnBlcm1pdERhdGEgfSBhcyBQZXJtaXQ7XG4gICAgY29uc3QgYW5leG9EaXNwbGF5TmFtZSA9IGFuZXhvTmFtZS5yZXBsYWNlKCdhbmV4bycsICdBbmV4byAnKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uUm9sZU5hbWUgPSB2YWxpZGF0aW9uVHlwZSA9PT0gJ2F1dG9yaWRhZCcgPyAnQXV0b3JpZGFkIGRlbCDDgXJlYScgOiAnUmVzcG9uc2FibGUgZGVsIFRyYWJham8nO1xuICAgIGNvbnN0IGRheSA9IGluZGV4ICsgMTtcblxuICAgIC8vIE5vdGlmaWNhY2lvbmVzIGVuIGxhIEFwcCB5IHBvciBFbWFpbFxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdVbiB1c3VhcmlvJ30gaGEgcmVhbGl6YWRvIGxhIHZhbGlkYWNpw7NuIGRpYXJpYSAoJHt2YWxpZGF0aW9uUm9sZU5hbWV9KSBwYXJhIGVsIETDjUEgJHtkYXl9IGRlbCAke2FuZXhvRGlzcGxheU5hbWV9IGVuIGVsIHBlcm1pc28gIyR7ZnVsbFBlcm1pdERhdGEubnVtYmVyfS5gO1xuICAgIGNvbnN0IGludm9sdmVkVXNlcnMgPSBhd2FpdCBnZXRJbnZvbHZlZFVzZXJzKGZ1bGxQZXJtaXREYXRhKTtcbiAgICBmb3IgKGNvbnN0IHVpZCBvZiBpbnZvbHZlZFVzZXJzKSB7XG4gICAgICBpZiAodWlkICE9PSB1c2VyLnVpZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVOb3RpZmljYXRpb24odWlkLCBmdWxsUGVybWl0RGF0YSwgbWVzc2FnZSwgJ3N0YXR1c19jaGFuZ2UnLCB1c2VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3RpZmljYWNpw7NuIHBvciBXaGF0c0FwcFxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTCB8fCAnaHR0cHM6Ly9zZ3B0LW1vdmlsLndlYi5hcHAnO1xuICAgIGNvbnN0IHBlcm1pdFVybCA9IGAke2Jhc2VVcmx9L3Blcm1pdHMvJHtwZXJtaXRJZH1gO1xuICAgIGNvbnN0IHdoYXRzYXBwTWVzc2FnZSA9IGAqVmFsaWRhY2nDs24gRGlhcmlhIC0gU0dQVCog4pyN77iPXG5TZSBoYSByZWdpc3RyYWRvIHVuYSBudWV2YSBmaXJtYSBkZSB2YWxpZGFjacOzbiBkaWFyaWEuXG5cbvCfk4QgKlBlcm1pc286KiAke2Z1bGxQZXJtaXREYXRhLm51bWJlciB8fCAnTi9BJ31cbvCfl5PvuI8gKkTDrWE6KiAke2RheX1cbvCfkaQgKkZpcm1hbnRlOiogJHt1c2VyLmRpc3BsYXlOYW1lIHx8ICdOL0EnfVxu4pyFICpSb2w6KiAke3ZhbGlkYXRpb25Sb2xlTmFtZX1cbvCfk4sgKkFuZXhvOiogJHthbmV4b0Rpc3BsYXlOYW1lfVxuXG5QdWVkZSB2ZXIgbG9zIGRldGFsbGVzIGFxdcOtOlxuJHtwZXJtaXRVcmx9YDtcbiAgICBcbiAgICBhd2FpdCBzZW5kV2hhdHNBcHBOb3RpZmljYXRpb24od2hhdHNhcHBNZXNzYWdlKTtcblxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9wZXJtaXRzLyR7cGVybWl0SWR9YCk7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEVycm9yIGFsIGd1YXJkYXIgbGEgdmFsaWRhY2nDs24gZGlhcmlhOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnTm8gc2UgcHVkbyBndWFyZGFyIGxhIGZpcm1hIGRlIHZhbGlkYWNpw7NuLicgfTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkV29ya2VyU2lnbmF0dXJlKHBlcm1pdElkOiBzdHJpbmcsIHdvcmtlckluZGV4OiBudW1iZXIsIHNpZ25hdHVyZVR5cGU6ICdmaXJtYUFwZXJ0dXJhJyB8ICdmaXJtYUNpZXJyZScsIHNpZ25hdHVyZURhdGFVcmw6IHN0cmluZykge1xuICAgIGlmICghcGVybWl0SWQgfHwgd29ya2VySW5kZXggPCAwIHx8ICFzaWduYXR1cmVUeXBlIHx8ICFzaWduYXR1cmVEYXRhVXJsKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhbHRhbiBwYXLDoW1ldHJvcy4nIH07XG4gICAgfVxuICAgIGlmICghaXNBZG1pblJlYWR5KCkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0NyZWRlbmNpYWxlcyBkZSBhZG1pbmlzdHJhZG9yIGRlIEZpcmViYXNlIG5vIGNvbmZpZ3VyYWRhcyBlbiBlbCBzZXJ2aWRvci4nIH07XG4gICAgfVxuXG4gICAgY29uc3QgZG9jUmVmID0gYWRtaW5EYi5jb2xsZWN0aW9uKCdwZXJtaXRzJykuZG9jKHBlcm1pdElkKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwZXJtaXRTbmFwID0gYXdhaXQgZG9jUmVmLmdldCgpO1xuICAgICAgICBpZiAoIXBlcm1pdFNuYXAuZXhpc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFbCBwZXJtaXNvIG5vIGV4aXN0ZS4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwZXJtaXREYXRhID0gcGVybWl0U25hcC5kYXRhKCkgYXMgUGVybWl0O1xuICAgICAgICBjb25zdCB3b3JrZXJzID0gcGVybWl0RGF0YS53b3JrZXJzID8gWy4uLnBlcm1pdERhdGEud29ya2Vyc10gOiBbXTtcblxuICAgICAgICBpZiAod29ya2VySW5kZXggPj0gd29ya2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ8ONbmRpY2UgZGUgdHJhYmFqYWRvciBpbnbDoWxpZG8uJyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmlybWFBcGVydHVyYScgOiAnZmlybWFDaWVycmUnO1xuICAgICAgICBjb25zdCBkYXRlRmllbGQgPSBzaWduYXR1cmVUeXBlID09PSAnZmlybWFBcGVydHVyYScgPyAnZmVjaGFGaXJtYUFwZXJ0dXJhJyA6ICdmZWNoYUZpcm1hQ2llcnJlJztcblxuICAgICAgICB3b3JrZXJzW3dvcmtlckluZGV4XSA9IHtcbiAgICAgICAgICAgIC4uLndvcmtlcnNbd29ya2VySW5kZXhdLFxuICAgICAgICAgICAgW3NpZ25hdHVyZUZpZWxkXTogc2lnbmF0dXJlRGF0YVVybCxcbiAgICAgICAgICAgIFtkYXRlRmllbGRdOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIFxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGRvY1JlZi51cGRhdGUoeyB3b3JrZXJzOiB3b3JrZXJzIH0pO1xuXG4gICAgICAgIHJldmFsaWRhdGVQYXRoKGAvcGVybWl0cy8ke3Blcm1pdElkfWApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZ3VhcmRhciBsYSBmaXJtYSBkZWwgdHJhYmFqYWRvcjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdObyBzZSBwdWRvIGd1YXJkYXIgbGEgZmlybWEuJyB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFNBMmpCc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5d645a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:5d645a [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$07c314__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:07c314 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$6c4d34__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:6c4d34 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$252d8b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/permits/data:252d8b [app-ssr] (ecmascript) <text/javascript>");
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
        const parsed = new Date(dateValue);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }
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
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 125,
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
                lineNumber: 135,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold text-gray-800 break-words",
                children: value || 'No especificado'
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 134,
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
            lineNumber: 152,
            columnNumber: 13
        }, this),
        no: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "h-5 w-5 text-red-500"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 153,
            columnNumber: 13
        }, this),
        na: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
            className: "h-5 w-5 text-gray-400"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 154,
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
                lineNumber: 159,
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
                        lineNumber: 161,
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
                                lineNumber: 164,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Sí"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 164,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "no"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 165,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "No"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 165,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "na"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 166,
                                columnNumber: 25
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                children: "N/A"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 166,
                                columnNumber: 55
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 163,
                        columnNumber: 21
                    }, this) : iconMap[status]
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
function PermitDetailPage({ params }) {
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
    const [isClosureDialogOpen, setIsClosureDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDailyValidationSignatureOpen, setIsDailyValidationSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dailyValidationTarget, setDailyValidationTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dailyValidationName, setDailyValidationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [dailyValidationDate, setDailyValidationDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isWorkerSignatureOpen, setIsWorkerSignatureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [workerSignatureTarget, setWorkerSignatureTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✨ CORRECCIÓN: Estado para controlar la acción de cierre o cancelación
    const [closureAction, setClosureAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
    // ✅ Función handleExportToPDF corregida
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
            const safeFormat = (date, fmt)=>{
                const parsedDate = parseFirestoreDate(date);
                return parsedDate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValid"])(parsedDate) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parsedDate, fmt) : 'N/A';
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
                            Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
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
                            Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k).join(', ')
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
            const userToSign = {
                ...currentUser,
                displayName: isSpecialSignature ? signerName : currentUser.displayName || null
            };
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$07c314__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addSignatureAndNotify"])(permit.id, signingRole.role, signingRole.type, signatureDataUrl, userToSign, signatureObservation, permit);
            if (result.success) {
                toast({
                    title: 'Firma Registrada',
                    description: `${userToSign.displayName} ha firmado exitosamente.`
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
        if (!permit || !currentUser) return;
        setIsStatusChanging(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$5d645a__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updatePermitStatus"])(permit.id, newStatus, {
                uid: currentUser.uid,
                displayName: currentUser.displayName
            }, reason, permit.closure);
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
        let allRequiredSignaturesDone = approvals.solicitante?.status === 'aprobado' && approvals.autorizante?.status === 'aprobado';
        if (permit.controlEnergia) {
            allRequiredSignaturesDone = allRequiredSignaturesDone && approvals.mantenimiento?.status === 'aprobado';
        }
        if (isSSTSignatureRequired) {
            allRequiredSignaturesDone = allRequiredSignaturesDone && approvals.lider_sst?.status === 'aprobado';
        }
        switch(targetStatus){
            case 'aprobado':
                return false; // Lógica movida a addSignatureAndNotify
            case 'rechazado':
                return (status === 'pendiente_revision' || status === 'aprobado') && (role === 'autorizante' || role === 'admin' || role === 'lider_sst');
            case 'en_ejecucion':
                return false; // Lógica movida a addSignatureAndNotify
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
        setDailyValidationName(currentUser?.displayName || '');
        setDailyValidationDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setIsDailyValidationSignatureOpen(true);
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
        setIsSigning(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$6c4d34__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addDailyValidationSignature"])(permit.id, dailyValidationTarget.anexo, dailyValidationTarget.type, dailyValidationTarget.index, {
                dia: dailyValidationTarget.index + 1,
                nombre: dailyValidationName,
                fecha: dailyValidationDate,
                firma: signature
            }, currentUser);
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$permits$2f$data$3a$252d8b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addWorkerSignature"])(permit.id, workerSignatureTarget.index, workerSignatureTarget.type, signature);
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
                    lineNumber: 1257,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-4 text-lg",
                    children: "Cargando detalles del permiso..."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1258,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1256,
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
                    lineNumber: 1266,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-2",
                    children: "Error al Cargar el Permiso"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1267,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-6",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1268,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>router.back(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1270,
                            columnNumber: 11
                        }, this),
                        "Volver"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1269,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1265,
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
                        lineNumber: 1397,
                        columnNumber: 30
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1397,
                        columnNumber: 69
                    }, this),
                    " Firmar Apertura"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1396,
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
                        lineNumber: 1424,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1423,
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
                                                lineNumber: 1431,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Aprobado"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1432,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1430,
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
                                                        lineNumber: 1435,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1435,
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
                                                        lineNumber: 1436,
                                                        columnNumber: 57
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1436,
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
                                                        lineNumber: 1437,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1437,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Fecha: ",
                                                    approval.signedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(approval.signedAt), 'dd/MM/yy HH:mm') : 'N/A'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1438,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1434,
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
                                        lineNumber: 1440,
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
                                                        lineNumber: 1443,
                                                        columnNumber: 104
                                                    }, this),
                                                    " Observaciones:"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1443,
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
                                                lineNumber: 1444,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1442,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1429,
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
                                                lineNumber: 1451,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-sm",
                                                children: "Pendiente de Firma"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1452,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1450,
                                        columnNumber: 21
                                    }, this),
                                    consentText && can && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-2 border-l-2 border-primary pl-2",
                                        children: consentText
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1455,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1449,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1427,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                can ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignButton, {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1463,
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
                                                                lineNumber: 1469,
                                                                columnNumber: 29
                                                            }, this),
                                                            " Firmar Apertura"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1468,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1467,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1466,
                                                columnNumber: 25
                                            }, this),
                                            reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: reason
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1473,
                                                    columnNumber: 52
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1473,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1465,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1464,
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
                                            lineNumber: 1479,
                                            columnNumber: 21
                                        }, this),
                                        " Modificar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1478,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1462,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1426,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1422,
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
                            lineNumber: 1516,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.nombre || 'N/A'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1517,
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
                                lineNumber: 1520,
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
                                                    lineNumber: 1531,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1525,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1524,
                                            columnNumber: 41
                                        }, this),
                                        !canSignValidation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: tooltipContent
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1534,
                                                columnNumber: 80
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1534,
                                            columnNumber: 64
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1523,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1522,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1518,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            children: v?.fecha ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(v.fecha), 'dd/MM/yy HH:mm') : 'N/A'
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1539,
                            columnNumber: 25
                        }, this)
                    ]
                }, `${type}-${i}`, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1515,
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
                                lineNumber: 1549,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1550,
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
                                                    lineNumber: 1552,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1552,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1552,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1552,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1552,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1552,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('responsable')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1553,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1551,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1548,
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
                                lineNumber: 1557,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Entiendo las condiciones y responsabilidad."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1558,
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
                                                    lineNumber: 1560,
                                                    columnNumber: 52
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1560,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Firma"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1560,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                    children: "Fecha"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1560,
                                                    columnNumber: 135
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1560,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1560,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                        children: renderRows('autoridad')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1559,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1556,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1547,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
            lineNumber: 1546,
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
                                    lineNumber: 1576,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "Volver a la Lista"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1577,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1575,
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
                                    lineNumber: 1581,
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
                                    lineNumber: 1582,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1580,
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
                                            lineNumber: 1586,
                                            columnNumber: 72
                                        }, this),
                                        "Exportar a PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1586,
                                    columnNumber: 18
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
                                                        lineNumber: 1590,
                                                        columnNumber: 59
                                                    }, this),
                                                    "Rechazar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1590,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1589,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                                        children: "Rechazar Permiso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1593,
                                                        columnNumber: 48
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1593,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    value: rejectionReason,
                                                    onChange: (e)=>setRejectionReason(e.target.value),
                                                    placeholder: "Escriba el motivo del rechazo..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1594,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                                            children: "Cancelar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1596,
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
                                                                    lineNumber: 1598,
                                                                    columnNumber: 53
                                                                }, this) : null,
                                                                " Rechazar"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1597,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1595,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1592,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1588,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 1585,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 1574,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1573,
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
                                            lineNumber: 1614,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1613,
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
                                                lineNumber: 1617,
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
                                                        lineNumber: 1619,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Versión",
                                                        value: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1620,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Fecha Vigencia",
                                                        value: "23-01-2023"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1621,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1618,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1616,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1612,
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
                                                lineNumber: 1629,
                                                columnNumber: 65
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1629,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Solicitante",
                                            value: permit.user?.displayName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1630,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Fecha Creación",
                                            value: permit.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(parseFirestoreDate(permit.createdAt), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1631,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Área Específica",
                                            value: permit.generalInfo?.areaEspecifica
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1632,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Planta",
                                            value: permit.generalInfo?.planta
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1633,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Proceso",
                                            value: permit.generalInfo?.proceso
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1634,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Empresa",
                                            value: permit.generalInfo?.empresa
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1635,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Contrato",
                                            value: permit.generalInfo?.contrato
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1636,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Desde",
                                            value: permit.generalInfo?.validFrom ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1637,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "Validez Hasta",
                                            value: permit.generalInfo?.validUntil ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1638,
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
                                                    lineNumber: 1640,
                                                    columnNumber: 68
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1640,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1639,
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
                                                    lineNumber: 1643,
                                                    columnNumber: 74
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1643,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1642,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1628,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1627,
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
                                                        lineNumber: 1651,
                                                        columnNumber: 67
                                                    }, this),
                                                    " Análisis de Trabajo Seguro (ATS)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1651,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1652,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1650,
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
                                                                    lineNumber: 1659,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "pl-4 space-y-1",
                                                                    children: peligros.map((peligro)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                            label: peligro.label,
                                                                            value: permit.anexoATS?.peligros?.[peligro.id]
                                                                        }, peligro.id, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1662,
                                                                            columnNumber: 45
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1660,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, seccion, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1658,
                                                            columnNumber: 33
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1656,
                                                    columnNumber: 29
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1655,
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
                                                            lineNumber: 1680,
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
                                                            lineNumber: 1688,
                                                            columnNumber: 44
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1674,
                                                    columnNumber: 28
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1673,
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
                                                        lineNumber: 1694,
                                                        columnNumber: 33
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1692,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1654,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1649,
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
                                                        lineNumber: 1707,
                                                        columnNumber: 79
                                                    }, this),
                                                    " Manejo de Emergencias"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1707,
                                                columnNumber: 24
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1708,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1706,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "space-y-2 border border-t-0 rounded-b-lg p-4",
                                        children: emergenciasItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                label: item.label,
                                                value: permit.eppEmergencias?.emergencias?.[item.id]
                                            }, item.id, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1712,
                                                columnNumber: 29
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1710,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1705,
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
                                                        lineNumber: 1726,
                                                        columnNumber: 83
                                                    }, this),
                                                    " Anexo: Trabajo en Alturas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1726,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1727,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1725,
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
                                                            lineNumber: 1732,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Descripción de la Tarea",
                                                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm whitespace-pre-wrap",
                                                                children: permit.anexoAltura.tareaRealizar?.descripcion
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1733,
                                                                columnNumber: 83
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1733,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Altura Aproximada",
                                                            value: `${permit.anexoAltura.alturaAproximada || 'N/A'} metros`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1734,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Contacto de Emergencia",
                                                            value: `${permit.anexoAltura.emergencia?.contacto || 'N/A'} - ${permit.anexoAltura.emergencia?.telefono || 'N/A'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1735,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1731,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1730,
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
                                                                lineNumber: 1742,
                                                                columnNumber: 38
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1740,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2",
                                                        children: anexoAlturaAspectos.map((aspect)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: aspect.label,
                                                                value: permit.anexoAltura?.aspectosSeguridad?.[aspect.id]
                                                            }, aspect.id, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1752,
                                                                columnNumber: 34
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1750,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1739,
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
                                                            lineNumber: 1760,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1758,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1757,
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
                                                                lineNumber: 1767,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Otras áreas producen riesgo a este trabajo?",
                                                                value: permit.anexoAltura.afectaciones?.otrasAreasRiesgo
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1768,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Personal notificado?",
                                                                value: permit.anexoAltura.afectaciones?.personalNotificado
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1769,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1766,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Observaciones",
                                                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm whitespace-pre-wrap",
                                                            children: permit.anexoAltura.afectaciones?.observaciones
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1771,
                                                            columnNumber: 69
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1771,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1765,
                                                columnNumber: 29
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoAltura",
                                                validationData: permit.anexoAltura.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1774,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1729,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1724,
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
                                                        lineNumber: 1783,
                                                        columnNumber: 85
                                                    }, this),
                                                    " Anexo: Espacios Confinados"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1783,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1784,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1782,
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
                                                        lineNumber: 1789,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1788,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1787,
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
                                                            lineNumber: 1796,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1794,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1793,
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
                                                            lineNumber: 1804,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1802,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1801,
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
                                                            lineNumber: 1812,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1810,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1809,
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
                                                            lineNumber: 1819,
                                                            columnNumber: 38
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Responsable del Trabajo",
                                                            value: permit.anexoConfinado.responsableDelTrabajo?.nombre || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1820,
                                                            columnNumber: 38
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Supervisor Trabajo EC",
                                                            value: permit.anexoConfinado.supervisorTrabajo?.nombre || 'N/A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1821,
                                                            columnNumber: 38
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1818,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1817,
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
                                                            lineNumber: 1827,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "O2 (19.5-22%)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.o2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1828,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "H2S (0-10 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.h2s
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1829,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "CO (0-25 PPM)",
                                                            value: permit.anexoConfinado.resultadosPruebasGases?.co
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1830,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1826,
                                                    columnNumber: 32
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1825,
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
                                                                        lineNumber: 1835,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "LEL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1835,
                                                                        columnNumber: 83
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "O2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1835,
                                                                        columnNumber: 109
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "H2S"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1835,
                                                                        columnNumber: 134
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "CO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1835,
                                                                        columnNumber: 160
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                        children: "Firma"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1835,
                                                                        columnNumber: 185
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1835,
                                                                columnNumber: 46
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1835,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                                                            children: permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.hora
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1839,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.lel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1840,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.o2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1841,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.h2s
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1842,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                            children: p.co
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1843,
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
                                                                                lineNumber: 1844,
                                                                                columnNumber: 68
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                            lineNumber: 1844,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, p.id, true, {
                                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                    lineNumber: 1838,
                                                                    columnNumber: 41
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1836,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1834,
                                                    columnNumber: 31
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1833,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoConfinado",
                                                validationData: permit.anexoConfinado.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1850,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1786,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1781,
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
                                                        lineNumber: 1858,
                                                        columnNumber: 86
                                                    }, this),
                                                    " Anexo: Control de Energías"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1858,
                                                columnNumber: 28
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1859,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1857,
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
                                                            lineNumber: 1864,
                                                            columnNumber: 127
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1863,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1862,
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
                                                            lineNumber: 1870,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1868,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1867,
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
                                                            lineNumber: 1877,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1875,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1874,
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
                                                            lineNumber: 1884,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1882,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1881,
                                                columnNumber: 28
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1861,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1856,
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
                                                        lineNumber: 1895,
                                                        columnNumber: 84
                                                    }, this),
                                                    " Anexo: Izaje de Cargas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1895,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1896,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1894,
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
                                                        lineNumber: 1900,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Peso de la Carga",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([, v])=>v).map(([k])=>k.replace('menor', '< ').replace('mas', '> ').replace('entre', '')).join(', ') + ' kg'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1901,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Equipo a Utilizar",
                                                        value: Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([, v])=>v).map(([k])=>k.replace(/([A-Z])/g, ' $1').toUpperCase()).join(', ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1902,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Capacidad del Equipo",
                                                        value: permit.anexoIzaje.informacionGeneral.capacidadEquipo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1903,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1899,
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
                                                            lineNumber: 1908,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1906,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1905,
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
                                                            lineNumber: 1915,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1913,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1912,
                                                columnNumber: 28
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoIzaje",
                                                validationData: permit.anexoIzaje.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1919,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1898,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1893,
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
                                                        lineNumber: 1927,
                                                        columnNumber: 85
                                                    }, this),
                                                    " Anexo: Excavaciones"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1927,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "h-4 w-4 transition-transform data-[state=open]:rotate-180"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1928,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1926,
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
                                                        lineNumber: 1932,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Profundidad",
                                                        value: permit.anexoExcavaciones.informacionGeneral.profundidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1933,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Ancho",
                                                        value: permit.anexoExcavaciones.informacionGeneral.ancho
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1934,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Largo",
                                                        value: permit.anexoExcavaciones.informacionGeneral.largo
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1935,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1931,
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
                                                            lineNumber: 1940,
                                                            columnNumber: 41
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1938,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1937,
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
                                                            lineNumber: 1947,
                                                            columnNumber: 42
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1945,
                                                    columnNumber: 34
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1944,
                                                columnNumber: 29
                                            }, this),
                                            isApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DailyValidationTable, {
                                                anexoName: "anexoExcavaciones",
                                                validationData: permit.anexoExcavaciones.validacion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1951,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 1930,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1925,
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
                                                        lineNumber: 1962,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Rol"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1963,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Aptitud"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1964,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Entrenamiento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1965,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Seg. Social"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1966,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Apertura"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1967,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                                        children: "Firma Cierre"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 1968,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 1961,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1960,
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
                                                                    lineNumber: 1975,
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
                                                                    lineNumber: 1976,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1974,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                children: worker.rol === 'Otro' ? worker.otroRol : worker.rol
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1979,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1978,
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
                                                                        lineNumber: 1983,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    worker.tsaTec?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "uppercase",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1984,
                                                                        columnNumber: 56
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1982,
                                                                columnNumber: 32
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1981,
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
                                                                        lineNumber: 1989,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.tsa && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: "TSA"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1990,
                                                                        columnNumber: 67
                                                                    }, this),
                                                                    worker.entrenamiento?.otro && worker.entrenamiento?.otroCual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "capitalize",
                                                                        children: worker.entrenamiento.otroCual
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1991,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1988,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1987,
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
                                                                        lineNumber: 1996,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.arl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "ARL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1997,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    worker.pensiones && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        className: "bg-green-100 text-green-800 text-xs p-1",
                                                                        children: "P"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 1998,
                                                                        columnNumber: 54
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 1995,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 1994,
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
                                                                lineNumber: 2002,
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
                                                                        lineNumber: 2004,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    "Firmar"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2003,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2001,
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
                                                                lineNumber: 2010,
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
                                                                        lineNumber: 2014,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    " Firmar Cierre"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2013,
                                                                columnNumber: 35
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                            lineNumber: 2008,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 1973,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 1971,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 1959,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 1958,
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
                                            lineNumber: 2028,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "solicitante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2029,
                                            columnNumber: 25
                                        }, this),
                                        isSSTSignatureRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "lider_sst"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2030,
                                            columnNumber: 52
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "autorizante"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2031,
                                            columnNumber: 25
                                        }, this),
                                        permit.controlEnergia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignatureCard, {
                                            role: "mantenimiento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2032,
                                            columnNumber: 51
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2027,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2026,
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
                                                            lineNumber: 2041,
                                                            columnNumber: 103
                                                        }, this),
                                                        " Cancelación y Cierre"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2041,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                    lineNumber: 2042,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2040,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 2039,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                        className: "p-4 border-l border-r border-b rounded-b-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                        className: "font-semibold",
                                                        children: "¿Qué acción desea realizar?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2047,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                        value: closureAction || '',
                                                        onValueChange: (value)=>setClosureAction(value),
                                                        className: "flex gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                        value: "cierre",
                                                                        id: "action-cierre"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2054,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "action-cierre",
                                                                        children: "Cerrar Permiso"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2055,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2053,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                        value: "cancelacion",
                                                                        id: "action-cancelacion"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2058,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "action-cancelacion",
                                                                        children: "Cancelar Permiso"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2059,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2057,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2048,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2046,
                                                columnNumber: 29
                                            }, this),
                                            closureAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t",
                                                children: [
                                                    closureAction === 'cancelacion' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4 p-4 border rounded-lg bg-red-50/50 border-red-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-md text-red-800",
                                                                children: "Cancelación del Trabajo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2069,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Se canceló el trabajo?",
                                                                value: permit.closure?.cancelado,
                                                                onValueChange: (val)=>handleClosureFieldChange('cancelado', val)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2070,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                placeholder: "Razón de la cancelación",
                                                                value: permit.closure?.razonCancelacion || '',
                                                                onChange: (e)=>handleClosureFieldChange('razonCancelacion', e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2071,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Nombre de quien cancela",
                                                                value: permit.closure?.canceladoPor?.nombre || '',
                                                                onChange: (e)=>handleClosureFieldChange('canceladoPor', {
                                                                        ...permit.closure?.canceladoPor,
                                                                        nombre: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2072,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "datetime-local",
                                                                value: permit.closure?.canceladoPor?.fecha || '',
                                                                onChange: (e)=>handleClosureFieldChange('canceladoPor', {
                                                                        ...permit.closure?.canceladoPor,
                                                                        fecha: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2073,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "destructive",
                                                                className: "w-full",
                                                                onClick: ()=>openSignatureDialog('cancelacion', 'firmaCierre'),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                        className: "mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2074,
                                                                        columnNumber: 160
                                                                    }, this),
                                                                    "Firmar Cancelación"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2074,
                                                                columnNumber: 45
                                                            }, this),
                                                            permit.closure?.canceladoPor?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: permit.closure.canceladoPor.firma,
                                                                alt: "Firma Cancelación",
                                                                width: 100,
                                                                height: 50,
                                                                className: "border rounded mt-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2075,
                                                                columnNumber: 85
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2068,
                                                        columnNumber: 41
                                                    }, this),
                                                    closureAction === 'cierre' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4 p-4 border rounded-lg bg-blue-50/50 border-blue-100 md:col-start-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-md text-blue-800",
                                                                children: "Cierre del Permiso"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2082,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RadioCheck, {
                                                                label: "¿Se terminó el trabajo?",
                                                                value: permit.closure?.terminado,
                                                                onValueChange: (val)=>handleClosureFieldChange('terminado', val)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2083,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                placeholder: "Observaciones de cierre",
                                                                value: permit.closure?.observacionesCierre || '',
                                                                onChange: (e)=>handleClosureFieldChange('observacionesCierre', e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2084,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 border rounded-md space-y-3 bg-white",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: "text-sm font-semibold",
                                                                        children: "Autoridad del Área"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2087,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        placeholder: "Nombre",
                                                                        value: permit.closure?.autoridad?.nombre || '',
                                                                        onChange: (e)=>handleClosureFieldChange('autoridad', {
                                                                                ...permit.closure?.autoridad,
                                                                                nombre: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2088,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "datetime-local",
                                                                        value: permit.closure?.autoridad?.fecha || '',
                                                                        onChange: (e)=>handleClosureFieldChange('autoridad', {
                                                                                ...permit.closure?.autoridad,
                                                                                fecha: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2089,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "w-full",
                                                                        onClick: ()=>openSignatureDialog('cierre_autoridad', 'firmaCierre'),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                                className: "mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 2090,
                                                                                columnNumber: 175
                                                                            }, this),
                                                                            "Firmar Cierre"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2090,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    permit.closure?.autoridad?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: permit.closure.autoridad.firma,
                                                                        alt: "Firma Cierre Autoridad",
                                                                        width: 100,
                                                                        height: 50,
                                                                        className: "border rounded mt-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2091,
                                                                        columnNumber: 86
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2086,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 border rounded-md space-y-3 bg-white",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: "text-sm font-semibold",
                                                                        children: "Responsable del Trabajo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2095,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        placeholder: "Nombre",
                                                                        value: permit.closure?.responsable?.nombre || '',
                                                                        onChange: (e)=>handleClosureFieldChange('responsable', {
                                                                                ...permit.closure?.responsable,
                                                                                nombre: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2096,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "datetime-local",
                                                                        value: permit.closure?.responsable?.fecha || '',
                                                                        onChange: (e)=>handleClosureFieldChange('responsable', {
                                                                                ...permit.closure?.responsable,
                                                                                fecha: e.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2097,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "w-full",
                                                                        onClick: ()=>openSignatureDialog('cierre_responsable', 'firmaCierre'),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signature$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Signature$3e$__["Signature"], {
                                                                                className: "mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                                lineNumber: 2098,
                                                                                columnNumber: 177
                                                                            }, this),
                                                                            "Firmar Cierre"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2098,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    permit.closure?.responsable?.firma && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: permit.closure.responsable.firma,
                                                                        alt: "Firma Cierre Responsable",
                                                                        width: 100,
                                                                        height: 50,
                                                                        className: "border rounded mt-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                        lineNumber: 2099,
                                                                        columnNumber: 88
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                                lineNumber: 2094,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                        lineNumber: 2081,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                                lineNumber: 2065,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                        lineNumber: 2045,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2038,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 1609,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "text-center text-xs text-gray-400 py-4 mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Código: DN-FR-SST-016"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2111,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Versión: 04"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                lineNumber: 2112,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                        lineNumber: 2110,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 1608,
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
                                lineNumber: 2119,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2118,
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
                                            lineNumber: 2124,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "signerName",
                                            value: signerName,
                                            onChange: (e)=>setSignerName(e.target.value),
                                            placeholder: "Ingrese su nombre completo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2125,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2123,
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
                                            lineNumber: 2134,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                            id: "signature-observation",
                                            value: signatureObservation,
                                            onChange: (e)=>setSignatureObservation(e.target.value),
                                            placeholder: "Añada comentarios si es necesario..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2135,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2133,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2121,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2143,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2117,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2116,
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
                                lineNumber: 2153,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2152,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveWorkerSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2155,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2151,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2150,
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
                                    lineNumber: 2162,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: [
                                        signatureConsents.solicitante,
                                        " ¿Desea continuar?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2163,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2161,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2168,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: ()=>openSignatureDialog('solicitante', 'firmaApertura'),
                                    children: "Confirmar y Firmar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2169,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2167,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2160,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2159,
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
                                lineNumber: 2179,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2178,
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
                                    lineNumber: 2182,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-name",
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2184,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-name",
                                            value: dailyValidationName,
                                            onChange: (e)=>setDailyValidationName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2185,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "daily-validation-date",
                                            children: "Fecha y Hora"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2188,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "daily-validation-date",
                                            type: "datetime-local",
                                            value: dailyValidationDate,
                                            onChange: (e)=>setDailyValidationDate(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                            lineNumber: 2189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                                    lineNumber: 2187,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$signature$2d$pad$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignaturePad"], {
                            onSave: handleSaveDailyValidationSignature,
                            isSaving: isSigning
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                            lineNumber: 2192,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                    lineNumber: 2177,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
                lineNumber: 2176,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/permits/[id]/page.tsx",
        lineNumber: 1570,
        columnNumber: 7
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f8708f6a._.js.map