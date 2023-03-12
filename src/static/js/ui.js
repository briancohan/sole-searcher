const INSOLE = 'Insole Length'
const NOMINAL = 'Nominal Size'
const HEIGHT = 'Subject Height'

const wordMap = {
    'insole': INSOLE,
    'shoeSize': NOMINAL,
    'height': HEIGHT
}

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

const graphData = (data) => {
    const line_trace_properties = {
        mode: 'lines+markers',
        type: 'scatter',
        line: {
            color: '#CABC9E',
            width: 20,
        },
        marker: {
            color: '#CABC9E',
            size: 20,
        },
        showlegend: false
    }
    const dot_trace_properties = {
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: '#758063',
            size: 18,
        },
        showlegend: false
    }

    var output = []

    if (data.insole) {
        output.push({
            x: [data.insole.lower, data.insole.upper],
            y: [INSOLE, INSOLE],
            ...line_trace_properties
        });
        output.push({
            x: [data.insole.avg],
            y: [INSOLE],
            ...dot_trace_properties
        })
    }

    if (data.shoeSize) {
        output.push({
            x: [data.shoeSize.lower, data.shoeSize.upper],
            y: [NOMINAL, NOMINAL],
            ...line_trace_properties
        });
        output.push({
            x: [data.shoeSize.avg],
            y: [NOMINAL],
            ...dot_trace_properties
        })
    }

    if (data.height) {
        // output.push({
        //     x: [data.height.lower, data.height.upper],
        //     y: [HEIGHT, HEIGHT],
        //     ...line_trace_properties
        // });
        output.push({
            x: [data.height.avg],
            y: [HEIGHT],
            ...dot_trace_properties
        })
    }

    return output;
}

const graphLayout = (data) => {
    var categories = []
    var annotations = []

    const annotationOpts = {
        xref: 'x',
        yref: 'y',
        showarrow: false,
        yanchor: 'bottom',
        yshift: 12,
        font: { color: 'white', size: 14 },
        xanchor: 'center'
    }

    // Height
    if (data.height) {
        categories.push(HEIGHT)
        console.log("annotating")
        annotations.push({
            ...annotationOpts,
            y: HEIGHT,
            x: parseInt(data.height.avg),
            text: parseInt(data.height.avg),
        })
    }

    // Shoe Size
    if (data.shoeSize) {
        categories.push(NOMINAL)
        annotations.push({
            ...annotationOpts,
            y: NOMINAL,
            x: parseInt(data.shoeSize.avg),
            text: parseInt(data.shoeSize.avg),
        })
        annotations.push({
            ...annotationOpts,
            y: NOMINAL,
            x: parseInt(data.shoeSize.lower),
            text: parseInt(data.shoeSize.lower),

        })
        annotations.push({
            ...annotationOpts,
            y: NOMINAL,
            x: parseInt(data.shoeSize.upper),
            text: parseInt(data.shoeSize.upper),
        })
    }

    // Insole Length
    if (data.insole) {
        categories.push(INSOLE)
        annotations.push({
            ...annotationOpts,
            y: INSOLE,
            x: parseInt(data.insole.avg),
            text: parseInt(data.insole.avg),
        })
        annotations.push({
            ...annotationOpts,
            y: INSOLE,
            x: parseInt(data.insole.lower),
            text: parseInt(data.insole.lower),
        })
        annotations.push({
            ...annotationOpts,
            y: INSOLE,
            x: parseInt(data.insole.upper),
            text: parseInt(data.insole.upper),
        })
    }

    console.log(annotations)
    return {
        title: 'Predicted Ranges by Metric - mm',
        xaxis: {
            showgrid: false,
            visible: false,
        },
        yaxis: {
            categoryarray: categories,
            showgrid: false,
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#CABC9E',
        },
        height: 50 + (60 * categories.length),
        margin: {
            l: 100,
            r: 0,
            t: 30,
            b: 0,
            pad: 10,
        },
        annotations: annotations,
    }
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
    document.querySelector('#db-shod-lower-mm').textContent = parseInt(result.shod[result.shod.best].lower)
    document.querySelector('#db-shod-upper-mm').textContent = parseInt(result.shod[result.shod.best].upper)
    document.querySelector('#db-unshod-lower-mm').textContent = parseInt(result.unshod[result.unshod.best].lower)
    document.querySelector('#db-unshod-upper-mm').textContent = parseInt(result.unshod[result.unshod.best].upper)

    document.querySelector('#db-shod-lower-in').innerHTML = floatToFraction(convert(result.shod[result.shod.best].lower, 'mm', 'in'))
    document.querySelector('#db-shod-upper-in').innerHTML = floatToFraction(convert(result.shod[result.shod.best].upper, 'mm', 'in'))
    document.querySelector('#db-unshod-lower-in').innerHTML = floatToFraction(convert(result.unshod[result.unshod.best].lower, 'mm', 'in'))
    document.querySelector('#db-unshod-upper-in').innerHTML = floatToFraction(convert(result.unshod[result.unshod.best].upper, 'mm', 'in'))

    document.querySelector('#shod-best').textContent = wordMap[result.shod.best]
    document.querySelector('#unshod-best').textContent = wordMap[result.unshod.best]

    Plotly.newPlot('shodGraph', graphData(result.shod), graphLayout(result.shod), { staticPlot: true });
    Plotly.newPlot('unshodGraph', graphData(result.unshod), graphLayout(result.unshod), { staticPlot: true });

}
updatePage()

insole.addEventListener('keyup', updatePage)
nominal.addEventListener('keyup', updatePage)
height.addEventListener('keyup', updatePage)
insoleUnit.addEventListener('change', updatePage)
nominalCategory.addEventListener('change', updatePage)
heightUnit.addEventListener('change', updatePage)
sex.addEventListener('change', updatePage)
