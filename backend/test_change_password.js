async function testChangePassword() {
    const baseUrl = 'http://localhost:5000/api';
    const email = 'buyer_test_' + Date.now() + '@example.com';
    const password = 'password123';
    const newPassword = 'newpassword123';

    try {
        // 1. Register
        console.log('1. Registering new buyer...');
        let res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Buyer', email, password, role: 'BUYER' })
        });
        let data = await res.json();

        if (!res.ok) throw new Error(`Register failed: ${JSON.stringify(data)}`);
        const token = data.data.token;
        console.log('   Registration successful. Token acquired.');

        // 2. Change Password
        console.log('2. Changing password...');
        res = await fetch(`${baseUrl}/auth/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ oldPassword: password, newPassword })
        });
        data = await res.json();

        if (!res.ok) {
            console.error('   Change Password FAILED:', res.status, data);
        } else {
            console.log('   Change Password Successful:', data);
        }

        // 3. Login with NEW password
        console.log('3. Verifying login with new password...');
        res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: newPassword })
        });
        data = await res.json();

        if (res.ok) {
            console.log('   Login with new password SUCCESSFUL!');
        } else {
            console.error('   Login with new password FAILED:', res.status, data);
        }

    } catch (error) {
        console.error('Test Error:', error);
    }
}

testChangePassword();
