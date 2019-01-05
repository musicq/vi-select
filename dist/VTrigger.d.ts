import * as React from 'react';
import { ReactNode } from 'react';
declare type renderNode = () => ReactNode;
interface IVTriggerProps {
    getPopupContainer: ReactNode | renderNode;
    popupElement: ReactNode;
    visible: boolean;
    prefixCls: string;
    transitionName: string;
    animation: string;
    dropdownStyle: any;
    dropdownMatchSelectWidth: boolean;
    disabled: boolean;
    showSearch: boolean;
    onVisibleChange: (value: boolean) => void;
}
interface IVTriggerState {
    dropdownWidth: number;
}
export declare class VTrigger extends React.Component<IVTriggerProps, IVTriggerState> {
    state: {
        dropdownWidth: number;
    };
    readonly dropdownPrefixCls: string;
    readonly dropdownTransitionName: string;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private updateDropdownWidth;
}
export {};
