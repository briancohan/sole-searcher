
const convert = (value, from, to) => {
    const factors = {
        'mm': {
            'mm': 1,
            'cm': 0.1,
            'in': 0.03937
        },
        'cm': {
            'mm': 10,
            'cm': 1,
            'in': 0.3937
        },
        'in': {
            'mm': 25.4,
            'cm': 2.54,
            'in': 1
        },
    }
    return value * factors[from][to]
}

function calculate(insoleLength, shoeSize, shoeGender, height, sex) {
    console.log("COMPUTING")
    console.log({ insoleLength, shoeSize, shoeGender, height, sex })
    returnObj = { 'shod': {}, 'unshod': {} };
    if (height) {
        console.log("let's figure stuff from height")
        returnObj.shod.height = calculateShodFromHeight(height, sex);
        returnObj.unshod.height = calculateUnshodFromHeight(height, sex);
        returnObj.shod.best = returnObj.shod.height;
        returnObj.unshod.best = returnObj.unshod.height;
    }
    if (shoeSize) {
        console.log("let's figure stuff from nominal")
        returnObj.shod.shoeSize = calculateShodFromShoeSize(shoeSize, shoeGender);
        returnObj.unshod.shoeSize = calculateUnshodFromShoeSize(shoeSize, shoeGender);
        returnObj.shod.best = returnObj.shod.shoeSize;
        returnObj.unshod.best = returnObj.unshod.shoeSize;
    }
    if (insoleLength) {
        console.log("let's figure stuff from insole")
        returnObj.shod.insole = calculateShodFromInsole(insoleLength);
        returnObj.unshod.insole = calculateUnshodFromInsole(insoleLength);
        returnObj.shod.best = returnObj.shod.insole;
        returnObj.unshod.best = returnObj.unshod.insole;
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
    return 1.03 * insoleLength + 18;
}

function calculateAvgUnshodFromInsole(insoleLength) {
    return 0.92 * insoleLength + 12;
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
    let barefootPrediction = 0.91 * shoeSize + 23;
    return { lower: 10000, upper: 10000, avg: barefootPrediction };
}

function calculateShodFromShoeSize(shoeSize, shoeType) {
    switch (shoeType) {
        case 'm':
            return { avg: (8.6 * shoeSize + 215), upper: (8.499565882 * shoeSize + 192), lower: (8.440527059 * shoeSize + 237) };
            break;
        case 'w':
            return { avg: (9.8 * shoeSize + 192), upper: 10000, lower: 10000 };
            break;
        case 'y':
            return { avg: (8.7 * shoeSize + 105), upper: 10000, lower: 10000 };
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
