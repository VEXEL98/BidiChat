// BidiChat – Auto Direction for AI Chats
// Chrome Extension (Manifest V3)
// Published by VEXEL98 – github.com/VEXEL98
// Version 6.2 – Fixed font inheritance on AI messages

(function () {
  'use strict';

  const HOST = location.hostname;
  const IS_DEEPSEEK = HOST.includes('deepseek.com');
  console.log(`[BidiChat] Active on ${HOST} (${IS_DEEPSEEK ? 'DeepSeek mode' : 'Standard mode'})`);

  // ── 0. Load user settings ─────────────────────────────────────────────
  let rtlFontStack = 'Vazirmatn, Tahoma, Arial, sans-serif';
  let rtlFontSize = '16px';

  const applySettings = (settings) => {
    rtlFontStack = settings.rtlFont ? `${settings.rtlFont}, Tahoma, Arial, sans-serif` : rtlFontStack;
    rtlFontSize = settings.rtlFontSize ? settings.rtlFontSize + 'px' : rtlFontSize;

    // Update the dedicated style element
    let styleEl = document.getElementById('bidi-font-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'bidi-font-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      :root {
        --bidi-rtl-font: ${rtlFontStack};
        --bidi-rtl-font-size: ${rtlFontSize};
      }
    `;
    console.log(`[BidiChat] Font: ${rtlFontStack} | Size: ${rtlFontSize}`);
  };

  // Load initial settings
  chrome.storage.sync.get(['rtlFont', 'rtlFontSize'], applySettings);

  // Listen for changes
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
      chrome.storage.sync.get(['rtlFont', 'rtlFontSize'], applySettings);
    }
  });

  // ── 1. Global CSS ─────────────────────────────────────────────────────
  const globalCSS = document.createElement('style');
  globalCSS.textContent = `
    /* 1) Any element that is explicitly RTL */
    [dir="rtl"] {
      font-family: var(--bidi-rtl-font) !important;
      font-size: var(--bidi-rtl-font-size) !important;
    }

    /* 2) Inside a container that we have marked as RTL (even if child has no dir) */
    [data-bidi-rtl-font="true"],
    [data-bidi-rtl-font="true"] * {
      font-family: var(--bidi-rtl-font) !important;
      font-size: var(--bidi-rtl-font-size) !important;
    }

    [dir="rtl"] { text-align: right !important; }
    [dir="ltr"] { text-align: left !important; }

    pre[data-bidi-code], code[data-bidi-code],
    [class*="code-block"][data-bidi-code],
    [class*="md-code"][data-bidi-code],
    [class*="CodeBlock"][data-bidi-code] {
      direction: ltr !important;
      text-align: left !important;
      unicode-bidi: isolate !important;
    }
    [class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"],
    [class*="syntax-highlight"] {
      direction: ltr !important;
      unicode-bidi: isolate !important;
    }
    span[data-bidi-arrow] {
      direction: ltr !important;
      unicode-bidi: isolate !important;
      display: inline-block !important;
    }
  `;
  document.head.appendChild(globalCSS);

  // ── 2. DeepSeek‑specific overrides ────────────────────────────────────
  if (IS_DEEPSEEK) {
    const dsCSS = document.createElement('style');
    dsCSS.textContent = `
      div.ds-markdown[dir="auto"],
      div.ds-assistant-message-main-content[dir="auto"],
      div.ds-think-content[dir="auto"],
      div.fbb737a4[dir="auto"] { direction: auto !important; }

      div.ds-markdown[dir="rtl"],
      div.ds-assistant-message-main-content[dir="rtl"],
      div.ds-think-content[dir="rtl"],
      div.fbb737a4[dir="rtl"] {
        direction: rtl !important;
        text-align: right !important;
        unicode-bidi: embed !important;
      }
      /* Override font for DeepSeek RTL containers */
      div.ds-markdown[dir="rtl"],
      div.ds-assistant-message-main-content[dir="rtl"],
      div.ds-think-content[dir="rtl"],
      div.fbb737a4[dir="rtl"],
      div.ds-markdown[data-bidi-rtl-font="true"],
      div.ds-assistant-message-main-content[data-bidi-rtl-font="true"],
      div.ds-think-content[data-bidi-rtl-font="true"],
      div.fbb737a4[data-bidi-rtl-font="true"] {
        font-family: var(--bidi-rtl-font) !important;
        font-size: var(--bidi-rtl-font-size) !important;
      }
      div.ds-markdown[data-bidi-rtl-font="true"] *,
      div.ds-assistant-message-main-content[data-bidi-rtl-font="true"] *,
      div.ds-think-content[data-bidi-rtl-font="true"] *,
      div.fbb737a4[data-bidi-rtl-font="true"] * {
        font-family: inherit !important;
      }

      div.ds-markdown[dir="ltr"],
      div.ds-assistant-message-main-content[dir="ltr"],
      div.ds-think-content[dir="ltr"],
      div.fbb737a4[dir="ltr"] {
        direction: ltr !important;
        text-align: left !important;
        unicode-bidi: embed !important;
      }
    `;
    document.head.appendChild(dsCSS);
    console.log('[BidiChat] DeepSeek CSS injected');
  }

  // ── 3. Utilities ──────────────────────────────────────────────────────
  const RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const ARROW_REGEX = /[\u2190-\u21FF\u27F0-\u27FF\u2900-\u297F\u2B00-\u2B2F]/;

  const hasRtlChar = (str) => RTL_REGEX.test(str);

  const isRealCodeBlock = (el) => {
    if (el.nodeType !== Node.ELEMENT_NODE) return false;
    if (el.matches('[class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"]')) return true;
    if (el.matches('pre, code, [class*="code-block"], [class*="md-code"], [class*="CodeBlock"]')) {
      if (el.querySelector('[class*="token"], [class*="hljs"], [class*="prism"], [class*="language-"]')) return true;
      if (el.querySelector('[class*="md-code-block-banner"], [class*="code-block-banner"]')) return true;
    }
    return false;
  };

  const enforceLtr = (el) => {
    if (el.dataset.bidiCode === 'true') return;
    el.setAttribute('dir', 'ltr');
    el.style.setProperty('direction', 'ltr', 'important');
    el.style.setProperty('text-align', 'left', 'important');
    el.style.setProperty('unicode-bidi', 'isolate', 'important');
    el.dataset.bidiCode = 'true';
  };

  const LTRifyCodeContainer = (highlightNode) => {
    const container = highlightNode.closest('pre, code, [class*="code-block"], [class*="md-code"], [class*="CodeBlock"]');
    if (container && !container.dataset.bidiCode) enforceLtr(container);
  };

  const fixArrows = (container) => {
    if (container.dataset.bidiArrowFixed === 'true') return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const replacements = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.parentNode.closest('[data-bidi-code]')) continue;
      if (ARROW_REGEX.test(node.textContent)) replacements.push(node);
    }
    for (const textNode of replacements) {
      const parent = textNode.parentNode;
      if (!parent || parent.dataset.bidiArrowFixed) continue;
      const frag = document.createDocumentFragment();
      const parts = textNode.textContent.split(/([\u2190-\u21FF\u27F0-\u27FF\u2900-\u297F\u2B00-\u2B2F])/);
      for (const part of parts) {
        if (ARROW_REGEX.test(part)) {
          const span = document.createElement('span');
          span.textContent = part;
          span.dataset.bidiArrow = 'true';
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      }
      parent.replaceChild(frag, textNode);
    }
    container.dataset.bidiArrowFixed = 'true';
  };

  // ── 4. Process a message container ────────────────────────────────────
  const processContainer = (container) => {
    if (container.dataset.bidiApplied === 'true') return;

    container.setAttribute('dir', 'auto');

    // Mark the container for font injection if text is RTL
    if (hasRtlChar(container.textContent)) {
      container.dataset.bidiRtlFont = 'true';
    } else {
      delete container.dataset.bidiRtlFont;
    }

    container.dataset.bidiApplied = 'true';

    const codeSelectors = 'pre, code, [class*="code-block"], [class*="md-code"], [class*="CodeBlock"], [class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"]';
    const candidates = container.querySelectorAll(codeSelectors);
    for (const el of candidates) {
      if (isRealCodeBlock(el)) {
        if (el.matches('[class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"]')) {
          LTRifyCodeContainer(el);
        } else {
          enforceLtr(el);
        }
      }
    }
    if (isRealCodeBlock(container)) enforceLtr(container);

    if (hasRtlChar(container.textContent)) fixArrows(container);
  };

  // ── 5. Message container selectors ────────────────────────────────────
  const MESSAGE_SELECTORS = IS_DEEPSEEK
    ? ['div.ds-markdown', 'div.ds-assistant-message-main-content', 'div.ds-think-content', 'div.fbb737a4']
    : [
        'div[class*="font-claude-message"]',
        'div[class*="message-content"]',
        'li[class*="font-claude-response-body"]',
        'div[class*="prose"]',
        'div[class*="markdown"]',
        'div[class*="text-message"]',
        '[role="article"]', '[role="listitem"]'
      ];

  const JOINED_SELECTORS = MESSAGE_SELECTORS.join(',');

  // ── 6. Initial processing ─────────────────────────────────────────────
  const initialContainers = document.querySelectorAll(JOINED_SELECTORS);
  console.log(`[BidiChat] ${initialContainers.length} containers found`);
  initialContainers.forEach(el => {
    if (el.textContent.trim().length > 3) processContainer(el);
  });

  // ── 7. Immediate code observer ────────────────────────────────────────
  const immediateObs = new MutationObserver(mutations => {
    for (const mut of mutations) {
      for (const node of mut.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches && node.matches('[class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"]')) {
          LTRifyCodeContainer(node);
        }
        if (node.querySelectorAll) {
          const inner = node.querySelectorAll('[class*="token"], [class*="language-"], [class*="hljs"], [class*="prism"]');
          for (const hl of inner) LTRifyCodeContainer(hl);
        }
        if (isRealCodeBlock(node) && !node.dataset.bidiCode) enforceLtr(node);
      }
    }
  });
  immediateObs.observe(document.body, { childList: true, subtree: true });
  console.log('[BidiChat] Immediate code observer active');

  // ── 8. Main observer (containers + streaming) ─────────────────────────
  let rafId = null;
  const mainObs = new MutationObserver(mutations => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const processed = new Set();
      for (const mut of mutations) {
        if (mut.type === 'childList') {
          for (const node of mut.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue;
            if (node.matches && node.matches(JOINED_SELECTORS) && node.textContent.trim().length > 3) {
              if (!processed.has(node)) { processed.add(node); processContainer(node); }
            }
            if (node.querySelectorAll) {
              const inner = node.querySelectorAll(JOINED_SELECTORS);
              for (const c of inner) {
                if (!processed.has(c) && c.textContent.trim().length > 3) { processed.add(c); processContainer(c); }
              }
            }
          }
        } else if (mut.type === 'characterData') {
          const parent = mut.target.parentNode;
          if (!parent) continue;
          const container = parent.closest(JOINED_SELECTORS);
          if (container && !processed.has(container) && container.textContent.trim().length > 3) {
            processed.add(container);
            delete container.dataset.bidiApplied;
            delete container.dataset.bidiArrowFixed;
            processContainer(container);
          }
        }
      }
    });
  });
  mainObs.observe(document.body, { childList: true, subtree: true, characterData: true });
  console.log('[BidiChat] Main observer active');

  // ── 9. Input field direction ──────────────────────────────────────────
  document.addEventListener('input', () => {
    const el = document.activeElement;
    if (!el) return;
    const isEditable = el.tagName === 'TEXTAREA' || el.getAttribute('contenteditable') === 'true' || el.isContentEditable;
    if (!isEditable) return;
    const text = el.value || el.textContent || '';
    if (!text.trim()) return;
    const dir = hasRtlChar(text) ? 'rtl' : 'ltr';
    el.setAttribute('dir', dir);
    el.style.setProperty('direction', dir, 'important');
    el.style.setProperty('text-align', dir === 'rtl' ? 'right' : 'left', 'important');
  });
  console.log('[BidiChat] Input listener active');

})();