---
title: "Random Matrix Theory for Energy Markets"
description: "Applying RMT to nodal price correlation matrices in electricity markets."
date: 2026-04-01
lang: en
slug: "random-matrix-theory-energy-markets"
tags: ["rmt", "energy markets", "statistical physics"]
status: "active"
relatedPosts: ["rmt-energy-markets"]
draft: false
# repo: "https://github.com/leosolis/rmt-energy"   # uncomment when public
---

## Summary

The Wigner-Dyson distribution connects atomic nuclei, the Riemann zeta
function, and financial correlation matrices. This project asks whether
the same framework applies to nodal price correlations in electricity
markets — and whether the deviations from Marchenko-Pastur tell us
something about systemic vs. idiosyncratic risk in those markets.

## Problem

Electricity markets are high-dimensional systems with many coupled nodes.
Their correlation structure is hard to summarize with traditional methods,
which tend to either oversimplify (PCA on the top few components) or
overfit (full multivariate models with thousands of parameters).

## Method

The plan is to follow the Bouchaud-Potters playbook from quantitative
finance, adapted to electricity:

- Build the empirical correlation matrix from nodal price data.
- Compare its eigenvalue spectrum to the Marchenko-Pastur prediction.
- Characterize the bulk and the outliers separately.
- Examine eigenvector statistics (IPR, participation ratios).

## Status & Results

This is in early stages. Setting up the data pipeline and the basic
diagnostics. No publishable results yet.

## Learnings

- Building the data pipeline well from the start matters more than the
  analysis. The hard part is not the spectrum, it is making sure the
  correlation matrix represents what you think it represents.

The repository will be public when the diagnostics are reproducible.
