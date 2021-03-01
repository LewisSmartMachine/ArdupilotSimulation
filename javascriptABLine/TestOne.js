// ref
//https://p5js.org/reference/
console.log("Hello");
var slider; // the slider element
var deg = 0;//variable for rotation
var wpALat = 350;
var wpALng = 150;
var wpBLat = 50;
var wpBLng = 250;
var backHeight = 400;
var backWidth = 400;
var wp_a_lat_et;
var wp_a_lng_et;
var wp_b_lat_et;
var wp_b_lng_et;
//Example lat -42 ^ lng 173 -->
var prog_slider;
var head_slider;
var nErr_slider;
var eErr_slider;
var spd_slider;
var l1_damp_slider;
var l1_per_slider;

var curLat = 50;
var curLng = 60;
var curLatSpd = 70;
var curLngSpd = 80;
var wpHeading;

var _L1_dist = 10;
var l1_Lng = curLng;
var l1_Lat = curLat;
var _nav_bearing;

var _latAccDem;

var test_tv;
var testString = 'Hello?';

function setup() {
    createCanvas(backHeight, backWidth);

    createSpan('A lat -');
    wp_a_lat_et = createInput('');
    wp_a_lat_et.input(newWPEvent);
    createSpan('A lng');
    wp_a_lng_et = createInput('');
    wp_a_lng_et.input(newWPEvent);
    createSpan('B lat -');
    wp_b_lat_et = createInput('');
    wp_b_lat_et.input(newWPEvent);
    createSpan('B lng');
    wp_b_lng_et = createInput('');
    wp_b_lng_et.input(newWPEvent);
    createP('progress of the slider');
    prog_slider = createSlider(0, 100, 0.5);//create slider
    prog_slider.size(200);//length of slider
    prog_slider.position(180, 450);//position of slider
    prog_slider.input(drawSpdEvent);
    createP('Heading');
    head_slider = createSlider(0, 200 * Math.PI);//create slider
    head_slider.size(200);//length of slider
    head_slider.position(180, 480);//position of slider
    head_slider.input(drawSpdEvent);
    createP('Error north');
    nErr_slider = createSlider(-200, 200, 0, 5);//create slider
    nErr_slider.size(200);//length of slider
    nErr_slider.position(180, 510);//position of slider
    nErr_slider.input(drawSpdEvent);
    createP('Error East');
    eErr_slider = createSlider(-200, 200, 0, 5);//create slider
    eErr_slider.size(200);//length of slider
    eErr_slider.position(180, 540);//position of slider
    eErr_slider.input(drawSpdEvent);
    createP('Speed');
    spd_slider = createSlider(0, 100, 20, 1);//create slider
    spd_slider.size(200);//length of slider
    spd_slider.position(180, 570);//position of slider
    spd_slider.input(drawSpdEvent);

    createP('L1 damping');
    l1_damp_slider = createSlider(60, 100, 75, 5);//create slider
    l1_damp_slider.size(200);//length of slider
    l1_damp_slider.position(180, 610);//position of slider
    l1_damp_slider.input(drawSpdEvent);

    createP('L1 period');
    l1_per_slider = createSlider(1, 600, 170, 10);//create slider
    l1_per_slider.size(200);//length of slider
    l1_per_slider.position(180, 650);//position of slider
    l1_per_slider.input(drawSpdEvent);



    newWPEvent();
    drawSpdEvent();

}

function draw() {
    background(180); //220
    translate(0, 0);//set origin of the line
    rotate(radians(deg));//rotate line function
    strokeWeight(2);
    stroke('rgb(0%,0%,0%)');
    line(wpALng, wpALat, wpBLng, wpBLat);//draw line and position

    //Speed
    stroke('rgb(70%,55%,0%)')
    line(curLng, curLat, curLngSpd, curLatSpd);

    stroke('rgb(0%,0%,0%)');
    noFill();
    circle(curLng - eErr_slider.value(), curLat + nErr_slider.value(), 3);
    circle(l1_Lng, l1_Lat, 2);
    //stroke('rgb(100%,0%,10%)');
    //line(curLng, curLat, latAccDemLng, latAccDemLat);
    //stroke('rgb(50%,50%,0%)');
    var x1 = curLng - spd_slider.value() * Math.cos(-head_slider.value() / 100.0);
    var y1 = curLat + spd_slider.value() * Math.sin(-head_slider.value() / 100.0);
    stroke('rgb(50%,10%,50%)');
    //circle(x1, y1, 2);
    var x2 = curLng;
    var y2 = curLat;
    //circle(x2, y2, 2);
    var x3 = curLngSpd + latAccDemLng - curLng;
    var y3 = curLatSpd + latAccDemLat - curLat;
    //circle(x3, y3, 2);
    var x4 = x3 + spd_slider.value() * Math.cos(radians(_nav_bearing));
    var y4 = y3 - spd_slider.value() * Math.sin(radians(_nav_bearing));
    //circle(x4, y4, 2);
    noFill();
    stroke('rgb(0%,0%,100%)');
    //curve(x1, y1, x2, y2, x3, y3, x4, y4);
    //arc(arcLng, arcLat, radius, radius, radians(head_slider.value() / 100.0), radians(head_slider.value() / 100.0 + 90), OPEN);
    var radius = spd_slider.value() * spd_slider.value() / _latAccDem;
    var circleCenterLat = curLat - Math.sin(-head_slider.value() / 100.0 + radians(90)) * radius;
    var circleCenterLng = curLng + Math.cos(-head_slider.value() / 100.0 + radians(90)) * radius;
    circle(circleCenterLng, circleCenterLat, radius * 2);
    //var startAng = -get_bearing_to(curLat, curLng, circleCenterLat, circleCenterLng) - 90;
    //var endAngle = -get_bearing_to(l1_Lat, l1_Lng, circleCenterLat, circleCenterLng) - 90;
    //arc(circleCenterLng, circleCenterLat, 2 * radius, 2 * radius, radians(startAng), radians(endAngle));


    // ---  Values ---
    //test_tv.value = testString;
    //stroke('rgb(0%,0%,0%)');
    //test_tv = text(testString, 50, 300, 100, 50);
    //testString = 'hi?';
}
function keyPressed() {
    if (keyCode === 32) {//if space bar is pressed
        deg = random(0, 100);//spin line at random angle between 0 and 100
    }
}

