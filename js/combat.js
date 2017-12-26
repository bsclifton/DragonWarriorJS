const config = require('./config')
const map = require('./map_functions')
const player = require('./player')
const text = require('./text')

const combat = {
  enemy_ptr: null, // current enemy player is fighting
  enemy_id: '',
  enemy_max_hp: 0, // randomized at start of battle
  enemy_current_hp: 0,
  enemy_spell_blocked: false,
  gold_reward: 0, // randomized at start of battle
  enemy_status: '',
  player_turn: true,
  random_num: 0,
  initiative_round: true,

  // Check for random encounters at each step in player.move()
  random_encounter: function () {
    const Game = require('./game')
    if (map.map_ptr.type === 'world' || map.map_ptr.type === 'dungeon') {
      if (player.current_tile === 16 ||
        player.current_tile === 20) {
        this.random_num = Game.random_number(1, 8)
        if (this.random_num === 1) {
          this.random_enemy()
          return true
        }
      }
      if (player.current_tile === 3 ||
        player.current_tile === 8 ||
        player.current_tile === 15 ||
        player.current_tile === 21) {
        this.random_num = Game.random_number(1, 16)
        if (this.random_num === 1) {
          this.random_enemy()
          return true
        }
      }
      if (player.current_tile === 14) {
        this.random_num = Game.random_number(1, 24)
        if (this.random_num === 1) {
          this.random_enemy()
          return true
        }
      }
    }
  },

  random_enemy: function () {
    const Game = require('./game')
    var rand = Game.random_number(0, 4)
    let enemyList = []

    switch (map.current_zone) {
      case 0: enemyList = [0, 1, 0, 1, 0]; break
      case 1: enemyList = [1, 0, 1, 2, 1]; break
      case 2: enemyList = [0, 3, 2, 3, 1]; break
      case 3: enemyList = [1, 1, 2, 3, 4]; break
      case 4: enemyList = [3, 4, 5, 5, 6]; break
      case 5: enemyList = [3, 4, 5, 6, 11]; break
      case 6: enemyList = [5, 6, 11, 12, 14]; break
      case 7: enemyList = [11, 12, 13, 14, 14]; break
      case 8: enemyList = [13, 15, 18, 18, 25]; break
      case 9: enemyList = [15, 21, 18, 21, 25]; break
      case 10: enemyList = [21, 22, 23, 26, 28]; break
      case 11: enemyList = [23, 26, 27, 28, 16]; break
      case 12: enemyList = [26, 27, 28, 29, 31]; break
      case 13: enemyList = [29, 30, 31, 31, 32]; break
      case 14: enemyList = [8, 9, 10, 11, 12]; break
      case 15: enemyList = [17, 18, 19, 20, 23]; break
      case 16: enemyList = [29, 30, 31, 32, 33]; break
      case 17: enemyList = [32, 33, 34, 34, 35]; break
      case 18: enemyList = [32, 35, 36, 36, 37]; break
      case 19: enemyList = [3, 4, 6, 7, 7]; break
    }

    this.load_enemy(enemyList[rand])
  },

  load_enemy: function (id) {
    const Game = require('./game')
    this.initiative_round = true
    this.enemy_ptr = config.enemies[id]
    this.enemy_id = text.enemies[this.enemy_ptr.id]

    // check if enemy HP is a range or set number
    if (this.enemy_ptr.hp instanceof Array) {
      this.enemy_current_hp = Game.random_number(this.enemy_ptr.hp[0], this.enemy_ptr.hp[1])
    } else {
      this.enemy_current_hp = this.enemy_ptr.hp
    }
    this.enemy_max_hp = this.enemy_current_hp

    // check if enemy gold dropped is a range or set number
    if (this.enemy_ptr.gold instanceof Array) {
      this.gold_reward = Game.random_number(this.enemy_ptr.gold[0], this.enemy_ptr.gold[1])
    } else {
      this.gold_reward = this.enemy_ptr.gold
    }

    Game.display_text(text.combat.enemy.near, { enemy: this.enemy_id })
  },

  // Draw functions
  // -------------------------------------------------------------------

  draw_screen: function () {
    const Game = require('./game')
    Game.clear()
    Game.context.fillStyle = '#FFFFFF'
    Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height)
  },

  // Combat functions
  // -------------------------------------------------------------------

  initiative: function () {
    const Game = require('./game')
    const enemyAgility = this.enemy_ptr.agility
    const enemyStrength = this.enemy_ptr.strength
    const rand1 = Game.random_number(0, 255)
    const rand2 = Game.random_number(0, 255)
    const rand3 = Game.random_number(1, 100)

    if (player.strength > (2 * enemyStrength)) {
      if (rand3 <= 25) {
        Game.display_text(text.combat.enemy.run, { enemy: this.enemy_id })
        Game.change_state('exploration', 500)
      }
    }

    if ((player.agility * rand1) < (enemyAgility * rand2 * 0.25)) {
      Game.display_text(text.combat.enemy.strike_first, { enemy: this.enemy_id, player_name: player.name })
      this.player_turn = false
    } else {
      Game.display_text(text.combat.prompt)
    }

    this.initiative_round = false
  },

  player_attack: function () {
    const Game = require('./game')
    var hit = false
    var damage = 0

    if (this.player_turn === true) {
      Game.display_text(text.combat.player.attack, { player_name: player.name })
      if (Game.random_number(1, 64) > this.enemy_ptr.dodge) {
        hit = true
      }

      if (hit) {
        if (Game.random_number(1, 32) === 1 && this.enemy_ptr !== (38 || 39)) {
          Game.display_text(text.combat.player.hit_critical)
          damage = Math.floor(Game.random_number(player.attack_power / 2, player.attack_power))
        } else {
          damage = Math.floor(Game.random_number((player.attack_power - this.enemy_ptr.agility) / 4,
            (player.attack_power - this.enemy_ptr.agility) / 2))
        }

        if (damage < 0) { damage = 0 }
        Game.display_text(text.combat.player.hit, {enemy: this.enemy_id, number: damage})
        this.enemy_current_hp -= damage

        if (this.enemy_current_hp <= 0) {
          this.player_turn = true
          this.victory()
        } else {
          this.player_turn = false
        }
      } else {
        Game.display_text(text.combat.enemy.dodge)
        this.player_turn = false
      }
    }
  },

  use_item: function () {

  },

  cast_spell: function (spell) {
    if (config.spells[spell] && typeof config.spells[spell].effect === 'function') {
      const Game = require('./game')
      config.spells[spell].effect(Game, player)
    }
  },

  player_run: function () {
    const Game = require('./game')
    if (this.player_turn === true) {
      var modifier = 0
      var rand1 = Game.random_number(0, 255)
      var rand2 = Game.random_number(0, 255)
      var enemyAgility = this.enemy_ptr.agility
      var enemyIndex = this.enemy_ptr.index

      if (enemyIndex >= 0 && enemyIndex <= 20) {
        modifier = 0.25
      } else if (enemyIndex >= 20 && enemyIndex <= 29) {
        modifier = 0.375
      } else if (enemyIndex >= 30 && enemyIndex <= 34) {
        modifier = 0.5
      } else {
        modifier = 1
      }

      Game.display_text(text.combat.player.run, { player_name: player.name })
      this.player_turn = false

      if (this.enemy_status === 'sleep') {
        this.player_turn = true
        Game.change_state('exploration', 500)
      }

      if ((player.agility * rand1) < (enemyAgility * rand2 * modifier)) {
        Game.display_text(text.combat.player.run_blocked)
      } else {
        this.player_turn = true
        Game.change_state('exploration', 500)
      }
    }
  },

  player_died: function () {
    const Game = require('./game')
    Game.display_text(text.dead)
  },

  victory: function () {
    const Game = require('./game')
    var currentLevel = player.level

    Game.display_text(text.combat.victory.defeated, { enemy: this.enemy_id })
    Game.display_text(text.combat.victory.gain_exp, { number: this.enemy_ptr.experience })
    Game.display_text(text.combat.victory.gain_gold, { number: this.gold_reward })

    player.add_experience(this.enemy_ptr.experience)
    player.add_gold(this.gold_reward)
    player.load_player()

    if (player.level === (currentLevel + 1)) {
      this.player_level_up()
    }

    Game.change_state('exploration', 1000)
  },

  player_level_up: function () {
    const Game = require('./game')
    Game.display_text(text.combat.victory.next_level)
    if (typeof config.levels[player.level - 1].spells_learned !== 'undefined') {
      Game.display_text(text.combat.victory.gain_spell)
    }
  },

  enemy_attack: function () {
    const Game = require('./game')

    let usedSpecial = false
    let damage = 0

    if (this.enemy_ptr === null) {
      return
    }

    let enemyStrength = this.enemy_ptr.strength

    if (this.player_turn === false) {
      // Special move (spell, breathe fire)
      if (typeof this.enemy_ptr.special !== 'undefined' &&
        typeof this.enemy_ptr.special_probability !== 'undefined' &&
        this.enemy_ptr.special instanceof Array &&
        this.enemy_ptr.special_probability instanceof Array &&
        this.enemy_ptr.special.length === this.enemy_ptr.special_probability.length) {
        for (let i = 0; i < this.enemy_ptr.special.length; i++) {
          if (Game.random_number(1, 4) <= this.enemy_ptr.special_probability[i]) {
            let special = this.enemy_ptr.special[i]
            if (special === 'breathe_fire' || special === 'breathe_fire2') {
              Game.display_text(text.combat.enemy.fire, { enemy: this.enemy_id })

              let breathMinDmg
              let breathMaxDmg

              // Erdricks armor reduces damage by 1/3
              if (special === 'breathe_fire2') {
                // used by Dragon Lord in final form only
                breathMinDmg = player.has_erdricks_armor ? 42 : 65
                breathMaxDmg = player.has_erdricks_armor ? 48 : 72
              } else {
                breathMinDmg = player.has_erdricks_armor ? 10 : 16
                breathMaxDmg = player.has_erdricks_armor ? 14 : 23
              }

              damage = Game.random_number(breathMinDmg, breathMaxDmg)
              Game.display_text(text.combat.enemy.hit, { number: damage })
              player.lose_hp(damage)
            } else {
              if ((special === 'heal' || special === 'healmore') && (this.enemy_current_hp > (this.enemy_current_hp / 4))) {
                // will only be used if the monster's HP is less than one-fourth of Max. HP
                continue
              } else if (special === 'sleep' && player.status === 'sleep') {
                // will not be used if you are already asleep
                continue
              } else if (special === 'stopspell' && player.spell_blocked === true) {
                // will not be used if your spell has already been blocked
                continue
              }

              Game.display_text(text.combat.enemy.cast, { enemy: this.enemy_id, spell: text.spells[special] })
              // TODO: actually cast the spell
            }

            usedSpecial = true
          }
        }
      }

      // Regular attack
      if (!usedSpecial) {
        Game.display_text(text.combat.enemy.attack, { enemy: this.enemy_id })

        if (player.defense_power >= enemyStrength) {
          damage = Math.floor(Game.random_number(0, ((enemyStrength + 4) / 6)))
        } else {
          damage = Math.floor(Game.random_number(((enemyStrength - (player.defense_power / 2)) / 4),
            ((enemyStrength - (player.defense_power / 2)) / 2)))
        }

        Game.display_text(text.combat.enemy.hit, { number: damage })
        player.lose_hp(damage)
      }
    }

    this.player_turn = true
  }
}

module.exports = combat
