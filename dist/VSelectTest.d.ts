import * as React from 'react';
export declare function saveRef(instance: any, name: string): (node: any) => void;
export declare class VSelectTest extends React.Component<any, any> {
    saveTriggerRef: (ref: any) => void;
    triggerRef: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    setDropdownWidth: () => void;
    render(): JSX.Element;
}
