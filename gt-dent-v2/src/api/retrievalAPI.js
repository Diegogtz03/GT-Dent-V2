// GET PATIENTS BY NAME
export async function getPatientsByName(cookie, name, type) {
  const data = JSON.parse(cookie);

  var myFormData = new FormData();
  myFormData.append("doctorId", data.id);
  myFormData.append("searchText", name);
  myFormData.append("searchType", type);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records/getPatientList/ByName`, {
    method: 'POST',
    body: myFormData,
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });

  if (res.status == 401 || res.status == 400) {
    return {};
  }

  const patients = JSON.parse(await res.text());
  
  return patients.patients;
}

// GET PATIENTS BY DATE
export async function getPatientsByDate(cookie, date) {
  const data = JSON.parse(cookie);

  var myFormData = new FormData();
  myFormData.append("doctorId", data.id);
  myFormData.append("searchDate", date);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records/getPatientList/ByDate`, {
    method: 'POST',
    body: myFormData,
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });

  if (res.status == 401 || res.status == 400) {
    return {};
  }

  const patients = JSON.parse(await res.text());
  
  return patients.patients;
}


// GET PATIENT RECORD/INFO
export async function getPatientRecord(cookie, patientId) {
  const data = JSON.parse(cookie);

  var myFormData = new FormData();
  myFormData.append("patientId", patientId);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records/getPatientRecord`, {
    method: 'POST',
    body: myFormData,
    headers: {
      'Authorization': `Bearer ${data.token}`
    }
  });

  if (res.status == 401 || res.status == 400) {
    return {};
  }

  const result = JSON.parse(await res.text());
  
  return result;
}
