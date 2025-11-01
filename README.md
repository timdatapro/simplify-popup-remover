# Simplify Popup Blocker

A lightweight JavaScript script that automatically removes Simplify pop-up windows from job application websites.  
The script works continuously and removes distracting Simplify messages such as “Application Submitted”, “Congrats on applying!”, and others.

## 🚀 Features
- Automatically removes Simplify pop-ups and overlays  
- Works inside the main DOM, Shadow DOM, and iframes  
- Runs every 200ms for continuous cleanup  
- Doesn’t run on specific websites (Telegram, Gmail, YouTube, ChatGPT, etc.)

## 🧠 How it works
The script searches all elements (`div`, `section`, `article`, `aside`) and checks if their text content matches Simplify pop-up patterns.  
If a match is found, the element is automatically removed from the page.

## ⚙️ Excluded Sites
The blocker doesn’t run on:
- web.telegram.org  
- chat.openai.com  
- chatgpt.com  
- mail.google.com  
- youtube.com  

## 💡 Usage
1. Copy the script from `simplify-popup-v1.0.0.js`.  
2. Inject code it into your browser Chrome extentions like **User JavaScript and CSS**.
3. Enjoy a cleaner interface without annoying Simplify pop-ups.
