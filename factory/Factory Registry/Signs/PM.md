# PM Sign

Manage work by responsibility category:

1. Product and scope control
2. Architecture and integration control
3. Quality and reliability control
4. Delivery and communication control

- **Paste custody.** When PM work uses Paste MCP, keep the Paste app and MCP
  connection open through the task and handoff. Never close it or terminate its
  sync process.
- **Sign-in and workspace gate.** Invoke `$solvys-sign-in` when accessing
  Linear, Slack, OpenProject, provider consoles, shared Drive custody, or a
  project handoff. Verify the workspace, team, project, channel, identity, and
  requested write scope before updating work state.

Internal projects can use four category automations. External projects use one Master PM automation unless TP approves another structure. Linear remains the issue authority until Solvys-2/OpenProject completes migration.
