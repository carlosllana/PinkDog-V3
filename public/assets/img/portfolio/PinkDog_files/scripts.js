/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.bootstrap = factory());
})(this, function() {
  "use strict";
  const elementMap = /* @__PURE__ */ new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };
  const MAX_UID = 1e6;
  const MILLISECONDS_MULTIPLIER = 1e3;
  const TRANSITION_END = "transitionend";
  const parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  const toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  const getUID = (prefix) => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement$1 = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  const getElement = (object) => {
    if (isElement$1(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = (element) => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  const findShadowRoot = (element) => {
    if (!document.documentElement.attachShadow) {
      return null;
    }
    if (typeof element.getRootNode === "function") {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {
  };
  const reflow = (element) => {
    element.offsetHeight;
  };
  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === "rtl";
  const defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };
  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {};
  let uidEvent = 1;
  const customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, "config") : {};
      return {
        ...this.constructor.Default,
        ...typeof jsonConfig === "object" ? jsonConfig : {},
        ...isElement$1(element) ? Manipulator.getDataAttributes(element) : {},
        ...typeof config === "object" ? config : {}
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement$1(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }
  const VERSION = "5.3.3";
  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }
  const getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  const enableDismissTrigger = (component, method = "hide") => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);
      instance[method]();
    });
  };
  const NAME$f = "alert";
  const DATA_KEY$a = "bs.alert";
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = "fade";
  const CLASS_NAME_SHOW$8 = "show";
  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }
    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }
    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }
  enableDismissTrigger(Alert, "close");
  defineJQueryPlugin(Alert);
  const NAME$e = "button";
  const DATA_KEY$9 = "bs.button";
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = ".data-api";
  const CLASS_NAME_ACTIVE$3 = "active";
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }
    // Public
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Button.getOrCreateInstance(this);
        if (config === "toggle") {
          data[config]();
        }
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  defineJQueryPlugin(Button);
  const NAME$d = "swipe";
  const EVENT_KEY$9 = ".bs.swipe";
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = "touch";
  const POINTER_TYPE_PEN = "pen";
  const CLASS_NAME_POINTER_EVENT = "pointer-event";
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)"
  };
  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }
    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }
    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }
    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }
    // Static
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }
  const NAME$c = "carousel";
  const DATA_KEY$8 = "bs.carousel";
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = ".data-api";
  const ARROW_LEFT_KEY$1 = "ArrowLeft";
  const ARROW_RIGHT_KEY$1 = "ArrowRight";
  const TOUCHEVENT_COMPAT_WAIT = 500;
  const ORDER_NEXT = "next";
  const ORDER_PREV = "prev";
  const DIRECTION_LEFT = "left";
  const DIRECTION_RIGHT = "right";
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = "carousel";
  const CLASS_NAME_ACTIVE$2 = "active";
  const CLASS_NAME_SLIDE = "slide";
  const CLASS_NAME_END = "carousel-item-end";
  const CLASS_NAME_START = "carousel-item-start";
  const CLASS_NAME_NEXT = "carousel-item-next";
  const CLASS_NAME_PREV = "carousel-item-prev";
  const SELECTOR_ACTIVE = ".active";
  const SELECTOR_ITEM = ".carousel-item";
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = ".carousel-item img";
  const SELECTOR_INDICATORS = ".carousel-indicators";
  const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5e3,
    keyboard: true,
    pause: "hover",
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: "(number|boolean)",
    // TODO:v6 remove boolean support
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean"
  };
  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }
    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }
    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order2, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }
    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
      }
      if (this._config.pause === "hover") {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== "hover") {
          return;
        }
        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute("aria-current");
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute("aria-current", "true");
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order2, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order2 === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = (eventName) => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order2),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order2) {
      if (isRTL()) {
        return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === "number") {
          data.to(config);
          return;
        }
        if (typeof config === "string") {
          if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute("data-bs-slide-to");
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, "slide") === "next") {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });
  defineJQueryPlugin(Carousel);
  const NAME$b = "collapse";
  const DATA_KEY$7 = "bs.collapse";
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = ".data-api";
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = "show";
  const CLASS_NAME_COLLAPSE = "collapse";
  const CLASS_NAME_COLLAPSING = "collapsing";
  const CLASS_NAME_COLLAPSED = "collapsed";
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  const WIDTH = "width";
  const HEIGHT = "height";
  const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: "(null|element)",
    toggle: "boolean"
  };
  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }
    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = "";
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = "";
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }
    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle);
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute("aria-expanded", isOpen);
      }
    }
    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function() {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });
  defineJQueryPlugin(Collapse);
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  const applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$2,
    requires: ["computeStyles"]
  };
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
    }
    return navigator.userAgent;
  }
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }
    var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : (
      // $FlowFixMe[prop-missing]
      element.document
    )) || window.document).documentElement;
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element)
    );
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle$1(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
  }
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }
  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect$1(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }
    state.elements.arrow = arrowElement;
  }
  const arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect$1,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x, y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          offsetParent[heightProp]
        );
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          offsetParent[widthProp]
        );
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }, getWindow(popper2)) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  const computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  var passive = {
    passive: true
  };
  function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  const eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect,
    data: {}
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched];
    });
  }
  var hash = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched];
    });
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }
  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle$1(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)))
    );
  }
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }
  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b];
    });
  }
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }
  function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
              return check;
            });
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break")
          break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  const flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  const hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  const offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    });
  }
  const popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min$1 = offset2 + overflow[mainSide];
      var max$1 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  const preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref) {
          var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
          if (typeof effect2 === "function") {
            var cleanupFn = effect2({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var createPopper$2 = /* @__PURE__ */ popperGenerator();
  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /* @__PURE__ */ popperGenerator({
    defaultModifiers: defaultModifiers$1
  });
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  const Popper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    afterMain,
    afterRead,
    afterWrite,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    auto,
    basePlacements,
    beforeMain,
    beforeRead,
    beforeWrite,
    bottom,
    clippingParents,
    computeStyles: computeStyles$1,
    createPopper,
    createPopperBase: createPopper$2,
    createPopperLite: createPopper$1,
    detectOverflow,
    end,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    left,
    main,
    modifierPhases,
    offset: offset$1,
    placements,
    popper,
    popperGenerator,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1,
    read,
    reference,
    right,
    start,
    top,
    variationPlacements,
    viewport,
    write
  }, Symbol.toStringTag, { value: "Module" }));
  const NAME$a = "dropdown";
  const DATA_KEY$6 = "bs.dropdown";
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = ".data-api";
  const ESCAPE_KEY$2 = "Escape";
  const TAB_KEY$1 = "Tab";
  const ARROW_UP_KEY$1 = "ArrowUp";
  const ARROW_DOWN_KEY$1 = "ArrowDown";
  const RIGHT_MOUSE_BUTTON = 2;
  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = "show";
  const CLASS_NAME_DROPUP = "dropup";
  const CLASS_NAME_DROPEND = "dropend";
  const CLASS_NAME_DROPSTART = "dropstart";
  const CLASS_NAME_DROPUP_CENTER = "dropup-center";
  const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = ".dropdown-menu";
  const SELECTOR_NAVBAR = ".navbar";
  const SELECTOR_NAVBAR_NAV = ".navbar-nav";
  const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  const PLACEMENT_TOPCENTER = "top";
  const PLACEMENT_BOTTOMCENTER = "bottom";
  const Default$9 = {
    autoClose: true,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle"
  };
  const DefaultType$9 = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)"
  };
  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode;
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }
    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }
    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();
      if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }
    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute("aria-expanded", "false");
      Manipulator.removeDataAttribute(this._menu, "popper");
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === "object" && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      }
      let referenceElement = this._element;
      if (this._config.reference === "parent") {
        referenceElement = this._parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }
      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset: offset2
      } = this._config;
      if (typeof offset2 === "string") {
        return offset2.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset2 === "function") {
        return (popperData) => offset2(popperData, this._element);
      }
      return offset2;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }]
      };
      if (this._inNavbar || this._config.display === "static") {
        Manipulator.setDataAttribute(this._menu, "popper", "static");
        defaultBsPopperConfig.modifiers = [{
          name: "applyStyles",
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
      if (!items.length) {
        return;
      }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  defineJQueryPlugin(Dropdown);
  const NAME$9 = "backdrop";
  const CLASS_NAME_FADE$4 = "fade";
  const CLASS_NAME_SHOW$5 = "show";
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: "body"
    // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)"
  };
  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }
    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }
    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }
    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement("div");
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }
  const NAME$8 = "focustrap";
  const DATA_KEY$5 = "bs.focustrap";
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = "Tab";
  const TAB_NAV_FORWARD = "forward";
  const TAB_NAV_BACKWARD = "backward";
  const Default$7 = {
    autofocus: true,
    trapElement: null
    // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: "boolean",
    trapElement: "element"
  };
  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }
    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }
    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5);
      EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }
    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }
  const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
  const SELECTOR_STICKY_CONTENT = ".sticky-top";
  const PROPERTY_PADDING = "padding-right";
  const PROPERTY_MARGIN = "margin-right";
  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }
    // Public
    getWidth() {
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow");
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow");
      this._element.style.overflow = "hidden";
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = (element) => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = (element) => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }
  const NAME$7 = "modal";
  const DATA_KEY$4 = "bs.modal";
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = ".data-api";
  const ESCAPE_KEY$1 = "Escape";
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = "modal-open";
  const CLASS_NAME_FADE$3 = "fade";
  const CLASS_NAME_SHOW$4 = "show";
  const CLASS_NAME_STATIC = "modal-static";
  const OPEN_SELECTOR$1 = ".modal.show";
  const SELECTOR_DIALOG = ".modal-dialog";
  const SELECTOR_MODAL_BODY = ".modal-body";
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: "(boolean|string)",
    focus: "boolean",
    keyboard: "boolean"
  };
  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = "block";
      this._element.removeAttribute("aria-hidden");
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none";
      this._element.setAttribute("aria-hidden", true);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = "hidden";
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */
    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? "paddingLeft" : "paddingRight";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? "paddingRight" : "paddingLeft";
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "";
      this._element.style.paddingRight = "";
    }
    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function() {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
      if (showEvent.defaultPrevented) {
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  defineJQueryPlugin(Modal);
  const NAME$6 = "offcanvas";
  const DATA_KEY$3 = "bs.offcanvas";
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = ".data-api";
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = "Escape";
  const CLASS_NAME_SHOW$3 = "show";
  const CLASS_NAME_SHOWING$1 = "showing";
  const CLASS_NAME_HIDING = "hiding";
  const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
  const OPEN_SELECTOR = ".offcanvas.show";
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    scroll: "boolean"
  };
  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }
    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }
    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute("aria-modal", true);
      this._element.setAttribute("role", "dialog");
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === "static") {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };
      const isVisible2 = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible2,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible2 ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) {
      if (getComputedStyle(element).position !== "fixed") {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);
  defineJQueryPlugin(Offcanvas);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  const uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }
    return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === "function") {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }
  const NAME$5 = "TemplateFactory";
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: "",
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: "<div></div>"
  };
  const DefaultType$4 = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string"
  };
  const DefaultContentType = {
    entry: "(string|element|function|null)",
    selector: "(string|element)"
  };
  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }
    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }
    // Public
    getContent() {
      return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement("div");
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(" "));
      }
      return template;
    }
    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement$1(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = "";
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }
  const NAME$4 = "tooltip";
  const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
  const CLASS_NAME_FADE$2 = "fade";
  const CLASS_NAME_MODAL = "modal";
  const CLASS_NAME_SHOW$2 = "show";
  const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = "hide.bs.modal";
  const TRIGGER_HOVER = "hover";
  const TRIGGER_FOCUS = "focus";
  const TRIGGER_CLICK = "click";
  const TRIGGER_MANUAL = "manual";
  const EVENT_HIDE$2 = "hide";
  const EVENT_HIDDEN$2 = "hidden";
  const EVENT_SHOW$2 = "show";
  const EVENT_SHOWN$2 = "shown";
  const EVENT_INSERTED = "inserted";
  const EVENT_CLICK$1 = "click";
  const EVENT_FOCUSIN$1 = "focusin";
  const EVENT_FOCUSOUT$1 = "focusout";
  const EVENT_MOUSEENTER = "mouseenter";
  const EVENT_MOUSELEAVE = "mouseleave";
  const AttachmentMap = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: isRTL() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: isRTL() ? "right" : "left"
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: "clippingParents",
    container: false,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: false,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus"
  };
  const DefaultType$3 = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string"
  };
  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      }
      super(element, config);
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }
    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }
    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute("data-bs-original-title")) {
        this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === "none") {
        throw new Error("Please use show on visible elements");
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, "mouseover", noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, "mouseover", noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null;
      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute("aria-describedby");
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }
    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute("id", tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset: offset2
      } = this._config;
      if (typeof offset2 === "string") {
        return offset2.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset2 === "function") {
        return (popperData) => offset2(popperData, this._element);
      }
      return offset2;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }, {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: "preSetPlacement",
          enabled: true,
          phase: "beforeMain",
          fn: (data) => {
            this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(" ");
      for (const trigger of triggers) {
        if (trigger === "click") {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute("title");
      if (!title) {
        return;
      }
      if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
        this._element.setAttribute("aria-label", title);
      }
      this._element.setAttribute("data-bs-original-title", title);
      this._element.removeAttribute("title");
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...typeof config === "object" && config ? config : {}
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === "number") {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === "number") {
        config.title = config.title.toString();
      }
      if (typeof config.content === "number") {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = "manual";
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }
  defineJQueryPlugin(Tooltip);
  const NAME$3 = "popover";
  const SELECTOR_TITLE = ".popover-header";
  const SELECTOR_CONTENT = ".popover-body";
  const Default$2 = {
    ...Tooltip.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click"
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: "(null|string|element|function)"
  };
  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }
    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }
  defineJQueryPlugin(Popover);
  const NAME$2 = "scrollspy";
  const DATA_KEY$2 = "bs.scrollspy";
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = ".data-api";
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
  const CLASS_NAME_ACTIVE$1 = "active";
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = "[href]";
  const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
  const SELECTOR_NAV_LINKS = ".nav-link";
  const SELECTOR_NAV_ITEMS = ".nav-item";
  const SELECTOR_LIST_ITEMS = ".list-group-item";
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = ".dropdown";
  const SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "0px 0px -25%",
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: "(number|null)",
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array"
  };
  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh();
    }
    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }
    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }
    // Private
    _configAfterMerge(config) {
      config.target = getElement(config.target) || document.body;
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === "string") {
        config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: "smooth"
            });
            return;
          }
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver((entries) => this._observerCallback(entries), options);
    }
    // The logic of selection
    _observerCallback(entries) {
      const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
      const activate = (entry) => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          if (!parentScrollTop) {
            return;
          }
          continue;
        }
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  defineJQueryPlugin(ScrollSpy);
  const NAME$1 = "tab";
  const DATA_KEY$1 = "bs.tab";
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = "ArrowLeft";
  const ARROW_RIGHT_KEY = "ArrowRight";
  const ARROW_UP_KEY = "ArrowUp";
  const ARROW_DOWN_KEY = "ArrowDown";
  const HOME_KEY = "Home";
  const END_KEY = "End";
  const CLASS_NAME_ACTIVE = "active";
  const CLASS_NAME_FADE$1 = "fade";
  const CLASS_NAME_SHOW$1 = "show";
  const CLASS_DROPDOWN = "dropdown";
  const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = ".nav-item, .list-group-item";
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
      }
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    // Getters
    static get NAME() {
      return NAME$1;
    }
    // Public
    show() {
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }
    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute("tabindex");
        element.setAttribute("aria-selected", true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute("aria-selected", false);
        element.setAttribute("tabindex", "-1");
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const children = this._getChildren().filter((element) => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((child) => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, "role", "tablist");
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute("aria-selected", isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, "role", "presentation");
      }
      if (!isActive) {
        child.setAttribute("tabindex", "-1");
      }
      this._setAttributeIfNotExists(child, "role", "tab");
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, "role", "tabpanel");
      if (child.id) {
        this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element2 = SelectorEngine.findOne(selector, outerElem);
        if (element2) {
          element2.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute("aria-expanded", open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }
    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }
    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }
  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  defineJQueryPlugin(Tab);
  const NAME = "toast";
  const DATA_KEY = "bs.toast";
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = "fade";
  const CLASS_NAME_HIDE = "hide";
  const CLASS_NAME_SHOW = "show";
  const CLASS_NAME_SHOWING = "showing";
  const DefaultType = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5e3
  };
  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }
    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }
    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE);
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE);
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }
    // Private
    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case "mouseover":
        case "mouseout": {
          this._hasMouseInteraction = isInteracting;
          break;
        }
        case "focusin":
        case "focusout": {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }
  enableDismissTrigger(Toast);
  defineJQueryPlugin(Toast);
  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };
  return index_umd;
});


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXI6c2NyaXB0L2dsb2JhbDpzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICAqIEJvb3RzdHJhcCB2NS4zLjMgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyNCBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuYm9vdHN0cmFwID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIGRvbS9kYXRhLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IGVsZW1lbnRNYXAgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IERhdGEgPSB7XG4gICAgc2V0KGVsZW1lbnQsIGtleSwgaW5zdGFuY2UpIHtcbiAgICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudE1hcC5zZXQoZWxlbWVudCwgbmV3IE1hcCgpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluc3RhbmNlTWFwID0gZWxlbWVudE1hcC5nZXQoZWxlbWVudCk7XG5cbiAgICAgIC8vIG1ha2UgaXQgY2xlYXIgd2Ugb25seSB3YW50IG9uZSBpbnN0YW5jZSBwZXIgZWxlbWVudFxuICAgICAgLy8gY2FuIGJlIHJlbW92ZWQgbGF0ZXIgd2hlbiBtdWx0aXBsZSBrZXkvaW5zdGFuY2VzIGFyZSBmaW5lIHRvIGJlIHVzZWRcbiAgICAgIGlmICghaW5zdGFuY2VNYXAuaGFzKGtleSkgJiYgaW5zdGFuY2VNYXAuc2l6ZSAhPT0gMCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKGBCb290c3RyYXAgZG9lc24ndCBhbGxvdyBtb3JlIHRoYW4gb25lIGluc3RhbmNlIHBlciBlbGVtZW50LiBCb3VuZCBpbnN0YW5jZTogJHtBcnJheS5mcm9tKGluc3RhbmNlTWFwLmtleXMoKSlbMF19LmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpbnN0YW5jZU1hcC5zZXQoa2V5LCBpbnN0YW5jZSk7XG4gICAgfSxcbiAgICBnZXQoZWxlbWVudCwga2V5KSB7XG4gICAgICBpZiAoZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpLmdldChrZXkpIHx8IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZShlbGVtZW50LCBrZXkpIHtcbiAgICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5zdGFuY2VNYXAgPSBlbGVtZW50TWFwLmdldChlbGVtZW50KTtcbiAgICAgIGluc3RhbmNlTWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgICAvLyBmcmVlIHVwIGVsZW1lbnQgcmVmZXJlbmNlcyBpZiB0aGVyZSBhcmUgbm8gaW5zdGFuY2VzIGxlZnQgZm9yIGFuIGVsZW1lbnRcbiAgICAgIGlmIChpbnN0YW5jZU1hcC5zaXplID09PSAwKSB7XG4gICAgICAgIGVsZW1lbnRNYXAuZGVsZXRlKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHV0aWwvaW5kZXguanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE1BWF9VSUQgPSAxMDAwMDAwO1xuICBjb25zdCBNSUxMSVNFQ09ORFNfTVVMVElQTElFUiA9IDEwMDA7XG4gIGNvbnN0IFRSQU5TSVRJT05fRU5EID0gJ3RyYW5zaXRpb25lbmQnO1xuXG4gIC8qKlxuICAgKiBQcm9wZXJseSBlc2NhcGUgSURzIHNlbGVjdG9ycyB0byBoYW5kbGUgd2VpcmQgSURzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29uc3QgcGFyc2VTZWxlY3RvciA9IHNlbGVjdG9yID0+IHtcbiAgICBpZiAoc2VsZWN0b3IgJiYgd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLmVzY2FwZSkge1xuICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBuZWVkcyBlc2NhcGluZyB0byBoYW5kbGUgSURzIChodG1sNSspIGNvbnRhaW5pbmcgZm9yIGluc3RhbmNlIC9cbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvIyhbXlxcc1wiIyddKykvZywgKG1hdGNoLCBpZCkgPT4gYCMke0NTUy5lc2NhcGUoaWQpfWApO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH07XG5cbiAgLy8gU2hvdXQtb3V0IEFuZ3VzIENyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG4gIGNvbnN0IHRvVHlwZSA9IG9iamVjdCA9PiB7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAke29iamVjdH1gO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBVdGlsIEFQSVxuICAgKi9cblxuICBjb25zdCBnZXRVSUQgPSBwcmVmaXggPT4ge1xuICAgIGRvIHtcbiAgICAgIHByZWZpeCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKTtcbiAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKTtcbiAgICByZXR1cm4gcHJlZml4O1xuICB9O1xuICBjb25zdCBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCA9IGVsZW1lbnQgPT4ge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICBsZXQge1xuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgdHJhbnNpdGlvbkRlbGF5XG4gICAgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EZWxheSA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSk7XG5cbiAgICAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG4gICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElmIG11bHRpcGxlIGR1cmF0aW9ucyBhcmUgZGVmaW5lZCwgdGFrZSB0aGUgZmlyc3RcbiAgICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXTtcbiAgICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXTtcbiAgICByZXR1cm4gKE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbikgKyBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSO1xuICB9O1xuICBjb25zdCB0cmlnZ2VyVHJhbnNpdGlvbkVuZCA9IGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoVFJBTlNJVElPTl9FTkQpKTtcbiAgfTtcbiAgY29uc3QgaXNFbGVtZW50JDEgPSBvYmplY3QgPT4ge1xuICAgIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqZWN0LmpxdWVyeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9iamVjdCA9IG9iamVjdFswXTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnO1xuICB9O1xuICBjb25zdCBnZXRFbGVtZW50ID0gb2JqZWN0ID0+IHtcbiAgICAvLyBpdCdzIGEgalF1ZXJ5IG9iamVjdCBvciBhIG5vZGUgZWxlbWVudFxuICAgIGlmIChpc0VsZW1lbnQkMShvYmplY3QpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0LmpxdWVyeSA/IG9iamVjdFswXSA6IG9iamVjdDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJzZVNlbGVjdG9yKG9iamVjdCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgY29uc3QgaXNWaXNpYmxlID0gZWxlbWVudCA9PiB7XG4gICAgaWYgKCFpc0VsZW1lbnQkMShlbGVtZW50KSB8fCBlbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRJc1Zpc2libGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSA9PT0gJ3Zpc2libGUnO1xuICAgIC8vIEhhbmRsZSBgZGV0YWlsc2AgZWxlbWVudCBhcyBpdHMgY29udGVudCBtYXkgZmFsc2llIGFwcGVhciB2aXNpYmxlIHdoZW4gaXQgaXMgY2xvc2VkXG4gICAgY29uc3QgY2xvc2VkRGV0YWlscyA9IGVsZW1lbnQuY2xvc2VzdCgnZGV0YWlsczpub3QoW29wZW5dKScpO1xuICAgIGlmICghY2xvc2VkRGV0YWlscykge1xuICAgICAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGU7XG4gICAgfVxuICAgIGlmIChjbG9zZWREZXRhaWxzICE9PSBlbGVtZW50KSB7XG4gICAgICBjb25zdCBzdW1tYXJ5ID0gZWxlbWVudC5jbG9zZXN0KCdzdW1tYXJ5Jyk7XG4gICAgICBpZiAoc3VtbWFyeSAmJiBzdW1tYXJ5LnBhcmVudE5vZGUgIT09IGNsb3NlZERldGFpbHMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHN1bW1hcnkgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudElzVmlzaWJsZTtcbiAgfTtcbiAgY29uc3QgaXNEaXNhYmxlZCA9IGVsZW1lbnQgPT4ge1xuICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZWxlbWVudC5kaXNhYmxlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRpc2FibGVkO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgIT09ICdmYWxzZSc7XG4gIH07XG4gIGNvbnN0IGZpbmRTaGFkb3dSb290ID0gZWxlbWVudCA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoU2hhZG93KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBDYW4gZmluZCB0aGUgc2hhZG93IHJvb3Qgb3RoZXJ3aXNlIGl0J2xsIHJldHVybiB0aGUgZG9jdW1lbnRcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQuZ2V0Um9vdE5vZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHJvb3QgPSBlbGVtZW50LmdldFJvb3ROb2RlKCk7XG4gICAgICByZXR1cm4gcm9vdCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgPyByb290IDogbnVsbDtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyB3aGVuIHdlIGRvbid0IGZpbmQgYSBzaGFkb3cgcm9vdFxuICAgIGlmICghZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZpbmRTaGFkb3dSb290KGVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIH07XG4gIGNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogVHJpY2sgdG8gcmVzdGFydCBhbiBlbGVtZW50J3MgYW5pbWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cuY2hhcmlzdGhlby5pby9ibG9nLzIwMjEvMDIvcmVzdGFydC1hLWNzcy1hbmltYXRpb24td2l0aC1qYXZhc2NyaXB0LyNyZXN0YXJ0aW5nLWEtY3NzLWFuaW1hdGlvblxuICAgKi9cbiAgY29uc3QgcmVmbG93ID0gZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5vZmZzZXRIZWlnaHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gIH07XG4gIGNvbnN0IGdldGpRdWVyeSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmpRdWVyeSAmJiAhZG9jdW1lbnQuYm9keS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYnMtbm8tanF1ZXJ5JykpIHtcbiAgICAgIHJldHVybiB3aW5kb3cualF1ZXJ5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgY29uc3QgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcyA9IFtdO1xuICBjb25zdCBvbkRPTUNvbnRlbnRMb2FkZWQgPSBjYWxsYmFjayA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgLy8gYWRkIGxpc3RlbmVyIG9uIHRoZSBmaXJzdCBjYWxsIHdoZW4gdGhlIGRvY3VtZW50IGlzIGluIGxvYWRpbmcgc3RhdGVcbiAgICAgIGlmICghRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBpc1JUTCA9ICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnO1xuICBjb25zdCBkZWZpbmVKUXVlcnlQbHVnaW4gPSBwbHVnaW4gPT4ge1xuICAgIG9uRE9NQ29udGVudExvYWRlZCgoKSA9PiB7XG4gICAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KCk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICgkKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBwbHVnaW4uTkFNRTtcbiAgICAgICAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltuYW1lXTtcbiAgICAgICAgJC5mbltuYW1lXSA9IHBsdWdpbi5qUXVlcnlJbnRlcmZhY2U7XG4gICAgICAgICQuZm5bbmFtZV0uQ29uc3RydWN0b3IgPSBwbHVnaW47XG4gICAgICAgICQuZm5bbmFtZV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgICAgICAgICAkLmZuW25hbWVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgICAgIHJldHVybiBwbHVnaW4ualF1ZXJ5SW50ZXJmYWNlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBjb25zdCBleGVjdXRlID0gKHBvc3NpYmxlQ2FsbGJhY2ssIGFyZ3MgPSBbXSwgZGVmYXVsdFZhbHVlID0gcG9zc2libGVDYWxsYmFjaykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgcG9zc2libGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IHBvc3NpYmxlQ2FsbGJhY2soLi4uYXJncykgOiBkZWZhdWx0VmFsdWU7XG4gIH07XG4gIGNvbnN0IGV4ZWN1dGVBZnRlclRyYW5zaXRpb24gPSAoY2FsbGJhY2ssIHRyYW5zaXRpb25FbGVtZW50LCB3YWl0Rm9yVHJhbnNpdGlvbiA9IHRydWUpID0+IHtcbiAgICBpZiAoIXdhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZHVyYXRpb25QYWRkaW5nID0gNTtcbiAgICBjb25zdCBlbXVsYXRlZER1cmF0aW9uID0gZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodHJhbnNpdGlvbkVsZW1lbnQpICsgZHVyYXRpb25QYWRkaW5nO1xuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBoYW5kbGVyID0gKHtcbiAgICAgIHRhcmdldFxuICAgIH0pID0+IHtcbiAgICAgIGlmICh0YXJnZXQgIT09IHRyYW5zaXRpb25FbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICB0cmFuc2l0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFRSQU5TSVRJT05fRU5ELCBoYW5kbGVyKTtcbiAgICAgIGV4ZWN1dGUoY2FsbGJhY2spO1xuICAgIH07XG4gICAgdHJhbnNpdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9OX0VORCwgaGFuZGxlcik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSwgZW11bGF0ZWREdXJhdGlvbik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcHJldmlvdXMvbmV4dCBlbGVtZW50IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdCAgICBUaGUgbGlzdCBvZiBlbGVtZW50c1xuICAgKiBAcGFyYW0gYWN0aXZlRWxlbWVudCAgIFRoZSBhY3RpdmUgZWxlbWVudFxuICAgKiBAcGFyYW0gc2hvdWxkR2V0TmV4dCAgIENob29zZSB0byBnZXQgbmV4dCBvciBwcmV2aW91cyBlbGVtZW50XG4gICAqIEBwYXJhbSBpc0N5Y2xlQWxsb3dlZFxuICAgKiBAcmV0dXJuIHtFbGVtZW50fGVsZW19IFRoZSBwcm9wZXIgZWxlbWVudFxuICAgKi9cbiAgY29uc3QgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQgPSAobGlzdCwgYWN0aXZlRWxlbWVudCwgc2hvdWxkR2V0TmV4dCwgaXNDeWNsZUFsbG93ZWQpID0+IHtcbiAgICBjb25zdCBsaXN0TGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGxpc3QgcmV0dXJuIGFuIGVsZW1lbnRcbiAgICAvLyBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvbiBhbmQgaWYgY3ljbGUgaXMgYWxsb3dlZFxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAhc2hvdWxkR2V0TmV4dCAmJiBpc0N5Y2xlQWxsb3dlZCA/IGxpc3RbbGlzdExlbmd0aCAtIDFdIDogbGlzdFswXTtcbiAgICB9XG4gICAgaW5kZXggKz0gc2hvdWxkR2V0TmV4dCA/IDEgOiAtMTtcbiAgICBpZiAoaXNDeWNsZUFsbG93ZWQpIHtcbiAgICAgIGluZGV4ID0gKGluZGV4ICsgbGlzdExlbmd0aCkgJSBsaXN0TGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdFtNYXRoLm1heCgwLCBNYXRoLm1pbihpbmRleCwgbGlzdExlbmd0aCAtIDEpKV07XG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBkb20vZXZlbnQtaGFuZGxlci5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IG5hbWVzcGFjZVJlZ2V4ID0gL1teLl0qKD89XFwuLiopXFwufC4qLztcbiAgY29uc3Qgc3RyaXBOYW1lUmVnZXggPSAvXFwuLiovO1xuICBjb25zdCBzdHJpcFVpZFJlZ2V4ID0gLzo6XFxkKyQvO1xuICBjb25zdCBldmVudFJlZ2lzdHJ5ID0ge307IC8vIEV2ZW50cyBzdG9yYWdlXG4gIGxldCB1aWRFdmVudCA9IDE7XG4gIGNvbnN0IGN1c3RvbUV2ZW50cyA9IHtcbiAgICBtb3VzZWVudGVyOiAnbW91c2VvdmVyJyxcbiAgICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG4gIH07XG4gIGNvbnN0IG5hdGl2ZUV2ZW50cyA9IG5ldyBTZXQoWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZXVwJywgJ21vdXNlZG93bicsICdjb250ZXh0bWVudScsICdtb3VzZXdoZWVsJywgJ0RPTU1vdXNlU2Nyb2xsJywgJ21vdXNlb3ZlcicsICdtb3VzZW91dCcsICdtb3VzZW1vdmUnLCAnc2VsZWN0c3RhcnQnLCAnc2VsZWN0ZW5kJywgJ2tleWRvd24nLCAna2V5cHJlc3MnLCAna2V5dXAnLCAnb3JpZW50YXRpb25jaGFuZ2UnLCAndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAncG9pbnRlcmRvd24nLCAncG9pbnRlcm1vdmUnLCAncG9pbnRlcnVwJywgJ3BvaW50ZXJsZWF2ZScsICdwb2ludGVyY2FuY2VsJywgJ2dlc3R1cmVzdGFydCcsICdnZXN0dXJlY2hhbmdlJywgJ2dlc3R1cmVlbmQnLCAnZm9jdXMnLCAnYmx1cicsICdjaGFuZ2UnLCAncmVzZXQnLCAnc2VsZWN0JywgJ3N1Ym1pdCcsICdmb2N1c2luJywgJ2ZvY3Vzb3V0JywgJ2xvYWQnLCAndW5sb2FkJywgJ2JlZm9yZXVubG9hZCcsICdyZXNpemUnLCAnbW92ZScsICdET01Db250ZW50TG9hZGVkJywgJ3JlYWR5c3RhdGVjaGFuZ2UnLCAnZXJyb3InLCAnYWJvcnQnLCAnc2Nyb2xsJ10pO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIG1ldGhvZHNcbiAgICovXG5cbiAgZnVuY3Rpb24gbWFrZUV2ZW50VWlkKGVsZW1lbnQsIHVpZCkge1xuICAgIHJldHVybiB1aWQgJiYgYCR7dWlkfTo6JHt1aWRFdmVudCsrfWAgfHwgZWxlbWVudC51aWRFdmVudCB8fCB1aWRFdmVudCsrO1xuICB9XG4gIGZ1bmN0aW9uIGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCkge1xuICAgIGNvbnN0IHVpZCA9IG1ha2VFdmVudFVpZChlbGVtZW50KTtcbiAgICBlbGVtZW50LnVpZEV2ZW50ID0gdWlkO1xuICAgIGV2ZW50UmVnaXN0cnlbdWlkXSA9IGV2ZW50UmVnaXN0cnlbdWlkXSB8fCB7fTtcbiAgICByZXR1cm4gZXZlbnRSZWdpc3RyeVt1aWRdO1xuICB9XG4gIGZ1bmN0aW9uIGJvb3RzdHJhcEhhbmRsZXIoZWxlbWVudCwgZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgaHlkcmF0ZU9iaihldmVudCwge1xuICAgICAgICBkZWxlZ2F0ZVRhcmdldDogZWxlbWVudFxuICAgICAgfSk7XG4gICAgICBpZiAoaGFuZGxlci5vbmVPZmYpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9mZihlbGVtZW50LCBldmVudC50eXBlLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm4uYXBwbHkoZWxlbWVudCwgW2V2ZW50XSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBzZWxlY3RvciwgZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgY29uc3QgZG9tRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgZm9yIChsZXQge1xuICAgICAgICB0YXJnZXRcbiAgICAgIH0gPSBldmVudDsgdGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpczsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBkb21FbGVtZW50IG9mIGRvbUVsZW1lbnRzKSB7XG4gICAgICAgICAgaWYgKGRvbUVsZW1lbnQgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGh5ZHJhdGVPYmooZXZlbnQsIHtcbiAgICAgICAgICAgIGRlbGVnYXRlVGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoaGFuZGxlci5vbmVPZmYpIHtcbiAgICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgZXZlbnQudHlwZSwgc2VsZWN0b3IsIGZuKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRhcmdldCwgW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGZpbmRIYW5kbGVyKGV2ZW50cywgY2FsbGFibGUsIGRlbGVnYXRpb25TZWxlY3RvciA9IG51bGwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhldmVudHMpLmZpbmQoZXZlbnQgPT4gZXZlbnQuY2FsbGFibGUgPT09IGNhbGxhYmxlICYmIGV2ZW50LmRlbGVnYXRpb25TZWxlY3RvciA9PT0gZGVsZWdhdGlvblNlbGVjdG9yKTtcbiAgfVxuICBmdW5jdGlvbiBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBjb25zdCBpc0RlbGVnYXRlZCA9IHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJztcbiAgICAvLyBUT0RPOiB0b29sdGlwIHBhc3NlcyBgZmFsc2VgIGluc3RlYWQgb2Ygc2VsZWN0b3IsIHNvIHdlIG5lZWQgdG8gY2hlY2tcbiAgICBjb25zdCBjYWxsYWJsZSA9IGlzRGVsZWdhdGVkID8gZGVsZWdhdGlvbkZ1bmN0aW9uIDogaGFuZGxlciB8fCBkZWxlZ2F0aW9uRnVuY3Rpb247XG4gICAgbGV0IHR5cGVFdmVudCA9IGdldFR5cGVFdmVudChvcmlnaW5hbFR5cGVFdmVudCk7XG4gICAgaWYgKCFuYXRpdmVFdmVudHMuaGFzKHR5cGVFdmVudCkpIHtcbiAgICAgIHR5cGVFdmVudCA9IG9yaWdpbmFsVHlwZUV2ZW50O1xuICAgIH1cbiAgICByZXR1cm4gW2lzRGVsZWdhdGVkLCBjYWxsYWJsZSwgdHlwZUV2ZW50XTtcbiAgfVxuICBmdW5jdGlvbiBhZGRIYW5kbGVyKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIG9uZU9mZikge1xuICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUeXBlRXZlbnQgIT09ICdzdHJpbmcnIHx8ICFlbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKTtcblxuICAgIC8vIGluIGNhc2Ugb2YgbW91c2VlbnRlciBvciBtb3VzZWxlYXZlIHdyYXAgdGhlIGhhbmRsZXIgd2l0aGluIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgZm9yIGl0cyBET00gcG9zaXRpb25cbiAgICAvLyB0aGlzIHByZXZlbnRzIHRoZSBoYW5kbGVyIGZyb20gYmVpbmcgZGlzcGF0Y2hlZCB0aGUgc2FtZSB3YXkgYXMgbW91c2VvdmVyIG9yIG1vdXNlb3V0IGRvZXNcbiAgICBpZiAob3JpZ2luYWxUeXBlRXZlbnQgaW4gY3VzdG9tRXZlbnRzKSB7XG4gICAgICBjb25zdCB3cmFwRnVuY3Rpb24gPSBmbiA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoIWV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgIWV2ZW50LmRlbGVnYXRlVGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIGNhbGxhYmxlID0gd3JhcEZ1bmN0aW9uKGNhbGxhYmxlKTtcbiAgICB9XG4gICAgY29uc3QgZXZlbnRzID0gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KTtcbiAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50c1t0eXBlRXZlbnRdIHx8IChldmVudHNbdHlwZUV2ZW50XSA9IHt9KTtcbiAgICBjb25zdCBwcmV2aW91c0Z1bmN0aW9uID0gZmluZEhhbmRsZXIoaGFuZGxlcnMsIGNhbGxhYmxlLCBpc0RlbGVnYXRlZCA/IGhhbmRsZXIgOiBudWxsKTtcbiAgICBpZiAocHJldmlvdXNGdW5jdGlvbikge1xuICAgICAgcHJldmlvdXNGdW5jdGlvbi5vbmVPZmYgPSBwcmV2aW91c0Z1bmN0aW9uLm9uZU9mZiAmJiBvbmVPZmY7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVpZCA9IG1ha2VFdmVudFVpZChjYWxsYWJsZSwgb3JpZ2luYWxUeXBlRXZlbnQucmVwbGFjZShuYW1lc3BhY2VSZWdleCwgJycpKTtcbiAgICBjb25zdCBmbiA9IGlzRGVsZWdhdGVkID8gYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIoZWxlbWVudCwgaGFuZGxlciwgY2FsbGFibGUpIDogYm9vdHN0cmFwSGFuZGxlcihlbGVtZW50LCBjYWxsYWJsZSk7XG4gICAgZm4uZGVsZWdhdGlvblNlbGVjdG9yID0gaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbDtcbiAgICBmbi5jYWxsYWJsZSA9IGNhbGxhYmxlO1xuICAgIGZuLm9uZU9mZiA9IG9uZU9mZjtcbiAgICBmbi51aWRFdmVudCA9IHVpZDtcbiAgICBoYW5kbGVyc1t1aWRdID0gZm47XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIGlzRGVsZWdhdGVkKTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpIHtcbiAgICBjb25zdCBmbiA9IGZpbmRIYW5kbGVyKGV2ZW50c1t0eXBlRXZlbnRdLCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpO1xuICAgIGlmICghZm4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIEJvb2xlYW4oZGVsZWdhdGlvblNlbGVjdG9yKSk7XG4gICAgZGVsZXRlIGV2ZW50c1t0eXBlRXZlbnRdW2ZuLnVpZEV2ZW50XTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIG5hbWVzcGFjZSkge1xuICAgIGNvbnN0IHN0b3JlRWxlbWVudEV2ZW50ID0gZXZlbnRzW3R5cGVFdmVudF0gfHwge307XG4gICAgZm9yIChjb25zdCBbaGFuZGxlcktleSwgZXZlbnRdIG9mIE9iamVjdC5lbnRyaWVzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgICAgaWYgKGhhbmRsZXJLZXkuaW5jbHVkZXMobmFtZXNwYWNlKSkge1xuICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZ2V0VHlwZUV2ZW50KGV2ZW50KSB7XG4gICAgLy8gYWxsb3cgdG8gZ2V0IHRoZSBuYXRpdmUgZXZlbnRzIGZyb20gbmFtZXNwYWNlZCBldmVudHMgKCdjbGljay5icy5idXR0b24nIC0tPiAnY2xpY2snKVxuICAgIGV2ZW50ID0gZXZlbnQucmVwbGFjZShzdHJpcE5hbWVSZWdleCwgJycpO1xuICAgIHJldHVybiBjdXN0b21FdmVudHNbZXZlbnRdIHx8IGV2ZW50O1xuICB9XG4gIGNvbnN0IEV2ZW50SGFuZGxlciA9IHtcbiAgICBvbihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIGZhbHNlKTtcbiAgICB9LFxuICAgIG9uZShlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIHRydWUpO1xuICAgIH0sXG4gICAgb2ZmKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUeXBlRXZlbnQgIT09ICdzdHJpbmcnIHx8ICFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF0gPSBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pO1xuICAgICAgY29uc3QgaW5OYW1lc3BhY2UgPSB0eXBlRXZlbnQgIT09IG9yaWdpbmFsVHlwZUV2ZW50O1xuICAgICAgY29uc3QgZXZlbnRzID0gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KTtcbiAgICAgIGNvbnN0IHN0b3JlRWxlbWVudEV2ZW50ID0gZXZlbnRzW3R5cGVFdmVudF0gfHwge307XG4gICAgICBjb25zdCBpc05hbWVzcGFjZSA9IG9yaWdpbmFsVHlwZUV2ZW50LnN0YXJ0c1dpdGgoJy4nKTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGFibGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNpbXBsZXN0IGNhc2U6IGhhbmRsZXIgaXMgcGFzc2VkLCByZW1vdmUgdGhhdCBsaXN0ZW5lciBPTkxZLlxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHN0b3JlRWxlbWVudEV2ZW50KS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlSGFuZGxlcihlbGVtZW50LCBldmVudHMsIHR5cGVFdmVudCwgY2FsbGFibGUsIGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNOYW1lc3BhY2UpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50RXZlbnQgb2YgT2JqZWN0LmtleXMoZXZlbnRzKSkge1xuICAgICAgICAgIHJlbW92ZU5hbWVzcGFjZWRIYW5kbGVycyhlbGVtZW50LCBldmVudHMsIGVsZW1lbnRFdmVudCwgb3JpZ2luYWxUeXBlRXZlbnQuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IFtrZXlIYW5kbGVycywgZXZlbnRdIG9mIE9iamVjdC5lbnRyaWVzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgICAgICBjb25zdCBoYW5kbGVyS2V5ID0ga2V5SGFuZGxlcnMucmVwbGFjZShzdHJpcFVpZFJlZ2V4LCAnJyk7XG4gICAgICAgIGlmICghaW5OYW1lc3BhY2UgfHwgb3JpZ2luYWxUeXBlRXZlbnQuaW5jbHVkZXMoaGFuZGxlcktleSkpIHtcbiAgICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdHJpZ2dlcihlbGVtZW50LCBldmVudCwgYXJncykge1xuICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KCk7XG4gICAgICBjb25zdCB0eXBlRXZlbnQgPSBnZXRUeXBlRXZlbnQoZXZlbnQpO1xuICAgICAgY29uc3QgaW5OYW1lc3BhY2UgPSBldmVudCAhPT0gdHlwZUV2ZW50O1xuICAgICAgbGV0IGpRdWVyeUV2ZW50ID0gbnVsbDtcbiAgICAgIGxldCBidWJibGVzID0gdHJ1ZTtcbiAgICAgIGxldCBuYXRpdmVEaXNwYXRjaCA9IHRydWU7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgaWYgKGluTmFtZXNwYWNlICYmICQpIHtcbiAgICAgICAgalF1ZXJ5RXZlbnQgPSAkLkV2ZW50KGV2ZW50LCBhcmdzKTtcbiAgICAgICAgJChlbGVtZW50KS50cmlnZ2VyKGpRdWVyeUV2ZW50KTtcbiAgICAgICAgYnViYmxlcyA9ICFqUXVlcnlFdmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpO1xuICAgICAgICBuYXRpdmVEaXNwYXRjaCA9ICFqUXVlcnlFdmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpO1xuICAgICAgICBkZWZhdWx0UHJldmVudGVkID0galF1ZXJ5RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBldnQgPSBoeWRyYXRlT2JqKG5ldyBFdmVudChldmVudCwge1xuICAgICAgICBidWJibGVzLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KSwgYXJncyk7XG4gICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChuYXRpdmVEaXNwYXRjaCkge1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChldnQuZGVmYXVsdFByZXZlbnRlZCAmJiBqUXVlcnlFdmVudCkge1xuICAgICAgICBqUXVlcnlFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGh5ZHJhdGVPYmoob2JqLCBtZXRhID0ge30pIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtZXRhKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKF91bnVzZWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBkb20vbWFuaXB1bGF0b3IuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09IE51bWJlcih2YWx1ZSkudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICdudWxsJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGFLZXkoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKC9bQS1aXS9nLCBjaHIgPT4gYC0ke2Noci50b0xvd2VyQ2FzZSgpfWApO1xuICB9XG4gIGNvbnN0IE1hbmlwdWxhdG9yID0ge1xuICAgIHNldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYGRhdGEtYnMtJHtub3JtYWxpemVEYXRhS2V5KGtleSl9YCwgdmFsdWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlRGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXkpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWJzLSR7bm9ybWFsaXplRGF0YUtleShrZXkpfWApO1xuICAgIH0sXG4gICAgZ2V0RGF0YUF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgIGNvbnN0IGJzS2V5cyA9IE9iamVjdC5rZXlzKGVsZW1lbnQuZGF0YXNldCkuZmlsdGVyKGtleSA9PiBrZXkuc3RhcnRzV2l0aCgnYnMnKSAmJiAha2V5LnN0YXJ0c1dpdGgoJ2JzQ29uZmlnJykpO1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgYnNLZXlzKSB7XG4gICAgICAgIGxldCBwdXJlS2V5ID0ga2V5LnJlcGxhY2UoL15icy8sICcnKTtcbiAgICAgICAgcHVyZUtleSA9IHB1cmVLZXkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBwdXJlS2V5LnNsaWNlKDEsIHB1cmVLZXkubGVuZ3RoKTtcbiAgICAgICAgYXR0cmlidXRlc1twdXJlS2V5XSA9IG5vcm1hbGl6ZURhdGEoZWxlbWVudC5kYXRhc2V0W2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfSxcbiAgICBnZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZURhdGEoZWxlbWVudC5nZXRBdHRyaWJ1dGUoYGRhdGEtYnMtJHtub3JtYWxpemVEYXRhS2V5KGtleSl9YCkpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHV0aWwvY29uZmlnLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIENvbmZpZyB7XG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIHN0YXRpYyBtZXRob2QgXCJOQU1FXCIsIGZvciBlYWNoIGNvbXBvbmVudCEnKTtcbiAgICB9XG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZyk7XG4gICAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZyk7XG4gICAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKTtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuICAgIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG4gICAgX21lcmdlQ29uZmlnT2JqKGNvbmZpZywgZWxlbWVudCkge1xuICAgICAgY29uc3QganNvbkNvbmZpZyA9IGlzRWxlbWVudCQxKGVsZW1lbnQpID8gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCAnY29uZmlnJykgOiB7fTsgLy8gdHJ5IHRvIHBhcnNlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgICAgLi4uKHR5cGVvZiBqc29uQ29uZmlnID09PSAnb2JqZWN0JyA/IGpzb25Db25maWcgOiB7fSksXG4gICAgICAgIC4uLihpc0VsZW1lbnQkMShlbGVtZW50KSA/IE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGVzKGVsZW1lbnQpIDoge30pLFxuICAgICAgICAuLi4odHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiB7fSlcbiAgICAgIH07XG4gICAgfVxuICAgIF90eXBlQ2hlY2tDb25maWcoY29uZmlnLCBjb25maWdUeXBlcyA9IHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpIHtcbiAgICAgIGZvciAoY29uc3QgW3Byb3BlcnR5LCBleHBlY3RlZFR5cGVzXSBvZiBPYmplY3QuZW50cmllcyhjb25maWdUeXBlcykpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSBpc0VsZW1lbnQkMSh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpO1xuICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUUudG9VcHBlckNhc2UoKX06IE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBiYXNlLWNvbXBvbmVudC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IFZFUlNJT04gPSAnNS4zLjMnO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIEJhc2VDb21wb25lbnQgZXh0ZW5kcyBDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIGVsZW1lbnQgPSBnZXRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICBEYXRhLnNldCh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICBkaXNwb3NlKCkge1xuICAgICAgRGF0YS5yZW1vdmUodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWSk7XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuRVZFTlRfS0VZKTtcbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpKSB7XG4gICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIF9xdWV1ZUNhbGxiYWNrKGNhbGxiYWNrLCBlbGVtZW50LCBpc0FuaW1hdGVkID0gdHJ1ZSkge1xuICAgICAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbihjYWxsYmFjaywgZWxlbWVudCwgaXNBbmltYXRlZCk7XG4gICAgfVxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB0aGlzLl9tZXJnZUNvbmZpZ09iaihjb25maWcsIHRoaXMuX2VsZW1lbnQpO1xuICAgICAgY29uZmlnID0gdGhpcy5fY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpO1xuICAgICAgdGhpcy5fdHlwZUNoZWNrQ29uZmlnKGNvbmZpZyk7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShlbGVtZW50KSB7XG4gICAgICByZXR1cm4gRGF0YS5nZXQoZ2V0RWxlbWVudChlbGVtZW50KSwgdGhpcy5EQVRBX0tFWSk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIGNvbmZpZyA9IHt9KSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShlbGVtZW50KSB8fCBuZXcgdGhpcyhlbGVtZW50LCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICAgIHJldHVybiBgYnMuJHt0aGlzLk5BTUV9YDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBFVkVOVF9LRVkoKSB7XG4gICAgICByZXR1cm4gYC4ke3RoaXMuREFUQV9LRVl9YDtcbiAgICB9XG4gICAgc3RhdGljIGV2ZW50TmFtZShuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0ke3RoaXMuRVZFTlRfS0VZfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBkb20vc2VsZWN0b3ItZW5naW5lLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBnZXRTZWxlY3RvciA9IGVsZW1lbnQgPT4ge1xuICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLXRhcmdldCcpO1xuICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgICAgbGV0IGhyZWZBdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAvLyBUaGUgb25seSB2YWxpZCBjb250ZW50IHRoYXQgY291bGQgZG91YmxlIGFzIGEgc2VsZWN0b3IgYXJlIElEcyBvciBjbGFzc2VzLFxuICAgICAgLy8gc28gZXZlcnl0aGluZyBzdGFydGluZyB3aXRoIGAjYCBvciBgLmAuIElmIGEgXCJyZWFsXCIgVVJMIGlzIHVzZWQgYXMgdGhlIHNlbGVjdG9yLFxuICAgICAgLy8gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JgIHdpbGwgcmlnaHRmdWxseSBjb21wbGFpbiBpdCBpcyBpbnZhbGlkLlxuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMzIyNzNcbiAgICAgIGlmICghaHJlZkF0dHJpYnV0ZSB8fCAhaHJlZkF0dHJpYnV0ZS5pbmNsdWRlcygnIycpICYmICFocmVmQXR0cmlidXRlLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gSnVzdCBpbiBjYXNlIHNvbWUgQ01TIHB1dHMgb3V0IGEgZnVsbCBVUkwgd2l0aCB0aGUgYW5jaG9yIGFwcGVuZGVkXG4gICAgICBpZiAoaHJlZkF0dHJpYnV0ZS5pbmNsdWRlcygnIycpICYmICFocmVmQXR0cmlidXRlLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgICBocmVmQXR0cmlidXRlID0gYCMke2hyZWZBdHRyaWJ1dGUuc3BsaXQoJyMnKVsxXX1gO1xuICAgICAgfVxuICAgICAgc2VsZWN0b3IgPSBocmVmQXR0cmlidXRlICYmIGhyZWZBdHRyaWJ1dGUgIT09ICcjJyA/IGhyZWZBdHRyaWJ1dGUudHJpbSgpIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdG9yID8gc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoc2VsID0+IHBhcnNlU2VsZWN0b3Ioc2VsKSkuam9pbignLCcpIDogbnVsbDtcbiAgfTtcbiAgY29uc3QgU2VsZWN0b3JFbmdpbmUgPSB7XG4gICAgZmluZChzZWxlY3RvciwgZWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdCguLi5FbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpKTtcbiAgICB9LFxuICAgIGZpbmRPbmUoc2VsZWN0b3IsIGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgIH0sXG4gICAgY2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoLi4uZWxlbWVudC5jaGlsZHJlbikuZmlsdGVyKGNoaWxkID0+IGNoaWxkLm1hdGNoZXMoc2VsZWN0b3IpKTtcbiAgICB9LFxuICAgIHBhcmVudHMoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBbXTtcbiAgICAgIGxldCBhbmNlc3RvciA9IGVsZW1lbnQucGFyZW50Tm9kZS5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICBwYXJlbnRzLnB1c2goYW5jZXN0b3IpO1xuICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGUuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyZW50cztcbiAgICB9LFxuICAgIHByZXYoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIGxldCBwcmV2aW91cyA9IGVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIHdoaWxlIChwcmV2aW91cykge1xuICAgICAgICBpZiAocHJldmlvdXMubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gW3ByZXZpb3VzXTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91cyA9IHByZXZpb3VzLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICAvLyBUT0RPOiB0aGlzIGlzIG5vdyB1bnVzZWQ7IHJlbW92ZSBsYXRlciBhbG9uZyB3aXRoIHByZXYoKVxuICAgIG5leHQoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIGxldCBuZXh0ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBbbmV4dF07XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZm9jdXNhYmxlQ2hpbGRyZW4oZWxlbWVudCkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlcyA9IFsnYScsICdidXR0b24nLCAnaW5wdXQnLCAndGV4dGFyZWEnLCAnc2VsZWN0JywgJ2RldGFpbHMnLCAnW3RhYmluZGV4XScsICdbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXSddLm1hcChzZWxlY3RvciA9PiBgJHtzZWxlY3Rvcn06bm90KFt0YWJpbmRleF49XCItXCJdKWApLmpvaW4oJywnKTtcbiAgICAgIHJldHVybiB0aGlzLmZpbmQoZm9jdXNhYmxlcywgZWxlbWVudCkuZmlsdGVyKGVsID0+ICFpc0Rpc2FibGVkKGVsKSAmJiBpc1Zpc2libGUoZWwpKTtcbiAgICB9LFxuICAgIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KTtcbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvcikgPyBzZWxlY3RvciA6IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KTtcbiAgICAgIHJldHVybiBzZWxlY3RvciA/IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoc2VsZWN0b3IpIDogbnVsbDtcbiAgICB9LFxuICAgIGdldE11bHRpcGxlRWxlbWVudHNGcm9tU2VsZWN0b3IoZWxlbWVudCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRTZWxlY3RvcihlbGVtZW50KTtcbiAgICAgIHJldHVybiBzZWxlY3RvciA/IFNlbGVjdG9yRW5naW5lLmZpbmQoc2VsZWN0b3IpIDogW107XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgdXRpbC9jb21wb25lbnQtZnVuY3Rpb25zLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBlbmFibGVEaXNtaXNzVHJpZ2dlciA9IChjb21wb25lbnQsIG1ldGhvZCA9ICdoaWRlJykgPT4ge1xuICAgIGNvbnN0IGNsaWNrRXZlbnQgPSBgY2xpY2suZGlzbWlzcyR7Y29tcG9uZW50LkVWRU5UX0tFWX1gO1xuICAgIGNvbnN0IG5hbWUgPSBjb21wb25lbnQuTkFNRTtcbiAgICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIGNsaWNrRXZlbnQsIGBbZGF0YS1icy1kaXNtaXNzPVwiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGlzYWJsZWQodGhpcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKSB8fCB0aGlzLmNsb3Nlc3QoYC4ke25hbWV9YCk7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGNvbXBvbmVudC5nZXRPckNyZWF0ZUluc3RhbmNlKHRhcmdldCk7XG5cbiAgICAgIC8vIE1ldGhvZCBhcmd1bWVudCBpcyBsZWZ0LCBmb3IgQWxlcnQgYW5kIG9ubHksIGFzIGl0IGRvZXNuJ3QgaW1wbGVtZW50IHRoZSAnaGlkZScgbWV0aG9kXG4gICAgICBpbnN0YW5jZVttZXRob2RdKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBhbGVydC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkZiA9ICdhbGVydCc7XG4gIGNvbnN0IERBVEFfS0VZJGEgPSAnYnMuYWxlcnQnO1xuICBjb25zdCBFVkVOVF9LRVkkYiA9IGAuJHtEQVRBX0tFWSRhfWA7XG4gIGNvbnN0IEVWRU5UX0NMT1NFID0gYGNsb3NlJHtFVkVOVF9LRVkkYn1gO1xuICBjb25zdCBFVkVOVF9DTE9TRUQgPSBgY2xvc2VkJHtFVkVOVF9LRVkkYn1gO1xuICBjb25zdCBDTEFTU19OQU1FX0ZBREUkNSA9ICdmYWRlJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XJDggPSAnc2hvdyc7XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgQWxlcnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkZjtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICBjbG9zZSgpIHtcbiAgICAgIGNvbnN0IGNsb3NlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9DTE9TRSk7XG4gICAgICBpZiAoY2xvc2VFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1ckOCk7XG4gICAgICBjb25zdCBpc0FuaW1hdGVkID0gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDUpO1xuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjaygoKSA9PiB0aGlzLl9kZXN0cm95RWxlbWVudCgpLCB0aGlzLl9lbGVtZW50LCBpc0FuaW1hdGVkKTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG4gICAgX2Rlc3Ryb3lFbGVtZW50KCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0NMT1NFRCk7XG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBBbGVydC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpO1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkIHx8IGNvbmZpZy5zdGFydHNXaXRoKCdfJykgfHwgY29uZmlnID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2NvbmZpZ10odGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cbiAgZW5hYmxlRGlzbWlzc1RyaWdnZXIoQWxlcnQsICdjbG9zZScpO1xuXG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luKEFsZXJ0KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIGJ1dHRvbi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkZSA9ICdidXR0b24nO1xuICBjb25zdCBEQVRBX0tFWSQ5ID0gJ2JzLmJ1dHRvbic7XG4gIGNvbnN0IEVWRU5UX0tFWSRhID0gYC4ke0RBVEFfS0VZJDl9YDtcbiAgY29uc3QgREFUQV9BUElfS0VZJDYgPSAnLmRhdGEtYXBpJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9BQ1RJVkUkMyA9ICdhY3RpdmUnO1xuICBjb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQ1ID0gJ1tkYXRhLWJzLXRvZ2dsZT1cImJ1dHRvblwiXSc7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDYgPSBgY2xpY2ske0VWRU5UX0tFWSRhfSR7REFUQV9BUElfS0VZJDZ9YDtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBCdXR0b24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkZTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICB0b2dnbGUoKSB7XG4gICAgICAvLyBUb2dnbGUgY2xhc3MgYW5kIHN5bmMgdGhlIGBhcmlhLXByZXNzZWRgIGF0dHJpYnV0ZSB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGAudG9nZ2xlKClgIG1ldGhvZFxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShDTEFTU19OQU1FX0FDVElWRSQzKSk7XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG4gICAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gQnV0dG9uLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcyk7XG4gICAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgKi9cblxuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDYsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDUsIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFNFTEVDVE9SX0RBVEFfVE9HR0xFJDUpO1xuICAgIGNvbnN0IGRhdGEgPSBCdXR0b24uZ2V0T3JDcmVhdGVJbnN0YW5jZShidXR0b24pO1xuICAgIGRhdGEudG9nZ2xlKCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luKEJ1dHRvbik7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCB1dGlsL3N3aXBlLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSRkID0gJ3N3aXBlJztcbiAgY29uc3QgRVZFTlRfS0VZJDkgPSAnLmJzLnN3aXBlJztcbiAgY29uc3QgRVZFTlRfVE9VQ0hTVEFSVCA9IGB0b3VjaHN0YXJ0JHtFVkVOVF9LRVkkOX1gO1xuICBjb25zdCBFVkVOVF9UT1VDSE1PVkUgPSBgdG91Y2htb3ZlJHtFVkVOVF9LRVkkOX1gO1xuICBjb25zdCBFVkVOVF9UT1VDSEVORCA9IGB0b3VjaGVuZCR7RVZFTlRfS0VZJDl9YDtcbiAgY29uc3QgRVZFTlRfUE9JTlRFUkRPV04gPSBgcG9pbnRlcmRvd24ke0VWRU5UX0tFWSQ5fWA7XG4gIGNvbnN0IEVWRU5UX1BPSU5URVJVUCA9IGBwb2ludGVydXAke0VWRU5UX0tFWSQ5fWA7XG4gIGNvbnN0IFBPSU5URVJfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG4gIGNvbnN0IFBPSU5URVJfVFlQRV9QRU4gPSAncGVuJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9QT0lOVEVSX0VWRU5UID0gJ3BvaW50ZXItZXZlbnQnO1xuICBjb25zdCBTV0lQRV9USFJFU0hPTEQgPSA0MDtcbiAgY29uc3QgRGVmYXVsdCRjID0ge1xuICAgIGVuZENhbGxiYWNrOiBudWxsLFxuICAgIGxlZnRDYWxsYmFjazogbnVsbCxcbiAgICByaWdodENhbGxiYWNrOiBudWxsXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlJGMgPSB7XG4gICAgZW5kQ2FsbGJhY2s6ICcoZnVuY3Rpb258bnVsbCknLFxuICAgIGxlZnRDYWxsYmFjazogJyhmdW5jdGlvbnxudWxsKScsXG4gICAgcmlnaHRDYWxsYmFjazogJyhmdW5jdGlvbnxudWxsKSdcbiAgfTtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBTd2lwZSBleHRlbmRzIENvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICBpZiAoIWVsZW1lbnQgfHwgIVN3aXBlLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICB0aGlzLl9kZWx0YVggPSAwO1xuICAgICAgdGhpcy5fc3VwcG9ydFBvaW50ZXJFdmVudHMgPSBCb29sZWFuKHdpbmRvdy5Qb2ludGVyRXZlbnQpO1xuICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdCRjO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlJGM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJGQ7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudCwgRVZFTlRfS0VZJDkpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfc3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5fc3VwcG9ydFBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fZXZlbnRJc1BvaW50ZXJQZW5Ub3VjaChldmVudCkpIHtcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIH1cbiAgICB9XG4gICAgX2VuZChldmVudCkge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50SXNQb2ludGVyUGVuVG91Y2goZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLl9kZWx0YVg7XG4gICAgICB9XG4gICAgICB0aGlzLl9oYW5kbGVTd2lwZSgpO1xuICAgICAgZXhlY3V0ZSh0aGlzLl9jb25maWcuZW5kQ2FsbGJhY2spO1xuICAgIH1cbiAgICBfbW92ZShldmVudCkge1xuICAgICAgdGhpcy5fZGVsdGFYID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgPyAwIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5fZGVsdGFYO1xuICAgIH1cbiAgICBfaGFuZGxlU3dpcGUoKSB7XG4gICAgICBjb25zdCBhYnNEZWx0YVggPSBNYXRoLmFicyh0aGlzLl9kZWx0YVgpO1xuICAgICAgaWYgKGFic0RlbHRhWCA8PSBTV0lQRV9USFJFU0hPTEQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gYWJzRGVsdGFYIC8gdGhpcy5fZGVsdGFYO1xuICAgICAgdGhpcy5fZGVsdGFYID0gMDtcbiAgICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGV4ZWN1dGUoZGlyZWN0aW9uID4gMCA/IHRoaXMuX2NvbmZpZy5yaWdodENhbGxiYWNrIDogdGhpcy5fY29uZmlnLmxlZnRDYWxsYmFjayk7XG4gICAgfVxuICAgIF9pbml0RXZlbnRzKCkge1xuICAgICAgaWYgKHRoaXMuX3N1cHBvcnRQb2ludGVyRXZlbnRzKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9QT0lOVEVSRE9XTiwgZXZlbnQgPT4gdGhpcy5fc3RhcnQoZXZlbnQpKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1BPSU5URVJVUCwgZXZlbnQgPT4gdGhpcy5fZW5kKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1BPSU5URVJfRVZFTlQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1RPVUNIU1RBUlQsIGV2ZW50ID0+IHRoaXMuX3N0YXJ0KGV2ZW50KSk7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9UT1VDSE1PVkUsIGV2ZW50ID0+IHRoaXMuX21vdmUoZXZlbnQpKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1RPVUNIRU5ELCBldmVudCA9PiB0aGlzLl9lbmQoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX2V2ZW50SXNQb2ludGVyUGVuVG91Y2goZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdXBwb3J0UG9pbnRlckV2ZW50cyAmJiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFBPSU5URVJfVFlQRV9QRU4gfHwgZXZlbnQucG9pbnRlclR5cGUgPT09IFBPSU5URVJfVFlQRV9UT1VDSCk7XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG4gICAgc3RhdGljIGlzU3VwcG9ydGVkKCkge1xuICAgICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgY2Fyb3VzZWwuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FJGMgPSAnY2Fyb3VzZWwnO1xuICBjb25zdCBEQVRBX0tFWSQ4ID0gJ2JzLmNhcm91c2VsJztcbiAgY29uc3QgRVZFTlRfS0VZJDggPSBgLiR7REFUQV9LRVkkOH1gO1xuICBjb25zdCBEQVRBX0FQSV9LRVkkNSA9ICcuZGF0YS1hcGknO1xuICBjb25zdCBBUlJPV19MRUZUX0tFWSQxID0gJ0Fycm93TGVmdCc7XG4gIGNvbnN0IEFSUk9XX1JJR0hUX0tFWSQxID0gJ0Fycm93UmlnaHQnO1xuICBjb25zdCBUT1VDSEVWRU5UX0NPTVBBVF9XQUlUID0gNTAwOyAvLyBUaW1lIGZvciBtb3VzZSBjb21wYXQgZXZlbnRzIHRvIGZpcmUgYWZ0ZXIgdG91Y2hcblxuICBjb25zdCBPUkRFUl9ORVhUID0gJ25leHQnO1xuICBjb25zdCBPUkRFUl9QUkVWID0gJ3ByZXYnO1xuICBjb25zdCBESVJFQ1RJT05fTEVGVCA9ICdsZWZ0JztcbiAgY29uc3QgRElSRUNUSU9OX1JJR0hUID0gJ3JpZ2h0JztcbiAgY29uc3QgRVZFTlRfU0xJREUgPSBgc2xpZGUke0VWRU5UX0tFWSQ4fWA7XG4gIGNvbnN0IEVWRU5UX1NMSUQgPSBgc2xpZCR7RVZFTlRfS0VZJDh9YDtcbiAgY29uc3QgRVZFTlRfS0VZRE9XTiQxID0gYGtleWRvd24ke0VWRU5UX0tFWSQ4fWA7XG4gIGNvbnN0IEVWRU5UX01PVVNFRU5URVIkMSA9IGBtb3VzZWVudGVyJHtFVkVOVF9LRVkkOH1gO1xuICBjb25zdCBFVkVOVF9NT1VTRUxFQVZFJDEgPSBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZJDh9YDtcbiAgY29uc3QgRVZFTlRfRFJBR19TVEFSVCA9IGBkcmFnc3RhcnQke0VWRU5UX0tFWSQ4fWA7XG4gIGNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkkMyA9IGBsb2FkJHtFVkVOVF9LRVkkOH0ke0RBVEFfQVBJX0tFWSQ1fWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDUgPSBgY2xpY2ske0VWRU5UX0tFWSQ4fSR7REFUQV9BUElfS0VZJDV9YDtcbiAgY29uc3QgQ0xBU1NfTkFNRV9DQVJPVVNFTCA9ICdjYXJvdXNlbCc7XG4gIGNvbnN0IENMQVNTX05BTUVfQUNUSVZFJDIgPSAnYWN0aXZlJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TTElERSA9ICdzbGlkZSc7XG4gIGNvbnN0IENMQVNTX05BTUVfRU5EID0gJ2Nhcm91c2VsLWl0ZW0tZW5kJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TVEFSVCA9ICdjYXJvdXNlbC1pdGVtLXN0YXJ0JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9ORVhUID0gJ2Nhcm91c2VsLWl0ZW0tbmV4dCc7XG4gIGNvbnN0IENMQVNTX05BTUVfUFJFViA9ICdjYXJvdXNlbC1pdGVtLXByZXYnO1xuICBjb25zdCBTRUxFQ1RPUl9BQ1RJVkUgPSAnLmFjdGl2ZSc7XG4gIGNvbnN0IFNFTEVDVE9SX0lURU0gPSAnLmNhcm91c2VsLWl0ZW0nO1xuICBjb25zdCBTRUxFQ1RPUl9BQ1RJVkVfSVRFTSA9IFNFTEVDVE9SX0FDVElWRSArIFNFTEVDVE9SX0lURU07XG4gIGNvbnN0IFNFTEVDVE9SX0lURU1fSU1HID0gJy5jYXJvdXNlbC1pdGVtIGltZyc7XG4gIGNvbnN0IFNFTEVDVE9SX0lORElDQVRPUlMgPSAnLmNhcm91c2VsLWluZGljYXRvcnMnO1xuICBjb25zdCBTRUxFQ1RPUl9EQVRBX1NMSURFID0gJ1tkYXRhLWJzLXNsaWRlXSwgW2RhdGEtYnMtc2xpZGUtdG9dJztcbiAgY29uc3QgU0VMRUNUT1JfREFUQV9SSURFID0gJ1tkYXRhLWJzLXJpZGU9XCJjYXJvdXNlbFwiXSc7XG4gIGNvbnN0IEtFWV9UT19ESVJFQ1RJT04gPSB7XG4gICAgW0FSUk9XX0xFRlRfS0VZJDFdOiBESVJFQ1RJT05fUklHSFQsXG4gICAgW0FSUk9XX1JJR0hUX0tFWSQxXTogRElSRUNUSU9OX0xFRlRcbiAgfTtcbiAgY29uc3QgRGVmYXVsdCRiID0ge1xuICAgIGludGVydmFsOiA1MDAwLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHBhdXNlOiAnaG92ZXInLFxuICAgIHJpZGU6IGZhbHNlLFxuICAgIHRvdWNoOiB0cnVlLFxuICAgIHdyYXA6IHRydWVcbiAgfTtcbiAgY29uc3QgRGVmYXVsdFR5cGUkYiA9IHtcbiAgICBpbnRlcnZhbDogJyhudW1iZXJ8Ym9vbGVhbiknLFxuICAgIC8vIFRPRE86djYgcmVtb3ZlIGJvb2xlYW4gc3VwcG9ydFxuICAgIGtleWJvYXJkOiAnYm9vbGVhbicsXG4gICAgcGF1c2U6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgICByaWRlOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAgdG91Y2g6ICdib29sZWFuJyxcbiAgICB3cmFwOiAnYm9vbGVhbidcbiAgfTtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBDYXJvdXNlbCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTtcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRvdWNoVGltZW91dCA9IG51bGw7XG4gICAgICB0aGlzLl9zd2lwZUhlbHBlciA9IG51bGw7XG4gICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfSU5ESUNBVE9SUywgdGhpcy5fZWxlbWVudCk7XG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5yaWRlID09PSBDTEFTU19OQU1FX0NBUk9VU0VMKSB7XG4gICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHQkYjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZSRiO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRSRjO1xuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuICAgIG5leHQoKSB7XG4gICAgICB0aGlzLl9zbGlkZShPUkRFUl9ORVhUKTtcbiAgICB9XG4gICAgbmV4dFdoZW5WaXNpYmxlKCkge1xuICAgICAgLy8gRklYTUUgVE9ETyB1c2UgYGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZWBcbiAgICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAgIC8vIG9yIHRoZSBjYXJvdXNlbCBvciBpdHMgcGFyZW50IGlzbid0IHZpc2libGVcbiAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuICYmIGlzVmlzaWJsZSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJldigpIHtcbiAgICAgIHRoaXMuX3NsaWRlKE9SREVSX1BSRVYpO1xuICAgIH1cbiAgICBwYXVzZSgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgdHJpZ2dlclRyYW5zaXRpb25FbmQodGhpcy5fZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jbGVhckludGVydmFsKCk7XG4gICAgfVxuICAgIGN5Y2xlKCkge1xuICAgICAgdGhpcy5fY2xlYXJJbnRlcnZhbCgpO1xuICAgICAgdGhpcy5fdXBkYXRlSW50ZXJ2YWwoKTtcbiAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5uZXh0V2hlblZpc2libGUoKSwgdGhpcy5fY29uZmlnLmludGVydmFsKTtcbiAgICB9XG4gICAgX21heWJlRW5hYmxlQ3ljbGUoKSB7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5yaWRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uZSh0aGlzLl9lbGVtZW50LCBFVkVOVF9TTElELCAoKSA9PiB0aGlzLmN5Y2xlKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmN5Y2xlKCk7XG4gICAgfVxuICAgIHRvKGluZGV4KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX2dldEl0ZW1zKCk7XG4gICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbmUodGhpcy5fZWxlbWVudCwgRVZFTlRfU0xJRCwgKCkgPT4gdGhpcy50byhpbmRleCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleCh0aGlzLl9nZXRBY3RpdmUoKSk7XG4gICAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yZGVyID0gaW5kZXggPiBhY3RpdmVJbmRleCA/IE9SREVSX05FWFQgOiBPUkRFUl9QUkVWO1xuICAgICAgdGhpcy5fc2xpZGUob3JkZXIsIGl0ZW1zW2luZGV4XSk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICBpZiAodGhpcy5fc3dpcGVIZWxwZXIpIHtcbiAgICAgICAgdGhpcy5fc3dpcGVIZWxwZXIuZGlzcG9zZSgpO1xuICAgICAgfVxuICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAgIGNvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOJDEsIGV2ZW50ID0+IHRoaXMuX2tleWRvd24oZXZlbnQpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jb25maWcucGF1c2UgPT09ICdob3ZlcicpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFRU5URVIkMSwgKCkgPT4gdGhpcy5wYXVzZSgpKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFTEVBVkUkMSwgKCkgPT4gdGhpcy5fbWF5YmVFbmFibGVDeWNsZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jb25maWcudG91Y2ggJiYgU3dpcGUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB0aGlzLl9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIF9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZm9yIChjb25zdCBpbWcgb2YgU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9JVEVNX0lNRywgdGhpcy5fZWxlbWVudCkpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKGltZywgRVZFTlRfRFJBR19TVEFSVCwgZXZlbnQgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBlbmRDYWxsQmFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wYXVzZSAhPT0gJ2hvdmVyJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGl0J3MgYSB0b3VjaC1lbmFibGVkIGRldmljZSwgbW91c2VlbnRlci9sZWF2ZSBhcmUgZmlyZWQgYXNcbiAgICAgICAgLy8gcGFydCBvZiB0aGUgbW91c2UgY29tcGF0aWJpbGl0eSBldmVudHMgb24gZmlyc3QgdGFwIC0gdGhlIGNhcm91c2VsXG4gICAgICAgIC8vIHdvdWxkIHN0b3AgY3ljbGluZyB1bnRpbCB1c2VyIHRhcHBlZCBvdXQgb2YgaXQ7XG4gICAgICAgIC8vIGhlcmUsIHdlIGxpc3RlbiBmb3IgdG91Y2hlbmQsIGV4cGxpY2l0bHkgcGF1c2UgdGhlIGNhcm91c2VsXG4gICAgICAgIC8vIChhcyBpZiBpdCdzIHRoZSBzZWNvbmQgdGltZSB3ZSB0YXAgb24gaXQsIG1vdXNlZW50ZXIgY29tcGF0IGV2ZW50XG4gICAgICAgIC8vIGlzIE5PVCBmaXJlZCkgYW5kIGFmdGVyIGEgdGltZW91dCAodG8gYWxsb3cgZm9yIG1vdXNlIGNvbXBhdGliaWxpdHlcbiAgICAgICAgLy8gZXZlbnRzIHRvIGZpcmUpIHdlIGV4cGxpY2l0bHkgcmVzdGFydCBjeWNsaW5nXG5cbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBpZiAodGhpcy50b3VjaFRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50b3VjaFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG91Y2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9tYXliZUVuYWJsZUN5Y2xlKCksIFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgKyB0aGlzLl9jb25maWcuaW50ZXJ2YWwpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHN3aXBlQ29uZmlnID0ge1xuICAgICAgICBsZWZ0Q2FsbGJhY2s6ICgpID0+IHRoaXMuX3NsaWRlKHRoaXMuX2RpcmVjdGlvblRvT3JkZXIoRElSRUNUSU9OX0xFRlQpKSxcbiAgICAgICAgcmlnaHRDYWxsYmFjazogKCkgPT4gdGhpcy5fc2xpZGUodGhpcy5fZGlyZWN0aW9uVG9PcmRlcihESVJFQ1RJT05fUklHSFQpKSxcbiAgICAgICAgZW5kQ2FsbGJhY2s6IGVuZENhbGxCYWNrXG4gICAgICB9O1xuICAgICAgdGhpcy5fc3dpcGVIZWxwZXIgPSBuZXcgU3dpcGUodGhpcy5fZWxlbWVudCwgc3dpcGVDb25maWcpO1xuICAgIH1cbiAgICBfa2V5ZG93bihldmVudCkge1xuICAgICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IEtFWV9UT19ESVJFQ1RJT05bZXZlbnQua2V5XTtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5fc2xpZGUodGhpcy5fZGlyZWN0aW9uVG9PcmRlcihkaXJlY3Rpb24pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX2dldEl0ZW1JbmRleChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbXMoKS5pbmRleE9mKGVsZW1lbnQpO1xuICAgIH1cbiAgICBfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChpbmRleCkge1xuICAgICAgaWYgKCF0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0FDVElWRSwgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpO1xuICAgICAgYWN0aXZlSW5kaWNhdG9yLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9BQ1RJVkUkMik7XG4gICAgICBhY3RpdmVJbmRpY2F0b3IucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgICAgIGNvbnN0IG5ld0FjdGl2ZUluZGljYXRvciA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoYFtkYXRhLWJzLXNsaWRlLXRvPVwiJHtpbmRleH1cIl1gLCB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCk7XG4gICAgICBpZiAobmV3QWN0aXZlSW5kaWNhdG9yKSB7XG4gICAgICAgIG5ld0FjdGl2ZUluZGljYXRvci5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFJDIpO1xuICAgICAgICBuZXdBY3RpdmVJbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlSW50ZXJ2YWwoKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fYWN0aXZlRWxlbWVudCB8fCB0aGlzLl9nZXRBY3RpdmUoKTtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50SW50ZXJ2YWwgPSBOdW1iZXIucGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtaW50ZXJ2YWwnKSwgMTApO1xuICAgICAgdGhpcy5fY29uZmlnLmludGVydmFsID0gZWxlbWVudEludGVydmFsIHx8IHRoaXMuX2NvbmZpZy5kZWZhdWx0SW50ZXJ2YWw7XG4gICAgfVxuICAgIF9zbGlkZShvcmRlciwgZWxlbWVudCA9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuX2dldEFjdGl2ZSgpO1xuICAgICAgY29uc3QgaXNOZXh0ID0gb3JkZXIgPT09IE9SREVSX05FWFQ7XG4gICAgICBjb25zdCBuZXh0RWxlbWVudCA9IGVsZW1lbnQgfHwgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQodGhpcy5fZ2V0SXRlbXMoKSwgYWN0aXZlRWxlbWVudCwgaXNOZXh0LCB0aGlzLl9jb25maWcud3JhcCk7XG4gICAgICBpZiAobmV4dEVsZW1lbnQgPT09IGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV4dEVsZW1lbnRJbmRleCA9IHRoaXMuX2dldEl0ZW1JbmRleChuZXh0RWxlbWVudCk7XG4gICAgICBjb25zdCB0cmlnZ2VyRXZlbnQgPSBldmVudE5hbWUgPT4ge1xuICAgICAgICByZXR1cm4gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgZXZlbnROYW1lLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogbmV4dEVsZW1lbnQsXG4gICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9vcmRlclRvRGlyZWN0aW9uKG9yZGVyKSxcbiAgICAgICAgICBmcm9tOiB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudCksXG4gICAgICAgICAgdG86IG5leHRFbGVtZW50SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2xpZGVFdmVudCA9IHRyaWdnZXJFdmVudChFVkVOVF9TTElERSk7XG4gICAgICBpZiAoc2xpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghYWN0aXZlRWxlbWVudCB8fCAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgLy8gU29tZSB3ZWlyZG5lc3MgaXMgaGFwcGVuaW5nLCBzbyB3ZSBiYWlsXG4gICAgICAgIC8vIFRPRE86IGNoYW5nZSB0ZXN0cyB0aGF0IHVzZSBlbXB0eSBkaXZzIHRvIGF2b2lkIHRoaXMgY2hlY2tcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbCk7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudEluZGV4KTtcbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbmFsQ2xhc3NOYW1lID0gaXNOZXh0ID8gQ0xBU1NfTkFNRV9TVEFSVCA6IENMQVNTX05BTUVfRU5EO1xuICAgICAgY29uc3Qgb3JkZXJDbGFzc05hbWUgPSBpc05leHQgPyBDTEFTU19OQU1FX05FWFQgOiBDTEFTU19OQU1FX1BSRVY7XG4gICAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QuYWRkKG9yZGVyQ2xhc3NOYW1lKTtcbiAgICAgIHJlZmxvdyhuZXh0RWxlbWVudCk7XG4gICAgICBhY3RpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgICAgbmV4dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG4gICAgICBjb25zdCBjb21wbGV0ZUNhbGxCYWNrID0gKCkgPT4ge1xuICAgICAgICBuZXh0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGRpcmVjdGlvbmFsQ2xhc3NOYW1lLCBvcmRlckNsYXNzTmFtZSk7XG4gICAgICAgIG5leHRFbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUkMik7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0FDVElWRSQyLCBvcmRlckNsYXNzTmFtZSwgZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdHJpZ2dlckV2ZW50KEVWRU5UX1NMSUQpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGVDYWxsQmFjaywgYWN0aXZlRWxlbWVudCwgdGhpcy5faXNBbmltYXRlZCgpKTtcbiAgICAgIGlmIChpc0N5Y2xpbmcpIHtcbiAgICAgICAgdGhpcy5jeWNsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBfaXNBbmltYXRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NMSURFKTtcbiAgICB9XG4gICAgX2dldEFjdGl2ZSgpIHtcbiAgICAgIHJldHVybiBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0FDVElWRV9JVEVNLCB0aGlzLl9lbGVtZW50KTtcbiAgICB9XG4gICAgX2dldEl0ZW1zKCkge1xuICAgICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSVRFTSwgdGhpcy5fZWxlbWVudCk7XG4gICAgfVxuICAgIF9jbGVhckludGVydmFsKCkge1xuICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIF9kaXJlY3Rpb25Ub09yZGVyKGRpcmVjdGlvbikge1xuICAgICAgaWYgKGlzUlRMKCkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OX0xFRlQgPyBPUkRFUl9QUkVWIDogT1JERVJfTkVYVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09IERJUkVDVElPTl9MRUZUID8gT1JERVJfTkVYVCA6IE9SREVSX1BSRVY7XG4gICAgfVxuICAgIF9vcmRlclRvRGlyZWN0aW9uKG9yZGVyKSB7XG4gICAgICBpZiAoaXNSVEwoKSkge1xuICAgICAgICByZXR1cm4gb3JkZXIgPT09IE9SREVSX1BSRVYgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmRlciA9PT0gT1JERVJfUFJFViA/IERJUkVDVElPTl9SSUdIVCA6IERJUkVDVElPTl9MRUZUO1xuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuICAgIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IENhcm91c2VsLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGF0YS50byhjb25maWcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cbiAgRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSQ1LCBTRUxFQ1RPUl9EQVRBX1NMSURFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRoaXMpO1xuICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfQ0FST1VTRUwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2Fyb3VzZWwgPSBDYXJvdXNlbC5nZXRPckNyZWF0ZUluc3RhbmNlKHRhcmdldCk7XG4gICAgY29uc3Qgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLXNsaWRlLXRvJyk7XG4gICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgIGNhcm91c2VsLnRvKHNsaWRlSW5kZXgpO1xuICAgICAgY2Fyb3VzZWwuX21heWJlRW5hYmxlQ3ljbGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGUodGhpcywgJ3NsaWRlJykgPT09ICduZXh0Jykge1xuICAgICAgY2Fyb3VzZWwubmV4dCgpO1xuICAgICAgY2Fyb3VzZWwuX21heWJlRW5hYmxlQ3ljbGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2Fyb3VzZWwucHJldigpO1xuICAgIGNhcm91c2VsLl9tYXliZUVuYWJsZUN5Y2xlKCk7XG4gIH0pO1xuICBFdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJJDMsICgpID0+IHtcbiAgICBjb25zdCBjYXJvdXNlbHMgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfUklERSk7XG4gICAgZm9yIChjb25zdCBjYXJvdXNlbCBvZiBjYXJvdXNlbHMpIHtcbiAgICAgIENhcm91c2VsLmdldE9yQ3JlYXRlSW5zdGFuY2UoY2Fyb3VzZWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oQ2Fyb3VzZWwpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgY29sbGFwc2UuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FJGIgPSAnY29sbGFwc2UnO1xuICBjb25zdCBEQVRBX0tFWSQ3ID0gJ2JzLmNvbGxhcHNlJztcbiAgY29uc3QgRVZFTlRfS0VZJDcgPSBgLiR7REFUQV9LRVkkN31gO1xuICBjb25zdCBEQVRBX0FQSV9LRVkkNCA9ICcuZGF0YS1hcGknO1xuICBjb25zdCBFVkVOVF9TSE9XJDYgPSBgc2hvdyR7RVZFTlRfS0VZJDd9YDtcbiAgY29uc3QgRVZFTlRfU0hPV04kNiA9IGBzaG93biR7RVZFTlRfS0VZJDd9YDtcbiAgY29uc3QgRVZFTlRfSElERSQ2ID0gYGhpZGUke0VWRU5UX0tFWSQ3fWA7XG4gIGNvbnN0IEVWRU5UX0hJRERFTiQ2ID0gYGhpZGRlbiR7RVZFTlRfS0VZJDd9YDtcbiAgY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkNCA9IGBjbGljayR7RVZFTlRfS0VZJDd9JHtEQVRBX0FQSV9LRVkkNH1gO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1ckNyA9ICdzaG93JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRSA9ICdjb2xsYXBzZSc7XG4gIGNvbnN0IENMQVNTX05BTUVfQ09MTEFQU0lORyA9ICdjb2xsYXBzaW5nJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRUQgPSAnY29sbGFwc2VkJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4gPSBgOnNjb3BlIC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9IC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9YDtcbiAgY29uc3QgQ0xBU1NfTkFNRV9IT1JJWk9OVEFMID0gJ2NvbGxhcHNlLWhvcml6b250YWwnO1xuICBjb25zdCBXSURUSCA9ICd3aWR0aCc7XG4gIGNvbnN0IEhFSUdIVCA9ICdoZWlnaHQnO1xuICBjb25zdCBTRUxFQ1RPUl9BQ1RJVkVTID0gJy5jb2xsYXBzZS5zaG93LCAuY29sbGFwc2UuY29sbGFwc2luZyc7XG4gIGNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFJDQgPSAnW2RhdGEtYnMtdG9nZ2xlPVwiY29sbGFwc2VcIl0nO1xuICBjb25zdCBEZWZhdWx0JGEgPSB7XG4gICAgcGFyZW50OiBudWxsLFxuICAgIHRvZ2dsZTogdHJ1ZVxuICB9O1xuICBjb25zdCBEZWZhdWx0VHlwZSRhID0ge1xuICAgIHBhcmVudDogJyhudWxsfGVsZW1lbnQpJyxcbiAgICB0b2dnbGU6ICdib29sZWFuJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIENvbGxhcHNlIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBbXTtcbiAgICAgIGNvbnN0IHRvZ2dsZUxpc3QgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfVE9HR0xFJDQpO1xuICAgICAgZm9yIChjb25zdCBlbGVtIG9mIHRvZ2dsZUxpc3QpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBTZWxlY3RvckVuZ2luZS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pO1xuICAgICAgICBjb25zdCBmaWx0ZXJFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvcikuZmlsdGVyKGZvdW5kRWxlbWVudCA9PiBmb3VuZEVsZW1lbnQgPT09IHRoaXMuX2VsZW1lbnQpO1xuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwgJiYgZmlsdGVyRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkucHVzaChlbGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5faW5pdGlhbGl6ZUNoaWxkcmVuKCk7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX3RyaWdnZXJBcnJheSwgdGhpcy5faXNTaG93bigpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jb25maWcudG9nZ2xlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0JGE7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGUkYTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkYjtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICB0b2dnbGUoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8IHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgYWN0aXZlQ2hpbGRyZW4gPSBbXTtcblxuICAgICAgLy8gZmluZCBhY3RpdmUgY2hpbGRyZW5cbiAgICAgIGlmICh0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0FDVElWRVMpLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnQpLm1hcChlbGVtZW50ID0+IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwge1xuICAgICAgICAgIHRvZ2dsZTogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGl2ZUNoaWxkcmVuLmxlbmd0aCAmJiBhY3RpdmVDaGlsZHJlblswXS5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XJDYpO1xuICAgICAgaWYgKHN0YXJ0RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGFjdGl2ZUluc3RhbmNlIG9mIGFjdGl2ZUNoaWxkcmVuKSB7XG4gICAgICAgIGFjdGl2ZUluc3RhbmNlLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQ09MTEFQU0lORyk7XG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwO1xuICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX3RyaWdnZXJBcnJheSwgdHJ1ZSk7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQ09MTEFQU0UsIENMQVNTX05BTUVfU0hPVyQ3KTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG4gICAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOJDYpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSk7XG4gICAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YDtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMuX2VsZW1lbnQsIHRydWUpO1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudFtzY3JvbGxTaXplXX1weGA7XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RhcnRFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUkNik7XG4gICAgICBpZiAoc3RhcnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dfXB4YDtcbiAgICAgIHJlZmxvdyh0aGlzLl9lbGVtZW50KTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UsIENMQVNTX05BTUVfU0hPVyQ3KTtcbiAgICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0aGlzLl90cmlnZ2VyQXJyYXkpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IodHJpZ2dlcik7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICF0aGlzLl9pc1Nob3duKGVsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFt0cmlnZ2VyXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQ09MTEFQU0UpO1xuICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURERU4kNik7XG4gICAgICB9O1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG4gICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLl9lbGVtZW50LCB0cnVlKTtcbiAgICB9XG4gICAgX2lzU2hvd24oZWxlbWVudCA9IHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1ckNyk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuICAgIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSk7IC8vIENvZXJjZSBzdHJpbmcgdmFsdWVzXG4gICAgICBjb25maWcucGFyZW50ID0gZ2V0RWxlbWVudChjb25maWcucGFyZW50KTtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuICAgIF9nZXREaW1lbnNpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9IT1JJWk9OVEFMKSA/IFdJRFRIIDogSEVJR0hUO1xuICAgIH1cbiAgICBfaW5pdGlhbGl6ZUNoaWxkcmVuKCkge1xuICAgICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0RBVEFfVE9HR0xFJDQpO1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3RvcihlbGVtZW50KTtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFtlbGVtZW50XSwgdGhpcy5faXNTaG93bihzZWxlY3RlZCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIF9nZXRGaXJzdExldmVsQ2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gU2VsZWN0b3JFbmdpbmUuZmluZChDTEFTU19OQU1FX0RFRVBFUl9DSElMRFJFTiwgdGhpcy5fY29uZmlnLnBhcmVudCk7XG4gICAgICAvLyByZW1vdmUgY2hpbGRyZW4gaWYgZ3JlYXRlciBkZXB0aFxuICAgICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoc2VsZWN0b3IsIHRoaXMuX2NvbmZpZy5wYXJlbnQpLmZpbHRlcihlbGVtZW50ID0+ICFjaGlsZHJlbi5pbmNsdWRlcyhlbGVtZW50KSk7XG4gICAgfVxuICAgIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModHJpZ2dlckFycmF5LCBpc09wZW4pIHtcbiAgICAgIGlmICghdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdHJpZ2dlckFycmF5KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShDTEFTU19OQU1FX0NPTExBUFNFRCwgIWlzT3Blbik7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgY29uc3QgX2NvbmZpZyA9IHt9O1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICBfY29uZmlnLnRvZ2dsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBDb2xsYXBzZS5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIF9jb25maWcpO1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cbiAgRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSQ0LCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQ0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnQScgfHwgZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgZXZlbnQuZGVsZWdhdGVUYXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgU2VsZWN0b3JFbmdpbmUuZ2V0TXVsdGlwbGVFbGVtZW50c0Zyb21TZWxlY3Rvcih0aGlzKSkge1xuICAgICAgQ29sbGFwc2UuZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50LCB7XG4gICAgICAgIHRvZ2dsZTogZmFsc2VcbiAgICAgIH0pLnRvZ2dsZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oQ29sbGFwc2UpO1xuXG4gIHZhciB0b3AgPSAndG9wJztcbiAgdmFyIGJvdHRvbSA9ICdib3R0b20nO1xuICB2YXIgcmlnaHQgPSAncmlnaHQnO1xuICB2YXIgbGVmdCA9ICdsZWZ0JztcbiAgdmFyIGF1dG8gPSAnYXV0byc7XG4gIHZhciBiYXNlUGxhY2VtZW50cyA9IFt0b3AsIGJvdHRvbSwgcmlnaHQsIGxlZnRdO1xuICB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuICB2YXIgZW5kID0gJ2VuZCc7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSAnY2xpcHBpbmdQYXJlbnRzJztcbiAgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbiAgdmFyIHBvcHBlciA9ICdwb3BwZXInO1xuICB2YXIgcmVmZXJlbmNlID0gJ3JlZmVyZW5jZSc7XG4gIHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChbcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbiAgfSwgW10pO1xuICB2YXIgcGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9bXS5jb25jYXQoYmFzZVBsYWNlbWVudHMsIFthdXRvXSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQsIHBsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG4gIH0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuICB2YXIgYmVmb3JlUmVhZCA9ICdiZWZvcmVSZWFkJztcbiAgdmFyIHJlYWQgPSAncmVhZCc7XG4gIHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuICB2YXIgYmVmb3JlTWFpbiA9ICdiZWZvcmVNYWluJztcbiAgdmFyIG1haW4gPSAnbWFpbic7XG4gIHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG4gIHZhciBiZWZvcmVXcml0ZSA9ICdiZWZvcmVXcml0ZSc7XG4gIHZhciB3cml0ZSA9ICd3cml0ZSc7XG4gIHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuICB2YXIgbW9kaWZpZXJQaGFzZXMgPSBbYmVmb3JlUmVhZCwgcmVhZCwgYWZ0ZXJSZWFkLCBiZWZvcmVNYWluLCBtYWluLCBhZnRlck1haW4sIGJlZm9yZVdyaXRlLCB3cml0ZSwgYWZ0ZXJXcml0ZV07XG5cbiAgZnVuY3Rpb24gZ2V0Tm9kZU5hbWUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50ID8gKGVsZW1lbnQubm9kZU5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cblxuICAgIGlmIChub2RlLnRvU3RyaW5nKCkgIT09ICdbb2JqZWN0IFdpbmRvd10nKSB7XG4gICAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICAgIHJldHVybiBvd25lckRvY3VtZW50ID8gb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cgOiB3aW5kb3c7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkVsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNIVE1MRWxlbWVudChub2RlKSB7XG4gICAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gICAgLy8gSUUgMTEgaGFzIG5vIFNoYWRvd1Jvb3RcbiAgICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuU2hhZG93Um9vdDtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG4gIH1cblxuICAvLyBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBIVE1MRWxlbWVudHMgc3VjaCBhcyBwb3BwZXIgYW5kIGFycm93XG5cbiAgZnVuY3Rpb24gYXBwbHlTdHlsZXMoX3JlZikge1xuICAgIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciBzdHlsZSA9IHN0YXRlLnN0eWxlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gRmxvdyBkb2Vzbid0IHN1cHBvcnQgdG8gZXh0ZW5kIHRoaXMgcHJvcGVydHksIGJ1dCBpdCdzIHRoZSBtb3N0XG4gICAgICAvLyBlZmZlY3RpdmUgd2F5IHRvIGFwcGx5IHN0eWxlcyB0byBhbiBIVE1MRWxlbWVudFxuICAgICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWZmZWN0JDIoX3JlZjIpIHtcbiAgICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICAgIHBvcHBlcjoge1xuICAgICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgbWFyZ2luOiAnMCdcbiAgICAgIH0sXG4gICAgICBhcnJvdzoge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgfSxcbiAgICAgIHJlZmVyZW5jZToge31cbiAgICB9O1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gICAgc3RhdGUuc3R5bGVzID0gaW5pdGlhbFN0eWxlcztcblxuICAgIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICAgIHZhciBzdHlsZSA9IHN0eWxlUHJvcGVydGllcy5yZWR1Y2UoZnVuY3Rpb24gKHN0eWxlLCBwcm9wZXJ0eSkge1xuICAgICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSwge30pOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuICBjb25zdCBhcHBseVN0eWxlcyQxID0ge1xuICAgIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwaGFzZTogJ3dyaXRlJyxcbiAgICBmbjogYXBwbHlTdHlsZXMsXG4gICAgZWZmZWN0OiBlZmZlY3QkMixcbiAgICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbiAgfTtcblxuICBmdW5jdGlvbiBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICAgIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgfVxuXG4gIHZhciBtYXggPSBNYXRoLm1heDtcbiAgdmFyIG1pbiA9IE1hdGgubWluO1xuICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xuXG4gIGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICAgIHZhciB1YURhdGEgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YTtcblxuICAgIGlmICh1YURhdGEgIT0gbnVsbCAmJiB1YURhdGEuYnJhbmRzICYmIEFycmF5LmlzQXJyYXkodWFEYXRhLmJyYW5kcykpIHtcbiAgICAgIHJldHVybiB1YURhdGEuYnJhbmRzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgICAgfSkuam9pbignICcpO1xuICAgIH1cblxuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNMYXlvdXRWaWV3cG9ydCgpIHtcbiAgICByZXR1cm4gIS9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgaW5jbHVkZVNjYWxlLCBpc0ZpeGVkU3RyYXRlZ3kpIHtcbiAgICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICAgIGluY2x1ZGVTY2FsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgICAgaXNGaXhlZFN0cmF0ZWd5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY2FsZVggPSAxO1xuICAgIHZhciBzY2FsZVkgPSAxO1xuXG4gICAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBzY2FsZVggPSBlbGVtZW50Lm9mZnNldFdpZHRoID4gMCA/IHJvdW5kKGNsaWVudFJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxIDogMTtcbiAgICAgIHNjYWxlWSA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gMCA/IHJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDEgOiAxO1xuICAgIH1cblxuICAgIHZhciBfcmVmID0gaXNFbGVtZW50KGVsZW1lbnQpID8gZ2V0V2luZG93KGVsZW1lbnQpIDogd2luZG93LFxuICAgICAgICB2aXN1YWxWaWV3cG9ydCA9IF9yZWYudmlzdWFsVmlld3BvcnQ7XG5cbiAgICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICAgIHZhciB4ID0gKGNsaWVudFJlY3QubGVmdCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdCA6IDApKSAvIHNjYWxlWDtcbiAgICB2YXIgeSA9IChjbGllbnRSZWN0LnRvcCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wIDogMCkpIC8gc2NhbGVZO1xuICAgIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gICAgdmFyIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0IC8gc2NhbGVZO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIHRvcDogeSxcbiAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgICBib3R0b206IHkgKyBoZWlnaHQsXG4gICAgICBsZWZ0OiB4LFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9O1xuICB9XG5cbiAgLy8gbWVhbnMgaXQgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCB0cmFuc2Zvcm1zLlxuXG4gIGZ1bmN0aW9uIGdldExheW91dFJlY3QoZWxlbWVudCkge1xuICAgIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgICAvLyBGaXhlcyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzEyMjNcblxuICAgIHZhciB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3Qud2lkdGggLSB3aWR0aCkgPD0gMSkge1xuICAgICAgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LmhlaWdodCAtIGhlaWdodCkgPD0gMSkge1xuICAgICAgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGVsZW1lbnQub2Zmc2V0TGVmdCxcbiAgICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29udGFpbnMocGFyZW50LCBjaGlsZCkge1xuICAgIHZhciByb290Tm9kZSA9IGNoaWxkLmdldFJvb3ROb2RlICYmIGNoaWxkLmdldFJvb3ROb2RlKCk7IC8vIEZpcnN0LCBhdHRlbXB0IHdpdGggZmFzdGVyIG5hdGl2ZSBtZXRob2RcblxuICAgIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IC8vIHRoZW4gZmFsbGJhY2sgdG8gY3VzdG9tIGltcGxlbWVudGF0aW9uIHdpdGggU2hhZG93IERPTSBzdXBwb3J0XG4gICAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgICB2YXIgbmV4dCA9IGNoaWxkO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ106IG5lZWQgYSBiZXR0ZXIgd2F5IHRvIGhhbmRsZSB0aGlzLi4uXG5cblxuICAgICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgICB9IHdoaWxlIChuZXh0KTtcbiAgICAgIH0gLy8gR2l2ZSB1cCwgdGhlIHJlc3VsdCBpcyBmYWxzZVxuXG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlJDEoZWxlbWVudCkge1xuICAgIHJldHVybiBnZXRXaW5kb3coZWxlbWVudCkuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVGFibGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gWyd0YWJsZScsICd0ZCcsICd0aCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoZWxlbWVudCkpID49IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkge1xuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgICByZXR1cm4gKChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICAgIGlmIChnZXROb2RlTmFtZShlbGVtZW50KSA9PT0gJ2h0bWwnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKC8vIHRoaXMgaXMgYSBxdWlja2VyIChidXQgbGVzcyB0eXBlIHNhZmUpIHdheSB0byBzYXZlIHF1aXRlIHNvbWUgYnl0ZXMgZnJvbSB0aGUgYnVuZGxlXG4gICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dXG4gICAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIGVsZW1lbnQuYXNzaWduZWRTbG90IHx8IC8vIHN0ZXAgaW50byB0aGUgc2hhZG93IERPTSBvZiB0aGUgcGFyZW50IG9mIGEgc2xvdHRlZCBub2RlXG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUgfHwgKCAvLyBET00gRWxlbWVudCBkZXRlY3RlZFxuICAgICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IEhUTUxFbGVtZW50IGlzIGEgTm9kZVxuICAgICAgZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpIC8vIGZhbGxiYWNrXG5cbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gICAgZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbiAgLy8gcmV0dXJuIHRoZSBjb250YWluaW5nIGJsb2NrXG5cblxuICBmdW5jdGlvbiBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkge1xuICAgIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gICAgdmFyIGlzSUUgPSAvVHJpZGVudC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG5cbiAgICBpZiAoaXNJRSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgICB2YXIgZWxlbWVudENzcyA9IGdldENvbXB1dGVkU3R5bGUkMShlbGVtZW50KTtcblxuICAgICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgIGlmIChpc1NoYWRvd1Jvb3QoY3VycmVudE5vZGUpKSB7XG4gICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gICAgfVxuXG4gICAgd2hpbGUgKGlzSFRNTEVsZW1lbnQoY3VycmVudE5vZGUpICYmIFsnaHRtbCcsICdib2R5J10uaW5kZXhPZihnZXROb2RlTmFtZShjdXJyZW50Tm9kZSkpIDwgMCkge1xuICAgICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUkMShjdXJyZW50Tm9kZSk7IC8vIFRoaXMgaXMgbm9uLWV4aGF1c3RpdmUgYnV0IGNvdmVycyB0aGUgbW9zdCBjb21tb24gQ1NTIHByb3BlcnRpZXMgdGhhdFxuICAgICAgLy8gY3JlYXRlIGEgY29udGFpbmluZyBibG9jay5cbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICAgIGlmIChjc3MudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgY3NzLnBlcnNwZWN0aXZlICE9PSAnbm9uZScgfHwgY3NzLmNvbnRhaW4gPT09ICdwYWludCcgfHwgWyd0cmFuc2Zvcm0nLCAncGVyc3BlY3RpdmUnXS5pbmRleE9mKGNzcy53aWxsQ2hhbmdlKSAhPT0gLTEgfHwgaXNGaXJlZm94ICYmIGNzcy53aWxsQ2hhbmdlID09PSAnZmlsdGVyJyB8fCBpc0ZpcmVmb3ggJiYgY3NzLmZpbHRlciAmJiBjc3MuZmlsdGVyICE9PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9IC8vIEdldHMgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgcG9zaXRpb25lZCBlbGVtZW50LiBIYW5kbGVzIHNvbWUgZWRnZSBjYXNlcyxcbiAgLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG4gIGZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gICAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgaXNUYWJsZUVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBnZXRDb21wdXRlZFN0eWxlJDEob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ICYmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnaHRtbCcgfHwgZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2JvZHknICYmIGdldENvbXB1dGVkU3R5bGUkMShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICAgIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5JztcbiAgfVxuXG4gIGZ1bmN0aW9uIHdpdGhpbihtaW4kMSwgdmFsdWUsIG1heCQxKSB7XG4gICAgcmV0dXJuIG1heChtaW4kMSwgbWluKHZhbHVlLCBtYXgkMSkpO1xuICB9XG4gIGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICAgIHZhciB2ID0gd2l0aGluKG1pbiwgdmFsdWUsIG1heCk7XG4gICAgcmV0dXJuIHYgPiBtYXggPyBtYXggOiB2O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RnJlc2hTaWRlT2JqZWN0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZ2V0RnJlc2hTaWRlT2JqZWN0KCksIHBhZGRpbmdPYmplY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwYW5kVG9IYXNoTWFwKHZhbHVlLCBrZXlzKSB7XG4gICAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoTWFwLCBrZXkpIHtcbiAgICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIGhhc2hNYXA7XG4gICAgfSwge30pO1xuICB9XG5cbiAgdmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICAgIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gICAgfSkpIDogcGFkZGluZztcbiAgICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgfTtcblxuICBmdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gICAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICAgIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICAgIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICAgIHZhciBheGlzID0gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpO1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCB8fCAhcG9wcGVyT2Zmc2V0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwYWRkaW5nT2JqZWN0ID0gdG9QYWRkaW5nT2JqZWN0KG9wdGlvbnMucGFkZGluZywgc3RhdGUpO1xuICAgIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gICAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICAgIHZhciBtYXhQcm9wID0gYXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gICAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgICB2YXIgYXJyb3dPZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQoYXJyb3dFbGVtZW50KTtcbiAgICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgICAvLyBvdXRzaWRlIG9mIHRoZSBwb3BwZXIgYm91bmRzXG5cbiAgICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgICB2YXIgY2VudGVyID0gY2xpZW50U2l6ZSAvIDIgLSBhcnJvd1JlY3RbbGVuXSAvIDIgKyBjZW50ZXJUb1JlZmVyZW5jZTtcbiAgICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSAoX3N0YXRlJG1vZGlmaWVyc0RhdGEkID0ge30sIF9zdGF0ZSRtb2RpZmllcnNEYXRhJFtheGlzUHJvcF0gPSBvZmZzZXQsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJC5jZW50ZXJPZmZzZXQgPSBvZmZzZXQgLSBjZW50ZXIsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZmZlY3QkMShfcmVmMikge1xuICAgIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgICB2YXIgX29wdGlvbnMkZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudCxcbiAgICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICAgIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICAgIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUuZWxlbWVudHMuYXJyb3cgPSBhcnJvd0VsZW1lbnQ7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbiAgY29uc3QgYXJyb3ckMSA9IHtcbiAgICBuYW1lOiAnYXJyb3cnLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcGhhc2U6ICdtYWluJyxcbiAgICBmbjogYXJyb3csXG4gICAgZWZmZWN0OiBlZmZlY3QkMSxcbiAgICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gICAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXVxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG4gIH1cblxuICB2YXIgdW5zZXRTaWRlcyA9IHtcbiAgICB0b3A6ICdhdXRvJyxcbiAgICByaWdodDogJ2F1dG8nLFxuICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgIGxlZnQ6ICdhdXRvJ1xuICB9OyAvLyBSb3VuZCB0aGUgb2Zmc2V0cyB0byB0aGUgbmVhcmVzdCBzdWl0YWJsZSBzdWJwaXhlbCBiYXNlZCBvbiB0aGUgRFBSLlxuICAvLyBab29taW5nIGNhbiBjaGFuZ2UgdGhlIERQUiwgYnV0IGl0IHNlZW1zIHRvIHJlcG9ydCBhIHZhbHVlIHRoYXQgd2lsbFxuICAvLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuICBmdW5jdGlvbiByb3VuZE9mZnNldHNCeURQUihfcmVmLCB3aW4pIHtcbiAgICB2YXIgeCA9IF9yZWYueCxcbiAgICAgICAgeSA9IF9yZWYueTtcbiAgICB2YXIgZHByID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcm91bmQoeCAqIGRwcikgLyBkcHIgfHwgMCxcbiAgICAgIHk6IHJvdW5kKHkgKiBkcHIpIC8gZHByIHx8IDBcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwVG9TdHlsZXMoX3JlZjIpIHtcbiAgICB2YXIgX09iamVjdCRhc3NpZ24yO1xuXG4gICAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgICAgcG9wcGVyUmVjdCA9IF9yZWYyLnBvcHBlclJlY3QsXG4gICAgICAgIHBsYWNlbWVudCA9IF9yZWYyLnBsYWNlbWVudCxcbiAgICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgICBvZmZzZXRzID0gX3JlZjIub2Zmc2V0cyxcbiAgICAgICAgcG9zaXRpb24gPSBfcmVmMi5wb3NpdGlvbixcbiAgICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgICBhZGFwdGl2ZSA9IF9yZWYyLmFkYXB0aXZlLFxuICAgICAgICByb3VuZE9mZnNldHMgPSBfcmVmMi5yb3VuZE9mZnNldHMsXG4gICAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuICAgIHZhciBfb2Zmc2V0cyR4ID0gb2Zmc2V0cy54LFxuICAgICAgICB4ID0gX29mZnNldHMkeCA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHgsXG4gICAgICAgIF9vZmZzZXRzJHkgPSBvZmZzZXRzLnksXG4gICAgICAgIHkgPSBfb2Zmc2V0cyR5ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeTtcblxuICAgIHZhciBfcmVmMyA9IHR5cGVvZiByb3VuZE9mZnNldHMgPT09ICdmdW5jdGlvbicgPyByb3VuZE9mZnNldHMoe1xuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KSA6IHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfTtcblxuICAgIHggPSBfcmVmMy54O1xuICAgIHkgPSBfcmVmMy55O1xuICAgIHZhciBoYXNYID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneCcpO1xuICAgIHZhciBoYXNZID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneScpO1xuICAgIHZhciBzaWRlWCA9IGxlZnQ7XG4gICAgdmFyIHNpZGVZID0gdG9wO1xuICAgIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgICBpZiAoYWRhcHRpdmUpIHtcbiAgICAgIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKTtcbiAgICAgIHZhciBoZWlnaHRQcm9wID0gJ2NsaWVudEhlaWdodCc7XG4gICAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZ2V0V2luZG93KHBvcHBlcikpIHtcbiAgICAgICAgb2Zmc2V0UGFyZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KHBvcHBlcik7XG5cbiAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUkMShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyAmJiBwb3NpdGlvbiA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICAgIGhlaWdodFByb3AgPSAnc2Nyb2xsSGVpZ2h0JztcbiAgICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgICB9XG4gICAgICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhc3RdOiBmb3JjZSB0eXBlIHJlZmluZW1lbnQsIHdlIGNvbXBhcmUgb2Zmc2V0UGFyZW50IHdpdGggd2luZG93IGFib3ZlLCBidXQgRmxvdyBkb2Vzbid0IGRldGVjdCBpdFxuXG5cbiAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgICAgaWYgKHBsYWNlbWVudCA9PT0gdG9wIHx8IChwbGFjZW1lbnQgPT09IGxlZnQgfHwgcGxhY2VtZW50ID09PSByaWdodCkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgICAgc2lkZVkgPSBib3R0b207XG4gICAgICAgIHZhciBvZmZzZXRZID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQuaGVpZ2h0IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICAgIG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXTtcbiAgICAgICAgeSAtPSBvZmZzZXRZIC0gcG9wcGVyUmVjdC5oZWlnaHQ7XG4gICAgICAgIHkgKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAocGxhY2VtZW50ID09PSBsZWZ0IHx8IChwbGFjZW1lbnQgPT09IHRvcCB8fCBwbGFjZW1lbnQgPT09IGJvdHRvbSkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgICAgc2lkZVggPSByaWdodDtcbiAgICAgICAgdmFyIG9mZnNldFggPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC53aWR0aCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgICBvZmZzZXRQYXJlbnRbd2lkdGhQcm9wXTtcbiAgICAgICAgeCAtPSBvZmZzZXRYIC0gcG9wcGVyUmVjdC53aWR0aDtcbiAgICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcG9zaXRpb246IHBvc2l0aW9uXG4gICAgfSwgYWRhcHRpdmUgJiYgdW5zZXRTaWRlcyk7XG5cbiAgICB2YXIgX3JlZjQgPSByb3VuZE9mZnNldHMgPT09IHRydWUgPyByb3VuZE9mZnNldHNCeURQUih7XG4gICAgICB4OiB4LFxuICAgICAgeTogeVxuICAgIH0sIGdldFdpbmRvdyhwb3BwZXIpKSA6IHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfTtcblxuICAgIHggPSBfcmVmNC54O1xuICAgIHkgPSBfcmVmNC55O1xuXG4gICAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgICAgdmFyIF9PYmplY3QkYXNzaWduO1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24gPSB7fSwgX09iamVjdCRhc3NpZ25bc2lkZVldID0gaGFzWSA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbltzaWRlWF0gPSBoYXNYID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduLnRyYW5zZm9ybSA9ICh3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSA8PSAxID8gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgMClcIiwgX09iamVjdCRhc3NpZ24pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24yID0ge30sIF9PYmplY3QkYXNzaWduMltzaWRlWV0gPSBoYXNZID8geSArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjJbc2lkZVhdID0gaGFzWCA/IHggKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yLnRyYW5zZm9ybSA9ICcnLCBfT2JqZWN0JGFzc2lnbjIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgICB2YXIgc3RhdGUgPSBfcmVmNS5zdGF0ZSxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWY1Lm9wdGlvbnM7XG4gICAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgICBncHVBY2NlbGVyYXRpb24gPSBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRncHVBY2NlbGVyYXQsXG4gICAgICAgIF9vcHRpb25zJGFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZSxcbiAgICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgICBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPSBvcHRpb25zLnJvdW5kT2Zmc2V0cyxcbiAgICAgICAgcm91bmRPZmZzZXRzID0gX29wdGlvbnMkcm91bmRPZmZzZXRzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcm91bmRPZmZzZXRzO1xuICAgIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgICBwbGFjZW1lbnQ6IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KSxcbiAgICAgIHZhcmlhdGlvbjogZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCksXG4gICAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3Q6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbjogZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICAgIH07XG5cbiAgICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLFxuICAgICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyAhPSBudWxsKSB7XG4gICAgICBzdGF0ZS5zdHlsZXMuYXJyb3cgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMuYXJyb3csIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgYWRhcHRpdmU6IGZhbHNlLFxuICAgICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgICAnZGF0YS1wb3BwZXItcGxhY2VtZW50Jzogc3RhdGUucGxhY2VtZW50XG4gICAgfSk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbiAgY29uc3QgY29tcHV0ZVN0eWxlcyQxID0ge1xuICAgIG5hbWU6ICdjb21wdXRlU3R5bGVzJyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHBoYXNlOiAnYmVmb3JlV3JpdGUnLFxuICAgIGZuOiBjb21wdXRlU3R5bGVzLFxuICAgIGRhdGE6IHt9XG4gIH07XG5cbiAgdmFyIHBhc3NpdmUgPSB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGVmZmVjdChfcmVmKSB7XG4gICAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgICAgaW5zdGFuY2UgPSBfcmVmLmluc3RhbmNlLFxuICAgICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICAgIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgICAgc2Nyb2xsID0gX29wdGlvbnMkc2Nyb2xsID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkc2Nyb2xsLFxuICAgICAgICBfb3B0aW9ucyRyZXNpemUgPSBvcHRpb25zLnJlc2l6ZSxcbiAgICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICAgIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coc3RhdGUuZWxlbWVudHMucG9wcGVyKTtcbiAgICB2YXIgc2Nyb2xsUGFyZW50cyA9IFtdLmNvbmNhdChzdGF0ZS5zY3JvbGxQYXJlbnRzLnJlZmVyZW5jZSwgc3RhdGUuc2Nyb2xsUGFyZW50cy5wb3BwZXIpO1xuXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgICAgIHNjcm9sbFBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc2l6ZSkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0ge1xuICAgIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwaGFzZTogJ3dyaXRlJyxcbiAgICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgICBlZmZlY3Q6IGVmZmVjdCxcbiAgICBkYXRhOiB7fVxuICB9O1xuXG4gIHZhciBoYXNoJDEgPSB7XG4gICAgbGVmdDogJ3JpZ2h0JyxcbiAgICByaWdodDogJ2xlZnQnLFxuICAgIGJvdHRvbTogJ3RvcCcsXG4gICAgdG9wOiAnYm90dG9tJ1xuICB9O1xuICBmdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgICAgcmV0dXJuIGhhc2gkMVttYXRjaGVkXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBoYXNoID0ge1xuICAgIHN0YXJ0OiAnZW5kJyxcbiAgICBlbmQ6ICdzdGFydCdcbiAgfTtcbiAgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsKG5vZGUpIHtcbiAgICB2YXIgd2luID0gZ2V0V2luZG93KG5vZGUpO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICAgIHZhciBzY3JvbGxUb3AgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgICAvLyBJZiA8aHRtbD4gaGFzIGEgQ1NTIHdpZHRoIGdyZWF0ZXIgdGhhbiB0aGUgdmlld3BvcnQsIHRoZW4gdGhpcyB3aWxsIGJlXG4gICAgLy8gaW5jb3JyZWN0IGZvciBSVEwuXG4gICAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgICAvLyBpdCdzIG5vdCBhbiBpc3N1ZS4gSSBkb24ndCB0aGluayBhbnlvbmUgZXZlciBzcGVjaWZpZXMgd2lkdGggb24gPGh0bWw+XG4gICAgLy8gYW55d2F5LlxuICAgIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gICAgLy8gdGhpcyAoZS5nLiBFZGdlIDIwMTksIElFMTEsIFNhZmFyaSlcbiAgICByZXR1cm4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkubGVmdCArIGdldFdpbmRvd1Njcm9sbChlbGVtZW50KS5zY3JvbGxMZWZ0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gICAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgICB2YXIgaHRtbCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gICAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gaHRtbC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIHggPSAwO1xuICAgIHZhciB5ID0gMDtcblxuICAgIGlmICh2aXN1YWxWaWV3cG9ydCkge1xuICAgICAgd2lkdGggPSB2aXN1YWxWaWV3cG9ydC53aWR0aDtcbiAgICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICAgIHZhciBsYXlvdXRWaWV3cG9ydCA9IGlzTGF5b3V0Vmlld3BvcnQoKTtcblxuICAgICAgaWYgKGxheW91dFZpZXdwb3J0IHx8ICFsYXlvdXRWaWV3cG9ydCAmJiBzdHJhdGVneSA9PT0gJ2ZpeGVkJykge1xuICAgICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgICAgeSA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiB4ICsgZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSxcbiAgICAgIHk6IHlcbiAgICB9O1xuICB9XG5cbiAgLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG4gIGZ1bmN0aW9uIGdldERvY3VtZW50UmVjdChlbGVtZW50KSB7XG4gICAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICAgIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgIHZhciB3aW5TY3JvbGwgPSBnZXRXaW5kb3dTY3JvbGwoZWxlbWVudCk7XG4gICAgdmFyIGJvZHkgPSAoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHk7XG4gICAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgICB2YXIgaGVpZ2h0ID0gbWF4KGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgYm9keSA/IGJvZHkuc2Nyb2xsSGVpZ2h0IDogMCwgYm9keSA/IGJvZHkuY2xpZW50SGVpZ2h0IDogMCk7XG4gICAgdmFyIHggPSAtd2luU2Nyb2xsLnNjcm9sbExlZnQgKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpO1xuICAgIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSQxKGJvZHkgfHwgaHRtbCkuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2Nyb2xsUGFyZW50KGVsZW1lbnQpIHtcbiAgICAvLyBGaXJlZm94IHdhbnRzIHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG4gICAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsZW1lbnQpLFxuICAgICAgICBvdmVyZmxvdyA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93LFxuICAgICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICAgIG92ZXJmbG93WSA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93WTtcblxuICAgIHJldHVybiAvYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW4vLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgICBpZiAoWydodG1sJywgJ2JvZHknLCAnI2RvY3VtZW50J10uaW5kZXhPZihnZXROb2RlTmFtZShub2RlKSkgPj0gMCkge1xuICAgICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG5vZGUpICYmIGlzU2Nyb2xsUGFyZW50KG5vZGUpKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUobm9kZSkpO1xuICB9XG5cbiAgLypcbiAgZ2l2ZW4gYSBET00gZWxlbWVudCwgcmV0dXJuIHRoZSBsaXN0IG9mIGFsbCBzY3JvbGwgcGFyZW50cywgdXAgdGhlIGxpc3Qgb2YgYW5jZXNvcnNcbiAgdW50aWwgd2UgZ2V0IHRvIHRoZSB0b3Agd2luZG93IG9iamVjdC4gVGhpcyBsaXN0IGlzIHdoYXQgd2UgYXR0YWNoIHNjcm9sbCBsaXN0ZW5lcnNcbiAgdG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxuICByZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uLlxuICAqL1xuXG4gIGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gICAgaWYgKGxpc3QgPT09IHZvaWQgMCkge1xuICAgICAgbGlzdCA9IFtdO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQoZWxlbWVudCk7XG4gICAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gICAgdmFyIHdpbiA9IGdldFdpbmRvdyhzY3JvbGxQYXJlbnQpO1xuICAgIHZhciB0YXJnZXQgPSBpc0JvZHkgPyBbd2luXS5jb25jYXQod2luLnZpc3VhbFZpZXdwb3J0IHx8IFtdLCBpc1Njcm9sbFBhcmVudChzY3JvbGxQYXJlbnQpID8gc2Nyb2xsUGFyZW50IDogW10pIDogc2Nyb2xsUGFyZW50O1xuICAgIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gICAgcmV0dXJuIGlzQm9keSA/IHVwZGF0ZWRMaXN0IDogLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IGlzQm9keSB0ZWxscyB1cyB0YXJnZXQgd2lsbCBiZSBhbiBIVE1MRWxlbWVudCBoZXJlXG4gICAgdXBkYXRlZExpc3QuY29uY2F0KGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUodGFyZ2V0KSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlY3QsIHtcbiAgICAgIGxlZnQ6IHJlY3QueCxcbiAgICAgIHRvcDogcmVjdC55LFxuICAgICAgcmlnaHQ6IHJlY3QueCArIHJlY3Qud2lkdGgsXG4gICAgICBib3R0b206IHJlY3QueSArIHJlY3QuaGVpZ2h0XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBzdHJhdGVneSkge1xuICAgIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGZhbHNlLCBzdHJhdGVneSA9PT0gJ2ZpeGVkJyk7XG4gICAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICAgIHJlY3QubGVmdCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50TGVmdDtcbiAgICByZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgcmVjdC53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgcmVjdC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICByZWN0LnggPSByZWN0LmxlZnQ7XG4gICAgcmVjdC55ID0gcmVjdC50b3A7XG4gICAgcmV0dXJuIHJlY3Q7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIHtcbiAgICByZXR1cm4gY2xpcHBpbmdQYXJlbnQgPT09IHZpZXdwb3J0ID8gcmVjdFRvQ2xpZW50UmVjdChnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpKSA6IGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgPyBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIDogcmVjdFRvQ2xpZW50UmVjdChnZXREb2N1bWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKSk7XG4gIH0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2ZcbiAgLy8gY2xpcHBpbmcgKG9yIGhpZGluZykgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2l0aCBhIHBvc2l0aW9uIGRpZmZlcmVudCBmcm9tXG4gIC8vIGBpbml0aWFsYFxuXG5cbiAgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gbGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG4gICAgdmFyIGNhbkVzY2FwZUNsaXBwaW5nID0gWydhYnNvbHV0ZScsICdmaXhlZCddLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICAgIHZhciBjbGlwcGVyRWxlbWVudCA9IGNhbkVzY2FwZUNsaXBwaW5nICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgPyBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gICAgaWYgKCFpc0VsZW1lbnQoY2xpcHBlckVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTQxNFxuXG5cbiAgICByZXR1cm4gY2xpcHBpbmdQYXJlbnRzLmZpbHRlcihmdW5jdGlvbiAoY2xpcHBpbmdQYXJlbnQpIHtcbiAgICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gICAgfSk7XG4gIH0gLy8gR2V0cyB0aGUgbWF4aW11bSBhcmVhIHRoYXQgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiBkdWUgdG8gYW55IG51bWJlciBvZlxuICAvLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuICBmdW5jdGlvbiBnZXRDbGlwcGluZ1JlY3QoZWxlbWVudCwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpIHtcbiAgICB2YXIgbWFpbkNsaXBwaW5nUGFyZW50cyA9IGJvdW5kYXJ5ID09PSAnY2xpcHBpbmdQYXJlbnRzJyA/IGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSA6IFtdLmNvbmNhdChib3VuZGFyeSk7XG4gICAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gICAgdmFyIGZpcnN0Q2xpcHBpbmdQYXJlbnQgPSBjbGlwcGluZ1BhcmVudHNbMF07XG4gICAgdmFyIGNsaXBwaW5nUmVjdCA9IGNsaXBwaW5nUGFyZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY1JlY3QsIGNsaXBwaW5nUGFyZW50KSB7XG4gICAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgICBhY2NSZWN0LnRvcCA9IG1heChyZWN0LnRvcCwgYWNjUmVjdC50b3ApO1xuICAgICAgYWNjUmVjdC5yaWdodCA9IG1pbihyZWN0LnJpZ2h0LCBhY2NSZWN0LnJpZ2h0KTtcbiAgICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgICBhY2NSZWN0LmxlZnQgPSBtYXgocmVjdC5sZWZ0LCBhY2NSZWN0LmxlZnQpO1xuICAgICAgcmV0dXJuIGFjY1JlY3Q7XG4gICAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgICBjbGlwcGluZ1JlY3Qud2lkdGggPSBjbGlwcGluZ1JlY3QucmlnaHQgLSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgICBjbGlwcGluZ1JlY3QuaGVpZ2h0ID0gY2xpcHBpbmdSZWN0LmJvdHRvbSAtIGNsaXBwaW5nUmVjdC50b3A7XG4gICAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgICBjbGlwcGluZ1JlY3QueSA9IGNsaXBwaW5nUmVjdC50b3A7XG4gICAgcmV0dXJuIGNsaXBwaW5nUmVjdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVPZmZzZXRzKF9yZWYpIHtcbiAgICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICAgIHBsYWNlbWVudCA9IF9yZWYucGxhY2VtZW50O1xuICAgIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50ID8gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgOiBudWxsO1xuICAgIHZhciBjb21tb25YID0gcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDI7XG4gICAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICAgIHZhciBvZmZzZXRzO1xuXG4gICAgc3dpdGNoIChiYXNlUGxhY2VtZW50KSB7XG4gICAgICBjYXNlIHRvcDpcbiAgICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgYm90dG9tOlxuICAgICAgICBvZmZzZXRzID0ge1xuICAgICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIHJpZ2h0OlxuICAgICAgICBvZmZzZXRzID0ge1xuICAgICAgICAgIHg6IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoLFxuICAgICAgICAgIHk6IGNvbW1vbllcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbGVmdDpcbiAgICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgICB4OiByZWZlcmVuY2UueCAtIGVsZW1lbnQud2lkdGgsXG4gICAgICAgICAgeTogY29tbW9uWVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgICB4OiByZWZlcmVuY2UueCxcbiAgICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gICAgaWYgKG1haW5BeGlzICE9IG51bGwpIHtcbiAgICAgIHZhciBsZW4gPSBtYWluQXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgICBjYXNlIHN0YXJ0OlxuICAgICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gLSAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBlbmQ6XG4gICAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSArIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRldGVjdE92ZXJmbG93KHN0YXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMkcGxhY2VtZW50ID09PSB2b2lkIDAgPyBzdGF0ZS5wbGFjZW1lbnQgOiBfb3B0aW9ucyRwbGFjZW1lbnQsXG4gICAgICAgIF9vcHRpb25zJHN0cmF0ZWd5ID0gX29wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICAgIF9vcHRpb25zJGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMkYm91bmRhcnkgPT09IHZvaWQgMCA/IGNsaXBwaW5nUGFyZW50cyA6IF9vcHRpb25zJGJvdW5kYXJ5LFxuICAgICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zJHJvb3RCb3VuZGFyeSA9PT0gdm9pZCAwID8gdmlld3BvcnQgOiBfb3B0aW9ucyRyb290Qm91bmRhcnksXG4gICAgICAgIF9vcHRpb25zJGVsZW1lbnRDb250ZSA9IF9vcHRpb25zLmVsZW1lbnRDb250ZXh0LFxuICAgICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgICBfb3B0aW9ucyRhbHRCb3VuZGFyeSA9IF9vcHRpb25zLmFsdEJvdW5kYXJ5LFxuICAgICAgICBhbHRCb3VuZGFyeSA9IF9vcHRpb25zJGFsdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEJvdW5kYXJ5LFxuICAgICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgICAgcGFkZGluZyA9IF9vcHRpb25zJHBhZGRpbmcgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyRwYWRkaW5nO1xuICAgIHZhciBwYWRkaW5nT2JqZWN0ID0gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gICAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1thbHRCb3VuZGFyeSA/IGFsdENvbnRleHQgOiBlbGVtZW50Q29udGV4dF07XG4gICAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICAgIHZhciByZWZlcmVuY2VDbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHN0YXRlLmVsZW1lbnRzLnJlZmVyZW5jZSk7XG4gICAgdmFyIHBvcHBlck9mZnNldHMgPSBjb21wdXRlT2Zmc2V0cyh7XG4gICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgICBlbGVtZW50OiBwb3BwZXJSZWN0LFxuICAgICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICAgIH0pO1xuICAgIHZhciBwb3BwZXJDbGllbnRSZWN0ID0gcmVjdFRvQ2xpZW50UmVjdChPYmplY3QuYXNzaWduKHt9LCBwb3BwZXJSZWN0LCBwb3BwZXJPZmZzZXRzKSk7XG4gICAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gICAgLy8gMCBvciBuZWdhdGl2ZSA9IHdpdGhpbiB0aGUgY2xpcHBpbmcgcmVjdFxuXG4gICAgdmFyIG92ZXJmbG93T2Zmc2V0cyA9IHtcbiAgICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgICAgYm90dG9tOiBlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20sXG4gICAgICBsZWZ0OiBjbGlwcGluZ0NsaWVudFJlY3QubGVmdCAtIGVsZW1lbnRDbGllbnRSZWN0LmxlZnQgKyBwYWRkaW5nT2JqZWN0LmxlZnQsXG4gICAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gICAgfTtcbiAgICB2YXIgb2Zmc2V0RGF0YSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0OyAvLyBPZmZzZXRzIGNhbiBiZSBhcHBsaWVkIG9ubHkgdG8gdGhlIHBvcHBlciBlbGVtZW50XG5cbiAgICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0RGF0YVtwbGFjZW1lbnRdO1xuICAgICAgT2JqZWN0LmtleXMob3ZlcmZsb3dPZmZzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgICB2YXIgYXhpcyA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAneScgOiAneCc7XG4gICAgICAgIG92ZXJmbG93T2Zmc2V0c1trZXldICs9IG9mZnNldFtheGlzXSAqIG11bHRpcGx5O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJmbG93T2Zmc2V0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgICAgX29wdGlvbnMkYWxsb3dlZEF1dG9QID0gX29wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzLFxuICAgICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IHBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gICAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpO1xuICAgIHZhciBwbGFjZW1lbnRzJDEgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICByZXR1cm4gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHZhcmlhdGlvbjtcbiAgICB9KSA6IGJhc2VQbGFjZW1lbnRzO1xuICAgIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMkMS5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgICAgcmV0dXJuIGFsbG93ZWRBdXRvUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCkgPj0gMDtcbiAgICB9KTtcblxuICAgIGlmIChhbGxvd2VkUGxhY2VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cyQxO1xuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV06IEZsb3cgc2VlbXMgdG8gaGF2ZSBwcm9ibGVtcyB3aXRoIHR3byBhcnJheSB1bmlvbnMuLi5cblxuXG4gICAgdmFyIG92ZXJmbG93cyA9IGFsbG93ZWRQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICAgIH0pW2dldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KV07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob3ZlcmZsb3dzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gICAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gICAgcmV0dXJuIFtnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpLCBvcHBvc2l0ZVBsYWNlbWVudCwgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQob3Bwb3NpdGVQbGFjZW1lbnQpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICAgIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkYWx0QXhpcyxcbiAgICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIGJvdW5kYXJ5ID0gb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgICAgX29wdGlvbnMkZmxpcFZhcmlhdGlvID0gb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICAgIHZhciBwcmVmZXJyZWRQbGFjZW1lbnQgPSBzdGF0ZS5vcHRpb25zLnBsYWNlbWVudDtcbiAgICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICAgIHZhciBmYWxsYmFja1BsYWNlbWVudHMgPSBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgfHwgKGlzQmFzZVBsYWNlbWVudCB8fCAhZmxpcFZhcmlhdGlvbnMgPyBbZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KV0gOiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwcmVmZXJyZWRQbGFjZW1lbnQpKTtcbiAgICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgICB9KSA6IHBsYWNlbWVudCk7XG4gICAgfSwgW10pO1xuICAgIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICAgIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICAgIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gICAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gICAgdmFyIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHNbMF07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgICB2YXIgX2Jhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgICB2YXIgbGVuID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICAgIH0pO1xuICAgICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgICBpZiAocmVmZXJlbmNlUmVjdFtsZW5dID4gcG9wcGVyUmVjdFtsZW5dKSB7XG4gICAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWx0VmFyaWF0aW9uU2lkZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KG1haW5WYXJpYXRpb25TaWRlKTtcbiAgICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbX2Jhc2VQbGFjZW1lbnRdIDw9IDApO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W21haW5WYXJpYXRpb25TaWRlXSA8PSAwLCBvdmVyZmxvd1thbHRWYXJpYXRpb25TaWRlXSA8PSAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgfSkpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgICBtYWtlRmFsbGJhY2tDaGVja3MgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNoZWNrc01hcC5zZXQocGxhY2VtZW50LCBjaGVja3MpO1xuICAgIH1cblxuICAgIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAgIC8vIGAyYCBtYXkgYmUgZGVzaXJlZCBpbiBzb21lIGNhc2VzIOKAkyByZXNlYXJjaCBsYXRlclxuICAgICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgICAgdmFyIGZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzLmZpbmQoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tzLnNsaWNlKDAsIF9pKS5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IGZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICAgIGlmIChfcmV0ID09PSBcImJyZWFrXCIpIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5wbGFjZW1lbnQgIT09IGZpcnN0Rml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgICBzdGF0ZS5yZXNldCA9IHRydWU7XG4gICAgfVxuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG4gIGNvbnN0IGZsaXAkMSA9IHtcbiAgICBuYW1lOiAnZmxpcCcsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwaGFzZTogJ21haW4nLFxuICAgIGZuOiBmbGlwLFxuICAgIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gICAgZGF0YToge1xuICAgICAgX3NraXA6IGZhbHNlXG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKSB7XG4gICAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgICAgcHJldmVudGVkT2Zmc2V0cyA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiBvdmVyZmxvdy50b3AgLSByZWN0LmhlaWdodCAtIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICAgIHJpZ2h0OiBvdmVyZmxvdy5yaWdodCAtIHJlY3Qud2lkdGggKyBwcmV2ZW50ZWRPZmZzZXRzLngsXG4gICAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgICAgbGVmdDogb3ZlcmZsb3cubGVmdCAtIHJlY3Qud2lkdGggLSBwcmV2ZW50ZWRPZmZzZXRzLnhcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG92ZXJmbG93KSB7XG4gICAgcmV0dXJuIFt0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnRdLnNvbWUoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gICAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucHJldmVudE92ZXJmbG93O1xuICAgIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBlbGVtZW50Q29udGV4dDogJ3JlZmVyZW5jZSdcbiAgICB9KTtcbiAgICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgYWx0Qm91bmRhcnk6IHRydWVcbiAgICB9KTtcbiAgICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICAgIHZhciBwb3BwZXJFc2NhcGVPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocG9wcGVyQWx0T3ZlcmZsb3csIHBvcHBlclJlY3QsIHByZXZlbnRlZE9mZnNldHMpO1xuICAgIHZhciBpc1JlZmVyZW5jZUhpZGRlbiA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChyZWZlcmVuY2VDbGlwcGluZ09mZnNldHMpO1xuICAgIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSB7XG4gICAgICByZWZlcmVuY2VDbGlwcGluZ09mZnNldHM6IHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyxcbiAgICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgICBpc1JlZmVyZW5jZUhpZGRlbjogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgICBoYXNQb3BwZXJFc2NhcGVkOiBoYXNQb3BwZXJFc2NhcGVkXG4gICAgfTtcbiAgICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgICAnZGF0YS1wb3BwZXItcmVmZXJlbmNlLWhpZGRlbic6IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gICAgfSk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbiAgY29uc3QgaGlkZSQxID0ge1xuICAgIG5hbWU6ICdoaWRlJyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHBoYXNlOiAnbWFpbicsXG4gICAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXSxcbiAgICBmbjogaGlkZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICAgIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICAgIHZhciBpbnZlcnREaXN0YW5jZSA9IFtsZWZ0LCB0b3BdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IC0xIDogMTtcblxuICAgIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgICB9KSkgOiBvZmZzZXQsXG4gICAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgICAgZGlzdGFuY2UgPSBfcmVmWzFdO1xuXG4gICAgc2tpZGRpbmcgPSBza2lkZGluZyB8fCAwO1xuICAgIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gICAgcmV0dXJuIFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8ge1xuICAgICAgeDogZGlzdGFuY2UsXG4gICAgICB5OiBza2lkZGluZ1xuICAgIH0gOiB7XG4gICAgICB4OiBza2lkZGluZyxcbiAgICAgIHk6IGRpc3RhbmNlXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICAgIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucyxcbiAgICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gICAgdmFyIF9vcHRpb25zJG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0LFxuICAgICAgICBvZmZzZXQgPSBfb3B0aW9ucyRvZmZzZXQgPT09IHZvaWQgMCA/IFswLCAwXSA6IF9vcHRpb25zJG9mZnNldDtcbiAgICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgICAgYWNjW3BsYWNlbWVudF0gPSBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHN0YXRlLnJlY3RzLCBvZmZzZXQpO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gICAgdmFyIF9kYXRhJHN0YXRlJHBsYWNlbWVudCA9IGRhdGFbc3RhdGUucGxhY2VtZW50XSxcbiAgICAgICAgeCA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC54LFxuICAgICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy54ICs9IHg7XG4gICAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICAgIH1cblxuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG4gIGNvbnN0IG9mZnNldCQxID0ge1xuICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcGhhc2U6ICdtYWluJyxcbiAgICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gICAgZm46IG9mZnNldFxuICB9O1xuXG4gIGZ1bmN0aW9uIHBvcHBlck9mZnNldHMoX3JlZikge1xuICAgIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgLy8gT2Zmc2V0cyBhcmUgdGhlIGFjdHVhbCBwb3NpdGlvbiB0aGUgcG9wcGVyIG5lZWRzIHRvIGhhdmUgdG8gYmVcbiAgICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gICAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gICAgLy8gdGhlIG1vZGlmaWVycyBpbiB0aGUgbmV4dCBzdGVwXG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgICAgZWxlbWVudDogc3RhdGUucmVjdHMucG9wcGVyLFxuICAgICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICAgIH0pO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG4gIGNvbnN0IHBvcHBlck9mZnNldHMkMSA9IHtcbiAgICBuYW1lOiAncG9wcGVyT2Zmc2V0cycsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwaGFzZTogJ3JlYWQnLFxuICAgIGZuOiBwb3BwZXJPZmZzZXRzLFxuICAgIGRhdGE6IHt9XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd4JyA/ICd5JyA6ICd4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhfcmVmKSB7XG4gICAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICAgIHJvb3RCb3VuZGFyeSA9IG9wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIF9vcHRpb25zJHRldGhlciA9IG9wdGlvbnMudGV0aGVyLFxuICAgICAgICB0ZXRoZXIgPSBfb3B0aW9ucyR0ZXRoZXIgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyR0ZXRoZXIsXG4gICAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgICB0ZXRoZXJPZmZzZXQgPSBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQ7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICAgIH0pO1xuICAgIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICAgIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gIXZhcmlhdGlvbjtcbiAgICB2YXIgbWFpbkF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gICAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cztcbiAgICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgICB2YXIgdGV0aGVyT2Zmc2V0VmFsdWUgPSB0eXBlb2YgdGV0aGVyT2Zmc2V0ID09PSAnZnVuY3Rpb24nID8gdGV0aGVyT2Zmc2V0KE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICAgIH0pKSA6IHRldGhlck9mZnNldDtcbiAgICB2YXIgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldFZhbHVlID09PSAnbnVtYmVyJyA/IHtcbiAgICAgIG1haW5BeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZSxcbiAgICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gICAgfSA6IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbWFpbkF4aXM6IDAsXG4gICAgICBhbHRBeGlzOiAwXG4gICAgfSwgdGV0aGVyT2Zmc2V0VmFsdWUpO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclN0YXRlID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQgPyBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldFtzdGF0ZS5wbGFjZW1lbnRdIDogbnVsbDtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcblxuICAgIGlmICghcG9wcGVyT2Zmc2V0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkO1xuXG4gICAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICAgIHZhciBhbHRTaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICAgICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgICB2YXIgbWluJDEgPSBvZmZzZXQgKyBvdmVyZmxvd1ttYWluU2lkZV07XG4gICAgICB2YXIgbWF4JDEgPSBvZmZzZXQgLSBvdmVyZmxvd1thbHRTaWRlXTtcbiAgICAgIHZhciBhZGRpdGl2ZSA9IHRldGhlciA/IC1wb3BwZXJSZWN0W2xlbl0gLyAyIDogMDtcbiAgICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgICAgdmFyIG1heExlbiA9IHZhcmlhdGlvbiA9PT0gc3RhcnQgPyAtcG9wcGVyUmVjdFtsZW5dIDogLXJlZmVyZW5jZVJlY3RbbGVuXTsgLy8gV2UgbmVlZCB0byBpbmNsdWRlIHRoZSBhcnJvdyBpbiB0aGUgY2FsY3VsYXRpb24gc28gdGhlIGFycm93IGRvZXNuJ3QgZ29cbiAgICAgIC8vIG91dHNpZGUgdGhlIHJlZmVyZW5jZSBib3VuZHNcblxuICAgICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgICAgdmFyIGFycm93UmVjdCA9IHRldGhlciAmJiBhcnJvd0VsZW1lbnQgPyBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCkgOiB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH07XG4gICAgICB2YXIgYXJyb3dQYWRkaW5nT2JqZWN0ID0gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddID8gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddLnBhZGRpbmcgOiBnZXRGcmVzaFNpZGVPYmplY3QoKTtcbiAgICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgICAgdmFyIGFycm93UGFkZGluZ01heCA9IGFycm93UGFkZGluZ09iamVjdFthbHRTaWRlXTsgLy8gSWYgdGhlIHJlZmVyZW5jZSBsZW5ndGggaXMgc21hbGxlciB0aGFuIHRoZSBhcnJvdyBsZW5ndGgsIHdlIGRvbid0IHdhbnRcbiAgICAgIC8vIHRvIGluY2x1ZGUgaXRzIGZ1bGwgc2l6ZSBpbiB0aGUgY2FsY3VsYXRpb24uIElmIHRoZSByZWZlcmVuY2UgaXMgc21hbGxcbiAgICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgICAvLyByZWZlcmVuY2UgaXMgbm90IG92ZXJmbG93aW5nIGFzIHdlbGwgKGUuZy4gdmlydHVhbCBlbGVtZW50cyB3aXRoIG5vXG4gICAgICAvLyB3aWR0aCBvciBoZWlnaHQpXG5cbiAgICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICAgIHZhciBtaW5PZmZzZXQgPSBpc0Jhc2VQbGFjZW1lbnQgPyByZWZlcmVuY2VSZWN0W2xlbl0gLyAyIC0gYWRkaXRpdmUgLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1pbkxlbiAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgICAgdmFyIG1heE9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IC1yZWZlcmVuY2VSZWN0W2xlbl0gLyAyICsgYWRkaXRpdmUgKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1heExlbiArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICAgIHZhciBjbGllbnRPZmZzZXQgPSBhcnJvd09mZnNldFBhcmVudCA/IG1haW5BeGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRUb3AgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudExlZnQgfHwgMCA6IDA7XG4gICAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW21haW5BeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJCA6IDA7XG4gICAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICAgIHZhciB0ZXRoZXJNYXggPSBvZmZzZXQgKyBtYXhPZmZzZXQgLSBvZmZzZXRNb2RpZmllclZhbHVlO1xuICAgICAgdmFyIHByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtaW4obWluJDEsIHRldGhlck1pbikgOiBtaW4kMSwgb2Zmc2V0LCB0ZXRoZXIgPyBtYXgobWF4JDEsIHRldGhlck1heCkgOiBtYXgkMSk7XG4gICAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICAgIGRhdGFbbWFpbkF4aXNdID0gcHJldmVudGVkT2Zmc2V0IC0gb2Zmc2V0O1xuICAgIH1cblxuICAgIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyO1xuXG4gICAgICB2YXIgX21haW5TaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IHRvcCA6IGxlZnQ7XG5cbiAgICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgICAgdmFyIF9vZmZzZXQgPSBwb3BwZXJPZmZzZXRzW2FsdEF4aXNdO1xuXG4gICAgICB2YXIgX2xlbiA9IGFsdEF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgICAgdmFyIF9tYXggPSBfb2Zmc2V0IC0gb3ZlcmZsb3dbX2FsdFNpZGVdO1xuXG4gICAgICB2YXIgaXNPcmlnaW5TaWRlID0gW3RvcCwgbGVmdF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgICB2YXIgX3RldGhlck1pbiA9IGlzT3JpZ2luU2lkZSA/IF9taW4gOiBfb2Zmc2V0IC0gcmVmZXJlbmNlUmVjdFtfbGVuXSAtIHBvcHBlclJlY3RbX2xlbl0gLSBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5hbHRBeGlzO1xuXG4gICAgICB2YXIgX3RldGhlck1heCA9IGlzT3JpZ2luU2lkZSA/IF9vZmZzZXQgKyByZWZlcmVuY2VSZWN0W19sZW5dICsgcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXMgOiBfbWF4O1xuXG4gICAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgICBwb3BwZXJPZmZzZXRzW2FsdEF4aXNdID0gX3ByZXZlbnRlZE9mZnNldDtcbiAgICAgIGRhdGFbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0IC0gX29mZnNldDtcbiAgICB9XG5cbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gZGF0YTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuICBjb25zdCBwcmV2ZW50T3ZlcmZsb3ckMSA9IHtcbiAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHBoYXNlOiAnbWFpbicsXG4gICAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY3JvbGxMZWZ0OiBlbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5vZGVTY3JvbGwobm9kZSkge1xuICAgIGlmIChub2RlID09PSBnZXRXaW5kb3cobm9kZSkgfHwgIWlzSFRNTEVsZW1lbnQobm9kZSkpIHtcbiAgICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRIVE1MRWxlbWVudFNjcm9sbChub2RlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnRTY2FsZWQoZWxlbWVudCkge1xuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2NhbGVYID0gcm91bmQocmVjdC53aWR0aCkgLyBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDE7XG4gICAgdmFyIHNjYWxlWSA9IHJvdW5kKHJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG4gIH0gLy8gUmV0dXJucyB0aGUgY29tcG9zaXRlIHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LlxuICAvLyBDb21wb3NpdGUgbWVhbnMgaXQgdGFrZXMgaW50byBhY2NvdW50IHRyYW5zZm9ybXMgYXMgd2VsbCBhcyBsYXlvdXQuXG5cblxuICBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgICBpZiAoaXNGaXhlZCA9PT0gdm9pZCAwKSB7XG4gICAgICBpc0ZpeGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICAgIHZhciBvZmZzZXRQYXJlbnRJc1NjYWxlZCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBpc0VsZW1lbnRTY2FsZWQob2Zmc2V0UGFyZW50KTtcbiAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gICAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudE9yVmlydHVhbEVsZW1lbnQsIG9mZnNldFBhcmVudElzU2NhbGVkLCBpc0ZpeGVkKTtcbiAgICB2YXIgc2Nyb2xsID0ge1xuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG4gICAgdmFyIG9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICBpZiAoaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgfHwgIWlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ICYmICFpc0ZpeGVkKSB7XG4gICAgICBpZiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSAhPT0gJ2JvZHknIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTA3OFxuICAgICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgICBzY3JvbGwgPSBnZXROb2RlU2Nyb2xsKG9mZnNldFBhcmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgICAgb2Zmc2V0cyA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQsIHRydWUpO1xuICAgICAgICBvZmZzZXRzLnggKz0gb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgb2Zmc2V0cy54ID0gZ2V0V2luZG93U2Nyb2xsQmFyWChkb2N1bWVudEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICAgIHk6IHJlY3QudG9wICsgc2Nyb2xsLnNjcm9sbFRvcCAtIG9mZnNldHMueSxcbiAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBvcmRlcihtb2RpZmllcnMpIHtcbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIHZhciB2aXNpdGVkID0gbmV3IFNldCgpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIG1hcC5zZXQobW9kaWZpZXIubmFtZSwgbW9kaWZpZXIpO1xuICAgIH0pOyAvLyBPbiB2aXNpdGluZyBvYmplY3QsIGNoZWNrIGZvciBpdHMgZGVwZW5kZW5jaWVzIGFuZCB2aXNpdCB0aGVtIHJlY3Vyc2l2ZWx5XG5cbiAgICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgICB2aXNpdGVkLmFkZChtb2RpZmllci5uYW1lKTtcbiAgICAgIHZhciByZXF1aXJlcyA9IFtdLmNvbmNhdChtb2RpZmllci5yZXF1aXJlcyB8fCBbXSwgbW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cyB8fCBbXSk7XG4gICAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgICAgaWYgKCF2aXNpdGVkLmhhcyhkZXApKSB7XG4gICAgICAgICAgdmFyIGRlcE1vZGlmaWVyID0gbWFwLmdldChkZXApO1xuXG4gICAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgICBzb3J0KGRlcE1vZGlmaWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzdWx0LnB1c2gobW9kaWZpZXIpO1xuICAgIH1cblxuICAgIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgaWYgKCF2aXNpdGVkLmhhcyhtb2RpZmllci5uYW1lKSkge1xuICAgICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgICAgc29ydChtb2RpZmllcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAgIC8vIG9yZGVyIGJhc2VkIG9uIGRlcGVuZGVuY2llc1xuICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXIobW9kaWZpZXJzKTsgLy8gb3JkZXIgYmFzZWQgb24gcGhhc2VcblxuICAgIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXIucGhhc2UgPT09IHBoYXNlO1xuICAgICAgfSkpO1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gICAgdmFyIHBlbmRpbmc7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghcGVuZGluZykge1xuICAgICAgICBwZW5kaW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXNvbHZlKGZuKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBlbmRpbmc7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlQnlOYW1lKG1vZGlmaWVycykge1xuICAgIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgICAgbWVyZ2VkW2N1cnJlbnQubmFtZV0gPSBleGlzdGluZyA/IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLCBjdXJyZW50LCB7XG4gICAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICAgIH0pIDogY3VycmVudDtcbiAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG1lcmdlZCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICBtb2RpZmllcnM6IFtdLFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnXG4gIH07XG5cbiAgZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICFhcmdzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiAhKGVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gICAgaWYgKGdlbmVyYXRvck9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgZ2VuZXJhdG9yT3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBfZ2VuZXJhdG9yT3B0aW9ucyA9IGdlbmVyYXRvck9wdGlvbnMsXG4gICAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRNb2RpZmllcnMsXG4gICAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgICBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgIGRlZmF1bHRPcHRpb25zID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9PT0gdm9pZCAwID8gREVGQVVMVF9PUFRJT05TIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmMjtcbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBkZWZhdWx0T3B0aW9ucyksXG4gICAgICAgIG1vZGlmaWVyc0RhdGE6IHt9LFxuICAgICAgICBlbGVtZW50czoge1xuICAgICAgICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlLFxuICAgICAgICAgIHBvcHBlcjogcG9wcGVyXG4gICAgICAgIH0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICBzdHlsZXM6IHt9XG4gICAgICB9O1xuICAgICAgdmFyIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICAgIHZhciBpc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uIHNldE9wdGlvbnMoc2V0T3B0aW9uc0FjdGlvbikge1xuICAgICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgICBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgICAgc3RhdGUub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBzdGF0ZS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBpc0VsZW1lbnQocmVmZXJlbmNlKSA/IGxpc3RTY3JvbGxQYXJlbnRzKHJlZmVyZW5jZSkgOiByZWZlcmVuY2UuY29udGV4dEVsZW1lbnQgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UuY29udGV4dEVsZW1lbnQpIDogW10sXG4gICAgICAgICAgICBwb3BwZXI6IGxpc3RTY3JvbGxQYXJlbnRzKHBvcHBlcilcbiAgICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgICAvLyBwcm9wZXJ0aWVzXG5cbiAgICAgICAgICB2YXIgb3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyTW9kaWZpZXJzKG1lcmdlQnlOYW1lKFtdLmNvbmNhdChkZWZhdWx0TW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycykpKTsgLy8gU3RyaXAgb3V0IGRpc2FibGVkIG1vZGlmaWVyc1xuXG4gICAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5lbmFibGVkO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gU3luYyB1cGRhdGUg4oCTIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgICAvLyBsb2dpYy5cbiAgICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICAgIGZvcmNlVXBkYXRlOiBmdW5jdGlvbiBmb3JjZVVwZGF0ZSgpIHtcbiAgICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICAgIHBvcHBlciA9IF9zdGF0ZSRlbGVtZW50cy5wb3BwZXI7IC8vIERvbid0IHByb2NlZWQgaWYgYHJlZmVyZW5jZWAgb3IgYHBvcHBlcmAgYXJlIG5vdCB2YWxpZCBlbGVtZW50c1xuICAgICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgICBzdGF0ZS5yZWN0cyA9IHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogZ2V0Q29tcG9zaXRlUmVjdChyZWZlcmVuY2UsIGdldE9mZnNldFBhcmVudChwb3BwZXIpLCBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnKSxcbiAgICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgICAgfTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gcmVzZXQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlLiBUaGVcbiAgICAgICAgICAvLyBtb3N0IGNvbW1vbiB1c2UgY2FzZSBmb3IgdGhpcyBpcyB0aGUgYGZsaXBgIG1vZGlmaWVyIGNoYW5naW5nIHRoZVxuICAgICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgICAgLy8gbG9naWMgd2FzIHByZXZpb3VzbHkgcmFuIGZvciB0aGUgcHJldmlvdXMgcGxhY2VtZW50IGFuZCBpcyB0aGVyZWZvcmVcbiAgICAgICAgICAvLyBzdGFsZS9pbmNvcnJlY3RcblxuICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgc3RhdGUucGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7IC8vIE9uIGVhY2ggdXBkYXRlIGN5Y2xlLCB0aGUgYG1vZGlmaWVyc0RhdGFgIHByb3BlcnR5IGZvciBlYWNoIG1vZGlmaWVyXG4gICAgICAgICAgLy8gaXMgZmlsbGVkIHdpdGggdGhlIGluaXRpYWwgZGF0YSBzcGVjaWZpZWQgYnkgdGhlIG1vZGlmaWVyLiBUaGlzIG1lYW5zXG4gICAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgICAvLyBUbyBlbnN1cmUgcGVyc2lzdGVudCBkYXRhLCB1c2UgYCR7bmFtZX0jcGVyc2lzdGVudGBcblxuICAgICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZXNldCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICAgIGZuID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLmZuLFxuICAgICAgICAgICAgICAgIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgICBuYW1lID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm5hbWU7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IF9vcHRpb25zLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlXG4gICAgICAgICAgICAgIH0pIHx8IHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAgIC8vIG5vdCBuZWNlc3NhcnkgKGRlYm91bmNlZCB0byBydW4gYXQgbW9zdCBvbmNlLXBlci10aWNrKVxuICAgICAgICB1cGRhdGU6IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICAgIGlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCFhcmVWYWxpZEVsZW1lbnRzKHJlZmVyZW5jZSwgcG9wcGVyKSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICB9XG5cbiAgICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgICBvcHRpb25zLm9uRmlyc3RVcGRhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgICAvLyB1cGRhdGUgY3ljbGUgcnVucy4gVGhleSB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSB1cGRhdGVcbiAgICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAgIC8vIG9uZS5cblxuICAgICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgICAgICAgICAgX3JlZiRvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zID0gX3JlZiRvcHRpb25zID09PSB2b2lkIDAgPyB7fSA6IF9yZWYkb3B0aW9ucyxcbiAgICAgICAgICAgICAgZWZmZWN0ID0gX3JlZi5lZmZlY3Q7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGNsZWFudXBGbiA9IGVmZmVjdCh7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIG5vb3BGbiA9IGZ1bmN0aW9uIG5vb3BGbigpIHt9O1xuXG4gICAgICAgICAgICBlZmZlY3RDbGVhbnVwRm5zLnB1c2goY2xlYW51cEZuIHx8IG5vb3BGbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgICAgZWZmZWN0Q2xlYW51cEZucy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWZmZWN0Q2xlYW51cEZucyA9IFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuICB2YXIgY3JlYXRlUG9wcGVyJDIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuICB2YXIgZGVmYXVsdE1vZGlmaWVycyQxID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzJDEsIGNvbXB1dGVTdHlsZXMkMSwgYXBwbHlTdHlsZXMkMV07XG4gIHZhciBjcmVhdGVQb3BwZXIkMSA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICAgIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnMkMVxuICB9KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG4gIHZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzJDEsIGNvbXB1dGVTdHlsZXMkMSwgYXBwbHlTdHlsZXMkMSwgb2Zmc2V0JDEsIGZsaXAkMSwgcHJldmVudE92ZXJmbG93JDEsIGFycm93JDEsIGhpZGUkMV07XG4gIHZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzXG4gIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbiAgY29uc3QgUG9wcGVyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoLyojX19QVVJFX18qL09iamVjdC5kZWZpbmVQcm9wZXJ0eSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGFmdGVyTWFpbixcbiAgICBhZnRlclJlYWQsXG4gICAgYWZ0ZXJXcml0ZSxcbiAgICBhcHBseVN0eWxlczogYXBwbHlTdHlsZXMkMSxcbiAgICBhcnJvdzogYXJyb3ckMSxcbiAgICBhdXRvLFxuICAgIGJhc2VQbGFjZW1lbnRzLFxuICAgIGJlZm9yZU1haW4sXG4gICAgYmVmb3JlUmVhZCxcbiAgICBiZWZvcmVXcml0ZSxcbiAgICBib3R0b20sXG4gICAgY2xpcHBpbmdQYXJlbnRzLFxuICAgIGNvbXB1dGVTdHlsZXM6IGNvbXB1dGVTdHlsZXMkMSxcbiAgICBjcmVhdGVQb3BwZXIsXG4gICAgY3JlYXRlUG9wcGVyQmFzZTogY3JlYXRlUG9wcGVyJDIsXG4gICAgY3JlYXRlUG9wcGVyTGl0ZTogY3JlYXRlUG9wcGVyJDEsXG4gICAgZGV0ZWN0T3ZlcmZsb3csXG4gICAgZW5kLFxuICAgIGV2ZW50TGlzdGVuZXJzLFxuICAgIGZsaXA6IGZsaXAkMSxcbiAgICBoaWRlOiBoaWRlJDEsXG4gICAgbGVmdCxcbiAgICBtYWluLFxuICAgIG1vZGlmaWVyUGhhc2VzLFxuICAgIG9mZnNldDogb2Zmc2V0JDEsXG4gICAgcGxhY2VtZW50cyxcbiAgICBwb3BwZXIsXG4gICAgcG9wcGVyR2VuZXJhdG9yLFxuICAgIHBvcHBlck9mZnNldHM6IHBvcHBlck9mZnNldHMkMSxcbiAgICBwcmV2ZW50T3ZlcmZsb3c6IHByZXZlbnRPdmVyZmxvdyQxLFxuICAgIHJlYWQsXG4gICAgcmVmZXJlbmNlLFxuICAgIHJpZ2h0LFxuICAgIHN0YXJ0LFxuICAgIHRvcCxcbiAgICB2YXJpYXRpb25QbGFjZW1lbnRzLFxuICAgIHZpZXdwb3J0LFxuICAgIHdyaXRlXG4gIH0sIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSkpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgZHJvcGRvd24uanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FJGEgPSAnZHJvcGRvd24nO1xuICBjb25zdCBEQVRBX0tFWSQ2ID0gJ2JzLmRyb3Bkb3duJztcbiAgY29uc3QgRVZFTlRfS0VZJDYgPSBgLiR7REFUQV9LRVkkNn1gO1xuICBjb25zdCBEQVRBX0FQSV9LRVkkMyA9ICcuZGF0YS1hcGknO1xuICBjb25zdCBFU0NBUEVfS0VZJDIgPSAnRXNjYXBlJztcbiAgY29uc3QgVEFCX0tFWSQxID0gJ1RhYic7XG4gIGNvbnN0IEFSUk9XX1VQX0tFWSQxID0gJ0Fycm93VXAnO1xuICBjb25zdCBBUlJPV19ET1dOX0tFWSQxID0gJ0Fycm93RG93bic7XG4gIGNvbnN0IFJJR0hUX01PVVNFX0JVVFRPTiA9IDI7IC8vIE1vdXNlRXZlbnQuYnV0dG9uIHZhbHVlIGZvciB0aGUgc2Vjb25kYXJ5IGJ1dHRvbiwgdXN1YWxseSB0aGUgcmlnaHQgYnV0dG9uXG5cbiAgY29uc3QgRVZFTlRfSElERSQ1ID0gYGhpZGUke0VWRU5UX0tFWSQ2fWA7XG4gIGNvbnN0IEVWRU5UX0hJRERFTiQ1ID0gYGhpZGRlbiR7RVZFTlRfS0VZJDZ9YDtcbiAgY29uc3QgRVZFTlRfU0hPVyQ1ID0gYHNob3cke0VWRU5UX0tFWSQ2fWA7XG4gIGNvbnN0IEVWRU5UX1NIT1dOJDUgPSBgc2hvd24ke0VWRU5UX0tFWSQ2fWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJJDMgPSBgY2xpY2ske0VWRU5UX0tFWSQ2fSR7REFUQV9BUElfS0VZJDN9YDtcbiAgY29uc3QgRVZFTlRfS0VZRE9XTl9EQVRBX0FQSSA9IGBrZXlkb3duJHtFVkVOVF9LRVkkNn0ke0RBVEFfQVBJX0tFWSQzfWA7XG4gIGNvbnN0IEVWRU5UX0tFWVVQX0RBVEFfQVBJID0gYGtleXVwJHtFVkVOVF9LRVkkNn0ke0RBVEFfQVBJX0tFWSQzfWA7XG4gIGNvbnN0IENMQVNTX05BTUVfU0hPVyQ2ID0gJ3Nob3cnO1xuICBjb25zdCBDTEFTU19OQU1FX0RST1BVUCA9ICdkcm9wdXAnO1xuICBjb25zdCBDTEFTU19OQU1FX0RST1BFTkQgPSAnZHJvcGVuZCc7XG4gIGNvbnN0IENMQVNTX05BTUVfRFJPUFNUQVJUID0gJ2Ryb3BzdGFydCc7XG4gIGNvbnN0IENMQVNTX05BTUVfRFJPUFVQX0NFTlRFUiA9ICdkcm9wdXAtY2VudGVyJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9EUk9QRE9XTl9DRU5URVIgPSAnZHJvcGRvd24tY2VudGVyJztcbiAgY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUkMyA9ICdbZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSc7XG4gIGNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOID0gYCR7U0VMRUNUT1JfREFUQV9UT0dHTEUkM30uJHtDTEFTU19OQU1FX1NIT1ckNn1gO1xuICBjb25zdCBTRUxFQ1RPUl9NRU5VID0gJy5kcm9wZG93bi1tZW51JztcbiAgY29uc3QgU0VMRUNUT1JfTkFWQkFSID0gJy5uYXZiYXInO1xuICBjb25zdCBTRUxFQ1RPUl9OQVZCQVJfTkFWID0gJy5uYXZiYXItbmF2JztcbiAgY29uc3QgU0VMRUNUT1JfVklTSUJMRV9JVEVNUyA9ICcuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSc7XG4gIGNvbnN0IFBMQUNFTUVOVF9UT1AgPSBpc1JUTCgpID8gJ3RvcC1lbmQnIDogJ3RvcC1zdGFydCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9UT1BFTkQgPSBpc1JUTCgpID8gJ3RvcC1zdGFydCcgOiAndG9wLWVuZCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9CT1RUT00gPSBpc1JUTCgpID8gJ2JvdHRvbS1lbmQnIDogJ2JvdHRvbS1zdGFydCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9CT1RUT01FTkQgPSBpc1JUTCgpID8gJ2JvdHRvbS1zdGFydCcgOiAnYm90dG9tLWVuZCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9SSUdIVCA9IGlzUlRMKCkgPyAnbGVmdC1zdGFydCcgOiAncmlnaHQtc3RhcnQnO1xuICBjb25zdCBQTEFDRU1FTlRfTEVGVCA9IGlzUlRMKCkgPyAncmlnaHQtc3RhcnQnIDogJ2xlZnQtc3RhcnQnO1xuICBjb25zdCBQTEFDRU1FTlRfVE9QQ0VOVEVSID0gJ3RvcCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9CT1RUT01DRU5URVIgPSAnYm90dG9tJztcbiAgY29uc3QgRGVmYXVsdCQ5ID0ge1xuICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gICAgZGlzcGxheTogJ2R5bmFtaWMnLFxuICAgIG9mZnNldDogWzAsIDJdLFxuICAgIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgICByZWZlcmVuY2U6ICd0b2dnbGUnXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlJDkgPSB7XG4gICAgYXV0b0Nsb3NlOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAgYm91bmRhcnk6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgICBkaXNwbGF5OiAnc3RyaW5nJyxcbiAgICBvZmZzZXQ6ICcoYXJyYXl8c3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgcG9wcGVyQ29uZmlnOiAnKG51bGx8b2JqZWN0fGZ1bmN0aW9uKScsXG4gICAgcmVmZXJlbmNlOiAnKHN0cmluZ3xlbGVtZW50fG9iamVjdCknXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9wb3BwZXIgPSBudWxsO1xuICAgICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlOyAvLyBkcm9wZG93biB3cmFwcGVyXG4gICAgICAvLyBUT0RPOiB2NiByZXZlcnQgIzM3MDExICYgY2hhbmdlIG1hcmt1cCBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy81LjMvZm9ybXMvaW5wdXQtZ3JvdXAvXG4gICAgICB0aGlzLl9tZW51ID0gU2VsZWN0b3JFbmdpbmUubmV4dCh0aGlzLl9lbGVtZW50LCBTRUxFQ1RPUl9NRU5VKVswXSB8fCBTZWxlY3RvckVuZ2luZS5wcmV2KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfTUVOVSwgdGhpcy5fcGFyZW50KTtcbiAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0JDk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGUkOTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkYTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICB0b2dnbGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNTaG93bigpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgICB9XG4gICAgc2hvdygpIHtcbiAgICAgIGlmIChpc0Rpc2FibGVkKHRoaXMuX2VsZW1lbnQpIHx8IHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVyQ1LCByZWxhdGVkVGFyZ2V0KTtcbiAgICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jcmVhdGVQb3BwZXIoKTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgIXRoaXMuX3BhcmVudC5jbG9zZXN0KFNFTEVDVE9SX05BVkJBUl9OQVYpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBbXS5jb25jYXQoLi4uZG9jdW1lbnQuYm9keS5jaGlsZHJlbikpIHtcbiAgICAgICAgICBFdmVudEhhbmRsZXIub24oZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgdGhpcy5fbWVudS5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQ2KTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1ckNik7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiQ1LCByZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgIGlmIChpc0Rpc2FibGVkKHRoaXMuX2VsZW1lbnQpIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NvbXBsZXRlSGlkZShyZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKTtcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfY29tcGxldGVIaWRlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUkNSwgcmVsYXRlZFRhcmdldCk7XG4gICAgICBpZiAoaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9tZW51LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDYpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyQ2KTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICBNYW5pcHVsYXRvci5yZW1vdmVEYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInKTtcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTiQ1LCByZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHN1cGVyLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudCQxKGNvbmZpZy5yZWZlcmVuY2UpICYmIHR5cGVvZiBjb25maWcucmVmZXJlbmNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBQb3BwZXIgdmlydHVhbCBlbGVtZW50cyByZXF1aXJlIGEgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZFxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke05BTUUkYS50b1VwcGVyQ2FzZSgpfTogT3B0aW9uIFwicmVmZXJlbmNlXCIgcHJvdmlkZWQgdHlwZSBcIm9iamVjdFwiIHdpdGhvdXQgYSByZXF1aXJlZCBcImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiIG1ldGhvZC5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuICAgIF9jcmVhdGVQb3BwZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBkcm9wZG93bnMgcmVxdWlyZSBQb3BwZXIgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgIH1cbiAgICAgIGxldCByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcbiAgICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgfSBlbHNlIGlmIChpc0VsZW1lbnQkMSh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gZ2V0RWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlO1xuICAgICAgfVxuICAgICAgY29uc3QgcG9wcGVyQ29uZmlnID0gdGhpcy5fZ2V0UG9wcGVyQ29uZmlnKCk7XG4gICAgICB0aGlzLl9wb3BwZXIgPSBjcmVhdGVQb3BwZXIocmVmZXJlbmNlRWxlbWVudCwgdGhpcy5fbWVudSwgcG9wcGVyQ29uZmlnKTtcbiAgICB9XG4gICAgX2lzU2hvd24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWVudS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XJDYpO1xuICAgIH1cbiAgICBfZ2V0UGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgcGFyZW50RHJvcGRvd24gPSB0aGlzLl9wYXJlbnQ7XG4gICAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUEVORCkpIHtcbiAgICAgICAgcmV0dXJuIFBMQUNFTUVOVF9SSUdIVDtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QU1RBUlQpKSB7XG4gICAgICAgIHJldHVybiBQTEFDRU1FTlRfTEVGVDtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVBfQ0VOVEVSKSkge1xuICAgICAgICByZXR1cm4gUExBQ0VNRU5UX1RPUENFTlRFUjtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QRE9XTl9DRU5URVIpKSB7XG4gICAgICAgIHJldHVybiBQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIHRyaW0gdGhlIHZhbHVlIGJlY2F1c2UgY3VzdG9tIHByb3BlcnRpZXMgY2FuIGFsc28gaW5jbHVkZSBzcGFjZXNcbiAgICAgIGNvbnN0IGlzRW5kID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9tZW51KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWJzLXBvc2l0aW9uJykudHJpbSgpID09PSAnZW5kJztcbiAgICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVApKSB7XG4gICAgICAgIHJldHVybiBpc0VuZCA/IFBMQUNFTUVOVF9UT1BFTkQgOiBQTEFDRU1FTlRfVE9QO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzRW5kID8gUExBQ0VNRU5UX0JPVFRPTUVORCA6IFBMQUNFTUVOVF9CT1RUT007XG4gICAgfVxuICAgIF9kZXRlY3ROYXZiYXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX05BVkJBUikgIT09IG51bGw7XG4gICAgfVxuICAgIF9nZXRPZmZzZXQoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG9mZnNldFxuICAgICAgfSA9IHRoaXMuX2NvbmZpZztcbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2Zmc2V0LnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBwb3BwZXJEYXRhID0+IG9mZnNldChwb3BwZXJEYXRhLCB0aGlzLl9lbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfVxuICAgIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgICBjb25zdCBkZWZhdWx0QnNQb3BwZXJDb25maWcgPSB7XG4gICAgICAgIHBsYWNlbWVudDogdGhpcy5fZ2V0UGxhY2VtZW50KCksXG4gICAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH07XG5cbiAgICAgIC8vIERpc2FibGUgUG9wcGVyIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheSBvciBEcm9wZG93biBpcyBpbiBOYXZiYXJcbiAgICAgIGlmICh0aGlzLl9pbk5hdmJhciB8fCB0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgTWFuaXB1bGF0b3Iuc2V0RGF0YUF0dHJpYnV0ZSh0aGlzLl9tZW51LCAncG9wcGVyJywgJ3N0YXRpYycpOyAvLyBUT0RPOiB2NiByZW1vdmVcbiAgICAgICAgZGVmYXVsdEJzUG9wcGVyQ29uZmlnLm1vZGlmaWVycyA9IFt7XG4gICAgICAgICAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICB9XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmRlZmF1bHRCc1BvcHBlckNvbmZpZyxcbiAgICAgICAgLi4uZXhlY3V0ZSh0aGlzLl9jb25maWcucG9wcGVyQ29uZmlnLCBbZGVmYXVsdEJzUG9wcGVyQ29uZmlnXSlcbiAgICAgIH07XG4gICAgfVxuICAgIF9zZWxlY3RNZW51SXRlbSh7XG4gICAgICBrZXksXG4gICAgICB0YXJnZXRcbiAgICB9KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfVklTSUJMRV9JVEVNUywgdGhpcy5fbWVudSkuZmlsdGVyKGVsZW1lbnQgPT4gaXNWaXNpYmxlKGVsZW1lbnQpKTtcbiAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGFyZ2V0IGlzbid0IGluY2x1ZGVkIGluIGl0ZW1zIChlLmcuIHdoZW4gZXhwYW5kaW5nIHRoZSBkcm9wZG93bilcbiAgICAgIC8vIGFsbG93IGN5Y2xpbmcgdG8gZ2V0IHRoZSBsYXN0IGl0ZW0gaW4gY2FzZSBrZXkgZXF1YWxzIEFSUk9XX1VQX0tFWVxuICAgICAgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQoaXRlbXMsIHRhcmdldCwga2V5ID09PSBBUlJPV19ET1dOX0tFWSQxLCAhaXRlbXMuaW5jbHVkZXModGFyZ2V0KSkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBjbGVhck1lbnVzKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSBSSUdIVF9NT1VTRV9CVVRUT04gfHwgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC5rZXkgIT09IFRBQl9LRVkkMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcGVuVG9nZ2xlcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEVfU0hPV04pO1xuICAgICAgZm9yIChjb25zdCB0b2dnbGUgb2Ygb3BlblRvZ2dsZXMpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IERyb3Bkb3duLmdldEluc3RhbmNlKHRvZ2dsZSk7XG4gICAgICAgIGlmICghY29udGV4dCB8fCBjb250ZXh0Ll9jb25maWcuYXV0b0Nsb3NlID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvc2VkUGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xuICAgICAgICBjb25zdCBpc01lbnVUYXJnZXQgPSBjb21wb3NlZFBhdGguaW5jbHVkZXMoY29udGV4dC5fbWVudSk7XG4gICAgICAgIGlmIChjb21wb3NlZFBhdGguaW5jbHVkZXMoY29udGV4dC5fZWxlbWVudCkgfHwgY29udGV4dC5fY29uZmlnLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgIWlzTWVudVRhcmdldCB8fCBjb250ZXh0Ll9jb25maWcuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgaXNNZW51VGFyZ2V0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUYWIgbmF2aWdhdGlvbiB0aHJvdWdoIHRoZSBkcm9wZG93biBtZW51IG9yIGV2ZW50cyBmcm9tIGNvbnRhaW5lZCBpbnB1dHMgc2hvdWxkbid0IGNsb3NlIHRoZSBtZW51XG4gICAgICAgIGlmIChjb250ZXh0Ll9tZW51LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQua2V5ID09PSBUQUJfS0VZJDEgfHwgL2lucHV0fHNlbGVjdHxvcHRpb258dGV4dGFyZWF8Zm9ybS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogY29udGV4dC5fZWxlbWVudFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQuY2xpY2tFdmVudCA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuX2NvbXBsZXRlSGlkZShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGRhdGFBcGlLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgLy8gSWYgbm90IGFuIFVQIHwgRE9XTiB8IEVTQ0FQRSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgLy8gSWYgaW5wdXQvdGV4dGFyZWEgJiYgaWYga2V5IGlzIG90aGVyIHRoYW4gRVNDQVBFID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcblxuICAgICAgY29uc3QgaXNJbnB1dCA9IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpO1xuICAgICAgY29uc3QgaXNFc2NhcGVFdmVudCA9IGV2ZW50LmtleSA9PT0gRVNDQVBFX0tFWSQyO1xuICAgICAgY29uc3QgaXNVcE9yRG93bkV2ZW50ID0gW0FSUk9XX1VQX0tFWSQxLCBBUlJPV19ET1dOX0tFWSQxXS5pbmNsdWRlcyhldmVudC5rZXkpO1xuICAgICAgaWYgKCFpc1VwT3JEb3duRXZlbnQgJiYgIWlzRXNjYXBlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzSW5wdXQgJiYgIWlzRXNjYXBlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gVE9ETzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4zL2Zvcm1zL2lucHV0LWdyb3VwL1xuICAgICAgY29uc3QgZ2V0VG9nZ2xlQnV0dG9uID0gdGhpcy5tYXRjaGVzKFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMpID8gdGhpcyA6IFNlbGVjdG9yRW5naW5lLnByZXYodGhpcywgU0VMRUNUT1JfREFUQV9UT0dHTEUkMylbMF0gfHwgU2VsZWN0b3JFbmdpbmUubmV4dCh0aGlzLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQzKVswXSB8fCBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMsIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKGdldFRvZ2dsZUJ1dHRvbik7XG4gICAgICBpZiAoaXNVcE9yRG93bkV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpbnN0YW5jZS5zaG93KCk7XG4gICAgICAgIGluc3RhbmNlLl9zZWxlY3RNZW51SXRlbShldmVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0YW5jZS5faXNTaG93bigpKSB7XG4gICAgICAgIC8vIGVsc2UgaXMgZXNjYXBlIGFuZCB3ZSBjaGVjayBpZiBpdCBpcyBzaG93blxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaW5zdGFuY2UuaGlkZSgpO1xuICAgICAgICBnZXRUb2dnbGVCdXR0b24uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cbiAgRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQzLCBEcm9wZG93bi5kYXRhQXBpS2V5ZG93bkhhbmRsZXIpO1xuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0tFWURPV05fREFUQV9BUEksIFNFTEVDVE9SX01FTlUsIERyb3Bkb3duLmRhdGFBcGlLZXlkb3duSGFuZGxlcik7XG4gIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkMywgRHJvcGRvd24uY2xlYXJNZW51cyk7XG4gIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfS0VZVVBfREFUQV9BUEksIERyb3Bkb3duLmNsZWFyTWVudXMpO1xuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDMsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDMsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgRHJvcGRvd24uZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS50b2dnbGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oRHJvcGRvd24pO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgdXRpbC9iYWNrZHJvcC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkOSA9ICdiYWNrZHJvcCc7XG4gIGNvbnN0IENMQVNTX05BTUVfRkFERSQ0ID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1ckNSA9ICdzaG93JztcbiAgY29uc3QgRVZFTlRfTU9VU0VET1dOID0gYG1vdXNlZG93bi5icy4ke05BTUUkOX1gO1xuICBjb25zdCBEZWZhdWx0JDggPSB7XG4gICAgY2xhc3NOYW1lOiAnbW9kYWwtYmFja2Ryb3AnLFxuICAgIGNsaWNrQ2FsbGJhY2s6IG51bGwsXG4gICAgaXNBbmltYXRlZDogZmFsc2UsXG4gICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgIC8vIGlmIGZhbHNlLCB3ZSB1c2UgdGhlIGJhY2tkcm9wIGhlbHBlciB3aXRob3V0IGFkZGluZyBhbnkgZWxlbWVudCB0byB0aGUgZG9tXG4gICAgcm9vdEVsZW1lbnQ6ICdib2R5JyAvLyBnaXZlIHRoZSBjaG9pY2UgdG8gcGxhY2UgYmFja2Ryb3AgdW5kZXIgZGlmZmVyZW50IGVsZW1lbnRzXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlJDggPSB7XG4gICAgY2xhc3NOYW1lOiAnc3RyaW5nJyxcbiAgICBjbGlja0NhbGxiYWNrOiAnKGZ1bmN0aW9ufG51bGwpJyxcbiAgICBpc0FuaW1hdGVkOiAnYm9vbGVhbicsXG4gICAgaXNWaXNpYmxlOiAnYm9vbGVhbicsXG4gICAgcm9vdEVsZW1lbnQ6ICcoZWxlbWVudHxzdHJpbmcpJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIHRoaXMuX2lzQXBwZW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdCQ4O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlJDg7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJDk7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgc2hvdyhjYWxsYmFjaykge1xuICAgICAgaWYgKCF0aGlzLl9jb25maWcuaXNWaXNpYmxlKSB7XG4gICAgICAgIGV4ZWN1dGUoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9hcHBlbmQoKTtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KCk7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgcmVmbG93KGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQ1KTtcbiAgICAgIHRoaXMuX2VtdWxhdGVBbmltYXRpb24oKCkgPT4ge1xuICAgICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBoaWRlKGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5pc1Zpc2libGUpIHtcbiAgICAgICAgZXhlY3V0ZShjYWxsYmFjayk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dldEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyQ1KTtcbiAgICAgIHRoaXMuX2VtdWxhdGVBbmltYXRpb24oKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgZXhlY3V0ZShjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGlmICghdGhpcy5faXNBcHBlbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQsIEVWRU5UX01PVVNFRE9XTik7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy5faXNBcHBlbmRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfZ2V0RWxlbWVudCgpIHtcbiAgICAgIGlmICghdGhpcy5fZWxlbWVudCkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBiYWNrZHJvcC5jbGFzc05hbWUgPSB0aGlzLl9jb25maWcuY2xhc3NOYW1lO1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfRkFERSQ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gYmFja2Ryb3A7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICB9XG4gICAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgICAvLyB1c2UgZ2V0RWxlbWVudCgpIHdpdGggdGhlIGRlZmF1bHQgXCJib2R5XCIgdG8gZ2V0IGEgZnJlc2ggRWxlbWVudCBvbiBlYWNoIGluc3RhbnRpYXRpb25cbiAgICAgIGNvbmZpZy5yb290RWxlbWVudCA9IGdldEVsZW1lbnQoY29uZmlnLnJvb3RFbGVtZW50KTtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuICAgIF9hcHBlbmQoKSB7XG4gICAgICBpZiAodGhpcy5faXNBcHBlbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZ2V0RWxlbWVudCgpO1xuICAgICAgdGhpcy5fY29uZmlnLnJvb3RFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbihlbGVtZW50LCBFVkVOVF9NT1VTRURPV04sICgpID0+IHtcbiAgICAgICAgZXhlY3V0ZSh0aGlzLl9jb25maWcuY2xpY2tDYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2lzQXBwZW5kZWQgPSB0cnVlO1xuICAgIH1cbiAgICBfZW11bGF0ZUFuaW1hdGlvbihjYWxsYmFjaykge1xuICAgICAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbihjYWxsYmFjaywgdGhpcy5fZ2V0RWxlbWVudCgpLCB0aGlzLl9jb25maWcuaXNBbmltYXRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCB1dGlsL2ZvY3VzdHJhcC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkOCA9ICdmb2N1c3RyYXAnO1xuICBjb25zdCBEQVRBX0tFWSQ1ID0gJ2JzLmZvY3VzdHJhcCc7XG4gIGNvbnN0IEVWRU5UX0tFWSQ1ID0gYC4ke0RBVEFfS0VZJDV9YDtcbiAgY29uc3QgRVZFTlRfRk9DVVNJTiQyID0gYGZvY3VzaW4ke0VWRU5UX0tFWSQ1fWA7XG4gIGNvbnN0IEVWRU5UX0tFWURPV05fVEFCID0gYGtleWRvd24udGFiJHtFVkVOVF9LRVkkNX1gO1xuICBjb25zdCBUQUJfS0VZID0gJ1RhYic7XG4gIGNvbnN0IFRBQl9OQVZfRk9SV0FSRCA9ICdmb3J3YXJkJztcbiAgY29uc3QgVEFCX05BVl9CQUNLV0FSRCA9ICdiYWNrd2FyZCc7XG4gIGNvbnN0IERlZmF1bHQkNyA9IHtcbiAgICBhdXRvZm9jdXM6IHRydWUsXG4gICAgdHJhcEVsZW1lbnQ6IG51bGwgLy8gVGhlIGVsZW1lbnQgdG8gdHJhcCBmb2N1cyBpbnNpZGUgb2ZcbiAgfTtcbiAgY29uc3QgRGVmYXVsdFR5cGUkNyA9IHtcbiAgICBhdXRvZm9jdXM6ICdib29sZWFuJyxcbiAgICB0cmFwRWxlbWVudDogJ2VsZW1lbnQnXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgRm9jdXNUcmFwIGV4dGVuZHMgQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9sYXN0VGFiTmF2RGlyZWN0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHQkNztcbiAgICB9XG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZSQ3O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRSQ4O1xuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuICAgIGFjdGl2YXRlKCkge1xuICAgICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jb25maWcuYXV0b2ZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy50cmFwRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgRXZlbnRIYW5kbGVyLm9mZihkb2N1bWVudCwgRVZFTlRfS0VZJDUpOyAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfRk9DVVNJTiQyLCBldmVudCA9PiB0aGlzLl9oYW5kbGVGb2N1c2luKGV2ZW50KSk7XG4gICAgICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0tFWURPV05fVEFCLCBldmVudCA9PiB0aGlzLl9oYW5kbGVLZXlkb3duKGV2ZW50KSk7XG4gICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKGRvY3VtZW50LCBFVkVOVF9LRVkkNSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuICAgIF9oYW5kbGVGb2N1c2luKGV2ZW50KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHRyYXBFbGVtZW50XG4gICAgICB9ID0gdGhpcy5fY29uZmlnO1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQgfHwgZXZlbnQudGFyZ2V0ID09PSB0cmFwRWxlbWVudCB8fCB0cmFwRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gU2VsZWN0b3JFbmdpbmUuZm9jdXNhYmxlQ2hpbGRyZW4odHJhcEVsZW1lbnQpO1xuICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0cmFwRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXN0VGFiTmF2RGlyZWN0aW9uID09PSBUQUJfTkFWX0JBQ0tXQVJEKSB7XG4gICAgICAgIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICBfaGFuZGxlS2V5ZG93bihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gVEFCX0tFWSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXN0VGFiTmF2RGlyZWN0aW9uID0gZXZlbnQuc2hpZnRLZXkgPyBUQUJfTkFWX0JBQ0tXQVJEIDogVEFCX05BVl9GT1JXQVJEO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgdXRpbC9zY3JvbGxCYXIuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBTRUxFQ1RPUl9GSVhFRF9DT05URU5UID0gJy5maXhlZC10b3AsIC5maXhlZC1ib3R0b20sIC5pcy1maXhlZCwgLnN0aWNreS10b3AnO1xuICBjb25zdCBTRUxFQ1RPUl9TVElDS1lfQ09OVEVOVCA9ICcuc3RpY2t5LXRvcCc7XG4gIGNvbnN0IFBST1BFUlRZX1BBRERJTkcgPSAncGFkZGluZy1yaWdodCc7XG4gIGNvbnN0IFBST1BFUlRZX01BUkdJTiA9ICdtYXJnaW4tcmlnaHQnO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIFNjcm9sbEJhckhlbHBlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvaW5uZXJXaWR0aCN1c2FnZV9ub3Rlc1xuICAgICAgY29uc3QgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgIHJldHVybiBNYXRoLmFicyh3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50V2lkdGgpO1xuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG4gICAgICB0aGlzLl9kaXNhYmxlT3ZlckZsb3coKTtcbiAgICAgIC8vIGdpdmUgcGFkZGluZyB0byBlbGVtZW50IHRvIGJhbGFuY2UgdGhlIGhpZGRlbiBzY3JvbGxiYXIgd2lkdGhcbiAgICAgIHRoaXMuX3NldEVsZW1lbnRBdHRyaWJ1dGVzKHRoaXMuX2VsZW1lbnQsIFBST1BFUlRZX1BBRERJTkcsIGNhbGN1bGF0ZWRWYWx1ZSA9PiBjYWxjdWxhdGVkVmFsdWUgKyB3aWR0aCk7XG4gICAgICAvLyB0cmljazogV2UgYWRqdXN0IHBvc2l0aXZlIHBhZGRpbmdSaWdodCBhbmQgbmVnYXRpdmUgbWFyZ2luUmlnaHQgdG8gc3RpY2t5LXRvcCBlbGVtZW50cyB0byBrZWVwIHNob3dpbmcgZnVsbHdpZHRoXG4gICAgICB0aGlzLl9zZXRFbGVtZW50QXR0cmlidXRlcyhTRUxFQ1RPUl9GSVhFRF9DT05URU5ULCBQUk9QRVJUWV9QQURESU5HLCBjYWxjdWxhdGVkVmFsdWUgPT4gY2FsY3VsYXRlZFZhbHVlICsgd2lkdGgpO1xuICAgICAgdGhpcy5fc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfU1RJQ0tZX0NPTlRFTlQsIFBST1BFUlRZX01BUkdJTiwgY2FsY3VsYXRlZFZhbHVlID0+IGNhbGN1bGF0ZWRWYWx1ZSAtIHdpZHRoKTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICB0aGlzLl9yZXNldEVsZW1lbnRBdHRyaWJ1dGVzKHRoaXMuX2VsZW1lbnQsICdvdmVyZmxvdycpO1xuICAgICAgdGhpcy5fcmVzZXRFbGVtZW50QXR0cmlidXRlcyh0aGlzLl9lbGVtZW50LCBQUk9QRVJUWV9QQURESU5HKTtcbiAgICAgIHRoaXMuX3Jlc2V0RWxlbWVudEF0dHJpYnV0ZXMoU0VMRUNUT1JfRklYRURfQ09OVEVOVCwgUFJPUEVSVFlfUEFERElORyk7XG4gICAgICB0aGlzLl9yZXNldEVsZW1lbnRBdHRyaWJ1dGVzKFNFTEVDVE9SX1NUSUNLWV9DT05URU5ULCBQUk9QRVJUWV9NQVJHSU4pO1xuICAgIH1cbiAgICBpc092ZXJmbG93aW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0V2lkdGgoKSA+IDA7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuICAgIF9kaXNhYmxlT3ZlckZsb3coKSB7XG4gICAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50LCAnb3ZlcmZsb3cnKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgX3NldEVsZW1lbnRBdHRyaWJ1dGVzKHNlbGVjdG9yLCBzdHlsZVByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG4gICAgICBjb25zdCBtYW5pcHVsYXRpb25DYWxsQmFjayA9IGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IGVsZW1lbnQuY2xpZW50V2lkdGggKyBzY3JvbGxiYXJXaWR0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zYXZlSW5pdGlhbEF0dHJpYnV0ZShlbGVtZW50LCBzdHlsZVByb3BlcnR5KTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlZFZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3BlcnR5KTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZVByb3BlcnR5LCBgJHtjYWxsYmFjayhOdW1iZXIucGFyc2VGbG9hdChjYWxjdWxhdGVkVmFsdWUpKX1weGApO1xuICAgICAgfTtcbiAgICAgIHRoaXMuX2FwcGx5TWFuaXB1bGF0aW9uQ2FsbGJhY2soc2VsZWN0b3IsIG1hbmlwdWxhdGlvbkNhbGxCYWNrKTtcbiAgICB9XG4gICAgX3NhdmVJbml0aWFsQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHkpIHtcbiAgICAgIGNvbnN0IGFjdHVhbFZhbHVlID0gZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlUHJvcGVydHkpO1xuICAgICAgaWYgKGFjdHVhbFZhbHVlKSB7XG4gICAgICAgIE1hbmlwdWxhdG9yLnNldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVQcm9wZXJ0eSwgYWN0dWFsVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBfcmVzZXRFbGVtZW50QXR0cmlidXRlcyhzZWxlY3Rvciwgc3R5bGVQcm9wZXJ0eSkge1xuICAgICAgY29uc3QgbWFuaXB1bGF0aW9uQ2FsbEJhY2sgPSBlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHkpO1xuICAgICAgICAvLyBXZSBvbmx5IHdhbnQgdG8gcmVtb3ZlIHRoZSBwcm9wZXJ0eSBpZiB0aGUgdmFsdWUgaXMgYG51bGxgOyB0aGUgdmFsdWUgY2FuIGFsc28gYmUgemVyb1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlUHJvcGVydHkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBNYW5pcHVsYXRvci5yZW1vdmVEYXRhQXR0cmlidXRlKGVsZW1lbnQsIHN0eWxlUHJvcGVydHkpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHN0eWxlUHJvcGVydHksIHZhbHVlKTtcbiAgICAgIH07XG4gICAgICB0aGlzLl9hcHBseU1hbmlwdWxhdGlvbkNhbGxiYWNrKHNlbGVjdG9yLCBtYW5pcHVsYXRpb25DYWxsQmFjayk7XG4gICAgfVxuICAgIF9hcHBseU1hbmlwdWxhdGlvbkNhbGxiYWNrKHNlbGVjdG9yLCBjYWxsQmFjaykge1xuICAgICAgaWYgKGlzRWxlbWVudCQxKHNlbGVjdG9yKSkge1xuICAgICAgICBjYWxsQmFjayhzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgc2VsIG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoc2VsZWN0b3IsIHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICAgIGNhbGxCYWNrKHNlbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBtb2RhbC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkNyA9ICdtb2RhbCc7XG4gIGNvbnN0IERBVEFfS0VZJDQgPSAnYnMubW9kYWwnO1xuICBjb25zdCBFVkVOVF9LRVkkNCA9IGAuJHtEQVRBX0tFWSQ0fWA7XG4gIGNvbnN0IERBVEFfQVBJX0tFWSQyID0gJy5kYXRhLWFwaSc7XG4gIGNvbnN0IEVTQ0FQRV9LRVkkMSA9ICdFc2NhcGUnO1xuICBjb25zdCBFVkVOVF9ISURFJDQgPSBgaGlkZSR7RVZFTlRfS0VZJDR9YDtcbiAgY29uc3QgRVZFTlRfSElERV9QUkVWRU5URUQkMSA9IGBoaWRlUHJldmVudGVkJHtFVkVOVF9LRVkkNH1gO1xuICBjb25zdCBFVkVOVF9ISURERU4kNCA9IGBoaWRkZW4ke0VWRU5UX0tFWSQ0fWA7XG4gIGNvbnN0IEVWRU5UX1NIT1ckNCA9IGBzaG93JHtFVkVOVF9LRVkkNH1gO1xuICBjb25zdCBFVkVOVF9TSE9XTiQ0ID0gYHNob3duJHtFVkVOVF9LRVkkNH1gO1xuICBjb25zdCBFVkVOVF9SRVNJWkUkMSA9IGByZXNpemUke0VWRU5UX0tFWSQ0fWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RJU01JU1MgPSBgY2xpY2suZGlzbWlzcyR7RVZFTlRfS0VZJDR9YDtcbiAgY29uc3QgRVZFTlRfTU9VU0VET1dOX0RJU01JU1MgPSBgbW91c2Vkb3duLmRpc21pc3Mke0VWRU5UX0tFWSQ0fWA7XG4gIGNvbnN0IEVWRU5UX0tFWURPV05fRElTTUlTUyQxID0gYGtleWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZJDR9YDtcbiAgY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkMiA9IGBjbGljayR7RVZFTlRfS0VZJDR9JHtEQVRBX0FQSV9LRVkkMn1gO1xuICBjb25zdCBDTEFTU19OQU1FX09QRU4gPSAnbW9kYWwtb3Blbic7XG4gIGNvbnN0IENMQVNTX05BTUVfRkFERSQzID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1ckNCA9ICdzaG93JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TVEFUSUMgPSAnbW9kYWwtc3RhdGljJztcbiAgY29uc3QgT1BFTl9TRUxFQ1RPUiQxID0gJy5tb2RhbC5zaG93JztcbiAgY29uc3QgU0VMRUNUT1JfRElBTE9HID0gJy5tb2RhbC1kaWFsb2cnO1xuICBjb25zdCBTRUxFQ1RPUl9NT0RBTF9CT0RZID0gJy5tb2RhbC1ib2R5JztcbiAgY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUkMiA9ICdbZGF0YS1icy10b2dnbGU9XCJtb2RhbFwiXSc7XG4gIGNvbnN0IERlZmF1bHQkNiA9IHtcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBmb2N1czogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZVxuICB9O1xuICBjb25zdCBEZWZhdWx0VHlwZSQ2ID0ge1xuICAgIGJhY2tkcm9wOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAgZm9jdXM6ICdib29sZWFuJyxcbiAgICBrZXlib2FyZDogJ2Jvb2xlYW4nXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgTW9kYWwgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9kaWFsb2cgPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RJQUxPRywgdGhpcy5fZWxlbWVudCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcCA9IHRoaXMuX2luaXRpYWxpemVCYWNrRHJvcCgpO1xuICAgICAgdGhpcy5fZm9jdXN0cmFwID0gdGhpcy5faW5pdGlhbGl6ZUZvY3VzVHJhcCgpO1xuICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9zY3JvbGxCYXIgPSBuZXcgU2Nyb2xsQmFySGVscGVyKCk7XG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdCQ2O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlJDY7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJDc7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3cocmVsYXRlZFRhcmdldCk7XG4gICAgfVxuICAgIHNob3cocmVsYXRlZFRhcmdldCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2hvd24gfHwgdGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1ckNCwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICB9KTtcbiAgICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICB0aGlzLl9zY3JvbGxCYXIuaGlkZSgpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfT1BFTik7XG4gICAgICB0aGlzLl9hZGp1c3REaWFsb2coKTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wLnNob3coKCkgPT4gdGhpcy5fc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkpO1xuICAgIH1cbiAgICBoaWRlKCkge1xuICAgICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFJDQpO1xuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICB0aGlzLl9mb2N1c3RyYXAuZGVhY3RpdmF0ZSgpO1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyQ0KTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soKCkgPT4gdGhpcy5faGlkZU1vZGFsKCksIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKHdpbmRvdywgRVZFTlRfS0VZJDQpO1xuICAgICAgRXZlbnRIYW5kbGVyLm9mZih0aGlzLl9kaWFsb2csIEVWRU5UX0tFWSQ0KTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGhhbmRsZVVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfaW5pdGlhbGl6ZUJhY2tEcm9wKCkge1xuICAgICAgcmV0dXJuIG5ldyBCYWNrZHJvcCh7XG4gICAgICAgIGlzVmlzaWJsZTogQm9vbGVhbih0aGlzLl9jb25maWcuYmFja2Ryb3ApLFxuICAgICAgICAvLyAnc3RhdGljJyBvcHRpb24gd2lsbCBiZSB0cmFuc2xhdGVkIHRvIHRydWUsIGFuZCBib29sZWFucyB3aWxsIGtlZXAgdGhlaXIgdmFsdWUsXG4gICAgICAgIGlzQW5pbWF0ZWQ6IHRoaXMuX2lzQW5pbWF0ZWQoKVxuICAgICAgfSk7XG4gICAgfVxuICAgIF9pbml0aWFsaXplRm9jdXNUcmFwKCkge1xuICAgICAgcmV0dXJuIG5ldyBGb2N1c1RyYXAoe1xuICAgICAgICB0cmFwRWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgICAgfSk7XG4gICAgfVxuICAgIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAvLyB0cnkgdG8gYXBwZW5kIGR5bmFtaWMgbW9kYWxcbiAgICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLl9lbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgdHJ1ZSk7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgIGNvbnN0IG1vZGFsQm9keSA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfTU9EQUxfQk9EWSwgdGhpcy5fZGlhbG9nKTtcbiAgICAgIGlmIChtb2RhbEJvZHkpIHtcbiAgICAgICAgbW9kYWxCb2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgICB9XG4gICAgICByZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XJDQpO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXN0cmFwLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOJDQsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2sodHJhbnNpdGlvbkNvbXBsZXRlLCB0aGlzLl9kaWFsb2csIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gICAgfVxuICAgIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOX0RJU01JU1MkMSwgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSBFU0NBUEVfS0VZJDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90cmlnZ2VyQmFja2Ryb3BUcmFuc2l0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX1JFU0laRSQxLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9pc1Nob3duICYmICF0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICB0aGlzLl9hZGp1c3REaWFsb2coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfTU9VU0VET1dOX0RJU01JU1MsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gYSBiYWQgdHJpY2sgdG8gc2VncmVnYXRlIGNsaWNrcyB0aGF0IG1heSBzdGFydCBpbnNpZGUgZGlhbG9nIGJ1dCBlbmQgb3V0c2lkZSwgYW5kIGF2b2lkIGxpc3RlbiB0byBzY3JvbGxiYXIgY2xpY2tzXG4gICAgICAgIEV2ZW50SGFuZGxlci5vbmUodGhpcy5fZWxlbWVudCwgRVZFTlRfQ0xJQ0tfRElTTUlTUywgZXZlbnQyID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0IHx8IHRoaXMuX2VsZW1lbnQgIT09IGV2ZW50Mi50YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJCYWNrZHJvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBfaGlkZU1vZGFsKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcpO1xuICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX09QRU4pO1xuICAgICAgICB0aGlzLl9yZXNldEFkanVzdG1lbnRzKCk7XG4gICAgICAgIHRoaXMuX3Njcm9sbEJhci5yZXNldCgpO1xuICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURERU4kNCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgX2lzQW5pbWF0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDMpO1xuICAgIH1cbiAgICBfdHJpZ2dlckJhY2tkcm9wVHJhbnNpdGlvbigpIHtcbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREVfUFJFVkVOVEVEJDEpO1xuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzTW9kYWxPdmVyZmxvd2luZyA9IHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgIGNvbnN0IGluaXRpYWxPdmVyZmxvd1kgPSB0aGlzLl9lbGVtZW50LnN0eWxlLm92ZXJmbG93WTtcbiAgICAgIC8vIHJldHVybiBpZiB0aGUgZm9sbG93aW5nIGJhY2tncm91bmQgdHJhbnNpdGlvbiBoYXNuJ3QgeWV0IGNvbXBsZXRlZFxuICAgICAgaWYgKGluaXRpYWxPdmVyZmxvd1kgPT09ICdoaWRkZW4nIHx8IHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU1RBVElDKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU1RBVElDKTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TVEFUSUMpO1xuICAgICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9IGluaXRpYWxPdmVyZmxvd1k7XG4gICAgICAgIH0sIHRoaXMuX2RpYWxvZyk7XG4gICAgICB9LCB0aGlzLl9kaWFsb2cpO1xuICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG4gICAgICovXG5cbiAgICBfYWRqdXN0RGlhbG9nKCkge1xuICAgICAgY29uc3QgaXNNb2RhbE92ZXJmbG93aW5nID0gdGhpcy5fZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSB0aGlzLl9zY3JvbGxCYXIuZ2V0V2lkdGgoKTtcbiAgICAgIGNvbnN0IGlzQm9keU92ZXJmbG93aW5nID0gc2Nyb2xsYmFyV2lkdGggPiAwO1xuICAgICAgaWYgKGlzQm9keU92ZXJmbG93aW5nICYmICFpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBpc1JUTCgpID8gJ3BhZGRpbmdMZWZ0JyA6ICdwYWRkaW5nUmlnaHQnO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IGAke3Njcm9sbGJhcldpZHRofXB4YDtcbiAgICAgIH1cbiAgICAgIGlmICghaXNCb2R5T3ZlcmZsb3dpbmcgJiYgaXNNb2RhbE92ZXJmbG93aW5nKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gaXNSVEwoKSA/ICdwYWRkaW5nUmlnaHQnIDogJ3BhZGRpbmdMZWZ0JztcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSBgJHtzY3JvbGxiYXJXaWR0aH1weGA7XG4gICAgICB9XG4gICAgfVxuICAgIF9yZXNldEFkanVzdG1lbnRzKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnO1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBNb2RhbC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgKi9cblxuICBFdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJJDIsIFNFTEVDVE9SX0RBVEFfVE9HR0xFJDIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IodGhpcyk7XG4gICAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgRXZlbnRIYW5kbGVyLm9uZSh0YXJnZXQsIEVWRU5UX1NIT1ckNCwgc2hvd0V2ZW50ID0+IHtcbiAgICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAvLyBvbmx5IHJlZ2lzdGVyIGZvY3VzIHJlc3RvcmVyIGlmIG1vZGFsIHdpbGwgYWN0dWFsbHkgZ2V0IHNob3duXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIEV2ZW50SGFuZGxlci5vbmUodGFyZ2V0LCBFVkVOVF9ISURERU4kNCwgKCkgPT4ge1xuICAgICAgICBpZiAoaXNWaXNpYmxlKHRoaXMpKSB7XG4gICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGF2b2lkIGNvbmZsaWN0IHdoZW4gY2xpY2tpbmcgbW9kYWwgdG9nZ2xlciB3aGlsZSBhbm90aGVyIG9uZSBpcyBvcGVuXG4gICAgY29uc3QgYWxyZWFkeU9wZW4gPSBTZWxlY3RvckVuZ2luZS5maW5kT25lKE9QRU5fU0VMRUNUT1IkMSk7XG4gICAgaWYgKGFscmVhZHlPcGVuKSB7XG4gICAgICBNb2RhbC5nZXRJbnN0YW5jZShhbHJlYWR5T3BlbikuaGlkZSgpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gTW9kYWwuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0YXJnZXQpO1xuICAgIGRhdGEudG9nZ2xlKHRoaXMpO1xuICB9KTtcbiAgZW5hYmxlRGlzbWlzc1RyaWdnZXIoTW9kYWwpO1xuXG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luKE1vZGFsKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIG9mZmNhbnZhcy5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkNiA9ICdvZmZjYW52YXMnO1xuICBjb25zdCBEQVRBX0tFWSQzID0gJ2JzLm9mZmNhbnZhcyc7XG4gIGNvbnN0IEVWRU5UX0tFWSQzID0gYC4ke0RBVEFfS0VZJDN9YDtcbiAgY29uc3QgREFUQV9BUElfS0VZJDEgPSAnLmRhdGEtYXBpJztcbiAgY29uc3QgRVZFTlRfTE9BRF9EQVRBX0FQSSQyID0gYGxvYWQke0VWRU5UX0tFWSQzfSR7REFUQV9BUElfS0VZJDF9YDtcbiAgY29uc3QgRVNDQVBFX0tFWSA9ICdFc2NhcGUnO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1ckMyA9ICdzaG93JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XSU5HJDEgPSAnc2hvd2luZyc7XG4gIGNvbnN0IENMQVNTX05BTUVfSElESU5HID0gJ2hpZGluZyc7XG4gIGNvbnN0IENMQVNTX05BTUVfQkFDS0RST1AgPSAnb2ZmY2FudmFzLWJhY2tkcm9wJztcbiAgY29uc3QgT1BFTl9TRUxFQ1RPUiA9ICcub2ZmY2FudmFzLnNob3cnO1xuICBjb25zdCBFVkVOVF9TSE9XJDMgPSBgc2hvdyR7RVZFTlRfS0VZJDN9YDtcbiAgY29uc3QgRVZFTlRfU0hPV04kMyA9IGBzaG93biR7RVZFTlRfS0VZJDN9YDtcbiAgY29uc3QgRVZFTlRfSElERSQzID0gYGhpZGUke0VWRU5UX0tFWSQzfWA7XG4gIGNvbnN0IEVWRU5UX0hJREVfUFJFVkVOVEVEID0gYGhpZGVQcmV2ZW50ZWQke0VWRU5UX0tFWSQzfWA7XG4gIGNvbnN0IEVWRU5UX0hJRERFTiQzID0gYGhpZGRlbiR7RVZFTlRfS0VZJDN9YDtcbiAgY29uc3QgRVZFTlRfUkVTSVpFID0gYHJlc2l6ZSR7RVZFTlRfS0VZJDN9YDtcbiAgY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkMSA9IGBjbGljayR7RVZFTlRfS0VZJDN9JHtEQVRBX0FQSV9LRVkkMX1gO1xuICBjb25zdCBFVkVOVF9LRVlET1dOX0RJU01JU1MgPSBga2V5ZG93bi5kaXNtaXNzJHtFVkVOVF9LRVkkM31gO1xuICBjb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSQxID0gJ1tkYXRhLWJzLXRvZ2dsZT1cIm9mZmNhbnZhc1wiXSc7XG4gIGNvbnN0IERlZmF1bHQkNSA9IHtcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBzY3JvbGw6IGZhbHNlXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlJDUgPSB7XG4gICAgYmFja2Ryb3A6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICBrZXlib2FyZDogJ2Jvb2xlYW4nLFxuICAgIHNjcm9sbDogJ2Jvb2xlYW4nXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgT2ZmY2FudmFzIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5fYmFja2Ryb3AgPSB0aGlzLl9pbml0aWFsaXplQmFja0Ryb3AoKTtcbiAgICAgIHRoaXMuX2ZvY3VzdHJhcCA9IHRoaXMuX2luaXRpYWxpemVGb2N1c1RyYXAoKTtcbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0JDU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGUkNTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkNjtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcbiAgICB0b2dnbGUocmVsYXRlZFRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG4gICAgc2hvdyhyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzaG93RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XJDMsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldFxuICAgICAgfSk7XG4gICAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5faXNTaG93biA9IHRydWU7XG4gICAgICB0aGlzLl9iYWNrZHJvcC5zaG93KCk7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5zY3JvbGwpIHtcbiAgICAgICAgbmV3IFNjcm9sbEJhckhlbHBlcigpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgdHJ1ZSk7XG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1dJTkckMSk7XG4gICAgICBjb25zdCBjb21wbGV0ZUNhbGxCYWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5zY3JvbGwgfHwgdGhpcy5fY29uZmlnLmJhY2tkcm9wKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXN0cmFwLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQzKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORyQxKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPV04kMywge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZUNhbGxCYWNrLCB0aGlzLl9lbGVtZW50LCB0cnVlKTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFJDMpO1xuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZvY3VzdHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgICB0aGlzLl9lbGVtZW50LmJsdXIoKTtcbiAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0hJRElORyk7XG4gICAgICB0aGlzLl9iYWNrZHJvcC5oaWRlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDMsIENMQVNTX05BTUVfSElESU5HKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcuc2Nyb2xsKSB7XG4gICAgICAgICAgbmV3IFNjcm9sbEJhckhlbHBlcigpLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOJDMpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGVDYWxsYmFjaywgdGhpcy5fZWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICB0aGlzLl9iYWNrZHJvcC5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9mb2N1c3RyYXAuZGVhY3RpdmF0ZSgpO1xuICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfaW5pdGlhbGl6ZUJhY2tEcm9wKCkge1xuICAgICAgY29uc3QgY2xpY2tDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFX1BSRVZFTlRFRCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfTtcblxuICAgICAgLy8gJ3N0YXRpYycgb3B0aW9uIHdpbGwgYmUgdHJhbnNsYXRlZCB0byB0cnVlLCBhbmQgYm9vbGVhbnMgd2lsbCBrZWVwIHRoZWlyIHZhbHVlXG4gICAgICBjb25zdCBpc1Zpc2libGUgPSBCb29sZWFuKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCk7XG4gICAgICByZXR1cm4gbmV3IEJhY2tkcm9wKHtcbiAgICAgICAgY2xhc3NOYW1lOiBDTEFTU19OQU1FX0JBQ0tEUk9QLFxuICAgICAgICBpc1Zpc2libGUsXG4gICAgICAgIGlzQW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgIHJvb3RFbGVtZW50OiB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgIGNsaWNrQ2FsbGJhY2s6IGlzVmlzaWJsZSA/IGNsaWNrQ2FsbGJhY2sgOiBudWxsXG4gICAgICB9KTtcbiAgICB9XG4gICAgX2luaXRpYWxpemVGb2N1c1RyYXAoKSB7XG4gICAgICByZXR1cm4gbmV3IEZvY3VzVHJhcCh7XG4gICAgICAgIHRyYXBFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0tFWURPV05fRElTTUlTUywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSBFU0NBUEVfS0VZKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERV9QUkVWRU5URUQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG4gICAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gICAqL1xuXG4gIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEkkMSwgU0VMRUNUT1JfREFUQV9UT0dHTEUkMSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3Rvcih0aGlzKTtcbiAgICBpZiAoWydBJywgJ0FSRUEnXS5pbmNsdWRlcyh0aGlzLnRhZ05hbWUpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBFdmVudEhhbmRsZXIub25lKHRhcmdldCwgRVZFTlRfSElEREVOJDMsICgpID0+IHtcbiAgICAgIC8vIGZvY3VzIG9uIHRyaWdnZXIgd2hlbiBpdCBpcyBjbG9zZWRcbiAgICAgIGlmIChpc1Zpc2libGUodGhpcykpIHtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYXZvaWQgY29uZmxpY3Qgd2hlbiBjbGlja2luZyBhIHRvZ2dsZXIgb2YgYW4gb2ZmY2FudmFzLCB3aGlsZSBhbm90aGVyIGlzIG9wZW5cbiAgICBjb25zdCBhbHJlYWR5T3BlbiA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoT1BFTl9TRUxFQ1RPUik7XG4gICAgaWYgKGFscmVhZHlPcGVuICYmIGFscmVhZHlPcGVuICE9PSB0YXJnZXQpIHtcbiAgICAgIE9mZmNhbnZhcy5nZXRJbnN0YW5jZShhbHJlYWR5T3BlbikuaGlkZSgpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UodGFyZ2V0KTtcbiAgICBkYXRhLnRvZ2dsZSh0aGlzKTtcbiAgfSk7XG4gIEV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEkkMiwgKCkgPT4ge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgU2VsZWN0b3JFbmdpbmUuZmluZChPUEVOX1NFTEVDVE9SKSkge1xuICAgICAgT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2Uoc2VsZWN0b3IpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuICBFdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9SRVNJWkUsICgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgU2VsZWN0b3JFbmdpbmUuZmluZCgnW2FyaWEtbW9kYWxdW2NsYXNzKj1zaG93XVtjbGFzcyo9b2ZmY2FudmFzLV0nKSkge1xuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgT2ZmY2FudmFzLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGVuYWJsZURpc21pc3NUcmlnZ2VyKE9mZmNhbnZhcyk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oT2ZmY2FudmFzKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHV0aWwvc2FuaXRpemVyLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAvLyBqcy1kb2NzLXN0YXJ0IGFsbG93LWxpc3RcbiAgY29uc3QgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiA9IC9eYXJpYS1bXFx3LV0qJC9pO1xuICBjb25zdCBEZWZhdWx0QWxsb3dsaXN0ID0ge1xuICAgIC8vIEdsb2JhbCBhdHRyaWJ1dGVzIGFsbG93ZWQgb24gYW55IHN1cHBsaWVkIGVsZW1lbnQgYmVsb3cuXG4gICAgJyonOiBbJ2NsYXNzJywgJ2RpcicsICdpZCcsICdsYW5nJywgJ3JvbGUnLCBBUklBX0FUVFJJQlVURV9QQVRURVJOXSxcbiAgICBhOiBbJ3RhcmdldCcsICdocmVmJywgJ3RpdGxlJywgJ3JlbCddLFxuICAgIGFyZWE6IFtdLFxuICAgIGI6IFtdLFxuICAgIGJyOiBbXSxcbiAgICBjb2w6IFtdLFxuICAgIGNvZGU6IFtdLFxuICAgIGRkOiBbXSxcbiAgICBkaXY6IFtdLFxuICAgIGRsOiBbXSxcbiAgICBkdDogW10sXG4gICAgZW06IFtdLFxuICAgIGhyOiBbXSxcbiAgICBoMTogW10sXG4gICAgaDI6IFtdLFxuICAgIGgzOiBbXSxcbiAgICBoNDogW10sXG4gICAgaDU6IFtdLFxuICAgIGg2OiBbXSxcbiAgICBpOiBbXSxcbiAgICBpbWc6IFsnc3JjJywgJ3NyY3NldCcsICdhbHQnLCAndGl0bGUnLCAnd2lkdGgnLCAnaGVpZ2h0J10sXG4gICAgbGk6IFtdLFxuICAgIG9sOiBbXSxcbiAgICBwOiBbXSxcbiAgICBwcmU6IFtdLFxuICAgIHM6IFtdLFxuICAgIHNtYWxsOiBbXSxcbiAgICBzcGFuOiBbXSxcbiAgICBzdWI6IFtdLFxuICAgIHN1cDogW10sXG4gICAgc3Ryb25nOiBbXSxcbiAgICB1OiBbXSxcbiAgICB1bDogW11cbiAgfTtcbiAgLy8ganMtZG9jcy1lbmQgYWxsb3ctbGlzdFxuXG4gIGNvbnN0IHVyaUF0dHJpYnV0ZXMgPSBuZXcgU2V0KFsnYmFja2dyb3VuZCcsICdjaXRlJywgJ2hyZWYnLCAnaXRlbXR5cGUnLCAnbG9uZ2Rlc2MnLCAncG9zdGVyJywgJ3NyYycsICd4bGluazpocmVmJ10pO1xuXG4gIC8qKlxuICAgKiBBIHBhdHRlcm4gdGhhdCByZWNvZ25pemVzIFVSTHMgdGhhdCBhcmUgc2FmZSB3cnQuIFhTUyBpbiBVUkwgbmF2aWdhdGlvblxuICAgKiBjb250ZXh0cy5cbiAgICpcbiAgICogU2hvdXQtb3V0IHRvIEFuZ3VsYXIgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzE1LjIuOC9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vdXJsX3Nhbml0aXplci50cyNMMzhcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICBjb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPyFqYXZhc2NyaXB0OikoPzpbYS16MC05Ky4tXSs6fFteJjovPyNdKig/OlsvPyNdfCQpKS9pO1xuICBjb25zdCBhbGxvd2VkQXR0cmlidXRlID0gKGF0dHJpYnV0ZSwgYWxsb3dlZEF0dHJpYnV0ZUxpc3QpID0+IHtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGFsbG93ZWRBdHRyaWJ1dGVMaXN0LmluY2x1ZGVzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICBpZiAodXJpQXR0cmlidXRlcy5oYXMoYXR0cmlidXRlTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oU0FGRV9VUkxfUEFUVEVSTi50ZXN0KGF0dHJpYnV0ZS5ub2RlVmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGEgcmVndWxhciBleHByZXNzaW9uIHZhbGlkYXRlcyB0aGUgYXR0cmlidXRlLlxuICAgIHJldHVybiBhbGxvd2VkQXR0cmlidXRlTGlzdC5maWx0ZXIoYXR0cmlidXRlUmVnZXggPT4gYXR0cmlidXRlUmVnZXggaW5zdGFuY2VvZiBSZWdFeHApLnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChhdHRyaWJ1dGVOYW1lKSk7XG4gIH07XG4gIGZ1bmN0aW9uIHNhbml0aXplSHRtbCh1bnNhZmVIdG1sLCBhbGxvd0xpc3QsIHNhbml0aXplRnVuY3Rpb24pIHtcbiAgICBpZiAoIXVuc2FmZUh0bWwubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5zYWZlSHRtbDtcbiAgICB9XG4gICAgaWYgKHNhbml0aXplRnVuY3Rpb24gJiYgdHlwZW9mIHNhbml0aXplRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBzYW5pdGl6ZUZ1bmN0aW9uKHVuc2FmZUh0bWwpO1xuICAgIH1cbiAgICBjb25zdCBkb21QYXJzZXIgPSBuZXcgd2luZG93LkRPTVBhcnNlcigpO1xuICAgIGNvbnN0IGNyZWF0ZWREb2N1bWVudCA9IGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcodW5zYWZlSHRtbCwgJ3RleHQvaHRtbCcpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gW10uY29uY2F0KC4uLmNyZWF0ZWREb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICBjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghT2JqZWN0LmtleXMoYWxsb3dMaXN0KS5pbmNsdWRlcyhlbGVtZW50TmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBhdHRyaWJ1dGVMaXN0ID0gW10uY29uY2F0KC4uLmVsZW1lbnQuYXR0cmlidXRlcyk7XG4gICAgICBjb25zdCBhbGxvd2VkQXR0cmlidXRlcyA9IFtdLmNvbmNhdChhbGxvd0xpc3RbJyonXSB8fCBbXSwgYWxsb3dMaXN0W2VsZW1lbnROYW1lXSB8fCBbXSk7XG4gICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVMaXN0KSB7XG4gICAgICAgIGlmICghYWxsb3dlZEF0dHJpYnV0ZShhdHRyaWJ1dGUsIGFsbG93ZWRBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5ub2RlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZWREb2N1bWVudC5ib2R5LmlubmVySFRNTDtcbiAgfVxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgdXRpbC90ZW1wbGF0ZS1mYWN0b3J5LmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSQ1ID0gJ1RlbXBsYXRlRmFjdG9yeSc7XG4gIGNvbnN0IERlZmF1bHQkNCA9IHtcbiAgICBhbGxvd0xpc3Q6IERlZmF1bHRBbGxvd2xpc3QsXG4gICAgY29udGVudDoge30sXG4gICAgLy8geyBzZWxlY3RvciA6IHRleHQgLCAgc2VsZWN0b3IyIDogdGV4dDIgLCB9XG4gICAgZXh0cmFDbGFzczogJycsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgc2FuaXRpemU6IHRydWUsXG4gICAgc2FuaXRpemVGbjogbnVsbCxcbiAgICB0ZW1wbGF0ZTogJzxkaXY+PC9kaXY+J1xuICB9O1xuICBjb25zdCBEZWZhdWx0VHlwZSQ0ID0ge1xuICAgIGFsbG93TGlzdDogJ29iamVjdCcsXG4gICAgY29udGVudDogJ29iamVjdCcsXG4gICAgZXh0cmFDbGFzczogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBodG1sOiAnYm9vbGVhbicsXG4gICAgc2FuaXRpemU6ICdib29sZWFuJyxcbiAgICBzYW5pdGl6ZUZuOiAnKG51bGx8ZnVuY3Rpb24pJyxcbiAgICB0ZW1wbGF0ZTogJ3N0cmluZydcbiAgfTtcbiAgY29uc3QgRGVmYXVsdENvbnRlbnRUeXBlID0ge1xuICAgIGVudHJ5OiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9ufG51bGwpJyxcbiAgICBzZWxlY3RvcjogJyhzdHJpbmd8ZWxlbWVudCknXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgVGVtcGxhdGVGYWN0b3J5IGV4dGVuZHMgQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLl9jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHQkNDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZSQ0O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRSQ1O1xuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9jb25maWcuY29udGVudCkubWFwKGNvbmZpZyA9PiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihjb25maWcpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuICAgIGhhc0NvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRDb250ZW50KCkubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgY2hhbmdlQ29udGVudChjb250ZW50KSB7XG4gICAgICB0aGlzLl9jaGVja0NvbnRlbnQoY29udGVudCk7XG4gICAgICB0aGlzLl9jb25maWcuY29udGVudCA9IHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLmNvbnRlbnQsXG4gICAgICAgIC4uLmNvbnRlbnRcbiAgICAgIH07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdG9IdG1sKCkge1xuICAgICAgY29uc3QgdGVtcGxhdGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0ZW1wbGF0ZVdyYXBwZXIuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZSh0aGlzLl9jb25maWcudGVtcGxhdGUpO1xuICAgICAgZm9yIChjb25zdCBbc2VsZWN0b3IsIHRleHRdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZy5jb250ZW50KSkge1xuICAgICAgICB0aGlzLl9zZXRDb250ZW50KHRlbXBsYXRlV3JhcHBlciwgdGV4dCwgc2VsZWN0b3IpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZVdyYXBwZXIuY2hpbGRyZW5bMF07XG4gICAgICBjb25zdCBleHRyYUNsYXNzID0gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLmV4dHJhQ2xhc3MpO1xuICAgICAgaWYgKGV4dHJhQ2xhc3MpIHtcbiAgICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZCguLi5leHRyYUNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfdHlwZUNoZWNrQ29uZmlnKGNvbmZpZykge1xuICAgICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuICAgICAgdGhpcy5fY2hlY2tDb250ZW50KGNvbmZpZy5jb250ZW50KTtcbiAgICB9XG4gICAgX2NoZWNrQ29udGVudChhcmcpIHtcbiAgICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCBjb250ZW50XSBvZiBPYmplY3QuZW50cmllcyhhcmcpKSB7XG4gICAgICAgIHN1cGVyLl90eXBlQ2hlY2tDb25maWcoe1xuICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgIGVudHJ5OiBjb250ZW50XG4gICAgICAgIH0sIERlZmF1bHRDb250ZW50VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICAgIF9zZXRDb250ZW50KHRlbXBsYXRlLCBjb250ZW50LCBzZWxlY3Rvcikge1xuICAgICAgY29uc3QgdGVtcGxhdGVFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvciwgdGVtcGxhdGUpO1xuICAgICAgaWYgKCF0ZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29udGVudCA9IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGNvbnRlbnQpO1xuICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgIHRlbXBsYXRlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzRWxlbWVudCQxKGNvbnRlbnQpKSB7XG4gICAgICAgIHRoaXMuX3B1dEVsZW1lbnRJblRlbXBsYXRlKGdldEVsZW1lbnQoY29udGVudCksIHRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZShjb250ZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGVtcGxhdGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICB9XG4gICAgX21heWJlU2FuaXRpemUoYXJnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNhbml0aXplID8gc2FuaXRpemVIdG1sKGFyZywgdGhpcy5fY29uZmlnLmFsbG93TGlzdCwgdGhpcy5fY29uZmlnLnNhbml0aXplRm4pIDogYXJnO1xuICAgIH1cbiAgICBfcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gZXhlY3V0ZShhcmcsIFt0aGlzXSk7XG4gICAgfVxuICAgIF9wdXRFbGVtZW50SW5UZW1wbGF0ZShlbGVtZW50LCB0ZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRlbXBsYXRlRWxlbWVudC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRlbXBsYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCB0b29sdGlwLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSQ0ID0gJ3Rvb2x0aXAnO1xuICBjb25zdCBESVNBTExPV0VEX0FUVFJJQlVURVMgPSBuZXcgU2V0KFsnc2FuaXRpemUnLCAnYWxsb3dMaXN0JywgJ3Nhbml0aXplRm4nXSk7XG4gIGNvbnN0IENMQVNTX05BTUVfRkFERSQyID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX01PREFMID0gJ21vZGFsJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XJDIgPSAnc2hvdyc7XG4gIGNvbnN0IFNFTEVDVE9SX1RPT0xUSVBfSU5ORVIgPSAnLnRvb2x0aXAtaW5uZXInO1xuICBjb25zdCBTRUxFQ1RPUl9NT0RBTCA9IGAuJHtDTEFTU19OQU1FX01PREFMfWA7XG4gIGNvbnN0IEVWRU5UX01PREFMX0hJREUgPSAnaGlkZS5icy5tb2RhbCc7XG4gIGNvbnN0IFRSSUdHRVJfSE9WRVIgPSAnaG92ZXInO1xuICBjb25zdCBUUklHR0VSX0ZPQ1VTID0gJ2ZvY3VzJztcbiAgY29uc3QgVFJJR0dFUl9DTElDSyA9ICdjbGljayc7XG4gIGNvbnN0IFRSSUdHRVJfTUFOVUFMID0gJ21hbnVhbCc7XG4gIGNvbnN0IEVWRU5UX0hJREUkMiA9ICdoaWRlJztcbiAgY29uc3QgRVZFTlRfSElEREVOJDIgPSAnaGlkZGVuJztcbiAgY29uc3QgRVZFTlRfU0hPVyQyID0gJ3Nob3cnO1xuICBjb25zdCBFVkVOVF9TSE9XTiQyID0gJ3Nob3duJztcbiAgY29uc3QgRVZFTlRfSU5TRVJURUQgPSAnaW5zZXJ0ZWQnO1xuICBjb25zdCBFVkVOVF9DTElDSyQxID0gJ2NsaWNrJztcbiAgY29uc3QgRVZFTlRfRk9DVVNJTiQxID0gJ2ZvY3VzaW4nO1xuICBjb25zdCBFVkVOVF9GT0NVU09VVCQxID0gJ2ZvY3Vzb3V0JztcbiAgY29uc3QgRVZFTlRfTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJztcbiAgY29uc3QgRVZFTlRfTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJztcbiAgY29uc3QgQXR0YWNobWVudE1hcCA9IHtcbiAgICBBVVRPOiAnYXV0bycsXG4gICAgVE9QOiAndG9wJyxcbiAgICBSSUdIVDogaXNSVEwoKSA/ICdsZWZ0JyA6ICdyaWdodCcsXG4gICAgQk9UVE9NOiAnYm90dG9tJyxcbiAgICBMRUZUOiBpc1JUTCgpID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICB9O1xuICBjb25zdCBEZWZhdWx0JDMgPSB7XG4gICAgYWxsb3dMaXN0OiBEZWZhdWx0QWxsb3dsaXN0LFxuICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICBjdXN0b21DbGFzczogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgZmFsbGJhY2tQbGFjZW1lbnRzOiBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIG9mZnNldDogWzAsIDZdLFxuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgcG9wcGVyQ29uZmlnOiBudWxsLFxuICAgIHNhbml0aXplOiB0cnVlLFxuICAgIHNhbml0aXplRm46IG51bGwsXG4gICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+JyArICc8L2Rpdj4nLFxuICAgIHRpdGxlOiAnJyxcbiAgICB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlJDMgPSB7XG4gICAgYWxsb3dMaXN0OiAnb2JqZWN0JyxcbiAgICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgICBib3VuZGFyeTogJyhzdHJpbmd8ZWxlbWVudCknLFxuICAgIGNvbnRhaW5lcjogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKScsXG4gICAgY3VzdG9tQ2xhc3M6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgZGVsYXk6ICcobnVtYmVyfG9iamVjdCknLFxuICAgIGZhbGxiYWNrUGxhY2VtZW50czogJ2FycmF5JyxcbiAgICBodG1sOiAnYm9vbGVhbicsXG4gICAgb2Zmc2V0OiAnKGFycmF5fHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIHBsYWNlbWVudDogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBwb3BwZXJDb25maWc6ICcobnVsbHxvYmplY3R8ZnVuY3Rpb24pJyxcbiAgICBzYW5pdGl6ZTogJ2Jvb2xlYW4nLFxuICAgIHNhbml0aXplRm46ICcobnVsbHxmdW5jdGlvbiknLFxuICAgIHNlbGVjdG9yOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgdGVtcGxhdGU6ICdzdHJpbmcnLFxuICAgIHRpdGxlOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gICAgdHJpZ2dlcjogJ3N0cmluZydcbiAgfTtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBUb29sdGlwIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyB0b29sdGlwcyByZXF1aXJlIFBvcHBlciAoaHR0cHM6Ly9wb3BwZXIuanMub3JnKScpO1xuICAgICAgfVxuICAgICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTtcblxuICAgICAgLy8gUHJpdmF0ZVxuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3RpbWVvdXQgPSAwO1xuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSB7fTtcbiAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkgPSBudWxsO1xuICAgICAgdGhpcy5fbmV3Q29udGVudCA9IG51bGw7XG5cbiAgICAgIC8vIFByb3RlY3RlZFxuICAgICAgdGhpcy50aXAgPSBudWxsO1xuICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKCk7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5zZWxlY3Rvcikge1xuICAgICAgICB0aGlzLl9maXhUaXRsZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdCQzO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlJDM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJDQ7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgZW5hYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0b2dnbGVFbmFibGVkKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gIXRoaXMuX2lzRW5hYmxlZDtcbiAgICB9XG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCF0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlci5jbGljayA9ICF0aGlzLl9hY3RpdmVUcmlnZ2VyLmNsaWNrO1xuICAgICAgaWYgKHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgICB0aGlzLl9sZWF2ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9lbnRlcigpO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuICAgICAgRXZlbnRIYW5kbGVyLm9mZih0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTU9EQUwpLCBFVkVOVF9NT0RBTF9ISURFLCB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyKTtcbiAgICAgIGlmICh0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJykpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBzaG93KCkge1xuICAgICAgaWYgKHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHVzZSBzaG93IG9uIHZpc2libGUgZWxlbWVudHMnKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHRoaXMuX2lzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX1NIT1ckMikpO1xuICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IGZpbmRTaGFkb3dSb290KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgY29uc3QgaXNJblRoZURvbSA9IChzaGFkb3dSb290IHx8IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmNvbnRhaW5zKHRoaXMuX2VsZW1lbnQpO1xuICAgICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogdjYgcmVtb3ZlIHRoaXMgb3IgbWFrZSBpdCBvcHRpb25hbFxuICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgY29uc3QgdGlwID0gdGhpcy5fZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXAuZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29udGFpbmVyXG4gICAgICB9ID0gdGhpcy5fY29uZmlnO1xuICAgICAgaWYgKCF0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKHRoaXMudGlwKSkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKHRpcCk7XG4gICAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0lOU0VSVEVEKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9wb3BwZXIgPSB0aGlzLl9jcmVhdGVQb3BwZXIodGlwKTtcbiAgICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQyKTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vbihlbGVtZW50LCAnbW91c2VvdmVyJywgbm9vcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9TSE9XTiQyKSk7XG4gICAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5fbGVhdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLnRpcCwgdGhpcy5faXNBbmltYXRlZCgpKTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICghdGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0hJREUkMikpO1xuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKTtcbiAgICAgIHRpcC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyQyKTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBbXS5jb25jYXQoLi4uZG9jdW1lbnQuYm9keS5jaGlsZHJlbikpIHtcbiAgICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0NMSUNLXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0ZPQ1VTXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0hPVkVSXSA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbDsgLy8gaXQgaXMgYSB0cmljayB0byBzdXBwb3J0IG1hbnVhbCB0cmlnZ2VyaW5nXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0hJRERFTiQyKSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy50aXAsIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByb3RlY3RlZFxuICAgIF9pc1dpdGhDb250ZW50KCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fZ2V0VGl0bGUoKSk7XG4gICAgfVxuICAgIF9nZXRUaXBFbGVtZW50KCkge1xuICAgICAgaWYgKCF0aGlzLnRpcCkge1xuICAgICAgICB0aGlzLnRpcCA9IHRoaXMuX2NyZWF0ZVRpcEVsZW1lbnQodGhpcy5fbmV3Q29udGVudCB8fCB0aGlzLl9nZXRDb250ZW50Rm9yVGVtcGxhdGUoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy50aXA7XG4gICAgfVxuICAgIF9jcmVhdGVUaXBFbGVtZW50KGNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRlbXBsYXRlRmFjdG9yeShjb250ZW50KS50b0h0bWwoKTtcblxuICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgY2hlY2sgaW4gdjZcbiAgICAgIGlmICghdGlwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdGlwLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9GQURFJDIsIENMQVNTX05BTUVfU0hPVyQyKTtcbiAgICAgIC8vIFRPRE86IHY2IHRoZSBmb2xsb3dpbmcgY2FuIGJlIGFjaGlldmVkIHdpdGggQ1NTIG9ubHlcbiAgICAgIHRpcC5jbGFzc0xpc3QuYWRkKGBicy0ke3RoaXMuY29uc3RydWN0b3IuTkFNRX0tYXV0b2ApO1xuICAgICAgY29uc3QgdGlwSWQgPSBnZXRVSUQodGhpcy5jb25zdHJ1Y3Rvci5OQU1FKS50b1N0cmluZygpO1xuICAgICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZCk7XG4gICAgICBpZiAodGhpcy5faXNBbmltYXRlZCgpKSB7XG4gICAgICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfRkFERSQyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aXA7XG4gICAgfVxuICAgIHNldENvbnRlbnQoY29udGVudCkge1xuICAgICAgdGhpcy5fbmV3Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICAgIF9nZXRUZW1wbGF0ZUZhY3RvcnkoY29udGVudCkge1xuICAgICAgaWYgKHRoaXMuX3RlbXBsYXRlRmFjdG9yeSkge1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkuY2hhbmdlQ29udGVudChjb250ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeSA9IG5ldyBUZW1wbGF0ZUZhY3Rvcnkoe1xuICAgICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgICAvLyB0aGUgYGNvbnRlbnRgIHZhciBoYXMgdG8gYmUgYWZ0ZXIgYHRoaXMuX2NvbmZpZ2BcbiAgICAgICAgICAvLyB0byBvdmVycmlkZSBjb25maWcuY29udGVudCBpbiBjYXNlIG9mIHBvcG92ZXJcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIGV4dHJhQ2xhc3M6IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5jdXN0b21DbGFzcylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVGYWN0b3J5O1xuICAgIH1cbiAgICBfZ2V0Q29udGVudEZvclRlbXBsYXRlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW1NFTEVDVE9SX1RPT0xUSVBfSU5ORVJdOiB0aGlzLl9nZXRUaXRsZSgpXG4gICAgICB9O1xuICAgIH1cbiAgICBfZ2V0VGl0bGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLnRpdGxlKSB8fCB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfaW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5nZXRPckNyZWF0ZUluc3RhbmNlKGV2ZW50LmRlbGVnYXRlVGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgICB9XG4gICAgX2lzQW5pbWF0ZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFuaW1hdGlvbiB8fCB0aGlzLnRpcCAmJiB0aGlzLnRpcC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDIpO1xuICAgIH1cbiAgICBfaXNTaG93bigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpcCAmJiB0aGlzLnRpcC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XJDIpO1xuICAgIH1cbiAgICBfY3JlYXRlUG9wcGVyKHRpcCkge1xuICAgICAgY29uc3QgcGxhY2VtZW50ID0gZXhlY3V0ZSh0aGlzLl9jb25maWcucGxhY2VtZW50LCBbdGhpcywgdGlwLCB0aGlzLl9lbGVtZW50XSk7XG4gICAgICBjb25zdCBhdHRhY2htZW50ID0gQXR0YWNobWVudE1hcFtwbGFjZW1lbnQudG9VcHBlckNhc2UoKV07XG4gICAgICByZXR1cm4gY3JlYXRlUG9wcGVyKHRoaXMuX2VsZW1lbnQsIHRpcCwgdGhpcy5fZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpKTtcbiAgICB9XG4gICAgX2dldE9mZnNldCgpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgb2Zmc2V0XG4gICAgICB9ID0gdGhpcy5fY29uZmlnO1xuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvZmZzZXQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHBvcHBlckRhdGEgPT4gb2Zmc2V0KHBvcHBlckRhdGEsIHRoaXMuX2VsZW1lbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICB9XG4gICAgX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIGV4ZWN1dGUoYXJnLCBbdGhpcy5fZWxlbWVudF0pO1xuICAgIH1cbiAgICBfZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRCc1BvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiBhdHRhY2htZW50LFxuICAgICAgICBtb2RpZmllcnM6IFt7XG4gICAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGZhbGxiYWNrUGxhY2VtZW50czogdGhpcy5fY29uZmlnLmZhbGxiYWNrUGxhY2VtZW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5fZ2V0T2Zmc2V0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ2Fycm93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBlbGVtZW50OiBgLiR7dGhpcy5jb25zdHJ1Y3Rvci5OQU1FfS1hcnJvd2BcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAncHJlU2V0UGxhY2VtZW50JyxcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHBoYXNlOiAnYmVmb3JlTWFpbicsXG4gICAgICAgICAgZm46IGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gUHJlLXNldCBQb3BwZXIncyBwbGFjZW1lbnQgYXR0cmlidXRlIGluIG9yZGVyIHRvIHJlYWQgdGhlIGFycm93IHNpemVzIHByb3Blcmx5LlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBQb3BwZXIgbWl4ZXMgdXAgdGhlIHdpZHRoIGFuZCBoZWlnaHQgZGltZW5zaW9ucyBzaW5jZSB0aGUgaW5pdGlhbCBhcnJvdyBzdHlsZSBpcyBmb3IgdG9wIHBsYWNlbWVudFxuICAgICAgICAgICAgdGhpcy5fZ2V0VGlwRWxlbWVudCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItcGxhY2VtZW50JywgZGF0YS5zdGF0ZS5wbGFjZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5kZWZhdWx0QnNQb3BwZXJDb25maWcsXG4gICAgICAgIC4uLmV4ZWN1dGUodGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZywgW2RlZmF1bHRCc1BvcHBlckNvbmZpZ10pXG4gICAgICB9O1xuICAgIH1cbiAgICBfc2V0TGlzdGVuZXJzKCkge1xuICAgICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLl9jb25maWcudHJpZ2dlci5zcGxpdCgnICcpO1xuICAgICAgZm9yIChjb25zdCB0cmlnZ2VyIG9mIHRyaWdnZXJzKSB7XG4gICAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0NMSUNLJDEpLCB0aGlzLl9jb25maWcuc2VsZWN0b3IsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpO1xuICAgICAgICAgICAgY29udGV4dC50b2dnbGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSBUUklHR0VSX01BTlVBTCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50SW4gPSB0cmlnZ2VyID09PSBUUklHR0VSX0hPVkVSID8gdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfTU9VU0VFTlRFUikgOiB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9GT0NVU0lOJDEpO1xuICAgICAgICAgIGNvbnN0IGV2ZW50T3V0ID0gdHJpZ2dlciA9PT0gVFJJR0dFUl9IT1ZFUiA/IHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX01PVVNFTEVBVkUpIDogdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfRk9DVVNPVVQkMSk7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQsIGV2ZW50SW4sIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudCk7XG4gICAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRSSUdHRVJfRk9DVVMgOiBUUklHR0VSX0hPVkVSXSA9IHRydWU7XG4gICAgICAgICAgICBjb250ZXh0Ll9lbnRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBldmVudE91dCwgdGhpcy5fY29uZmlnLnNlbGVjdG9yLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5faW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KTtcbiAgICAgICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0JyA/IFRSSUdHRVJfRk9DVVMgOiBUUklHR0VSX0hPVkVSXSA9IGNvbnRleHQuX2VsZW1lbnQuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgICBjb250ZXh0Ll9sZWF2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2VsZW1lbnQuY2xvc2VzdChTRUxFQ1RPUl9NT0RBTCksIEVWRU5UX01PREFMX0hJREUsIHRoaXMuX2hpZGVNb2RhbEhhbmRsZXIpO1xuICAgIH1cbiAgICBfZml4VGl0bGUoKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgJiYgIXRoaXMuX2VsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGl0bGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnLCB0aXRsZSk7IC8vIERPIE5PVCBVU0UgSVQuIElzIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGl0bGUnKTtcbiAgICB9XG4gICAgX2VudGVyKCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2hvd24oKSB8fCB0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3NldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMuX2NvbmZpZy5kZWxheS5zaG93KTtcbiAgICB9XG4gICAgX2xlYXZlKCkge1xuICAgICAgaWYgKHRoaXMuX2lzV2l0aEFjdGl2ZVRyaWdnZXIoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkuaGlkZSk7XG4gICAgfVxuICAgIF9zZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpO1xuICAgIH1cbiAgICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuX2FjdGl2ZVRyaWdnZXIpLmluY2x1ZGVzKHRydWUpO1xuICAgIH1cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uc3QgZGF0YUF0dHJpYnV0ZXMgPSBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlcyh0aGlzLl9lbGVtZW50KTtcbiAgICAgIGZvciAoY29uc3QgZGF0YUF0dHJpYnV0ZSBvZiBPYmplY3Qua2V5cyhkYXRhQXR0cmlidXRlcykpIHtcbiAgICAgICAgaWYgKERJU0FMTE9XRURfQVRUUklCVVRFUy5oYXMoZGF0YUF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICBkZWxldGUgZGF0YUF0dHJpYnV0ZXNbZGF0YUF0dHJpYnV0ZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgLi4uZGF0YUF0dHJpYnV0ZXMsXG4gICAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSlcbiAgICAgIH07XG4gICAgICBjb25maWcgPSB0aGlzLl9tZXJnZUNvbmZpZ09iaihjb25maWcpO1xuICAgICAgY29uZmlnID0gdGhpcy5fY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpO1xuICAgICAgdGhpcy5fdHlwZUNoZWNrQ29uZmlnKGNvbmZpZyk7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAgIGNvbmZpZy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyID09PSBmYWxzZSA/IGRvY3VtZW50LmJvZHkgOiBnZXRFbGVtZW50KGNvbmZpZy5jb250YWluZXIpO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWcuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmZpZy5kZWxheSA9IHtcbiAgICAgICAgICBzaG93OiBjb25maWcuZGVsYXksXG4gICAgICAgICAgaGlkZTogY29uZmlnLmRlbGF5XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5jb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25maWcuY29udGVudCA9IGNvbmZpZy5jb250ZW50LnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBfZ2V0RGVsZWdhdGVDb25maWcoKSB7XG4gICAgICBjb25zdCBjb25maWcgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZykpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB2YWx1ZSkge1xuICAgICAgICAgIGNvbmZpZ1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbmZpZy5zZWxlY3RvciA9IGZhbHNlO1xuICAgICAgY29uZmlnLnRyaWdnZXIgPSAnbWFudWFsJztcblxuICAgICAgLy8gSW4gdGhlIGZ1dHVyZSBjYW4gYmUgcmVwbGFjZWQgd2l0aDpcbiAgICAgIC8vIGNvbnN0IGtleXNXaXRoRGlmZmVyZW50VmFsdWVzID0gT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKS5maWx0ZXIoZW50cnkgPT4gdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2VudHJ5WzBdXSAhPT0gdGhpcy5fY29uZmlnW2VudHJ5WzBdXSlcbiAgICAgIC8vIGBPYmplY3QuZnJvbUVudHJpZXMoa2V5c1dpdGhEaWZmZXJlbnRWYWx1ZXMpYFxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG4gICAgX2Rpc3Bvc2VQb3BwZXIoKSB7XG4gICAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50aXApIHtcbiAgICAgICAgdGhpcy50aXAucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMudGlwID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBUb29sdGlwLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogalF1ZXJ5XG4gICAqL1xuXG4gIGRlZmluZUpRdWVyeVBsdWdpbihUb29sdGlwKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHBvcG92ZXIuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FJDMgPSAncG9wb3Zlcic7XG4gIGNvbnN0IFNFTEVDVE9SX1RJVExFID0gJy5wb3BvdmVyLWhlYWRlcic7XG4gIGNvbnN0IFNFTEVDVE9SX0NPTlRFTlQgPSAnLnBvcG92ZXItYm9keSc7XG4gIGNvbnN0IERlZmF1bHQkMiA9IHtcbiAgICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gICAgY29udGVudDogJycsXG4gICAgb2Zmc2V0OiBbMCwgOF0sXG4gICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPicgKyAnPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3dcIj48L2Rpdj4nICsgJzxoMyBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCI+PC9oMz4nICsgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIj48L2Rpdj4nICsgJzwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2NsaWNrJ1xuICB9O1xuICBjb25zdCBEZWZhdWx0VHlwZSQyID0ge1xuICAgIC4uLlRvb2x0aXAuRGVmYXVsdFR5cGUsXG4gICAgY29udGVudDogJyhudWxsfHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKSdcbiAgfTtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBQb3BvdmVyIGV4dGVuZHMgVG9vbHRpcCB7XG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0JDI7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGUkMjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUUkMztcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZXNcbiAgICBfaXNXaXRoQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG4gICAgX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtTRUxFQ1RPUl9USVRMRV06IHRoaXMuX2dldFRpdGxlKCksXG4gICAgICAgIFtTRUxFQ1RPUl9DT05URU5UXTogdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgICB9O1xuICAgIH1cbiAgICBfZ2V0Q29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbih0aGlzLl9jb25maWcuY29udGVudCk7XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG4gICAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gUG9wb3Zlci5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oUG9wb3Zlcik7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCBzY3JvbGxzcHkuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FJDIgPSAnc2Nyb2xsc3B5JztcbiAgY29uc3QgREFUQV9LRVkkMiA9ICdicy5zY3JvbGxzcHknO1xuICBjb25zdCBFVkVOVF9LRVkkMiA9IGAuJHtEQVRBX0tFWSQyfWA7XG4gIGNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICBjb25zdCBFVkVOVF9BQ1RJVkFURSA9IGBhY3RpdmF0ZSR7RVZFTlRfS0VZJDJ9YDtcbiAgY29uc3QgRVZFTlRfQ0xJQ0sgPSBgY2xpY2ske0VWRU5UX0tFWSQyfWA7XG4gIGNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkkMSA9IGBsb2FkJHtFVkVOVF9LRVkkMn0ke0RBVEFfQVBJX0tFWX1gO1xuICBjb25zdCBDTEFTU19OQU1FX0RST1BET1dOX0lURU0gPSAnZHJvcGRvd24taXRlbSc7XG4gIGNvbnN0IENMQVNTX05BTUVfQUNUSVZFJDEgPSAnYWN0aXZlJztcbiAgY29uc3QgU0VMRUNUT1JfREFUQV9TUFkgPSAnW2RhdGEtYnMtc3B5PVwic2Nyb2xsXCJdJztcbiAgY29uc3QgU0VMRUNUT1JfVEFSR0VUX0xJTktTID0gJ1tocmVmXSc7XG4gIGNvbnN0IFNFTEVDVE9SX05BVl9MSVNUX0dST1VQID0gJy5uYXYsIC5saXN0LWdyb3VwJztcbiAgY29uc3QgU0VMRUNUT1JfTkFWX0xJTktTID0gJy5uYXYtbGluayc7XG4gIGNvbnN0IFNFTEVDVE9SX05BVl9JVEVNUyA9ICcubmF2LWl0ZW0nO1xuICBjb25zdCBTRUxFQ1RPUl9MSVNUX0lURU1TID0gJy5saXN0LWdyb3VwLWl0ZW0nO1xuICBjb25zdCBTRUxFQ1RPUl9MSU5LX0lURU1TID0gYCR7U0VMRUNUT1JfTkFWX0xJTktTfSwgJHtTRUxFQ1RPUl9OQVZfSVRFTVN9ID4gJHtTRUxFQ1RPUl9OQVZfTElOS1N9LCAke1NFTEVDVE9SX0xJU1RfSVRFTVN9YDtcbiAgY29uc3QgU0VMRUNUT1JfRFJPUERPV04gPSAnLmRyb3Bkb3duJztcbiAgY29uc3QgU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFJDEgPSAnLmRyb3Bkb3duLXRvZ2dsZSc7XG4gIGNvbnN0IERlZmF1bHQkMSA9IHtcbiAgICBvZmZzZXQ6IG51bGwsXG4gICAgLy8gVE9ETzogdjYgQGRlcHJlY2F0ZWQsIGtlZXAgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHJlYXNvbnNcbiAgICByb290TWFyZ2luOiAnMHB4IDBweCAtMjUlJyxcbiAgICBzbW9vdGhTY3JvbGw6IGZhbHNlLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICB0aHJlc2hvbGQ6IFswLjEsIDAuNSwgMV1cbiAgfTtcbiAgY29uc3QgRGVmYXVsdFR5cGUkMSA9IHtcbiAgICBvZmZzZXQ6ICcobnVtYmVyfG51bGwpJyxcbiAgICAvLyBUT0RPIHY2IEBkZXByZWNhdGVkLCBrZWVwIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSByZWFzb25zXG4gICAgcm9vdE1hcmdpbjogJ3N0cmluZycsXG4gICAgc21vb3RoU2Nyb2xsOiAnYm9vbGVhbicsXG4gICAgdGFyZ2V0OiAnZWxlbWVudCcsXG4gICAgdGhyZXNob2xkOiAnYXJyYXknXG4gIH07XG5cbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgU2Nyb2xsU3B5IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuXG4gICAgICAvLyB0aGlzLl9lbGVtZW50IGlzIHRoZSBvYnNlcnZhYmxlc0NvbnRhaW5lciBhbmQgY29uZmlnLnRhcmdldCB0aGUgbWVudSBsaW5rcyB3cmFwcGVyXG4gICAgICB0aGlzLl90YXJnZXRMaW5rcyA9IG5ldyBNYXAoKTtcbiAgICAgIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50KS5vdmVyZmxvd1kgPT09ICd2aXNpYmxlJyA/IG51bGwgOiB0aGlzLl9lbGVtZW50O1xuICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIHRoaXMuX29ic2VydmVyID0gbnVsbDtcbiAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YSA9IHtcbiAgICAgICAgdmlzaWJsZUVudHJ5VG9wOiAwLFxuICAgICAgICBwYXJlbnRTY3JvbGxUb3A6IDBcbiAgICAgIH07XG4gICAgICB0aGlzLnJlZnJlc2goKTsgLy8gaW5pdGlhbGl6ZVxuICAgIH1cblxuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdCQxO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlJDE7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJDI7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVUYXJnZXRzQW5kT2JzZXJ2YWJsZXMoKTtcbiAgICAgIHRoaXMuX21heWJlRW5hYmxlU21vb3RoU2Nyb2xsKCk7XG4gICAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSB0aGlzLl9nZXROZXdPYnNlcnZlcigpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHRoaXMuX29ic2VydmFibGVTZWN0aW9ucy52YWx1ZXMoKSkge1xuICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHNlY3Rpb24pO1xuICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcbiAgICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAgIC8vIFRPRE86IG9uIHY2IHRhcmdldCBzaG91bGQgYmUgZ2l2ZW4gZXhwbGljaXRseSAmIHJlbW92ZSB0aGUge3RhcmdldDogJ3NzLXRhcmdldCd9IGNhc2VcbiAgICAgIGNvbmZpZy50YXJnZXQgPSBnZXRFbGVtZW50KGNvbmZpZy50YXJnZXQpIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgIC8vIFRPRE86IHY2IE9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHJlYXNvbnMuIFVzZSByb290TWFyZ2luIG9ubHlcbiAgICAgIGNvbmZpZy5yb290TWFyZ2luID0gY29uZmlnLm9mZnNldCA/IGAke2NvbmZpZy5vZmZzZXR9cHggMHB4IC0zMCVgIDogY29uZmlnLnJvb3RNYXJnaW47XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50aHJlc2hvbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbmZpZy50aHJlc2hvbGQgPSBjb25maWcudGhyZXNob2xkLnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBfbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwoKSB7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1bnJlZ2lzdGVyIGFueSBwcmV2aW91cyBsaXN0ZW5lcnNcbiAgICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fY29uZmlnLnRhcmdldCwgRVZFTlRfQ0xJQ0spO1xuICAgICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2NvbmZpZy50YXJnZXQsIEVWRU5UX0NMSUNLLCBTRUxFQ1RPUl9UQVJHRVRfTElOS1MsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZVNlY3Rpb24gPSB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMuZ2V0KGV2ZW50LnRhcmdldC5oYXNoKTtcbiAgICAgICAgaWYgKG9ic2VydmFibGVTZWN0aW9uKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5fcm9vdEVsZW1lbnQgfHwgd2luZG93O1xuICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG9ic2VydmFibGVTZWN0aW9uLm9mZnNldFRvcCAtIHRoaXMuX2VsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgIGlmIChyb290LnNjcm9sbFRvKSB7XG4gICAgICAgICAgICByb290LnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgdG9wOiBoZWlnaHQsXG4gICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2hyb21lIDYwIGRvZXNuJ3Qgc3VwcG9ydCBgc2Nyb2xsVG9gXG4gICAgICAgICAgcm9vdC5zY3JvbGxUb3AgPSBoZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0TmV3T2JzZXJ2ZXIoKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICByb290OiB0aGlzLl9yb290RWxlbWVudCxcbiAgICAgICAgdGhyZXNob2xkOiB0aGlzLl9jb25maWcudGhyZXNob2xkLFxuICAgICAgICByb290TWFyZ2luOiB0aGlzLl9jb25maWcucm9vdE1hcmdpblxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB0aGlzLl9vYnNlcnZlckNhbGxiYWNrKGVudHJpZXMpLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgbG9naWMgb2Ygc2VsZWN0aW9uXG4gICAgX29ic2VydmVyQ2FsbGJhY2soZW50cmllcykge1xuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGVudHJ5ID0+IHRoaXMuX3RhcmdldExpbmtzLmdldChgIyR7ZW50cnkudGFyZ2V0LmlkfWApO1xuICAgICAgY29uc3QgYWN0aXZhdGUgPSBlbnRyeSA9PiB7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS52aXNpYmxlRW50cnlUb3AgPSBlbnRyeS50YXJnZXQub2Zmc2V0VG9wO1xuICAgICAgICB0aGlzLl9wcm9jZXNzKHRhcmdldEVsZW1lbnQoZW50cnkpKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBwYXJlbnRTY3JvbGxUb3AgPSAodGhpcy5fcm9vdEVsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zY3JvbGxUb3A7XG4gICAgICBjb25zdCB1c2VyU2Nyb2xsc0Rvd24gPSBwYXJlbnRTY3JvbGxUb3AgPj0gdGhpcy5fcHJldmlvdXNTY3JvbGxEYXRhLnBhcmVudFNjcm9sbFRvcDtcbiAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS5wYXJlbnRTY3JvbGxUb3AgPSBwYXJlbnRTY3JvbGxUb3A7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgaWYgKCFlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fY2xlYXJBY3RpdmVDbGFzcyh0YXJnZXRFbGVtZW50KGVudHJ5KSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW50cnlJc0xvd2VyVGhhblByZXZpb3VzID0gZW50cnkudGFyZ2V0Lm9mZnNldFRvcCA+PSB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEudmlzaWJsZUVudHJ5VG9wO1xuICAgICAgICAvLyBpZiB3ZSBhcmUgc2Nyb2xsaW5nIGRvd24sIHBpY2sgdGhlIGJpZ2dlciBvZmZzZXRUb3BcbiAgICAgICAgaWYgKHVzZXJTY3JvbGxzRG93biAmJiBlbnRyeUlzTG93ZXJUaGFuUHJldmlvdXMpIHtcbiAgICAgICAgICBhY3RpdmF0ZShlbnRyeSk7XG4gICAgICAgICAgLy8gaWYgcGFyZW50IGlzbid0IHNjcm9sbGVkLCBsZXQncyBrZWVwIHRoZSBmaXJzdCB2aXNpYmxlIGl0ZW0sIGJyZWFraW5nIHRoZSBpdGVyYXRpb25cbiAgICAgICAgICBpZiAoIXBhcmVudFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGFyZSBzY3JvbGxpbmcgdXAsIHBpY2sgdGhlIHNtYWxsZXN0IG9mZnNldFRvcFxuICAgICAgICBpZiAoIXVzZXJTY3JvbGxzRG93biAmJiAhZW50cnlJc0xvd2VyVGhhblByZXZpb3VzKSB7XG4gICAgICAgICAgYWN0aXZhdGUoZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIF9pbml0aWFsaXplVGFyZ2V0c0FuZE9ic2VydmFibGVzKCkge1xuICAgICAgdGhpcy5fdGFyZ2V0TGlua3MgPSBuZXcgTWFwKCk7XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICBjb25zdCB0YXJnZXRMaW5rcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfVEFSR0VUX0xJTktTLCB0aGlzLl9jb25maWcudGFyZ2V0KTtcbiAgICAgIGZvciAoY29uc3QgYW5jaG9yIG9mIHRhcmdldExpbmtzKSB7XG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBhbmNob3IgaGFzIGFuIGlkIGFuZCBpcyBub3QgZGlzYWJsZWRcbiAgICAgICAgaWYgKCFhbmNob3IuaGFzaCB8fCBpc0Rpc2FibGVkKGFuY2hvcikpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlU2VjdGlvbiA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoZGVjb2RlVVJJKGFuY2hvci5oYXNoKSwgdGhpcy5fZWxlbWVudCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIG9ic2VydmFibGVTZWN0aW9uIGV4aXN0cyAmIGlzIHZpc2libGVcbiAgICAgICAgaWYgKGlzVmlzaWJsZShvYnNlcnZhYmxlU2VjdGlvbikpIHtcbiAgICAgICAgICB0aGlzLl90YXJnZXRMaW5rcy5zZXQoZGVjb2RlVVJJKGFuY2hvci5oYXNoKSwgYW5jaG9yKTtcbiAgICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMuc2V0KGFuY2hvci5oYXNoLCBvYnNlcnZhYmxlU2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgX3Byb2Nlc3ModGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5fYWN0aXZlVGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2xlYXJBY3RpdmVDbGFzcyh0aGlzLl9jb25maWcudGFyZ2V0KTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgICAgdGhpcy5fYWN0aXZhdGVQYXJlbnRzKHRhcmdldCk7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9BQ1RJVkFURSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICAgIH0pO1xuICAgIH1cbiAgICBfYWN0aXZhdGVQYXJlbnRzKHRhcmdldCkge1xuICAgICAgLy8gQWN0aXZhdGUgZHJvcGRvd24gcGFyZW50c1xuICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgICBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSQxLCB0YXJnZXQuY2xvc2VzdChTRUxFQ1RPUl9EUk9QRE9XTikpLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUkMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgbGlzdEdyb3VwIG9mIFNlbGVjdG9yRW5naW5lLnBhcmVudHModGFyZ2V0LCBTRUxFQ1RPUl9OQVZfTElTVF9HUk9VUCkpIHtcbiAgICAgICAgLy8gU2V0IHRyaWdnZXJlZCBsaW5rcyBwYXJlbnRzIGFzIGFjdGl2ZVxuICAgICAgICAvLyBXaXRoIGJvdGggPHVsPiBhbmQgPG5hdj4gbWFya3VwIGEgcGFyZW50IGlzIHRoZSBwcmV2aW91cyBzaWJsaW5nIG9mIGFueSBuYXYgYW5jZXN0b3JcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIFNlbGVjdG9yRW5naW5lLnByZXYobGlzdEdyb3VwLCBTRUxFQ1RPUl9MSU5LX0lURU1TKSkge1xuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0FDVElWRSQxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBfY2xlYXJBY3RpdmVDbGFzcyhwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgICAgY29uc3QgYWN0aXZlTm9kZXMgPSBTZWxlY3RvckVuZ2luZS5maW5kKGAke1NFTEVDVE9SX1RBUkdFVF9MSU5LU30uJHtDTEFTU19OQU1FX0FDVElWRSQxfWAsIHBhcmVudCk7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgYWN0aXZlTm9kZXMpIHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFJDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuICAgIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFNjcm9sbFNweS5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gICAqL1xuXG4gIEV2ZW50SGFuZGxlci5vbih3aW5kb3csIEVWRU5UX0xPQURfREFUQV9BUEkkMSwgKCkgPT4ge1xuICAgIGZvciAoY29uc3Qgc3B5IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9TUFkpKSB7XG4gICAgICBTY3JvbGxTcHkuZ2V0T3JDcmVhdGVJbnN0YW5jZShzcHkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oU2Nyb2xsU3B5KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHRhYi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUkMSA9ICd0YWInO1xuICBjb25zdCBEQVRBX0tFWSQxID0gJ2JzLnRhYic7XG4gIGNvbnN0IEVWRU5UX0tFWSQxID0gYC4ke0RBVEFfS0VZJDF9YDtcbiAgY29uc3QgRVZFTlRfSElERSQxID0gYGhpZGUke0VWRU5UX0tFWSQxfWA7XG4gIGNvbnN0IEVWRU5UX0hJRERFTiQxID0gYGhpZGRlbiR7RVZFTlRfS0VZJDF9YDtcbiAgY29uc3QgRVZFTlRfU0hPVyQxID0gYHNob3cke0VWRU5UX0tFWSQxfWA7XG4gIGNvbnN0IEVWRU5UX1NIT1dOJDEgPSBgc2hvd24ke0VWRU5UX0tFWSQxfWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVkkMX1gO1xuICBjb25zdCBFVkVOVF9LRVlET1dOID0gYGtleWRvd24ke0VWRU5UX0tFWSQxfWA7XG4gIGNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkgPSBgbG9hZCR7RVZFTlRfS0VZJDF9YDtcbiAgY29uc3QgQVJST1dfTEVGVF9LRVkgPSAnQXJyb3dMZWZ0JztcbiAgY29uc3QgQVJST1dfUklHSFRfS0VZID0gJ0Fycm93UmlnaHQnO1xuICBjb25zdCBBUlJPV19VUF9LRVkgPSAnQXJyb3dVcCc7XG4gIGNvbnN0IEFSUk9XX0RPV05fS0VZID0gJ0Fycm93RG93bic7XG4gIGNvbnN0IEhPTUVfS0VZID0gJ0hvbWUnO1xuICBjb25zdCBFTkRfS0VZID0gJ0VuZCc7XG4gIGNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSc7XG4gIGNvbnN0IENMQVNTX05BTUVfRkFERSQxID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1ckMSA9ICdzaG93JztcbiAgY29uc3QgQ0xBU1NfRFJPUERPV04gPSAnZHJvcGRvd24nO1xuICBjb25zdCBTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEUgPSAnLmRyb3Bkb3duLXRvZ2dsZSc7XG4gIGNvbnN0IFNFTEVDVE9SX0RST1BET1dOX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnO1xuICBjb25zdCBOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gYDpub3QoJHtTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEV9KWA7XG4gIGNvbnN0IFNFTEVDVE9SX1RBQl9QQU5FTCA9ICcubGlzdC1ncm91cCwgLm5hdiwgW3JvbGU9XCJ0YWJsaXN0XCJdJztcbiAgY29uc3QgU0VMRUNUT1JfT1VURVIgPSAnLm5hdi1pdGVtLCAubGlzdC1ncm91cC1pdGVtJztcbiAgY29uc3QgU0VMRUNUT1JfSU5ORVIgPSBgLm5hdi1saW5rJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSwgLmxpc3QtZ3JvdXAtaXRlbSR7Tk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRX0sIFtyb2xlPVwidGFiXCJdJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfWA7XG4gIGNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFID0gJ1tkYXRhLWJzLXRvZ2dsZT1cInRhYlwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwicGlsbFwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwibGlzdFwiXSc7IC8vIFRPRE86IGNvdWxkIG9ubHkgYmUgYHRhYmAgaW4gdjZcbiAgY29uc3QgU0VMRUNUT1JfSU5ORVJfRUxFTSA9IGAke1NFTEVDVE9SX0lOTkVSfSwgJHtTRUxFQ1RPUl9EQVRBX1RPR0dMRX1gO1xuICBjb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRV9BQ1RJVkUgPSBgLiR7Q0xBU1NfTkFNRV9BQ1RJVkV9W2RhdGEtYnMtdG9nZ2xlPVwidGFiXCJdLCAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJwaWxsXCJdLCAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJsaXN0XCJdYDtcblxuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBUYWIgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICBzdXBlcihlbGVtZW50KTtcbiAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQuY2xvc2VzdChTRUxFQ1RPUl9UQUJfUEFORUwpO1xuICAgICAgaWYgKCF0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBUT0RPOiBzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGluIHY2XG4gICAgICAgIC8vIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7ZWxlbWVudC5vdXRlckhUTUx9IGhhcyBub3QgYSB2YWxpZCBwYXJlbnQgJHtTRUxFQ1RPUl9JTk5FUl9FTEVNfWApXG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB1cCBpbml0aWFsIGFyaWEgYXR0cmlidXRlc1xuICAgICAgdGhpcy5fc2V0SW5pdGlhbEF0dHJpYnV0ZXModGhpcy5fcGFyZW50LCB0aGlzLl9nZXRDaGlsZHJlbigpKTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9LRVlET1dOLCBldmVudCA9PiB0aGlzLl9rZXlkb3duKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FJDE7XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG4gICAgc2hvdygpIHtcbiAgICAgIC8vIFNob3dzIHRoaXMgZWxlbSBhbmQgZGVhY3RpdmF0ZSB0aGUgYWN0aXZlIHNpYmxpbmcgaWYgZXhpc3RzXG4gICAgICBjb25zdCBpbm5lckVsZW0gPSB0aGlzLl9lbGVtZW50O1xuICAgICAgaWYgKHRoaXMuX2VsZW1Jc0FjdGl2ZShpbm5lckVsZW0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoIGZvciBhY3RpdmUgdGFiIG9uIHNhbWUgcGFyZW50IHRvIGRlYWN0aXZhdGUgaXRcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuX2dldEFjdGl2ZUVsZW0oKTtcbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9IGFjdGl2ZSA/IEV2ZW50SGFuZGxlci50cmlnZ2VyKGFjdGl2ZSwgRVZFTlRfSElERSQxLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IGlubmVyRWxlbVxuICAgICAgfSkgOiBudWxsO1xuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIoaW5uZXJFbGVtLCBFVkVOVF9TSE9XJDEsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogYWN0aXZlXG4gICAgICB9KTtcbiAgICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCBoaWRlRXZlbnQgJiYgaGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGVhY3RpdmF0ZShhY3RpdmUsIGlubmVyRWxlbSk7XG4gICAgICB0aGlzLl9hY3RpdmF0ZShpbm5lckVsZW0sIGFjdGl2ZSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuICAgIF9hY3RpdmF0ZShlbGVtZW50LCByZWxhdGVkRWxlbSkge1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0FDVElWRSk7XG4gICAgICB0aGlzLl9hY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKTsgLy8gU2VhcmNoIGFuZCBhY3RpdmF0ZS9zaG93IHRoZSBwcm9wZXIgc2VjdGlvblxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICd0YWInKSB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyQxKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIHRydWUpO1xuICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihlbGVtZW50LCBFVkVOVF9TSE9XTiQxLCB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldDogcmVsYXRlZEVsZW1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgZWxlbWVudCwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9GQURFJDEpKTtcbiAgICB9XG4gICAgX2RlYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9BQ1RJVkUpO1xuICAgICAgZWxlbWVudC5ibHVyKCk7XG4gICAgICB0aGlzLl9kZWFjdGl2YXRlKFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCkpOyAvLyBTZWFyY2ggYW5kIGRlYWN0aXZhdGUgdGhlIHNob3duIHNlY3Rpb24gdG9vXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ3RhYicpIHtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XJDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgIHRoaXMuX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIoZWxlbWVudCwgRVZFTlRfSElEREVOJDEsIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkRWxlbVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCBlbGVtZW50LCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUkMSkpO1xuICAgIH1cbiAgICBfa2V5ZG93bihldmVudCkge1xuICAgICAgaWYgKCFbQVJST1dfTEVGVF9LRVksIEFSUk9XX1JJR0hUX0tFWSwgQVJST1dfVVBfS0VZLCBBUlJPV19ET1dOX0tFWSwgSE9NRV9LRVksIEVORF9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIHN0b3BQcm9wYWdhdGlvbi9wcmV2ZW50RGVmYXVsdCBib3RoIGFkZGVkIHRvIHN1cHBvcnQgdXAvZG93biBrZXlzIHdpdGhvdXQgc2Nyb2xsaW5nIHRoZSBwYWdlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9nZXRDaGlsZHJlbigpLmZpbHRlcihlbGVtZW50ID0+ICFpc0Rpc2FibGVkKGVsZW1lbnQpKTtcbiAgICAgIGxldCBuZXh0QWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChbSE9NRV9LRVksIEVORF9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQgPSBjaGlsZHJlbltldmVudC5rZXkgPT09IEhPTUVfS0VZID8gMCA6IGNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaXNOZXh0ID0gW0FSUk9XX1JJR0hUX0tFWSwgQVJST1dfRE9XTl9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSk7XG4gICAgICAgIG5leHRBY3RpdmVFbGVtZW50ID0gZ2V0TmV4dEFjdGl2ZUVsZW1lbnQoY2hpbGRyZW4sIGV2ZW50LnRhcmdldCwgaXNOZXh0LCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0QWN0aXZlRWxlbWVudCkge1xuICAgICAgICBuZXh0QWN0aXZlRWxlbWVudC5mb2N1cyh7XG4gICAgICAgICAgcHJldmVudFNjcm9sbDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UobmV4dEFjdGl2ZUVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX2dldENoaWxkcmVuKCkge1xuICAgICAgLy8gY29sbGVjdGlvbiBvZiBpbm5lciBlbGVtZW50c1xuICAgICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSU5ORVJfRUxFTSwgdGhpcy5fcGFyZW50KTtcbiAgICB9XG4gICAgX2dldEFjdGl2ZUVsZW0oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0Q2hpbGRyZW4oKS5maW5kKGNoaWxkID0+IHRoaXMuX2VsZW1Jc0FjdGl2ZShjaGlsZCkpIHx8IG51bGw7XG4gICAgfVxuICAgIF9zZXRJbml0aWFsQXR0cmlidXRlcyhwYXJlbnQsIGNoaWxkcmVuKSB7XG4gICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhwYXJlbnQsICdyb2xlJywgJ3RhYmxpc3QnKTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fc2V0SW5pdGlhbEF0dHJpYnV0ZXNPbkNoaWxkKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZChjaGlsZCkge1xuICAgICAgY2hpbGQgPSB0aGlzLl9nZXRJbm5lckVsZW1lbnQoY2hpbGQpO1xuICAgICAgY29uc3QgaXNBY3RpdmUgPSB0aGlzLl9lbGVtSXNBY3RpdmUoY2hpbGQpO1xuICAgICAgY29uc3Qgb3V0ZXJFbGVtID0gdGhpcy5fZ2V0T3V0ZXJFbGVtZW50KGNoaWxkKTtcbiAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGlzQWN0aXZlKTtcbiAgICAgIGlmIChvdXRlckVsZW0gIT09IGNoaWxkKSB7XG4gICAgICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKG91dGVyRWxlbSwgJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKGNoaWxkLCAncm9sZScsICd0YWInKTtcblxuICAgICAgLy8gc2V0IGF0dHJpYnV0ZXMgdG8gdGhlIHJlbGF0ZWQgcGFuZWwgdG9vXG4gICAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlc09uVGFyZ2V0UGFuZWwoY2hpbGQpO1xuICAgIH1cbiAgICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXNPblRhcmdldFBhbmVsKGNoaWxkKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGNoaWxkKTtcbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHRhcmdldCwgJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICAgIGlmIChjaGlsZC5pZCkge1xuICAgICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyh0YXJnZXQsICdhcmlhLWxhYmVsbGVkYnknLCBgJHtjaGlsZC5pZH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIG9wZW4pIHtcbiAgICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChlbGVtZW50KTtcbiAgICAgIGlmICghb3V0ZXJFbGVtLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19EUk9QRE9XTikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdG9nZ2xlID0gKHNlbGVjdG9yLCBjbGFzc05hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoc2VsZWN0b3IsIG91dGVyRWxlbSk7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSwgb3Blbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFLCBDTEFTU19OQU1FX0FDVElWRSk7XG4gICAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fTUVOVSwgQ0xBU1NfTkFNRV9TSE9XJDEpO1xuICAgICAgb3V0ZXJFbGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4pO1xuICAgIH1cbiAgICBfc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBfZWxlbUlzQWN0aXZlKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0FDVElWRSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIGdldCB0aGUgaW5uZXIgZWxlbWVudCAodXN1YWxseSB0aGUgLm5hdi1saW5rKVxuICAgIF9nZXRJbm5lckVsZW1lbnQoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0ubWF0Y2hlcyhTRUxFQ1RPUl9JTk5FUl9FTEVNKSA/IGVsZW0gOiBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX0lOTkVSX0VMRU0sIGVsZW0pO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byBnZXQgdGhlIG91dGVyIGVsZW1lbnQgKHVzdWFsbHkgdGhlIC5uYXYtaXRlbSlcbiAgICBfZ2V0T3V0ZXJFbGVtZW50KGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtLmNsb3Nlc3QoU0VMRUNUT1JfT1VURVIpIHx8IGVsZW07XG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG4gICAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gICAqL1xuXG4gIEV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoWydBJywgJ0FSRUEnXS5pbmNsdWRlcyh0aGlzLnRhZ05hbWUpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS5zaG93KCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG9uIGZvY3VzXG4gICAqL1xuICBFdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEVfQUNUSVZFKSkge1xuICAgICAgVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuICBkZWZpbmVKUXVlcnlQbHVnaW4oVGFiKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIHRvYXN0LmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSA9ICd0b2FzdCc7XG4gIGNvbnN0IERBVEFfS0VZID0gJ2JzLnRvYXN0JztcbiAgY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX01PVVNFT1ZFUiA9IGBtb3VzZW92ZXIke0VWRU5UX0tFWX1gO1xuICBjb25zdCBFVkVOVF9NT1VTRU9VVCA9IGBtb3VzZW91dCR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0ZPQ1VTSU4gPSBgZm9jdXNpbiR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0ZPQ1VTT1VUID0gYGZvY3Vzb3V0JHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgQ0xBU1NfTkFNRV9GQURFID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX0hJREUgPSAnaGlkZSc7IC8vIEBkZXByZWNhdGVkIC0ga2VwdCBoZXJlIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIGNvbnN0IENMQVNTX05BTUVfU0hPVyA9ICdzaG93JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XSU5HID0gJ3Nob3dpbmcnO1xuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgICBhdXRvaGlkZTogJ2Jvb2xlYW4nLFxuICAgIGRlbGF5OiAnbnVtYmVyJ1xuICB9O1xuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICBhdXRvaGlkZTogdHJ1ZSxcbiAgICBkZWxheTogNTAwMFxuICB9O1xuXG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIFRvYXN0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuICAgICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgICB0aGlzLl9oYXNNb3VzZUludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgICB0aGlzLl9oYXNLZXlib2FyZEludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLyBHZXR0ZXJzXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FO1xuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuICAgIHNob3coKSB7XG4gICAgICBjb25zdCBzaG93RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XKTtcbiAgICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jbGVhclRpbWVvdXQoKTtcbiAgICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1dJTkcpO1xuICAgICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTik7XG4gICAgICAgIHRoaXMuX21heWJlU2NoZWR1bGVIaWRlKCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfSElERSk7IC8vIEBkZXByZWNhdGVkXG4gICAgICByZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XLCBDTEFTU19OQU1FX1NIT1dJTkcpO1xuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdGhpcy5fY29uZmlnLmFuaW1hdGlvbik7XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUpO1xuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9ISURFKTsgLy8gQGRlcHJlY2F0ZWRcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPV0lORywgQ0xBU1NfTkFNRV9TSE9XKTtcbiAgICAgICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOKTtcbiAgICAgIH07XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XSU5HKTtcbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMuX2VsZW1lbnQsIHRoaXMuX2NvbmZpZy5hbmltYXRpb24pO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgICBpZiAodGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyk7XG4gICAgICB9XG4gICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGlzU2hvd24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XKTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfbWF5YmVTY2hlZHVsZUhpZGUoKSB7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5hdXRvaGlkZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faGFzTW91c2VJbnRlcmFjdGlvbiB8fCB0aGlzLl9oYXNLZXlib2FyZEludGVyYWN0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkpO1xuICAgIH1cbiAgICBfb25JbnRlcmFjdGlvbihldmVudCwgaXNJbnRlcmFjdGluZykge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9oYXNNb3VzZUludGVyYWN0aW9uID0gaXNJbnRlcmFjdGluZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnZm9jdXNpbic6XG4gICAgICAgIGNhc2UgJ2ZvY3Vzb3V0JzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9oYXNLZXlib2FyZEludGVyYWN0aW9uID0gaXNJbnRlcmFjdGluZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0ludGVyYWN0aW5nKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyVGltZW91dCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0RWxlbWVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudCA9PT0gbmV4dEVsZW1lbnQgfHwgdGhpcy5fZWxlbWVudC5jb250YWlucyhuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fbWF5YmVTY2hlZHVsZUhpZGUoKTtcbiAgICB9XG4gICAgX3NldExpc3RlbmVycygpIHtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9NT1VTRU9WRVIsIGV2ZW50ID0+IHRoaXMuX29uSW50ZXJhY3Rpb24oZXZlbnQsIHRydWUpKTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9NT1VTRU9VVCwgZXZlbnQgPT4gdGhpcy5fb25JbnRlcmFjdGlvbihldmVudCwgZmFsc2UpKTtcbiAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBFVkVOVF9GT0NVU0lOLCBldmVudCA9PiB0aGlzLl9vbkludGVyYWN0aW9uKGV2ZW50LCB0cnVlKSk7XG4gICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfRk9DVVNPVVQsIGV2ZW50ID0+IHRoaXMuX29uSW50ZXJhY3Rpb24oZXZlbnQsIGZhbHNlKSk7XG4gICAgfVxuICAgIF9jbGVhclRpbWVvdXQoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBUb2FzdC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVtjb25maWddKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cbiAgZW5hYmxlRGlzbWlzc1RyaWdnZXIoVG9hc3QpO1xuXG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgZGVmaW5lSlF1ZXJ5UGx1Z2luKFRvYXN0KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwIGluZGV4LnVtZC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgaW5kZXhfdW1kID0ge1xuICAgIEFsZXJ0LFxuICAgIEJ1dHRvbixcbiAgICBDYXJvdXNlbCxcbiAgICBDb2xsYXBzZSxcbiAgICBEcm9wZG93bixcbiAgICBNb2RhbCxcbiAgICBPZmZjYW52YXMsXG4gICAgUG9wb3ZlcixcbiAgICBTY3JvbGxTcHksXG4gICAgVGFiLFxuICAgIFRvYXN0LFxuICAgIFRvb2x0aXBcbiAgfTtcblxuICByZXR1cm4gaW5kZXhfdW1kO1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXAuYnVuZGxlLmpzLm1hcFxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FLQyxTQUFVLFFBQVEsU0FBUztBQUMxQixTQUFPLFlBQVksWUFBWSxPQUFPLFdBQVcsY0FBYyxPQUFPLFVBQVUsUUFBUSxJQUN4RixPQUFPLFdBQVcsY0FBYyxPQUFPLE1BQU0sT0FBTyxPQUFPLEtBQzFELFNBQVMsT0FBTyxlQUFlLGNBQWMsYUFBYSxVQUFVLE1BQU0sT0FBTyxZQUFZLFFBQVE7QUFDeEcsR0FBRyxNQUFPLFdBQVk7QUFBRTtBQWF0QixRQUFNLGFBQWEsb0JBQUksSUFBSTtBQUMzQixRQUFNLE9BQU87QUFBQSxJQUNYLElBQUksU0FBUyxLQUFLLFVBQVU7QUFDMUIsVUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLEdBQUc7QUFDNUIsbUJBQVcsSUFBSSxTQUFTLG9CQUFJLElBQUksQ0FBQztBQUFBLE1BQ25DO0FBQ0EsWUFBTSxjQUFjLFdBQVcsSUFBSSxPQUFPO0FBSTFDLFVBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxLQUFLLFlBQVksU0FBUyxHQUFHO0FBRW5ELGdCQUFRLE1BQU0sK0VBQStFLE1BQU0sS0FBSyxZQUFZLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHO0FBQ2pJO0FBQUEsTUFDRjtBQUNBLGtCQUFZLElBQUksS0FBSyxRQUFRO0FBQUEsSUFDL0I7QUFBQSxJQUNBLElBQUksU0FBUyxLQUFLO0FBQ2hCLFVBQUksV0FBVyxJQUFJLE9BQU8sR0FBRztBQUMzQixlQUFPLFdBQVcsSUFBSSxPQUFPLEVBQUUsSUFBSSxHQUFHLEtBQUs7QUFBQSxNQUM3QztBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxPQUFPLFNB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QUFDO0FBQ3ZGLG1CQUFhLEdBQUcsS0FBSyxVQUFVLGdCQUFnQixXQUFTLEtBQUssZUFBZSxPQUFPLEtBQUssQ0FBQztBQUFBLElBQzNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFDZCxtQkFBYSxLQUFLLFFBQVE7QUFDMUIsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFBQTtBQUFBLElBR0EsT0FBTyxnQkFBZ0IsUUFBUTtBQUM3QixhQUFPLEtBQUssS0FBSyxXQUFZO0FBQzNCLGNBQU0sT0FBTyxNQUFNLG9CQUFvQixNQUFNLE1BQU07QUFDbkQsWUFBSSxPQUFPLFdBQVcsVUFBVTtBQUM5QixjQUFJLE9BQU8sS0FBSyxNQUFNLE1BQU0sYUFBYTtBQUN2QyxrQkFBTSxJQUFJLFVBQVUsb0JBQW9CLE1BQU0sR0FBRztBQUFBLFVBQ25EO0FBQ0EsZUFBSyxNQUFNLEVBQUUsSUFBSTtBQUFBLFFBQ25CO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFNQSx1QkFBcUIsS0FBSztBQU0xQixxQkFBbUIsS0FBSztBQVN4QixRQUFNLFlBQVk7QUFBQSxJQUNoQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFFVCxDQUFFOyIsIm5hbWVzIjpbImNhbGxiYWNrIiwiZm4iLCJvcmRlciIsIm5hbWUiLCJzdHlsZSIsIndpbmRvdyIsIm1pbiIsIm1heCIsInRvUGFkZGluZ09iamVjdCIsInBvcHBlck9mZnNldHMiLCJvZmZzZXQiLCJwb3BwZXIiLCJjbGlwcGluZ1BhcmVudHMiLCJyZWZlcmVuY2UiLCJwbGFjZW1lbnQiLCJwbGFjZW1lbnRzIiwiX2xvb3AiLCJfaSIsImNoZWNrcyIsIm1lcmdlZCIsImRlZmF1bHRNb2RpZmllcnMiLCJjcmVhdGVQb3BwZXIiLCJvcHRpb25zIiwic3RhdGUiLCJlZmZlY3QiLCJub29wRm4iLCJpc1Zpc2libGUiLCJlbGVtZW50Il19