import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import Component from '@ember/component';

import layout from '../templates/components/infinite-content';

/**
 * @namespace Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @type {boolean}
   */
  isScrolledToBottom: true,

  /**
   * @type {string}
   */
  didScrollToTop: false,

  /**
   * @type {number}
   */
  previousScrollHeight: 0,

  /**
   * @type {Element}
   */
  scrollerElement: computed('args', {
    get() {
      return this.args.isWindowScroller ? document.documentElement : this.element;
    },
  }),

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    if (this.args.isReversed) {
      this.scrollBackToPreviousView();
    }

    this.setupScrollListener();
  },

  /**
   * @override
   */
  didUpdate(...args) {
    this._super(...args);

    if (this.args.isReversed) {
      this.scrollBackToPreviousView();
      this.setupScrollListener();
    }
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    this.scrollerElement.removeEventListener('scroll', this.handleScroll);
  },

  /**
   * @function
   */
  setupScrollListener() {
    this.set('handleScroll', () => debounce(this, 'processScroll', 150));

    this.scrollerElement.addEventListener('scroll', this.handleScroll);
  },

  /**
   * @function
   */
  processScroll() {
    if (!this.isDestroyed) {
      if (this.args.isReversed) {
        this.processReverseScroll();
      } else {
        this.processStandardScroll();
      }
    }
  },

  /**
   * @function
   */
  processStandardScroll() {
    const { scrollHeight, scrollTop, clientHeight } = this.scrollerElement;

    this.set('isScrolledToBottom', (scrollHeight - scrollTop === clientHeight));

    if (this.isScrolledToBottom && this.args.isAbleToLoadMoreContent) {
      this.args.onLoadMoreContentEvent();
    }
  },

  /**
   * @function
   */
  processReverseScroll() {
    const { scrollHeight, scrollTop, clientHeight } = this.scrollerElement;

    this.set('isScrolledToBottom', (scrollHeight - scrollTop === clientHeight));
    this.set('didScrollToTop', false);

    if (scrollTop === 0 && this.args.isAbleToLoadMoreContent) {
      this.set('didScrollToTop', true);
      this.set('previousScrollHeight', this.scrollerElement.scrollHeight);

      this.args.onLoadMoreContentEvent();
    }
  },

  /**
   * @function
   */
  scrollBackToPreviousView() {
    if (this.isScrolledToBottom) {
      this.scrollerElement.scrollTop = this.scrollerElement.scrollHeight;
    }

    if (this.didScrollToTop) {
      this.scrollerElement.removeEventListener('scroll', this.handleScroll);

      this.scrollerElement.scrollTop = (
        this.scrollerElement.scrollHeight - this.previousScrollHeight
      );
    }
  },
});
