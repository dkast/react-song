export default function promiseMiddleware({ dispatch, getState }) {
  return next => {
    // create a recursive function so you can pass getState around
    const recurse = (action) => {
      if (typeof action === 'function') {
        return action(recurse, getState);
      }

      // spread '...rest' recieves anything but promise and type
      const { promise, type, ...rest} = action;

      // if not promise is avail then next
      if (!promise) return next(action);

      const SUCCESS = type;
      const REQUEST = type + '_REQUEST';
      const FAILURE = type + '_FAILURE';

      next({...rest, type: REQUEST});

      return promise
        .then(payload => {
          // promise fullfilled
          next({ ...rest, payload, type: SUCCESS });

          return true;
        }, error => {
          // promise failed
          next({ ...rest, error, type: FAILURE });

          // log error
          console.log(error);

          return false;
        });
    };

    return recurse;
  };
}