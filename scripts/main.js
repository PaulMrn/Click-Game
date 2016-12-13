resize();

function resize(){
    var iw = window.innerWidth,
        ih = window.innerHeight,
        bgs = document.querySelectorAll("img");
    for (i=0 ; i < bgs.length ; i++){
        bgs[i].style.width = iw + "px";
        bgs[i].style.height = ih + "px";
    };
};

$(document).ready(function(){

    var nI = 0,
        oI = 0,
        onePerc = window.innerHeight / 200;

    $('body').mousewheel(function(event) {

        if (event.deltaFactor >= 100) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;

        if (nI - oI >= 1.25){

            bgTop = parseFloat($('.bcg1').css('top'));
            nbPerc = (nI - oI) / 0.75;
            var value = bgTop - (nbPerc * onePerc);
            $('.bcg1').css('top', value+'px')
            oI = nI;
            console.log(parseFloat($('.bcg1').css('top')), bgTop);
            
            if ( parseFloat($('.bcg1').css('top')) <= -(onePerc * 200)){
                 $('.bcg1').css('top', (onePerc * 200) +'px')
            };
            

        };

        console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);

    });
});