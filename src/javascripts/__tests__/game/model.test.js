import Link4Game from '../../game/model'

describe('game/model.js', () => {

    var game = new Link4Game();

    function winnerHorizontal(){
      game.drop(1);
      game.drop(1);
      game.drop(2);
      game.drop(2);
      game.drop(3);
      game.drop(3);
      game.drop(4);
    }


    beforeEach(function(done) {
        game.reset(Link4Game.prototype.RED);
        done();
    });

    it('should be active start', () => {
        game.status().should.equal(game.STATUS_ACTIVE);
    });

    it('should not be tied at start', () => {
        game.isTie().should.equal(false);
    });

    describe('drop', () => {
      it('should add a token to column 6', ()=>{
        var column6 = game.getColumn(6);
        game.drop(6);
        expect(game.getColumn(6)).to.eql(['R']);
      });

      it('should not work after winner', ()=>{
        winnerHorizontal();
        var column5 = game.getColumn(5);
        game.drop(5);
        expect(game.getColumn(5)).to.eql(column5);
      });
    });

    describe('winner', () => {
       it('should detect horizontal winner ', () => {
          winnerHorizontal();
          expect(game.winner()).to.equal('R');
      });
       it('should detect vertical winner ', () => {
          game.drop(3);
          game.drop(4);
          game.drop(3);
          game.drop(4);
          game.drop(3);
          game.drop(4);
          game.drop(3);
          expect(game.winner()).to.equal('R');
      });
       it('should detect down left diagonal winner ', () => {
          game.drop(3);
          game.drop(4);
          game.drop(4);
          game.drop(5);
          game.drop(1);
          game.drop(5);
          game.drop(5);
          game.drop(6);
          game.drop(6);
          game.drop(6);
          game.drop(6);
          expect(game.winner()).to.equal('R');
      });
       it('should detect down right diagonal winner ', () => {
          game.drop(3);
          game.drop(2);
          game.drop(2);
          game.drop(1);
          game.drop(6);
          game.drop(1);
          game.drop(1);
          game.drop(0);
          game.drop(0);
          game.drop(0);
          game.drop(0);
          expect(game.winner()).to.equal('R');
      });
    });

    describe('diagonals', () => {
        beforeEach(function(done) {
            game.drop(0);
            game.drop(1);
            game.drop(2);
            game.drop(3);
            game.drop(4);
            game.drop(5);
            game.drop(6);
            game.drop(0);
            game.drop(1);
            game.drop(0);
            game.drop(0);
            game.drop(0);
            game.drop(0);
            game.drop(6);
            game.drop(5);
            game.drop(5);
            game.drop(5);
            game.drop(5);
            game.drop(5);
            game.drop(3);
            game.drop(3);
            done();
        });

        describe('_diagonals1', () => {

            var expected = [
                ['R'],
                ['B', '_'],
                ['R', '_', '_'],
                ['B', '_', '_', '_'],
                ['B', '_', '_', '_', '_'],
                ['R', 'R', '_', '_', '_', 'R'],
                ['B', '_', 'R', '_', 'B', '_'],
                ['R', 'B', '_', 'R', '_'],
                ['B', '_', 'B', '_'],
                ['R', 'R', '_'],
                ['B', 'B'],
                ['R'],
            ];


            it('should provide the 12 diagonals ', () => {
                expect(game._diagonals1().length).to.equal(12);
            });

            expected.forEach(function(expected_result, index) {
                it('should provide the ' + index + 'th diagonals1 array ' + expected_result, () => {
                    var result = game._diagonals1();
                    expect(result[index]).to.eql(expected_result);
                });
            });
        });


        describe('_diagonals2', () => {

            var expected = [
                ['_'],
                ['_', 'R'],
                ['_', 'B', '_'],
                ['_', 'R', '_', '_'],
                ['B', 'B', '_', '_', '_'],
                ['R', 'R', '_', '_', '_', '_'],
                ['B', '_', 'R', '_', '_', 'R'],
                ['R', 'B', '_', '_', 'B'],
                ['B', '_', '_', 'R'],
                ['R', 'R', 'B'],
                ['B', 'B'],
                ['R'],
            ];

            it('should provide the 12 diagonals ', () => {
                expect(game._diagonals2().length).to.equal(12);
            });

            expected.forEach(function(expected_result, index) {
                it('should provide the ' + index + 'th diagonals2 array ' + expected_result, () => {
                    var result = game._diagonals2();
                    expect(result[index]).to.eql(expected_result);
                });
            });
        });
    });
})
