function calculate(insoleLength, shoeSize, shoeGender, height, sex) {
    console.log("COMPUTING")
    console.log({ insoleLength, shoeSize, shoeGender, height, sex })
    returnObj = { 'shod': {}, 'unshod': {} };
    if (height) {
        console.log("let's figure stuff from height")
        returnObj.shod.height = calculateShodFromHeight(height, sex);
        returnObj.unshod.height = calculateUnshodFromHeight(height, sex);
        returnObj.shod.best = 'height';
        returnObj.unshod.best = 'height';
    }
    if (shoeSize) {
        console.log("let's figure stuff from nominal")
        returnObj.shod.shoeSize = calculateShodFromShoeSize(shoeSize, shoeGender);
        returnObj.unshod.shoeSize = calculateUnshodFromShoeSize(shoeSize, shoeGender);
        returnObj.shod.best = 'shoeSize';
        returnObj.unshod.best = 'shoeSize';
    }
    if (insoleLength) {
        console.log("let's figure stuff from insole")
        returnObj.shod.insole = calculateShodFromInsole(insoleLength);
        returnObj.unshod.insole = calculateUnshodFromInsole(insoleLength);
        returnObj.shod.best = 'insole';
        returnObj.unshod.best = 'insole';
    }
    return returnObj;
}

/*       INSOLE      */
function calculateUnshodFromInsole(insoleLength) {
    return {
        lower: calculateLowerUnshodFromInsole(insoleLength),
        upper: calculateUpperUnshodFromInsole(insoleLength),
        avg: calculateAvgUnshodFromInsole(insoleLength)
    };
}

function calculateShodFromInsole(insoleLength) {
    return {
        lower: calculateLowerShodFromInsole(insoleLength),
        upper: calculateUpperShodFromInsole(insoleLength),
        avg: calculateAvgShodFromInsole(insoleLength)
    };
}

function calculateAvgShodFromInsole(insoleLength) {
    return (1.03 * insoleLength) + 18;
}

function calculateAvgUnshodFromInsole(insoleLength) {
    return (0.92 * insoleLength) + 12;
}

function calculateLowerShodFromInsole(insoleLength) {
    return (insoleLength * 1.03) - 4.55;
}

function calculateUpperShodFromInsole(insoleLength) {
    return (insoleLength * 1.03) + 40.56;
}

function calculateLowerUnshodFromInsole(insoleLength) {
    return calculateLowerShodFromInsole(insoleLength) -
        (calculateAvgShodFromInsole(insoleLength) - calculateAvgUnshodFromInsole(insoleLength));
}

function calculateUpperUnshodFromInsole(insoleLength) {
    return calculateUpperShodFromInsole(insoleLength) -
        (calculateAvgShodFromInsole(insoleLength) - calculateAvgUnshodFromInsole(insoleLength));
}

/*     SHOE SIZE    */
function calculateUnshodFromShoeSize(shoeSize, shoeType) {
    switch(shoeType) {
        case 'm':
            return { avg: (6.169578261 * shoeSize) + 212, upper: (6.16961913 * shoeSize) + 236, lower: (6.169538261 * shoeSize) + 189};
            break;
        case 'w':
            return { avg: (6.361212 * shoeSize) + 203, upper: (6.361212 * shoeSize) + 223, lower: (6.361212 * shoeSize) + 178 };
            break;
        case 'y':
            return { avg: (6.242857143 * shoeSize) + 134, upper: (6.242857143 * shoeSize) + 155, lower: (6.242857143 * shoeSize) + 110}
            break;
    }
}

function calculateShodFromShoeSize(shoeSize, shoeType) {
    switch (shoeType) {
        case 'm':
            return { avg: (8.6 * shoeSize) + 215, lower: ((8.499565882 * shoeSize) + 192), upper: ((8.440527059 * shoeSize) + 237) };
            break;
        case 'w':
            return { avg: (9.8 * shoeSize) + 192, lower: ((9.687246 * shoeSize) + 170), upper: ((9.918858 * shoeSize) + 215)};
            break;
        case 'y':
            return { avg: (8.7 * shoeSize) + 105, lower: ((8.732732727 * shoeSize) + 93), upper: ((8.737778182 * shoeSize) +117)};
            break;
    }
}

/*     HEIGHT      */
function calculateShodFromHeight(height, sex) {
    return { lower: 20000, upper: 20000, avg: calculateShodAvgFromHeight(height, sex) };
}

function calculateUnshodFromHeight(height, sex) {
    return { lower: 20000, upper: 20000, avg: calculateUnshodAvgFromHeight(height, sex) };
}

function calculateShodAvgFromHeight(height, sex) {
    switch (sex) {
        case 'm':
            return 10 * (((height / 10) - 82) / 3.447);
            break;
        case 'f':
            return 10 * (((B10 / 10) - 75) / 3.614);
            break;
    }
}

function calculateUnshodAvgFromHeight(height, sex) {
    return 1.06 * calculateShodAvgFromHeight(height, sex) - 4.64;
}
