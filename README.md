# Pasos a nivel · Tren del Valle

Mapas interactivos de los 56 pasos a nivel (PaN) del tramo **General Roca – Cipolletti** (km 1150,63 a 1187,65) y de sus 6 estaciones.

**Ver en línea:** https://sebabruschetti-ctrl.github.io/pasos-a-nivel-tren-del-valle/inicio.html

## Mapas

| Archivo | Contenido |
|---|---|
| `inicio.html` | Portada con acceso a los mapas. |
| `mapa_completo.html` | Mapa integral con capas que se prenden y apagan: PaN, barreras y avisos propuestos, estaciones, plan de telecomando por etapas, puesto de mando, entorno (OpenStreetMap), simulación del paso del tren y modo campo con GPS. |
| `index.html` | Mapa del relevamiento: cada PaN con foto, prioridad, estado y señalética faltante, más las estaciones ubicadas con los planos ADIF. |
| `mapa_etapas.html` | Redirige al mapa integral en la vista "Solo plan". |

Cada mapa es un único archivo HTML con los datos y las fotos incluidos: también funciona descargado y abierto desde la computadora (necesita internet para el mapa de fondo).

## Funciones principales

- Buscador por número de PaN, calle, localidad o estación.
- Link directo a cada PaN o estación (por ejemplo `mapa_completo.html#pan=31`).
- Fichas imprimibles o exportables a PDF, por PaN o por etapa completa.
- Modo campo: ubicación propia, PaN más cercano, registro de coordenadas GPS y notas (guardadas en el dispositivo), exportación a CSV.
- Uso sin señal: publicado con https, el mapa integral se puede instalar en el celular; queda disponible la parte del mapa vista antes con conexión (`sw.js`, `manifest.webmanifest`).

## Fuentes

- Relevamiento de PaN Gral. Roca – Cipolletti (octubre de 2026).
- Planos ADIF de las estaciones (límite físico de la concesión). La estación General Roca no tiene plano: su ubicación es aproximada.
- Vistas satelitales de las fichas: imágenes © Google.
- Tipo de calle y entorno de cada cruce: © colaboradores de OpenStreetMap (ODbL), datos descargados el 21/10/2026.
- Mapa de fondo: Esri (World Street Map y World Imagery) y OpenStreetMap.

El índice de exposición y la simulación son orientativos. Los datos marcados "a verificar en campo" en las fichas tienen inconsistencias detectadas en la auditoría y conviene confirmarlos con GPS.
