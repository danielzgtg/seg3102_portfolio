package me.danielzgtg.school.seg3102.lab9.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

private fun Double.myFormat(): String =
    if (this in Int.MIN_VALUE.toDouble()..Int.MAX_VALUE.toDouble()) {
        "%.10f".format(this).replace(Regex("\\.0+$|(\\.\\d*[123456789])0+$"), "$1")
    } else {
        toString()
    }

@RestController
@RequestMapping("calculator")
class CalculatorController {
    @GetMapping("add/{x}/{y}")
    fun add(@PathVariable x: Double, @PathVariable y: Double) = (x + y).myFormat()

    @GetMapping("subtract/{x}/{y}")
    fun sub(@PathVariable x: Double, @PathVariable y: Double) = (x - y).myFormat()

    @GetMapping("multiply/{x}/{y}")
    fun mul(@PathVariable x: Double, @PathVariable y: Double) = (x * y).myFormat()

    @GetMapping("divide/{x}/{y}")
    fun div(@PathVariable x: Double, @PathVariable y: Double) = if (y != 0.0) {
        (x / y).myFormat()
    } else "\u267E"
}
