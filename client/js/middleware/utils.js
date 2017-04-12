import _ from 'lodash';

function dispatchMany(actions, store) {
  _.each(actions, action => store.dispatch(action));
}

export { dispatchMany as default };
