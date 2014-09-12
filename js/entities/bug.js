$.Bug = function(g) {
  $.Sprite.call(this);
  this.game = g;

    var r = g.w,
        target = this.getTarget('hive') || g.p1;

    this.name = 'skull';
    this.group = 'baddies';
    this.scale = ~~(Math.random() * 3) + 2;
    this.explodes = true;
    this.x = Math.random() * g . w;
    this.y = 0;

    this.xConst = this.x;
    this.xMove = ( Math.random() * 20 ) + 20;
    this.xSpeed = (Math.random() * 2) * -1;

    this.vy = 1;

    this.mkImg('bug');
    this.t = 0;

};

$.Bug.prototype = new $.Sprite();
$.Bug.prototype.constructor = $.Sprite;


$.Bug.prototype.update = function() {

    var g = this.game;

    this.t += 0.05;

    this.x = this.xMove * Math.sin(this.t * this.xSpeed) + this.xConst;
    this.y += this.vy;


    if (!this.remove && this.y < 0 - this.w) {
        this.remove = true;
    }

};


$.Bug.prototype.render = function() {

    var g = this.game;

    g.ctx.drawImage(this.img, this.x, this.y);


};




