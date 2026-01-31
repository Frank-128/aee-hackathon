import 'package:app/core/layout/farmer_layout.dart';
import 'package:app/features/auth/sign_in_page.dart';
import 'package:app/features/auth/sign_up_page.dart';
import 'package:app/features/farmer/add_crop_page.dart';
import 'package:flutter/material.dart';
import '../../features/onboarding/welcome_language_page.dart';
import '../../features/auth/role_selection_page.dart';
import '../../features/buyer/buyer_shell.dart';

class AppRoutes {
  static const welcome = '/';
  static const roleSelection = '/role';
  static const farmerShell = '/farmer';
  static const farmerAddCrop = '/farmer/add-crop';
  static const buyerShell = '/buyer';
  static const signIn = '/sign-in';
  static const signUp = '/sign-up';

  static Map<String, WidgetBuilder> routes = {
    roleSelection: (_) => const RoleSelectionPage(),
    welcome: (_) => const WelcomeLanguagePage(),
    farmerShell: (_) => const FarmerShell(),
    farmerAddCrop: (_) => const AddCropPage(),
    buyerShell: (_) => const BuyerShell(),
    signIn: (_) => const SignInPage(),
    signUp: (_) => const SignUpPage(),
  };
}
