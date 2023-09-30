import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    application
    id("org.springframework.boot") version "2.7.5"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.7.21"
    kotlin("plugin.spring") version "1.7.21"
    kotlin("plugin.jpa") version "1.7.21"
}

group = "me.danielzgtg.school.seg3102"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:2.7.5")
    implementation("org.yaml:snakeyaml:1.33") // CVE
    implementation("org.springframework.boot:spring-boot-starter-security:2.7.5")
    implementation("org.springframework.security:spring-security-core:5.7.5") // CVE
    implementation("org.springframework.security:spring-security-web:5.7.5") // CVE
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb:2.7.5")
    implementation("com.graphql-java-kickstart:graphql-spring-boot-starter:14.0.0")
    // IDK but these following two remaining warnings are false positives
    implementation("com.graphql-java:graphql-java:19.2") // CVE
    implementation("commons-validator:commons-validator:1.7")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.7.21")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.21")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

application {
    applicationDefaultJvmArgs = listOf("-Xms512M", "-Xmx512M")
    mainClass.set("me.danielzgtg.school.seg3102.friendsapi.Lab8GraphQLApplication")
}
