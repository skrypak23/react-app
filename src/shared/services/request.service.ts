async function request<T>(url: string, config: object = {}): Promise<T> {
  try {
    const res = await fetch(url, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export default request;
