

//Función para generar un randomInt
function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
} 

//Función para obtener aleatorios de varios numeros
function generateManyExcludeNumbers(min, max, excludes, numberOfResults = 1){
	const temp = [];
    
    for (let i = 0; i < numberOfResults; i++) {
    	const numero = getRandomInt(min, max, excludes);
        const existsOnTemp = temp.some(elem => elem === numero);
        const existsOnExclude = excludes.some(elem => elem === numero);

  		if (existsOnTemp || existsOnExclude) {
            i--;
            console.warn('existsOnTemp')
            continue;
  		}else{
        	temp.push(numero);
        }
        
	}
    return temp;
}

//Evento cuando el contenido cargo
document.addEventListener('DOMContentLoaded', function(){
    //Evento cuando el formulario es enviado
    document.getElementById('generatorSMForm').addEventListener('submit', (event) =>{

        document.getElementById('generateBtn').disabled = true;
        document.getElementById('resultado').innerHTML = "";

        event.preventDefault();
        const minValue = (document.getElementById('minimo').value) ? parseInt(document.getElementById('minimo').value): 1;
        const maxValue = (document.getElementById('maximo').value) ? parseInt(document.getElementById('maximo').value): 100;
        const quantityValue = (document.getElementById('cantidad').value) ? parseInt(document.getElementById('cantidad').value): 1;
        const excludesValue = document.getElementById('exclusion').value;

        const excludesValuesArr = (excludesValue && excludesValue != '') ? excludesValue.split(',')
        .map(value => parseInt(value))
        .filter(value => {
            return !isNaN(value) && typeof value === 'number'
        }) : [];

        let numerosAleatorios = generateManyExcludeNumbers(minValue, maxValue, excludesValuesArr, quantityValue)
        console.log("Numero Aleatorio", numerosAleatorios)

        
        setTimeout(() => {
            document.getElementById('exclusion').value = excludesValuesArr.toString();
            document.getElementById('resultado').innerHTML = numerosAleatorios.toString();
            document.getElementById('generateBtn').disabled = false;
        }, 700)
        
    });
})