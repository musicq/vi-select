import * as React from 'react';
import { ReactNode } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVirtualListOptions } from 'vist';
interface IVlistProps<T> {
    data$: Observable<T[]>;
    value: any;
    onChange: (v: T) => void;
    keyProp: any;
    itemHeight?: number;
    index: number;
    emptyTpl?: ReactNode;
    refresh$: Observable<void>;
}
interface IVlistState {
    options: IVirtualListOptions;
    options$: BehaviorSubject<IVirtualListOptions>;
    isEmpty: boolean;
}
export declare class Vlist<T> extends React.Component<IVlistProps<T>, IVlistState> {
    state: {
        options: {
            height: number;
            resize: boolean;
        };
        options$: BehaviorSubject<IVirtualListOptions>;
        isEmpty: boolean;
    };
    private readonly options$;
    private _sub;
    constructor(props: any);
    static getDerivedStateFromProps<T>(props: IVlistProps<T>, state: IVlistState): {
        options: {
            height: number;
            spare?: number | undefined;
            sticky?: boolean | undefined;
            startIndex?: number | undefined;
            resize?: boolean | undefined;
        };
    } | null;
    private static preventDefault;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private getItemClassName;
    private onSelect;
}
export {};
