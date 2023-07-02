export function HeaderAuth(token = "") {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
}

export function HeaderFile(token = "") {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "*/*",
      responseType: "blob"
    }
  }
}

export function Header() {
  return {
    headers: {
      "Content-Type": "application/json"
    }
  }
}
