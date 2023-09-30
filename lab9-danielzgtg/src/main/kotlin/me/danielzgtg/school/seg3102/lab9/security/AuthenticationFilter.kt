package me.danielzgtg.school.seg3102.lab9.security

import io.jsonwebtoken.JwtException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

private fun parseJwt(request: HttpServletRequest): String? = request.getHeader("Authorization").run {
    if (isNullOrBlank() || !startsWith("Bearer ")) {
        null
    } else {
        substring(7)
    }
}

@Component
class AuthenticationFilter(private val jwtUtils: JwtUtils) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            parseJwt(request)?.let {
                // Only one authority and no roles
                SecurityContextHolder.getContext().authentication = UsernamePasswordAuthenticationToken(
                    jwtUtils.getUserNameFromJwtToken(it), null, emptyList(),
                ).apply {
                    details = WebAuthenticationDetailsSource().buildDetails(request)
                }
            }
        } catch (_: JwtException) {
        }
        filterChain.doFilter(request, response)
    }
}
