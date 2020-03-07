
const signIn = async function signInFetching(myBody) {
  try {
    // Envoi de la requête
    const response = await fetch(`http://localhost:8000/api/users`, {
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
    switch (status) {
      case 400: {
        // En cas de si des entrées sont en erreur
        if (inputs) return { alert, type: 'INPUT', status: 'ERROR', inputs };
        break;
      }
      case 201: {
        // En cas de bonne création du compte
        return { alert, data, status: 'SUCCESS' };
      }
      default:
        return result;
    }
  } catch (e) {
    console.error(e);
  }

  return 0;
};

export default signIn;
