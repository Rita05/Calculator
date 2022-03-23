const buttonsNumber = document.querySelectorAll('.btn-number')
const buttonsOperation = document.querySelectorAll('.btn-operation')
const buttonClear = document.querySelector('.btn-clear')
const buttonEqual = document.querySelector('#btn-equal')
const PreviousElement = document.querySelector('#data-previous-operand')
const CurrentElement = document.querySelector('#data-current-operand')

class Calculator {
    constructor(prevElement, curElement) { 
        this.previousOperandElement = prevElement
        this.currentOperandElement = curElement
        this.previousOperand = ''
        this.currentOperand = ''
        this.chosenOperation = undefined
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')){
            return 
        } 
        if (String(this.currentOperand).length < 15){
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }else{
            this.currentOperand
        }
        
    }

    updateScreen() {
        this.currentOperandElement.innerText = this.displayNumber(this.currentOperand)
        if (this.chosenOperation != null) {
            this.previousOperandElement.innerText = `${this.displayNumber(this.previousOperand)} ${this.chosenOperation}`
        } else {
            this.previousOperandElement.innerText = ''
        }

    }

    clearScreen() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.chosenOperation = undefined
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return 

        if (this.previousOperand !== '') {
            this.calculate()
        }

        this.chosenOperation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    displayNumber(number) {

        let numberToString = number.toString()
        let integerPart = parseFloat(numberToString.split('.')[0])
        let decimalFraction = numberToString.split('.')[1]
        let integerPartDisplay

        if (isNaN(integerPart)) {
            integerPartDisplay = ''
        } else {
            integerPartDisplay = integerPart.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalFraction == null) {
            return integerPartDisplay
        } else {
            return `${integerPartDisplay}.${decimalFraction}`
        }

    }

    makeOppositeNumber() {
        this.currentOperand = this.currentOperand * (-1)
    }

    calculate() {
        var prevNumber = parseFloat(this.previousOperand)
        var currentNumber = parseFloat(this.currentOperand)
        var computition
        if (isNaN(prevNumber) || isNaN(currentNumber)) return
        switch (this.chosenOperation) {
            case '+':
                computition = prevNumber + currentNumber
                break
            case '-':
                computition = prevNumber - currentNumber
                break
            case '*':
                computition = prevNumber * currentNumber
                break
            case '÷':
                computition = prevNumber / currentNumber
                break
            default:
                return
        }
        this.chosenOperation = undefined
        this.currentOperand = computition
        this.previousOperand = ''

    }

}


const calculator = new Calculator(PreviousElement, CurrentElement)

//events of number buttons 
buttonsNumber.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateScreen()
    })
})

//events of operations buttons 
buttonsOperation.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText == '+/-') {
            calculator.makeOppositeNumber()
            calculator.updateScreen()
        } else {
            calculator.chooseOperation(button.innerText)
            calculator.updateScreen()
        }

    })
})

//event clear Screen of calculator 
buttonClear.addEventListener('click', () => {
    calculator.clearScreen()
    calculator.updateScreen()
})

//event equals of computition operation
buttonEqual.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateScreen()
})