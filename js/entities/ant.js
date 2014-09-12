$.Ant = function(g, o) {
  $.Sprite.call(this);
  this.game = g;

    var r = g.w,
        target = this.getTarget('hive') || g.p1,
        deg,
        angleRadians;

    this.name = 'ant';
    this.group = 'baddies';
    this.scale = ~~(Math.random() * 3) + 2;
    this.explodes = true;
    this.angle = Math.random()*Math.PI*2;
    this.x = Math.cos(this.angle)*r + (r) / 2;
    this.y = Math.sin(this.angle)*r + (r)  / 2;
    this.y = -10;


    this.mkImg('ant');
    angleRadians = Math.atan2(target.cy -  this.y , 
                    target.cx - this.x);
    deg = ( angleRadians * (180 / Math.PI) ) + 180;
    deg = deg * (Math.PI / 180);



    this.img = this.rotate(this.img, deg);
    this.img2 = this.rotate(g.imgs['ant2_'+this.scale], deg);
    this.frames = 2;
    this.frame = 0;
    this.animTick = 0;
    this.animReset = 8 - this.scale;

    this.vx = 0;
    this.vy = 0.2 + ~~(Math.random() * 2);

    this.vx = Math.cos(angleRadians) * ( ( 5 - this.scale ) / 2);
    this.vy = Math.sin(angleRadians) * (( 5 - this.scale ) / 2);

};

$.Ant.prototype = new $.Sprite();
$.Ant.prototype.constructor = $.Sprite;


$.Ant.prototype.update = function() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.animTick > this.animReset) {
        this.animTick = 0;
        this.frame += 1;
    }

    if (this.frame >= this.frames) {
        this.frame = 0;
    }

    this.animTick += 1;

    if (!this.remove && this.y > this.game.h + this.w) {
        this.remove = true;
    }


};


$.Ant.prototype.render = function() {

    var g = this.game,
        i = (this.frame > 0) ? this.img : this.img2;

    g.ctx.drawImage(i, this.x, this.y);


};


