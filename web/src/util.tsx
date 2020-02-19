export function numberWithCommas(number: number): string {
  // formats number with commas to separate thousands
  var parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
