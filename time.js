var locale = 'en';
var current = new Date().getTime();

var formatters = {};

function setLocale(locale) {
  formatters.rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  formatters.dtf = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'long',
  });

  var relativeTimeItems = document.querySelectorAll('relative-time[datetime]');
  relativeTimeItems.forEach(relativeTime);

  var datetimeItems = document.querySelectorAll('datetime[datetime]');
  datetimeItems.forEach(dateTimeFormat);
}

function relativeTime(elem) {
  var other = new Date(elem.getAttribute('datetime')).getTime();

  var ms = current - other;
  var sec = Math.round(ms / 1000);
  var min = Math.round(sec / 60);
  var hr = Math.round(min / 60);
  var day = Math.round(hr / 24);
  var month = Math.round(day / 30);
  var year = Math.round(month / 12);

  var relativeTime;

  if (ms < 0) {
    relativeTime = timeFuture({ sec, min, hr, day, month, year });
  } else {
    relativeTime = timeAgo({ sec, min, hr, day, month, year });
  }

  elem.innerHTML = `(${relativeTime})`;
}

function dateTimeFormat(elem) {
  var datetime = new Date(elem.getAttribute('datetime')).getTime();
  var formatted = formatters.dtf.format(datetime);
  elem.innerHTML = formatted;
}

function timeAgo({ sec, min, hr, day, month, year }) {
  if (sec < 45) {
    return formatters.rtf.format(-sec, 'second');
  } else if (sec < 90) {
    return formatters.rtf.format(-min, 'minute');
  } else if (min < 45) {
    return formatters.rtf.format(-min, 'minute');
  } else if (min < 90) {
    return formatters.rtf.format(-hr, 'hour');
  } else if (hr < 24) {
    return formatters.rtf.format(-hr, 'hour');
  } else if (hr < 36) {
    return formatters.rtf.format(-day, 'day');
  } else if (day < 30) {
    return formatters.rtf.format(-day, 'day');
  } else if (month < 12) {
    return formatters.rtf.format(-month, 'month');
  } else if (month < 18) {
    return formatters.rtf.format(-year, 'year');
  } else {
    return formatters.rtf.format(-year, 'year');
  }
}

function timeFuture({ sec, min, hr, day, month, year }) {
  if (-sec < 45) {
    return formatters.rtf.format(-sec, 'second');
  } else if (-sec < 90) {
    return formatters.rtf.format(-min, 'minute');
  } else if (-min < 45) {
    return formatters.rtf.format(-min, 'minute');
  } else if (-min < 90) {
    return formatters.rtf.format(-hr, 'hour');
  } else if (-hr < 24) {
    return formatters.rtf.format(-hr, 'hour');
  } else if (-hr < 36) {
    return formatters.rtf.format(-day, 'day');
  } else if (-day < 30) {
    return formatters.rtf.format(-day, 'day');
  } else if (-month < 12) {
    return formatters.rtf.format(-month, 'month');
  } else if (-month < 18) {
    return formatters.rtf.format(-year, 'year');
  } else {
    return formatters.rtf.format(-year, 'year');
  }
}

function init() {
  document.querySelectorAll('button.set-locale').forEach(elem => {
    elem.addEventListener('click', ({target: { value: lang }}) => {
      setLocale(lang);
    });
  });
}

init();
