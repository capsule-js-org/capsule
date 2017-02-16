# Capsule - a Flux like State Container
## Why Capsule?
Flux, Redux, Microcosm, why another?

[This article](https://medium.com/@machnicki/why-redux-is-not-so-easy-some-alternatives-24816d5ad22d#.8cksf39gs) talks on some good points.

When evaluating state frameworks, one key thing I noticed was that their touch points to React (used as an example) was very deep.

The application needed to be architectured around the system. The system could not just be added in to an already developed
(developed too far in to make any large architectural changes). Redux was close to what I was looking for, but was pretty
overwhelming.

Flux was light, but feels more like an example rather than a strong foundation. String identifiers are too prone to error (typos?).

I wasn't looking for an application architecture. I was looking for a tool that provides reliable state management, with minimal implementation touch points.

## Project Design Goals
This project is just starting, so this is subject to change, but my design goals are:

 - Actions are the primary API. The state container itself is mostly only touched by the actions themselves  
  The accessors to the state should only need to import and interface with the module that you define your actions in.
  
 - State is modified by Mutator Actions, accessed by Retriever Actions.  
   Retriever actions are observable. You can listen for state changes.
 - Multiple retrievers can access the same state, but apply different transformations   
   This may mean that observer receives a change in value but the other doesn't, even though they use the same state.
 - Listeners on observers are only notified if that observerable changes.  
   As just noted, while the backing state may get updated, if the transformations a retriever applies results in no 
   change in value after transformations, then the listeners will not be notified. 
 - Retrievers are bound to a specific capsule (the state container)  
   Apps are encouraged to use many capsules for each specific state segment.  
   Some kind of capsule manager may be provided, if benefit is found.
 - State snapshots can be taken as a "Time Capsule".  
   Rather than keeping a log of every state change, consuming memory, applications will need to control their own state
   snapshots logic. An API to restore a capsule to a previous version will exists.
 - Actions are functions - You must have direct object reference. No chance for bugs!
 - Actions are asynchronous
   I want to support custom Capsule implementations, such as external state.
   Actions will mandate use of Promises
 - React Binding to map observers to component state.  
   Simple API may look something like  
   ```javascript
   import {bindState} from "capsule-react";
   import {history, users} from "../actions/chat";
   class MyComp extends React.Component {
      constructor(props) {
          super(props);
          bindState(this, {users, history});
      }
   }
   ```
   This would make the React Component subscribe to the chatActions Retriever Action 
   `history` and `users`, and any value they provide will auto synchronize to `this.state.history` and `this.state.users`
 - Cleanup on React components is automatic. It can be as simple as 3 lines in your component.

## Installation
No package is deployed yet. As this project is in early infancy.

I am trying to assume ownership of the capsule name on NPM, but if I can not, I will use `capsule-core`

`capsule-react` will be for the react bindings.
   
## Planned Project Support
The core of the project is going to be designed generic, and can be used in server side code too.

Front end wise, React will be the initial support, with potential bindings for other platforms if they fit well with this style.

## Dev Requirements

To compile this project, may work on older versions but unsupported:
  - Node.JS 6.9.5+
  - Yarn
  - gulp-cli recommended
  
## License
capsule (c) Daniel Ennis (Aikar) 2017-present.

capsule is licensed [MIT](https://tldrlegal.com/license/mit-license). See [LICENSE](LICENSE)


  