enum RoundState {
    NOT_READY,
    BLINDS,
    HOLE_CARDS,
    BETTING,
    FLOP,
    FLOP_BETTING,
    TURN,
    TURN_BETTING,
    RIVER,
    RIVER_BETTING,
    BEST_HAND,
    FINISHED
}

export default RoundState;
