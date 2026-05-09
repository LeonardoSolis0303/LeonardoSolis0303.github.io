---
title: "CRR Research Attribution"
description: "An attribution layer for Congestion Revenue Rights, built during my time as transmission analyst."
date: 2026-03-15
lang: en
slug: "crr-research-attribution"
tags: ["quant", "energy markets", "ercot"]
status: "archived"
relatedPosts: ["crr-attribution"]
draft: false
---

## Summary

A revenue attribution layer for Congestion Revenue Rights, built as my
first quant project during a six-month stint as transmission analyst at
Análisis de Mercados Energéticos. The system attributes income from CRR
positions to underlying causes — congestion regimes, network topology
changes, dispatch outcomes.

## Problem

CRR positions earn revenue (or pay) based on day-ahead congestion patterns.
Understanding *why* a portfolio earned what it earned is a non-trivial
attribution problem because the same observed payment can come from very
different underlying causes (a constraint binding in a different way, an
outage shifting the topology, etc.).

## Method

- Modeled the day-ahead dispatch outcomes against the CRR portfolio.
- Decomposed each settlement into contributions from path-level flows,
  shadow prices, and topology terms.
- Built the system on a clean repository abstraction so attributions
  could be re-run as the data layer evolved.

## Status & Results

Archived from my side — I left the role to focus on my thesis. The system
was in production use when I left; I cannot share specifics.

## Learnings

- Build the validation harness *before* the model. We did the opposite
  and paid for it in the second half of the project.
- The difference between a model that works and one that is correct is
  not philosophical — it is how it behaves under input changes.

This page is documentation only; the production code is private.
