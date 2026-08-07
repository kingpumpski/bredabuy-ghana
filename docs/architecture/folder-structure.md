# BredaBuy Ghana Enterprise Folder Architecture

## app
Application bootstrap, providers and routing.

## modules
Business domain modules.

Examples:
- authentication
- marketplace
- sellers
- orders

## services
External communication and integrations.

Examples:
- APIs
- payments
- notifications

## store
Global application state.

## shared
Reusable components, hooks and utilities.

## features
Cross-module reusable features.

# BredaBuy Ghana Enterprise Architecture

## Application Layer

Location:

src/app

Purpose:

Application initialization, routing, providers, and global configuration.


---

## Modules

Location:

src/modules

Purpose:

Business domains.

Modules:

- auth
- marketplace
- products
- orders
- payments
- sellers
- inventory
- analytics
- admin
- ai


Each module should contain:

- components
- hooks
- services
- types
- pages


---

## Services

Location:

src/services

Purpose:

External communication.

Contains:

- API clients
- Payment providers
- Notifications
- Storage services


---

## Store

Location:

src/store

Purpose:

Global application state.

Examples:

- authentication
- cart
- preferences


---

## Shared

Location:

src/shared

Purpose:

Reusable application resources.

Contains:

- components
- hooks
- utilities
- constants
- types


---

## Migration Strategy

Existing folders will remain functional.

Migration will happen gradually.

No module should break existing customer workflows.