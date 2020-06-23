const signUp = async function signUpFetching(myBody) {
  try {
    const response = await fetch(`http://localhost:8000/api/users/login`, {
      method: "POST",
      body: JSON.stringify(myBody),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Request status
    const { status } = response;
    const result = await response.json();

    // Result treatment
    const { inputs, alert, data, token } = result;

    // Response treatment
    if (status === 400 || status === 500) {
      return { alert, type: "INPUT", status: "ERROR", inputs };
    }
    // If success
    return { alert, data, status: "SUCCESS", token };
  } catch (e) {
    console.error(e);
  }
};

export default signUp;
