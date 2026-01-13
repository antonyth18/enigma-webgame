const crypto = require('crypto');

exports.generateTeamCode = () => {
    // Generate a random 6-character alphanumeric code
    return 'ENIG-' + crypto.randomBytes(3).toString('hex').toUpperCase();
};
