/* eslint-disable no-underscore-dangle -- old style, should be analyzed */

/**
 * @class MountableMixin
 *
 * Mixin for objects that are mounted by Google Maps Javascript API.
 *
 * These are objects that are sensitive to element resize  operations
 * so it exposes a property which accepts a bus
 * ## The mixin code:
 * ```js
  export default {
    props: ['resizeBus'],

    data() {
      return {
        _actualResizeBus: null,
      };
    },

    created() {
      if (typeof this.resizeBus === 'undefined') {
        this.$data._actualResizeBus = this.$gmapDefaultResizeBus;
      } else {
        this.$data._actualResizeBus = this.resizeBus;
      }
    },

    methods: {
      _resizeCallback() {
        this.resize();
      },
      _delayedResizeCallback() {
        this.$nextTick(() => this._resizeCallback());
      },
    },

    watch: {
      resizeBus(newVal) {
        this.$data._actualResizeBus = newVal;
      },
      '$data._actualResizeBus': function actualResizeBus(newVal, oldVal) {
        if (oldVal) {
          oldVal.$off('resize', this._delayedResizeCallback);
        }
        if (newVal) {
          newVal.$on('resize', this._delayedResizeCallback);
        }
      },
    },

    destroyed() {
      if (this.$data._actualResizeBus) {
        this.$data._actualResizeBus.$off('resize', this._delayedResizeCallback);
      }
    },
  };
 * ```
 * @property {Function|undefined} resizeBus Vue props to set your custom resize bus function, otherwise it takes the default `$gmapDefaultResizeBus`
 * @property {Function|undefined} _actualResizeBus The current default resize bus function, **this should not be used outside of this mixin**
 */
var mountableMixin = {
  props: ['resizeBus'],
  data: function data() {
    return {
      _actualResizeBus: null
    };
  },
  created: function created() {
    if (typeof this.resizeBus === 'undefined') {
      this.$data._actualResizeBus = this.$gmapDefaultResizeBus;
    } else {
      this.$data._actualResizeBus = this.resizeBus;
    }
  },
  methods: {
    _resizeCallback: function _resizeCallback() {
      this.resize();
    },
    _delayedResizeCallback: function _delayedResizeCallback() {
      var _this = this;

      this.$nextTick(function () {
        return _this._resizeCallback();
      });
    }
  },
  watch: {
    resizeBus: function resizeBus(newVal) {
      this.$data._actualResizeBus = newVal;
    },
    '$data._actualResizeBus': function (newVal, oldVal) {
      if (oldVal) {
        oldVal.$off('resize', this._delayedResizeCallback);
      }

      if (newVal) {
        newVal.$on('resize', this._delayedResizeCallback);
      }
    }
  },
  destroyed: function destroyed() {
    if (this.$data._actualResizeBus) {
      this.$data._actualResizeBus.$off('resize', this._delayedResizeCallback);
    }
  }
};
/* eslint-enable no-underscore-dangle */

export { mountableMixin as default };
