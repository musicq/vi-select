import * as React from 'react';
import { ChangeEvent } from 'react';
import { BehaviorSubject } from 'rxjs';
interface IVSelectProps<T> {
    placeholder?: string;
    value?: string;
    onChange?: Function;
    dataSource: T[];
    searchField: string;
}
interface IVSelectState<T> {
    visible: boolean;
    placeholder: string | undefined;
    value: any | undefined;
    originValue: any | undefined;
    originPlaceholder: any | undefined;
    lastValue: any | undefined;
    dataSourceSnapshot: T[];
    dataSource$: BehaviorSubject<T[]>;
    value$: BehaviorSubject<string | undefined>;
}
export declare class VSelect<T> extends React.Component<IVSelectProps<T>, IVSelectState<T>> {
    state: {
        visible: boolean;
        placeholder: undefined;
        value: undefined;
        dataSourceSnapshot: T[];
        originValue: undefined;
        originPlaceholder: undefined;
        lastValue: undefined;
        dataSource$: BehaviorSubject<T[]>;
        value$: BehaviorSubject<string>;
    };
    private _sub;
    private dataSource$;
    private inputRef;
    constructor(props: any);
    static getDerivedStateFromProps<T>(props: IVSelectProps<T>, state: IVSelectState<T>): IVSelectState<T> | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onShow(): void;
    onClose(): void;
    onVisibleChange(visible: boolean): void;
    onInput(e: ChangeEvent): void;
    onChange(v: T): void;
    onSwitchInput(): void;
    render(): JSX.Element;
}
export {};
