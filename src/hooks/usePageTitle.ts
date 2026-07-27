import { useEffect } from 'react';

const BASE = 'AI Leaders';
const DEFAULT_TITLE = 'AI Leaders - Harness Your AI + WordPress Powers';

// Sets document.title for the current route (client-side, for this SPA).
// Pass a page-specific title like "Graduation" to get "AI Leaders — Graduation";
// pass nothing (home) to restore the default marketing title. Restores the
// default on unmount so a route without a title never inherits a stale one.
export function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${BASE} — ${title}` : DEFAULT_TITLE;
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title]);
}
