import { useEffect, useRef } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import reportHtml from '../content/report/report.html?raw';
import './Report.css';

const PAUSE_ICON = '<rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/>';
const PLAY_ICON = '<path d="M5 3.5v9a.6.6 0 0 0 .9.5l7-4.5a.6.6 0 0 0 0-1l-7-4.5a.6.6 0 0 0-.9.5z"/>';

/** Wires up the testimonial carousel. Returns a cleanup function. */
function initTestimonials(container: HTMLElement): () => void {
    const root = container.querySelector<HTMLElement>('.tm');
    const track = container.querySelector<HTMLElement>('#tmTrack');
    const dotsWrap = container.querySelector<HTMLElement>('#tmDots');
    const count = container.querySelector<HTMLElement>('#tmCount');
    const playBtn = container.querySelector<HTMLButtonElement>('#tmPlay');
    const icon = container.querySelector<SVGElement>('#tmIcon');
    const prevBtn = container.querySelector<HTMLButtonElement>('#tmPrev');
    const nextBtn = container.querySelector<HTMLButtonElement>('#tmNext');
    if (!root || !track || !dotsWrap || !count || !playBtn || !icon || !prevBtn || !nextBtn) return () => {};

    const slides = Array.from(root.querySelectorAll<HTMLElement>('.tm-slide'));
    if (slides.length === 0) return () => {};
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let i = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let paused = reduce;
    let hold = false;
    let remaining = 0;
    let started = 0;

    // Reading time: ~4 words/sec, at least 7s.
    const dur = (s: HTMLElement) => Math.max(7000, Math.round((s.textContent ?? '').trim().split(/\s+/).length * 250));

    dotsWrap.innerHTML = '';
    const dots = slides.map((_, n) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tm-dot';
        b.setAttribute('aria-label', `Show testimonial ${n + 1}`);
        b.innerHTML = '<i></i>';
        b.addEventListener('click', () => show(n));
        dotsWrap.appendChild(b);
        return b;
    });

    function render() {
        slides.forEach((s, n) => {
            const on = n === i;
            s.classList.toggle('on', on);
            s.setAttribute('aria-hidden', on ? 'false' : 'true');
        });
        dots.forEach((d, n) => {
            d.classList.toggle('cur', n === i);
            d.classList.toggle('done', n < i);
            d.setAttribute('aria-current', n === i ? 'true' : 'false');
            const bar = d.firstElementChild as HTMLElement;
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.animation = '';
        });
        root!.style.setProperty('--dur', `${dur(slides[i])}ms`);
        count!.textContent = `${i + 1} / ${slides.length}`;
    }
    function schedule(ms: number) {
        clearTimeout(timer);
        remaining = ms;
        started = Date.now();
        if (paused || hold) return;
        timer = setTimeout(() => show(i + 1), ms);
    }
    function show(n: number) {
        i = (n + slides.length) % slides.length;
        render();
        schedule(dur(slides[i]));
    }
    function setPaused(p: boolean) {
        paused = p;
        root!.classList.toggle('playing', !p);
        playBtn!.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
        icon!.innerHTML = p ? PLAY_ICON : PAUSE_ICON;
        track!.setAttribute('aria-live', p ? 'polite' : 'off');
        if (p) clearTimeout(timer);
        else { render(); schedule(dur(slides[i])); }
    }
    function setHold(h: boolean) {
        if (hold === h) return;
        hold = h;
        root!.classList.toggle('hold', h);
        if (h) {
            clearTimeout(timer);
            remaining = Math.max(1200, remaining - (Date.now() - started));
        } else if (!paused) {
            started = Date.now();
            clearTimeout(timer);
            timer = setTimeout(() => show(i + 1), remaining);
        }
    }

    const onPrev = () => show(i - 1);
    const onNext = () => show(i + 1);
    const onPlay = () => setPaused(!paused);
    const onEnter = () => setHold(true);
    const onLeave = () => setHold(false);
    const onFocusOut = (e: FocusEvent) => { if (!root.contains(e.relatedTarget as Node | null)) setHold(false); };
    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') show(i - 1);
        else if (e.key === 'ArrowRight') show(i + 1);
    };
    const onVisibility = () => setHold(document.hidden);

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);
    playBtn.addEventListener('click', onPlay);
    root.addEventListener('mouseenter', onEnter);
    root.addEventListener('mouseleave', onLeave);
    root.addEventListener('focusin', onEnter);
    root.addEventListener('focusout', onFocusOut);
    root.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);

    setPaused(paused);
    if (paused) render();

    return () => {
        clearTimeout(timer);
        prevBtn.removeEventListener('click', onPrev);
        nextBtn.removeEventListener('click', onNext);
        playBtn.removeEventListener('click', onPlay);
        root.removeEventListener('mouseenter', onEnter);
        root.removeEventListener('mouseleave', onLeave);
        root.removeEventListener('focusin', onEnter);
        root.removeEventListener('focusout', onFocusOut);
        root.removeEventListener('keydown', onKey);
        document.removeEventListener('visibilitychange', onVisibility);
    };
}

/** Wires up the Expand/Collapse button on the syllabus viewer. */
function initSyllabusViewer(container: HTMLElement): () => void {
    const viewer = container.querySelector<HTMLElement>('#sylViewer');
    const btn = container.querySelector<HTMLButtonElement>('#sylExpand');
    if (!viewer || !btn) return () => {};
    const onClick = () => {
        const open = viewer.classList.toggle('open');
        btn.textContent = open ? 'Collapse' : 'Expand';
        btn.setAttribute('aria-expanded', String(open));
        if (!open) viewer.scrollIntoView({ block: 'start' });
    };
    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
}

function Report() {
    usePageTitle('Cohort 1 Report');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const cleanups = [initTestimonials(el), initSyllabusViewer(el)];
        return () => cleanups.forEach((fn) => fn());
    }, []);

    return (
        <div className="report">
            {/* Static, first-party report content (src/content/report/report.html). */}
            <div ref={ref} className="wrap" dangerouslySetInnerHTML={{ __html: reportHtml }} />
        </div>
    );
}

export default Report;
