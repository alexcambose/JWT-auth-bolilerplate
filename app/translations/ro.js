module.exports = {
    errors: {
        first_name: 'Prenumele nu poate fi gol.',
        last_name: 'Numele nu poate fi gol.',
        email: {
            invalid: 'Email invalid.',
            taken: 'Acest email este deja luat!',
            not_found: 'Acest email nu exista!',
        },
        password: {
            exists: 'Capul parola nu poate fi gol.',
            length: 'Parola trebuie sa contina intre <<start>> si <<end>> caractere.',
            wrong: 'Parola grasita.'
        },
        authentication: {
            token: {
                missing: 'Nu esti autentificat.',
                invalid: 'Token invalid.',
            }
        }
    }
};