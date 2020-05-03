export default function fisherYates<T>(cards: Array<T>) {
    // Technically only 2^64 but good enough for a Discord poker game.
    let len: number = cards.length;
    let temp: any;
    let i: number;

    while (len) {
        i = Math.floor(Math.random() * len--);
        temp = cards[len];
        cards[len] = cards[i];
        cards[i] = temp;
    }

    return cards;
};
