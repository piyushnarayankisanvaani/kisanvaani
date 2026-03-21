const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Piyush/OneDrive/Desktop/kisanvaani';

const cssContent = fs.readFileSync(path.join(dir, 'css', 'style.css'), 'utf8');
const jsMap = {
  'app.js': fs.readFileSync(path.join(dir, 'js', 'app.js'), 'utf8'),
  'data.js': fs.readFileSync(path.join(dir, 'js', 'data.js'), 'utf8'),
  'weather.js': fs.readFileSync(path.join(dir, 'js', 'weather.js'), 'utf8'),
  'mandi.js': fs.readFileSync(path.join(dir, 'js', 'mandi.js'), 'utf8'),
  'voice.js': fs.readFileSync(path.join(dir, 'js', 'voice.js'), 'utf8')
};

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find which JS scripts were included
  const includedScripts = new Set();
  const scriptRegex = /<script\s+src="(?:\.\/)?js\/([^"]+)"\s*><\/script>/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
      includedScripts.add(match[1]);
  }
  
  if (file === 'index.html') {
    // Prompt demands index.html has FULL embedded JS (app, logic, weather, mandi, voice)
    includedScripts.add('app.js');
    includedScripts.add('data.js');
    includedScripts.add('weather.js');
    includedScripts.add('mandi.js');
    includedScripts.add('voice.js');
  }

  // Remove CSS links
  content = content.replace(/<link\s+rel="stylesheet"\s+href="(?:\.\/)?css\/style\.css"\s*\/?>\n?/g, '');

  // Remove JS scripts
  content = content.replace(/<script\s+src="(?:\.\/)?js\/[^"]+"\s*><\/script>\n?/g, '');

  // Inject CSS before </head>
  const styleTag = `\n<style>\n${cssContent}\n</style>\n<script src="https://cdn.tailwindcss.com"></script>\n</head>`;
  content = content.replace(/<\/head>/i, styleTag);

  // Inject JS before </body>
  let jsInject = '';
  
  // Guarantee app.js is present for base functionality
  if (includedScripts.size === 0) includedScripts.add('app.js');

  for (const s of includedScripts) {
    if (jsMap[s]) {
      jsInject += `\n<script>\n// Embedded ${s}\n${jsMap[s]}\n</script>\n`;
    }
  }

  content = content.replace(/<\/body>/i, `${jsInject}</body>`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
}
