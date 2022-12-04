const u16c = (int) => {
    return Math.sqrt(int ** 2) % 0x10000;
};

const encrypt = (str, val) => {
    var valarr = `${val}`.split('');
    if (valarr.length == 0) {valarr = ['\u0000', '\u0000', '\u0000', '\u0000'];};
    if (valarr.length % 4) {
        for (var i = 0; i < valarr.length % 4; i++) {
            valarr.push('\u0000');
        };
    };
    var tmp = [];
    for (var i = 0; i < valarr.length; i++) {
        tmp.push(valarr[i].charCodeAt(0));
    };
    valarr = tmp;

    tmp = [];

    for (var i = 0; i < valarr.length; i++) {
        tmp.push(u16c(valarr[i] % 7 ** i ** i));
    };
    valarr = tmp;
    tmp = [[], [], [], []];

    for (var i = 0; i < valarr.length; i++) {
        tmp[i % 4] = u16c((() => {
            switch (i % 4) {
                case 2:
                    return 0x4000;
                case 0:
                    return 0x8000;
                case 1:
                    return 0xb000;
                case 3:
                    return 0x10000;
            };
        })() - valarr[i] % (i ** i));
    };

    valarr = tmp;

    var strarr = `${str}`.split('');
    var newstr = '';

    for (var i = 0; i < strarr.length; i++) {
        newstr += String.fromCharCode(u16c(strarr[i].charCodeAt(0) + valarr[i % 4]));
    };

    return newstr;
};

const decrypt = (str, val) => {
    var valarr = `${val}`.split('');
    if (valarr.length == 0) {valarr = ['\u0000', '\u0000', '\u0000', '\u0000'];};
    if (valarr.length % 4) {
        for (var i = 0; i < valarr.length % 4; i++) {
            valarr.push('\u0000');
        };
    };
    var tmp = [];
    for (var i = 0; i < valarr.length; i++) {
        tmp.push(valarr[i].charCodeAt(0));
    };
    valarr = tmp;

    tmp = [];

    for (var i = 0; i < valarr.length; i++) {
        tmp.push(u16c(valarr[i] % 7 ** i ** i));
    };
    valarr = tmp;
    tmp = [[], [], [], []];

    for (var i = 0; i < valarr.length; i++) {
        tmp[i % 4] = u16c((() => {
            switch (i % 4) {
                case 2:
                    return 0x4000;
                case 0:
                    return 0x8000;
                case 1:
                    return 0xb000;
                case 3:
                    return 0x10000;
            };
        })() - valarr[i] % (i ** i));
    };

    valarr = tmp;

    var strarr = `${str}`.split('');
    var newstr = '';

    for (var i = 0; i < strarr.length; i++) {
        newstr += String.fromCharCode(u16c(strarr[i].charCodeAt(0) - valarr[i % 4]));
    };

    return newstr;
};