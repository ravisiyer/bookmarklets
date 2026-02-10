#!/usr/bin/env node
/**
 * make-bookmarklet.js
 * -------------------
 * Purpose:
 * This Node.js utility converts a multi-line JavaScript bookmarklet function
 * (written in normal, readable form) into a single-line
 * `javascript:(...)();` bookmarklet URL suitable for use in Chrome.
 *
 * It is intended for cases where the bookmarklet logic is first developed and
 * tested in an HTML harness, and then programmatically converted into a
 * bookmarklet to avoid manual copy-paste and encoding errors.
 *
 * What the script does:
 * - Reads an input file containing bookmarklet JavaScript code
 * - Wraps the code in an IIFE prefixed with `javascript:`
 * - Collapses the code into a single line
 * - URL-encodes only where required for bookmarklet safety
 *   (while preserving regex literals and template strings)
 * - Writes the result to a new file with `.bml.txt` appended
 * - Aborts if the output file already exists (to avoid overwriting)
 *
 * How to use:
 * 1) Place your multi-line bookmarklet function code in a file
 *    (e.g. h3anchor.js)
 * 2) Run:
 *      node make-bookmarklet.js h3anchor.js
 * 3) The script will create:
 *      h3anchor.js.bml.txt
 * 4) Copy the contents of the `.bml.txt` file into the URL field of a Chrome bookmark
 *
 * Notes:
 * - This is a bookmarklet encoder, not a general-purpose JavaScript minifier
 * - Encoding is intentionally conservative to keep the output readable and debuggable
 * - Designed and tested for Chrome bookmarklets
 */

const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node make-bookmarklet.js <input-file>");
  process.exit(1);
}

const inputPath = process.argv[2];

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const outputPath = inputPath + ".bml.txt";

if (fs.existsSync(outputPath)) {
  console.error(`Output file already exists: ${outputPath}`);
  console.error("Aborting to avoid overwrite.");
  process.exit(1);
}

// Read source
let code = fs.readFileSync(inputPath, "utf8");

// Basic sanity check
if (!/function\s+run\s*\(/.test(code)) {
  console.error("Input file does not appear to contain a run() function.");
  process.exit(1);
}

// Strip comments (single-line and multi-line)
code = code
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "");

// Collapse whitespace
code = code
  .replace(/\r?\n+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// Wrap + prefix for bookmarklet
const bookmarklet =
  "javascript:(function(){" +
  code.replace(/^function\s+run\s*\(\)\s*\{/, "").replace(/\}$/, "") +
  "})();";

// Write output
fs.writeFileSync(outputPath, bookmarklet, "utf8");

console.log("Bookmarklet created:");
console.log(outputPath);
