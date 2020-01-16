module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "ignorePatterns": ['*.test.js'],
  "rules": {
    /* Possible Errors */
    "comma-dangle": [1, "always-multiline"], //disallow or enforce trailing commas (recommended)
    "no-cond-assign": [1, "except-parens"], //disallow assignment in conditional expressions (recommended)
    "no-console": 0, //disallow use of console in the node environment (recommended)
    "no-constant-condition": 1, //disallow use of constant expressions in conditions (recommended)
    "no-control-regex": 1, //disallow control characters in regular expressions (recommended)
    "no-debugger": 1, //disallow use of debugger (recommended)
    "no-dupe-args": 1, //disallow duplicate arguments in functions (recommended)
    "no-dupe-keys": 1, //disallow duplicate keys when creating object literals (recommended)
    "no-duplicate-case": 1, //disallow a duplicate case label. (recommended)
    "no-empty-character-class": 1, //disallow the use of empty character classes in regular expressions (recommended)
    "no-empty": 1, //disallow empty statements (recommended)
    "no-ex-assign": 1, //disallow assigning to the exception in a catch block (recommended)
    "no-extra-boolean-cast": 1, //disallow double-negation boolean casts in a boolean context (recommended)
    "no-extra-parens": 0, //disallow unnecessary parentheses
    "no-extra-semi": 1, //disallow unnecessary semicolons (recommended) (fixable)
    "no-func-assign": 1, //disallow overwriting functions written as function declarations (recommended)
    "no-inner-declarations": [1, "functions"], //disallow function or variable declarations in nested blocks (recommended)
    "no-invalid-regexp": 1, //disallow invalid regular expression strings in the RegExp constructor (recommended)
    "no-irregular-whitespace": 1, //disallow irregular whitespace outside of strings and comments (recommended)
    "no-negated-in-lhs": 1, //disallow negation of the left operand of an in expression (recommended)
    "no-obj-calls": 1, //disallow the use of object properties of the global object (Math and JSON) as functions (recommended)
    "no-regex-spaces": 1, //disallow multiple spaces in a regular expression literal (recommended)
    "no-sparse-arrays": 1, //disallow sparse arrays (recommended)
    "no-unexpected-multiline": 1, //Avoid code that looks like two expressions but is actually one
    "no-unreachable": 1, //disallow unreachable statements after a return, throw, continue, or break statement (recommended)
    "use-isnan": 1, //disallow comparisons with the value NaN (recommended)
    "valid-jsdoc": 1, //Ensure JSDoc comments are valid
    "valid-typeof": 1, //Ensure that the results of typeof are compared against a valid string (recommended)

    /* Best Practices */
    "accessor-pairs": 0, //Enforces getter/setter pairs in objects
    "block-scoped-var": 1, // treat var statements as if they were block scoped
    "complexity": 0, //specify the maximum cyclomatic complexity allowed in a program
    "consistent-return": 0, //require return statements to either always or never specify values
    "curly": [1, "all"], //specify curly brace conventions for all control statements
    "default-case": 1, //require default case in switch statements
    "dot-location": [1, "property"], //enforces consistent newlines before or after dots
    "dot-notation": [1, { "allowKeywords": true, "allowPattern": "" }], //encourages use of dot notation whenever possible
    "eqeqeq": 1, //require the use of === and !== (fixable)
    "guard-for-in": 0, //make sure for-in loops have an if statement
    "no-alert": 1, //disallow the use of alert, confirm, and prompt
    "no-caller": 1, //disallow use of arguments.caller or arguments.callee
    "no-case-declarations": 0, // disallow lexical declarations in case clauses
    "no-div-regex": 1, //disallow division operators explicitly at beginning of regular expression
    "no-else-return": 1, //disallow else after a return in an if
    "no-empty-pattern": 1, //disallow use of empty destructuring patterns
    "no-eq-null": 1, //disallow comparisons to null without a type-checking operator
    "no-eval": 1, //disallow use of eval()
    "no-extend-native": 1, //disallow adding to native types
    "no-extra-bind": 1, //disallow unnecessary function binding
    "no-fallthrough": 1, //disallow fallthrough of case statements (recommended)
    "no-floating-decimal": 1, //disallow the use of leading or trailing decimal points in numeric literals
    "no-implicit-coercion": 1, //disallow the type conversions with shorter notations
    "no-implied-eval": 1, //disallow use of eval()-like methods
    "no-invalid-this": 0, //disallow this keywords outside of classes or class-like objects
    "no-iterator": 1, //disallow usage of __iterator__ property
    "no-labels": 1, //disallow use of labeled statements
    "no-lone-blocks": 1, //disallow unnecessary nested blocks
    "no-loop-func": 1, //disallow creation of functions within loops
    "no-magic-numbers": [1, { "ignore": [-1, 0, 1] }], // disallow the use of magic numbers
    "no-multi-spaces": 1, //disallow use of multiple spaces (fixable)
    "no-multi-str": 1, //disallow use of multiline strings
    "no-native-reassign": 1, //disallow reassignments of native objects
    "no-new-func": 1, //disallow use of new operator for Function object
    "no-new-wrappers": 1, //disallows creating new instances of String,Number, and Boolean
    "no-new": 1, //disallow use of the new operator when not part of an assignment or comparison
    "no-octal-escape": 1, //disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-octal": 1, //disallow use of octal literals (recommended)
    "no-param-reassign": [1, {"props": false}], //disallow reassignment of function parameters
    "no-process-env": 0, //disallow use of process.env
    "no-proto": 1, //disallow usage of __proto__ property
    "no-redeclare": 1, //disallow declaring the same variable more than once (recommended)
    "no-return-assign": 1, //disallow use of assignment in return statement
    "no-script-url": 1, //disallow use of javascript: urls.
    "no-self-compare": 1, //disallow comparisons where both sides are exactly the same
    "no-sequences": 1, //disallow use of the comma operator
    "no-throw-literal": 1, //restrict what can be thrown as an exception
    "no-unused-expressions": [1, { allowShortCircuit: true, allowTernary: true }], //disallow usage of expressions in statement position
    "no-useless-call": 1, //disallow unnecessary .call() and .apply()
    "no-useless-concat": 1, //disallow unnecessary concatenation of literals or template literals
    "no-void": 0, //disallow use of the void operator
    "no-warning-comments": [1, { "terms": ["todo", "fixme"], "location": "start" }], //disallow usage of configurable warning terms in comments e.g. TODO or FIXME
    "no-with": 1, //disallow use of the with statement
    "radix": 0, // require use of the second argument for parseInt()
    "vars-on-top": 1, //require declaration of all vars at the top of their containing scope
    "wrap-iife": [1, "inside"], //require immediate function invocation to be wrapped in parentheses
    "yoda": [1, "never"], //require or disallow Yoda conditions

    /* Strict Mode */
    "strict": [1, "never"], //controls location of Use Strict Directives

    /* Variables */
    "init-declarations": 0, //enforce or disallow variable initializations at definition
    "no-catch-shadow": 1, //disallow the catch clause parameter name being the same as a variable in the outer scope
    "no-delete-var": 1, //disallow deletion of variables (recommended)
    "no-label-var": 1, //disallow labels that share a name with a variable
    "no-shadow-restricted-names": 0, //disallow shadowing of names such as arguments
    "no-shadow": 0, //disallow declaration of variables already declared in the outer scope
    "no-undef-init": 1, //disallow use of undefined when initializing variables
    "no-undef": 1, //disallow use of undeclared variables unless mentioned in a /*global */ block (recommended)
    "no-undefined": 0, //disallow use of undefined variable
    "no-unused-vars": [1, { "vars": "local", "args": "after-used" }], //disallow declaration of variables that are not used in the code (recommended)
    "no-use-before-define": 1, //disallow use of variables before they are defined

    /* Node.js */
    "callback-return": 1, //enforce return after a callback
    "global-require": 1, //enforce require() on top-level module scope
    "handle-callback-err": 1, //enforce error handling in callbacks
    "no-mixed-requires": 1, //disallow mixing regular variable and require declarations
    "no-new-require": 1, //disallow use of new operator with the require function
    "no-path-concat": 1, //disallow string concatenation with __dirname and __filename
    "no-process-exit": 1, //disallow process.exit()
    "no-restricted-modules": [1, ""], //restrict usage of specified node modules
    "no-sync": 1, //disallow use of synchronous methods

    /* Stylistic Issues */
    "array-bracket-spacing": [1, "never"], //enforce spacing inside array brackets (fixable)
    "block-spacing": [1, "always"], //disallow or enforce spaces inside of single line blocks (fixable)
    "brace-style": [1, "stroustrup", { "allowSingleLine": true }], //enforce one true brace style
    "camelcase": [1, { "properties": "always" }], //require camel case names
    "comma-spacing": [1, { "before": false, "after": true }], //enforce spacing before and after comma
    "comma-style": [1, "last"], //enforce one true comma style
    "computed-property-spacing": 0, //require or disallow padding inside computed properties (fixable)
    "consistent-this": 0, //enforce consistent naming when capturing the current execution context
    "eol-last": 1, //enforce newline at the end of file, with no multiple empty lines (fixable)
    "func-names": 1, //require function expressions to have a name
    "func-style": 0, //enforce use of function declarations or expressions
    "id-length": 0, //this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
    "id-match": [0, "^[a-z]+([A-Z][a-z]*)*$", {"properties": true}], //require identifiers to match the provided regular expression
    "indent": [1, 2], //specify tab or space width for your code (fixable)
    "jsx-quotes": [1, "prefer-single"], //specify whether double or single quotes should be used in JSX attributes
    "key-spacing": [1, { "beforeColon": false, "afterColon": true }], //enforce spacing between keys and values in object literal properties
    "linebreak-style": 0, //disallow mixed 'LF' and 'CRLF' as linebreaks
    "lines-around-comment": [1, { "beforeLineComment": true, "allowBlockStart": true, "allowObjectStart": true, "allowArrayStart": true }], //enforce empty lines around comments
    "max-nested-callbacks": [0, 3], //specify the maximum depth callbacks can be nested
    "new-cap": [1, { "capIsNewExceptions": ["NaN", "T.Promise"] }], // require a capital letter for constructors
    "new-parens": 1, //disallow the omission of parentheses when invoking a constructor with no arguments
    "newline-after-var": 0, //require or disallow an empty newline after variable declarations
    "no-array-constructor": 1, //disallow use of the Array constructor
    "no-continue": 1, //disallow use of the continue statement
    "no-inline-comments": 1, // disallow comments inline after code
    "no-lonely-if": 1, //disallow if as the only statement in an else block
    "no-mixed-spaces-and-tabs": 1, //disallow mixed spaces and tabs for indentation (recommended)
    "no-multiple-empty-lines": [1, { "max": 1 }], //disallow multiple empty lines
    "no-negated-condition": 1, //disallow negated conditions
    "no-nested-ternary": 0, //disallow nested ternary expressions
    "no-new-object": 1, //disallow the use of the Object constructor
    "no-restricted-syntax": [1,
      "ContinueStatement",
      "DoWhileStatement",
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement",
      "ExportAllDeclaration",
    ], //disallow use of certain syntax in code
    "no-spaced-func": 1, //disallow space between function identifier and application (fixable)
    "no-ternary": 0, //disallow the use of ternary operators
    "no-trailing-spaces": 1, //disallow trailing whitespace at the end of lines (fixable)
    "no-underscore-dangle": 0, //disallow dangling underscores in identifiers
    "no-unneeded-ternary": 1, //disallow the use of ternary operators when a simpler alternative exists
    "object-curly-spacing": [1, "always"], // require or disallow padding inside curly braces (fixable)
    "one-var": [0, "never"], //require or disallow one variable declaration per function
    "operator-assignment": [1, "never"], //require assignment operator shorthand where possible or prohibit it entirely
    "operator-linebreak": [1, "after"], //enforce operators to be placed before or after line breaks
    "padded-blocks": [0, "never"], //enforce padding within blocks
    "quote-props": [0, "as-needed"], //require quotes around object literal property names
    "quotes": [1, "single"], //specify whether backticks, double or single quotes should be used (fixable)
    "require-jsdoc": 0, //Require JSDoc comment
    "semi-spacing": [1, { "before": false, "after": true }], //enforce spacing before and after semicolons
    "semi": [0, "always"], //require or disallow use of semicolons instead of ASI (fixable)
    "sort-vars": 0, //sort variables within the same declaration block
    "space-after-keywords": 0, //require a space after certain keywords (fixable)
    "space-before-blocks": [1, "always"], //require or disallow a space before blocks (fixable)
    "space-before-function-paren": [1, "never"], //require or disallow a space before function opening parenthesis (fixable)
    "space-before-keywords": [0, "never"], //require a space before certain keywords (fixable)
    "space-in-parens": [1, "never"], //require or disallow spaces inside parentheses
    "space-infix-ops": 1, //require spaces around operators (fixable)
    "keyword-spacing": 1, //require a space after return, throw, and case (fixable)
    "space-unary-ops": 0, //require or disallow spaces before/after unary operators (fixable)
    "spaced-comment": [1, "always"], //require or disallow a space immediately following the // or /* in a comment
    "wrap-regex": 1, //require regex literals to be wrapped in parentheses

    /* ECMAScript 6 */
    "arrow-body-style": [1, "as-needed"], // require braces in arrow function body
    "arrow-parens": [0, "always"], // require parens in arrow function arguments
    "arrow-spacing": [1, { "before": true, "after": true }], //require space before/after arrow function's arrow (fixable)
    "constructor-super": 1, //verify calls of super() in constructors
    "no-confusing-arrow": 1, // disallow arrow functions where a condition is expected
    "generator-star-spacing": [1, "after"], // enforce spacing around the * in generator functions (fixable)
    "no-class-assign": 1, //disallow modifying variables of class declarations
    "no-const-assign": 1, //disallow modifying variables that are declared using const
    "no-dupe-class-members": 1, //disallow duplicate name in class members
    "no-this-before-super": 1, //disallow use of this/super before calling super() in constructors.
    "no-var": 1, //require let or const instead of var
    "object-shorthand": 1, // (see Babel section) require method and property shorthand syntax for object literals
    "prefer-arrow-callback": 1, //suggest using arrow functions as callbacks
    "prefer-const": 1, //suggest using const declaration for variables that are never modified after declared
    "prefer-reflect": 1, //suggest using Reflect methods where applicable
    "prefer-spread": 1, //suggest using the spread operator instead of .apply().
    "prefer-template": 1, //suggest using template literals instead of strings concatenation
    "require-yield": 1, //disallow generator functions that do not have yield

    /* Legacy */
    "max-depth": [0, 3], //specify the maximum depth that blocks can be nested
    "max-len": [1, 121, 2], //specify the maximum length of a line in your program
    "max-params": 0, //limits the number of parameters that can be used in the function declaration.
    "max-statements": 0, //specify the maximum number of statement allowed in a function
    "no-bitwise": 1, //disallow use of bitwise operators
    "no-plusplus": 1, //disallow use of unary operators, ++ and --

    /* React */
    "react/display-name": 0, //Prevent missing displayName in a React component definition
    "react/forbid-prop-types": 0, //Forbid certain propTypes
    "react/jsx-boolean-value": 1, //Enforce boolean attributes notation in JSX
    "react/jsx-closing-bracket-location": 0, //Validate closing bracket location in JSX
    "react/jsx-curly-spacing": 0, //Enforce or disallow spaces inside of curly braces in JSX attributes
    "react/jsx-indent-props": [1, 2], //Validate props indentation in JSX
    "react/jsx-key": 1, // Validate JSX has key prop when in array or iterator
    "react/jsx-max-props-per-line": 0, //Limit maximum of props on a single line in JSX
    "react/jsx-no-bind": 0, // Prevent usage of .bind() and arrow functions in JSX props
    "react/jsx-no-duplicate-props": 1, //Prevent duplicate properties in JSX
    "react/jsx-no-literals": 0, //Prevent usage of unwrapped JSX strings
    "react/jsx-no-undef": 1, //Disallow undeclared variables in JSX
    "react/jsx-pascal-case": 1, // Enforce PascalCase for user-defined JSX components
    "react/sort-prop-types": 1, //Enforce propTypes declarations alphabetical sorting
    "react/jsx-sort-props": 1, //Enforce props alphabetical sorting
    "react/jsx-uses-react": 1, //Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": 1, //Prevent variables used in JSX to be incorrectly marked as unused
    "react/no-danger": 1, //Prevent usage of dangerous JSX properties
    "react/no-did-mount-set-state": 1, //Prevent usage of setState in componentDidUpdate
    "react/no-did-update-set-state": 1, //Prevent usage of setState in componentDidUpdate
    "react/no-direct-mutation-state": 1, //Prevent direct mutation of this.state
    "react/no-multi-comp": 1, //Prevent multiple component definition per file
    "react/no-set-state": 0, //Prevent usage of setState
    "react/no-unknown-property": 1, //Prevent usage of unknown DOM property
    "react/prefer-es6-class": 1, //Use ES6 Class instead of Reacy.createClass
    "react/prop-types": 1, //Prevent missing props validation in a React component definition
    "react/react-in-jsx-scope": 1, //Prevent missing React when using JSX
    "react/require-extension": 0, //Restrict file extensions that may be required
    "react/self-closing-comp": 1, //Prevent extra closing tags for components without children
    "react/sort-comp": 1, //Enforce component methods order
    "react/wrap-multilines": 0 //Prevent missing parentheses around multiline JSX

  }
};
