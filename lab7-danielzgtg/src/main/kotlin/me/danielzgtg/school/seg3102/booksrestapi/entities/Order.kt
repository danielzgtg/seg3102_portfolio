package me.danielzgtg.school.seg3102.booksrestapi.entities

import javax.persistence.*

@Entity
// Changed BookOrder to book_order to fix the warning in IntelliJ
@Table(name = "book_order")
class Order: MyIdentifiable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long = 0
    var quantity: Int = 0
}
