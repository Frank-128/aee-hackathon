// using built-in fetch

async function testLocationFallback() {
    const baseUrl = 'http://localhost:5000/api';
    const email = 'loc_test_' + Date.now() + '@example.com';
    const password = 'password123';

    try {
        // 1. Register with Location
        console.log('1. Registering user with location...');
        let res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Loc Tester',
                email,
                password,
                role: 'FARMER',
                location: { state: 'Karnataka', district: 'Bangalore' }
            })
        });
        let data = await res.json();

        if (!res.ok) {
            console.error('Registration Failed:', data);
            return;
        }

        const token = data.data.token;
        console.log('   Registration successful. Location saved:', data.data.location);

        // 2. Call AI without location in body
        console.log('2. Calling AI (Crop Activity) without explicit location...');
        res = await fetch(`${baseUrl}/ai/crop-activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({}) // Empty body
        });
        data = await res.json();

        if (res.ok) {
            console.log('   AI Response Success:', data.data.location === 'Karnataka' ? 'Correctly used profile location' : 'Used wrong location');
            console.log('   Data:', data.data);
        } else {
            console.error('   AI Failed:', res.status);
            console.error('   Error Message:', data.message);
            console.error('   Stack:', data.stack);
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testLocationFallback();
