/* global getId */

/*
Most of the contents will be refactored and removed from here.
The only thing that'll stay is the Game.begin() at the bottom.
*/

const config = require('./config')
const Game = require('./game')
const map = require('./map_functions')
const player = require('./player')
const text = require('./text')

window.time = Date.now()
window.delta_time = Date.now()

window.getId = function (id) {
  return document.getElementById(id)
}

window.add_option = function (name, value, listId) {
  const optionToAdd = document.createElement('option')
  optionToAdd.id = name
  optionToAdd.text = name
  optionToAdd.value = value

  if (getId(listId).namedItem(name) === null) {
    getId(listId).add(optionToAdd)
  }
}

window.change_command_set = function () {
  if (Game.state === 'exploration') {
    getId('commands').innerHTML =
      '<input type="button" id="talk" value="Talk">' +
      '<input type="button" id="door" value="Door"><br>' +
      '<input type="button" id="search" value="Search">' +
      '<input type="button" id="take" value="Take"><br>' +
      '<select id="spell" size="6"></select>' +
      '<select id="item" size="6"></select><br>' +
      '<input type="button" id="cast_spell" value="Cast">' +
      '<input type="button" id="use_item" value="Use">'
  }

  if (Game.state === 'combat') {
    getId('commands').innerHTML =
      '<input type="button" id="fight" value="Fight">' +
      '<input type="button" id="run" value="Run"><br>' +
      '<select id="spell" size="6"></select>' +
      '<select id="item" size="6"></select>' +
      '<input type="button" id="cast_spell" value="Cast">' +
      '<input type="button" id="use_item" value="Use">'
  }
}

window.add_text = function (text) {
  setTimeout(function () {
    getId('dialog').innerHTML += text + '\n'
    getId('dialog').scrollTop = getId('dialog').scrollHeight
  }, 500)
}

// display stats, equipment, commands, and other options (side bars)
window.display_output = function () {
  getId('character_name').innerHTML = player.name
  getId('level').innerHTML = player.level
  getId('max_hp').innerHTML = player.max_hp
  getId('current_hp').innerHTML = player.current_hp
  getId('max_mp').innerHTML = player.max_mp
  getId('current_mp').innerHTML = player.current_mp
  getId('strength').innerHTML = player.strength
  getId('agility').innerHTML = player.agility
  getId('experience').innerHTML = player.experience
  getId('gold').innerHTML = player.gold
  getId('attack_power').innerHTML = player.attack_power
  getId('defense_power').innerHTML = player.defense_power
  getId('weapon').innerHTML = text.weapons[player.weapon]
  getId('armor').innerHTML = text.armors[player.armor]
  getId('shield').innerHTML = text.shields[player.shield]

  getId('output').innerHTML = 'player.x / 32 = ' + player.x / config.tile_width + '<br>' +
        'player.y / 32 = ' + player.y / config.tile_height + '<br>' +
        'player.offset_x = ' + player.offset_x + '<br>' +
        'player.offset_y = ' + player.offset_y + '<br>' +
        'steps = ' + player.steps + '<br>' +
        'current tile = ' + player.current_tile + '<br>' +
        'combat random = ' + Game.combat.random_num + '<br>' +
        'current zone = ' + map.current_zone + '<br>' +
        'player turn = ' + Game.combat.player_turn + '<br>'

  let npcCount = 0
  if (typeof map.map_ptr.npcs !== 'undefined') {
    npcCount = map.map_ptr.npcs.length
  }

  getId('output2').innerHTML = 'Current Map = ' + map.current_map + '<br>' +
        'Game State = ' + Game.state + '<br>' +
        'Number of NPCS = ' + npcCount + '<br>' +
        '<hr>' +
        'Rescued Princess? = ' + player.rescued_princess + '<br>' +
        '<hr>'

  // Commands
  if (Game.state === 'combat') {
    getId('fight').onclick = function () {
      Game.combat.player_attack()
    }
    getId('run').onclick = function () {
      Game.combat.player_run()
    }
    getId('cast_spell').onclick = function () {
      // Game.combat.cast_spell()
    }
  } else {
    getId('door').onclick = function () {
      player.door()
    }
    getId('talk').onclick = function () {
      player.talk()
    }
  }
}

// Random test stuff
// -------------------------------------------------------------------

getId('add_exp').onclick = function () {
  player.add_experience(500)
}
getId('equip_club').onclick = function () {
  player.weapon = 'club'
  player.shield = 'none'
}
getId('equip_shield').onclick = function () {
  player.weapon = 'none'
  player.shield = 'leather_shield'
}
getId('equip_both').onclick = function () {
  player.weapon = 'erdricks_sword'
  player.shield = 'leather_shield'
}
getId('equip_none').onclick = function () {
  player.weapon = 'none'
  player.shield = 'none'
}
getId('move_to_map').onclick = function () {
  map.load_map(getId('map_name').value)
}

Game.begin()
