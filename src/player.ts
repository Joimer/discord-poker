export class Player {

    id: Symbol;
    name: string;
    chips: number = 0;

    constructor(name: string) {
        this.id = Symbol(name);
        this.name = name;
    }

    setChips(chips: number) {
        this.chips = chips;
    }
}
