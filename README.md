![](https://raw.githubusercontent.com/Tarasikee/tinydb/v1.0.0-alpha/images/Logo1.png)

![](https://github.com/Tarasikee/tinydb/actions/workflows/ci.yml/badge.svg)
![](https://github.com/Tarasikee/tinydb/actions/workflows/codeql-analysis.yml/badge.svg)
![](https://img.shields.io/github/license/Tarasikee/tinydb)
![](https://img.shields.io/github/v/release/Tarasikee/tinydb)
<a href="https://deno.land/x/tinydb" target="_blank">
<img width="20" src="https://deno.land/logo.svg" alt="Deno link"/>
</a>

<hr/>

# TinyDB

Tiny, Powerful, Beautiful

## Contents:

- [Motivation](#motivation)
- [Let's start](#lets-start)
- [CRUD](#crud)
  - [Create](#create)
  - [Retrieve](#retrieve)
  - [Update](#update)
  - [Delete (Hunters)](#delete-hunters)
- [Contributing](#contributing)

# Motivation

Let's say you want to build a small project that doesn't require a bulky
relational database such as Postgres or MySQL.
Instead, you want to use a simple, in-memory database that will cover your needs.

That's where <b>TinyDB</b> comes in. <b>TinyDB</b>  is a tiny, simple,
and fast in-memory database that you can use to
store and retrieve data. It has all the features of a relational database,
but it designed to be as lightweight and
simple as possible.

No need to install software or to set up a server. Just import the library, and
you are ready to go.

# Let's start

Your entry point is ```@TinyTable``` decorator,
where you pass table's name and path to the
file where you want to store your data.

Below you can see an example of how to use ```@TinyTable``` and ```@Column``` decorators.

```ts
@TinyTable({
    name: "users",
    url: "database/example1/"
})
class User {
    @Column({
        type: "string",
        unique: true
    })
    name!: string

    @Column({
        type: "boolean",
        allowNull: true,
        default: false,
    })
    isAdmin!: boolean

    @Column({
        type: "json",
        allowNull: true,
        default: {
            theme: "dark",
            lang: "en"
        },
    })
    settings!: {
        theme: "dark" | "light"
        lang: "en" | "ua"
    }
}

export type userDocument = User & Document

const userSchema = Schema.initializeSchema(User)
export const userModel = new Model<userDocument>(userSchema)
// if you want to short:
// export const userModel = new Model<userDocument>(Schema.initializeSchema(User))
```

As you can see, there area bunch of options you can pass to ```@Column``` decorator:

1. `unique`: Type is `boolean`. It will check on each new document if there is already a document with the same value
2. `type`:  Type is `"string" | "number" | "boolean" | "date" | "json" | "array"`.
   It will define type of column and will check it
3. `allowNull`: Type is `boolean`. If it is `true`, then column can be empty
4. `default`: Type is `any`. If column is empty, then it will be filled with default value

#### Note:

You should remember that there is no need to create `default` value if `allowNull` set to false.

After class is created, you should create type of document and initialize
schema with ```Schema.initializeSchema``` function.
Then you can create model with ```new Model``` function.

# CRUD

CRUD is provided by `Model` class itself. Create and retrieve methods return type of `Instance` class,
that can be converted to JSON with `.toJSON()` method.

### Create:

To create a new document, you should call `create` method of `Model` class and pass object with data.
TinyDB will check if all required fields are filled and if all fields are valid. Then it will either
throw an error or create a new document and return it.

#### Note:

By default, TinyDB will generate unique id for each document, but if you want to handle it yourself,
you can do it by passing `_id` field to `create` method. Remember: <b>it has to be an unique string.</b>

```ts
const user = userModel.create({
    //_id: "1", custom id
    name: "Admin",
    isAdmin: true
})
user.save()
```

### Retrieve:

Retrieve methods, as said before, return `Instance` class. Below you can see all of them:

1. `find`: Returns all instances that match query

```ts
const users = userModel.find({
    settings: {
        theme: "dark",
    }
})
```

2. `findOne`: Returns first instance that matches query

```ts
const user = userModel.findOne({
    settings: {
        lang: "ua",
    }
})
```

3. `findById`: Returns instance with specified id

```ts
const userById = userModel.findById("1")
```

4. `findAll`: Returns all instances of model

```ts
const allUsers = userModel.findAll()
```

#### Note:

Both `find` and `findOne` methods can search by deeply nested objects. Here is
an ![example](https://github.com/Tarasikee/tinydb/blob/master/tests/findingTests.ts).
But be careful because it can affect performance.

### Update:

Update methods work the exact same way as retrieve methods, but
provide second argument that is update.

1. `update`: Updates all instances that match query

```ts
const users = userModel.findAndUpdate({
    settings: {
        theme: "dark",
    }
}, {
    settings: {
        theme: "light",
    }
})
```

2. `findOneAndUpdate`: Updates first instance that matches query

```ts
const user = userModel.findOneAndUpdate({
    settings: {
        lang: "ua",
    }
}, {
    settings: {
        lang: "en",
    }
})
```

3. `findByIdAndUpdate`: Updates instance with specified id

```ts
const userById = userModel.findByIdAndUpdate("1", {
    name: "John",
})
```

### Delete (Hunters):

Delete methods work also the same way as retrieve methods, but delete
instance from table and return string.

1. `hunt`: Deletes all instances that match query

```ts
userModel.hunt({
    settings: {
        theme: "dark",
    }
})
```

2. `huntOne`: Deletes first instance that matches query

```ts
userModel.huntOne({
    settings: {
        lang: "ua",
    }
})
```

3. `huntById`: Deletes instance with specified id

```ts
userModel.huntById("1")
```

4. `huntAll`: Deletes all instances of model

```ts
userModel.huntAll()
```

# Contributing

If you want to contribute to this project, you can do it by creating pull request or by creating issue.
