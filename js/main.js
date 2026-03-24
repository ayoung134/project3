// JS scripts placed here

// Random generator

// Source - https://stackoverflow.com/a/4550514
// Posted by Jacob Relkin, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-23, License - CC BY-SA 4.0

const cards = ["death", "empress", "fool", "highpriestess", "justice", "lovers",];

const random = Math.floor(Math.random() * cards.length);
console.log(random, cards[random]);