function newWPEvent() {
    if (gotValues()) {
        console.log('New WP ');
        wpALat = wp_a_lat_et.value();
        wpALng = wp_a_lng_et.value();
        wpBLat = wp_b_lat_et.value();
        wpBLng = wp_b_lng_et.value();
    }
}

function drawSpdEvent() {
    curLat = float(wpALat) + float(wpBLat - wpALat) * (prog_slider.value() / 100.0) - nErr_slider.value();
    curLng = float(wpALng) + float(wpBLng - wpALng) * (prog_slider.value() / 100.0) + eErr_slider.value();
    curLatSpd = curLat + spd_slider.value() * Math.sin(head_slider.value() / 100.0);
    curLngSpd = curLng + spd_slider.value() * Math.cos(head_slider.value() / 100.0);
    wpHeading = Math.atan2(wpALat - wpBLat, wpBLng - wpALng) * 180 / PI;
    l1_Lat = curLat + nErr_slider.value() - Math.sin(radians(wpHeading)) * _L1_dist
    l1_Lng = curLng - eErr_slider.value() + Math.cos(radians(wpHeading)) * _L1_dist
    update_waypoint();
    latAccDemLat = curLat - Math.sin(-head_slider.value() / 100.0 + radians(90)) * _latAccDem;
    latAccDemLng = curLng + Math.cos(-head_slider.value() / 100.0 + radians(90)) * _latAccDem;

}


function gotValues() {
    if (!isNaN(float(wp_a_lat_et.value())) && !isNaN(float(wp_a_lng_et.value())) && !isNaN(float(wp_b_lat_et.value())) && !isNaN(float(wp_b_lng_et.value()))) {
        return true;
    }
    else {
        return false;
    }
}

function update_waypoint() {
    var _L1_damping = l1_damp_slider.value() / 100.0;
    var _L1_xTrack_i_gain = 0.02;
    var _L1_period = l1_per_slider.value() / 10.0;
    var dist_min = 4;

    var K_L1 = 4.0 * _L1_damping * _L1_damping;
    var localGndSpdX = (spd_slider.value() * Math.cos(head_slider.value() / 100.0));
    var localGndSpdY = (spd_slider.value() * -Math.sin(head_slider.value() / 100.0));
    let _groundspeed_vector = { x: localGndSpdX, y: localGndSpdY };

    _target_bearing_cd = get_bearing_to(wpBLat, wpBLng, curLat, curLng);

    groundSpeed = spd_slider.value();

    _L1_dist = Math.max(0.3183099 * _L1_damping * _L1_period * groundSpeed, dist_min);

    let AB = { x: (wpBLng - wpALng), y: (-wpBLat + wpALat) };
    var AB_length = Math.sqrt(AB.x * AB.x + AB.y * AB.y);

    //AB normalize
    AB = { x: AB.x / AB_length, y: AB.y / AB_length };

    let A_air = { x: (curLng - wpALng), y: (-curLat + wpALat) };

    var _crosstrack_error = A_air.x * AB.y - A_air.y * AB.x;

    //In the else statement
    var xtrackVel = _groundspeed_vector.x * AB.y - _groundspeed_vector.y * AB.x;
    var ltrackVel = _groundspeed_vector.x * AB.y + _groundspeed_vector.y * AB.y;
    var Nu2 = Math.atan2(xtrackVel, ltrackVel) * 180 / PI;
    var sine_Nu1 = _crosstrack_error / Math.max(_L1_dist, 0.1);
    sine_Nu1 = Math.max(sine_Nu1, -0.7071);
    sine_Nu1 = Math.min(sine_Nu1, 0.7071);
    var Nu1 = Math.asin(sine_Nu1) * 180 / PI;

    //I'm not doing anything with _L1_xtrack_i

    var Nu = Nu1 + Nu2;
    // bearing (radians) from AC to L1 point
    _nav_bearing = Math.atan2(AB.y, AB.x) * 180 / PI + Nu1; // bearing (degrees) from AC to L1 point
    Nu = radians(Nu);
    Nu = Math.max(Nu, -1.5708);
    Nu = Math.min(Nu, 1.5708);
    _latAccDem = K_L1 * groundSpeed * groundSpeed / _L1_dist * Math.sin(Nu);

    console.log(_latAccDem);
}

function get_bearing_to(wpLat, wpLng, pastLat, pastLng) {
    //NE vector
    var dif_y = wpLat - pastLat;
    var dif_x = wpLng - pastLng;
    var bearing = -90 + Math.atan2(-dif_y, dif_x) * 180 / PI;
    if (bearing < 0) {
        bearing += 360;
    }

    return bearing;
}
