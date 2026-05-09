---
title: "CRR Attribution: lo que aprendí en seis meses"
description: "Apuntes sobre la construcción de una capa de atribución para Congestion Revenue Rights en mercados eléctricos."
date: 2026-04-28
lang: es
slug: "crr-attribution-seis-meses"
tags: ["quant", "mercados de energía", "ercot"]
draft: false
---

Dejé el trabajo de analista para concentrarme en la tesis, pero antes de
irme quería dejar escrito lo que el proyecto de CRR attribution realmente
me enseñó. No es un trabajo glamoroso, pero es de los que te obligan a
pensar el riesgo de una forma muy concreta.

## Lo más importante

Lo más importante que aprendí: la diferencia entre un modelo que
*funciona* y uno que es *correcto*. Nuestro modelo funcionaba —los
números eran internamente consistentes y reproducían las atribuciones
históricas. No estoy del todo seguro de que fuera correcto.

No son lo mismo. Un modelo que funciona puede esconder sus supuestos en
la elección de los inputs. Un modelo correcto aguanta cuando cambias los
inputs.

## El stack

- **PostgreSQL** para los datos históricos del DAM y los registros de
  asignación de CRR.
- **SQLAlchemy** como ORM, con `BravosRepository` y `DamRepository` para
  aislar la capa de persistencia.
- **Pandas** para la capa de análisis, con Polars selectivo donde la forma
  de los datos lo justificaba.
- **Azure Data Studio** para queries ad-hoc durante el desarrollo.

## Lo que haría distinto

Construir primero el sistema de validación. No el modelo, el sistema de
validación. Hicimos lo opuesto, y la segunda mitad del proyecto fue
ponerle checks a código ya en producción. Doloroso.

El repo y la página del proyecto se publicarán con la próxima limpieza.
