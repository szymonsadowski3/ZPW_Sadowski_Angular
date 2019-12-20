import get from 'lodash/get';

export function checkAdminRole(router_) {
  return roles => {
    console.log(roles);
    if (get(roles, '[0].role') === 'admin') {
      return true;
    } else {
      router_.navigate(['/wycieczki']);
      return false;
    }
  };
}

export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

export function getTripAverageRating(item) {
  if (!item || !item.oceny || item.oceny.length === 0) {
    return 0;
  } else {
    return average(item.oceny.map(ratingObj => ratingObj.rating));
  }
}
