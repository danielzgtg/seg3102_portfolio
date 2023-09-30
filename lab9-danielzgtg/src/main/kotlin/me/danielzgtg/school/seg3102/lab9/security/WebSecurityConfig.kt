package me.danielzgtg.school.seg3102.lab9.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

// Role is always user
// The UI is in Angular, so no resources need to be ignored
// No need for User, UserRepository, UserDetailsImpl, UserDetailsService because it's
// in memory authentication/authorization
// I made a lot of things autowired using @Component instead of the manual @Bean

@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    @Bean
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager =
        authenticationConfiguration.authenticationManager

    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        authenticationFilter: AuthenticationFilter,
    ): SecurityFilterChain = http.run {
        cors()
        csrf().disable()
        authorizeRequests().antMatchers("/auth/signin").permitAll()
        authorizeRequests().anyRequest().authenticated()
        // The following was removed because it was being blocked by another security policy
        // exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
        sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        build()
    }

    @Bean
    fun userDetailsService(
        passwordEncoder: PasswordEncoder,
    ): UserDetailsService = InMemoryUserDetailsManager().apply {
        val template = User.builder().passwordEncoder(passwordEncoder::encode).authorities(emptyList())
        createUser(template.username("user1").password("pass1").build())
        createUser(template.username("user2").password("pass2").build())
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
