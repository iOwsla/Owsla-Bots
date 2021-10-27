const mongoose = require('mongoose');
let client = global.client;
let puansystem = mongoose.Schema({
    guildID: String,
    PublicKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817063694630937"],
            "Puan": 30
        }
    },
    GameKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817065338798140"],
            "Puan": 6
        }
    },
    KayitKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817061462605893"],
            "Puan": 5
        }
    },
    StreamKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817063355154471"],
            "Puan": 25
        }
    },
    SecretKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817064750940233"],
            "Puan": 10
        }
    },
    SleepingKanal: {
        type: Object,
        default: {
            "Rol": [],
            "Id": "838817064025194499",
            "Puan": 10
        }
    },
    AloneKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": [],
            "Puan": 10
        }
    },
    TerapiKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": [],
            "Puan": 15
        }
    },
    SorunCozmeKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817063355154465"],
            "Puan": 15
        }
    },
    MesajKanallar: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817062993526814"],
            "Puan": 0.15
        }
    },
    TagMember: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 45
        }
    },
    Invite: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 5
        }
    },
    Register: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 3
        }
    },
    Yetkili: {
        type: Object,
        default: {
            "Rol": [],
            "Puan": 60
        }
    },
    Toplantı: {
        type: Object,
        default: {
            "Rol": [],
            "Id": ["838817062993526823"],
            "Puan": 20
        }
    },
    Müzik: {
        type: Object,
        default: {
            "Rol": [],
            "Id": [],
            "Puan": 6
        }
    },
    DailyMission: {
        type: Object,
        default: {
            "logChannel": "838829576314159175",
            "category": ["838817063694630937"],
            "messageChannel": ["838817062993526815"],
            "unChannel": ["838817064025194499"]
        }
    },
    AutoRankUP: {
        type: Object,
        default: {
            Type: false,
            LogChannel: "838829593599017010"
        }
    },
    LevelSystem: {
        type: Object,
        default: {
            Type: false,
            LogChannel: ""
        }
    },
    PuanRolSystem: {
        type: Array,
        default: [{
        "ROLE_1": "838817061396152351",
        "ROLE_2": "838817061396152352",
        "PUAN": 200
    }, {
        "ROLE_1": "838817061396152352",
        "ROLE_2": "838817061396152353",
        "PUAN": 650
    }, {
        "ROLE_1": "838817061396152353",
        "ROLE_2": "838817061396152354",
        "PUAN": 910
    }, {
        "ROLE_1": "838817061396152354",
        "ROLE_2": "838817061396152355",
        "PUAN": 1075
    }, {
        "ROLE_1": "838817061396152355",
        "ROLE_2": "838817061396152357",
        "PUAN": 1300
    }, {
        "ROLE_1": "838817061396152357",
        "ROLE_2": "838817061396152358",
        "PUAN": 1510
    }, {
        "ROLE_1": "838817061396152358",
        "ROLE_2": "838817061396152359",
        "PUAN": 1820
    }, {
        "ROLE_1": "838817061396152359",
        "ROLE_2": "838817061428789298",
        "PUAN": 2030
    }, {
        "ROLE_1": "838817061428789298",
        "ROLE_2": "838817061428789299",
        "PUAN": 6900
    }]
    },
    AutoLogin: {
        type: Object,
        default: {
            Type: true
        }
    }
});
module.exports = mongoose.model("puansystem", puansystem)