import React from "react";
import { Provider } from "react-redux";

const reduxStoreWrapper = (MyComponent, store) => {
    class StoreWrapper extends React.Component {
        render () {
            return (
                <Provider store={store}>
                    <MyComponent {...this.props} />
                </Provider>
            );
        }
    };

    return StoreWrapper;
}

export default reduxStoreWrapper