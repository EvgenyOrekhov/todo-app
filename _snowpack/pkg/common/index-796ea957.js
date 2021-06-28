import { i as immutable } from './immutable-935f0f91.js';

var convert_1 = convert;

function convert(test) {
  if (test == null) {
    return ok;
  }

  if (typeof test === 'string') {
    return typeFactory(test);
  }

  if (typeof test === 'object') {
    return 'length' in test ? anyFactory(test) : allFactory(test);
  }

  if (typeof test === 'function') {
    return test;
  }

  throw new Error('Expected function, string, or object as test');
} // Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.


function allFactory(test) {
  return all;

  function all(node) {
    var key;

    for (key in test) {
      if (node[key] !== test[key]) return false;
    }

    return true;
  }
}

function anyFactory(tests) {
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }

  return any;

  function any() {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].apply(this, arguments)) {
        return true;
      }
    }

    return false;
  }
} // Utility to convert a string into a function which checks a given node’s type
// for said string.


function typeFactory(test) {
  return type;

  function type(node) {
    return Boolean(node && node.type === test);
  }
} // Utility to return true.


function ok() {
  return true;
}

var color_browser = identity;

function identity(d) {
  return d;
}

var unistUtilVisitParents = visitParents;





var CONTINUE = true;
var SKIP = 'skip';
var EXIT = false;
visitParents.CONTINUE = CONTINUE;
visitParents.SKIP = SKIP;
visitParents.EXIT = EXIT;

function visitParents(tree, test, visitor, reverse) {
  var step;
  var is;

  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  is = convert_1(test);
  step = reverse ? -1 : 1;
  factory(tree, null, [])();

  function factory(node, index, parents) {
    var value = typeof node === 'object' && node !== null ? node : {};
    var name;

    if (typeof value.type === 'string') {
      name = typeof value.tagName === 'string' ? value.tagName : typeof value.name === 'string' ? value.name : undefined;
      visit.displayName = 'node (' + color_browser(value.type + (name ? '<' + name + '>' : '')) + ')';
    }

    return visit;

    function visit() {
      var grandparents = parents.concat(node);
      var result = [];
      var subresult;
      var offset;

      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));

        if (result[0] === EXIT) {
          return result;
        }
      }

      if (node.children && result[0] !== SKIP) {
        offset = (reverse ? node.children.length : -1) + step;

        while (offset > -1 && offset < node.children.length) {
          subresult = factory(node.children[offset], offset, grandparents)();

          if (subresult[0] === EXIT) {
            return subresult;
          }

          offset = typeof subresult[1] === 'number' ? subresult[1] : offset + step;
        }
      }

      return result;
    }
  }
}

function toResult(value) {
  if (value !== null && typeof value === 'object' && 'length' in value) {
    return value;
  }

  if (typeof value === 'number') {
    return [CONTINUE, value];
  }

  return [value];
}

var unistUtilVisit = visit;



var CONTINUE$1 = unistUtilVisitParents.CONTINUE;
var SKIP$1 = unistUtilVisitParents.SKIP;
var EXIT$1 = unistUtilVisitParents.EXIT;
visit.CONTINUE = CONTINUE$1;
visit.SKIP = SKIP$1;
visit.EXIT = EXIT$1;

function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  unistUtilVisitParents(tree, test, overload, reverse);

  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    var index = parent ? parent.children.indexOf(node) : null;
    return visitor(node, index, parent);
  }
}

var start = factory('start');
var end = factory('end');
var unistUtilPosition = position;
position.start = start;
position.end = end;

function position(node) {
  return {
    start: start(node),
    end: end(node)
  };
}

function factory(type) {
  point.displayName = type;
  return point;

  function point(node) {
    var point = node && node.position && node.position[type] || {};
    return {
      line: point.line || null,
      column: point.column || null,
      offset: isNaN(point.offset) ? null : point.offset
    };
  }
}

var schema = Schema;
var proto = Schema.prototype;
proto.space = null;
proto.normal = {};
proto.property = {};

function Schema(property, normal, space) {
  this.property = property;
  this.normal = normal;

  if (space) {
    this.space = space;
  }
}

var merge_1 = merge;

function merge(definitions) {
  var length = definitions.length;
  var property = [];
  var normal = [];
  var index = -1;
  var info;
  var space;

  while (++index < length) {
    info = definitions[index];
    property.push(info.property);
    normal.push(info.normal);
    space = info.space;
  }

  return new schema(immutable.apply(null, property), immutable.apply(null, normal), space);
}

