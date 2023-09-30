package me.danielzgtg.school.seg3102.friendsapi.configuration

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@EnableWebSecurity
class WebSecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain = http.run {
        cors()
        csrf().disable()
        authorizeRequests().anyRequest().permitAll()
        sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        build()
    }
}
