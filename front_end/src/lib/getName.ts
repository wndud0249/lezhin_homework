export const getGenreName = (target: string) => {
  switch (target) {
    case 'scheduled':
      return '연재';
    case 'romance':
      return '로맨스';
    case 'boys':
      return '소년';
    case 'drama':
      return '드라마';
    case 'bl':
      return 'BL';
    case 'nsfw':
      return '후방주의';
    case 'free':
      return '무료';
    default:
      window.location.href = '/notFound';
      break;
  }
};

export const getPeriodName = (period: string) => {
  switch (period) {
    case 'MON':
      return '월요일';
    case 'TUE':
      return '화요일';
    case 'WED':
      return '수요일';
    case 'THU':
      return '목요일';
    case 'FRI':
      return '금요일';
    case 'SAT':
      return '토요일';
    case 'SUN':
      return '일요일';
    default:
      return '해당 없음';
  }
};
