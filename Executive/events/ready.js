const moment = require('moment');
require("moment-duration-format");
let Stat = require("../models/stats");
let sunucuayar = require("../models/sunucuayar");
const client = global.client;
let conf = client.ayarlar
let yetkilisay = require("../models/yetkilisay");
let { MessageEmbed } = require("discord.js");
module.exports = async client => {
  let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
  let enAltYetkiliRol = data.EnAltYetkiliRol
  let arr = await yetkilisay.find({})
  let kayitcilar = {};
  arr.forEach((value) => {
    if (kayitcilar[value.userID]) kayitcilar[value.userID] += 1;
    else kayitcilar[value.userID] = 1
  })
  let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).splice(0,50).map(e => ({
    User: e,
    Value: kayitcilar[e]
  }))
  sirali = sirali.map((user, index) => `${index+1}. ${client.guilds.cache.get(conf.sunucuId).members.cache.get(user.User) ? `\`${client.guilds.cache.get(conf.sunucuId).members.cache.get(user.User)}\`` : "quit atmış"}: **${user.Value}**`).join("\n")
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(conf.footer)
  .setTitle("Yetkili Stat Denetim")
  .setDescription(`${sirali.length > 0 ? sirali : "Veri yoktur"}\n\n${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilendi.`)
    client.channels.cache.get(conf.yetkilisay.KanalID).messages.fetch(conf.yetkilisay.MesajID).then(m => m.edit(embed)).catch(() => console.error("mesaj bulunamadı"));
  setInterval(async () => {
    let guild = client.guilds.cache.get(client.ayarlar.sunucuId)
    guild.members.cache.filter(member => {
      return member.roles.cache.has(enAltYetkiliRol) && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id)
    }).map(member => {
      if (member.voice.channel) {
        yetkilisay.deleteMany({userID: member.id}).exec()
      } else {
        let newData = yetkilisay({
          userID: member.id,
          Tarih: Date.now(),
        })
        newData.save()
      }
    });
    let arr = await yetkilisay.find({})
    let kayitcilar = {};
    arr.forEach((value) => {
      if (kayitcilar[value.userID]) kayitcilar[value.userID] += 1;
      else kayitcilar[value.userID] = 1
    })
    let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).splice(0,50).map(e => ({
      User: e,
      Value: kayitcilar[e]
    }))
    sirali = sirali.map((user, index) => `${index+1}. ${client.guilds.cache.get(conf.sunucuId).members.cache.get(user.User) ? `\`${client.guilds.cache.get(conf.sunucuId).members.cache.get(user.User)}\`` : "quit atmış"}: **${user.Value}**`).join("\n")
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(conf.footer)
    .setTitle("H E R L İ A Yetkili Stat Denetim")
    .setDescription(`${sirali.length > 0 ? sirali : "Veri yoktur"}\n\n${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilendi.`)
    client.channels.cache.get(conf.yetkilisay.KanalID).messages.fetch(conf.yetkilisay.MesajID).then(m => m.edit(embed)).catch(() => console.error("mesaj bulunamadı"));

  }, 1000*60*30)

  try {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
    client.user.setStatus("iddle");
    let kanal = client.channels.cache.filter(x => x.type === "voice" && x.id === client.ayarlar.botSesID);
    setInterval(() => {
      const oynuyor = ["batihost.com"];
      const index = Math.floor(Math.random() * (oynuyor.length));
      client.user.setActivity(`${oynuyor[index]}`, {
        type: "WATCHING"
      });
      kanal.map(channel => {
        if (channel.id === client.ayarlar.botSesID) {
          if (channel.members.some(member => member.id === client.user.id)) return;
          if (!client.channels.cache.get(client.ayarlar.botSesID)) return;
          client.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
        } else return;
      });
    }, 10000);
  } catch (err) {}

  if (data) return;
  if (!data) return console.log("Sunucu ayarları başarıyla yüklendi! artık kurulum yapabilirsiniz!"),await sunucuayar.updateOne({}, {guildID: client.ayarlar.sunucuId}, {upsert: true, setDefaultsOnInsert: true}).exec();


};

