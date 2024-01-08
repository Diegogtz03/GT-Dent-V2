// REGISTER PATIENT
export async function registerPatient(cookie, name, birthday, phone) {
  const data = JSON.parse(cookie);

  var myFormData = new FormData();
  myFormData.append("doctorId", data.id);
  myFormData.append("name", name);
  myFormData.append("birthday", birthday);
  myFormData.append("phone", phone);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/registerPatient`, {
    method: 'POST',
    body: myFormData,
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });

  if (res.status == 500) {
    return {
      message: "Server error",
      patientId: -1
    };
  }

  const patient = JSON.parse(await res.text());
  
  return patient;
}

// UPDATE PATIENT