---
title: "Matrices aleatorias para mercados eléctricos"
description: "Aplicando Random Matrix Theory a las matrices de correlación de precios nodales en mercados eléctricos."
date: 2026-04-01
lang: es
slug: "matrices-aleatorias-mercados-electricos"
tags: ["rmt", "mercados de energía", "física estadística"]
status: "active"
relatedPosts: ["rmt-energy-markets"]
draft: false
---

## Resumen

La distribución de Wigner-Dyson conecta núcleos atómicos, la función zeta
de Riemann y matrices de correlación financiera. Este proyecto pregunta
si el mismo marco aplica a las correlaciones de precios nodales en
mercados eléctricos —y si las desviaciones respecto a Marchenko-Pastur
nos dicen algo sobre riesgo sistémico vs. idiosincrático en esos
mercados.

## Problema

Los mercados eléctricos son sistemas de alta dimensionalidad con muchos
nodos acoplados. Su estructura de correlación es difícil de resumir con
métodos tradicionales, que tienden a simplificar de más (PCA sobre los
primeros componentes) o a sobreajustar (modelos multivariados completos
con miles de parámetros).

## Método

El plan es seguir el manual de Bouchaud-Potters de finanzas cuantitativas,
adaptado a electricidad:

- Construir la matriz empírica de correlación a partir de los precios
  nodales.
- Comparar su espectro de eigenvalues con la predicción de
  Marchenko-Pastur.
- Caracterizar el bulk y los outliers por separado.
- Examinar la estadística de los eigenvectores (IPR, participation
  ratios).

## Estado y resultados

Está en etapa temprana. Montando el pipeline de datos y los diagnósticos
básicos. Sin resultados publicables todavía.

## Aprendizajes

- Construir bien el pipeline de datos desde el principio importa más que
  el análisis. La parte difícil no es el espectro, es asegurarte de que
  la matriz de correlación representa lo que crees que representa.

El repositorio será público cuando los diagnósticos sean reproducibles.
