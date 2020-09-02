const colorsMonochromeLight = [
    document.querySelector('.colors-monochrome--light__90'),
    document.querySelector('.colors-monochrome--light__80'),
    document.querySelector('.colors-monochrome--light__70'),
    document.querySelector('.colors-monochrome--light__60'),
    document.querySelector('.colors-monochrome--light__50'),
]

const colorsMonochromeDark = [
    document.querySelector('.colors-monochrome--dark__20'),
    document.querySelector('.colors-monochrome--dark__40'),
    document.querySelector('.colors-monochrome--dark__60'),
    document.querySelector('.colors-monochrome--dark__80'),
    document.querySelector('.colors-monochrome--dark__100'),
]

function loadColorArray(hue) {
    let colorArrayLight = [];
    let colorArrayDark = [];

    for (let i = 0; i < 5; i++) {
        colorArrayLight.push(`hsl(${hue}, 100%, ${50 + (i * 10)}%`);
        colorArrayDark.push(`hsl(${hue}, ${100 - (i * 20)}%, 50%`);
    }

    loadColorDisplay(colorArrayLight, colorArrayDark);
}

function loadColorDisplay(light, dark) {
    for (let i = 0; i < 5; i++) {
        colorsMonochromeLight[i].style.backgroundColor = light.pop();
        colorsMonochromeDark[i].style.backgroundColor = dark.pop();
    }
}

function HSLToHex(hsl) {
    let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
    if (ex.test(hsl)) {
        let sep = hsl.indexOf(",") > -1 ? "," : " ";
        hsl = hsl.substr(4).split(")")[0].split(sep);

        let h = hsl[0],
            s = hsl[1].substr(0,hsl[1].length - 1) / 100,
            l = hsl[2].substr(0,hsl[2].length - 1) / 100;

        // strip label and convert to degrees (if necessary)
        if (h.indexOf("deg") > -1)
            h = h.substr(0,h.length - 3);
        else if (h.indexOf("rad") > -1)
            h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
        else if (h.indexOf("turn") > -1)
            h = Math.round(h.substr(0,h.length - 4) * 360);
        if (h >= 360)
            h %= 360;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        // having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        // prepend 0s if necessary
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;

    } else {
        return "Invalid input color";
    }
}

function hexLabel(div) {
    const colorElement = document.querySelector(div);
    const hslValue = colorElement.style.backgroundColor;
    const span = document.querySelector(colorElement + " hex");
    span.innerHTML = HSLToHex(hslValue);
}