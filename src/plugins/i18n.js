import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    version: `Version`,
    millhouse_warning: `Currently, Millhouse Manastorms are counted abnormally due to deck tracker errors.`,
    hello: `Hello !!`,
    lang: `언어`,
    player_name: `Player name`,
    hero_avg_top: `Hero AVG`,
    minion_used_top: `Minion Used`,
    avg: `AVG`,
    placement: `Rank`,
    mmr: `MMR`,
    crown: `1st`,
    win: `Win`,
    defeat: `Defeat`,
    more: `More`,
    detail: `Detail`,
    used_count: `Used`,
    back: `Back`,
    total: `Total`,
    copy_clipboard: `Copy link to clipboard`,
    last_month: `Last month`,
    last_week: `Last 7days`,
    today: `Today`,

    race: `Race`,
    race_chart: `Race Chart`,
    mech: `Mech`,
    dragon: `Dragon`,
    demon: `Demon`,
    beast: `Beast`,
    murloc: `Murloc`,
    pirate: `Pirate`,
    menagerie: `Menagerie`,
    neutral: `Neutral`,

    buy: `Buy`,
    sell: `Sell`,
    deck: `Deck`,
    freeze: `Freeze`,
    thaw: `Thaw`,
    TB_BaconShopLockAll_Button: `Freeze`,
    lvlup: `Lv UP`,
    power: `Power`,

    do_not_open: `Do not open for 365 days`,
    hero_caption: `Hero statistics`,
    hero_text: ``,
    minion_caption: `Minion statistics`,
    minion_text: ``,
    game_caption: `Game log`,
    game_text: ``,

    player_caption: `Search Battleground statistics`,
    player_text: ``,

    manual_1: `1. Install <b><a href="https://hsreplay.net/battlegrounds/heroes/" target="_blank">[HDT]</a></b>`,
    manual_2: `2. Install <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[Plugin]</a></b>`,
    manual_3: `3. <b>HDT - Config - Plugin - [Plugin Folder] click</b>`,
    manual_4: `4. <b>Insert the downloaded plugin</b>`,
    manual_5: `5. <b>Restart HDT & Enable Plugin</b>`,
    manual_6: `6. <b>Play Hearthstone</b>`,

    hero: `Hero`,
    minion: `Minion`,
    comp: `Comp`,
    pick_count: `Play count`,
    pick_ratio: `Play ratio`,
    avg_placement: `Avg rank`,
    crown_count: `1st`,
    crown_ratio: `1st ratio`,
    win_count: `Win`,
    win_ratio: `Win ratio`,
    HeroPower: `Hero Power`,

    //  ETC
    TB_BaconShop_Triples_01: `Triple Reward`,
    TB_BaconShopTechUp02_Button: `Level 1`,
    TB_BaconShopTechUp03_Button: `Level 2`,
    TB_BaconShopTechUp04_Button: `Level 3`,
    TB_BaconShopTechUp05_Button: `Level 4`,
    TB_BaconShopTechUp06_Button: `Level 5`,
    TB_BaconShopTechUp07_Button: `Level 6`,

    //  HERO
    TB_BaconShop_HERO_KelThuzad: `Kel'Thuzad`,
    TB_BaconShop_HERO_08: `Illidan Stormrage`,
    TB_BaconShop_HERO_16: `A. F. Kay`,
    TB_BaconShop_HERO_56: `Alexstrasza`,
    TB_BaconShop_HERO_45: `Arch-Villain Rafaam`,
    TB_BaconShop_HERO_PH: `BaconPHhero`,
    TB_BaconShop_HERO_31: `Bartendotron`,
    TB_BaconShop_HERO_36: `Dancin' Deryl`,
    TB_BaconShop_HERO_52: `Deathwing`,
    TB_BaconShop_HERO_43: `Dinotamer Brann`,
    TB_BaconShop_HERO_01: `Edwin VanCleef`,
    TB_BaconShop_HERO_42: `Elise Starseeker`,
    TB_BaconShop_HERO_55: `Fungalmancer Flurgl`,
    TB_BaconShop_HERO_02: `Galakrond`,
    TB_BaconShop_HERO_15: `George the Fallen`,
    TB_BaconShop_HERO_19: `Giantfin`,
    TB_BaconShop_HERO_28: `Infinite Toki`,
    TB_BaconShop_HERO_38: `King Mukla`,
    TB_BaconShop_HERO_25: `Lich Baz'hial`,
    TB_BaconShop_HERO_37: `Lord Jaraxxus`,
    TB_BaconShop_HERO_58: `Malygos`,
    TB_BaconShop_HERO_49: `Millhouse Manastorm`,
    TB_BaconShop_HERO_17: `Millificent Manastorm`,
    TB_BaconShop_HERO_30: `Nefarian`,
    TB_BaconShop_HERO_57: `Nozdormu`,
    TB_BaconShop_HERO_18: `Patches the Pirate`,
    TB_BaconShop_HERO_34: `Patchwerk`,
    TB_BaconShop_HERO_20: `Professor Putricide`,
    TB_BaconShop_HERO_39: `Pyramad`,
    TB_BaconShop_HERO_14: `Queen Wagtoggle`,
    TB_BaconShop_HERO_11: `Ragnaros the Firelord`,
    TB_BaconShop_HERO_41: `Reno Jackson`,
    TB_BaconShop_HERO_23: `Shudderwock`,
    TB_BaconShop_HERO_27: `Sindragosa`,
    TB_BaconShop_HERO_40: `Sir Finley Mrrgglton`,
    TB_BaconShop_HERO_44: `Sylvanas Windrunner`,
    TB_BaconShop_HERO_33: `The Curator`,
    TB_BaconShop_HERO_21: `The Great Akazamzarak`,
    TB_BaconShop_HERO_22: `The Lich King`,
    TB_BaconShop_HERO_12: `The Rat King`,
    TB_BaconShop_HERO_47: `Tirion Fordring`,
    TB_BaconShop_HERO_10: `Trade Prince Gallywix`,
    TB_BaconShop_HERO_35: `Yogg-Saron, Hope's End`,
    TB_BaconShop_HERO_53: `Ysera`,
    TB_BaconShop_HERO_60: `Kael'thas Sunstrider`,
    TB_BaconShop_HERO_61: `Lady Vashj`,
    TB_BaconShop_HERO_62: `Maiev Shadowsong`,
    TB_BaconShop_HERO_64: `Captain Eudora`,
    TB_BaconShop_HERO_67: `Captain Hooktusk`,
    TB_BaconShop_HERO_68: `Skycap'n Kragg`,
    TB_BaconShop_HERO_59: `Aranna Starseeker`,
    TB_BaconShop_HERO_50: `Tess Greymane`,
    TB_BaconShop_HERO_70: `Mr. Bigglesworth`,
    TB_BaconShop_HERO_71: `Jandice Barov`,
    TB_BaconShop_HERO_72: `Lord Barov`,
    TB_BaconShop_HERO_74: `Forest Warden Omu`,

    //  Power
    TB_BaconShop_HP_057: `Adventure!`,
    TB_BaconShop_HP_035: `All Patched Up`,
    TB_BaconShop_HP_061: `ALL Will Burn!`,
    TB_BaconShop_HP_052: `Arcane Alteration`,
    TB_BaconShop_HP_050: `Banshee's Blessing`,
    TB_BaconShop_HP_048: `Battle Brand`,
    TB_BaconShop_HP_036: `Bloodfury`,
    TB_BaconShop_HP_010: `Boon of Light`,
    TB_BaconShop_HP_040: `Brick by Brick`,
    TB_BaconShop_HP_022: `Burbling`,
    TB_BaconShop_HP_063: `Clairvoyance`,
    TB_BaconShop_HP_019: `DIE, INSECTS!`,
    TB_BaconShop_HP_062: `Dream Portal`,
    TB_BaconShop_HP_027: `Fire the Cannons!`,
    TB_BaconShop_HP_011: `Galakrond's Greed`,
    TB_BaconShop_HP_056: `Gone Fishing`,
    TB_BaconShop_HP_046: `Gonna Be Rich!`,
    TB_BaconShop_HP_049: `Graveyard Shift`,
    TB_BaconShop_HP_042: `Hat Trick`,
    TB_BaconShop_HP_051: `Honorable Warband`,
    TB_BaconShop_HP_053: `I'll Take That!`,
    TB_BaconShop_HP_041a: `King of Beasts`,
    TB_BaconShop_HP_041d: `King of Demons`,
    TB_BaconShop_HP_041f: `King of Dragons`,
    TB_BaconShop_HP_041b: `King of Mechs`,
    TB_BaconShop_HP_041c: `King of Murlocs`,
    TB_BaconShop_HP_047: `Lead Explorer`,
    TB_BaconShop_HP_054: `Manastorm`,
    TB_BaconShop_HP_033: `Menagerist`,
    TB_BaconShop_HP_017: `Murloc King`,
    TB_BaconShop_HP_043: `Nefarious Fire`,
    TB_BaconShop_HP_020: `Prestidigitation`,
    TB_BaconShop_HP_044: `Procrastinate`,
    TB_BaconShop_HP_039: `Puzzle Box`,
    TB_BaconShop_HP_064: `Queen of Dragons`,
    TB_BaconShop_HP_018: `Rage Potion`,
    TB_BaconShop_HP_024: `Reborn Rites`,
    TB_BaconShop_HP_001: `Sharpen Blades`,
    TB_BaconShop_HP_009: `Skilled Bartender`,
    TB_BaconShop_HP_008: `Smart Savings`,
    TB_BaconShop_HP_014: `Stay Frosty`,
    TB_BaconShop_HP_028: `Temporal Tavern`,
    TB_BaconShop_HP_015: `Tinker`,
    TB_BaconShop_HP_037a: `Wax Warband`,
    TB_BaconShop_HP_069: `Wingmen`,
    TB_BaconShop_HP_068: `Imprison`,
    TB_BaconShop_HP_067: `Evolving Electricity`,
    TB_BaconShop_HP_066: `Verdant Spheres`,
    TB_BaconShop_HP_074: `Buried Treasure`,
    TB_BaconShop_HP_075: `Trash for Treasure`,
    TB_BaconShop_HP_076: `Piggy Bank`,
    TB_BaconShop_HP_077: `Bob's Burgles`,
    TB_BaconShop_HP_038: `Bananarama`,
    TB_BaconShop_HP_080: `Kel'Thuzad's Kitty`,
    TB_BaconShop_HP_084: `Swap, Lock, & Shop It`,
    TB_BaconShop_HP_081: `Friendly Wager`,
    TB_BaconShop_HP_082: `Everbloom`,

    //  Minion
    BGS_010: `Annihilan Battlemaster`,
    BGS_034: `Bronze Warden`,
    BGS_039: `Dragonspawn Lieutenant`,
    BGS_067: `Drakonid Enforcer`,
    BGS_031: `Gentle Megasaur`,
    BGS_008: `Ghastcoiler`,
    BGS_045: `Glyph Guardian`,
    BGS_018: `Goldrinn, the Great Wolf`,
    BGS_033: `Hangry Dragon`,
    BGS_032: `Herald of Flame`,
    BGS_068: `Holy Mackerel`,
    BGS_044: `Imp Mama`,
    BGS_014: `Imprisoner`,
    BGS_041: `Kalecgos, Arcane Aspect`,
    BGS_012: `Kangor's Apprentice`,
    BGS_030: `King Bagurgle`,
    BGS_009: `Lightfang Enforcer`,
    BGS_021: `Mama Bear`,
    BGS_059: `Master Demonologist`,
    BGS_027: `Micro Machine`,
    BGS_025: `Mounted Raptor`,
    BGS_043: `Murozond`,
    BGS_040: `Nadina the Red`,
    BGS_001: `Nathrezim Overseer`,
    BGS_017: `Pack Leader`,
    BGS_023: `Piloted Shredder`,
    BGS_024: `Piloted Sky Golem`,
    BGS_028: `Pogo-Hopper`,
    BGS_020: `Primalfin Lookout`,
    BGS_036: `Razorgore, the Untamed`,
    BGS_019: `Red Whelp`,
    BGS_029: `Shifter Zerus`,
    BGS_006: `Sneed's Old Shredder`,
    BGS_002: `Soul Juggler`,
    BGS_037: `Steward of Time`,
    BGS_038: `Twilight Emissary`,
    BGS_035: `Waxrider Togwaggle`,
    BGS_004: `Wrath Weaver`,
    BGS_022: `Zapp Slywick`,
    BGS_071: `Deflect-o-Bot`,
    BGS_075: `Rabid Saurolisk`,
    DS1_070: `Houndmaster`,
    KAR_005: `Kindly Grandmother`,
    KAR_095: `Zoobot`,
    KAR_702: `Menagerie Magician`,
    LOOT_013: `Vulgar Homunculus`,
    LOOT_078: `Cave Hydra`,
    LOOT_368: `Voidlord`,
    BOT_218: `Security Rover`,
    BOT_312: `Replicating Menace`,
    BOT_445: `Mecharoo`,
    BOT_537: `Mechano-Egg`,
    BOT_606: `Kaboom Bot`,
    BOT_911: `Annoy-o-Module`,
    GVG_021: `Mal'Ganis`,
    GVG_027: `Iron Sensei`,
    GVG_048: `Metaltooth Leaper`,
    GVG_055: `Screwjank Clunker`,
    GVG_062: `Cobalt Guardian`,
    GVG_100: `Floating Watcher`,
    GVG_113: `Foe Reaper 4000`,
    EX1_014t: `Banana`,
    EX1_062: `Old Murk-Eye`,
    EX1_093: `Defender of Argus`,
    EX1_103: `Coldlight Seer`,
    EX1_162: `Dire Wolf Alpha`,
    EX1_185: `Siegebreaker`,
    EX1_506: `Murloc Tidehunter`,
    EX1_506a: `Murloc Scout`,
    EX1_507: `Murloc Warleader`,
    EX1_509: `Murloc Tidecaller`,
    EX1_531: `Scavenging Hyena`,
    EX1_534: `Savannah Highmane`,
    EX1_556: `Harvest Golem`,
    EX1_577: `The Beast`,
    CFM_315: `Alleycat`,
    CFM_316: `Rat Pack`,
    CFM_610: `Crystalweaver`,
    CFM_816: `Virmen Sensei`,
    CFM_315t: `Tabbycat`,
    DAL_077: `Toxfin`,
    AT_121: `Crowd Favorite`,
    ICC_029: `Cobalt Scalebane`,
    UNG_073: `Rockpool Hunter`,
    OG_256: `Spawn of N'Zoth`,
    OG_221: `Selfless Hero`,
    ICC_858: `Bolvar, Fireblood`,
    TB_BaconShop_HP_033t: `Amalgam`,
    BRM_006: `Imp Gang Boss`,
    YOD_026: `Fiendish Servant`,
    ICC_038: `Righteous Protector`,
    FP1_024: `Unstable Ghoul`,
    OG_216: `Infested Wolf`,

    LOE_077: `Brann Bronzebeard`,
    ICC_807: `Strongshell Scavenger`,
    FP1_031: `Baron Rivendare`,
    TRL_232: `Ironhide Direhorn`,
    GVG_106: `Junkbot`,
    TB_BaconShop_HP_047t: `Recruitment Map`,
    FP1_010: `Maexxna`,
    DAL_575: `Khadgar`,
    BT_010: `Felfin Navigator`,
    BGS_069: `Amalgadon`,
    TB_BaconUps_121: `Amalgadon (G)`,
    BGS_083: `Menagerie Jug`,
    TB_BaconUps_145: `Menagerie Jug (G)`,
    BGS_082: `Menagerie Mug`,
    TB_BaconUps_144: `Menagerie Mug (G)`,
    ULD_217: `Micro Mummy`,
    TB_BaconUps_250: `Micro Mummy (G)`,


    //  Gold Minion
    TB_BaconUps_093: `Alleycat (G)`,
    TB_BaconUps_083: `Annihilan Battlemaster (G)`,
    TB_BaconUps_099: `Annoy-o-Module (G)`,
    TB_BaconUps_055: `Baron Rivendare (G)`,
    TB_BaconUps_004t: `Big Bad Wolf (G)`,
    TB_BaconUps_047: `Bolvar, Fireblood (G)`,
    TB_BaconUps_045: `Brann Bronzebeard (G)`,
    TB_BaconUps_120: `Cobalt Scalebane (G)`,
    TB_BaconUps_064: `Coldlight Seer (G)`,
    TB_BaconUps_037: `Crowd Favorite (G)`,
    TB_BaconUps_070: `Crystalweaver (G)`,
    TB_BaconUps_006t: `Damaged Golem (G)`,
    TB_BaconUps_009: `Defender of Argus (G)`,
    TB_BaconUps_088: `Dire Wolf Alpha (G)`,
    TB_BaconUps_117: `Drakonid Enforcer (G)`,
    TB_BaconUps_033: `Festeroot Hulk (G)`,
    TB_BaconUps_112: `Fiendish Servant (G)`,
    TB_BaconUps_101: `Floating Watcher (G)`,
    TB_BaconUps_084: `Gentle Megasaur (G)`,
    TB_BaconUps_057: `Ghastcoiler (G)`,
    TB_BaconUps_115: `Glyph Guardian (G)`,
    TB_BaconUps_085: `Goldrinn, the Great Wolf (G)`,
    TB_BaconUps_041t: `Guard Bot (G)`,
    TB_BaconUps_104: `Hangry Dragon (G)`,
    TB_BaconUps_006: `Harvest Golem (G)`,
    TB_BaconUps_103: `Herald of Flame (G)`,
    TB_BaconUps_068: `Houndmaster (G)`,
    TB_BaconUps_049t: `Hyena (G)`,
    TB_BaconUps_030t: `Imp (G)`,
    TB_BaconUps_030: `Imp Gang Boss (G)`,
    TB_BaconUps_116: `Imp Mama (G)`,
    TB_BaconUps_113: `Imprisoner (G)`,
    TB_BaconUps_026: `Infested Wolf (G)`,
    TB_BaconUps_044: `Iron Sensei (G)`,
    TB_BaconUps_051: `Ironhide Direhorn (G)`,
    TB_BaconUps_051t: `Ironhide Runt (G)`,
    TB_BaconUps_002t: `Jo-E Bot (G)`,
    TB_BaconUps_046: `Junkbot (G)`,
    TB_BaconUps_028: `Kaboom Bot (G)`,
    TB_BaconUps_109: `Kalecgos, Arcane Aspect (G)`,
    TB_BaconUps_087: `Kangor's Apprentice (G)`,
    TB_BaconUps_034: `Khadgar (G)`,
    TB_BaconUps_004: `Kindly Grandmother (G)`,
    TB_BaconUps_100: `King Bagurgle (G)`,
    TB_BaconUps_082: `Lightfang Enforcer (G)`,
    TB_BaconUps_060: `Mal'Ganis (G)`,
    TB_BaconUps_090: `Mama Bear (G)`,
    TB_BaconUps_119: `Master Demonologist (G)`,
    TB_BaconUps_039: `Mechano-Egg (G)`,
    TB_BaconUps_002: `Mecharoo (G)`,
    TB_BaconUps_073: `Menagerie Magician (G)`,
    TB_BaconUps_066: `Metaltooth Leaper (G)`,
    TB_BaconUps_094: `Micro Machine (G)`,
    TB_BaconUps_032t: `Microbot (G)`,
    TB_BaconUps_019: `Mounted Raptor (G)`,
    TB_BaconUps_003t: `Murloc Scout (G)`,
    TB_BaconUps_011: `Murloc Tidecaller (G)`,
    TB_BaconUps_003: `Murloc Tidehunter (G)`,
    TB_BaconUps_008: `Murloc Warleader (G)`,
    TB_BaconUps_110: `Murozond (G)`,
    TB_BaconUps_062: `Nathrezim Overseer (G)`,
    TB_BaconUps_036: `Old Murk-Eye (G)`,
    TB_BaconUps_086: `Pack Leader (G)`,
    TB_BaconUps_038: `Phalanx Commander (G)`,
    TB_BaconUps_035: `Piloted Shredder (G)`,
    TB_BaconUps_050: `Piloted Sky Golem (G)`,
    TB_BaconUps_077: `Pogo-Hopper (G)`,
    TB_BaconUps_052t: `Primalfin (G)`,
    TB_BaconUps_089: `Primalfin Lookout (G)`,
    TB_BaconUps_027t: `Rat (G)`,
    TB_BaconUps_027: `Rat Pack (G)`,
    TB_BaconUps_106: `Razorgore, the Untamed (G)`,
    TB_BaconUps_102: `Red Whelp (G)`,
    TB_BaconUps_032: `Replicating Menace (G)`,
    TB_BaconUps_039t: `Robosaur (G)`,
    TB_BaconUps_061: `Rockpool Hunter (G)`,
    TB_BaconUps_040: `Safeguard (G)`,
    TB_BaconUps_052: `Sated Threshadon (G)`,
    TB_BaconUps_049: `Savannah Highmane (G)`,
    TB_BaconUps_043: `Scavenging Hyena (G)`,
    TB_BaconUps_069: `Screwjank Clunker (G)`,
    TB_BaconUps_041: `Security Rover (G)`,
    TB_BaconUps_014: `Selfless Hero (G)`,
    TB_BaconUps_095: `Shifter Zerus (G)`,
    TB_BaconUps_053: `Siegebreaker (G)`,
    TB_BaconUps_080: `Sneed's Old Shredder (G)`,
    TB_BaconUps_075: `Soul Juggler (G)`,
    TB_BaconUps_025: `Spawn of N'Zoth (G)`,
    TB_BaconUps_026t: `Spider (G)`,
    TB_BaconUps_107: `Steward of Time (G)`,
    TB_BaconUps_072: `Strongshell Scavenger (G)`,
    TB_BaconUps_093t: `Tabbycat (G)`,
    TB_BaconUps_042: `The Beast (G)`,
    TB_BaconUps_058: `The Boogeymonster (G)`,
    TB_BaconUps_031: `Tortollan Shellraiser (G)`,
    TB_BaconUps_108: `Twilight Emissary (G)`,
    TB_BaconUps_118: `Unstable Ghoul (G)`,
    TB_BaconUps_040t: `Vault Safe (G)`,
    TB_BaconUps_074: `Virmen Sensei (G)`,
    TB_BaconUps_059: `Voidlord (G)`,
    TB_BaconUps_059t: `Voidwalker (G)`,
    TB_BaconUps_105: `Waxrider Togwaggle (G)`,
    TB_BaconUps_079: `Wrath Weaver (G)`,
    TB_BaconUps_091: `Zapp Slywick (G)`,
    TB_BaconUps_063: `Zoobot (G)`,
    TB_BaconUps_123: `Deflect-o-Bot (G)`,
    TB_BaconUps_124: `Felfin Navigator (G)`,
    TB_BaconUps_125: `Rabid Saurolisk (G)`,

    //pirate
    BGS_055: `Deck Swabbie`,
    TB_BaconUps_126: `Deck Swabbie (G)`,
    BGS_061: `Scallywag`,
    TB_BaconUps_141: `Scallywag (G)`,
    NEW1_027: `Southsea Captain`,
    TB_BaconUps_136: `Southsea Captain (G)`,
    BGS_077: `Arcane Cannon`,
    TB_BaconUps_128: `Arcane Cannon (G)`,
    BGS_078: `Monstrous Macaw`,
    TB_BaconUps_135: `Monstrous Macaw (G)`,
    BGS_049: `Freedealing Gambler`,
    TB_BaconUps_127: `Freedealing Gambler (G)`,
    BGS_060: `Yo-Ho-Ogre`,
    BGS_081: `Salty Looter`,
    TB_BaconUps_143: `Salty Looter (G)`,
    BGS_053: `Bloodsail Cannoneer`,
    TB_BaconUps_138: `Bloodsail Cannoneer (G)`,
    BGS_048: `Southsea Strongarm`,
    TB_BaconUps_140: `Southsea Strongarm (G)`,
    BGS_066: `Goldgrubber`,
    TB_BaconUps_130: `Goldgrubber (G)`,
    BGS_056: `Ripsnarl Captain`,
    TB_BaconUps_139: `Ripsnarl Captain (G)`,
    BGS_080: `Seabreaker Goliath`,
    TB_BaconUps_142: `Seabreaker Goliath (G)`,
    BGS_046: `Nat Pagle, Extreme Angler`,
    TB_BaconUps_132: `Nat Pagle, Extreme Angler (G)`,
    BGS_072: `Cap'n Hoggarr`,
    TB_BaconUps_133: `Cap'n Hoggarr (G)`,
    BGS_047: `Dread Admiral Eliza`,
    TB_BaconUps_134: `Dread Admiral Eliza (G)`,
    BGS_079: `The Tide Razor`,
    TB_BaconUps_137: `The Tide Razor (G)`,

    TB_BaconUps_148: `Vulgar Homunculus`,
    TB_BaconUps_149: `Vulgar Homunculus`,
    TB_BaconUps_150: `Yo-Ho-Ogre`,
    TB_BaconUps_151: `Cave Hydra`,
    TB_BaconUps_152: `Toxfin`,
    TB_BaconUps_153: `Foe Reaper 4000`,
    TB_BaconUps_154: `Nadina the Red`,
    TB_BaconUps_155: `Maexxna`,

    notice: `Notice`,
    search: `Search`,
    send_data: `Send Data`,
    notyet: `Coming soon ...`,
    upload: `Upload`,
    manual: `Manual`,
    menuHome: `Home`,
    menuNotice: `Notice`,
    menuStatic: `Statistics`,
    menuRaceChart: `Comp`,
    menuManual: `Manual`,
    checkNotice: `Check Notice. Please.`,
    noticeUpdate: `This data is from ~ 03.19.`,
    date: `Date`,
    pageTitle: `Battleground Lab`,
    player: `Creator`,
    dateStart: `Start`,
    dateEnd: `End`,
    select: `Select`,
    bad_count: `Defeat`,

    noticeList: [
      {
        header: `# Coming soon`,
        content: `There will be an ui update soon.

        The main business is urgent and the update is being delayed.
        
        We are planning to finish the work until October.`,
        date: `2020.07.15`,
        desc: `We are sorry for the inconvenience.`
      },
      {
        header: `# About errors`,
        content: `Users are annoyed when trying to fix plugins to fix bugs.
        
        I am switching to a way to simplify the log and send it to the server to analyze the log.`,
        date: `2020.04.04`,
        desc: `We are sorry for the inconvenience.`
      },
      {
        header: `# Developing a site`,
        content: `1. For statistics, <b><a href="https://hsreplay.net/battlegrounds/heroes/" target="_blank">hsreplay</a></b> is much better.
        
        2. Developers should now get a job, so there are no updates for a while. Of course, when the battleground is updated, the related information will be updated.
        
        3. It almost became a website that I only use, DC Stone Miner Galleries who gave feedback and used. you are a life saver.`,
        date: `2020.04.02`,
        desc: `Your interest is a great help to me. Thank you.`
      },
      {
        header: `# About errors`,
        content: `1. Deck trackers are not reading information when you activate Millhouse Manastorm's Hero abilities.

        2. The following kind of golden card is not being read.
        (Bronze Warden, Dragonspawn Lieutenant, Nadina the Red, Holy Mackerel, Foe Reaper 4000, Vulgar Homunculus, Cave Hydra, Toxfin, Righteous Protector, Maexxna)
        Registration is not possible because the card ID does not appear in the API.`,
        date: `2020.04.02`,
        desc: ``
      },
      {
        header: `# Deck Tracker Battleground Log Page Development`,
        content: `1. Install <b><a href="https://hsdecktracker.net/download/" target="_blank">[HDT]</a></b>
        
        2. Install <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[Plugin]</a></b>

        3. Play Hearthstone

        4. Search ID on page
        
        If you want to feedback,
        please send an email to <i>(shyuniz@naver.com)</i>.`,
        date: `2020.03.23`,
        desc: `p.s: Ads will be posted to maintain the server.`
      },
      {
        header: `# Deck Tracker Battleground Plugin Development State 2`,
        content: `The plugin has been developed.

        You can download it <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[here]</a></b>.

        The site is still under development. We are preparing to provide personal battleground statistics when installing the plugin.`,
        date: `2020.03.19`,
        desc: `Your interest is a great help to me. Thank you.`
      },
      {
        header: `# Deck Tracker Battleground Plugin Development State 1`,
        content: `It is being developed to manage records only by installing HDT plugin.
        
        The plugin is nearing completion and we will be developing the server soon.
        
        Development is expected to be completed within March, and domains may change when servers are developed.`,
        date: `2020.03.16`,
        desc: `Your interest is a great help to me. Thank you.`
      },
      {
        header: `## About Data ##`,
        date: `2020.03.04`,
        content: `<b><a href="https://shyuni4u.github.io/BattlegroundLab/dist" target="_blank">[Prev page]</a></b>
        There is no record API. I am counting by hand.

        If you want to add data,
        please send an email to <i>(shyuniz@naver.com)</i> in the <b><a href="https://docs.google.com/spreadsheets/d/13ZwYlseXl82gXaEXvbvFe0QmtV2gBJB4-m8Hn40Cd-Y/edit#gid=13835457" target="_blank">[Form]</a></b>.
    
        The DB is not available due to the charge issue. I will improve it later.
    
        Thank you.`,
        desc: `Thank you for your feedback.`
      }
    ]
  },
  kr: {
    version: `버전`,
    millhouse_warning: `현재 밀하우스 마나스톰이 덱트래커 이상으로 비정상적으로 집계되고 있습니다.`,
    hello: `안녕하세요 !!`,
    lang: `Language`,
    player_name: `플레이어 이름`,
    hero_avg_top: `영웅 평균 순위`,
    minion_used_top: `하수인 사용 순위`,
    avg: `평균`,
    placement: `순위`,
    mmr: `MMR`,
    crown: `1등`,
    win: `승리`,
    defeat: `패배`,
    more: `더 보기`,
    detail: `상세히`,
    used_count: `사용`,
    back: `뒤로`,
    total: `전체`,
    copy_clipboard: `클립보드에 링크 복사`,
    last_month: `최근 1달`,
    last_week: `최근 7일`,
    today: `오늘`,

    race: `종족`,
    race_chart: `종족 그래프`,
    mech: `기계`,
    dragon: `용족`,
    demon: `악마`,
    beast: `야수`,
    murloc: `멀록`,
    pirate: `해적`,
    menagerie: `혼합`,
    neutral: `중립`,

    buy: `구매`,
    sell: `판매`,
    deck: `사용`,
    freeze: `빙결`,
    thaw: `해동`,
    TB_BaconShopLockAll_Button: `빙결`,
    lvlup: `레벨업`,
    power: `영능`,

    do_not_open: `365일동안 열지 않기`,
    hero_caption: `영웅 통계`,
    hero_text: ``,

    minion_caption: `하수인 통계`,
    minion_text: ``,

    game_caption: `게임 기록`,
    game_text: ``,

    player_caption: `전장 통계 검색`,
    player_text: ``,

    manual_1: `1. <b><a href="https://hsreplay.net/battlegrounds/heroes/" target="_blank">[덱트래커]</a></b> 설치`,
    manual_2: `2. <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[플러그인]</a></b> 다운로드`,
    manual_3: `3. <b>덱트래커 - 환경설정 - 플러그인 - [플러그인 폴더] 클릭</b>`,
    manual_4: `4. <b>폴더에 다운받은 플러그인 넣기</b>`,
    manual_5: `5. <b>덱트래커 재실행 후 플러그인 활성화</b>`,
    manual_6: `6. <b>하스스톤 실행</b>`,

    hero: `영웅`,
    minion: `하수인`,
    comp: `조합`,
    pick_count: `플레이 수`,
    pick_ratio: `픽률`,
    avg_placement: `평균등수`,
    crown_count: `1등`,
    crown_ratio: `1등 확률`,
    win_count: `순방`,
    win_ratio: `순방 확률`,
    HeroPower: `영웅 능력`,

    //  ETC
    TB_BaconShop_Triples_01: `발견 보상`,
    TB_BaconShopTechUp02_Button: `레벨업: 1`,
    TB_BaconShopTechUp03_Button: `레벨업: 2`,
    TB_BaconShopTechUp04_Button: `레벨업: 3`,
    TB_BaconShopTechUp05_Button: `레벨업: 4`,
    TB_BaconShopTechUp06_Button: `레벨업: 5`,
    TB_BaconShopTechUp07_Button: `레벨업: 6`,

    //  HERO
    TB_BaconShop_HERO_KelThuzad: `켈투자드`,
    TB_BaconShop_HERO_08: `일리단 스톰레이지`,
    TB_BaconShop_HERO_16: `A. F. 케이`,
    TB_BaconShop_HERO_56: `알렉스트라자`,
    TB_BaconShop_HERO_45: `대악당 라팜`,
    TB_BaconShop_HERO_PH: `BaconPHhero`,
    TB_BaconShop_HERO_31: `바텐더`,
    TB_BaconShop_HERO_36: `춤추는 다릴`,
    TB_BaconShop_HERO_52: `데스윙`,
    TB_BaconShop_HERO_43: `브란 브론즈비어드`,
    TB_BaconShop_HERO_01: `에드윈 벤클리프`,
    TB_BaconShop_HERO_42: `엘리스 스타시커`,
    TB_BaconShop_HERO_55: `곰팡이술사 플러글`,
    TB_BaconShop_HERO_02: `갈라크론드`,
    TB_BaconShop_HERO_15: `타락한 죠지`,
    TB_BaconShop_HERO_19: `Giantfin`,
    TB_BaconShop_HERO_28: `무한의 토키`,
    TB_BaconShop_HERO_38: `밀림의 왕 무클라`,
    TB_BaconShop_HERO_25: `리치 바즈하이알`,
    TB_BaconShop_HERO_37: `군주 자락서스`,
    TB_BaconShop_HERO_58: `말리고스`,
    TB_BaconShop_HERO_49: `밀하우스 마나스톰`,
    TB_BaconShop_HERO_17: `밀리피센트 마나스톰`,
    TB_BaconShop_HERO_30: `네파리안`,
    TB_BaconShop_HERO_57: `노즈도르무`,
    TB_BaconShop_HERO_18: `해적 패치스`,
    TB_BaconShop_HERO_34: `패치워크`,
    TB_BaconShop_HERO_20: `교수 퓨트리사이드`,
    TB_BaconShop_HERO_39: `피라마드`,
    TB_BaconShop_HERO_14: `여왕 왜그토글`,
    TB_BaconShop_HERO_11: `라그나로스`,
    TB_BaconShop_HERO_41: `리노 잭슨`,
    TB_BaconShop_HERO_23: `두억시니`,
    TB_BaconShop_HERO_27: `신드라고사`,
    TB_BaconShop_HERO_40: `핀리 므르글턴 경`,
    TB_BaconShop_HERO_44: `실바나스 윈드러너`,
    TB_BaconShop_HERO_33: `전시관리인`,
    TB_BaconShop_HERO_21: `위대한 아카잠자락`,
    TB_BaconShop_HERO_22: `리치킹`,
    TB_BaconShop_HERO_12: `왕쥐`,
    TB_BaconShop_HERO_47: `티리온 폴드링`,
    TB_BaconShop_HERO_10: `무역왕 갤리윅스`,
    TB_BaconShop_HERO_35: `희망의 끝, 요그사론`,
    TB_BaconShop_HERO_53: `이세라`,
    TB_BaconShop_HERO_60: `켈타스 선스트라이더`,
    TB_BaconShop_HERO_61: `여군주 바쉬`,
    TB_BaconShop_HERO_62: `마이에브 섀도송`,
    TB_BaconShop_HERO_64: `선장 유도라`,
    TB_BaconShop_HERO_67: `선장 후크터스크`,
    TB_BaconShop_HERO_68: `하늘선장 크라그`,
    TB_BaconShop_HERO_59: `아라나 스타시커`,
    TB_BaconShop_HERO_50: `테스 그레이메인`,
    TB_BaconShop_HERO_70: `비글스워스 씨`,
    TB_BaconShop_HERO_71: `잔다이스 바로브`,
    TB_BaconShop_HERO_72: `군주 바로브`,
    TB_BaconShop_HERO_74: `숲의 감시관 오무`,

    //  Power
    TB_BaconShop_HP_057: `모험!`,
    TB_BaconShop_HP_035: `더 놀아줘!`,
    TB_BaconShop_HP_061: `모두 불타리라!`,
    TB_BaconShop_HP_052: `비전 변형`,
    TB_BaconShop_HP_050: `밴시의 축복`,
    TB_BaconShop_HP_048: `전투의 낙인`,
    TB_BaconShop_HP_036: `피의 격노`,
    TB_BaconShop_HP_010: `빛의 은혜`,
    TB_BaconShop_HP_040: `벽돌 쌓기`,
    TB_BaconShop_HP_022: `부스락`,
    TB_BaconShop_HP_063: `계시`,
    TB_BaconShop_HP_019: `죽어라, 벌레 같은 놈들!`,
    TB_BaconShop_HP_062: `꿈 차원문`,
    TB_BaconShop_HP_027: `대포 발사!`,
    TB_BaconShop_HP_011: `갈라크론드의 탐욕`,
    TB_BaconShop_HP_056: `월척`,
    TB_BaconShop_HP_046: `부자가 될 거야!`,
    TB_BaconShop_HP_049: `피에서 금을`,
    TB_BaconShop_HP_042: `모자 마술`,
    TB_BaconShop_HP_051: `명예로운 전투원들`,
    TB_BaconShop_HP_053: `내가 가져야겠어!`,
    TB_BaconShop_HP_041a: `백수의 왕`,
    TB_BaconShop_HP_041d: `악마의 왕`,
    TB_BaconShop_HP_041f: `용의 왕`,
    TB_BaconShop_HP_041b: `기계의 왕`,
    TB_BaconShop_HP_041c: `멀록의 왕`,
    TB_BaconShop_HP_047: `선임 탐험가`,
    TB_BaconShop_HP_054: `폭풍마나`,
    TB_BaconShop_HP_033: `박물관지기`,
    TB_BaconShop_HP_017: `멀록왕`,
    TB_BaconShop_HP_043: `네파리안의 화염`,
    TB_BaconShop_HP_020: `위대한 마술`,
    TB_BaconShop_HP_044: `밍기적`,
    TB_BaconShop_HP_039: `수수께기 상자`,
    TB_BaconShop_HP_064: `용의 여왕`,
    TB_BaconShop_HP_018: `분노의 물약`,
    TB_BaconShop_HP_024: `환생 의식`,
    TB_BaconShop_HP_001: `무기 연마`,
    TB_BaconShop_HP_009: `능숙한 바텐더`,
    TB_BaconShop_HP_008: `투자 활동`,
    TB_BaconShop_HP_014: `싸늘하게`,
    TB_BaconShop_HP_028: `시간의 선술집`,
    TB_BaconShop_HP_015: `땜짱이`,
    TB_BaconShop_HP_037a: `밀랍 부대`,
    TB_BaconShop_HP_069: `급습`,
    TB_BaconShop_HP_068: `감금`,
    TB_BaconShop_HP_067: `진화하는 전류`,
    TB_BaconShop_HP_066: `신록의 구슬`,
    TB_BaconShop_HP_074: `파묻힌 보물`,
    TB_BaconShop_HP_075: `쓰레기를 보물로`,
    TB_BaconShop_HP_076: `돼지 저금통`,
    TB_BaconShop_HP_077: `밥의 뒷거래`,
    TB_BaconShop_HP_038: `바나나광`,
    TB_BaconShop_HP_080: `켈투자드의 고양이`,
    TB_BaconShop_HP_084: `바꿔치고 사기치고`,
    TB_BaconShop_HP_081: `친근한 내기`,
    TB_BaconShop_HP_082: `상록`,

    //  Minion
    BGS_010: `아나이힐란 전투모병관`,
    BGS_034: `청동 감시자`,
    BGS_039: `용혈족 부관`,
    BGS_067: `용기병 집행자`,
    BGS_031: `온순한 메가사우루스`,
    BGS_008: `섬뜩한 방울뱀`,
    BGS_045: `문양 수호자`,
    BGS_018: `위대한 늑대 골드린`,
    BGS_033: `게걸스러운 폭룡`,
    BGS_032: `화염의 전령`,
    BGS_068: `천상의 멀록`,
    BGS_044: `어미 임프`,
    BGS_014: `악마 간수`,
    BGS_041: `비전의 위상 칼렉고스`,
    BGS_012: `칸고르의 수습생`,
    BGS_030: `왕 므라올옳`,
    BGS_009: `빛송곳니 집행자`,
    BGS_021: `엄마 곰`,
    BGS_059: `악령술의 대가`,
    BGS_027: `초소형 기계`,
    BGS_025: `랩터 탈것`,
    BGS_043: `무르도즈노`,
    BGS_040: `홍련의 나디나`,
    BGS_001: `나스레짐 감독관`,
    BGS_017: `무리의 지도자`,
    BGS_023: `누군가 조종하는 벌목기`,
    BGS_024: `하늘 골렘`,
    BGS_028: `토깽이 콩콩`,
    BGS_020: `원시지느러미 망꾼`,
    BGS_036: `폭군 서슬송곳니`,
    BGS_019: `새끼 붉은용`,
    BGS_029: `변신수 제루스`,
    BGS_006: `스니드의 낡은 벌목기`,
    BGS_002: `영혼 곡예사`,
    BGS_037: `시간의 청지기`,
    BGS_038: `황혼의 사절`,
    BGS_035: `밀랍기수 토그왜글`,
    BGS_004: `분노의 명인`,
    BGS_022: `잽 슬라이윅`,
    BGS_071: `반사로봇`,
    BGS_075: `광적인 사우로리스크`,
    DS1_070: `사냥개조련사`,
    KAR_005: `인자한 할머니`,
    KAR_095: `동물원로봇`,
    KAR_702: `박물관 마술사`,
    LOOT_013: `야비한 소악마`,
    LOOT_078: `동굴 히드라`,
    LOOT_368: `공허군주`,
    BOT_218: `순찰용 부릉이`,
    BOT_312: `증식하는 위협`,
    BOT_445: `캥거루로봇`,
    BOT_537: `기계 알`,
    BOT_606: `콰광로봇`,
    BOT_911: `안녕모듈`,
    GVG_021: `말가니스`,
    GVG_027: `강철 사부`,
    GVG_048: `강철니 표범로봇`,
    GVG_055: `깡통나사 고물로봇`,
    GVG_062: `코발트 수호자`,
    GVG_100: `떠 다니는 감시자`,
    GVG_113: `전투 절단기 4000`,
    EX1_014t: `바나나`,
    EX1_062: `늙은 거먹눈 멀록`,
    EX1_093: `아르거스의 수호자`,
    EX1_103: `시린빛 예언자`,
    EX1_162: `광포한 늑대 우두머리`,
    EX1_185: `공성파괴자`,
    EX1_506: `멀록 바다사냥꾼`,
    EX1_506a: `멀록 정찰병`,
    EX1_507: `멀록 전투대장`,
    EX1_509: `멀록 파도술사`,
    EX1_531: `청소부 하이에나`,
    EX1_534: `사바나 사자`,
    EX1_556: `허수아비 골렘`,
    EX1_577: `괴수`,
    CFM_315: `길고양이`,
    CFM_316: `쥐 떼`,
    CFM_610: `수정술사`,
    CFM_816: `토깽 사부`,
    CFM_315t: `얼룩고양이`,
    DAL_077: `독성지느러미 멀록`,
    AT_121: `마상시합 유명인`,
    ICC_029: `푸른비늘혈족 맹독전사`,
    UNG_073: `바위웅덩이 사냥꾼`,
    OG_221: `헌신적인 영웅`,
    OG_256: `느조스의 피조물`,
    ICC_858: `불꽃피 볼바르`,
    TB_BaconShop_HP_033t: `융합체`,
    BRM_006: `임프 두목`,
    YOD_026: `악독한 시종`,
    ICC_038: `정의로운 수호자`,
    FP1_024: `불안정한 구울`,
    OG_216: `감염된 늑대`,

    LOE_077: `브란 브론즈비어드`,
    ICC_807: `튼튼껍질 청소부`,
    FP1_031: `남작 리븐데어`,
    TRL_232: `무쇠가죽 공포뿔`,
    GVG_106: `고철로봇`,
    TB_BaconShop_HP_047t: `탐험대 지원서`,
    FP1_010: `맥스나`,
    DAL_575: `카드가`,
    BT_010: `지옥지느러미 길잡이`,
    BGS_069: `흉합체`,
    TB_BaconUps_121: `흉합체 (G)`,
    BGS_083: `박물관 주전자`,
    TB_BaconUps_145: `박물관 주전자 (G)`,
    BGS_082: `박물관 컵`,
    TB_BaconUps_144: `박물관 컵 (G)`,
    ULD_217: `초소형 미라`,
    TB_BaconUps_250: `초소형 미라 (G)`,

    //  Gold Minion
    TB_BaconUps_093: `길고양이 (G)`,
    TB_BaconUps_083: `아나이힐란 전투모병관 (G)`,
    TB_BaconUps_099: `안녕모듈 (G)`,
    TB_BaconUps_055: `남작 리븐데어 (G)`,
    TB_BaconUps_004t: `Big Bad Wolf (G)`,
    TB_BaconUps_047: `불꽃피 볼바르 (G)`,
    TB_BaconUps_045: `브란 브론즈비어드 (G)`,
    TB_BaconUps_120: `푸른비늘혈족 맹독전사 (G)`,
    TB_BaconUps_064: `시린빛 예언자 (G)`,
    TB_BaconUps_037: `마상시합 유명인 (G)`,
    TB_BaconUps_070: `수정술사 (G)`,
    TB_BaconUps_006t: `손상된 골렘 (G)`,
    TB_BaconUps_009: `아르거스의 수호자 (G)`,
    TB_BaconUps_088: `광포한 늑대 우두머리 (G)`,
    TB_BaconUps_117: `용기병 집행자 (G)`,
    TB_BaconUps_033: `Festeroot Hulk (G)`,
    TB_BaconUps_112: `악독한 시종 (G)`,
    TB_BaconUps_101: `떠 다니는 감시자 (G)`,
    TB_BaconUps_084: `온순한 메가사우루스 (G)`,
    TB_BaconUps_057: `섬뜩한 방울뱀 (G)`,
    TB_BaconUps_115: `문양 수호자 (G)`,
    TB_BaconUps_085: `위대한 늑대 골드린 (G)`,
    TB_BaconUps_041t: `Guard Bot (G)`,
    TB_BaconUps_104: `게걸스러운 폭룡 (G)`,
    TB_BaconUps_006: `허수아비골렘 (G)`,
    TB_BaconUps_103: `화염의 전령 (G)`,
    TB_BaconUps_068: `사냥개조련사 (G)`,
    TB_BaconUps_049t: `하이에나 (G)`,
    TB_BaconUps_030t: `임브 (G)`,
    TB_BaconUps_030: `임프 두목 (G)`,
    TB_BaconUps_116: `어미 임프 (G)`,
    TB_BaconUps_113: `악마 간수 (G)`,
    TB_BaconUps_026: `감염된 늑대 (G)`,
    TB_BaconUps_044: `강철 사부 (G)`,
    TB_BaconUps_051: `무쇠가죽 공포뿔 (G)`,
    TB_BaconUps_051t: `Ironhide Runt (G)`,
    TB_BaconUps_002t: `Jo-E Bot (G)`,
    TB_BaconUps_046: `고철로봇 (G)`,
    TB_BaconUps_028: `콰광로봇 (G)`,
    TB_BaconUps_109: `비전의 위상 칼렉고스 (G)`,
    TB_BaconUps_087: `칸고르의 수습생 (G)`,
    TB_BaconUps_034: `카드가 (G)`,
    TB_BaconUps_004: `인자한 할머니 (G)`,
    TB_BaconUps_100: `왕 므라올옳 (G)`,
    TB_BaconUps_082: `빛송곳니 집행자 (G)`,
    TB_BaconUps_060: `말가니스 (G)`,
    TB_BaconUps_090: `엄마 곰 (G)`,
    TB_BaconUps_119: `Master Demonologist (G)`,
    TB_BaconUps_039: `기계 알 (G)`,
    TB_BaconUps_002: `캥거루로봇 (G)`,
    TB_BaconUps_073: `박물관 마술사 (G)`,
    TB_BaconUps_066: `강철니 표범로봇 (G)`,
    TB_BaconUps_094: `초소형 기계 (G)`,
    TB_BaconUps_032t: `Microbot (G)`,
    TB_BaconUps_019: `랩터 탈것 (G)`,
    TB_BaconUps_003t: `멀록 정찰병 (G)`,
    TB_BaconUps_011: `멀록 파도술사 (G)`,
    TB_BaconUps_003: `멀록 바다사냥꾼 (G)`,
    TB_BaconUps_008: `멀록 전투대장 (G)`,
    TB_BaconUps_110: `무르도즈노 (G)`,
    TB_BaconUps_062: `나스레짐 감독관 (G)`,
    TB_BaconUps_036: `늙은 거먹눈 멀록 (G)`,
    TB_BaconUps_086: `무리의 지도자 (G)`,
    TB_BaconUps_038: `Phalanx Commander (G)`,
    TB_BaconUps_035: `누군가 조종하는 벌목기 (G)`,
    TB_BaconUps_050: `누군가 조종하는 하늘골렘 (G)`,
    TB_BaconUps_077: `토깽이 콩콩 (G)`,
    TB_BaconUps_052t: `Primalfin (G)`,
    TB_BaconUps_089: `원시지느러미 망꾼 (G)`,
    TB_BaconUps_027t: `쥐 (G)`,
    TB_BaconUps_027: `쥐 떼 (G)`,
    TB_BaconUps_106: `폭군 서슬송곳니 (G)`,
    TB_BaconUps_102: `새끼 붉은용 (G)`,
    TB_BaconUps_032: `증식하는 위협 (G)`,
    TB_BaconUps_039t: `Robosaur (G)`,
    TB_BaconUps_061: `바위웅덩이 사냥꾼 (G)`,
    TB_BaconUps_040: `Safeguard (G)`,
    TB_BaconUps_052: `Sated Threshadon (G)`,
    TB_BaconUps_049: `사바나 사자 (G)`,
    TB_BaconUps_043: `청소부 하이에나 (G)`,
    TB_BaconUps_069: `깡통나사 고물로봇 (G)`,
    TB_BaconUps_041: `순찰용 부릉이 (G)`,
    TB_BaconUps_014: `헌신적인 영웅 (G)`,
    TB_BaconUps_095: `변신수 제루스 (G)`,
    TB_BaconUps_053: `공성파괴자 (G)`,
    TB_BaconUps_080: `스니드의 낡은 벌목기 (G)`,
    TB_BaconUps_075: `영혼 곡예사 (G)`,
    TB_BaconUps_025: `느조스의 피조물 (G)`,
    TB_BaconUps_026t: `Spider (G)`,
    TB_BaconUps_107: `시간의 청지기 (G)`,
    TB_BaconUps_072: `튼튼껍질 청소부 (G)`,
    TB_BaconUps_093t: `얼룩고양이 (G)`,
    TB_BaconUps_042: `괴수 (G)`,
    TB_BaconUps_058: `The Boogeymonster (G)`,
    TB_BaconUps_031: `Tortollan Shellraiser (G)`,
    TB_BaconUps_108: `황혼의 사절 (G)`,
    TB_BaconUps_118: `불안정한 구울 (G)`,
    TB_BaconUps_040t: `Vault Safe (G)`,
    TB_BaconUps_074: `토깽 사부 (G)`,
    TB_BaconUps_059: `공허군주 (G)`,
    TB_BaconUps_059t: `공허방랑자 (G)`,
    TB_BaconUps_105: `밀랍기수 토그왜글 (G)`,
    TB_BaconUps_079: `분노의 명인 (G)`,
    TB_BaconUps_091: `잽 슬라이윅 (G)`,
    TB_BaconUps_063: `동물원로봇 (G)`,
    TB_BaconUps_123: `반사로봇 (G)`,
    TB_BaconUps_124: `지옥지느러미 길잡이 (G)`,
    TB_BaconUps_125: `광적인 사우로리스크 (G)`,

    //pirate
    BGS_055: `갑판 청소부`,
    TB_BaconUps_126: `갑판 청소부 (G)`,
    BGS_061: `뱃사람`,
    TB_BaconUps_141: `뱃사람 (G)`,
    NEW1_027: `남쪽바다 선장`,
    TB_BaconUps_136: `남쪽바다 선장 (G)`,
    BGS_077: `비전 대포`,
    TB_BaconUps_128: `비전 대포 (G)`,
    BGS_078: `괴물 앵무`,
    TB_BaconUps_135: `괴물 앵무 (G)`,
    BGS_049: `선상 도박꾼`,
    TB_BaconUps_127: `선상 도박꾼 (G)`,
    BGS_060: `요호우거`,
    BGS_081: `바다의 노략꾼`,
    TB_BaconUps_143: `바다의 노략꾼 (G)`,
    BGS_053: `붉은해적단 포병`,
    TB_BaconUps_138: `붉은해적단 포병 (G)`,
    BGS_048: `남쪽바다 폭력배`,
    TB_BaconUps_140: `남쪽바다 폭력배 (G)`,
    BGS_066: `황금 애호가`,
    TB_BaconUps_130: `황금 애호가 (G)`,
    BGS_056: `선장 으르렁니`,
    TB_BaconUps_139: `선장 으르렁니 (G)`,
    BGS_080: `바다파괴자 거한`,
    TB_BaconUps_142: `바다파괴자 거한 (G)`,
    BGS_046: `최강태공 내트 페이글`,
    TB_BaconUps_132: `최강태공 내트 페이글 (G)`,
    BGS_072: `선장 들창코`,
    TB_BaconUps_133: `선장 들창코 (G)`,
    BGS_047: `공포의 제독 엘리자`,
    TB_BaconUps_134: `공포의 제독 엘리자 (G)`,
    BGS_079: `칼날해일호`,
    TB_BaconUps_137: `칼날해일호 (G)`,
    
    TB_BaconUps_148: `야비한 소악마`,
    TB_BaconUps_149: `야비한 소악마`,
    TB_BaconUps_150: `요호우거`,
    TB_BaconUps_151: `동굴 히드라`,
    TB_BaconUps_152: `독성지느러미 멀록`,
    TB_BaconUps_153: `전투 절단기 4000`,
    TB_BaconUps_154: `홍련의 나디나`,
    TB_BaconUps_155: `맥스나`,

    notice: `공지`,
    search: `검색`,
    notyet: `개발 진행중입니다.`,
    upload: `업로드`,
    manual: `사용법`,
    menuHome: `홈`,
    menuNotice: `공지`,
    menuStatic: `통계`,
    menuRaceChart: `덱 차트`,
    menuManual: `사용법`,
    checkNotice: `공지 확인해주세요.`,
    noticeUpdate: `~ 03.19까지의 데이터입니다.`,
    date: `기간`,
    pageTitle: `전장 연구소`,
    player: `스트리머`,
    dateStart: `시작`,
    dateEnd: `종료`,
    select: `선택`,
    bad_count: `패배`,

    noticeList: [
      {
        header: `# 곧 UI 업데이트가 있을 예정입니다.`,
        content: `여러분 덕분에 취업을 하여 안정적인 서버비를 유지할 수 있게 되었습니다.

        하지만 9월까지 마감인 일이 있어서 업데이트가 늦어지고 있습니다.

        디자인적인 감각이 부족하기도 하구요.ㅠㅠ
        
        10월 전까지는 작업을 끝마칠 예정입니다.`,
        date: `2020.07.15`,
        desc: ``
      },
      {
        header: `# 플러그인 v1.1.0`,
        content: `플러그인을 새로 받으시면 이용 가능합니다.

        플러그인을 다시 다운 받지 않도록 전체 로그를 서버에 올리도록 수정했습니다.
        
        게임 기록에 공격력과 체력 표시가 추가되었습니다.
        
        게임 기록에 밥의 목록, 나의 행동, 상대방 하수인 목록이 추가되었습니다.
        
        게임 전체 로그를 분석하는 것이기 때문에 로그가 잘못 올라오면 반영할 수가 없습니다.
        
        게임 기록이 잘못 표시되는 경우 버그입니다. 제보해주시면 수정하겠습니다.`,
        date: `2020.04.07`,
        desc: ``
      },
      {
        header: `# 오류에 관하여 2`,
        content: `버그 수정을 위해 플러그인 수정을 하다보면 사용자가 귀찮아집니다.
        로그를 간략화하여 서버에 보내고 서버에서 로그를 분석하는 방법으로 전환중입니다.`,
        date: `2020.04.04`,
        desc: `이용에 불편을 드려서 죄송합니다.`
      },
      {
        header: `# 사이트를 개발하며`,
        content: `1. 통계는 <b><a href="https://hsreplay.net/battlegrounds/heroes/" target="_blank">hsreplay</a></b>이 훨씬 좋습니다.
        
        2. 개발자가 이제 직업을 구해야해서 한동안 업데이트가 없습니다. 물론, 전장 업데이트되면 관련사항은 업데이트 할 것입니다.
        
        3. 나만 쓰는 홈페이지가 될 뻔했는데 피드백도 주고 사용해준 돌 마이너 갤러리님들 감사합니다.`,
        date: `2020.04.02`,
        desc: `여러분의 관심은 저에게 큰 힘이 됩니다. 감사합니다.`
      },
      {
        header: `# 오류에 관하여`,
        content: `1. 밀하우스 마나스톰의 영웅능력 발동할 경우 덱트래커에서 정보를 못 읽고 있습니다.

        2. 다음 종류의 황금 카드를 읽지 못하고 있습니다.
        (청동 감시자, 용혈족 부관, 홍련의 나디나, 천상의 멀록, 전투 절단기 4000, 야비한 소악마, 동굴 히드라, 독성지느러미 멀록, 정의로운 수호자, 맥스나)
        카드ID가 API에서 안 나오기 때문에 등록이 안되고 있습니다.`,
        date: `2020.04.02`,
        desc: ``
      },
      {
        header: `# 덱트래커 전장 로그 사이트 개발`,
        content: `1. <b><a href="https://hsreplay.net/battlegrounds/heroes/" target="_blank">[덱트래커]</a></b> 설치
        
        2. <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[플러그인]</a></b> 설치

        3. 하스스톤 실행

        4. 페이지에서 아이디 검색
        
        피드백이나 의견은 메일로 받습니다.`,
        date: `2020.03.23`,
        desc: `p.s: 서버유지를 위해 광고가 붙을 예정입니다.`
      },
      {
        header: `# 덱트래커 전장 로그 플러그인 개발 현황 2`,
        content: `플러그인이 개발 완료되었습니다.

        <b><a href="https://github.com/shyuni4u/hdt-battleground-log-plugin/releases" target="_blank">[여기]</a></b>에서 다운받을 수 있습니다.

        사이트는 아직 개발중입니다. 플러그인을 설치시 개인 전장 통계를 제공할 수 있도록 준비중입니다.`,
        date: `2020.03.19`,
        desc: `여러분의 관심은 저에게 큰 힘이 됩니다. 감사합니다.`
      },
      {
        header: `# 덱트래커 전장 로그 플러그인 개발 현황 1`,
        content: `플러그인만 설치하면 기록을 관리할 수 있도록 개발 중입니다.
        
        플러그인은 거의 완성단계에 있으며 곧 서버를 개발 할 예정입니다.

        3월 이내에 개발이 완료될 예정이며 서버가 개발되면 도메인이 바뀔 수 있습니다.`,
        date: `2020.03.16`,
        desc: `여러분의 관심은 저에게 큰 힘이 됩니다. 감사합니다.`
      },
      {
        header: `# DATA에 관하여`,
        content: `<b><a href="https://shyuni4u.github.io/BattlegroundLab/dist" target="_blank">[이전 페이지]</a></b>
        아직 쓸만한 전장 API가 없기 때문에 수작업으로 데이터를 수집하고 있습니다.
        
        데이터 추가를 원하시면 <b><a href="https://docs.google.com/spreadsheets/d/13ZwYlseXl82gXaEXvbvFe0QmtV2gBJB4-m8Hn40Cd-Y/edit#gid=13835457" target="_blank">[양식]</a></b>대로 메일(<i>shyuniz@naver.com</i>)로 보내주시기 바랍니다.
    
        요금 문제로 인하여 DB를 사용 못하고 있습니다. 차후 개선해나가겠습니다.`,
        date: `2020.03.04`,
        desc: `피드백 또한 메일로 보내주시면 감사합니다.`
      }
    ]
  }
};

export default new VueI18n({
  locale: `kr`, // set locale
  fallbackLocale: `en`, // set fallback locale
  messages // set locale messages
});
