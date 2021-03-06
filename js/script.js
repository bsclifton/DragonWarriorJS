const text = require('./text')
const player = require('./player')

module.exports = {
  text: function (string) {
    if (typeof string !== 'undefined') {
      if (typeof text.script[string] !== 'undefined') {
        const Game = require('./game')
        if (text.script[string] instanceof Array) {
          text.script[string].forEach(function (element, index, array) {
            Game.display_text(element)
          })
        } else {
          Game.display_text(text.script[string])
        }
      }
    }
  },

  menu_yes_no: function (string, yesHandler, noHandler) {
    // ..
  },

  refill_life: function () {
    player.current_mp = player.max_mp
  }
}
