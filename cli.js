#!/usr/bin/env node
var argv = require("optimist")
.usage("Usage: $0 [-f cowfile] [-h] [-l] [-n] [-W column] text\n\n" +

  "              _________________      ____         __________\n" +
  ".       .    /                 |    /    \\    .  |          \\ \n" +
  "    .       /    ______   _____| . /      \\      |    ___    |     .     .\n" +
  "            \\    \\    |   |       /   /\\   \\     |   |___>   | \n" +
  "          .  \\    \\   |   |      /   /__\\   \\  . |         _/             .\n" +
  ".     ________>    |  |   | .   /            \\   |   |\\    \\_______    .\n" +
  "     |            /   |   |    /    ______    \\  |   | \\           |\n" +
  "     |___________/    |___|   /____/      \\____\ |___|  \\__________|    .\n" +
  " .     ____    __  . _____   ____      .  __________   .  _________\n" +
  "      \\    \\  /  \\  /    /  /    \\       |          \\    /         |      .\n" +
  "       \\    \\/    \\/    /  /      \\      |    ___    |  /    ______|  .\n" +
  "        \\              /  /   /\\   \\ .   |   |___>   |  \\    \\ \n" +
  "  .      \\            /  /   /__\\   \\    |         _/.   \\    \\ \n" +
  "          \\    /\\    /  /            \\   |   |\\    \\______>    |   .\n" +
  "           \\  /  \\  /  /    ______    \\  |   | \\              /          .\n" +
  ".       .   \\/    \\/  /____/      \\____\\ |___|  \\____________/\n\n" +
  "If the program is invoked as `yodathink` then the character will think its message instead of saying it.")
.options({
  "W" : {
    default : 40
  },
  "f" : {
    default : "default"
  }
})
.describe({
  "h" : "Display this help message",
  "n" : "If it is specified, the given message will not be word-wrapped.",
  "W" : "Specifies roughly where the message should be wrapped. The default is equivalent to -W 40 i.e. wrap words at or before the 40th column.",
  "f" : "Specifies a character picture file (''cowfile'') to use. It can be either a path to a character file or the name of one of characters included in the package.",
  "l" : "List all cowfiles included in this package."
})
.boolean(["b", "d", "g", "p", "s", "t", "w", "y", "n", "h", "l"])
.argv;

if (argv.l) {
  listCows();
} else if (argv.h) {
  showHelp();
} else if (argv._.length) {
  say();
} else {
  require("get-stdin")().then(function (data) {
    if (data) {
      argv._ = [data];
      say();
    } else {
      showHelp();
    }
  });
}

function say () {
  var module = require("./index");

  var think = /think$/.test(argv["$0"]);

  console.log(think ? module.think(argv) : module.say(argv));
}

function listCows () {
  require("./index").list(function(err, list) {
  if (err) throw new Error(err);
  console.log(list.join("  "));
  });
}

function showHelp () {
  require("optimist").showHelp();
}
