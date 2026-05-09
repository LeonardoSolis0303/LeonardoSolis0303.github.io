---
title: "CRR Research Attribution"
description: "Una capa de atribución para Congestion Revenue Rights, construida durante mi tiempo como analista de transmisión."
date: 2026-03-15
lang: es
slug: "crr-research-attribution"
tags: ["quant", "mercados de energía", "ercot"]
status: "archived"
relatedPosts: ["crr-attribution"]
draft: false
---

## Resumen

Una capa de atribución de ingresos para Congestion Revenue Rights,
construida como mi primer proyecto quant durante una estancia de seis
meses como analista de transmisión en Análisis de Mercados Energéticos.
El sistema atribuye los ingresos de las posiciones de CRR a sus causas
subyacentes —regímenes de congestión, cambios de topología de red,
resultados de despacho.

## Problema

Las posiciones de CRR ganan (o pagan) según patrones de congestión en el
mercado del día siguiente. Entender *por qué* un portafolio ganó lo que
ganó es un problema no trivial de atribución, porque un mismo pago
observado puede provenir de causas subyacentes muy distintas (una
restricción binding de forma distinta, una indisponibilidad cambiando la
topología, etc.).

## Método

- Modelar los resultados del despacho día-siguiente contra el portafolio
  de CRR.
- Descomponer cada settlement en contribuciones por flujos en líneas,
  shadow prices y términos topológicos.
- Construir el sistema sobre una abstracción limpia de repositorios para
  que las atribuciones se pudieran rehacer mientras la capa de datos
  evolucionaba.

## Estado y resultados

Archivado de mi lado —dejé el puesto para enfocarme en la tesis. El
sistema estaba en uso productivo cuando me fui; no puedo compartir
detalles específicos.

## Aprendizajes

- Construir el sistema de validación *antes* que el modelo. Hicimos lo
  contrario y lo pagamos en la segunda mitad del proyecto.
- La diferencia entre un modelo que funciona y uno que es correcto no es
  filosófica —es cómo se comporta cuando cambian los inputs.

Esta página es solo documentación; el código de producción es privado.
