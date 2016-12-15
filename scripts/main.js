resize();

$(document).ready(function(){

    var nI = 0, autonI = 1.25,
        oI = 0,
        onePerc = window.innerHeight / 200,
        meter = 0, blue = 100, yellow = 1000, red = 100,
        dropRed = 1, dropBlue = 5, dropYel = 15,
        breakValue = 60, scrollRate = 1.5,
        autoCounter = 0, manCounter = 0, dropRateCounter = 0,
        numRate = false, dropNumRate = 20, numDrop = 1, dropNumCounter = 0,
        autoYelp = 1, autoRedp = 0, autoBluep = 0,
        dropRateYelp = 1, dropRateRedp = 0, dropRateBluep = 0,
        dropNumYelp = 1, dropNumRedp = 0, dropNumBluep = 0;
    
    

    $('body').mousewheel(function(event) {
        if (event.deltaFactor >= 10) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;
        bgScroll($('.bcg1'), $('.bcg2'));
        if (nI % breakValue === 0) breakBlock();
        // console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);
    });
    
    var autoScrollBuy = document.querySelector('.autoscroll-buy');
    autoScrollBuy.addEventListener("click", autoScroll);

    // var manualBuy = document.querySelector('.manual-buy');
    // manualBuy.addEventListener("click", upgradeManualScroll);

    var dropRateBuy = document.querySelector('.dropRate-buy');
    dropRateBuy.addEventListener("click", upDropRate);

    var dropNumBuy = document.querySelector('.dropNum-buy');
    dropNumBuy.addEventListener("click", upNumDrop);

    function bgScroll(bg1, bg2) {
        if (nI - oI >= 1.25){
            bgTop = parseFloat(bg1.css('top'));
            bgTop2 = parseFloat(bg2.css('top'));
            nbPerc = (nI - oI) / scrollRate;
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
        console.log(scrollRate, breakValue);
    };

    function autoScroll() {
        if (blue >= autoBluep && yellow >= autoYelp && red >= autoRedp && autoCounter < 30) {
            if (autoCounter < 30) {
                setInterval(function() {
                    nI += autonI;
                    bgScroll($('.bcg1'), $('.bcg2'));
                    if (nI % 100 === 0) breakBlock();
                }, 50);
                autoCounter += 1;
                $('.autoscroll-counter').text(autoCounter);

                if (autoCounter % 5 === 0) upgradeManualScroll();
            }
            
            yellow = yellow - autoYelp;
            blue = blue - autoBluep;
            red = red - autoRedp;
            $('.counter-2>span').text(yellow);
            $('.counter-3>span').text(blue);
            $('.counter-4>span').text(red);

            autoYelp =  Math.ceil(autoYelp * 1.6);
            autoBluep = Math.ceil(autoBluep * 1.5);
            autoRedp =  Math.ceil(autoRedp * 1.4);

            if (autoCounter === 2) autoBluep =+ 1;
            if (autoCounter === 5) autoRedp =+ 1;
            if (autoCounter === 30) {
                $('.auto-yel-price span').text('MAX');
                $('.auto-blue-price span').text('MAX');
                $('.auto-red-price span').text('MAX');
            } else {
                $('.auto-yel-price span').text(autoYelp);
                $('.auto-blue-price span').text(autoBluep);
                $('.auto-red-price span').text(autoRedp);
            }
        }
    };

    function upgradeManualScroll() {
        scrollRate = ((breakValue - 5) * scrollRate) / breakValue;
        breakValue -= 5;
        console.log(scrollRate, breakValue);
        manCounter += 1;
        $('.manual-counter').text(manCounter);
    };

    function breakBlock() {
        var x = Math.floor((Math.random() * 100));
        var y = Math.floor((Math.random() * 100));
        var z = Math.floor((Math.random() * 100));
        console.log(x,y,z);
        // console.log(dropYel,dropBlue,dropRed);

        if (x <= dropYel) {
            yellow += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    yellow += numDrop;
                }
            }
            $('.counter-2>span').text(yellow);
        }
        if (y <= dropBlue) {
            blue += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    red += numDrop;
                }
            }
            $('.counter-3>span').text(blue);
        }
        if (z <= dropRed) {
            red += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    red += numDrop;
                }
            }
            $('.counter-4>span').text(red);
        }

        meter += 1;
        $('.counter-1>span').text(meter);

    };

    function upDropRate() {
        if (blue >= dropRateBluep && yellow >= dropRateYelp && red >= dropRateRedp && dropRateCounter < 100) {
            if (dropRateCounter < 100) {
                dropBlue +=1;
                dropYel +=1;
                dropRed +=1;
                dropRateCounter += 1;
                $('.dropRate-counter').text(dropRateCounter);
            }

            yellow = yellow - dropRateYelp;
            blue = blue - dropRateBluep;
            red = red - dropRateRedp;
            $('.counter-2>span').text(yellow);
            $('.counter-3>span').text(blue);
            $('.counter-4>span').text(red);

            dropRateYelp =  Math.ceil(dropRateYelp * 1.25);
            dropRateBluep = Math.ceil(dropRateBluep * 1.15);
            dropRateRedp =  Math.ceil(dropRateRedp * 1.05);

            if (dropRateYelp > 1000000) dropRateYelp = 999999;
            if (dropRateBluep > 100000) dropRateBluep = 99999;
            if (dropRateCounter === 2) dropRateBluep =+ 1;
            if (dropRateCounter === 5) dropRateRedp =+ 1;
            if (dropRateCounter === 100) {
                $('.rate-yel-price span').text('MAX');
                $('.rate-blue-price span').text('MAX');
                $('.rate-red-price span').text('MAX');
            } else {
                $('.rate-yel-price span').text(dropRateYelp);
                $('.rate-blue-price span').text(dropRateBluep);
                $('.rate-red-price span').text(dropRateRedp);
            }
        }
    }

    function upNumDrop() {
        if (blue >= dropNumBluep && yellow >= dropNumYelp && red >= dropNumRedp && dropNumCounter < 100) 
            if(dropNumCounter < 100) {
                numRate = true;
                dropNumRate +=1;
                dropNumCounter += 1;
                if (dropNumCounter % 5 === 0) numDrop =+ 1;
                $('.dropNum-counter').text(dropNumCounter);
            }
        
            yellow = yellow - dropNumYelp;
            blue = blue - dropNumBluep;
            red = red - dropNumRedp;
            $('.counter-2>span').text(yellow);
            $('.counter-3>span').text(blue);
            $('.counter-4>span').text(red);

            dropNumYelp =  Math.ceil(dropNumYelp * 1.25);
            dropNumBluep = Math.ceil(dropNumBluep * 1.15);
            dropNumRedp =  Math.ceil(dropNumRedp * 1.05);

            if (dropNumYelp > 1000000) dropNumYelp = 999999;
            if (dropNumBluep > 100000) dropNumBluep = 99999;
            if (dropNumCounter === 2) dropNumBluep =+ 1;
            if (dropNumCounter === 5) dropNumRedp =+ 1;
            if (dropNumCounter === 100) {
                $('.num-yel-price span').text('MAX');
                $('.num-blue-price span').text('MAX');
                $('.num-red-price span').text('MAX');
            } else {
                $('.num-yel-price span').text(dropNumYelp);
                $('.num-blue-price span').text(dropNumBluep);
                $('.num-red-price span').text(dropNumRedp);
            }
        }


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