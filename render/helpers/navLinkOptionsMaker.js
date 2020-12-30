/**
 * @param {String} current nav link to set active class on
 */
module.exports = function (current) {
  const navLinkNames = [
    "Summit",
    "Gallery",
    "Testimonials",
    "Attendees",
    "Speakers",
    "Sponsors",
    "Partners",
    "Exhibitors",
    "Subscribers",
    "EventAgenda",
    "ConferenceSchedule",
    "SupportOrganizations",
    "VirtualConferences",
  ];

  let navElements = [];

  let index = 0;

  for (index; index < navLinkNames.length; index++) {
    let linkLabel = navLinkNames[index];
    let href = `/dashboard/${linkLabel.toLowerCase()}`;

    navElements.push(
      current
        ? {
            label: linkLabel,
            href,
            active: current === linkLabel ? "active" : "",
          }
        : { label: linkLabel, href }
    );
  }

  return navElements;
};
