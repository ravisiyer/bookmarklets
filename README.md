# Bookmarklet Test Harness

This repository is used to develop, test, and version-control Chrome bookmarklets
using a local HTML test harness and VSCode.

---

## Test Harness

The test harness is a simple local HTML file with a `run()` function that contains
the bookmarklet logic.

Example:

```html
<button onclick="run()">Run Bookmarklet Logic</button>
```

All bookmarklet logic is written and tested inside the `run()` function first.

---

## Development Workflow

1. Write and test JavaScript logic inside the `run()` function in the test HTML file.
2. Use alerts or console output during development.
3. Do NOT use `javascript:` or bookmarklet wrappers while testing.

---

## Creating the Bookmarklet

1. Copy the body of the `run()` function.
2. Wrap it in an IIFE:

```js
(function () {
  // bookmarklet logic
})();
```

3. Prefix it with `javascript:` and put everything on one line:

```js
javascript:(function(){ /* logic */ })();
```

---

## Using the Bookmarklet

1. Create a new Chrome bookmark.
2. Paste the final bookmarklet code into the URL field.
3. Click the bookmark to run it on the current page.

---

## Notes

- Chrome bookmarks are for deployment only.
- Source code lives in this repository.
- The test harness is the preferred development environment.
