/* 

  This file contains JavaScript for the index.html file 

*/

// CONSTANTS
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  backgroundColor: '#1b1464',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 150 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

var game = new Phaser.Game(config);

function preload() {
  
}

function create() {
  
}

function update() {
  
}