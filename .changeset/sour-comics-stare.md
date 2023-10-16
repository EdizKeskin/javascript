---
'@clerk/backend': patch
'@clerk/shared': patch
---

Add clerkTraceId to ClerkBackendApiResponse and ClerkAPIResponseError to allow for better tracing and debugging api errors. 
Uses clerk trace id when available and defaults to cf ray id if missing. 
