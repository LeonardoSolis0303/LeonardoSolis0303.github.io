---
title: "Matrices aleatorias para mercados eléctricos"
description: "Una nota sobre Random Matrix Theory, matrices de correlación y mercados eléctricos."
date: 2026-04-15
lang: es
slug: "matrices-aleatorias-mercados-electricos"
tags: ["rmt", "mercados de energía", "física estadística"]
draft: false
---

La distribución de Wigner-Dyson aparece en lugares que no tienen nada que
ver entre sí: núcleos atómicos pesados, matrices de correlación financiera,
ceros de la función zeta de Riemann. Esto no puede ser una coincidencia.

> La universalidad es la regla, no la excepción, en sistemas con muchos
> grados de libertad acoplados —una vez que conoces la clase de simetría,
> la estadística local queda fijada.

## La hipótesis

Lo que estos sistemas comparten es que todos son sistemas con muchos grados
de libertad acoplados, donde los detalles microscópicos no importan —solo
la estructura estadística sí. Random Matrix Theory captura esa
universalidad.

Si esto es correcto, la misma maquinaria debería aplicar a mercados
eléctricos, donde las correlaciones de precios nodales son justo el tipo de
objeto de alta dimensionalidad para el que RMT es útil. La pregunta es si
el bulk del espectro de eigenvalues sigue Marchenko-Pastur, y si las
desviaciones cuentan algo útil sobre la estructura del mercado.

## En lo que estoy trabajando

Este es un borrador. Lo voy a expandir con:

- El setup: cómo construir la matriz de correlación a partir de los datos
  de precios nodales.
- Los diagnósticos: espectro, estadísticas de eigenvectores, IPR.
- La interpretación: qué dicen los outliers sobre riesgo sistémico vs.
  idiosincrático.

El repositorio para este trabajo vivirá en GitHub, enlazado desde la página
del proyecto.
