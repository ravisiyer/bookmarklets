# Using the copyastextwithURL Bookmarklet

The **copyastextwithURL** bookmarklet copies the user’s selection to the Clipboard as rendered plain text, but expands hyperlinks within selection into link text, URL.

---

## How to Use

1. In Chrome browser, go to any webpage.
2. Select the text you want to copy including any hyperlinks within it.
3. Click your **Copy As Text With URL** bookmark.
4. Browser console will have a message: `Selection text with URLs copied!`
5. Paste (`Ctrl+V`) into any editor or WhatsApp, Facebook, LinkedIn etc. social media post.
    * Text of selection will be pasted as plain text, but hyperlinks will be expanded into link text, URL format. See example below.

---
## Example

### Original Webpage content:

#### As rendered on webpage:
> Next I wanted to generate a TOC for the anchor linked sections created above. For that I used my [auto-header-ids-toc VSCode extension](https://raviswdev.blogspot.com/2025/09/vscode-extension-to-auto-add-id.html). I had to add h3 to the extension's settings: auto-header-ids-toc.headersToProcess.

#### Corresponding HTML

> Next I wanted to generate a TOC for the anchor linked sections created above. For that I used my &lt;a href="https://raviswdev.blogspot.com/2025/09/vscode-extension-to-auto-add-id.html"&gt;auto-header-ids-toc VSCode extension&lt;/a&gt;. I had to add h3 to the extension's settings: auto-header-ids-toc.headersToProcess.


Note that the content as rendered on the webpage shows "auto-header-ids-toc VSCode extension" as a clickable link which takes the user to the associated URL, but without the URL being printed in the content on the webpage. On hovering the mouse over the link, the URL would be shown in the browser's status bar but the status bar cannot be included in the selection of content from the webpage that is to be copied.

### After using the bookmarklet and pasting:

> Next I wanted to generate a TOC for the anchor linked sections created above. For that I used my auto-header-ids-toc VSCode extension, https://raviswdev.blogspot.com/2025/09/vscode-extension-to-auto-add-id.html. I had to add h3 to the extension's settings: auto-header-ids-toc.headersToProcess.

---

## Author

Ravi S. Iyer with assistance from ChatGPT.