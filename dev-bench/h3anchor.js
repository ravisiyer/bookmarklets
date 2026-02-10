  function run() {
    const sel = window.getSelection().toString().trim();
    if (!sel) {
      alert("Select the <h3> HTML or heading text first.");
      return;
    }

    const MAX_ID_LEN = 20;

    const slugify = (text) => {
      const slug = text
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      return slug.substring(0, MAX_ID_LEN).replace(/-$/,"");
    };

    let text = "";
    let id = "";
    let html = "";

    // Case 1: full <h3>...</h3> selected
    if (/^<h3\b[\s\S]*<\/h3>$/.test(sel)) {

      const openTagMatch = sel.match(/<h3\b[^>]*>/i);
      const textMatch = sel.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i);

      if (!openTagMatch || !textMatch) {
        alert("Could not extract <h3> content.");
        return;
      }

      let openTag = openTagMatch[0];

      text = textMatch[1]
        .replace(/<a\b[^>]*>.*?<\/a>/gi, "")
        .replace(/#$/, "")
        .trim();

      const idMatch = openTag.match(/id\s*=\s*["']([^"']+)["']/i);
      id = idMatch ? idMatch[1] : slugify(text);

      // Add id only if missing
      if (!idMatch) {
        openTag = openTag.replace(
          /^<h3\b/i,
          `<h3 id="${id}"`
        );
      }

      html =
`${openTag}
  ${text} <a href="#${id}">#</a>
</h3>`;

    } else {
      // Case 2: plain text selected
      text = sel;
      id = slugify(text);

      html =
`<h3 id="${id}">
  ${text} <a href="#${id}">#</a>
</h3>`;
    }

    navigator.clipboard.writeText(html).then(() => {
      console.log("Anchor <h3> HTML copied to clipboard.");
    });
  }