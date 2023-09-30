package me.danielzgtg.school.seg3102.lab9.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ControllerExceptionHandler {
    @ExceptionHandler
    fun handleException(ex: Exception) = ResponseEntity.badRequest().body("Unable to process request")
}
