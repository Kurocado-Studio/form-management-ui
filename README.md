# FormKit — Builder

This repository contains the form schema builder used to create, edit, and manage structured form
definitions for the FormKit ecosystem. It generates the JSON schemas that the Consumer package
renders.

## What is FormKit?

FormKit is a framework for designing, managing, and rendering dynamic forms. It separates form
creation from form consumption, allowing teams to define structured form schemas using the Builder
and render them using the Consumer runtime. The goal is to standardize how forms are produced across
projects while enabling consistency, reusability, and rapid iteration.

FormKit provides:

- A schema-based approach for defining form structure and behavior
- A visual builder for authoring and maintaining those schemas
- A React runtime that renders forms based on the generated schema
- A clean separation between product-facing configuration and developer-facing implementation

FormKit evolved from the earlier codename “HTML Forms Factory,” which served as its initial
architectural prototype.

This repository contains the form rendering runtime, which consumes JSON form definitions produced
by the Builder. It includes the components, validation logic, and runtime behavior for rendering
forms within React applications.

### Overview

- Purpose: Centralized interface for building, validating, and maintaining form schemas
- Output: JSON schema objects used by the Consumer package
- Audience: Internal developers, demos, and R&D

### Documentation

- Project Overview: https://kurocado-studio.github.io/html-forms-service/landing.html

### Related Repositories

- Consumer Renderer: https://github.com/Kurocado-Studio/format-consumer-demo
