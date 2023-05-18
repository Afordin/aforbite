
/**
 * Check if the mouse is on the left side of the screen
 * 
 * @param {number} x a position on the screen in horizontal direction
 * @returns {boolean} true if the mouse is on the left side of the screen
 */
function isLeftSide(x) {
    return x < window.outerWidth / 2;
}

function getAngleFrom(x, y) {
    const rad = Math.atan2(x, y);
    const deg = (rad * 180 / Math.PI) * -1;
    return deg;
}

const BITE_DISTANCE = 160;
const START_DISTANCE = 500;

function getDistancePercentage(distance) {
    let dist = ((START_DISTANCE - distance) * 100) / (START_DISTANCE - BITE_DISTANCE);
    return Math.max(0, Math.min(100, dist));
}

window.onload = function() {
    // the div that encapsulates the video
    const encap = document.getElementById('encap');
    // the video element
    const videoBite = document.getElementById('bite');
    // the audio element
    const audioBite = document.getElementById('bite-audio');

    var bitePlayed = false;
    /**
     * Get the position of the mouse
     * 
     * @param {MouseEvent} ev the mouse event
     */
    window.onmousemove = function(ev) {
        const centerX = encap.offsetLeft + encap.clientWidth / 2;
        const centerY = encap.offsetTop + encap.clientHeight / 2;
        const x = ev.clientX - centerX;
        const y = ev.clientY - centerY;
        const deg = getAngleFrom(x, y);

        if (isLeftSide(ev.clientX)) {
            encap.style.transform = `rotate(${deg-90}deg)`;
        } else {
            encap.style.transform = `rotate(${deg-90}deg) scaleY(-1)`;
        }

        // get distance from mouse to center
        const distance = Math.sqrt(x*x + y*y);
        const perc = getDistancePercentage(distance);

        videoBite.currentTime = (perc / 100) * videoBite.duration;
        if (videoBite.currentTime == videoBite.duration && bitePlayed == false) {
            bitePlayed = true;
            audioBite.play();
        }
        else if (videoBite.currentTime < videoBite.duration) {
            bitePlayed = false;
        }
    }
}
