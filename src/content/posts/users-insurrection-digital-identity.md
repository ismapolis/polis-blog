---
title: 'The Users’ Insurrection: Freeing Digital Identity from Corporate Control'
slug: 'users-insurrection-digital-identity'
description: 'How self-sovereign identity can restore control over personal data in the digital age.'
publicationDate: 2025-08-29
category: 'divulgation'
public: true
author: 'Ismael Illán García'
---

The Industrial Revolution and the arrival of machinery in textile factories represented a total disruption in the sector. The process shifted from requiring highly specialized labor to perform a relatively slow task to allowing anyone to operate a machine in a much faster and more efficient process. Countless workers left the countryside or other jobs with the promise of more stable, better-paid, and less exhausting work. However, this turned out to be a poisoned gift, as eventually the lack of regulation trapped these workers in 14-hour or longer shifts, six days a week, under dangerous working conditions with numerous factory accidents. The absence of alternatives made workers completely dependent on these jobs and consequently subject to labor abuse. This situation eventually erupted, leading to strikes such as “La Canadiense” in Barcelona, the “Matchgirls” in London, or the “Bread and Roses” strike in New York.

It is inevitable to see parallels in internet identity management. Initially, users created accounts for each website they wanted to use, often using an alias to maintain pseudo-anonymity. Maintaining accounts involved writing down, memorizing, or repeating passwords, which could be tedious, inefficient, or insecure—but the identity was under the user’s control. This process was greatly simplified with the arrival of Single Sign-On (SSO) systems and the familiar “Sign in with…” option. This allows us to avoid creating multiple accounts for each service, maintaining a reduced number of passwords.

At first, it seems that companies do us a “favor” by storing our passwords, but in return, we are losing our freedom. These companies control all information about us: browsing history, devices we use, locations we visit, and even our biometrics. With this data, organizations can aggregate it and generate profiles, which allows them to predict users’ routines and preferences. These profiles are what we know as users’ digital identities. This is what we have relinquished.

Initially, the tracking had a seemingly good purpose: to create a more personalized and pleasant experience for each user. However, this assumption collapsed as the data-selling business was discovered. This traffic often occurs without users’ knowledge, proving we do not have control over our digital identities. Worse, data repositories of companies like Google, Facebook, or Apple have become targets for cybercriminals. A single successful attack can compromise thousands to millions of user accounts, enabling identity theft or access to other associated data.

## Taking Back Control

Self-sovereign identity restores control over personal data to the user, eliminating intermediaries and preventing data abuse. In this model, the user is the sole manager of their identity, decides which information to share and with whom, and has full control over the level of anonymity they wish to maintain. Identities are portable and interoperable. Additionally, users can always approve third-party access to their data, revealing only the minimum information necessary for each process. This information is recorded as verifiable credentials, designed to mimic their physical counterparts while adding a layer of security via cryptography. Along with credentials, decentralized identifiers (DIDs) are used, allowing us to present information about ourselves while preserving privacy and anonymity.

For example, when we shop online, the seller does not need to know exactly who we are, just as when we enter a store in a mall we do not need to carry our ID. Still, companies like Amazon ask for nearly our entire digital identity to purchase a simple product. Using verifiable credentials and DIDs, we could implement systems that emulate physical-world interactions, freeing users’ data from corporate control.

## Challenges

To work with decentralized identifiers and verifiable credentials, we need a digital wallet designed for a self-sovereign identity system. It allows secure storage of credentials and private keys. With a self-sovereign wallet, users can use hundreds of different identifiers online transparently, preventing organizations from easily linking them. This is equivalent to pre-“Sign in with” operation but without remembering passwords. Moreover, these wallets are less attractive to hackers as compromising a single wallet would require disproportionate effort to access an individual’s digital identity, which is initially anonymous.

Developing a wallet involves many design considerations, such as the cryptography used by DIDs or the format and protocol for credential communication. Here arises a conflict: the lack of industry consensus on communication protocols. Without consensus, wallets based on different protocols would not be interoperable, complicating adoption and potentially forcing users to maintain multiple wallets, violating the principle of simplicity.

For this reason, within the Sigma project funded by IVACE-FEDER (file number IMDEEA/2023/45), ITI is working on a multi-protocol wallet compatible with the two most mature protocols today: OpenID and Aries, allowing high interoperability with other wallets. This mechanism also enables expanding supported protocols if no consensus is reached in the short/mid-term, avoiding multiple digital wallets. Promoting this technology will help privacy and digital identities return to users’ control, gradually freeing us from corporate oversight.