var normalize_1 = normalize;

function normalize(value) {
  return value.toLowerCase();
}

var info = Info;
var proto$1 = Info.prototype;
proto$1.space = null;
proto$1.attribute = null;
proto$1.property = null;
proto$1.boolean = false;
proto$1.booleanish = false;
proto$1.overloadedBoolean = false;
proto$1.number = false;
proto$1.commaSeparated = false;
proto$1.spaceSeparated = false;
proto$1.commaOrSpaceSeparated = false;
proto$1.mustUseProperty = false;
proto$1.defined = false;

function Info(property, attribute) {
  this.property = property;
  this.attribute = attribute;
}

var powers = 0;
var boolean_1 = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();

function increment() {
  return Math.pow(2, ++powers);
}

var types = {
	boolean: boolean_1,
	booleanish: booleanish,
	overloadedBoolean: overloadedBoolean,
	number: number,
	spaceSeparated: spaceSeparated,
	commaSeparated: commaSeparated,
	commaOrSpaceSeparated: commaOrSpaceSeparated
};

var definedInfo = DefinedInfo;
DefinedInfo.prototype = new info();
DefinedInfo.prototype.defined = true;
var checks = ['boolean', 'booleanish', 'overloadedBoolean', 'number', 'commaSeparated', 'spaceSeparated', 'commaOrSpaceSeparated'];
var checksLength = checks.length;

function DefinedInfo(property, attribute, mask, space) {
  var index = -1;
  var check;
  mark(this, 'space', space);
  info.call(this, property, attribute);

  while (++index < checksLength) {
    check = checks[index];
    mark(this, check, (mask & types[check]) === types[check]);
  }
}

function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}

var create_1 = create;

function create(definition) {
  var space = definition.space;
  var mustUseProperty = definition.mustUseProperty || [];
  var attributes = definition.attributes || {};
  var props = definition.properties;
  var transform = definition.transform;
  var property = {};
  var normal = {};
  var prop;
  var info;

  for (prop in props) {
    info = new definedInfo(prop, transform(attributes, prop), props[prop], space);

    if (mustUseProperty.indexOf(prop) !== -1) {
      info.mustUseProperty = true;
    }

    property[prop] = info;
    normal[normalize_1(prop)] = prop;
    normal[normalize_1(info.attribute)] = prop;
  }

  return new schema(property, normal, space);
}

var xlink = create_1({
  space: 'xlink',
  transform: xlinkTransform,
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

function xlinkTransform(_, prop) {
  return 'xlink:' + prop.slice(5).toLowerCase();
}

var xml = create_1({
  space: 'xml',
  transform: xmlTransform,
  properties: {
    xmlLang: null,
    xmlBase: null,
    xmlSpace: null
  }
});

function xmlTransform(_, prop) {
  return 'xml:' + prop.slice(3).toLowerCase();
}

var caseSensitiveTransform_1 = caseSensitiveTransform;

function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}

var caseInsensitiveTransform_1 = caseInsensitiveTransform;

function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform_1(attributes, property.toLowerCase());
}

var xmlns = create_1({
  space: 'xmlns',
  attributes: {
    xmlnsxlink: 'xmlns:xlink'
  },
  transform: caseInsensitiveTransform_1,
  properties: {
    xmlns: null,
    xmlnsXLink: null
  }
});

var booleanish$1 = types.booleanish;
var number$1 = types.number;
var spaceSeparated$1 = types.spaceSeparated;
var aria = create_1({
  transform: ariaTransform,
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish$1,
    ariaAutoComplete: null,
    ariaBusy: booleanish$1,
    ariaChecked: booleanish$1,
    ariaColCount: number$1,
    ariaColIndex: number$1,
    ariaColSpan: number$1,
    ariaControls: spaceSeparated$1,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated$1,
    ariaDetails: null,
    ariaDisabled: booleanish$1,
    ariaDropEffect: spaceSeparated$1,
    ariaErrorMessage: null,
    ariaExpanded: booleanish$1,
    ariaFlowTo: spaceSeparated$1,
    ariaGrabbed: booleanish$1,
    ariaHasPopup: null,
    ariaHidden: booleanish$1,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated$1,
    ariaLevel: number$1,
    ariaLive: null,
    ariaModal: booleanish$1,
    ariaMultiLine: booleanish$1,
    ariaMultiSelectable: booleanish$1,
    ariaOrientation: null,
    ariaOwns: spaceSeparated$1,
    ariaPlaceholder: null,
    ariaPosInSet: number$1,
    ariaPressed: booleanish$1,
    ariaReadOnly: booleanish$1,
    ariaRelevant: null,
    ariaRequired: booleanish$1,
    ariaRoleDescription: spaceSeparated$1,
    ariaRowCount: number$1,
    ariaRowIndex: number$1,
    ariaRowSpan: number$1,
    ariaSelected: booleanish$1,
    ariaSetSize: number$1,
    ariaSort: null,
    ariaValueMax: number$1,
    ariaValueMin: number$1,
    ariaValueNow: number$1,
    ariaValueText: null,
    role: null
  }
});

