function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")
}

function checkFields(event) {
    const valueToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link"
    ]

    const isEmpty = valueToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        // O .trim() remove os espaços inicias e finais de cada string

        if (checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if (isEmpty){
        event.preventDefault() // Previne o comportamento padrão
        alert("Por favor, preencha todos os campos!")
    }
}