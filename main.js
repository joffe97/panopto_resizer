const MOVELEFT_KEY = "KeyA";
const MOVERIGHT_KEY = "KeyD";
const STEP = 10;

let screen_ratio = 50;


function hide_asides() {
    for (let aside of document.getElementsByTagName("aside")) {
        aside.style.display = "none";
    }
}

function set_left_side_height() {
    height = document.getElementById("viewerContent").style.height;
    for (let htmlElement of [document.getElementById("leftPlayerContainer"), document.getElementById("primaryPlayer")]) {
        htmlElement.style.height = height;
    }
}

function set_video_screen_to_adjust(htmlElement) {
    htmlElement.style.marginTop = 0;
    htmlElement.style.marginLeft = 0;
    htmlElement.style.left = 0;
    htmlElement.style.top = 0;
    htmlElement.style.width = "100%";
    htmlElement.style.height = "100%";
}

function set_right_side_width(width) {
    set_video_screen_to_adjust(document.getElementById("secondaryScreen"));
    for (htmlElement of [
        document.getElementById("playControlsWrapper"), 
        document.getElementById("thumbnailList"), 
        document.getElementById("rightPlayersContainer"), 
        ...document.getElementsByClassName("secondary-content")
    ]) {
        htmlElement.style.width = `${width}px`
    }
}

function set_left_side_width(width) {
    hide_asides();
    set_left_side_height();
    set_video_screen_to_adjust(document.getElementById("primaryScreen"));
    document.getElementById("leftPane").style.maxWidth = `${width}px`;
    for (htmlElement of [document.getElementById("leftPane"), document.getElementById("leftPlayerContainer"), document.getElementById("primaryPlayer")]) {
        htmlElement.style.width = `${width}px`;
    }
}

function set_screen_ratio(screen_ratio) {
    totalWidth = window.visualViewport.width;
    leftWidth = totalWidth * screen_ratio * 0.01;
    rightWidth = totalWidth * (100 - screen_ratio) * 0.01;
    set_left_side_width(leftWidth);
    set_right_side_width(rightWidth);
}

function reset_screen_ratio() {
    set_screen_ratio(screen_ratio);
}

function change_screen_ratio_in_direction(direction) {
    raw_screen_ratio = screen_ratio + (direction * STEP);
    boundary_list = [0, raw_screen_ratio, 100];
    boundary_list.sort((a, b) => a - b);
    screen_ratio = boundary_list[1];
    set_screen_ratio(screen_ratio);
}

function key_down(e) {
    switch (e.code) {
        case MOVELEFT_KEY:
            change_screen_ratio_in_direction(-1);
            break;
        case MOVERIGHT_KEY:
            change_screen_ratio_in_direction(1);
            break;
        default:
            return;
    }
}

let body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown", key_down);
body.addEventListener("resize", reset_screen_ratio);
document.getElementById("toggleThumbnailsButton").addEventListener("click", reset_screen_ratio);
