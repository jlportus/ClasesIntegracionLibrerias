(() => {
  const DEFAULT_SEPARATOR = "^\\r?\\n---\\r?\\n";
  const DEFAULT_VERTICAL = "^\\r?\\n--\\r?\\n";
  const DEFAULT_NOTES = "^Notas:";

  const cache = new Map();
  let currentMdPath = "";
  let isSettingHash = false;

  function getBasePath(mdPath) {
    const normalized = window.MdUtils.normalizePath(mdPath);
    const idx = normalized.lastIndexOf("/");
    return idx === -1 ? "" : normalized.slice(0, idx);
  }

  function parseMdHash(hash) {
    const prefix = "#/md/";
    if (!hash.startsWith(prefix)) return null;
    const rest = hash.slice(prefix.length);
    const anchorIndex = rest.indexOf("#");
    const encodedPath = anchorIndex === -1 ? rest : rest.slice(0, anchorIndex);
    const anchor = anchorIndex === -1 ? "" : rest.slice(anchorIndex + 1);
    if (!encodedPath) return null;
    try {
      return { mdPath: decodeURIComponent(encodedPath), anchor };
    } catch {
      return null;
    }
  }

  function setHash(mdPath, anchor) {
    isSettingHash = true;
    const encoded = encodeURIComponent(mdPath);
    const next = "#/md/" + encoded + (anchor ? "#" + anchor : "");
    if (window.location.hash !== next) {
      window.location.hash = next;
    }
    setTimeout(() => {
      isSettingHash = false;
    }, 0);
  }

  function createMarkdownSection(mdText) {
    const section = document.createElement("section");
    section.setAttribute("data-markdown", "");
    section.setAttribute("data-separator", DEFAULT_SEPARATOR);
    section.setAttribute("data-separator-vertical", DEFAULT_VERTICAL);
    section.setAttribute("data-separator-notes", DEFAULT_NOTES);
    section.setAttribute("data-charset", "utf-8");

    const textarea = document.createElement("textarea");
    textarea.setAttribute("data-template", "");
    textarea.textContent = mdText;
    section.appendChild(textarea);
    return section;
  }

  function replaceSlides(section) {
    const slides = document.querySelector(".slides");
    if (!slides) return;
    slides.innerHTML = "";
    slides.appendChild(section);
  }

  function navigateToAnchor(anchor) {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (!el) return;
    const slide = el.closest("section");
    if (!slide) return;
    const indices = Reveal.getIndices(slide);
    if (!indices) return;
    Reveal.slide(indices.h, indices.v, indices.f);
  }

  async function loadMarkdown(mdPath, options = {}) {
    const normalized = window.MdUtils.normalizePath(mdPath);
    const basePath = getBasePath(normalized);
    const anchor = options.anchor || "";

    currentMdPath = normalized;

    let processed = cache.get(normalized);
    if (!processed) {
      const resp = await fetch(normalized);
      if (!resp.ok) {
        throw new Error("Failed to load " + normalized);
      }
      const raw = await resp.text();
      processed = window.MdUtils.rewriteLinksInMemory(raw, basePath);
      cache.set(normalized, processed);
    }

    replaceSlides(createMarkdownSection(processed));

    const markdown = Reveal.getPlugin && Reveal.getPlugin("markdown");
    if (markdown && markdown.processSlides && markdown.convertSlides) {
      await markdown.processSlides(Reveal.getRevealElement());
      await markdown.convertSlides();
    }

    Reveal.sync();

    setHash(normalized, anchor);
    requestAnimationFrame(() => navigateToAnchor(anchor));
  }

  function shouldIgnoreLink(href) {
    if (!href) return true;
    if (href.startsWith("#/md/")) return false;
    if (href.startsWith("#")) return true;
    if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href)) return true;
    if (/^(?:mailto|tel|data):/i.test(href)) return true;
    return false;
  }

  function resolveTargetFromHref(href) {
    const hashIndex = href.indexOf("#");
    const pathPart = hashIndex === -1 ? href : href.slice(0, hashIndex);
    const anchor = hashIndex === -1 ? "" : href.slice(hashIndex + 1);

    const basePath = getBasePath(currentMdPath);
    const resolved = window.MdUtils.resolveRelativePath(basePath, pathPart);
    const mdPath = resolved.toLowerCase().endsWith(".html")
      ? resolved.slice(0, -5) + ".md"
      : resolved;
    return { mdPath, anchor };
  }

  async function loadMarkdownOrNavigate(href) {
    const { mdPath, anchor } = resolveTargetFromHref(href);
    try {
      await loadMarkdown(mdPath, { anchor });
    } catch (error) {
      window.location.href = href;
    }
  }

  function onLinkClick(event) {
    const target = event.target;
    if (!target) return;
    const link = target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (shouldIgnoreLink(href)) return;

    if (href.startsWith("#/md/")) {
      const parsed = parseMdHash(href);
      if (!parsed) return;
      event.preventDefault();
      loadMarkdown(parsed.mdPath, { anchor: parsed.anchor }).catch(console.error);
      return;
    }

    const lower = href.toLowerCase();
    if (lower.endsWith(".md") || lower.includes(".md#")) {
      event.preventDefault();
      const { mdPath, anchor } = resolveTargetFromHref(href);
      loadMarkdown(mdPath, { anchor }).catch(console.error);
      return;
    }

    if (lower.endsWith(".html") || lower.includes(".html#")) {
      event.preventDefault();
      loadMarkdownOrNavigate(href).catch(console.error);
    }
  }

  function onHashChange() {
    if (isSettingHash) return;
    const parsed = parseMdHash(window.location.hash);
    if (!parsed) return;
    loadMarkdown(parsed.mdPath, { anchor: parsed.anchor }).catch(console.error);
  }

  function init(options = {}) {
    document.addEventListener("click", onLinkClick);
    window.addEventListener("hashchange", onHashChange);

    const fromHash = parseMdHash(window.location.hash);
    if (fromHash) {
      loadMarkdown(fromHash.mdPath, { anchor: fromHash.anchor }).catch(console.error);
      return;
    }

    const initialMd = options.initialMd || "README.md";
    loadMarkdown(initialMd).catch(console.error);
  }

  window.MarkdownNavigationLoader = {
    init,
    loadMarkdown,
  };
})();
