module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "prettier",
    ],
    overrides: [
        {
            files: ["src/pages/**/*.tsx", "src/pages/api/**/*.ts", "next.config.mjs"],
            rules: {
                // pages コンポーネントのデフォルトエクスポートを許可
                "import/no-default-export": "off",
            },
        },
    ],
    plugins: [
        "sort-keys-custom-order",
        "simple-import-sort",
        "import",
        "unused-imports",
    ],
    root: true,
    rules: {
        // 型インポートの強制
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            { prefer: "type-imports" },
        ],
        // エクスポート関数などの引数・戻り値の型を強制。
        "@typescript-eslint/explicit-module-boundary-types": "off",

        /* typescript-eslint */
        // 暗黙的な any を禁止
        "@typescript-eslint/no-explicit-any": "off",
        // 未使用 かつ _ から始まらない変数を禁止
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        // var require を禁止
        "@typescript-eslint/no-var-requires": "off",
        // アロー関数で一行省略の禁止
        "arrow-body-style": ["error", "always"],
        // ブロックの中括弧（{}）を省略しない
        //curly: "error",
        // アロー関数の使用を強制
        "func-style": ["error", "expression"],

        /* import 系 */
        // import 文はファイル先頭に書くことを強制
        "import/first": "error",
        // インポート時に改行を強制
        "import/newline-after-import": "error",
        // デフォルトエクスポートを禁止
        "import/no-default-export": "error",
        // パッケージが同じ場合は 1 つの import にまとめる
        "import/no-duplicates": "error",
        // console.log をエラーにする
        // "no-console": ["error", { allow: ["warn", "info", "error"] }],
        // React のデフォルトインポートや特定のライブラリからのインポート禁止
        "no-restricted-imports": [
            "error",
            { paths: [{ importNames: ["default"], name: "react" }] },
        ],
        // Enum の禁止
        "no-restricted-syntax": [
            "error",
            { message: "Don't declare enums", selector: "TSEnumDeclaration" },
        ],
        // コールバック関数にアロー関数の使用を強制
        "prefer-arrow-callback": "error",
        // const の使用を強制
        "prefer-const": "error",

        /* react */
        // 分割代入の強制
        "react/destructuring-assignment": ["error", "always"],
        // エクスポート順序を強制
        "simple-import-sort/exports": "error",
        // インポート順序を強制
        "simple-import-sort/imports": "error",
        // オブジェクトキーのソート（ id は一番先頭に配置）
        "sort-keys-custom-order/object-keys": ["error", { orderedKeys: ["id"] }],

        /* others */
        // typeキーのソート（ id は一番先頭に配置）
        "sort-keys-custom-order/type-keys": ["error", { orderedKeys: ["id"] }],
        // 使用していないインポートを禁止
        "unused-imports/no-unused-imports": "error",
    },
};