const {
    Client,
    GuildMember,
    GuildAuditLogsEntry,
    WebhookClient,
    MessageEmbed
} = require("discord.js");

const RoleModel = require("./models/Role");
const ChannelModel = require("./models/Channel");
const SafeMember = require("./models/safeMembers");
const DeletedRoles = require("./models/deletedRoles");
const sunucuayar = require("./models/sunucuayar");
const Config = require("./Config.json");
const QueryManager = require("./query");
const request = require("request");
const moment = require("moment");

const Guards = [];

//#region Rol Koruma
const RoleGuard = new Client();

RoleGuard.on("ready", async () => {
    RoleGuard.user.setStatus("idle");
    let kanal = RoleGuard.channels.cache.filter(x => x.type === "voice" && x.id === Config.BotSesKanal);
    setInterval(() => {
      const oynuyor = Config.BotDurum;
      const index = Math.floor(Math.random() * (oynuyor.length));
      RoleGuard.user.setActivity(`${oynuyor[index]}`, {
        type: "WATCHING"
      });
      kanal.map(channel => {
        if (channel.id === Config.BotSesKanal) {
          if (channel.members.some(member => member.id === RoleGuard.user.id)) return;
          if (!RoleGuard.channels.cache.get(Config.BotSesKanal)) return;
          RoleGuard.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
        } else return;
      });
    }, 10000);
    console.log("Rol koruma botu aktif.");
    await backup();
    setInterval(async () => {
        await backup();
    }, 1000 * 60 * 60 * 3)
});

