(function() {
  console.log("Simplify ultimate blocker loaded");

  // Check if the text matches Simplify popup patterns
  const matchText = (txt) => {
    return (
      txt.includes('Application Submitted') ||
      txt.includes('Congrats on applying!') ||
      txt.includes('Go to Application History') ||
      txt.includes('Add Custom Application') ||
      txt.includes('might be interested in')
    );
  };

  // Remove elements that contain matching text
  const removeSimplifyPopup = (root) => {
    if (!root) return;

    const elements = root.querySelectorAll('div, section, article, aside');
    elements.forEach(el => {
      const text = el.innerText || '';
      if (matchText(text)) {
        el.remove();
      }
    });
  };

  // Deep cleanup: main DOM, Shadow DOM, and iframes
  const deepRemove = () => {
    try {
      // 1. Regular DOM
      removeSimplifyPopup(document);

      // 2. Shadow DOM
      document.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) {
          removeSimplifyPopup(el.shadowRoot);
        }
      });

      // 3. iframe (if the content is accessible)
      document.querySelectorAll('iframe').forEach(frame => {
        try {
          const doc = frame.contentDocument;
          if (doc) removeSimplifyPopup(doc);
        } catch (e) {
          // Skip inaccessible frames
        }
      });

      // 4. Restore scrolling
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    } catch (err) {
      console.warn('Simplify blocker error:', err);
    }
  };

  // Run every 200 ms
  setInterval(deepRemove, 200);
})();
