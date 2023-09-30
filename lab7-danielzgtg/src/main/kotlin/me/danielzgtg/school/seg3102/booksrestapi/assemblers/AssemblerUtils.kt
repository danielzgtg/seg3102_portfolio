package me.danielzgtg.school.seg3102.booksrestapi.assemblers

import me.danielzgtg.school.seg3102.booksrestapi.controller.ApiController
import org.springframework.hateoas.RepresentationModel
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder

inline fun <T : RepresentationModel<out T>?> RepresentationModel<T>.addLinkToMethodOnWithSelfRel(
        block: (ApiController) -> Any) {
    add(WebMvcLinkBuilder.linkTo(block(WebMvcLinkBuilder.methodOn(ApiController::class.java))).withSelfRel())
}

inline fun <T : RepresentationModel<out T>?> RepresentationModel<T>.addLinkToMethodOnWithRel(
        rel: String, block: (ApiController) -> Any) {
    add(WebMvcLinkBuilder.linkTo(block(WebMvcLinkBuilder.methodOn(ApiController::class.java))).withRel(rel))
}

inline fun <T, R> List<T>.emptyOrMap(block: (T) -> R): List<R> = if (isEmpty()) emptyList() else map(block)