RoleGuard.on("message", async (message) => {
    const args = message.content.split(" ");
    const command = args.shift();
    let veri = await SafeMember.findOne({
        guildID: message.guild.id
    }) || {
        "Full": [],
        "RoleAndChannel": [],
        "Role": [],
        "Channel": [],
        "Bot": [],
        "BanAndKick": [],
        "ChatG": [],
        "Permissions": [],
        "SafeRole": []
    };
    if ((Config.BotOwner.includes(message.author.id) || Config.fowner.includes(message.author.id)) && command == "!güvenli") {
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setFooter("Owsla Guard - FerhatAYDN")
        let sec = args[0];
        if (!sec) return message.reply(`**Doğru Kullanım**: **!güvenli ${["full", "rol&kanal", "rol", "kanal", "ban&kick", "bot", "chat","grol"].map(x => `\`${x}\``).join(" - ")}**`);

        if (sec === "full") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli full @etiket/@rol/ID** yazabilirsiniz!

${veri.Full.length > 0 ? veri.Full.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
                if (!dats) return message.reply("Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!");
                if (veri.Full.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Full**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            Full: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Full**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            Full: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "rol&kanal") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli rol&kanal @etiket/@rol/ID** yazabilirsiniz!

${veri.RoleAndChannel.length > 0 ? veri.RoleAndChannel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Rol Silme (Ban)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
                if (!dats) return message.reply("Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!");
                if (veri.RoleAndChannel.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Rol And Channel**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            RoleAndChannel: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Rol And Channel**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            RoleAndChannel: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "kanal") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli kanal @kanal/@rol/ID** yazabilirsiniz!

${veri.Channel.length > 0 ? veri.Channel.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Rol Oluşturma (Jail)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]) || message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                if (!dats && dats.type !== "voice") return message.reply("Lütfen bir Kişi & Rol & Ses Kanal ID'si giriniz veya Kişi & Rol & Ses Kanal Etiketleyiniz!");
                if (veri.Channel.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Channel**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            Channel: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Channel**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            Channel: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "rol") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli rol @etiket/@rol/ID** yazabilirsiniz!

${veri.Role.length > 0 ? veri.Role.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
                if (!dats) return message.reply("Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!");
                if (veri.Role.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Role**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            Role: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Role**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            Role: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "ban&kick") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli ban&kick @etiket/@rol/ID** yazabilirsiniz!

${veri.BanAndKick.length > 0 ? veri.BanAndKick.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- Bot Ekleme (Jail)
- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Rol Oluşturma (Jail)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
                if (!dats) return message.reply("Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!");
                if (veri.BanAndKick.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Ban and Kick**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            BanAndKick: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Ban and Kick**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            BanAndKick: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "bot") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli bot @etiket/@rol/ID** yazabilirsiniz!

${veri.Bot.length > 0 ? veri.Bot.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}

**YAPAMADIĞI İŞLEMLER**
\`- URL Değiştirme (Ban)
- Güvenli Rolleri Silme (Ban)
- Kanal Silme (Jail)
- Kanal Oluşturma (Jail)
- Kanal Güncelleme (Jail)
- Rol Silme (Ban)
- Rol Verme (Jail)
- Rol Güncelleme (Jail)
- Ban & Kick Kullanma (Jail)
- Rol Oluşturma (Jail)\`
`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]);
                if (!dats) return message.reply("Lütfen bir rol ID'si giriniz veya Rol Etiketleyiniz!");
                if (veri.Bot.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**Bot**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            Bot: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**Bot**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            Bot: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "chat") {
            if (!args[1]) {
                embed.setDescription(`
Güvenli listeye herhangi bir kişi eklemek veya silmek için **!güvenli chat @etiket/@rol/#kanal/ID** yazabilirsiniz!

${veri.ChatG.length > 0 ? veri.ChatG.map(x => `${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : message.guild.channels.cache.get(x)}`).join("\n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}`)
                return message.channel.send(embed)
            } else {
                let dats = message.mentions.members.first() || message.mentions.roles.first() || message.guild.members.cache.get(args[1]) || message.guild.roles.cache.get(args[1]) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first();
                if (!dats) return message.reply("Lütfen bir Rol / Kanal / Üye ID'si giriniz veya Rol / Kanal / Üye Etiketleyiniz!");
                if (veri.ChatG.includes(dats.id)) {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeden çıkardın! (**ChatG**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $pull: {
                            ChatG: dats.id
                        }
                    }, {
                        upsert: true
                    });
                } else {
                    message.channel.send(`Başarılı bir şekilde ${dats} verisini güvenli listeye ekledin! (**ChatG**)`);
                    await SafeMember.updateOne({
                        guildID: message.guild.id
                    }, {
                        $push: {
                            ChatG: dats.id
                        }
                    }, {
                        upsert: true
                    });
                }
            }
        }
        if (sec === "grol") {
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
            if (!rol) {
                embed.setDescription(`
        Güvenli roller listesine herhangi bir rol eklemek veya silmek için **!güvenli grol @rol/ID** yazabilirsiniz!
        
        ${veri.SafeRole.length > 0 ? veri.SafeRole.map(x => `${message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : x}`).join("\n") : "Herhangi bir rol güvenliye eklenmedi!"}`)
        return message.channel.send(embed)
            }
            if (veri.SafeRole.includes(rol.id)) {
            await SafeMember.updateOne({guildID: message.guild.id}, {$pull: {SafeRole: rol.id}}, {upsert: true});
              message.channel.send(embed.setDescription(`${rol}, ${message.author} tarafından güvenli rol listesinden kaldırıldı!`));
            } else {
                await SafeMember.updateOne({guildID: message.guild.id}, {$push: {SafeRole: rol.id}}, {upsert: true});
              message.channel.send(embed.setDescription(`${rol}, ${message.author} tarafından güvenli rol listesinden eklendi!`));
            };
          };
    }

    if (checkPermission(RoleGuard, message.author.id, "full") && command == "!yt") {
        let sec = args[0];
        let izinler = Config.StaffPerm
        let data = [];
        if (sec === "aç") {
            if (veri.Permissions.length > 0) {
                for (let i = 0; i < veri.length; i++) {
                    const elm = veri[i];
                    message.guild.roles.cache.get(elm.id).setPermissions(elm.permission).catch();
                }
                message.channel.send(`Başarılı bir şekilde yetkileri açtınız!`);
            } else return message.reply("Lütfen mevcut izinleri kaydediniz!");
        }
        if (sec === "kapat") {
            if (veri.Permissions.length > 0) {
                for (let i = 0; i < veri.Permissions.length; i++) {
                    const elm = veri.Permissions[i];
                    message.guild.roles.cache.get(elm.id).setPermissions(message.guild.roles.cache.find(x => x.name === "@everyone").permissions.has(8) ? message.guild.roles.cache.find(x => x.name === "@everyone").permissions.bitfield : 0).catch();
                }
                message.channel.send(`Başarılı bir şekilde yetkileri kapattınız!`);
            } else return message.reply("Lütfen mevcut izinleri kaydediniz!");
        }

        if (sec == "yükle" && Config.BotOwner.includes(message.author.id)) {
            message.guild.roles.cache.filter(rol => izinler.some(rol2 => rol.permissions.has(rol2)) && !rol.managed).forEach(role => {
                data.push({
                    id: role.id,
                    permission: role.permissions.bitfield
                })
            })
            await safeMembers.updateOne({guildID: message.guild.id}, {$set: {Permissions: data}}, {upsert: true});
            message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            })).setDescription(`Başarılı bir şekilde rol ve izinlerini entegre ettiniz!\n\n${data.map(x => `<@&${x.id}>: **${x.permission}**`).join("\n")}`))
        }
    }
    if (Config.BotOwner.includes(message.author.id) && command == "!silinenroller") {
        let veri = await DeletedRoles.find().exec();
        message.channel.send(`${veri.reverse().map(dat => `Eski Rol: ${dat.oldRoleID} -> Yeni Rol: ${dat.newRoleID} => ${moment(dat.Date).locale("tr").format("LLL")}`).join("\n")}`, {
            code: "md",
            split: true
        })
    };
});


