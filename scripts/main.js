$(document).ready(function(){

var planet1 = { couche1 : {
                    bg1: $(".pla1Lay1-1"),
                    bg2: $(".pla1Lay1-2"),
              },
                couche2 : {
                    bg1: $(".pla1Lay2-1"),
                    bg2: $(".pla1Lay2-2"),
              },
                couche3 : {
                    bg1: $(".pla1Lay3-1"),
                    bg2: $(".pla1Lay3-2"),
              }
};

var planet2 = { couche1 : {
                    bg1: $(".pla2Lay1-1"),
                    bg2: $(".pla2Lay1-2"),
              },
                couche2 : {
                    bg1: $(".pla2Lay2-1"),
                    bg2: $(".pla2Lay2-2"),
              },
                couche3 : {
                    bg1: $(".pla2Lay3-1"),
                    bg2: $(".pla2Lay3-2"),
              }
};

var planet3 = { couche1 : {
                    bg1: $(".pla3Lay1-1"),
                    bg2: $(".pla3Lay1-2"),
              },
                couche2 : {
                    bg1: $(".pla3Lay2-1"),
                    bg2: $(".pla3Lay2-2"),
              },
                couche3 : {
                    bg1: $(".pla3Lay3-1"),
                    bg2: $(".pla3Lay3-2"),
              }
};

var canvas  = document.querySelector( 'canvas' ),
    context = canvas.getContext( '2d' ),
    toolImg = document.querySelector(".toolImg"),
    playAnimation = false;

resize();

var nI = 0, autonI = 1.25,
    oI = 0,
    onePerc = window.innerHeight / 200,
    meter = 0, blue = 0, yellow = 0, red = 0,
    dropRed = 2, dropBlue = 10, dropYel = 30,
    breakValue = 60, scrollRate = 1.5,
    autoCounter = 0, manCounter = 0, dropRateCounter = 0,
    numRate = false, dropNumRate = 20, numDrop = 1, dropNumCounter = 0,
    autoYelp = 1, autoRedp = 0, autoBluep = 0,
    dropRateYelp = 1, dropRateRedp = 0, dropRateBluep = 0,
    dropNumYelp = 1, dropNumRedp = 0, dropNumBluep = 0,
    toolCounter = 0, toolYelp = 0, toolBluep = 0, toolRedp =0,
    transiScroll = false, 
    transiCounter = 1, planCounter = 1,
    toolYelp = 30, toolBluep = 10, toolRedp = 2, toolCounter = 1, toolVerif1 = false, toolVerif2 = false;


    var curBg1 = planet3.couche3.bg1,
        curBg2 = planet3.couche3.bg2;

    $('body').mousewheel(function(event) {
        if (event.deltaFactor >= 10) event.deltaFactor = event.deltaFactor / 40;
        if (event.deltaY <= -1) nI+=event.deltaFactor;
        bgScroll(curBg1, curBg2);
        if (nI % breakValue === 0) breakBlock();
        // console.log(event.deltaX, event.deltaY, event.deltaFactor, nI);
    });

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
            if ( bgTop <= -(onePerc * 200) && transiScroll === false ) {
                bg1.css('top', ((onePerc * 200) - onePerc) +'px');
            };
            if ( bgTop2 <= -(onePerc * 200)){
                bg2.css('top', ((onePerc * 200) - onePerc) +'px');
            };

            playAnimation = true;
        };
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

    var autoScrollBuy = document.querySelector('.autoscroll-buy');
    autoScrollBuy.addEventListener("click", autoScroll);

    var dropRateBuy = document.querySelector('.dropRate-buy');
    dropRateBuy.addEventListener("click", upDropRate);

    var dropNumBuy = document.querySelector('.dropNum-buy');
    dropNumBuy.addEventListener("click", upNumDrop);

    var toolBuy = document.querySelector('.tool-buy');
    toolBuy.addEventListener("click", upTool);

    function breakBlock() {
        var x = Math.floor((Math.random() * 100));
        var y = Math.floor((Math.random() * 100));
        var z = Math.floor((Math.random() * 100));

        if (x <= dropYel) {
            yellow += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    yellow += numDrop;
                }
            }
            document.querySelector('.counter-2>span').innerHTML = yellow;
        }
        if (y <= dropBlue) {
            blue += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    red += numDrop;
                }
            }
            document.querySelector('.counter-3>span').innerHTML = blue;
        }
        if (z <= dropRed) {
            red += 1;
            if (numRate = true) {
                var w = Math.floor((Math.random() * 100));
                if (w <= dropNumRate) {
                    red += numDrop;
                }
            }
            document.querySelector('.counter-4>span').innerHTML = red;
        }

        meter += 1;
        document.querySelector('.counter-1>span').innerHTML = meter;

        if (meter % 500 === 0 && meter != 0) {
            transitionBg();
        }

    };

    function upDropRate() {
        if (blue >= dropRateBluep && yellow >= dropRateYelp && red >= dropRateRedp && dropRateCounter < 100) {
            if (dropRateCounter < 100) {
                dropBlue +=1;
                dropYel +=1;
                dropRed +=1;
                dropRateCounter += 1;
                document.querySelector('.dropRate-counter').innerHTML = dropRateCounter;
            }

            yellow = yellow - dropRateYelp;
            blue = blue - dropRateBluep;
            red = red - dropRateRedp;
            document.querySelector('.counter-2>span').innerHTML = yellow;
            document.querySelector('.counter-3>span').innerHTML = blue;
            document.querySelector('.counter-4>span').innerHTML = red;

            dropRateYelp =  Math.ceil(dropRateYelp * 1.25);
            dropRateBluep = Math.ceil(dropRateBluep * 1.15);
            dropRateRedp =  Math.ceil(dropRateRedp * 1.05);

            if (dropRateYelp > 1000000) dropRateYelp = 999999;
            if (dropRateBluep > 100000) dropRateBluep = 99999;
            if (dropRateCounter === 2) dropRateBluep =+ 1;
            if (dropRateCounter === 5) dropRateRedp =+ 1;
            if (dropRateCounter === 100) {
                document.querySelector('.rate-yel-price span').innerHTML = 'MAX';
                document.querySelector('.rate-blue-price span').innerHTML = 'MAX';
                document.querySelector('.rate-red-price span').innerHTML = 'MAX';
            } else {
                document.querySelector('.rate-yel-price span').innerHTML = dropRateYelp;
                document.querySelector('.rate-blue-price span').innerHTML = dropRateBluep;
                document.querySelector('.rate-red-price span').innerHTML = dropRateRedp;
            }
        }
    }

    function upNumDrop() {
        if (blue >= dropNumBluep && yellow >= dropNumYelp && red >= dropNumRedp && dropNumCounter < 100) {
            if(dropNumCounter < 100) {
                numRate = true;
                dropNumRate +=1;
                dropNumCounter += 1;
                if (dropNumCounter % 5 === 0) numDrop =+ 1;
                document.querySelector('.dropNum-counter').innerHTML = dropNumCounter;
            }
        
            yellow = yellow - dropNumYelp;
            blue = blue - dropNumBluep;
            red = red - dropNumRedp;
            document.querySelector('.counter-2>span').innerHTML = yellow;
            document.querySelector('.counter-3>span').innerHTML = blue;
            document.querySelector('.counter-4>span').innerHTML = red;

            dropNumYelp =  Math.ceil(dropNumYelp * 1.25);
            dropNumBluep = Math.ceil(dropNumBluep * 1.15);
            dropNumRedp =  Math.ceil(dropNumRedp * 1.05);

            if (dropNumYelp > 1000000) dropNumYelp = 999999;
            if (dropNumBluep > 100000) dropNumBluep = 99999;
            if (dropNumCounter === 2) dropNumBluep =+ 1;
            if (dropNumCounter === 5) dropNumRedp =+ 1;
            if (dropNumCounter === 100) {
                document.querySelector('.num-yel-price span').innerHTML = 'MAX';
                document.querySelector('.num-blue-price span').innerHTML = 'MAX';
                document.querySelector('.num-red-price span').innerHTML = 'MAX';
            } else {
                document.querySelector('.num-yel-price span').innerHTML = dropNumYelp;
                document.querySelector('.num-blue-price span').innerHTML = dropNumBluep;
                document.querySelector('.num-red-price span').innerHTML = dropNumRedp;
            }
        }
    }

    function upTool() {
        if (blue >= toolBluep && yellow >= toolYelp && red >= toolRedp && toolCounter < 3) {
            if (toolCounter === 1) {
                yellow -= toolYelp;
                red -=toolRedp;
                blue -= toolBluep;
                toolImg.src = "assets/img/tools/outil-2.png";
                toolCounter += 1;
                toolVerif1 = true;
                toolYelp = 3000;
                toolBluep = 1000;
                toolRedp = 200;
                document.querySelector('.tool-yel-price span').innerHTML = toolYelp;
                document.querySelector('.tool-blue-price span').innerHTML = toolBluep;
                document.querySelector('.tool-red-price span').innerHTML = toolRedp;
            }else if (toolCounter === 2) {
                yellow -= toolYelp;
                red -=toolRedp;
                blue -= toolBluep;
                toolImg.src = "assets/img/tools/outil-3.png";
                toolVerif2 = true;
                document.querySelector('.tool-yel-price span').innerHTML = 'MAX';
                document.querySelector('.tool-blue-price span').innerHTML = 'MAX';
                document.querySelector('.tool-red-price span').innerHTML = 'MAX';
            }
        }
    }

    function transitionBg() {
        curBg1.style.top = ((onePerc * 200) - onePerc) +'px';
        curBg2.style.top = ((onePerc * 200) - onePerc) +'px';
        console.log(transiCounter, planCounter);

        transiCounter += 1;

        if (transiCounter > 3) {
            transiCounter = 1;
            planCounter += 1;
            // if (toolVerif1 && planCounter === 2) planCounter += 1;
            // if (toolVerif2 && planCounter === 3) planCounter += 1;
        };
        if (planCounter > 3) {
            planCounter = 1;
        };

        if (planCounter === 1) {
                 if (transiCounter === 1){ curBg1 = planet1.couche1.bg1; curBg2 = planet1.couche1.bg2; bgScreen.style.background = "#c8a97d"}
            else if (transiCounter === 2){ curBg1 = planet1.couche2.bg1; curBg2 = planet1.couche2.bg2; bgScreen.style.background = "#514131"}
            else if (transiCounter === 3){ curBg1 = planet1.couche3.bg1; curBg2 = planet1.couche3.bg2; bgScreen.style.background = "#c20000"};
        }
        else if (planCounter === 2) {
                 if (transiCounter === 1){ curBg1 = planet2.couche1.bg1; curBg2 = planet2.couche1.bg2; bgScreen.style.background = "#ffc0e3"}
            else if (transiCounter === 3){ curBg1 = planet2.couche3.bg1; curBg2 = planet2.couche3.bg2; bgScreen.style.background = "#8b3e72"}
            else if (transiCounter === 2){ curBg1 = planet2.couche2.bg1; curBg2 = planet2.couche2.bg2; bgScreen.style.background = "#452d3d"};
        }
        else if (planCounter === 3) {
                 if (transiCounter === 1){ curBg1 = planet3.couche1.bg1; curBg2 = planet3.couche1.bg2; bgScreen.style.background = "#2e2d3d";}
            else if (transiCounter === 2){ curBg1 = planet3.couche2.bg1; curBg2 = planet3.couche2.bg2; bgScreen.style.background = "#898e92";}
            else if (transiCounter === 3){ curBg1 = planet3.couche3.bg1; curBg2 = planet3.couche3.bg2; bgScreen.style.background = "#859eb2";};
        };
    }

