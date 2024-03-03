 

function currentAnteena(ant) {
    document.GetElementById().value = ant;
}

function changeChannel() {
    var rotateCSS = '';
    if (CurrentChannel == 5) {
        CurrentChannel = 0;
        CurrentChannelAngle = 0;
        rotateCSS = 'rotate(0deg)';
    }
    else {
        CurrentChannel += 1;
        CurrentChannelAngle += 60;
        rotateCSS = 'rotate(' + CurrentChannelAngle + 'deg)';
    }

    setChannel(CurrentChannel);

    $('.adjustBar').css({
        '-moz-transform': rotateCSS,
        '-webkit-transform': rotateCSS
    })
}

function adjustAnteena() {
    if ((leftAnteenaAngle <= 310 && leftAnteenaAngle >= 300) && (rightAnteenaAngle <= 50 && rightAnteenaAngle >= 40)) {
        return 100;
    }
    else if ((leftAnteenaAngle <= 310 && leftAnteenaAngle >= 300) && (rightAnteenaAngle > 50 || rightAnteenaAngle < 40)) {
        return 50;
    }
    else if ((rightAnteenaAngle <= 50 && rightAnteenaAngle >= 40) && (leftAnteenaAngle > 310 || leftAnteenaAngle < 300)) {
        return 50;
    }
    else {
        return 0;
    }
}

function setChannel(CurrentChannel) {
    switch (CurrentChannel) {
        case 0:
            shutDown();
            $(".shutDownScreen").toggleClass("shutDownScreenAnimating");
            break;
        case 1:
            if (adjustAnteena() == 100) {
                document.getElementById('divScreen').innerHTML = '<img src="https://thumbs.gfycat.com/KlutzyUnselfishHorsemouse-small.gif" alt="Loading or Image not available" />';
            }
            else if (adjustAnteena() == 50) {
                document.getElementById('divScreen').innerHTML = '<img src="https://i.gifer.com/origin/16/16cbd22fedcf9a9899b6c2c6b505d512_w200.gif" alt="Loading or Image not available" />';
            }
            else {
                document.getElementById('divScreen').innerHTML = '<img src="https://media.tenor.com/images/3db908fbcf871cbc0193c8409578f882/tenor.gif" alt="Loading or Image not available" />';
            }
            break;
        case 2:
            if (adjustAnteena() == 100) {
                document.getElementById('divScreen').innerHTML = '<img src="https://thumbs.gfycat.com/EasyDirectFlatfish-max-1mb.gif" alt="Loading or Image not available" />';
            }
            else if (adjustAnteena() == 50) {
                document.getElementById('divScreen').innerHTML = '<img src="https://i.gifer.com/origin/16/16cbd22fedcf9a9899b6c2c6b505d512_w200.gif" alt="Loading or Image not available" />';
            }
            else {
                document.getElementById('divScreen').innerHTML = '<img src="https://media.tenor.com/images/3db908fbcf871cbc0193c8409578f882/tenor.gif" alt="Loading or Image not available" />';
            }
            break;
        case 3:
            //document.getElementById('divScreen').innerHTML = "<div class='blockedChannel'><p>This channel is out of service for your safty.</p></div>";
            document.getElementById('divScreen').innerHTML = '<img src="https://cdn.dribbble.com/users/719060/screenshots/5537802/lee2.gif" alt="Loading or Image not available" />';
            break;
        case 4:
            if (adjustAnteena() == 100) {
                document.getElementById('divScreen').innerHTML = '<img src="https://s-media-cache-ak0.pinimg.com/originals/21/d7/db/21d7db774e3b270b4d8c19b9be5fb8ce.gif" alt="Loading or Image not available" />';
            }
            else if (adjustAnteena() == 50) {
                document.getElementById('divScreen').innerHTML = '<img src="https://i.gifer.com/origin/16/16cbd22fedcf9a9899b6c2c6b505d512_w200.gif" alt="Loading or Image not available" />';
            }
            else {
                document.getElementById('divScreen').innerHTML = '<img src="https://media.tenor.com/images/3db908fbcf871cbc0193c8409578f882/tenor.gif" alt="Loading or Image not available" />';
            }
            break;
        case 5:
            if (adjustAnteena() == 100) {
                document.getElementById('divScreen').innerHTML = '<img src="https://media3.giphy.com/media/1ZrclCM6lGNRC/200w.gif" alt="Loading or Image not available" />';
            }
            else if (adjustAnteena() == 50) {
                document.getElementById('divScreen').innerHTML = '<img src="https://i.gifer.com/origin/16/16cbd22fedcf9a9899b6c2c6b505d512_w200.gif" alt="Loading or Image not available" />';
            }
            else {
                document.getElementById('divScreen').innerHTML = '<img src="https://media.tenor.com/images/3db908fbcf871cbc0193c8409578f882/tenor.gif" alt="Loading or Image not available" />';
            }
            break;
        default:
            break;

    }
}

function shutDown() {
    document.getElementById('divScreen').innerHTML = '<div class="shutDownScreen"></div>';
}
