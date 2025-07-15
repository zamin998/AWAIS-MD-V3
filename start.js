const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const axios = require("axios");

const PLUGINS_DIR = './plugins';
const LIB_DIR = './lib';
const AUTH_DIR = './auth_info_baileys';
const DATA_DIR = './my_data';
const ZIP_FILENAME = 'urdeveloper.zip';
const ZIP_DIR = './';

async function downloadAndExtractZip() {
  try {
    const MEGA_ZIP_LINK = 'https://mega.nz/file/mxQjHa7I#WvMCQLfzMfgMNwPhWZ43Ul3QHaAa3DcCRB6b75ZaTQE';

    // Ensure required directories
    [PLUGINS_DIR, LIB_DIR, AUTH_DIR, DATA_DIR].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    console.log('📥 Fetching ZIP file from MEGA...');
    const file = File.fromURL(MEGA_ZIP_LINK);
    const fileData = await file.downloadBuffer();

    const tempZipPath = path.join(__dirname, ZIP_FILENAME);
    fs.writeFileSync(tempZipPath, fileData);
    console.log(`✅ Downloaded ZIP to ${ZIP_FILENAME}`);

    const zip = new AdmZip(tempZipPath);
    zip.extractAllTo(ZIP_DIR, true); 

    console.log('AWAIS-MD SUCCESSFULLY CONNECTED ENJOY ❤️✅');

    fs.unlinkSync(tempZipPath);
    require("./index.js");

  } catch (error) {
    console.error('Error:', error.message);
  }
};
    // Check if everything is under one root folder
    const rootFolder = zipEntries[0]?.entryName?.split('/')[0];
    const isSingleRoot = zipEntries.every(e => e.entryName.startsWith(rootFolder + '/'));

    // Extract manually to remove root folder nesting
    zipEntries.forEach(entry => {
      const entryPath = isSingleRoot
        ? entry.entryName.replace(rootFolder + '/', '') // remove root folder
        : entry.entryName;

      if (!entryPath) return; // skip root folder itself

      const fullPath = path.join(ZIP_DIR, entryPath);

      if (entry.isDirectory) {
        fs.mkdirSync(fullPath, { recursive: true });
      } else {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, entry.getData());
      }
    });

    console.log('✅ ZIP extracted to project root');

    fs.unlinkSync(tempZipPath); // delete zip
  } catch (error) {
    console.error('❌ Error during download or extraction:', error.message);
    process.exit(1);
  }
}

// Run it
(async () => {
  await downloadAndExtractZip();

  // Plugin loading (example)
  if (!fs.existsSync(PLUGINS_DIR)) {
    console.error('❌ Plugins folder missing after extraction.');
    process.exit(1);
  }

  const pluginFiles = fs.readdirSync(PLUGINS_DIR).filter(file => file.endsWith('.js'));
  pluginFiles.forEach(file => {
    try {
      require(path.join(__dirname, PLUGINS_DIR, file));
      console.log(`✅ Loaded plugin: ${file}`);
    } catch (e) {
      console.warn(`⚠️ Failed to load plugin: ${file}`, e.message);
    });

  
