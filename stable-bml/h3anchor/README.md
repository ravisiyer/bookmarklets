# Using the h3anchor Bookmarklet

The **h3anchor** bookmarklet adds an anchor link (`#`) to an `<h3>` section header and ensures the header has a stable `id` attribute.  
This makes it easy to link directly to specific sections in long articles (for example, in Blogger posts edited via **Edit HTML**).

---

## What the Bookmarklet Does

- Works on selected text or selected `<h3>...</h3>` HTML
- Ensures the `<h3>` element has an `id`
- Adds a visible anchor link (`#`) at the end of the heading
- Copies the generated HTML to the clipboard (no direct page modification)

The generated anchor `id`:
- Is derived from the heading text (slugified)
- Is limited to a reasonable length for readability and stability

---

## How to Use

1. Select the section header you want to process.
   - **If the header already has `<h3>` tags**  
     Select the entire header, from the opening `<h3>` tag to the closing `</h3>` tag.
   - **If the header is plain text**  
     Select the full header text. The bookmarklet will wrap it in `<h3>` tags.

2. Click the **h3anchor** bookmarklet in your browser.

3. The generated `<h3>` HTML is copied to your clipboard.

4. Paste the clipboard contents back into your document (for example, in Blogger’s *Edit HTML* mode).

---

## Examples

### Example 1: Plain Text Selected

**Selected text**

Installation

**Generated HTML**
```html
<h3 id="installation">
  Installation <a href="#installation">#</a>
</h3>
```

### Example 2: Existing `<h3>` Without id

**Selected HTML**
```html
<h3>Getting Started</h3>
```
**Generated HTML**

```html
<h3 id="getting-started">
  Getting Started <a href="#getting-started">#</a>
</h3>
```
### Example 3: Existing `<h3>` With Attributes

**Selected HTML**
```html
<h3 style="text-align: left;">AI Generated Learn Content for K-12 Mathematics</h3>
```
**Generated HTML**

```html
<h3 id="ai-generated-learn-c" style="text-align: left;">
  AI Generated Learn Content for K-12 Mathematics
  <a href="#ai-generated-learn-c">#</a>
</h3>
```

## Notes and Limitations

- The bookmarklet does not directly modify the page DOM; it only copies HTML to the clipboard.
- Designed primarily for Chrome and Chrome-compatible browsers.
- Intended for use in HTML editors (such as Blogger’s Edit HTML), not rich-text WYSIWYG mode.
- Only `<h3>` headings are supported by design to reduce complexity and testing work. Other heading levels (h1, h2, etc.) could be considered for addition in the future if needed.

## Typical Use Case

- Blogger or static-site authors
- Long technical or tutorial posts
- Manual control over anchor IDs without installing plugins or scripts

---

## Author

Ravi S. Iyer with assistance from ChatGPT.