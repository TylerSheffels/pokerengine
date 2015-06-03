PokerEngine = {};

SUITS = {
    clubs: 0,
    diamonds: 1,
    spades: 2,
    hearts: 3,
}

REVERSE_SUITS = {
    0: 'clubs',
    1: 'diamonds',
    2: 'spades',
    3: 'hearts',
}

VALUES = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
}

REVERSE_VALUES = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'jack',
    12: 'queen',
    13: 'king',
    14: 'ace',
}

InstanceError = function(message) {
    this.name = 'InstanceError';
    this.message = message;
}

InvalidArgumentError = function(message) {
    this.name = 'InvalidArgumentError';
    this.message = message;
}

PokerEngine.Card = function (value, suit) {
    var self = this;
    if (! (self instanceof PokerEngine.Card))
        throw new InstanceError('use "new" to create a PokerEngine.Card')
    self.suit = SUITS[suit];
    self.value = VALUES[value];
    
    if (_.isUndefined(self.value)) {
        if (value >= 10 || value < 2) {
            throw new InvalidArgumentError('Invalid Value: ' + value + ' (use words for facecards)');
        } else {
            self.value = value;
        }
    }

    if (_.isUndefined(self.suit)) {
        throw new InvalidArgumentError('Invalid Suit: ' + suit);
    }
}

_.extend(PokerEngine.Card.prototype, {
    display: function () {
        return '' + REVERSE_VALUES[this.value] + ' of ' + REVERSE_SUITS[this.suit];
    }
});

PokerEngine.Deck = function () {
    var self = this;
    self.cards = [];
    self.resetDeck();
}

_.extend(PokerEngine.Deck.prototype, {
    num_cards_left: function () {
        return this.cards.length;
    },

    draw: function(num) {
        //Support draw() and draw(2)
        num = num || 1;
        if (num === 1)
            return this.cards.pop();
        else {
            ret = [];
            while(ret.length < num) {
                ret.push(this.cards.pop());
            }
            return ret;
        }

    },

    resetDeck: function () {
        this.cards = []
        _.each(SUITS, function(v, suit, list) {
            _.each(VALUES, function(vv, value, l) {
                this.cards.push(new PokerEngine.Card(value, suit));
            }, this);
        }, this);

        this.cards = _.shuffle(this.cards);
    },

    shuffle: function () {
       this.resetDeck(); 
    },
});

