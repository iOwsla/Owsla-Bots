let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let serverSettings = Schema({
    guildID: {
        type: String,
        default: "848794446006190130"
    },
    WARNID: {
        type: Number,
        default: 0
    },
	Etkinlik: {
		type: Boolean,
		default: 0
	},
    TAG: {
        type: String,
        default: ""
    },
    TAG2: {
        type: String,
        default: ""
    },
    LINK: {
        type: String,
        default: ""
    },
    GKV: {
        type: Array,
        default: []
    },
    GRV: {
        type: Array,
        default: []
    },
    BAN_TAG: {
        type: Array,
        default: []
    },

    // Channel Settings


    CHAT: {
        type: String,
        default: ""
    },
    REGISTER: {
        type: String,
        default: ""
    },
    TAGLOG: {
        type: String,
        default: ""
    },
    RULES: {
        type: String,
        default: ""
    },
    SLEEP: {
        type: String,
        default: ""
    },
    PUBCategory: {
        type: Array,
        default: [""]
    },

    // Roles Settings

    VKAuthor: {
        type: String,
        default: ""
    },
    UNREGISTER: {
        type: Array,
        default: ["848794446144471043","848794446144471042"]
    },
    MAN: {
        type: Array,
        default: ["848794446144471047","848794446144471046","848794446144471045"]
    },
    WOMAN: {
        type: Array,
        default: ["848794446212366357","848794446144471049","848794446144471048"]
    },
    TEAM: {
        type: String,
        default: ""
    },
    BOOST: {
        type: String,
        default: ""
    },
    JAIL: {
        type: String,
        default: ""
    },
    REKLAM: {
        type: String,
        default: ""
    },
    SUPHELI: {
        type: String,
        default: ""
    },
    BANTAG: {
        type: String,
        default: ""
    },
    MUTED: {
        type: String,
        default: "848794446245789745"
    },
    VMUTED: {
        type: String,
        default: "848794446245789744"
    },

    // Author Roles Settings

    MUTEAuthorized: {
        type: Array,
        default: []
    },
    VMUTEAuthorized: {
        type: Array,
        default: []
    },
    JAILAuthorized: {
        type: Array,
        default: []
    },
    REKLAMAuthorized: {
        type: Array,
        default: []
    },
    BANAuthorized: {
        type: Array,
        default: []
    },
    WARNAuthorized: {
        type: Array,
        default: []
    },
    REGISTERAuthorized: {
        type: Array,
        default: []
    },
    COMMANDAuthorized: {
        type: Array,
        default: []
    },
    EnAltYetkiliRol: {
        type: String,
        default: "773271657582166086"
    },
    UstYetkiliRol: {
        type: Array,
        default: []
    }, // 3 YETKİLİ ROL 
    Ust1YetkiliRol: {
        type: String,
        default: ""
    }, // 1. YETKİLİ ROL
    Ust2YetkiliRol: {
        type: String,
        default: ""
    }, // 2. YETKİLİ ROL
    Ust3YetkiliRol: {
        type: String,
        default: ""
    }, // 3. YETKİLİ ROL
    VKCEZALI: {
        type: String,
        default: ""
    },
    DCCEZALI: {
        type: String,
        default: ""
    },
    STCEZALI: {
        type: String,
        default: ""
    },

    // Limit System

    BANLimit: {
        type: Number,
        default: 2
    },
    JAILLimit: {
        type: Number,
        default: 3
    },
    REKLAMLimit: {
        type: Number,
        default: 5
    },
    MUTELimit: {
        type: Number,
        default: 5
    },
    VMuteLimit: {
        type: Number,
        default: 5
    },

    // Logging System

    INVITEChannel: {
        type: String,
        default: ""
    },

    MUTEChannel: {
        type: String,
        default: ""
    },
    VMUTEChannel: {
        type: String,
        default: ""
    },
    BANChannel: {
        type: String,
        default: ""
    },
    JAILChannel: {
        type: String,
        default: ""
    },
    WARNChannel: {
        type: String,
        default: ""
    },
    REKLAMChannel: {
        type: String,
        default: ""
    },

    REGISTERChannel: {
        type: String,
        default: ""
    },
    NAMEChannel: {
        type: String,
        default: ""
    },
    CHATChannel: {
        type: String,
        default: ""
    },
    ROLEChannel: {
        type: String,
        default: ""
    },
    PINGChannel: {
        type: String,
        default: ""
    },
    COMMANDChannel: {
        type: String,
        default: ""
    },
    VOICEChannel: {
        type: String,
        default: ""
    },
    LEVELChannel: {
        type: String,
        default: ""
    },
    GUARDChannel: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("setup", serverSettings);