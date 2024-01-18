export async function login(username, password) {
  var myFormData = new FormData();
  myFormData.append("username", username);
  myFormData.append("password", password);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: "POST",
    body: myFormData,
  });

  const data = JSON.parse(await res.text());

  if (!data.success) {
    return {
      successLogin: false,
      message: data.error
    }
  }

  return {
    successLogin: data.success,
    cookie: `{"id": ${data.doctorId},"username": "${data.username}","token": "${data.token}"}`,
    message: "Inicio exitoso"
  };
}

export async function verifyUser(token) {
  token = JSON.parse(token);

  var bodyData = new FormData();
  bodyData.append("id", token.id);
  bodyData.append("username", token.username);
  bodyData.append("token", token.token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
    method: 'POST',
    body: bodyData
  });

  if (res.status == 401 || res.status == 500) {
    return false;
  }

  const data = JSON.parse(await res.text());

  return data.validToken;
}