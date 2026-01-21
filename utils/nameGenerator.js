const names = require('./names.json');
const dayjs = require('dayjs');

/**
 * Predicts a suitable name based on inputs.
 * @param {Object} data - Input data { sex, dob, etc. }
 * @returns {Array} - Array of suggested name objects
 */
function generateNames(data) {
    const dayOfWeek = dayjs(data.dob, 'DD/MM/YYYY').format('dddd');
    const targetGender = data.sex.toLowerCase();

    // Filter by gender (target gender or unisex)
    let possibilities = names.filter(n =>
        n.gender === targetGender || n.gender === 'unisex'
    );

    // Simple heuristic: Boost score if day matches, but don't strictly filter to allow variety
    // We will return a mix: Top picks matching Day, and others random.

    const dayMatches = possibilities.filter(n => n.day === dayOfWeek);
    const others = possibilities.filter(n => n.day !== dayOfWeek);

    // Return up to 3 suggestions
    const suggestions = [...dayMatches, ...others].slice(0, 3);

    // If we have fewer than 3, just fill with whatever we have
    return suggestions.length > 0 ? suggestions : names.slice(0, 3);
}

module.exports = { generateNames };
