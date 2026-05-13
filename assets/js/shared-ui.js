function renderRelatedTools(currentSlug) {

  const container = document.getElementById("related-tools");

  if (!container) return;

  const related = TOOLS.filter(tool => tool.slug !== currentSlug);

  const html = related.map(tool => `
    <a class="related-card" href="/tools/${tool.slug}.html">
      <h3>${tool.title}</h3>
      <p>${tool.description}</p>
    </a>
  `).join("");

  container.innerHTML = `
    <h2>Related Tools</h2>
    <div class="related-grid">
      ${html}
    </div>
  `;
}
