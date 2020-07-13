//Función para generar un randomInt
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Función para obtener aleatorios de varios numeros
function generateManyExcludeNumbers(min, max, excludesArr, numberOfResults = 1) {
    const multiplyFactor = 2;
    let tempArr = [];
    let counterExists = 0;

    for (let i = 0; i < numberOfResults; i++) {
        const generatedNumber = getRandomInt(min, max, excludesArr);
        const existsOnTemp = tempArr.some(temp => temp === generatedNumber);
        const existsOnExclude = excludesArr.some(exclude => exclude === generatedNumber);

        if (existsOnTemp || existsOnExclude) {
            if (counterExists < (numberOfResults * multiplyFactor)) {
                i--;
            }
            counterExists++;
            continue;
        } else {
            tempArr.push(generatedNumber);
        }
    }
    return tempArr;
}

//Prevenir valores negativos
function preventNegativesValues(event) {
    const teclaMas = 'NumpadAdd'.toLowerCase();
    const teclaMenos = 'NumpadSubtract'.toLowerCase();
    const teclaPor = 'NumpadMultiply'.toLowerCase();
    const teclaDividir = 'NumpadDivide'.toLowerCase();
    const teclaSlashs = 'Slash'.toLowerCase();
    const teclaSeleccionada = event.code.toLowerCase();

    if (teclaSeleccionada == teclaMas || teclaSeleccionada == teclaMenos || teclaSeleccionada == teclaPor || teclaSeleccionada == teclaDividir || teclaSeleccionada == teclaSlashs) {
        event.preventDefault();
        return false;
    }
    return true;
}

//Evento cuando el contenido cargo
document.addEventListener('DOMContentLoaded', function () {
    //Evento cuando el formulario es enviado
    document.getElementById('generatorSMForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const loadingHtml = '<div class="lds-dual-ring"></div>';
        const processingTime = 800;
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('resultado').innerHTML = loadingHtml;
        //Obtener los valores
        const minValue = (document.getElementById('minimo').value) ? parseInt(document.getElementById('minimo').value) : 1;
        const maxValue = (document.getElementById('maximo').value) ? parseInt(document.getElementById('maximo').value) : 100;
        const quantityValue = (document.getElementById('cantidad').value) ? parseInt(document.getElementById('cantidad').value) : 1;
        const excludesValue = document.getElementById('exclusion').value;

        if (quantityValue > (maxValue - minValue)) {
            document.getElementById('resultado').innerHTML = '<span>' + '</span>';
            document.getElementById('generateBtn').disabled = false;
            return new Toast({
                message: 'La cantidad debe ser menor al rango entre el valor máximo y minimo',
                type: 'warning'
            });
        }

        //Filtrar valores no válidos
        let excludesValuesArr = (excludesValue && excludesValue != '') ? excludesValue.split(',')
            .map(value => parseInt(value))
            .filter(value => {
                return !isNaN(value) && typeof value === 'number' && value >= minValue && value <= maxValue
            })
            : [];
        excludesValuesArr = excludesValuesArr.filter((value, indice) => excludesValuesArr.indexOf(value) === indice)
        //Llamar a la función para obtener los números aleatorios
        let randomNumbers = generateManyExcludeNumbers(minValue, maxValue, excludesValuesArr, quantityValue);

        //Mostrar el resultado
        setTimeout(() => {
            document.getElementById('exclusion').value = excludesValuesArr.toString();
            document.getElementById('resultado').innerHTML = '<span>' + randomNumbers.toString() + '</span>';
            document.getElementById('generateBtn').disabled = false;
        }, processingTime)

    });
})