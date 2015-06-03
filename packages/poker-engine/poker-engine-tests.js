Tinytest.add('Cards - creating with name and number', function (test) {
    errored = false
    try {
        var card = PokerEngine.Card('two', 'spades');
    } catch (error) {
        errored = true
        test.equal(error.name, 'InstanceError');
    }
    test.isTrue(errored, 'Instantiation should fail w/o new');
});

Tinytest.add('Cards - Creating and retrieving data', function (test) {
    var card = new PokerEngine.Card('two', 'spades');
    test.equal(card.suit, 2);
    test.equal(card.value, 2);
    test.equal(card.display(), 'two of spades');
});

Tinytest.add('Cards - Creating a card with numeral value', function (test) {
    // Adding a card using the card number
    var card2 = new PokerEngine.Card(3, 'hearts');
    test.equal(card2.value, 3, 'Adding a card using the card number');
});

Tinytest.add('Deck - Initializing the deck', function (test) {
    var deck = new PokerEngine.Deck();
    test.equal(deck.num_cards_left(), 52, 'Deck should have 52 cards')
    // console.log(deck);
});

Tinytest.add('Deck - Drawing a card', function (test) {
    var deck = new PokerEngine.Deck();
    card = deck.draw();
    test.equal(deck.num_cards_left(), 51);
    test.instanceOf(card, PokerEngine.Card);
    // should be able to draw more than one card
    pocket = deck.draw(2);
    test.equal(deck.num_cards_left(), 49);
    test.equal(pocket.length, 2)
});

Tinytest.add('Deck - Shuffling', function (test) {
    var deck = new PokerEngine.Deck();
    // This is a deep copy, so we should be able to compare against the pre shuffled deck
    var oldDeck = _.extend({}, deck);
    test.equal(deck.cards, oldDeck.cards);
    deck.shuffle();
    test.notEqual(deck.cards, oldDeck.cards);
    flop = deck.draw(3);
    test.equal(deck.num_cards_left(), 49)
    deck.shuffle()
    test.equal(deck.num_cards_left(), 52)
    // console.log(deck.cards);
    // console.log(oldDeck.cards);
});

Tinytest.add('Game - Comparing cards', function (test) {
    var game = new PokerEngine.Game();
    test.instanceOf(game.deck, PokerEngine.Deck);

});


