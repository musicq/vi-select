import * as React from 'react';
import { Observable, of } from 'rxjs';
import { VirtualList } from 'vist';
import style from './styles.css';

interface IVlistProps<T> {
  data$: Observable<T[]>;
  value: any;
  onChange: (v: T) => void;
  searchField: string;
}

export class Vlist<T> extends React.Component<IVlistProps<T>> {
  constructor(props: any) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e: T) {
    this.props.onChange(e);
  }

  render() {
    return (
      <div className="ant-dropdown-menu">
        <VirtualList
          data$={this.props.data$}
          options$={of({ height: 90 })}
          style={{ height: 400 }}
        >
          {(item: T) => (
            <div
              className={item[this.props.searchField] === this.props.value
                ? style.VListItemActivated + ' ' + style.VlistItem
                : style.VlistItem}
              onClick={() => this.onSelect(item)}
            >
              {(this.props.children as any)(item)}
            </div>
          )}
        </VirtualList>
      </div>
    );
  }
}
