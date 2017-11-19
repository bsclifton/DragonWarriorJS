/* global Image, prompt, requestAnimationFrame, display_output, change_command_set, add_text */

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
*/

const config = require('./config')
const map = require('./map_functions')
const player = require('./player')
const text = require('./text')

const Game = {
  combat: require('./combat'),
  script: require('./script'),
  state: '',
  possible_states: ['exploration', 'combat'],
  canvas: null,
  context: null,
  img_characters: null,
  img_enemies: null,
  img_tiles: null,

  begin: function () {
    const self = this
    const keysDown = {}

    function draw () {
      self.clear()
      map.draw_viewport(map.current_map, player.offset_x, player.offset_y)
      self.draw_npcs()
    }

    function update () {
      delta_time = Date.now()
      map.check_location()
      player.load_player()

      if (self.state === 'exploration') {
        if (38 in keysDown) { // Player holding up
          player.move('up')
        } else if (40 in keysDown) { // Player holding down
          player.move('down')
        } else if (37 in keysDown) { // Player holding left
          player.move('left')
        } else if (39 in keysDown) { // Player holding right
          player.move('right')
        } else {
          player.draw_player()
        }
      }

      if (self.state === 'combat') {
        Game.combat.draw_screen()
        self.draw_enemy(Game.combat.enemy_ptr)
        if (Game.combat.initiative_round === true) {
          Game.combat.initiative()
        }
        if (Game.combat.player_turn === false) {
          setTimeout(function () {
            Game.combat.enemy_attack()
          }, 1000)
        }

        if (88 in keysDown) { // Player presses 'x'
          Game.combat.enemy_ptr = null
          self.change_state('exploration')
        }
      }
    }

    function main () {
      requestAnimationFrame(main)
      if (self.state === 'exploration') {
        draw()
      }
      update()
      display_output()
    }

    function loadImages () {
      self.img_characters = new Image()
      self.img_characters.src = config.sprites.characters
      self.img_enemies = new Image()
      self.img_enemies.src = config.sprites.enemies
      self.img_tiles = new Image()
      self.img_tiles.src = config.sprites.tiles
    }

    // Main game window
    document.title = text.game_title
    this.canvas = document.getElementById('game')
    this.context = this.canvas.getContext('2d')
    loadImages()

    // Keyboard inputs
    window.addEventListener('keydown', function (e) {
      keysDown[e.keyCode] = true
    })
    window.addEventListener('keyup', function (e) {
      delete keysDown[e.keyCode]
    })

    // Start the game!
    player.name = prompt(text.name_prompt)
    if (player.name === '') { player.name = text.default_player_name }
    this.change_state('exploration')
    map.load_map('World')
    player.load_player()
    player.set_current_tile()
    this.display_text(text.welcome)
    main()
  },

  change_state: function (input, delay) {
    var self = this

    function setState () {
      self.state = input
      change_command_set()
    }

    if (this.possible_states.indexOf(input) > -1) {
      if (typeof delay !== 'undefined') {
        setTimeout(setState, delay)
      } else {
        setState()
      }
    }
  },

  clear: function () {
    return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  display_text: function (formatString, params) {
    function format (formatString, params) {
      function escapeRegExp (string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
      }

      function replaceAll (string, find, replace) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace)
      }

      if (typeof params !== 'undefined') {
        if (typeof params.player_name !== 'undefined') {
          formatString = replaceAll(formatString, '<player_name>', params.player_name)
        }
        if (typeof params.enemy !== 'undefined') {
          formatString = replaceAll(formatString, '<enemy>', params.enemy)
        }
        if (typeof params.number !== 'undefined') {
          formatString = replaceAll(formatString, '<number>', params.number)
        }
        if (typeof params.spell !== 'undefined') {
          formatString = replaceAll(formatString, '<spell>', params.spell)
        }
      }

      return formatString
    }

    add_text(format(formatString, params))
  },

  random_number: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // Animation and rendering
  // -------------------------------------------------------------------

  animate_npc: function (frame1, frame2, x, y) {
    x = ((x - player.offset_x) * config.tile_width)
    y = ((y - player.offset_y) * config.tile_height)

    if ((Date.now() % 1000) < 500) {
      this.draw_character(frame1, x, y)
    } else {
      this.draw_character(frame2, x, y)
    }
  },

  // call frame from characters.png - starts with frame 0
  draw_character: function (frameNumber, posX, posY) {
    const imageX = (frameNumber % 16) * config.tile_width
    const imageY = Math.floor(frameNumber / 16) * config.tile_height

    this.context.drawImage(this.img_characters, imageX, imageY, config.tile_width, config.tile_height,
      posX, posY, config.tile_width, config.tile_height)
  },

  draw_npcs: function () {
    var self = this
    var i
    var numberOfNpcs

    // TODO: refactor this
    function drawNpc (characterType, direction, x, y) {
      switch (characterType) {
        case 'princess':
          if (direction === 'down') {
            self.animate_npc(80, 81, x, y)
          } else if (direction === 'left') {
            self.animate_npc(82, 83, x, y)
          } else if (direction === 'up') {
            self.animate_npc(84, 85, x, y)
          } else if (direction === 'right') {
            self.animate_npc(86, 87, x, y)
          }
          break
        case 'soldier':
          if (direction === 'down') {
            self.animate_npc(96, 97, x, y)
          } else if (direction === 'left') {
            self.animate_npc(98, 99, x, y)
          } else if (direction === 'up') {
            self.animate_npc(100, 101, x, y)
          } else if (direction === 'right') {
            self.animate_npc(102, 103, x, y)
          }
          break
        case 'townsman':
          if (direction === 'down') {
            self.animate_npc(8, 9, x, y)
          } else if (direction === 'left') {
            self.animate_npc(10, 11, x, y)
          } else if (direction === 'up') {
            self.animate_npc(12, 13, x, y)
          } else if (direction === 'right') {
            self.animate_npc(14, 15, x, y)
          }
          break
        case 'townswoman':
          if (direction === 'down') {
            self.animate_npc(24, 25, x, y)
          } else if (direction === 'left') {
            self.animate_npc(26, 27, x, y)
          } else if (direction === 'up') {
            self.animate_npc(28, 29, x, y)
          } else if (direction === 'right') {
            self.animate_npc(30, 31, x, y)
          }
          break
        case 'old_man':
          if (direction === 'down') {
            self.animate_npc(40, 41, x, y)
          } else if (direction === 'left') {
            self.animate_npc(42, 43, x, y)
          } else if (direction === 'up') {
            self.animate_npc(44, 45, x, y)
          } else if (direction === 'right') {
            self.animate_npc(46, 47, x, y)
          }
          break
        case 'merchant':
          if (direction === 'down') {
            self.animate_npc(56, 57, x, y)
          } else if (direction === 'left') {
            self.animate_npc(58, 59, x, y)
          } else if (direction === 'up') {
            self.animate_npc(60, 61, x, y)
          } else if (direction === 'right') {
            self.animate_npc(62, 63, x, y)
          }
          break
        case 'solider_2':
          if (direction === 'down') {
            self.animate_npc(72, 73, x, y)
          } else if (direction === 'left') {
            self.animate_npc(74, 75, x, y)
          } else if (direction === 'up') {
            self.animate_npc(76, 77, x, y)
          } else if (direction === 'right') {
            self.animate_npc(78, 79, x, y)
          }
          break
        case 'dragonlord':
          if (direction === 'down') {
            self.animate_npc(88, 89, x, y)
          } else if (direction === 'left') {
            self.animate_npc(90, 91, x, y)
          } else if (direction === 'up') {
            self.animate_npc(92, 93, x, y)
          } else if (direction === 'right') {
            self.animate_npc(94, 95, x, y)
          }
          break
        case 'trumpeteer':
          if (direction === 'left') {
            self.animate_npc(105, 105, x, y)
          } else if (direction === 'right') {
            self.animate_npc(104, 104, x, y)
          }
          break
        case 'king':
          self.animate_npc(106, 107, x, y)
          break
      }
    }

    if (typeof map.map_ptr.npcs !== 'undefined') {
      numberOfNpcs = map.map_ptr.npcs.length
      // TODO: replace with a visible flag, which checks player.rescued_princess.
      if (map.current_map === 'Tantegel2F' && player.rescued_princess === false) {
        numberOfNpcs--
      }
      for (i = 0; i < numberOfNpcs; i++) {
        drawNpc(
          map.map_ptr.npcs[i].type,
          map.map_ptr.npcs[i].facing,
          map.map_ptr.npcs[i].x,
          map.map_ptr.npcs[i].y
        )
      }
    }
  },

  draw_enemy: function (enemy) {
    const tileX = enemy.x
    const tileY = enemy.y
    const enemyWidth = enemy.width
    const enemyHeight = enemy.height
    const posX = (this.canvas.width / 2) - enemyWidth
    const posY = (this.canvas.height / 2) - enemyHeight

    this.context.drawImage(this.img_enemies, tileX, tileY, enemyWidth, enemyHeight,
      posX, posY, enemyWidth * 2, enemyHeight * 2)
  },

  // draw single tile frame from sprite sheet
  draw_tile: function (x, y, frameNumber) {
    // find horizontal and vertical position of tile to be drawn
    const posX = (frameNumber % 12) * config.tile_width
    const posY = Math.floor(frameNumber / 12) * config.tile_height

    this.context.drawImage(this.img_tiles, posX, posY, config.tile_width, config.tile_height,
      x, y, config.tile_width, config.tile_height)
  }
}

module.exports = Game
