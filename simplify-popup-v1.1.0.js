(function() {
  // Sites where the blocker does not run
  const blockedHosts = [
    'web.telegram.org',
    'chat.openai.com',
    'chatgpt.com',
    'mail.google.com',
    'youtube.com',
    'www.youtube.com'
  ];

  if (blockedHosts.some(h => location.hostname.includes(h))) {
    console.log("Simplify blocker disabled on this site:", location.hostname);
    return;
  }

  console.log("Simplify ultimate blocker loaded");

  // Check text for matches with Simplify patterns
  const matchText = (txt) =>
    txt.includes('Application Submitted') ||
    txt.includes('Congrats on applying!') ||
    txt.includes('Go to Application History') ||
    txt.includes('Add Custom Application') ||
    txt.includes('might be interested in');

  // Remove elements that contain the matching text
  const removeSimplifyPopup = (root) => {
    if (!root) return;
    const elements = root.querySelectorAll('div, section, article, aside');
    elements.forEach(el => {
      const text = el.innerText || '';
      if (matchText(text)) el.remove();
    });
  };

  // Deep check: regular DOM, Shadow DOM, and iframe
  const deepRemove = () => {
    try {
      removeSimplifyPopup(document);

      document.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) removeSimplifyPopup(el.shadowRoot);
      });

      document.querySelectorAll('iframe').forEach(frame => {
        try {
          if (frame.contentDocument) removeSimplifyPopup(frame.contentDocument);
        } catch {}
      });

      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } catch (err) {
      console.warn('Simplify blocker error:', err);
    }
  };

  // Run every 200 ms
  setInterval(deepRemove, 200);
})();