function ariaTransform(_, prop) {
  return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
}

var boolean = types.boolean;
var overloadedBoolean$1 = types.overloadedBoolean;
var booleanish$2 = types.booleanish;
var number$2 = types.number;
var spaceSeparated$2 = types.spaceSeparated;
var commaSeparated$1 = types.commaSeparated;
var html = create_1({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv'
  },
  transform: caseInsensitiveTransform_1,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated$1,
    acceptCharset: spaceSeparated$2,
    accessKey: spaceSeparated$2,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated$2,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated$2,
    cols: number$2,
    colSpan: null,
    content: null,
    contentEditable: booleanish$2,
    controls: boolean,
    controlsList: spaceSeparated$2,
    coords: number$2 | commaSeparated$1,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean$1,
    draggable: booleanish$2,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated$2,
    height: number$2,
    hidden: boolean,
    high: number$2,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated$2,
    httpEquiv: spaceSeparated$2,
    id: null,
    imageSizes: null,
    imageSrcSet: commaSeparated$1,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated$2,
    itemRef: spaceSeparated$2,
    itemScope: boolean,
    itemType: spaceSeparated$2,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number$2,
    manifest: null,
    max: null,
    maxLength: number$2,
    media: null,
    method: null,
    min: null,
    minLength: number$2,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextMenu: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number$2,
    pattern: null,
    ping: spaceSeparated$2,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated$2,
    required: boolean,
    reversed: boolean,
    rows: number$2,
    rowSpan: number$2,
    sandbox: spaceSeparated$2,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number$2,
    sizes: null,
    slot: null,
    span: number$2,
    spellCheck: booleanish$2,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: commaSeparated$1,
    start: number$2,
    step: null,
    style: null,
    tabIndex: number$2,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish$2,
    width: number$2,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated$2,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number$2,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number$2,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number$2,
    // `<img>` and `<object>`
    leftMargin: number$2,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number$2,
    // `<body>`
    marginWidth: number$2,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number$2,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish$2,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number$2,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number$2,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number$2,
    security: null,
    unselectable: null
  }
});

var html_1 = merge_1([xml, xlink, xmlns, aria, html]);

