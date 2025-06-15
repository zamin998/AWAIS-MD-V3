const { cmd } = require('../command');
const crypto = require('crypto');
const webp = require('node-webpmux');
const axios = require('axios')
const fs = require('fs-extra');
const { exec } = require('child_process')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Config = require('../config')
cmd({ 

  pattern: "setpp", 
  react: "🖼️", 
  desc: "Update The Profile Picture", 
  alias: "lagao",
  category: "tools", 
  filename: __filename 
}, async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*Reply To any Image or video Sir.*`);
    } 
    m.reply('*Please Wait a Moment*'); 
    const imageBuffer = await m.quoted.download(); 
    const image = await Jimp.read(imageBuffer); 
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG); 
    await conn.updateProfilePicture(conn.user.id, buffer); 
    m.reply('*Your Profile Pic Is Updated*'); 
  } catch (err) { 
    console.error(err); 
    m.reply(`❌ *Error:* ${err.message}`); 
  } 
});