RoleGuard.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.roles.cache.size != newMember.roles.cache.size) {
        let diffRoles = newMember.roles.cache.filter(o => !oldMember.roles.cache.has(o.id));
        let perms = Config.StaffPerm
        if (!diffRoles.some(e => perms.some(perm => e.permissions.has(perm)))) {
            return;
        }
        let logs = await oldMember.guild.fetchAuditLogs({
            limit: 1,
            type: "MEMBER_ROLE_UPDATE"
        });
        let entry = logs.entries.first();
        if (!entry || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel") || await checkPermission(RoleGuard, entry.executor.id, "role")) return;
        let member = await oldMember.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
        if (member && member.bannable) {
            await cezaVer(RoleGuard, member.id, "jail")
        }
        newMember.roles.set(oldMember.roles.cache.map(r => r.id));
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${newMember.user.tag}** (${newMember.id}) kişisine yasak yetkili rol verdi. Bu sebepten ötürü sunucudan kalıcı olarak atıldı.`);
    }
});

let roleCreateLimit = {};
RoleGuard.on("roleCreate", async (role) => {
    let logs = await role.guild.fetchAuditLogs({
        type: "ROLE_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel") || await checkPermission(RoleGuard, entry.executor.id, "role")) return;
    if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
    if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= Config.Limit.RoleCreate) {
        roleCreateLimit[entry.executor.id] = 0;
        cezaVer(RoleGuard, entry.executor.id, "jail");
        role.delete({
            reason: "Owsla Guard"
        })
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye ${Config.Limit.RoleCreate} veya daha fazla rol açtı limiti doldurduğu için jail'e düştü`);
    };
    roleCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        roleCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);
    sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye rol açtı (Limit: **${roleCreateLimit[entry.executor.id]}/${Config.Limit.RoleCreate}**)`)
});

RoleGuard.on("roleUpdate", async (oldRole, newRole) => {
    let logs = await oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_UPDATE"
    });
    let entry = logs.entries.first();
    if (!entry || checkPermission(RoleGuard, entry.executor.id, "role") || checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) return;
    newRole.edit(oldRole)
});

const RoleChannelData = {};
let secenek = false;
RoleGuard.on("roleDelete", async (role) => {
        let veri = await SafeMember.findOne({
        guildID: role.guild.id
    }) || {
        "Full": [],
        "RoleAndChannel": [],
        "Role": [],
        "Channel": [],
        "Bot": [],
        "BanAndKick": [],
        "ChatG": [],
        "Permissions": [],
        "SafeRole": []
    };
    secenek = false;
    RoleChannelData[role.id] = "wait";
    let logs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_DELETE"
    });
    let entry = logs.entries.first();

    if ((!entry || await checkPermission(RoleGuard, entry.executor.id, "full")) && !veri.SafeRole.includes(role.id)) {
        RoleChannelData[role.id] = "ignore";
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) tarafından, **${role.name}** (${role.id}) rolü silindi. Silen kişi güvenli listede olduğu için işlem iptal edildi.`);
    }

    /**
     * @type {GuildMember}
     */
    let member = await role.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    let memb = role.guild.members.cache.get(entry.executor.id)
    if (member && member.bannable) {
        await cezaVer(RoleGuard, member.id, "ban")
    }

    let newRole = await role.guild.roles.create({
        data: {
            color: role.color,
            hoist: role.hoist,
            mentionable: role.mentionable,
            name: role.name,
            permissions: role.permissions,
            position: role.rawPosition
        }
    });
    RoleChannelData[role.id] = newRole.id;

    let result = await RoleModel.findOne({guildID: role.guild.id,roleID: role.id})
    await DeletedRoles.updateOne({oldRoleID: role.id}, {$set: {newRoleID: newRole.id,Date: Date.now()}}, {upsert: true});
    await RoleModel.updateOne({guildID: role.guild.id,roleID: role.id}, {$set: {roleID: newRole.id}})
    await veriDegis(role.id, newRole.id);
    if (!result) {
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) tarafından, **${role.name}** (${role.id}) rolü silindi. Rol üzerinde veri bulunamadığı için işlem iptal edildi.`);
    }
    
    let membersCount = result.members.length;
    let clientsCount = Guards.length;
    let countUser = membersCount % clientsCount;
    let perUser = Math.floor(membersCount / clientsCount);
    let clients = getClients(clientsCount);

	let kanalPermVeri = result.channelOverwrites;
            if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
              let kanal = message.guild.channels.cache.get(perm.id);
              if (!kanal) return;
              setTimeout(() => {
                let yeniKanalPermVeri = {};
                perm.allow.forEach(p => {
                  yeniKanalPermVeri[p] = true;
                });
                perm.deny.forEach(p => {
                  yeniKanalPermVeri[p] = false;
                });
                kanal.createOverwrite(newRole, yeniKanalPermVeri).catch(console.error);
              }, index * 5000);
            });
			
			
    sendLog(`**(${memb.displayName})** **${entry.executor.tag}** (${entry.executor.id}) tarafından,\n**${role.name}** (${role.id}) rolü silindi **${clients.length}** adet bot **${result.members.length}** adet üyeye rolleri geri dağıtılmaya başlandı! (Ortalama Gerçekleşecek Süre: **${(membersCount>1000 ? parseInt((membersCount*(Config.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(membersCount*(Config.Guard.GiveRoleDelay/1000))+" saniye")}**)`);
    clients.forEach((_guardClient, _index) => {
        let membersId = result.members.splice(0, (_index == 0 ? perUser + countUser : perUser));
        _guardClient.queryManager.query(async () => {
            return new Promise(async (resolve) => {
                for (let index = 0; index < membersId.length; index++) {
                    if (newRole.deleted) {
                        console.log("Rol tekrardan silindi ve bu sebepten ötürü işlem iptal edildi.")
                        break;
                    }
                    let memberId = membersId[index];
                    let localMember = (await _guardClient.guilds.cache.first().members.fetch(memberId).catch(e => undefined));
                    if (!localMember || (localMember && localMember.roles.cache.has(newRole.id))) continue;
                    await localMember.roles.add(newRole.id).catch(() => {
                        console.error(localMember.user.username + " es geçilmek zorunda kalındı.");
                    });
                    await sleep(Config.Guard.GiveRoleDelay);
                }
                resolve();
            });
        });
    });
});

RoleGuard.login(Config.RoleGuard);

//#endregion

//#region Kanal Koruma



const ChannelGuard = new Client();
ChannelGuard.on("ready", () => {
    ChannelGuard.user.setStatus("idle");
    let kanal = ChannelGuard.channels.cache.filter(x => x.type === "voice" && x.id === Config.BotSesKanal);
    setInterval(() => {
      const oynuyor = Config.BotDurum;
      const index = Math.floor(Math.random() * (oynuyor.length));
      ChannelGuard.user.setActivity(`${oynuyor[index]}`, {
        type: "WATCHING"
      });
      kanal.map(channel => {
        if (channel.id === Config.BotSesKanal) {
          if (channel.members.some(member => member.id === ChannelGuard.user.id)) return;
          if (!ChannelGuard.channels.cache.get(Config.BotSesKanal)) return;
          ChannelGuard.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
        } else return;
      });
    }, 10000);
    console.log("Kanal koruma botu aktif.");
});

const ChannelStatus = {};
let num = 0;

ChannelGuard.on("channelDelete", async (channel) => {
    num = 0;

    if (channel.type == "category") {
        ChannelStatus[channel.id] = "waiting";
    }
    let logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE"
    });
    let entry = logs.entries.first();

    if (!entry || await checkPermission(ChannelGuard, entry.executor.id, "channel") || await checkPermission(ChannelGuard, entry.executor.id, "roleandchannel")) return;

    /**
     * @type {GuildMember}
     */
    let member = await channel.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (member && member.bannable) {
        await cezaVer(ChannelGuard, member.id, "jail");
        sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${channel.name}** adlı kanalı sildiği için jail'e gönderildi. Kanal Yeniden Oluşturuldu!`)
    }

    let newChannel = await channel.clone();
    newChannel.setPosition(channel.rawPosition);
    await kanalKontrol(channel.id, newChannel.id)
    if (channel.type == "category") {
        ChannelStatus[channel.id] = newChannel.id;
    }
});



