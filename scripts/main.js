resize();

$(document).ready(function(){

    var nI = 0, autonI = 1.25,
        oI = 0,
        onePerc = window.innerHeight / 200,
        meter = 0, blue = 0, yellow = 0, red = 0,
        dropRed = 1, dropBlue = 5, dropYel = 15,
        breakValue = 60, scrollRate = 1.5,
        autoCounter = 0, manCounter = 0, dropRateCounter = 0,
        numRate = false, dropNumRate = 20, numDrop = 1, dropNumCounter = 0;
    
    

    $('body').mousewheel(function(event) {
        if (event.deltaFactor >= 10) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;
        bgScroll($('.bcg1'), $('.bcg2'));
        if (nI % breakValue === 0) breakBlock();
        // console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);
    });
    
    var autoScrollBuy = document.querySelector('.autoscroll-buy');
    autoScrollBuy.addEventListener("click", autoScroll);

    var manualBuy = document.querySelector('.manual-buy');
    manualBuy.addEventListener("click", upgradeManualScroll);

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
        if (autoCounter < 30) {
            setInterval(function() {
                nI += autonI;
                bgScroll($('.bcg1'), $('.bcg2'));
                if (nI % 100 === 0) breakBlock();
            }, 50);
            autoCounter += 1;
            $('.autoscroll-counter').text(autoCounter);

            if (autoCounter % 5 ===0) upgradeManualScroll();
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
                    yellow += numDrop;
                }
            }
            $('.counter-3>span').text(blue);
        }
        if (z <= dropRed) {
            red += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    yellow += numDrop;
                }
            }
            $('.counter-4>span').text(red);
        }

        meter += 1;
        $('.counter-1>span').text(meter);

    };

    function upDropRate() {
        if (dropRateCounter < 100) {
            dropBlue +=1;
            dropYel +=1;
            dropRed +=1;
        dropRateCounter += 1;
        $('.dropRate-counter').text(dropRateCounter);
        }
    }

    function upNumDrop() {
        numRate = true;
        dropNumRate +=1;
        dropNumCounter += 1;
        if (dropNumCounter % 5 === 0) numDrop =+ 1;
        $('.dropNum-counter').text(dropNumCounter);
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