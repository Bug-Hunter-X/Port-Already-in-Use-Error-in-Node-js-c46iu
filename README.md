# Node.js Port Already in Use Error

This repository demonstrates a common error in Node.js where a server fails to start because the specified port is already in use.  The `bug.js` file contains the problematic code, while `bugSolution.js` provides a solution.

## Description

When running a Node.js HTTP server, attempting to bind to a port that's already occupied by another application results in an error.  This often occurs during development if you forget to stop a previous server instance or if another application is using the same port.

## How to Reproduce

1.  Run `bug.js`.
2.  If the script fails, attempt to run it again immediately.  You might encounter an error.

## Solution

The `bugSolution.js` file demonstrates using a `try...catch` block and the `server.on('error', ...)` event listener to handle the port-in-use error gracefully.  It also includes a check to find an available port if the initial port is unavailable.