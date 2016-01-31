
export const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error(err)
    throw err
  }
}