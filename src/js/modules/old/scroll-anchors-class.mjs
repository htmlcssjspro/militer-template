'use strict';

// anchor.getBoundingClientRect()

export default class ScrollAnchors
{
    constructor(options) {
        this.anchors = options.anchors.map(anchor => {
            // return document.querySelector(anchor);
            return document.getElementById(anchor);
        });

        this.scrollY;

        this.scrolling;
        this.wheeling;

        this.init();
    }

    init() {
        window.addEventListener('resize', this, false);
        window.addEventListener('scroll', this, false);
        // document.addEventListener('wheel', this, false);
    }

    handleEvent(event) {
        switch (event.type) {
            case 'scroll':
                this.onScroll();
                break;
            case 'wheel':
                this.onMouseWheel(event);
                break;
            case 'resize':
                // this.setPageY();
                break;
        }
    }

    onScroll() {
        window.clearTimeout(this.scrolling);
        this.scrolling = setTimeout(() => {
            this.anchors.forEach(anchor => {
                const clientY = Math.round(anchor.getBoundingClientRect().y);
                const clientHeight = anchor.clientHeight;

                //* Next
                if (scrollY > this.scrollY
                    && clientY > 0
                    && clientY < document.documentElement.clientHeight
                    && clientY + clientHeight > document.documentElement.clientHeight) {
                    // console.log(`next --> ${anchor.id}`);
                    window.scroll({
                        top:      scrollY + clientY,
                        behavior: 'smooth'
                    });
                }

                //* Prev
                if (scrollY < this.scrollY
                    && clientY < 0
                    && clientY + clientHeight > 0
                    && clientY + clientHeight < document.documentElement.clientHeight) {
                    // console.log(`prev --> ${anchor.id}`);
                    window.scroll({
                        // top     : scrollY + clientY + (clientHeight - document.documentElement.clientHeight),
                        top:      scrollY + clientY,
                        behavior: 'smooth'
                    });
                }
            }, this);
            this.scrollY = scrollY;
        }, 60);
    }

    onMouseWheel(event) {
        window.clearTimeout(this.wheeling);
        this.wheeling = setTimeout(() => {
            this.anchors.forEach(anchor => {
                const clientY = Math.round(anchor.getBoundingClientRect().y);
                const client = clientY - event.deltaY;
                const clientHeight = anchor.clientHeight;

                //* Next
                if (event.deltaY > 0
                    && clientY > 0
                    && client < document.documentElement.clientHeight
                    && client + clientHeight > document.documentElement.clientHeight) {
                    console.log(`next --> ${anchor.id}`);
                    window.scroll({
                        top:      scrollY + clientY,
                        behavior: 'smooth'
                    });
                }

                //* Prev
                if (event.deltaY < 0
                    && clientY < 0
                    && client + clientHeight > 0
                    && client + clientHeight < document.documentElement.clientHeight) {
                    console.log(`prev --> ${anchor.id}`);
                    window.scroll({
                        top:      scrollY + clientY + (clientHeight - document.documentElement.clientHeight),
                        behavior: 'smooth'
                    });
                }
            }, this);
        }, 66);
    }

    scrollStop(callback) {
        window.removeEventListener('scroll', this, false);
        window.clearTimeout(this.scrolling);
        this.scrolling = setTimeout(() => {
            callback();
            window.addEventListener('scroll', this, false);
        }, 66);

    }

    scrollSmooth(top) {
        // window.scroll({
        //     top     : top,
        //     behavior: 'smooth'
        // });
        // anchor.scroll({
        //     top     : 0,
        //     behavior: 'smooth'
        // });
        // document.querySelector(`#${anchor}`).scrollIntoView({
        //     behavior: 'smooth',
        //     block   : 'start'
        // });
        // console.log('scrollSmooth');
    }
}
