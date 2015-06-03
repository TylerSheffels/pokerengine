PokerEngine.Game = function () {
    var self = this;
    self.deck = new PokerEngine.Deck();
}

_.extend(PokerEngine.Game.prototype, {
    rankFive: function(cards) {
        
    },
});

PokerEngine.Score = function (rank, card1, card2, card3, card4, card5) {
    var self = this;
    self.rank = rank;
    self.card1 = card1;
    self.card2 = card2;
    self.card3 = card3;
    self.card4 = card4;
    self.card5 = card5;
}
