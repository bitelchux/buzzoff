$.Input = function(g) {

    var l = window.addEventListener,
        self = this;

    this.game = g;
    this.x = g.w / 2;
    this.y = g.h / 2;
    this.down = false;
    this.released = false;
    this.power = false;

    l('mousedown', function(e) {
        self.down = 1;
    }, false);


    l('mouseup', function(e) {
        self.down = 0;
        self.released = 1;
    }, false);


    l('mousemove', function(e) {
        self.trackMove(e);
    }, false);

    l('touchstart', function(e) {
        self.down = 1;
    }, false);


    l('touchmove', function(e) {
        e.preventDefault();
        self.trackMove(e.touches[0]);
    }, false);

    l('touchend', function(e) {
        self.down = 0;
        self.released = 1;
    }, false);

    this.trackMove = function(e) {
    
        var g = this.game,
                offsetY = g.c.offsetTop,
                offsetX = g.c.offsetLeft,
                scale = parseInt(g.c.style.width, 10) / g.c.width,
                x = ~~((e.pageX - offsetX) / scale);
                y = ~~((e.pageY - offsetY) / scale);

        x = x > g.w ? g.w : x;
        x = x < 0 ? 0 : x;

        y = y > g.h ? g.h : y;
        y = y < 0 ? 0 : y;

        this.x = x;
        this.y = y;
    };


    this.updatePower = function() {
        if (this.down && this.power < 30) {
            this.power += 0.2;
        } else if (!this.down) {
            this.power = 0;
            this.released = 0;
        }

    };

    this.getAngle = function(x, y) {
        var dx = this.x - x;
        var dy = this.y - y;
        return Math.atan2(dy, dx);
    };

};
