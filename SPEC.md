# Texas Holdem gameplay

The game is played with a regular Poker deck of 52 cards, comprised of 13 cards of each suit of Clover, Diamond, Heart, and Spades. Usually each player is given 1500 or 2000 chips, divided in colours representing their value in real money. For this Discord use-case, real money is not involved so it all comes down to chip count.

The first step is the Blinds. There's the big blind, usually with a starting value of 1/100 the initial chip count, and the small blind, always half the value of the big one. The value of the blinds is doubled after a specified time, in order to burn through chips faster to accelerate the end of the game and avoid stalls.

At the beginning of the game the dealer is picked. In this use-case, the dealer is an automatic position just for reference. The player to the left of the dealer is small blind. The player left to the small blind is the big blind. In this document we'll use "player to the left" as in a real table, but for this use-case, a "player to the left" is actually the next player in the ordered table. Thus, should the dealer be the player 0 in the list in a 0-index array, the small blind would be 1 and the big blind would be 2, looping back to 0 when the end of the list is reached.

So, the round begins, the player left to the dealer bets half the minimum bet, the player next to him bets the full minimum bet. After that, the hole cards are dealt. Beginning to the player to his immediate left, the small blind, the dealer deals two rounds of cards, including himself in last position. Those two cards are the hole cards.

Now, the betting starts, starting with the player to the left of the big blind. In any betting phase, there are three options: call, fold, or raise. A call means that the player is matching the current bet, say the big blind is 20 chips, so the player would be betting 20 chips too with a "call". A "fold" means the player does not intend to bet on this hand. Now there are two options in the betting round: after everyone has either called or folded, the small blind can put the other half of the minimum bet and call or fold and lose the small blind to the "pot" (total amount of chips bet by all players). On the other hand, any player in this phase can "raise", which is to increase their bet by doubling the blind amount, so in this case a player would "raise" to 40 chips.

If a raise occurs, every other player, once again one by one going by the left or, in this use-case, the next player in the list, must either call the raise (bet the same amount), raise again (doubling again the bet), or fold and lose the chips already bet to the pot.

After the bets are established, if no player matches the highest bet, the player with the highest bet will receive the pot chips and the round finishes. If there are competing bets, the next step ensues: the "flop".

The first card of the deck is a "burn card", that is, discarded without being shown. Then the "flop" is shown, three consecutive cards which everyone can see and play with. The cards played in the table can be combined with a player's hand to form figures to win with the best possible five card hand.

After the flop is dealt, there is another betting round. The first person to act is the person left to the dealer, the small blind. Again, the options are "check", "bet" (raise) or "fold". Check means he is intending to play with the initial bet. Once the player decides, it's the turn of the player to the left. The next player can also check or raise the bet by at least double the amount of the initial bet. As with the previous betting round, folding means you lose any bet chips to the pot.

Once again, once the table has either checked or raised, should there still be competing bets, the, comes the "turn", also known as "fourth street". The top card of the deck is burnt, and the subsequent cald is dealt to the table for everyone to see. Another round of betting exactly equal to the one after the flop ensues.

After this new round of betting comes the "river" or "fifth street". Once again, burn the topmost card of the deck, deal a card to the table. There we have five public cards that can be used to make combination with the 2 cards in the player's hands. After this card is dealt, there's one last round of betting exactly like the two previous ones. Once the pot is settled, the betting players show their cards and the player with the best combination gets the entirety of the pot.

After that, the round has finished. The game will continue with these rounds until only one player, the winner, has chips. Once a player has no chips, he drops out of the game. In a real game or on-line casino game, the player can sometimes re-buy chips to re-enter the game, but on this use-case it is not relevant unless an out-of-the-game money system is implemented, but that would be troublesome.

# Game implementation details

The game engine and the client should be separated, and the game engine should be agnostic to the client and other external state.

One should be able to instance a `Game`, where `Player`s can join, and programatically run the `Round`s and advance the game state.

The game can be either prompted or events could be fired from the game in order to read and interact with its state.

# Discord bot client

The client that's going to be used to play this game is a Discord bot, which will deal with: managing users, commands, and servers. The bot should connect to the server and await for game-related commands.

The bot should map specific commands to game actions and, while the game implementation should care for rule violations within the game state, the game Bot could also try to prevent such things from happening, as in the purest form the Game data types should all be agnostic from the implementation of rules (even though it may not be the case for this implementation).
