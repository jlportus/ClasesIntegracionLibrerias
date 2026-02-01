// Browser script: loads sessions.json, injects sections and sets up link interception
async function loadSessions() {
  const resp = await fetch('sessions.json');
  if (!resp.ok) throw new Error('Could not fetch sessions.json: ' + resp.status);
  const data = await resp.json();
  window._revealSessions = data.sessions || [];

  const container = document.querySelector('.slides');
  if (!container) throw new Error('.slides container not found');

  // Inject sections for each session
  window._revealSessions.forEach(session => {
    const section = document.createElement('section');
    section.setAttribute('data-markdown', session.path);
    section.setAttribute('data-separator', '^\\r?\\n\\---\\r?\\n');
    section.setAttribute('data-separator-vertical', '^\\r?\\n\\--\\r?\\n');
    section.setAttribute('data-separator-notes', '^Notas:');
    section.setAttribute('data-charset', 'utf-8');
    section.id = session.id;
    container.appendChild(section);
  });

  // Add global click handler to intercept MD links and navigate Reveal
  document.addEventListener('click', function (ev) {
    const a = ev.target.closest ? ev.target.closest('a') : (ev.target.tagName === 'A' ? ev.target : null);
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    // Allow external links and those already using reveal hash
    if (/^(https?:|mailto:|#\/)/i.test(href)) return;

    // Normalize path
    const [rawPath, anchor] = href.split('#');
    const normalized = rawPath.replace(/^\.\/?/, '').replace(/\\\\/g, '/');

    // Try to find session matching the path
    const session = window._revealSessions.find(s => s.path.endsWith(normalized));
    if (!session) return; // let default behavior happen

    ev.preventDefault();
    // navigate to session (h = session.index)
    const targetH = session.index;

    if (!anchor) {
      Reveal.slide(targetH, 0);
      return;
    }

    // if generator provided anchorMap, use it
    const map = session.anchorMap || {};
    const anchorId = anchor.replace(/\s+/g, '-').toLowerCase();
    if (map[anchorId]) {
      const { h, v } = map[anchorId];
      Reveal.slide(h, v);
      return;
    }

    // fallback: try to find element with id after markdown rendered
    // we assume Reveal has already rendered markdown; attempt later if not found
    const tryFind = () => {
      const elem = document.getElementById(anchorId);
      if (elem) {
        Reveal.slide(Number(elem.closest('section').dataset.h) || 0, Number(elem.closest('section').dataset.v) || 0);
        return true;
      }
      return false;
    };

    if (!tryFind()) {
      // wait a bit and try again (in case rendering is async)
      setTimeout(tryFind, 300);
    }
  });

  return Promise.resolve();
}

// export for use in inline script
window.loadSessions = loadSessions;