let channelCreateLimit = {};
ChannelGuard.on("channelCreate", async (channel) => {
    let logs = await channel.guild.fetchAuditLogs({
        type: "CHANNEL_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || await checkPermission(ChannelGuard, entry.executor.id, "channel") || await checkPermission(ChannelGuard, entry.executor.id, "roleandchannel")) return;
    if (!channelCreateLimit[entry.executor.id]) channelCreateLimit[entry.executor.id] = 0;
    if (channelCreateLimit[entry.executor.id] >= Config.Limit.ChannelCreate) {
        cezaVer(ChannelGuard, entry.executor.id, "jail");
        channelCreateLimit[entry.executor.id] = 0;
        //channel.delete({rason: "Owsla Channel Guard"});
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye bir kanal kanal oluşturdu (Limit dolduğu için jail'e gönderildi!)`)
    }
    channelCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        channelCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);
    sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye bir kanal kanal oluşturdu (Limit: **${channelCreateLimit[entry.executor.id]}**)`)
});


ChannelGuard.login(Config.ChannelGuard);

//#endregion

//#region Harici Koruma
const OtherGuard = new Client();

OtherGuard.on("ready", () => {
    OtherGuard.user.setStatus("idle");
    let kanal = OtherGuard.channels.cache.filter(x => x.type === "voice" && x.id === Config.BotSesKanal);
    setInterval(() => {
      const oynuyor = Config.BotDurum;
      const index = Math.floor(Math.random() * (oynuyor.length));
      OtherGuard.user.setActivity(`${oynuyor[index]}`, {
        type: "WATCHING"
      });
      kanal.map(channel => {
        if (channel.id === Config.BotSesKanal) {
          if (channel.members.some(member => member.id === OtherGuard.user.id)) return;
          if (!OtherGuard.channels.cache.get(Config.BotSesKanal)) return;
          OtherGuard.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
        } else return;
      });
    }, 10000);
    console.log("Harici koruma botu aktif.");
});

OtherGuard.on("guildMemberAdd", async (member) => {
    if (!member.user.bot) return;
    let logs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD"
    });
    /**
     * @type {GuildAuditLogsEntry}
     */
    let entry = logs.entries.first();

    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "bot")) return;

    let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (victimMember && victimMember.bannable) {
        await cezaVer(OtherGuard, victimMember.id, "kick")
    }

    return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${member.user.tag}** (${member.id}) botunu ekledi. Sunucudan kalıcı olarak yasaklandı.`);
});

let BanLimit = {};

OtherGuard.on("guildBanAdd", async (guild, user) => {
    let logs = await guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD"
    });
    /**
     * @type {GuildAuditLogsEntry}
     */
    let entry = logs.entries.first();

    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "banandkick") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;

    let victimMember = await guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > Config.Limit.Ban) {
        guild.members.unban(user.id);
        if (victimMember && victimMember.bannable) {
            BanLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
            await cezaVer(OtherGuard, victimMember.id, "ban")
        }
        BanLimit[entry.executor.id].Now += 1;
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${user.tag}** (${user.id}) kişisini yasakladı. Ban limitini geçtiği için kendisi de banlandı.`);
    } else if (!BanLimit[entry.executor.id]) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        };
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${user.tag}** (${user.id}) kişisini yasakladı. Limit (${1})`);
    } else {
        BanLimit[entry.executor.id].Now += 1;
        setTimeout(() => {
            BanLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }, 1000 * 60 * 3);
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${user.tag}** (${user.id}) kişisini yasakladı. Limit (${BanLimit[entry.executor.id].Now})`);
    }
});

let KickLimit = {};

OtherGuard.on("guildMemberRemove", async (member) => {
    let guild = member.guild;

    let logs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK"
    });
    /**
     * @type {GuildAuditLogsEntry}
     */
    let entry = logs.entries.first();
    if (!entry || await checkPermission(OtherGuard, entry.executor.id) || Date.now() - entry.createdTimestamp > 5000) return;
    let victimMember = await guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (KickLimit[entry.executor.id] && KickLimit[entry.executor.id].Now + 1 > Config.Limit.Kick) {
        if (victimMember && victimMember.bannable) {
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
            await cezaVer(OtherGuard, victimMember.id, "ban")
        }
        KickLimit[entry.executor.id].Now += 1;
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${member.user.tag}**(${member.id}) kişisini ATTI. Kick limitini geçtiği için kendisi de banlandı.`);
    } else if (!KickLimit[entry.executor.id]) {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        };
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${member.user.tag}**(${member.id}) kişisini ATTI. Limit (${1})`);
    } else {
        KickLimit[entry.executor.id].Now += 1;
        setTimeout(() => {
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }, 1000 * 60 * 3);
        return sendLog(`**${entry.executor.tag}** (${entry.executor.id}) kişisi **${member.user.tag}**(${member.id}) kişisini ATTI. Limit (${KickLimit[entry.executor.id].Now})`);
    }
});
OtherGuard.on("voiceChannelMute", async (member, muteType) => {
    let logs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_UPDATE"
    });
    let entry = logs.entries.first();
    if (!logs || Date.now() - entry.createdTimestamp > 10000 || member || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel") || entry.executor.bot) return;
    if (!susturmaLimit[entry.executor.id]) susturmaLimit[entry.executor.id] = 0;
    if (susturmaLimit[entry.executor.id] && susturmaLimit[entry.executor.id] >= Config.Limit.Susturma) {
        susturmaLimit[entry.executor.id] = 0;
        cezaVer(OtherGuard, member.id, "jail");
        sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı yetkili **${member.user.tag}** (${member.id}) adlı yetkiliyi sağ tık susturarak jail'e düştü!`);
    };
    susturmaLimit[entry.executor.id] += 1;
    setTimeout(() => {
        susturmaLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);
});

