package me.danielzgtg.school.seg3102.booksrestapi.entities

import javax.persistence.*

@Entity
class Book: MyIdentifiable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long = 0
    var title: String = ""
    var category: String = ""
    var isbn: String = ""
    var cost: Double = 0.0
    var year: Int = 0
    var description: String = ""

    @ManyToMany(mappedBy = "books", cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    var authors: MutableList<Author> = mutableListOf()

    @OneToMany(cascade = [CascadeType.ALL])
    var orders: MutableList<Order> = mutableListOf()
}
