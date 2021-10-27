const {
  MessageEmbed,
  Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let yetkilisay = require("../../models/yetkilisay");
let table = require("string-table");
module.exports.run = async (client, message, args, durum, kanal) => {
  
  if (!message.guild) return;
    
  let data = await sunucuayar.find({})
  if (message.member.permissions.has(8) && message.member.roles.cache.some(rol => data[0].UstYetkiliRol.some(rol2 => rol.id == rol2)) || durum) {
    let enAltYetkiliRol = data[0].EnAltYetkiliRol
    const sec = args[0]
    if (args[0] == "top") {
      let arr = await yetkilisay.find({})
      let kayitcilar = {};
      arr.forEach((value) => {
        if (kayitcilar[value.userID]) kayitcilar[value.userID] += 1;
        else kayitcilar[value.userID] = 1
      })
      let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).splice(0, 30).map(e => ({
        User: e,
        Value: kayitcilar[e]
      }))
      sirali = sirali.map((user, index) => `**${index+1}.** <@${user.User}> (\`${user.User}\`) \`${user.Value} Yetkili.\``).join("\n")
      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(conf.footer)
      .setAuthor(message.author.tag, message.author.avatarURL({
        dynamic: true
      }))
      .setDescription(`Top 25 Yetki aldırma sıralaması aşağıda belirtilmiştir.\n\n${sirali.length > 0 ? sirali : "Veri yoktur"}`)
    return message.channel.send(embed);
    }
    if (!sec) {
	let Kisukea = message.guild.members.cache.filter(member => {
			return member.roles.cache.has(enAltYetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id)
		  }).map(member => ("<@" + member.user.id + ">")).join(",");
      let Kisuke = message.guild.members.cache
        .filter(member => {
          return member.roles.cache.has(enAltYetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id)
        }).size;

      let toplamyetkili = message.guild.roles.cache.get(enAltYetkiliRol).members.size
      let sesteOlanYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(enAltYetkiliRol) && member.voice.channel && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id)).size;
      let aktifYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(enAltYetkiliRol) && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id) && (member.presence.status !== "offline")).size;
      let offlineYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(enAltYetkiliRol) && !member.user.bot && !client.ayarlar.sahip.includes(member.user.id) && member.presence.status == "offline").size;

      let tablo = [{
        "TOPLAM": toplamyetkili + " kişi",
        "AKTİF": aktifYetkili + " kişi",
        "KAPALI": offlineYetkili + " kişi",
        "SESTE": sesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": Kisuke + " kişi"
      }]

      message.channel.send(table.create(tablo), {
        code: "md",
        split: true
      })
      message.channel.send(Kisukea, {code: "md", split: { char: "," }})
    }

  } else return;
}
exports.conf = {
  aliases: ["ysay", "seslikontrol", "Yetkilisay", "yetkili-say"]
}
exports.help = {
  name: 'yetkilisay'
}