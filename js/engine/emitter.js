$.Emitter = function(g) {

    this.game = g;


    this.init = function(p, x, y, v, cols) {
    
        var g = this.game, i;

        for (i = 0; i < p; i+= 1) {
            g.ents.push(new $.Particle(
                this.game, x, y, v
            ));
        }
        

    };



};
