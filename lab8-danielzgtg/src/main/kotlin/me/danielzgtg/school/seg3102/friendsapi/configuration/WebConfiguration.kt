package me.danielzgtg.school.seg3102.friendsapi.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfiguration : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**").apply {
            allowedOrigins("http://localhost:4200")
            allowedMethods("*")
        }
    }
}
