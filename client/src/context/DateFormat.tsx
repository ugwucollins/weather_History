
const DateFormat = (dateTime: any) => {
  const checkDate = dateTime ? dateTime : Date.now()
  const date = new Date(checkDate);

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);

  const weekday = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
  }).format(date);

  return {
    dateName: formatted,
    day: weekday
  }
}

export default DateFormat