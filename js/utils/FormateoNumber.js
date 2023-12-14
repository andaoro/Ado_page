export function formatNumero(number) {
    // Verificar si el número es un número válido
    if (isNaN(number)) {
        return "Invalid number";
    }

    // Convertir el número a un string con dos decimales
    const formattedNumber = number.toString();

    // Aplicar regex para agregar separadores de miles
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    const numberWithSeparators = formattedNumber.replace(regex, ",");

    return numberWithSeparators;
}