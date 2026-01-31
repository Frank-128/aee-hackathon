import 'dart:convert';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/app_user.dart';

class AuthController extends GetxController {
  final Rxn<AppUser> user = Rxn<AppUser>();
  final RxnString token = RxnString();
  final RxnString refreshToken = RxnString();

  bool get isLoggedIn => token.value != null;

  @override
  void onInit() {
    super.onInit();
    _loadFromStorage();
  }

  Future<void> _loadFromStorage() async {
    final prefs = await SharedPreferences.getInstance();

    final rawUser = prefs.getString('user');
    token.value = prefs.getString('token');
    refreshToken.value = prefs.getString('refreshToken');

    if (rawUser != null) {
      user.value = AppUser.fromJson(jsonDecode(rawUser));
    }
  }

  Future<void> setAuthData({
    required AppUser user,
    required String token,
    required String refreshToken,
  }) async {
    this.user.value = user;
    this.token.value = token;
    this.refreshToken.value = refreshToken;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', jsonEncode(user.toJson()));
    await prefs.setString('token', token);
    await prefs.setString('refreshToken', refreshToken);
  }

  Future<void> logout() async {
    user.value = null;
    token.value = null;
    refreshToken.value = null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
