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

const floatToFraction = (value, denominator = 16) => {
    const whole = Math.floor(value)
    const remain = value - whole
    let gradation = 1 / denominator
    let parts = parseInt(remain / gradation)

    while (parts % 2 == 0) {
        parts = parts / 2
        denominator = denominator / 2
    }

    return `<span class="text-xl">${whole}</span> <sup>${parts}</sup>&frasl;<sub>${denominator}</sub>`
}

const insole = document.querySelector('#insole')
const insoleUnit = document.querySelector('#insole-unit')
const nominal = document.querySelector('#nominal')
const nominalCategory = document.querySelector('#footwear-class')
const height = document.querySelector('#height')
const heightUnit = document.querySelector('#height-unit')
const sex = document.querySelector('#sex')

function updatePage() {
    const insoleLengthValue = convert(insole.value, insoleUnit.value, "mm")
    const shoeSizeValue = parseFloat(nominal.value)
    const shoeGenderValue = nominalCategory.value
    const heightValue = convert(height.value, heightUnit.value, 'mm')
    const sexValue = sex.value

    const result = calculate(
        insoleLengthValue,
        shoeSizeValue,
        shoeGenderValue,
        heightValue,
        sexValue,
    )
    console.log(result)

    // Simple Results
    document.querySelector('#db-shod-lower-mm').textContent = parseInt(result.shod.best.lower)
    document.querySelector('#db-shod-upper-mm').textContent = parseInt(result.shod.best.upper)
    document.querySelector('#db-unshod-lower-mm').textContent = parseInt(result.unshod.best.lower)
    document.querySelector('#db-unshod-upper-mm').textContent = parseInt(result.unshod.best.upper)

    document.querySelector('#db-shod-lower-in').innerHTML = floatToFraction(convert(result.shod.best.lower, 'mm', 'in'))
    document.querySelector('#db-shod-upper-in').innerHTML = floatToFraction(convert(result.shod.best.upper, 'mm', 'in'))
    document.querySelector('#db-unshod-lower-in').innerHTML = floatToFraction(convert(result.unshod.best.lower, 'mm', 'in'))
    document.querySelector('#db-unshod-upper-in').innerHTML = floatToFraction(convert(result.unshod.best.upper, 'mm', 'in'))
}
updatePage()

insole.addEventListener('keyup', updatePage)
nominal.addEventListener('keyup', updatePage)
height.addEventListener('keyup', updatePage)
insoleUnit.addEventListener('change', updatePage)
nominalCategory.addEventListener('change', updatePage)
heightUnit.addEventListener('change', updatePage)
sex.addEventListener('change', updatePage)
