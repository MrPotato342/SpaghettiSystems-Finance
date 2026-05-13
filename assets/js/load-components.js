async function loadComponent(id, path) {

  try {

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${path}`
      );
    }

    const html = await response.text();

    const target =
      document.getElementById(id);

    if (target) {
      target.innerHTML = html;
    }

  } catch (error) {

    console.error(
      `Component load error (${id}):`,
      error
    );
  }
}

function getBasePath() {

  const path =
    window.location.pathname;

  // If inside /tools/
  if (path.includes("/tools/")) {
    return "../";
  }

  // Homepage/root
  return "./";
}

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const base =
      getBasePath();

    loadComponent(
      "header",
      `${base}components/header.html`
    );

    loadComponent(
      "footer",
      `${base}components/footer.html`
    );
  }
);