var boolean$1 = types.boolean;
var number$3 = types.number;
var spaceSeparated$3 = types.spaceSeparated;
var commaSeparated$2 = types.commaSeparated;
var commaOrSpaceSeparated$1 = types.commaOrSpaceSeparated;
var svg = create_1({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin'
  },
  transform: caseSensitiveTransform_1,
  properties: {
    about: commaOrSpaceSeparated$1,
    accentHeight: number$3,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number$3,
    amplitude: number$3,
    arabicForm: null,
    ascent: number$3,
    attributeName: null,
    attributeType: null,
    azimuth: number$3,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number$3,
    by: null,
    calcMode: null,
    capHeight: number$3,
    className: spaceSeparated$3,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number$3,
    diffuseConstant: number$3,
    direction: null,
    display: null,
    dur: null,
    divisor: number$3,
    dominantBaseline: null,
    download: boolean$1,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number$3,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number$3,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number$3,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated$2,
    g2: commaSeparated$2,
    glyphName: commaSeparated$2,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number$3,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number$3,
    horizOriginX: number$3,
    horizOriginY: number$3,
    id: null,
    ideographic: number$3,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number$3,
    k: number$3,
    k1: number$3,
    k2: number$3,
    k3: number$3,
    k4: number$3,
    kernelMatrix: commaOrSpaceSeparated$1,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number$3,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number$3,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number$3,
    overlineThickness: number$3,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number$3,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated$3,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number$3,
    pointsAtY: number$3,
    pointsAtZ: number$3,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated$1,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated$1,
    rev: commaOrSpaceSeparated$1,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated$1,
    requiredFeatures: commaOrSpaceSeparated$1,
    requiredFonts: commaOrSpaceSeparated$1,
    requiredFormats: commaOrSpaceSeparated$1,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number$3,
    specularExponent: number$3,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number$3,
    strikethroughThickness: number$3,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated$1,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number$3,
    strokeOpacity: number$3,
    strokeWidth: null,
    style: null,
    surfaceScale: number$3,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated$1,
    tabIndex: number$3,
    tableValues: null,
    target: null,
    targetX: number$3,
    targetY: number$3,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated$1,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number$3,
    underlineThickness: number$3,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number$3,
    values: null,
    vAlphabetic: number$3,
    vMathematical: number$3,
    vectorEffect: null,
    vHanging: number$3,
    vIdeographic: number$3,
    version: null,
    vertAdvY: number$3,
    vertOriginX: number$3,
    vertOriginY: number$3,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number$3,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

var svg_1 = merge_1([xml, xlink, xmlns, aria, svg]);

var data = 'data';
var find_1 = find;
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;

function find(schema, value) {
  var normal = normalize_1(value);
  var prop = value;
  var Type = info;

  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }

  if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
    // Attribute or property.
    if (value.charAt(4) === '-') {
      prop = datasetToProperty(value);
    } else {
      value = datasetToAttribute(value);
    }

    Type = definedInfo;
  }

  return new Type(prop, value);
}

function datasetToProperty(attribute) {
  var value = attribute.slice(5).replace(dash, camelcase);
  return data + value.charAt(0).toUpperCase() + value.slice(1);
}

function datasetToAttribute(property) {
  var value = property.slice(4);

  if (dash.test(value)) {
    return property;
  }

  value = value.replace(cap, kebab);

  if (value.charAt(0) !== '-') {
    value = '-' + value;
  }

  return data + value;
}

function kebab($0) {
  return '-' + $0.toLowerCase();
}

function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

const classId = "classID";
const dataType = "datatype";
const itemId = "itemID";
const strokeDashArray = "strokeDasharray";
const strokeDashOffset = "strokeDashoffset";
const strokeLineCap = "strokeLinecap";
const strokeLineJoin = "strokeLinejoin";
const strokeMiterLimit = "strokeMiterlimit";
const typeOf = "typeof";
const xLinkActuate = "xlinkActuate";
const xLinkArcRole = "xlinkArcrole";
const xLinkHref = "xlinkHref";
const xLinkRole = "xlinkRole";
const xLinkShow = "xlinkShow";
const xLinkTitle = "xlinkTitle";
const xLinkType = "xlinkType";
const xmlnsXLink = "xmlnsXlink";
var hastToReact = {
  classId: classId,
  dataType: dataType,
  itemId: itemId,
  strokeDashArray: strokeDashArray,
  strokeDashOffset: strokeDashOffset,
  strokeLineCap: strokeLineCap,
  strokeLineJoin: strokeLineJoin,
  strokeMiterLimit: strokeMiterLimit,
  typeOf: typeOf,
  xLinkActuate: xLinkActuate,
  xLinkArcRole: xLinkArcRole,
  xLinkHref: xLinkHref,
  xLinkRole: xLinkRole,
  xLinkShow: xLinkShow,
  xLinkTitle: xLinkTitle,
  xLinkType: xLinkType,
  xmlnsXLink: xmlnsXLink
};

var parse_1 = parse;
var stringify_1 = stringify;
var empty = '';
var space = ' ';
var whiteSpace = /[ \t\n\r\f]+/g;

function parse(value) {
  var input = String(value || empty).trim();
  return input === empty ? [] : input.split(whiteSpace);
}

function stringify(values) {
  return values.join(space).trim();
}

var spaceSeparatedTokens = {
	parse: parse_1,
	stringify: stringify_1
};

var parse_1$1 = parse$1;
var stringify_1$1 = stringify$1;
var comma = ',';
var space$1 = ' ';
var empty$1 = ''; // Parse comma-separated tokens to an array.

