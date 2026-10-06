# Ch13 · Deploy & observe

**Story.** Launch day. Ops needs a container, a health check and errors in the logging pipeline before
they'll put it behind the load balancer.

## Acceptance criteria

- [ ] `src/instrumentation.ts` exports `register()` and `onRequestError` that logs structured JSON.
- [ ] `Dockerfile` is multi-stage, uses `output: "standalone"` (`BUILD_STANDALONE=1`), runs as a non-root user, and has a `HEALTHCHECK` on `/api/health`.
- [ ] `.env.example` lists every variable; real secrets are injected at runtime.
- [ ] Bonus: deploy to Vercel _and_ run the Docker image locally. Compare cache behaviour between them.

## Hints

- `docker build -t lumen . && docker run -p 3000:3000 -e REVALIDATE_SECRET=... lumen`
- In multi-instance self-hosting, the default in-memory cache isn't shared. Read about `cacheHandlers`.
- Bible → _Deployment & Observability_.

**Verify:** `npm run quest -- ch13` · then `npm run quest` (all 13 green)
