const { generateNames } = require('./utils/nameGenerator');

console.log('--- Testing Name Generator Logic ---');

// Test Case 1: Male, Day Match
const test1 = {
    fatherName: 'Father',
    motherName: 'Mother',
    dob: '21/01/2026', // Wednesday
    sex: 'Male',
    remarks: 'None'
};
console.log(`\nTest Case 1: Male, Born on Wednesday (21/01/2026)`);
console.log('Results:', generateNames(test1));

// Test Case 2: Female, Random Day
const test2 = {
    fatherName: 'Father',
    motherName: 'Mother',
    dob: '22/01/2026', // Thursday
    sex: 'Female',
    remarks: 'None'
};
console.log(`\nTest Case 2: Female, Born on Thursday (22/01/2026)`);
console.log('Results:', generateNames(test2));

console.log('\n--- Logic Verification Complete ---');
