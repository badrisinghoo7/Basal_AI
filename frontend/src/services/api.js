const API_BASE_URL = 'http://localhost:5000/api'

export const submitApplication = async (applicationData) => {
  const response = await fetch(`${API_BASE_URL}/interview-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  })

  if (!response.ok) {
    throw new Error('Failed to submit application')
  }

  return response.json()
}

export const getApplications = async () => {
  const response = await fetch(`${API_BASE_URL}/interview-requests`)

  if (!response.ok) {
    throw new Error('Failed to fetch applications')
  }

  return response.json()
}

export const updateApplicationStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/interview-requests/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update application status')
  }

  return response.json()
}


export const signupUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};