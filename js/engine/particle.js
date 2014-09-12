$.Particle = function(g, x, y, v, col) {

    this.game = g;

    this.x = x;    
    this.y = y;    
    this.v = (Math.random() * 5) + 5;
    this.vx = ( ( Math.random() * 2 ) - 1 ) * this.v;
    this.vy = ( ( Math.random() * 2 ) - 1 ) * this.v;
    this.ttl = ( Math.random() * 100 ) + 100;
    this.hlife = this.ttl / 2;
    this.o = 1;

    this.i = g.imgs.frag_3;
    this.i2 = g.imgs.frag_5;
    this.frame = this.i2;

    this.name = 'particle';
    this.group = 'particles';


};

$.Particle.prototype.update = function() {

    this.x += this.vx;
    this.y += this.vy;
    this.ttl -= 5;

    this.vx *= 0.95;
    this.vy *= 0.95;

    if (this.ttl < this.hlife) {
        this.frame = this.i;
    }

    if (~~this.vx <= 0  && this.o >= 0) {
        this.o -= 0.05;
    }

    if (this.o <= 0) {
        this.remove = true;
    }

};


$.Particle.prototype.render = function() {
    if (this.ttl > 0 && this.o > 0) {
        this.game.ctx.globalAlpha = this.o;
        this.game.ctx.drawImage(this.frame, this.x, this.y);         
        this.game.ctx.globalAlpha = 1;
    }
};

