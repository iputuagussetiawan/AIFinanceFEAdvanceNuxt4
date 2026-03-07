import { gsap } from 'gsap';

export const useLoader = () => {
    // Using Nuxt 4/Vue 3.5+ Template Refs
    const loader = useTemplateRef<HTMLElement>('loader');
    const loaderFill = useTemplateRef<HTMLElement>('loaderFill');
    const loaderBackdrop = useTemplateRef<HTMLElement>('loaderBackdrop');

    const showLoader = () => {
        if (!loader.value || !loaderFill.value) return;

        const tl = gsap.timeline();
        tl.set(loader.value, { display: 'block', pointerEvents: 'auto' })
            .set(loaderFill.value, { opacity: 1 })
            .fromTo(
                loaderFill.value,
                { scaleY: 0, transformOrigin: 'bottom bottom' },
                {
                    scaleY: 1,
                    transformOrigin: 'bottom bottom',
                    duration: 0.7,
                    ease: 'power4.inOut',
                    immediateRender: false,
                },
                0
            );
        return tl;
    };

    const hideLoader = () => {
        if (!loader.value) return;

        const tl = gsap.timeline();
        tl.set(loader.value, { pointerEvents: 'none' }, 0)
            .set(loaderBackdrop.value, { opacity: 0 }, 0)
            .to(loaderFill.value, { opacity: 0, duration: 0.4 }, 0)
            .set(loader.value, { display: 'none' });
        return tl;
    };

    return { loader, loaderFill, loaderBackdrop, showLoader, hideLoader };
};
