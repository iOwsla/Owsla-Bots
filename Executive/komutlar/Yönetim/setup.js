const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (message.guild.owner.id === message.author.id || conf.sahip.some(member => message.author.id === member) || durum) {

        let sec = args[0]
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setFooter(conf.footer)
            .setTimestamp()
            .setDescription(`Selam dostum buralar sende ^^`)

        await sunucuayar.findOne({guildID: conf.sunucuId}, async (err, data) => {
            if (err) console.log(err)


            if (["TAG", "tag", "Tag"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAG = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["TAG2", "tag2", "Tag2"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAG2 = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["Link", "link", "lınk", "LINK", "LİNK"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.LINK = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["GKV", "güvenlikişi", "güvenlikullanıcı", "guvenlikisi", "guvenliKisi", "gkv"].some(y => y === sec)) {
                let select = message.mentions.members.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                let arr = [];
                arr = data.GKV
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.GKV = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
                }
                return await data.GKV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));

            };
            if (["category", "Category", "kategori", "Kategori"].some(y => y === sec)) {
                let select = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                let arr = [];
                arr = data.PUBCategory
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.PUBCategory = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
                }
                return await data.PUBCategory.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            
            if (["GRV", "guvenlirol", "güvenlirol", "grv"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                await data.GRV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["sohbet-kanal", "chat", "sohbetkanal", "genelchat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.CHAT = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["register-kanal", "register", "registerchat", "register-chat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.REGISTER = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            }
            if (["rol-ver-log"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.ROLEChannel = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            }
            if (["taglog-kanal", "taglog", "tagbilgi", "Taglog"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAGLOG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kurallar-kanal", "kurallar", "kurallarkanal", "kurallarchat", "rules", "rule"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.RULES = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["sleep-kanal", "sleep", "sleeproom", "sleepingroom"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.SLEEP = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            if (["vkyonetici", "vkyönetici", "vk-yönetici", "vampirköylü"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VKAuthor = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["erkek", "Erkek", "erkekROL", "man", "Man"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.MAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kadın", "kız", "kızROL", "kadınROL", "woman"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.WOMAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kayıtsız", "unregister", "kayıtsızüye", "uregister", "kayitsiz"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UNREGISTER = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ekip", "teamrol", "ekiprol", "taglırol", "taglı", "team", "takım"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TEAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["boost", "booster", "boostrol", "boosterrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.BOOST = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["jail", "jailed", "cezalı", "Jail", "Jailed", "Cezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.JAIL = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["reklam", "Reklam", "reklamrol", "Reklamrol", "ReklamRol", "REKLAM"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.REKLAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["mute", "muted", "Mute", "Muted"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.MUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["vmute", "vmuted", "VMute", "VMuted", "VoiceMute", "sesmute", "SesMute", "Sesmute"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VMUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["yasaklıtag", "yasaklıtagrol", "bantag", "ban-tag", "yasaklı-tag", "ytag"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.BANTAG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["şüpheli", "supheli", "şüphelihesap", "suphelihesap", "Şüpheli", "Supheli"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.SUPHELI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["enaltyetkilirol", "en-alt-yetkili-rol", "enaltrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.EnAltYetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["genelrol", "genel-rol", "ozelrol", "globalrol"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.COMMANDAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kayıtsorumlusu", "kayit-sorumlusu", "kayıt-sorumlusu", "registerauthorized", "Kayıtçı", "kayitci"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.REGISTERAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            if (["ustytler"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UstYetkiliRol = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust1"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust1YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust2"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust2YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust3"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust3YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["vkcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VKCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["dccezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.DCCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["stcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.STCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            let arr = [];
            if (["panel", "ayar", "settings"].some(y => y === sec)) {
                arr.push(data)
                let embed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setFooter(conf.footer)
                    .setDescription(`Selam dostum buralar sende`);
                message.channel.send(embed);
            };

            if (["yardım", "Yardım", "help", "Help"].some(y => y === sec)) {
                return message.channel.send(embed);
            };
            if (!sec) {
                return message.channel.send(embed);
            };

        });

    } else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Sunucu Sahibi - Bot Sahibi olmalısın!`);
}
exports.conf = {aliases: ["kurulum", "kur", "Setup", "SETUP", "Setup"]}
exports.help = {name: 'setup'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }
