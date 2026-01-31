import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'core/theme/app_theme.dart';
import 'core/routes/app_routes.dart';
import 'core/controllers/auth_controller.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  Get.put(AuthController());

  runApp(const RhinoApp());
}

class RhinoApp extends StatelessWidget {
  const RhinoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Rhino',
      theme: AppTheme.lightTheme,

      initialRoute: AppRoutes.welcome,
      routes: AppRoutes.routes,

      debugShowCheckedModeBanner: false,
    );
  }
}
