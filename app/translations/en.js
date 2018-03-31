module.exports = {
    errors: {
        first_name: 'First name should not be empty.',
        last_name: 'Last name should not be empty.',
        email: {
            invalid: 'Invalid email.',
            taken: 'This email is already taken.',
            not_found: 'This email does not exist.',
        },
        password: {
            exists: 'Password field empty.',
            length: 'Password should be between <<start>> and <<end>> chars long.',
            wrong: 'Wrong password.'
        },
        authentication: {
            token: {
                missing: 'You are not authenticated.',
                invalid: 'Invalid token.',
            }
        }
    }
};