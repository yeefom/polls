const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('Action: ', action)
  const ret = next(action)
  console.log('New state: ', store.getState())
  console.groupEnd()
  return ret
}

export default logger;
