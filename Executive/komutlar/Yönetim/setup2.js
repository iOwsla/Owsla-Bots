const {
MessageEmbed,
Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let puansystem = require("../../models/puansystem");
module.exports.run = async (client, message, args, durum, kanal) => {
if (!message.guild) return;
    

if (message.guild.owner.id === message.author.id || conf.sahip.some(member => message.author.id === member) || durum) {
let data = await puansystem.findOneAndUpdate({guildID: message.guild.id}, {guildID: message.guild.id}, {upsert: true, setDefaultsOnInsert: true}).exec()
let sec = args[0];
let embed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.author.tag, message.author.avatarURL({
    dynamic: true
}))
.setFooter(conf.footer)
.setTimestamp()
    if (["toplantı"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.Toplantı.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["Toplantı.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["Toplantı.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["müzik"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.Müzik.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["Müzik.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["Müzik.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["public"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.PublicKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["PublicKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["PublicKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["game"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.GameKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["GameKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["GameKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["register"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.KayitKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["KayitKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["KayitKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["streamer"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.StreamKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["StreamKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["StreamKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["secret"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.SecretKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["SecretKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["SecretKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["sleeping"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.SleepingKanal.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$unset: {["SleepingKanal.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["SleepingKanal.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["alone"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.AloneKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["AloneKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["AloneKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["terapi"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.TerapiKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["TerapiKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["TerapiKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["sorunçözme"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.SorunCozmeKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["SorunCozmeKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["SorunCozmeKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["mesaj"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.MesajKanallar.Id || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["MesajKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["MesajKanallar.Id"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["category"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.DailyMission.category || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["DailyMission.category"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["DailyMission.category"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["messagechannel"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.DailyMission.messageChannel || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["DailyMission.messageChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["DailyMission.messageChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["unchannel"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.DailyMission.unChannel || [];
        if (arr.some(x => x == select)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {["DailyMission.unChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$push: {["DailyMission.unChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["logchannel"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        let arr = data.DailyMission.logChannel
        if (arr) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$set: {["DailyMission.logChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["DailyMission.logChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["autorankuplog"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        if (client.channels.cache.has(data.AutoRankUP.LogChannel)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.LogChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.LogChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["autorankup"].some(y => y === sec)) {
        if (data.AutoRankUP.Type == true) return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.Type"]: false}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.Type"]: true}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["autorankupsabitrol"].some(y => y === sec)) {
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (data.AutoRankUP.sabitROL == rol.id) return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.sabitROL"]: ""}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoRankUP.sabitROL"]: rol.id}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["leveluplog"].some(y => y === sec)) {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
        if (client.channels.cache.has(data.LevelSystem.LogChannel)) { 
            return puansystem.updateOne({guildID: message.guild.id}, {$set: {["LevelSystem.LogChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        }
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["LevelSystem.LogChannel"]: select}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["levelup"].some(y => y === sec)) {
        if (data.LevelSystem.Type == true) return puansystem.updateOne({guildID: message.guild.id}, {$set: {["LevelSystem.Type"]: false}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["LevelSystem.Type"]: true}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
    if (["rankpoint"].some(y => y === sec)) {
        let kontrol = data.PuanRolSystem || [];
        if (args[1] == "bak") {
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setDescription(`**Bilgilendirme:**\n\`\`\`CRol = Şimdiki Rol\nNRol = Sıradaki Rol\nPuan = Şimdi ki rol'den Sıradaki role geçmek için gereken Puan\`\`\`\n**Roller ve puan miktarları:**\n${kontrol.map((x, index) => `\`#${index+1}.\` **CRol:** <@&${x.ROLE_1}> - **NRol:** <@&${x.ROLE_2}> - **Puan:** \`${x.PUAN}\``).join("\n")}`)
            return message.channel.send(embed)
        }
        let currentRole = args[1];
        let nextRole = args[2];
        let puanMiktar = Number(args[3]);
        if (!currentRole) return message.reply("Lütfen şuan'ki rolün ID'sini belirtiniz.");
        if (kontrol.find(x => x.ROLE_1 == currentRole.replace("<@&", "").replace(">", "")) ? kontrol.find(x => x.ROLE_1 == currentRole.replace("<@&", "").replace(">", "")).ROLE_1 == currentRole.replace("<@&", "").replace(">", "") : false) {
            message.reply(`Başarılı bir şekilde ${currentRole} adlı rolün görevini sildiniz.`)
            return puansystem.updateOne({guildID: message.guild.id}, {$pull: {PuanRolSystem: kontrol.find(x => x.ROLE_1 == currentRole.replace("<@&", "").replace(">", ""))}}, {upsert: true}).exec();
        }
        if (!nextRole) return message.reply("Lütfen puan'ı tamamlanınca geçmesi gereken rolün ID'sini belirtiniz.");
        if (!puanMiktar) return message.reply("Lütfen geçiş sırasında kaç puan gerekiyorsa onu belirtiniz.");

        let yazdır = {ROLE_1: currentRole.replace("<@&", "").replace(">", ""), ROLE_2: nextRole.replace("<@&", "").replace(">", ""), PUAN: puanMiktar}
        puansystem.updateOne({guildID: message.guild.id}, {$push: {PuanRolSystem: yazdır}}, {upsert: true}).exec(), message.reply(`Başarılı bir şekilde ${currentRole} rolünden ${nextRole} rolüne ${puanMiktar} Puan'da yükselebilecek şekilde ayarladın`)
    };
    if (["otologin"].some(y => y === sec)) {
        if (data.AutoLogin.Type == true) return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoLogin.Type"]: false}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
        return puansystem.updateOne({guildID: message.guild.id}, {$set: {["AutoLogin.Type"]: true}}, {upsert: true}).exec(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
    };
if (!args[0]) return message.channel.send(`Lütfen doğru kurulum yapınız.`);

} else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Sunucu Sahibi - Bot Sahibi olmalısın!`)
}
exports.conf = {aliases: ["kurulum2", "kur2", "Setup2", "SETUP2", "Setup2"]}
exports.help = {name: 'setup2'}
