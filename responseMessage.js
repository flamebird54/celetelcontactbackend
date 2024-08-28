const responseMessages = {
    userNotFound: {
        statusCode: 400,
        message: 'User not found. Please check your email.',
    },
    incorrectPassword: {
        statusCode: 400,
        message: 'Incorrect password. Please try again.',
    },
    loginSuccess: {
        statusCode: 200,
        message: 'User login successful',
    },
    genericError: {
        statusCode: 400,
        message: 'An error occurred. Please try again later.',
    },
};

export default responseMessages;