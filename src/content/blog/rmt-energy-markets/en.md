---
title: "Random Matrix Theory for Energy Markets"
description: "A note on random matrix theory, correlation matrices, and electricity markets."
date: 2026-04-15
lang: en
slug: "random-matrix-theory-energy-markets"
tags: ["rmt", "energy markets", "statistical physics"]
draft: false
---

The Wigner-Dyson distribution shows up in places that have nothing to do with
each other: heavy atomic nuclei, financial correlation matrices, zeros of
the Riemann zeta function. This cannot be a coincidence.

> Universality is the rule, not the exception, in systems with many coupled
> degrees of freedom — once you know the symmetry class, the local statistics
> are fixed.

## The hypothesis

What these systems share is that they are all systems with many coupled
degrees of freedom, where microscopic details do not matter — only the
statistical structure does. Random Matrix Theory captures that universality.

If this is correct, the same machinery should apply to electricity markets,
where nodal price correlations are precisely the kind of high-dimensional
object RMT is good at. The question is whether the bulk of the eigenvalue
spectrum follows Marchenko-Pastur, and whether the deviations from it tell
us something useful about market structure.

## What I am working on

This is a placeholder draft. I will expand it with:

- The setup: how to build the correlation matrix from nodal price data.
- The diagnostics: spectrum, eigenvector statistics, IPR.
- The interpretation: what the outliers say about systemic vs. idiosyncratic
  risk.

The repository for this work will live on GitHub, linked from the project
page.
