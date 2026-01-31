import 'package:app/core/layout/farmer_layout.dart';
import 'package:app/features/farmer/add_crop_page.dart';
import 'package:flutter/material.dart';
import '../../features/onboarding/welcome_language_page.dart';
import '../../features/auth/role_selection_page.dart';

class AppRoutes {
  static const welcome = '/';
  static const roleSelection = '/role';
  static const farmerShell = '/farmer';
  static const farmerAddCrop = '/farmer/add-crop';

  static Map<String, WidgetBuilder> routes = {
    roleSelection: (_) => const RoleSelectionPage(),
    welcome: (_) => const WelcomeLanguagePage(),
    farmerShell: (_) => const FarmerShell(),
    farmerAddCrop: (_) => const AddCropPage(),
  };
}
