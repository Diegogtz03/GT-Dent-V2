export function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T00:00:00-07:00';
}


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
      message: "Error, intente de nuevo",
      patientId: -1
    };
  }

  const patient = JSON.parse(await res.text());
  
  return patient;
}

// UPDATE PATIENT
export async function updatePatient(cookie, newPatient) {
  const data = JSON.parse(cookie);

  var newBirthday = new Date(newPatient.patient.birthday);
  newPatient.patient.birthday = newBirthday.toISOString();

  var myFormData = new FormData();
  myFormData.append("updatedPatient", JSON.stringify(newPatient));
  myFormData.append("patientId", newPatient.patient.id);
  myFormData.append("doctorId", data.id);
  myFormData.append("odontogramId", newPatient.odontograma.id);
  myFormData.append("recordID", newPatient.expediente.id);


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates/updatePatient`, {
    method: 'POST',
    body: myFormData,
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });

  if (res.status == 500 || res.status == 400) {
    return {
      success: false,
      message: "Error actualizando paciente"
    };
  } else {
    return {
      success: true,
      message: "Paciente actualizado"
    };
  }
}