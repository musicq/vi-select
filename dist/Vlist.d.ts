import * as React from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVirtualListOptions } from 'vist';
interface IVlistProps<T> {
    data$: Observable<T[]>;
    value: any;
    onChange: (v: T) => void;
    keyProp: any;
    itemHeight?: number;
    index: number;
}
interface IVlistState {
    options: IVirtualListOptions;
    options$: BehaviorSubject<IVirtualListOptions>;
}
export declare class Vlist<T> extends React.Component<IVlistProps<T>, IVlistState> {
    state: {
        options: {
            height: number;
            resize: boolean;
        };
        options$: BehaviorSubject<IVirtualListOptions>;
    };
    private readonly options$;
    constructor(props: any);
    static getDerivedStateFromProps<T>(props: IVlistProps<T>, state: IVlistState): IVirtualListOptions;
    static getActivatedClassName(): string;
    render(): JSX.Element;
    private onSelect;
    private preventDefault;
}
export {};
