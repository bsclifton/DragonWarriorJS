DragonWarriorJS
===============
Recreating the original NES Dragon Warrior using JavaScript

## Getting started
To build and run the game, run the following:
```
npm install
npm run build
```

When this finishes, the output will be put under `dist`. You can then load `dist/index.html` in your favorite browser.

### Running interactively
You can also run using `webpack-dev-server` which supports hot-reloading:
```
npm start
```

After starting the server, you can load the game at `http://localhost:8080/`.
When changes are made to the source, webpack will re-run itself and the browser will update.


## Files
The `index.html` file loads all the scripts, testing elements, and the canvas.

The `assets` folder contains:
* Font file
* Music files
* Sound effect files
* Sprite sheets (characters, enemies, map tiles)

The `js` folder contains all the game objects:
* `audio.js` - audio object, plays music and sound
* `combat.js` - combat related functions (player attack, enemy attack, run, etc.)
* `config.js` - all configurable values:
  * sprites
  * level data
  * weapons, armor, and items
  * spell data
  * enemy data
  * map data (world, towns, dungeons)
* `game.js` - game loop, rendering, script processing
* `entry.js` - initialize the game
* `map_functions.js` - map object, map interaction functions
* `player.js` - player object, properties and functions for the player
* `text.js` - all in-game displayed text

## References
* English text dump by [Blueberry Buttface](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/54647)
* Enemy stats by [x_loto](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/69121)
* Most formulas by [Ryan8bit](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/61640)
