package me.danielzgtg.school.seg3102.lab2calculator

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RequestMapping

private fun String.myParse() = if (isEmpty()) null else toDoubleOrNull().takeIf { it?.isFinite() ?: false }

@Controller
class CalculatorController {
    @ModelAttribute
    fun setup(model: Model) {
        model["a"] = "0"
        model["aError"] = false
        model["b"] = "0"
        model["bError"] = false
        model["r"] = ""
    }

    @RequestMapping("/")
    fun home() = "home"

    @RequestMapping("/calculate")
    fun calculate(a: String, b: String, op: CalculatorOperation, model: Model) = "home".also {
        model["a"] = a
        model["b"] = b
        val aDouble = a.myParse() ?: Double.NaN.also { model["aError"] = true }
        val bDouble = b.myParse() ?: Double.NaN.also { model["bError"] = true }
        model["r"] = if (aDouble.isNaN() || bDouble.isNaN()) "Error" else op(aDouble, bDouble)
    }
}
