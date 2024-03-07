# Zara Marvel Challenge

Este proyecto es una aplicación web diseñada para explorar una lista de personajes de Marvel. Está construido utilizando React y TypeScript, con Vite como la herramienta de compilación para un desarrollo rápido y eficiente.

## Desarrollo

Para ejecutar este proyecto en un entorno de desarrollo, clona el repositorio y ejecuta el siguiente comando, lo cual instalará las dependencias y arrancará un servidor de desarrollo local:

```bash
npm install
```
```bash
npm run dev
```
## Producción

Puedes ver el proyecto en vivo, desplegado en producción, a través del siguiente enlace:  
[Marvel Character Explorer en Netlify](https://soft-cuchufli-fe54ae.netlify.app/)

## Arquitectura y Estructura

El proyecto sigue una **arquitectura modular** y una **separación de responsabilidades**:

- **Context**: Maneja el estado global, incluyendo la lista de personajes y favoritos.
- **Services**: Realiza la llamada a la API de Marvel para obtener los datos de los personajes.
- **Components**: Contiene elementos de UI reutilizables que dependen del estado del Context.
- **Types**: Define el modelo `Character` que centraliza los datos de los personajes, se usa para las listas, cards y se distribuye a través del state en muchos componentes.

El **Contexto** es clave, ya que gestiona los estados necesarios para la funcionalidad de la aplicación, como la lista de personajes principales y la lista de favoritos. Se realiza un fetch de la API de Marvel para obtener los personajes, y se mantiene la lógica de filtrado y gestión de favoritos. Para optimizar el rendimiento y evitar llamadas API excesivas, empleamos un modelo `Character` que encapsula todos los datos relevantes, pasados a través del state, un ejemplo claro está en la navegación de la lista principal al detalle de un personaje, para no hacer una nueva llamada a la api pasamos el `Character` mediante el state.