function parse$1(value) {
  var values = [];
  var input = String(value || empty$1);
  var index = input.indexOf(comma);
  var lastIndex = 0;
  var end = false;
  var val;

  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }

    val = input.slice(lastIndex, index).trim();

    if (val || !end) {
      values.push(val);
    }

    lastIndex = index + 1;
    index = input.indexOf(comma, lastIndex);
  }

  return values;
} // Compile an array to comma-separated tokens.
// `options.padLeft` (default: `true`) pads a space left of each token, and
// `options.padRight` (default: `false`) pads a space to the right of each token.


function stringify$1(values, options) {
  var settings = options || {};
  var left = settings.padLeft === false ? empty$1 : space$1;
  var right = settings.padRight ? space$1 : empty$1; // Ensure the last empty entry is seen.

  if (values[values.length - 1] === empty$1) {
    values = values.concat(empty$1);
  }

  return values.join(right + comma + left).trim();
}

var commaSeparatedTokens = {
	parse: parse_1$1,
	stringify: stringify_1$1
};

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/; // declaration

var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/; // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

var TRIM_REGEX = /^\s+|\s+$/g; // strings

var NEWLINE = '\n';
var FORWARD_SLASH = '/';
var ASTERISK = '*';
var EMPTY_STRING = ''; // types

var TYPE_COMMENT = 'comment';
var TYPE_DECLARATION = 'declaration';
/**
 * @param {String} style
 * @param {Object} [options]
 * @return {Object[]}
 * @throws {TypeError}
 * @throws {Error}
 */

var inlineStyleParser = function (style, options) {
  if (typeof style !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!style) return [];
  options = options || {};
  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;
  /**
   * Update lineno and column based on `str`.
   *
   * @param {String} str
   */

  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  /**
   * Mark position and patch `node.position`.
   *
   * @return {Function}
   */


  function position() {
    var start = {
      line: lineno,
      column: column
    };
    return function (node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }
  /**
   * Store position information for a node.
   *
   * @constructor
   * @property {Object} start
   * @property {Object} end
   * @property {undefined|String} source
   */


  function Position(start) {
    this.start = start;
    this.end = {
      line: lineno,
      column: column
    };
    this.source = options.source;
  }
  /**
   * Non-enumerable source string.
   */


  Position.prototype.content = style;
  /**
   * Error `msg`.
   *
   * @param {String} msg
   * @throws {Error}
   */

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;

    if (options.silent) ; else {
      throw err;
    }
  }
  /**
   * Match `re` and return captures.
   *
   * @param {RegExp} re
   * @return {undefined|Array}
   */


  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }
  /**
   * Parse whitespace.
   */


  function whitespace() {
    match(WHITESPACE_REGEX);
  }
  /**
   * Parse comments.
   *
   * @param {Object[]} [rules]
   * @return {Object[]}
   */


  function comments(rules) {
    var c;
    rules = rules || [];

    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }

    return rules;
  }
  /**
   * Parse comment.
   *
   * @return {Object}
   * @throws {Error}
   */


  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
    var i = 2;

    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }

    i += 2;

    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error('End of comment missing');
    }

    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  /**
   * Parse declaration.
   *
   * @return {Object}
   * @throws {Error}
   */


  function declaration() {
    var pos = position(); // prop

    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment(); // :

    if (!match(COLON_REGEX)) return error("property missing ':'"); // val

    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    }); // ;

    match(SEMICOLON_REGEX);
    return ret;
  }
  /**
   * Parse declarations.
   *
   * @return {Object[]}
   */


  function declarations() {
    var decls = [];
    comments(decls); // declarations

    var decl;

    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    return decls;
  }

  whitespace();
  return declarations();
};
/**
 * Trim `str`.
 *
 * @param {String} str
 * @return {String}
 */


function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}

/**
 * Parses inline style to object.
 *
 * @example
 * // returns { 'line-height': '42' }
 * StyleToObject('line-height: 42;');
 *
 * @param  {String}      style      - The inline style.
 * @param  {Function}    [iterator] - The iterator function.
 * @return {null|Object}
 */


function StyleToObject(style, iterator) {
  var output = null;

  if (!style || typeof style !== 'string') {
    return output;
  }

  var declaration;
  var declarations = inlineStyleParser(style);
  var hasIterator = typeof iterator === 'function';
  var property;
  var value;

  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }

  return output;
}

var styleToObject = StyleToObject;

export { unistUtilPosition as a, styleToObject as b, commaSeparatedTokens as c, svg_1 as d, html_1 as e, find_1 as f, convert_1 as g, hastToReact as h, normalize_1 as n, spaceSeparatedTokens as s, unistUtilVisit as u };
