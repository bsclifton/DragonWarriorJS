DragonWarriorJS
===============

The purpose of this project is to learn JavaScript and Canvas by recreating
the original NES Dragon Warrior. Given that purpose, this is a very rough
code base with plenty of room for improvements (refactoring, optimizations,
etc.). All in due time.

The "index.html" file loads all the scripts, testing elements, and the canvas.

The "assets" folder contains:
* Font file
* Music files
* Sound effect files
* Sprite sheets (characters, enemies, map tiles)

The "scripts" folder contains all the game objects. Here is a brief description
of each file:
* audio.js - audio object, plays music and sound
* combat.js - combat related functions (player attack, enemy attack, run, etc.)
* config.js - all configurable values
* game.js - game loop, check input, draw assets, outputs test data
* init.js - global functions and variables
* map_functions.js - map object, map interaction functions
* maps.js - maps object, contains data for each map (world, towns, dungeons)
* npcs.js - npc object, functions for in game NPCs
* player.js - player object, properties and functions for the player
* text.js - all in-game displayed text
