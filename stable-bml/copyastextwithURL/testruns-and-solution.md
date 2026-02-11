# copyastextwithURL – Test Runs and Final Solution Notes

This document captures the experiments performed while developing the **copyastextwithURL** bookmarklet, the issues encountered, and the reasoning that led to the final working solution.

The objective of the bookmarklet is:

> Copy the user’s selection as **rendered plain text**, but expand hyperlinks into  
> `link text, URL`  
> so that when pasted into WhatsApp, Facebook, LinkedIn, etc., both text and link destination are visible.

---

## Initial Problem Statement

We needed:

1.  Rendered plain text (not raw HTML source).
2.  Correct whitespace behavior matching browser rendering.
3.  URLs appended after link text.
4.  No extra blank lines or indentation artifacts.
5.  No newline insertion before or after link text.

The main challenge turned out to be **preserving rendered layout semantics while modifying anchor elements**.

---

## Test Functions and Observations

`copyastextwithURL-testruns.html` is the test version source file with various functions with comments showing the outputs obtained from each of them for same input. 

### 1️⃣ `run()` – Clone DOM + Replace Anchors

**Approach:**

*   Clone selected DOM range into a temporary container.
*   Replace `<a>` elements with `text, URL`.
*   Extract `textContent`.
*   Normalize whitespace.

**Observation:**

*   Indentation and source formatting leaked into output.
*   Newlines appeared before and after anchor replacements.
*   Block-level processing introduced artificial line breaks.

**Insight:**  
DOM cloning preserves _source structure_, not _rendered layout behavior_.  
Whitespace in HTML source ≠ whitespace in rendered page.

This approach fundamentally worked at a structural level but failed at visual fidelity.

---

## 2️⃣ `getRenderedSelectionText()` – Using `innerText`

**Approach:**

*   Clone selection.
*   Use `innerText` to approximate rendered output.

**Observation:**

*   Better alignment with browser rendering.
*   Still inconsistent newlines.
*   Anchor expansion not integrated yet.

**Insight:**  
`innerText` is closer to what the user visually sees, because it is layout-aware.  
However, modifying the DOM before extracting `innerText` reintroduced spacing issues.

---

## 3️⃣ `getCleanRenderedText()` – `selection.toString()` + Normalize

**Approach:**

*   Use `selection.toString()` (browser-rendered text).
*   Collapse whitespace with regex.

**Observation:**

*   Very clean output.
*   But completely loses structural paragraph breaks.
*   Becomes one continuous block of text.

**Insight:**  
`selection.toString()` provides the most reliable baseline for rendered text.  
However, naive normalization removes meaningful layout breaks.

This was an important turning point.

---

## 4️⃣ `getExactRenderedText()` – Controlled Whitespace Processing

**Approach:**

*   Clone selection.
*   Use `innerText`.
*   Carefully normalize tabs, indentation, and excessive blank lines.

**Observation:**

*   Better, but still inconsistent line wrapping around inline elements.
*   Anchor replacement still problematic.
    
**Insight:**  
Trying to reconstruct layout from DOM cloning is inherently fragile.

---

## 5️⃣ `getExactRenderedSelection()` – Force Layout Context

**Approach:**

*   Clone selection.
*   Apply `white-space: pre-line`.
*   Temporarily attach to DOM.
*   Extract `innerText`.

**Observation:**

*   Much closer to browser visual layout.
*   Still complex and somewhat indirect.
*   Anchor modification still needed.
    
**Insight:**  
The browser’s rendering engine must be treated as authoritative for whitespace.  
Trying to simulate layout rules manually leads to edge cases.

---

## Core Realization

The major breakthrough was this:

> Instead of modifying cloned DOM and then extracting text,  
> use the browser-rendered selection text as the baseline,  
> and only surgically expand anchor text within that baseline.

This reversed the processing direction.

---

## Final Strategy

The working source file with the implementation described below is named: `copyastextwithURL.html`. 

The final working logic does:

1.  Get rendered selection text using `range.toString()`.
2.  Clone selection into a temporary container.
3.  Locate anchor elements inside the clone.
4.  For each anchor:
    *   Extract visible link text.
    *   Extract and normalize `href`.
    *   Construct replacement:
        `link text, URL`
    *   Replace the first matching occurrence of the link text  
        in the rendered selection string.
5.  Preserve the original rendered line structure.
6.  Apply minimal trimming:
    *   Remove indentation artifacts.
    *   Avoid aggressive whitespace collapsing.

---

## Why This Works

*   `range.toString()` gives text consistent with what the user sees.
*   We do not rely on DOM whitespace.
*   We avoid inserting artificial newlines.
*   We only modify anchor text portions.
*   Paragraph and block spacing remain intact.
    
This approach treats:

> Rendered text as canonical  
> DOM structure as metadata source for URL expansion

That separation is what resolved the whitespace issue.

---

## Handling Special Cases

The final implementation includes:

*   `mailto:` links converted to plain email addresses.
*   If link text already equals URL → no duplication.
*   Multiple anchors handled sequentially using offset tracking.
*   Avoids introducing extra blank lines.
*   Preserves natural paragraph spacing.

---

## Key Lessons Learned

1.  DOM cloning does not preserve rendered whitespace semantics.
2.  `innerText` is layout-aware but still influenced by DOM structure.
3.  `selection.toString()` is the closest representation of user-visible text.
4.  Anchor expansion must be performed relative to rendered text, not raw HTML.
5.  Whitespace normalization must be conservative.

---

## Final Result

The bookmarklet now:
*   Copies rendered text.
*   Expands links into `text, URL`.
*   Preserves visual paragraph layout.
*   Produces clean output suitable for:
    *   WhatsApp
    *   Facebook
    *   LinkedIn
    *   Plain text editors

---

## Documentation Note

This file documents the exploratory phase because:

*   The problem initially appeared simple.
*   The whitespace behavior turned out to be non-trivial.
*   Multiple experimental functions clarified limitations of each method.

Retaining this record may help future debugging if layout or edge cases arise.