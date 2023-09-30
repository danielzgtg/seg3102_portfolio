package me.danielzgtg.school.seg3102.booksrestapi.assemblers

import me.danielzgtg.school.seg3102.booksrestapi.controller.ApiController
import me.danielzgtg.school.seg3102.booksrestapi.entities.Order
import me.danielzgtg.school.seg3102.booksrestapi.representation.OrderRepresentation
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.stereotype.Component

@Component
class OrderModelAssembler : RepresentationModelAssemblerSupport<Order, OrderRepresentation>(
        ApiController::class.java, OrderRepresentation::class.java) {
    override fun toModel(entity: Order): OrderRepresentation = instantiateModel(entity).apply {
        addLinkToMethodOnWithSelfRel { it.getOrderById(entity.id) }
        id = entity.id
        quantity = entity.quantity
    }

    override fun toCollectionModel(entities: Iterable<Order>
    ): CollectionModel<OrderRepresentation> = super.toCollectionModel(entities).apply {
        addLinkToMethodOnWithSelfRel { it.allOrders() }
    }
}
