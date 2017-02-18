# Capsule - a Flux like State Container
## Why Capsule?
Flux, Redux, Microcosm, why another?

[This article](https://medium.com/@machnicki/why-redux-is-not-so-easy-some-alternatives-24816d5ad22d#.8cksf39gs) 
talks on some good points.

When evaluating state frameworks, one key thing I noticed was that their touch points to React was very deep.

The application needed to be architectured around the system. The system could not just be added in to an already developed
(or an app too far into development to make any large architectural changes). 
Redux was close to what I was looking for, but was pretty overwhelming.

Flux itself was light, but feels more like an example rather than a strong foundation. 
String identifiers are prone to less subtle developer error (typos?).

I wasn't looking for an application architecture. 
I was looking for a tool that provides reliable state management, with minimal implementation touch points.

## Project Design Goals
This project is just starting, so this is subject to change, but my design goals are:

 - **Container Objects are obviously called Capsules**  
   In a chat application, think that your History would be a capsule, the curret users will be a capsule,  
   a channel list would be a capsule.  
   Divide up into segments that might logically have different serialization goals.
 - **Actions are the primary API**  
   The state container itself is mostly only touched by the actions themselves.  
   The accessors to the state should only need to import and interface with the module that you define your actions in.
 - **State is modified by Mutator Actions, accessed by Retriever Actions**  
   Retriever actions may be observable. You can listen for state changes.
 - Multiple retrievers can access the same state, but apply different transformations   
   This may mean that observer receives a change in value but the other doesn't, even though they use the same state.
 - **Listeners to observables are only notified if that observable changes**  
   As just noted, while the backing state may get updated, if the transformations a retriever applies results in no 
   change in value after transformations, then the listeners will not be notified. 
 - **Retrievers are bound to a specific capsule (the state container)**
   Apps are encouraged to use many capsules for each specific state segment.  
   Some kind of capsule manager may be provided, if benefit is found.
 - **State snapshots can be taken as a "Time Capsule"**  
   Rather than keeping a log of every state change, consuming memory, applications will need to control their own state
   snapshots logic. An API to restore a capsule to a previous version will exists.
 - **Actions are Functions that return Promises**
   - No chance for typos without it being obvious!
   - I want to support custom Capsule implementations, such as external state.
   - An action may end up not being asynchronous, but the API will require it to be future proof.  
   - One can add asynchronous logic to their action without breaking the API.
 - **React Binding to map observables to component state**  
   Simple API may look something like  
   
   ```javascript
   import {bindState} from "capsule-react";
   import {history, users} from "../actions/chat"; // history and users are exported as observable actions
   class MyComp extends React.Component {
      constructor(props) {
          super(props);
          bindState(this, {users, history}); // map to state of the same names
      }
   }
   ```
   This would make the React Component subscribe to the chatActions Retriever Action 
   `history` and `users`, and any value they provide will auto synchronize to `this.state.history` and `this.state.users`
 - Cleanup on React components is automatic. It can be as simple as 3 lines in your component.

## Installation
No package is deployed yet. As this project is in early infancy.

`capsule` will be the core, non browser/react specific code

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


  
