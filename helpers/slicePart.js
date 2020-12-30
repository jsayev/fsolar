/**
 *
 * @param {String} sliceName "ext" or "name"
 */
module.exports = (sliceName) => {
  return {
    /**
     *
     * @param {String} fileName name of file
     */
    from(fileName) {
      let slices = fileName.split(".");

      switch (sliceName) {
        case "ext":
          return slices[slices.length - 1];
        case "name":
          return slices.slice(0, slices.length).join();
      }
    },
  };
};
