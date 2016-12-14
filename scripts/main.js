resize();

$(document).ready(function(){

    var nI = 0,
        oI = 0,
        onePerc = window.innerHeight / 200,
        dollar = 0, caillou = 0, silver = 0, gold = 0, copper = 0;


    $('body').mousewheel(function(event) {
        if (event.deltaFactor >= 10) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;
        bgScroll($('.bcg1'), $('.bcg2'));
        if (nI % 100 === 0) breakBlock();

        // console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);
    });
    
    $('.sell-caillou').click(function(event) {
        dollar += caillou * 1;
        caillou = 0;
        $('.counter-1>span').text(caillou);
        $('.counter-0>span').text(dollar);
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

        if (x >= 95) {
            gold += 1;
            $('.counter-4>span').text(gold);
        }
        if (x >= 85) {
            silver += 1;
            $('.counter-3>span').text(silver);
        }
        if (x >= 70) {
            copper += 1;
            $('.counter-2>span').text(copper);
        }

        caillou += 1;
        $('.counter-1>span').text(caillou);

        console.log(x);
    };

});

function resize(){
    var iw = window.innerWidth,
        ih = window.innerHeight,
        bgs = document.querySelectorAll(".bcgImg"),
        toolImg = document.querySelector(".toolImg");

    toolImg.style.width = (iw * 12.5)/100 +"px";
    for (i=0 ; i < bgs.length ; i++){
        bgs[i].style.width = iw + "px";
        bgs[i].style.height = ih + "px";
    };
};