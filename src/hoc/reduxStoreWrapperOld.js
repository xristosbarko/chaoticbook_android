import React, {Component} from "react";
import { Provider } from "react-redux";

const reduxStoreWrapper = (MyComponent, store) => {
    return () => {
        return class StoreWrapper extends React.Component {
            render () {
                return (
                    <Provider store={store}>
                        <MyComponent {...this.props} />
                    </Provider>
                );
            }
        };
    };
}

export default reduxStoreWrapper