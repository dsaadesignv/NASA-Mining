planetaryjs.plugins.crateres = function(config) {
    var crateres = [];
    config = config || {};

    var addcratere = function(lng, lat, options) {
        options = options || {};
        options.color = options.color || config.color || 'white';
        options.angle = options.angle || config.angle || 5;
        options.ttl = options.ttl || config.ttl || 2000;
        var cratere = {
            time: new Date(),
            options: options
        };
        if (config.latitudeFirst) {
            cratere.lat = lng;
            cratere.lng = lat;
        } else {
            cratere.lng = lng;
            cratere.lat = lat;
        }
        crateres.push(cratere);
    };

    var drawcrateres = function(planet, context, now) {
        var newcrateres = [];
        for (var i = 0; i < crateres.length; i++) {
            var cratere = crateres[i];
            var alive = now - cratere.time;
            if (alive < cratere.options.ttl) {
                newcrateres.push(cratere);
                drawcratere(planet, context, now, alive, cratere);
            }
        }
        crateres = newcrateres;
    };

    var colors = ['white','yellow','blue', 'red', 'green', 'black']
    var drawcratere = function(planet, context, now, alive, cratere) {
        var fillStyle;
        
        // if( imgPatternLoaded ){
            // fillStyle = context.createPattern(imgPattern, 'repeat');
            // var alpha = 1 - (alive / cratere.options.ttl);
            // var color = d3.rgb(cratere.options.color);
            // fillStyle = "rgba(255,0,0," + alpha + ")";
        // }
        // else{
        
            var alpha = 1 - (alive / cratere.options.ttl);
            var color = d3.rgb(colors[cratere.options.color-1]);
            fillStyle = "white";
            //fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + alpha + ")";
        //}
        context.fillStyle = fillStyle;


        var circle = d3.geo.circle().origin([cratere.lng, cratere.lat])
           .angle(alive / cratere.options.ttl * cratere.options.angle)();

        context.beginPath();
        planet.path.context(context)(circle);
        context.fill();
    };

    return function(planet) {
        planet.plugins.crateres = {
            add: addcratere
        };

        planet.onDraw(function() {
            var now = new Date();
            planet.withSavedContext(function(context) {
                drawcrateres(planet, context, now);
            });
        });
    };
};