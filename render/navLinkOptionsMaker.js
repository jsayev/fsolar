/**
 * @param {String} current nav link to set active class on
 */
module.exports = function (current) {
  const navLinkNames = [
    "Summits",
    "Gallery",
    "Testimonials",
    "Attendees",
    "Speakers",
    "Sponsors",
    "Partners",
    "Exhibitors",
    "Subscribers",
    "Event Agenda",
    "Conference Schedule",
    "Support Organizations",
    "Virtual Conferences",
  ];

  let navElements = [];

  let index = 0;

  for (index; index < navLinkNames.length; index++) {
    let link = navLinkNames[index];
    let href = link.toLowerCase().replace(" ", "");

    navElements.push(
      current
        ? {
            label: link,
            href,
            active: current === link ? "active" : "",
          }
        : { label: link, href }
    );
  }

  return navElements;
};
