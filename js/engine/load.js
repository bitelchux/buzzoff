$.Load = function(g) {

    this.game = g;

    this.imgsLoaded = 0;
    this.imgsTotal = Object.keys($.data.i).length;

    this.init = function() {

        var g = this.game,
            i = $.data.i, n;
// console.time("LOADING");
        for (n in i) {
            if (i.hasOwnProperty(n)) {
                g.imgs[n] = new Image();
                g.imgs[n].onload = this.checkLoaded();
                g.imgs[n].src = i[n];
            }
        }
    };


    this.checkLoaded = function() {
        this.imgsLoaded += 1;
        if (this.imgsLoaded === this.imgsTotal) {
            this.resize();
            this.mkFonts();
            this.mkBgs();
            this.mkSfx();
// console.timeEnd("LOADING");
            g.init(this.state);
        }

    };


    this.resize = function() {
    
        var g = this.game,
            imgs = Object.keys($.data.i),
            max = 10,
            min,
            sizes,
            i = imgs.length,
            n = this.imgsTotal,
            count, tmp, resize;

            for (i = 0; i < imgs.length; i+= 1) {
                resize = $.data.resize[imgs[i]] || { hurt: false, r: '1'};
                sizes = resize.r.split('-');
                min = parseInt( sizes[0], 10 );
                max = parseInt( sizes[1], 10 ) || min;
                for (count = min; count <= max; count+=1) {
                    tmp = imgs[i];
                    g.imgs[tmp+'_'+count] = $.utils.resize(g.imgs[tmp], count);
                    if (resize.hurt) {
                    g.imgs[tmp+'_hurt_'+count] = $.utils.resize(g.imgs[tmp], count, [200,0,0]);
                    }
                    if (resize.shadow) {
                    g.imgs[tmp+'_shadow_'+count] = $.utils.resize(g.imgs[tmp], count, [0,0,0]);
                    }
                }
            }


            // g.imgs['bee_shadow'] = $.utils.resize(g.imgs.bee_4, 1, [0,0,0]);

    };


    this.mkFonts = function() {
        var g = this.game,
            f = $.data.f,
            n;

        for (n in f.t) {
            g.fonts[n] = this.mkFont(f.t[n][0], f.t[n][1]);
        }

    };


    this.mkFont = function(scale, col) {

        var s6 = $.data.f,
            g = this.game;

        scale = scale || 1;

        var f = $.utils.resize(g.imgs.font, scale, col);
        f.scale = scale;
        f.w = s6.w;
        f.c = s6.c;
        f.h = s6.h;

	return f;	
    
    };



    this.mkSfx = function() {

        var s = $.data.sfx, g = this.game, n;

        for (n in s) {
            if (s.hasOwnProperty(n)) {
                g.sfx[n] = new Audio();
                g.sfx[n].src = jsfxr($.data.sfx[n]);
            }
        }


    };


    this.mkBgs = function() {
    
        var g = this.game,
            c = document.createElement('canvas'),
            ctx,
            x, y, s;

        c.width = g.w;
        c.height = g.h;
        ctx = c.getContext('2d');


        ctx.fillStyle = '#4e9a06';
        ctx.fillRect(0, 0, g.w, g.h);
        for (xc = 0; xc < 5000; xc += 1) {
            x = ~~(Math.random() * g.w);
            y = ~~(Math.random() * g.h);
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(x, y, 4, 4);
            ctx.fillStyle = 'rgba(255,255,255,0.025)';
            ctx.fillRect(x, y+4, 4, 2);
        }


        ctx.globalAlpha = 0.5;
        for (xc = 0; xc < 15; xc +=1 ) {
            s = ~~(Math.random() * 3) + 2;
            x = ~~(Math.random() * g.w);
            y = ~~(Math.random() * ( g.h /2 ) + 60);
            try {
                ctx.drawImage(g.imgs['flower_'+s], x, y);
            } catch (e) {
                // last min workaround. eEK!
                // window.location.href=window.location.href;
                console.log(e);
            }
        }
        ctx.globalAlpha = 1;

        var i = new Image();
        i.src = c.toDataURL('image/gif');
        g.bgs.grass = i;


    };


    this.init();

};
