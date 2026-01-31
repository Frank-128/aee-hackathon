import 'package:app/core/controllers/auth_controller.dart';
import 'package:get/get.dart';
import 'dart:convert';
import 'package:app/core/models/app_user.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/foundation.dart';

class AuthService {
  static const String baseUrl = 'https://aee-hackathon.onrender.com/api';

  static Future<bool> signIn({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final decoded = jsonDecode(response.body);
      final data = decoded['data'];

      final auth = Get.find<AuthController>();

      final user = AppUser.fromJson(data);

      await auth.setAuthData(
        user: user,
        token: data['token'],
        refreshToken: data['refreshToken'],
      );

      return true;
    }

    return false;
  }


  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }

  static Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('loggedIn') ?? false;
  }

  static Future<String?> getRole() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('role');
  }

  static Future<String?> signUp({
    required String name,
    required String email,
    required String password,
    required String role,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          'role': role.toUpperCase(),
        }),
      );

      // 🔍 FULL DEBUG LOGGING
      debugPrint('STATUS CODE: ${response.statusCode}');
      debugPrint('HEADERS: ${response.headers}');
      debugPrint('RAW BODY:\n${response.body}');

      // ❌ If response is not JSON, stop here
      if (!response.headers['content-type']!.contains('application/json')) {
        return 'Server returned non-JSON response (likely wrong endpoint)';
      }

      final decoded = jsonDecode(response.body);

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (decoded['success'] == true) {
          return null; // ✅ success
        }
      }

      return decoded['message'] ?? 'Registration failed';
    } catch (e, stackTrace) {
      debugPrint('❌ SIGNUP EXCEPTION');
      debugPrint(e.toString());
      debugPrint(stackTrace.toString());

      return 'Unexpected error occurred. Check logs.';
    }
  }
}
