var config = {
    levels: [
        //TODO: needs to take this into account- http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/18342
        { max_hp: 15,  max_mp: 0,   strength: 4,   agility: 4,   required_exp: 0 },
        { max_hp: 22,  max_mp: 0,   strength: 5,   agility: 4,   required_exp: 7 },
        { max_hp: 24,  max_mp: 5,   strength: 7,   agility: 6,   required_exp: 23,    spells_learned: ["heal"] },
        { max_hp: 31,  max_mp: 16,  strength: 7,   agility: 8,   required_exp: 47,    spells_learned: ["hurt"] },
        { max_hp: 35,  max_mp: 20,  strength: 12,  agility: 10,  required_exp: 110 },
        { max_hp: 38,  max_mp: 24,  strength: 16,  agility: 10,  required_exp: 220 },
        { max_hp: 40,  max_mp: 26,  strength: 18,  agility: 17,  required_exp: 450,   spells_learned: ["sleep"] },
        { max_hp: 46,  max_mp: 29,  strength: 22,  agility: 20,  required_exp: 800 },
        { max_hp: 50,  max_mp: 36,  strength: 30,  agility: 22,  required_exp: 1300,  spells_learned: ["radiant"] },
        { max_hp: 54,  max_mp: 40,  strength: 35,  agility: 31,  required_exp: 2000,  spells_learned: ["stopspell"] },
        { max_hp: 62,  max_mp: 50,  strength: 40,  agility: 35,  required_exp: 2900 },
        { max_hp: 63,  max_mp: 58,  strength: 48,  agility: 40,  required_exp: 4000,  spells_learned: ["outside"] },
        { max_hp: 70,  max_mp: 64,  strength: 52,  agility: 48,  required_exp: 5500,  spells_learned: ["return"] },
        { max_hp: 78,  max_mp: 70,  strength: 60,  agility: 55,  required_exp: 7500 },
        { max_hp: 86,  max_mp: 72,  strength: 68,  agility: 64,  required_exp: 10000, spells_learned: ["repel"] },
        { max_hp: 92,  max_mp: 95,  strength: 72,  agility: 70,  required_exp: 13000 },
        { max_hp: 100, max_mp: 100, strength: 72,  agility: 78,  required_exp: 16000, spells_learned: ["healmore"] },
        { max_hp: 115, max_mp: 108, strength: 85,  agility: 84,  required_exp: 19000 },
        { max_hp: 130, max_mp: 115, strength: 87,  agility: 86,  required_exp: 22000, spells_learned: ["hurtmore"] },
        { max_hp: 138, max_mp: 128, strength: 92,  agility: 88,  required_exp: 26000 },
        { max_hp: 149, max_mp: 135, strength: 95,  agility: 90,  required_exp: 30000 },
        { max_hp: 158, max_mp: 146, strength: 97,  agility: 90,  required_exp: 34000 },
        { max_hp: 165, max_mp: 153, strength: 99,  agility: 94,  required_exp: 38000 },
        { max_hp: 170, max_mp: 161, strength: 103, agility: 98,  required_exp: 42000 },
        { max_hp: 174, max_mp: 161, strength: 113, agility: 100, required_exp: 46000 },
        { max_hp: 180, max_mp: 168, strength: 117, agility: 105, required_exp: 50000 },
        { max_hp: 189, max_mp: 175, strength: 125, agility: 107, required_exp: 54000 },
        { max_hp: 195, max_mp: 180, strength: 130, agility: 115, required_exp: 58000 },
        { max_hp: 200, max_mp: 190, strength: 135, agility: 120, required_exp: 62000 },
        { max_hp: 210, max_mp: 200, strength: 140, agility: 130, required_exp: 65535 }
    ],
    weapons: {
        none:           { attack: 0,  price: 0 },
        bamboo_pole:    { attack: 2,  price: 10 },
        club:           { attack: 4,  price: 60 },
        copper_sword:   { attack: 10, price: 180 },
        hand_axe:       { attack: 15, price: 560 },
        broad_sword:    { attack: 20, price: 1500 },
        flame_sword:    { attack: 28, price: 9800 },
        erdricks_sword: { attack: 40, price: 0 }
    },
    armors: {
        none:           { defense: 0,  price: 0 },
        clothes:        { defense: 2,  price: 20 },
        leather_armor:  { defense: 4,  price: 70 },
        chain_mail:     { defense: 10, price: 300 },
        half_plate:     { defense: 16, price: 1000 },
        full_plate:     { defense: 24, price: 3000 },
        magic_armor:    { defense: 24, price: 7700 },
        erdricks_armor: { defense: 28, price: 0 }
    },
    shields: {
        none:           { defense: 0,  price: 0 },
        leather_shield: { defense: 4,  price: 90 },
        iron_shield:    { defense: 10, price: 800 },
        silver_shield:  { defense: 20, price: 14800 }
    },
    items: {
    },
    spells: {
        "heal": {
            show_in_combat: true,
            show_in_explore: true,
            cost: 4,
            effect: function() { player.add_hp(random_number(10, 17)); }
        },
        "hurt": {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_current_hp -= random_number(5, 12); }
        },
        "sleep": {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_status = "sleep"; }
        },
        "radiant": {
            show_in_combat: false,
            show_in_explore: true,
            cost: 3,
            effect: function() {
                player.visibility = 3;
                player.radiant_in_effect = true;
                player.radiant_step_counter = 200;
            }
        },
        "stopspell": {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_status = "stopspell"; }
        },
        "outside": {
            show_in_combat: false,
            show_in_explore: true,
            cost: 6,
            effect: function() { }
        },
        "return": {
            show_in_combat: false,
            show_in_explore: true,
            cost: 8,
            effect: function() { }
        },
        "repel": {
            show_in_combat: false,
            show_in_explore: true,
            cost: 2,
            effect: function() { }
        },
        "healmore": {
            show_in_combat: true,
            show_in_explore: true,
            cost: 10,
            effect: function() { player.add_hp(random_number(85, 100)); }
        },
        "hurtmore": {
            show_in_combat: true,
            show_in_explore: false,
            cost: 5,
            effect: function() { combat.enemy_current_hp -= random_number(58, 65); }
        }
    },
    enemies: {
        0: {
            "id": 0,
            "name": "slime",
            "strength": 5,
            "agility": 3,
            "hp": 3,
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 1,
            "gold": 1,
            "x": 248,
            "y": 248,
            "width": 32,
            "height": 32
        },
        1: {
            "id": 1,
            "name": "red_slime",
            "strength": 7,
            "agility": 3,
            "hp": 4,
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 1,
            "gold": 2,
            "x": 312,
            "y": 248,
            "width": 32,
            "height": 32
        },
        2: {
            "id": 2,
            "name": "drakee",
            "strength": 9,
            "agility": 6,
            "hp": [5, 6],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 2,
            "gold": 2,
            "x": 240,
            "y": 0,
            "width": 48,
            "height": 48
        },
        3: {
            "id": 3,
            "name": "ghost",
            "strength": 11,
            "agility": 8,
            "hp": [6, 7],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 4,
            "experience": 3,
            "gold": [3, 4],
            "x": 0,
            "y": 112,
            "width": 48,
            "height": 56
        },
        4: {
            "id": 4,
            "name": "magician",
            "strength": 11,
            "agility": 12,
            "hp": [10, 13],
            "sleep_resist": 0,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 4,
            "gold": [9, 11],
            "x": 0,
            "y": 296,
            "width": 48,
            "height": 48
        },
        5: {
            "id": 5,
            "name": "magidrakee",
            "strength": 14,
            "agility": 14,
            "hp": [12, 15],
            "sleep_resist": 0,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 5,
            "gold": [9, 11],
            "x": 304,
            "y": 0,
            "width": 40,
            "height": 48
        },
        6: {
            "id": 6,
            "name": "scorpion",
            "strength": 18,
            "agility": 16,
            "hp": [16, 20],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 6,
            "gold": [12, 15],
            "x": 240,
            "y": 176,
            "width": 48,
            "height": 48
        },
        7: {
            "id": 7,
            "name": "druin",
            "strength": 20,
            "agility": 18,
            "hp": [17, 22],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 7,
            "gold": [12, 15],
            "x": 240,
            "y": 64,
            "width": 48,
            "height": 32
        },
        8: {
            "id": 8,
            "name": "poltergeist",
            "strength": 18,
            "agility": 20,
            "hp": [18, 23],
            "sleep_resist": 0,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 6,
            "experience": 8,
            "gold": [13, 17],
            "x": 64,
            "y": 112,
            "width": 40,
            "height": 56
        },
        9: {
            "id": 9,
            "name": "droll",
            "strength": 24,
            "agility": 24,
            "hp": [19, 25],
            "sleep_resist": 0,
            "stopspell_resist": 14,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 10,
            "gold": [18, 24],
            "x": 0,
            "y": 56,
            "width": 48,
            "height": 48
        },
        10: {
            "id": 10,
            "name": "drakeema",
            "strength": 22,
            "agility": 26,
            "hp": [16, 20],
            "sleep_resist": 2,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 6,
            "experience": 11,
            "gold": [15, 19],
            "x": 368,
            "y": 0,
            "width": 32,
            "height": 48
        },
        11: {
            "id": 11,
            "name": "skeleton",
            "strength": 28,
            "agility": 22,
            "hp": [23, 30],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 4,
            "experience": 11,
            "gold": [22, 29],
            "x": 0,
            "y": 232,
            "width": 48,
            "height": 56
        },
        12: {
            "id": 12,
            "name": "warlock",
            "strength": 28,
            "agility": 22,
            "hp": [23, 30],
            "sleep_resist": 3,
            "stopspell_resist": 1,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 13,
            "gold": [26, 34],
            "x": 64,
            "y": 296,
            "width": 40,
            "height": 48
        },
        13: {
            "id": 13,
            "name": "metal_scorpion",
            "strength": 36,
            "agility": 42,
            "hp": [17, 22],
            "sleep_resist": 0,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 14,
            "gold": [30, 39],
            "x": 296,
            "y": 176,
            "width": 56,
            "height": 48
        },
        14: {
            "id": 14,
            "name": "wolf",
            "strength": 40,
            "agility": 30,
            "hp": [26, 34],
            "sleep_resist": 1,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 16,
            "gold": [37, 49],
            "x": 240,
            "y": 296,
            "width": 48,
            "height": 48
        },
        15: {
            "id": 15,
            "name": "wraith",
            "strength": 44,
            "agility": 34,
            "hp": [28, 36],
            "sleep_resist": 7,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 4,
            "experience": 17,
            "gold": [45, 59],
            "x": 64,
            "y": 232,
            "width": 40,
            "height": 56
        },
        16: {
            "id": 16,
            "name": "metal_slime",
            "strength": 10,
            "agility": 255,
            "hp": 4,
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 15,
            "dodge": 1,
            "experience": 115,
            "gold": [4, 5],
            "x": 368,
            "y": 248,
            "width": 32,
            "height": 24
        },
        17: {
            "id": 17,
            "name": "specter",
            "strength": 40,
            "agility": 38,
            "hp": [28, 36],
            "sleep_resist": 3,
            "stopspell_resist": 1,
            "hurt_resist": 0,
            "dodge": 4,
            "experience": 18,
            "gold": [52, 69],
            "x": 128,
            "y": 112,
            "width": 32,
            "height": 56
        },
        18: {
            "id": 18,
            "name": "wolflord",
            "strength": 50,
            "agility": 36,
            "hp": [29, 38],
            "sleep_resist": 4,
            "stopspell_resist": 7,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 20,
            "gold": [60, 79],
            "x": 296,
            "y": 296,
            "width": 56,
            "height": 48
        },
        19: {
            "id": 19,
            "name": "druinlord",
            "strength": 47,
            "agility": 40,
            "hp": [27, 35],
            "sleep_resist": 15,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 4,
            "experience": 20,
            "gold": [63, 84],
            "x": 304,
            "y": 64,
            "width": 48,
            "height": 32
        },
        20: {
            "id": 20,
            "name": "drollmagi",
            "strength": 52,
            "agility": 50,
            "hp": [29, 38],
            "sleep_resist": 2,
            "stopspell_resist": 2,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 22,
            "gold": [67, 89],
            "x": 64,
            "y": 56,
            "width": 40,
            "height": 48
        },
        21: {
            "id": 21,
            "name": "wyvern",
            "strength": 56,
            "agility": 48,
            "hp": [32, 42],
            "sleep_resist": 4,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 24,
            "gold": [75, 99],
            "x": 0,
            "y": 352,
            "width": 48,
            "height": 56
        },
        22: {
            "id": 22,
            "name": "rogue_scorpion",
            "strength": 60,
            "agility": 90,
            "hp": [27, 35],
            "sleep_resist": 7,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 26,
            "gold": [82, 109],
            "x": 360,
            "y": 184,
            "width": 46,
            "height": 40
        },
        23: {
            "id": 23,
            "name": "wraith_knight",
            "strength": 68,
            "agility": 56,
            "hp": [35, 46],
            "sleep_resist": 5,
            "stopspell_resist": 0,
            "hurt_resist": 3,
            "dodge": 4,
            "experience": 28,
            "gold": [90, 119],
            "x": 120,
            "y": 232,
            "width": 48,
            "height": 56
        },
        24: {
            "id": 24,
            "name": "golem",
            "strength": 120,
            "agility": 60,
            "hp": [53, 70],
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 15,
            "dodge": 0,
            "experience": 5,
            "gold": [7, 9],
            "x": 296,
            "y": 112,
            "width": 56,
            "height": 56
        },
        25: {
            "id": 25,
            "name": "goldman",
            "strength": 48,
            "agility": 40,
            "hp": [38, 50],
            "sleep_resist": 13,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 6,
            "gold": [150, 199],
            "x": 240,
            "y": 112,
            "width": 48,
            "height": 56
        },
        26: {
            "id": 26,
            "name": "knight",
            "strength": 76,
            "agility": 78,
            "hp": [42, 55],
            "sleep_resist": 6,
            "stopspell_resist": 7,
            "hurt_resist": 0,
            "dodge": 1,
            "experience": 33,
            "gold": [97, 129],
            "x": 0,
            "y": 176,
            "width": 48,
            "height": 56
        },
        27: {
            "id": 27,
            "name": "magiwyvern",
            "strength": 78,
            "agility": 68,
            "hp": [44, 58],
            "sleep_resist": 2,
            "stopspell_resist": 0,
            "hurt_resist": 0,
            "dodge": 2,
            "experience": 34,
            "gold": [105, 139],
            "x": 64,
            "y": 352,
            "width": 40,
            "height": 56
        },
        28: {
            "id": 28,
            "name": "demon_knight",
            "strength": 79,
            "agility": 64,
            "hp": [38, 50],
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 15,
            "dodge": 15,
            "experience": 37,
            "gold": [112, 149],
            "x": 184,
            "y": 232,
            "width": 40,
            "height": 56
        },
        29: {
            "id": 29,
            "name": "werewolf",
            "strength": 86,
            "agility": 70,
            "hp": [46, 60],
            "sleep_resist": 7,
            "stopspell_resist": 15,
            "hurt_resist": 0,
            "dodge": 7,
            "experience": 40,
            "gold": [116, 154],
            "x": 360,
            "y": 296,
            "width": 46,
            "height": 48
        },
        30: {
            "id": 30,
            "name": "green_dragon",
            "strength": 88,
            "agility": 74,
            "hp": [49, 65],
            "sleep_resist": 7,
            "stopspell_resist": 15,
            "hurt_resist": 2,
            "dodge": 2,
            "experience": 45,
            "gold": [120, 159],
            "x": 0,
            "y": 0,
            "width": 48,
            "height": 48
        },
        31: {
            "id": 31,
            "name": "starwyvern",
            "strength": 86,
            "agility": 80,
            "hp": [49, 65],
            "sleep_resist": 8,
            "stopspell_resist": 0,
            "hurt_resist": 1,
            "dodge": 2,
            "experience": 43,
            "gold": [120, 159],
            "x": 120,
            "y": 352,
            "width": 48,
            "height": 64
        },
        32: {
            "id": 32,
            "name": "wizard",
            "strength": 80,
            "agility": 70,
            "hp": [49, 65],
            "sleep_resist": 15,
            "stopspell_resist": 7,
            "hurt_resist": 15,
            "dodge": 2,
            "experience": 50,
            "gold": [123, 164],
            "x": 120,
            "y": 296,
            "width": 48,
            "height": 48
        },
        33: {
            "id": 33,
            "name": "axe_knight",
            "strength": 94,
            "agility": 82,
            "hp": [53, 70],
            "sleep_resist": 15,
            "stopspell_resist": 3,
            "hurt_resist": 1,
            "dodge": 1,
            "experience": 54,
            "gold": [123, 164],
            "x": 56,
            "y": 168,
            "width": 56,
            "height": 64
        },
        34: {
            "id": 34,
            "name": "blue_dragon",
            "strength": 98,
            "agility": 84,
            "hp": [53, 70],
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 7,
            "dodge": 2,
            "experience": 60,
            "gold": [112, 149],
            "x": 48,
            "y": 0,
            "width": 64,
            "height": 48
        },
        35: {
            "id": 35,
            "name": "stoneman",
            "strength": 100,
            "agility": 40,
            "hp": [121, 160],
            "sleep_resist": 2,
            "stopspell_resist": 15,
            "hurt_resist": 7,
            "dodge": 1,
            "experience": 65,
            "gold": [105, 139],
            "x": 357,
            "y": 112,
            "width": 50,
            "height": 56
        },
        36: {
            "id": 36,
            "name": "armored_knight",
            "strength": 105,
            "agility": 86,
            "hp": [68, 90],
            "sleep_resist": 15,
            "stopspell_resist": 7,
            "hurt_resist": 1,
            "dodge": 2,
            "experience": 70,
            "gold": [105, 139],
            "x": 112,
            "y": 168,
            "width": 64,
            "height": 64
        },
        37: {
            "id": 37,
            "name": "red_dragon",
            "strength": 120,
            "agility": 90,
            "hp": [76, 100],
            "sleep_resist": 15,
            "stopspell_resist": 7,
            "hurt_resist": 15,
            "dodge": 2,
            "experience": 100,
            "gold": [105, 139],
            "x": 112,
            "y": 0,
            "width": 64,
            "height": 48
        },
        38: {
            "id": 38,
            "name": "dragonlord_first_form",
            "strength": 90,
            "agility": 75,
            "hp": [76, 100],
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 15,
            "dodge": 0,
            "experience": 0,
            "gold": 0,
            "x": 248,
            "y": 360,
            "width": 32,
            "height": 40
        },
        39: {
            "id": 39,
            "name": "dragonlord_second_form",
            "strength": 140,
            "agility": 200,
            "hp": 130,
            "sleep_resist": 15,
            "stopspell_resist": 15,
            "hurt_resist": 15,
            "dodge": 0,
            "experience": 0,
            "gold": 0,
            "x": 312,
            "y": 360,
            "width": 88,
            "height": 97
        }
    }
};