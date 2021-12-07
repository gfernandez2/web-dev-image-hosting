export const pageTransitionVariant = {
    initialHome: {
        y: '100vh'
    },

    initialLibrary: {
        y: '-100vh'
    },
    
    down: {
        y: '50vh'
    },

    up: {
        y: 0
    }
};

export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
};