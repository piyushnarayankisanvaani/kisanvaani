const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const htmlFiles = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

const newNav = `
  <div id="univ-nav" style="background:#2D6A4F; overflow-x:auto; white-space:nowrap; padding:10px 20px; color:white; font-size:14px; display:flex; gap:16px; margin-bottom:12px; border-bottom:2px solid #1B4332;">
    <a href="./index.html" style="text-decoration:none; color:white;">Home</a>
    <a href="./marketplace.html" style="text-decoration:none; color:white;">Market</a>
    <a href="./mandi-prices.html" style="text-decoration:none; color:white;">Prices</a>
    <a href="./facilities.html" style="text-decoration:none; color:white;">Facilities</a>
    <a href="./weather.html" style="text-decoration:none; color:white;">Weather</a>
    <a href="./crop-doctor.html" style="text-decoration:none; color:var(--secondary); font-weight:bold;">Doctor 🌿</a>
    <a href="./govt-schemes.html" style="text-decoration:none; color:white;">Schemes 📋</a>
    <a href="./crop-calendar.html" style="text-decoration:none; color:white;">Calendar 📅</a>
    <a href="./expert-help.html" style="text-decoration:none; color:white;">Help 🤝</a>
  </div>
`;

const servicesHTML = `
  <div class="container" style="margin-top:20px;" id="services-grid-module">
    <h2 style="font-size: 24px; margin-bottom: 16px;">KisanVaani సేవలు</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      <a href="./marketplace.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">🛒</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">పంట మార్కెట్</span>
      </a>
      <a href="./mandi-prices.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">💰</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">మండి ధరలు</span>
      </a>
      <a href="./facilities.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">🏭</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">సౌకర్యాలు</span>
      </a>
      <a href="./weather.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">🌦️</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">వాతావరణం</span>
      </a>
      <a href="./crop-doctor.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">🌿</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">పంట వైద్యుడు</span>
      </a>
      <a href="./govt-schemes.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">📋</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">ప్రభుత్వ పథకాలు</span>
      </a>
      <a href="./crop-calendar.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">📅</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">పంట క్యాలెండర్</span>
      </a>
      <a href="./expert-help.html" class="card" style="margin:0; padding:16px; text-decoration:none; display:flex; flex-direction:column; align-items:center; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <span style="font-size:32px;">🤝</span><span style="font-weight:700; font-size:14px; margin-top:8px; color:var(--text-main);">నిపుణుల సహాయం</span>
      </a>
    </div>
  </div>
`;

const predictionHTML = `
  <div class="card" id="pred-mandi-mod" style="border:2px solid var(--secondary); margin-bottom:24px;">
    <h3 style="display:flex; align-items:center; gap:8px; font-size:18px; margin-bottom:12px;"><span>📉</span> రాబోయే 7 రోజులలో ధర అంచనా</h3>
    <div style="background:#FFFBEB; padding:16px; border-radius:12px; margin-bottom:16px;">
      <div style="font-weight:800; color:#B45309; font-size:16px; margin-bottom:4px;">↑ వరి ధర పెరగవచ్చు (₹2300-2500/క్వింటాల్)</div>
      <div style="font-size:14px; color:var(--text-muted);">కారణం: వర్షాల వల్ల సరఫరా తగ్గింది. ఈ వారం అమ్మడం మంచిది.</div>
    </div>
    <div style="display:flex; align-items:flex-end; gap:8px; height:120px; padding:10px 0; border-bottom:1px solid var(--border);">
      <div style="flex:1; background:#9ca3af; height:40%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">సోమ</span></div>
      <div style="flex:1; background:#9ca3af; height:35%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">మంగళ</span></div>
      <div style="flex:1; background:#9ca3af; height:45%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">బుధ</span></div>
      <div style="flex:1; background:var(--primary); height:60%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%); font-weight:bold; color:var(--primary);">నేడు</span></div>
      <div style="flex:1; background:var(--secondary); height:70%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">శుక్ర</span></div>
      <div style="flex:1; background:var(--secondary); height:80%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">శని</span></div>
      <div style="flex:1; background:var(--secondary); height:85%; border-radius:4px 4px 0 0; position:relative;"><span style="position:absolute; top:-20px; font-size:10px; left:50%; transform:translateX(-50%);">ఆది</span></div>
    </div>
  </div>
`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(path.join(DIR, file), 'utf8');
  let changed = false;

  if (!content.includes('id="univ-nav"')) {
    content = content.replace(/(<nav[^>]*>[\s\S]*?<\/nav>)/i, '$1\\n' + newNav);
    changed = true;
  } else {
    content = content.replace(/<div id="univ-nav"[^>]*>[\s\S]*?<\/div>/i, newNav);
    changed = true;
  }

  if (file === 'index.html' && !content.includes('KisanVaani సేవలు')) {
    content = content.replace(/(<div class="hero-section[^>]*>[\s\S]*?<\/div>)/i, '$1\\n' + servicesHTML);
    if(!content.includes('KisanVaani సేవలు')) {
       content = content.replace(/(<div class="container">)/i, '$1\\n' + servicesHTML);
    }
    changed = true;
  }

  if (file === 'mandi-prices.html' && !content.includes('రాబోయే 7 రోజులలో ధర అంచనా')) {
    content = content.replace(/(<div id="mandi-list">)/i, predictionHTML + '\\n$1');
    changed = true;
  }

  content = content.replace(/https:\/\/wa\.me\/91[0-9]{10}(?![\?])/g, "https://wa.me/919059292300");

  if (changed) {
    fs.writeFileSync(path.join(DIR, file), content);
    console.log('Updated:', file);
  }
});

console.log('All injections complete.');
