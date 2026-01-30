async function testReview() {
    const baseUrl = 'http://127.0.0.1:5000/api';

    // User 1: Reviewer (Buyer)
    const buyerEmail = 'reviewer_' + Date.now() + '@example.com';
    // User 2: Target (Farmer)
    const farmerEmail = 'farmer_' + Date.now() + '@example.com';
    const password = 'password123';

    try {
        console.log('1. Registering Farmer...');
        let res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Farmer', email: farmerEmail, password, role: 'FARMER' })
        });
        let data = await res.json();

        if (!res.ok) {
            console.error('Farmer Reg Failed:', data);
            return;
        }

        const farmerId = data.data._id;
        console.log('   Farmer ID:', farmerId);

        // Create Farmer Profile (needed for review aggregation update usually, but let's see)
        // The code updates FarmerProfile, so we should ensure it exists or ignore error if not. 
        // Actually the backend might expect it. Let's create it.
        const farmerToken = data.data.token;
        await fetch(`${baseUrl}/farmers/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${farmerToken}` },
            body: JSON.stringify({ bio: 'Test Bio' })
        });


        console.log('2. Registering Buyer (Reviewer)...');
        res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Reviewer', email: buyerEmail, password, role: 'BUYER' })
        });
        data = await res.json();
        const buyerToken = data.data.token;
        console.log('   Buyer Token acquired.');

        console.log('3. Posting Review...');
        res = await fetch(`${baseUrl}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${buyerToken}`
            },
            body: JSON.stringify({
                targetUser: farmerId,
                rating: 4,
                comment: "Good crops!",
                roleTargeted: "FARMER"
            })
        });
        data = await res.json();

        if (res.ok) {
            console.log('   Review Posted Successfully:', data);
        } else {
            console.error('   Review Failed:', res.status, data);
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testReview();
