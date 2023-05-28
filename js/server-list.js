const jsonData = `YOUR_JSON_DATA_HERE`;

// Parse JSON data
const data = JSON.parse(jsonData);

// Group servers by constellation
const constellations = {
  Hydrus: [],
  Byakko: [],
  Seiryu: [],
  Suzaku: [],
  Genbu: [],
  Lynx: []
};

data.servers.forEach(server => {
  const { constellation } = server;
  const { name } = constellation;

  if (constellations.hasOwnProperty(name)) {
    constellations[name].push(server);
  }
});

// Generate HTML for each constellation
let html = '';
Object.entries(constellations).forEach(([constellation, servers]) => {
  html += `<div class="tab-item" data-title="${constellation.toLowerCase()}" id="${constellation.toLowerCase()}">\n`;

  let serverCount = 0;
  servers.forEach(server => {
    const { displayName, members, icon, tags, invite, booster } = server;

    if (serverCount % 3 === 0) {
      html += `  <div class="column-row align-center-bottom">\n`;
    }

    html += `    <div class="column-33">\n`;
    html += booster ? `      <div class="product-box product-box-popular">\n` : `      <div class="product-box">\n`;
    html += booster ? `        <div class="product-popular">Em destaque</div>\n` : '';
    html += `        <div class="profile-container">\n`;
    html += `          <div class="profile-pic">\n`;
    html += `            <img src="${icon.replace('?size=1024', '')}" />\n`;
    html += `          </div>\n`;
    html += `          <div class="profile-text">\n`;
    html += `            <h3><mark>${displayName}</mark></h3>\n`;
    html += `            <small class="text-color-gray"><strong>${members.toLocaleString()}' membros</strong></small>\n`;
    html += `            <ul class="tags" style="margin-top: 5px">\n`;
    tags.forEach(tag => {
      html += `              <li>\n`;
      html += `                <a href="#${tag.toLowerCase()}">#${tag.toLowerCase()}</a>\n`;
      html += `              </li>\n`;
    });
    html += `            </ul>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="product-order">\n`;
    html += `          <div class="profile-button">\n`;
    html += `            <a href="${invite}" target="_blank" class="button button-primary" style="text-align: center; margin-top: -5%; margin-bottom: -5%;">\n`;
    html += `              <i class="fab fa-discord icon-left"></i>Entrar\n`;
    html += `            </a>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `      </div>\n`;
    html += `    </div>\n`;

    serverCount++;

    if (serverCount % 3 === 0 || serverCount === servers.length) {
      html += `  </div>\n`;
    }
  });

  html += `</div>\n`;
});

// Output generated HTML
console.log(html);