function resize(){
    var iw = window.innerWidth,
        ih = window.innerHeight + 30,
        bgs = document.querySelectorAll(".bcgImg");
    canvas.width = iw;
    canvas.height = ih;
    toolImg.style.width = (iw * 12.5)/100 +"px";
    for (i=0 ; i < bgs.length ; i++){
        bgs[i].style.width = iw + "px";
        bgs[i].style.height = ih + "px";
    };
};

var mouse = { x: 0, y: 0 };
mouse.x = (window.innerWidth / 2) - 10;
mouse.y = (window.innerWidth * 12.5)/100 - 20;

var particles = [];

var roll = 0;

function coloroll()
{
    var x =' '
    roll = Math.random();
    if(roll <0.75){
        x = '#22368A'
        //console.log('ground')
    }else{
        x = '#3A5F94'
    }
    return x;
}

function add_particle()
{
    
    var particle        = {};
    particle.color = coloroll();
    particle.x          = mouse.x;
    particle.y          = mouse.y;
    particle.velocity   = {};
    particle.velocity.x = Math.random() * 9 - 3;
    particle.velocity.y = -6
    
    particle.radius = Math.random() * 30 + 20;

    if(playAnimation) particles.push( particle );
}

function update_particles()
{
    for( var i = 0; i < particles.length; i++ )
    {
        var _particle = particles[ i ];

        _particle.x += _particle.velocity.x;
        _particle.y += _particle.velocity.y;

        if( _particle.x < 0 || _particle.x > canvas.width || _particle.y < 0 || _particle.y > canvas.height )
        {
            particles.splice( i, 1 );
            i--;
        }
        _particle.velocity.y = (_particle.velocity.y+1)^2;     
    }
}

function draw_particles()
{
    context.clearRect( 0, 0, canvas.width, canvas.height );

    for( var i = 0; i < particles.length; i++ )
    {
        var _particle = particles[ i ];

        context.beginPath();
        context.rect( _particle.x, _particle.y, _particle.radius, _particle.radius);
        context.fillStyle = _particle.color;
        context.fill();
    }
}

loop();

function loop(){

        window.requestAnimationFrame( loop );
        add_particle();
        update_particles();
        draw_particles();
        coloroll(1);
        // console.log(mouse.x, mouse.y);
        setTimeout(function(){
            playAnimation = false;
        }, 5);
}

});