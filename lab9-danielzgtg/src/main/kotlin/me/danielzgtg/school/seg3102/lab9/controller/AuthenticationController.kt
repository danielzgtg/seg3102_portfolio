package me.danielzgtg.school.seg3102.lab9.controller

import me.danielzgtg.school.seg3102.lab9.security.JwtUtils
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

// CrossOrigin is unnecessary
// Not bothering to implement signup because why else would it say to configure two users then.
// Simplified the response

@RestController
@RequestMapping("/auth")
class AuthenticationController(
    private val authenticationManager: AuthenticationManager,
    private val jwtUtils: JwtUtils,
) {
    @PostMapping("/signin")
    fun authenticateUser(@RequestBody loginRequest: @Valid SignInData): String {
        // From a security perspective, disguising a failed attempt as a server error hardens the system
        authenticationManager.authenticate(UsernamePasswordAuthenticationToken(
            loginRequest.username, loginRequest.password))
        return jwtUtils.generateJwtToken(loginRequest.username)
    }
}
