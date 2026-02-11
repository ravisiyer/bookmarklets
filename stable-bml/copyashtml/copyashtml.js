  function run() {
    const sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed)
      return alert('No selection!');
    const range = sel.getRangeAt(0);
    const container = document.createElement('div');
    container.appendChild(range.cloneContents());
    const html = container.innerHTML;
    if (!html) return alert('Selection has no innerHTML!');
    navigator.clipboard.writeText(html)
      // .then(()=>alert('Selection HTML copied!'))
      // .then(()=>console.log('Selection HTML copied!', html))
      .then(()=>console.log('Selection HTML copied!'))
      .catch(err=>alert('Copy failed: '+err));
  }
