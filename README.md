# Chrome Bookmarklet Development and Testing Harness

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

This repository uses a small Node.js utility to reliably convert working JavaScript into a Chrome bookmarklet.

### Recommended Workflow

1. Develop and test the logic as a normal multiline function (for example, `run()`) using the HTML test harness.
2. Save only the `run()` function code (no HTML, no harness code) into a `.js` file.
3. Run the conversion utility:

      ```bash
      node make-bookmarklet.js <input-file.js>
      ```
4. The script generates a new file with the suffix .bml.txt.
    - This file contains a single-line, bookmarklet-ready URL starting with javascript:.
    - The script aborts if the output file already exists.
5. Create a new Chrome bookmark.
6. Copy the contents of the generated .bml.txt file and paste it into the URL field of a Chrome bookmark.

### Conversion Utility Notes
  - The utility handles minification and safe encoding required for bookmarklets.
  - Manual copy-paste errors and browser auto-encoding issues are avoided by using the script.
  - sample-run.js is an example input file for the utility, and sample-run.js.bml.txt is the resulting bookmarklet output.

---

## Using the Bookmarklet

1. Read the README of the particular bookmarklet for any specific instructions and to know its functionality.
2. Click the bookmark to run it on the current page.

---

## Repository Structure

- **dev-bench/** – Contains in-progress bookmarklets and development/test harnesses.  
  Use this folder to develop and debug bookmarklets.

- **stable-bml/** – Contains production-ready, tested bookmarklets. bml stands for bookmarklet.
  Each bookmarklet has its own folder with the minified `.bml.txt` bookmarklet file, the multiline source code, test harness, and a dedicated `README.md` explaining usage.

---

## Notes

- Chrome bookmarks are for deployment only.
- Source code lives in this repository.
- The test harness is the preferred development environment.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
