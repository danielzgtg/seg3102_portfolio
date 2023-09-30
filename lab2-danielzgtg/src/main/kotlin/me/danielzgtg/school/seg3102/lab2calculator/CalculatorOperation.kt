package me.danielzgtg.school.seg3102.lab2calculator

private fun Double.myFormat(): String =
    if (this in Int.MIN_VALUE.toDouble()..Int.MAX_VALUE.toDouble()) {
        "%.10f".format(this).replace(Regex("\\.0+$|(\\.\\d*[123456789])0+$"), "$1")
    } else {
        toString()
    }

@Suppress("unused")
enum class CalculatorOperation(private val operation: (Double, Double) -> String) {
    ADD({ x, y -> (x + y).myFormat() }),
    SUB({ x, y -> (x - y).myFormat() }),
    MUL({ x, y -> (x * y).myFormat() }),
    DIV({ x, y -> if (y == 0.0) "\u267E" else (x / y).myFormat() }),
    ;

    operator fun invoke(a: Double, b: Double) = operation(a, b)
}
