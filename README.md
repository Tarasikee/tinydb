![](https://raw.githubusercontent.com/Tarasikee/tinydb/v1.0.0-alpha/images/Logo1.png)

<div align="center">
  <img src="https://github.com/Tarasikee/tinydb/actions/workflows/ci.yml/badge.svg" alt="CI status" />
  <img src="https://github.com/Tarasikee/tinydb/actions/workflows/codeql-analysis.yml/badge.svg" alt="CODEql analysis" />
  <a href="https://deno.land/x/tinydb" target="_blank">
    <img width="20" src="https://deno.land/logo.svg" alt="Deno link"/>
  </a>
</div> 

<hr/>

# TinyDB

Tiny, Powerful, Beautiful

## Contents:

- [Motivation](#motivation)
- [Let's start](#lets-start)
- [@TinyTable](#lets-start)
- [@Column](#lets-start)

# Motivation

Let's say you want to build a small project that doesn't require a bulky
relational database such as Postgres or MySQL.
Instead, you want to use a simple, in-memory database that will cover your needs.

That's where <b>TinyDB</b> comes in. <b>TinyDB</b>  is a tiny, simple,
and fast in-memory database that you can use to
store and retrieve data. It has all the features of a relational database,
but it designed to be as lightweight and
simple as possible.

No need to install software or to set up a server. You're ready to go after
installing dependencies.

# Let's start

Your entry point is ```@TinyTable``` decorator, where you pass table's name.

No need to remember ton of decorators. Simply start with ```@Column({})```, add a
small bunch of properties,
and you are ready to go.
In the example below you will see the best way to use create user with TinyDB.

```typescript
@TinyTable("users")
class User {
    @Column({
        type: "string",
        unique: true,
    })
    name!: string

    @Column({
        type: "string",
        allowNull: false,
    })
    password!: string

    @Column({
        type: "date",
        allowNull: true,
    })
    birthday!: string

    @Column({
        type: "boolean",
        default: false,
        allowNull: true,
    })
    isAdmin!: boolean

    @Column({
        allowNull: true,
        type: "json",
        default: {
            theme: 'light',
            lang: 'en',
        }
    })
    settings!: Record<string, unknown>

    @Column({
        type: "array",
        allowNull: true,
        default: [],
    })
    friends!: string[]
}
```

