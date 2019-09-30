class Utilities {
  static normalizeSeqErrors(e) {
    const data = {};
    if (e.errors) {
      e.errors.forEach(err => {
        data[err.path] = err.message;
      });
    } else {
      return e;
    }
    // for (const err of e.errors){
    //   data[err.path] = err.message;
    // }
    return data;
  }
}

export default Utilities;
