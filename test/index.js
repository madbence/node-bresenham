var bresenham = require('../');


/**
 * Simple function that generates an array of points
 * starting at (x0, y0). Each successive point increases
 * by (xDelta, yDelta) until there are length number of points
 */
var testLine = function(x0, y0, xDelta, yDelta, length) {
  var x = x0;
  var y = y0;
  var points = [];
  for(var i = 0; i < length; i++) {
    points.push({
      x: x,
      y: y
    });
    x += xDelta;
    y += yDelta;
  }
  return points;
};

// Make sure our line generating code works
describe('testLine', function() {
  it('should create a line increasing along x-axis', function() {
    var points = testLine(0, 0, 1, 0, 3);
    points[0].should.deepEqual({x: 0, y: 0});
    points[1].should.deepEqual({x: 1, y: 0});
    points[2].should.deepEqual({x: 2, y: 0});
  });
  it('should create a line decreasing along y-axis', function() {
    var points = testLine(0, 0, 0, -1, 3);
    points[0].should.deepEqual({x: 0, y: 0});
    points[1].should.deepEqual({x: 0, y: -1});
    points[2].should.deepEqual({x: 0, y: -2});
  });
});

var semver = require('semver');

// Testing generator if using at least node v4
if(semver.gte(process.version, '4.0.0')) {
  var bresenhamGenerator = require('../generator');
  
  describe('Bresenham Generator', function() {
    it('should generate one point', function() {
      var points = Array.from(bresenhamGenerator(0, 0, 0, 0));
      points.length.should.equal(1);
      points.should.deepEqual(testLine(0, 0, 0, 0, 1));
    });
    it('should return correct points for two points of increasing x-values', function() {
      var points = Array.from(bresenhamGenerator(0, 0, 5, 0));
      points.length.should.equal(6);
      points.should.deepEqual(testLine(0, 0, 1, 0, 6));
    });
    it('should return correct points for two points of decreasing y-values', function() {
      var points = Array.from(bresenhamGenerator(0, 5, 0, 0));
      points.length.should.equal(6);
      points.should.deepEqual(testLine(0, 5, 0, -1, 6));
    });
  });

}
