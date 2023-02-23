---
sidebar_label: 'App Design'
---
# App Design

## Introduction
In the previous sections, you've created the foundation for the ticketing system by breaking it down to its functional requirements and designing a drop accordingly. Here, you'll be learning the flow and design of the React apps, to create a seamless ticketing experience for both the organizers and the attendees.

With this tutorial, 2 React apps will be created; one for the attendees and the other for the event organizers. The attendees can only access the tickets while the event organizers will get both ticket and scanner access. 

## Table of Contents
| **Section **                                                                        | **Description**                                                                                             |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| [Ticket App Flow](react-outline.md#ticket-app-flow)                                 | The different stages of claiming that the attendee will see on their device                                 |
| [Scanner App Flow](react-outline.md#scanner-app-flow)                               | The scanner's flow of logic for the doorman                                                                 |
| [Keypom Information](react-outline.md#keypom-information)                           | Brief overview of where different Keypom information, such as private keys and key uses, are found and used | 
| [Ticket and Scanner Interactions](react-outline.md#ticket-and-scanner-interactions) | A look at where and how the ticket and scanner apps interact                                                |

---

## Ticket App Flow
The ticket app is for the attendees and will only consist of 2 stages. 

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticket-flow.png").default} width="100%" height="100%" alt="ticketing"/>
</p>

1. A page showing their unique QR code, corresponding to their private key from the drop that they received from the organizers.  
2. After the QR code page has been scanned and claimed, a page where the user may optionally onboard to NEAR and receive a POAP will 

---

## Scanner App Flow

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-flow.png").default} width="100%" height="100%" alt="ticketing"/>
</p>

---

## Keypom Information

---

## Ticket and Scanner Interactions