
const signUp = async function signUpFetching(myBody) {
  try {
    // Envoi de la requête
    const response = await fetch(`http://localhost:8000/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Récupération du status de la requête
    const { status } = response;
    const result = await response.json();
    // Récupération des informations de réponse de la requête
    const { inputs, alert, data } = result;

    // Traitement de la réponse
    if (status === 400 || status === 500) {
      return { alert, type: 'INPUT', status: 'ERROR', inputs };
    }
    // En cas de bonne création du compte
    return { alert, data, status: 'SUCCESS' };
  } catch (e) {
    console.error(e);
  }

  return 0;
};

export default signUp;
