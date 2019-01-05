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
    constructor(props: any);
    static getDerivedStateFromProps<T>(props: IVlistProps<T>, state: IVlistState): IVirtualListOptions;
    static getActivatedClassName(): string;
    componentDidMount(): void;
    render(): JSX.Element;
    private getItemClassName;
    private onSelect;
    private preventDefault;
}
export {};
