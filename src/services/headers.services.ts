export function HeaderAuth(token = '') {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ?? '',
    },
  };
}

export function HeaderFile(token = '') {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token ?? '',
      Accept: '*/*',
      responseType: 'blob',
    },
  };
}

export function Header() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
