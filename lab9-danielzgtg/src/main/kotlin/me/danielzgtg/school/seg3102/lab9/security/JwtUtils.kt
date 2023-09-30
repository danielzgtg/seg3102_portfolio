package me.danielzgtg.school.seg3102.lab9.security

import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

// validateJwtToken is redundant

@Component
class JwtUtils(
    @Value("\${app.jwtSecret}")
    jwtSecret: String,
    @Value("\${app.jwtExpirationMs}")
    private val jwtExpirationMs: Int,
) {
    private val key: SecretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret))
    private val parser: JwtParser = Jwts.parserBuilder().setSigningKey(key).build()

    fun generateJwtToken(authentication: String): String = Jwts.builder()
        // Simplified away Authentication to just String
        .setSubject(authentication)
        .setIssuedAt(Date())
        .setExpiration(Date(Date().time + jwtExpirationMs))
        .signWith(key)
        .compact()

    fun getUserNameFromJwtToken(token: String): String = parser.parseClaimsJws(token).body.subject
}
