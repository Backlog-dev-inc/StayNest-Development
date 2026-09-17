# 🏠 StayNest

> A learning-focused full-stack web application inspired by Airbnb, built while learning the MERN/Node.js ecosystem step by step.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/Backlog-dev-inc/StayNest-Development)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express-green)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/database-MongoDB%20%7C%20Mongoose-brightgreen)](https://www.mongodb.com/)
[![Views](https://img.shields.io/badge/views-EJS-orange)](https://ejs.co/)

## 📌 About the Project

**StayNest** is a full-stack web application inspired by the core idea of Airbnb: users can browse property listings and, as development progresses, create, edit, and manage listings through a web interface.

This repository is the **clean/project repository** for StayNest. It records the project through meaningful milestones rather than every small mistake or debugging step.

A separate [`StayNest-Development`](https://github.com/Backlog-dev-inc/StayNest-Development) repository is used to preserve the detailed learning journey and incremental development process.

## 🎯 Purpose

This project is being built as both a **real application** and a **learning project**.

The main goals are to:

- understand how a Node.js + Express application is structured;
- learn how Mongoose connects application logic with MongoDB;
- understand the complete request → route → database → response flow;
- build CRUD functionality instead of only following isolated examples;
- gradually introduce validation, middleware, authentication, relationships, and better project structure;
- maintain a clear record of what was learned at each project milestone.

## 🛠️ Tech Stack

### Current

- **Node.js** — JavaScript runtime
- **Express.js** — server and routing
- **MongoDB** — database
- **Mongoose** — MongoDB object modeling
- **EJS** — server-side views
- **method-override** — enables HTTP methods such as PUT and DELETE from HTML forms

### Planned / To Be Introduced

The stack will evolve as the application reaches later sections of the course and development roadmap. Planned areas include better error handling, validation, middleware, authentication/authorization, relationships between collections, and UI refinement.

## 🧭 Project Progress

### Phase 1 — Core Listing Application

#### Part-a — Listing CRUD ✅ Complete

Implemented the first complete database-backed listing workflow:

- Basic Express application setup
- EJS view configuration
- MongoDB connection through Mongoose
- `Listing` schema and model
- Listing index/read page
- Individual listing/show page
- Create listing
- Edit/update listing
- Delete listing
- HTTP method overriding for PUT and DELETE requests

### Current Architecture

```text
Browser
   ↓
Express Route
   ↓
Mongoose Model
   ↓
MongoDB
   ↓
Mongoose Result
   ↓
EJS View
   ↓
HTML Response
```

For a create operation, the current flow is:

```text
HTML Form
   ↓
POST /listings/create
   ↓
req.body.listing
   ↓
Listing.insertOne()
   ↓
MongoDB
   ↓
redirect("/listings")
```

For reading listings:

```text
GET /listings
   ↓
Listing.find()
   ↓
MongoDB
   ↓
allListings
   ↓
index.ejs
   ↓
HTML
```

## 🗂️ Current Project Structure

```text
StayNest/
│
├── models/
│   └── listing.js
│
├── views/
│   └── listings/
│       ├── index.ejs
│       ├── show.ejs
│       ├── new.ejs
│       └── edit.ejs
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

> The structure will change as the application grows. This README is intentionally updated alongside major milestones.

## 🧩 Listing CRUD Routes

| Operation | Method | Route                  | Purpose                       |
| --------- | ------ | ---------------------- | ----------------------------- |
| Index     | GET    | `/listings`            | Display all listings          |
| New       | GET    | `/listings/new`        | Display listing creation form |
| Create    | POST   | `/listings/create`     | Create a new listing          |
| Show      | GET    | `/listings/:id`        | Display one listing           |
| Edit      | GET    | `/listings/edit/:id`   | Display edit form             |
| Update    | PUT    | `/listings/update/:id` | Update an existing listing    |
| Delete    | DELETE | `/listings/delete/:id` | Remove a listing              |

## 🧠 What I Learned So Far

### 1. Express routing

Routes connect browser requests to server-side application logic. Different HTTP methods are used to represent different operations on resources.

### 2. Mongoose models

A Mongoose schema describes the structure of a MongoDB document, while a model provides the interface used by the application to interact with the corresponding collection.

### 3. Request data

The listing forms use fields such as `listing[title]`, `listing[description]`, and `listing[price]`. With Express's URL-encoded body parsing, these become a nested `req.body.listing` object on the server.

### 4. Database-backed CRUD

The project now demonstrates the complete basic lifecycle of a listing:

```text
Create → Read → Update → Delete
```

### 5. HTTP method override

HTML forms do not directly provide PUT and DELETE methods, so `method-override` is currently used to support those operations from forms.

### 6. Separation between data and views

MongoDB/Mongoose handles the data layer, Express handles routing/server logic, and EJS renders the data into HTML views.

## 🔬 Learning Notes / Things To Improve

This is intentionally **not presented as a finished production application** yet.

The current implementation still has areas that will be improved as the corresponding concepts are learned:

- centralized error handling;
- validation and validation middleware;
- cleaner REST-style route naming;
- improved project/module structure;
- better user-facing error responses;
- authentication and authorization;
- relationships between MongoDB collections;
- stronger UI and responsive styling.

These are recorded as future learning milestones rather than prematurely refactoring the current implementation.

## 🗺️ Roadmap

- [x] Basic Express + EJS setup
- [x] MongoDB connection with Mongoose
- [x] Listing model
- [x] Listing index/read
- [x] Listing show/read
- [x] Create listing
- [x] Update listing
- [x] Delete listing
- [ ] Navbar and footer
- [ ] Page styling and UI refinement
- [ ] Validation
- [ ] Middleware
- [ ] Error handling
- [ ] Database relationships
- [ ] Authentication / authorization
- [ ] Additional application features
- [ ] Final cleanup and portfolio-ready release

## 📚 Development Philosophy

StayNest is being developed incrementally.

The goal is **not** to jump directly to a polished implementation. Each milestone should represent a concept that has actually been learned, implemented, tested, and understood.

The development repository preserves the detailed journey, including intermediate implementations and debugging. This repository keeps the major milestones easier to follow.

That means the Git history should answer two different questions:

- **Development repo:** "How did I learn and build this?"
- **StayNest repo:** "What meaningful capabilities has the project reached?"

## 📈 Milestone Log

### Phase 1 · Part-a — Listing CRUD

**Status:** ✅ Complete

The first major milestone establishes the core backend/database workflow for StayNest. A listing can now be stored in MongoDB and managed through the web application using create, read, update, and delete operations.

**Key concepts:** Express routing, EJS rendering, Mongoose models, MongoDB operations, form handling, request parameters, and HTTP method override.

**Next milestone:** Phase 1 · Part-b — frontend boilerplate and styling.

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Backlog-dev-inc/StayNest-Development.git
cd StayNest-Development
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start MongoDB

The current development configuration expects a local MongoDB server at:

```text
mongodb://127.0.0.1:27017/StayNest
```

### 4. Start the application

```bash
node server.js
```

The server currently listens on port `3300`.

## 📌 Note

This project is actively evolving. The README will be updated after each major milestone so that it remains a record of both the application's capabilities and the concepts learned along the way.
