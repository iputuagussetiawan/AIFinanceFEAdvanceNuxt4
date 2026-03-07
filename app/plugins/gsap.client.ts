import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(
        Observer,
        ScrollTrigger,
        ScrollSmoother,
        ScrollToPlugin,
        SplitText
    );

    if (process.client) {
        gsap.registerPlugin(
            Draggable,
            ScrollTrigger,
            ScrollSmoother,
            ScrollToPlugin,
            SplitText
        );

        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,
            effects: true,
        });
    }

    return {
        provide: {
            gsap,
            Observer,
            scrollTrigger: ScrollTrigger,
            scrollTo: ScrollToPlugin,
            Draggable,
            ScrollSmoother,
            SplitText,
        },
    };
});
