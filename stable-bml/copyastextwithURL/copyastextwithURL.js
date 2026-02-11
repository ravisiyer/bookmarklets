function run() {
  const sel = window.getSelection();
  if (!sel.rangeCount || sel.isCollapsed)
    return alert('No selection!');

  const range = sel.getRangeAt(0);
  const container = document.createElement('div');
  container.appendChild(range.cloneContents());

  let output = '';

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Collapse whitespace but preserve single spaces
      const text = node.textContent.replace(/\s+/g, ' ');
      output += text;
    }
    else if (node.nodeType === Node.ELEMENT_NODE) {

      const tag = node.tagName;

      // Block elements → ensure newline boundary
      const blockTags = ['P','DIV','LI','H1','H2','H3','H4','H5','H6','OL','UL'];

      if (blockTags.includes(tag)) {
        output = output.trimEnd() + '\n';
      }

      if (tag === 'A') {
        const text = node.textContent.trim();
        let href = node.getAttribute('href') || '';

        if (href.startsWith('mailto:')) {
          href = href.replace(/^mailto:/, '');
        }

        if (!href || text === href) {
          output += text;
        } else {
          output += `${text}, ${href}`;
        }
      }
      else {
        node.childNodes.forEach(child => processNode(child));
      }

      if (blockTags.includes(tag)) {
        output = output.trimEnd() + '\n';
      }
    }
  }

  container.childNodes.forEach(node => processNode(node));

  // Final cleanup
  output = output
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')   // remove leading space after newline
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // console.log('Final Output:\n' + output);
  navigator.clipboard.writeText(output)
    .then(() => console.log('Selection text with URLs copied!'))
    .catch(err => alert('Copy failed: ' + err));
}