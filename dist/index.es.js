import { createRef, createElement, Component } from 'react';
import { BehaviorSubject, combineLatest, fromEvent, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, filter, map, skipWhile, startWith, tap, withLatestFrom, delay, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { Dropdown, Icon, Input } from 'antd';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* Vlist style */\n.styles_VlistItem__1kEyz {\n  padding: 5px 12px;\n  cursor: pointer;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.styles_VlistItem__1kEyz:hover {\n  background: #e4e1f0;\n}\n\n.styles_VListItemActivated__3MfXb {\n  background-color: #fafafa;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.65);\n}\n\n.styles_VListItemActivated__3MfXb:hover {\n  background-color: #fafafa;\n}\n\n.styles_VListItemDisabled__3vPYt {\n  padding: 5px 12px;\n  color: rgba(0, 0, 0, 0.25);\n  background: #fff;\n  cursor: not-allowed;\n}\n\n/* Select */\n.styles_VSelectInput__1hLp7 {\n  padding: 0;\n}\n\n.styles_VSelectInput__1hLp7:focus,\n.styles_VSelectInput__1hLp7:hover {\n  border: 0;\n  outline: 0 !important;\n  box-shadow: none !important;\n}\n\n.styles_VSelectArrow__gwvD8 {\n  transition: transform .2s linear;\n}\n\n.styles_VSelectOpen__2HC4e .styles_VSelectArrow__gwvD8 {\n  transform: rotateZ(180deg);\n}\n";
var style = {"VlistItem":"styles_VlistItem__1kEyz","VListItemActivated":"styles_VListItemActivated__3MfXb","VListItemDisabled":"styles_VListItemDisabled__3vPYt","VSelectInput":"styles_VSelectInput__1hLp7","VSelectArrow":"styles_VSelectArrow__gwvD8","VSelectOpen":"styles_VSelectOpen__2HC4e"};
styleInject(css);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function styleInject$1(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css$1 = ".VirtualList_VirtualList__1SA8j {\n  overflow-y: auto;\n}\n\n.VirtualList_VirtualListContainer__xe2yw {\n  position: relative;\n}\n\n.VirtualList_VirtualListPlaceholder__12jc2 {\n  position: absolute;\n  width: 100%;\n}\n";
var style$1 = {"VirtualList":"VirtualList_VirtualList__1SA8j","VirtualListContainer":"VirtualList_VirtualListContainer__xe2yw","VirtualListPlaceholder":"VirtualList_VirtualListPlaceholder__12jc2"};
styleInject$1(css$1);

var VirtualList = /** @class */ (function (_super) {
    __extends$1(VirtualList, _super);
    function VirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: [],
            scrollHeight: 0
        };
        // snapshot of data property in state
        _this.stateDataSnapshot = [];
        // snapshot of actualRows
        _this.actualRowsSnapshot = 0;
        // record data reference
        _this.dataReference = [];
        // container dom instance
        _this.virtualListRef = createRef();
        // container height
        _this.containerHeight$ = new BehaviorSubject(0);
        // last first index of data for the first element of the virtual list
        _this.lastFirstIndex = -1;
        // record the position of last scroll
        _this.lastScrollPos = 0;
        // options$ to keep the latest options from the input
        _this.options$ = new ReplaySubject(1);
        _this._subs = [];
        return _this;
    }
    VirtualList.prototype.componentDidMount = function () {
        var _this = this;
        var virtualListElm = this.virtualListRef.current;
        this._subs.push(this.props.options$.pipe(tap(function (options) {
            if (options.height === undefined) {
                throw new Error('Vist needs a height property in options$');
            }
        }), map(function (options) {
            var opt = Object.assign({}, options);
            opt.sticky = opt.sticky === undefined ? true : opt.sticky;
            opt.spare = opt.spare === undefined ? 3 : opt.spare;
            opt.startIndex = opt.startIndex === undefined ? 0 : opt.startIndex;
            opt.resize = opt.resize === undefined ? true : opt.resize;
            return opt;
        })).subscribe(function (opt) { return _this.options$.next(opt); }));
        // window resize
        this._subs.push(fromEvent(window, 'resize').pipe(withLatestFrom(this.options$), skipWhile(function (_a) {
            var _ = _a[0], options = _a[1];
            return !options.resize;
        }), startWith(null), debounceTime(200), map(function () { return _this.containerHeight$.next(virtualListElm.clientHeight); })).subscribe());
        // scroll events
        var scrollEvent$ = fromEvent(virtualListElm, 'scroll').pipe(startWith({ target: { scrollTop: this.lastScrollPos } }));
        // scroll top
        var scrollTop$ = scrollEvent$.pipe(map(function (e) { return e.target.scrollTop; }));
        // scroll to the given position
        this._subs.push(this.options$.pipe(filter(function (option) { return option.startIndex !== undefined; }), map(function (option) { return option.startIndex * option.height; })
        // setTimeout to make sure the list is already rendered
        ).subscribe(function (scrollTop) { return setTimeout(function () { return virtualListElm.scrollTo(0, scrollTop); }); }));
        // let the scroll bar stick the top
        this._subs.push(this.props.data$.pipe(withLatestFrom(this.options$), filter(function (_a) {
            var _ = _a[0], options = _a[1];
            return Boolean(options.sticky);
        })).subscribe(function () { return setTimeout(function () { return virtualListElm.scrollTo(0, 0); }); }));
        // scroll direction Down/Up
        var scrollDirection$ = scrollTop$.pipe(map(function (scrollTop) {
            var dir = scrollTop - _this.lastScrollPos;
            _this.lastScrollPos = scrollTop;
            return dir > 0 ? 1 : -1;
        }));
        // actual rows
        var actualRows$ = combineLatest(this.containerHeight$, this.options$).pipe(map(function (_a) {
            var ch = _a[0], option = _a[1];
            return Math.ceil(ch / option.height) + (option.spare || 3);
        }));
        // data indexes in view
        var indexes$ = combineLatest(scrollTop$, this.options$).pipe(
        // the index of the top elements of the current list
        map(function (_a) {
            var st = _a[0], options = _a[1];
            return Math.floor(st / options.height);
        }));
        // if it's necessary to update the view
        var shouldUpdate$ = combineLatest(indexes$, this.props.data$, actualRows$).pipe(map(function (_a) {
            var curIndex = _a[0], data = _a[1], actualRows = _a[2];
            // the first index of the virtualList on the last screen, if < 0, reset to 0
            var maxIndex = data.length - actualRows < 0 ? 0 : data.length - actualRows;
            return [curIndex > maxIndex ? maxIndex : curIndex, actualRows];
        }), 
        // if the index or actual rows changed, then update
        filter(function (_a) {
            var curIndex = _a[0], actualRows = _a[1];
            return curIndex !== _this.lastFirstIndex || actualRows !== _this.actualRowsSnapshot;
        }), 
        // update the index
        tap(function (_a) {
            var curIndex = _a[0];
            return _this.lastFirstIndex = curIndex;
        }), map(function (_a) {
            var firstIndex = _a[0], actualRows = _a[1];
            var lastIndex = firstIndex + actualRows - 1;
            return [firstIndex, lastIndex];
        }));
        // data slice in the view
        var dataInViewSlice$ = combineLatest(this.props.data$, this.options$, shouldUpdate$).pipe(withLatestFrom(scrollDirection$, actualRows$), map(function (_a) {
            var _b = _a[0], data = _b[0], options = _b[1], _c = _b[2], firstIndex = _c[0], lastIndex = _c[1], dir = _a[1], actualRows = _a[2];
            var dataSlice = _this.stateDataSnapshot;
            // compare data reference, if not the same, then update the list
            var dataReferenceIsSame = data === _this.dataReference;
            // fill the list
            if (!dataSlice.length || !dataReferenceIsSame || actualRows !== _this.actualRowsSnapshot) {
                if (!dataReferenceIsSame) {
                    _this.dataReference = data;
                }
                if (actualRows !== _this.actualRowsSnapshot) {
                    _this.actualRowsSnapshot = actualRows;
                }
                return _this.stateDataSnapshot = data.slice(firstIndex, lastIndex + 1).map(function (item) { return ({
                    origin: item,
                    $pos: firstIndex * options.height,
                    $index: firstIndex++
                }); });
            }
            // reuse the existing elements
            var diffSliceIndexes = _this.getDifferenceIndexes(dataSlice, firstIndex, lastIndex);
            var newIndex = dir > 0 ? lastIndex - diffSliceIndexes.length + 1 : firstIndex;
            diffSliceIndexes.forEach(function (index) {
                var item = dataSlice[index];
                item.origin = data[newIndex];
                item.$pos = newIndex * options.height;
                item.$index = newIndex++;
            });
            return _this.stateDataSnapshot = dataSlice;
        }));
        // total height of the virtual list
        var scrollHeight$ = combineLatest(this.props.data$, this.options$).pipe(map(function (_a) {
            var data = _a[0], option = _a[1];
            return data.length * option.height;
        }));
        // subscribe to update the view
        this._subs.push(combineLatest(dataInViewSlice$, scrollHeight$)
            .subscribe(function (_a) {
            var data = _a[0], scrollHeight = _a[1];
            return _this.setState({ data: data, scrollHeight: scrollHeight });
        }));
    };
    VirtualList.prototype.componentWillUnmount = function () {
        this._subs.forEach(function (stream$) { return stream$.unsubscribe(); });
        this.containerHeight$.complete();
    };
    VirtualList.prototype.render = function () {
        var _this = this;
        return (createElement("div", { className: style$1.VirtualList, ref: this.virtualListRef, style: this.props.style },
            createElement("div", { className: style$1.VirtualListContainer, style: { height: this.state.scrollHeight } }, this.state.data.map(function (data, i) {
                return createElement("div", { key: i, className: style$1.VirtualListPlaceholder, style: { transform: "translateY(" + data.$pos + "px)" } }, data.origin !== undefined ? _this.props.children(data.origin, data.$index) : null);
            }))));
    };
    VirtualList.prototype.getDifferenceIndexes = function (slice, firstIndex, lastIndex) {
        var indexes = [];
        slice.forEach(function (item, i) {
            if (item.$index < firstIndex || item.$index > lastIndex) {
                indexes.push(i);
            }
        });
        return indexes;
    };
    return VirtualList;
}(Component));

var Vlist = /** @class */ (function (_super) {
    __extends(Vlist, _super);
    function Vlist(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: { height: _this.props.itemHeight || 32, resize: false, spare: 10 },
            options$: new BehaviorSubject({ height: _this.props.itemHeight || 32 }),
            isEmpty: false
        };
        _this._sub = [];
        _this.onSelect = _this.onSelect.bind(_this);
        // to prevent many options at one time
        _this.options$ = _this.state.options$.pipe(throttleTime(10));
        return _this;
    }
    Vlist.getDerivedStateFromProps = function (props, state) {
        var options = __assign({}, state.options);
        var changed = false;
        if (props.itemHeight !== undefined && props.itemHeight !== options.height) {
            options.height = props.itemHeight;
            changed = true;
        }
        if (props.index !== options.startIndex) {
            options.startIndex = props.index;
            changed = true;
        }
        if (changed) {
            state.options$.next(options);
        }
        return changed ? { options: options } : null;
    };
    Vlist.preventDefault = function (e) {
        e.preventDefault();
    };
    Vlist.prototype.componentDidMount = function () {
        var _this = this;
        this._sub.push(this.props.data$.pipe(map(function (data) { return !Boolean(data.length); })).subscribe(function (isEmpty) { return _this.setState({ isEmpty: isEmpty }); }));
        this._sub.push(this.props.refresh$
            .pipe(delay(1))
            .subscribe(function () { return _this.state.options$.next(_this.state.options); }));
    };
    Vlist.prototype.componentWillUnmount = function () {
        this._sub.forEach(function (s) { return s.unsubscribe(); });
    };
    Vlist.prototype.render = function () {
        var _this = this;
        var itemHeight = this.props.itemHeight || 32;
        return (createElement("div", { className: "ant-dropdown-menu", onMouseDown: Vlist.preventDefault }, !this.state.isEmpty ? (createElement(VirtualList, { "data$": this.props.data$, "options$": this.options$, style: { maxHeight: 250 } }, function (item) { return (createElement("div", { style: { height: itemHeight }, className: _this.getItemClassName(item), onClick: function () { return _this.onSelect(item); } }, _this.props.children(item))); })) : (createElement("div", { className: style.VListItemDisabled }, this.props.emptyTpl ? this.props.emptyTpl : '无匹配项目'))));
    };
    Vlist.prototype.getItemClassName = function (item) {
        var clsName = (this.props.keyProp ? item[this.props.keyProp] : item) === this.props.value ? style.VListItemActivated : '';
        return [clsName, style.VlistItem].join(' ');
    };
    Vlist.prototype.onSelect = function (e) {
        this.props.onChange(e);
    };
    return Vlist;
}(Component));

var VSelect = /** @class */ (function (_super) {
    __extends(VSelect, _super);
    function VSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: undefined,
            isEdit: false,
            visible: false,
            changingValue: undefined,
            dataSource: undefined,
            dataSource$: new BehaviorSubject([]),
            inputValue: undefined,
            realValue: undefined,
            index: 0
        };
        _this._sub = [];
        _this.inputRef = createRef();
        _this.changingValue$ = new BehaviorSubject('');
        _this.refresh$ = new Subject();
        _this.onVisibleChange = _this.onVisibleChange.bind(_this);
        _this.onInput = _this.onInput.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.onRefresh = _this.onRefresh.bind(_this);
        return _this;
    }
    VSelect.getDerivedStateFromProps = function (props, state) {
        // if props value has change, then change the state value
        if (props.value !== state.inputValue) {
            state.inputValue = props.value;
            state.realValue = props.value;
            Object.assign(state, VSelect.updateIndex(props));
        }
        if (props.dataSource !== state.dataSource) {
            state.dataSource = props.dataSource;
            state.dataSource$.next(props.dataSource);
            Object.assign(state, VSelect.updateIndex(props));
        }
        return state;
    };
    // get value and index
    VSelect.getValueAndIndex = function (value, dataSource, keyProp, displayProp) {
        var index = dataSource.findIndex(function (source) {
            var x = keyProp ? source[keyProp] : source;
            return x === value;
        });
        if (index === -1) {
            return [undefined, 0];
        }
        var item = dataSource[index];
        return [(displayProp ? item[displayProp] : item), index];
    };
    VSelect.updateIndex = function (props) {
        // if cannot get the value, use the given value
        var _a = VSelect.getValueAndIndex(props.value, props.dataSource, props.keyProp, props.displayProp), v = _a[0], index = _a[1];
        return {
            value: v || props.value,
            index: index
        };
    };
    VSelect.prototype.componentDidMount = function () {
        var _this = this;
        this._sub.push(this.changingValue$.subscribe(function (v) { return _this.setState({ changingValue: v }); }));
        this.data$ = combineLatest(this.state.dataSource$, this.changingValue$.pipe(distinctUntilChanged())).pipe(map(function (_a) {
            var dataSource = _a[0], changingValue = _a[1];
            return changingValue ? dataSource.filter(function (source) {
                var item = _this.props.displayProp ? source[_this.props.displayProp] : source;
                return item.toString().toLowerCase().includes(changingValue.toString().toLowerCase());
            }) : dataSource;
        }));
    };
    VSelect.prototype.componentWillUnmount = function () {
        this._sub.forEach(function (s) { return s.unsubscribe(); });
    };
    VSelect.prototype.render = function () {
        var isShowPlaceholder = this.state.value !== undefined || this.state.changingValue ? 'none' : 'block';
        var isShowValuePlaceholder = this.state.value !== undefined && !this.state.changingValue ? 'block' : 'none';
        var isShowInput = this.state.isEdit ? 'block' : 'none';
        var isShowClearBtn = this.props.allowClear && this.state.value;
        var cls = [
            this.props.className,
            'ant-select',
            this.props.disabled ? 'ant-select-disabled' : 'ant-select-enabled',
            this.props.allowClear ? 'ant-select-allow-clear' : '',
            this.state.visible ? 'ant-select-open ant-select-focused' : '',
            this.state.visible ? style.VSelectOpen : ''
        ].join(' ');
        var showAction = this.props.disabled ? [] : ['click'];
        return (createElement(Dropdown, { overlay: createElement(Vlist, { "data$": this.data$, children: this.props.children, keyProp: this.props.keyProp, value: this.state.realValue, itemHeight: this.props.itemHeight, index: this.state.index, emptyTpl: this.props.emptyTpl, onChange: this.onChange, "refresh$": this.refresh$ }), 
            // prevent default behavior
            trigger: [], 
            // @ts-ignore
            showAction: showAction, hideAction: ['blur'], visible: this.state.visible, onVisibleChange: this.onVisibleChange },
            createElement("div", { style: this.props.style, className: cls, onClick: this.onRefresh, onBlur: this.onRefresh },
                createElement("div", { className: "ant-select-selection ant-select-selection--single" },
                    createElement("div", { className: "ant-select-selection__rendered" },
                        createElement("div", { className: "ant-select-selection__placeholder", style: { display: isShowPlaceholder } }, this.props.placeholder),
                        createElement("div", { className: "ant-select-selection-selected-value", style: { display: isShowValuePlaceholder, opacity: this.state.isEdit ? 0.4 : 1 } }, this.state.value),
                        createElement("div", { className: "ant-select-search ant-select-search--inline", style: { display: isShowInput } },
                            createElement("div", { className: "ant-select-search__field__wrap" },
                                createElement(Input, { ref: this.inputRef, className: ['ant-select-search__field', style.VSelectInput].join(' '), value: this.state.changingValue, onChange: this.onInput })))),
                    isShowClearBtn && (createElement("span", { className: "ant-select-selection__clear", onClick: this.clearValue },
                        createElement(Icon, { type: "close-circle", theme: "filled", className: "ant-select-clear-icon" }))),
                    createElement("span", { className: ['ant-select-arrow', style.VSelectArrow].join(' ') },
                        createElement(Icon, { type: "down" }))))));
    };
    VSelect.prototype.onVisibleChange = function (visible) {
        if (visible === this.state.visible) {
            return;
        }
        if (visible) {
            var ref_1 = this.inputRef.current;
            if (ref_1) {
                setTimeout(function () { return ref_1.focus(); });
            }
            this.setState({ isEdit: true });
        }
        else {
            // clear temp value
            this.changingValue$.next('');
            this.setState({ isEdit: false });
        }
        this.setState({ visible: visible });
    };
    VSelect.prototype.onInput = function (e) {
        this.changingValue$.next(e.target.value);
    };
    VSelect.prototype.onChange = function (v) {
        var _this = this;
        // use to output
        var output = this.props.keyProp ? v[this.props.keyProp] : v;
        // use to display
        var value = this.props.displayProp ? v[this.props.displayProp] : v;
        // only emit when value is changed
        if (output !== this.state.realValue && this.props.onChange) {
            this.props.onChange(output);
            this.setState({ value: value, realValue: output });
            this.changingValue$.next("");
        }
        setTimeout(function () { return _this.onVisibleChange(false); });
    };
    VSelect.prototype.clearValue = function (e) {
        // stop popup
        e.stopPropagation();
        this.setState({ value: undefined });
        if (this.props.onChange) {
            this.props.onChange(undefined);
        }
    };
    VSelect.prototype.onRefresh = function () {
        var _this = this;
        // emit next tick, because vlist may not mount yet.
        setTimeout(function () { return _this.refresh$.next(); });
    };
    return VSelect;
}(Component));

export { VSelect };
//# sourceMappingURL=index.es.js.map
