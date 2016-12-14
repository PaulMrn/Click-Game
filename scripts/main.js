resize();

$(document).ready(function(){

    var nI = 0,
        oI = 0,
        onePerc = window.innerHeight / 200,
        dollar = 0, meter = 0, blue = 0, yellow = 0, red = 0,
        dropRed = 1, dropBlue = 5, dropYel = 15;


    $('body').mousewheel(function(event) {
        if (event.deltaFactor >= 10) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;
        bgScroll($('.bcg1'), $('.bcg2'));
        if (nI % 100 === 0) breakBlock();
        // console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);
    });

    function bgScroll(bg1, bg2) {
        if (nI - oI >= 1.25){
            bgTop = parseFloat(bg1.css('top'));
            bgTop2 = parseFloat(bg2.css('top'));
            nbPerc = (nI - oI) / 0.75;
            var value = bgTop - (nbPerc * onePerc);
            var value2 = bgTop2 - (nbPerc * onePerc);
            bg1.css('top', value+'px');
            bg2.css('top', value2+'px');
            oI = nI;
            if ( bgTop <= -(onePerc * 200)){
                bg1.css('top', ((onePerc * 200) - onePerc) +'px');
            };
            if ( bgTop2 <= -(onePerc * 200)){
                bg2.css('top', ((onePerc * 200) - onePerc) +'px');
            };
        };
    };

    function breakBlock() {
        var x = Math.floor((Math.random() * 100));
        var y = Math.floor((Math.random() * 100));
        var z = Math.floor((Math.random() * 100));
        console.log(x,y,z);
        // console.log(dropYel,dropBlue,dropRed);

        if (x <= dropYel) {
            yellow += 1;
            $('.counter-2>span').text(yellow);
        }
        if (y <= dropBlue) {
            blue += 1;
            $('.counter-3>span').text(blue);
        }
        if (z <= dropRed) {
            red += 1;
            $('.counter-4>span').text(red);
        }

        meter += 1;
        $('.counter-1>span').text(meter);

    };

});

function resize(){
    var iw = window.innerWidth,
        ih = window.innerHeight + 30,
        bgs = document.querySelectorAll(".bcgImg"),
        toolImg = document.querySelector(".toolImg");

    toolImg.style.width = (iw * 12.5)/100 +"px";
    for (i=0 ; i < bgs.length ; i++){
        bgs[i].style.width = iw + "px";
        bgs[i].style.height = ih + "px";
    };
};