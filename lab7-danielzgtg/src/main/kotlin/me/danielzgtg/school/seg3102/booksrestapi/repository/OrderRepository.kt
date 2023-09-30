package me.danielzgtg.school.seg3102.booksrestapi.repository

import me.danielzgtg.school.seg3102.booksrestapi.entities.Order
import org.springframework.data.repository.CrudRepository

interface OrderRepository: CrudRepository<Order, Long>