OtherGuard.on("guildUpdate", async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({
        type: 'GUILD_UPDATE',
        limit: 1
    }).then(audit => audit.entries.first());
    if (newGuild.vanityURLCode !== Config.ServerURL) {
        cezaVer(OtherGuard, entry.executor.id, "ban");
        let random = Config.Guards[Math.floor(Math.random() * Config.Guards.length)];
        request({
            method: "PATCH",
            url: `https://discord.com/api/v9/guilds/${Config.Guild}/vanity-url`,
            headers: {
                "Authorization": `Bot ${random}`
            },
            json: {
                "code": `${Config.ServerURL}`
            }
        });
    }
});

OtherGuard.on("webhookUpdate", async (veri) => {
    let logs = await veri.guild.fetchAuditLogs({
        limit: 1,
        type: "WEBHOOK_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "bot")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");
    sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye bir WebHook oluşturduğu için karantinaya gönderildi!`);
    entry.target.delete();
});

OtherGuard.on("emojiDelete", async (emoji) => {
    let logs = await emoji.guild.fetchAuditLogs({
        limit: 1,
        type: "EMOJI_DELETE"
    });
    let entry = logs.entries.first();
    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");
    sendLog(`**${entry.executor.tag}** (${entry.executor.id}) adlı üye bir Emoji sildiği için karantinaya gönderildi!`);
});

OtherGuard.login(Config.OtherGuard);
//#endregion

//#region Yan Korumalar

Config.Guards.forEach(async guard => {
    let guardClient = new Client();
    guardClient.on("ready", () => {
        console.log(`${guardClient.user.username} hazır.`);
        guardClient.queryManager = new QueryManager();
        guardClient.queryManager.init(Config.Guard.TaskDelay); // 1 saniye 
        Guards.push(guardClient);
    });
    await guardClient.login(guard).catch(err => console.error(err));
});

//#endregion

//#region Fonksiyonlar

/**
 * 
 * @param {Client} client 
 * @param {String} channelName 
 * @param {String} message 
 */
const webHook = new WebhookClient(Config.Logs.WebHookID, Config.Logs.WebHookToken)
async function sendLog(message) {
    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Owsla Guard")
        .setDescription(message)
    webHook.send(embed)
}

/**
 * @param {string} id 
 * @param {("role"|"channel"|"banandkick"|"bot"|"chatguard"|"roleandchannel"|"full")} type 
 * @returns {boolean}
 */
async function checkPermission(bots, id, type) {
    let member = bots.guilds.cache.first().members.cache.get(id);
    let res = await SafeMember.findOne({
        guildID: Config.Guild
    });

    if (!res) {
        res = {
            "Full": [],
            "RoleAndChannel": [],
            "Role": [],
            "Channel": [],
            "Bot": [],
            "BanAndKick": [],
            "ChatG": []
        }
        await SafeMember.updateOne({
            guildID: Config.Guild
        }, {}, {
            upsert: true,
            setDefaultsOnInsert: true
        }).exec()
    } else {

        if (Config.BotOwner.some(uye => uye == member?member.id:false) || res.Full.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false) || Guards.some(guard => guard.user.id == member?member.id:false ) || RoleGuard.user.id == member?member.id:false  || ChannelGuard.user.id == member?member.id:false  || OtherGuard.user.id == member?member.id:false ) {
            return true;
        }
        if (type == "full") {
            if (res.Full.some(uye => uye == id || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "role") {
            if (res.Role.some(uye => uye == id || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "roleandchannel") {
            if (res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "channel") {
            if (res.Channel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
        } else if (type == "banandkick") {
            if (res.BanAndKick.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "bot") {
            if (res.Bot.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "chatguard") {
            if (res.ChatG.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else return false;
    }
}

async function backup() {
    let guild = RoleGuard.guilds.cache.first();
    let members = await guild.members.fetch();
    guild.roles.cache.forEach(async role => {
        let roleChannelOverwrites = [];
        guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id)).forEach(c => {
            let channelPerm = c.permissionOverwrites.get(role.id);
            let pushlanacak = {
                id: c.id,
                allow: channelPerm.allow.toArray(),
                deny: channelPerm.deny.toArray()
            };
            roleChannelOverwrites.push(pushlanacak);
        });

        await RoleModel.updateOne({
            roleID: role.id
        }, {
            $set: {
                guildID: guild.id,
                roleID: role.id,
                name: role.name,
                color: role.color,
                hoist: role.hoist,
                position: role.position,
                permissions: role.permissions,
                mentionable: role.mentionable,
                time: Date.now(),
                members: members.filter(member => member.roles.cache.has(role.id)).map(m => m.id),
                channelOverwrites: roleChannelOverwrites
            }
        }, {
            upsert: true
        });
    });
    await ChannelModel.updateOne({
        guildID: guild.id
    }, {
        $set: {
            channels: guild.channels.cache.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    type: x.type,
                    perm: x.permissionOverwrites,
                    pos: x.position
                }
            })
        }
    }, {
        upsert: true
    })

    console.log("Rol ve Kanal yedeği başarılı bir şekilde alındı!")
}

/**
 * 
 * @param {Number} count 
 * @returns {Client[]}
 */
function getClients(count) {
    return Guards.slice(0, count);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cezaVer(test, kisiID, tur) {
    let MEMBER = test.guilds.cache.get(Config.Guild).members.cache.get(kisiID);
    if (!MEMBER) return;
    if (tur == "jail") return MEMBER.roles.cache.has(Config.Booster) ? MEMBER.roles.set([Config.Booster, Config.Jail]) : MEMBER.roles.set([Config.Jail]).catch()
    if (tur == "ban") return MEMBER.ban({
        reason: "Owsla Guard"
    }).catch(console.error);
    if (tur == "kick") return MEMBER.kick().catch(console.error);;
};

async function veriDegis(eskiVeri, yeniVeri) {
    const sdata = await sunucuayar.findOne({guildID: Config.Guild}) || {
        MAN: [],
        WOMAN: [],
        UNREGISTER: [],
        MUTED: null,
        VMUTED: null,
        JAIL: null,
        VKAuthor: null,
        SUPHELI: null,
        REKLAM: null,
        TEAM: null,
        BANTAG: null,
        VKCEZALI: null,
        DCCEZALI: null,
        STCEZALI: null,
        EnAltYetkiliRol: null,
        MUTEAuthorized: [],
        VMUTEAuthorized: [],
        JAILAuthorized: [],
        BANAuthorized: [],
        REKLAMAuthorized: [],
        REGISTERAuthorized: []
    };
    if (sdata.MAN.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {MAN: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {MAN: yeniVeri}})
    }
    if (sdata.WOMAN.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {WOMAN: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {WOMAN: yeniVeri}})    }
    if (sdata.UNREGISTER.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {UNREGISTER: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {UNREGISTER: yeniVeri}})
    }
    if (eskiVeri === sdata.MUTED) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {MUTED: yeniVeri}})
    }
    if (eskiVeri === sdata.VMUTED) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {VMUTED: yeniVeri}})
    }
    if (eskiVeri === sdata.JAIL) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {JAIL: yeniVeri}})
    }
    if (eskiVeri === sdata.VKAuthor) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {VKAuthor: yeniVeri}})
    }
    if (eskiVeri === sdata.SUPHELI) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {SUPHELI: yeniVeri}})
    }
    if (eskiVeri === sdata.REKLAM) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {REKLAM: yeniVeri}})
    }
    if (eskiVeri === sdata.TEAM) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {TEAM: yeniVeri}})
    }
    if (eskiVeri === sdata.BANTAG) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {BANTAG: yeniVeri}})
    }
    if (eskiVeri === sdata.VKCEZALI) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {VKCEZALI: yeniVeri}})
    }
    if (eskiVeri === sdata.DCCEZALI) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {DCCEZALI: yeniVeri}})
    }
    if (eskiVeri === sdata.STCEZALI) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {STCEZALI: yeniVeri}})
    }
    if (eskiVeri === sdata.EnAltYetkiliRol) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {EnAltYetkiliRol: yeniVeri}})
    }
    if (sdata.MUTEAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {MUTEAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {MUTEAuthorized: yeniVeri}})
    }
    if (sdata.VMUTEAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {VMUTEAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {VMUTEAuthorized: yeniVeri}})
    }
    if (sdata.JAILAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {JAILAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {JAILAuthorized: yeniVeri}})
    }
    if (sdata.BANAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {BANAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {BANAuthorized: yeniVeri}})
    }
    if (sdata.REKLAMAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {REKLAMAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {REKLAMAuthorized: yeniVeri}})
    }
    if (sdata.REGISTERAuthorized.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {REGISTERAuthorized: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {REGISTERAuthorized: yeniVeri}})
    }
}

async function kanalKontrol(eskiVeri, yeniVeri) {
    const sdata = await sunucuayar.findOne({guildID: Config.Guild}) || {
        CHAT: null,
        REGISTER: null,
        TAGLOG: null,
        RULES: null,
        SLEEP: null,
        INVITEChannel: null,
        MUTEChannel: null,
        VMUTEChannel: null,
        BANChannel: null,
        JAILChannel: null,
        REKLAMChannel: null,
        REGISTERChannel: null,
        ROLEChannel: null,
        PUBCategory: []
    };
    if (eskiVeri === sdata.CHAT) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {CHAT: yeniVeri}})
    }
    if (eskiVeri === sdata.REGISTER) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {REGISTER: yeniVeri}})
    }
    if (eskiVeri === sdata.TAGLOG) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {TAGLOG: yeniVeri}})
    }
    if (eskiVeri === sdata.RULES) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {RULES: yeniVeri}})
    }
    if (eskiVeri === sdata.SLEEP) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {SLEEP: yeniVeri}})
    }
    if (eskiVeri === sdata.INVITEChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {INVITEChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.MUTEChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {MUTEChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.VMUTEChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {VMUTEChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.BANChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {BANChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.JAILChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {JAILChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.REKLAMChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {REKLAMChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.REGISTERChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {REGISTERChannel: yeniVeri}})
    }
    if (eskiVeri === sdata.ROLEChannel) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$set: {ROLEChannel: yeniVeri}})
    }
    if (sdata.PUBCategory.includes(eskiVeri)) {
        await sunucuayar.updateOne({guildID: Config.Guild}, {$pull: {PUBCategory: eskiVeri}})
        await sunucuayar.updateOne({guildID: Config.Guild}, {$push: {PUBCategory: yeniVeri}})
    }
}

//#endregion