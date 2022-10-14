// Recibe un input type datetime-local: string y lo convierte en unix timestamp para poder programar envio de e-mails.
const dateToTimestamp = (strDate) => {
  const [dateComponents, timeComponents] = strDate.split("T");
  const [year, month, day] = dateComponents.split("-");
  const [hours, minutes] = timeComponents.split(":");
  const date = new Date(+year, month - 1, +day, +hours, +minutes);
  const timestamp = date.getTime() / 1000.0;
  return timestamp;
};

module.exports = { dateToTimestamp };
