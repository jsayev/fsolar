/**
 *
 * @param {String} url page links url
 * @param {Number} itemCount total item count from db
 * @param {Number} itemLimit item limit per page
 * @param {Boolean} page true if initial page is accessed
 */
module.exports = (url, itemCount, itemLimit, page) => {
  let pageCount = Math.ceil(itemCount / itemLimit);
  let i = 1;
  let result = [
    page == 1
      ? `<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`
      : `<li class="page-item"><a class="page-link" href="${url}/${+page - 1}">Previous</a></li>`,
  ];

  for (i; i <= pageCount; i++) {
    if (page == i) {
      result.push(`<li class="page-item active"><a class="page-link" href="${url}/${i}">${i}</a></li>`);
    } else {
      result.push(`<li class="page-item"><a class="page-link" href="${url}/${i}">${i}</a></li>`);
    }
  }

  if (pageCount === 1) {
    result.push(`<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`);
  } else if (pageCount == page) {
    result.push(`<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`);
  } else {
    result.push(`<li class="page-item"><a class="page-link" href="${url}/${+page + 1}">Next</a></li>`);
  }

  return result;
};
