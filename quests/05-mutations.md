# Ch05 · Mutations with Server Actions

**Story.** Sales says leads with empty messages and fake emails are flooding the CRM. The contact form
`fetch`es `/api/contact`, which saves whatever it receives. Validation exists only in the browser.

## Acceptance criteria

- [ ] `submitLead` in `src/features/contact/actions.ts` is a Server Action (`"use server"`).
- [ ] The form uses `useActionState`, shows per-field errors and a pending state, and works with JS disabled.
- [ ] Input is validated with the Zod `leadSchema` on the server. Invalid input returns field errors and echoes values back.
- [ ] Side effects (email/CRM) run in `after()` so the user doesn't wait.
- [ ] The newsletter `subscribe` action calls `updateTag("subscribers")` so the footer count updates immediately.
- [ ] `src/app/api/contact` is deleted. No `fetch('/api/...')` remains in `src/`.

## Hints

- A Server Action is a public POST endpoint. Validate as if a stranger is calling it with curl.
- `updateTag` = read-your-writes (Server Actions only). `revalidateTag(tag, "max")` = stale-while-revalidate (webhooks).
- Bible → _Mutations & Server Actions_.

**Verify:** `npm run quest -- ch05`
