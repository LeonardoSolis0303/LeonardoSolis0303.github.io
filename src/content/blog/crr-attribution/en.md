---
title: "CRR Attribution: what I learned in six months"
description: "Notes on building a Congestion Revenue Rights attribution layer for electricity markets."
date: 2026-04-28
lang: en
slug: "crr-attribution-six-months"
tags: ["quant", "energy markets", "ercot"]
draft: false
---

I left the analyst job to focus on my thesis, but before leaving I wanted
to write down what the CRR attribution project actually taught me. It is
not a glamorous piece of work, but it is the kind of project that makes
you think about risk in a very concrete way.

## The most important thing

The most important thing I learned: the difference between a model that
*works* and one that is *correct*. Our model worked — the numbers were
internally consistent and reproduced the historical attributions. I am
not entirely sure it was correct.

The two are not the same. A model that works can hide its assumptions
inside the choice of inputs. A correct model holds up when you change
the inputs.

## The stack

- **PostgreSQL** for the historical DAM data and CRR award records.
- **SQLAlchemy** as the ORM, with a `BravosRepository` and `DamRepository`
  to isolate the persistence layer.
- **Pandas** for the analysis layer, with selective Polars where the
  shape of the data justified it.
- **Azure Data Studio** for ad-hoc queries during development.

## What I would do differently

Build the validation harness first. Not the model, the harness. We did
the opposite, and most of the second half of the project was retrofitting
checks onto code that was already in production. Painful.

The repo and the project page will go up with the next round of cleanup.
