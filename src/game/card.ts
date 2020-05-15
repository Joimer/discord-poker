import CardSuit from './card-suit';

type Card = {readonly suit: CardSuit, readonly discriminator: string};

export default Card;
