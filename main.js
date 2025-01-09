"use strict";

function dice_initialize(container) {
    var canvas = $t.id('canvas');
    canvas.style.width = '500px';
    canvas.style.height = '500px';
	var test = '';
    var set = $t.id('set');
    //on_set_change();

    $t.dice.use_true_random = false;

    var box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });

    function before_roll(vectors, notation, callback) {
        callback();
    }

    function notation_getter() {
        return $t.dice.parse_notation(set.value);
    }

    function after_roll(notation, result) {
        var res = result.join(' ');
        if (notation.constant) res += ' +' + notation.constant;
        //if (result.length > 1) res += ' = ' + 
		
		test = (result.reduce(function(s, a) { return s + a; }) + notation.constant);
		document.getElementById("output").value = test;
        res = (result.reduce(function(s, a) { return s + a; }) + notation.constant) + ' New Letters Received';
        label.innerHTML = res;
    }

    box.bind_throw($t.id('throw'), notation_getter, before_roll, after_roll);
}